# Photo Gallery Setup Guide

This guide explains how to use Google Photos or other photo hosting providers with your wedding invitation website.

## Quick Start: Using Google Photos (Easiest Method)

### Option 1: Manual Google Photos Direct URLs (Recommended)

This is the simplest method that works immediately without any API setup:

1. **Open Google Photos** and select the photos you want to use
2. **Share the photos**:
   - Select a photo
   - Click the "Share" button
   - Choose "Create link" or "Share via link"
   - Copy the link
3. **Get the direct image URL**:
   - Open the shared link in a new browser tab
   - Right-click on the image
   - Select "Copy image address" or "Copy image URL"
   - The URL should look like: `https://lh3.googleusercontent.com/p/AF1Qip...`
4. **Add to config.js**:
   - Open `config.js`
   - Set `PHOTO_SOURCE: 'google-photos-manual'`
   - Add all your direct image URLs to the `PHOTOS` array

Example:
```javascript
const CONFIG = {
    PHOTO_SOURCE: 'google-photos-manual',
    PHOTOS: [
        'https://lh3.googleusercontent.com/p/AF1Qip...',
        'https://lh3.googleusercontent.com/p/AF1Qip...',
        'https://lh3.googleusercontent.com/p/AF1Qip...',
        // Add more URLs here
    ]
};
```

### Option 2: Using Imgur (No Setup Required)

1. **Create an Imgur account** (free) at https://imgur.com
2. **Upload your photos** to an album
3. **Get the Album ID** from the album URL:
   - Album URL format: `https://imgur.com/a/ABC123`
   - Album ID: `ABC123`
4. **Configure in config.js**:
   ```javascript
   const CONFIG = {
       PHOTO_SOURCE: 'imgur',
       IMGUR_ALBUM_ID: 'ABC123'
   };
   ```

## Alternative Photo Providers

### Cloudinary

Cloudinary is a professional image hosting service with a free tier:

1. Sign up at https://cloudinary.com
2. Get your cloud name and API credentials
3. Upload photos to a folder
4. Configure in `config.js`:
   ```javascript
   const CONFIG = {
       PHOTO_SOURCE: 'cloudinary',
       CLOUDINARY_CLOUD_NAME: 'your-cloud-name',
       CLOUDINARY_FOLDER: 'wedding-photos'
   };
   ```

**Note**: Full Cloudinary integration requires their JavaScript SDK. See their documentation for details.

### Other Static Image Hosts

You can use any image hosting service by:
1. Uploading photos to the service
2. Getting direct image URLs
3. Using `PHOTO_SOURCE: 'static'` and adding URLs to the `PHOTOS` array

## Tips for Google Photos

- **Bulk extraction**: To get multiple URLs quickly, you can:
  1. Create a shared album with all photos
  2. Open each photo individually in a new tab
  3. Right-click and copy image address for each
  4. Or use browser extensions/scripts to extract URLs (use at your own risk)

- **Image quality**: Google Photos direct URLs can include size parameters. To ensure high quality:
  - Look for URLs with `=s0` at the end (original size)
  - Or `=s2048` for high quality (2048px)

- **Privacy**: Make sure your Google Photos album is set to "Anyone with the link" if you want the photos to be publicly accessible.

## Troubleshooting

### 429 "Too Many Requests" Error (Google Photos)

If you're getting 429 errors when loading Google Photos images, this means Google is rate-limiting or blocking direct access. Here are solutions:

#### Solution 1: Use Imgur Instead (Recommended)
Imgur is more reliable for public hosting and doesn't have rate limiting issues:

1. Upload photos to Imgur (create account at imgur.com)
2. Create an album
3. Get the album ID from the URL
4. Configure in `config.js`:
   ```javascript
   PHOTO_SOURCE: 'imgur',
   IMGUR_ALBUM_ID: 'your-album-id'
   ```

#### Solution 2: Download and Host Locally
1. Download your Google Photos
2. Upload them to your website's `images/` folder
3. Use relative paths in `config.js`:
   ```javascript
   PHOTO_SOURCE: 'static',
   PHOTOS: [
       'images/photo1.jpg',
       'images/photo2.jpg',
       // etc.
   ]
   ```

#### Solution 3: Use a CORS Proxy (Temporary Solution)
⚠️ **Not recommended for production** - Public proxies may have privacy issues and rate limits.

1. Enable CORS proxy in `config.js`:
   ```javascript
   USE_CORS_PROXY: true,
   CORS_PROXY_URL: 'https://corsproxy.io/?{url}'
   ```
2. This will retry failed images through a proxy

#### Solution 4: Use Cloudinary or Other CDN
- Upload photos to Cloudinary, AWS S3, or similar CDN
- These services are designed for public image hosting
- No rate limiting issues

### Photos not loading
- Check that URLs are accessible (try opening them in a new tab)
- For Google Photos, ensure the album is publicly shared
- Check browser console for CORS errors
- Google Photos URLs may expire or require authentication

### Photos loading slowly
- Consider using a CDN or image optimization service
- Use appropriate image sizes (not too large)
- Enable lazy loading (already included in the code)

### Google Photos API
The Google Photos API requires OAuth authentication and is more complex to set up. For most wedding websites, using Imgur or hosting images locally is simpler and more reliable.

