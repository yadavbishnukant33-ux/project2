package com.gantavya.api;

import com.gantavya.domain.Guide;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GuideProfileRepository extends MongoRepository<Guide, String> {
}