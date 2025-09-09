/* assets/js/certificates.strip.js — grid + overlay + групповой лайтбокс */
(function () {
  var track = document.getElementById('certsStrip');
  if (!track || !window.CERTIFICATES) return;

  // Нормализуем данные и соберём группы (глобально для lightbox)
  var GROUPS = {};
  window.CERTIFICATES.forEach(function (c, i) {
    var name = c.name || ('Company ' + (i + 1));
    var slug = (c.slug || name).toString().toLowerCase().replace(/[^\w]+/g, '-');
    var files = Array.isArray(c.files) && c.files.length ? c.files : (c.file ? [c.file] : []);
    var images = files.map(function (f) { return 'assets/images/partners/' + f; });
    if (!images.length) return;
    GROUPS[slug] = { name: name, images: images };
  });
  window.CERTS_GROUPS = GROUPS;

  // Карточки (показываем первую картинку)
  var html = Object.keys(GROUPS).map(function (slug) {
    var g = GROUPS[slug];
    var cover = g.images[0];
    return (
      '<article class="strip-card" data-group="' + slug + '">' +
        '<img class="strip-card__img" src="' + cover + '" alt="' + g.name + ' certificate" loading="lazy" tabindex="0">' +
        '<div class="strip-card__overlay">' +
          '<h6 class="strip-card__title">' + g.name + '</h6>' +
          '<button class="strip-card__btn"><i class="fas fa-search-plus"></i> View</button>' +
        '</div>' +
        '<div class="strip-card__bar"><p class="strip-card__name">' + g.name + '</p></div>' +
      '</article>'
    );
  }).join('');
  track.innerHTML = html;

  // Клик по кнопке / картинке / карточке (кроме нижнего бара) — открыть лайтбокс на 1-й картинке группы
  track.addEventListener('click', function (e) {
    var card = e.target.closest('.strip-card');
    if (!card) return;
    if (e.target.closest('.strip-card__bar')) return; // клик по бару не открывает
    var group = card.getAttribute('data-group');
    if (group && window.openCertsLightboxGroup) window.openCertsLightboxGroup(group, 0);
  });

  // Клавиатура (Enter/Space по картинке)
  track.addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('strip-card__img')) {
      e.preventDefault();
      var card = e.target.closest('.strip-card');
      var group = card && card.getAttribute('data-group');
      if (group && window.openCertsLightboxGroup) window.openCertsLightboxGroup(group, 0);
    }
  });
})();
