// main_portfolio_single.js

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
                    class: "mil-up mil-mb-60",
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
            ]
        },
        // Другие проекты...
    };


    // Функция для получения параметров URL
    function getQueryParams() {
        const params = {};
        window.location.search.substring(1).split("&").forEach(function(pair) {
            const [key, value] = pair.split("=");
            params[decodeURIComponent(key)] = decodeURIComponent(value || "");
        });
        return params;
    }

    // Получаем идентификатор проекта из URL
    const queryParams = getQueryParams();
    const projectId = queryParams['project'];

    // Проверяем, существует ли проект
    if (projects[projectId]) {
        const project = projects[projectId];

        // Обновляем заголовок страницы
        document.querySelector('.mil-inner-banner h1').textContent = project.bannerTitle;

        // Обновляем хлебные крошки (breadcrumbs)
        const breadcrumbsContainer = document.querySelector('.mil-breadcrumbs');
        breadcrumbsContainer.innerHTML = ''; // Очищаем текущие хлебные крошки
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

        // Обновляем информацию о проекте
        const infoContainer = document.querySelector('.col-lg-4 .mil-p-0-120');
        infoContainer.innerHTML = ''; // Очищаем текущую информацию
        project.info.forEach(item => {
            const element = document.createElement(item.tag);
            element.className = item.class;
            element.textContent = item.text;
            infoContainer.appendChild(element);
        });

        // Обновляем изображения
        const imagesContainer = document.querySelector('.col-lg-7');
        imagesContainer.innerHTML = ''; // Очищаем текущие изображения
        project.images.forEach(image => {
            const imageFrame = document.createElement('div');
            imageFrame.className = 'mil-image-frame mil-horizontal mil-mb-30 portfolio-single-image-frame cover';

            const a = document.createElement('a');
            a.setAttribute('data-fancybox', `gallery_${projectId}`);
            a.setAttribute('data-no-swup', '');
            a.href = image.src;

            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;

            a.appendChild(img);
            imageFrame.appendChild(a);
            imagesContainer.appendChild(imageFrame);
        });
    } else {
        // Если проект не найден, перенаправляем на страницу портфолио
        // alert('Проект не найден');
        // window.location.href = 'portfolio';
    }
}

// Инициализируем скрипт после замены контента swup
document.addEventListener('swup:contentReplaced', initPortfolioSingle);

// Инициализируем скрипт при первой загрузке страницы
initPortfolioSingle();