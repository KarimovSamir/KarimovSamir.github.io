document.addEventListener('DOMContentLoaded', function() {
    function initializeScripts() {
        // Логика для меню
        // const menuLinks = document.querySelectorAll('.mil-main-menu a');
        // const menuButton = document.querySelector('.mil-menu-btn');

        // menuLinks.forEach(link => {
        //     link.addEventListener('click', function(event) {
        //         if (link.getAttribute('href').startsWith('#')) {
        //             closeMenu();
        //         }
        //     });
        // });

        // function closeMenu() {
        //     if (menuButton.classList.contains('mil-active')) {
        //         menuButton.click();
        //     }
        // }

        // Логика вкладок для секции "about us"
        function initAboutTabs() {
            const aboutTabs = document.querySelectorAll('._main_tabs_about_us-tab');
            const aboutTabContents = document.querySelectorAll('.mil-tab-content');
            const aboutImageElement = document.getElementById('tab-image');
            const aboutSelector = document.querySelector('._main_tabs_about_us-selector');

            const aboutImageMap = {
                'about': 'https://res.cloudinary.com/dlarkoumm/image/upload/v1726902814/1_lnanqk.jpg',
                'mission': 'https://res.cloudinary.com/dlarkoumm/image/upload/v1729795856/vision_edmxrm.jpg',
                'vision': 'https://res.cloudinary.com/dlarkoumm/image/upload/v1729796245/misssion_mkkup7.jpg'
            };

            function updateAboutSelectorPosition() {
                const activeTab = document.querySelector('._main_tabs_about_us-tab.active');
                if (activeTab) {
                    const activeWidth = activeTab.offsetWidth;
                    const itemPos = activeTab.offsetLeft;
                    aboutSelector.style.left = itemPos + 'px';
                    aboutSelector.style.width = activeWidth + 'px';
                }
            }

            aboutTabs.forEach(tab => {
                tab.addEventListener('click', function(e) {
                    e.preventDefault();

                    // Удаляем активный класс у всех вкладок about
                    aboutTabs.forEach(t => t.classList.remove('active'));
                    aboutTabContents.forEach(content => content.classList.remove('active'));

                    // Добавляем активный класс текущей вкладке
                    this.classList.add('active');
                    const tabId = this.getAttribute('data-tab');
                    const contentElement = document.getElementById(tabId + '-content');
                    if (contentElement) {
                        contentElement.classList.add('active');
                    }

                    // Обновляем позицию селектора
                    const activeWidth = this.offsetWidth;
                    const itemPos = this.offsetLeft;
                    aboutSelector.style.left = itemPos + 'px';
                    aboutSelector.style.width = activeWidth + 'px';

                    // Обновляем изображение
                    if (aboutImageElement) {
                        aboutImageElement.src = aboutImageMap[tabId];
                    }
                });
            });

            // Инициализация позиции селектора
            updateAboutSelectorPosition();
            return updateAboutSelectorPosition; // Возвращаем функцию для использования в обработчике resize
        }

        // Логика вкладок для секции "services"
        function initServiceTabs() {
            const serviceTabs = document.querySelectorAll('._main_tabs_services-tab');
            const serviceTabContents = document.querySelectorAll('.services-section-content');
            const serviceSelector = document.querySelector('._main_tabs_services-selector');

            function updateServiceSelectorPosition() {
                const activeTab = document.querySelector('._main_tabs_services-tab.active');
                if (activeTab) {
                    const activeWidth = activeTab.offsetWidth;
                    const itemPos = activeTab.offsetLeft;
                    serviceSelector.style.left = itemPos + 'px';
                    serviceSelector.style.width = activeWidth + 'px';
                }
            }

            serviceTabs.forEach(tab => {
                tab.addEventListener('click', function(e) {
                    e.preventDefault();

                    // Удаляем активный класс у всех вкладок services
                    serviceTabs.forEach(t => t.classList.remove('active'));
                    serviceTabContents.forEach(content => content.classList.remove('active'));

                    // Добавляем активный класс текущей вкладке
                    this.classList.add('active');
                    const tabId = this.getAttribute('data-tab');
                    const contentElement = document.getElementById(tabId + '-content');
                    if (contentElement) {
                        contentElement.classList.add('active');
                    }

                    // Обновляем позицию селектора
                    const activeWidth = this.offsetWidth;
                    const itemPos = this.offsetLeft;
                    serviceSelector.style.left = itemPos + 'px';
                    serviceSelector.style.width = activeWidth + 'px';
                });
            });

            // Инициализация позиции селектора
            updateServiceSelectorPosition();
            return updateServiceSelectorPosition; // Возвращаем функцию для использования в обработчике resize
        }

        // Инициализация обеих секций вкладок
        const updateAboutSelector = initAboutTabs();
        const updateServiceSelector = initServiceTabs();

        // Обработчик изменения размера окна
        window.addEventListener('resize', function() {
            updateAboutSelector();
            updateServiceSelector();
        });
        console.log('Scripts initialized');
    }

    // Инициализация при загрузке контента
    initializeScripts();

    // Перехватываем обновление контента через Swup
    document.addEventListener('swup:contentReplaced', initializeScripts);
});
