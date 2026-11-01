/** Shared by the acceptance suite and the contact-sheet script. */

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

export const REPO = resolve(fileURLToPath(new URL("../../..", import.meta.url)));
export const RESULTS = resolve(fileURLToPath(new URL("../test-results", import.meta.url)));

/* Software GL: proves correctness, says nothing about real phones. */
export const GL_ARGS = [
  "--use-angle=swiftshader",
  "--use-gl=angle",
  "--enable-unsafe-swiftshader",
  "--ignore-gpu-blocklist",
  "--enable-webgl",
];

export const VIEWPORTS = [
  [360, 640],
  [390, 844],
  [412, 915],
  [768, 1024],
  [1280, 720],
  [1440, 900],
  [1920, 1080],
];

export const launch = (extra = []) =>
  chromium.launch({ headless: true, args: [...GL_ARGS, ...extra] });

/** Records console errors, page errors and CSP violations for a page. */
export function watch(page) {
  const problems = [];
  page.on("pageerror", (error) => problems.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    const text = message.text();
    /* SwiftShader lacks parallel compile; missing stills are checked by E21. */
    if (message.type() === "error" && !/assets\/img\/world/.test(message.location().url ?? "")) {
      problems.push(`console: ${text}`);
    }
    if (message.type() === "warning" && !/KHR_parallel_shader_compile/.test(text)) {
      problems.push(`warning: ${text}`);
    }
  });
  return problems;
}

/** waitForFunction with a string predicate is an eval, which the CSP blocks. */
export async function until(page, predicate, { timeout = 60000, every = 100, arg } = {}) {
  const deadline = Date.now() + timeout;
  for (;;) {
    if (await page.evaluate(predicate, arg)) {
      return true;
    }
    if (Date.now() > deadline) {
      throw new Error(`timed out waiting for: ${predicate}`);
    }
    await page.waitForTimeout(every);
  }
}

/* Frames and measurements need the page to stay where it was put, so autoplay goes
   off here. E29 is the check that turns it back on. */
export const lampOn = async (page, timeout = 120000) => {
  await until(page, () => document.documentElement.classList.contains("world-on"), { timeout });
  await page.evaluate(() => window.__enjazWorld.setAutoplay(false));
};

/** Today's site, extracted from main, for parity checks. */
export function mainFixture() {
  const dir = join(RESULTS, "fixture-main");
  if (!existsSync(join(dir, "index.html"))) {
    mkdirSync(dir, { recursive: true });
    const tar = execFileSync("git", ["archive", "main"], { cwd: REPO, maxBuffer: 1 << 28 });
    execFileSync("tar", ["-x", "-C", dir], { input: tar });
  }
  return dir;
}
