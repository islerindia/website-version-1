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

    /* ── Mega category strip: 4 headers across the top; clicking one drops its
       sub-categories down underneath and collapses whichever was open.
       Header and panel are separate elements, paired by aria-controls.
       Heights animate from px, then release to `auto` so a resize never
       leaves the open panel clipped. */
    var megaOpenTab = null;
    if (mega) {
      var tabs = Array.prototype.slice.call(mega.querySelectorAll('.isler-mega__tab'));

      var panelOf = function (tab) { return document.getElementById(tab.getAttribute('aria-controls')); };

      var collapseTab = function (tab) {
        var panel = panelOf(tab);
        panel.style.height = panel.scrollHeight + 'px';   // pin auto -> px so it can animate
        void panel.offsetHeight;                          // force reflow
        tab.classList.remove('is-open');
        tab.setAttribute('aria-expanded', 'false');
        panel.style.height = '0px';
      };
      var expandTab = function (tab) {
        var panel = panelOf(tab);
        tab.classList.add('is-open');
        tab.setAttribute('aria-expanded', 'true');
        panel.style.height = panel.scrollHeight + 'px';
      };

      mega.addEventListener('transitionend', function (e) {
        if (e.propertyName !== 'height') return;
        if (megaOpenTab && panelOf(megaOpenTab) === e.target) e.target.style.height = 'auto';
      });

      tabs.forEach(function (tab) {
        tab.addEventListener('click', function (e) {
          e.preventDefault();
          var wasOpen = tab === megaOpenTab;
          if (megaOpenTab) { collapseTab(megaOpenTab); megaOpenTab = null; }
          if (!wasOpen) { expandTab(tab); megaOpenTab = tab; }
        });
      });

      window.addEventListener('resize', function () {
        if (megaOpenTab) panelOf(megaOpenTab).style.height = 'auto';
      });
    }
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

    /* ── Auto-hide sticky bar ──
       Sticks to the top edge; slides up out of view on scroll-down (once past
       the bar), slides back in on any upward scroll or near the top. Never
       hides while a menu (mega or mobile) is open. rAF-throttled. */
    var lastY = window.pageYOffset || 0, ticking = false;
    function onScroll() {
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      var menuOpen = nav.classList.contains('is-open') ||
                     (item && item.classList.contains('is-open'));
      if (y <= 4 || menuOpen) {
        nav.classList.remove('isler-nav--hidden');            // at top / menu open
      } else if (y > lastY + 2 && y > 80) {
        nav.classList.add('isler-nav--hidden');               // scrolling down, past the bar
      } else if (y < lastY - 8) {
        nav.classList.remove('isler-nav--hidden');            // scrolling up
      }
      lastY = y;
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
  }

  function init() { document.querySelectorAll('.isler-nav').forEach(initNav); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}());
