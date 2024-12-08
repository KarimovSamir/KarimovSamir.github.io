function initPortfolioSingle() {
    const projects = {
        "rahat_crescent_mall": {
            title: "RAHAT GOURMET CRESCENT MALL",
            bannerTitle: "RAHAT GOURMET CRESCENT MALL",
            breadcrumbs: ["Homepage", "Portfolio", "RAHAT GOURMET CRESCENT MALL"],
            info: [
                {
                    tag: "h4",
                    class: "mil-up mil-mb-30",
                    text: "Инновационный супермаркет в сердце города"
                },
                {
                    tag: "p",
                    class: "mil-up mil-mb-30",
                    text: "Проект Rahat Gourmet Crescent Mall представляет собой современный супермаркет, сочетающий в себе удобство и широкий ассортимент товаров."
                },
                {
                    tag: "p",
                    class: "mil-up mil-mb-60",
                    text: "Мы предоставили полный спектр услуг: строительство, отделка, MEP, дизайн и реализация под ключ."
                },
            ],
            images: [
                {
                    src: "https://res.cloudinary.com/dlarkoumm/image/upload/v1729437432/rahar_gourme1_abfxnl.webp",
                    alt: "2 project picture"
                },
                {
                    src: "https://res.cloudinary.com/dlarkoumm/image/upload/v1729437433/rahar_gourme2_jcdoql.jpg",
                    alt: "2 project picture"
                },
                {
                    src: "https://res.cloudinary.com/dlarkoumm/image/upload/v1729437434/rahar_gourme3_qgre0u.png",
                    alt: "3 project picture"
                },
            ]
        },
        "port_baku_walk": {
            title: "PORT BAKU WALK",
            bannerTitle: "PORT BAKU WALK",
            breadcrumbs: ["Homepage", "Portfolio", "PORT BAKU WALK"],
            info: [
                {
                    tag: "h4",
                    class: "mil-up mil-mb-30",
                    text: "Инновационный бизнес центр в сердце города"
                },
                {
                    tag: "p",
                    class: "mil-up mil-mb-30",
                    text: "Проект PORT BAKU WALK представляет собой современный бизнес центр, сочетающий в себе удобство и большое количество ресторанов."
                },
                {
                    tag: "p",
                    class: "mil-up mil-mb-30",
                    text: "Мы предоставили полный спектр услуг: строительство, отделка, MEP, дизайн и реализация под ключ."
                },
            ],
            images: [
                {
                    src: "https://res.cloudinary.com/dlarkoumm/image/upload/v1729437432/port_baku_walk1_iupxon.jpg",
                    alt: "1 project picture"
                },
                {
                    src: "https://res.cloudinary.com/dlarkoumm/image/upload/v1729437432/port_baku_walk2_cruycg.webp",
                    alt: "2 project picture"
                },
                {
                    src: "https://res.cloudinary.com/dlarkoumm/image/upload/v1729437432/port_baku_walk3_x4z3xy.webp",
                    alt: "3 project picture"
                },
                {
                    src: "img/portfolio/FlameTowers.jpg",
                    alt: "2 project picture"
                },
            ]
        },
        // Другие проекты...
    };

    function getQueryParams() {
        const params = {};
        window.location.search
            .substring(1)
            .split("&")
            .forEach(function (pair) {
                const [key, value] = pair.split("=");
                params[decodeURIComponent(key)] = decodeURIComponent(value || "");
            });
        return params;
    }

    function initializeSlider() {
        const slides = document.querySelectorAll('.slide');

        slides.forEach((slide, index) => {
            slide.classList.remove('left', 'active', 'right');

            if (index === 0) {
                slide.classList.add('active');
            } else if (index === 1) {
                slide.classList.add('right');
            } else if (index === slides.length - 1) {
                slide.classList.add('left');
            }
        });
    }

    function moveSlide(direction) {
        const slides = document.querySelectorAll('.slide');
        const activeSlide = document.querySelector('.slide.active');
        const activeIndex = Array.from(slides).indexOf(activeSlide);

        slides.forEach(slide => slide.classList.remove('left', 'active', 'right'));

        let newActiveIndex;
        if (direction === 'next') {
            newActiveIndex = (activeIndex + 1) % slides.length;
        } else if (direction === 'prev') {
            newActiveIndex = (activeIndex - 1 + slides.length) % slides.length;
        }

        const newLeftIndex = (newActiveIndex - 1 + slides.length) % slides.length;
        const newRightIndex = (newActiveIndex + 1) % slides.length;

        slides[newLeftIndex].classList.add('left');
        slides[newActiveIndex].classList.add('active');
        slides[newRightIndex].classList.add('right');
    }

    const queryParams = getQueryParams();
    const projectId = queryParams['project'];

    if (projects[projectId]) {
        const project = projects[projectId];

        document.querySelector('.mil-inner-banner h1').textContent = project.bannerTitle;

        const breadcrumbsContainer = document.querySelector('.mil-breadcrumbs');
        breadcrumbsContainer.innerHTML = '';
        project.breadcrumbs.forEach((crumb, index) => {
            const li = document.createElement('li');
            if (index < project.breadcrumbs.length - 1) {
                const a = document.createElement('a');
                a.href = index === 0 ? '/' : 'portfolio';
                a.textContent = crumb;
                li.appendChild(a);
            } else {
                li.textContent = crumb;
            }
            breadcrumbsContainer.appendChild(li);
        });

        const infoContainer = document.querySelector('.col-lg-4 .mil-p-0-120');
        infoContainer.innerHTML = '';
        project.info.forEach(item => {
            const element = document.createElement(item.tag);
            element.className = item.class;
            element.textContent = item.text;
            infoContainer.appendChild(element);
        });

        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'fadeDuration': 300,
            'imageFadeDuration': 300
        });

        const imagesContainer = document.querySelector('.col-lg-7');
        imagesContainer.innerHTML = `
            <div class="slider-container">
                <div class="slider">
                    ${project.images
                        .map(
                            image =>
                                `<div class="slide">
                                    <a href="${image.src}" data-lightbox="project-gallery">
                                        <img src="${image.src}" alt="${image.alt}">
                                    </a>
                                </div>`
                        )
                        .join('')}
                </div>
                <div class="slider-controls">
                    <button class="slider-btn prev">←</button>
                    <button class="slider-btn next">→</button>
                </div>
            </div>
        `;

        const prevBtn = document.querySelector('.slider-btn.prev');
        const nextBtn = document.querySelector('.slider-btn.next');

        let autoSlideInterval;

        // Функция для запуска авто-переключения
        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                moveSlide('next');
            }, 3000);
        }

        // Функция для остановки авто-переключения
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        // Обработчики для кнопок
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            moveSlide('prev');
            startAutoSlide(); // Перезапускаем авто-переключение
        });

        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            moveSlide('next');
            startAutoSlide(); // Перезапускаем авто-переключение
        });

        initializeSlider();
        startAutoSlide(); // Запускаем авто-переключение
    } else {
        // alert('Проект не найден');
        // window.location.href = 'portfolio';
    }
}

// Инициализируем скрипт при первой загрузке страницы
initPortfolioSingle();

// Инициализируем скрипт после замены контента swup
document.addEventListener('swup:contentReplaced', initPortfolioSingle);




// function initPortfolioSingle() {
//     const projects = {
//         "rahat_crescent_mall": {
//             title: "RAHAT GOURMET CRESCENT MALL",
//             bannerTitle: "RAHAT GOURMET CRESCENT MALL",
//             breadcrumbs: ["Homepage", "Portfolio", "RAHAT GOURMET CRESCENT MALL"],
//             info: [
//                 {
//                     tag: "h4",
//                     class: "mil-up mil-mb-30",
//                     text: "Инновационный супермаркет в сердце города"
//                 },
//                 {
//                     tag: "p",
//                     class: "mil-up mil-mb-30",
//                     text: "Проект Rahat Gourmet Crescent Mall представляет собой современный супермаркет, сочетающий в себе удобство и широкий ассортимент товаров."
//                 },
//                 {
//                     tag: "p",
//                     class: "mil-up mil-mb-60",
//                     text: "Мы предоставили полный спектр услуг: строительство, отделка, MEP, дизайн и реализация под ключ."
//                 },
//             ],
//             images: [
//                 {
//                     src: "https://res.cloudinary.com/dlarkoumm/image/upload/v1729437432/rahar_gourme1_abfxnl.webp",
//                     alt: "2 project picture"
//                 },
//                 {
//                     src: "https://res.cloudinary.com/dlarkoumm/image/upload/v1729437433/rahar_gourme2_jcdoql.jpg",
//                     alt: "2 project picture"
//                 },
//                 {
//                     src: "https://res.cloudinary.com/dlarkoumm/image/upload/v1729437434/rahar_gourme3_qgre0u.png",
//                     alt: "3 project picture"
//                 },
//             ]
//         },
//         "port_baku_walk": {
//             title: "PORT BAKU WALK",
//             bannerTitle: "PORT BAKU WALK",
//             breadcrumbs: ["Homepage", "Portfolio", "PORT BAKU WALK"],
//             info: [
//                 {
//                     tag: "h4",
//                     class: "mil-up mil-mb-30",
//                     text: "Инновационный бизнес центр в сердце города"
//                 },
//                 {
//                     tag: "p",
//                     class: "mil-up mil-mb-30",
//                     text: "Проект PORT BAKU WALK представляет собой современный бизнес центр, сочетающий в себе удобство и большое количество ресторанов."
//                 },
//                 {
//                     tag: "p",
//                     class: "mil-up mil-mb-30",
//                     text: "Мы предоставили полный спектр услуг: строительство, отделка, MEP, дизайн и реализация под ключ."
//                 },
//             ],
//             images: [
//                 {
//                     src: "https://res.cloudinary.com/dlarkoumm/image/upload/v1729437432/port_baku_walk1_iupxon.jpg",
//                     alt: "1 project picture"
//                 },
//                 {
//                     src: "https://res.cloudinary.com/dlarkoumm/image/upload/v1729437432/port_baku_walk2_cruycg.webp",
//                     alt: "2 project picture"
//                 },
//                 {
//                     src: "https://res.cloudinary.com/dlarkoumm/image/upload/v1729437432/port_baku_walk3_x4z3xy.webp",
//                     alt: "3 project picture"
//                 },
//                 {
//                     src: "img/portfolio/FlameTowers.jpg",
//                     alt: "2 project picture"
//                 },
//             ]
//         },
//         // Другие проекты...
//     };

//     function getQueryParams() {
//         const params = {};
//         window.location.search
//             .substring(1)
//             .split("&")
//             .forEach(function (pair) {
//                 const [key, value] = pair.split("=");
//                 params[decodeURIComponent(key)] = decodeURIComponent(value || "");
//             });
//         return params;
//     }

//     // Инициализация начальных классов для слайдера
//     function initializeSlider() {
//         const slides = document.querySelectorAll('.slide');

//         slides.forEach((slide, index) => {
//             slide.classList.remove('left', 'active', 'right'); // Сбрасываем все классы

//             if (index === 0) {
//                 slide.classList.add('active'); // Центральное изображение
//             } else if (index === 1) {
//                 slide.classList.add('right'); // Следующее изображение справа
//             } else if (index === slides.length - 1) {
//                 slide.classList.add('left'); // Предыдущее изображение слева
//             }
//         });
//     }

//     // Функция для управления переключением слайдов
//     function moveSlide(direction) {
//         const slides = document.querySelectorAll('.slide');
//         const activeSlide = document.querySelector('.slide.active');
//         const activeIndex = Array.from(slides).indexOf(activeSlide);

//         // Сбрасываем классы у всех слайдов
//         slides.forEach(slide => slide.classList.remove('left', 'active', 'right'));

//         let newActiveIndex;
//         if (direction === 'next') {
//             newActiveIndex = (activeIndex + 1) % slides.length;
//         } else if (direction === 'prev') {
//             newActiveIndex = (activeIndex - 1 + slides.length) % slides.length;
//         }

//         const newLeftIndex = (newActiveIndex - 1 + slides.length) % slides.length;
//         const newRightIndex = (newActiveIndex + 1) % slides.length;

//         slides[newLeftIndex].classList.add('left');
//         slides[newActiveIndex].classList.add('active');
//         slides[newRightIndex].classList.add('right');
//     }

//     const queryParams = getQueryParams();
//     const projectId = queryParams['project'];

//     if (projects[projectId]) {
//         const project = projects[projectId];

//         // Обновляем заголовок страницы
//         document.querySelector('.mil-inner-banner h1').textContent = project.bannerTitle;

//         // Обновляем хлебные крошки (breadcrumbs)
//         const breadcrumbsContainer = document.querySelector('.mil-breadcrumbs');
//         breadcrumbsContainer.innerHTML = '';
//         project.breadcrumbs.forEach((crumb, index) => {
//             const li = document.createElement('li');
//             if (index < project.breadcrumbs.length - 1) {
//                 const a = document.createElement('a');
//                 a.href = index === 0 ? '/' : 'portfolio';
//                 a.textContent = crumb;
//                 li.appendChild(a);
//             } else {
//                 li.textContent = crumb;
//             }
//             breadcrumbsContainer.appendChild(li);
//         });

//         // Обновляем информацию о проекте
//         const infoContainer = document.querySelector('.col-lg-4 .mil-p-0-120');
//         infoContainer.innerHTML = '';
//         project.info.forEach(item => {
//             const element = document.createElement(item.tag);
//             element.className = item.class;
//             element.textContent = item.text;
//             infoContainer.appendChild(element);
//         });

//         lightbox.option({
//             'resizeDuration': 200,
//             'wrapAround': true, // Позволяет прокручивать изображения по кругу
//             'fadeDuration': 300, // Продолжительность эффекта исчезновения
//             'imageFadeDuration': 300 // Продолжительность появления изображения
//         });

//         // Генерация слайдера с изображениями
//         const imagesContainer = document.querySelector('.col-lg-7');
//         imagesContainer.innerHTML = `
//             <div class="slider-container">
//                 <div class="slider">
//                     ${project.images
//                         .map(
//                             image =>
//                                 `<div class="slide">
//                                     <a href="${image.src}" data-lightbox="project-gallery">
//                                         <img src="${image.src}" alt="${image.alt}">
//                                     </a>
//                                 </div>`
//                         )
//                         .join('')}
//                 </div>
//                 <div class="slider-controls">
//                     <button class="slider-btn prev">←</button>
//                     <button class="slider-btn next">→</button>
//                 </div>
//             </div>
//         `;

//         // Добавляем обработчики событий на кнопки переключения
//         const prevBtn = document.querySelector('.slider-btn.prev');
//         const nextBtn = document.querySelector('.slider-btn.next');

//         prevBtn.addEventListener('click', () => moveSlide('prev'));
//         nextBtn.addEventListener('click', () => moveSlide('next'));

//         // Инициализируем слайдер
//         initializeSlider();
//     } else {
//         // Если проект не найден, перенаправляем на страницу портфолио
//         // alert('Проект не найден');
//         // window.location.href = 'portfolio';
//     }
// }

// // Инициализируем скрипт при первой загрузке страницы
// initPortfolioSingle();

// // Инициализируем скрипт после замены контента swup
// document.addEventListener('swup:contentReplaced', initPortfolioSingle);