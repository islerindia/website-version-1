/* ════════════════════════════════════════════════════════════════════════
   Reusable category product filter  —  Isler India
   ------------------------------------------------------------------------
   Data-driven: each product card carries its filterable values as
   data-* attributes; this script reads them, builds the checkbox UI from
   the values ACTUALLY present on the page, and filters live.

   Behaviour: OR within a group (60cm OR 90cm) · AND across groups (60cm AND BLDC).

   ── To reuse on another category ──
   1. Add a config entry to CONFIGS below (key = the page's data-filter value).
   2. Give each .cat-card the matching data-* attributes.
   3. Wrap the grid in the .cat-filter-layout markup (see chimney pages).
   Nothing else changes — no per-page JS.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // Category registry. `key` maps to each card's data-<key> attribute.
  // multi:true  → attribute may hold a comma list (e.g. sizes "60,75,90").
  // format      → how a raw value is shown as a checkbox label.
  // sort        → 'num' (numeric) or 'alpha'.
  var CONFIGS = {
    vacuum: {
      groups: [
        { key: 'type', label: 'Type', multi: false, format: function (v) { return v; }, sort: 'alpha' }
      ]
    },
    kettle: {
      groups: [
        { key: 'capacity', label: 'Capacity', multi: false, format: function (v) { return v + 'L'; },     sort: 'num' },
        { key: 'material', label: 'Body',     multi: false, format: function (v) { return v; },            sort: 'alpha' }
      ]
    },
    toaster: {
      groups: [
        { key: 'capacity', label: 'Capacity', multi: false, format: function (v) { return v + ' Slice'; }, sort: 'num' },
        { key: 'material', label: 'Body',     multi: false, format: function (v) { return v; },             sort: 'alpha' }
      ]
    },
    induction: {
      groups: [
        { key: 'power', label: 'Power', multi: false, format: function (v) { return v + 'W'; }, sort: 'num' }
      ]
    },
    infrared: {
      groups: [
        { key: 'power', label: 'Power', multi: false, format: function (v) { return v + 'W'; }, sort: 'num' }
      ]
    },
    hybrid: {
      groups: [
        { key: 'size', label: 'Size', multi: false, format: function (v) { return v + ' cm'; }, sort: 'num' }
      ]
    },
    juicer: {
      groups: [
        { key: 'color', label: 'Colour', multi: false, format: function (v) { return v; }, sort: 'alpha' }
      ]
    },
    doughmaker: {
      groups: [
        { key: 'controls', label: 'Controls', multi: false, format: function (v) { return v; }, sort: 'alpha' }
      ]
    },
    chimney: {
      groups: [
        { key: 'size',    label: 'Size',          multi: true,  format: function (v) { return v + ' cm'; },    sort: 'num' },
        { key: 'suction', label: 'Suction Power', multi: false, format: function (v) { return v + ' m³/hr'; }, sort: 'num' },
        { key: 'motor',   label: 'Motor Type',    multi: false, format: function (v) { return v; },            sort: 'alpha' }
      ]
    },
    ovens: {
      groups: [
        { key: 'capacity', label: 'Capacity', multi: false, format: function (v) { return v + 'L'; }, sort: 'num' },
        { key: 'controls', label: 'Controls', multi: false, format: function (v) { return v; },        sort: 'alpha' }
      ]
    },
    airfryer: {
      groups: [
        { key: 'type',     label: 'Type',     multi: false, format: function (v) { return v; },      sort: 'alpha' },
        { key: 'capacity', label: 'Capacity', multi: false, format: function (v) { return v + 'L'; }, sort: 'num' }
      ]
    },
    mixer: {
      groups: [
        { key: 'capacity', label: 'Capacity', multi: false, format: function (v) { return v + 'L'; }, sort: 'num' },
        { key: 'controls', label: 'Controls', multi: false, format: function (v) { return v; },        sort: 'alpha' }
      ]
    },
    purifier: {
      groups: [
        { key: 'type', label: 'Type', multi: false, format: function (v) { return v; },          sort: 'alpha' },
        { key: 'cadr', label: 'CADR', multi: false, format: function (v) { return v + ' m³/h'; }, sort: 'num' }
      ]
    },
    microwave: {
      groups: [
        { key: 'type',     label: 'Type',     multi: false, format: function (v) { return v; },        sort: 'alpha' },
        { key: 'capacity', label: 'Capacity', multi: false, format: function (v) { return v + 'L'; }, sort: 'num' },
        { key: 'power',    label: 'Power',    multi: false, format: function (v) { return v + 'W'; }, sort: 'num' }
      ]
    },
    electric: {
      groups: [
        { key: 'type',  label: 'Type',  multi: false, format: function (v) { return v; },          sort: 'alpha' },
        { key: 'power', label: 'Power', multi: false, format: function (v) { return v + 'W'; },     sort: 'num' },
        { key: 'size',  label: 'Size',  multi: false, format: function (v) { return v + ' cm'; },   sort: 'num' }
      ]
    },
    hobs: {
      groups: [
        { key: 'burners',  label: 'Burners',  multi: true, format: function (v) { return v + ' Burner'; }, sort: 'num' },
        { key: 'size',     label: 'Size',     multi: true, format: function (v) { return v + ' cm'; },     sort: 'num' },
        { key: 'ignition', label: 'Ignition', multi: false, format: function (v) { return v; },             sort: 'alpha' }
      ]
    },
    gas: {
      groups: [
        { key: 'burners',  label: 'Burners',  multi: false, format: function (v) { return v + ' Burner'; },   sort: 'num' },
        { key: 'size',     label: 'Size',     multi: false, format: function (v) { return v + ' cm'; },        sort: 'num' },
        { key: 'ignition', label: 'Ignition', multi: false, format: function (v) { return v + ' Ignition'; }, sort: 'alpha' }
      ]
    },
    dualbasket: {
      groups: [
        { key: 'capacity', label: 'Total Capacity', multi: false, format: function (v) { return v + 'L'; }, sort: 'num' }
      ]
    },
    coffee: {
      groups: [
        { key: 'tier',     label: 'Range',         multi: false, format: function (v) { return v; },        sort: 'alpha' },
        { key: 'control',  label: 'Control',       multi: false, format: function (v) { return v; },        sort: 'alpha' },
        { key: 'pressure', label: 'Pump Pressure', multi: true,  format: function (v) { return v + ' Bar'; }, sort: 'num' },
        { key: 'milk',     label: 'Milk System',   multi: false, format: function (v) { return v; },        sort: 'alpha' },
        { key: 'power',    label: 'Power',         multi: false, format: function (v) { return v + 'W'; },   sort: 'num' }
      ]
    }
    // Future categories: add an entry here, tag the cards, wrap the grid. No new JS.
  };

  function cardValues(card, key) {
    var raw = card.getAttribute('data-' + key);
    if (!raw) return [];
    return raw.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
  }

  function sortValues(values, mode) {
    return values.sort(function (a, b) {
      return mode === 'num' ? parseFloat(a) - parseFloat(b) : a.localeCompare(b);
    });
  }

  function initFilter(root) {
    var category = root.getAttribute('data-filter');
    var config = CONFIGS[category];
    if (!config) return;

    var grid      = root.querySelector('[data-filter-grid]');
    var groupsWrap = root.querySelector('.cat-filter__groups');
    var countEl   = root.querySelector('.cat-results__count');
    var emptyEl   = root.querySelector('.cat-empty');
    var toggleBtn = root.querySelector('.cat-filter-toggle');
    var panel     = root.querySelector('.cat-filter');
    if (!grid || !groupsWrap) return;

    var cards = Array.prototype.slice.call(grid.querySelectorAll('.cat-card'));

    // Active selections per group.
    var selected = {};
    config.groups.forEach(function (g) { selected[g.key] = {}; });

    // ── Build the checkbox UI from values present on THIS page ──
    config.groups.forEach(function (group) {
      var present = {};
      cards.forEach(function (c) {
        cardValues(c, group.key).forEach(function (v) { present[v] = true; });
      });
      var values = sortValues(Object.keys(present), group.sort);
      if (values.length === 0) return; // group has no data on this page → skip

      var section = document.createElement('div');
      section.className = 'cat-filter__group';

      var title = document.createElement('h3');
      title.className = 'cat-filter__group-title';
      title.textContent = group.label;
      section.appendChild(title);

      var list = document.createElement('div');
      list.className = 'cat-filter__options';

      values.forEach(function (val) {
        var label = document.createElement('label');
        label.className = 'cat-filter__option';

        var input = document.createElement('input');
        input.type = 'checkbox';
        input.value = val;
        input.setAttribute('data-group', group.key);

        var box = document.createElement('span');
        box.className = 'cat-filter__box';
        box.setAttribute('aria-hidden', 'true');

        var text = document.createElement('span');
        text.className = 'cat-filter__label';
        text.textContent = group.format(val);

        label.appendChild(input);
        label.appendChild(box);
        label.appendChild(text);
        list.appendChild(label);
      });

      section.appendChild(list);
      groupsWrap.appendChild(section);
    });

    // ── Apply current selections ──
    function apply() {
      var visible = 0;
      cards.forEach(function (card) {
        var show = config.groups.every(function (group) {
          var sel = selected[group.key];
          var keys = Object.keys(sel);
          if (keys.length === 0) return true;            // no constraint from this group
          var vals = cardValues(card, group.key);
          return vals.some(function (v) { return sel[v]; }); // OR within group
        });
        card.style.display = show ? '' : 'none';
        if (show) visible++;
      });

      if (countEl) countEl.textContent = visible + (visible === 1 ? ' product' : ' products');
      if (emptyEl) emptyEl.hidden = visible !== 0;

      var active = config.groups.reduce(function (n, g) { return n + Object.keys(selected[g.key]).length; }, 0);
      if (toggleBtn) {
        var badge = toggleBtn.querySelector('.cat-filter-toggle__count');
        if (badge) badge.textContent = active ? '(' + active + ')' : '';
      }
    }

    // ── Events (delegated) ──
    groupsWrap.addEventListener('change', function (e) {
      var cb = e.target;
      if (!cb || cb.type !== 'checkbox') return;
      var set = selected[cb.getAttribute('data-group')];
      if (cb.checked) set[cb.value] = true; else delete set[cb.value];
      apply();
    });

    function clearAll() {
      config.groups.forEach(function (g) { selected[g.key] = {}; });
      groupsWrap.querySelectorAll('input[type="checkbox"]').forEach(function (cb) { cb.checked = false; });
      apply();
    }
    root.querySelectorAll('.cat-filter__clear, .cat-empty__clear').forEach(function (btn) {
      btn.addEventListener('click', clearAll);
    });

    if (toggleBtn && panel) {
      toggleBtn.addEventListener('click', function () {
        var open = panel.classList.toggle('is-open');
        toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    apply(); // initial count
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.cat-filter-layout[data-filter]').forEach(initFilter);
  });
})();
