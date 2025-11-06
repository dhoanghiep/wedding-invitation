# Wedding Invitation Website - Multi-Page Design Plan

## Overview
Convert the current single-page application into a multi-page website with separate pages for each major section. This will improve organization, maintainability, and user experience.

## Navigation Structure

### Main Menu
- **Home (H&A)** - Landing page with hero, timeline, and schedule
- **Location** - Venue information and accommodation
- **Our Story** - Introduction and how we met
- **Album** - Photo galleries (Journey, Pre-wedding, Wedding photos, User uploads, Videos)
- **RSVP** - Detailed RSVP form with ceremony selection
- **Contact** - For gifts, congratulations, and inquiries
- **Language Toggle** - EN/VI switch (persistent across pages)

---

## Page 1: Home (Landing Page)
**File:** `index.html` (main landing page)

### Sections:
1. **Hero Section**
   - Couple names: "Hoàng Hiệp & Minh Anh"
   - Wedding date
   - Beautiful hero image/background
   - Call-to-action button linking to RSVP

2. **Timeline Section**
   - Visual timeline showing wedding schedule
   - Key events with times and locations
   - Icons for each event type

3. **Schedule Section**
   - **Ceremony** details
     - Date, time, location
     - Brief description
   - **Party/Reception** details
     - Date, time, location
     - Brief description
   - **Main Wedding** details
     - Date, time, location
     - Brief description

4. **Countdown Section**
   - Countdown timer to main wedding date
   - Days, hours, minutes, seconds

5. **Quick Links Section**
   - Link to RSVP page
   - Link to Location page
   - Link to Album page
   - Link to Our Story page

---

## Page 2: Location
**File:** `location.html`

### Sections:
1. **Ceremony Venues**
   - **Ceremony Venue**
     - Name, address
     - Google Maps embed
     - Directions link
     - Parking information
   - **Reception/Party Venue**
     - Name, address
     - Google Maps embed
     - Directions link
     - Parking information
   - **Main Wedding Venue**
     - Name, address
     - Google Maps embed
     - Directions link
     - Parking information

2. **Where to Stay**
   - Recommended hotels/accommodations
   - Distance from venues
   - Booking links or contact info
   - Price ranges (optional)

3. **Transportation**
   - Public transportation options
   - Taxi/ride-share information
   - Parking availability

---

## Page 3: Our Story
**File:** `story.html`

### Sections:
1. **Introduction**
   - Brief introduction of the couple
   - Photo of both together

2. **Bride Section**
   - Name and photo
   - Brief bio
   - Personal touch (favorite things, hobbies, etc.)

3. **Groom Section**
   - Name and photo
   - Brief bio
   - Personal touch (favorite things, hobbies, etc.)

4. **How We Met**
   - Story of how they met
   - Timeline of relationship milestones
   - Photos from relationship journey
   - Special moments

5. **The Proposal**
   - Proposal story (optional)
   - Photos from proposal

---

## Page 4: Album
**File:** `album.html`

### Sections:
1. **Gallery Tabs/Navigation**
   - Journey
   - Pre-wedding
   - Wedding Photos (to be updated)
   - Guest Uploads
   - Videos

2. **Journey Gallery**
   - Photos from relationship journey
   - Timeline-based organization
   - Lightbox for full-screen viewing

3. **Pre-wedding Gallery**
   - Pre-wedding photoshoot
   - Professional photos
   - Lightbox for full-screen viewing

4. **Wedding Photos Gallery**
   - Placeholder section
   - "Photos coming soon" message
   - Will be updated after wedding

5. **Guest Upload Section**
   - Upload form for guests
   - Instructions for uploading
   - Gallery of uploaded photos
   - Moderation (if needed)

6. **Video Gallery**
   - Embedded videos
   - Video thumbnails
   - Play button overlays

---

## Page 5: RSVP
**File:** `rsvp.html`

### Sections:
1. **RSVP Form**
   - Full Name (required)
   - Email Address (required)
   - Phone Number (optional)
   - Number of Guests (required)
   
2. **Ceremony Selection**
   - Checkboxes or radio buttons for each ceremony:
     - [ ] Ceremony
     - [ ] Party/Reception
     - [ ] Main Wedding
   - Allow selection of multiple ceremonies
   - Required to select at least one

3. **Additional Information**
   - Dietary Restrictions or Allergies
   - Special Accommodations
   - Message/Comments (optional)

4. **Submit Button**
   - Submit to Google Apps Script
   - Success/error messages
   - Confirmation page

5. **RSVP Status Check** (optional)
   - Allow guests to check/edit their RSVP
   - Using email lookup

---

## Page 6: Contact
**File:** `contact.html`

### Sections:
1. **Contact Information**
   - Bride's contact info
     - Name
     - Email
     - Phone
   - Groom's contact info
     - Name
     - Email
     - Phone

2. **Contact Form**
   - Name (required)
   - Email (required)
   - Subject (dropdown: Gift, Congratulations, Question, Other)
   - Message (required)
   - Submit button

3. **Gift Information** (optional)
   - Registry information
   - Preferred gift methods
   - Address for physical gifts

4. **Social Media Links** (optional)
   - Instagram
   - Facebook
   - Other platforms

---

## Technical Implementation

### File Structure
```
/
├── index.html          (Home page)
├── location.html       (Location page)
├── story.html          (Our Story page)
├── album.html          (Album page)
├── rsvp.html           (RSVP page)
├── contact.html        (Contact page)
├── css/
│   └── style.css       (Shared styles)
├── js/
│   ├── main.js         (Shared functionality)
│   ├── language.js     (Language system)
│   ├── countdown.js    (Countdown timer)
│   └── gallery.js      (Gallery functionality)
└── config.js           (Configuration)
```

### Shared Components
1. **Header/Navigation**
   - Consistent across all pages
   - Active page highlighting
   - Mobile hamburger menu
   - Language toggle

2. **Footer**
   - Copyright information
   - Quick links
   - Social media (optional)

3. **Language System**
   - Extend translations for all new pages
   - Persist language preference across pages
   - Update all text elements

### Routing Strategy
- Use standard HTML file navigation (no SPA framework)
- Each page is a separate HTML file
- Navigation links point to respective HTML files
- Maintain language state via localStorage

### CSS Organization
- Shared styles in `style.css`
- Page-specific styles can be added to same file with page-specific classes
- Responsive design for all pages
- Consistent design language across pages

---

## Implementation Phases

### Phase 1: Setup & Structure
- [ ] Create new HTML files for each page
- [ ] Set up shared header/navigation component
- [ ] Set up shared footer component
- [ ] Update navigation links

### Phase 2: Home Page
- [ ] Create hero section
- [ ] Build timeline component
- [ ] Add schedule section (ceremony, party, main wedding)
- [ ] Integrate countdown timer
- [ ] Add quick links section

### Phase 3: Location Page
- [ ] Create venue sections for each ceremony
- [ ] Integrate Google Maps for each venue
- [ ] Add accommodation section
- [ ] Add transportation information

### Phase 4: Our Story Page
- [ ] Create introduction section
- [ ] Build bride and groom sections
- [ ] Create "How We Met" story section
- [ ] Add photo galleries for story

### Phase 5: Album Page
- [ ] Create tabbed gallery interface
- [ ] Implement Journey gallery
- [ ] Implement Pre-wedding gallery
- [ ] Add Wedding Photos placeholder
- [ ] Create guest upload functionality
- [ ] Add video gallery

### Phase 6: RSVP Page
- [ ] Create detailed RSVP form
- [ ] Add ceremony selection checkboxes
- [ ] Update form submission logic
- [ ] Add validation and error handling

### Phase 7: Contact Page
- [ ] Create contact information section
- [ ] Build contact form
- [ ] Add gift information section
- [ ] Integrate form submission

### Phase 8: Language & Polish
- [ ] Extend language translations for all pages
- [ ] Test language switching across all pages
- [ ] Ensure consistent styling
- [ ] Mobile responsiveness testing
- [ ] Cross-browser testing

---

## Design Considerations

### Visual Consistency
- Maintain current color scheme
- Consistent typography
- Unified spacing and layout
- Smooth transitions between pages

### User Experience
- Clear navigation
- Fast page loads
- Mobile-friendly design
- Accessible design (ARIA labels, keyboard navigation)

### Content Management
- Easy to update content
- Configuration-driven (use config.js)
- Photo management via existing gallery system

---

## Notes
- Keep existing functionality (countdown, gallery, RSVP submission)
- Maintain backward compatibility where possible
- Test all forms and interactions
- Ensure Google Apps Script integration works on RSVP page
- Consider SEO for each page

