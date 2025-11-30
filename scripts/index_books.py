#!/usr/bin/env python3
"""
Index all markdown files into Elasticsearch for full-text search.
"""

import os
import re
import json
import time
from pathlib import Path
from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk

ELASTICSEARCH_URL = os.environ.get('ELASTICSEARCH_URL', 'http://localhost:9200')
INDEX_NAME = 'greatbooks'

def wait_for_elasticsearch(es, max_retries=30):
    """Wait for Elasticsearch to be ready."""
    for i in range(max_retries):
        try:
            if es.ping():
                print("Elasticsearch is ready!")
                return True
        except Exception as e:
            print(f"Waiting for Elasticsearch... ({i+1}/{max_retries})")
        time.sleep(2)
    raise Exception("Elasticsearch not available")

def create_index(es):
    """Create the index with appropriate mappings."""
    mapping = {
        "settings": {
            "number_of_shards": 1,
            "number_of_replicas": 0,
            "analysis": {
                "analyzer": {
                    "content_analyzer": {
                        "type": "custom",
                        "tokenizer": "standard",
                        "filter": ["lowercase", "snowball"]
                    }
                }
            }
        },
        "mappings": {
            "properties": {
                "title": {
                    "type": "text",
                    "analyzer": "content_analyzer"
                },
                "volume": {
                    "type": "keyword"
                },
                "volume_title": {
                    "type": "text"
                },
                "content": {
                    "type": "text",
                    "analyzer": "content_analyzer"
                },
                "path": {
                    "type": "keyword"
                },
                "chapter": {
                    "type": "keyword"
                },
                "sections": {
                    "type": "nested",
                    "properties": {
                        "heading": {"type": "text", "analyzer": "content_analyzer"},
                        "anchor": {"type": "keyword"},
                        "content": {"type": "text", "analyzer": "content_analyzer"}
                    }
                }
            }
        }
    }

    if es.indices.exists(index=INDEX_NAME):
        print(f"Deleting existing index '{INDEX_NAME}'...")
        es.indices.delete(index=INDEX_NAME)

    print(f"Creating index '{INDEX_NAME}'...")
    es.indices.create(index=INDEX_NAME, body=mapping)

def extract_title_from_content(content):
    """Extract the title from markdown content (first H1)."""
    match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
    if match:
        return match.group(1).strip()
    return None

def extract_sections(content):
    """Extract sections with their headings and anchors for better search navigation."""
    sections = []
    # Match markdown headings (## or ###)
    heading_pattern = re.compile(r'^(#{1,4})\s+(.+)$', re.MULTILINE)

    matches = list(heading_pattern.finditer(content))

    for i, match in enumerate(matches):
        level = len(match.group(1))
        title = match.group(2).strip()
        start = match.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(content)

        # Create anchor slug (similar to mdbook's algorithm)
        anchor = title.lower()
        anchor = re.sub(r'[^\w\s-]', '', anchor)  # Remove special chars
        anchor = re.sub(r'\s+', '-', anchor)  # Replace spaces with hyphens

        section_content = content[start:end].strip()

        if section_content:  # Only add if there's content
            sections.append({
                'heading': title,
                'anchor': anchor,
                'content': section_content[:2000],  # Limit section size
                'level': level
            })

    return sections

def parse_volume_info(filepath):
    """Extract volume information from filepath."""
    parts = filepath.parts
    for part in parts:
        if part.startswith('Volume_'):
            # Parse volume name like "Volume_07_-_Plato"
            match = re.match(r'Volume_(\d+)(?:_and_\d+)?_-_(.+)', part)
            if match:
                return match.group(1), match.group(2).replace('_', ' ')
            # Handle special cases like "Volume_02_and_03_Synopticon"
            match = re.match(r'Volume_(\d+)_and_(\d+)_(.+)', part)
            if match:
                return f"{match.group(1)}-{match.group(2)}", match.group(3).replace('_', ' ')
    return None, None

def generate_documents(src_path):
    """Generate documents for bulk indexing."""
    src = Path(src_path)

    for md_file in src.rglob('*.md'):
        if md_file.name == 'SUMMARY.md':
            continue

        try:
            content = md_file.read_text(encoding='utf-8')
        except Exception as e:
            print(f"Error reading {md_file}: {e}")
            continue

        # Get relative path for URL
        rel_path = md_file.relative_to(src)
        html_path = str(rel_path).replace('.md', '.html')

        # Extract title
        title = extract_title_from_content(content)
        if not title:
            title = md_file.stem.replace('_', ' ')

        # Extract volume info
        volume_num, volume_title = parse_volume_info(md_file)

        # Determine if it's a chapter (for Synopticon)
        chapter = None
        if 'Chapter_' in md_file.name:
            chapter_match = re.search(r'Chapter_(\d+)', md_file.name)
            if chapter_match:
                chapter = chapter_match.group(1)

        # Extract sections for anchor navigation
        sections = extract_sections(content)

        doc = {
            '_index': INDEX_NAME,
            '_id': str(rel_path),
            '_source': {
                'title': title,
                'volume': volume_num,
                'volume_title': volume_title,
                'content': content,
                'path': html_path,
                'chapter': chapter,
                'sections': sections
            }
        }

        yield doc

def main():
    print(f"Connecting to Elasticsearch at {ELASTICSEARCH_URL}...")
    es = Elasticsearch([ELASTICSEARCH_URL])

    wait_for_elasticsearch(es)
    create_index(es)

    src_path = os.environ.get('SRC_PATH', '/app/src')
    print(f"Indexing documents from {src_path}...")

    success, errors = bulk(es, generate_documents(src_path), raise_on_error=False, chunk_size=50)

    print(f"Indexed {success} documents")
    if errors:
        print(f"Errors: {len(errors)}")
        for error in errors[:5]:
            print(f"  {error}")

    # Refresh index
    es.indices.refresh(index=INDEX_NAME)

    # Print stats
    count = es.count(index=INDEX_NAME)
    print(f"Total documents in index: {count['count']}")

if __name__ == '__main__':
    main()
