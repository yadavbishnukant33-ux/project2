package com.gantavya.domain;

import java.util.List;

public class CatalogDtos {
  public record TrekCheckpoint(
      int id,
      String name,
      String altitude,
      String type,
      double x,
      double y,
      String info
  ) {}

  public record TrekItineraryItem(
      int day,
      String title,
      String description
  ) {}

  public record Trek(
      int id,
      String name,
      String image,
      String difficulty,
      String duration,
      String cost,
      String altitude,
      String region,
      String description,
      String bestSeason,
      List<String> highlights,
      List<TrekItineraryItem> itinerary,
      List<TrekCheckpoint> checkpoints
  ) {}

  public record GuideReview(
      int id,
      String name,
      String country,
      double rating,
      String date,
      String comment
  ) {}

  public record GuideAvailabilityDay(
      int day,
      boolean available
  ) {}

  public record Guide(
      int id,
      String name,
      String photo,
      String coverPhoto,
      String experience,
      List<String> languages,
      double rating,
      int reviewsCount,
      int pricePerDay,
      boolean negotiable,
      String location,
      String bio,
      String specialization,
      List<String> certifications,
      List<String> treks,
      int totalTrips,
      boolean verified,
      boolean includesAccommodation,
      boolean includesMeals,
      boolean porterOptional,
      List<GuideAvailabilityDay> availability,
      List<GuideReview> reviews
  ) {}
}

