package com.gantavya.api;

import com.gantavya.domain.BookingDtos;
import com.gantavya.domain.BookingDtos.*;
import com.gantavya.domain.BookingRequestDocument;
import com.gantavya.domain.CatalogDtos;
import com.gantavya.seed.SeedData;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api")
public class BookingController {

  private final BookingRepository bookingRepository;

  public BookingController(BookingRepository bookingRepository) {
    this.bookingRepository = bookingRepository;
  }

  @PostMapping("/booking-requests")
  @ResponseStatus(HttpStatus.CREATED)
  public BookingDtos.BookingRequestResponse createBooking(@RequestBody CreateBookingRequest req) {
    var now = Instant.now();

    // Use seeded guide pricing for demo consistency.
    CatalogDtos.Guide guide = SeedData.guides().stream()
        .filter(g -> g.id() == req.guideId())
        .findFirst()
        .orElseThrow(() -> new ApiBadRequest("Guide not found: " + req.guideId()));

    CatalogDtos.Trek trek = SeedData.treks().stream()
        .filter(t -> t.id() == req.trekId())
        .findFirst()
        .orElseThrow(() -> new ApiBadRequest("Trek not found: " + req.trekId()));

    // Keep the match simple for MVP: ensure the guide can do the trek.
    if (!guide.treks().contains(trek.name())) {
      throw new ApiBadRequest("Guide does not support this trek (demo validation).");
    }

    BookingRequestDocument doc = new BookingRequestDocument(
        req.touristId(),
        req.trekId(),
        req.guideId(),
        "pending",
        guide.pricePerDay(),
        now
    );
    BookingRequestDocument saved = bookingRepository.save(doc);

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
      // Idempotent: if already decided, return as-is.
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

    return new BookingRequestResponse(
        doc.getId(),
        doc.getTouristId(),
        trek.name(),
        trek.duration(),
        doc.getTrekId(),
        doc.getGuideId(),
        "",
        doc.getStatus(),
        "pending",
        doc.getProposedPricePerDay(),
        0.0,
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

