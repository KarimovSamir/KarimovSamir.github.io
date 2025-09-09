/* assets/js/certificates.lightbox.js
   Групповой лайтбокс с вертикальными превью, Fit↔Zoom по 1 клику,
   колесо/пинч для зума и ленивый drag (чтобы клик не считался перетаскиванием).
*/
(function () {
  var lb = document.getElementById('certsLightbox');
  if (!lb) return;

  var img      = lb.querySelector('.certs-lightbox__img');
  var stage    = lb.querySelector('.certs-lightbox__stage');
  var closeBtn = lb.querySelector('.certs-lightbox__close');
  var prevBtn  = lb.querySelector('.certs-lightbox__prev');
  var nextBtn  = lb.querySelector('.certs-lightbox__next');
  var pager    = lb.querySelector('.certs-lightbox__pager');
  var curEl    = pager ? pager.querySelector('.cur')   : null;
  var totEl    = pager ? pager.querySelector('.total') : null;
  var thumbs   = lb.querySelector('#certsLbThumbs');

  // Данные групп приходят из certificates.strip.js -> window.CERTS_GROUPS
  var state = { group: null, images: [], index: 0 };

  // ---- Zoom / Pan ----
  var DRAG_THRESHOLD = 8;   // пикс. до старта реального перетаскивания
  var ZOOM_IN = 2.2;        // масштаб при первом клике-увеличении

  var Z = {
    natW: 0, natH: 0,        // натуральные размеры изображения
    stageW: 0, stageH: 0,    // размеры сцены
    base: 1,                 // вписывающий масштаб (Fit)
    scale: 1,                // множитель поверх base (1 = Fit)
    min: 1, max: 6,
    x: 0, y: 0,              // смещение в пикселях от центра
    dragging: false, lastX: 0, lastY: 0,
    pinchDist: 0
  };

  var isDown = false, downX = 0, downY = 0;
  var lastDragUp = 0;        // метка времени, когда закончился реальный drag
  var tapCandidate = false, tStartX = 0, tStartY = 0;

  function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }

  function measure() {
    var r = stage.getBoundingClientRect();
    Z.stageW = r.width; Z.stageH = r.height;
    Z.natW = img.naturalWidth || 1;
    Z.natH = img.naturalHeight || 1;
    Z.base = Math.min(Z.stageW / Z.natW, Z.stageH / Z.natH);
    if (!isFinite(Z.base) || Z.base <= 0) Z.base = 1;
  }

  function applyTransform() {
    var s = Z.base * Z.scale;
    var sw = Z.natW * s, sh = Z.natH * s;

    var maxX = Math.max(0, (sw - Z.stageW) / 2);
    var maxY = Math.max(0, (sh - Z.stageH) / 2);

    Z.x = clamp(Z.x, -maxX, maxX);
    Z.y = clamp(Z.y, -maxY, maxY);

    img.style.position = 'relative';
    img.style.left = '0'; img.style.top = '0';
    img.style.transform = 'translate(' + Z.x + 'px,' + Z.y + 'px) scale(' + s + ')';

    stage.classList.toggle('is-zoomed', Z.scale > 1.01);
    stage.classList.toggle('is-fit', Z.scale <= 1.01);
    stage.classList.toggle('is-dragging', !!Z.dragging);
  }

  function resetZoom() {
    measure();
    Z.scale = 1; Z.x = 0; Z.y = 0;
    applyTransform();
  }

  function setScale(newScale) {
    Z.scale = clamp(newScale, Z.min, Z.max);
    applyTransform();
  }

  // ---- Рендер/управление группами ----
  function renderThumbs() {
    if (!thumbs) return;
    thumbs.innerHTML = state.images.map(function (src, idx) {
      var active = idx === state.index ? ' is-active' : '';
      return '<img class="certs-lightbox__thumb' + active + '" src="' + src + '" data-idx="' + idx + '" alt="">';
    }).join('');
  }

  function update() {
    if (!state.images.length) return;

    // При смене изображения — сначала загрузим, затем fit
    img.onload = function(){
      resetZoom();
    };
    img.src = state.images[state.index];

    if (curEl) curEl.textContent = (state.index + 1);
    if (totEl) totEl.textContent = state.images.length;
    if (prevBtn) prevBtn.disabled = (state.index <= 0);
    if (nextBtn) nextBtn.disabled = (state.index >= state.images.length - 1);

    if (thumbs) {
      Array.prototype.forEach.call(thumbs.children, function (el, idx) {
        if (idx === state.index) el.classList.add('is-active');
        else el.classList.remove('is-active');
      });
    }
  }

  function openGroup(groupSlug, startIndex) {
    var group = (window.CERTS_GROUPS || {})[groupSlug];
    if (!group) return;

    state.group = groupSlug;
    state.images = group.images.slice();
    state.index = Math.min(Math.max(0, +startIndex || 0), state.images.length - 1);

    renderThumbs();
    update();

    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    state = { group: null, images: [], index: 0 };
    if (thumbs) thumbs.innerHTML = '';
  }

  function go(delta) {
    var next = state.index + delta;
    if (next < 0 || next >= state.images.length) return;
    state.index = next;
    update();
  }

  // ---- Навигация по слайдам ----
  if (prevBtn) prevBtn.addEventListener('click', function(){ go(-1); });
  if (nextBtn) nextBtn.addEventListener('click', function(){ go(1); });
  if (thumbs) {
    thumbs.addEventListener('click', function(e){
      var t = e.target.closest('.certs-lightbox__thumb');
      if (!t) return;
      var idx = +t.getAttribute('data-idx');
      if (!Number.isNaN(idx)) { state.index = idx; update(); }
    });
  }

  closeBtn.addEventListener('click', close);
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });

  // ---- Клавиатура ----
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') return close();
    if (e.key === 'ArrowLeft')  { e.preventDefault(); go(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === '+' || e.key === '=') { e.preventDefault(); setScale(Z.scale * 1.2); }
    if (e.key === '-' || e.key === '_') { e.preventDefault(); setScale(Z.scale / 1.2); }
    if (e.key.toLowerCase() === 'f') { e.preventDefault(); setScale(1); } // Fit
  });

  // ---- Click: Fit ↔ Zoom (с защитой от «клика после драга») ----
  stage.addEventListener('click', function(e){
    if (e.target.closest('.certs-lightbox__nav')) return;   // клик по стрелке
    if (Date.now() - lastDragUp < 200) return;              // только что был реальный drag
    if (Z.scale <= 1.01) setScale(ZOOM_IN);                 // Fit -> Zoom-in
    else setScale(1);                                       // Zoom -> Fit
  });

  // ---- Колесо мыши: зум ----
  stage.addEventListener('wheel', function(e){
    e.preventDefault();
    var factor = Math.exp(-e.deltaY * 0.0015);
    setScale(Z.scale * factor);
  }, { passive: false });

  // ---- Mouse drag: ленивый старт перетаскивания ----
  stage.addEventListener('mousedown', function(e){
    if (Z.scale <= 1.01) return;           // в Fit — нечего таскать
    isDown = true;
    Z.dragging = false;                     // пока не знаем, драг это или клик
    downX = Z.lastX = e.clientX;
    downY = Z.lastY = e.clientY;
  });

  document.addEventListener('mousemove', function(e){
    if (!isDown) return;
    var dx = e.clientX - downX;
    var dy = e.clientY - downY;

    if (!Z.dragging && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) {
      Z.dragging = true;
      stage.classList.add('is-dragging');
      Z.lastX = e.clientX; 
      Z.lastY = e.clientY;
      return;
    }

    if (Z.dragging) {
      var mdx = e.clientX - Z.lastX;
      var mdy = e.clientY - Z.lastY;
      Z.lastX = e.clientX; 
      Z.lastY = e.clientY;
      Z.x += mdx; 
      Z.y += mdy; 
      applyTransform();
    }
  });

  document.addEventListener('mouseup', function(){
    if (!isDown) return;
    // если реально таскали — блокируем ближайший клик
    if (Z.dragging) lastDragUp = Date.now(); else lastDragUp = 0;
    isDown = false;
    Z.dragging = false; 
    stage.classList.remove('is-dragging');
  });

  // ---- Touch: pinch zoom + ленивый drag + tap toggle ----
  stage.addEventListener('touchstart', function(e){
    if (e.touches.length === 2){
      Z.pinchDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      tapCandidate = false;
      return;
    }
    if (e.touches.length === 1){
      tapCandidate = true;
      tStartX = Z.lastX = e.touches[0].clientX; 
      tStartY = Z.lastY = e.touches[0].clientY;
      Z.dragging = false;                   // НЕ объявляем драг заранее
    }
  }, { passive: true });

  stage.addEventListener('touchmove', function(e){
    if (e.touches.length === 2){
      var dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      var factor = dist / (Z.pinchDist || dist);
      Z.pinchDist = dist;
      setScale(Z.scale * factor);
      tapCandidate = false;
      return;
    }
    if (e.touches.length === 1 && Z.scale > 1.01){
      var cx = e.touches[0].clientX;
      var cy = e.touches[0].clientY;

      if (!Z.dragging && (Math.abs(cx - tStartX) > DRAG_THRESHOLD || Math.abs(cy - tStartY) > DRAG_THRESHOLD)) {
        Z.dragging = true;
        stage.classList.add('is-dragging');
        Z.lastX = cx; Z.lastY = cy;
        tapCandidate = false;
        return;
      }

      if (Z.dragging){
        var dx = cx - Z.lastX, dy = cy - Z.lastY;
        Z.lastX = cx; Z.lastY = cy;
        Z.x += dx; Z.y += dy; 
        applyTransform();
      }
    }
  }, { passive: false });

  stage.addEventListener('touchend', function(){
    if (Z.dragging) lastDragUp = Date.now(); else lastDragUp = 0;
    Z.dragging = false; stage.classList.remove('is-dragging');

    // одиночный тап — toggle Fit/Zoom
    if (tapCandidate && (Date.now() - lastDragUp > 200)) {
      if (Z.scale <= 1.01) setScale(ZOOM_IN);
      else setScale(1);
    }
    tapCandidate = false;
  });

  // ---- API ----
  window.openCertsLightboxGroup = openGroup;

  // Пересчёт при ресайзе
  window.addEventListener('resize', function(){
    if (!lb.classList.contains('is-open')) return;
    var curScale = Z.scale, curX = Z.x, curY = Z.y;
    measure();
    Z.scale = curScale; Z.x = curX; Z.y = curY;
    applyTransform();
  });
})();
