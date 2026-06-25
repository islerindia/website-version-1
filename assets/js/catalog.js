/* catalog.js — product nav (5 dropdowns), mobile menu, footer accordion,
   and the no-reload variant selector for detail pages. */
(function () {
  'use strict';

  // ── Mobile burger toggle ──────────────────────────────────────────────
  function initBurger() {
    var nav = document.querySelector('.cat-nav');
    var burger = nav && nav.querySelector('.cat-nav__burger');
    if (!burger) return;
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // ── Category dropdowns: hover on desktop (CSS), tap/click toggle on touch ──
  function initDropdowns() {
    var items = Array.prototype.slice.call(document.querySelectorAll('.cat-nav__item'));
    items.forEach(function (item) {
      var top = item.querySelector('.cat-nav__top');
      if (!top) return;
      top.addEventListener('click', function (e) {
        e.preventDefault();
        var wasOpen = item.classList.contains('is-open');
        items.forEach(function (i) { i.classList.remove('is-open'); var t = i.querySelector('.cat-nav__top'); if (t) t.setAttribute('aria-expanded', 'false'); });
        if (!wasOpen) { item.classList.add('is-open'); top.setAttribute('aria-expanded', 'true'); }
      });
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.cat-nav__item')) {
        items.forEach(function (i) { i.classList.remove('is-open'); });
      }
    });
  }

  // ── Footer accordion (mobile) — mirrors the rest of the site ──────────
  function initFooterAccordion() {
    if (window.innerWidth > 767) return;
    document.querySelectorAll('[data-footer-accordion]').forEach(function (col) {
      var heading = col.querySelector('.footer__col-heading');
      if (!heading) return;
      heading.addEventListener('click', function () { col.classList.toggle('is-open'); });
    });
  }

  // ── Variant selector ──────────────────────────────────────────────────
  // Reads window.PRODUCT = { variants: [{ code, label, img, price, specs:[[k,v]], highlights:[[k,v]] }] }
  function initVariants() {
    var P = window.PRODUCT;
    if (!P || !P.variants || !P.variants.length) return;

    var imgEl   = document.getElementById('pd-img');
    var codeEl  = document.getElementById('pd-code');
    var priceEl = document.getElementById('pd-price');
    var chipsEl = document.getElementById('pd-highlights');
    var tableEl = document.getElementById('pd-spec-rows');
    var btns    = Array.prototype.slice.call(document.querySelectorAll('.pd__variant'));

    function render(v) {
      if (imgEl) { imgEl.style.opacity = '0'; setTimeout(function () { imgEl.src = v.img; imgEl.alt = v.label; imgEl.style.opacity = '1'; }, 120); }
      if (codeEl) codeEl.innerHTML = 'Model: <b>' + v.code + '</b>';
      if (priceEl) {
        if (v.price) { priceEl.innerHTML = v.price + '<span class="pd__price-note">Indicative</span>'; priceEl.style.display = ''; }
        else { priceEl.innerHTML = '<span class="pd__price--enquire">Price on request</span>'; priceEl.style.display = ''; }
      }
      if (chipsEl) {
        chipsEl.innerHTML = (v.highlights || []).map(function (h) {
          return '<div class="pd__chip"><span>' + h[0] + '</span><b>' + h[1] + '</b></div>';
        }).join('');
      }
      if (tableEl) {
        tableEl.innerHTML = v.specs.map(function (s) {
          return '<tr><th>' + s[0] + '</th><td>' + s[1] + '</td></tr>';
        }).join('');
      }
    }

    function select(idx) {
      btns.forEach(function (b, i) { b.classList.toggle('is-active', i === idx); });
      render(P.variants[idx]);
    }

    btns.forEach(function (b, i) { b.addEventListener('click', function () { select(i); }); });

    // preselect from URL hash (e.g. #domestic-4b) if it matches a variant code slug
    var start = 0;
    if (location.hash) {
      var h = location.hash.slice(1).toLowerCase();
      P.variants.forEach(function (v, i) {
        if (v.code.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === h) start = i;
      });
    }
    select(start);
  }

  function init() {
    initBurger();
    initDropdowns();
    initFooterAccordion();
    initVariants();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}());
