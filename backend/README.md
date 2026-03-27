# Gantavya Backend (Spring Boot)

This is the backend scaffold for the hackathon demo.

## Run

1. Start MongoDB (optional for now)
   - Default URI: `mongodb://localhost:27017/gantavya`
2. Start the server
   - If you have Maven installed:
     - `mvn spring-boot:run`
   - Server runs on: `http://localhost:8080`

## API (current demo)

All responses are currently seeded sample data (so the React UI becomes dynamic immediately).

- `GET /api/treks`
- `GET /api/treks/{trekId}`
- `GET /api/treks/{trekId}/guides`
- `GET /api/guides/{guideId}`
- `POST /api/booking-requests` (creates a pending booking request)
- `GET /api/guide/{guideId}/booking-requests` (guide dashboard)
- `POST /api/booking-requests/{bookingId}/decision` (accept/decline)

