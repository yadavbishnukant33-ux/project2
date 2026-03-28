package com.gantavya.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("notifications")
public class NotificationDocument {

  @Id
  private String id;
  private String guideId;
  private String type;
  private String title;
  private String message;
  private long createdAt;
  private boolean read;

  public NotificationDocument() {}

  public NotificationDocument(String guideId, String type, String title, String message) {
    this.guideId = guideId;
    this.type = type;
    this.title = title;
    this.message = message;
    this.createdAt = System.currentTimeMillis();
    this.read = false;
  }

  public String getId() {
    return id;
  }

  public String getGuideId() {
    return guideId;
  }

  public void setGuideId(String guideId) {
    this.guideId = guideId;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public long getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(long createdAt) {
    this.createdAt = createdAt;
  }

  public boolean isRead() {
    return read;
  }

  public void setRead(boolean read) {
    this.read = read;
  }
}
