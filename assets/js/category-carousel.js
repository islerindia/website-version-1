/* ═══════════════════════════════════════════════════════════════════════
   CATEGORY SWITCHER CAROUSEL — driver
   Stepped auto-sliding carousel: shows N cards, advances one every 5s with a
   500ms slide, loops forever by recycling DOM nodes, pauses on hover/focus,
   prev/next arrows.

   Ported from the inline script in index.html's "Variety, Quality and
   Quantity" section, with two changes:
     1. classes are namespaced .pcx-* (see assets/css/category-carousel.css
        for why — .cat-card is already taken on the category pages);
     2. it drives EVERY .pcx-carousel on the page instead of a single
        hard-coded #range one, so a page can carry more than one.

   Load with `defer`; no dependencies.
═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var SPEED = 500, DELAY = 5000, EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';
  var reduce = window.matchMedia &&
               window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function build(root) {
    var track = root.querySelector('.pcx-track');
    if (!track || track.children.length < 2) return null;

    var prevBtn = root.querySelector('.pcx-nav--prev');
    var nextBtn = root.querySelector('.pcx-nav--next');
    var animating = false, timer = null;

    function setVis() {
      var w = window.innerWidth, n = 1;
      if (w >= 1200) n = 4; else if (w >= 900) n = 3; else if (w >= 600) n = 2;
      root.style.setProperty('--vis', n);
    }
    function gap() { return parseFloat(getComputedStyle(track).columnGap) || 24; }
    function stepPx() { return track.firstElementChild.getBoundingClientRect().width + gap(); }

    function next() {
      if (animating) return;
      animating = true;
      if (reduce) { track.appendChild(track.firstElementChild); animating = false; return; }
      track.style.transition = 'transform ' + SPEED + 'ms ' + EASE;
      track.style.transform = 'translateX(-' + stepPx() + 'px)';
      var end = function () {
        track.removeEventListener('transitionend', end);
        track.style.transition = 'none';
        track.appendChild(track.firstElementChild);
        track.style.transform = 'translateX(0)';
        void track.offsetWidth;
        animating = false;
      };
      track.addEventListener('transitionend', end);
    }
    function prev() {
      if (animating) return;
      animating = true;
      track.style.transition = 'none';
      track.insertBefore(track.lastElementChild, track.firstElementChild);
      track.style.transform = 'translateX(-' + stepPx() + 'px)';
      void track.offsetWidth;
      if (reduce) { track.style.transform = 'translateX(0)'; animating = false; return; }
      track.style.transition = 'transform ' + SPEED + 'ms ' + EASE;
      track.style.transform = 'translateX(0)';
      var end = function () { track.removeEventListener('transitionend', end); animating = false; };
      track.addEventListener('transitionend', end);
    }
    function play() { if (reduce) return; stop(); timer = setInterval(next, DELAY); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    if (nextBtn) nextBtn.addEventListener('click', function () { next(); play(); });
    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); play(); });
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', play);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', play);

    setVis();
    play();
    return setVis;
  }

  var resizers = [];
  Array.prototype.forEach.call(document.querySelectorAll('.pcx-carousel'), function (root) {
    var r = build(root);
    if (r) resizers.push(r);
  });

  if (resizers.length) {
    var rt;
    window.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(function () { resizers.forEach(function (f) { f(); }); }, 150);
    });
  }
}());
