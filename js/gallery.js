// Gallery Functionality
(function() {
    'use strict';
    
    let photos = [];
    
    // Load photos based on configured source
    async function loadPhotoUrls() {
        // Safety check for CONFIG
        if (typeof CONFIG === 'undefined') {
            console.warn('CONFIG not loaded, using default photos');
            photos = getDefaultPhotos();
            return;
        }
        
        const source = CONFIG.PHOTO_SOURCE || 'static';
        
        switch (source) {
            case 'static':
                // Use static URLs from config (local images or direct URLs)
                photos = CONFIG.PHOTOS && CONFIG.PHOTOS.length > 0 
                    ? CONFIG.PHOTOS 
                    : getDefaultPhotos(); // Fallback to sample photos
                break;
                
            case 'imgur':
                if (CONFIG.IMGUR_ALBUM_ID) {
                    photos = await loadImgurAlbum(CONFIG.IMGUR_ALBUM_ID);
                } else {
                    console.warn('Imgur Album ID not configured. Please add IMGUR_ALBUM_ID to config.js');
                    photos = getDefaultPhotos();
                }
                break;
                
            case 'cloudinary':
                if (CONFIG.CLOUDINARY_CLOUD_NAME) {
                    photos = await loadCloudinaryPhotos(CONFIG.CLOUDINARY_CLOUD_NAME, CONFIG.CLOUDINARY_FOLDER);
                } else {
                    console.warn('Cloudinary configuration not set');
                    photos = getDefaultPhotos();
                }
                break;
                
            default:
                console.warn(`Unknown photo source: ${source}. Using default photos.`);
                photos = getDefaultPhotos();
        }
        
        // Ensure we have at least some photos
        if (photos.length === 0) {
            photos = getDefaultPhotos();
        }
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
    
    const photoGrid = document.getElementById('photo-grid');
    const videoGrid = document.getElementById('video-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    let currentPhotoIndex = 0;
    
    // Initialize galleries
    async function initGalleries() {
        await loadPhotoUrls();
        loadPhotos();
        loadVideos();
    }
    
    // Load photos into grid with error handling
    function loadPhotos() {
        photos.forEach((photoUrl, index) => {
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
            galleryItem.addEventListener('click', () => openLightbox(index));
            
            photoGrid.appendChild(galleryItem);
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
    function openLightbox(index) {
        currentPhotoIndex = index;
        lightboxImage.src = photos[index];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Show previous photo
    function showPrevPhoto() {
        currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
        lightboxImage.src = photos[currentPhotoIndex];
    }
    
    // Show next photo
    function showNextPhoto() {
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        lightboxImage.src = photos[currentPhotoIndex];
    }
    
    // Tab switching
    function switchTab(tabName) {
        const photosGallery = document.getElementById('photos-gallery');
        const videosGallery = document.getElementById('videos-gallery');
        
        tabBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabName) {
                btn.classList.add('active');
            }
        });
        
        if (tabName === 'photos') {
            photosGallery.classList.add('active');
            videosGallery.classList.remove('active');
        } else {
            photosGallery.classList.remove('active');
            videosGallery.classList.add('active');
        }
    }
    
    // Event listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrevPhoto);
    lightboxNext.addEventListener('click', showNextPhoto);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
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
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.dataset.tab);
        });
    });
    
    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGalleries);
    } else {
        initGalleries();
    }
})();

