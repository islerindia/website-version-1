/* Isler unified navbar — Products mega-menu + mobile burger.
   Desktop: hover opens the mega (180ms close delay + hover bridge in CSS).
   Mobile (<=860px): burger toggles the links panel; tapping Products expands
   the mega inline. Closes on outside-click / Escape. One handler per .isler-nav. */
(function () {
  function initNav(nav) {
    var item    = nav.querySelector('.isler-nav__item.has-mega');
    var trigger = nav.querySelector('.isler-nav__trigger');
    var mega    = nav.querySelector('.isler-mega');
    var burger  = nav.querySelector('.isler-nav__burger');
    var DESKTOP = 861, HOVER_DELAY = 180, closeTimer = null;

    // Inert placeholder links (Chimneys / Other Appliances — pages not built yet):
    // visible & uniform, but href="#" must not navigate or jump to top.
    if (mega) {
      mega.querySelectorAll('a.isler-mega__link[href="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) { e.preventDefault(); });
      });
    }

    function openMega() {
      clearTimeout(closeTimer);
      if (item) item.classList.add('is-open');
      if (mega) { mega.classList.add('is-open'); mega.setAttribute('aria-hidden', 'false'); }
      if (trigger) trigger.setAttribute('aria-expanded', 'true');
    }
    function closeMega() {
      if (item) item.classList.remove('is-open');
      if (mega) { mega.classList.remove('is-open'); mega.setAttribute('aria-hidden', 'true'); }
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    }
    function scheduleClose() { clearTimeout(closeTimer); closeTimer = setTimeout(closeMega, HOVER_DELAY); }
    function closeBurger() { nav.classList.remove('is-open'); if (burger) burger.setAttribute('aria-expanded', 'false'); }

    if (item) {
      item.addEventListener('mouseenter', function () { if (window.innerWidth >= DESKTOP) openMega(); });
      item.addEventListener('mouseleave', function () { if (window.innerWidth >= DESKTOP) scheduleClose(); });
    }
    if (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        (item && item.classList.contains('is-open')) ? closeMega() : openMega();
      });
    }
    if (burger) {
      burger.addEventListener('click', function () {
        var open = nav.classList.toggle('is-open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.isler-nav__item.has-mega')) closeMega();
      if (!e.target.closest('.isler-nav')) closeBurger();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeMega(); closeBurger(); }
    });
  }

  function init() { document.querySelectorAll('.isler-nav').forEach(initNav); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}());
