// Main JavaScript Functionality
(function () {
    'use strict';

    // Check for RSVP success parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('rsvp') === 'success') {
        const rsvpMessage = document.getElementById('rsvp-message');
        if (rsvpMessage) {
            showMessage(rsvpMessage, 'Thank you for your RSVP! We look forward to seeing you.', 'success');
        }
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Helper function to show messages (defined early)
    function showMessage(element, message, type) {
        element.textContent = message;
        element.className = `form-message ${type}`;

        // Scroll to message
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Auto-hide after 5 seconds
        setTimeout(() => {
            element.classList.remove('success', 'error');
        }, 5000);
    }

    // Navigation elements
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Sticky header on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // Initialize Google Map
    function initMap() {
        const mapElement = document.getElementById('map');
        const mapLink = document.getElementById('map-link');

        if (!mapElement) {
            return;
        }

        // Default coordinates (San Francisco)
        let defaultCoords = [37.7749, -122.4194];
        let mapUrl = 'https://www.google.com/maps/search/?api=1&query=' + defaultCoords.join(',');

        // Priority 1: Use Google Maps embed URL if available (easiest method)
        if (CONFIG.GOOGLE_MAPS_EMBED_URL) {
            // Use the embed URL directly
            mapElement.innerHTML = `<iframe src="${CONFIG.GOOGLE_MAPS_EMBED_URL}" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;

            // Update map link - convert embed URL to a shareable Google Maps link
            if (mapLink) {
                // Convert embed URL to a standard Google Maps URL
                const embedUrl = CONFIG.GOOGLE_MAPS_EMBED_URL;
                try {
                    // Extract coordinates from the pb parameter in the embed URL
                    // The pb parameter contains encoded coordinates: !2dLONGITUDE!3dLATITUDE
                    const pbMatch = embedUrl.match(/!2d([\d.]+)!3d([\d.]+)/);
                    if (pbMatch) {
                        const longitude = pbMatch[1];
                        const latitude = pbMatch[2];
                        // Create a proper Google Maps share link with coordinates
                        mapLink.href = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
                    } else {
                        // Fallback: try to convert embed URL to a shareable link
                        const shareUrl = embedUrl.replace('/maps/embed?', '/maps/search/?api=1&query=') || embedUrl;
                        mapLink.href = shareUrl;
                    }
                } catch {
                    // If parsing fails, use the embed URL as-is
                    mapLink.href = embedUrl;
                }
            }

            return;
        }

        // Priority 2: Use coordinates if available
        if (CONFIG.MAP_COORDINATES && Array.isArray(CONFIG.MAP_COORDINATES) && CONFIG.MAP_COORDINATES.length === 2) {
            const coords = CONFIG.MAP_COORDINATES;
            mapUrl = `https://www.google.com/maps/search/?api=1&query=${coords[0]},${coords[1]}`;
        }

        // Priority 3: Use share link if available
        if (CONFIG.GOOGLE_MAPS_SHARE_LINK) {
            mapUrl = CONFIG.GOOGLE_MAPS_SHARE_LINK;
        }

        // Update map link
        if (mapLink) {
            mapLink.href = mapUrl;
        }

        // Use embed iframe
        mapElement.innerHTML = `<iframe 
            width="100%" 
            height="100%" 
            style="border:0; border-radius: 8px;" 
            loading="lazy" 
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=${encodeURIComponent(mapUrl)}&output=embed">
            </iframe>`;
    }

    // Initialize map when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMap);
    } else {
        initMap();
    }

    // RSVP Form Handler
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpMessage = document.getElementById('rsvp-message');

    // IMPORTANT: Replace this URL with your Google Apps Script Web App URL
    const GOOGLE_SCRIPT_URL = CONFIG.GOOGLE_SCRIPT_URL;

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(rsvpForm);
            const data = Object.fromEntries(formData);

            // Form validation
            if (!data.name || !data.email || !data.attendance) {
                showMessage(rsvpMessage, 'Please fill in all required fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showMessage(rsvpMessage, 'Please enter a valid email address.', 'error');
                return;
            }

            // Disable submit button during submission
            const submitButton = rsvpForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';

            try {
                // Submit to Google Apps Script using redirect pattern to avoid CORS issues
                // Create a hidden iframe for form submission
                const iframe = document.createElement('iframe');
                iframe.name = 'rsvp-submit-iframe';
                iframe.style.display = 'none';
                document.body.appendChild(iframe);

                // Create success redirect URL (current page with success parameter)
                const successUrl = window.location.origin + window.location.pathname + '?rsvp=success';

                // Create a temporary form for submission
                const tempForm = document.createElement('form');
                tempForm.method = 'POST';
                tempForm.action = GOOGLE_SCRIPT_URL;
                tempForm.target = 'rsvp-submit-iframe';

                // Add redirect URL
                const redirectInput = document.createElement('input');
                redirectInput.type = 'hidden';
                redirectInput.name = 'redirect';
                redirectInput.value = successUrl;
                tempForm.appendChild(redirectInput);

                // Add form fields
                Object.keys(data).forEach(key => {
                    if (data[key]) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = key;
                        input.value = data[key];
                        tempForm.appendChild(input);
                    }
                });

                // Submit form - Apps Script will save data and redirect to successUrl
                document.body.appendChild(tempForm);
                tempForm.submit();

                // Show success message immediately (form submission is fire-and-forget)
                // The redirect will happen in the iframe, updating the main page URL
                showMessage(rsvpMessage, 'Thank you for your RSVP! We look forward to seeing you.', 'success');
                rsvpForm.reset();

                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;

                // Clean up after a delay
                setTimeout(() => {
                    if (document.body.contains(tempForm)) {
                        document.body.removeChild(tempForm);
                    }
                    if (document.body.contains(iframe)) {
                        document.body.removeChild(iframe);
                    }
                }, 3000);

            } catch (error) {
                console.error('RSVP submission error:', error);
                showMessage(rsvpMessage, 'Sorry, there was an error submitting your RSVP. Please try again later or contact us directly.', 'error');
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    }

    // Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    const contactMessage = document.getElementById('contact-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Form validation
            if (!data.name || !data.email || !data.message) {
                showMessage(contactMessage, 'Please fill in all required fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showMessage(contactMessage, 'Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission
            // In production, replace this with actual form submission service
            console.log('Contact Data:', data);

            // Show success message
            showMessage(contactMessage, 'Thank you for your message! We will get back to you soon.', 'success');

            // Reset form
            contactForm.reset();

            // Store in localStorage for demo purposes
            const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
            contacts.push({
                ...data,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('contacts', JSON.stringify(contacts));
        });
    }

    // Helper function to show messages
    function showMessage(element, message, type) {
        element.textContent = message;
        element.className = `form-message ${type}`;

        // Scroll to message
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Auto-hide after 5 seconds
        setTimeout(() => {
            element.classList.remove('success', 'error');
        }, 5000);
    }

    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for fade-in animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Initialize first section immediately
    if (sections.length > 0) {
        sections[0].style.opacity = '1';
        sections[0].style.transform = 'translateY(0)';
    }
})();

