# Production Deployment

Deploy Alexandria to a Debian VPS with systemd and an existing Caddy reverse proxy.

## Prerequisites

- Docker and Docker Compose installed
- [just](https://github.com/casey/just) command runner installed
- Caddy already running on the server
- DNS A record for `alexandria.awfulsec.com` pointing to your VPS

### Installing just

```bash
# Debian/Ubuntu
curl -sSf https://just.systems/install.sh | sudo bash -s -- --to /usr/bin

# Or via cargo
cargo install just
```

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

### 4. Set up Plausible Analytics

After the first start, create an admin user for the Plausible dashboard:

```bash
cd /opt/alexandria
just plausible-create-admin you@example.com "Your Name"
```

Then visit `https://alexandria.awfulsec.com/plausible/` to log in and add your site.

### 5. Verify the deployment

```bash
cd /opt/alexandria

# Check service status
sudo systemctl status alexandria

# Check container status
just status

# Check all services are healthy
just health

# Check indexer logs (runs once on startup)
just logs indexer
```

## Management Commands

All commands should be run from `/opt/alexandria`:

```bash
# List all available commands
just

# View logs (all services)
just logs

# View logs for specific service
just logs search-api

# Check service status
just status

# Health check all services
just health

# Restart all services
sudo systemctl restart alexandria

# Stop all services
sudo systemctl stop alexandria

# Re-index content (after adding new books)
just reindex

# Update containers (pull latest and restart)
sudo systemctl reload alexandria
# Or directly:
just update

# Build custom images after code changes
just build
```

## Plausible Analytics Commands

```bash
# Create admin user
just plausible-create-admin email@example.com "Admin Name"

# Access Plausible shell for management
just plausible-shell
```

## Exposed Ports

| Service    | Local Port     | Purpose                |
|------------|----------------|------------------------|
| mdbook     | 127.0.0.1:3000 | Documentation site     |
| search-api | 127.0.0.1:3001 | Search REST API        |
| plausible  | 127.0.0.1:8000 | Analytics dashboard    |

Elasticsearch and Plausible databases (PostgreSQL, ClickHouse) are not exposed externally - only accessible within the Docker network.

## Caddy Routes

| Path         | Destination     | Purpose              |
|--------------|-----------------|----------------------|
| `/search*`   | search-api:3001 | Search API           |
| `/health`    | search-api:3001 | Health check         |
| `/api/event` | plausible:8000  | Analytics ingestion  |
| `/plausible*`| plausible:8000  | Analytics dashboard  |
| `/*`         | mdbook:3000     | Main site (default)  |
