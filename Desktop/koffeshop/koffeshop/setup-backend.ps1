# Koffeshop Backend Setup Script

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Koffeshop Backend Setup" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the correct directory
if (!(Test-Path "artisan")) {
    Write-Host "Error: Please run this script from the Laravel root directory (koffeshop/koffeshop)" -ForegroundColor Red
    exit 1
}

# Step 1: Install dependencies
Write-Host "[1/5] Installing Composer dependencies..." -ForegroundColor Yellow
composer install

# Step 2: Setup environment
if (!(Test-Path ".env")) {
    Write-Host "[2/5] Creating .env file..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    php artisan key:generate
} else {
    Write-Host "[2/5] .env file already exists, skipping..." -ForegroundColor Green
}

# Step 3: Run migrations
Write-Host "[3/5] Running database migrations..." -ForegroundColor Yellow
php artisan migrate:fresh

# Step 4: Seed database
Write-Host "[4/5] Seeding database with sample data..." -ForegroundColor Yellow
php artisan db:seed

# Step 5: Start server
Write-Host "[5/5] Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Backend is ready!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Test credentials:" -ForegroundColor Yellow
Write-Host "  Email: admin@koffeshop.com" -ForegroundColor White
Write-Host "  Password: password" -ForegroundColor White
Write-Host ""
Write-Host "  Email: test@example.com" -ForegroundColor White
Write-Host "  Password: password" -ForegroundColor White
Write-Host ""
Write-Host "To start the server, run:" -ForegroundColor Yellow
Write-Host "  php artisan serve" -ForegroundColor White
Write-Host ""
Write-Host "API will be available at:" -ForegroundColor Yellow
Write-Host "  http://localhost:8000/api" -ForegroundColor White
Write-Host ""
Write-Host "See API_DOCUMENTATION.md for full API reference" -ForegroundColor Cyan
