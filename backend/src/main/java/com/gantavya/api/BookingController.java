package com.gantavya.api;

import com.gantavya.domain.BookingDtos;
import com.gantavya.domain.BookingDtos.*;
import com.gantavya.domain.BookingRequestDocument;
import com.gantavya.domain.CatalogDtos;
import com.gantavya.domain.NotificationDocument;
import com.gantavya.api.NotificationRepository;
import com.gantavya.seed.SeedData;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class BookingController {

  private final BookingRepository bookingRepository;
  private final NotificationRepository notificationRepository;

  public BookingController(BookingRepository bookingRepository, NotificationRepository notificationRepository) {
    this.bookingRepository = bookingRepository;
    this.notificationRepository = notificationRepository;
  }

  @PostMapping("/booking-requests")
  @ResponseStatus(HttpStatus.CREATED)
  public BookingRequestResponse createBooking(@RequestBody CreateBookingRequest req) {
    var now = Instant.now();

    CatalogDtos.Guide guide = SeedData.guides().stream()
        .filter(g -> g.id() == req.guideId())
        .findFirst()
        .orElseThrow(() -> new ApiBadRequest("Guide not found: " + req.guideId()));

    CatalogDtos.Trek trek = SeedData.treks().stream()
        .filter(t -> t.id() == req.trekId())
        .findFirst()
        .orElseThrow(() -> new ApiBadRequest("Trek not found: " + req.trekId()));

    if (!guide.treks().contains(trek.name())) {
      throw new ApiBadRequest("Guide does not support this trek (demo validation).");
    }

    String startDate = req.startDate() != null && !req.startDate().isBlank() ? req.startDate() : "TBD";
    Map<String, String> accommodationPreferences = req.accommodationPreferences() != null ? req.accommodationPreferences() : Map.of();
    double accommodationCost = accommodationPreferences.size() * 20.0;

    BookingRequestDocument doc = new BookingRequestDocument(
        req.touristId(),
        req.trekId(),
        req.guideId(),
        startDate,
        accommodationPreferences,
        "pending",
        "Local jeep transfer recommended from the city to the trailhead.",
        "Standard route with acclimatization stops and lake views.",
        "pending",
        guide.pricePerDay(),
        now
    );
    BookingRequestDocument saved = bookingRepository.save(doc);

    NotificationDocument notification = new NotificationDocument(
        String.valueOf(req.guideId()),
        "Booking Request",
        "New booking request for " + trek.name(),
        "Tourist " + req.touristId() + " requested " + trek.name() + " starting " + startDate + "."
    );
    notificationRepository.save(notification);

    return toResponse(saved);
  }

  @GetMapping("/guide/{guideId}/booking-requests")
  public List<BookingRequestResponse> listForGuide(@PathVariable int guideId) {
    return bookingRepository.findByGuideId(guideId).stream()
        .map(this::toResponse)
        .toList();
  }

  @PostMapping("/booking-requests/{bookingId}/decision")
  public BookingRequestResponse decide(
      @PathVariable String bookingId,
      @RequestBody DecisionRequest req
  ) {
    BookingRequestDocument doc = bookingRepository.findById(bookingId)
        .orElseThrow(() -> new ApiBadRequest("Booking not found: " + bookingId));

    if ("confirmed".equalsIgnoreCase(doc.getStatus()) || "rejected".equalsIgnoreCase(doc.getStatus())) {
      return toResponse(doc);
    }

    if (req.decision() == BookingDecision.accept) {
      doc.setStatus("confirmed");
      doc.setDecisionAt(Instant.now());
    } else if (req.decision() == BookingDecision.decline) {
      doc.setStatus("rejected");
      doc.setDecisionAt(Instant.now());
    }

    BookingRequestDocument saved = bookingRepository.save(doc);
    return toResponse(saved);
  }

  private BookingRequestResponse toResponse(BookingRequestDocument doc) {
    CatalogDtos.Trek trek = SeedData.treks().stream()
        .filter(t -> t.id() == doc.getTrekId())
        .findFirst()
        .orElseThrow(() -> new ApiBadRequest("Trek not found: " + doc.getTrekId()));

    Map<String, String> preferences = doc.getAccommodationPreferences() != null ? doc.getAccommodationPreferences() : Map.of();
    double accommodationCost = preferences.size() * 20.0;

    return new BookingRequestResponse(
        doc.getId(),
        doc.getTouristId(),
        trek.name(),
        trek.duration(),
        doc.getTrekId(),
        doc.getGuideId(),
        doc.getStartDate() != null ? doc.getStartDate() : "TBD",
        doc.getStatus(),
        doc.getPaymentStatus() != null ? doc.getPaymentStatus() : "pending",
        doc.getProposedPricePerDay(),
        accommodationCost,
        preferences,
        doc.getTransportSuggestion() != null ? doc.getTransportSuggestion() : "Jeep transfer from city to trailhead.",
        doc.getRouteSuggestion() != null ? doc.getRouteSuggestion() : "Standard route with acclimatization stops.",
        false,
        doc.getCreatedAt()
    );
  }

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  private static class ApiBadRequest extends RuntimeException {
    ApiBadRequest(String message) {
      super(message);
    }
  }
}

