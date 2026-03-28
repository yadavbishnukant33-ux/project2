package com.gantavya.domain;

public class GuideRequest {
    private String id;
    private String userId;
    private String trekId;
    private String status; // pending, accepted, declined
    private String date;
    private String message;

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getTrekId() { return trekId; }
    public void setTrekId(String trekId) { this.trekId = trekId; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}