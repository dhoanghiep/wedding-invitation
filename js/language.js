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
                title: "June \n & \n Hiep",
                date: 'January 1, 2026',
            },
            // Bride and Groom Section
            brideGroom: {
                title: 'Bride & Groom',
                subtitle: 'Hello! We\’re the happy couple at the center of all this, and we\’re so excited you\'re here!',
                intro: 'Come see how we met and followed the path all the way to "I do"!',
                button: 'Explore'
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
            // Timeline Section
            timeline: {
                title: 'Wedding schedule',
                subtitle: 'Here\'s the plan for our celebration! We can\'t wait to see you there.',
                ceremony: 'Ceremony',
                ceremonyDate: 'Date & Time',
                ceremonyLocation: 'Location',
                preWedding: 'Pre-wedding party',
                preWeddingDate: 'Date & Time',
                preWeddingLocation: 'Location',
                wedding: 'Wedding',
                weddingDate: 'Date & Time',
                weddingLocation: 'Location',
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
                story: 'Câu chuyện',
                album: 'Album',
                rsvp: 'Xác nhận',
                contact: 'Liên hệ'
            },
            // Hero Section
            hero: {
                title: 'Minh Anh \n & \n Hoàng Hiệp',
                date: 'Ngày 1 tháng 1, 2026',
            },
            // Bride and Groom Section
            brideGroom: {
                title: 'Cô dâu & Chú rể',
                subtitle: 'Xin chào! Tụi mình là cặp đôi hạnh phúc (và là nhân vật chính) của buổi tiệc này, và tụi mình rất vui khi các bạn có mặt!',
                intro: 'Cùng xem tụi mình đã gặp nhau thế nào và cùng đi trên hành trình đến ngày chung đôi ra sao nhé!',
                button: 'khám phá'
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
            },
            // Timeline Section
            timeline: {
                title: 'Lịch trình ngày cưới',
                subtitle: 'Đây là kế hoạch cho ngày vui của tụi mình! Rất mong được gặp các bạn ở đó.',
                ceremony: 'Lễ cưới',
                ceremonyDate: 'Ngày & Giờ',
                ceremonyLocation: 'Địa điểm',
                preWedding: 'Tiệc trước đám cưới',
                preWeddingDate: 'Ngày & Giờ',
                preWeddingLocation: 'Địa điểm',
                wedding: 'Đám cưới',
                weddingDate: 'Ngày & Giờ',
                weddingLocation: 'Địa điểm',
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

        // Update bride and groom section
        updateText('[data-i18n="brideGroom.title"]', t.brideGroom.title);
        updateText('[data-i18n="brideGroom.subtitle"]', t.brideGroom.subtitle);
        updateText('[data-i18n="brideGroom.intro"]', t.brideGroom.intro);
        updateText('[data-i18n="brideGroom.button"]', t.brideGroom.button);

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
        updateText('[data-i18n="timeline.preWedding"]', t.timeline.preWedding);
        updateText('[data-i18n="timeline.preWeddingDate"]', t.timeline.preWeddingDate);
        updateText('[data-i18n="timeline.preWeddingLocation"]', t.timeline.preWeddingLocation);
        updateText('[data-i18n="timeline.wedding"]', t.timeline.wedding);
        updateText('[data-i18n="timeline.weddingDate"]', t.timeline.weddingDate);
        updateText('[data-i18n="timeline.weddingLocation"]', t.timeline.weddingLocation);
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
            // Remove existing event listeners by cloning the element
            const newToggle = langToggle.cloneNode(true);
            langToggle.parentNode.replaceChild(newToggle, langToggle);
            
            newToggle.addEventListener('click', () => {
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

    // Setup language toggle when header component is loaded
    document.addEventListener('componentLoaded', (e) => {
        if (e.detail && e.detail.component === 'header-placeholder') {
            // Wait a bit for the DOM to update
            setTimeout(() => {
                setupLanguageToggle();
            }, 100);
        }
    });

    // Also listen for componentsReady event as fallback
    document.addEventListener('componentsReady', () => {
        setTimeout(() => {
            setupLanguageToggle();
        }, 100);
    });
})();

