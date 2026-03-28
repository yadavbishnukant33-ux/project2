package com.gantavya.domain;

import com.gantavya.domain.BookingDtos.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.Map;

@Document("bookingRequests")
public class BookingRequestDocument {
  @Id
  private String id;

  private String touristId;
  private int trekId;
  private int guideId;
  private String startDate;
  private Map<String, String> accommodationPreferences;
  private String paymentStatus;
  private String transportSuggestion;
  private String routeSuggestion;
  private String status; // pending | confirmed | rejected
  private double proposedPricePerDay;

  private Instant createdAt;
  private Instant decisionAt;

  public BookingRequestDocument() {}

  public BookingRequestDocument(
      String touristId,
      int trekId,
      int guideId,
      String startDate,
      Map<String, String> accommodationPreferences,
      String paymentStatus,
      String transportSuggestion,
      String routeSuggestion,
      String status,
      double proposedPricePerDay,
      Instant createdAt
  ) {
    this.touristId = touristId;
    this.trekId = trekId;
    this.guideId = guideId;
    this.startDate = startDate;
    this.accommodationPreferences = accommodationPreferences;
    this.paymentStatus = paymentStatus;
    this.transportSuggestion = transportSuggestion;
    this.routeSuggestion = routeSuggestion;
    this.status = status;
    this.proposedPricePerDay = proposedPricePerDay;
    this.createdAt = createdAt;
  }

  public BookingRequestDocument(
      String touristId,
      int trekId,
      int guideId,
      String status,
      double proposedPricePerDay,
      Instant createdAt
  ) {
    this(touristId, trekId, guideId, null, null, "pending", null, null, status, proposedPricePerDay, createdAt);
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

  public String getStartDate() {
    return startDate;
  }

  public Map<String, String> getAccommodationPreferences() {
    return accommodationPreferences;
  }

  public String getPaymentStatus() {
    return paymentStatus;
  }

  public String getTransportSuggestion() {
    return transportSuggestion;
  }

  public String getRouteSuggestion() {
    return routeSuggestion;
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

  public void setStartDate(String startDate) {
    this.startDate = startDate;
  }

  public void setAccommodationPreferences(Map<String, String> accommodationPreferences) {
    this.accommodationPreferences = accommodationPreferences;
  }

  public void setPaymentStatus(String paymentStatus) {
    this.paymentStatus = paymentStatus;
  }

  public void setTransportSuggestion(String transportSuggestion) {
    this.transportSuggestion = transportSuggestion;
  }

  public void setRouteSuggestion(String routeSuggestion) {
    this.routeSuggestion = routeSuggestion;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public void setDecisionAt(Instant decisionAt) {
    this.decisionAt = decisionAt;
  }
}

