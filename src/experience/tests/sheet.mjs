/** Tiles a set of contact PNGs into one image, for reviewing the film at a glance.
 *   node tests/sheet.mjs out.png columns cellWidth file1.png file2.png ...
 */
import { readFileSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";

const [out, columns, cell, ...files] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(columns) * Number(cell), height: 100 } });
const images = files.map((file) => {
  const data = readFileSync(file).toString("base64");
  const label = file.split("/").pop().replace(/\.png$/, "");
  return `<figure><img src="data:image/png;base64,${data}"><figcaption>${label}</figcaption></figure>`;
});
await page.setContent(`<style>body{margin:0;background:#222;display:grid;grid-template-columns:repeat(${columns},1fr)}figure{margin:0;position:relative}img{width:100%;display:block}figcaption{position:absolute;left:4px;bottom:3px;font:11px monospace;color:#fff;background:#000a;padding:1px 4px}</style>${images.join("")}`);
await page.waitForLoadState("networkidle");
await page.screenshot({ path: out, fullPage: true });
await browser.close();
