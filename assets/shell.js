/* ===========================================================================
   DLS shell — injects the fixed left navigation rail into every page.

   One definition so the pages cannot drift apart: adding a section means
   adding one row to NAV below and nothing else.

   The rail is 60px of icons at rest and expands on hover to reveal labels.
   Pointer-coarse devices get no hover, so the logo doubles as a tap toggle.
   =========================================================================== */
(function () {
  'use strict';

  /* href null => the section is planned but not built; the row renders dead. */
  var NAV = [
    { id: 'home', label: 'Home', href: 'index.html',
      d: 'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z' },
    { id: 'squad', label: 'Squad', href: 'squad.html',
      d: 'M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z' },
    { id: 'store', label: 'Store', href: 'store.html',
      d: 'M3.5 12.5l9-9h8v8l-9 9zM16.4 7.6h.01' },
    { id: 'coaches', label: 'Coaches', href: 'coaches.html',
      d: 'M12 4l6 15H6zM4 19h16' },
    { id: 'rewards', label: 'Rewards', href: 'rewards.html',
      d: 'M12 3l2.6 5.7 6.4.7-4.8 4.3 1.4 6.3L12 16.8 6.4 20l1.4-6.3L3 9.4l6.4-.7z' },
    { id: 'packs', label: 'Packs', href: 'packs.html',
      d: 'M12 3l8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9' },
    { id: 'ask', label: 'Ask DLS', href: null,
      d: 'M4 5h16v11H9l-5 4z' }
  ];

  var BUILD = 'Internal build';

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function icon(d) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + d + '"/></svg>';
  }

  function rowsHTML(active) {
    return NAV.map(function (item) {
      if (!item.href) {
        return '<span class="dls-rail__item dls-rail__item--soon" title="Not built yet">'
          + icon(item.d)
          + '<span class="dls-rail__label">' + esc(item.label)
          + '<span class="dls-rail__lock">Soon</span></span></span>';
      }
      var cls = 'dls-rail__item' + (item.id === active ? ' dls-rail__item--active' : '');
      return '<a class="' + cls + '" href="' + item.href + '">'
        + icon(item.d)
        + '<span class="dls-rail__label">' + esc(item.label) + '</span></a>';
    }).join('');
  }

  function mount() {
    var active = document.body.getAttribute('data-dls-page') || '';

    var rail = document.createElement('nav');
    rail.className = 'dls-rail';
    rail.setAttribute('aria-label', 'Sections');
    rail.innerHTML =
      '<a class="dls-rail__logo" href="index.html">'
      + '<span class="dls-rail__mark">DLS</span>'
      + '<span class="dls-rail__word">Dream League<br>Soccer</span>'
      + '</a>'
      + rowsHTML(active)
      + '<span class="dls-rail__spacer"></span>'
      + '<div class="dls-rail__foot"><span></span><span class="dls-rail__build">' + BUILD + '</span></div>';

    document.body.insertBefore(rail, document.body.firstChild);

    var toggle = document.getElementById('theme-toggle');
    if (toggle) {
      var foot = rail.querySelector('.dls-rail__foot');
      foot.replaceChild(toggle, foot.firstChild);
    }

    /* Without hover there is no way to reveal the labels, so on touch the logo
       toggles the rail open instead of navigating. */
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      rail.querySelector('.dls-rail__logo').addEventListener('click', function (e) {
        if (!rail.classList.contains('is-open')) {
          e.preventDefault();
          rail.classList.add('is-open');
        }
      });
      document.addEventListener('click', function (e) {
        if (!rail.contains(e.target)) rail.classList.remove('is-open');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
