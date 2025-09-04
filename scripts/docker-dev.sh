#!/bin/bash
# Docker development script for Linux/WSL/macOS
echo "Starting Docker container for development..."
echo "Current directory: $(pwd)"
docker run -p 3000:3000 --env-file .env.development.local -v "$(pwd):/app" -v /app/node_modules thinktapfast-blog-dev