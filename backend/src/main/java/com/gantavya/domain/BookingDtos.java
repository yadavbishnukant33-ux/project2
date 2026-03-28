package com.gantavya.domain;

import java.time.Instant;
import java.util.List;
import java.util.Map;

public class BookingDtos {

  public enum BookingDecision {
    accept,
    decline
  }

  public enum PaymentStatus {
    pending,
    processing,
    completed,
    failed,
    refunded
  }

  public record CreateBookingRequest(
      String touristId,
      int trekId,
      int guideId,
      String startDate,
      Map<String, String> accommodationPreferences
  ) {}

  public record DecisionRequest(
      BookingDecision decision
  ) {}

  public record BookingRequestResponse(
      String id,
      String touristId,
      String trek,
      String duration,
      int trekId,
      int guideId,
      String startDate,
      String status,
      String paymentStatus,
      double proposedPricePerDay,
      double accommodationCost,
      Map<String, String> accommodationPreferences,
      String transportSuggestion,
      String routeSuggestion,
      boolean isExtended,
      Instant createdAt
  ) {}

  public record BookingExtensionRequest(
      int additionalDays,
      String reason
  ) {}
}

