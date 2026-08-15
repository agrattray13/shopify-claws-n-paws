# Paws & Claws — Phase 1: Premium Functional Header

This phase replaces the minimal Shopify Skeleton `sections/header.liquid` with a production-oriented header.

## Implemented functionality

- Sticky announcement + header shell
- Theme-editor logo, colors, menu, shipping threshold
- Desktop navigation driven entirely by Shopify Navigation
- Native three-level menu support
- Full-width mega menus
- Optional image promo tile per top-level mega menu
- Functional search drawer with a standard Shopify search form
- Predictive search powered by Shopify's `/search/suggest.json` Ajax endpoint
- Customer account link when accounts are enabled
- Live cart drawer powered by `/cart.js` and `/cart/change.js`
- Cart quantity increase/decrease/remove
- Live cart count and subtotal
- Functional Shopify checkout POST
- Free-shipping progress indicator
- Mobile off-canvas navigation with nested accordions
- Escape, backdrop, and explicit close controls
- Reduced-motion support
- No fake CTA buttons or `#` placeholder links

## Shopify admin setup

1. Assign the store's main navigation to **Header → Main menu**.
2. Use top-level items such as Dogs, Cats, New Arrivals, Best Sellers, Shop All, About, Contact.
3. Add child and grandchild links in Shopify Navigation to populate mega-menu columns.
4. Optional: add `Mega menu promo` blocks and set `Parent menu title` to the exact top-level label (for example `Dogs`). Promo tiles only render when a real link is configured.
5. Set the free-shipping goal to match the store's real shipping policy; set it to 0 to hide the progress bar.

## Functional-link policy

Navigation links come from Shopify menus, account/search/cart URLs come from Shopify route objects, and promo tiles only render as links when the merchant has configured a URL. There are no placeholder `#` destinations.
