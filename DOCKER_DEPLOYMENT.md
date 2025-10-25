# Docker Deployment Guide

This guide explains how to build and deploy the Statement Viewer application using Docker and Docker Compose.

## Prerequisites

- Docker installed on your system
- Docker Compose installed on your system

## Quick Start

### 1. Build and Run with Docker Compose

```bash
# Build and start the application
docker-compose up --build

# Or run in detached mode (background)
docker-compose up --build -d
```

### 2. Access the Application

Once the container is running, you can access the application at:
- **URL**: http://localhost:3000

### 3. Stop the Application

```bash
# Stop the application
docker-compose down

# Stop and remove volumes (if any)
docker-compose down -v
```

## Manual Docker Commands

If you prefer to use Docker directly without Docker Compose:

### Build the Image

```bash
# Build the Docker image
docker build -t statement-viewer .

# Build with a specific tag
docker build -t statement-viewer:latest .
```

### Run the Container

```bash
# Run the container
docker run -p 3000:3000 --name statement-viewer-app statement-viewer

# Run in detached mode
docker run -d -p 3000:3000 --name statement-viewer-app statement-viewer

# Run with environment variables
docker run -d -p 3000:3000 -e NODE_ENV=production --name statement-viewer-app statement-viewer
```

### Container Management

```bash
# View running containers
docker ps

# View all containers (including stopped)
docker ps -a

# Stop the container
docker stop statement-viewer-app

# Remove the container
docker rm statement-viewer-app

# Remove the image
docker rmi statement-viewer
```

## Environment Variables

The application supports the following environment variables:

- `NODE_ENV`: Set to `production` for production builds
- `PORT`: Port number for the application (default: 3000)

To set environment variables:

### With Docker Compose

Create a `.env` file in the project root:

```bash
NODE_ENV=production
PORT=3000
```

### With Docker Run

```bash
docker run -d -p 3000:3000 -e NODE_ENV=production -e PORT=3000 --name statement-viewer-app statement-viewer
```

## Production Deployment

For production deployment, consider the following:

### 1. Use a Reverse Proxy

Use nginx or another reverse proxy in front of your application:

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  statement-viewer:
    build:
      context: .
      dockerfile: Dockerfile
    environment:
      - NODE_ENV=production
      - PORT=3000
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - statement-viewer
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

### 2. Use Docker Secrets

For sensitive data, use Docker secrets:

```bash
# Create a secret
echo "your-secret-value" | docker secret create my_secret -

# Use in docker-compose.yml
services:
  statement-viewer:
    secrets:
      - my_secret
```

### 3. Health Checks

The Docker Compose file includes health checks. Monitor container health:

```bash
# Check container health
docker ps

# View health check logs
docker inspect statement-viewer-app | grep -A 10 Health
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Find what's using port 3000
   lsof -i :3000
   
   # Kill the process or use a different port
   docker-compose up --build -p 3001:3000
   ```

2. **Build Failures**
   ```bash
   # Clean Docker cache
   docker system prune -a
   
   # Rebuild without cache
   docker-compose build --no-cache
   ```

3. **Container Won't Start**
   ```bash
   # Check container logs
   docker-compose logs statement-viewer
   
   # Or with Docker directly
   docker logs statement-viewer-app
   ```

### Debugging

```bash
# Run container interactively
docker run -it --rm statement-viewer /bin/sh

# Execute commands in running container
docker exec -it statement-viewer-app /bin/sh
```

## Development vs Production

### Development

```bash
# Run in development mode (if you have a dev Dockerfile)
docker-compose -f docker-compose.dev.yml up --build
```

### Production

```bash
# Run in production mode
docker-compose -f docker-compose.yml up --build -d
```

## Monitoring and Logs

```bash
# View logs
docker-compose logs -f statement-viewer

# View logs with timestamps
docker-compose logs -f -t statement-viewer

# View resource usage
docker stats statement-viewer-app
```

## Backup and Restore

```bash
# Save image to file
docker save statement-viewer > statement-viewer.tar

# Load image from file
docker load < statement-viewer.tar
```
