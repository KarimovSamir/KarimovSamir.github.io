let swup;

function navigateToAnchor(event, url) {
    event.preventDefault();
    const anchor = url.split('#')[1];

    if (anchor) {
        swup.navigate(url);
    }
}

$(function () {
    "use strict";

    /***************************

    swup

    ***************************/
    const options = {
        containers: ['#swupMain', '#swupMenu'],
        animateHistoryBrowsing: true,
        linkSelector: 'a:not([data-no-swup]):not([href^="#"])',
        animationSelector: '[class*="mil-main-transition"]',
        hooks: {
            'page:view': () => {
                console.log('Контент обновлён. Выполняем повторную инициализацию...');
                initializeDynamicElements();
            },
            // 'page:error': (data) => {
            //     console.error('Ошибка загрузки страницы:', data.url);
            // }
        }
    };
    swup = new Swup(options);

    const accent = "rgba(255, 152, 0, 1)"; // Определение переменной accent

    function initializeDynamicElements() {
        initializePreloader();
        initializeAnchorScroll();
        initializeAppend();
        initializeAccordion();
        initializeMenu();
        initializeCursor();
        initializeAnimations();
        initializeFancybox();
        initializeSliders();
        // initializeSliders(); 
    }

    // function initializeSliders() {
    //     const sliders = document.querySelectorAll('.swiper-container');
    //     sliders.forEach(slider => {
    //         new Swiper(slider, {
    //             slidesPerView: 2,
    //             spaceBetween: 30,
    //             speed: 5000,
    //             autoplay: {
    //                 delay: 0,
    //                 disableOnInteraction: false,
    //             },
    //             loop: true,
    //             freeMode: true,
    //             breakpoints: {
    //                 992: {
    //                     slidesPerView: 4,
    //                 },
    //             },
    //         });
    //     });
    // }

    function initializePreloader() {
        var timeline = gsap.timeline();
        timeline.to(".mil-preloader-animation", { opacity: 1 });
        timeline.fromTo(
            ".mil-animation-1 .mil-h3", { y: "30px", opacity: 0 }, { y: "0px", opacity: 1, stagger: 0.4 }
        );
        timeline.to(".mil-animation-1 .mil-h3", { opacity: 0, y: '-30' }, "+=.3");
        timeline.fromTo(".mil-reveal-box", 0.1, { opacity: 0 }, { opacity: 1, x: '-30' });
        timeline.to(".mil-reveal-box", 0.45, { width: "100%", x: 0 }, "+=.1");
        timeline.to(".mil-reveal-box", { right: "0" });
        timeline.to(".mil-reveal-box", 0.3, { width: "0%" });
        timeline.fromTo(".mil-animation-2 .mil-h3", { opacity: 0 }, { opacity: 1 }, "-=.5");
        timeline.to(".mil-animation-2 .mil-h3", 0.6, { opacity: 0, y: '-30' }, "+=.5");
        timeline.to(".mil-preloader", 0.8, { opacity: 0, ease: 'sine' }, "+=.2");
        timeline.fromTo(".mil-up", 0.8, { opacity: 0, y: 40, scale: .98, ease: 'sine' }, {
            y: 0, opacity: 1, scale: 1,
            onComplete: function () {
                $('.mil-preloader').addClass("mil-hidden");
            },
        }, "-=1");
    }

    function initializeAnchorScroll() {
        $(document).on('click', 'a[href^="#"]', function (event) {
            event.preventDefault();

            const href = $(this).attr('href');
            if (href === '#') return;

            const target = $(href);
            if (target.length) {
                const offset = $(window).width() < 1200 ? 90 : 0;
                $('html, body').animate({ scrollTop: target.offset().top - offset }, 400);
            } else {
                const targetUrl = href.startsWith('/') ? href : `/${href}`;
                swup.navigate(targetUrl);
            }
        });
    }

    function initializeAppend() {
        $(".mil-arrow-place .mil-arrow, .mil-animation .mil-dodecahedron, .mil-current-page a").remove();
        $(".mil-arrow").clone().appendTo(".mil-arrow-place");
        $(".mil-dodecahedron").clone().appendTo(".mil-animation");
        $(".mil-lines").clone().appendTo(".mil-lines-place");
        $(".mil-main-menu ul li.mil-active > a").clone().appendTo(".mil-current-page");
    }

    function initializeAccordion() {
        let groups = gsap.utils.toArray(".mil-accordion-group");
        let menus = gsap.utils.toArray(".mil-accordion-menu");
        let menuToggles = groups.map(createAnimation);

        menus.forEach((menu) => {
            menu.addEventListener("click", () => toggleMenu(menu));
        });

        function toggleMenu(clickedMenu) {
            menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
        }

        function createAnimation(element) {
            let menu = element.querySelector(".mil-accordion-menu");
            let box = element.querySelector(".mil-accordion-content");
            let symbol = element.querySelector(".mil-symbol");
            let minusElement = element.querySelector(".mil-minus");
            let plusElement = element.querySelector(".mil-plus");

            gsap.set(box, { height: "auto" });

            let animation = gsap.timeline()
                .from(box, { height: 0, duration: 0.4, ease: "sine" })
                .from(minusElement, { duration: 0.4, autoAlpha: 0, ease: "none" }, 0)
                .to(plusElement, { duration: 0.4, autoAlpha: 0, ease: "none" }, 0)
                .to(symbol, { background: accent, ease: "none" }, 0)
                .reverse();

            return function (clickedMenu) {
                if (clickedMenu === menu) {
                    animation.reversed(!animation.reversed());
                } else {
                    animation.reverse();
                }
            };
        }
    }

    function initializeMenu() {
        $('.mil-menu-btn').on("click", function () {
            $(this).toggleClass('mil-active');
            $('.mil-menu').toggleClass('mil-active');
            if ($(window).width() < 1070) {
                $('.mil-menu-frame').toggleClass('mil-active');
            }
        });

        $('.mil-has-children a').on('click', function () {
            $('.mil-has-children ul').removeClass('mil-active');
            $('.mil-has-children a').removeClass('mil-active');
            $(this).toggleClass('mil-active');
            $(this).next().toggleClass('mil-active');
        });
    }

    function initializeCursor() {
        const cursor = document.querySelector('.mil-ball');
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });

        document.addEventListener('pointermove', (e) => {
            gsap.to(cursor, { duration: 0.6, ease: 'sine', x: e.clientX, y: e.clientY });
        });
    }

    function initializeAnimations() {
        const appearance = document.querySelectorAll(".mil-up");
        appearance.forEach((section) => {
            gsap.fromTo(section, { opacity: 0, y: 40, scale: .98 }, {
                y: 0, opacity: 1, scale: 1, duration: .4,
                scrollTrigger: { trigger: section, toggleActions: 'play none none reverse' }
            });
        });
    }

    function initializeFancybox() {
        $('[data-fancybox="gallery"]').fancybox({
            buttons: ["slideShow", "zoom", "fullScreen", "close"],
            loop: false,
            protect: true
        });
        $.fancybox.defaults.hash = false;
    }

    // function initializeSliders() {
    //     new Swiper('.mil-reviews-slider', {
    //         pagination: {
    //             el: '.mil-revi-pagination',
    //             clickable: true,
    //             renderBullet: function (index, className) {
    //             const menu = ['<div class="mil-custom-dot mil-slide-1"></div>', '<div class="mil-custom-dot mil-slide-2"></div>', '<div class="mil-custom-dot mil-slide-3"></div>', '<div class="mil-custom-dot mil-slide-4"></div>', '<div class="mil-custom-dot mil-slide-5"></div>', '<div class="mil-custom-dot mil-slide-6"></div>', '<div class="mil-custom-dot mil-slide-7"></div>'];
    //             return '<span class="' + className + '">' + menu[index] + '</span>';
    //         },
    //         },
    //         speed: 800,
    //         effect: 'fade',
    //         parallax: true,
    //         navigation: {
    //             nextEl: '.mil-revi-next',
    //             prevEl: '.mil-revi-prev',
    //         },
    //     });
    // }
    function initializeSliders() {
        // Слайдер для отзывов
        new Swiper('.mil-reviews-slider', {
            pagination: {
                el: '.mil-revi-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    const menu = ['<div class="mil-custom-dot mil-slide-1"></div>', '<div class="mil-custom-dot mil-slide-2"></div>', '<div class="mil-custom-dot mil-slide-3"></div>', '<div class="mil-custom-dot mil-slide-4"></div>', '<div class="mil-custom-dot mil-slide-5"></div>', '<div class="mil-custom-dot mil-slide-6"></div>', '<div class="mil-custom-dot mil-slide-7"></div>'];
                    return '<span class="' + className + '">' + menu[index] + '</span>';
                },
            },
            speed: 800,
            effect: 'fade',
            parallax: true,
            navigation: {
                nextEl: '.mil-revi-next',
                prevEl: '.mil-revi-prev',
            },
        });
    
        // Слайдер для лицензий
        new Swiper('.mil-infinite-show', {
            slidesPerView: 2,
            spaceBetween: 30,
            speed: 5000,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },
            loop: true,
            freeMode: true,
            breakpoints: {
                992: {
                    slidesPerView: 4,
                },
            },
        });
    }
    

    // Инициализация при загрузке страницы
    initializeDynamicElements();
});
