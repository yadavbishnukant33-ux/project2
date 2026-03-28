package com.gantavya.api;

import com.gantavya.domain.CatalogDtos.Notification;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.*;

@RestController
@RequestMapping("/api/guides-legacy")
public class GuideNotificationController {
    // Dummy in-memory notifications for demo
    private static final Map<String, List<Notification>> notifications = new HashMap<>();

    @GetMapping("/{guideId}/notifications")
    public ResponseEntity<List<Notification>> getNotifications(@PathVariable String guideId) {
        return ResponseEntity.ok(notifications.getOrDefault(guideId, new ArrayList<>()));
    }

    @PostMapping("/{guideId}/notifications")
    public ResponseEntity<Void> addNotification(@PathVariable String guideId, @RequestBody Notification notification) {
        notifications.computeIfAbsent(guideId, k -> new ArrayList<>()).add(notification);
        return ResponseEntity.ok().build();
    }
}