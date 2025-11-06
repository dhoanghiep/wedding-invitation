// Gallery Functionality
(function() {
    'use strict';
    
    // Sample photo URLs - Replace with actual photos
    const photos = [
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
    function initGalleries() {
        loadPhotos();
        loadVideos();
    }
    
    // Load photos into grid
    function loadPhotos() {
        photos.forEach((photoUrl, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            const img = document.createElement('img');
            img.src = photoUrl;
            img.alt = `Photo ${index + 1}`;
            img.loading = 'lazy';
            
            galleryItem.appendChild(img);
            galleryItem.addEventListener('click', () => openLightbox(index));
            
            photoGrid.appendChild(galleryItem);
        });
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

