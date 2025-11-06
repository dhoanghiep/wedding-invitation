const CONFIG = {
    GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbx452XArh1-M05G55rNgnnVSum9YVQPqEf6QEWZZ7C9YqECACTHC_hha-dqampiV7HS/exec',
    
    // Photo Gallery Configuration
    // Choose one of the following options:
    // 1. 'static' - Use local images or direct URLs (RECOMMENDED for production)
    // 2. 'imgur' - Use Imgur album (easy, free, reliable)
    // 3. 'cloudinary' - Use Cloudinary (requires cloud name and folder)
    PHOTO_SOURCE: 'imgur', // Options: 'static', 'imgur', 'cloudinary'
    
    // Static photo URLs (used when PHOTO_SOURCE is 'static')
    // Option A: Local images - Upload photos to /images folder and use relative paths:
    //   PHOTOS: ['images/photo1.jpg', 'images/photo2.jpg', ...]
    // Option B: Direct URLs from any image hosting service
    PHOTOS: [
        // Add your photo URLs or local paths here
        // Example for local images: 'images/photo1.jpg'
        // Example for direct URLs: 'https://example.com/image.jpg'
    ],
    
    // Imgur Album ID (used when PHOTO_SOURCE is 'imgur')
    // How to get:
    // 1. Upload photos to Imgur (imgur.com) and create an album
    // 2. Get the album ID from the URL: https://imgur.com/a/ABC123 → ID is 'ABC123'
    IMGUR_ALBUM_ID: 'xtDiBLB', // Add your Imgur album ID here (legacy, use IMGUR_ALBUMS for categories)
    
    // Category-based Imgur Album IDs
    // Each category can have its own Imgur album ID
    IMGUR_ALBUMS: {
        'pre-wedding': 'xtDiBLB', // Pre-wedding photos
        'journey': null, // Journey photos (set to null or album ID)
        'wedding-photos': null // Wedding photos (set to null or album ID)
    },
    
    // Cloudinary Configuration (used when PHOTO_SOURCE is 'cloudinary')
    CLOUDINARY_CLOUD_NAME: '',
    CLOUDINARY_FOLDER: 'wedding-photos',
    
    // Google Maps Configuration
    // Option 1: Use Google Maps embed URL (RECOMMENDED - easiest method)
    // Get this by: Google Maps → Share → Embed a map → Copy HTML → Extract src URL
    GOOGLE_MAPS_EMBED_URL: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1996962634835!2d106.67583099999999!3d10.796011999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529a53b8b2fa9%3A0x737b14bc23a25896!2sSiha%20-%20Cafe%2C%20Bar%20%26%20Eatery!5e0!3m2!1sen!2sau!4v1762410977679!5m2!1sen!2sau',
    
    // Option 2: Use Google Maps share link (fallback)
    GOOGLE_MAPS_SHARE_LINK: null,
    
    // Option 3: Use coordinates directly (fallback)
    // Format: [latitude, longitude]
    MAP_COORDINATES: null, // e.g., [37.7749, -122.4194]
    
    // Option 4: Use place ID (alternative)
    GOOGLE_PLACE_ID: null, // e.g., 'ChIJN1t_tDeuEmsRUsoyG83frY4'
    
    // Google Maps API Key (optional, but recommended for better performance)
    // Get your API key from: https://console.cloud.google.com/google/maps-apis
    GOOGLE_MAPS_API_KEY: ''
};