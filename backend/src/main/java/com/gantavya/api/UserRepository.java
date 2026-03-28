package com.gantavya.api;

import com.gantavya.domain.UserDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<UserDocument, String> {
  Optional<UserDocument> findByEmail(String email);
  Optional<UserDocument> findByAuthToken(String authToken);
}
