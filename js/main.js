// Main JavaScript Functionality
(function () {
    'use strict';

    // Mark active navigation link based on current page
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath === '/' || currentPath.endsWith('/index.html') || currentPath.endsWith('/') 
            ? '/' 
            : currentPath;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            // Match exact path or handle root/index.html cases
            if (linkHref === currentPage || 
                (currentPage === '/' && linkHref === '/') ||
                (currentPage === '/' && linkHref === '/index.html') ||
                (currentPath.endsWith(linkHref) && linkHref !== '/')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Set active nav link after components are loaded
    function initActiveNavLink() {
        setActiveNavLink();
    }
    
    // Wait for components to load, then set active nav link
    function waitForNavLinks() {
        const navLinks = document.querySelectorAll('.nav-link');
        if (navLinks.length > 0) {
            initActiveNavLink();
        } else {
            // Wait for componentsReady event
            document.addEventListener('componentsReady', initActiveNavLink);
            // Fallback: try again after a short delay
            setTimeout(() => {
                if (document.querySelectorAll('.nav-link').length > 0) {
                    initActiveNavLink();
                }
            }, 100);
        }
    }

    // Initialize active nav link when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForNavLinks);
    } else {
        waitForNavLinks();
    }

    // Check for RSVP success parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('rsvp') === 'success') {
        const rsvpMessage = document.getElementById('rsvp-message');
        if (rsvpMessage) {
            const successMsg = window.Language ? window.Language.t('rsvp.success') : 'Thank you for your RSVP! We look forward to seeing you.';
            showMessage(rsvpMessage, successMsg, 'success');
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

    // Initialize navigation elements after components are loaded
    function initNavigation() {
        // Navigation elements
        const header = document.getElementById('header');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Check if elements exist (components might not be loaded yet)
        if (!header || !hamburger || !navMenu) {
            return;
        }

        // Handle navigation links (page navigation or smooth scroll for anchors)
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // If it's an anchor link (starts with #), use smooth scroll
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(href);

                    if (targetSection && header) {
                        const headerHeight = header.offsetHeight;
                        const targetPosition = targetSection.offsetTop - headerHeight;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });

                        // Close mobile menu if open
                        if (navMenu) navMenu.classList.remove('active');
                        if (hamburger) hamburger.classList.remove('active');
                    }
                }
                // Otherwise, let the browser handle page navigation
                // Close mobile menu when navigating to a new page
                else {
                    if (navMenu) navMenu.classList.remove('active');
                    if (hamburger) hamburger.classList.remove('active');
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
            if (hamburger && navMenu && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });

        // Hide/show header on scroll
        let lastScroll = 0;
        const scrollThreshold = 100; // Hide header after scrolling down this many pixels
        
        function handleScroll() {
            if (!header) return;
            
            // Don't show header if timeline navigation is active
            if (window.timelineNavigationActive) {
                return;
            }
            
            const currentScroll = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
            const scrollDifference = currentScroll - lastScroll;

            // Update box shadow based on scroll position
            if (currentScroll > 100) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                // Always show header when near top
                header.classList.remove('hidden');
            }

            // Hide/show header based on scroll direction
            if (currentScroll > scrollThreshold) {
                if (scrollDifference > 5) {
                    // Scrolling down - hide header
                    header.classList.add('hidden');
                } else if (scrollDifference < -5) {
                    // Scrolling up - show header
                    header.classList.remove('hidden');
                }
            } else {
                // Near top - always show
                header.classList.remove('hidden');
            }

            lastScroll = currentScroll;
        }

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Show header when hovering near the top of the page
        let hoverTimeout = null;
        document.addEventListener('mousemove', (e) => {
            if (!header) return;
            
            // Check if mouse is within 80px from the top
            if (e.clientY <= 80) {
                header.classList.remove('hidden');
                // Clear any pending timeout
                if (hoverTimeout) {
                    clearTimeout(hoverTimeout);
                    hoverTimeout = null;
                }
            }
        }, { passive: true });
    }

    // Wait for components to load, then initialize navigation
    function waitForComponents() {
        const header = document.getElementById('header');
        if (header) {
            initNavigation();
        } else {
            // Wait for componentsReady event
            document.addEventListener('componentsReady', initNavigation);
            // Fallback: try again after a short delay
            setTimeout(() => {
                if (document.getElementById('header')) {
                    initNavigation();
                }
            }, 100);
        }
    }

    // Initialize navigation when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForComponents);
    } else {
        waitForComponents();
    }

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
            mapElement.innerHTML = `<iframe src="${CONFIG.GOOGLE_MAPS_EMBED_URL}" style="border:0; width: 100%; height: 100%; border-radius: 8px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;

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

    // Handle conditional fields visibility based on attendance selection
    function handleAttendanceChange() {
        const attendanceYes = document.getElementById('attendance-yes');
        const attendanceNo = document.getElementById('attendance-no');
        const conditionalFields = document.getElementById('conditional-fields');
        
        if (attendanceYes && attendanceNo && conditionalFields) {
            const toggleFields = () => {
                if (attendanceYes.checked) {
                    conditionalFields.style.display = 'block';
                } else {
                    conditionalFields.style.display = 'none';
                }
            };
            
            // Set initial state
            toggleFields();
            
            // Add event listeners
            attendanceYes.addEventListener('change', toggleFields);
            attendanceNo.addEventListener('change', toggleFields);
        }
    }

    // Initialize attendance change handler when DOM is ready
    function initAttendanceHandler() {
        handleAttendanceChange();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAttendanceHandler);
    } else {
        initAttendanceHandler();
    }

    // Also initialize after components are loaded (in case form is loaded dynamically)
    document.addEventListener('componentsReady', () => {
        setTimeout(initAttendanceHandler, 100);
    });

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(rsvpForm);
            
            // Handle multiple checkbox values (ceremonies)
            const data = {};
            const ceremonies = [];
            
            for (const [key, value] of formData.entries()) {
                if (key === 'ceremonies') {
                    ceremonies.push(value);
                } else {
                    data[key] = value;
                }
            }
            
            // Add ceremonies as comma-separated string if any are selected
            if (ceremonies.length > 0) {
                data.ceremonies = ceremonies.join(', ');
            }

            // Form validation
            if (!data.name || !data.email || !data.guestOf || !data.attendance) {
                const msg = window.Language ? window.Language.t('rsvp.fillFields') : 'Please fill in all required fields.';
                showMessage(rsvpMessage, msg, 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                const msg = window.Language ? window.Language.t('rsvp.validEmail') : 'Please enter a valid email address.';
                showMessage(rsvpMessage, msg, 'error');
                return;
            }

            // Disable submit button during submission
            const submitButton = rsvpForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            const submittingText = window.Language ? window.Language.t('rsvp.submitting') : 'Submitting...';
            submitButton.textContent = submittingText;

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
                    // Include empty strings and zero values, but skip undefined/null
                    if (data[key] !== undefined && data[key] !== null) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = key;
                        input.value = data[key] || '';
                        tempForm.appendChild(input);
                    }
                });

                // Submit form - Apps Script will save data and redirect to successUrl
                document.body.appendChild(tempForm);
                tempForm.submit();

                // Show success message immediately (form submission is fire-and-forget)
                // The redirect will happen in the iframe, updating the main page URL
                const successMsg = window.Language ? window.Language.t('rsvp.success') : 'Thank you for your RSVP! We look forward to seeing you.';
                showMessage(rsvpMessage, successMsg, 'success');
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
                const errorMsg = window.Language ? window.Language.t('rsvp.error') : 'Sorry, there was an error submitting your RSVP. Please try again later or contact us directly.';
                showMessage(rsvpMessage, errorMsg, 'error');
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
                const msg = window.Language ? window.Language.t('contact.fillFields') : 'Please fill in all required fields.';
                showMessage(contactMessage, msg, 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                const msg = window.Language ? window.Language.t('contact.validEmail') : 'Please enter a valid email address.';
                showMessage(contactMessage, msg, 'error');
                return;
            }

            // Simulate form submission
            // In production, replace this with actual form submission service
            console.log('Contact Data:', data);

            // Show success message
            const successMsg = window.Language ? window.Language.t('contact.success') : 'Thank you for your message! We will get back to you soon.';
            showMessage(contactMessage, successMsg, 'success');

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

    // Back to Top Button Functionality
    function createBackToTopButton() {
        // Check if button already exists
        if (document.getElementById('back-to-top')) {
            return;
        }

        // Create the button element
        const backToTopButton = document.createElement('button');
        backToTopButton.id = 'back-to-top';
        backToTopButton.className = 'back-to-top';
        backToTopButton.setAttribute('aria-label', 'Back to top');
        
        // Create SVG icon
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '24');
        svg.setAttribute('height', '24');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M12 19V5M12 5L5 12M12 5L19 12');
        path.setAttribute('stroke', 'currentColor');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        
        svg.appendChild(path);
        backToTopButton.appendChild(svg);
        
        // Append to body
        document.body.appendChild(backToTopButton);
        
        return backToTopButton;
    }

    function initBackToTop() {
        // Create button if it doesn't exist
        let backToTopButton = document.getElementById('back-to-top');
        if (!backToTopButton) {
            backToTopButton = createBackToTopButton();
        }
        
        if (!backToTopButton) {
            return;
        }

        // Show/hide button based on scroll position
        function toggleBackToTop() {
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
            const showThreshold = 300; // Show button after scrolling 300px
            
            if (scrollPosition > showThreshold) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        }

        // Scroll to top when button is clicked
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Check scroll position on scroll
        window.addEventListener('scroll', toggleBackToTop, { passive: true });
        
        // Initial check
        toggleBackToTop();
    }

    // Initialize back to top button when DOM is ready
    function waitForBackToTopButton() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initBackToTop);
        } else {
            initBackToTop();
        }
    }

    waitForBackToTopButton();

    // Story Timeline Functionality
    function initStoryTimeline() {
        const timeline = document.getElementById('story-timeline');
        if (!timeline) {
            return; // Not on story page
        }

        const timelineItems = timeline.querySelectorAll('.story-timeline-item');
        const heroSection = document.getElementById('story-intro');
        const sections = [
            document.getElementById('story-meet'),
            document.getElementById('story-how-we-met'),
            document.getElementById('story-journey'),
            document.getElementById('story-proposal'),
            document.getElementById('story-ever-after')
        ].filter(Boolean); // Remove null/undefined sections

        if (timelineItems.length === 0 || sections.length === 0) {
            return;
        }

        // Handle click on timeline items
        timelineItems.forEach((item) => {
            const sectionId = item.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);

            if (targetSection) {
                item.addEventListener('click', () => {
                    const header = document.getElementById('header');

                    // Set flag to keep header hidden (use window property to share with scroll handler)
                    window.timelineNavigationActive = true;
                    
                    // Hide header
                    if (header) {
                        header.classList.add('hidden');
                    }

                    // Scroll directly to section start (no header offset since header is hidden)
                    const targetPosition = targetSection.offsetTop;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Re-enable header after scroll completes
                    setTimeout(() => {
                        window.timelineNavigationActive = false;
                    }, 1000);
                });
            }
        });

        // Track active section based on scroll position
        function updateActiveTimelineItem() {
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
            const header = document.getElementById('header');
            const headerHeight = header ? header.offsetHeight : 0;
            const viewportHeight = window.innerHeight;
            const threshold = viewportHeight * 0.3; // Activate when section is 30% from top


            let activeIndex = -1;

            sections.forEach((section, index) => {
                if (!section) return;

                const sectionTop = section.offsetTop - headerHeight;
                const sectionBottom = sectionTop + section.offsetHeight;

                // Check if section is in viewport with threshold
                if (scrollPosition + threshold >= sectionTop && scrollPosition < sectionBottom) {
                    activeIndex = index;
                }
            });

            // If no section is active, check if we're past the first section
            if (activeIndex === -1 && sections[0]) {
                const firstSectionTop = sections[0].offsetTop - headerHeight;
                if (scrollPosition >= firstSectionTop && scrollPosition < firstSectionTop + sections[0].offsetHeight) {
                    activeIndex = 0;
                }
            }

            // If still no active section, use the last section if we're past it
            if (activeIndex === -1 && sections.length > 0) {
                const lastSection = sections[sections.length - 1];
                if (lastSection && scrollPosition >= lastSection.offsetTop - headerHeight) {
                    activeIndex = sections.length - 1;
                }
            }

            // Update active state
            timelineItems.forEach((item, index) => {
                if (index === activeIndex) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }

        // Update on scroll
        window.addEventListener('scroll', updateActiveTimelineItem, { passive: true });

        // Initial update
        updateActiveTimelineItem();
    }

    // Initialize timeline when DOM is ready
    function waitForStoryTimeline() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initStoryTimeline);
        } else {
            initStoryTimeline();
        }
    }

    waitForStoryTimeline();
})();

