package com.gantavya.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

  @GetMapping("/")
  public HealthResponse health() {
    return new HealthResponse("OK", "Gantavya Backend is running");
  }

  @GetMapping("/health")
  public HealthResponse healthCheck() {
    return new HealthResponse("OK", "Gantavya Backend is running");
  }

  public record HealthResponse(String status, String message) {}
}
