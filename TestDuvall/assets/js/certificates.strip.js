/* assets/js/certificates.strip.js */
(function () {
    var track = document.getElementById('certsStrip');
    if (!track || !window.CERTIFICATES) return;

    // 1. ОПРЕДЕЛЯЕМ ЯЗЫК СТРАНИЦЫ
    var isAz = document.documentElement.lang === 'az';
    
    // 2. ПЕРЕВОД КНОПКИ
    var viewText = isAz ? 'Bax' : 'View';

    // 3. ПРАВИЛЬНЫЙ ПУТЬ К ПАПКЕ (ОТНОСИТЕЛЬНЫЙ)
    // Если мы в AZ (в папке /az/), нам нужно выйти на уровень вверх (../)
    // Если мы в EN (в корне), просто заходим в assets
    var basePath = isAz ? '../assets/images/partners/' : 'assets/images/partners/';

    var GROUPS = {};
    window.CERTIFICATES.forEach(function (c, i) {
        var name = c.name || ('Company ' + (i + 1));
        var slug = (c.slug || name).toString().toLowerCase().replace(/[^\w]+/g, '-');
        
        var files = Array.isArray(c.files) && c.files.length ? c.files : (c.file ? [c.file] : []);
        
        // Используем basePath без начального слэша
        var images = files.map(function (f) { return basePath + f; });
        
        if (!images.length) return;
        GROUPS[slug] = { name: name, images: images };
    });
    window.CERTS_GROUPS = GROUPS;

    // Карточки
    var html = Object.keys(GROUPS).map(function (slug) {
        var g = GROUPS[slug];
        var cover = g.images[0];
        
        return (
            '<article class="strip-card" data-group="' + slug + '">' +
            '<img class="strip-card__img" src="' + cover + '" alt="' + g.name + ' certificate" loading="lazy" tabindex="0">' +
            '<div class="strip-card__overlay">' +
            '<h6 class="strip-card__title">' + g.name + '</h6>' +
            '<button class="strip-card__btn"><i class="fas fa-search-plus"></i> ' + viewText + '</button>' +
            '</div>' +
            '<div class="strip-card__bar"><p class="strip-card__name">' + g.name + '</p></div>' +
            '</article>'
        );
    }).join('');
    track.innerHTML = html;

    // Клик
    track.addEventListener('click', function (e) {
        var card = e.target.closest('.strip-card');
        if (!card) return;
        if (e.target.closest('.strip-card__bar')) return;
        var group = card.getAttribute('data-group');
        if (group && window.openCertsLightboxGroup) window.openCertsLightboxGroup(group, 0);
    });

    // Клавиатура
    track.addEventListener('keydown', function (e) {
        if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('strip-card__img')) {
            e.preventDefault();
            var card = e.target.closest('.strip-card');
            var group = card.getAttribute('data-group');
            if (group && window.openCertsLightboxGroup) window.openCertsLightboxGroup(group, 0);
        }
    });
})();