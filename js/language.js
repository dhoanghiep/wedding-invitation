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
                title: 'Countdown to Our Special Day',
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
                email: 'Email *',
                guestOf: 'You are a guest of: *',
                guestOfBride: 'The Bride',
                guestOfGroom: 'The Groom',
                guestOfBoth: 'Both',
                phone: 'Phone Number',
                phoneOptional: '(Optional)',
                guests: 'Number of Guests *',
                attendance: 'Will you be celebrating with us? *',
                selectOption: 'Please select...',
                yes: 'Yes, I\'ll be there!',
                no: 'No, sorry, I can\'t make it.',
                maybe: 'Maybe',
                eventsAttending: 'That\'s great! Please check all the events you\'ll be attending:',
                welcomeParty: 'Welcome Party',
                mainWedding: 'Main Wedding (Ceremony & Reception)',
                message: 'Message to Us',
                messagePlaceholder: 'e.g., a song request, a sweet note!',
                otherRequests: 'Other Requests',
                otherRequestsPlaceholder: 'e.g., dietary allergies, accessibility needs',
                dietary: 'Dietary Restrictions or Allergies',
                dietaryPlaceholder: 'Please let us know of any dietary restrictions or allergies',
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
                welcomeParty: 'Welcome Party',
                welcomePartyDate: '5:00 PM, 31/12/2025',
                welcomePartyLocation: 'Siha cafe \n 58 Nguyen Dinh Chinh, Phu Nhuan \n Ho Chi Minh City',
                wedding: 'Wedding Ceremony',
                weddingDate: '5:00 PM, 1/1/2026',
                weddingLocation: 'Chloe Gallery \n 06 Phan Van Chuong, Tan My \n Ho Chi Minh City',
                timeLabel: 'Date & Time:',
                locationLabel: 'Location:',
                addressLabel: 'Address:',
                welcomePartyTime: '5:00 PM 31/12/2025',
                welcomePartyLocationName: 'Siha Cafe',
                welcomePartyAddress: '158 Nguyen Dinh Chinh\n Phu Nhuan, Ho Chi Minh City',
                weddingTime: '5:00 PM 1/1/2026',
                weddingLocationName: 'Chloe Gallery',
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
                title: 'Our love story',
                subtitle: 'Welcome to our love story! Please read through some fun facts prior the party so you can win some games at our wedding!',
                meetTitle: 'First, meet the bride & groom',
                brideTitle: 'Our bride ',
                brideSubtitle: 'A chill girl who wanna be young & rich 🤑',
                bridePersonalityLabel: 'Personality:',
                bridePersonality: '"Looks like they could kill you, would kill you." 🔪😂',
                brideDescriptionLabel: 'Description:',
                brideDescription: 'Is the Buddha in Journey to the West series - the one who always cause troubles & challenge themselves. Is an excellent problem solver so she always make irrational decisions & cause more problems (to solve & become more experience).',
                groomTitle: 'Our groom',
                groomSubtitle: 'A talented actor from Hà Nội acting school since 1998 - "You are who are you!"',
                groomPersonalityLabel: 'Personality:',
                groomPersonality: '"Looks like a cinnamon roll, is a cinnamon roll... or maybe not?" 🤔',
                groomDescriptionLabel: 'Description:',
                groomDescription: 'Is a typical straight man who is always calm, non-confrontational but date June - weird choice huh?! Is the Wukong in the relationship with a powerful magic wand who can solve 99% of June\'s problems. Is an almost professional badminton player at Peter MacCallum Cancer Centre.',
                howWeMet: 'How We Met',
                howWeMetIntro: 'It all started with a classic case of "right place, right time" (and a global pandemic, weirdly enough).',
                howWeMetParagraph1: 'The Groom, a Hanoi native, decided to take a chance and move to Ho Chi Minh City for work. At the same time, the Bride, still a student, insisted on getting her very first job.',
                howWeMetParagraph2: 'By pure (or was it planned?) coincidence, we both ended up at the same company... a company developing COVID vaccines during the peak of the pandemic. We were work buddies first, navigating the chaos of lockdowns and projects together.',
                howWeMetImage1Alt: 'Us at work, looking professional (or trying to!)',
                howWeMetImage1Caption: 'Us at work, looking professional (or trying to!)',
                howWeMetParagraph3: 'After the lockdowns lifted, the Bride (being the "Đường Tăng" who loves to explore) took the Groom on tours around the city. The Groom\'s "lời tỏ tình" (his big confession) was to finally take her somewhere new. And what\'s more romantic than... a drawing class?',
                howWeMetImage2Alt: 'Our artistic masterpieces (or failures) at the drawing activity',
                howWeMetImage2Caption: 'Our artistic masterpieces (or failures) at the drawing activity',
                journeyTitle: 'Our Journey',
                journeyIntro: 'From colleagues to a couple, we started to grow together. We celebrated the big wins...',
                journeyImage1Alt: 'Graduation day! We made it!',
                journeyImage1Caption: 'Graduation day! We made it!',
                journeyParagraph1: '...and we started exploring the world, just the two of us. This is where the "Đường Tăng" really put "Ngộ Không" to the test.',
                journeyImage2Alt: 'Us on one of our many trips!',
                journeyImage2Caption: 'Us on one of our many trips!',
                proposalTitle: 'The Proposal',
                proposalIntro: 'This part really sums up our dynamic.',
                proposalGroomLabel: 'Groom:',
                proposalGroomQuote: '"I tried to prepare a surprise with a detailed, secret plan."',
                proposalBrideLabel: 'Bride:',
                proposalBrideQuote: '"I already knew. And honestly, I didn\'t want to accept it at first."',
                proposalImage1Alt: 'The actual \'Will you marry me?\' moment (Nheo finally gave in)',
                proposalImage1Caption: 'The actual \'Will you marry me?\' moment (Nheo finally gave in)',
                proposalConclusion: 'But let\'s be real... a surprise is a surprise, and good food = an undeniable \'Yes\'.',
                proposalImage2Alt: 'The celebration dinner (and the food that sealed the deal)',
                proposalImage2Caption: 'The celebration dinner (and the food that sealed the deal)',
                everAfterTitle: '...And Ever After',
                everAfterIntro: 'And now, our adventure continues! We\'ve packed up our lives (and our "killer" / "cinnamon roll" dynamic) and are building our next chapter together in Australia.',
                everAfterParagraph1: 'We\'re so excited to see where this journey takes us, and even more excited to have you all be a part of the official starting line.',
                everAfterImage1Alt: 'A few snaps of our new life in Australia!',
                everAfterImage1Caption: 'A few snaps of our new life in Australia!'
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
            // Bride and Groom Section
            brideGroom: {
                title: 'Cô dâu & Chú rể',
                subtitle: 'Xin chào! Chúng mình là cặp đôi hạnh phúc (và là nhân vật chính) của buổi tiệc này, và chúng mình rất vui khi các bạn có mặt!',
                intro: 'Cùng xem chúng mình đã gặp nhau thế nào và cùng đi trên hành trình đến ngày chung đôi ra sao nhé!',
                button: 'khám phá'
            },
            // Gallery Section
            gallery: {
                title: 'Những kỷ niệm của chúng mình',
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
                title: 'Đếm ngược đến ngày đặc biệt',
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
                subtitle: 'Vui lòng cho chúng tôi biết bạn có tham dự không',
                bannerTitle: 'Hy vọng bạn sẽ đến!',
                bannerSubtitle: 'Chúng mình đang đếm ngược từng ngày và rất hy vọng bạn có thể ở đó để chung vui cùng chúng mình!',
                bannerCta: 'Sẵn sàng "quẩy" chưa? Bấm vào bên dưới để cho chúng mình biết nhé.',
                fullName: 'Tên của bạn *',
                email: 'Email *',
                guestOf: 'Bạn là khách mời của: *',
                guestOfBride: 'Cô dâu',
                guestOfGroom: 'Chú rể',
                guestOfBoth: 'Cả hai',
                phone: 'Số điện thoại',
                phoneOptional: '(Không bắt buộc)',
                guests: 'Số lượng khách tham dự *',
                attendance: 'Bạn có tham dự cùng chúng mình không? *',
                selectOption: 'Vui lòng chọn...',
                yes: 'Có, mình sẽ đến!',
                no: 'Rất tiếc, mình không đến được.',
                maybe: 'Có thể',
                eventsAttending: 'Tuyệt vời! Vui lòng chọn các sự kiện bạn sẽ tham dự:',
                welcomeParty: 'Tiệc thân mật',
                mainWedding: 'Lễ cưới',
                message: 'Lời nhắn cho chúng mình',
                messagePlaceholder: 'vd: yêu cầu bài hát, một lời chúc dễ thương!',
                otherRequests: 'Yêu cầu khác',
                otherRequestsPlaceholder: 'vd: dị ứng đồ ăn, cần hỗ trợ di chuyển',
                dietary: 'Hạn chế về chế độ ăn uống hoặc dị ứng',
                dietaryPlaceholder: 'Vui lòng cho chúng tôi biết về bất kỳ hạn chế về chế độ ăn uống hoặc dị ứng',
                submit: 'Gửi Phản Hồi',
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
                welcomeParty: 'Tiệc thân mật',
                welcomePartyDate: 'Ngày & Giờ',
                welcomePartyLocation: 'Địa điểm',
                wedding: 'Lễ cưới',
                weddingDate: 'Ngày & Giờ',
                weddingLocation: 'Địa điểm',
                timeLabel: 'Ngày & Giờ:',
                locationLabel: 'Địa điểm:',
                addressLabel: 'Địa chỉ:',
                welcomePartyTime: '5:00 CH 31/12/2025',
                welcomePartyLocationName: 'Siha Cafe',
                welcomePartyAddress: '158 Nguyễn Đình Chính\n Phú Nhuận, TP. Hồ Chí Minh',
                weddingTime: '5:00 CH 1/1/2026',
                weddingLocationName: 'Chloe Gallery',
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
                title: 'Chuyện tình yêu của chúng mình',
                subtitle: '"Chào mừng đến với câu chuyện của tụi mình! Mời mọi người đọc qua vài hint để khi dự tiệc sẽ săn được nhiều quà nè!',
                meetTitle: 'Cùng gặp cô dâu và chú rể nhé',
                brideTitle: 'Cô dâu Minh Anh',
                brideSubtitle: 'Giao diện đồng hành với hệ điều hành - luôn "chiến"! 🤑',
                bridePersonalityLabel: 'Tính cách:',
                bridePersonality: 'Nhìn như thể có thể giết bạn, và sẽ giết bạn. 🔪😂',
                brideDescriptionLabel: 'Mô tả:',
                brideDescription: 'Là "Đường Tăng" trong mối quan hệ - thích "kiếm chuyện" & va vào rắc rối - khi không giải quyết được thì alo chú rể aka Ngộ Không Hoàng Hiệp. Là problem solver siêu đỉnh nên rất hay gặp problem - Ủa?!. Là 1 chill girl chính hiệu nhưng không muốn ngồi chill quá lâu.',
                groomTitle: 'Chú rể Hoàng Hiệp',
                groomSubtitle: 'Diễn viên chuyên nghiệp từ trường sân khấu điện ảnh Hà Nội since 1998 - "Muốn vai nào anh diễn trọn vai đó cho em!" 👶',
                groomPersonalityLabel: 'Tính cách:',
                groomPersonality: '"Looks like a cinnamon roll, is a cinnamon roll... or maybe not?" 🤔',
                groomDescriptionLabel: 'Mô tả:',
                groomDescription: 'Là thẳng nam chính hiệu, luôn điềm tĩnh và né xa rắc rối nhưng lại dính vào Minh Anh - Ủa?! Là Ngộ Không đa tài đa năng có 7749 phép thần thông để làm dịu chill girl. Là vận động viên cầu lông bán chuyên nghiệp tại Peter MacCallum Cancer Centre.',
                howWeMet: 'Tụi Mình Gặp Nhau Thế Nào',
                howWeMetIntro: 'Mọi thứ bắt đầu đúng kiểu "đúng người, đúng thời điểm" (và, thật kỳ lạ, là nhờ có đại dịch).',
                howWeMetParagraph1: 'Chú rể, một chàng trai Hà Nội, quyết định vào TP.HCM làm việc. Cùng lúc đó, cô dâu, dù vẫn đang đi học, nhưng khăng khăng đòi đi làm công việc đầu tiên.',
                howWeMetParagraph2: 'Như một sự sắp đặt (hay "gài bẫy"?), cả hai "hạ cánh" tại cùng một công ty... chuyên phát triển vắc-xin COVID ngay giữa tâm dịch. Tụi mình bắt đầu là đồng nghiệp, cùng nhau vượt qua những ngày lockdown và deadline "bể" mặt.',
                howWeMetImage1Alt: 'Tụi mình tại chỗ làm, trông (cố) chuyên nghiệp',
                howWeMetImage1Caption: 'Tụi mình tại chỗ làm, trông (cố) chuyên nghiệp',
                howWeMetParagraph3: 'Sau khi hết giãn cách, cô dâu (vai "Đường Tăng" thích khám phá) dắt chú rể đi thăm thú thành phố. Và màn "lời tỏ tình" của chú rể là dắt ngược cô dâu đi một nơi mới. Còn gì lãng mạn hơn... một lớp học vẽ chứ?',
                howWeMetImage2Alt: 'Kiệt tác nghệ thuật (hoặc thảm họa) của tụi mình tại lớp vẽ',
                howWeMetImage2Caption: 'Kiệt tác nghệ thuật (hoặc thảm họa) của tụi mình tại lớp vẽ',
                journeyTitle: 'Hành Trình',
                journeyIntro: 'Từ đồng nghiệp thành một đôi, tụi mình bắt đầu cùng nhau "lớn lên". Tụi mình ăn mừng những thành tựu lớn...',
                journeyImage1Alt: 'Ngày tốt nghiệp! Cuối cùng cũng xong.',
                journeyImage1Caption: 'Ngày tốt nghiệp! Cuối cùng cũng xong.',
                journeyParagraph1: '...và tụi mình bắt đầu khám phá thế giới, chỉ có hai đứa. Đây là lúc "Đường Tăng" thực sự "hành" "Ngộ Không".',
                journeyImage2Alt: 'Tụi mình trong một chuyến du lịch!',
                journeyImage2Caption: 'Tụi mình trong một chuyến du lịch!',
                proposalTitle: 'Màn Cầu Hôn',
                proposalIntro: 'Phần này tóm tắt chính xác "vibe" của tụi mình:',
                proposalGroomLabel: 'Chú rể:',
                proposalGroomQuote: '"Mình đã cố chuẩn bị một màn bất ngờ với kế hoạch chi tiết, bí mật."',
                proposalBrideLabel: 'Cô dâu:',
                proposalBrideQuote: '"Mình biết tỏng rồi. Và thú thật, ban đầu mình không muốn chấp nhận."',
                proposalImage1Alt: 'Khoảnh khắc \'Em đồng ý\' (sau khi bị ép)',
                proposalImage1Caption: 'Khoảnh khắc \'Em đồng ý\' (sau khi bị ép)',
                proposalConclusion: 'Nhưng mà, nói gì thì nói... bất ngờ vẫn là bất ngờ, và đồ ăn ngon = một cái \'Gật đầu\' không thể chối từ.',
                proposalImage2Alt: 'Bữa tối ăn mừng (và đồ ăn chốt đơn)',
                proposalImage2Caption: 'Bữa tối ăn mừng (và đồ ăn chốt đơn)',
                everAfterTitle: '...Và Mãi Mãi Về Sau',
                everAfterIntro: 'Và giờ đây, hành trình của tụi mình lại tiếp tục! Tụi mình đã "gói ghém" cuộc sống (cùng với "vibe" sát thủ/cục bột) và đang xây dựng chương tiếp theo cùng nhau tại Úc.',
                everAfterParagraph1: 'Tụi mình rất háo hức xem hành trình này sẽ đưa mình đến đâu, và còn háo hức hơn nữa khi có tất cả các bạn ở đây, ngay vạch xuất phát chính thức này.',
                everAfterImage1Alt: 'Vài tấm ảnh về cuộc sống mới của tụi mình ở Úc!',
                everAfterImage1Caption: 'Vài tấm ảnh về cuộc sống mới của tụi mình ở Úc!'
            },
            // Explore Section
            explore: {
                text: 'Đọc thêm về câu chuyện của chúng mình và xem những kỷ niệm yêu thích nhất nhé.',
                storyButton: 'Khám Phá Câu Chuyện Tình Yêu',
                galleryButton: 'Xem Thư Viện Ảnh'
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
        updateText('[data-i18n="gallery.weddingPhotosSubsections.theParty"]', t.gallery.weddingPhotosSubsections.theParty);
        updateText('[data-i18n="gallery.weddingPhotosSubsections.reception"]', t.gallery.weddingPhotosSubsections.reception);
        updateText('[data-i18n="gallery.weddingPhotosSubsections.wedding"]', t.gallery.weddingPhotosSubsections.wedding);
        updateText('[data-i18n="gallery.guestUploads"]', t.gallery.guestUploads);
        updateText('[data-i18n="gallery.guestUploadsDesc"]', t.gallery.guestUploadsDesc);
        updateText('[data-i18n="gallery.videosDesc"]', t.gallery.videosDesc);
        updateText('[data-i18n="gallery.comingSoon"]', t.gallery.comingSoon);
        updateText('[data-i18n="gallery.uploadButton"]', t.gallery.uploadButton);

        // Update countdown section
        updateText('[data-i18n="countdown.title"]', t.countdown.title);
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
        updateText('[data-i18n="timeline.welcomePartyDate"]', t.timeline.welcomePartyDate);
        updateText('[data-i18n="timeline.welcomePartyLocation"]', t.timeline.welcomePartyLocation);
        updateText('[data-i18n="timeline.wedding"]', t.timeline.wedding);
        updateText('[data-i18n="timeline.weddingDate"]', t.timeline.weddingDate);
        updateText('[data-i18n="timeline.weddingLocation"]', t.timeline.weddingLocation);
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
        updateText('[data-i18n="location.viewMap"]', t.location.viewMap);
        updateText('[data-i18n="location.accommodationTitle"]', t.location.accommodationTitle);
        updateText('[data-i18n="location.accommodationSubtitle"]', t.location.accommodationSubtitle);

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
        updateText('[data-i18n="story.howWeMetImage1Caption"]', t.story.howWeMetImage1Caption);
        updateText('[data-i18n="story.howWeMetParagraph3"]', t.story.howWeMetParagraph3);
        updateText('[data-i18n="story.howWeMetImage2Alt"]', t.story.howWeMetImage2Alt);
        updateText('[data-i18n="story.howWeMetImage2Caption"]', t.story.howWeMetImage2Caption);
        updateText('[data-i18n="story.journeyTitle"]', t.story.journeyTitle);
        updateText('[data-i18n="story.journeyIntro"]', t.story.journeyIntro);
        updateText('[data-i18n="story.journeyImage1Alt"]', t.story.journeyImage1Alt);
        updateText('[data-i18n="story.journeyImage1Caption"]', t.story.journeyImage1Caption);
        updateText('[data-i18n="story.journeyParagraph1"]', t.story.journeyParagraph1);
        updateText('[data-i18n="story.journeyImage2Alt"]', t.story.journeyImage2Alt);
        updateText('[data-i18n="story.journeyImage2Caption"]', t.story.journeyImage2Caption);
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
        updateText('[data-i18n="story.everAfterImage1Caption"]', t.story.everAfterImage1Caption);

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
            // Check if this is an address element that should preserve line breaks
            else if (selector.includes('Address') || el.classList.contains('venue-info') || el.classList.contains('address')) {
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

