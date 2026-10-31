/**
 * Acceptance suite for the film. Check IDs follow src/experience/SPEC.md, section 13.
 * Runs in headless Chromium on software GL, which proves correctness and says
 * nothing about real phones.
 *
 *   npm test --prefix src/experience [-- --only=A,D2,E7]
 */

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { lampOn, launch, mainFixture, REPO, RESULTS, until, VIEWPORTS, watch } from "./helpers.mjs";
import { serve } from "./server.mjs";
import { Governor, LADDER } from "../engine/governor.js";
import { bakeTable, freeRect, sampleTable, trapezoid } from "../engine/rail.js";
import { classify, QUALITY } from "../engine/tiers.js";

const only = process.argv.find((item) => item.startsWith("--only="))?.split("=")[1]?.split(",");
const HERE = join(REPO, "src/experience");
const OUT = join(REPO, "assets/js/experience");
mkdirSync(RESULTS, { recursive: true });

const results = [];
const check = async (id, name, fn) => {
  if (only && !only.some((prefix) => id.startsWith(prefix))) {
    return;
  }
  const started = Date.now();
  try {
    const note = await fn();
    results.push({ id, name, ok: true, note });
    console.log(`PASS ${id} ${name} ${note ?? ""} (${((Date.now() - started) / 1000).toFixed(0)}s)`);
  } catch (error) {
    results.push({ id, name, ok: false, note: error.message });
    console.log(`FAIL ${id} ${name}\n     ${String(error.message).slice(0, 700)}`);
  }
};
const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const site = await serve();
const fixture = await serve({ root: mainFixture() });
const browser = await launch();

const PAGES = [["ar", "/"], ["en", "/en/"]];
const open = async (path, { width = 390, height = 844, locale = "en", ...options } = {}) => {
  const context = await browser.newContext({ viewport: { width, height }, locale, ...options });
  const page = await context.newPage();
  const problems = watch(page);
  await page.goto(`${site.url}${path}`);
  return { context, page, problems };
};
const film = async (path, options, { all = false } = {}) => {
  const opened = await open(path, options);
  await lampOn(opened.page);
  if (all) {
    await opened.page.evaluate(() => window.__enjazWorld.loadAll());
  }
  return opened;
};
/* The tall layout without a film: hold the boot import open so nothing collapses. */
const tall = async (path, options = {}) => {
  const context = await browser.newContext({ viewport: { width: options.width ?? 390, height: options.height ?? 844 }, locale: options.locale ?? "en" });
  await context.route("**/assets/js/experience/boot.js", () => {});
  const page = await context.newPage();
  const problems = watch(page);
  await page.goto(`${site.url}${path}`);
  await page.waitForLoadState("load");
  return { context, page, problems };
};

/* --------------------------------------------------------------------------
   A: artifacts
   -------------------------------------------------------------------------- */

const hashDir = (dir) => {
  const hash = createHash("sha256");
  for (const file of readdirSync(dir).sort()) {
    hash.update(file);
    hash.update(readFileSync(join(dir, file)));
  }
  return hash.digest("hex");
};

await check("A1", "the committed bundle is exactly what the source builds", () => {
  const temp = mkdtempSync(join(tmpdir(), "enjaz-build-"));
  execFileSync("node", ["build.mjs", `--outdir=${temp}`], { cwd: HERE, stdio: "pipe" });
  assert(hashDir(temp) === hashDir(OUT), "assets/js/experience is stale: run npm run build");
});

await check("A2", "size gate", () => {
  const output = execFileSync("node", ["tools/size-gate.mjs"], { cwd: HERE }).toString();
  return output.replace(/\n/g, " | ");
});

await check("A3", "built output has nothing the CSP forbids", () => {
  const banned = /new Function|\beval\(|blob:|createObjectURL|new Worker|WebAssembly|\.wasm|\.innerHTML/;
  for (const file of readdirSync(OUT)) {
    const match = banned.exec(readFileSync(join(OUT, file), "utf8"));
    assert(!match, `${file} contains ${match?.[0]}`);
  }
});

await check("A4", "no inline style, script or importmap in the HTML", () => {
  for (const file of ["index.html", "en/index.html", "404.html"]) {
    const html = readFileSync(join(REPO, file), "utf8");
    assert(!/\sstyle="/.test(html), `${file} has an inline style`);
    assert(!/<style/.test(html), `${file} has a style element`);
    assert(!/importmap/.test(html), `${file} has an importmap`);
    for (const [, attrs, body] of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
      assert(/src=|application\/ld\+json/.test(attrs) || !body.trim(), `${file} has inline script`);
    }
  }
});

await check("A5", "no built-in materials, lights or scene.background in the source", () => {
  const banned = /new (MeshBasicMaterial|MeshStandardMaterial|MeshPhysicalMaterial|ShaderMaterial|PointLight|DirectionalLight|SpotLight|AmbientLight)\b|scene\.background|scene\.environment/;
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (["node_modules", "test-results", "tests", "tools"].includes(name)) {
        continue;
      }
      if (statSync(path).isDirectory()) {
        walk(path);
      } else if (name.endsWith(".js")) {
        const match = banned.exec(readFileSync(path, "utf8"));
        assert(!match, `${path}: ${match?.[0]}`);
      }
    }
  };
  walk(HERE);
});

/* --------------------------------------------------------------------------
   B and C: policy and parity
   -------------------------------------------------------------------------- */

await check("B1", "full scroll raises no CSP violations or console errors", async () => {
  for (const [locale, path] of PAGES) {
    const { context, page, problems } = await film(`${path}?tier=L`, { locale, width: 390, height: 844 }, { all: true });
    await page.evaluate(() => {
      window.__csp = [];
      document.addEventListener("securitypolicyviolation", (event) => window.__csp.push(`${event.violatedDirective} ${event.blockedURI}`));
    });
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += Math.floor(height / 40)) {
      await page.evaluate((target) => window.__enjazWorld.seek(target), y);
    }
    const csp = await page.evaluate(() => window.__csp);
    assert(csp.length === 0, `CSP: ${csp.join("; ")}`);
    const errors = problems.filter((item) => !/404|Failed to load/.test(item));
    assert(errors.length === 0, `console: ${[...new Set(errors)].slice(0, 4).join(" | ")}`);
    await context.close();
  }
});

const TEXT_SELECTOR = "h1,h2,h3,p,li,a,.btn,.stat__value,.stat__label,.card__tag,.step__number";
const readRects = async (root, path, width, height, locale) => {
  const context = await browser.newContext({ viewport: { width, height }, locale });
  await context.route("**/*.js", (route) => route.abort());
  const page = await context.newPage();
  await page.goto(`${root}${path}`);
  const data = await page.evaluate((selector) => {
    const rows = [];
    for (const element of document.querySelectorAll(selector)) {
      if (element.closest(".wa-dock, .ticker")) {
        continue;
      }
      const text = element.textContent.replace(/\s+/g, " ").trim();
      if (text) {
        const box = element.getBoundingClientRect();
        rows.push([element.tagName, text.slice(0, 24), Math.round(box.x * 2), Math.round((box.y + scrollY) * 2), Math.round(box.width * 2), Math.round(box.height * 2)].join("|"));
      }
    }
    return { rows, height: document.documentElement.scrollHeight };
  }, TEXT_SELECTOR);
  await context.close();
  return data;
};

await check("C1", "with scripts blocked, the page is today's page", async () => {
  let elements = 0;
  for (const [locale, path] of PAGES) {
    for (const [width, height] of [[390, 844], [1440, 900]]) {
      const before = await readRects(fixture.url, path, width, height, locale);
      const after = await readRects(site.url, path, width, height, locale);
      assert(before.height === after.height, `${path} ${width}: height ${before.height} vs ${after.height}`);
      assert(before.rows.length === after.rows.length, `${path} ${width}: ${before.rows.length} vs ${after.rows.length} elements`);
      const diff = before.rows.filter((row, index) => row !== after.rows[index]);
      assert(diff.length === 0, `${path} ${width}: ${diff.length} differ, first ${diff[0]}`);
      elements += before.rows.length;
    }
  }
  return `${elements} rects compared`;
});

await check("C2", "copy, outline, JSON-LD and hreflang match main", async () => {
  for (const [, path] of PAGES) {
    const read = async (root) => {
      const context = await browser.newContext({ javaScriptEnabled: true });
      await context.route("**/*.js", (route) => route.abort());
      const page = await context.newPage();
      await page.goto(`${root}${path}`);
      const data = await page.evaluate(() => {
        const main = document.querySelector("main");
        return {
          text: (main.innerText || main.textContent).replace(/\s+/g, " ").trim(),
          headings: [...document.querySelectorAll("h1,h2,h3")].map((element) => `${element.tagName}:${element.textContent.replace(/\s+/g, " ").trim()}`),
          landmarks: [...document.querySelectorAll("header,nav,main,footer,section")].length,
          jsonld: JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent),
          hreflang: [...document.querySelectorAll('link[rel="alternate"]')].map((link) => `${link.hreflang}=${link.href}`),
          canonical: document.querySelector('link[rel="canonical"]').href,
        };
      });
      await context.close();
      return JSON.stringify(data);
    };
    assert((await read(fixture.url)) === (await read(site.url)), `${path} differs from main`);
  }
});

/* --------------------------------------------------------------------------
   D: layout, anchors, keyboard, always-one-tap
   -------------------------------------------------------------------------- */

await check("D1", "no horizontal overflow at any viewport", async () => {
  for (const [locale, path] of PAGES) {
    for (const [width, height] of VIEWPORTS) {
      const { context, page } = await tall(path, { width, height, locale });
      const sizes = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
      assert(sizes[0] <= sizes[1], `${path} ${width}x${height}: ${sizes}`);
      await context.close();
    }
  }
});

const CAPTIONS = ["svc.head", "svc.web", "svc.apps", "svc.api", "svc.rescue", "svc.ux", "svc.auto", "process.head", "step.talk", "step.scope", "step.build", "step.ship", "why.q", "why.list", "why.stats", "cta"];

await check("D2", "every caption pins where the layout says", async () => {
  for (const [locale, path] of PAGES) {
    for (const [width, height] of [[390, 844], [1440, 900]]) {
      const { context, page } = await tall(path, { width, height, locale });
      const bad = await page.evaluate((ids) => {
        const out = [];
        for (const id of ids) {
          const track = document.querySelector(`[data-shot="${id}"]`);
          const caption = track.querySelector(":scope > .shot");
          const top = track.getBoundingClientRect().top + scrollY;
          const style = getComputedStyle(caption);
          const pin = parseFloat(style.insetBlockEnd);
          const gap = parseFloat(getComputedStyle(track).paddingBlockEnd);
          const captionH = caption.getBoundingClientRect().height;
          const svh = window.innerHeight;
          const start = top + captionH + pin - svh;
          const hold = track.getBoundingClientRect().height - gap - captionH;
          window.scrollTo({ top: start + hold / 2, behavior: "instant" });
          const bottom = caption.getBoundingClientRect().bottom;
          if (Math.abs(bottom - (svh - pin)) > 2 || hold <= 0) {
            out.push(`${id}: bottom ${bottom.toFixed(0)} vs ${(svh - pin).toFixed(0)}, hold ${hold.toFixed(0)}`);
          }
        }
        return out;
      }, CAPTIONS);
      assert(bad.length === 0, `${path} ${width}: ${bad.join("; ")}`);
      await context.close();
    }
  }
});

await check("D3", "on a phone, no second caption shares the screen during a hold", async () => {
  for (const [locale, path] of PAGES) {
    for (const [width, height] of [[360, 640], [390, 844], [412, 915]]) {
      const { context, page } = await tall(path, { width, height, locale });
      const bad = await page.evaluate((ids) => {
        const out = [];
        const nav = document.querySelector("[data-nav]").getBoundingClientRect().height;
        const svh = window.innerHeight;
        for (const id of ids) {
          const track = document.querySelector(`[data-shot="${id}"]`);
          const caption = track.querySelector(":scope > .shot");
          const top = track.getBoundingClientRect().top + scrollY;
          const pin = parseFloat(getComputedStyle(caption).insetBlockEnd);
          const gap = parseFloat(getComputedStyle(track).paddingBlockEnd);
          const captionH = caption.getBoundingClientRect().height;
          const hold = track.getBoundingClientRect().height - gap - captionH;
          window.scrollTo({ top: top + captionH + pin - svh + hold * 0.25, behavior: "instant" });
          for (const other of document.querySelectorAll(".shot")) {
            if (other !== caption && other.getBoundingClientRect().height > 0) {
              const rect = other.getBoundingClientRect();
              if (rect.bottom > nav + 4 && rect.top < svh - 4) {
                out.push(`${id} with ${other.parentElement.dataset.shot}`);
              }
            }
          }
        }
        return out;
      }, CAPTIONS);
      assert(bad.length === 0, `${path} ${width}x${height}: ${bad.join("; ")}`);
      await context.close();
    }
  }
});

await check("D4", "anchors land inside the first hold", async () => {
  for (const [locale, path] of PAGES) {
    for (const [width, height] of [[390, 844], [1440, 900]]) {
      const { context, page } = await tall(path, { width, height, locale });
      const bad = await page.evaluate(() => {
        document.documentElement.style.scrollBehavior = "auto";
        const out = [];
        for (const [anchor, id] of [["services", "svc.head"], ["process", "process.head"], ["why", "why.q"]]) {
          const track = document.querySelector(`[data-shot="${id}"]`);
          const caption = track.querySelector(":scope > .shot");
          document.getElementById(anchor).scrollIntoView();
          const rect = caption.getBoundingClientRect();
          /* In view, and not hidden under the nav. */
          if (rect.top < 60 || rect.bottom > window.innerHeight) {
            out.push(`${anchor}: caption ${rect.top.toFixed(0)}..${rect.bottom.toFixed(0)}`);
          }
        }
        return out;
      });
      assert(bad.length === 0, `${path} ${width}: ${bad.join("; ")}`);
      await context.close();
    }
  }
});

await check("D5", "page length stays within budget", async () => {
  const notes = [];
  for (const [width, height, limit] of [[390, 844, 20.5], [1440, 900, 18.5]]) {
    const { context, page } = await tall("/en/", { width, height });
    const screens = await page.evaluate(() => document.documentElement.scrollHeight / window.innerHeight);
    assert(screens <= limit, `${width}: ${screens.toFixed(1)} screens`);
    notes.push(`${width}: ${screens.toFixed(1)}`);
    await context.close();
  }
  return notes.join(", ");
});

await check("D6", "no layout shift through lamp-on", async () => {
  const { context, page } = await open("/en/?tier=L", { width: 390, height: 844 });
  await page.evaluate(() => {
    window.__cls = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          window.__cls += entry.value;
        }
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
  await lampOn(page);
  const cls = await page.evaluate(() => window.__cls);
  assert(cls <= 0.01, `CLS ${cls}`);
  await context.close();
  return `CLS ${cls.toFixed(4)}`;
});

await check("D7", "PageDown shows every piece of copy in full at some step", async () => {
  for (const [locale, path] of PAGES) {
    for (const [width, height] of [[360, 640], [390, 844], [1280, 720], [1440, 900]]) {
      const { context, page } = await tall(path, { width, height, locale });
      const missed = await page.evaluate(async () => {
        document.documentElement.style.scrollBehavior = "auto";
        const nav = document.querySelector("[data-nav]").getBoundingClientRect().height;
        const elements = [...document.querySelectorAll("main h1, main h2, main h3, main p, main li p, main .checklist li")].filter((element) => element.getBoundingClientRect().height > 0 && !element.closest(".ticker"));
        const seen = new Set();
        const step = window.innerHeight * 0.875;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        for (let y = 0; ; y = Math.min(max, y + step)) {
          window.scrollTo({ top: y, behavior: "instant" });
          for (const element of elements) {
            const rect = element.getBoundingClientRect();
            if (rect.top >= nav - 1 && rect.bottom <= window.innerHeight + 1) {
              seen.add(element);
            }
          }
          if (y >= max) {
            break;
          }
        }
        return elements.filter((element) => !seen.has(element)).map((element) => element.textContent.trim().slice(0, 30));
      });
      assert(missed.length === 0, `${path} ${width}x${height}: never fully visible: ${missed.join(" | ")}`);
      await context.close();
    }
  }
});

await check("D8", "find-in-page reaches every heading", async () => {
  const { context, page } = await tall("/en/", { width: 1440, height: 900 });
  const bad = await page.evaluate(() => {
    const out = [];
    for (const heading of document.querySelectorAll("h3")) {
      window.scrollTo({ top: 0, behavior: "instant" });
      getSelection().removeAllRanges();
      const found = window.find(heading.textContent.trim());
      if (!found) {
        out.push(`not found: ${heading.textContent.trim()}`);
      }
    }
    return out;
  });
  assert(bad.length === 0, bad.join("; "));
  await context.close();
});

await check("D9", "tab order equals main's, plus the dock last", async () => {
  const links = async (root, path) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await context.route("**/*.js", (route) => route.abort());
    const page = await context.newPage();
    await page.goto(`${root}${path}`);
    const list = await page.evaluate(() => [...document.querySelectorAll("a[href], button")].map((element) => `${element.tagName}:${element.getAttribute("href") ?? ""}`));
    await context.close();
    return list;
  };
  for (const [, path] of PAGES) {
    const before = await links(fixture.url, path);
    const after = await links(site.url, path);
    const dock = after.pop();
    assert(/wa\.me/.test(dock), `last focusable should be the dock, got ${dock}`);
    assert(JSON.stringify(before) === JSON.stringify(after), `${path}: order differs`);
  }
});

await check("D10", "200% text stays on screen, with nothing overflowing", async () => {
  for (const [locale, path] of PAGES) {
    const { context, page } = await tall(path, { width: 1440, height: 900, locale });
    const state = await page.evaluate(async () => {
      document.documentElement.style.fontSize = "200%";
      await new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done)));
      const clipped = [];
      for (const element of document.querySelectorAll(".shot h1, .shot h2, .shot h3, .shot p")) {
        const rect = element.getBoundingClientRect();
        if (rect.height > 0 && (rect.left < -1 || rect.right > document.documentElement.clientWidth + 1)) {
          clipped.push(element.textContent.trim().slice(0, 24));
        }
      }
      return { scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth, clipped };
    });
    assert(state.scrollWidth <= state.clientWidth, `${path}: overflow ${state.scrollWidth} > ${state.clientWidth}`);
    assert(state.clipped.length === 0, `${path}: off screen: ${state.clipped.join(" | ")}`);
    await context.close();
  }
});

await check("D11", "copy sits above the canvas and can be selected", async () => {
  const { context, page } = await film("/en/?tier=L", { width: 1440, height: 900 });
  const result = await page.evaluate(() => {
    const world = window.__enjazWorld;
    const shot = world.layout.shots["svc.web"];
    world.seek((shot.pinStart + shot.pinEnd) / 2);
    const title = document.querySelector('[data-shot="svc.web"] .card__title');
    const box = title.getBoundingClientRect();
    const hit = document.elementFromPoint(box.left + 12, box.top + box.height / 2);
    const range = document.createRange();
    range.selectNodeContents(title);
    getSelection().removeAllRanges();
    getSelection().addRange(range);
    return { hit: hit === title || title.contains(hit), selected: getSelection().toString().length };
  });
  assert(result.hit, "elementFromPoint did not return the title");
  assert(result.selected > 0, "nothing selected");
  await context.close();
});

await check("D12", "a WhatsApp link is visible and tappable at every scroll position", async () => {
  for (const [locale, path] of PAGES) {
    for (const [width, height] of [[390, 844], [1440, 900]]) {
      const { context, page } = await tall(path, { width, height, locale });
      const bad = await page.evaluate(async () => {
        const out = [];
        const max = document.documentElement.scrollHeight - window.innerHeight;
        for (let i = 0; i <= 80; i += 1) {
          window.scrollTo({ top: (max * i) / 80, behavior: "instant" });
          await new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done)));
          const ok = [...document.querySelectorAll('a[href*="wa.me"]')].some((link) => {
            const box = link.getBoundingClientRect();
            if (!box.width || box.bottom <= 0 || box.top >= window.innerHeight) {
              return false;
            }
            const hit = document.elementFromPoint(box.left + box.width / 2, Math.min(window.innerHeight - 1, Math.max(0, box.top + box.height / 2)));
            return hit === link || link.contains(hit);
          });
          if (!ok) {
            out.push(Math.round(scrollY));
          }
        }
        return out;
      });
      assert(bad.length === 0, `${path} ${width}: no link at y=${bad.slice(0, 8)}`);
      await context.close();
    }
  }
});

/* --------------------------------------------------------------------------
   E: the film
   -------------------------------------------------------------------------- */

await check("E1", "lamp on, and the first frame is not black", async () => {
  const { context, page } = await film("/en/?tier=L", { width: 390, height: 844 });
  const lit = await page.evaluate(() => {
    const world = window.__enjazWorld;
    world.renderOnce();
    const gl = world.renderer.getContext();
    const width = gl.drawingBufferWidth;
    const height = gl.drawingBufferHeight;
    const pixels = new Uint8Array(width * height * 4);
    gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    let bright = 0;
    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i] + pixels[i + 1] + pixels[i + 2] > 120) {
        bright += 1;
      }
    }
    return bright / (width * height);
  });
  assert(lit > 0.02, `only ${(lit * 100).toFixed(2)}% lit`);
  await context.close();
  return `${(lit * 100).toFixed(1)}% of pixels lit`;
});

await check("E2", "draws, triangles and program counts stay within every tier's ceiling", async () => {
  const notes = [];
  for (const tier of ["L", "M", "H"]) {
    for (const [width, height] of [[390, 844], [1440, 900]]) {
      const { context, page } = await film(`/en/?tier=${tier}`, { width, height }, { all: true });
      const peak = await page.evaluate(() => {
        const world = window.__enjazWorld;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        let draws = 0;
        let tris = 0;
        for (let i = 0; i <= 60; i += 1) {
          world.seek((max * i) / 60);
          /* The Tier H chain ends in a full-screen pass, so measure the scene alone. */
          const info = world.sceneInfo();
          draws = Math.max(draws, info.calls);
          tris = Math.max(tris, info.triangles);
        }
        return { draws, tris, programs: world.renderer.info.programs.length };
      });
      const limit = QUALITY[tier];
      assert(peak.draws <= limit.draws, `${tier} ${width}: ${peak.draws} draws > ${limit.draws}`);
      assert(peak.tris <= limit.tris, `${tier} ${width}: ${peak.tris} tris > ${limit.tris}`);
      assert(peak.programs <= 48, `${tier} ${width}: ${peak.programs} programs`);
      notes.push(`${tier}/${width}: ${peak.draws}d ${Math.round(peak.tris / 1000)}k ${peak.programs}p`);
      await context.close();
    }
  }
  return notes.join(", ");
});

await check("E3", "the same y gives the same frame, however you got there", async () => {
  const { context, page } = await film("/en/?tier=L", { width: 390, height: 844 }, { all: true });
  const hash = (y) =>
    page.evaluate((target) => {
      const world = window.__enjazWorld;
      world.freeze(4.2);
      world.seek(target);
      world.renderOnce();
      const gl = world.renderer.getContext();
      const width = gl.drawingBufferWidth;
      const height = gl.drawingBufferHeight;
      const pixels = new Uint8Array(width * height * 4);
      gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
      let sum = 0;
      for (let i = 0; i < pixels.length; i += 16) {
        sum = (sum * 31 + pixels[i]) >>> 0;
      }
      return sum;
    }, y);
  const targets = await page.evaluate(() => {
    const { shots } = window.__enjazWorld.layout;
    return ["svc.web", "svc.rescue", "process.head", "why.list", "cta"].map((id) => (shots[id].pinStart + shots[id].pinEnd) / 2);
  });
  const forward = [];
  for (const y of targets) {
    forward.push(await hash(y));
  }
  const backward = [];
  for (const y of [...targets].reverse()) {
    backward.unshift(await hash(y));
  }
  const bad = forward.filter((value, index) => value !== backward[index]);
  assert(bad.length === 0, `${bad.length} of ${targets.length} frames differ`);
  await context.close();
});

await check("E4", "no blank frames, apart from the two authored dark stretches", async () => {
  for (const [locale, path] of PAGES) {
    const { context, page } = await film(`${path}?tier=L`, { width: 390, height: 844, locale }, { all: true });
    const blank = await page.evaluate(() => {
      const world = window.__enjazWorld;
      const gl = world.renderer.getContext();
      const { shots } = world.layout;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const out = [];
      for (let i = 0; i <= 50; i += 1) {
        const y = (max * i) / 50;
        world.seek(y);
        world.renderOnce();
        const width = gl.drawingBufferWidth;
        const height = gl.drawingBufferHeight;
        const pixels = new Uint8Array(width * height * 4);
        gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        let sum = 0;
        let square = 0;
        let count = 0;
        for (let p = 0; p < pixels.length; p += 32) {
          const value = (pixels[p] + pixels[p + 1] + pixels[p + 2]) / 3;
          sum += value;
          square += value * value;
          count += 1;
        }
        const mean = sum / count;
        const variance = square / count - mean * mean;
        /* Inside the slab, and the fall: black on purpose. */
        const inSlab = y > shots.drop.pinStart && y < shots["svc.head"].pinStart;
        const inFall = y > shots.fall.pinStart && y < shots["why.q"].pinStart;
        if (variance < 2 && !inSlab && !inFall) {
          out.push(`y=${Math.round(y)} var=${variance.toFixed(2)}`);
        }
      }
      return out;
    });
    assert(blank.length === 0, `${path}: ${blank.join(", ")}`);
    await context.close();
  }
});

await check("E5", "captions keep 4.5:1 contrast over the world", async () => {
  const worst = [];
  for (const [locale, path] of PAGES) {
    for (const [width, height] of [[390, 844], [1440, 900]]) {
      const { context, page } = await film(`${path}?tier=L`, { width, height, locale }, { all: true });
      const low = await page.evaluate((ids) => {
        const world = window.__enjazWorld;
        const out = [];
        const lin = (value) => {
          const v = value / 255;
          return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
        };
        const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
        const canvas = document.querySelector("canvas.world");
        const gl = world.renderer.getContext();
        for (const id of ids) {
          const shot = world.layout.shots[id];
          world.seek((shot.pinStart + shot.pinEnd) / 2);
          world.renderOnce();
          const scaleX = gl.drawingBufferWidth / canvas.clientWidth;
          const scaleY = gl.drawingBufferHeight / canvas.clientHeight;
          for (const element of document.querySelectorAll(`[data-shot="${id}"] .shot p, [data-shot="${id}"] .shot h2, [data-shot="${id}"] .shot h3, [data-shot="${id}"] .shot li`)) {
            const color = getComputedStyle(element).color.match(/[\d.]+/g).map(Number);
            if (color[3] === 0 || (color.length > 3 && color[3] < 0.01)) {
              continue; /* Gradient text: covered by its end colours in the scrim maths. */
            }
            const box = element.getBoundingClientRect();
            if (!box.width || box.top < 0 || box.bottom > canvas.clientHeight) {
              continue;
            }
            const samples = new Uint8Array(4);
            let brightest = 0;
            for (let i = 0; i <= 8; i += 1) {
              const px = box.left + (box.width * i) / 8;
              const py = box.top + box.height / 2;
              gl.readPixels(Math.floor(px * scaleX), Math.floor(gl.drawingBufferHeight - py * scaleY), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, samples);
              /* The scrim is 0.84 #07080c over the canvas. */
              const r = samples[0] * 0.16 + 7 * 0.84;
              const g = samples[1] * 0.16 + 8 * 0.84;
              const b = samples[2] * 0.16 + 12 * 0.84;
              brightest = Math.max(brightest, lum(r, g, b));
            }
            const text = lum(color[0], color[1], color[2]);
            const ratio = (Math.max(text, brightest) + 0.05) / (Math.min(text, brightest) + 0.05);
            if (ratio < 4.5) {
              out.push(`${id} ${element.tagName} ${ratio.toFixed(2)}`);
            }
          }
        }
        return out;
      }, CAPTIONS);
      worst.push(...low.map((item) => `${locale}/${width} ${item}`));
      await context.close();
    }
  }
  assert(worst.length === 0, worst.slice(0, 12).join("; "));
});

await check("E6", "subjects stay clear of their captions", async () => {
  for (const [locale, path] of PAGES) {
    for (const [width, height] of [[390, 844], [1440, 900]]) {
      const { context, page } = await film(`${path}?tier=L`, { width, height, locale });
      const bad = await page.evaluate((ids) => {
        const world = window.__enjazWorld;
        const { layout, solved } = world;
        const out = [];
        for (const id of ids) {
          const s = solved[id];
          const caption = layout.shots[id].caption;
          /* The CTA is the exception: its panel sits on the phone's screen by design. */
          if (!s.meta.subject || !caption || id === "cta") {
            continue;
          }
          const px = (s.meta.subject.radius * (layout.H / 2)) / (s.d * Math.tan((s.fov * Math.PI) / 360));
          const cx = layout.W / 2 - s.ox;
          const cy = layout.H / 2 - s.oy;
          let inside = 0;
          const steps = 24;
          for (let i = 0; i < steps; i += 1) {
            for (let j = 0; j < steps; j += 1) {
              const x = caption.x + (caption.w * (i + 0.5)) / steps;
              const y = caption.y + (caption.h * (j + 0.5)) / steps;
              if (Math.hypot(x - cx, y - cy) < px) {
                inside += 1;
              }
            }
          }
          const fraction = inside / (steps * steps);
          if (fraction > 0.05) {
            out.push(`${id} ${(fraction * 100).toFixed(0)}%`);
          }
        }
        return out;
      }, CAPTIONS);
      assert(bad.length === 0, `${path} ${width}: ${bad.join(", ")}`);
      await context.close();
    }
  }
});

await check("E7", "context loss hides the canvas at once, and restore brings it back", async () => {
  const { context, page } = await film("/en/?tier=L", { width: 390, height: 844 });
  const lost = await page.evaluate(async () => {
    const canvas = document.querySelector("canvas.world");
    const extension = window.__enjazWorld.renderer.getContext().getExtension("WEBGL_lose_context");
    window.__loseExtension = extension;
    const fired = new Promise((done) => canvas.addEventListener("webglcontextlost", done, { once: true }));
    extension.loseContext();
    await fired;
    /* The browser decides when the event fires. From there, the page must already be safe. */
    const firedAt = performance.now();
    const off = document.documentElement.classList.contains("world-off");
    return { ms: performance.now() - firedAt, off };
  });
  assert(lost.off, "world-off not set");
  assert(lost.ms < 100, `took ${lost.ms} ms`);
  const readable = await page.evaluate(() => document.querySelector("h1").getBoundingClientRect().height > 0);
  assert(readable, "h1 vanished");
  await page.evaluate(() => {
    /* A later task: restoring in a microtask after the lost event is invalid. */
    setTimeout(() => window.__loseExtension.restoreContext(), 50);
  });
  await until(page, () => !document.documentElement.classList.contains("world-off"), { timeout: 30000 });
  const lit = await page.evaluate(() => {
    const world = window.__enjazWorld;
    world.renderOnce();
    const gl = world.renderer.getContext();
    const pixels = new Uint8Array(4 * 400);
    gl.readPixels(0, Math.floor(gl.drawingBufferHeight / 4), 20, 20, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    return gl.getError() === 0;
  });
  assert(lit, "GL error after restore");
  await context.close();
});

await check("E8", "failed chunks collapse to stills, keeping your place and all the copy", async () => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, locale: "en" });
  await context.route("**/assets/js/experience/**", (route) => route.abort());
  const page = await context.newPage();
  await page.goto(`${site.url}/en/?tier=L`);
  await until(page, () => document.documentElement.classList.contains("stills"));
  const visible = await page.evaluate(() => [...document.querySelectorAll("main h1, main h2, main h3")].every((element) => element.getBoundingClientRect().height > 0));
  assert(visible, "copy hidden after collapse");
  await context.close();
});

await check("E9", "no WebGL2 means stills, and no film chunks", async () => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await context.addInitScript(() => {
    delete window.WebGL2RenderingContext;
  });
  const requests = [];
  const page = await context.newPage();
  page.on("request", (request) => requests.push(request.url()));
  await page.goto(`${site.url}/en/`);
  await page.waitForLoadState("load");
  await page.waitForTimeout(800);
  assert(await page.evaluate(() => document.documentElement.classList.contains("stills")), "not stills");
  assert(!requests.some((url) => /experience\//.test(url)), "film requested");
  await context.close();
});

await check("E10", "reduced motion means stills, no film, no canvas", async () => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const requests = [];
  const page = await context.newPage();
  page.on("request", (request) => requests.push(request.url()));
  await page.goto(`${site.url}/en/`);
  await page.waitForLoadState("load");
  await page.waitForTimeout(800);
  const state = await page.evaluate(() => ({ stills: document.documentElement.classList.contains("stills"), canvas: Boolean(document.querySelector("canvas")) }));
  assert(state.stills, "not stills");
  assert(!state.canvas, "canvas present");
  assert(!requests.some((url) => /experience\//.test(url)), "film requested");
  await context.close();
});

await check("E11", "data saver gets stills, and only the hero still at first", async () => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await context.addInitScript(() => {
    Object.defineProperty(navigator, "connection", { value: { saveData: true, effectiveType: "4g", rtt: 50 } });
  });
  const requests = [];
  const page = await context.newPage();
  page.on("request", (request) => requests.push(request.url()));
  await page.goto(`${site.url}/en/`);
  await page.waitForLoadState("load");
  await page.waitForTimeout(800);
  const classes = await page.evaluate(() => document.documentElement.className);
  assert(/stills/.test(classes) && /save/.test(classes), classes);
  const stills = requests.filter((url) => /img\/world/.test(url));
  assert(stills.length === 1 && /desk/.test(stills[0]), `requested ${stills.join(", ")}`);
  await context.close();
});

await check("E12", "software GL is rejected, and never downloads three", async () => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const requests = [];
  const page = await context.newPage();
  page.on("request", (request) => requests.push(request.url()));
  await page.goto(`${site.url}/en/`);
  await until(page, () => document.documentElement.classList.contains("stills"), { timeout: 30000 });
  assert(requests.some((url) => /boot\.js/.test(url)), "boot.js was not even tried");
  assert(!requests.some((url) => /world-/.test(url)), "world chunk downloaded");
  await context.close();
});

await check("E13", "governor, rail and tier logic (unit)", () => {
  /* Tiers */
  assert(classify("ANGLE (Google, Vulkan (SwiftShader Device), SwiftShader driver)", false) === "S", "software");
  assert(classify("Adreno (TM) 610", true) === "L", "adreno 610");
  assert(classify("Mali-G52 MC2", true) === "L", "g52");
  assert(classify("Adreno (TM) 660", true) === "M", "adreno 660");
  assert(classify("Adreno (TM) 740", true) === "H", "adreno 740");
  assert(classify("Mali-T860", true) === "S", "t860");
  assert(classify("Apple GPU", true) === "M", "apple masked");
  assert(classify("ANGLE (NVIDIA, NVIDIA GeForce RTX 3060)", false) === "H", "nvidia");
  assert(classify("ANGLE (Intel, Mesa Intel(R) Xe Graphics)", false) === "M", "intel");
  assert(classify("something new", true) === "L", "unknown mobile");
  assert(classify("something new", false) === "M", "unknown desktop");

  /* Governor: a steady budget does nothing, sustained overrun steps one rung at a time. */
  const steps = [];
  const steady = new Governor({ onChange: (rung, name) => steps.push(name) });
  for (let i = 0; i < 600; i += 1) {
    steady.push(16.7);
  }
  assert(steps.length === 0, `steady 60 fps moved the governor: ${steps}`);

  const moved = [];
  const slow = new Governor({ onChange: (rung, name) => moved.push(name) });
  for (let i = 0; i < 120; i += 1) {
    slow.push(16.7);
  }
  for (let i = 0; i < 400; i += 1) {
    slow.push(i % 2 ? 16.7 : 50);
  }
  assert(moved.length >= 1, "overrun never stepped down");
  assert(moved[0] === LADDER[0], `first step was ${moved[0]}`);
  moved.forEach((name, index) => assert(name === LADDER[index], `ladder out of order at ${index}: ${moved}`));

  /* A steady 30 at the start is Low Power Mode, not a slow GPU. */
  const capped = [];
  const lowPower = new Governor({ onChange: (rung, name) => capped.push(name) });
  for (let i = 0; i < 400; i += 1) {
    lowPower.push(33.3);
  }
  assert(lowPower.refreshCap, "refresh cap not detected");
  assert(capped.length === 0, `Low Power Mode caused a downgrade: ${capped}`);

  /* Rail */
  assert(Math.abs(trapezoid(0)) < 1e-6 && Math.abs(trapezoid(1) - 1) < 1e-6, "trapezoid ends");
  assert(Math.abs(trapezoid(0.5) - 0.5) < 1e-6, "trapezoid middle");
  const a = { y: 0, position: [0, 0, 0], quat: [0, 0, 0, 1], fov: 30, near: 0.1, far: 10, fog: 5, ox: 0, oy: 0, ease: "linear" };
  const b = { ...a, y: 100, position: [10, 0, 0], fov: 60 };
  const table = bakeTable([a, b], 100);
  const out = new Float32Array(13);
  sampleTable(table, 100, 50, out);
  assert(Math.abs(out[0] - 5) < 0.01 && Math.abs(out[7] - 45) < 0.02, `table sample ${out[0]} ${out[7]}`);
  const wide = freeRect({ x: 156, y: 620, w: 480, h: 120 }, { W: 1440, H: 900, navH: 77, portrait: false });
  assert(wide.x === 684, `landscape subject stands beside the copy, got x=${wide.x}`);
  const tallRect = freeRect({ x: 20, y: 620, w: 350, h: 120 }, { W: 390, H: 844, navH: 77, portrait: true });
  assert(tallRect.y === 77 && tallRect.h === 495, `portrait free rect ${tallRect.y} ${tallRect.h}`);
});

await check("E14", "scrubbing does not grow the heap", async () => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(`${site.url}/en/?tier=L`);
  await lampOn(page);
  await page.evaluate(() => window.__enjazWorld.loadAll());
  const session = await context.newCDPSession(page);
  const measure = async () => {
    await session.send("HeapProfiler.collectGarbage");
    return (await session.send("Runtime.getHeapUsage")).usedSize;
  };
  const scrub = () =>
    page.evaluate(() => {
      const world = window.__enjazWorld;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      for (let i = 0; i < 300; i += 1) {
        world.seek((max * (i % 60)) / 60);
      }
    });
  await scrub();
  const before = await measure();
  await scrub();
  const after = await measure();
  const growth = (after - before) / (1024 * 1024);
  assert(growth < 1, `${growth.toFixed(2)} MB`);
  await context.close();
  return `${growth.toFixed(2)} MB`;
});

await check("E15", "first paint does not wait for the film", async () => {
  const fcp = async (delay) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    if (delay) {
      await context.route("**/assets/js/experience/**", async (route) => {
        await new Promise((done) => setTimeout(done, delay));
        await route.continue().catch(() => {});
      });
    }
    const page = await context.newPage();
    await page.goto(`${site.url}/en/?tier=L`, { waitUntil: "commit" });
    await until(page, () => performance.getEntriesByName("first-contentful-paint").length > 0, { every: 20 });
    const value = await page.evaluate(() => performance.getEntriesByName("first-contentful-paint")[0].startTime);
    await context.close();
    return value;
  };
  const fast = await fcp(0);
  const slow = await fcp(10000);
  assert(slow - fast < 150, `FCP ${fast.toFixed(0)} vs ${slow.toFixed(0)} ms`);
  return `${fast.toFixed(0)} vs ${slow.toFixed(0)} ms`;
});

await check("E16", "canvas text shapes Arabic exactly as the page does", async () => {
  const { context, page } = await film("/?tier=L", { width: 390, height: 844, locale: "ar" });
  const widths = await page.evaluate(() => {
    const element = document.querySelector(".cta__wordmark");
    const style = getComputedStyle(element);
    const range = document.createRange();
    range.selectNodeContents(element);
    const dom = range.getBoundingClientRect().width;
    const ctx = document.createElement("canvas").getContext("2d");
    ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    ctx.direction = "rtl";
    return { dom, canvas: ctx.measureText(element.textContent.trim()).width };
  });
  assert(Math.abs(widths.dom - widths.canvas) <= 0.5, `dom ${widths.dom} canvas ${widths.canvas}`);
  await context.close();
  return `${widths.dom.toFixed(1)} px`;
});

await check("E17", "wordmark fills from the physical right in both locales", async () => {
  for (const [locale, path] of PAGES) {
    const { context, page } = await film(`${path}?tier=L`, { width: 1440, height: 900, locale }, { all: true });
    const frames = await page.evaluate(() => {
      const world = window.__enjazWorld;
      const shot = world.layout.shots["process.head"];
      world.freeze(4.2);
      const gl = world.renderer.getContext();
      const read = (fraction) => {
        world.seek(shot.pinStart + (shot.pinEnd - shot.pinStart) * fraction);
        world.renderOnce();
        const width = gl.drawingBufferWidth;
        const height = gl.drawingBufferHeight;
        const pixels = new Uint8Array(width * height * 4);
        gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        let sum = 0;
        let count = 0;
        for (let i = 0; i < pixels.length; i += 4) {
          /* Bright, saturated fill pixels. */
          if (pixels[i + 2] > 180 && pixels[i + 1] > 100) {
            sum += (i / 4) % width;
            count += 1;
          }
        }
        return { x: count ? sum / count / width : 0, count };
      };
      return { early: read(0.3), late: read(0.95) };
    });
    assert(frames.early.count > 0, `${path}: no fill at 30%`);
    assert(frames.late.count > frames.early.count, `${path}: fill did not grow`);
    assert(frames.early.x > frames.late.x, `${path}: early fill should sit further right (${frames.early.x} vs ${frames.late.x})`);
    await context.close();
  }
});

await check("E18", "the Arabic film mirrors the English one", async () => {
  const center = async (locale, path) => {
    const { context, page } = await film(`${path}?tier=L`, { width: 1440, height: 900, locale }, { all: true });
    const value = await page.evaluate(() => {
      const world = window.__enjazWorld;
      const free = world.solved["svc.web"].free;
      return { x: free.x + free.w / 2, W: world.layout.W };
    });
    await context.close();
    return value;
  };
  const en = await center("en", "/en/");
  const ar = await center("ar", "/");
  const mirrored = en.W - en.x;
  assert(Math.abs(mirrored - ar.x) < en.W * 0.08, `en ${en.x}, ar ${ar.x}`);
});

await check("E19", "the 404 page loads no scripts, one image, and shows its copy", async () => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const requests = [];
  const page = await context.newPage();
  page.on("request", (request) => requests.push(request.url()));
  await page.goto(`${site.url}/nope/`);
  await page.waitForLoadState("load");
  assert(!requests.some((url) => /\.js/.test(url)), "scripts requested");
  const images = requests.filter((url) => /\.webp/.test(url));
  assert(images.length === 1, `images: ${images.join(", ")}`);
  assert(await page.evaluate(() => document.querySelector("h1").getBoundingClientRect().height > 0), "no h1");
  await context.close();
});

await check("E20", "print gets the plain page", async () => {
  const { context, page } = await tall("/en/", { width: 1280, height: 900 });
  await page.emulateMedia({ media: "print" });
  const state = await page.evaluate(() => ({
    dock: getComputedStyle(document.querySelector(".wa-dock")).display,
    height: document.documentElement.scrollHeight / window.innerHeight,
  }));
  assert(state.dock === "none", `dock ${state.dock}`);
  assert(state.height < 8, `${state.height.toFixed(1)} screens tall in print`);
  await context.close();
});

await check("E21", "20 stills, within their size limits", () => {
  const dir = join(REPO, "assets/img/world/v1");
  assert(existsSync(dir), "no stills");
  const files = readdirSync(dir);
  assert(files.length === 20, `${files.length} files`);
  for (const file of files) {
    const size = statSync(join(dir, file)).size;
    const limit = (file.endsWith("-p.webp") ? 28 : 48) * 1024;
    assert(size <= limit, `${file}: ${size}`);
  }
});

await browser.close();
await site.close();
await fixture.close();

const failed = results.filter((result) => !result.ok);
console.log(`\n${results.length - failed.length} passed, ${failed.length} failed`);
for (const result of failed) {
  console.log(`  ${result.id} ${result.name}: ${String(result.note).slice(0, 240)}`);
}
process.exit(failed.length ? 1 : 0);
