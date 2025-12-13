# Project Structure

## Overview
This is a bilingual (Vietnamese/English) wedding invitation website built with vanilla HTML, CSS, and JavaScript. The site features a responsive design, photo galleries, RSVP functionality, and integration with Google Apps Script for form submissions and photo uploads.

## Directory Structure

```
wedding-invitation/
├── index.html              # Homepage with hero, timeline, and countdown
├── story.html              # Love story page with timeline navigation
├── album.html              # Photo gallery with tabs and lightbox
├── location.html           # Venue information and accommodations
├── rsvp.html               # RSVP form submission page
├── contact.html            # Contact form (optional)
├── 404.html                # Custom 404 error page
├── header.html             # Reusable header component
├── footer.html             # Reusable footer component
├── config.js               # Site configuration (API keys, photo sources, etc.)
├── favicon.svg             # Site favicon
├── CNAME                   # Custom domain configuration
│
├── css/
│   ├── style.css           # Main stylesheet (all page styles)
│   └── quiz.css            # Quiz-specific styles (if quiz feature exists)
│
├── js/
│   ├── components.js       # Component loader (header/footer)
│   ├── language.js         # Internationalization (i18n) system
│   ├── main.js             # Main functionality (navigation, forms, maps)
│   ├── gallery.js          # Photo gallery and lightbox functionality
│   ├── countdown.js        # Wedding countdown timer
│   └── quiz.js             # Quiz functionality (if quiz feature exists)
│
├── images/
│   ├── full/               # Full-size images for story and timeline
│   │   ├── landing.jpg
│   │   ├── intro.jpeg
│   │   ├── story-*.jpeg    # Story section images
│   │   └── timeline-*.jpeg # Timeline images
│   │
│   ├── thumbnails/         # Thumbnail images for galleries
│   │   └── [album-id]_[index].jpeg
│   │
│   ├── index-config.json           # Index page image configuration
│   ├── landing-intro-config.json   # Landing/intro image config
│   ├── story-config.json           # Story page image config
│   └── thumbnail-config.json       # Thumbnail mapping configuration
│
├── data/
│   ├── quiz-questions.example.tsv  # Example quiz questions file
│   └── quiz-questions.tsv          # Actual quiz questions (if quiz exists)
│
├── GOOGLE_APPS_SCRIPT_CODE.js      # Google Apps Script code for backend
├── appsscript.json                 # Google Apps Script manifest
├── download-thumbnails.js          # Utility script for downloading thumbnails
├── README.md                       # Project readme
└── STRUCTURE.md                    # This file
```

## Core Components

### 1. HTML Pages

#### `index.html`
- **Purpose**: Homepage with hero section, timeline, countdown, and navigation
- **Key Sections**:
  - Hero section with couple names and wedding date
  - Timeline section (Welcome Party & Wedding Ceremony)
  - RSVP banner with countdown timer
  - Explore section with links to Story and Gallery
- **Dependencies**: `components.js`, `language.js`, `countdown.js`, `config.js`, `main.js`

#### `story.html`
- **Purpose**: Interactive love story page with timeline navigation
- **Key Sections**:
  - Story timeline navigation (horizontal scroll indicator)
  - Introduction section
  - Meet the Bride & Groom
  - How We Met
  - Our Journey
  - The Proposal
  - ...And Ever After
- **Features**: 
  - Timeline navigation that highlights active section on scroll
  - Smooth scrolling between sections
  - Header auto-hide during timeline navigation
- **Dependencies**: `components.js`, `language.js`, `config.js`, `main.js`

#### `album.html`
- **Purpose**: Photo gallery with multiple categories and lightbox viewer
- **Key Features**:
  - Tab-based navigation (Pre-wedding, Journey, Wedding Photos, Guest Uploads)
  - Subsection galleries (e.g., Hanoi, Dalat for pre-wedding)
  - Lightbox with keyboard navigation (Arrow keys, Escape)
  - Guest photo upload functionality
- **Photo Sources**: Supports Imgur albums, static URLs, or Cloudinary
- **Dependencies**: `config.js`, `components.js`, `language.js`, `gallery.js`, `main.js`

#### `location.html`
- **Purpose**: Display wedding venues and accommodation recommendations
- **Key Sections**:
  - Welcome Party venue with Google Maps embed
  - Wedding Ceremony venue with Google Maps embed
  - Accommodations section (dynamically rendered from config)
- **Features**: 
  - Google Maps integration
  - Accommodation cards with image carousels
- **Dependencies**: `components.js`, `language.js`, `config.js`, `main.js`

#### `rsvp.html`
- **Purpose**: RSVP form submission
- **Form Fields**:
  - Name, Email, Phone
  - Guest Of (Bride/Groom/Both)
  - Attendance (Yes/No)
  - Number of Guests (conditional)
  - Events Attending (conditional checkboxes)
  - Message, Other Requests
- **Features**:
  - Conditional field visibility based on attendance
  - Form validation
  - Google Apps Script integration for submissions
  - Success/error messaging
- **Dependencies**: `components.js`, `language.js`, `config.js`, `main.js`

### 2. JavaScript Modules

#### `components.js`
- **Purpose**: Load reusable header and footer components
- **Features**:
  - Async component loading via fetch
  - SessionStorage caching for performance
  - Custom events (`componentLoaded`, `componentsReady`)
- **Components Loaded**: `header.html`, `footer.html`

#### `language.js`
- **Purpose**: Internationalization (i18n) system
- **Supported Languages**: Vietnamese (vi), English (en)
- **Features**:
  - Translation dictionary with nested keys
  - Language persistence in localStorage
  - Dynamic text updates via `data-i18n` attributes
  - Language toggle button
  - Custom event (`languageChanged`)
- **Translation Keys**: Organized by section (nav, hero, gallery, rsvp, timeline, location, story, etc.)

#### `main.js`
- **Purpose**: Core site functionality
- **Features**:
  - Active navigation link highlighting
  - Mobile menu toggle (hamburger)
  - Header show/hide on scroll
  - Smooth scrolling for anchor links
  - Google Maps initialization
  - RSVP form handling
  - Contact form handling (localStorage demo)
  - Story timeline navigation
  - Accommodation card rendering
  - Back-to-top button
  - Scroll animations (fade-in on scroll)

#### `gallery.js`
- **Purpose**: Photo gallery and lightbox functionality
- **Features**:
  - Multiple photo sources (Imgur, static, Cloudinary)
  - Category-based photo loading
  - Subsection photo loading
  - Thumbnail optimization
  - Lightbox with full-screen viewing
  - Keyboard navigation (Arrow keys, Escape)
  - Image retry logic for rate limiting
  - Guest photo upload to Google Drive
  - Tab switching between gallery categories
- **Photo Configuration**: Uses `config.js` for album IDs and photo sources

#### `countdown.js`
- **Purpose**: Wedding countdown timer
- **Features**:
  - Real-time countdown (months, days, hours, minutes, seconds)
  - Singular/plural label support
  - Auto-hide zero values
  - Displays top 3 non-zero values
  - Updates every second
  - Language-aware labels

### 3. Configuration

#### `config.js`
- **Purpose**: Central configuration file
- **Configuration Options**:
  - `GOOGLE_SCRIPT_URL`: Google Apps Script web app URL for form submissions
  - `PHOTO_SOURCE`: Photo source type ('static', 'imgur', 'cloudinary')
  - `IMGUR_ALBUMS`: Category-based Imgur album IDs
  - `SUBSECTION_ALBUMS`: Subsection-specific album IDs
  - `GOOGLE_DRIVE_UPLOAD_FOLDER_ID`: Folder for guest photo uploads
  - `ACCOMMODATIONS`: Accommodation recommendations array
  - `PHOTOS`: Static photo URLs (if using static source)
  - `CLOUDINARY_CLOUD_NAME`: Cloudinary configuration (if using Cloudinary)

### 4. Styling

#### `css/style.css`
- **Purpose**: Main stylesheet for all pages
- **Features**:
  - CSS custom properties (variables) for theming
  - Responsive design (mobile-first approach)
  - Google Fonts integration (Allura, Dancing Script, Inter)
  - Component-based styling
  - Lightbox styles
  - Gallery grid layouts
  - Story page layouts
  - Form styles
  - Navigation styles
  - Animation and transitions

### 5. Backend Integration

#### `GOOGLE_APPS_SCRIPT_CODE.js`
- **Purpose**: Google Apps Script code for backend functionality
- **Features**:
  - RSVP form submission handler
  - Google Sheets integration for storing RSVP data
  - Photo upload handler (Google Drive integration)
  - CORS handling
  - Redirect support for form submissions

## Data Flow

### RSVP Submission Flow
1. User fills out RSVP form on `rsvp.html`
2. Form submission handled by `main.js`
3. Data sent to Google Apps Script via POST request
4. Google Apps Script saves to Google Sheets
5. Success/error message displayed to user

### Photo Gallery Flow
1. `gallery.js` reads configuration from `config.js`
2. Based on `PHOTO_SOURCE`, loads photos from:
   - Imgur API (if `PHOTO_SOURCE === 'imgur'`)
   - Static URLs (if `PHOTO_SOURCE === 'static'`)
   - Cloudinary (if `PHOTO_SOURCE === 'cloudinary'`)
3. Thumbnails loaded from `images/thumbnails/` or generated from full images
4. Photos displayed in grid layout
5. Click opens lightbox with full-size image
6. Keyboard navigation for browsing photos

### Language Switching Flow
1. User clicks language toggle button
2. `language.js` updates `currentLanguage`
3. All elements with `data-i18n` attributes updated
4. Language preference saved to localStorage
5. `languageChanged` event dispatched
6. Other modules (e.g., `countdown.js`) update their labels

## Image Management

### Image Structure
- **Full Images**: Stored in `images/full/` for story sections and timeline
- **Thumbnails**: Stored in `images/thumbnails/` with naming pattern `[album-id]_[index].jpeg`
- **Configuration Files**: JSON files in `images/` directory map thumbnails to full images

### Photo Sources
1. **Imgur** (Recommended): 
   - Uses Imgur album IDs
   - Automatic thumbnail generation
   - Can override with local thumbnails via config
2. **Static**: 
   - Direct URLs or local file paths
   - Requires manual thumbnail management
3. **Cloudinary**: 
   - Requires Cloudinary account and SDK
   - Automatic image optimization

## Internationalization

### Translation System
- Translations stored in `language.js` as nested objects
- Language keys organized by page/section
- Supports HTML in translations (for line breaks, etc.)
- Special handling for:
  - Image alt text
  - Address formatting (preserves line breaks)
  - Placeholder text
  - Singular/plural forms (countdown labels)

### Adding New Translations
1. Add translation key to `translations.en` and `translations.vi` objects
2. Add `data-i18n="key.path"` attribute to HTML element
3. Translation automatically applied on language switch

## Component System

### Header Component (`header.html`)
- Navigation menu
- Language toggle button
- Mobile hamburger menu
- Logo/branding

### Footer Component (`footer.html`)
- Copyright information
- Simple footer layout

### Component Loading
- Components loaded asynchronously via `components.js`
- Cached in sessionStorage for performance
- Custom events for initialization coordination

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers

## Performance Optimizations
- Component caching in sessionStorage
- Lazy loading for images
- Image retry logic for rate limiting
- Efficient scroll handlers (passive listeners)
- Minimal JavaScript bundle size

## Deployment
- Designed for GitHub Pages (static hosting)
- Custom domain support via `CNAME` file
- No build process required
- All assets served statically

## Future Enhancements (Potential)
- Quiz feature (files exist in project structure but may not be fully implemented)
- Video gallery support
- Social media integration
- Email notifications for RSVPs
- Admin dashboard for managing RSVPs

## Dependencies
- **External**:
  - Google Maps API (for location page)
  - Google Apps Script (for form submissions)
  - Google Fonts (Allura, Dancing Script, Inter)
  - Imgur API (for photo galleries, if used)
  - Google Analytics (gtag.js)
- **Internal**: All JavaScript modules are vanilla JS with no external libraries

## Configuration Checklist
Before deploying, ensure:
1. ✅ `config.js` has correct `GOOGLE_SCRIPT_URL`
2. ✅ Google Apps Script deployed and accessible
3. ✅ Google Sheet created with correct headers
4. ✅ Photo sources configured (Imgur albums, etc.)
5. ✅ Google Drive folder ID set for photo uploads
6. ✅ Google Maps embeds updated with correct locations
7. ✅ Custom domain configured (if using `CNAME`)
8. ✅ Google Analytics ID updated (if using)

