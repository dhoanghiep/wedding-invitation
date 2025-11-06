# Wedding Invitation Website

A beautiful, modern wedding invitation website featuring interactive sections for guests.

## Features

- **Header**: Responsive navigation with smooth scrolling
- **Invitation**: Date, time, location with interactive map
- **Photo & Video Gallery**: Lightbox functionality for photos and embedded videos
- **Countdown Timer**: Real-time countdown to wedding date
- **RSVP**: Form to collect guest responses
- **Contact**: Contact form and information

## Getting Started

### Local Testing

Since this is a static website, you can test it locally using any simple HTTP server.

#### Option 1: Python HTTP Server (Recommended)

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open your browser and navigate to:
```
http://localhost:8000
```

#### Option 2: Node.js HTTP Server

If you have Node.js installed:

```bash
# Install http-server globally (one-time)
npm install -g http-server

# Run the server
http-server -p 8000
```

Then open your browser and navigate to:
```
http://localhost:8000
```

#### Option 3: VS Code Live Server

If you're using VS Code:
1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

## File Structure

```
wedding-invitation/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   ├── main.js         # Main JavaScript (navigation, forms, map)
│   ├── countdown.js    # Countdown timer logic
│   └── gallery.js      # Gallery functionality
├── images/             # Placeholder for images
├── PLAN.md             # Planning document
└── README.md           # This file
```

## Customization

### Wedding Date & Time

Edit the wedding date in `js/countdown.js`:
```javascript
const weddingDate = new Date('2025-06-15T16:00:00').getTime();
```

Also update the date in `index.html` (hero section and invitation section).

### Venue Location

Update the map coordinates in `js/main.js`:
```javascript
const map = L.map('map').setView([37.7749, -122.4194], 15);
```

Update the marker coordinates:
```javascript
const marker = L.marker([37.7749, -122.4194]).addTo(map);
```

### Photos & Videos

Replace the sample URLs in `js/gallery.js`:
- Update the `photos` array with your actual photo URLs
- Update the `videos` array with your actual video URLs or YouTube/Vimeo embed URLs

### Contact Information

Update contact details in `index.html` (contact section):
- Names
- Email addresses
- Phone numbers

### Colors & Styling

Customize colors in `css/style.css`:
```css
:root {
    --primary-color: #d4a574;
    --secondary-color: #f5e6d3;
    --accent-color: #c9a961;
    /* ... */
}
```

### Names

Replace "Sarah & John" throughout the files:
- `index.html` (title, header, hero section)
- `index.html` (footer)

## Form Submission

Currently, forms store data in localStorage for testing. For production, you'll need to integrate a form submission service:

### Option 1: Formspree

1. Sign up at [formspree.io](https://formspree.io)
2. Create a form endpoint
3. Update form action in `index.html`:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option 2: EmailJS

1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Configure email service
3. Add EmailJS script and update form handlers in `js/main.js`

### Option 3: Google Apps Script

1. Create a Google Apps Script
2. Configure to receive form data
3. Update form handlers in `js/main.js`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

This is a static website and can be deployed to:

- **GitHub Pages**: Free hosting for static sites
- **Netlify**: Free tier with form handling
- **Vercel**: Free tier for static sites
- **Any static hosting service**: Upload all files to your hosting provider

## Notes

- Replace placeholder images with actual wedding photos
- Update all sample data (dates, locations, contact info)
- Configure form submission service for production
- Test on multiple devices and browsers
- Optimize images before adding to gallery

## License

Free to use for personal wedding invitations.

