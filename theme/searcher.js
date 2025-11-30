// Custom Elasticsearch search for Great Books
(function() {
    const SEARCH_API_URL = '/search';

    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Create search modal
    function createSearchModal() {
        const modal = document.createElement('div');
        modal.id = 'es-search-modal';
        modal.innerHTML = `
            <div class="es-search-overlay"></div>
            <div class="es-search-container">
                <div class="es-search-header">
                    <input type="text" id="es-search-input" placeholder="Search Great Books..." autofocus>
                    <button id="es-search-close">&times;</button>
                </div>
                <div id="es-search-results"></div>
            </div>
        `;
        document.body.appendChild(modal);

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            #es-search-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
            }
            #es-search-modal.active {
                display: block;
            }
            .es-search-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
            }
            .es-search-container {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 90%;
                max-width: 700px;
                max-height: 80vh;
                background: var(--bg, #fff);
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                overflow: hidden;
                display: flex;
                flex-direction: column;
            }
            .es-search-header {
                display: flex;
                padding: 16px;
                border-bottom: 1px solid var(--table-border-color, #ddd);
            }
            #es-search-input {
                flex: 1;
                padding: 12px 16px;
                font-size: 18px;
                border: 2px solid var(--table-border-color, #ddd);
                border-radius: 4px;
                background: var(--bg, #fff);
                color: var(--fg, #000);
                outline: none;
            }
            #es-search-input:focus {
                border-color: var(--links, #4183c4);
            }
            #es-search-close {
                margin-left: 12px;
                padding: 8px 16px;
                font-size: 24px;
                background: none;
                border: none;
                cursor: pointer;
                color: var(--fg, #000);
            }
            #es-search-close:hover {
                color: var(--links, #4183c4);
            }
            #es-search-results {
                flex: 1;
                overflow-y: auto;
                padding: 16px;
            }
            .es-search-result {
                padding: 12px;
                margin-bottom: 8px;
                border-radius: 4px;
                border: 1px solid var(--table-border-color, #ddd);
                cursor: pointer;
                transition: background 0.2s;
            }
            .es-search-result:hover {
                background: var(--quote-bg, #f5f5f5);
            }
            .es-search-result-title {
                font-size: 16px;
                font-weight: bold;
                color: var(--links, #4183c4);
                margin-bottom: 4px;
            }
            .es-search-result-meta {
                font-size: 12px;
                color: var(--inline-code-color, #666);
                margin-bottom: 8px;
            }
            .es-search-result-highlight {
                font-size: 14px;
                color: var(--fg, #000);
                line-height: 1.5;
            }
            .es-search-result-highlight mark {
                background: #ffeb3b;
                padding: 0 2px;
                border-radius: 2px;
            }
            .es-search-loading {
                text-align: center;
                padding: 40px;
                color: var(--fg, #000);
            }
            .es-search-empty {
                text-align: center;
                padding: 40px;
                color: var(--inline-code-color, #666);
            }
            .es-search-total {
                font-size: 12px;
                color: var(--inline-code-color, #666);
                margin-bottom: 16px;
            }
        `;
        document.head.appendChild(style);

        return modal;
    }

    // Perform search
    async function performSearch(query) {
        const resultsContainer = document.getElementById('es-search-results');

        if (!query.trim()) {
            resultsContainer.innerHTML = '<div class="es-search-empty">Type to search...</div>';
            return;
        }

        resultsContainer.innerHTML = '<div class="es-search-loading">Searching...</div>';

        try {
            const response = await fetch(`${SEARCH_API_URL}?q=${encodeURIComponent(query)}&limit=30`);
            const data = await response.json();

            if (data.error) {
                resultsContainer.innerHTML = `<div class="es-search-empty">Search error: ${data.error}</div>`;
                return;
            }

            if (data.results.length === 0) {
                resultsContainer.innerHTML = '<div class="es-search-empty">No results found</div>';
                return;
            }

            let html = `<div class="es-search-total">${data.total} results found</div>`;

            for (const result of data.results) {
                const highlights = result.highlights.length > 0
                    ? result.highlights.join('... ')
                    : '';
                const titleHtml = result.title_highlight[0] || result.title;
                const meta = result.volume_title
                    ? `Volume ${result.volume}: ${result.volume_title}`
                    : '';

                const anchor = result.anchor ? `#${result.anchor}` : '';
                html += `
                    <div class="es-search-result" data-path="${result.path}" data-anchor="${anchor}">
                        <div class="es-search-result-title">${titleHtml}</div>
                        ${meta ? `<div class="es-search-result-meta">${meta}</div>` : ''}
                        ${highlights ? `<div class="es-search-result-highlight">${highlights}</div>` : ''}
                    </div>
                `;
            }

            resultsContainer.innerHTML = html;

            // Add click handlers
            resultsContainer.querySelectorAll('.es-search-result').forEach(el => {
                el.addEventListener('click', () => {
                    const path = el.dataset.path;
                    const anchor = el.dataset.anchor || '';
                    closeSearch();
                    // Navigate relative to root with anchor
                    window.location.href = '/' + path + anchor;
                });
            });

        } catch (error) {
            resultsContainer.innerHTML = `<div class="es-search-empty">Failed to connect to search service. Make sure docker-compose is running.</div>`;
        }
    }

    // Open/close search
    let modal;

    function openSearch() {
        if (!modal) {
            modal = createSearchModal();

            // Event listeners
            modal.querySelector('.es-search-overlay').addEventListener('click', closeSearch);
            modal.querySelector('#es-search-close').addEventListener('click', closeSearch);

            const input = modal.querySelector('#es-search-input');
            input.addEventListener('input', debounce((e) => performSearch(e.target.value), 300));
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeSearch();
            });
        }

        modal.classList.add('active');
        modal.querySelector('#es-search-input').focus();
        modal.querySelector('#es-search-results').innerHTML = '<div class="es-search-empty">Type to search...</div>';
    }

    function closeSearch() {
        if (modal) {
            modal.classList.remove('active');
            modal.querySelector('#es-search-input').value = '';
        }
    }

    // Keyboard shortcut (Ctrl+S or Cmd+S or just S)
    document.addEventListener('keydown', (e) => {
        // Open with 's' key when not in input
        if (e.key === 's' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
            e.preventDefault();
            openSearch();
        }
        // Also support Ctrl+K / Cmd+K
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openSearch();
        }
    });

    // Add search button on page load
    function addSearchButton() {
        // Hide default search elements if they exist
        const defaultSearch = document.getElementById('searchbar');
        if (defaultSearch) {
            defaultSearch.style.display = 'none';
        }
        const searchWrapper = document.getElementById('search-wrapper');
        if (searchWrapper) {
            searchWrapper.style.display = 'none';
        }

        // Don't add if already exists
        if (document.getElementById('es-search-btn')) {
            return;
        }

        // Find the icon buttons area (where theme toggle, etc. are)
        const rightButtons = document.querySelector('.right-buttons');
        const menuBar = document.querySelector('.menu-bar');

        if (rightButtons || menuBar) {
            const searchBtn = document.createElement('button');
            searchBtn.id = 'es-search-btn';
            searchBtn.className = 'icon-button';
            searchBtn.type = 'button';
            searchBtn.title = 'Search (S)';
            searchBtn.setAttribute('aria-label', 'Search');
            // Use inline SVG matching mdbook's icon style
            searchBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                <path d="M19.64 18.36l-6.24-6.24a7.52 7.52 0 10-1.28 1.28l6.24 6.24zM7.5 13.4a5.9 5.9 0 115.9-5.9 5.91 5.91 0 01-5.9 5.9z" fill="currentColor"/>
            </svg>`;
            searchBtn.addEventListener('click', openSearch);

            if (rightButtons) {
                // Insert at the beginning of right-buttons (before theme toggle)
                rightButtons.insertBefore(searchBtn, rightButtons.firstChild);
            } else if (menuBar) {
                menuBar.appendChild(searchBtn);
            }
        }
    }

    // Try on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addSearchButton);
    } else {
        addSearchButton();
    }

    // Also try on window load as backup
    window.addEventListener('load', addSearchButton);

    // Expose for external use
    window.greatbooksSearch = { open: openSearch, close: closeSearch };
})();
