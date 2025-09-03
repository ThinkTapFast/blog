# Docker development script for PowerShell
Write-Host "Starting Docker container for development..." -ForegroundColor Green
Write-Host "Current directory: $PWD" -ForegroundColor Yellow
docker run -p 3000:3000 --env-file .env.development.local -v "${PWD}:/app" -v /app/node_modules thinktapfast-blog-dev