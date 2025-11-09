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
    IMGUR_ALBUM_ID: null, // Add your Imgur album ID here (legacy, use IMGUR_ALBUMS for categories)
    
    // Category-based Imgur Album IDs
    // Each category can have its own Imgur album ID
    IMGUR_ALBUMS: {
        'journey': '4we1Kr6', // Journey photos (set to null or album ID)
        'wedding-photos': null // Wedding photos (set to null or album ID)
    },
    
    // Subsection-specific Imgur Album IDs
    // Maps data-album-id values to actual Imgur album IDs
    SUBSECTION_ALBUMS: {
        'pre-wedding-hanoi': 'YoeyRCu', // Pre-wedding Hanoi
        'pre-wedding-dalat': 'wQ7BMiF', // Pre-wedding Dalat
    },
    
    // Cloudinary Configuration (used when PHOTO_SOURCE is 'cloudinary')
    CLOUDINARY_CLOUD_NAME: '',
    CLOUDINARY_FOLDER: 'wedding-photos',
    
    // Google Drive Configuration for Guest Photo Uploads
    // Google Drive folder where guest photos will be uploaded
    // Get folder ID from the Google Drive folder URL:
    // https://drive.google.com/drive/folders/FOLDER_ID → FOLDER_ID is '1XMrIeZl9sNAQuHNk43C426NDWhffDfPW'
    GOOGLE_DRIVE_UPLOAD_FOLDER_ID: '1XMrIeZl9sNAQuHNk43C426NDWhffDfPW',
    
    // Accommodations Configuration
    ACCOMMODATIONS: [
        {
            id: 'home-hotel',
            mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.7999197722372!2d106.67518592859969!3d10.796013316699485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175296be108ef67%3A0x46d52c90cf3bdb99!2sHome%20Hotel!5e0!3m2!1sen!2sau!4v1762652779884!5m2!1sen!2sau',
            phone: '+84 282 222 2201'
        }
    ]

};