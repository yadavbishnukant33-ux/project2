package com.gantavya.domain;

import java.time.Instant;

public class BookingDtos {

  public enum BookingDecision {
    accept,
    decline
  }

  public record CreateBookingRequest(
      String touristId,
      int trekId,
      int guideId
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
      String status,
      double proposedPricePerDay,
      Instant createdAt
  ) {}
}

