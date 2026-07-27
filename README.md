# ENJAZ — Tech Services website

Static, dependency-free marketing site built from the Claude Design source
`Enjaz.dc.html`. Two fully-rendered locales, English (LTR) and Arabic (RTL),
with device-based language routing and complete on-page SEO.

No build step, no framework, no npm install — deploy the directory as-is.

## Layout

```
index.html            English document (x-default)
ar/index.html         Arabic document (RTL)
404.html              Bilingual not-found page
robots.txt            Crawl policy + sitemap pointer
sitemap.xml           Both locales with hreflang alternates
site.webmanifest      PWA/installability metadata
assets/css/main.css   Single stylesheet, tokens + logical properties
assets/js/locale.js   Locale routing (loads sync in <head>)
assets/js/main.js     UI behaviour (deferred ES module)
assets/img/           Icons + Open Graph cover
```

## Before you deploy — required find & replace

Every absolute URL uses the placeholder **`https://enjaz-tech.com`**. Replace it
with the real domain across canonicals, hreflang, Open Graph, JSON-LD, the
sitemap and robots.txt:

```sh
grep -rl 'enjaz-tech\.com' . | xargs sed -i 's|https://enjaz-tech\.com|https://YOUR-DOMAIN|g'
```

Then verify nothing was missed:

```sh
grep -rn 'enjaz-tech\.com' . || echo 'all placeholders replaced'
```

Also update `<lastmod>` in `sitemap.xml` when content changes.

## Hosting requirements

- **Serve from the domain root.** Internal links and the locale router use
  root-absolute paths (`/`, `/ar/`, `/assets/...`). Hosting under a subpath
  requires rewriting those prefixes.
- **Map 404s to `404.html`** (Netlify/Vercel/GitHub Pages do this automatically;
  for nginx use `error_page 404 /404.html;`).
- No server-side language negotiation is needed — routing is client-side by
  design, so the site works on any static host.

Local preview:

```sh
python3 -m http.server 8000    # then open http://127.0.0.1:8000
```

## How localization works

Each language is a **real, separately crawlable document** — content is never
swapped by JavaScript, so both locales index normally. `assets/js/locale.js`
only decides which document a visitor should see, in this precedence order:

1. **`?lang=en` / `?lang=ar`** in the URL — wins and is remembered, then the
   query string is stripped via `history.replaceState`.
2. **A remembered choice** (`localStorage['enjaz:lang']`) — set whenever the
   visitor uses the language toggle.
3. **Device language** (`navigator.languages`) — applied **only** on the
   default-language document (`/`).

That last restriction matters: someone landing on `/ar/` from search or a shared
link is never bounced out of Arabic, and the x-default URL stays the single
entry point for automatic detection. The script loads synchronously in `<head>`
so any redirect happens before first paint.

The toggle is a plain `<a href="/ar/">` — it works with scripting disabled;
JavaScript only adds the persistence.

### Adding a third locale

1. Copy `index.html` to `<lang>/index.html`; translate content, set `lang` and
   `dir` on `<html>`.
2. Add reciprocal `hreflang` links to **every** locale (each document must list
   all locales including itself, with one shared `x-default`).
3. In `assets/js/locale.js`, add the code to `SUPPORTED` and extend `pathFor()`
   with the new prefix.
4. Add the URL to `sitemap.xml`.
5. If the script is non-Latin, add a `:root:lang(<code>)` block in `main.css`
   overriding `--font-body`, `--leading-heading` and `--tracking-heading`.

## Styling notes

One stylesheet serves both directions. RTL needs no separate file because
layout uses **CSS logical properties** (`margin-inline`, `inset-inline-start`,
`border-inline-end`) rather than physical left/right.

Arabic overrides live in a single `:root:lang(ar)` block. Noto Kufi Arabic has
much taller ascenders and deeper descenders than Space Grotesk, so the
Latin-tuned heading leading, negative letter-spacing and display sizes are all
relaxed there — without it, Arabic headline lines collide.

Design tokens (colour, type scale, spacing, radii, motion) are custom properties
at the top of `main.css`. Change a value once to retheme.

## Accessibility and progressive enhancement

- Content is **visible by default**. Scroll-reveal is opt-in: `locale.js` adds
  `.js` to `<html>`, and only then does CSS hide `.reveal` elements. If the
  script is blocked or fails, the whole page still renders.
- `prefers-reduced-motion: reduce` disables the particle canvas, pointer glow,
  drifting orbs and marquee, and renders one static typewriter phrase.
- Skip link, one `<h1>` per page, `aria-labelledby` on every section,
  `aria-expanded`/`aria-controls` on the menu button, decorative layers marked
  `aria-hidden`, visible `:focus-visible` rings.
- Mobile menu closes on link activation, outside click, `Escape`, and when the
  viewport leaves the mobile breakpoint.
- Particle canvas and pointer glow are suppressed on coarse-pointer/small
  screens, so phones don't pay for desktop-only decoration.

## SEO checklist (implemented)

Per-locale `<title>` and meta description · self-referencing canonicals ·
reciprocal `hreflang` on both documents plus a shared `x-default` · Open Graph
and Twitter card with a 1200×630 cover · `schema.org` JSON-LD `@graph`
(`ProfessionalService` with `hasOfferCatalog`, `WebSite`, `WebPage`, shared
`@id` across locales) · `sitemap.xml` with `xhtml:link` alternates ·
`robots.txt` · `noindex` on 404 · semantic landmarks · descriptive link text.

### Worth adding next

- Replace the placeholder domain (above) — nothing else is blocking.
- Self-host the fonts to drop two third-party preconnects and remove a
  render-blocking request from the critical path.
- Add real `sameAs` social profiles to the JSON-LD `ProfessionalService`.
- Consider `Content-Security-Policy` and long-lived `Cache-Control` on
  `assets/` at the CDN/host level.

## Verification performed

Checked in a real headless Chrome (1440×900 desktop and 390×844 mobile, both
locales): full-page renders, RTL mirroring, mobile drawer open state, zero
console errors, zero failed requests. Locale routing exercised end to end —
`?lang=` override, persistence, stored-preference redirects in both directions,
and no redirect away from `/ar/` on an English device. Reduced-motion and
scripts-fully-removed paths both confirmed to render all content. HTML tag
balance, JSON-LD parsing, hreflang reciprocity, canonical self-reference, CSS
custom-property definedness and local asset resolution are all validated.
