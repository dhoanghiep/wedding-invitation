// Main JavaScript Functionality
(function() {
    'use strict';
    
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
    
    // Initialize map
    function initMap() {
        // San Francisco coordinates (replace with actual venue coordinates)
        const map = L.map('map').setView([37.7749, -122.4194], 15);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);
        
        // Add marker for venue
        const marker = L.marker([37.7749, -122.4194]).addTo(map);
        marker.bindPopup('<b>Wedding Venue</b><br>Grand Ballroom<br>123 Wedding Lane').openPopup();
    }
    
    // Initialize map when Leaflet is loaded
    if (typeof L !== 'undefined') {
        initMap();
    } else {
        window.addEventListener('load', () => {
            if (typeof L !== 'undefined') {
                initMap();
            }
        });
    }
    
    // RSVP Form Handler
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpMessage = document.getElementById('rsvp-message');
    
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
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
            
            // Simulate form submission
            // In production, replace this with actual form submission service
            // Options: Formspree, EmailJS, Google Apps Script, etc.
            console.log('RSVP Data:', data);
            
            // Show success message
            showMessage(rsvpMessage, 'Thank you for your RSVP! We look forward to seeing you.', 'success');
            
            // Reset form
            rsvpForm.reset();
            
            // Store in localStorage for demo purposes
            const rsvps = JSON.parse(localStorage.getItem('rsvps') || '[]');
            rsvps.push({
                ...data,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('rsvps', JSON.stringify(rsvps));
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

