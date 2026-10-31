/**
 * Contact sheet: seeks each shot to mid-hold and transit, and saves PNGs.
 *   node tests/contact.mjs [--shots=hero,drop] [--tier=L] [--locales=en,ar]
 *                          [--sizes=390x844,1440x900] [--at=hold,exit] [--tag=name]
 */

import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { lampOn, launch, RESULTS, watch } from "./helpers.mjs";
import { serve } from "./server.mjs";

const arg = (name, fallback) => process.argv.find((item) => item.startsWith(`--${name}=`))?.split("=")[1] ?? fallback;

const wanted = arg("shots", "")?.split(",").filter(Boolean);
const tier = arg("tier", "L");
const locales = arg("locales", "en,ar").split(",");
const sizes = arg("sizes", "390x844,1440x900").split(",").map((size) => size.split("x").map(Number));
const at = arg("at", "hold").split(",");
const tag = arg("tag", "");
const out = join(RESULTS, "contact");
mkdirSync(out, { recursive: true });

const { url, close } = await serve({ experienceDir: arg("experience-dir", null) });
const browser = await launch();
let failures = 0;

for (const locale of locales) {
  for (const [width, height] of sizes) {
    const context = await browser.newContext({ viewport: { width, height }, locale: locale === "ar" ? "ar" : "en" });
    const page = await context.newPage();
    const problems = watch(page);
    await page.goto(`${url}${locale === "ar" ? "/" : "/en/"}?tier=${tier}`);
    await lampOn(page);
    await page.evaluate(async () => {
      window.__enjazWorld.freeze(4.2);
      await window.__enjazWorld.loadAll();
    });

    const stops = await page.evaluate(({ wanted: ids, at: kinds }) => {
      const world = window.__enjazWorld;
      const list = [];
      const order = Object.keys(world.status());
      order.forEach((id, index) => {
        if (ids.length && !ids.includes(id)) {
          return;
        }
        const shot = world.layout.shots[id];
        const nextId = order[index + 1];
        const next = nextId ? world.layout.shots[nextId] : null;
        if (kinds.includes("hold")) {
          list.push({ name: `${id}.hold`, y: (shot.pinStart + shot.pinEnd) / 2 });
        }
        if (kinds.includes("start")) {
          list.push({ name: `${id}.start`, y: shot.pinStart });
        }
        if (kinds.includes("end")) {
          list.push({ name: `${id}.end`, y: shot.pinEnd });
        }
        if (kinds.includes("exit") && next) {
          list.push({ name: `${id}.exit`, y: (shot.pinEnd + next.pinStart) / 2 });
        }
      });
      return list;
    }, { wanted, at });

    for (const stop of stops) {
      await page.evaluate((y) => {
        const world = window.__enjazWorld;
        world.seek(y);
        world.renderOnce();
      }, stop.y);
      await page.waitForTimeout(120);
      const name = `${stop.name.replace(/\./g, "-")}${tag ? `-${tag}` : ""}-${locale}-${width}.png`;
      await page.screenshot({ path: join(out, name) });
      const info = await page.evaluate(() => window.__enjazWorld.info());
      console.log(`${name} draws=${info.calls} tris=${info.triangles} programs=${info.programs}`);
    }

    if (problems.length) {
      failures += 1;
      console.log(`PROBLEMS ${locale} ${width}:`, [...new Set(problems)].slice(0, 12).join("\n"));
    }
    await context.close();
  }
}

await browser.close();
await close();
process.exit(failures ? 1 : 0);
