# Claws & Paws Premium – Shopify Online Store 2.0 theme

Warm, premium pet-supplies theme: circular floating product cards, crossfading Ken Burns hero slideshow, slide-out cart drawer. Plain CSS + vanilla JS, no apps.

## Connect to Shopify
This theme lives in the `premium-theme/` folder of the repo. Shopify's GitHub integration expects theme files at the repo root, so either:
- move/copy the contents of `premium-theme/` to the root of a dedicated branch (e.g. `premium-theme`) and connect that branch, or
- zip `premium-theme/` and upload via Online Store → Themes → Add theme → Upload zip.

Then: Online Store → Themes → Add theme → Connect from GitHub → pick the repo/branch. Publish when ready; your other theme stays in the library.

## Where to edit
- **Colors**: Theme editor → Theme settings → Colors (`config/settings_schema.json`, exposed as CSS variables in `snippets/css-variables.liquid`).
- **Fonts / page width / idle card float / ratings**: Theme settings → Typography, Product cards.
- **Hero slideshow timing**: Home page → Hero slideshow → *Seconds per slide*, *Fade length*, *Height*. Add 3–5 slides as blocks. Pauses on hover/focus.
- **Sections**: every section in `sections/` has schema settings for images, text and links; home page is `templates/index.json`.
- **Contact page**: `page.contact` template, uses Shopify's native contact form. **About page**: `page.about` template. Assign templates when editing a Page.
- **Animations**: `assets/theme.css` (transitions, `prefers-reduced-motion`), `assets/theme.js` (IntersectionObserver reveal, slideshow, cart drawer).
- **Product ratings** read from the standard `reviews.rating` metafield (Shopify Product Reviews).
