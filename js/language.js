// Language Translation System
(function () {
    'use strict';

    const translations = {
        en: {
            // Navigation
            nav: {
                home: 'Home',
                location: 'Location',
                story: 'Love Story',
                gallery: 'Gallery',
                rsvp: 'RSVP',
                contact: 'Contact'
            },
            // Hero Section
            hero: {
                title: "Minh Anh \n & \n Hoàng Hiệp",
                date: 'January 1, 2026',
            },
            // Gallery Section
            gallery: {
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
                    theParty: 'Welcome Party',
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
                months: 'Months',
                month: 'Month',
                days: 'Days',
                day: 'Day',
                hours: 'Hours',
                hour: 'Hour',
                minutes: 'Minutes',
                minute: 'Minute',
                seconds: 'Seconds',
                second: 'Second'
            },
            // RSVP Section
            rsvp: {
                title: 'RSVP',
                intro: 'Please let us know your plans so we can make our arrangements. We can\'t wait to celebrate with you!',
                subtitle: 'Please let us know if you\'ll be joining us',
                bannerTitle: 'We hope you can join us!',
                bannerSubtitle: 'We\'re counting down the days and really hope you can be there to celebrate with us!',
                bannerCta: 'Ready to party? Click below to let us know.',
                fullName: 'Name *',
                email: 'Email',
                guestOf: 'You are a guest of: *',
                guestOfBride: 'The Bride',
                guestOfGroom: 'The Groom',
                guestOfBoth: 'Both',
                phone: 'Phone Number',
                guests: 'Number of Guests *',
                attendance: 'Will you be celebrating with us? *',
                yes: 'Yes, I\'ll be there!',
                no: 'No, sorry, I can\'t make it.',
                eventsAttending: 'That\'s great! Please check all the events you\'ll be attending:',
                welcomeParty: 'Welcome Party',
                mainWedding: 'Main Wedding (Ceremony & Reception)',
                message: 'Message to Us',
                messagePlaceholder: 'e.g., a song request, a sweet note!',
                otherRequests: 'Other Requests',
                otherRequestsPlaceholder: 'e.g., dietary allergies, accessibility needs',
                submit: 'Submit RSVP',
                submitting: 'Submitting...',
                success: 'Thank you for your RSVP! We look forward to seeing you.',
                error: 'Sorry, there was an error submitting your RSVP. Please try again later or contact us directly.',
                fillFields: 'Please fill in all required fields.',
                validEmail: 'Please enter a valid email address.',
                selectAtLeastOneEvent: 'Please select at least one event you will be attending.'
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
                subtitle: 'Here\'s the plan for our celebration. We can\'t wait to see you there!',
                welcomeParty: 'Welcome Party',
                wedding: 'Wedding Ceremony',
                timeLabel: 'Date & Time:',
                locationLabel: 'Location:',
                addressLabel: 'Address:',
                welcomePartyTime: '5:00 PM 31/12/2025',
                welcomePartyLocationName: 'Siha Cafe',
                welcomePartyAddress: '158 Nguyen Dinh Chinh\n Phu Nhuan, Ho Chi Minh City',
                weddingTime: '5:00 PM 1/1/2026',
                weddingLocationName: 'Chloe Gallery - Anna Garden',
                weddingAddress: '06 Phan Van Chuong\n Tan My, Ho Chi Minh City'
            },
            // Location Section
            location: {
                title: 'Wedding Venues',
                subtitle: 'Find all our wedding venues',
                welcomeParty: 'Welcome Party',
                welcomePartyVenue: 'Siha Cafe',
                welcomePartyAddress: '158 Nguyen Dinh Chinh\n Phu Nhuan, Ho Chi Minh City',
                welcomePartyTime: '5:00 PM 31/12/2025',
                wedding: 'Wedding Ceremony',
                weddingVenue: 'Chloe Gallery - Anna Garden',
                weddingAddress: '06 Phan Van Chuong\n Tan My, Ho Chi Minh City',
                weddingTime: '5:00 PM 1/1/2026',
                timeLabel: 'Date & Time:',
                locationLabel: 'Location:',
                addressLabel: 'Address:',
                accommodationTitle: 'Accommodations',
                accommodationSubtitle: 'Recommended places to stay',
                homeHotelTitle: 'Home Hotel',
                homeHotelAddress: '158 Nguyen Dinh Chinh\n Phu Nhuan, Ho Chi Minh City',
                phoneLabel: 'Phone:',
                airbnbProfileTitle: 'Airbnb - Maoki House',
                viewProfile: 'View Profile'
            },
            // Story Section
            story: {
                title: 'Our love story',
                subtitle: 'Welcome to our love story! Please read through some fun facts prior the party so you can win some games at our wedding!',
                meetTitle: 'Bride & Groom',
                brideTitle: 'Our bride - Minh Anh (June)',
                brideSubtitle: 'A chill girl who wanna be young & rich 🤑',
                bridePersonalityLabel: 'Personality:',
                bridePersonality: '"Looks like they could kill you, would kill you." 🔪😂',
                brideDescriptionLabel: 'Description:',
                brideDescription: 'Is the "Buddhist" in Journey to the West series - the one who always cause troubles & challenge themselves.<br>Is an excellent problem solver so she always make irrational decisions & cause more problems (to solve & become more experience).',
                groomTitle: 'Our groom - Hiep',
                groomSubtitle: 'A talented actor from Hanoi acting school 🕴',
                groomPersonalityLabel: 'Personality:',
                groomPersonality: '"Looks like a cinnamon roll, is a cinnamon roll... or maybe not?" 🤔',
                groomDescriptionLabel: 'Description:',
                groomDescription: 'Is a typical straight man who is always calm, non-confrontational but date June - weird choice huh?!<br>Is the Wukong in the relationship with a powerful magic wand who can solve 99% of June\'s problems.<br>Is a professional badminton player at Peter MacCallum Cancer Centre.',
                howWeMet: 'How we met',
                howWeMetIntro: 'It all started with a classic case of "right place, right time" (yes, right in the global pandemic).',
                howWeMetParagraph1: 'Hiep, a Hanoiian, decided to take a chance and move to Ho Chi Minh City for work. At the same time, June, still a student, insisted on getting her very first job.',
                howWeMetParagraph2: 'By pure coincidence, we both ended up at the same company, and the company is developing COVID vaccines during the peak of the pandemic (luckily we are not jobless).<br>We were work buddies first, navigating the chaos of lockdowns and deadlines together.',
                howWeMetImage1Alt: 'June at work, looking like a scientist!',
                howWeMetParagraph3: 'After the lockdowns lifted, June (being the "Buddhist" who loves to explore) took Hiep on tours around the city. Hiep\'s big confession was to finally take her somewhere new. And what\'s more romantic than... a drawing class?',
                howWeMetImage2Alt: 'Hiep in his natural habitat<br>(although not seeing the face,<br>but the person on the left is Hiep!)',
                howWeMetImage3Alt: 'Us and our shared "masterpiece"',
                journeyTitle: 'Our journey',
                journeyIntro: 'From colleagues to a couple, we started to grow together. We were best buddies trying new things in life.',
                journeyColumn1Text: 'Like our first time dyeing our hair...',
                journeyHairImageAlt: 'Hiep\'s transformation into a K-pop idol!',
                journeyColumn2Text: '...or becoming reviewers and best drinking buddies!',
                journeyParagraph1: 'We weren\'t just a couple; we were best buddies. Our relationship was built on a solid foundation of hanging out at cafes... and also being reliable "bạn nhậu" (drinking buddies).',
                journeyCafeImage1Alt: 'We are chilling at a coffee shop!',
                journeyCafeImage2Alt: '1,2,3... Cheers!',
                journeyParagraph2: 'We were there for each other\'s biggest milestones and celebrated all the big wins.',
                journeyGraduationImage1Alt: 'June in her graduation day!',
                journeyGraduationImage2Alt: 'Hiep receiving his graduation certificate!',
                journeyParagraph3: 'And we started exploring the world together. This is where "Buddhists" really put "Wukong" to the test, and our adventures truly began.',
                journeyTripImage1Alt: 'Trip 1',
                journeyTripImage2Alt: 'Trip 2',
                journeyTripImage3Alt: 'Trip 3',
                proposalTitle: 'The proposal',
                proposalIntro: 'It was during our trip to Taiwan. Normally we chose to stay somewhere convenient to travel, but Hiep chose a very "shady" place...',
                proposalGroomLabel: 'Hiep:',
                proposalGroomQuote: '"I prepared a very detailed and secret plan that would surprise her." <span style="font-style: normal;">🤯</span>',
                proposalBrideLabel: 'June:',
                proposalBrideQuote: '"I knew it already, and honestly I planned not to accept it." <span style="font-style: normal;">🤭</span>',
                proposalImage1Alt: 'The actual "Will you marry me?" moment (June finally gave in for the photo).',
                proposalImage1Caption: 'The actual \'Will you marry me?\' moment (June finally gave in)',
                proposalConclusion: 'But a surprise is a surprise, and good food means an undeniable "Yes".',
                proposalImage2Alt: 'The celebration dinner (and the food that sealed the deal)',
                proposalImage2Caption: 'The celebration dinner (and the food that sealed the deal)',
                everAfterTitle: '...And ever after',
                everAfterIntro: 'And now, our adventure continues! We\'ve packed up our lives and are building our next chapter together in Australia.',
                everAfterParagraph1: 'We\'re so excited to see where this journey takes us, and even more excited to have you all be a part of the official starting line.<br>See you at the wedding!',
                everAfterImage1Alt: 'June pointing out the real view.<br>The Opera House is not that good!',
                everAfterImage2Alt: 'Us in our bedroom in Melbourne.<br>A bit minimal but the rent is great!',
                everAfterImage3Alt: 'June driving Hiep across Australia.<br>The "Buddhist" and "Wukong"\'s journey continues...'
            },
            // Explore Section
            explore: {
                text: 'Learn more about our story and see our favorite memories so far.',
                storyButton: 'Explore Our Love Story',
                galleryButton: 'View Our Gallery'
            }
        },
        vi: {
            // Navigation
            nav: {
                home: 'Trang chủ',
                location: 'Địa điểm',
                story: 'Chuyện tình',
                gallery: 'Thư viện ảnh',
                rsvp: 'Phản hồi',
                contact: 'Liên hệ'
            },
            // Hero Section
            hero: {
                title: 'Minh Anh \n & \n Hoàng Hiệp',
                date: 'Ngày 1 tháng 1, 2026',
            },
            // Gallery Section
            gallery: {
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
                weddingPhotosDesc: 'Sắp có nhé! Ảnh cưới chính thức sẽ được chúng mình đăng lên đây sau ngày trọng đại. Chúng mình rất mong được chia sẻ chúng!',
                weddingPhotosSubsections: {
                    theParty: 'Tiệc thân mật',
                    reception: 'Đón khách',
                    wedding: 'Lễ cưới'
                },
                guestUploads: 'Ảnh từ khách mời',
                guestUploadsDesc: 'Các bạn chính là những nhiếp ảnh gia xịn nhất! Nếu bạn có bất kỳ khoảnh khắc nào trong ngày cưới (hoặc bất kỳ kỷ niệm vui nào với chúng mình), hãy chia sẻ tại đây nhé. Chúng mình rất muốn nhìn thấy ngày vui qua lăng kính của các bạn.',
                videosDesc: 'Một vài khoảnh khắc yêu thích nhất của chúng mình qua những thước phim.',
                comingSoon: 'Ảnh sắp có...',
                uploadTitle: 'Chia sẻ ảnh của bạn',
                uploadDesc: 'Tải lên những khoảnh khắc yêu thích của bạn từ đám cưới của chúng mình',
                uploadButton: 'Tải ảnh lên'
            },
            // Countdown Section
            countdown: {
                months: 'Tháng',
                month: 'Tháng',
                days: 'Ngày',
                day: 'Ngày',
                hours: 'Giờ',
                hour: 'Giờ',
                minutes: 'Phút',
                minute: 'Phút',
                seconds: 'Giây',
                second: 'Giây'
            },
            // RSVP Section
            rsvp: {
                title: 'Phản hồi',
                intro: 'Vui lòng cho chúng mình biết kế hoạch của bạn để chúng mình tiện sắp xếp nhé. Rất mong được chung vui cùng bạn!',
                subtitle: 'Vui lòng cho chúng mình biết bạn có tham dự không',
                bannerTitle: 'Hy vọng bạn sẽ đến!',
                bannerSubtitle: 'Chúng mình đang đếm ngược từng ngày và rất hy vọng bạn có thể ở đó để chung vui cùng chúng mình!',
                bannerCta: 'Sẵn sàng "quẩy" chưa? Bấm vào bên dưới để cho chúng mình biết nhé.',
                fullName: 'Tên của bạn *',
                email: 'Email',
                guestOf: 'Bạn là khách mời của: *',
                guestOfBride: 'Cô dâu',
                guestOfGroom: 'Chú rể',
                guestOfBoth: 'Cả hai',
                phone: 'Số điện thoại',
                guests: 'Số lượng khách tham dự *',
                attendance: 'Bạn có tham dự cùng chúng mình không? *',
                yes: 'Có, mình sẽ đến!',
                no: 'Rất tiếc, mình không đến được.',
                eventsAttending: 'Tuyệt vời! Vui lòng chọn các sự kiện bạn sẽ tham dự:',
                welcomeParty: 'Tiệc thân mật',
                mainWedding: 'Lễ cưới',
                message: 'Lời nhắn cho chúng mình',
                messagePlaceholder: 'vd: yêu cầu bài hát, một lời chúc dễ thương!',
                otherRequests: 'Yêu cầu khác',
                otherRequestsPlaceholder: 'vd: dị ứng đồ ăn, cần hỗ trợ di chuyển',
                submit: 'Gửi Phản Hồi',
                submitting: 'Đang gửi...',
                success: 'Cảm ơn bạn đã xác nhận! Chúng mình rất mong được gặp bạn.',
                error: 'Oops! Có lỗi khi gửi xác nhận rồi. Thử lại sau hoặc liên hệ với chúng mình nhé.',
                fillFields: 'Vui lòng điền vào tất cả các trường bắt buộc.',
                validEmail: 'Vui lòng nhập địa chỉ email hợp lệ.',
                selectAtLeastOneEvent: 'Vui lòng chọn ít nhất một sự kiện bạn sẽ tham dự.'
            },
            // Contact Section
            contact: {
                title: 'Liên hệ',
                subtitle: 'Có câu hỏi? Chúng mình rất muốn nghe từ bạn',
                yourName: 'Tên của bạn *',
                yourEmail: 'Email của bạn *',
                message: 'Lời nhắn *',
                send: 'Gửi tin nhắn',
                success: 'Cảm ơn bạn đã gửi tin nhắn! Chúng mình sẽ phản hồi sớm.',
                fillFields: 'Vui lòng điền vào tất cả các trường bắt buộc.',
                validEmail: 'Vui lòng nhập địa chỉ email hợp lệ.'
            },
            // Timeline Section
            timeline: {
                title: 'Lịch trình ngày cưới',
                subtitle: 'Đây là kế hoạch cho ngày vui của chúng mình. Rất mong được gặp các bạn ở đó!',
                welcomeParty: 'Tiệc thân mật',
                wedding: 'Lễ cưới',
                timeLabel: 'Ngày & Giờ:',
                locationLabel: 'Địa điểm:',
                addressLabel: 'Địa chỉ:',
                welcomePartyTime: '5:00 CH 31/12/2025',
                welcomePartyLocationName: 'Siha Cafe',
                welcomePartyAddress: '158 Nguyễn Đình Chính\n Phú Nhuận, TP. Hồ Chí Minh',
                weddingTime: '5:00 CH 1/1/2026',
                weddingLocationName: 'Chloe Gallery - Sảnh Anna Garden',
                weddingAddress: '06 Phan Văn Chương\n Tân Mỹ, TP. Hồ Chí Minh'
            },
            // Location Section
            location: {
                title: 'Địa điểm tổ chức',
                subtitle: 'Tìm tất cả các địa điểm tổ chức tiệc cưới của chúng mình',
                welcomeParty: 'Tiệc thân mật',
                welcomePartyVenue: 'Siha Cafe',
                welcomePartyAddress: '158 Nguyễn Đình Chính\n Phú Nhuận, TP. Hồ Chí Minh',
                welcomePartyTime: '5:00 CH 31/12/2025',
                wedding: 'Lễ cưới',
                weddingVenue: 'Chloe Gallery - Sảnh Anna Garden',
                weddingAddress: '06 Phan Văn Chương\n Tân Mỹ, TP. Hồ Chí Minh',
                weddingTime: '5:00 CH 1/1/2026',
                timeLabel: 'Ngày & Giờ:',
                locationLabel: 'Địa điểm:',
                addressLabel: 'Địa chỉ:',
                accommodationTitle: 'Nơi ở',
                accommodationSubtitle: 'Những địa điểm lưu trứ để các bạn tiện di chuyển',
                homeHotelTitle: 'Home Hotel',
                homeHotelAddress: '158 Nguyễn Đình Chính\n Phú Nhuận, TP. Hồ Chí Minh',
                phoneLabel: 'Điện thoại:',
                airbnbProfileTitle: 'Airbnb - Maoki House',
                viewProfile: 'Xem hồ sơ'
            },
            // Story Section
            story: {
                title: 'Chuyện tình yêu của chúng mình',
                subtitle: 'Chào mừng đến với câu chuyện của chúng mình! Mời mọi người đọc qua vài hint để khi dự tiệc sẽ săn được nhiều quà nè!',
                meetTitle: 'Cô dâu & Chú rể',
                brideTitle: 'Cô dâu Minh Anh',
                brideSubtitle: 'Giao diện đồng hành với hệ điều hành - luôn "chiến"! 🤑',
                bridePersonalityLabel: 'Tính cách:',
                bridePersonality: '"Looks like they could kill you, would kill you." 🔪😂',
                brideDescriptionLabel: 'Mô tả:',
                brideDescription: 'Là "Đường Tăng" trong mối quan hệ - thích "kiếm chuyện" & va vào rắc rối - khi không giải quyết được thì alo chú rể aka "Ngộ Không" Hoàng Hiệp.<br>Là người giải quyết vấn đề siêu đỉnh nên rất hay gặp vấn đề - Ủa?!<br>Là 1 chill girl chính hiệu nhưng không muốn ngồi chill quá lâu.',
                groomTitle: 'Chú rể Hoàng Hiệp',
                groomSubtitle: 'Diễn viên chuyên nghiệp từ trường sân khấu điện ảnh Hà Nội - "Muốn vai nào anh diễn trọn vai đó cho em!" 👶',
                groomPersonalityLabel: 'Tính cách:',
                groomPersonality: '"Looks like a cinnamon roll, is a cinnamon roll... or maybe not?" 🤔',
                groomDescriptionLabel: 'Mô tả:',
                groomDescription: 'Là thẳng nam chính hiệu, luôn điềm tĩnh và né xa rắc rối nhưng lại dính vào Minh Anh - Ủa?!<br>Là Ngộ Không đa tài đa năng có 7749 phép thần thông để làm dịu chill girl.<br>Là vận động viên cầu lông chuyên nghiệp tại Peter MacCallum Cancer Centre.',
                howWeMet: 'Chúng mình gặp nhau thế nào',
                howWeMetIntro: 'Mọi thứ bắt đầu kiểu "đúng người, đúng thời điểm" (vâng, ngay giữa đại dịch toàn cầu).',
                howWeMetParagraph1: 'Hiệp, một người Hà Nội, quyết định vào TP Hồ Chí Minh làm việc. Cùng lúc đó, Minh Anh, dù vẫn đang đi học, nhưng quyết định đi làm công việc đầu tiên.',
                howWeMetParagraph2: 'Như một sự trùng hợp, cả hai cùng vào một công ty để phát triển vắc-xin COVID ngay giữa tâm dịch (may mà không thất nghiệp).<br>Chúng mình bắt đầu là đồng nghiệp, cùng nhau vượt qua những ngày lockdown và deadline ngập mặt.',
                howWeMetImage1Alt: 'Minh Anh tại công ty,<br>trông rất giống nhà khoa học!',
                howWeMetParagraph3: 'Sau khi hết giãn cách, Minh Anh (vai "Đường Tăng" thích khám phá) dắt Hiệp đi thăm thú thành phố.<br>Và lời tỏ tình của Hiệp là dẫn Minh Anh khám phá một nơi mới. Còn gì lãng mạn hơn... một lớp học vẽ?',
                howWeMetImage2Alt: 'Hiệp trong môi trường tự nhiên<br>(mặc dù không thấy mặt,<br>nhưng người bên trái là Hiệp!)',
                howWeMetImage3Alt: 'Chúng mình cùng với<br>"kiệt tác nghệ thuật" chung của cả hai',
                journeyTitle: 'Hành trình',
                journeyIntro: 'Từ đồng nghiệp thành một đôi, chúng mình bắt đầu cùng nhau trưởng thành. Chúng mình là đôi bạn thân cùng nhau thử những điều mới mẻ trong cuộc sống.',
                journeyColumn1Text: 'Như là lần đầu tiên đi nhuộm tóc...',
                journeyHairImageAlt: 'Hiệp lột xác thành oppa K-pop!',
                journeyColumn2Text: '...hay trở thành reviewer và là "bạn nhậu" hợp cạ!',
                journeyParagraph1: 'Chúng mình không chỉ là một cặp đôi; chúng mình còn là bạn thân. Mối quan hệ này được xây dựng trên nền tảng vững chắc là... những buổi lê la quán cà phê, và tất nhiên, là những "bạn nhậu" rất hợp cạ.',
                journeyCafeImage1Alt: 'Chúng mình chill ở quán cà phê!',
                journeyCafeImage2Alt: '1,2,3... Dzô!!!',
                journeyParagraph2: 'Chúng mình cùng có mặt ở những cột mốc quan trọng nhất của nhau và ăn mừng tất cả những thành tựu lớn.',
                journeyGraduationImage1Alt: 'Minh Anh trong ngày tốt nghiệp!',
                journeyGraduationImage2Alt: 'Hiệp nhận giấy tốt nghiệp!',
                journeyParagraph3: 'Và chúng mình bắt đầu khám phá thế giới. Đây chính là lúc "Đường Tăng" thực sự thử thách "Ngộ Không"!',
                journeyTripImage1Alt: 'Chuyến đi 1',
                journeyTripImage2Alt: 'Chuyến đi 2',
                journeyTripImage3Alt: 'Chuyến đi 3',
                proposalTitle: 'Màn cầu hôn',
                proposalIntro: 'Chuyện xảy ra trong chuyến đi Đài Loan của chúng mình. Bình thường chúng mình sẽ chọn ở đâu đó tiện đi lại, nhưng lần này Hiệp lại chọn một nơi rất "shady"...',
                proposalGroomLabel: 'Hiệp:',
                proposalGroomQuote: '"Mình đã chuẩn bị một kế hoạch chi tiết, bí mật để làm cô ấy bất ngờ." <span style="font-style: normal;">🤯</span>',
                proposalBrideLabel: 'Minh Anh:',
                proposalBrideQuote: '"Mình biết thừa rồi, và suýt nữa định không đồng ý." <span style="font-style: normal;">🤭</span>',
                proposalImage1Alt: 'Khoảnh khắc "Em đồng ý" (Minh Anh cuối cùng cũng chịu để chụp ảnh)',
                proposalImage1Caption: 'Khoảnh khắc "Em đồng ý" (Minh Anh cuối cùng cũng chịu để chụp ảnh)',
                proposalConclusion: 'Nhưng mà bất ngờ vẫn là bất ngờ, và đồ ăn ngon thì không thể chối từ!',
                proposalImage2Alt: 'Bữa tối ăn mừng (và đồ ăn chốt đơn)',
                proposalImage2Caption: 'Bữa tối ăn mừng (và đồ ăn chốt đơn)',
                everAfterTitle: '...Và mãi mãi về sau',
                everAfterIntro: 'Và giờ đây, hành trình của chúng mình lại tiếp tục! Chúng mình đang cùng nhau thu xếp cuộc sống mới và viết tiếp chương tiếp theo ở Úc.',
                everAfterParagraph1: 'Chúng mình rất háo hức xem hành trình này sẽ đi đến đâu, và còn háo hức hơn nữa khi có tất cả các bạn ở đây, ngay vạch xuất phát chính thức này.<br>Hẹn gặp các bạn ở đám cưới nhé!',
                everAfterImage1Alt: 'Minh Anh đang chỉ "view" xịn nhất.<br>Nhà hát con sò cũng thường thôi!',
                everAfterImage2Alt: 'Phòng ngủ của chúng mình ở Melbourne.<br>Hơi theo phong cách tối giản nhưng được cái giá rẻ!',
                everAfterImage3Alt: 'Minh Anh chở Hiệp đi xuyên nước Úc.<br>Hành trình của "Đường Tăng" và "Ngộ Không" vẫn tiếp diễn...'
            },
            // Explore Section
            explore: {
                text: 'Đọc thêm về câu chuyện của chúng mình và xem những kỷ niệm yêu thích nhất nhé.',
                storyButton: 'Khám phá chuyện tình',
                galleryButton: 'Xem Thư Viện Ảnh'
            }
        }
    };

    let currentLanguage = localStorage.getItem('language') || 'vi';

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

        // Dispatch language changed event
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));

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

        // Update gallery section
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
        updateText('[data-i18n="gallery.weddingPhotosSubsections.theParty"]', t.gallery.weddingPhotosSubsections.theParty);
        updateText('[data-i18n="gallery.weddingPhotosSubsections.reception"]', t.gallery.weddingPhotosSubsections.reception);
        updateText('[data-i18n="gallery.weddingPhotosSubsections.wedding"]', t.gallery.weddingPhotosSubsections.wedding);
        updateText('[data-i18n="gallery.guestUploads"]', t.gallery.guestUploads);
        updateText('[data-i18n="gallery.guestUploadsDesc"]', t.gallery.guestUploadsDesc);
        updateText('[data-i18n="gallery.videosDesc"]', t.gallery.videosDesc);
        updateText('[data-i18n="gallery.comingSoon"]', t.gallery.comingSoon);
        updateText('[data-i18n="gallery.uploadButton"]', t.gallery.uploadButton);

        // Note: countdown labels (months, days, hours, minutes, seconds) are handled by countdown.js
        // to support singular/plural forms based on the actual countdown values

        // Update RSVP section
        updateText('[data-i18n="rsvp.title"]', t.rsvp.title);
        updateText('[data-i18n="rsvp.intro"]', t.rsvp.intro);
        updateText('[data-i18n="rsvp.subtitle"]', t.rsvp.subtitle);
        updateText('[data-i18n="rsvp.bannerTitle"]', t.rsvp.bannerTitle);
        updateText('[data-i18n="rsvp.bannerSubtitle"]', t.rsvp.bannerSubtitle);
        updateText('[data-i18n="rsvp.bannerCta"]', t.rsvp.bannerCta);
        updateText('[data-i18n="rsvp.fullName"]', t.rsvp.fullName);
        updateText('[data-i18n="rsvp.email"]', t.rsvp.email);
        updateText('[data-i18n="rsvp.guestOf"]', t.rsvp.guestOf);
        updateText('[data-i18n="rsvp.guestOfBride"]', t.rsvp.guestOfBride);
        updateText('[data-i18n="rsvp.guestOfGroom"]', t.rsvp.guestOfGroom);
        updateText('[data-i18n="rsvp.guestOfBoth"]', t.rsvp.guestOfBoth);
        updateText('[data-i18n="rsvp.phone"]', t.rsvp.phone);
        updateText('[data-i18n="rsvp.guests"]', t.rsvp.guests);
        updateText('[data-i18n="rsvp.attendance"]', t.rsvp.attendance);
        updateText('[data-i18n="rsvp.yes"]', t.rsvp.yes);
        updateText('[data-i18n="rsvp.no"]', t.rsvp.no);
        updateText('[data-i18n="rsvp.eventsAttending"]', t.rsvp.eventsAttending);
        updateText('[data-i18n="rsvp.welcomeParty"]', t.rsvp.welcomeParty);
        updateText('[data-i18n="rsvp.mainWedding"]', t.rsvp.mainWedding);
        updateText('[data-i18n="rsvp.message"]', t.rsvp.message);
        updateText('[data-i18n="rsvp.otherRequests"]', t.rsvp.otherRequests);
        updateText('[data-i18n="rsvp.submit"]', t.rsvp.submit);

        // Update placeholders
        updatePlaceholder('[data-i18n-placeholder="rsvp.messagePlaceholder"]', t.rsvp.messagePlaceholder);
        updatePlaceholder('[data-i18n-placeholder="rsvp.otherRequestsPlaceholder"]', t.rsvp.otherRequestsPlaceholder);

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
        updateText('[data-i18n="timeline.welcomeParty"]', t.timeline.welcomeParty);
        updateText('[data-i18n="timeline.wedding"]', t.timeline.wedding);
        updateText('[data-i18n="timeline.timeLabel"]', t.timeline.timeLabel);
        updateText('[data-i18n="timeline.locationLabel"]', t.timeline.locationLabel);
        updateText('[data-i18n="timeline.addressLabel"]', t.timeline.addressLabel);
        updateText('[data-i18n="timeline.welcomePartyTime"]', t.timeline.welcomePartyTime);
        updateText('[data-i18n="timeline.welcomePartyLocationName"]', t.timeline.welcomePartyLocationName);
        updateText('[data-i18n="timeline.welcomePartyAddress"]', t.timeline.welcomePartyAddress);
        updateText('[data-i18n="timeline.weddingTime"]', t.timeline.weddingTime);
        updateText('[data-i18n="timeline.weddingLocationName"]', t.timeline.weddingLocationName);
        updateText('[data-i18n="timeline.weddingAddress"]', t.timeline.weddingAddress);

        // Update location section
        updateText('[data-i18n="location.title"]', t.location.title);
        updateText('[data-i18n="location.subtitle"]', t.location.subtitle);
        updateText('[data-i18n="location.welcomeParty"]', t.location.welcomeParty);
        updateText('[data-i18n="location.welcomePartyVenue"]', t.location.welcomePartyVenue);
        updateText('[data-i18n="location.welcomePartyAddress"]', t.location.welcomePartyAddress);
        updateText('[data-i18n="location.welcomePartyTime"]', t.location.welcomePartyTime);
        updateText('[data-i18n="location.wedding"]', t.location.wedding);
        updateText('[data-i18n="location.weddingVenue"]', t.location.weddingVenue);
        updateText('[data-i18n="location.weddingAddress"]', t.location.weddingAddress);
        updateText('[data-i18n="location.weddingTime"]', t.location.weddingTime);
        updateText('[data-i18n="location.timeLabel"]', t.location.timeLabel);
        updateText('[data-i18n="location.locationLabel"]', t.location.locationLabel);
        updateText('[data-i18n="location.addressLabel"]', t.location.addressLabel);
        updateText('[data-i18n="location.accommodationTitle"]', t.location.accommodationTitle);
        updateText('[data-i18n="location.accommodationSubtitle"]', t.location.accommodationSubtitle);
        updateText('[data-i18n="location.homeHotelTitle"]', t.location.homeHotelTitle);
        updateText('[data-i18n="location.homeHotelAddress"]', t.location.homeHotelAddress);
        updateText('[data-i18n="location.phoneLabel"]', t.location.phoneLabel);
        updateText('[data-i18n="location.airbnbProfileTitle"]', t.location.airbnbProfileTitle);
        updateText('[data-i18n="location.viewProfile"]', t.location.viewProfile);

        // Update story section
        updateText('[data-i18n="story.title"]', t.story.title);
        updateText('[data-i18n="story.subtitle"]', t.story.subtitle);
        updateText('[data-i18n="story.meetTitle"]', t.story.meetTitle);
        updateText('[data-i18n="story.brideTitle"]', t.story.brideTitle);
        updateText('[data-i18n="story.brideSubtitle"]', t.story.brideSubtitle);
        updateText('[data-i18n="story.bridePersonalityLabel"]', t.story.bridePersonalityLabel);
        updateText('[data-i18n="story.bridePersonality"]', t.story.bridePersonality);
        updateText('[data-i18n="story.brideDescriptionLabel"]', t.story.brideDescriptionLabel);
        updateText('[data-i18n="story.brideDescription"]', t.story.brideDescription);
        updateText('[data-i18n="story.groomTitle"]', t.story.groomTitle);
        updateText('[data-i18n="story.groomSubtitle"]', t.story.groomSubtitle);
        updateText('[data-i18n="story.groomPersonalityLabel"]', t.story.groomPersonalityLabel);
        updateText('[data-i18n="story.groomPersonality"]', t.story.groomPersonality);
        updateText('[data-i18n="story.groomDescriptionLabel"]', t.story.groomDescriptionLabel);
        updateText('[data-i18n="story.groomDescription"]', t.story.groomDescription);
        updateText('[data-i18n="story.howWeMet"]', t.story.howWeMet);
        updateText('[data-i18n="story.howWeMetIntro"]', t.story.howWeMetIntro);
        updateText('[data-i18n="story.howWeMetParagraph1"]', t.story.howWeMetParagraph1);
        updateText('[data-i18n="story.howWeMetParagraph2"]', t.story.howWeMetParagraph2);
        updateText('[data-i18n="story.howWeMetImage1Alt"]', t.story.howWeMetImage1Alt);
        updateText('[data-i18n="story.howWeMetParagraph3"]', t.story.howWeMetParagraph3);
        updateText('[data-i18n="story.howWeMetImage2Alt"]', t.story.howWeMetImage2Alt);
        updateText('[data-i18n="story.howWeMetImage3Alt"]', t.story.howWeMetImage3Alt);
        updateText('[data-i18n="story.journeyTitle"]', t.story.journeyTitle);
        updateText('[data-i18n="story.journeyIntro"]', t.story.journeyIntro);
        updateText('[data-i18n="story.journeyColumn1Text"]', t.story.journeyColumn1Text);
        updateText('[data-i18n="story.journeyHairImageAlt"]', t.story.journeyHairImageAlt);
        updateText('[data-i18n="story.journeyColumn2Text"]', t.story.journeyColumn2Text);
        updateText('[data-i18n="story.journeyParagraph1"]', t.story.journeyParagraph1);
        updateText('[data-i18n="story.journeyCafeImage1Alt"]', t.story.journeyCafeImage1Alt);
        updateText('[data-i18n="story.journeyCafeImage2Alt"]', t.story.journeyCafeImage2Alt);
        updateText('[data-i18n="story.journeyParagraph2"]', t.story.journeyParagraph2);
        updateText('[data-i18n="story.journeyGraduationImage1Alt"]', t.story.journeyGraduationImage1Alt);
        updateText('[data-i18n="story.journeyGraduationImage2Alt"]', t.story.journeyGraduationImage2Alt);
        updateText('[data-i18n="story.journeyParagraph3"]', t.story.journeyParagraph3);
        updateText('[data-i18n="story.journeyTripImage1Alt"]', t.story.journeyTripImage1Alt);
        updateText('[data-i18n="story.journeyTripImage2Alt"]', t.story.journeyTripImage2Alt);
        updateText('[data-i18n="story.journeyTripImage3Alt"]', t.story.journeyTripImage3Alt);
        updateText('[data-i18n="story.proposalTitle"]', t.story.proposalTitle);
        updateText('[data-i18n="story.proposalIntro"]', t.story.proposalIntro);
        updateText('[data-i18n="story.proposalGroomLabel"]', t.story.proposalGroomLabel);
        updateText('[data-i18n="story.proposalGroomQuote"]', t.story.proposalGroomQuote);
        updateText('[data-i18n="story.proposalBrideLabel"]', t.story.proposalBrideLabel);
        updateText('[data-i18n="story.proposalBrideQuote"]', t.story.proposalBrideQuote);
        updateText('[data-i18n="story.proposalImage1Alt"]', t.story.proposalImage1Alt);
        updateText('[data-i18n="story.proposalImage1Caption"]', t.story.proposalImage1Caption);
        updateText('[data-i18n="story.proposalConclusion"]', t.story.proposalConclusion);
        updateText('[data-i18n="story.proposalImage2Alt"]', t.story.proposalImage2Alt);
        updateText('[data-i18n="story.proposalImage2Caption"]', t.story.proposalImage2Caption);
        updateText('[data-i18n="story.everAfterTitle"]', t.story.everAfterTitle);
        updateText('[data-i18n="story.everAfterIntro"]', t.story.everAfterIntro);
        updateText('[data-i18n="story.everAfterParagraph1"]', t.story.everAfterParagraph1);
        updateText('[data-i18n="story.everAfterImage1Alt"]', t.story.everAfterImage1Alt);
        updateText('[data-i18n="story.everAfterImage2Alt"]', t.story.everAfterImage2Alt);
        updateText('[data-i18n="story.everAfterImage3Alt"]', t.story.everAfterImage3Alt);

        // Update explore section
        updateText('[data-i18n="explore.text"]', t.explore.text);
        updateText('[data-i18n="explore.storyButton"]', t.explore.storyButton);
        updateText('[data-i18n="explore.galleryButton"]', t.explore.galleryButton);

        // Update language toggle button
        const langToggle = document.getElementById('language-toggle');
        if (langToggle) {
            if (lang === 'en') {
                langToggle.innerHTML = '<span class="lang-current">EN</span>/<span class="lang-other">VI</span>';
            } else {
                langToggle.innerHTML = '<span class="lang-current">VI</span>/<span class="lang-other">EN</span>';
            }
            langToggle.setAttribute('aria-label', lang === 'en' ? 'Switch to Vietnamese' : 'Switch to English');
        }
    }

    // Helper function to update text content
    function updateText(selector, text) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            // Check if this is an image element - update alt attribute
            if (el.tagName === 'IMG') {
                el.alt = text;
            }
            // Check if this is a list element for person bio - convert <br> to list items
            else if (el.tagName === 'UL' && el.classList.contains('story-person-bio')) {
                // Split by <br> tags and create list items
                const lines = text.split(/<br\s*\/?>/i);
                el.innerHTML = '';
                lines.forEach(line => {
                    if (line.trim()) {
                        const li = document.createElement('li');
                        li.innerHTML = line.trim();
                        el.appendChild(li);
                    }
                });
            }
            // Check if this is an address element that should preserve line breaks
            else if (selector.includes('Address') || el.classList.contains('venue-info') || el.classList.contains('address')) {
                // Convert \n to <br> for addresses
                el.innerHTML = text.replace(/\n/g, '<br>');
            }
            // Check if text contains HTML tags - use innerHTML to render them
            else if (/<[^>]+>/.test(text)) {
                el.innerHTML = text;
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

