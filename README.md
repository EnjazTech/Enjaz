# ENJAZ — Tech Services website

Marketing site for ENJAZ, in two fully-rendered locales: Arabic (RTL, the default,
at `/`) and English (LTR, at `/en/`). The page is a scroll-driven three.js film
called **The Paper Trail**: one sheet of fanfold paper followed in a single shot
from a messy desk at 03:12 to the same desk at dawn.

All copy stays real, selectable HTML over an opaque WebGL canvas. With scripting
blocked the page renders as a plain document, and visitors who cannot or should
not run the film get still images instead.

The deploy is still a plain copy of the checkout: the film is built ahead of time
and its output is committed. **If you change anything in `src/experience/`, run the
build and commit `assets/js/experience/`**, or the deploy will refuse to run.

## Layout

```
index.html              Arabic document (default, x-default)
en/index.html           English document
404.html                Bilingual not-found page, CSS only
robots.txt              Crawl policy + sitemap pointer
sitemap.xml             Both locales with hreflang alternates
site.webmanifest        PWA/installability metadata
vercel.json             Headers and redirects for Vercel; the test server reads its CSP
assets/css/main.css     Single stylesheet; section 17 is the film's layout
assets/js/locale.js     Locale routing and the layout gate (sync in <head>)
assets/js/main.js       UI behaviour, and what loads the film (deferred module)
assets/js/experience/   The built film. Generated: do not edit
assets/img/world/v1/    20 still frames rendered from the film. Generated
assets/img/             Icons, Open Graph cover, the caption scrim
src/experience/         The film's source. Not deployed
```

## Hosting requirements

- **Serve from the domain root.** Internal links and the locale router use
  root-absolute paths (`/`, `/en/`, `/assets/...`).
- **Map 404s to `404.html`** (for nginx: `error_page 404 /404.html;`).
- **Keep the Content-Security-Policy.** Nothing here needs a new origin. It is why
  three.js is bundled rather than loaded from a CDN, and why nothing uses workers,
  WASM or inline scripts at runtime.
- `deploy.yml` publishes `main` by rsync on every push, excluding `src/`. Before
  publishing it rebuilds the film and fails if the committed bundle is stale or over
  its byte budget.

Local preview, with the production CSP enforced:

```sh
node src/experience/tests/server.mjs --port=8000   # http://127.0.0.1:8000
```

## The film

`locale.js` picks the mode before first paint by setting a class on `<html>`:

| Class | Who | What they get |
|---|---|---|
| none | Scripting blocked | The plain page, plus the WhatsApp dock on small screens |
| `.w3d` | Capable devices | Tall layout, a still as poster, then the film at "lamp-on" |
| `.stills` | Reduced motion, weak or unsupported devices, forced colours | Compact layout with a still behind each section |
| `.stills.save` | Save-Data or a slow connection | The same, loading stills only as they come near |

`boot.js` imports no three, so a device that fails its GPU check never downloads the
film. After the lamp comes on, a runtime governor steps quality down one rung at a
time, and rendering stops entirely while the visitor is reading. If the WebGL context
is lost the canvas is hidden at once and the nearest still takes over. If it comes
back, so does the film. A failed stale chunk or a bad benchmark falls back the same way.

**No frame rate has been measured on a real phone.** The acceptance suite runs on
software GL, which proves correctness and says nothing about speed. The one real GPU
tried so far is a laptop's Intel Iris Xe: Tier M, 60 fps scrubbing at 1440x900, with no
governor steps. That says nothing about a mid-range Android. Open any page with
`?hud=1` on a real device to see frame times, tier, draws and triangles, and use
`?tier=L`, `M`, `H` or `stills` to force a tier. Neither is stored.

### Working on it

```sh
cd src/experience
npm ci
npm run build                  # Regenerates assets/js/experience/. Commit the result
npm test                       # The acceptance suite. --  --only=D,E7 runs a subset
npm run contact -- --shots=hero,cta --tier=L --locales=ar --sizes=390x844
                               # Screenshots each shot into test-results/contact/
npm run stills                 # Regenerates the stills. Bump v1 in main.css and the tool
npm run wordmark               # Reshapes إنجاز from the real font with HarfBuzz
```

Start with `src/experience/SPEC.md`, which is the design, and `world.js`, whose header
describes what a shot module is. Everything scroll-related is a pure function of the
scroll position, so reverse scroll and anchor jumps are correct by construction. Story
state that an anchor jump could skip lives in `world.js`, not in shots. Every material
is a `RawShaderMaterial`: `build.mjs` blanks three's own GLSL to save 34 KB, which ties
the build to three's internals, so its version is pinned and upgrading means rerunning
the suite.

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

That last restriction matters: someone landing on `/en/` from search or a shared
link is never bounced out of English, and the x-default URL stays the single
entry point for automatic detection. The script loads synchronously in `<head>`
so any redirect happens before first paint.

The toggle is a plain `<a href="/en/">` — it works with scripting disabled;
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

- Content is **visible by default** and never drawn in WebGL. The canvas sits under
  the DOM with `pointer-events: none`, so text is selectable, find-in-page and anchors
  work, and scrolling stays native. There are no wheel listeners and no scroll-snap.
- `prefers-reduced-motion: reduce` gets still images and no film download. The
  blackout stays under 2 flashes a second, and rolls and FOV kicks are capped.
- Reading order, headings and landmarks match the plain page. The canvas and the
  caption-less spacers are `aria-hidden`, and the only added tab stop is the dock, last.
- Every caption sits on a scrim that holds at least 4.5:1 over any frame. In the tall
  layout a WhatsApp link is visible and tappable at every scroll position.
- Skip link, one `<h1>` per page, `aria-labelledby` on every section,
  `aria-expanded`/`aria-controls` on the menu button, visible `:focus-visible` rings.

## SEO checklist (implemented)

Per-locale `<title>` and meta description · self-referencing canonicals ·
reciprocal `hreflang` on both documents plus a shared `x-default` · Open Graph
and Twitter card with a 1200×630 cover · `schema.org` JSON-LD `@graph`
(`ProfessionalService` with `hasOfferCatalog`, `WebSite`, `WebPage`, shared
`@id` across locales) · `sitemap.xml` with `xhtml:link` alternates ·
`robots.txt` · `noindex` on 404 · semantic landmarks · descriptive link text.

## Verification

`npm test --prefix src/experience` runs in headless Chromium on software GL, against
the real CSP. It compares the JS-blocked page element by element with `main`, and
covers the layout gate, every fallback path, anchors, keyboard order, contrast,
budgets at every tier, RTL mirroring, context loss and restore, and the byte budget.
It has only ever run in Chromium: Safari, Firefox and in-app browsers are untested.
