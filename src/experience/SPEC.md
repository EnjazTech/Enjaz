# The Paper Trail: final implementation contract

Branch: `feature/3d-experience`. Do not merge to `main`, because `deploy.yml` publishes on every push to `main`. No visible copy changes. Where this document conflicts with a concept, this document wins.

Nothing in this document has been built yet. Statements marked **measured** were run in Playwright Chromium build 1148 against a scratch copy of the site (Section 14). Frame rates and GPU numbers on real phones are **targets, not measurements**.

## Amendments (these override anything below)

Decided by the lead after reading the contract.

1. **No new CI workflow.** Do not add `.github/workflows/experience-checks.yml`. `deploy.yml` gets the rsync excludes plus the drift and size guard before rsync, and nothing else. Set `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` on its `npm ci`. The acceptance suite runs locally with `npm test --prefix src/experience`.
2. **Playwright is pinned at exactly `1.49.0`.** Chromium build 1148 for that version is already cached in `~/.cache/ms-playwright`. Never download browsers.
3. **Vertex-only program hook.** The six fragment programs stay fixed, but the rule in Section 1.3 that "shots may not add shader source" is relaxed for vertex behaviour, because several shots need their own (hinges, vortex, crumple, cams, iris, clear). A factory takes `ctx.programs.paper({ deform, uniforms, defines })`. `deform` is a GLSL snippet spliced at one marked hook in the vertex shader, and `uniforms` are its own. `defines` may only enable fragment features the program documents (for example `FACET`, the crumple's derivative normals). Every variant compiles inside `build()` through `renderer.compileAsync`, never mid-flight. At most 16 compiled programs may exist at once, and E2 asserts this through `renderer.info.programs.length`. The 30 ALU and 2 fetch fragment limits still apply.
4. **Boot API.** `boot.js` exports `async function boot({ onFail, onOff })`. `main.js` calls it after `import('/assets/js/experience/boot.js')`. `onFail(reason)` is `collapseToStills`, and `onOff(reason)` is `worldOff`. Both are called at most once per cause.
5. **Workstream order changes.** WS 1 runs first and also creates `src/experience/package.json`, its lockfile, `tests/server.mjs` and `tests/helpers.mjs`. WS 0 runs second against the real DOM. Everything else in Section 5.3 stands.
6. **Test server.** `tests/server.mjs` takes `--port` and `--experience-dir`, the latter serving `/assets/js/experience/` from another folder, so parallel work can test its own build.
7. **Generated test output** goes in `src/experience/test-results/`, which is gitignored. Do not write screenshots or reports anywhere else in the repo.
8. **Authoring rule for shots.** Every `*.meta.js` budget in Section 4 is a ceiling, not a target. Silhouette and light matter more than triangle count. Avoid anything that reads as programmer art: a prop must be recognisable as its real-world object from its outline alone at its shot's camera distance.

## 0. Decisions at a glance

| Question | Decision |
|---|---|
| Concept | One sheet of fanfold paper, never cut, followed in one continuous shot from a messy desk at 03:12 to the same desk at dawn |
| Compositing | Opaque WebGL canvas, `position:fixed`, under the DOM. DOM text is never drawn in GL and never transformed |
| Pinning | CSS `position:sticky` only. No JS writes a position. No wheel listeners, no scroll-snap |
| Layout gate | `html.w3d` or `html.stills`, set synchronously in `locale.js` before first paint. No class means today's page |
| three | Yes, `0.187.0` exact, tree-shaken, unused GLSL stubbed |
| esbuild | Yes, 0.28, dev only, output committed |
| gsap | **No** |
| lenis | **No** |
| Other dev-only tools | `harfbuzzjs`, `wawoff2`, `playwright`. None ship |
| Bytes | About 175 KB gzip -6 in total (three 116, own code about 59). CI hard gate 200 KB |
| Tier L budget | 0.55 MP, at most 28 draws, at most 70k triangles, 60 fps target |
| Page length | 19.6 screens at 390x844 and 17.8 at 1440x900 (today 5.9 and 3.9) |

## 1. Narrative and visual language

### 1.1 The story

Apart from the closing pull-back, the camera only moves down, which is the direction the page moves when you scroll.

- **Act I, 03:12 (hero, ticker).** A small-business desk at night: invoices, dossiers, a ringing landline, coffee rings, a dot-matrix printer still printing. Its green-bar paper runs across the desk and over the edge. As you scroll, the phone shakes itself off the hook. You follow the paper off the desk, past the service names printed on it, and through a hole in the floor that years of paperwork have torn.
- **Act II, the archive (services).** Below is everything ever filed: a concrete atrium many floors deep, walled with paper, a small mint mark far below. The strip falls down the centre through six machines, one per service. Each turns paper into something that works. The building gets cleaner with depth. At Rescue the power fails across the whole building, then comes back. After Automation the paper has narrowed into one mint line.
- **Act III, the line (process).** The line reaches the إنجاز wordmark, 8 m wide, lying flat across the shaft. It fills from right to left in both locales, and as it fills **the whole building turns over**: every box file rotates 180 degrees in reading direction, from cardboard to graphite with a mint hairline. The back of the paper is software. The camera threads the natural gap between ا and ز and goes down four clean floors: Talk (the handset's cord joins the line, so paper and phone calls become one thread), Scope (a wireframe phone in a ring of 48 ticks), Build (an exploded phone assembles, with three demos on the way), Ship (the phone drops through an iris on the end of the line, which stays attached).
- **Act IV, the same desk (why, CTA, footer).** You fall after the phone through a ceiling tile into the office you started in, looking straight down on the same mess, phone ringing, at the moment the heading asks "Still running on spreadsheets and phone calls?". The new phone lands. The three checklist items clear the desk ring by ring, and the second one silences the landline. The clock runs forward and the blinds lighten. What remains is a lamp, a mug, one stamped quote and one phone, at a dawn coloured by the brand gradient, with the real WhatsApp button on the phone's screen. The camera returns to the exact pose of the first frame. The first and last frames are the same shot, before and after. That comparison is the sales argument.

### 1.2 World rules

- Only things found in a back office or a building: sheets, stacks, dossiers, shelves, gantries, rollers, tubes, a printer, a lamp, a landline, a phone. Nine props are modelled in code at under 3k triangles each (printer, lamp, landline, mug, clock, phone, mangle, stamp arm, cabinet), silhouette first. Everything else is instanced.
- Local detail carries the specificity: manila dossiers tied with cotton tape, invoice books with pink carbons, right-to-left ledger sheets with Eastern Arabic numerals on `/`, a few `#REF!` and `#####` cells set in IBM Plex Mono.
- The brand is already in the old world. Computer paper has pale green bars, so the strip's bars are `#5dffde` at low strength over warm paper `#e8e4da`. That is why paper can become the mint line with no change of idea. Shaft wall ticks are the logo's three chevrons rotated to point down, fading mint .35, mint .65, solid violet.
- Scale in metres: desk 1.6 x 0.8 m. Archive 28 m square (half-width 14 m), galleries every 3.6 m, 18 wrapped floors. Machines have a subject radius of 1.1 to 1.5 m.
- Strip width is a function of arc length: 0.24 m on the desk and in the drop, jumping to 1.2 m in the black inside the slab where nothing can see it, then narrowing to 0.06 m after Automation.

### 1.3 Materials

Six `RawShaderMaterial` GLSL3 programs run the whole film. Shots may not add shader source. A new program needs review by the engine owner, because that restriction is what prevents mid-flight compile hitches.

| Program | Used for | Cost rule |
|---|---|---|
| `paper` | Sheets, stacks, hinged panels. Wrap lighting `(NdotL+.4)/1.4`, translucency `max(-NdotL,0)*.55`, ink atlas | 1 atlas fetch |
| `solid` | Instanced boxes and props. Per-instance tint, two generated 256 px matcaps (brass, graphite), vertex AO, `uTurn` flip | 1 fetch |
| `wood` | Desk top. 512 px canvas-baked grain, varnish highlight, baked shadow read, two ring SDFs, analytic gobo stripes | 2 fetches |
| `strip` | The one ribbon, paper to emissive line. Bars with `fwidth` antialiasing, painted tractor holes, atlas ink | 1 fetch |
| `glow` | Additive cards, beam cones, ripples, tube fresnel shell | 0 or 1 fetch |
| `wire` | The wireframe phone | 0 fetches |

Rules for every program:

- Shade in gamma space, so a CSS hex equals the GL colour.
- Fog is per-vertex toward `#07080c`, and the clear colour equals the page background, so there is never a visible canvas edge.
- No `discard` on opaque draws (keeps early-Z, LRZ and Forward Pixel Kill).
- No `gl_InstanceID`: instance attributes only.
- Fragment precision is `mediump`, except the one-line interleaved gradient noise dither, which takes a `highp` local.
- No varying larger than plus or minus 256 at mediump.
- At most 30 ALU and 2 texture fetches per fragment.

### 1.4 Light and colour

- **Desk:** one lamp, one depth map baked once from a fixed position, read through `sampler2DShadow`. All lamp maths is in desk-local space, so the desk group can be moved in the dark without a re-bake. The pointer moves only the cone, not the source, so baked shadows stay correct. Taps are chosen by a uniform branch, so a tier drop needs no recompile.
- **Archive:** light is a function of world Y, not of the current section: warm from above, cool from below, per vertex, about 6 ALU. Lighting belongs to the place, so sections cannot have a lighting seam.
- **Colour script:** tungsten `#ffb36b` is the only non-brand colour, and it dies on the way down. Act I is warm on black. Act II crosses over. Act III is graphite, mint and violet. Act IV starts warm again in the same room and ends at a dawn whose sky through the blinds is literally `--gradient-brand`, with light stripes on the wood that echo the green bars.
- **Post:** Tiers L and M grade inline and fake bloom with hand-placed glow cards, authored as the look rather than as a downgrade, since the audience's phones are Tier L. Tier H adds a small custom chain: half-resolution bright pass, 5-level dual-filter bloom, composite with tone curve, grain, slight chromatic aberration and vignette. No depth of field.

### 1.5 What the film refuses

Particles as decoration, floating primitives, neon grids, globes, glass cards, per-letter text effects. The only particles are dust inside the lamp beam and 30 sparks from the jammed machine, both with a physical reason to be there.

## 2. DOM contract

### 2.1 Layer stack

| z | Element | Notes |
|---|---|---|
| 0 | `body::before` | Still or poster, CSS only, present at first paint |
| 1 | `canvas.world` | Created by JS. Opaque, `pointer-events:none`, `aria-hidden`, `100lvh` tall |
| 2 | `.shell` (main, footer) | All copy |
| 3 | `.world-sprites` | Created by JS. 3 to 5 small canvases, `pointer-events:none`, `aria-hidden` |
| 50 | `.nav` | Unchanged except no backdrop filter |
| 60 | `.wa-dock` | Real link |
| 100 | `.skip-link` | Unchanged |

### 2.2 State classes on `<html>`

| State | Set by | Meaning |
|---|---|---|
| none | `locale.js` did not run | Today's page plus the dock |
| `.js` | `locale.js` (existing) | Scripting available |
| `.stills` | Head gate, or a collapse | Compact layout, a still behind each section |
| `.stills.save` | Head gate when Save-Data or slow network applies | Hero still only until later sections arrive |
| `.w3d` | Head gate | Tall track layout from first paint, poster behind |
| `.w3d.world-on` | World at lamp-on | Canvas visible, poster gone |
| `.w3d.world-off` | Context lost, or governor bail after lamp-on | Canvas hidden, nearest still shown, layout kept |
| `data-still="desk|archive|shaft|aerial|dawn"` | IntersectionObserver in `main.js` | Which still is nearest. Attribute only |

### 2.3 Head gate

Added to `assets/js/locale.js` after the redirect decision, so a redirecting document never sets it:

```js
function pickMode() {
  var m = /[?&]tier=(L|M|H|stills)\b/.exec(location.search);
  if (m) { return m[1] === "stills" ? "stills" : "w3d"; }
  try {
    var t = (localStorage.getItem("enjaz:tier") || "").split(":");
    if (t[0] === "S" && Date.now() - Number(t[1]) < 1209600000) { return "stills"; }
  } catch (e) {}
  var q = function (s) { return window.matchMedia && matchMedia(s).matches; };
  if (q("(prefers-reduced-motion: reduce)") || q("(prefers-reduced-data: reduce)") || q("(forced-colors: active)")) { return "stills"; }
  var c = navigator.connection || {};
  if (c.saveData || /2g/.test(c.effectiveType || "") || c.rtt > 900) { root.classList.add("save"); return "stills"; }
  if (navigator.deviceMemory && navigator.deviceMemory < 3) { return "stills"; }
  if (!window.WebGL2RenderingContext || !window.IntersectionObserver) { return "stills"; }
  if (!(window.CSS && CSS.supports && CSS.supports("height", "1svh") && CSS.supports("overflow", "clip"))) { return "stills"; }
  return "w3d";
}
root.classList.add(pickMode());
```

The stored `S` entry has a 14-day lifetime, so one bad session does not degrade a visitor permanently.

### 2.4 Exact HTML changes (both documents, same DOM)

All wrappers are neutral `div`s. Reading order does not change. With `.shot{display:contents}` and no class, **measured**: 84 text-bearing elements had 0 rect differences against today's page at 390 and 1440 wide in both locales, with identical document heights (4997, 3530, 5243, 3669).

1. Remove `<canvas class="fx fx-canvas" data-particles>` and `<div class="fx fx-cursor" data-cursor-glow>`. Keep the two `.fx-orb` divs.
2. `<section class="container hero track" data-shot="hero" ...><div class="shot">` around all hero children `</div></section>`.
3. `<div class="ticker track" data-shot="drop" aria-hidden="true">`.
4. `<div class="section__head reveal track" data-shot="svc.head"><div class="shot">...</div></div>`, and the same with `process.head`.
5. `<li class="card reveal track" data-shot="svc.web"><div class="shot">...</div></li>`, with `svc.apps`, `svc.api`, `svc.rescue`, `svc.ux`, `svc.auto`.
6. `<li class="step reveal track" data-shot="step.talk"><div class="shot">...</div></li>`, with `step.scope`, `step.build`, `step.ship`.
7. `<div class="fall track" data-shot="fall" aria-hidden="true"></div>` between `#process` and `#why`.
8. Why:
   ```html
   <div class="split">
     <div class="reveal why__copy">
       <div class="track" data-shot="why.q"><div class="shot">eyebrow, h2, lead</div></div>
       <div class="track" data-shot="why.list"><div class="shot">ul.checklist</div></div>
     </div>
     <div class="track" data-shot="why.stats"><div class="shot">ul.stats.reveal</div></div>
   </div>
   ```
9. `<section class="container cta section section--tight track" data-shot="cta" ...><div class="shot"><div class="cta__panel reveal">...</div></div></section>`.
10. `<footer class="footer shell" data-shot="coda">`.
11. After the footer, last in the document so tab order is undisturbed: `<a class="wa-dock" href="https://wa.me/249112066117" rel="noopener" target="_blank">` with the nav pill's existing label (`لنتحدّث` / `Let's Talk`) `</a>`.
12. `role="list"` on `.card-grid`, `.steps`, `.checklist`, `.stats`, because `list-style:none` drops list semantics in Safari.
13. `<main ... data-atlas='{...}'>` holding the few words printed on paper props, one JSON object per locale: `/` gets `{"invoice":"فاتورة","receipt":"إيصال","quote":"عرض سعر","ledger":"دفتر","paid":"تم"}`, and `/en/` gets `{"invoice":"INVOICE","receipt":"RECEIPT","quote":"QUOTE","ledger":"LEDGER","paid":"DONE"}`. These are not visible DOM copy. The owner reviews them.

JSON-LD, hreflang, canonicals and metadata are untouched.

### 2.5 Exact CSS

Appended to `assets/css/main.css` as section 17. Remove the `.fx-canvas` and `.fx-cursor` rules and their media-query mentions. All world rules sit inside `@media screen`, so print automatically gets today's layout. The `.w3d` block below was **measured** as written, apart from these unprototyped additions: the shared `:is()` selectors, the footer and terminal colours, the dock print rule, the `112svh` landscape hero, and the `drop` heights, which were 80svh and 70svh when measured.

```css
/* 17. World. Base rules, inert until a class is set on <html>. */
.shot { display: contents; }
.fall { display: none; }
.wa-dock { display: none; }

@media (max-width: 56.25rem) {
  .wa-dock { display: inline-flex; align-items: center; gap: .5rem; position: fixed; z-index: 60;
    inset-block-end: max(1rem, env(safe-area-inset-bottom)); inset-inline-end: 1rem;
    padding: .75rem 1.25rem; border-radius: var(--radius-pill);
    background: linear-gradient(90deg, var(--color-mint), #4ce0c2); color: var(--color-bg);
    font-weight: 600; font-size: var(--step-small); box-shadow: 0 8px 28px rgba(0,0,0,.55); }
  .wa-dock:hover, .wa-dock:focus-visible { color: var(--color-bg); }
  .wa-dock.is-hidden { opacity: 0; visibility: hidden; }
  body.is-nav-open .wa-dock { visibility: hidden; }
}
@media print { .wa-dock, .world, .world-sprites { display: none !important; } }

@media screen {
  /* Still URLs. Nothing downloads until a rule uses one. Use root-absolute paths. */
  html:lang(ar) { --s-desk: url(/assets/img/world/v1/desk-ar-p.webp); --s-archive: url(/assets/img/world/v1/archive-ar-p.webp);
    --s-shaft: url(/assets/img/world/v1/shaft-ar-p.webp); --s-aerial: url(/assets/img/world/v1/aerial-ar-p.webp); --s-dawn: url(/assets/img/world/v1/dawn-ar-p.webp); }
  html:lang(en) { /* same five with -en-p */ }
  @media (orientation: landscape) {
    html:lang(ar) { /* same five with -ar-l */ }
    html:lang(en) { /* same five with -en-l */ }
  }

  /* Shared by w3d and stills, so a collapse at the top of the page moves nothing in the first fold. */
  html:is(.w3d, .stills) { --step-h1: clamp(2.25rem, 1.5rem + 3.2vw, 4.5rem); --step-h2: clamp(1.625rem, 1.3rem + 1.6vw, 2.75rem); }
  html:is(.w3d, .stills):lang(ar) { --step-h1: clamp(2rem, 1.2rem + 3.6vw, 4rem); }
  html:is(.w3d, .stills) .shell { overflow-x: clip; }
  html:is(.w3d, .stills) .fx-orb { display: none; }
  html:is(.w3d, .stills) .hero.track { display: block; min-height: 100svh; padding: 5.5rem var(--space-gutter) 0; text-align: start; }
  html:is(.w3d, .stills) .hero .shot { display: block; max-width: 40rem; }
  html:is(.w3d, .stills) .hero__title { margin-block-end: .5rem; }
  html:is(.w3d, .stills) .hero__eyebrow { margin-block-end: 1rem; }
  html:is(.w3d, .stills) .hero__lead { margin-block: 1rem 1.5rem; }
  html:is(.w3d, .stills) .hero__actions { justify-content: flex-start; gap: .625rem; }
  html:is(.w3d, .stills) .hero__actions .btn { flex: 0 1 auto; padding: .875rem; }
  html:is(.w3d, .stills) .hero__terminal { margin-block-start: 1.5rem; color: var(--color-text-muted); }
  @media (max-width: 30rem) { html:is(.w3d, .stills) .hero__terminal { display: none; } }
  @media (orientation: landscape) { html:is(.w3d, .stills) .hero.track { min-height: 112svh; } }

  /* Tall layout */
  html.w3d { --pin: 12svh; --gap: 66svh; --span: 34svh; --caption-max: 100%; }
  @media (orientation: portrait) and (min-width: 48rem) { html.w3d { --gap: 72svh; } }
  @media (orientation: landscape) { html.w3d { --pin: 14svh; --gap: 56svh; --caption-max: 30rem; } }

  html.w3d .nav { backdrop-filter: none; background: rgba(7,8,12,.94); }
  html.w3d .reveal { opacity: 1; transform: none; transition: none; }
  html.w3d .section { padding-block: 0; }
  html.w3d section[id] { scroll-margin-block-start: calc(100svh - var(--pin) - var(--span) * .8 - 6rem); }
  html.w3d .section__head { max-width: none; margin: 0; }
  html.w3d .card-grid, html.w3d .steps, html.w3d .split { display: block; gap: 0; overflow: visible; border: 0; border-radius: 0; background: none; }
  html.w3d .why__copy { display: contents; }
  html.w3d .cta { max-width: var(--measure); }
  html.w3d .card, html.w3d .step { overflow: visible; padding-inline: 0; padding-block-start: 0; border: 0; border-radius: 0; background: none; backdrop-filter: none; box-shadow: none; transform: none; transition: none; }
  html.w3d .card::after { display: none; }
  html.w3d .stat { backdrop-filter: none; background: none; padding: .75rem .625rem; }
  html.w3d .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  html.w3d .hero__title-accent { animation: none; background-position: 0 center; }
  html.w3d .card__text, html.w3d .step__text, html.w3d .lead { color: var(--color-text); }
  html.w3d .stat__label { color: var(--color-text-muted); }
  html.w3d .footer { background: rgba(7,8,12,.84); }
  html.w3d .footer__inner, html.w3d .footer__links a { color: var(--color-text-muted); }

  html.w3d .track { display: flex; flex-direction: column; justify-content: flex-end; min-height: calc(var(--gap) + var(--span)); padding-block-end: var(--gap); }
  html.w3d .shot { display: block; position: sticky; inset-block-end: var(--pin); z-index: 0; max-width: var(--caption-max); }
  html.w3d .shot::before { content: ""; position: absolute; inset: -3rem calc(-1 * var(--space-gutter)); z-index: -1; box-sizing: border-box;
    border-style: solid; border-color: transparent; border-width: 3rem 0;
    border-image: url(/assets/img/scrim.svg) 47 0 fill / 3rem 0 stretch; pointer-events: none; }
  @media (orientation: landscape) { html.w3d .shot::before { inset: -3rem; border-width: 3rem; border-image: url(/assets/img/scrim.svg) 47 fill / 3rem stretch; } }

  html.w3d .hero .shot { inset-block-start: 5.5rem; inset-block-end: auto; margin-block-end: 30svh; }
  html.w3d .ticker.track { min-height: 110svh; padding: 0; border: 0; background: none; mask-image: none; overflow: visible; }
  html.w3d .ticker__track { visibility: hidden; animation: none; height: 0; overflow: hidden; }
  html.w3d .fall.track { display: block; min-height: 60svh; padding: 0; }
  @media (orientation: landscape) { html.w3d .ticker.track { min-height: 90svh; } html.w3d .fall.track { min-height: 50svh; } }

  html.w3d #services { --span: 44svh; }
  html.w3d .card.track { --span: 34svh; }
  html.w3d .card.track[data-shot="svc.rescue"] { --span: 48svh; }
  html.w3d .step.track { --span: 30svh; }
  html.w3d #why { --span: 48svh; }
  html.w3d [data-shot="why.list"], html.w3d [data-shot="why.stats"] { --span: 44svh; }
  @media (orientation: landscape) and (max-height: 50rem) {
    html.w3d #why { --span: 62svh; }
    html.w3d [data-shot="why.list"], html.w3d [data-shot="why.stats"] { --span: 44svh; }
  }
  html.w3d .cta.track { --gap: 70svh; --span: 60svh; padding-inline: var(--space-gutter); margin-inline: auto; }
  html.w3d .cta .shot { width: 100%; max-width: min(100%, 30rem); margin-inline: auto; text-align: center; }
  html.w3d .cta__panel { overflow: visible; background: none; border: 0; padding: 1.5rem 1rem; }
  html.w3d .cta__panel::before { display: none; }

  /* Poster and fallback still */
  html.w3d body::before { content: ""; position: fixed; inset: 0 0 auto; height: 100vh; height: 100lvh; z-index: 0; pointer-events: none;
    background: #07080c var(--still, var(--s-desk)) center / cover no-repeat; }
  html.w3d[data-still="archive"] { --still: var(--s-archive); }
  html.w3d[data-still="shaft"] { --still: var(--s-shaft); }
  html.w3d[data-still="aerial"] { --still: var(--s-aerial); }
  html.w3d[data-still="dawn"] { --still: var(--s-dawn); }
  html.w3d.world-on:not(.world-off) body::before { background-image: none; }

  .world { position: fixed; inset: 0 0 auto; width: 100%; height: 100vh; height: 100lvh; z-index: 1; pointer-events: none; opacity: 0; }
  html.world-on .world { opacity: 1; animation: lamp-on .42s linear both; }
  html.world-off .world, html.world-off .world-sprites { display: none; }
  .world-sprites { position: fixed; inset: 0; z-index: 3; pointer-events: none; overflow: hidden; }
  @keyframes lamp-on { 0% { opacity: 0 } 18% { opacity: .7 } 30% { opacity: .15 } 55% { opacity: .9 } 65% { opacity: .4 } 100% { opacity: 1 } }

  /* Stills mode: today's compact layout with a veiled still behind each zone */
  html.stills :is(.hero, #services, #process, #why, .cta) { position: relative; isolation: isolate; }
  html.stills .still-in::before { content: ""; position: absolute; inset: 0 calc(50% - 50vw); z-index: -1;
    background: linear-gradient(rgba(7,8,12,.62), rgba(7,8,12,.86)), var(--still-img) center / cover no-repeat; }
  html.stills .hero { --still-img: var(--s-desk); }
  html.stills #services { --still-img: var(--s-archive); }
  html.stills #process { --still-img: var(--s-shaft); }
  html.stills #why { --still-img: var(--s-aerial); }
  html.stills .cta { --still-img: var(--s-dawn); }

  /* 404 */
  .is-404 .fx-orb { display: none; }
  .is-404::before { content: ""; position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background: linear-gradient(rgba(7,8,12,.66), rgba(7,8,12,.86)), var(--s-archive) center / cover no-repeat #07080c; }

  @media (prefers-contrast: more) { html.w3d .shot::before { border-image: none; background: #07080c; } }
  @media (forced-colors: active) { html.stills .still-in::before, .is-404::before { display: none; } }
}
```

`assets/img/scrim.svg` (596 B, **measured** working) is a 96x96 SVG with one radial gradient centred at (48,48), radius 48, colour `#07080c`, stop opacities .84 at 0 and 6%, .66 at 35%, .28 at 62%, .06 at 85%, 0 at 100%. The nine-slice is what gives a soft edge with a solid .84 centre and no blur filter.

### 2.6 Track arithmetic

A sticky-bottom caption rises with its track, pins, then scrolls away. The padding at the end of the track stops it travelling into the gap.

- `pinStart = trackTop + captionH + pin - svh`
- `pinEnd = pinStart + max(0, trackH - gap - captionH)`
- `hold = trackH - gap - captionH`
- Transit between two captions, in scroll pixels = `gap + nextCaptionH`
- Rule: `gap >= 100svh - captionH - pin - navHeight`, which keeps two captions from sharing the screen during a hold in portrait

**Measured** caption height / hold in px at the tokens above:

| Shot | ar 390x844 | en 390x844 | ar 1440x900 | en 1440x900 |
|---|---|---|---|---|
| `hero` caption height | 307 | 357 | 422 | 495 |
| `svc.head` | 115 / 256 | 97 / 274 | 161 / 235 | 186 / 210 |
| `svc.web`, `apps`, `api`, `auto` | 122 / 165 | 140 / 147 | 128 / 178 | 120 / 186 |
| `svc.rescue` | 122 / 283 | 140 / 265 | 128 / 304 | 120 / 312 |
| `svc.ux` | 122 / 165 | 140 / 147 | 104 / 202 | 120 / 186 |
| `process.head` | 75 / 212 | 97 / 190 | 161 / 145 | 136 / 170 |
| `step.talk` | 118 / 135 | 134 / 119 | 123 / 147 | 138 / 132 |
| `step.scope`, `build`, `ship` | 118 / 135 | 134 / 119 | 123 / 147 | 116 / 154 |
| `why.q` | 244 / 161 | 285 / 120 | 306 / 126 | 331 / 101 |
| `why.list` | 152 / 219 | 200 / 171 | 128 / 268 | 128 / 268 |
| `why.stats` | 179 / 192 | 179 / 192 | 204 / 192 | 204 / 192 |
| `cta` | 292 / 214 | 283 / 223 | 331 / 209 | 318 / 222 |

Page height: **measured** 16,292 px at 390x844 and 15,762 px at 1440x900 with `drop` at 80svh and 70svh. The contract's 110svh and 90svh, plus the 112svh landscape hero, compute to about 16,545 px (19.6 screens) and 16,050 px (17.8 screens). Hero copy stays pinned for **measured** 196 px (ar 390), 146 px (en 390), 120 px (ar 1440) and 47 px (en 1440) before the 112svh rule, which computes to about 228 px (ar 1440) and 155 px (en 1440).

If text grows, the track grows and the caption degrades to plain scrolling. That is the designed failure.

### 2.7 Legibility

- No glass and no cards. The nine-slice scrim gives every caption alpha .84 over its whole rect. **Computed** worst case, pure white behind the scrim: text 11.21:1, mint 10.64:1, muted 6.25:1, violet 4.88:1. The dim token is 3.55:1, so under `w3d` nothing caption-sized uses it.
- Composition keeps the brightest object out of the caption rect anyway. The contact sheet in Section 13 checks it.
- Turned off under `w3d`, because each one fights the frame budget: `backdrop-filter` on nav, card and stat; orb blur and drift; the H1 shimmer (repaints every frame); the 2D particle canvas; the cursor glow. The typewriter's 55 ms interval runs only while the hero is on screen.

### 2.8 WhatsApp is always one tap away

On desktop the nav pill is always visible. At 56.25rem and below the pill sits inside the hamburger drawer, so `.wa-dock` is fixed at the inline-end bottom. An IntersectionObserver in `main.js` adds `.is-hidden` only while `.hero__actions` or `.cta__action` is on screen. Without JS it simply stays visible. The dock's top stays below the pinned caption's bottom edge at 360x640 (**computed** 578 versus 563).

### 2.9 Anchors, find-in-page, keyboard

- `#services`, `#process`, `#why` stay on real sections. `scroll-margin-block-start` lands them inside the first track's hold. **Measured** `y - pinStart` against hold: at 390x844 ar `services` 182 of 256, `process` 154 of 212, `why` 80 of 161; on 360x640 en `why` lands 37 px before pin, so the caption is still rising (accepted).
- Declare `scroll-margin-block-start` on the section itself. A `--anchor` custom property declared on `html` resolves `--span` too early. **Measured**: that was a real bug in my first version.
- Captions are never faded or hidden. Find-in-page and `scrollIntoView` worked in every **measured** viewport.
- Focus order is unchanged, with the dock last. The canvas and sprites are not focusable. Space and PageDown are native. **Measured**: every text line is fully visible at some 87.5% PageDown step on all viewports from 360x640 up, except rotated phones (844x390), which have no PageDown key.
- Hover effects on the CTA button also fire on focus.

## 3. Scroll to world

### 3.1 The one rule

`world = f(y, idle time)`. Everything scroll-related is a pure function of the follower's `y`, with no accumulated state. Reverse scroll, anchor jumps, deep links to `#why` and scroll restoration are correct by construction. The follower initialises directly to the current `scrollY`, so there is no fly-in on load. Only idle loops use time: printer tick, landline ring, handheld noise, Automation cams.

### 3.2 Layout bake (`engine/layout.js`)

Reads at most 40 rects, with no scrolling, in at most 5 ms at idle. Triggers: `ResizeObserver` on the root, `document.fonts.ready`, fonts `loadingdone`. On coarse pointers height-only resizes are ignored, so URL-bar collapse never reallocates anything. `100lvh` on the canvas and `svh` in the layout keep both stable. It never reads layout per frame.

It collects: nav height, `svh` and `lvh` from two hidden fixed probes (CSSOM only), and each track's top, height, gap, caption size and caption inline position. From those it derives `pinStart` and `pinEnd`.

### 3.3 Rail (`engine/rail.js`)

- The rail is indexed directly by scroll pixels. There is no separate `s`. A 2,048-sample table across the document (about 8 px per sample on a phone) stores position, quaternion, FOV, near, far, fog distance, lens offset x and y. Interpolate linearly, with quaternions normalised after lerp. Rebuild only at bake. Use a quaternion table rather than `lookAt`, because the camera spends a lot of time at nadir where `lookAt` flips.
- Holds: pose plus `drift * hold`. Transits: a trapezoid-velocity ease with 18% ramps at each end, so the middle 64% moves at constant speed. Near and far change along the rail (0.03 to 12 m at the desk, 0.2 to 80 m in the archive, 0.05 to 60 m at the wordmark), so no logarithmic depth is needed.
- Lens rule: `lens` is vertical FOV in portrait. In landscape, `fov = lens * 0.78`.

### 3.4 Free-rect framing

For each shot at its pinned state, the solver uses the caption rect, subtracts nav and dock, and takes the largest of the rects above, below or beside the caption, with a 48 px margin. Then:

- `d = r * (H / 2) / (tan(fov / 2) * 0.45 * min(freeW, freeH))`, clamped to `[2.2 r, 12.5 m]` in the archive so the camera never passes through the wall
- `camera.setViewOffset(W, H, W/2 - fx, H/2 - fy, W, H)`

**Measured** in r187: an offset of (50, 120) moves the subject by (-50, -120) px.

Worked numbers for r = 1.3 m, lens 32: at 390x844 the free rect is 390 x 495 and d = 10.9 m. At 1440x900 the free rect is 756 x 823, fov is 25 and d = 7.8 m. RTL needs no separate authoring, because the camera reads the layout. Arabic's taller Kufi headings, a longer English caption, 200% zoom or an ultrawide monitor all re-frame themselves.

### 3.5 Page-locked descent

This is what stops it reading as a page over a background. During a transit the subject plane moves with the page.

`floorSep = max(3.6, k * (gap + nextCaptionH) * 2 * d * tan(fov / 2) / H)`, with `k = 1.15` in portrait and `k = 1.6` in landscape.

Worked: 5.8 m at 390x844, 3.8 m at 1440x900. Floor Y values are solved at bake, not authored. Each shot's group is placed at its solved floor, so a rebake only moves groups and rebuilds strip rings (at most 3 ms) and the rail table. Caption and machine leave together and the next pair arrives together, then both settle, like a lift reaching a floor. Page-lock applies to shots with elevation inside plus or minus 25 degrees. Nadir shots (`svc.head`, `process.head`, `fall`, `why.*`, `cta`) are authored transits.

### 3.6 Follower and sync

- Read `scrollY` once per rendered frame, first thing, before any DOM write.
- Second-order SmoothDamp, allocation-free, smooth time 0.14 s on fine pointers and 0.09 s on touch. Snap under 0.25 px.
- Compositor scrolling can run a frame or two ahead of WebGL on Android, so nothing depends on pixel contact while moving: pinned text is stationary, and moving text never touches a 3D edge, so the gap reads as parallax. Exact DOM-to-3D registration exists at one place only, the landscape CTA hold, where the DOM is pinned and handheld noise is off.

### 3.7 Loop and render-on-demand

- rAF stays alive, but GL is called only when dirty: `|y - scrollY| > 0.25`, pointer moved, or the active shot has `idleHz > 0`. A shot with `idleHz: 0` renders nothing at rest, so the GPU does nothing while you read.
- `idleHz` is 30 for `hero`, `why.q` and `svc.auto`, and 0 for all others. On Tier L those three stop 12 s after the last input. L and M never exceed 60 Hz on faster panels. A hidden tab stops rendering. `pageshow` re-reads `y`.
- `renderer.sortObjects = false`, so draw order is scene traversal order: author opaque front to back, transparent last. `scene.matrixWorldAutoUpdate = false`, with manual updates for moved groups. `renderer.debug.checkShaderErrors = false` in production. `update()` must not allocate.

### 3.8 Sets

Three shared sets: `desk`, `archive`, `strip`. There is no Set C. Swaps happen only in the dark: `desk` to `archive` in the black inside the slab during `drop`, and `archive` to `desk` during `fall`, where the desk group is moved in the dark with its buffers and shadow bake kept. A deterministic seed is what makes it recognisably the same desk.

### 3.9 Foreground sprites (`engine/sprites.js`)

Paper passing in front of the copy is the cheapest way to break the background reading. 3 to 5 small `<canvas>` sheets, drawn once at 64x88 px and upscaled 3x by CSS, which reads as out-of-focus paper. They move with `el.style.transform` (CSSOM, allowed by the CSP) using the same camera projection, and are active only while copy is moving: the hero exit into `drop`, and the `why.list` exit, at the frame margins. Never across a pinned caption. `visibility:hidden` otherwise.

## 4. Shot by shot

**Caption rule, used unless a shot says otherwise.** Portrait: caption full width (350 px at 390), bottom edge pinned at 88svh, so about y 620 to 743 at 390x844, with the subject in the free rect from y 77 to about 572. Landscape: caption 30rem wide at inline-start, so x 156 to 636 on `/en/` and x 804 to 1284 on `/` at 1440, with the subject on the inline-end side (x from 684 on `/en/`, x up to 756 on `/`). Tag, h3 and text keep their DOM order, with no card chrome.

Budgets below are Tier L ceilings per shot (draws / triangles). Tiers M and H use the same draw structure with counts from Section 7.

### Act I

**1. `hero`, 03:12, the desk.** 18 / 55k.
- **3D:** Night. Walnut desk against a dark wall with closed blinds. On the inline-end side an architect lamp throws one warm pool, and a beige dot-matrix printer feeds green-bar fanfold across the wood, over the front edge and out of the bottom of the frame. Around them: paper towers, dossiers tied with cotton tape, an invoice book with pink carbons, a receipt spike, a mug, coffee rings, a wall clock at 03:12, and a landline on its cradle that rings: two bursts of a 12 Hz, 6 mm handset hop every 3 s, low amplitude. 24-degree lens, 9 degrees above the desk. Across the hold the camera pushes in 15%, the first proof this is a place. Then it cranes straight down the front of the desk, and the landline shakes its handset off the cradle.
- **DOM:** eyebrow, H1, lead, both CTAs and terminal in the sticky `.shot` at top 5.5rem.
- **Desktop:** `/en/` copy x 156 to 796, y 88 to 583, desk staged in x from 844. `/` copy x 644 to 1284, y 88 to 510, desk in x up to 596. Staging is lens shift only.
- **390:** `/` copy y 88 to 395, `/en/` y 88 to 445, both CTAs on one row (two rows on `/en/` at 360). Terminal hidden, because its phrases are printed on the paper in the next shot. Camera elevation rises to 28 degrees, so the lamp pool sits in the free rect below the copy (from y 403 or 453) and the top of the frame falls to black behind the text. The strip runs off the bottom edge as the scroll cue.
- **Interaction:** the pointer steers the lamp cone, replacing the old cursor glow. On touch the beam eases toward the last touch. Scroll velocity drives paper feed and the platen knob, so scrolling feels like pulling paper out of the printer.
- **Technique:** `InstancedBufferGeometry` on `paper`: 420 sheets at 24 triangles with curl and flutter in the vertex shader. Stacks: 180 at 44 triangles, striations from a mipmapped 1D noise. Dossiers: 120 at 44. Printer, lamp and landline body merged with `mergeGeometries`. Cord: `TubeGeometry` on a helix around a spline, 4k triangles. Shadow: one `DepthTexture` (1024, `LessEqualCompare`, `LinearFilter`) rendered once at boot, 1 tap on L. Bulb is a glow card, beam a 30-triangle additive cone, plus 60 dust `Points` inside the beam only.

**2. `drop`, down the strip.** 12 / 30k. Spacer 110svh in portrait, 90svh in landscape, with no visible copy.
- **3D:** The camera hangs 0.35 m off the falling strip on a 20-degree lens so the sheet fills the frame: green bars, tractor holes and text roll upward like end credits, lit from behind by the lamp so the paper glows and the ink reads through it. The handset drops past on its cord. Floorboards come up with a splintered hole, and sheets slide toward it. The camera tips to straight down and goes in, with about 25svh of black inside the slab, where the set swap and the strip width jump happen.
- **Printed text:** the six service names read from `.ticker__track` (deduplicated) and the phrases from `data-typewriter`, drawn into the atlas with `ctx.direction` from the document.
- **DOM:** `.ticker` stays `aria-hidden`. `.ticker__track` is hidden, with no animation.
- **Desktop and 390:** same film. The 24 cm strip is framed to fill the width at 390, and centred on desktop with lateral sway multiplied by the direction sign.
- **Interaction:** a hard flick adds up to 8 degrees of FOV and more flutter, both decaying with the follower.
- **Technique:** one indexed ribbon of about 2,600 rings from `getSpacedPoints`, frames from `computeFrenetFrames`, `setDrawRange` limited to rings near the camera: at most 2.5k triangles, 2 draws including the halo. Tractor holes are painted dark rather than discarded. Sprites: 3 sheets cross the H1 while it rises.

### Act II

**3. `svc.head`, the archive.** 8 / 22k.
- **3D:** Out of the slab into the 28 m concrete atrium: galleries every 3.6 m, shelves packed with box files and dossiers, paper hanging over the rails, all falling away into fog. Straight down, with a dolly-zoom from 24 to 62 degrees as you clear the ceiling. A shaft of tungsten comes down from the hole above. The strip falls down the exact centre. Very far below is a small mint mark, the wordmark, which is where you are going.
- **DOM:** eyebrow and H2.
- **Desktop:** vanishing point at the centre of the inline-end free rect.
- **390:** vanishing point at about 30% of viewport height.
- **Interaction:** pointer tilts the camera by up to 1.5 degrees, nothing else.
- **Technique:** bays are instanced boxes on `solid`, wrapped in the vertex shader with `y = mod(baseY - uCamY, floorH * N)`, N = 18, so the building costs one uniform; `frustumCulled = false`. 1,400 boxes at 12 triangles on the 2 floors nearest the camera. Floors beyond that collapse to 8-triangle strips with a baked canvas texture. A `uOrder(y)` term straightens tilted files and moves cardboard toward graphite with depth, so the cleaning-up is geography rather than a timeline. Paper weather: 140 tumbling 2-triangle sheets wrapped around the camera.

**4. `svc.web`, the pop-up shop.** 11 / 25k. Slow level push-in, 32 degrees.
- **3D:** The first gantry across the atrium. The strip feeds a table and pops up into a paper shopfront like a pop-up book: base, facade, awning, door, window and sign hinge up in sequence. The sign carries the real `.card__title`. Paper cut-out figures walk a paper street through the door and turn mint as they cross the threshold, which is "visitors into customers" with no words. Window light goes from warm to mint once the shop is fully open.
- **Interaction:** hover or tap on the shop sends five more figures. Figures walk in reading direction through `uInline`.
- **Technique:** 28 hinged panels instanced on `paper`, hinge angles in the vertex shader (1.2k triangles). 48 figures at 4 triangles. One sign quad from the atlas. Gantry on `solid`.

**5. `svc.apps`, the slab.** 9 / 22k. Camera orbits 25 degrees across the track.
- **3D:** Loose forms, receipts and a length of phone cord circle a dark phone-sized slab in a slow vortex. As you scroll they are pulled in, and each one that lands adds a row to the list on the slab's screen. By the end of the hold there is no paper and one full list, which is the card's "one clean tool".
- **Interaction:** pointer stirs the vortex through a repulsion uniform until the sheets have landed. Touch needs nothing.
- **Technique:** reuses `paper`: the vertex shader mixes `orbit(seed, t)` with a slab target using a per-instance delayed smoothstep. 140 sheets at 12 triangles. Slab from `sets/phone.js` (1.2k triangles). Rows are plain bars, mirrored by `ctx.direction`, with no text. No new shader.

**6. `svc.api`, the pneumatic exchange.** 14 / 30k. Low angle looking up, next galleries overhead.
- **3D:** Four cabinets joined by glass pneumatic tubes, the original API. Brass capsules with a mint core shoot between them with no clerk in sight. The strip is cut into punched tape feeding the manifold.
- **DOM:** cabinets carry pictograms rather than text, so the payment, shipping, CRM and accounting wording stays only in the DOM paragraph.
- **Interaction:** tap or click a cabinet to fire a capsule at the other three.
- **Technique:** 6 `TubeGeometry` tubes at 64 x 6 (4.6k triangles) in a `glow` fresnel shell drawn after opaques. 24 instanced capsules at 96 triangles, positions from per-tube 64-point tables with no allocation. Cabinets on `solid` with the brass matcap. Main manifold flow follows reading direction through `uInline`.

**7. `svc.rescue`, the blackout.** 12 / 24k, falling to about 12k at full dark. Dutch roll up to 7 degrees, 30-degree lens.
- **3D:** The strip jams in a three-roller mangle and concertinas. Scroll on and the building loses power: floor lights die outward from the jam, and everything goes black except a violet emergency lamp, slow sparks and the caption. A mint inspection torch comes on. Further scroll: an arm pulls the jam, the rollers catch, the strip snaps taut, and power returns floor by floor as a wave travelling away from the machine.
- **DOM:** the caption is DOM, so it stays fully lit: "Site down? App crashing?" is the brightest thing on screen during the blackout, at every width.
- **Interaction:** in the blackout your cursor is the torch. On touch the torch sweeps by itself and leans toward the last touch.
- **Technique:** one `uPower` plus a Y-distance wave multiplies the light term in every program. The jam is a zigzag on about 120 strip rings in the vertex shader. Rollers 3 x 64 triangles, arm 600 triangles, 30 additive spark streaks at no more than 2 flashes per second. The torch reuses the lamp cone.

**8. `svc.ux`, the crumple.** 8 / 24k. Locked-off, dead-on frame, 28 degrees.
- **3D:** After the chaos, stillness. A 3 m sheet hangs on the strip, crushed into hard facets and printed with a bad interface: misaligned boxes, too many buttons. Scrolling irons it. The creases relax, the sheet goes flat, and the print cross-fades to a calm layout carrying the real `.card__title`.
- **DOM:** the sheet's texture is drawn per locale with `ctx.direction`, so the good layout reads right-to-left in Arabic rather than being a mirrored picture.
- **Interaction:** pointer irons a 0.5 m disc flat as it passes, and creases spring back behind it. On touch, a tap leaves a smooth spot that slowly recovers.
- **Technique:** grid 32 x 45 (2.9k triangles). Crumple: six fold planes, each adding `n * abs(dot(p, n_i) + o_i) * uCrumple`. Facets from `dFdx`/`dFdy` normals, fading to smooth as `uCrumple` approaches zero. One 512 x 720 canvas holds both layouts.

**9. `svc.auto`, the cam bank.** 9 / 22k. Side-on track along the shaft, 30 degrees.
- **3D:** A camshaft. Eight arms rise and fall on cams and stamp each invoice on the strip with a mint check. This is the only machine that keeps moving when you stop scrolling, because it is a script that runs by itself. Words on the invoices come from `data-atlas`. Past the last arm the paper ends: over 4 m the strip narrows from 1.2 m to 6 cm and its albedo turns to emission. It is now the mint line.
- **Interaction:** deliberately none. It does not need you, which is the joke and the point.
- **Technique:** 8 x (box + cylinder) instanced on `solid`, 1.2k triangles, phase driven by time. Stamps are atlas decals in the strip shader, revealed by ring index. Width and emission are functions of arc length in the same program, so there is no join between paper and line.

### Act III

**10. `process.head`, The Turnover.** 10 / 26k. Nadir, 50-degree lens.
- **3D:** The wordmark, 8 m wide, lies flat across the shaft, reading correctly from above (font +y maps to world -z). The line arrives and the letters fill from right to left in both locales, using the same colours as `.cta__wordmark`: mint on the physical left, violet on the physical right. As it fills, every box file on every wall rotates 180 degrees about its vertical axis in reading direction, right to left on `/`, left to right on `/en/`. Cardboard becomes graphite `#0f1118` with a mint hairline. Far strips cross-fade to match. The chevron wall ticks fade in. Then the camera dives through the gap between ا and ز alongside the line, about 0.7 m wide at this scale, so no letter join is ever cut. **It never looks back up**, because seen from below the word is mirrored.
- **DOM:** eyebrow and H2. The wordmark lives in the `aria-hidden` canvas, so nothing is announced twice.
- **Desktop:** word centred on the free rect at the inline-end side.
- **390:** word in the free rect above the caption, solved with r = 4 m.
- **Interaction:** scroll scrubs fill and turnover. Scrolling back un-writes it and un-flips the building.
- **Technique:** `generated/wordmark.js` holds integer outlines. At runtime: `ShapePath` then `toShapes()` then `ExtrudeGeometry({depth:.5, bevelEnabled:false, curveSegments:4})`. **Measured**: 9 shapes, 1,348 triangles, 779 B gzip, clean triangulation. Fill is a smoothstep on local x in `solid`'s emissive term. Turnover in the bay vertex shader, about 8 ALU: `f = smoothstep(0., 1., uTurn*2.2 - (inlinePos*.5+.5) - iSeed*.2)`, where `inlinePos` is `x * uInline / 14`. One uniform and no draw call. 96 instanced chevron quads at `uTurn` opacity. After the turnover, `instanceCount` falls to 60% on L, because the walls are dark.

**11. `step.talk`.** 10 / 25k. 28 degrees, elevation -10.
- **3D:** The first clean floor. The handset from Act I hangs here on its curly cord, swaying beside the line. A ring ripples across a polished graphite platform, the cord touches the line and straightens from the bottom up, turning mint. Paper and phone calls, the two old threads, become one line.
- **DOM:** `.step__number` stays LTR with its gradient, then title and text.
- **Interaction:** tap the handset to send another ripple.
- **Technique:** handset and cord geometry shared with `desk`. Ripple is one quad with a ring function on `glow`. Reflection is the subject drawn again with `scale.y = -1` under the floor at .82 alpha.

**12. `step.scope`.** 8 / 22k. 28 degrees, elevation -24.
- **3D:** A ring of 48 ticks inlaid in the floor lights one by one with scroll, an hour per tick. Inside it a phone exists only as a mint wireframe, three times life size. At tick 48, four crop-mark brackets clamp shut around it: fixed price, fixed scope. Deliberately one of the quietest frames.
- **DOM:** the 48 stays in the DOM sentence. The ring is its picture, not a second copy of the text.
- **Interaction:** scrub only. Scrolling back unlights ticks and opens brackets.
- **Technique:** 48 instanced quads lit by index against a uniform. `LineSegments` from `EdgesGeometry`, about 180 segments, on `wire`. 4 instanced brackets.

**13. `step.build`.** 9 / 26k. 28 degrees, bearing +20 to -10 across the track.
- **3D:** An exploded view of that phone: five layers floating 1.2 m apart along its normal (back plate, PCB with battery, mid-frame, display, glass). Scrolling assembles it. Three times during the step the half-built screen lights with a more finished UI: wire, layout, real. Those are the regular demos. Scrolling back takes it apart again.
- **Interaction:** scrolling is the interaction.
- **Technique:** layers are `RoundedBoxGeometry` plus 30 instanced PCB components, 3.5k triangles, on `solid` with the graphite matcap. PCB traces in a small canvas texture in the same mint as the green bars. Three canvas-drawn bar layouts, drawn with `ctx.direction`.

**14. `step.ship`.** 7 / 22k. 28 degrees, tipping to nadir on exit.
- **3D:** The assembled phone hangs from the mint line like a bead on a thread. An 8-blade iris opens in the floor. The phone drops through and the line stays attached, which is the "stay on call" in the copy. The camera tips to straight down and follows.
- **DOM:** leaves upward with the floor as the fall begins.
- **Technique:** iris is 8 instanced wedges rotated in the vertex shader, 64 triangles. The line is the last section of the same strip ribbon.

**15. `fall`.** 4 / 3k. 60svh in portrait, 50svh in landscape, nothing focusable.
- **3D:** The fastest stretch of the film. Black shaft, chevron ticks streaking, the phone and its line below you, 70-degree lens. Then a drop ceiling: the phone punches through one acoustic tile and the camera follows it into the office, seen from above.
- **Technique:** the cheapest frames in the film. The governor applies pending resolution changes here, because reallocating the drawing buffer is hidden. The desk group is moved in the dark.

### Act IV

**16. `why.q`, the question.** 18 / 55k. Nadir, 40 degrees, about 2 m above the desk.
- **3D:** The same desk from the same seed: the same mess, tiny in its pool of light, black all around, clock at 03:12, printer printing, landline ringing. The phone falls toward it slowly on its line. The heading asks whether you are still running on spreadsheets and phone calls while you look down at exactly that.
- **DOM:** eyebrow, H2 and lead as one caption, 244 to 331 px tall.
- **Desktop:** caption at inline-start, pool on the inline-end side.
- **390:** caption y 458 to 743, pool in the free rect above it. The black floor behind the text means the scrim barely has to work.
- **Interaction:** pointer steers the lamp, the same behaviour as the first frame.
- **Technique:** same buffers and shadow bake as `hero`.

**17. `why.list`, the clearing.** 18 / 55k, falling to 10 / 15k. Nadir, 40 degrees.
- **3D:** The phone lands at the centre of the pool and the checklist clears the desk in three rings, each clearing what its bullet names: loose quotes and calculator tape on the fixed-quote line; the landline and its tangled cord on the direct-line line, at which point the ringing stops; towers and dossiers on the maintenance line. Paper lifts, tumbles off the edges and goes. One stamped sheet stays. The printer stops, the clock hands start to run, the blinds begin to lighten. Scrolling back flies everything home again.
- **DOM:** `ul.checklist` as its own caption.
- **Technique:** same instance buffers plus one `uClear` uniform. The vertex shader lifts each instance on a radial curve keyed to category and distance from the landing point, about 6 ALU per vertex and no CPU. Shadow: `mix(bake, 1.0, clearMask(r))`, so baked shadows vanish at the same radial front with no re-bake. Instances are sorted by clear order at generation, so `instanceCount` can fall as rings pass and the frame gets cheaper as the desk empties. Sprites: 3 sheets at the frame margins on exit.

**18. `why.stats`, the follow spot.** 12 / 14k. 36 degrees, elevation -70.
- **3D:** Four things are left, and the lamp beam moves between them as a follow spot. 48h lands on the stamped one-page quote. 100% lands on the new phone and its line. 24h lands on the wall clock, whose hands have been running with your scroll. The infinity lands on the mug, whose two coffee rings overlap on the wood into an infinity sign.
- **DOM:** `.stats` as a 2 x 2 grid at all widths under `w3d`, with values LTR as authored.
- **Interaction:** hovering a stat on desktop sends the spot to its prop. Scrolling does it everywhere.
- **Technique:** the spot is the lamp-direction uniform, so shadows stay valid. Two ring SDFs in `wood`. Slats are 24 instanced boxes rotating with `uDawn`. Light stripes are an analytic gobo, about 3 ALU.

**19. `cta`, dawn and the phone.** 12 / 14k. Nadir, solved.
- **3D:** The sky behind the blinds is the brand gradient, and its stripes fall across clean walnut like the bars on the old paper. Lamp, mug and one phone on the wood, reflected in the varnish.
- **DOM:** real `.cta__wordmark`, h2, text and WhatsApp link. The primary button stays a plain link to wa.me.
- **Desktop:** panel centred, 30rem wide (x 480 to 960 at 1440, y about 443 to 774). The phone lies on its side, its screen generated from the measured panel rect plus 2rem (aspect clamped to 1.8 to 2.3). Camera solved with `d = screenW / (2 tan(hfov / 2)) * (vw / rectW)`, and lens shift aligns the centres. Handheld noise is off, so the edges stay registered.
- **390:** the 3D phone's bezels go just past the viewport edges at rest, so the visitor's own phone has become the phone in the scene. The panel is y about 451 to 743 on that screen, with no exact registration needed.
- **Interaction:** hover or keyboard focus on the button makes the phone buzz on the wood for 300 ms and its screen brighten. Nothing intercepts the tap.
- **Technique:** phone, mug and lamp head drawn again mirrored under `wood` at .85 alpha. On Tier L, phone and mug only.

**20. `coda`, the same shot.** 12 / 14k. Copies the `hero` knot exactly, including its solved lens values, so the bookend is exact by construction.
- **3D:** Same desk, same lamp, same angle. Clock at 07:00, no paper, a thin mint line going up from the phone to a small hole in the ceiling.
- **DOM:** footer in normal flow over the dark foreground wood. WhatsApp link, tel link and language switch are native. The dock returns once the CTA button has left the viewport.
- **Interaction:** the pointer steers the lamp, as it did at the start.

### Pose table (values for `*.meta.js`)

| Shot | Lens | Bearing | Elevation | Roll | Radius m | idleHz |
|---|---|---|---|---|---|---|
| `hero` | 24 | 0 | -9 (portrait -28) | 0 | 0.62 | 30 |
| `drop` | 20 | 0 | 0 to -90 | 0 | authored | 0 |
| `svc.head` | 24 to 62 | 0 | -90 | 0 | authored | 0 |
| `svc.web` | 32 | 12 | -6 | 0 | 1.3 | 0 |
| `svc.apps` | 32 | -12 to 13 | -4 | 0 | 1.1 | 0 |
| `svc.api` | 32 | -18 | 14 | 0 | 1.4 | 0 |
| `svc.rescue` | 30 | 10 | -8 | 0 to 7 | 1.2 | 0 |
| `svc.ux` | 28 | 0 | 0 | 0 | 1.5 | 0 |
| `svc.auto` | 30 | 90 | -3 | 0 | 1.4 | 30 |
| `process.head` | 50 | 0 | -90 | 0 | 4.0 | 0 |
| `step.talk` | 28 | 8 | -10 | 0 | 1.0 | 0 |
| `step.scope` | 28 | -6 | -24 | 0 | 1.0 | 0 |
| `step.build` | 28 | 20 to -10 | -8 | 0 | 1.0 | 0 |
| `step.ship` | 28 | 0 | -12 to -90 | 0 | 0.9 | 0 |
| `fall` | 70 | 0 | -90 | 0 | authored | 0 |
| `why.q` | 40 | 0 | -90 | 0 | 0.85 | 30 |
| `why.list` | 40 | 0 | -90 | 0 | 0.8 | 0 |
| `why.stats` | 36 | 0 | -70 | 0 | 0.7 | 0 |
| `cta` | 40 | 0 | -90 | 0 | solved | 0 |
| `coda` | copies `hero` | | | | | 0 |

Bearings are in reading space and multiplied by the direction sign at bake. Roll is capped at 8 degrees and FOV kick at 8 degrees.

## 5. Modules

### 5.1 File tree

```
src/experience/
  package.json, package-lock.json   three@0.187.0, esbuild@0.28.x, harfbuzzjs@1.6.4, wawoff2@2.0.1, playwright (all exact, dev only)
  build.mjs                         two-pass esbuild, GLSL stub plugin
  boot.js                           entry, no three import, at most 2.5 KB gzip
  world.js                          start(): renderer, engine, desk, hero, drop
  film.js                           Tier H post chain, lazy
  hud.js                            ?hud=1 overlay, lazy
  engine/  renderer.js layout.js rail.js follower.js loop.js tiers.js governor.js bench.js
           text.js hotspots.js sprites.js context.js
  programs/ paper.js solid.js wood.js strip.js glow.js wire.js chunks.js
  sets/    _handles.js desk.js archive.js strip.js phone.js
  sets/props/ printer.js lamp.js landline.js mug.js clock.js blinds.js mangle.js stamp-arm.js cabinet.js
  shots/   _contract.js index.js act2.js act3.js act4.js
           hero.js hero.meta.js ... one pair per shot, 20 pairs
  generated/ wordmark.js            output of tools/shape-wordmark.mjs, committed
  tools/   shape-wordmark.mjs render-stills.mjs size-gate.mjs
  tests/   server.mjs helpers.mjs *.spec.mjs *.node.mjs
assets/js/experience/               built output, committed
assets/img/world/v1/                20 WebP stills
assets/img/scrim.svg
```

`package.json` stays inside `src/experience/`, not at the repo root. A root `package.json` could change Vercel's zero-config static detection.

### 5.2 Shot contract

```js
// shots/svc-api.meta.js. No imports, loaded eagerly, because the rail needs it before the shot exists.
export default {
  id: 'svc.api', act: 2, set: 'archive',
  subject: { radius: 1.4, center: [0, 0, 0] },    // metres, reading space, relative to the solved floor
  pose: { lens: 32, bearing: -18, elevation: 14, roll: 0, drift: [0, -0.2, -0.3] }, // degrees; drift is metres over the hold
  budget: { draws: 14, tris: { L: 30000, M: 80000, H: 200000 } },
  idleHz: 0,
};

// shots/svc-api.js. Lazy.
import { defineShot } from './_contract.js';
export default defineShot({
  *build(ctx) { /* create meshes, add to ctx.group, yield at least every 4 ms of work */ },
  update(p, ctx) { /* pure function of p. No allocation. Write uniforms and group transforms only. */ },
  hit(id, p, ctx) {},    // optional: a registered hotspot was tapped or clicked
  dispose(ctx) {},       // dispose what build created
});
```

`p` is one reused object: `t` (0 to 1 across the whole active range), `enter`, `hold`, `exit` (each 0 to 1), `y`, `v` (px/s, signed), `time`, `dt`, `px`, `py` (pointer in NDC), `pointer` (0 none, 1 fine, 2 last touch).

`ctx`:

| Field | Meaning |
|---|---|
| `tier`, `q` | `'L'|'M'|'H'` and the counts from Section 7, including `q.instanceScale` |
| `dir` | +1 LTR, -1 RTL |
| `place(obj, {inline, y, z, yaw})` | Sets `position.x = inline * dir`, `rotation.y = yaw * dir`. Never scales, so winding and chirality are preserved |
| `rng()` | mulberry32 seeded from the shot id. Same in both locales |
| `group` | Group owned by the shot. The engine sets its Y to the solved floor |
| `programs.paper()` etc. | Material factories sharing compiled programs. The only way to get a material |
| `u` | Shared uniforms by reference: `uTime, uCamY, uPower, uPowerY, uInline, uDawn` |
| `atlas` | `.cell(key)` returns `[u,v,w,h]`, `.texture` |
| `text` | `.services`, `.phrases`, `.title(shotId)`, `.words`, `.digits(n)` |
| `sets` | `desk`, `archive`, `strip`, `phone` handles |
| `hotspots.add({id, center, radius})` | Analytic screen-space hit test. Never blocks selection or scrolling |
| `sprites` | Foreground sheets, for `hero` and `why.list` only |

Set handles, frozen in `sets/_handles.js` at Workstream 0 and stubbed so consumers can call them from day one:

- `desk`: `{ group, u: {uClear, uDawn, uLampDir, uLampOn, uRing, uClock}, setAct(1|4), handset, cord }`
- `archive`: `{ group, u: {uTurn, uOrder}, setDensity(scale) }`
- `strip`: `{ mesh, u: {uFeed, uJam, uJamY, uStamp, uLine}, pointAt(arc, out) }`
- `phone`: `{ make({w, h, t, scale}), layers(), screen(drawFn) }`

Only `RawShaderMaterial` exists. The GLSL stub makes `new MeshBasicMaterial`, `new ShaderMaterial`, lights, `scene.background` and `scene.environment` unusable. Tests grep for them.

### 5.3 Parallel workstreams

Each owner edits only the listed files. Built output is regenerated by the integrator, never by a workstream.

| WS | Owns | Depends on |
|---|---|---|
| 0 Foundation | `package.json`, `build.mjs`, `boot.js`, `world.js`, `engine/*`, `programs/*`, `sets/_handles.js`, `shots/_contract.js`, `shots/index.js`, `shots/act*.js`, a stub for every shot pair, `tests/server.mjs`, `tests/helpers.mjs`, `hud.js`, `film.js` | Nothing. Blocks shot work until the stub film runs |
| 1 DOM and fallbacks | `index.html`, `en/index.html`, `404.html`, `assets/css/main.css`, `assets/js/main.js`, `assets/js/locale.js`, `assets/img/scrim.svg`, `.gitignore`, `.vercelignore`, `.github/workflows/*`, `README.md` | Starts with WS 0. The contract is Section 2 |
| 2 Desk | `sets/desk.js`, `sets/props/{printer,lamp,landline,mug,clock,blinds}.js`, `shots/hero*`, `shots/drop*` | WS 0 |
| 3 Archive and strip | `sets/archive.js`, `sets/strip.js`, `shots/svc-head*` | WS 0 |
| 4 Machines A | `shots/svc-web*`, `shots/svc-apps*` | WS 0 |
| 5 Machines B | `shots/svc-api*`, `shots/svc-rescue*`, `sets/props/{mangle,cabinet}.js` | WS 0 |
| 6 Machines C | `shots/svc-ux*`, `shots/svc-auto*`, `sets/props/stamp-arm.js` | WS 0 |
| 7 Process | `sets/phone.js`, `tools/shape-wordmark.mjs`, `generated/wordmark.js`, `shots/process-head*`, `shots/step-*`, `shots/fall*` | WS 0 |
| 8 Act IV | `shots/why-*`, `shots/cta*`, `shots/coda*` | Handles from WS 2 and WS 7 |
| 9 Verification and stills | `tests/*.spec.mjs`, `tests/*.node.mjs`, `tools/render-stills.mjs`, `tools/size-gate.mjs`, `assets/img/world/v1/*` | Any built state |
| Integrator | `assets/js/experience/**` | All |

Shots read only their own files plus `ctx`. `shots/index.js` is pre-populated with all 20 entries at WS 0, so nobody else touches it.

**Order.** Phase 1: WS 0 and 1, then a vertical slice of `hero`, `drop`, `svc.head`, `svc.rescue` and the desk and archive stills. Phase 2: everything else in parallel. Phase 3: integration, stills, acceptance. If no real phone is available at the end of Phase 1, proceed on the written Tier L budgets and record the device test as owed. It stays a gate for merging to `main`.

**Cut order if time runs out:** foreground sprites, Tier H film chain, the figures in Web, the arm in Rescue, mirrored reflections. **Never cut:** the strip, the archive, The Turnover, the blackout, the question from above, the dawn desk, the CTA fit.

## 6. Boot, lazy loading and dependencies

### 6.1 Sequence

0. **Head.** `locale.js` redirects if needed, then sets `.w3d` or `.stills`.
1. **First paint.** Real text on `#07080c`, with the desk poster behind it from `body::before` (at most 28 KB on phones, not preloaded, not render-blocking). First contentful paint waits on nothing 3D. A slow connection just means a longer time on the still with readable copy.
2. **`main.js`.** On `load` plus `requestIdleCallback` (timeout 1500 ms, `setTimeout` 400 ms fallback): `import('/assets/js/experience/boot.js')`.
3. **`boot.js`.** Creates `canvas.world` and its own context: `getContext('webgl2', {alpha:false, antialias:true, depth:true, stencil:false, powerPreference:'default', failIfMajorPerformanceCaveat:true})`. Null means fail. Reads the renderer string and rejects software GL by name, since `failIfMajorPerformanceCaveat` alone is not sufficient. Classifies the tier. Only then imports `world-[hash].js`, so a device with no usable GPU never downloads three.
4. **`world.start({canvas, gl, tier, onFail, onOff})`.** `new WebGLRenderer({canvas, context: gl, antialias: true})`. Passing our own context is what makes the canvas opaque to the compositor, because r187 otherwise always requests `alpha:true` (`WebGLRenderer.js` line 391). **Measured** working, with `getContextAttributes().alpha === false`.
5. **Layout bake**, then `document.fonts.load` for the fonts the atlas draws, capped at 1.5 s, for example `document.fonts.load('700 48px "Noto Kufi Arabic"', 'إنجاز')`. On timeout, atlas cells draw bars rather than tofu, and are redrawn when fonts arrive.
6. **Build** desk, strip, `hero`, `drop` through generators that yield every 4 ms (`scheduler.yield`, with a rAF plus `setTimeout(0)` fallback). `renderer.compileAsync`. Render the lamp's depth bake once.
7. **Hidden bench** (Section 7.3).
8. **Lamp on.** Add `html.world-on`: the canvas fades in with two small flickers over 420 ms, and the poster is dropped.
9. **Neighbours** load at idle, ordered by distance from `y`. On Tier L, shots more than 4 away are disposed. `desk` is always kept because it returns in Act IV. A shot whose chunk has not arrived is simply absent during a fly-through, and an anchor jump moves its target to the front of the queue.
10. **Watchdog.** If lamp-on has not happened 20 s after the import began, stop loading and stay on zone stills.

Target: lamp-on within 3 s of `load` on a G52-class phone at 1.6 Mbps. That is a target, not a measurement.

### 6.2 `main.js` changes

Remove `initParticles`, `initCursorGlow` and `COARSE_POINTER`. Add:

- `initDock()`: observer as in Section 2.8.
- `initStillZones()`: under `.w3d`, a centre-line IntersectionObserver (`rootMargin: "-50% 0px -50% 0px"`) sets `data-still`: `.hero`, `.ticker` to `desk`; `#services` to `archive`; `#process` to `shaft`; `.fall`, `#why` to `aerial`; `.cta`, `footer` to `dawn`.
- `initStills()`: under `.stills`, an observer adds `.still-in` to zones, with `rootMargin` 100% normally and 0 under `.save`.
- `initExperience()`: step 2 above, passing `onFail` and `onOff`.
- `collapseToStills(reason)`: find the `.shot` nearest the viewport centre and record its top. Swap `.w3d` for `.stills`. `scrollBy` the difference with `behavior:'instant'`, skipped when `scrollY < 4`. Then start `initStills()`.
- `worldOff(reason)`: add `.world-off`.
- `initReveal` marks everything visible and returns early under `.w3d`.
- `initTypewriter` starts and stops its interval with an IntersectionObserver on `.hero__terminal`.
- A `change` listener on `prefers-reduced-motion`: on reduce, stop the world and `worldOff()`.

### 6.3 Dependency decisions

| Dependency | Decision | Why |
|---|---|---|
| three r187 | Yes, exact | Given. Saves writing state management, program cache, instancing and context-restore |
| esbuild 0.28 | Yes, dev | The repo has no build step and the CSP forbids importmaps. Bundles and tree-shakes to committed output |
| gsap | **No** | Every scrubbed value is a pure function of `y` through a baked table. A timeline library adds bytes and mutable state and solves nothing |
| lenis | **No** | Moves scrolling toward the main thread, fights sticky compositing on Android, and puts anchors and find-in-page at risk |
| harfbuzzjs, wawoff2 | Yes, dev only | Shape the wordmark at build time. WASM is fine at dev time and never ships |
| playwright | Yes, dev only | Acceptance checks and stills |
| EffectComposer, troika, glTF, Draco, KTX2 | No | Not needed, or blocked by the CSP |

## 7. Tiers, governor, budgets

### 7.1 Tier table

All numbers except bytes are targets until measured on a device.

| | L | M | H |
|---|---|---|---|
| GPUs | Adreno 505 to 540, 610, 612, 613, 616; Mali-G31, G51, G52, G57; PowerVR GE8320/8322; unknown mobile | Adreno 618 to 660; Mali-G68, G71, G72, G76, G77, G78; Apple GPU (masked); Intel, integrated AMD; unknown desktop | Adreno 7xx and up; Mali-G710 and up, Immortalis; Apple M series; discrete NVIDIA, AMD |
| Pixel cap | 0.55 MP (about 1.29x CSS at 390x844) | 1.3 MP | 2.8 MP |
| Max draws / triangles | 28 / 70k | 45 / 220k | 70 / 600k |
| Desk sheets | 420 at 24 tris | 1,100 at 48 | 2,400 at 96 |
| Stacks / dossiers | 180 / 120 | 360 / 240 | 720 / 480 |
| Archive boxes | 1,400 | 3,000 | 6,000 |
| Paper weather | 140 at 2 tris | 320 at 4 | 700 at 4 |
| UX sheet grid | 32 x 45 | 48 x 68 | 64 x 90 |
| Shadow map, taps | 1024, 1 | 1024, 4 | 2048, 8 |
| Atlas | 512 | 1024 | 2048 |
| Dust / sprites | 60 / 3 | 150 / 4 | 300 / 5 |
| Reflections | CTA phone and mug, Talk handset | all | all |
| Film chain | no | no | yes |
| GPU memory | at most 48 MB | at most 120 MB | at most 260 MB |

Below Tier L, straight to stills: Adreno 3xx, 4xx, Mali-4xx, Mali-T6xx to T8xx, PowerVR SGX, GE8100. Software: `swiftshader|llvmpipe|softpipe|software|basic render` is rejected. `?tier=L|M|H|stills` overrides everything and is not stored. All tiers use `antialias:true`, so a drop from H to M needs no new context, and the grade is a uniform branch, so it needs no recompile.

### 7.2 Frame and byte budgets

Tier L frame, 16.6 ms: JS at most 3 ms, GPU at most 11 ms, rest is margin. Fragment about 30 ALU, at most 2 fetches. Overdraw at most 2.2x, about 68 Mpix/s at 60 Hz. No allocation per frame. No main-thread task over 50 ms after first paint, except evaluation of the three chunk and shader link on devices without `KHR_parallel_shader_compile`.

| Part | gzip -6 KB |
|---|---|
| three r187 with GLSL stubbed | 116 (**measured**; 150 unstubbed) |
| `boot.js` | 2 (gate 2.5) |
| engine | 11 |
| programs | 5 |
| desk and props | 8 |
| strip / archive | 2 / 3 |
| 20 shots | 22 |
| wordmark | 0.8 (**measured** 779 B) |
| text atlas, sprites | 2.5 |
| film (Tier H only) | 2.5 |
| **Total** | **about 175, CI hard gate 200** |

Before lamp-on a phone downloads about 149 KB (gate 155), about 0.75 s plus RTT at 1.6 Mbps. Zero textures or models in live mode, since all are generated at runtime. The live server compresses at about level 6: **measured** `main.js` 2,682 B live against 2,667 at gzip -6 and 2,987 at gzip -1.

### 7.3 Hidden bench

After compile, with the canvas still at opacity 0: render 6 hero frames at target resolution, each followed by a 1x1 `readPixels` to force the flush. Drop the first 2 and take the median `m`.

- `m > 40 ms`: fail to stills and store `S`.
- `m > 20 ms`: start with pixel cap x .7 and instance scale x .7.
- `m < 7 ms` with a masked or unknown renderer: promote one tier.

Skipped under `?tier=`. Each frame gets its own rAF.

### 7.4 Governor

A 90-frame ring buffer of rAF deltas, ignoring the first second after lamp-on, hidden tabs and any delta over 250 ms. Vsync `v` is the median of the smallest 20% of deltas. Target `t = max(v, 16.6)`.

- **Refresh cap:** if p50 is within 4% of 33.3 ms and p90/p50 < 1.08 during the first 60 frames, treat it as Low Power Mode or battery saver. Set `t = 33.3` and do not downgrade.
- **Downgrade:** p90 over 1.25 x `t` for 45 frames, with a 1.5 s cooldown.
- **Upgrade:** p90 under 0.75 x `t` for 240 frames, at most twice per session, then lock. The wait doubles after a failed climb.
- **Ladder, one step at a time:**
  1. pixel cap x .85, applied only at scroll idle or in dark stretches (`fall`, the slab), because it reallocates the drawing buffer
  2. pixel cap x .85 again
  3. H to M (drop the film chain)
  4. instance scale x .7
  5. instance scale x .5
  6. shadow taps to 1, then AO only
  7. weather and reflections off, glow cards reduced
  8. a fixed 30 Hz cadence, because a steady 30 reads as film and a jittery 45 does not
  9. still mode if under 20 fps for 4 s at step 8: `world-off`, and store `S:timestamp`
- **Instance cuts:** instance ids are ordered by importance in every set, so `instanceCount` is a one-integer LOD with no rebuild. Sheets above the new count shrink to zero over 300 ms through `uCull`, then the count drops.
- The last stable level is saved as `enjaz:tier` in localStorage with a 14-day lifetime.

## 8. Fallbacks

| Condition | Class | What loads | What the visitor gets |
|---|---|---|---|
| JS blocked, or `locale.js` fails | none | Nothing new | Today's page exactly, plus the dock link. **Measured** parity |
| Reduced motion at load | `.stills` | No three | Compact page with stills. No camera movement, flicker or blackout |
| Save-Data, 2g, slow-2g, rtt over 900 | `.stills.save` | Hero still only, others as they arrive | Compact page, at most 28 KB of image at first |
| `deviceMemory` under 3, forced colours, no WebGL2, no `svh` or `overflow:clip` | `.stills` | No three | Compact page (forced colours: no stills) |
| Context null or software GL at boot | `.w3d` to `.stills` | `boot.js` only | Collapse with scroll compensation |
| Chunk fetch fails, compile throws, bench fails | `.w3d` to `.stills` | What was fetched | Same. A stale cached entry after `rsync --delete` lands here gracefully |
| Slow but alive | `.w3d` | As normal | Poster and zone stills until lamp-on, or for good after the 20 s watchdog |
| Context lost after lamp-on | `.world-off` | Nothing | Canvas hidden in the same tick, nearest still shown, layout kept, copy untouched |
| Context restored | back to `.world-on` | Nothing | three re-uploads. **Re-bake the lamp depth map, which is mandatory.** A second loss in the session stays off |
| Governor bail | `.world-off` | Nothing | Nearest still, layout kept, `S` stored |

**Collapse rule:** before lamp-on, collapse to the compact layout, because tall tracks with no film are a slog. Hero rules are shared, so a collapse at the top of the page moves nothing in the first fold. After lamp-on, keep the layout, because a visitor is mid-read.

**Existing effects:**
- The 2D particle canvas is **deleted**, element, JS and CSS. Its constellation is the generic look this replaces.
- The cursor glow is **deleted**. In `w3d` the lamp replaces it.
- Orbs stay only for the no-JS page. They are hidden under `.w3d`, `.stills` and on the 404.
- The H1 shimmer and ticker marquee stay on the no-JS and stills pages and are off under `.w3d`.

**Stills.** 5 scenes x 2 locales x 2 orientations = 20 WebP files in `assets/img/world/v1/`: `{desk,archive,shaft,aerial,dawn}-{ar,en}-{p,l}.webp`. Portrait 720x1560 at most 28 KB, landscape 1600x1000 at most 48 KB. They are rendered from the real engine at dev time by `tools/render-stills.mjs`, using `canvas.toDataURL('image/webp', q)` with a quality search. DOM text is never in them. They are used by stills mode, the `w3d` poster, `world-off` and the 404. Bump `v1` when regenerating, because `/assets/img/` is cached for 30 days.

**Other:** print gets today's layout, and `.world`, `.world-sprites` and `.wa-dock` are hidden. `prefers-contrast: more` makes scrims opaque. The blackout stays at no more than 2 flashes per second, under the WCAG limit of 3.

**Screen readers:** reading order is DOM order, wrappers are plain divs, headings and landmarks are unchanged. Canvas, sprites, `.ticker` and `.fall` are `aria-hidden`. Text is selectable because the canvas is under the DOM with `pointer-events:none`.

## 9. RTL

Arabic is the authored version. English is derived through `dir` at generation time.

**Mirrors:**
- Stage layout: subject on the inline-end side, caption at inline-start. Automatic through free-rect lens shift.
- Prop placement and yaw through `ctx.place()`. No shader or texture is flipped and no negative scale exists, so lighting and chirality stay correct.
- Motion that has a reading direction: The Turnover wave, figures in Web, capsule flow in API, strip sway, paper weather drift, the Automation track. All through `uInline` or the direction sign.
- UI drawn on canvases: bad and good layouts in UX, phone rows, the quote page, ledger sheets (column A and row numbers on the right on `/`).

**Does not mirror:**
- The camera's descent, and the chevrons pointing down, so no mirrored variant is needed.
- The wordmark and its right-to-left fill, in both locales. It stays Arabic on `/en/`, as in the DOM.
- Physical things: clock hands, printer head, rollers.
- DOM stat values and step numbers, which stay LTR as authored.
- The header brand mark.

**How 3D text is produced:**
- All 3D text except the wordmark is read from the DOM at boot (`.card__title`, `.ticker__track` spans, `data-typewriter`, `data-atlas`) and drawn with canvas-2D using `ctx.direction = document.dir`. Measured by the cinematic concept's author: canvas-2D shapes exactly as the DOM with the site's real Noto Kufi (إنجاز 136 px in both).
- Never set `letterSpacing` on Arabic canvas text. Reveals are whole-line wipes, never per-letter.
- Canvas text waits for `document.fonts.load` with an Arabic sample string, because of the `unicode-range` gates.
- Ledger digits use `Intl.NumberFormat('ar-EG')` on `/`. `#REF!`, `#####` and Latin digits use IBM Plex Mono, because Latin glyphs are not in the Kufi file.
- The wordmark is shaped at build time. `tools/shape-wordmark.mjs` decompresses `assets/fonts/noto-kufi-arabic-400-700-arabic.woff2` with `wawoff2`, shapes إنجاز with `harfbuzzjs` at `new hb.Variation('wght', 700)`, rounds the paths to integers, computes the gap between ز and ا, and writes `generated/wordmark.js`. **Measured**: 9 single-contour glyph shapes, no overlap repair needed.
- Kufi leading stays relaxed. The solver handles the extra caption height.

## 10. 404 page

Stays CSS-only: no JS, no three, no canvas. Add `class="is-404"` to `<body>`. It shows the archive still (`archive-ar-{p,l}.webp`, since the document is `lang="ar"`) behind a dark veil, full-bleed and fixed, so a lost page is lost in the same archive as the film. Orbs are hidden, copy and both links are unchanged, and there is no new text. If the image fails, the page is plain dark with text. At most 28 KB on a phone. `locale.js` does not run here, so `.shot` and `.track` rules stay inert.

## 11. Build and deploy

**Build (`src/experience/build.mjs`), two passes:**

1. Bundle `world.js` and all dynamic imports with `--bundle --splitting --format=esm --minify --target=es2020 --entry-names=[name]-[hash] --chunk-names=chunk-[hash] --loader:.glsl=text` into `assets/js/experience/`, with a metafile.
2. Bundle `boot.js` alone to `assets/js/experience/boot.js` with `define: {__WORLD_URL__: '"./world-XXXX.js"'}` and `external: ['./world-*']`.

Why: `boot.js` keeps a stable name, because `main.js` imports it. Everything else is hashed, so an old entry can never load a new chunk.

**GLSL stub plugin (measured: 150 KB to 116 KB gzip, 588 KB to 413 KB raw):**

```js
const stubGLSL = { name: 'stub-three-glsl', setup(b) {
  b.onResolve({ filter: /^three$/ }, () => ({ path: threeSrcThreeJsAbsolutePath }));
  b.onLoad({ filter: /three[\\/]src[\\/]renderers[\\/]shaders[\\/]ShaderChunk\.js$/ }, () => ({ contents: 'export const ShaderChunk = {};', loader: 'js' }));
  b.onLoad({ filter: /three[\\/]src[\\/]renderers[\\/]shaders[\\/]ShaderLib\.js$/ }, () => ({ contents: 'export const ShaderLib = {};', loader: 'js' }));
}};
```

**Repo changes (WS 1):**

- `.github/workflows/deploy.yml`: add `--exclude='src/'` and `--exclude='.vercelignore'` to rsync, because `rsync --delete` publishes anything not excluded. Before rsync, add `actions/setup-node`, then `npm ci --prefix src/experience`, `npm run build --prefix src/experience`, `git diff --exit-code assets/js/experience`, and `node src/experience/tools/size-gate.mjs`.
- `.github/workflows/experience-checks.yml` (new): runs the Playwright suite on pull requests and on `feature/**`.
- `.vercelignore` (new): `src/`.
- `.gitignore` (new, the repo has none): `src/experience/node_modules/`, `src/experience/test-results/`.
- `README.md`: replace the "no build step" line with what is now true, and add an Experience section. Its layout section is also stale (it calls `index.html` English and mentions `ar/index.html`), so fix that while there.
- `vercel.json` and the CSP: no changes. Nothing here needs a new origin.

## 12. Risks and mitigations

| Risk | Mitigation |
|---|---|
| **No frame rate here has been measured on a real Adreno 610 or Mali-G52.** SwiftShader proves correctness, not speed | `?hud=1` ships in production as a lazy chunk showing p50, p90, tier, rung, draws and triangles, so the owner can test on a real phone. A device pass is the gate for merging to `main`. The governor and bench protect visitors meanwhile |
| Procedural props look cheap | Long lenses, low light, silhouette-first props, vertical slice first. The current site stays intact on `main` either way |
| Page length (19.6 screens, 3.3x today) tires an owner who wants a price | Hero CTA and dock keep WhatsApp one tap away. Pacing lives in `--gap` and `--span`, so it shrinks with no JS change. The site has no analytics, so the effect on clicks cannot be measured unless the owner agrees to a same-origin click beacon |
| Sticky dies silently if an ancestor gets `overflow:hidden` | Acceptance D2 asserts every caption's pinned rect. `overflow-x:clip` on `.shell` keeps sticky working (**measured**) |
| Horizontal overflow from scrims on mobile, where `body{overflow-x:hidden}` is not enough (**measured**: a -3rem pseudo grew scrollWidth by 28 px and shifted RTL copy by 27 px) | `.shell{overflow-x:clip}` plus a full-bleed band with no side slices in portrait. Check D1 |
| GLSL stub ties the build to three internals | Version pinned exactly. The stub only blanks unused data, and all materials are raw. **Measured** rendering, instancing, depth compare and context restore under it. Upgrading three requires rerunning the suite |
| Bake-once shadows after context restore | Mandatory re-bake, covered by E7 |
| Safari and Firefox untested. Only Chromium was exercised (`lvh`, sticky in flex, WebGL memory, Low Power Mode at 30 fps) | Gate on `svh` and `overflow:clip`, refresh-cap rule, masked strings start conservative. Needs a device pass |
| In-app browsers from WhatsApp or Facebook, likely for this audience, and where `wa.me` traffic loops back | Gate on WebGL2 and `svh`, `100vh` declared before `100lvh`, failure falls to stills. Test them specifically on a device |
| `failIfMajorPerformanceCaveat` is not a sufficient gate | Software GL is also rejected by renderer string |
| Android compositor scrolling ahead of the WebGL frame makes moving contact swim | Rule for all shots: no 3D edge touches moving DOM. Registration only at the landscape CTA hold |
| Deploy leakage and drift | rsync excludes, `.vercelignore`, CI diff check, size gate |
| Stale chunk after deploy | Hashed names, and import rejection falls back to stills |
| Thermal throttling on long visits | Render-on-demand (0 fps while reading on most shots), 12 s idle stop on Tier L, governor. Needs a soak test on a device |
| Motion sensitivity from long falls, FOV changes, blackout, in visitors who have not set reduced motion | Roll capped at 8 degrees, FOV kick at 8 degrees, flashes at 2 per second, all speed user-driven. Should be tried on real people |
| Bright or busy frames behind captions | Scrim alpha .84 by construction, plus E5 |
| Unusual viewports, 200% zoom, tall text | Solver re-frames, tracks grow, captions degrade to plain scrolling. Check D10. Rotated phones (height under 480 px) are usable but not polished |
| Arabic craft errors no script can detect | The owner reads every printed word and the wordmark before merge |
| Scope: 20 shots, nine props | Disjoint workstreams, stubs from day one, the cut order in Section 5.3 |

## 13. Acceptance checks (headless Chromium, SwiftShader)

**Setup.** `tests/server.mjs` serves the repo root and reads the CSP header from `vercel.json`, so it can never drift. Launch flags that **measured** working: `--use-angle=swiftshader --use-gl=angle --enable-unsafe-swiftshader --ignore-gpu-blocklist --enable-webgl`. Force the engine with `?tier=L|M|H`, since software GL is otherwise rejected. Keep `bypassCSP` off. Under this CSP, `page.addStyleTag` is blocked and `waitForFunction` with a string predicate throws an eval error (**measured**), so tests poll with `page.evaluate` and write styles through CSSOM. Allow the console warning `KHR_parallel_shader_compile extension not supported`, which is specific to SwiftShader.

Test hook, present once the world starts: `window.__enjazWorld = { tier, seek(y), freeze(t), renderOnce(), info(), renderer, feedFrameTimes(arr) }`.

Viewports unless stated: 360x640, 390x844, 412x915, 768x1024, 1280x720, 1440x900, 1920x1080, in both locales.

| ID | Check | Pass |
|---|---|---|
| A1 | `npm run build`, then `git diff --exit-code assets/js/experience` | No diff |
| A2 | Size gate at gzip -6 | Total at most 200 KB, `boot.js` at most 2.5 KB, pre-lamp-on set at most 155 KB |
| A3 | Grep built output for `new Function`, `eval(`, `blob:`, `createObjectURL`, `new Worker`, `WebAssembly`, `.wasm`, `innerHTML` | 0 (**measured** 0 on the stub bundle) |
| A4 | Parse HTML | No inline `style`, no inline `<script>` except JSON-LD, no importmap |
| A5 | Grep `src/experience` for built-in materials, lights, `scene.background` | 0 |
| B1 | Full scroll of `/` and `/en/` with a `securitypolicyviolation` listener | 0 events |
| C1 | JS blocked: rects of the 84 text-bearing elements against a fixture from `main` | 0 differences, equal document height |
| C2 | Text content, section order, heading outline, landmarks, JSON-LD parse, hreflang | Equal to the fixture |
| D1 | `scrollWidth === clientWidth` | All viewports |
| D2 | Each caption at mid-hold, bottom edge at `svh - pin` | Within 2 px |
| D3 | At 25% of each hold on portrait up to 480 px wide | No other caption below the nav |
| D4 | `#services`, `#process`, `#why` landing | Inside the hold, tolerance -60 px |
| D5 | Page length | At most 20.5 screens in portrait, at most 18.5 in landscape |
| D6 | `layout-shift` total through lamp-on | At most 0.01, including a software-GL collapse at the top of the page |
| D7 | PageDown 87.5% steps | Every text line fully visible in at least one step |
| D8 | `window.find` on each h3 | Selection inside the viewport |
| D9 | Tab through the page | Order equals the fixture plus dock. Each focused element in the viewport, `elementFromPoint` at its centre returns it or a descendant |
| D10 | `document.documentElement.style.fontSize = '200%'` at 1440x900 | No horizontal overflow, captions readable |
| D11 | `elementFromPoint` at each caption centre, drag-select text | DOM element returned, selection non-empty |
| D12 | Over 200 scroll samples | A `wa.me` link visible and hit-testable at every sample. Dock hidden only while a hero or CTA button is on screen |
| E1 | `?tier=L` lamp-on | `html.world-on` within 15 s, first frame not black |
| E2 | 200 scroll samples at 390x844 and 1440x900, each tier | `renderer.info` draws and triangles within the tier ceiling and the shot's `budget`. No console errors |
| E3 | `freeze(t)`, `seek(y)` forward, reverse and via `#why` deep link | Same frame within tolerance |
| E4 | Contact sheet at 2% scroll steps | Luminance variance above threshold except the whitelisted black stretches |
| E5 | Set `visibility:hidden` by CSSOM on every descendant of `.shot`, screenshot, sample behind each text rect | At least 4.5:1 against computed colour (3:1 for large headings; gradient text checked at both end colours) |
| E6 | Project each shot's subject sphere at mid-hold | Overlap with the caption rect at most 5% |
| E7 | Forced context loss, then restore | `.world-off` within 100 ms, page readable. After restore `.world-on` returns with pixels within tolerance of pre-loss. `restoreContext` must run in a later task, not in a microtask after the `lost` event (**measured**) |
| E8 | Abort all `/assets/js/experience/*` requests | Collapse to `.stills`, all text visible, scroll position near the same caption |
| E9 | `delete window.WebGL2RenderingContext` in an init script; separately, `--disable-webgl2` | `.stills`; no chunk beyond `boot.js` |
| E10 | `reducedMotion: 'reduce'` | `.stills`, no experience requests, no canvas |
| E11 | Init script faking `navigator.connection.saveData` | `.stills.save`, only the hero still requested at first |
| E12 | SwiftShader with no `?tier` | Software rejected, `world-*.js` never requested |
| E13 | Node unit tests of `governor.js`, `rail.js`, `tiers.js` with fed frame times | Ladder order, hysteresis, refresh-cap rule, regex table |
| E14 | 600 frames of scrubbing with `--enable-precise-memory-info` | JS heap growth at most 1 MB |
| E15 | Delay experience JS by 10 s | First contentful paint within 100 ms of the blocked run |
| E16 | Atlas text | `measureText('إنجاز')` equals the DOM width within 0.5 px |
| E17 | Wordmark at 25% fill | Filled pixels on the physical right in both locales. 9 shapes, about 1,348 triangles |
| E18 | Same hold in `/` and `/en/` | Subject projected centre mirrored about the viewport centre within 8%. Turnover wave direction sign flips |
| E19 | 404 | No script requests, one image, copy visible |
| E20 | `emulateMedia({media:'print'})` | Height near the fixture, canvas and dock hidden |
| E21 | Stills | 20 files, sizes within limits |

## 14. Evidence log

Run in this session in a scratch copy, with no repo file changed.

**Layout**
- `.shot{display:contents}` plus wrappers: 0 rect differences across 84 elements, at 2 widths and 2 locales, heights identical.
- Sticky tracks PINNED on every track at 390x844 and 1440x900 in both locales, with `overflow-x:clip` on `.shell`.
- No horizontal overflow on 9 viewports in both locales.
- Sticky respects `margin-block-end`: hero copy releases at the values in Section 2.6.
- `#why{--span:62svh}` on landscape up to 50rem tall clears the one missed line at 1280x720 and brings the anchor inside the hold, at 1280x720 and 1366x768.
- Nine-slice `border-image` scrim renders soft-edged with a solid centre over a bright backdrop.

**three r187**
- Own context with `alpha:false` works, and three reads it back through `getContextAttributes()`.
- Stubbed bundle: raw GLSL3, instancing, `compileAsync`, `sampler2DShadow` compare and context restore (pixel-identical on the frame sampled) all ran, with no CSP violations.
- 2 draws, 18,398 triangles at about 23 to 37 ms per frame on SwiftShader.
- `setViewOffset(W,H,50,120,W,H)` moved the subject by (-50, -120).
- `ShapePath.toShapes()` takes no arguments, and `computeFrenetFrames`, `getSpacedPoints`, `instanceCount`, `DepthTexture.compareFunction`, `debug.checkShaderErrors`, `RoundedBoxGeometry` and `mergeGeometries` all exist in r187 source.
- r187 always requests `alpha:true` when creating its own context (line 391).

**Bytes**
- Stock import list 150 KB gzip -6, stubbed 116 KB.
- Live site compresses at about level 6 (`main.js` 2,682 B live, 2,667 at -6, 2,987 at -1).
- `canvas.toDataURL('image/webp', .6)` on crude test frames gave about 7 KB at 390x844 and about 28 KB at 1440x900.

**Wordmark**
- `harfbuzzjs` 1.6.4 plus `wawoff2` 2.0.1 shaped إنجاز at wght 700: 9 single-contour shapes. Extruded to 1,348 triangles at `curveSegments:4`, it rendered correctly with a right-to-left fill. Integer module 1,810 B, 779 B gzip. The gap between ز and ا is about 190 font units of 2,118, about 0.7 m at 8 m width.

**Carried from the concepts, not re-run by me:** canvas-2D Arabic matching DOM widths; the shimmer and typewriter main-thread cost at 6x throttle; `failIfMajorPerformanceCaveat` still returning SwiftShader under blocklist-ignoring flags; shadowed pixel lit after restore without a re-bake.

**Not tested by anyone:** any real GPU, Safari, Firefox, in-app browsers, the `.stills` and poster CSS as written, and any shot.

## 15. Flags for the owner

No action taken on these. They are outside this request, or need a decision only the owner can make.

1. The Arabic hero eyebrow reads `// إنجاز تسلَّيم في الموعد`, which looks like a typo. The film makes the eyebrow more prominent.
2. The Arabic CTA shows `+249 112 066 117` while the footers and the English CTA show `+249 11 206 6117`. Same digits, different grouping.
3. `data-atlas` adds a few words printed on paper props (Section 2.4). They are not visible DOM copy, but the owner should read them.
4. JSON-LD lists Egypt and worldwide, while the footer also says Sudan.
5. The site has no analytics, so the effect of the longer page on WhatsApp clicks cannot be measured. A same-origin click beacon would fit the CSP if wanted.
6. A real-phone test on an Adreno 610 or Mali-G52 device, with `?hud=1`, is the one check nobody can run from here.