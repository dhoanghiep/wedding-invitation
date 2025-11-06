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
    IMGUR_ALBUM_ID: 'xtDiBLB', // Add your Imgur album ID here
    
    // Cloudinary Configuration (used when PHOTO_SOURCE is 'cloudinary')
    CLOUDINARY_CLOUD_NAME: '',
    CLOUDINARY_FOLDER: 'wedding-photos'
};