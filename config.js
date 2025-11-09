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
            id: 'airbnb-profile',
            link: 'https://www.airbnb.com.au/users/profile/1463849642311823052',
            images: [
                'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM3NzM4MzA3MzYxMjExOTA3MA==/original/51c5946d-630d-4685-8c17-e5943def0393.jpeg?im_w=720',
                'https://a0.muscache.com/im/pictures/hosting/Hosting-1479436268371841895/original/e7d896c6-b20e-4871-838a-be3349e3c38d.jpeg?im_w=720',
                'https://a0.muscache.com/im/pictures/hosting/Hosting-1494263093294061880/original/e042c3a4-c042-413f-af53-9ea9d87307a4.jpeg?im_w=720',
                'https://a0.muscache.com/im/pictures/hosting/Hosting-1529569605530570606/original/e3737d59-cc80-4a43-bae7-9a7725dada4c.jpeg?im_w=720'
            ]
        }
    ]

};