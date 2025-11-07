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
        // Safety check for CONFIG
        if (typeof CONFIG === 'undefined') {
            console.warn('CONFIG not loaded, using default photos');
            return getDefaultPhotos();
        }
        
        const source = CONFIG.PHOTO_SOURCE || 'static';
        let categoryPhotoList = [];
        
        switch (source) {
            case 'static':
                // Use static URLs from config (local images or direct URLs)
                if (CONFIG.PHOTOS && CONFIG.PHOTOS.length > 0) {
                    categoryPhotoList = CONFIG.PHOTOS;
                } else {
                    categoryPhotoList = getDefaultPhotos();
                }
                break;
                
            case 'imgur':
                // Check if category-specific album ID exists
                const albumId = CONFIG.IMGUR_ALBUMS && CONFIG.IMGUR_ALBUMS[category] 
                    ? CONFIG.IMGUR_ALBUMS[category]
                    : (category === 'pre-wedding' ? CONFIG.IMGUR_ALBUM_ID : null);
                
                if (albumId) {
                    categoryPhotoList = await loadImgurAlbum(albumId);
                } else {
                    console.warn(`Imgur Album ID not configured for category: ${category}`);
                    categoryPhotoList = [];
                }
                break;
                
            case 'cloudinary':
                if (CONFIG.CLOUDINARY_CLOUD_NAME) {
                    categoryPhotoList = await loadCloudinaryPhotos(CONFIG.CLOUDINARY_CLOUD_NAME, CONFIG.CLOUDINARY_FOLDER);
                } else {
                    console.warn('Cloudinary configuration not set');
                    categoryPhotoList = [];
                }
                break;
                
            default:
                console.warn(`Unknown photo source: ${source}. Using default photos.`);
                categoryPhotoList = getDefaultPhotos();
        }
        
        // Ensure we have at least some photos
        if (categoryPhotoList.length === 0 && category !== 'wedding-photos') {
            categoryPhotoList = getDefaultPhotos();
        }
        
        return categoryPhotoList;
    }
    
    // Load photos based on configured source (legacy function for backward compatibility)
    async function loadPhotoUrls() {
        // Load photos for all categories
        categoryPhotos['journey'] = await loadCategoryPhotos('journey');
        categoryPhotos['pre-wedding'] = await loadCategoryPhotos('pre-wedding');
        categoryPhotos['wedding-photos'] = await loadCategoryPhotos('wedding-photos');
        
        // Set default photos to journey for backward compatibility
        photos = categoryPhotos['journey'];
    }
    
    // Default sample photos (fallback)
    function getDefaultPhotos() {
        return [
            'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1519608487953-ecec6274facc?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=800&fit=crop'
        ];
    }
    
    // Load photos from Imgur album
    async function loadImgurAlbum(albumId) {
        try {
            const response = await fetch(`https://api.imgur.com/3/album/${albumId}/images`, {
                headers: {
                    'Authorization': 'Client-ID 546c25a59c58ad7' // Public client ID for anonymous access
                }
            });
            
            if (!response.ok) {
                throw new Error(`Imgur API error: ${response.status}`);
            }
            
            const data = await response.json();
            if (data.success && data.data) {
                return data.data.map(image => image.link);
            }
            return [];
        } catch (error) {
            console.error('Error loading Imgur album:', error);
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
    let currentCategory = 'journey';
    let allPhotos = []; // All photos from current category for lightbox navigation
    
    // Initialize galleries
    async function initGalleries() {
        await loadPhotoUrls();
        loadCategoryPhotosToGrid('journey');
        loadCategoryPhotosToGrid('pre-wedding');
        loadCategoryPhotosToGrid('wedding-photos');
        loadVideos();
    }
    
    // Load photos for a specific category into its grid
    function loadCategoryPhotosToGrid(category) {
        const categoryPhotoList = categoryPhotos[category] || [];
        let gridElement;
        
        switch (category) {
            case 'journey':
                gridElement = journeyGrid;
                break;
            case 'pre-wedding':
                gridElement = preWeddingGrid;
                break;
            case 'wedding-photos':
                gridElement = weddingPhotosGrid;
                break;
            default:
                return;
        }
        
        if (!gridElement) {
            console.warn(`Grid element not found for category: ${category}`);
            return;
        }
        
        // Handle empty photo lists (especially for wedding-photos)
        if (categoryPhotoList.length === 0) {
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
        gridElement.innerHTML = '';
        
        categoryPhotoList.forEach((photoUrl, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            const img = document.createElement('img');
            img.alt = `Photo ${index + 1}`;
            img.loading = 'lazy';
            
            // Add error handling for failed image loads (after all retries fail)
            img.addEventListener('error', function() {
                console.warn(`Failed to load image ${index + 1} after all retries:`, photoUrl);
                
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
            } else {
                console.warn(`Grid element is null for category: ${category}, cannot append gallery item`);
            }
        });
    }
    
    // Load image with retry logic for rate limiting
    async function loadImageWithRetry(img, originalUrl, index, retryCount = 0) {
        const maxRetries = 3;
        const retryDelay = 1000 * Math.pow(2, retryCount); // Exponential backoff
        
        // Wait before retry (except first attempt)
        if (retryCount > 0) {
            console.log(`Retrying image ${index + 1} after ${retryDelay}ms (attempt ${retryCount + 1}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
        
        // Determine URL to use
        let urlToLoad = originalUrl;
        
        // Set up error handler
        const errorHandler = async function() {
            if (retryCount < maxRetries) {
                // Remove this handler and retry
                img.removeEventListener('error', errorHandler);
                await loadImageWithRetry(img, originalUrl, index, retryCount + 1);
            } else {
                // All retries failed, trigger error handler
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
    
    // Open lightbox with photo
    function openLightbox(index, category) {
        if (!lightbox || !lightboxImage) {
            console.warn('Lightbox elements not found');
            return;
        }
        
        currentCategory = category || 'journey';
        allPhotos = categoryPhotos[currentCategory] || [];
        if (allPhotos.length === 0 || index >= allPhotos.length) {
            console.warn('Invalid photo index or empty photo list');
            return;
        }
        
        currentPhotoIndex = index;
        lightboxImage.src = allPhotos[index];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close lightbox
    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Show previous photo
    function showPrevPhoto() {
        if (!lightboxImage || allPhotos.length === 0) return;
        currentPhotoIndex = (currentPhotoIndex - 1 + allPhotos.length) % allPhotos.length;
        lightboxImage.src = allPhotos[currentPhotoIndex];
    }
    
    // Show next photo
    function showNextPhoto() {
        if (!lightboxImage || allPhotos.length === 0) return;
        currentPhotoIndex = (currentPhotoIndex + 1) % allPhotos.length;
        lightboxImage.src = allPhotos[currentPhotoIndex];
    }
    
    // Tab switching
    function switchTab(tabName) {
        const journeyGallery = document.getElementById('journey-gallery');
        const preWeddingGallery = document.getElementById('pre-wedding-gallery');
        const weddingPhotosGallery = document.getElementById('wedding-photos-gallery');
        const guestUploadsGallery = document.getElementById('guest-uploads-gallery');
        const videosGallery = document.getElementById('videos-gallery');
        
        tabBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabName) {
                btn.classList.add('active');
            }
        });
        
        // Hide all galleries
        if (journeyGallery) journeyGallery.classList.remove('active');
        if (preWeddingGallery) preWeddingGallery.classList.remove('active');
        if (weddingPhotosGallery) weddingPhotosGallery.classList.remove('active');
        if (guestUploadsGallery) guestUploadsGallery.classList.remove('active');
        if (videosGallery) videosGallery.classList.remove('active');
        
        // Show selected gallery
        switch (tabName) {
            case 'journey':
                if (journeyGallery) journeyGallery.classList.add('active');
                break;
            case 'pre-wedding':
                if (preWeddingGallery) preWeddingGallery.classList.add('active');
                break;
            case 'wedding-photos':
                if (weddingPhotosGallery) weddingPhotosGallery.classList.add('active');
                break;
            case 'guest-uploads':
                if (guestUploadsGallery) guestUploadsGallery.classList.add('active');
                break;
            case 'videos':
                if (videosGallery) videosGallery.classList.add('active');
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
    
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
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
    
    // Tab button listeners
    if (tabBtns && tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                switchTab(btn.dataset.tab);
            });
        });
    }
    
    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGalleries);
    } else {
        initGalleries();
    }
})();

