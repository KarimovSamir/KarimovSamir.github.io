document.addEventListener("DOMContentLoaded", function () {
    const frame = document.querySelector('.mil-frame');
    let invertFix = document.querySelector('.mi-invert-fix');
    let bannerSection = document.querySelector('.mil-banner');

    // Функция для проверки класса mil-mainpage-class
    function checkPageClass() {
        // Проверяем наличие элемента bannerSection
        if (bannerSection && bannerSection.classList.contains('mil-mainpage-class') && window.innerWidth > 1200) {
            frame.classList.add('mil-frame-visible');
        } else {
            frame.classList.remove('mil-frame-visible');
        }
    }

    // Функция для проверки видимости видео
    function checkVideoVisibility() {
        // Проверяем наличие элемента invertFix после каждого перехода
        invertFix = document.querySelector('.mi-invert-fix'); // Повторно находим элемент после замены контента

        if (window.innerWidth > 1200 && invertFix) {
            const rect = invertFix.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                frame.style.zIndex = '999';
                checkPageClass(); // Проверяем классы на видимой странице
            } else {
                frame.style.zIndex = '2';
                frame.classList.remove('mil-frame-visible');
            }
        } else {
            frame.style.zIndex = '999';
            checkPageClass(); // Проверяем классы на мобильных устройствах
        }
    }

    // Инициализация всех функций
    function init() {
        // Сбрасываем класс mil-frame-visible перед проверками
        frame.classList.remove('mil-frame-visible');
        
        bannerSection = document.querySelector('.mil-banner'); // Повторно находим элемент после замены контента
        checkVideoVisibility(); // Проверяем видимость видео

        // Удаляем предыдущие слушатели событий
        document.removeEventListener("scroll", checkVideoVisibility);
        window.removeEventListener("resize", checkVideoVisibility);

        // Добавляем обработчики событий для скролла и изменения размера окна
        document.addEventListener("scroll", checkVideoVisibility);
        window.addEventListener("resize", checkVideoVisibility);

        // Инициализация слайдшоу
        initSlideshow();
    }

    // Инициализация слайдшоу
    function initSlideshow() {
        const slideshowImages = [
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1726902785/BilgahBeachHotel_hcx6oi.png',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1726902784/AzureBusinessCenter_er3fnx.png',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1726902789/GanjlikMall_qkp6hk.png',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1726902783/vasilchuki-chaihona-1_wzvqfx.png',
            'https://res.cloudinary.com/dlarkoumm/image/upload/v1726902786/BravoHypermarkets_e6crau.png'
        ];

        let currentImageIndex = 0;
        const slideshowImageElement = document.querySelector('.mil-slideshow-background img');

        if (slideshowImageElement) {
            // Удаляем старый интервал, если он существует
            if (window.slideshowInterval) {
                clearInterval(window.slideshowInterval);
            }

            // Запускаем слайдшоу
            window.slideshowInterval = setInterval(function () {
                currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
                slideshowImageElement.src = slideshowImages[currentImageIndex];
            }, 3000);
        }
    }

    // Инициализация при первой загрузке страницы
    init();

    // Подписываемся на событие Swup, когда контент заменяется
    document.addEventListener("swup:contentReplaced", function() {
        init(); // Повторно инициализируем логику после перехода
    });

    // Подписываемся на событие Swup, когда анимация завершена и новый контент загружен
    document.addEventListener("swup:animationInDone", function() {
        init(); // Еще раз проверяем логику после завершения анимации
    });
});
