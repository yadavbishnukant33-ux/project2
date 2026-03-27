package com.gantavya.api;

import com.gantavya.domain.BookingRequestDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BookingRepository extends MongoRepository<BookingRequestDocument, String> {
  List<BookingRequestDocument> findByGuideId(int guideId);
}

