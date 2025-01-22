document.addEventListener('DOMContentLoaded', function() {
    function initializeScripts() {
        console.log('Scripts initialized');

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
                if (!aboutSelector) return;

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
                    aboutTabs.forEach(t => t.classList.remove('active'));
                    aboutTabContents.forEach(content => content.classList.remove('active'));

                    this.classList.add('active');
                    const tabId = this.getAttribute('data-tab');
                    const contentElement = document.getElementById(tabId + '-content');
                    if (contentElement) {
                        contentElement.classList.add('active');
                    }

                    updateAboutSelectorPosition();

                    if (aboutImageElement) {
                        aboutImageElement.src = aboutImageMap[tabId];
                    }
                });
            });

            updateAboutSelectorPosition();
            return updateAboutSelectorPosition;
        }

        // Логика вкладок для секции "services"
        function initServiceTabs() {
            const serviceTabs = document.querySelectorAll('._main_tabs_services-tab');
            const serviceTabContents = document.querySelectorAll('.services-section-content');
            const serviceSelector = document.querySelector('._main_tabs_services-selector');

            function updateServiceSelectorPosition() {
                if (!serviceSelector) return;

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
                    serviceTabs.forEach(t => t.classList.remove('active'));
                    serviceTabContents.forEach(content => content.classList.remove('active'));

                    this.classList.add('active');
                    const tabId = this.getAttribute('data-tab');
                    const contentElement = document.getElementById(tabId + '-content');
                    if (contentElement) {
                        contentElement.classList.add('active');
                    }

                    updateServiceSelectorPosition();
                });
            });

            updateServiceSelectorPosition();
            return updateServiceSelectorPosition;
        }

        // Инициализация вкладок
        const updateAboutSelector = initAboutTabs();
        const updateServiceSelector = initServiceTabs();

        // Обработчик изменения размера окна
        window.removeEventListener('resize', handleResize);
        function handleResize() {
            updateAboutSelector();
            updateServiceSelector();
        }
        window.addEventListener('resize', handleResize);
    }

    // Инициализация скриптов при загрузке страницы
    initializeScripts();

    // Инициализация при замене контента через Swup
    document.addEventListener('swup:contentReplaced', initializeScripts);
});
