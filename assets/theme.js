/* ============================================
   Paws & Claws — Theme JavaScript
   ============================================ */

(function () {
  'use strict';

  /* ---- Mobile Navigation ---- */
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav    = document.querySelector('.mobile-nav');
  const mobileNavClose = document.querySelector('.mobile-nav__close');
  const mobileNavOverlay = document.querySelector('.mobile-nav__overlay');

  function openMobileNav() {
    mobileNav && mobileNav.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav && mobileNav.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  mobileToggle && mobileToggle.addEventListener('click', openMobileNav);
  mobileNavClose && mobileNavClose.addEventListener('click', closeMobileNav);
  mobileNavOverlay && mobileNavOverlay.addEventListener('click', closeMobileNav);

  /* ---- Search Overlay ---- */
  const searchToggles = document.querySelectorAll('.search-toggle');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchClose   = document.querySelector('.search-overlay__close');
  const searchInput   = document.querySelector('.search-overlay__input');

  function openSearch() {
    searchOverlay && searchOverlay.classList.add('is-open');
    setTimeout(() => searchInput && searchInput.focus(), 50);
    document.body.style.overflow = 'hidden';
  }

  function closeSearch() {
    searchOverlay && searchOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  searchToggles.forEach(btn => btn.addEventListener('click', openSearch));
  searchClose && searchClose.addEventListener('click', closeSearch);

  searchOverlay && searchOverlay.addEventListener('click', function(e) {
    if (e.target === searchOverlay) closeSearch();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { closeSearch(); closeMobileNav(); closeCartDrawer(); closeMobileFilters(); }
  });

  /* ---- Cart Drawer ---- */
  const cartDrawer        = document.querySelector('.cart-drawer');
  const cartDrawerOverlay = document.querySelector('.cart-drawer__overlay');
  const cartDrawerClose   = document.querySelector('.cart-drawer__close');
  const cartBtns          = document.querySelectorAll('.cart-toggle');

  function openCartDrawer() {
    cartDrawer && cartDrawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    cartDrawer && cartDrawer.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  cartBtns.forEach(btn => btn.addEventListener('click', openCartDrawer));
  cartDrawerClose && cartDrawerClose.addEventListener('click', closeCartDrawer);
  cartDrawerOverlay && cartDrawerOverlay.addEventListener('click', closeCartDrawer);

  /* ---- Quantity Controls ---- */
  document.addEventListener('click', function(e) {
    if (e.target.matches('.quantity-btn[data-action="increment"]')) {
      const input = e.target.closest('.quantity-wrap').querySelector('.quantity-input');
      if (input) input.value = parseInt(input.value || 1, 10) + 1;
    }
    if (e.target.matches('.quantity-btn[data-action="decrement"]')) {
      const input = e.target.closest('.quantity-wrap').querySelector('.quantity-input');
      if (input) input.value = Math.max(1, parseInt(input.value || 1, 10) - 1);
    }
    if (e.target.matches('.cart-item__qty-btn[data-action="increment"]')) {
      const valEl = e.target.closest('.cart-item__qty').querySelector('.cart-item__qty-val');
      if (valEl) valEl.textContent = parseInt(valEl.textContent, 10) + 1;
    }
    if (e.target.matches('.cart-item__qty-btn[data-action="decrement"]')) {
      const valEl = e.target.closest('.cart-item__qty').querySelector('.cart-item__qty-val');
      if (valEl) valEl.textContent = Math.max(1, parseInt(valEl.textContent, 10) - 1);
    }
  });

  /* ---- Accordion (product details, FAQ) ---- */
  document.addEventListener('click', function(e) {
    const trigger = e.target.closest('.accordion-trigger');
    if (!trigger) return;
    const item = trigger.closest('.accordion-item');
    if (!item) return;
    const isOpen = item.classList.contains('is-open');
    // Optionally close siblings
    const siblings = item.parentElement.querySelectorAll('.accordion-item.is-open');
    siblings.forEach(sib => sib !== item && sib.classList.remove('is-open'));
    item.classList.toggle('is-open', !isOpen);
  });

  /* ---- Gallery Thumbnails (product page) ---- */
  document.addEventListener('click', function(e) {
    const thumb = e.target.closest('.product-gallery__thumb');
    if (!thumb) return;
    const gallery = thumb.closest('.product-gallery');
    if (!gallery) return;
    const mainImg = gallery.querySelector('.product-gallery__main img');
    if (!mainImg) return;
    const thumbImg = thumb.querySelector('img');
    const src = thumbImg && thumbImg.src;
    if (src) mainImg.src = src;
    gallery.querySelectorAll('.product-gallery__thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
  });

  /* ---- Variant Selection (product page) ---- */
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('.variant-btn');
    if (!btn) return;
    const group = btn.closest('.variant-options');
    if (!group) return;
    group.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });

  /* ---- Mobile Filters Drawer ---- */
  const mobileFiltersToggle  = document.querySelector('.mobile-filters-toggle');
  const mobileFilters        = document.querySelector('.mobile-filters');
  const mobileFiltersClose   = document.querySelector('.mobile-filters__close');
  const mobileFiltersOverlay = document.querySelector('.mobile-filters__overlay');

  function openMobileFilters() {
    mobileFilters && mobileFilters.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileFilters() {
    mobileFilters && mobileFilters.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  mobileFiltersToggle && mobileFiltersToggle.addEventListener('click', openMobileFilters);
  mobileFiltersClose && mobileFiltersClose.addEventListener('click', closeMobileFilters);
  mobileFiltersOverlay && mobileFiltersOverlay.addEventListener('click', closeMobileFilters);

  /* ---- Announcement Bar Close ---- */
  const announcementClose = document.querySelector('.announcement-bar__close');
  announcementClose && announcementClose.addEventListener('click', function() {
    const bar = document.querySelector('.announcement-bar');
    bar && bar.remove();
  });

})();
