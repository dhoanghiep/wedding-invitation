# Google Photos Shared Album Setup Guide

This guide will help you set up Google Photos shared albums for your wedding gallery.

**No OAuth required!** This approach uses shared album links, which is much simpler.

## Prerequisites

- A Google account
- Google Photos app or web access
- A Google Apps Script project (for the backend)

## Step-by-Step Setup

### Step 1: Create a Shared Album in Google Photos

1. Open [Google Photos](https://photos.google.com/)
2. Click on **Albums** in the left sidebar
3. Click **Create album** (or select an existing album)
4. Add photos to the album
5. Click the **Share** button (or the share icon)
6. Make sure the album is set to **"Anyone with the link can view"**
   - Click on the sharing settings
   - Select "Anyone with the link"
   - Click **Done**

### Step 2: Get the Album Token

1. In the share dialog, click **Copy link**
2. You'll get a link like: `https://photos.app.goo.gl/ABC123XYZ`
3. The token is the part after the last `/` (e.g., `ABC123XYZ`)
4. **Copy this token** - you'll need it for the next step

### Step 3: Configure Your Wedding Site

1. Open `config.js` in your project
2. Find the `GOOGLE_PHOTOS_ALBUM_TOKEN` setting
3. Paste your album token:
   ```javascript
   GOOGLE_PHOTOS_ALBUM_TOKEN: 'ABC123XYZ', // Your album token here
   ```
4. Or use category-specific albums:
   ```javascript
   GOOGLE_PHOTOS_ALBUMS: {
       'pre-wedding': 'ABC123XYZ', // Pre-wedding photos
       'journey': 'DEF456UVW',     // Journey photos
       'wedding-photos': 'GHI789RST' // Wedding photos
   },
   ```
5. Set `PHOTO_SOURCE` to `'google-photos'`:
   ```javascript
   PHOTO_SOURCE: 'google-photos',
   ```

### Step 4: Set Up Google Apps Script (Backend)

1. Go to [Google Apps Script](https://script.google.com/)
2. Create a new project
3. Copy the code from `GOOGLE_APPS_SCRIPT_CODE.js` into the editor
4. Click **Deploy** > **New deployment**
5. Select type: **Web app**
6. Set:
   - **Execute as**: Me
   - **Who has access**: Anyone
7. Click **Deploy**
8. **Copy the web app URL** (you'll need this for the next step)

### Step 5: Configure Google Apps Script URL

1. Open `config.js` in your project
2. Find the `GOOGLE_SCRIPT_URL` setting
3. Paste your Google Apps Script web app URL:
   ```javascript
   GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
   ```

### Step 6: Test the Setup

1. Open your wedding site in a browser
2. Navigate to the gallery page
3. The photos from your shared album should appear automatically
4. If photos don't appear, check the browser console for errors

## Troubleshooting

### "No photos found" error
- Make sure the album is set to **"Anyone with the link can view"**
- Verify the album token is correct (no extra spaces or characters)
- Check that the album has photos in it
- Try accessing the album link directly in a browser to verify it's public

### "Google Script URL not configured" error
- Make sure you've set `GOOGLE_SCRIPT_URL` in `config.js`
- Verify the Google Apps Script is deployed as a web app
- Check that the web app has "Anyone" access

### Photos not loading
- Check the browser console for errors
- Verify the album token matches the one in the share link
- Make sure `PHOTO_SOURCE` is set to `'google-photos'` in `config.js`
- Try refreshing the page

### Album token format
- The token should be the part after the last `/` in the share link
- Example: `https://photos.app.goo.gl/ABC123XYZ` → token is `ABC123XYZ`
- Don't include the full URL, just the token

## Using Multiple Albums

You can use different albums for different categories:

```javascript
GOOGLE_PHOTOS_ALBUMS: {
    'pre-wedding': 'ABC123XYZ',  // Pre-wedding photos album
    'journey': 'DEF456UVW',      // Journey photos album
    'wedding-photos': 'GHI789RST' // Wedding photos album
},
```

Each category will automatically use its corresponding album token.

## Advantages of This Approach

✅ **No OAuth setup required** - Much simpler!
✅ **No API credentials needed** - Just use shared album links
✅ **Easy to update** - Just add photos to the album
✅ **Works immediately** - No complex authorization process
✅ **Secure** - Only people with the link can view (if you want)

## Limitations

- The album must be publicly shared (or at least accessible via the link)
- Photos are extracted from the shared album page (may be affected by Google Photos changes)
- Large albums may take longer to load

## Next Steps

1. Create shared albums for each category (pre-wedding, journey, wedding photos)
2. Add photos to each album
3. Get the share links and extract tokens
4. Configure `config.js` with the tokens
5. Deploy your site and enjoy!

## Additional Resources

- [Google Photos Help](https://support.google.com/photos)
- [Google Apps Script Documentation](https://developers.google.com/apps-script)

