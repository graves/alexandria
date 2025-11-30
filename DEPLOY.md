# Production Deployment

Deploy Alexandria to a Debian VPS with systemd and an existing Caddy reverse proxy.

## Prerequisites

- Docker and Docker Compose installed
- Caddy already running on the server
- DNS A record for `alexandria.awfulsec.com` pointing to your VPS

## Deployment Steps

### 1. Copy files to the server

```bash
rsync -avz --exclude='book/' --exclude='.git/' ./ user@your-vps:/opt/alexandria/
```

### 2. Add the Caddy configuration

Append the contents of `Caddyfile` to your existing Caddy configuration, then reload:

```bash
sudo systemctl reload caddy
```

### 3. Install the systemd service

```bash
sudo cp /opt/alexandria/alexandria.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable alexandria
sudo systemctl start alexandria
```

### 4. Verify the deployment

```bash
# Check service status
sudo systemctl status alexandria

# Check container status
docker compose -f /opt/alexandria/docker-compose.prod.yml ps

# Check indexer logs (runs once on startup)
docker logs alexandria-indexer

# Test the site
curl -I https://alexandria.awfulsec.com
curl https://alexandria.awfulsec.com/health
```

## Management Commands

```bash
# View logs
docker compose -f /opt/alexandria/docker-compose.prod.yml logs -f

# Restart all services
sudo systemctl restart alexandria

# Stop all services
sudo systemctl stop alexandria

# Re-index content (after adding new books)
docker compose -f /opt/alexandria/docker-compose.prod.yml up indexer

# Update containers
sudo systemctl reload alexandria
```

## Exposed Ports

| Service    | Local Port | Purpose              |
|------------|------------|----------------------|
| mdbook     | 127.0.0.1:3000 | Documentation site |
| search-api | 127.0.0.1:3001 | Search REST API    |

Elasticsearch is not exposed externally - only accessible within the Docker network.
