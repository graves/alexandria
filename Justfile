# Alexandria - Great Books of the Western World
# Justfile for orchestration

set dotenv-load := false

compose := "docker compose -f docker-compose.prod.yml"

# List available commands
default:
    @just --list

# Start all services
up:
    {{compose}} up -d

# Stop all services
down:
    {{compose}} down

# Restart all services
restart:
    {{compose}} restart

# View logs (follow mode)
logs *args:
    {{compose}} logs -f {{args}}

# Show service status
status:
    {{compose}} ps

# Pull latest images and restart
update:
    {{compose}} pull
    {{compose}} up -d

# Re-index content (run after adding new books)
reindex:
    {{compose}} up indexer

# Build custom images
build:
    {{compose}} build

# Health check
health:
    @curl -sf http://127.0.0.1:3001/health && echo "API: OK" || echo "API: FAILED"
    @curl -sf http://127.0.0.1:3000 > /dev/null && echo "mdbook: OK" || echo "mdbook: FAILED"
    @curl -sf http://127.0.0.1:8000 > /dev/null && echo "Plausible: OK" || echo "Plausible: FAILED"

# Show Elasticsearch index stats
index-stats:
    @curl -s http://127.0.0.1:9200/_cat/indices?v 2>/dev/null || echo "Elasticsearch not exposed locally"

# Create Plausible admin user
plausible-create-admin email name:
    docker exec -it alexandria-plausible /entrypoint.sh create-admin --email {{email}} --name "{{name}}"

# Open Plausible shell for management commands
plausible-shell:
    docker exec -it alexandria-plausible /bin/sh

# Clean up unused Docker resources
clean:
    docker system prune -f

# Full reset (WARNING: destroys all data)
reset:
    {{compose}} down -v
    docker system prune -f
