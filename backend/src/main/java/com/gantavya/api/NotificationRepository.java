package com.gantavya.api;

import com.gantavya.domain.NotificationDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificationRepository extends MongoRepository<NotificationDocument, String> {
  List<NotificationDocument> findByGuideId(String guideId);
}
