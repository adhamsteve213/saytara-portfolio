# Quick Start - Koffeshop Backend
# This script will get your backend up and running quickly

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   KOFFESHOP BACKEND - QUICK START" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to backend directory
$backendPath = "c:\Users\user\Desktop\koffeshop\koffeshop"
Set-Location $backendPath

Write-Host "✓ Current directory: $backendPath" -ForegroundColor Green
Write-Host ""

# Check for composer
Write-Host "[1] Checking Composer..." -ForegroundColor Yellow
$composerCheck = Get-Command composer -ErrorAction SilentlyContinue
if (!$composerCheck) {
    Write-Host "   ✗ Composer not found! Please install Composer first." -ForegroundColor Red
    Write-Host "   Download from: https://getcomposer.org/" -ForegroundColor Yellow
    exit 1
}
Write-Host "   ✓ Composer found" -ForegroundColor Green
Write-Host ""

# Install dependencies (if needed)
if (!(Test-Path "vendor")) {
    Write-Host "[2] Installing dependencies..." -ForegroundColor Yellow
    composer install --no-interaction
    Write-Host "   ✓ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "[2] Dependencies already installed" -ForegroundColor Green
}
Write-Host ""

# Setup .env
Write-Host "[3] Setting up environment..." -ForegroundColor Yellow
if (!(Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    php artisan key:generate
    Write-Host "   ✓ Environment file created" -ForegroundColor Green
    Write-Host "   ⚠ Please configure your database in .env file" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   Required settings:" -ForegroundColor Cyan
    Write-Host "   DB_DATABASE=koffeshop" -ForegroundColor White
    Write-Host "   DB_USERNAME=your_username" -ForegroundColor White
    Write-Host "   DB_PASSWORD=your_password" -ForegroundColor White
    Write-Host ""
    $continue = Read-Host "   Press Enter when database is configured (or 'q' to quit)"
    if ($continue -eq 'q') { exit 0 }
} else {
    Write-Host "   ✓ Environment file exists" -ForegroundColor Green
}
Write-Host ""

# Run migrations
Write-Host "[4] Setting up database..." -ForegroundColor Yellow
try {
    php artisan migrate:fresh --force 2>&1 | Out-Null
    Write-Host "   ✓ Database migrated successfully" -ForegroundColor Green
} catch {
    Write-Host "   ✗ Migration failed. Check your database connection." -ForegroundColor Red
    Write-Host "   Error: $_" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Seed database
Write-Host "[5] Populating database with sample data..." -ForegroundColor Yellow
try {
    php artisan db:seed --force
    Write-Host "   ✓ Database seeded with sample data" -ForegroundColor Green
} catch {
    Write-Host "   ✗ Seeding failed" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Success message
Write-Host "========================================" -ForegroundColor Green
Write-Host "   🎉 BACKEND SETUP COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "Test Credentials:" -ForegroundColor Cyan
Write-Host "  📧 Email: admin@koffeshop.com" -ForegroundColor White
Write-Host "  🔑 Password: password" -ForegroundColor White
Write-Host ""
Write-Host "  📧 Email: test@example.com" -ForegroundColor White
Write-Host "  🔑 Password: password" -ForegroundColor White
Write-Host ""

Write-Host "Sample Data Created:" -ForegroundColor Cyan
Write-Host "  ✓ 8 categories (Coffee, Tea, Pastries, etc.)" -ForegroundColor White
Write-Host "  ✓ 16 products (Espresso, Latte, Croissant, etc.)" -ForegroundColor White
Write-Host "  ✓ 12 users (2 test + 10 random)" -ForegroundColor White
Write-Host ""

Write-Host "Documentation:" -ForegroundColor Cyan
Write-Host "  📄 API_DOCUMENTATION.md - Full API reference" -ForegroundColor White
Write-Host "  📄 BACKEND_COMPLETE.md - Complete summary" -ForegroundColor White
Write-Host "  📄 FRONTEND_INTEGRATION.md - Frontend connection guide" -ForegroundColor White
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Ready to start the server!" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$startServer = Read-Host "Start the development server now? (y/n)"
if ($startServer -eq 'y' -or $startServer -eq 'Y') {
    Write-Host ""
    Write-Host "Starting Laravel development server..." -ForegroundColor Green
    Write-Host "API available at: http://localhost:8000/api" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
    Write-Host ""
    php artisan serve
} else {
    Write-Host ""
    Write-Host "To start the server later, run:" -ForegroundColor Yellow
    Write-Host "  cd $backendPath" -ForegroundColor White
    Write-Host "  php artisan serve" -ForegroundColor White
    Write-Host ""
}
