# Great Books - Elasticsearch Search Setup

This project uses Elasticsearch for fast full-text search across all volumes.

## Quick Start

```bash
# Start all services
docker-compose up -d

# Wait for indexing to complete (check logs)
docker-compose logs -f indexer

# Access the book at http://localhost:3000
```

## Services

| Service | Port | Description |
|---------|------|-------------|
| mdbook | 3000 | The book website |
| elasticsearch | 9200 | Search backend |
| search-api | 3001 | REST API for search |
| indexer | - | One-time indexing job |

## Using Search

1. Press `S` or `Ctrl+K` / `Cmd+K` to open search
2. Type your query
3. Click a result to navigate

## Re-indexing

If you add or modify content, re-run the indexer:

```bash
docker-compose up indexer
```

## Stopping

```bash
docker-compose down
```

To also remove the Elasticsearch data:

```bash
docker-compose down -v
```

## Development (without Docker)

1. Run Elasticsearch locally on port 9200
2. Install Python dependencies: `pip install elasticsearch flask flask-cors`
3. Index content: `python scripts/index_books.py`
4. Start search API: `python scripts/search_api.py`
5. Run mdbook: `mdbook serve`
