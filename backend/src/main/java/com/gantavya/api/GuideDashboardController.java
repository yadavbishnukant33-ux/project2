package com.gantavya.api;

import com.gantavya.domain.BookingDtos.BookingRequestResponse;
import com.gantavya.domain.BookingRequestDocument;
import com.gantavya.domain.CatalogDtos;
import com.gantavya.domain.Guide;
import com.gantavya.seed.SeedData;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/guides")
public class GuideDashboardController {

  private final BookingRepository bookingRepository;
  private final GuideProfileRepository guideProfileRepository;

  public GuideDashboardController(
      BookingRepository bookingRepository,
      GuideProfileRepository guideProfileRepository
  ) {
    this.bookingRepository = bookingRepository;
    this.guideProfileRepository = guideProfileRepository;
  }

  @GetMapping("/{guideId}/requests")
  public ResponseEntity<List<BookingRequestResponse>> getRequests(@PathVariable int guideId) {
    return ResponseEntity.ok(
        bookingRepository.findByGuideId(guideId).stream().map(this::toResponse).toList()
    );
  }

  @PostMapping("/{guideId}/requests/{requestId}/accept")
  public ResponseEntity<BookingRequestResponse> acceptRequest(
      @PathVariable int guideId,
      @PathVariable String requestId
  ) {
    BookingRequestDocument doc = bookingRepository.findById(requestId)
        .orElseThrow(() -> new IllegalArgumentException("Booking not found: " + requestId));
    if (doc.getGuideId() != guideId) {
      throw new IllegalArgumentException("Guide mismatch");
    }
    doc.setStatus("confirmed");
    doc.setDecisionAt(Instant.now());
    return ResponseEntity.ok(toResponse(bookingRepository.save(doc)));
  }

  @PostMapping("/{guideId}/requests/{requestId}/decline")
  public ResponseEntity<BookingRequestResponse> declineRequest(
      @PathVariable int guideId,
      @PathVariable String requestId
  ) {
    BookingRequestDocument doc = bookingRepository.findById(requestId)
        .orElseThrow(() -> new IllegalArgumentException("Booking not found: " + requestId));
    if (doc.getGuideId() != guideId) {
      throw new IllegalArgumentException("Guide mismatch");
    }
    doc.setStatus("rejected");
    doc.setDecisionAt(Instant.now());
    return ResponseEntity.ok(toResponse(bookingRepository.save(doc)));
  }

  @GetMapping("/{guideId}/bookings")
  public ResponseEntity<List<BookingRequestResponse>> getBookings(@PathVariable int guideId) {
    return ResponseEntity.ok(
        bookingRepository.findByGuideId(guideId).stream()
            .filter(doc -> "confirmed".equalsIgnoreCase(doc.getStatus()))
            .map(this::toResponse)
            .toList()
    );
  }

  @PutMapping("/{guideId}/profile")
  public ResponseEntity<Guide> updateProfile(@PathVariable String guideId, @RequestBody Guide updated) {
    updated.setId(guideId);
    Guide saved = guideProfileRepository.save(updated);
    return ResponseEntity.ok(saved);
  }

  @GetMapping("/{guideId}/profile")
  public ResponseEntity<Guide> getProfile(@PathVariable String guideId) {
    return ResponseEntity.of(guideProfileRepository.findById(guideId));
  }

  private BookingRequestResponse toResponse(BookingRequestDocument doc) {
    CatalogDtos.Trek trek = SeedData.treks().stream()
        .filter(t -> t.id() == doc.getTrekId())
        .findFirst()
        .orElseThrow(() -> new IllegalArgumentException("Trek not found: " + doc.getTrekId()));

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
        doc.getAccommodationPreferences() != null ? doc.getAccommodationPreferences().size() * 20.0 : 0.0,
        doc.getAccommodationPreferences(),
        doc.getTransportSuggestion() != null ? doc.getTransportSuggestion() : "Transfer taxi to trek entry.",
        doc.getRouteSuggestion() != null ? doc.getRouteSuggestion() : "Classic trek route with acclimatization stops.",
        false,
        doc.getCreatedAt()
    );
  }
}
