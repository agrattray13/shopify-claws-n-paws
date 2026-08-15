# Paws & Claws Premium Shopify Build — Manifest

## Target repository
`agrattray13/shopify-claws-n-paws`

## Base foundation
Copilot PR #1: `copilot/build-shopify-theme-foundation`

The premium layer in this package is designed to sit on top of that foundation after the PR is merged or on a branch created from the PR head.

## Non-negotiable build rule
Every visible link or control has a real destination/action. Optional CTAs are hidden until a real Shopify collection, page, menu, or URL is configured. No `href="#"` placeholders are used.

## Phase 1 — Header & navigation
- `sections/header.liquid`
- Sticky responsive header
- Shopify menu-driven desktop navigation
- Three-level mega menus
- Optional real promo tiles
- Mobile nested navigation
- Predictive search drawer
- AJAX cart drawer
- Live cart count/subtotal
- Quantity/remove controls
- Free-shipping progress indicator
- Customer account route
- Keyboard / Escape behavior

## Phase 2 — Premium homepage
- `sections/pc-hero.liquid`
- `sections/pc-shop-by-pet.liquid`
- `sections/pc-category-grid.liquid`
- `sections/pc-featured-products.liquid`
- `sections/pc-product-marquee.liquid`
- `sections/pc-editorial-split.liquid`
- `sections/pc-trust.liquid`
- `sections/pc-newsletter.liquid`
- `snippets/pc-product-card.liquid`
- `assets/pc-product-cards.css`
- `templates/index.json`

Homepage contains nine major sections and is intentionally substantial without becoming oversized.

## Phase 3 — Product & cart experience
- `sections/product.liquid`
- `sections/pc-product-recommendations.liquid`
- `templates/product.json`
- `sections/cart.liquid`
- `templates/cart.json`

Includes product gallery, variants, quantity controls, AJAX add-to-cart, accelerated checkout preservation, related products, full cart editing, cart notes, discounts, and checkout.

## Phase 4 — Collections & discovery
- `sections/collection.liquid`
- `templates/collection.json`
- `sections/search.liquid`
- `templates/search.json`

Includes Shopify-native filters, price range, sort, active filter chips, mobile filter drawer, pagination, and real search results.

## Phase 5 — Pages & footer
- `sections/pc-about.liquid`
- `sections/pc-contact.liquid`
- `sections/pc-faq.liquid`
- `templates/page.about.json`
- `templates/page.contact.json`
- `templates/page.faq.json`
- `sections/footer.liquid`
- `sections/footer-group.json`

Footer includes real menus, configured policies, newsletter, social links only when configured, payment icons, contact links, ticker, and Arthur's Creatives credit.

## Phase 6 — Enhancement layer already included
- AJAX cart drawer
- Predictive search
- Quick add for simple products
- Product recommendations
- Mega menus
- Promo tiles
- Free-shipping progress
- Mobile navigation and filters
- Moving product rail with pause control
- Animated footer ticker
- Reduced-motion support
- Responsive layouts

## Required integration changes to Copilot foundation
See `COPILOT-INTEGRATION.md` before applying the package.
