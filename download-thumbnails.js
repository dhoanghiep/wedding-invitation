#!/usr/bin/env node

/**
 * Script to download thumbnail images from Imgur albums
 * This script downloads thumbnails and saves them locally, then generates
 * a configuration file mapping full image URLs to local thumbnail paths.
 * 
 * Usage: node download-thumbnails.js
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Load configuration from config.js
let CONFIG = {};
try {
    // Read config.js and extract CONFIG object
    const configPath = path.join(__dirname, 'config.js');
    if (fs.existsSync(configPath)) {
        const configContent = fs.readFileSync(configPath, 'utf8');
        // Extract CONFIG object using eval (safe in this context as it's our own file)
        // Alternative: use a proper JavaScript parser
        const configMatch = configContent.match(/const CONFIG = ({[\s\S]*?});/);
        if (configMatch) {
            CONFIG = eval('(' + configMatch[1] + ')');
        } else {
            console.warn('Could not parse config.js, using defaults');
            CONFIG = {
                IMGUR_ALBUMS: {},
                SUBSECTION_ALBUMS: {}
            };
        }
    } else {
        console.warn('config.js not found, using defaults');
        CONFIG = {
            IMGUR_ALBUMS: {},
            SUBSECTION_ALBUMS: {}
        };
    }
} catch (error) {
    console.error('Error loading config.js:', error.message);
    CONFIG = {
        IMGUR_ALBUMS: {},
        SUBSECTION_ALBUMS: {}
    };
}

const IMGUR_CLIENT_ID = '546c25a59c58ad7';
const THUMBNAIL_DIR = path.join(__dirname, 'images', 'thumbnails');
const THUMBNAIL_CONFIG_FILE = path.join(__dirname, 'images', 'thumbnail-config.json');
const FULL_IMAGE_DIR = path.join(__dirname, 'images', 'full');

// Ensure thumbnail directory exists
if (!fs.existsSync(THUMBNAIL_DIR)) {
    fs.mkdirSync(THUMBNAIL_DIR, { recursive: true });
}

// Ensure full image directory exists
if (!fs.existsSync(FULL_IMAGE_DIR)) {
    fs.mkdirSync(FULL_IMAGE_DIR, { recursive: true });
}

// Landing and intro images configuration (full-size downloads)
const LANDING_INTRO_IMAGES = {
    landing: 'https://images.pixieset.com/82784299/90cc6fcf2e899b038db4af58559a8bda-cover.jpg',
    intro: 'https://i.imgur.com/WvIv4Y1.jpeg'
};

// Story section images configuration (full-size downloads for web quality)
const STORY_IMAGES = {
    // Meet section
    'story-bride': 'https://i.imgur.com/CglrhdI.jpeg',
    'story-groom': 'https://i.imgur.com/ghdTwGw.jpeg',
    
    // How we met section
    'story-how-we-met-1': 'https://i.imgur.com/X07trqZ.jpeg',
    'story-how-we-met-2': 'https://i.imgur.com/DTXNg0B.jpeg',
    'story-how-we-met-3': 'https://i.imgur.com/arORoeR.jpeg',
    
    // Journey section
    'story-journey-hair': 'https://i.imgur.com/30q0RIm.jpeg',
    'story-journey-cafe-1': 'https://i.imgur.com/FjO2T6G.jpeg',
    'story-journey-cafe-2': 'https://i.imgur.com/gVY7DEd.jpeg',
    'story-journey-graduation-1': 'https://i.imgur.com/WAr4XwR.jpeg',
    'story-journey-graduation-2': 'https://i.imgur.com/gglpMBV.jpeg',
    'story-journey-trip-1': 'https://i.imgur.com/SnmMacb.jpeg',
    'story-journey-trip-2': 'https://i.imgur.com/jCqsLzx.jpeg',
    'story-journey-trip-3': 'https://i.imgur.com/MiOGh2f.jpeg',
    
    // Proposal section
    'story-proposal-1': 'https://i.imgur.com/FxhCiCk.jpeg',
    'story-proposal-2': 'https://i.imgur.com/6nseIZb.jpeg',
    
    // Ever after section
    'story-ever-after-1': 'https://i.imgur.com/yaZr2rI.jpeg',
    'story-ever-after-2': 'https://i.imgur.com/rbozpdo.jpeg',
    'story-ever-after-3': 'https://i.imgur.com/smMNQP7.jpeg'
};

/**
 * Fetch data from URL with headers support
 */
function fetch(url, options = {}) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const protocol = urlObj.protocol === 'https:' ? https : http;
        
        const requestOptions = {
            hostname: urlObj.hostname,
            port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
            path: urlObj.pathname + urlObj.search,
            method: options.method || 'GET',
            headers: options.headers || {}
        };
        
        const req = protocol.request(requestOptions, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                if (res.statusCode === 200 || res.statusCode === 301 || res.statusCode === 302) {
                    resolve(data);
                } else {
                    reject(new Error(`HTTP ${res.statusCode}: ${data.substring(0, 100)}`));
                }
            });
        });
        
        req.on('error', reject);
        req.end();
    });
}

/**
 * Download a file from URL
 */
function downloadFile(url, filepath) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;
        const file = fs.createWriteStream(filepath);
        
        protocol.get(url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                // Handle redirect
                return downloadFile(response.headers.location, filepath)
                    .then(resolve)
                    .catch(reject);
            }
            
            if (response.statusCode !== 200) {
                file.close();
                fs.unlinkSync(filepath);
                reject(new Error(`Failed to download: HTTP ${response.statusCode}`));
                return;
            }
            
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            file.close();
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }
            reject(err);
        });
    });
}

/**
 * Get thumbnail URL from Imgur image
 * Imgur provides thumbnails by appending size suffix to the image ID
 * Sizes: s (small, 90x90), b (big, 160x160), t (thumb, 160x160), m (medium, 320x320), l (large, 640x640), h (huge, 1024x1024)
 * We'll use 'm' (medium, 320x320) for thumbnails
 */
function getThumbnailUrl(image) {
    // If image.link is already a thumbnail, return it
    if (image.link && image.link.includes('i.imgur.com')) {
        // Extract image ID from URL
        const match = image.link.match(/i\.imgur\.com\/([^\.]+)/);
        if (match) {
            const imageId = match[1];
            // Return medium thumbnail URL
            return `https://i.imgur.com/${imageId}m.jpg`;
        }
    }
    
    // If we have the image ID directly
    if (image.id) {
        return `https://i.imgur.com/${image.id}m.jpg`;
    }
    
    // Fallback: try to extract from link
    if (image.link) {
        const match = image.link.match(/i\.imgur\.com\/([^\.]+)/);
        if (match) {
            return `https://i.imgur.com/${match[1]}m.jpg`;
        }
    }
    
    return null;
}

/**
 * Load photos from Imgur album
 */
async function loadImgurAlbum(albumId) {
    try {
        console.log(`Loading Imgur album: ${albumId}`);
        const url = `https://api.imgur.com/3/album/${albumId}`;
        const responseText = await fetch(url, {
            headers: {
                'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`
            }
        });
        
        const data = JSON.parse(responseText);
        
        if (data.success && data.data) {
            const images = data.data.images || [];
            console.log(`  Found ${images.length} images`);
            return images;
        } else {
            console.warn(`  Failed to load album: ${data.data?.error || 'Unknown error'}`);
            return [];
        }
    } catch (error) {
        console.error(`  Error loading album ${albumId}:`, error.message);
        return [];
    }
}

/**
 * Download thumbnail for an image
 */
async function downloadThumbnail(image, albumId, index) {
    const thumbnailUrl = getThumbnailUrl(image);
    if (!thumbnailUrl) {
        console.warn(`  Skipping image ${index + 1}: no thumbnail URL`);
        return null;
    }
    
    // Generate filename: albumId_index.jpg
    const ext = path.extname(image.link || '.jpg') || '.jpg';
    const filename = `${albumId}_${index}${ext}`;
    const filepath = path.join(THUMBNAIL_DIR, filename);
    
    try {
        // Check if file already exists
        if (fs.existsSync(filepath)) {
            console.log(`  Thumbnail ${index + 1} already exists: ${filename}`);
            return {
                fullUrl: image.link,
                thumbnailPath: `images/thumbnails/${filename}`,
                filename: filename
            };
        }
        
        console.log(`  Downloading thumbnail ${index + 1}/${image.index || '?'}: ${filename}`);
        await downloadFile(thumbnailUrl, filepath);
        
        return {
            fullUrl: image.link,
            thumbnailPath: `images/thumbnails/${filename}`,
            filename: filename
        };
    } catch (error) {
        console.error(`  Failed to download thumbnail ${index + 1}:`, error.message);
        return null;
    }
}

/**
 * Download images (full-size) from a configuration object
 */
async function downloadFullSizeImages(imagesConfig, configName) {
    console.log(`\n=== Downloading ${configName} Images (Full-Size) ===`);
    
    const imageConfig = {};
    
    for (const [name, url] of Object.entries(imagesConfig)) {
        console.log(`\nProcessing ${name}: ${url}`);
        
        try {
            // Extract file extension from URL
            const urlObj = new URL(url);
            const pathname = urlObj.pathname;
            const ext = path.extname(pathname) || '.jpg';
            const filename = `${name}${ext}`;
            const filepath = path.join(FULL_IMAGE_DIR, filename);
            
            // Check if file already exists
            if (fs.existsSync(filepath)) {
                console.log(`  ${name} already exists: ${filename}`);
                imageConfig[name] = `images/full/${filename}`;
                continue;
            }
            
            console.log(`  Downloading ${name} (full-size): ${filename}`);
            await downloadFile(url, filepath);
            
            imageConfig[name] = `images/full/${filename}`;
            console.log(`  ✓ Downloaded ${name}: ${filename}`);
            
            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            console.error(`  ✗ Failed to download ${name}:`, error.message);
        }
    }
    
    return imageConfig;
}

/**
 * Download landing and intro images (full-size)
 */
async function downloadLandingIntroImages() {
    const landingIntroConfig = await downloadFullSizeImages(LANDING_INTRO_IMAGES, 'Landing and Intro');
    
    // Save landing/intro config
    const landingIntroConfigFile = path.join(__dirname, 'images', 'landing-intro-config.json');
    fs.writeFileSync(landingIntroConfigFile, JSON.stringify(landingIntroConfig, null, 2));
    console.log(`\nLanding/intro configuration saved to: ${landingIntroConfigFile}`);
    
    return landingIntroConfig;
}

/**
 * Download story section images (full-size)
 */
async function downloadStoryImages() {
    const storyConfig = await downloadFullSizeImages(STORY_IMAGES, 'Story Section');
    
    // Save story config
    const storyConfigFile = path.join(__dirname, 'images', 'story-config.json');
    fs.writeFileSync(storyConfigFile, JSON.stringify(storyConfig, null, 2));
    console.log(`\nStory configuration saved to: ${storyConfigFile}`);
    
    return storyConfig;
}

/**
 * Process all albums
 */
async function processAlbums() {
    const thumbnailConfig = {};
    
    // Process category albums
    console.log('\n=== Processing Category Albums ===');
    for (const [category, albumId] of Object.entries(CONFIG.IMGUR_ALBUMS)) {
        if (!albumId) {
            console.log(`Skipping ${category}: no album ID`);
            continue;
        }
        
        console.log(`\nProcessing category: ${category} (album: ${albumId})`);
        const images = await loadImgurAlbum(albumId);
        
        if (images.length === 0) {
            console.log(`  No images found for ${category}`);
            continue;
        }
        
        thumbnailConfig[category] = [];
        
        for (let i = 0; i < images.length; i++) {
            const result = await downloadThumbnail(images[i], albumId, i);
            if (result) {
                thumbnailConfig[category].push({
                    full: result.fullUrl,
                    thumbnail: result.thumbnailPath
                });
            }
            
            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        console.log(`  Processed ${thumbnailConfig[category].length} thumbnails for ${category}`);
    }
    
    // Process subsection albums
    console.log('\n=== Processing Subsection Albums ===');
    for (const [albumId, imgurAlbumId] of Object.entries(CONFIG.SUBSECTION_ALBUMS)) {
        if (!imgurAlbumId) {
            console.log(`Skipping ${albumId}: no Imgur album ID`);
            continue;
        }
        
        console.log(`\nProcessing subsection: ${albumId} (Imgur album: ${imgurAlbumId})`);
        const images = await loadImgurAlbum(imgurAlbumId);
        
        if (images.length === 0) {
            console.log(`  No images found for ${albumId}`);
            continue;
        }
        
        if (!thumbnailConfig.subsections) {
            thumbnailConfig.subsections = {};
        }
        
        thumbnailConfig.subsections[albumId] = [];
        
        for (let i = 0; i < images.length; i++) {
            const result = await downloadThumbnail(images[i], imgurAlbumId, i);
            if (result) {
                thumbnailConfig.subsections[albumId].push({
                    full: result.fullUrl,
                    thumbnail: result.thumbnailPath
                });
            }
            
            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        console.log(`  Processed ${thumbnailConfig.subsections[albumId].length} thumbnails for ${albumId}`);
    }
    
    // Save configuration
    console.log('\n=== Saving Configuration ===');
    fs.writeFileSync(THUMBNAIL_CONFIG_FILE, JSON.stringify(thumbnailConfig, null, 2));
    console.log(`Configuration saved to: ${THUMBNAIL_CONFIG_FILE}`);
    
    console.log('\n=== Summary ===');
    let totalThumbnails = 0;
    for (const [key, value] of Object.entries(thumbnailConfig)) {
        if (key === 'subsections') {
            for (const [subKey, subValue] of Object.entries(value)) {
                totalThumbnails += subValue.length;
                console.log(`  ${subKey}: ${subValue.length} thumbnails`);
            }
        } else {
            totalThumbnails += value.length;
            console.log(`  ${key}: ${value.length} thumbnails`);
        }
    }
    console.log(`\nTotal: ${totalThumbnails} thumbnails downloaded`);
    console.log(`\nDone! Thumbnails are in: ${THUMBNAIL_DIR}`);
}


// Run the script
if (require.main === module) {
    (async () => {
        try {
            // Download landing and intro images first (full-size)
            await downloadLandingIntroImages();
            
            // Download story section images (full-size)
            await downloadStoryImages();
            
            // Then process albums (thumbnails)
            await processAlbums();
        } catch (error) {
            console.error('Fatal error:', error);
            process.exit(1);
        }
    })();
}

module.exports = { processAlbums, loadImgurAlbum, downloadThumbnail, downloadLandingIntroImages, downloadStoryImages };

