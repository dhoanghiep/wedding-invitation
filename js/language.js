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
                gallery: 'Gallery',
                rsvp: 'RSVP',
                contact: 'Contact'
            },
            // Hero Section
            hero: {
                title: "Minh Anh \n & \n Hoàng Hiệp",
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
                title: 'Memories we\'ve shared together',
                subtitle: 'Memories we\'ve shared together',
                welcome: 'Welcome to our photo album! Here are a few of our favorite moments from our journey so far.',
                photos: 'Photos',
                videos: 'Videos',
                journey: 'Our Journey',
                journeyDesc: 'A little look back at our adventure, from our first photos together to becoming fiancés!',
                journeySubsections: {
                    firstDays: 'First Days',
                    trips: 'Trips',
                    proposal: 'Proposal',
                    andSoOn: 'And So On...'
                },
                preWedding: 'Pre-Wedding Photos',
                preWeddingDesc: 'We had so much fun at our pre-wedding shoot at Hanoi and Dalat. Here are some of our favorite shots!',
                preWeddingSubsections: {
                    hanoi: 'Hanoi',
                    dalat: 'Dalat'
                },
                weddingPhotos: 'Wedding photos',
                weddingPhotosDesc: 'Coming Soon! Our official wedding photos will be uploaded here after the big day. We can\'t wait to share them!',
                weddingPhotosSubsections: {
                    vuQuy: 'Vu Quy Ceremony',
                    theParty: 'The party',
                    reception: 'Reception',
                    wedding: 'Wedding'
                },
                guestUploads: 'Guest uploads',
                guestUploadsDesc: 'You\'re our best photographers! If you have any moments from the wedding day (or any fun memories with us), please share them here. We\'d love to see the day through your eyes.',
                videosDesc: 'A few of our favorite moments, in motion.',
                comingSoon: 'Photos coming soon...',
                uploadTitle: 'Share Your Photos',
                uploadDesc: 'Upload your favorite moments from our wedding',
                uploadButton: 'Upload Photos'
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
                bannerTitle: 'We hope you can join us!',
                bannerSubtitle: 'We\'re counting down the days and really hope you can be there to celebrate with us!',
                bannerCta: 'Ready to party? Click below to let us know.',
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
                ceremony: 'Vu Quy Ceremony',
                ceremonyDate: '9:30 AM, 31/12/2025',
                ceremonyLocation: '332/18 Cach Mang Thang 8, \n Nhieu Loc \n Ho Chi Minh City',
                preWedding: 'Pre-wedding Party',
                preWeddingDate: '5:00 PM, 31/12/2025',
                preWeddingLocation: 'Siha cafe \n 58 Nguyen Dinh Chinh, Phu Nhuan \n Ho Chi Minh City',
                wedding: 'Wedding Ceremony',
                weddingDate: '5:00 PM, 1/1/2026',
                weddingLocation: 'Chloe Gallery \n 06 Phan Van Chuong, Tan My \n Ho Chi Minh City',
                timeLabel: 'Date & Time:',
                locationLabel: 'Location:',
                addressLabel: 'Address:',
                ceremonyTime: '9:30 AM 31/12/2025',
                ceremonyLocationName: 'The Bride\'s Family Home',
                ceremonyAddress: '332/18 Cach Mang Thang 8,\n Nhieu Loc, Ho Chi Minh City',
                preWeddingTime: '5:00 PM 31/12/2025',
                preWeddingLocationName: 'Siha Cafe',
                preWeddingAddress: '158 Nguyen Dinh Chinh\n Phu Nhuan, Ho Chi Minh City',
                weddingTime: '5:00 PM 1/1/2026',
                weddingLocationName: 'Chloe Gallery',
                weddingAddress: '06 Phan Van Chuong\n Tan My, Ho Chi Minh City'
            },
            // Location Section
            location: {
                title: 'Wedding Venues',
                subtitle: 'Find all our wedding venues',
                ceremony: 'Vu Quy Ceremony',
                ceremonyVenue: 'The Bride\'s Family Home',
                ceremonyAddress: '332/18 Cach Mang Thang 8,\n Nhieu Loc, Ho Chi Minh City',
                ceremonyTime: '9:30 AM 31/12/2025',
                preWedding: 'Pre-wedding Party',
                preWeddingVenue: 'Siha Cafe',
                preWeddingAddress: '158 Nguyen Dinh Chinh\n Phu Nhuan, Ho Chi Minh City',
                preWeddingTime: '5:00 PM 31/12/2025',
                wedding: 'Wedding Ceremony',
                weddingVenue: 'Chloe Gallery',
                weddingAddress: '06 Phan Van Chuong\n Tan My, Ho Chi Minh City',
                weddingTime: '5:00 PM 1/1/2026',
                timeLabel: 'Date & Time:',
                locationLabel: 'Location:',
                addressLabel: 'Address:',
                viewMap: 'View on Google Maps',
                accommodationTitle: 'Accommodations',
                accommodationSubtitle: 'Recommended places to stay'
            },
            // Story Section
            story: {
                title: 'Our Story',
                subtitle: 'Welcome to our story! It\'s our favorite one, and it\'s all led to this amazing day.',
                meetTitle: 'First, Meet the Bride & Groom',
                meetBride: 'Meet Nheo 😼 (The Bride)',
                brideBio: 'Intro bé Ti',
                brideQuote: '"Quote bé Ti"',
                brideQuote: '"Looks like she could kill you & actually could kill you."',
                meetGroom: 'Meet Hoàng Hiệp (The Groom)',
                groomBio: 'Intro Hiệp',
                groomQuote: '"Quote Hiệp"',
                howWeMet: 'How We Met',
                howWeMetSubtitle: 'How we met subtitle',
                howWeMetIntro: 'Our story began in [Year] at [Place where you met, e.g., "a friend\'s birthday party," "the office," "Hanoi Old Quarter"].',
                bridePerspective: 'Góc nhìn của Ti:',
                bridePerspectiveStory: 'Story bé Ti',
                groomPerspective: 'Góc nhìn của Hiệp:',
                groomPerspectiveStory: 'Story Hiệp',
                firstDate: 'First date',
                tripsTitle: 'Our Trips',
                tripsIntro: 'Trips intro',
                tripsMemories: 'Trips memories',
                tripsConclusion: 'Trips conclusion',
                proposalTitle: 'The Proposal',
                proposalIntro: 'Proposal intro',
                proposalStory: 'Proposal story',
                proposalConclusion: 'Proposal conclusion',
                everAfterTitle: 'And Ever After...',
                everAfterIntro: 'Ever after intro',
                everAfterStory: 'Ever after story',
                everAfterClosing: 'Ever after closing'
            }
        },
        vi: {
            // Navigation
            nav: {
                home: 'Trang chủ',
                location: 'Địa điểm',
                story: 'Câu chuyện',
                gallery: 'Thư viện ảnh',
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
                subtitle: 'Xin chào! Chúng mình là cặp đôi hạnh phúc (và là nhân vật chính) của buổi tiệc này, và chúng mình rất vui khi các bạn có mặt!',
                intro: 'Cùng xem chúng mình đã gặp nhau thế nào và cùng đi trên hành trình đến ngày chung đôi ra sao nhé!',
                button: 'khám phá'
            },
            // Gallery Section
            gallery: {
                title: 'Những Kỷ Niệm của chúng mình',
                subtitle: 'Những Kỷ Niệm của chúng mình',
                welcome: 'Chào mừng đến với album ảnh của chúng mình! Đây là một vài khoảnh khắc yêu thích trong suốt hành trình của cả hai.',
                photos: 'Ảnh',
                videos: 'Video',
                journey: 'Hành trình của chúng mình',
                journeyDesc: 'Cùng nhìn lại một chút về cuộc phiêu lưu của chúng mình, từ những bức ảnh đầu tiên chụp chung cho đến khi đính hôn!',
                journeySubsections: {
                    firstDays: 'Những ngày đầu tiên',
                    trips: 'Chuyến đi',
                    proposal: 'Lời cầu hôn',
                    andSoOn: 'và sau đó...'
                },
                preWedding: 'Ảnh Pre-Wedding',
                preWeddingDesc: 'Chúng mình đã có một buổi chụp hình pre-wedding rất vui ở Hà Nội và Đà Lạt. Đây là một vài tấm chúng mình ưng ý nhất!',
                preWeddingSubsections: {
                    hanoi: 'Hà Nội',
                    dalat: 'Đà Lạt'
                },
                weddingPhotos: 'Ảnh cưới',
                weddingPhotosDesc: 'Sắp có nhé! Ảnh cưới chính thức sẽ được tụi mình đăng lên đây sau ngày trọng đại. Chúng mình rất mong được chia sẻ chúng!',
                weddingPhotosSubsections: {
                    vuQuy: 'Lễ Vu Quy',
                    theParty: 'Tiệc trước đám cưới',
                    reception: 'Đón khách',
                    wedding: 'Lễ cưới'
                },
                guestUploads: 'Ảnh từ khách mời',
                guestUploadsDesc: 'Các bạn chính là những nhiếp ảnh gia xịn nhất! Nếu bạn có bất kỳ khoảnh khắc nào trong ngày cưới (hoặc bất kỳ kỷ niệm vui nào với tụi mình), hãy chia sẻ tại đây nhé. Chúng mình rất muốn nhìn thấy ngày vui qua lăng kính của các bạn.',
                videosDesc: 'Một vài khoảnh khắc yêu thích nhất của chúng mình qua những thước phim.',
                comingSoon: 'Ảnh sắp có...',
                uploadTitle: 'Chia sẻ ảnh của bạn',
                uploadDesc: 'Tải lên những khoảnh khắc yêu thích của bạn từ đám cưới của chúng mình',
                uploadButton: 'Tải ảnh lên'
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
                bannerTitle: 'Hy vọng bạn sẽ đến!',
                bannerSubtitle: 'Chúng mình đang đếm ngược từng ngày và rất hy vọng bạn có thể ở đó để chung vui cùng chúng mình!',
                bannerCta: 'Sẵn sàng "quẩy" chưa? Bấm vào bên dưới để cho chúng mình biết nhé.',
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
            // Timeline Section
            timeline: {
                title: 'Lịch trình ngày cưới',
                subtitle: 'Đây là kế hoạch cho ngày vui của chúng mình! Rất mong được gặp các bạn ở đó.',
                ceremony: 'Lễ Vu Quy',
                ceremonyDate: 'Ngày & Giờ',
                ceremonyLocation: 'Địa điểm',
                preWedding: 'Tiệc Trước Ngày Cưới',
                preWeddingDate: 'Ngày & Giờ',
                preWeddingLocation: 'Địa điểm',
                wedding: 'Lễ Cưới',
                weddingDate: 'Ngày & Giờ',
                weddingLocation: 'Địa điểm',
                timeLabel: 'Ngày & Giờ:',
                locationLabel: 'Địa điểm:',
                addressLabel: 'Địa chỉ:',
                ceremonyTime: '9:30 SA 31/12/2025',
                ceremonyLocationName: 'Tư gia nhà gái',
                ceremonyAddress: '332/18 Cách Mạng Tháng 8\n Nhiêu Lộc, TP. Hồ Chí Minh',
                preWeddingTime: '5:00 CH 31/12/2025',
                preWeddingLocationName: 'Siha Cafe',
                preWeddingAddress: '158 Nguyễn Đình Chính\n Phú Nhuận, TP. Hồ Chí Minh',
                weddingTime: '5:00 CH 1/1/2026',
                weddingLocationName: 'Chloe Gallery',
                weddingAddress: '06 Phan Văn Chương\n Tân Mỹ, TP. Hồ Chí Minh'
            },
            // Location Section
            location: {
                title: 'Địa điểm tổ chức',
                subtitle: 'Tìm tất cả các địa điểm tổ chức tiệc cưới của chúng mình',
                ceremony: 'Lễ Vu Quy',
                ceremonyVenue: 'Tư gia nhà gái',
                ceremonyAddress: '332/18 Cách Mạng Tháng 8\n Nhiêu Lộc, TP. Hồ Chí Minh',
                ceremonyTime: '9:30 SA 31/12/2025',
                preWedding: 'Tiệc Trước Ngày Cưới',
                preWeddingVenue: 'Siha Cafe',
                preWeddingAddress: '158 Nguyễn Đình Chính\n Phú Nhuận, TP. Hồ Chí Minh',
                preWeddingTime: '5:00 CH 31/12/2025',
                wedding: 'Lễ Cưới',
                weddingVenue: 'Chloe Gallery',
                weddingAddress: '06 Phan Văn Chương\n Tân Mỹ, TP. Hồ Chí Minh',
                weddingTime: '5:00 CH 1/1/2026',
                timeLabel: 'Ngày & Giờ:',
                locationLabel: 'Địa điểm:',
                addressLabel: 'Địa chỉ:',
                viewMap: 'Xem trên Google Maps',
                accommodationTitle: 'Nơi ở',
                accommodationSubtitle: 'Các địa điểm lưu trú được đề xuất'
            },
            // Story Section
            story: {
                title: 'Câu Chuyện Của Tụi Mình',
                subtitle: 'Chào mừng đến với câu chuyện của tụi mình! Đây là câu chuyện tụi mình yêu thích nhất, và nó đã dẫn đến ngày tuyệt vời này.',
                meetTitle: 'Đầu Tiên, Gặp Gỡ Cô Dâu & Chú Rể',
                meetBride: 'Gặp Gỡ Minh Anh (Cô Dâu)',
                brideBio: 'Intro bé Ti',
                brideQuote: '"Quote bé Ti"',
                meetGroom: 'Gặp Gỡ Hoàng Hiệp (Chú Rể)',
                groomBio: 'Intro Hiệp',
                groomQuote: '"Quote Hiệp"',
                howWeMet: 'Tụi Mình Gặp Nhau Thế Nào',
                howWeMetSubtitle: 'Met subtitle',
                howWeMetIntro: 'How we met intro',
                bridePerspective: 'Góc nhìn của Ti:',
                bridePerspectiveStory: 'Story bé Ti',
                groomPerspective: 'Góc nhìn của Hiệp:',
                groomPerspectiveStory: 'Story Hiệp',
                firstDate: 'First date',
                tripsTitle: 'Những Chuyến Đi',
                tripsIntro: 'Trips intro',
                tripsMemories: 'Trips memories',
                tripsConclusion: 'Trips conclusion',
                proposalTitle: 'Màn Cầu Hôn',
                proposalIntro: 'Proposal intro',
                proposalStory: 'Proposal story',
                proposalConclusion: 'Proposal conclusion',
                everAfterTitle: 'Ever after title',
                everAfterIntro: 'Ever after intro',
                everAfterStory: 'Ever after story',
                everAfterClosing: 'Ever after closing'
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
        updateText('[data-i18n="nav.gallery"]', t.nav.gallery);
        updateText('[data-i18n="nav.rsvp"]', t.nav.rsvp);
        updateText('[data-i18n="nav.contact"]', t.nav.contact);

        // Update hero section
        updateText('[data-i18n="hero.title"]', t.hero.title);
        updateText('[data-i18n="hero.date"]', t.hero.date);

        // Update bride and groom section
        updateText('[data-i18n="brideGroom.title"]', t.brideGroom.title);
        updateText('[data-i18n="brideGroom.subtitle"]', t.brideGroom.subtitle);
        updateText('[data-i18n="brideGroom.intro"]', t.brideGroom.intro);
        updateText('[data-i18n="brideGroom.button"]', t.brideGroom.button);

        // Update gallery section
        updateText('[data-i18n="gallery.title"]', t.gallery.title);
        updateText('[data-i18n="gallery.photos"]', t.gallery.photos);
        updateText('[data-i18n="gallery.videos"]', t.gallery.videos);
        updateText('[data-i18n="gallery.journey"]', t.gallery.journey);
        updateText('[data-i18n="gallery.journeyDesc"]', t.gallery.journeyDesc);
        updateText('[data-i18n="gallery.journeySubsections.firstDays"]', t.gallery.journeySubsections.firstDays);
        updateText('[data-i18n="gallery.journeySubsections.trips"]', t.gallery.journeySubsections.trips);
        updateText('[data-i18n="gallery.journeySubsections.proposal"]', t.gallery.journeySubsections.proposal);
        updateText('[data-i18n="gallery.journeySubsections.andSoOn"]', t.gallery.journeySubsections.andSoOn);
        updateText('[data-i18n="gallery.preWedding"]', t.gallery.preWedding);
        updateText('[data-i18n="gallery.preWeddingDesc"]', t.gallery.preWeddingDesc);
        updateText('[data-i18n="gallery.preWeddingSubsections.hanoi"]', t.gallery.preWeddingSubsections.hanoi);
        updateText('[data-i18n="gallery.preWeddingSubsections.dalat"]', t.gallery.preWeddingSubsections.dalat);
        updateText('[data-i18n="gallery.weddingPhotos"]', t.gallery.weddingPhotos);
        updateText('[data-i18n="gallery.weddingPhotosDesc"]', t.gallery.weddingPhotosDesc);
        updateText('[data-i18n="gallery.weddingPhotosSubsections.vuQuy"]', t.gallery.weddingPhotosSubsections.vuQuy);
        updateText('[data-i18n="gallery.weddingPhotosSubsections.theParty"]', t.gallery.weddingPhotosSubsections.theParty);
        updateText('[data-i18n="gallery.weddingPhotosSubsections.reception"]', t.gallery.weddingPhotosSubsections.reception);
        updateText('[data-i18n="gallery.weddingPhotosSubsections.wedding"]', t.gallery.weddingPhotosSubsections.wedding);
        updateText('[data-i18n="gallery.guestUploads"]', t.gallery.guestUploads);
        updateText('[data-i18n="gallery.guestUploadsDesc"]', t.gallery.guestUploadsDesc);
        updateText('[data-i18n="gallery.videosDesc"]', t.gallery.videosDesc);
        updateText('[data-i18n="gallery.comingSoon"]', t.gallery.comingSoon);
        updateText('[data-i18n="gallery.uploadTitle"]', t.gallery.uploadTitle);
        updateText('[data-i18n="gallery.uploadDesc"]', t.gallery.uploadDesc);
        updateText('[data-i18n="gallery.uploadButton"]', t.gallery.uploadButton);

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
        updateText('[data-i18n="rsvp.bannerTitle"]', t.rsvp.bannerTitle);
        updateText('[data-i18n="rsvp.bannerSubtitle"]', t.rsvp.bannerSubtitle);
        updateText('[data-i18n="rsvp.bannerCta"]', t.rsvp.bannerCta);
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
        updateText('[data-i18n="timeline.timeLabel"]', t.timeline.timeLabel);
        updateText('[data-i18n="timeline.locationLabel"]', t.timeline.locationLabel);
        updateText('[data-i18n="timeline.addressLabel"]', t.timeline.addressLabel);
        updateText('[data-i18n="timeline.ceremonyTime"]', t.timeline.ceremonyTime);
        updateText('[data-i18n="timeline.ceremonyLocationName"]', t.timeline.ceremonyLocationName);
        updateText('[data-i18n="timeline.ceremonyAddress"]', t.timeline.ceremonyAddress);
        updateText('[data-i18n="timeline.preWeddingTime"]', t.timeline.preWeddingTime);
        updateText('[data-i18n="timeline.preWeddingLocationName"]', t.timeline.preWeddingLocationName);
        updateText('[data-i18n="timeline.preWeddingAddress"]', t.timeline.preWeddingAddress);
        updateText('[data-i18n="timeline.weddingTime"]', t.timeline.weddingTime);
        updateText('[data-i18n="timeline.weddingLocationName"]', t.timeline.weddingLocationName);
        updateText('[data-i18n="timeline.weddingAddress"]', t.timeline.weddingAddress);

        // Update location section
        updateText('[data-i18n="location.title"]', t.location.title);
        updateText('[data-i18n="location.subtitle"]', t.location.subtitle);
        updateText('[data-i18n="location.ceremony"]', t.location.ceremony);
        updateText('[data-i18n="location.ceremonyVenue"]', t.location.ceremonyVenue);
        updateText('[data-i18n="location.ceremonyAddress"]', t.location.ceremonyAddress);
        updateText('[data-i18n="location.ceremonyTime"]', t.location.ceremonyTime);
        updateText('[data-i18n="location.preWedding"]', t.location.preWedding);
        updateText('[data-i18n="location.preWeddingVenue"]', t.location.preWeddingVenue);
        updateText('[data-i18n="location.preWeddingAddress"]', t.location.preWeddingAddress);
        updateText('[data-i18n="location.preWeddingTime"]', t.location.preWeddingTime);
        updateText('[data-i18n="location.wedding"]', t.location.wedding);
        updateText('[data-i18n="location.weddingVenue"]', t.location.weddingVenue);
        updateText('[data-i18n="location.weddingAddress"]', t.location.weddingAddress);
        updateText('[data-i18n="location.weddingTime"]', t.location.weddingTime);
        updateText('[data-i18n="location.timeLabel"]', t.location.timeLabel);
        updateText('[data-i18n="location.locationLabel"]', t.location.locationLabel);
        updateText('[data-i18n="location.addressLabel"]', t.location.addressLabel);
        updateText('[data-i18n="location.viewMap"]', t.location.viewMap);
        updateText('[data-i18n="location.accommodationTitle"]', t.location.accommodationTitle);
        updateText('[data-i18n="location.accommodationSubtitle"]', t.location.accommodationSubtitle);

        // Update story section
        updateText('[data-i18n="story.title"]', t.story.title);
        updateText('[data-i18n="story.subtitle"]', t.story.subtitle);
        updateText('[data-i18n="story.meetTitle"]', t.story.meetTitle);
        updateText('[data-i18n="story.meetBride"]', t.story.meetBride);
        updateText('[data-i18n="story.brideBio"]', t.story.brideBio);
        updateText('[data-i18n="story.brideQuote"]', t.story.brideQuote);
        updateText('[data-i18n="story.meetGroom"]', t.story.meetGroom);
        updateText('[data-i18n="story.groomBio"]', t.story.groomBio);
        updateText('[data-i18n="story.groomQuote"]', t.story.groomQuote);
        updateText('[data-i18n="story.howWeMet"]', t.story.howWeMet);
        updateText('[data-i18n="story.howWeMetSubtitle"]', t.story.howWeMetSubtitle);
        updateText('[data-i18n="story.howWeMetIntro"]', t.story.howWeMetIntro);
        updateText('[data-i18n="story.bridePerspective"]', t.story.bridePerspective);
        updateText('[data-i18n="story.bridePerspectiveStory"]', t.story.bridePerspectiveStory);
        updateText('[data-i18n="story.groomPerspective"]', t.story.groomPerspective);
        updateText('[data-i18n="story.groomPerspectiveStory"]', t.story.groomPerspectiveStory);
        updateText('[data-i18n="story.firstDate"]', t.story.firstDate);
        updateText('[data-i18n="story.tripsTitle"]', t.story.tripsTitle);
        updateText('[data-i18n="story.tripsIntro"]', t.story.tripsIntro);
        updateText('[data-i18n="story.tripsMemories"]', t.story.tripsMemories);
        updateText('[data-i18n="story.tripsConclusion"]', t.story.tripsConclusion);
        updateText('[data-i18n="story.proposalTitle"]', t.story.proposalTitle);
        updateText('[data-i18n="story.proposalIntro"]', t.story.proposalIntro);
        updateText('[data-i18n="story.proposalStory"]', t.story.proposalStory);
        updateText('[data-i18n="story.proposalConclusion"]', t.story.proposalConclusion);
        updateText('[data-i18n="story.everAfterTitle"]', t.story.everAfterTitle);
        updateText('[data-i18n="story.everAfterIntro"]', t.story.everAfterIntro);
        updateText('[data-i18n="story.everAfterStory"]', t.story.everAfterStory);
        updateText('[data-i18n="story.everAfterClosing"]', t.story.everAfterClosing);

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
            // Check if this is an address element that should preserve line breaks
            if (selector.includes('Address') || el.classList.contains('venue-info') || el.classList.contains('address')) {
                // Convert \n to <br> for addresses
                el.innerHTML = text.replace(/\n/g, '<br>');
            } else {
                el.textContent = text;
            }
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
                // Re-apply language to update header text
                setLanguage(currentLanguage);
                setupLanguageToggle();
            }, 100);
        }
    });

    // Also listen for componentsReady event as fallback
    document.addEventListener('componentsReady', () => {
        setTimeout(() => {
            // Re-apply language to update header text
            setLanguage(currentLanguage);
            setupLanguageToggle();
        }, 100);
    });
})();

