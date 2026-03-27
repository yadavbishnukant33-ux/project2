# Gantavya Setup Guide

## Prerequisites

### Java 21
```powershell
# Check if installed
java -version

# If not installed, download from:
# https://www.oracle.com/java/technologies/downloads/#java21
```

### Maven
```powershell
# Check if installed
mvn -version

# If not installed:
# Windows: choco install maven
# Or download from: https://maven.apache.org/download.cgi
```

### MongoDB
Choose one option:

#### Option 1: Local MongoDB (Recommended for development)
1. Download from https://www.mongodb.com/try/download/community
2. Install and start MongoDB
3. Default URI: `mongodb://localhost:27017/gantavya`

#### Option 2: Docker (Easiest)
```powershell
# Start MongoDB in Docker
docker run -d -p 27017:27017 --name mongodb mongo

# Stop it later with:
docker stop mongodb
```

#### Option 3: MongoDB Atlas (Cloud)
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster and get your connection string
3. Update `backend/src/main/resources/application.yml`:
   ```yaml
   spring:
     data:
       mongodb:
         uri: your_mongodb_atlas_connection_string
   ```

## Running the Project

### Terminal 1: Backend (Java/Spring Boot)
```powershell
cd backend
mvn spring-boot:run
```
Backend will run at: `http://localhost:8080`

### Terminal 2: Frontend (Node.js/React)
```powershell
npm i              # Install dependencies if not done
npm run dev        # Start Vite dev server
```
Frontend will run at: `http://localhost:5173` (or shown in console)

## API Endpoints

All endpoints on `http://localhost:8080/api`:

- `GET /treks` - List all treks
- `GET /treks/{trekId}` - Trek details
- `GET /treks/{trekId}/guides` - Guides for a trek
- `GET /guides/{guideId}` - Guide profile
- `POST /booking-requests` - Create booking request
- `GET /guide/{guideId}/booking-requests` - Guide's bookings
- `POST /booking-requests/{bookingId}/decision` - Accept/decline booking

## Troubleshooting

### Backend won't start
- Check Java version: `java -version` (should be 21)
- Check Maven: `mvn -version`
- Check MongoDB is running (if using local): `mongosh` should connect

### Frontend can't connect to backend
- Ensure backend is running on port 8080
- CORS is configured in backend (check `CorsConfig.java`)

### MongoDB connection errors
- If using local: Start MongoDB service
- If using Docker: `docker start mongodb`
- If using Atlas: Check connection string is correct

## Project Structure

```
Gantavya/
├── backend/              (Spring Boot API)
│   ├── pom.xml          (Maven dependencies)
│   └── src/
│       └── main/
│           ├── java/    (Java code)
│           └── resources/
│               └── application.yml (Config)
└── src/                 (React frontend)
    ├── app/
    │   ├── components/  (React components)
    │   └── api/        (API calls)
    └── styles/
```
