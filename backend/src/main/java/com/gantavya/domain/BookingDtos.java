package com.gantavya.domain;

import java.time.Instant;
import java.util.List;

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
      String accommodationChoice
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
      boolean isExtended,
      Instant createdAt
  ) {}

  public record BookingExtensionRequest(
      int additionalDays,
      String reason
  ) {}
}

