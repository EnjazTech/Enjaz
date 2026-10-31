/**
 * Renders the fallback stills from the real engine, at dev time: 5 scenes x 2
 * locales x 2 orientations. Used by reduced-motion and low-end visitors, the poster
 * before lamp-on, and the 404. DOM text is never in them: this reads the canvas.
 *
 * Bump v1 in main.css and here when regenerating, since /assets/img/ caches for 30 days.
 *
 *   node tools/render-stills.mjs
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { lampOn, launch, REPO } from "../tests/helpers.mjs";
import { serve } from "../tests/server.mjs";

const OUT = join(REPO, "assets/img/world/v1");
mkdirSync(OUT, { recursive: true });

const ORIENTATIONS = [
  { key: "p", width: 720, height: 1560, limit: 28 * 1024 },
  { key: "l", width: 1600, height: 1000, limit: 48 * 1024 },
];

/* Where each still comes from: a shot, and how far through its hold. */
const SCENES = [
  { name: "desk", shot: "hero", at: 0 },
  { name: "archive", shot: "svc.web", at: 0.8 },
  { name: "shaft", shot: "process.head", at: 0.6 },
  { name: "aerial", shot: "why.q", at: 0.5 },
  { name: "dawn", shot: "why.stats", at: 1 },
];

const { url, close } = await serve();
const browser = await launch();

for (const locale of ["ar", "en"]) {
  for (const { key, width, height, limit } of ORIENTATIONS) {
    const context = await browser.newContext({ viewport: { width, height }, locale });
    const page = await context.newPage();
    await page.goto(`${url}${locale === "ar" ? "/" : "/en/"}?tier=H`);
    await lampOn(page, 240000);
    await page.evaluate(async () => {
      window.__enjazWorld.freeze(4.2);
      await window.__enjazWorld.loadAll();
    });

    for (const { name, shot, at } of SCENES) {
      /* Read in the same task as the render: the drawing buffer is not preserved. */
      let quality = 0.86;
      let data = "";
      for (;;) {
        data = await page.evaluate(
          ({ shot: id, at: fraction, quality: q }) => {
            const world = window.__enjazWorld;
            const range = world.layout.shots[id];
            world.seek(range.pinStart + (range.pinEnd - range.pinStart) * fraction);
            world.renderOnce();
            return document.querySelector("canvas.world").toDataURL("image/webp", q);
          },
          { shot, at, quality }
        );
        const bytes = Buffer.from(data.split(",")[1], "base64");
        if (bytes.length <= limit || quality < 0.2) {
          const file = `${name}-${locale}-${key}.webp`;
          writeFileSync(join(OUT, file), bytes);
          console.log(`${file} ${(bytes.length / 1024).toFixed(1)} KB q=${quality.toFixed(2)}`);
          break;
        }
        quality -= 0.06;
      }
    }
    await context.close();
  }
}

await browser.close();
await close();
