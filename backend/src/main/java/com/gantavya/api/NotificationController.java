package com.gantavya.api;

import com.gantavya.domain.NotificationDocument;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/guides")
public class NotificationController {

  private final NotificationRepository notificationRepository;

  public NotificationController(NotificationRepository notificationRepository) {
    this.notificationRepository = notificationRepository;
  }

  @GetMapping("/{guideId}/notifications")
  public ResponseEntity<List<NotificationDocument>> getNotifications(@PathVariable String guideId) {
    return ResponseEntity.ok(notificationRepository.findByGuideId(guideId));
  }

  @PostMapping("/{guideId}/notifications")
  public ResponseEntity<NotificationDocument> addNotification(
      @PathVariable String guideId,
      @RequestBody NotificationDocument notification
  ) {
    notification.setGuideId(guideId);
    NotificationDocument saved = notificationRepository.save(notification);
    return ResponseEntity.ok(saved);
  }

  @PostMapping("/{guideId}/notifications/{notificationId}/read")
  public ResponseEntity<NotificationDocument> markAsRead(
      @PathVariable String guideId,
      @PathVariable String notificationId
  ) {
    NotificationDocument notification = notificationRepository.findById(notificationId)
        .orElseThrow(() -> new IllegalArgumentException("Notification not found"));
    if (!guideId.equals(notification.getGuideId())) {
      throw new IllegalArgumentException("Notification does not belong to this guide");
    }
    notification.setRead(true);
    NotificationDocument saved = notificationRepository.save(notification);
    return ResponseEntity.ok(saved);
  }
}
