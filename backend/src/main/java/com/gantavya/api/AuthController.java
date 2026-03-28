package com.gantavya.api;

import com.gantavya.domain.UserDocument;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private final UserRepository userRepository;

  public AuthController(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @PostMapping("/signup")
  @ResponseStatus(HttpStatus.CREATED)
  public AuthResponse signup(@RequestBody SignupRequest request) {
    if (request.email() == null || request.email().isBlank() || request.password() == null || request.password().isBlank()) {
      throw new ApiBadRequest("Email and password are required.");
    }

    userRepository.findByEmail(request.email()).ifPresent(user -> {
      throw new ApiBadRequest("Email already registered.");
    });

    String passwordHash = hashPassword(request.password());
    String authToken = createToken();
    UserDocument user = new UserDocument(request.name(), request.email(), passwordHash, request.role(), authToken);
    UserDocument saved = userRepository.save(user);

    return new AuthResponse(saved.getId(), saved.getName(), saved.getEmail(), saved.getRole(), saved.getAuthToken());
  }

  @PostMapping("/login")
  public AuthResponse login(@RequestBody LoginRequest request) {
    if (request.email() == null || request.email().isBlank() || request.password() == null || request.password().isBlank()) {
      throw new ApiBadRequest("Email and password are required.");
    }

    UserDocument user = userRepository.findByEmail(request.email())
        .orElseThrow(() -> new ApiBadRequest("Invalid email or password."));

    String passwordHash = hashPassword(request.password());
    if (!passwordHash.equals(user.getPasswordHash())) {
      throw new ApiBadRequest("Invalid email or password.");
    }

    String authToken = createToken();
    user.setAuthToken(authToken);
    userRepository.save(user);
    return new AuthResponse(user.getId(), user.getName(), user.getEmail(), user.getRole(), user.getAuthToken());
  }

  @GetMapping("/me")
  public AuthResponse me(@RequestHeader(name = "Authorization", required = false) String authorization) {
    String token = extractToken(authorization);
    if (token == null) {
      throw new ApiBadRequest("Missing Authorization header.");
    }
    UserDocument user = userRepository.findByAuthToken(token)
        .orElseThrow(() -> new ApiBadRequest("Invalid authentication token."));
    return new AuthResponse(user.getId(), user.getName(), user.getEmail(), user.getRole(), user.getAuthToken());
  }

  private String hashPassword(String password) {
    try {
      MessageDigest digest = MessageDigest.getInstance("SHA-256");
      byte[] hashed = digest.digest(password.getBytes(StandardCharsets.UTF_8));
      return Base64.getEncoder().encodeToString(hashed);
    } catch (NoSuchAlgorithmException e) {
      throw new RuntimeException("Unable to hash password", e);
    }
  }

  private String createToken() {
    return UUID.randomUUID().toString();
  }

  private String extractToken(String authorization) {
    if (authorization == null || !authorization.startsWith("Bearer ")) {
      return null;
    }
    return authorization.substring(7);
  }

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  private static class ApiBadRequest extends RuntimeException {
    ApiBadRequest(String message) {
      super(message);
    }
  }

  public record SignupRequest(String name, String email, String password, String role) {}

  public record LoginRequest(String email, String password) {}

  public record AuthResponse(String id, String name, String email, String role, String token) {}
}
