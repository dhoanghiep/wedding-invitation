// Component Loader - Loads header and footer from separate files
(function () {
    'use strict';

    // Track loaded components
    let loadedComponents = 0;
    const totalComponents = 2;

    // Load component from file and insert into placeholder
    async function loadComponent(placeholderId, componentFile) {
        const placeholder = document.getElementById(placeholderId);
        if (!placeholder) {
            console.warn(`Placeholder with id "${placeholderId}" not found`);
            loadedComponents++;
            checkAllLoaded();
            return;
        }

        try {
            const response = await fetch(componentFile);
            if (!response.ok) {
                throw new Error(`Failed to load ${componentFile}: ${response.statusText}`);
            }
            const html = await response.text();
            placeholder.outerHTML = html;

            // Dispatch custom event when component is loaded
            const event = new CustomEvent('componentLoaded', {
                detail: { component: placeholderId, file: componentFile }
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

