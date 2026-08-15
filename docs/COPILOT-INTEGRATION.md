# Copilot Foundation Integration

Base: PR #1 in `agrattray13/shopify-claws-n-paws` (`copilot/build-shopify-theme-foundation`).

## 1. Apply this overlay
Copy the files in this package onto a branch created from the Copilot PR head (or from `main` after PR #1 is merged).

## 2. Remove conflicting old templates
The Copilot foundation created old-style Liquid templates. The premium build replaces these with JSON templates and modular sections. Delete these files when applying the premium layer:

- `templates/product.liquid`
- `templates/collection.liquid`
- `templates/cart.liquid`
- `templates/search.liquid`
- `templates/page.about.liquid`
- `templates/page.contact.liquid`
- `templates/page.faq.liquid`

Keep `templates/page.liquid` as the generic page fallback.
Keep customer-account templates unless intentionally replacing them.

## 3. Update `layout/theme.liquid`
The premium header contains its own announcement, mobile navigation, predictive search, and AJAX cart drawer. To avoid duplicate UI, remove these old Copilot foundation calls:

```liquid
{%- if settings.show_announcement -%}
  {% section 'announcement-bar' %}
{%- endif -%}
```

and:

```liquid
{%- render 'cart-drawer' -%}
{%- render 'mobile-nav' -%}
{%- render 'search-overlay' -%}
```

Keep:

```liquid
{% section 'header' %}
<main id="main-content" role="main" tabindex="-1">
  {{ content_for_layout }}
</main>
{% section 'footer' %}
```

Add the premium product-card stylesheet after the base stylesheet:

```liquid
{{ 'theme.css' | asset_url | stylesheet_tag }}
{{ 'pc-product-cards.css' | asset_url | stylesheet_tag }}
```

The existing `theme.js` may remain; its old drawer selectors simply have nothing to bind to after the obsolete snippets are removed. It can be cleaned up in a later optimization pass.

## 4. Theme Editor configuration after upload
Assign real Shopify resources before launch:

- Primary header menu
- Footer menus
- Dogs and Cats collections
- Category collections
- Featured / New Arrivals / Best Sellers collections
- Hero CTA links
- Editorial CTA collections/links
- Any mega-menu promo tile links
- Social URLs
- Shipping/refund/privacy/terms policies in Shopify settings

Optional CTAs/cards do not render when no real resource is configured, preventing dead buttons.

## 5. Launch validation
Before publishing:

1. Run Shopify Theme Check / Shopify CLI validation in the actual repo.
2. Preview the theme against a development store.
3. Test desktop and mobile menus.
4. Test predictive search.
5. Add/remove/update cart items.
6. Test variants and accelerated checkout.
7. Test filters and sorting.
8. Test contact/newsletter submissions.
9. Click every menu/footer CTA after real resources are assigned.
10. Confirm policies and customer-account behavior for the store's configured account system.
