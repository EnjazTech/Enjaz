/**
 * Fails when the film outgrows its byte budget, measured at gzip -6 like production.
 *   node tools/size-gate.mjs
 */

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

const DIR = fileURLToPath(new URL("../../../assets/js/experience", import.meta.url));
const TOTAL_LIMIT = 200 * 1024;
const BOOT_LIMIT = 2.5 * 1024;
const FIRST_LIMIT = 155 * 1024;

const gz = (file) => gzipSync(readFileSync(join(DIR, file)), { level: 6 }).length;
const files = readdirSync(DIR).filter((file) => file.endsWith(".js"));
const total = files.reduce((sum, file) => sum + gz(file), 0);
const boot = gz("boot.js");

/* Everything statically reachable from the world entry: what a phone waits for. */
const worldFile = files.find((file) => file.startsWith("world-"));
const seen = new Set();
const walk = (file) => {
  if (seen.has(file)) {
    return;
  }
  seen.add(file);
  const source = readFileSync(join(DIR, file), "utf8");
  for (const match of source.matchAll(/(?:from|import)\s*"\.\/([^"]+\.js)"/g)) {
    walk(match[1]);
  }
};
walk(worldFile);
const first = [...seen].reduce((sum, file) => sum + gz(file), boot);

const kb = (value) => `${(value / 1024).toFixed(1)} KB`;
console.log(`total ${kb(total)} (limit ${kb(TOTAL_LIMIT)})`);
console.log(`boot.js ${kb(boot)} (limit ${kb(BOOT_LIMIT)})`);
console.log(`before lamp-on ${kb(first)} (limit ${kb(FIRST_LIMIT)})`);

if (total > TOTAL_LIMIT || boot > BOOT_LIMIT || first > FIRST_LIMIT) {
  console.error("size gate failed");
  process.exit(1);
}
