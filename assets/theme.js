(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* Scroll reveal */
  function initReveal(root) {
    var els = $$('.reveal:not(.is-visible)', root);
    if (reduce || !('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('is-visible'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (e, i) {
      if (e.parentElement && e.parentElement.classList.contains('grid')) e.style.setProperty('--delay', (i % 8) * 0.1 + 's');
      io.observe(e);
    });
  }

  /* Cyclic fader used by hero and testimonials */
  function fader(root, itemSel, dotSel, seconds, pauseOnHover) {
    var items = $$(itemSel, root), dots = dotSel ? $$(dotSel, root) : [], cur = 0, timer;
    if (!items.length) return;
    function show(i) {
      cur = (i + items.length) % items.length;
      items.forEach(function (el, n) { el.classList.toggle('is-active', n === cur); });
      dots.forEach(function (d, n) { d.setAttribute('aria-current', n === cur ? 'true' : 'false'); });
    }
    function start() { stop(); if (items.length > 1 && !reduce) timer = setInterval(function () { show(cur + 1); }, seconds * 1000); }
    function stop() { clearInterval(timer); }
    dots.forEach(function (d, n) { d.addEventListener('click', function () { show(n); start(); }); });
    if (pauseOnHover) { root.addEventListener('mouseenter', stop); root.addEventListener('mouseleave', start); root.addEventListener('focusin', stop); root.addEventListener('focusout', start); }
    show(0); start();
  }
  function initFaders(root) {
    $$('[data-hero]', root).forEach(function (h) {
      var dur = parseFloat(h.dataset.seconds) || 6, fade = parseFloat(h.dataset.fade) || 2;
      h.style.setProperty('--dur', dur + 's'); h.style.setProperty('--fade', fade + 's');
      fader(h, '.hero__slide', '.hero__dot', dur + fade, true);
    });
    $$('[data-testimonials]', root).forEach(function (t) {
      fader(t, '.testimonial', null, parseFloat(t.dataset.seconds) || 7, true);
    });
  }

  /* Header */
  var header = $('.site-header');
  if (header) window.addEventListener('scroll', function () { header.classList.toggle('is-stuck', window.scrollY > 10); }, { passive: true });
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-toggle]');
    if (t) {
      var target = document.getElementById(t.dataset.toggle);
      if (target) { var open = target.classList.toggle('is-open'); t.setAttribute('aria-expanded', open); if (open) { var i = $('input', target); if (i) i.focus(); } }
    }
    if (e.target.closest('[data-cart-open]')) { e.preventDefault(); openCart(); }
    if (e.target.closest('[data-cart-close]')) closeCart();
  });

  /* Cart drawer */
  var drawer = $('#CartDrawer');
  function openCart() { document.documentElement.classList.add('drawer-open'); if (drawer) { drawer.setAttribute('aria-hidden', 'false'); var c = $('[data-cart-close]', drawer); if (c) c.focus(); } }
  function closeCart() { document.documentElement.classList.remove('drawer-open'); if (drawer) drawer.setAttribute('aria-hidden', 'true'); }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeCart(); });

  function refreshCart() {
    return fetch('/?sections=cart-drawer').then(function (r) { return r.json(); }).then(function (d) {
      var html = new DOMParser().parseFromString(d['cart-drawer'] || '', 'text/html');
      var nb = html.body.firstElementChild, cur = $('#shopify-section-cart-drawer');
      if (nb && cur) cur.innerHTML = nb.innerHTML;
      return fetch('/cart.js').then(function (r) { return r.json(); });
    }).then(function (cart) {
      $$('[data-cart-count]').forEach(function (c) { c.textContent = cart.item_count; c.hidden = cart.item_count === 0; });
    });
  }
  function cartChange(line, qty) {
    return fetch('/cart/change.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ line: line, quantity: qty }) }).then(refreshCart);
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-line-qty]');
    if (b) { e.preventDefault(); cartChange(parseInt(b.dataset.line, 10), parseInt(b.dataset.lineQty, 10)); }
  });
  document.addEventListener('change', function (e) {
    if (e.target.matches('[data-line-input]')) cartChange(parseInt(e.target.dataset.line, 10), parseInt(e.target.value, 10) || 0);
  });

  document.addEventListener('submit', function (e) {
    var f = e.target.closest('form[data-ajax-cart]');
    if (!f) return;
    e.preventDefault();
    var btn = $('[type=submit]', f); if (btn) btn.disabled = true;
    fetch('/cart/add.js', { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } })
      .then(function (r) { if (!r.ok) throw new Error(); return r.json(); })
      .then(refreshCart).then(openCart)
      .catch(function () { f.submit(); })
      .then(function () { if (btn) btn.disabled = false; });
  });

  /* Quantity steppers */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-qty-step]');
    if (!b) return;
    var inp = $('input', b.parentElement), v = (parseInt(inp.value, 10) || 1) + parseInt(b.dataset.qtyStep, 10);
    inp.value = Math.max(1, v);
  });

  /* Gallery */
  $$('[data-gallery]').forEach(function (g) {
    var main = $('[data-gallery-main]', g), imgs = $$('img', main), thumbs = $$('.gallery__thumb', g);
    function show(i) { imgs.forEach(function (im, n) { im.classList.toggle('is-active', n === i); }); thumbs.forEach(function (t, n) { t.setAttribute('aria-current', n === i ? 'true' : 'false'); }); main.classList.remove('is-zoom'); }
    thumbs.forEach(function (t, n) { t.addEventListener('click', function () { show(n); }); });
    main.addEventListener('click', function () { main.classList.toggle('is-zoom'); });
    main.addEventListener('mousemove', function (e) {
      if (!main.classList.contains('is-zoom')) return;
      var r = main.getBoundingClientRect();
      imgs.forEach(function (im) { im.style.transformOrigin = ((e.clientX - r.left) / r.width * 100) + '% ' + ((e.clientY - r.top) / r.height * 100) + '%'; });
    });
    show(0);
  });

  /* Variants */
  $$('[data-product-form]').forEach(function (f) {
    var data = JSON.parse($('[data-variants]', f).textContent), idInput = $('[name=id]', f), priceEl = $('[data-price]'), btn = $('[data-atc]', f);
    var stickyPrice = $('[data-sticky-price]');
    function update() {
      var opts = $$('[data-option]:checked', f).map(function (r) { return r.value; });
      var v = data.filter(function (x) { return x.options.join('|') === opts.join('|'); })[0];
      if (!v) { btn.disabled = true; return; }
      idInput.value = v.id; btn.disabled = !v.available;
      btn.textContent = v.available ? btn.dataset.add : btn.dataset.soldout;
      if (priceEl) priceEl.textContent = v.price_formatted;
      if (stickyPrice) stickyPrice.textContent = v.price_formatted;
      history.replaceState(null, '', '?variant=' + v.id);
    }
    f.addEventListener('change', function (e) { if (e.target.matches('[data-option]')) update(); });
  });

  /* Accordion with smooth open/close */
  $$('.accordion details').forEach(function (d) {
    var s = $('summary', d);
    if (d.open) d.classList.add('is-open');
    s.addEventListener('click', function (e) {
      e.preventDefault();
      if (d.open) { d.classList.remove('is-open'); setTimeout(function () { d.open = false; }, reduce ? 0 : 400); }
      else { d.open = true; requestAnimationFrame(function () { requestAnimationFrame(function () { d.classList.add('is-open'); }); }); }
    });
  });

  /* Sticky add to cart */
  var sticky = $('[data-sticky-atc]'), anchor = $('[data-atc]');
  if (sticky && anchor && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { sticky.classList.toggle('is-visible', !en[0].isIntersecting && en[0].boundingClientRect.top < 0); }).observe(anchor);
    var sb = $('[data-sticky-btn]', sticky); if (sb) sb.addEventListener('click', function () { anchor.click(); });
  }

  function init(root) { initReveal(root); initFaders(root); }
  init(document);
  document.addEventListener('shopify:section:load', function (e) { init(e.target); });
})();
