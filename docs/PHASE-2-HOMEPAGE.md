# Paws & Claws — Phase 2: Premium Homepage System

## Homepage architecture

1. Premium hero
2. Shop by Pet
3. Shop by Category
4. Featured Products
5. Moving Product Showcase
6. Dog editorial story
7. Cat editorial story
8. Trust / Why Paws & Claws
9. Functional Shopify newsletter

This intentionally targets a substantial premium homepage without making it as long as the largest prior store builds.

## Functional-link policy

- Hero CTAs only render when a real URL is assigned.
- Pet cards only show a shop CTA when a real Shopify collection is selected.
- Category cards only render when backed by a real Shopify collection.
- Featured and moving product sections only output real Shopify products from selected collections.
- Product cards use real product URLs.
- Simple single-variant products get a real Shopify product form for Add to Cart.
- Multi-variant products use a real Choose Options link instead of pretending a variant has been selected.
- Editorial CTA renders only when a real collection or custom URL is configured.
- Newsletter uses Shopify's native customer form.

## Store setup still required

Content that depends on the actual product catalog must be connected in the Theme Editor after the relevant Shopify collections exist. Until then, links/buttons that would otherwise be false are intentionally omitted.
