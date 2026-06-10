(function () {
  'use strict';

  // Fix 1: Disable browser scroll restoration so the page always loads at top.
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // Fix 2: Force scroll to top before anything else runs.
  window.scrollTo(0, 0);

  // Preload all 5 cinematic scene images
  var SCENE_SRCS = [
    'assets/images/scenes/scene-01-establishing.jpg',
    'assets/images/scenes/scene-02-chimney-hero.jpg',
    'assets/images/scenes/scene-03-hob-closeup.jpg',
    'assets/images/scenes/scene-04-control-panel-macro.jpg',
    'assets/images/scenes/scene-05-finale-pullback.jpg'
  ];

  SCENE_SRCS.forEach(function (src) { (new Image()).src = src; });

  function init() {
    gsap.registerPlugin(ScrollTrigger);

    // Fix 1b: ScrollTrigger auto-registers when its CDN script evaluates —
    // before this file runs — and snapshots history.scrollRestoration ('auto')
    // at that moment. Every ScrollTrigger.refresh() re-applies that snapshot,
    // clobbering the 'manual' set in Fix 1. clearScrollMemory updates the
    // snapshot so 'manual' survives refreshes and reloads start at the top.
    ScrollTrigger.clearScrollMemory('manual');

    var section    = document.getElementById('hero-section');
    var imgLayers  = Array.prototype.slice.call(document.querySelectorAll('.hero-scene-img'));
    var textScenes = Array.prototype.slice.call(document.querySelectorAll('.hero-scene'));
    var scrollHint = document.getElementById('scroll-hint');

    var TOTAL = imgLayers.length; // 5
    var STEP  = 1 / TOTAL;        // 0.2 per scene
    var FADE  = 0.025;            // half of 5% crossfade window

    // Fix 4: Explicit initial states — gsap.set() is the single source of truth
    // for what's visible at load. CSS provides a no-JS fallback; GSAP overrides it.
    gsap.set(imgLayers,    { opacity: 0, scale: 1.05 });
    gsap.set(imgLayers[0], { opacity: 1 });
    gsap.set(textScenes,    { opacity: 0, y: -20 });
    gsap.set(textScenes[0], { opacity: 1, y: 0 });

    // ── Image layers: opacity crossfade + scale parallax ──────────────────
    // immediateRender: false on all tweens so GSAP never auto-applies from-states
    // and the gsap.set() initial values above are never overridden at build time.

    var imgTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start:   'top top',
        end:     'bottom bottom',
        scrub:   1
      }
    });

    imgLayers.forEach(function (el, i) {
      var fadeInS  = Math.max(0, i * STEP - FADE);
      var fadeInE  = Math.min(1, i * STEP + FADE);
      var fadeOutS = Math.max(0, (i + 1) * STEP - FADE);
      var fadeOutE = Math.min(1, (i + 1) * STEP + FADE);

      var visStart = (i === 0) ? 0 : fadeInS;
      var visEnd   = (i === TOTAL - 1) ? 1 : fadeOutE;

      imgTl.fromTo(el,
        { scale: 1.05 },
        { scale: 1.0, duration: visEnd - visStart, ease: 'none', immediateRender: false },
        visStart);

      if (i > 0) {
        imgTl.fromTo(el,
          { opacity: 0 },
          { opacity: 1, duration: fadeInE - fadeInS, ease: 'none', immediateRender: false },
          fadeInS);
      }

      if (i < TOTAL - 1) {
        imgTl.fromTo(el,
          { opacity: 1 },
          { opacity: 0, duration: fadeOutE - fadeOutS, ease: 'none', immediateRender: false },
          fadeOutS);
      }
    });

    // ── Text scenes: fade in/out with translateY ──────────────────────────
    // immediateRender: false on every tween — the exit tweens in particular have
    // { opacity: 1 } as their from-state, which GSAP would otherwise apply
    // immediately at timeline build time, making all scenes visible at once.

    var textTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start:   'top top',
        end:     'bottom bottom',
        scrub:   1
      }
    });

    textScenes.forEach(function (el, i) {
      var inAt   = Math.max(0, i * STEP + 0.02);
      var peakAt = Math.min(1, i * STEP + 0.06);
      var outAt  = Math.min(1, (i + 1) * STEP - 0.04);

      if (i === 0) {
        textTl.fromTo(el,
          { opacity: 1, y: 0 },
          { opacity: 0, y: -20, duration: 0.04, ease: 'power2.in', immediateRender: false },
          outAt);
      } else {
        textTl.fromTo(el,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: peakAt - inAt, ease: 'power2.out', immediateRender: false },
          inAt);
        textTl.fromTo(el,
          { opacity: 1, y: 0 },
          { opacity: 0, y: -20, duration: 0.04, ease: 'power2.in', immediateRender: false },
          outAt);
      }
    });

    // ── Fade scroll hint on first scroll ──────────────────────────────────

    ScrollTrigger.create({
      trigger: section,
      start:   'top top+=80',
      onEnter: function () {
        if (scrollHint) gsap.to(scrollHint, { opacity: 0, duration: 0.5, ease: 'power2.in' });
      }
    });

    // Fix 3: Recalculate all ScrollTrigger positions after full load so that
    // image/font-driven layout shifts don't leave stale trigger offsets.
    window.addEventListener('load', function () {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
