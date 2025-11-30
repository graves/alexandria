#!/usr/bin/env python3
"""
Search API for Great Books using Elasticsearch.
"""

import os
import re
from flask import Flask, request, jsonify
from flask_cors import CORS
from elasticsearch import Elasticsearch

app = Flask(__name__)
CORS(app)

ELASTICSEARCH_URL = os.environ.get('ELASTICSEARCH_URL', 'http://localhost:9200')
INDEX_NAME = 'greatbooks'

es = Elasticsearch([ELASTICSEARCH_URL])

def find_best_anchor(query, sections):
    """Find the section that best matches the query and return its anchor."""
    if not sections:
        return None

    query_lower = query.lower()
    query_words = set(query_lower.split())

    best_match = None
    best_score = 0

    for section in sections:
        content = (section.get('heading', '') + ' ' + section.get('content', '')).lower()
        # Count how many query words appear in this section
        score = sum(1 for word in query_words if word in content)
        if score > best_score:
            best_score = score
            best_match = section.get('anchor')

    return best_match if best_score > 0 else None

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('q', '')
    limit = int(request.args.get('limit', 20))

    if not query:
        return jsonify({'results': [], 'total': 0})

    body = {
        "query": {
            "multi_match": {
                "query": query,
                "fields": ["title^3", "content", "volume_title", "sections.heading^2", "sections.content"],
                "type": "best_fields",
                "fuzziness": "AUTO"
            }
        },
        "highlight": {
            "fields": {
                "content": {
                    "fragment_size": 200,
                    "number_of_fragments": 3,
                    "max_analyzed_offset": 500000
                },
                "title": {}
            },
            "pre_tags": ["<mark>"],
            "post_tags": ["</mark>"]
        },
        "size": limit,
        "_source": ["title", "path", "volume", "volume_title", "chapter", "sections"]
    }

    try:
        response = es.search(index=INDEX_NAME, body=body)

        results = []
        for hit in response['hits']['hits']:
            source = hit['_source']
            highlight = hit.get('highlight', {})

            # Find the best matching section anchor
            sections = source.get('sections', [])
            anchor = find_best_anchor(query, sections)

            result = {
                'title': source.get('title', ''),
                'path': source.get('path', ''),
                'volume': source.get('volume', ''),
                'volume_title': source.get('volume_title', ''),
                'chapter': source.get('chapter'),
                'anchor': anchor,
                'score': hit['_score'],
                'highlights': highlight.get('content', []),
                'title_highlight': highlight.get('title', [source.get('title', '')])
            }
            results.append(result)

        return jsonify({
            'results': results,
            'total': response['hits']['total']['value']
        })

    except Exception as e:
        return jsonify({'error': str(e), 'results': [], 'total': 0}), 500

@app.route('/health', methods=['GET'])
def health():
    try:
        if es.ping():
            return jsonify({'status': 'healthy', 'elasticsearch': 'connected'})
        else:
            return jsonify({'status': 'unhealthy', 'elasticsearch': 'disconnected'}), 503
    except Exception as e:
        return jsonify({'status': 'unhealthy', 'error': str(e)}), 503

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001)
