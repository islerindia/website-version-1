/* Isler unified navbar — Products mega-menu + mobile burger.
   Desktop: hover opens the mega (180ms close delay + hover bridge in CSS).
   Mobile (<=860px): burger toggles the links panel; tapping Products expands
   the mega inline. Closes on outside-click / Escape. One handler per .isler-nav. */
(function () {
  function initNav(nav) {
    // Theme 2026-10-23: mark the current page so nav.css can underline it.
    var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    Array.prototype.forEach.call(nav.querySelectorAll('.isler-nav__links > li > a[href]'), function (a) {
      var h = (a.getAttribute('href') || '').split('#')[0].split('?')[0].toLowerCase();
      if (h && h === here) a.setAttribute('aria-current', 'page');
    });
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

    // "Business" is a plain link to business.html, where category selection
    // now lives. It used to be hijacked here to smooth-scroll to the
    // homepage's #range section; that handler called preventDefault() whenever
    // #range existed, which would stop the new link from ever navigating.
    // Hover is intentionally NOT wired to openMega.
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
      // .is-top drives the transparent-over-hero treatment (homepage only,
      // see body.home-edgenav in nav.css).
      // Tied to the HERO still being under the bar, not to a scroll figure:
      // the homepage hero is GSAP-pinned over ~5500px AND auto-advances its
      // scenes by scrolling the page itself, so any "y < n" test flips the bar
      // solid a second or two after load while the image is still full-screen.
      // No #hero-section on a page means no transparent state, which is what
      // the other 195 pages want anyway.
      var heroEl = document.getElementById('hero-section');
      var overHero = heroEl && heroEl.getBoundingClientRect().bottom > 80;
      if (overHero && !menuOpen) { nav.classList.add('is-top'); }
      else { nav.classList.remove('is-top'); }

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
    onScroll();   // set .is-top before the first scroll event
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
  }

  // Theme 2026-10-23: gentle scroll-reveal for cards on interior pages.
  // Classes are added here, so without JS nothing is ever hidden.
  function initReveal() {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var els = document.querySelectorAll('.cat-card, .rng-row, .vm-item, .job-card, .stat, .blog-card, .cta-box, .cert-card, .team-card, .tz-item');
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('tz-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    Array.prototype.forEach.call(els, function (el, i) {
      el.classList.add('tz-reveal'); el.style.transitionDelay = ((i % 6) * 60) + 'ms'; io.observe(el);
    });
    // Safety net: whatever the observer has not reached after 4s is shown anyway.
    setTimeout(function () { Array.prototype.forEach.call(els, function (el) { el.classList.add('tz-in'); }); }, 4000);
  }
  // Theme 2026-10-23 layer 3: scroll-progress bar + back-to-top button.
  function initChrome() {
    var bar = document.createElement('div'); bar.className = 'tz-progress'; bar.setAttribute('aria-hidden', 'true');
    var top = document.createElement('button'); top.className = 'tz-top'; top.type = 'button';
    top.setAttribute('aria-label', 'Back to top');
    top.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>';
    document.body.appendChild(bar); document.body.appendChild(top);
    top.addEventListener('click', function () {
      var smooth = !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
    });
    var tick = false;
    function update() {
      var doc = document.documentElement;
      var max = (doc.scrollHeight - window.innerHeight) || 1;
      var y = window.pageYOffset || doc.scrollTop || 0;
      bar.style.setProperty('--tz-progress', Math.min(1, Math.max(0, y / max)).toFixed(4));
      top.classList.toggle('is-on', y > 600);
      tick = false;
    }
    update();
    window.addEventListener('scroll', function () { if (!tick) { window.requestAnimationFrame(update); tick = true; } }, { passive: true });
    window.addEventListener('resize', update);
  }
  // Theme 2026-10-23 layer 4: diagonal slants under page heroes and above
  // the footer, plus a generic count-up for stat numbers.
  function initSlants() {
    if (document.body.classList.contains('ab-page')) return;   // About page has its own slants
    function bgOf(el) {
      var n = el, c;
      while (n && n !== document.body) {
        c = getComputedStyle(n).backgroundColor;
        if (c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent') return c;
        n = n.parentElement;
      }
      return '#ffffff';
    }
    Array.prototype.forEach.call(document.querySelectorAll('.page-hero, .cat-hero'), function (hero) {
      var next = hero.nextElementSibling;
      if (!next || next.classList.contains('tz-slant')) return;
      var sl = document.createElement('div'); sl.className = 'tz-slant'; sl.setAttribute('aria-hidden', 'true');
      sl.style.setProperty('--tz-next', bgOf(next));
      hero.classList.add('tz-has-slant');
      hero.parentNode.insertBefore(sl, next);
    });
    Array.prototype.forEach.call(document.querySelectorAll('.site-footer'), function (f) {
      var prev = f.previousElementSibling;
      if (!prev || prev.classList.contains('tz-slant')) return;
      var sl = document.createElement('div'); sl.className = 'tz-slant tz-slant--footer'; sl.setAttribute('aria-hidden', 'true');
      f.classList.add('tz-after-slant');
      f.parentNode.insertBefore(sl, f);
    });
  }
  function initCountUp() {
    var els = document.querySelectorAll('.hp-statbar__value, .stat__num, [data-count]');
    if (!els.length) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function run(el) {
      var raw = el.getAttribute('data-count') || el.textContent.trim();
      el.classList.add('tz-counted');
      if (!/^[0-9][0-9,]*\+?$/.test(raw)) return;           // only plain numbers like 40,000 / 100+
      var suffix = /\+$/.test(raw) ? '+' : '', target = parseInt(raw.replace(/[^0-9]/g, ''), 10);
      if (!target || reduce) { el.textContent = raw; return; }
      var t0 = null, dur = 1400;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min(1, (ts - t0) / dur), e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * e).toLocaleString('en-IN') + suffix;
        if (p < 1) requestAnimationFrame(step); else el.textContent = raw;
      }
      requestAnimationFrame(step);
    }
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.4 });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
  }
  function init() { document.querySelectorAll('.isler-nav').forEach(initNav); initReveal(); initChrome(); /* initSlants() retired 2026-10-23: Rajesh did not like the diagonal line */ initCountUp(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}());
