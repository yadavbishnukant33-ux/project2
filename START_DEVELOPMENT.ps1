# Gantavya Development Startup Script
# This script helps you start both backend and frontend

Write-Host "========================================" -ForegroundColor Green
Write-Host "Gantavya Development Environment Setup" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Check Java
Write-Host "`nChecking Java..." -ForegroundColor Yellow
try {
    $javaVersion = java -version 2>&1
    Write-Host "✓ Java is installed: $($javaVersion[0])" -ForegroundColor Green
} catch {
    Write-Host "✗ Java is NOT installed. Install Java 21 from: https://www.oracle.com/java/technologies/downloads/#java21" -ForegroundColor Red
    exit
}

# Check Maven
Write-Host "`nChecking Maven..." -ForegroundColor Yellow
try {
    $mvnVersion = mvn -version 2>&1 | Select-Object -First 1
    Write-Host "✓ Maven is installed: $mvnVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Maven is NOT installed. Install with: choco install maven" -ForegroundColor Red
    exit
}

# Check MongoDB
Write-Host "`nChecking MongoDB..." -ForegroundColor Yellow
try {
    $mongoTest = mongosh --version 2>&1
    Write-Host "✓ MongoDB CLI is available" -ForegroundColor Green
} catch {
    Write-Host "⚠ MongoDB CLI not found. Make sure MongoDB is running!" -ForegroundColor Yellow
}

# Ask about MongoDB setup
Write-Host "`nMongoDB Setup Options:" -ForegroundColor Cyan
Write-Host "1. Use local MongoDB (must be running)"
Write-Host "2. Use Docker (requires Docker to be installed)"
Write-Host "3. Skip (use existing MongoDB)"
$choice = Read-Host "Enter choice (1/2/3)"

if ($choice -eq "2") {
    Write-Host "`nStarting MongoDB with Docker..." -ForegroundColor Yellow
    docker run -d -p 27017:27017 --name gantavya-mongodb mongo
    Write-Host "✓ MongoDB started in Docker" -ForegroundColor Green
    Start-Sleep -Seconds 2
}

# Start Backend
Write-Host "`nStarting Backend (Spring Boot)..." -ForegroundColor Cyan
Write-Host "Opening new terminal for backend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit -Command `"Set-Location '$PSScriptRoot\backend'; mvn spring-boot:run`""

Start-Sleep -Seconds 3

# Install Frontend Dependencies
Write-Host "`nProcessing Frontend dependencies..." -ForegroundColor Cyan
if (-Not (Test-Path "node_modules")) {
    Write-Host "Installing npm packages..." -ForegroundColor Yellow
    npm install
}

# Start Frontend
Write-Host "`nStarting Frontend (Vite)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit -Command `"npm run dev`""

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "✓ Both servers starting in new terminals!" -ForegroundColor Green
Write-Host "`nBackend: http://localhost:8080" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Green
