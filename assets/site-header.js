/* Site header behaviour — shared by every page (each page keeps its own header look).
   Adds .is-scrolled once the home hero photo (#slides) has scrolled past, or after a short scroll on
   pages without one; each page's CSS decides what that looks like.
   The globe opens the language menu; a click outside, Escape or picking a language closes it. */
(function () {
  'use strict';
  var nav = document.getElementById('nav');
  if (!nav) return;

  var hero = document.getElementById('slides'), ticking = false;
  function update() {
    ticking = false;
    nav.classList.toggle('is-scrolled', hero ? hero.getBoundingClientRect().bottom < nav.offsetHeight : (window.scrollY || window.pageYOffset) > 8);
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener('resize', update);
  update();

  var lang = document.getElementById('lang');
  if (!lang) return;
  var btn = lang.querySelector('.lang-btn');
  function setOpen(open) { lang.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', open ? 'true' : 'false'); }
  btn.addEventListener('click', function (e) { e.stopPropagation(); setOpen(!lang.classList.contains('is-open')); });
  document.addEventListener('click', function (e) { if (!lang.contains(e.target)) setOpen(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lang.classList.contains('is-open')) { setOpen(false); btn.focus(); }
  });
})();
