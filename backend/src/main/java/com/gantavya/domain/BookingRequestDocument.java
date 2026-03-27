package com.gantavya.domain;

import com.gantavya.domain.BookingDtos.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document("bookingRequests")
public class BookingRequestDocument {
  @Id
  private String id;

  private String touristId;
  private int trekId;
  private int guideId;

  private String status; // pending | confirmed | rejected
  private double proposedPricePerDay;

  private Instant createdAt;
  private Instant decisionAt;

  public BookingRequestDocument() {}

  public BookingRequestDocument(
      String touristId,
      int trekId,
      int guideId,
      String status,
      double proposedPricePerDay,
      Instant createdAt
  ) {
    this.touristId = touristId;
    this.trekId = trekId;
    this.guideId = guideId;
    this.status = status;
    this.proposedPricePerDay = proposedPricePerDay;
    this.createdAt = createdAt;
  }

  public String getId() {
    return id;
  }

  public String getTouristId() {
    return touristId;
  }

  public int getTrekId() {
    return trekId;
  }

  public int getGuideId() {
    return guideId;
  }

  public String getStatus() {
    return status;
  }

  public double getProposedPricePerDay() {
    return proposedPricePerDay;
  }

  public Instant getCreatedAt() {
    return createdAt;
  }

  public Instant getDecisionAt() {
    return decisionAt;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public void setDecisionAt(Instant decisionAt) {
    this.decisionAt = decisionAt;
  }
}

