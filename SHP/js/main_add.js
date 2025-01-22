document.addEventListener("DOMContentLoaded", function () {

    function initSlideshow() {
        const slideshowImages = [
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1737312068/1flame_towers_e6fjll.webp',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1737312069/2ritz_carlton_mz62m7.webp',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1737312071/3port_baku_walk_oqw4tu.webp',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1737312072/4port_baku_mall_rvo1ap.webp',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1737312074/5rahat_gourmet_gljoim.webp',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1737312075/6vasilchuki_l7sebr.png',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1737312077/7casa_w9e7ai.webp',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1737312078/8deniz_mall_dbf0ui.webp',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1737312080/9crescent_mall_y576o9.webp',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1737312081/10bilgah_hotel_cbfmdz.webp',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1737312083/11qatar_qvznch.webp',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1737312084/12port_baku_residence_ioh3gk.webp',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1737312086/13marriott_absheron_baku_rtw9o7.webp',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1737312050/14ganjlik_mall_qffoi3.webp',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1737312051/15mall28_pk3eya.webp',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1737312051/16marriott_boulevard_biks7z.webp',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1737312052/17starbucks_vmvqvg.webp',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1737312054/18port_baku_jz7yqr.webp',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1737312055/19azure_center_tnybfp.webp',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1737312056/20ganja_mall_aewn8g.webp',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1737312057/21amburan_mall_vcnjrz.webp',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1737312058/22sheraton_baku_w5jch9.webp',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1737312060/23athletes_village_kc1vrx.webp',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1737312061/24shuvelan-park_qalwch.webp',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1737312063/25dinamo_hotel_amogwq.webp',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1737312064/26dosa_mall_vyrqyk.webp',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1737312066/27skechers_fw5jbq.webp',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1737312067/28Bumblbee_ghiitj.webp',
        ];

        const slideshowLinks = [
            'portfolio_single?project=flame_towers', 
            'portfolio_single?project=ritz_carlton', 
            'portfolio_single?project=port_baku_walk', 
            'portfolio_single?project=port_baku_mall', 
            'portfolio_single?project=rahat_crescent_mall', 
            'portfolio_single?project=vasilchuki', 
            'portfolio_single?project=casa', 
            'portfolio_single?project=daniz_mall', 
            'portfolio_single?project=crescent_mall', 
            'portfolio_single?project=bilgah_hotel', 
            'portfolio_single?project=qatar_mall', 
            'portfolio_single?project=port_baku_residence', 
            'portfolio_single?project=marriott_absheron', 
            'portfolio_single?project=ganjlik_mall', 
            'portfolio_single?project=mall_28', 
            'portfolio_single?project=marriott_boulevard', 
            'portfolio_single?project=starbucks_gyd', 
            'portfolio_single?project=port_bazar', 
            'portfolio_single?project=azure_center', 
            'portfolio_single?project=ganja_mall', 
            'portfolio_single?project=amburan_mall', 
            'portfolio_single?project=sheraton_hotel', 
            'portfolio_single?project=athletes_village', 
            'portfolio_single?project=shuvelan_park', 
            'portfolio_single?project=dinamo_hotel', 
            'portfolio_single?project=dosa_mall', 
            'portfolio_single?project=skechers_crescent_mall', 
            'portfolio_single?project=bumblebee_kids_club'
        ];
        // Ganjlik Mall<br>Baku, Azerbaijan
        const slideshowTexts = [
            "Flame Towers",
            "The Ritz Carlton",
            "Port Baku Walk",
            "Port Baku Mall",
            "Rahat Gourmet Crescent Mall",
            "Vasilchuki Chaihona №1",
            "CASA Baku",
            "Daniz Mall",
            "Crescent Mall",
            "Bilgah Beach Hotel",
            "Mall of Qatar",
            "Port Baku Residence",
            "JW Marriott Absheron Baku",
            "Ganjlik Mall",
            "Mall28",
            "Baku Marriott Boulevard Hotel",
            "Starbucks Heydar Aliyev International Airport",
            "Port Bazar",
            "Azure Business Centre",
            "Ganja Mall",
            "Amburan Mall",
            "Sheraton Baku Intourist Hotel",
            "Athletes Village",
            "Shuvelan Park",
            "Dinamo Hotel",
            "Dosa Mall",
            "Skechers Crescent Mall",
            "Bumblbee Kids Club"
        ];

        let currentImageIndex = 0;
        const slideshowImageElement = document.getElementById('slideshow-image');
        const slideshowLinkElement = document.getElementById('slideshow-link');
        const slideshowTextElement = document.getElementById('slideshow-text');
        const nextSlideButton = document.getElementById("nextSlide");
        const prevSlideButton = document.getElementById("prevSlide");

        if (!slideshowImageElement || !slideshowLinkElement || !slideshowTextElement || !nextSlideButton || !prevSlideButton) {
            console.warn("Slideshow elements are missing in the DOM.");
            return;
        }

        // Очищаем старый интервал, если он существует
        if (window.slideshowInterval) {
            clearInterval(window.slideshowInterval);
        }

        function showSlide(index) {
            currentImageIndex = (index + slideshowImages.length) % slideshowImages.length;
            slideshowImageElement.src = slideshowImages[currentImageIndex];
            slideshowLinkElement.href = slideshowLinks[currentImageIndex];
            slideshowTextElement.innerHTML = slideshowTexts[currentImageIndex];
        }

        function startSlideshow() {
            window.slideshowInterval = setInterval(() => {
                showSlide(currentImageIndex + 1);
            }, 3000);
        }

        nextSlideButton.addEventListener("click", function () {
            clearInterval(window.slideshowInterval);
            showSlide(currentImageIndex + 1);
            startSlideshow();
        });

        prevSlideButton.addEventListener("click", function () {
            clearInterval(window.slideshowInterval);
            showSlide(currentImageIndex - 1);
            startSlideshow();
        });

        showSlide(0);
        startSlideshow();
    }

    function initializeScripts() {
        // console.log('Initializing slideshow...');
        initSlideshow();
    }

    // Первоначальная инициализация
    initializeScripts();

    // Повторная инициализация после Swup
    document.addEventListener("swup:contentReplaced", initializeScripts);
});
