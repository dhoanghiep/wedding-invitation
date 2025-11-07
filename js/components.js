// Component Loader - Loads header and footer from separate files
(function () {
    'use strict';

    // Track loaded components
    let loadedComponents = 0;
    const totalComponents = 2;
    
    // Cache key prefix for sessionStorage
    const CACHE_PREFIX = 'component_cache_';
    const CACHE_VERSION = '1.0'; // Increment to invalidate cache

    // Load component from file and insert into placeholder
    async function loadComponent(placeholderId, componentFile) {
        const placeholder = document.getElementById(placeholderId);
        if (!placeholder) {
            console.warn(`Placeholder with id "${placeholderId}" not found`);
            loadedComponents++;
            checkAllLoaded();
            return;
        }

        // Check cache first
        const cacheKey = CACHE_PREFIX + componentFile + '_' + CACHE_VERSION;
        const cachedHtml = sessionStorage.getItem(cacheKey);
        
        if (cachedHtml) {
            // Use cached HTML immediately (synchronously)
            placeholder.outerHTML = cachedHtml;
            
            // Dispatch custom event when component is loaded
            const event = new CustomEvent('componentLoaded', {
                detail: { component: placeholderId, file: componentFile, cached: true }
            });
            document.dispatchEvent(event);
            
            loadedComponents++;
            checkAllLoaded();
            return;
        }

        // If not cached, fetch from server
        try {
            const response = await fetch(componentFile);
            if (!response.ok) {
                throw new Error(`Failed to load ${componentFile}: ${response.statusText}`);
            }
            const html = await response.text();
            
            // Cache the HTML for future use
            try {
                sessionStorage.setItem(cacheKey, html);
            } catch (e) {
                // If sessionStorage is full or unavailable, continue without caching
                console.warn('Could not cache component:', e);
            }
            
            placeholder.outerHTML = html;

            // Dispatch custom event when component is loaded
            const event = new CustomEvent('componentLoaded', {
                detail: { component: placeholderId, file: componentFile, cached: false }
            });
            document.dispatchEvent(event);

            loadedComponents++;
            checkAllLoaded();
        } catch (error) {
            console.error(`Error loading component ${componentFile}:`, error);
            // Show error message in placeholder
            placeholder.innerHTML = `<div style="padding: 20px; text-align: center; color: #999;">Error loading ${componentFile}</div>`;
            loadedComponents++;
            checkAllLoaded();
        }
    }

    // Check if all components are loaded and dispatch ready event
    function checkAllLoaded() {
        if (loadedComponents >= totalComponents) {
            // Dispatch event when all components are loaded
            const readyEvent = new CustomEvent('componentsReady');
            document.dispatchEvent(readyEvent);
        }
    }

    // Load all components when DOM is ready
    function initComponents() {
        loadComponent('header-placeholder', 'header.html');
        loadComponent('footer-placeholder', 'footer.html');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initComponents);
    } else {
        initComponents();
    }
})();

