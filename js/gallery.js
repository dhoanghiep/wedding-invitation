// Gallery Functionality
(function() {
    'use strict';
    
    let photos = [];
    let categoryPhotos = {
        'journey': [],
        'pre-wedding': [],
        'wedding-photos': []
    };
    
    // Load photos for a specific category
    async function loadCategoryPhotos(category) {
        console.log(`[Gallery] Loading photos for category: ${category}`);
        
        // Safety check for CONFIG
        if (typeof CONFIG === 'undefined') {
            console.warn('[Gallery] CONFIG not loaded, using default photos');
            return getDefaultPhotos();
        }
        
        const source = CONFIG.PHOTO_SOURCE || 'static';
        console.log(`[Gallery] Photo source configured: ${source}`);
        let categoryPhotoList = [];
        
        switch (source) {
            case 'static':
                console.log(`[Gallery] Using STATIC photo source for category: ${category}`);
                // Use static URLs from config (local images or direct URLs)
                if (CONFIG.PHOTOS && CONFIG.PHOTOS.length > 0) {
                    console.log(`[Gallery] Found ${CONFIG.PHOTOS.length} static photos in config`);
                    categoryPhotoList = CONFIG.PHOTOS;
                } else {
                    console.warn('[Gallery] No static photos in config, using default photos');
                    categoryPhotoList = getDefaultPhotos();
                }
                break;
                
            case 'imgur':
                console.log(`[Gallery] Using IMGUR photo source for category: ${category}`);
                // Check if category-specific album ID exists
                const albumId = CONFIG.IMGUR_ALBUMS && CONFIG.IMGUR_ALBUMS[category] 
                    ? CONFIG.IMGUR_ALBUMS[category]
                    : (category === 'pre-wedding' ? CONFIG.IMGUR_ALBUM_ID : null);
                
                if (albumId) {
                    console.log(`[Gallery] Loading Imgur album with ID: ${albumId}`);
                    categoryPhotoList = await loadImgurAlbum(albumId);
                    console.log(`[Gallery] Loaded ${categoryPhotoList.length} photos from Imgur`);
                } else {
                    console.warn(`[Gallery] Imgur Album ID not configured for category: ${category}`);
                    categoryPhotoList = [];
                }
                break;
                
            case 'cloudinary':
                console.log(`[Gallery] Using CLOUDINARY photo source for category: ${category}`);
                if (CONFIG.CLOUDINARY_CLOUD_NAME) {
                    console.log(`[Gallery] Loading Cloudinary photos from: ${CONFIG.CLOUDINARY_CLOUD_NAME}/${CONFIG.CLOUDINARY_FOLDER}`);
                    categoryPhotoList = await loadCloudinaryPhotos(CONFIG.CLOUDINARY_CLOUD_NAME, CONFIG.CLOUDINARY_FOLDER);
                    console.log(`[Gallery] Loaded ${categoryPhotoList.length} photos from Cloudinary`);
                } else {
                    console.warn('[Gallery] Cloudinary configuration not set');
                    categoryPhotoList = [];
                }
                break;
                
            default:
                console.warn(`[Gallery] Unknown photo source: ${source}. Using default photos.`);
                categoryPhotoList = getDefaultPhotos();
        }
        
        // Ensure we have at least some photos
        if (categoryPhotoList.length === 0 && category !== 'wedding-photos') {
            console.log(`[Gallery] No photos found for ${category}, using default photos`);
            categoryPhotoList = getDefaultPhotos();
        }
        
        console.log(`[Gallery] Final photo count for ${category}: ${categoryPhotoList.length}`);
        return categoryPhotoList;
    }
    
    // Load photos based on configured source (legacy function for backward compatibility)
    async function loadPhotoUrls() {
        console.log('[Gallery] loadPhotoUrls: Starting to load photos for all categories');
        // Load photos for all categories
        categoryPhotos['journey'] = await loadCategoryPhotos('journey');
        categoryPhotos['pre-wedding'] = await loadCategoryPhotos('pre-wedding');
        categoryPhotos['wedding-photos'] = await loadCategoryPhotos('wedding-photos');
        
        // Set default photos to pre-wedding
        photos = categoryPhotos['pre-wedding'];
        console.log('[Gallery] loadPhotoUrls: Completed loading photos for all categories');
    }
    
    // Default sample photos (fallback)
    function getDefaultPhotos() {
        return [];
    }
    
    // Load photos from Imgur album
    async function loadImgurAlbum(albumId) {
        try {
            console.log(`[Gallery] Loading Imgur album: ${albumId}`);
            // Try the album endpoint first (returns album with images array)
            const response = await fetch(`https://api.imgur.com/3/album/${albumId}`, {
                headers: {
                    'Authorization': 'Client-ID 546c25a59c58ad7' // Public client ID for anonymous access
                }
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`[Gallery] Imgur API error (${response.status}):`, errorText);
                throw new Error(`Imgur API error: ${response.status} - ${errorText}`);
            }
            
            const data = await response.json();
            console.log(`[Gallery] Imgur API response:`, data);
            
            if (data.success && data.data) {
                // Check if data.data has an images array (album response)
                const images = data.data.images || (Array.isArray(data.data) ? data.data : []);
                const imageLinks = images.map(image => image.link || image);
                console.log(`[Gallery] Loaded ${imageLinks.length} images from Imgur album ${albumId}`);
                return imageLinks;
            } else {
                console.warn(`[Gallery] Imgur API returned unsuccessful response:`, data);
                return [];
            }
        } catch (error) {
            console.error(`[Gallery] Error loading Imgur album ${albumId}:`, error);
            return [];
        }
    }
    
    // Load photos from Cloudinary
    async function loadCloudinaryPhotos(cloudName, folder) {
        try {
            // Cloudinary requires signed URLs or client-side SDK
            // This is a simplified approach - you may need to use Cloudinary's JavaScript SDK
            const resourceType = 'image';
            const type = 'upload';
            const prefix = folder ? `${folder}/` : '';
            
            // Note: This requires Cloudinary API credentials for production
            // For now, return empty array - user should configure Cloudinary SDK
            console.warn('Cloudinary integration requires API credentials. Use Cloudinary JavaScript SDK for full functionality.');
            return [];
        } catch (error) {
            console.error('Error loading Cloudinary photos:', error);
            return [];
        }
    }
    
    // Sample video URLs - Replace with actual videos
    const videos = [
        {
            title: 'Our Engagement',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
        },
        {
            title: 'Date Night',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
        }
    ];
    
    const journeyGrid = document.getElementById('journey-grid');
    const preWeddingGrid = document.getElementById('pre-wedding-grid');
    const weddingPhotosGrid = document.getElementById('wedding-photos-grid');
    const videoGrid = document.getElementById('video-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    let currentPhotoIndex = 0;
    let currentCategory = 'pre-wedding';
    let allPhotos = []; // All photos from current category for lightbox navigation
    let savedScrollPosition = 0; // Save scroll position before opening lightbox
    
    // Initialize galleries
    async function initGalleries() {
        console.log('[Gallery] initGalleries: Starting gallery initialization');
        await loadPhotoUrls();
        
        // Load photos into their respective grids
        console.log('[Gallery] Loading photos into grids...');
        loadCategoryPhotosToGrid('journey');
        loadCategoryPhotosToGrid('pre-wedding');
        loadCategoryPhotosToGrid('wedding-photos');
        
        loadSubsections();
        loadVideos();
        console.log('[Gallery] initGalleries: Gallery initialization completed');
    }
    
    // Load photos for all subsections
    async function loadSubsections() {
        console.log('[Gallery] loadSubsections: Starting to load subsection photos');
        const subsectionGrids = document.querySelectorAll('[data-subsection][data-album-id]');
        console.log(`[Gallery] Found ${subsectionGrids.length} subsection grids`);
        
        for (const grid of subsectionGrids) {
            const subsection = grid.getAttribute('data-subsection');
            const albumId = grid.getAttribute('data-album-id');
            
            // Skip if already has content (like "coming soon" messages)
            if (grid.querySelector('p[data-i18n="gallery.comingSoon"]')) {
                console.log(`[Gallery] Skipping ${subsection} - has "coming soon" message`);
                continue;
            }
            
            // Skip if grid already has photos loaded (from loadCategoryPhotosToGrid)
            const existingPhotos = grid.querySelectorAll('.gallery-item');
            if (existingPhotos.length > 0) {
                console.log(`[Gallery] Skipping ${subsection} - already has ${existingPhotos.length} photos loaded`);
                continue;
            }
            
            // Load photos for this subsection
            console.log(`[Gallery] Loading photos for subsection: ${subsection} (albumId: ${albumId})`);
            await loadSubsectionPhotos(grid, subsection, albumId);
        }
        console.log('[Gallery] loadSubsections: Completed loading subsection photos');
    }
    
    // Load photos for a specific subsection
    async function loadSubsectionPhotos(gridElement, subsection, albumId) {
        console.log(`[Gallery] loadSubsectionPhotos called for: ${subsection} (${albumId})`);
        if (!gridElement) {
            console.warn(`[Gallery] Grid element not found for subsection: ${subsection}`);
            return;
        }
        
        let photoList = [];
        
        // Check if CONFIG exists and has subsection-specific albums
        if (typeof CONFIG !== 'undefined' && CONFIG.SUBSECTION_ALBUMS && CONFIG.SUBSECTION_ALBUMS[albumId]) {
            const source = CONFIG.PHOTO_SOURCE || 'static';
            console.log(`[Gallery] Found subsection-specific album config for ${albumId}, source: ${source}`);
            
            switch (source) {
                case 'static':
                    photoList = CONFIG.SUBSECTION_ALBUMS[albumId] || [];
                    break;
                case 'imgur':
                    const imgurAlbumId = CONFIG.SUBSECTION_ALBUMS[albumId];
                    if (imgurAlbumId) {
                        photoList = await loadImgurAlbum(imgurAlbumId);
                    }
                    break;
                case 'cloudinary':
                    // Handle cloudinary if needed
                    break;
            }
        } else if (typeof CONFIG !== 'undefined' && CONFIG.PHOTO_SOURCE === 'imgur' && CONFIG.IMGUR_ALBUMS && CONFIG.IMGUR_ALBUMS[albumId]) {
            // Fall back to category-level album if subsection-specific not found
            console.log(`[Gallery] Using category-level album config for ${albumId}`);
            const imgurAlbumId = CONFIG.IMGUR_ALBUMS[albumId];
            if (imgurAlbumId) {
                photoList = await loadImgurAlbum(imgurAlbumId);
            }
        } else {
            console.log(`[Gallery] No subsection-specific or category-level album config found for ${albumId}`);
        }
        
        // If no photos found, use default photos for non-wedding subsections
        if (photoList.length === 0 && !albumId.startsWith('wedding-')) {
            console.log(`[Gallery] No photos found for ${albumId}, using default photos`);
            photoList = getDefaultPhotos();
        } else if (photoList.length === 0 && albumId.startsWith('wedding-')) {
            console.log(`[Gallery] No photos found for wedding subsection ${albumId}, leaving empty`);
        }
        
        console.log(`[Gallery] loadSubsectionPhotos: ${photoList.length} photos for ${subsection}`);
        
        // Clear existing content (except "coming soon" messages)
        const comingSoon = gridElement.querySelector('p[data-i18n="gallery.comingSoon"]');
        if (!comingSoon) {
            gridElement.innerHTML = '';
        }
        
        // Load photos into grid
        photoList.forEach((photoUrl, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            const img = document.createElement('img');
            img.alt = `Photo ${index + 1}`;
            img.loading = 'lazy';
            
            img.addEventListener('error', function(e) {
                console.warn(`Failed to load image ${index + 1} after all retries:`, photoUrl);
                console.warn(`Error details:`, e);
                
                img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23ddd" width="300" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="16" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EImage not available%3C/text%3E%3C/svg%3E';
                galleryItem.classList.add('error');
            }, { once: true });
            
            img.addEventListener('load', function() {
                galleryItem.classList.remove('error');
            });
            
            loadImageWithRetry(img, photoUrl, index);
            
            galleryItem.appendChild(img);
            
            // Store all photos for this subsection for lightbox navigation
            const allSubsectionPhotos = photoList;
            galleryItem.addEventListener('click', () => {
                openLightbox(index, subsection, allSubsectionPhotos);
            });
            
            gridElement.appendChild(galleryItem);
        });
    }
    
    // Load photos for a specific category into its grid
    function loadCategoryPhotosToGrid(category) {
        console.log(`[Gallery] loadCategoryPhotosToGrid called for category: ${category}`);
        const categoryPhotoList = categoryPhotos[category] || [];
        console.log(`[Gallery] Category ${category} has ${categoryPhotoList.length} photos to display`);
        
        let gridElement;
        
        // Try to find the grid element by ID first
        switch (category) {
            case 'journey':
                gridElement = document.getElementById('journey-grid') || journeyGrid;
                break;
            case 'pre-wedding':
                gridElement = document.getElementById('pre-wedding-grid') || preWeddingGrid;
                break;
            case 'wedding-photos':
                gridElement = document.getElementById('wedding-photos-grid') || weddingPhotosGrid;
                break;
            default:
                console.warn(`[Gallery] Unknown category: ${category}`);
                return;
        }
        
        // If grid element not found by ID, try to find the first subsection grid for this category
        if (!gridElement) {
            console.log(`[Gallery] Grid element not found by ID for ${category}, trying to find first subsection grid...`);
            const categoryGallery = document.getElementById(`${category}-gallery`);
            if (categoryGallery) {
                // Find the first gallery-grid within this category gallery
                gridElement = categoryGallery.querySelector('.gallery-grid');
                if (gridElement) {
                    console.log(`[Gallery] Found first subsection grid for ${category}:`, gridElement);
                }
            }
        }
        
        if (!gridElement) {
            console.warn(`[Gallery] Grid element not found for category: ${category}`);
            console.log(`[Gallery] Available elements:`, {
                journeyGrid: document.getElementById('journey-grid'),
                preWeddingGrid: document.getElementById('pre-wedding-grid'),
                weddingPhotosGrid: document.getElementById('wedding-photos-grid'),
                journeyGallery: document.getElementById('journey-gallery'),
                preWeddingGallery: document.getElementById('pre-wedding-gallery'),
                weddingPhotosGallery: document.getElementById('wedding-photos-gallery')
            });
            return;
        }
        
        // Handle empty photo lists (especially for wedding-photos)
        if (categoryPhotoList.length === 0) {
            console.log(`[Gallery] No photos to display for ${category}, showing placeholder or clearing`);
            // Check if there's already a placeholder
            const existingPlaceholder = gridElement.querySelector('p');
            if (category === 'wedding-photos') {
                // Keep existing placeholder if it exists, otherwise add one
                if (!existingPlaceholder) {
                    gridElement.innerHTML = '<p data-i18n="gallery.comingSoon">Photos coming soon...</p>';
                }
            } else {
                // For other categories, clear if empty
                gridElement.innerHTML = '';
            }
            return;
        }
        
        // Clear existing content
        console.log(`[Gallery] Clearing grid and loading ${categoryPhotoList.length} photos for ${category}`);
        gridElement.innerHTML = '';
        
        categoryPhotoList.forEach((photoUrl, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            const img = document.createElement('img');
            img.alt = `Photo ${index + 1}`;
            img.loading = 'lazy';
            
            // Add error handling for failed image loads (after all retries fail)
            img.addEventListener('error', function(e) {
                console.warn(`[Gallery] Failed to load image ${index + 1} after all retries:`, photoUrl);
                console.warn(`[Gallery] Error details:`, e);
                console.warn(`[Gallery] Image element:`, img);
                
                // Show placeholder for broken image
                img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23ddd" width="300" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="16" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EImage not available%3C/text%3E%3C/svg%3E';
                galleryItem.classList.add('error');
            }, { once: true });
            
            // Retry logic for 429 errors
            img.addEventListener('load', function() {
                // Image loaded successfully
                galleryItem.classList.remove('error');
            });
            
            // Load image with retry on 429
            loadImageWithRetry(img, photoUrl, index);
            
            galleryItem.appendChild(img);
            galleryItem.addEventListener('click', () => openLightbox(index, category));
            
            // Safety check before appending
            if (gridElement) {
                gridElement.appendChild(galleryItem);
                if (index === 0) {
                    console.log(`[Gallery] Added first photo to ${category} grid:`, photoUrl.substring(0, 100));
                }
            } else {
                console.warn(`[Gallery] Grid element is null for category: ${category}, cannot append gallery item`);
            }
        });
        
        console.log(`[Gallery] Successfully added ${categoryPhotoList.length} photos to ${category} grid`);
    }
    
    // Load image with retry logic for rate limiting
    async function loadImageWithRetry(img, originalUrl, index, retryCount = 0) {
        const maxRetries = 3;
        const retryDelay = 1000 * Math.pow(2, retryCount); // Exponential backoff
        
        // Wait before retry (except first attempt)
        if (retryCount > 0) {
            console.log(`[Gallery] Retrying image ${index + 1} after ${retryDelay}ms (attempt ${retryCount + 1}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
        
        // Determine URL to use
        let urlToLoad = originalUrl;
        
        // Log the URL being loaded (first attempt only)
        if (retryCount === 0) {
            console.log(`[Gallery] Loading image ${index + 1}:`, urlToLoad.substring(0, 100) + '...');
        }
        
        // Set up error handler
        const errorHandler = async function(e) {
            console.warn(`[Gallery] Image ${index + 1} failed to load (attempt ${retryCount + 1}/${maxRetries + 1}):`, urlToLoad.substring(0, 100));
            console.warn(`[Gallery] Error:`, e);
            
            if (retryCount < maxRetries) {
                // Remove this handler and retry
                img.removeEventListener('error', errorHandler);
                await loadImageWithRetry(img, originalUrl, index, retryCount + 1);
            } else {
                // All retries failed, trigger error handler
                console.error(`[Gallery] All retries failed for image ${index + 1}`);
                img.removeEventListener('error', errorHandler);
                img.dispatchEvent(new Event('error'));
            }
        };
        
        img.addEventListener('error', errorHandler, { once: true });
        img.src = urlToLoad;
    }
    
    // Load videos into grid
    function loadVideos() {
        if (!videoGrid) {
            console.warn('Video grid element not found');
            return;
        }
        
        videos.forEach((video) => {
            const videoItem = document.createElement('div');
            videoItem.className = 'video-item';
            
            const iframe = document.createElement('iframe');
            iframe.src = video.url;
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            iframe.frameBorder = '0';
            
            videoItem.appendChild(iframe);
            videoGrid.appendChild(videoItem);
        });
    }
    
    // Helper function to size image properly within viewport
    function sizeLightboxImage(img) {
        if (!img) {
            return;
        }
        
        // Wait for image to have dimensions
        if (!img.naturalWidth || !img.naturalHeight || img.naturalWidth === 0 || img.naturalHeight === 0) {
            // If image doesn't have dimensions yet, try again after a short delay
            setTimeout(() => {
                if (img.naturalWidth > 0 && img.naturalHeight > 0) {
                    sizeLightboxImage(img);
                }
            }, 50);
            return;
        }
        
        // Get viewport dimensions (use window.innerWidth/Height for accurate viewport)
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Ensure we have valid viewport dimensions
        if (!viewportWidth || !viewportHeight || viewportWidth === 0 || viewportHeight === 0) {
            return;
        }
        
        // Calculate available space based on screen size - add more padding, especially bottom
        let maxWidth, maxHeight;
        if (viewportWidth <= 480) {
            // Mobile - more padding for buttons and bottom
            maxWidth = viewportWidth - 80;
            maxHeight = viewportHeight - 140; // More bottom padding
        } else if (viewportWidth <= 768) {
            // Tablet
            maxWidth = viewportWidth - 100;
            maxHeight = viewportHeight - 160; // More bottom padding
        } else {
            // Desktop - add more padding, especially bottom
            maxWidth = viewportWidth - 160;
            maxHeight = viewportHeight - 180; // More bottom padding
        }
        
        const imgWidth = img.naturalWidth;
        const imgHeight = img.naturalHeight;
        
        // Calculate aspect ratio
        const aspectRatio = imgWidth / imgHeight;
        
        // Calculate dimensions that fit within both constraints
        // Start with width constraint
        let finalWidth = maxWidth;
        let finalHeight = maxWidth / aspectRatio;
        
        // If height exceeds max, use height constraint instead
        if (finalHeight > maxHeight) {
            finalHeight = maxHeight;
            finalWidth = maxHeight * aspectRatio;
        }
        
        // Double-check we don't exceed either constraint
        if (finalWidth > maxWidth) {
            finalWidth = maxWidth;
            finalHeight = maxWidth / aspectRatio;
        }
        if (finalHeight > maxHeight) {
            finalHeight = maxHeight;
            finalWidth = maxHeight * aspectRatio;
        }
        
        // Ensure dimensions are valid
        if (finalWidth <= 0 || finalHeight <= 0 || !isFinite(finalWidth) || !isFinite(finalHeight)) {
            return;
        }
        
        // Apply constraints - use both maxWidth and maxHeight to ensure it fits
        img.style.maxWidth = `${finalWidth}px`;
        img.style.maxHeight = `${finalHeight}px`;
        img.style.width = 'auto';
        img.style.height = 'auto';
    }
    
    // Open lightbox with photo
    function openLightbox(index, categoryOrSubsection, photosArray) {
        if (!lightbox || !lightboxImage) {
            console.warn('Lightbox elements not found');
            return;
        }
        
        // If photosArray is provided, use it (for subsections)
        if (photosArray && Array.isArray(photosArray)) {
            allPhotos = photosArray;
            currentCategory = categoryOrSubsection || 'journey';
        } else {
            // Legacy support for category-based photos
            currentCategory = categoryOrSubsection || 'journey';
            allPhotos = categoryPhotos[currentCategory] || [];
        }
        
        if (allPhotos.length === 0 || index >= allPhotos.length) {
            console.warn('Invalid photo index or empty photo list');
            return;
        }
        
        currentPhotoIndex = index;
        
        // Save current scroll position before opening the popup
        savedScrollPosition = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
        
        // Reset image styles to ensure proper sizing
        lightboxImage.style.width = 'auto';
        lightboxImage.style.height = 'auto';
        lightboxImage.style.maxWidth = '';
        lightboxImage.style.maxHeight = '';
        
        // Lock body position to prevent scroll jump when scrollbar disappears
        // This keeps the current view visible as background
        document.body.style.position = 'fixed';
        document.body.style.top = `-${savedScrollPosition}px`;
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        document.body.classList.add('lightbox-open');
        
        // Move lightbox to body if it's not already there to ensure proper positioning
        if (lightbox.parentElement !== document.body) {
            document.body.appendChild(lightbox);
        }
        
        // Position lightbox as fixed to viewport - use setProperty with important to override any CSS
        lightbox.style.setProperty('position', 'fixed', 'important');
        lightbox.style.setProperty('top', '0', 'important');
        lightbox.style.setProperty('left', '0', 'important');
        lightbox.style.setProperty('right', '0', 'important');
        lightbox.style.setProperty('bottom', '0', 'important');
        lightbox.style.setProperty('width', '100%', 'important');
        lightbox.style.setProperty('height', '100%', 'important');
        lightbox.style.setProperty('margin', '0', 'important');
        lightbox.style.setProperty('padding', '0', 'important');
        lightbox.style.setProperty('transform', 'none', 'important');
        lightbox.style.setProperty('z-index', '2000', 'important');
        
        // Show lightbox as full-screen popup - overlays the current scroll view
        lightbox.classList.add('active');
        
        // Check after showing and fix position if needed
        requestAnimationFrame(() => {
            const rect = lightbox.getBoundingClientRect();
            if (rect.top !== 0) {
                lightbox.style.setProperty('top', '0', 'important');
                lightbox.style.setProperty('transform', 'translateY(0)', 'important');
            }
        });
        
        // Set image source
        lightboxImage.src = allPhotos[index];
        
        // Function to size image when ready
        const sizeImageWhenReady = () => {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    if (lightboxImage.complete && lightboxImage.naturalWidth > 0 && lightboxImage.naturalHeight > 0) {
                        sizeLightboxImage(lightboxImage);
                    } else {
                        setTimeout(() => {
                            if (lightboxImage.complete && lightboxImage.naturalWidth > 0 && lightboxImage.naturalHeight > 0) {
                                sizeLightboxImage(lightboxImage);
                            }
                        }, 100);
                    }
                });
            });
        };
        
        // Set up load handler
        const handleLoad = function() {
            requestAnimationFrame(() => {
                if (this.naturalWidth > 0 && this.naturalHeight > 0) {
                    sizeLightboxImage(this);
                    setTimeout(() => {
                        if (this.naturalWidth > 0 && this.naturalHeight > 0) {
                            sizeLightboxImage(this);
                        }
                    }, 100);
                }
            });
        };
        
        lightboxImage.onload = null;
        lightboxImage.onload = handleLoad;
        
        lightboxImage.onerror = function() {
            console.warn('Failed to load image:', allPhotos[index]);
        };
        
        // Handle both cached and new images
        if (lightboxImage.complete && lightboxImage.naturalWidth > 0 && lightboxImage.naturalHeight > 0) {
            sizeImageWhenReady();
        }
        
        // Force resize after delays to ensure viewport is correct
        setTimeout(() => {
            if (lightboxImage.complete && lightboxImage.naturalWidth > 0 && lightboxImage.naturalHeight > 0) {
                sizeLightboxImage(lightboxImage);
            }
        }, 150);
        
        setTimeout(() => {
            if (lightboxImage.complete && lightboxImage.naturalWidth > 0 && lightboxImage.naturalHeight > 0) {
                sizeLightboxImage(lightboxImage);
            }
        }, 300);
    }
    
    // Close lightbox
    function closeLightbox() {
        if (!lightbox) return;
        
        // Hide lightbox popup
        lightbox.classList.remove('active');
        
        // Reset lightbox positioning - remove all inline styles
        lightbox.style.removeProperty('position');
        lightbox.style.removeProperty('top');
        lightbox.style.removeProperty('left');
        lightbox.style.removeProperty('right');
        lightbox.style.removeProperty('bottom');
        lightbox.style.removeProperty('width');
        lightbox.style.removeProperty('height');
        lightbox.style.removeProperty('margin');
        lightbox.style.removeProperty('padding');
        lightbox.style.removeProperty('transform');
        lightbox.style.removeProperty('z-index');
        
        // Restore body positioning and scroll
        document.body.classList.remove('lightbox-open');
        document.documentElement.classList.remove('lightbox-open');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        
        // Restore scroll position to return to the current view
        window.scrollTo({
            top: savedScrollPosition,
            left: 0,
            behavior: 'instant'
        });
    }
    
    // Show previous photo
    function showPrevPhoto() {
        if (!lightboxImage || allPhotos.length === 0) return;
        currentPhotoIndex = (currentPhotoIndex - 1 + allPhotos.length) % allPhotos.length;
        
        // Reset image styles
        lightboxImage.style.maxWidth = '';
        lightboxImage.style.maxHeight = '';
        
        lightboxImage.src = allPhotos[currentPhotoIndex];
        
        // Handle both cached and new images
        if (lightboxImage.complete && lightboxImage.naturalWidth > 0) {
            setTimeout(() => sizeLightboxImage(lightboxImage), 0);
        } else {
            lightboxImage.onload = function() {
                sizeLightboxImage(this);
            };
        }
        
        // Force resize after a short delay
        setTimeout(() => {
            if (lightboxImage.complete && lightboxImage.naturalWidth > 0) {
                sizeLightboxImage(lightboxImage);
            }
        }, 100);
    }
    
    // Show next photo
    function showNextPhoto() {
        if (!lightboxImage || allPhotos.length === 0) return;
        currentPhotoIndex = (currentPhotoIndex + 1) % allPhotos.length;
        
        // Reset image styles
        lightboxImage.style.maxWidth = '';
        lightboxImage.style.maxHeight = '';
        
        lightboxImage.src = allPhotos[currentPhotoIndex];
        
        // Handle both cached and new images
        if (lightboxImage.complete && lightboxImage.naturalWidth > 0) {
            setTimeout(() => sizeLightboxImage(lightboxImage), 0);
        } else {
            lightboxImage.onload = function() {
                sizeLightboxImage(this);
            };
        }
        
        // Force resize after a short delay
        setTimeout(() => {
            if (lightboxImage.complete && lightboxImage.naturalWidth > 0) {
                sizeLightboxImage(lightboxImage);
            }
        }, 100);
    }
    
    // Tab switching
    function switchTab(tabName) {
        const journeyGallery = document.getElementById('journey-gallery');
        const preWeddingGallery = document.getElementById('pre-wedding-gallery');
        const weddingPhotosGallery = document.getElementById('wedding-photos-gallery');
        const guestUploadsGallery = document.getElementById('guest-uploads-gallery');
        const videosGallery = document.getElementById('videos-gallery');
        
        // Get description elements
        const journeyDesc = document.getElementById('journey-desc');
        const preWeddingDesc = document.getElementById('pre-wedding-desc');
        const weddingPhotosDesc = document.getElementById('wedding-photos-desc');
        const guestUploadsDesc = document.getElementById('guest-uploads-desc');
        const videosDesc = document.getElementById('videos-desc');
        
        tabBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabName) {
                btn.classList.add('active');
            }
        });
        
        // Hide all descriptions
        if (journeyDesc) journeyDesc.classList.remove('active');
        if (preWeddingDesc) preWeddingDesc.classList.remove('active');
        if (weddingPhotosDesc) weddingPhotosDesc.classList.remove('active');
        if (guestUploadsDesc) guestUploadsDesc.classList.remove('active');
        if (videosDesc) videosDesc.classList.remove('active');
        
        // Hide all galleries
        if (journeyGallery) journeyGallery.classList.remove('active');
        if (preWeddingGallery) preWeddingGallery.classList.remove('active');
        if (weddingPhotosGallery) weddingPhotosGallery.classList.remove('active');
        if (guestUploadsGallery) guestUploadsGallery.classList.remove('active');
        if (videosGallery) videosGallery.classList.remove('active');
        
        // Show selected gallery and description
        switch (tabName) {
            case 'journey':
                if (journeyGallery) journeyGallery.classList.add('active');
                if (journeyDesc) journeyDesc.classList.add('active');
                break;
            case 'pre-wedding':
                if (preWeddingGallery) preWeddingGallery.classList.add('active');
                if (preWeddingDesc) preWeddingDesc.classList.add('active');
                break;
            case 'wedding-photos':
                if (weddingPhotosGallery) weddingPhotosGallery.classList.add('active');
                if (weddingPhotosDesc) weddingPhotosDesc.classList.add('active');
                break;
            case 'guest-uploads':
                if (guestUploadsGallery) guestUploadsGallery.classList.add('active');
                if (guestUploadsDesc) guestUploadsDesc.classList.add('active');
                break;
            case 'videos':
                if (videosGallery) videosGallery.classList.add('active');
                if (videosDesc) videosDesc.classList.add('active');
                break;
        }
    }
    
    // Event listeners (only if elements exist)
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrevPhoto);
    }
    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextPhoto);
    }
    
    // Remove click-to-close on lightbox background
    // Only the X button should close the lightbox
    // if (lightbox) {
    //     lightbox.addEventListener('click', (e) => {
    //         if (e.target === lightbox) {
    //             closeLightbox();
    //         }
    //     });
    // }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                showPrevPhoto();
            } else if (e.key === 'ArrowRight') {
                showNextPhoto();
            }
        }
    });
    
    // Resize handler to ensure image fits when window is resized
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (lightbox && lightbox.classList.contains('active') && lightboxImage) {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                sizeLightboxImage(lightboxImage);
            }, 100);
        }
    });
    
    // Tab button listeners
    if (tabBtns && tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                switchTab(btn.dataset.tab);
            });
        });
    }
    
    // ============================================
    // Photo Upload Functionality
    // ============================================
    const uploadForm = document.getElementById('upload-form');
    const photoUploadInput = document.getElementById('photo-upload');
    
    // Handle photo upload form submission
    if (uploadForm && photoUploadInput) {
        uploadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const files = photoUploadInput.files;
            if (!files || files.length === 0) {
                alert('Please select at least one photo to upload.');
                return;
            }
            
            // Disable form during upload
            const submitButton = uploadForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton ? submitButton.textContent : 'Upload Photos';
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Uploading...';
            }
            
            try {
                // Upload each file
                const uploadPromises = Array.from(files).map(file => uploadPhoto(file));
                const results = await Promise.all(uploadPromises);
                
                // Check results
                const successful = results.filter(r => r.success);
                const failed = results.filter(r => !r.success);
                
                if (successful.length > 0) {
                    // Show success message
                    alert(`Successfully uploaded ${successful.length} photo(s)${failed.length > 0 ? `. ${failed.length} failed.` : '!'}`);
                } else {
                    // All uploads failed
                    alert(`Failed to upload photos. Please try again.`);
                }
                
                // Clear form
                photoUploadInput.value = '';
                
            } catch (error) {
                console.error('Error uploading photos:', error);
                alert('An error occurred while uploading photos. Please try again.');
            } finally {
                // Re-enable form
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                }
            }
        });
    }
    
    // Upload a single photo
    async function uploadPhoto(file) {
        try {
            // Check file size (limit to 10MB)
            const maxSize = 10 * 1024 * 1024; // 10MB
            if (file.size > maxSize) {
                return {
                    success: false,
                    error: `File ${file.name} is too large. Maximum size is 10MB.`
                };
            }
            
            // Convert file to base64
            const base64Data = await fileToBase64(file);
            
            // Upload to Google Apps Script
            if (typeof CONFIG === 'undefined' || !CONFIG.GOOGLE_SCRIPT_URL) {
                return {
                    success: false,
                    error: 'Google Script URL not configured. Please configure GOOGLE_SCRIPT_URL in config.js'
                };
            }
            
            // Create URL-encoded form data for Google Apps Script
            const params = new URLSearchParams();
            params.append('action', 'uploadPhoto');
            params.append('fileData', base64Data);
            params.append('fileName', file.name);
            
            // Add Google Drive folder ID if configured
            const folderId = (typeof CONFIG !== 'undefined' && CONFIG.GOOGLE_DRIVE_UPLOAD_FOLDER_ID) 
                ? CONFIG.GOOGLE_DRIVE_UPLOAD_FOLDER_ID 
                : null;
            if (folderId) {
                params.append('folderId', folderId);
            }
            
            const response = await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params.toString()
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            // Google Apps Script returns JSON for photo uploads
            const contentType = response.headers.get('content-type');
            let result;
            
            if (contentType && contentType.includes('application/json')) {
                result = await response.json();
            } else {
                // Try to parse as JSON anyway
                const text = await response.text();
                try {
                    result = JSON.parse(text);
                } catch (e) {
                    throw new Error('Invalid response format from server');
                }
            }
            
            if (result.success) {
                return {
                    success: true,
                    fileUrl: result.fileUrl,
                    fileId: result.fileId,
                    message: result.message
                };
            } else {
                return {
                    success: false,
                    error: result.error || 'Unknown error'
                };
            }
            
        } catch (error) {
            console.error('Error uploading photo:', error);
            return {
                success: false,
                error: error.message || 'Unknown error'
            };
        }
    }
    
    // Convert file to base64
    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
                const base64 = reader.result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
    
    // Display uploaded photo in gallery
    function displayUploadedPhoto(photoUrl, gridElement) {
        if (!gridElement) {
            console.warn('Grid element not found for displaying uploaded photo');
            return;
        }
        
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = photoUrl;
        img.alt = 'Uploaded photo';
        img.loading = 'lazy';
        
        img.addEventListener('error', function() {
            console.warn('Failed to load uploaded image:', photoUrl);
            img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23ddd" width="300" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="16" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EImage not available%3C/text%3E%3C/svg%3E';
            galleryItem.classList.add('error');
        });
        
        galleryItem.appendChild(img);
        
        // Add click handler for lightbox
        galleryItem.addEventListener('click', () => {
            // Get all uploaded photos for lightbox navigation
            const allUploadedPhotos = Array.from(gridElement.querySelectorAll('img'))
                .map(img => img.src)
                .filter(src => !src.startsWith('data:'));
            
            const currentIndex = allUploadedPhotos.indexOf(photoUrl);
            if (currentIndex >= 0) {
                openLightbox(currentIndex, 'guest-uploads', allUploadedPhotos);
            } else {
                openLightbox(0, 'guest-uploads', [photoUrl]);
            }
        });
        
        gridElement.appendChild(galleryItem);
    }
    
    // Load previously uploaded photos (if stored)
    async function loadUploadedPhotos() {
        if (!guestUploadsGrid) {
            return;
        }
        
        // This could be extended to fetch uploaded photos from Google Drive
        // For now, photos are displayed immediately after upload
        // You could store photo URLs in localStorage or fetch from a backend
    }
    
    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initGalleries();
        });
    } else {
        initGalleries();
    }
})();

