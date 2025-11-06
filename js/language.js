// Language Translation System
(function () {
    'use strict';

    const translations = {
        en: {
            // Navigation
            nav: {
                home: 'Home',
                location: 'Location',
                story: 'Our Story',
                album: 'Album',
                rsvp: 'RSVP',
                contact: 'Contact'
            },
            // Hero Section
            hero: {
                title: "We're Getting Married!",
                subtitle: 'Hoàng Hiệp & Minh Anh',
                date: 'January 01, 2026',
                button: 'View Invitation'
            },
            // Invitation Section
            invitation: {
                title: "You're Invited",
                subtitle: 'Join us as we celebrate our special day',
                dateTime: 'Date & Time',
                date: 'January 01, 2026',
                time: 'Reception: 5:00 PM',
                location: 'Location',
                venue: 'Siha',
                address: 'Phạm Đình Chính',
                city: 'Ho Chi Minh City',
                mapLink: 'View on Google Maps'
            },
            // Gallery Section
            gallery: {
                title: 'Our Gallery',
                subtitle: 'Memories we\'ve shared together',
                photos: 'Photos',
                videos: 'Videos'
            },
            // Countdown Section
            countdown: {
                title: 'Countdown to Our Special Day',
                months: 'Months',
                days: 'Days',
                hours: 'Hours',
                minutes: 'Minutes',
                seconds: 'Seconds'
            },
            // RSVP Section
            rsvp: {
                title: 'RSVP',
                subtitle: 'Please let us know if you\'ll be joining us',
                fullName: 'Full Name *',
                email: 'Email Address *',
                attendance: 'Will you be attending? *',
                selectOption: 'Please select...',
                yes: 'Yes, I\'ll be there!',
                no: 'Sorry, I can\'t make it',
                maybe: 'Maybe',
                guests: 'Number of Guests',
                dietary: 'Dietary Restrictions or Allergies',
                dietaryPlaceholder: 'Please let us know of any dietary restrictions or allergies',
                message: 'Message (Optional)',
                messagePlaceholder: 'Any additional notes or messages',
                submit: 'Submit RSVP',
                submitting: 'Submitting...',
                success: 'Thank you for your RSVP! We look forward to seeing you.',
                error: 'Sorry, there was an error submitting your RSVP. Please try again later or contact us directly.',
                fillFields: 'Please fill in all required fields.',
                validEmail: 'Please enter a valid email address.'
            },
            // Contact Section
            contact: {
                title: 'Contact Us',
                subtitle: 'Have questions? We\'d love to hear from you',
                yourName: 'Your Name *',
                yourEmail: 'Your Email *',
                message: 'Message *',
                send: 'Send Message',
                success: 'Thank you for your message! We will get back to you soon.',
                fillFields: 'Please fill in all required fields.',
                validEmail: 'Please enter a valid email address.'
            },
            // Footer
            footer: {
                text: '© 2025 Hoàng Hiệp & Minh Anh. Made with ❤️'
            },
            // Timeline Section
            timeline: {
                title: 'Wedding Timeline',
                subtitle: 'Join us for our special day',
                ceremony: 'Ceremony',
                ceremonyDate: 'Date & Time',
                ceremonyLocation: 'Location',
                party: 'Party/Reception',
                partyDate: 'Date & Time',
                partyLocation: 'Location',
                mainWedding: 'Main Wedding',
                mainWeddingDate: 'Date & Time',
                mainWeddingLocation: 'Location'
            },
            // Schedule Section
            schedule: {
                title: 'Wedding Schedule',
                ceremony: 'Ceremony',
                ceremonyDate: 'Date & Time',
                ceremonyLocation: 'Location',
                party: 'Party/Reception',
                partyDate: 'Date & Time',
                partyLocation: 'Location',
                mainWedding: 'Main Wedding',
                mainWeddingDate: 'Date & Time',
                mainWeddingLocation: 'Location',
                viewLocation: 'View Location'
            },
            // Quick Links Section
            quickLinks: {
                title: 'Explore More',
                rsvp: 'RSVP',
                rsvpDesc: 'Let us know if you\'ll be joining us',
                location: 'Location',
                locationDesc: 'Find venues and accommodations',
                album: 'Album',
                albumDesc: 'View our photos and memories',
                story: 'Our Story',
                storyDesc: 'Learn how we met'
            }
        },
        vi: {
            // Navigation
            nav: {
                home: 'Trang chủ',
                location: 'Địa điểm',
                story: 'Câu chuyện của chúng tôi',
                album: 'Album',
                rsvp: 'Xác nhận',
                contact: 'Liên hệ'
            },
            // Hero Section
            hero: {
                title: 'Chúng tôi sắp kết hôn!',
                subtitle: 'Hoàng Hiệp & Minh Anh',
                date: 'Ngày 01 tháng 01 năm 2026',
                button: 'Xem thiệp mời'
            },
            // Invitation Section
            invitation: {
                title: 'Bạn được mời',
                subtitle: 'Hãy cùng chúng tôi chúc mừng ngày đặc biệt',
                dateTime: 'Ngày & Giờ',
                date: 'Ngày 01 tháng 01 năm 2026',
                time: 'Đón khách: 05:00 chiều',
                location: 'Địa điểm',
                venue: 'Siha',
                address: 'Phạm Đình Chính',
                city: 'TP. Hồ Chí Minh',
                mapLink: 'Xem trên Google Maps'
            },
            // Gallery Section
            gallery: {
                title: 'Thư viện ảnh',
                subtitle: 'Những kỷ niệm chúng tôi đã chia sẻ',
                photos: 'Ảnh',
                videos: 'Video'
            },
            // Countdown Section
            countdown: {
                title: 'Đếm ngược đến ngày đặc biệt',
                months: 'Tháng',
                days: 'Ngày',
                hours: 'Giờ',
                minutes: 'Phút',
                seconds: 'Giây'
            },
            // RSVP Section
            rsvp: {
                title: 'Xác nhận tham dự',
                subtitle: 'Vui lòng cho chúng tôi biết bạn có tham dự không',
                fullName: 'Họ và tên *',
                email: 'Địa chỉ email *',
                attendance: 'Bạn có tham dự không? *',
                selectOption: 'Vui lòng chọn...',
                yes: 'Có, tôi sẽ tham dự!',
                no: 'Xin lỗi, tôi không thể tham dự',
                maybe: 'Có thể',
                guests: 'Số lượng khách',
                dietary: 'Hạn chế về chế độ ăn uống hoặc dị ứng',
                dietaryPlaceholder: 'Vui lòng cho chúng tôi biết về bất kỳ hạn chế về chế độ ăn uống hoặc dị ứng',
                message: 'Lời nhắn (Tùy chọn)',
                messagePlaceholder: 'Bất kỳ ghi chú hoặc lời nhắn bổ sung',
                submit: 'Gửi xác nhận',
                submitting: 'Đang gửi...',
                success: 'Cảm ơn bạn đã xác nhận! Chúng tôi rất mong được gặp bạn.',
                error: 'Xin lỗi, đã có lỗi khi gửi xác nhận. Vui lòng thử lại sau hoặc liên hệ trực tiếp với chúng tôi.',
                fillFields: 'Vui lòng điền vào tất cả các trường bắt buộc.',
                validEmail: 'Vui lòng nhập địa chỉ email hợp lệ.'
            },
            // Contact Section
            contact: {
                title: 'Liên hệ',
                subtitle: 'Có câu hỏi? Chúng tôi rất muốn nghe từ bạn',
                yourName: 'Tên của bạn *',
                yourEmail: 'Email của bạn *',
                message: 'Lời nhắn *',
                send: 'Gửi tin nhắn',
                success: 'Cảm ơn bạn đã gửi tin nhắn! Chúng tôi sẽ phản hồi sớm.',
                fillFields: 'Vui lòng điền vào tất cả các trường bắt buộc.',
                validEmail: 'Vui lòng nhập địa chỉ email hợp lệ.'
            },
            // Footer
            footer: {
                text: '© 2025 Hoàng Hiệp & Minh Anh. Được tạo bằng ❤️'
            },
            // Timeline Section
            timeline: {
                title: 'Lịch trình đám cưới',
                subtitle: 'Hãy cùng chúng tôi chúc mừng ngày đặc biệt',
                ceremony: 'Lễ cưới',
                ceremonyDate: 'Ngày & Giờ',
                ceremonyLocation: 'Địa điểm',
                party: 'Tiệc/Đón khách',
                partyDate: 'Ngày & Giờ',
                partyLocation: 'Địa điểm',
                mainWedding: 'Đám cưới chính',
                mainWeddingDate: 'Ngày & Giờ',
                mainWeddingLocation: 'Địa điểm'
            },
            // Schedule Section
            schedule: {
                title: 'Lịch trình đám cưới',
                ceremony: 'Lễ cưới',
                ceremonyDate: 'Ngày & Giờ',
                ceremonyLocation: 'Địa điểm',
                party: 'Tiệc/Đón khách',
                partyDate: 'Ngày & Giờ',
                partyLocation: 'Địa điểm',
                mainWedding: 'Đám cưới chính',
                mainWeddingDate: 'Ngày & Giờ',
                mainWeddingLocation: 'Địa điểm',
                viewLocation: 'Xem địa điểm'
            },
            // Quick Links Section
            quickLinks: {
                title: 'Khám phá thêm',
                rsvp: 'Xác nhận',
                rsvpDesc: 'Cho chúng tôi biết bạn có tham dự không',
                location: 'Địa điểm',
                locationDesc: 'Tìm địa điểm và chỗ ở',
                album: 'Album',
                albumDesc: 'Xem ảnh và kỷ niệm của chúng tôi',
                story: 'Câu chuyện của chúng tôi',
                storyDesc: 'Tìm hiểu cách chúng tôi gặp nhau'
            }
        }
    };

    let currentLanguage = localStorage.getItem('language') || 'en';

    // Initialize language on page load
    function init() {
        setLanguage(currentLanguage);
        setupLanguageToggle();
    }

    // Set language and update all text
    function setLanguage(lang) {
        if (!translations[lang]) {
            console.warn(`Language "${lang}" not found. Using English.`);
            lang = 'en';
        }

        currentLanguage = lang;
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;

        const t = translations[lang];

        // Update navigation
        updateText('[data-i18n="nav.home"]', t.nav.home);
        updateText('[data-i18n="nav.location"]', t.nav.location);
        updateText('[data-i18n="nav.story"]', t.nav.story);
        updateText('[data-i18n="nav.album"]', t.nav.album);
        updateText('[data-i18n="nav.rsvp"]', t.nav.rsvp);
        updateText('[data-i18n="nav.contact"]', t.nav.contact);

        // Update hero section
        updateText('[data-i18n="hero.title"]', t.hero.title);
        updateText('[data-i18n="hero.date"]', t.hero.date);
        updateText('[data-i18n="hero.button"]', t.hero.button);

        // Update invitation section
        updateText('[data-i18n="invitation.title"]', t.invitation.title);
        updateText('[data-i18n="invitation.subtitle"]', t.invitation.subtitle);
        updateText('[data-i18n="invitation.dateTime"]', t.invitation.dateTime);
        updateText('[data-i18n="invitation.date"]', t.invitation.date);
        updateText('[data-i18n="invitation.time"]', t.invitation.time);
        updateText('[data-i18n="invitation.location"]', t.invitation.location);
        updateText('[data-i18n="invitation.mapLink"]', t.invitation.mapLink);

        // Update gallery section
        updateText('[data-i18n="gallery.title"]', t.gallery.title);
        updateText('[data-i18n="gallery.subtitle"]', t.gallery.subtitle);
        updateText('[data-i18n="gallery.photos"]', t.gallery.photos);
        updateText('[data-i18n="gallery.videos"]', t.gallery.videos);

        // Update countdown section
        updateText('[data-i18n="countdown.title"]', t.countdown.title);
        updateText('[data-i18n="countdown.months"]', t.countdown.months);
        updateText('[data-i18n="countdown.days"]', t.countdown.days);
        updateText('[data-i18n="countdown.hours"]', t.countdown.hours);
        updateText('[data-i18n="countdown.minutes"]', t.countdown.minutes);
        updateText('[data-i18n="countdown.seconds"]', t.countdown.seconds);

        // Update RSVP section
        updateText('[data-i18n="rsvp.title"]', t.rsvp.title);
        updateText('[data-i18n="rsvp.subtitle"]', t.rsvp.subtitle);
        updateText('[data-i18n="rsvp.fullName"]', t.rsvp.fullName);
        updateText('[data-i18n="rsvp.email"]', t.rsvp.email);
        updateText('[data-i18n="rsvp.attendance"]', t.rsvp.attendance);
        updateSelectOptions('[data-i18n="rsvp.selectOption"]', t.rsvp.selectOption);
        updateSelectOptions('[data-i18n="rsvp.yes"]', t.rsvp.yes);
        updateSelectOptions('[data-i18n="rsvp.no"]', t.rsvp.no);
        updateSelectOptions('[data-i18n="rsvp.maybe"]', t.rsvp.maybe);
        updateText('[data-i18n="rsvp.guests"]', t.rsvp.guests);
        updateText('[data-i18n="rsvp.dietary"]', t.rsvp.dietary);
        updateText('[data-i18n="rsvp.message"]', t.rsvp.message);
        updateText('[data-i18n="rsvp.submit"]', t.rsvp.submit);

        // Update placeholders
        updatePlaceholder('[data-i18n-placeholder="rsvp.dietary"]', t.rsvp.dietaryPlaceholder);
        updatePlaceholder('[data-i18n-placeholder="rsvp.message"]', t.rsvp.messagePlaceholder);

        // Update contact section
        updateText('[data-i18n="contact.title"]', t.contact.title);
        updateText('[data-i18n="contact.subtitle"]', t.contact.subtitle);
        updateText('[data-i18n="contact.yourName"]', t.contact.yourName);
        updateText('[data-i18n="contact.yourEmail"]', t.contact.yourEmail);
        updateText('[data-i18n="contact.message"]', t.contact.message);
        updateText('[data-i18n="contact.send"]', t.contact.send);

        // Update footer
        updateText('[data-i18n="footer.text"]', t.footer.text);

        // Update timeline section
        updateText('[data-i18n="timeline.title"]', t.timeline.title);
        updateText('[data-i18n="timeline.subtitle"]', t.timeline.subtitle);
        updateText('[data-i18n="timeline.ceremony"]', t.timeline.ceremony);
        updateText('[data-i18n="timeline.ceremonyDate"]', t.timeline.ceremonyDate);
        updateText('[data-i18n="timeline.ceremonyLocation"]', t.timeline.ceremonyLocation);
        updateText('[data-i18n="timeline.party"]', t.timeline.party);
        updateText('[data-i18n="timeline.partyDate"]', t.timeline.partyDate);
        updateText('[data-i18n="timeline.partyLocation"]', t.timeline.partyLocation);
        updateText('[data-i18n="timeline.mainWedding"]', t.timeline.mainWedding);
        updateText('[data-i18n="timeline.mainWeddingDate"]', t.timeline.mainWeddingDate);
        updateText('[data-i18n="timeline.mainWeddingLocation"]', t.timeline.mainWeddingLocation);

        // Update schedule section
        updateText('[data-i18n="schedule.title"]', t.schedule.title);
        updateText('[data-i18n="schedule.ceremony"]', t.schedule.ceremony);
        updateText('[data-i18n="schedule.ceremonyDate"]', t.schedule.ceremonyDate);
        updateText('[data-i18n="schedule.ceremonyLocation"]', t.schedule.ceremonyLocation);
        updateText('[data-i18n="schedule.party"]', t.schedule.party);
        updateText('[data-i18n="schedule.partyDate"]', t.schedule.partyDate);
        updateText('[data-i18n="schedule.partyLocation"]', t.schedule.partyLocation);
        updateText('[data-i18n="schedule.mainWedding"]', t.schedule.mainWedding);
        updateText('[data-i18n="schedule.mainWeddingDate"]', t.schedule.mainWeddingDate);
        updateText('[data-i18n="schedule.mainWeddingLocation"]', t.schedule.mainWeddingLocation);
        updateText('[data-i18n="schedule.viewLocation"]', t.schedule.viewLocation);

        // Update quick links section
        updateText('[data-i18n="quickLinks.title"]', t.quickLinks.title);
        updateText('[data-i18n="quickLinks.rsvp"]', t.quickLinks.rsvp);
        updateText('[data-i18n="quickLinks.rsvpDesc"]', t.quickLinks.rsvpDesc);
        updateText('[data-i18n="quickLinks.location"]', t.quickLinks.location);
        updateText('[data-i18n="quickLinks.locationDesc"]', t.quickLinks.locationDesc);
        updateText('[data-i18n="quickLinks.album"]', t.quickLinks.album);
        updateText('[data-i18n="quickLinks.albumDesc"]', t.quickLinks.albumDesc);
        updateText('[data-i18n="quickLinks.story"]', t.quickLinks.story);
        updateText('[data-i18n="quickLinks.storyDesc"]', t.quickLinks.storyDesc);

        // Update language toggle button
        const langToggle = document.getElementById('language-toggle');
        if (langToggle) {
            langToggle.textContent = lang === 'en' ? 'VI' : 'EN';
            langToggle.setAttribute('aria-label', lang === 'en' ? 'Switch to Vietnamese' : 'Switch to English');
        }
    }

    // Helper function to update text content
    function updateText(selector, text) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.textContent = text;
        });
    }

    // Helper function to update placeholder
    function updatePlaceholder(selector, text) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.placeholder = text;
        });
    }

    // Helper function to update select options
    function updateSelectOptions(selector, text) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.textContent = text;
        });
    }

    // Setup language toggle button
    function setupLanguageToggle() {
        const langToggle = document.getElementById('language-toggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => {
                const newLang = currentLanguage === 'en' ? 'vi' : 'en';
                setLanguage(newLang);
            });
        }
    }

    // Get current language
    function getLanguage() {
        return currentLanguage;
    }

    // Get translation for a key
    function t(key) {
        const keys = key.split('.');
        let value = translations[currentLanguage];
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    }

    // Expose public API
    window.Language = {
        setLanguage,
        getLanguage,
        t,
        init
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

