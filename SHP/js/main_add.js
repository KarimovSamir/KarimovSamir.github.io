document.addEventListener("DOMContentLoaded", function () {
    const frame = document.querySelector('.mil-frame');
    const invertFix = document.querySelector('.mi-invert-fix');

    // Проверяем, что элементы существуют на странице
    if (frame && invertFix) {
        function checkVideoVisibility() {
            // Проверяем ширину экрана
            if (window.innerWidth > 1200) {
                const rect = invertFix.getBoundingClientRect();

                // Если элемент с видео находится в видимой части экрана
                if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                    frame.style.zIndex = '999';
                } else {
                    frame.style.zIndex = '2'; // Возвращаем старое значение
                }
            } else {
                // Возвращаем z-index на дефолтное значение для мобильной версии
                frame.style.zIndex = '999';
            }
        }

        // Вызываем функцию при загрузке страницы
        checkVideoVisibility();

        // Отслеживаем скролл
        document.addEventListener("scroll", checkVideoVisibility);

        // Отслеживаем изменение размера окна браузера
        window.addEventListener("resize", checkVideoVisibility);
    }
});
