# Photo Gallery Setup Guide

This guide explains how to set up photos for your wedding invitation website using reliable alternatives to Google Photos.

## Quick Start: Choose Your Method

### Option 1: Imgur (Recommended - Easiest) ⭐

**Best for**: Quick setup, no hosting required, free and reliable

**Steps:**
1. Go to [imgur.com](https://imgur.com) and create a free account
2. Upload your wedding photos
3. Create an album (click "New Post" → upload images → "Add to album" → create new album)
4. Get the album ID from the URL:
   - Album URL: `https://imgur.com/a/ABC123`
   - Album ID: `ABC123`
5. Update `config.js`:
   ```javascript
   PHOTO_SOURCE: 'imgur',
   IMGUR_ALBUM_ID: 'ABC123'
   ```

**Pros:**
- ✅ No rate limiting
- ✅ Free and reliable
- ✅ Easy to manage (add/remove photos anytime)
- ✅ Fast loading

**Cons:**
- ⚠️ Public album (anyone with link can view)

---

### Option 2: Local Images (Best for Production) 🏆

**Best for**: Full control, privacy, no external dependencies

**Steps:**
1. Create an `images` folder in your project (if not exists)
2. Upload your wedding photos to the `images/` folder
3. Update `config.js`:
   ```javascript
   PHOTO_SOURCE: 'static',
   PHOTOS: [
       'images/photo1.jpg',
       'images/photo2.jpg',
       'images/photo3.jpg',
       // Add all your photo filenames here
   ]
   ```

**Pros:**
- ✅ Full control over your images
- ✅ No external dependencies
- ✅ Fast loading (served from your server)
- ✅ Private (only accessible through your website)
- ✅ No rate limiting ever

**Cons:**
- ⚠️ Takes up storage space on your server
- ⚠️ Need to manually update file list if adding photos

**Tip**: Use descriptive filenames like `engagement-photo.jpg`, `venue-photo.jpg` to make it easier to manage.

---

### Option 3: Cloudinary (Professional CDN)

**Best for**: Professional websites, automatic optimization, large galleries

**Steps:**
1. Sign up at [cloudinary.com](https://cloudinary.com) (free tier available)
2. Upload photos to a folder (e.g., `wedding-photos`)
3. Get your cloud name from the dashboard
4. Update `config.js`:
   ```javascript
   PHOTO_SOURCE: 'cloudinary',
   CLOUDINARY_CLOUD_NAME: 'your-cloud-name',
   CLOUDINARY_FOLDER: 'wedding-photos'
   ```

**Note**: Full Cloudinary integration requires their JavaScript SDK. See their documentation for details.

---

## Recommendation

For a wedding invitation website, I recommend:

1. **Imgur** - If you want the easiest setup and don't mind public albums
2. **Local Images** - If you want full control and privacy (best for production)

Both options are much more reliable than Google Photos and won't have rate limiting issues.

---

## Troubleshooting

### Imgur photos not loading
- Verify the album ID is correct
- Make sure the album is set to "Public" (not hidden)
- Check browser console for errors

### Local images not loading
- Verify file paths are correct (relative to your website root)
- Check that images are in the `images/` folder
- Ensure file extensions are correct (.jpg, .png, etc.)
- Check file permissions on your server

### Need help switching?
1. Remove any Google Photos URLs from `PHOTOS` array
2. Choose one of the options above
3. Update `PHOTO_SOURCE` in `config.js`
4. Add your album ID or photo paths
5. Refresh your website

