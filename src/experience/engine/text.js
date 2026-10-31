/**
 * Everything printed in the world. All of it comes from the DOM or from data-atlas
 * and is drawn with canvas 2D, because the browser shapes Arabic there exactly as
 * it does on the page. Whole-line wipes only: never per-letter, never letterSpacing.
 */

import { canvasTexture } from "../programs.js";

const GRID = 4; // The atlas is a 4 x 4 grid of paper faces.
const CELLS = ["invoice", "receipt", "quote", "ledger", "sheet", "slip", "lines", "dossier", "carbon", "memo", "tape", "blank"];

const uniqueText = (selector) => {
  const seen = new Set();
  for (const element of document.querySelectorAll(selector)) {
    const text = element.textContent.trim();
    if (text && text !== "✦") {
      seen.add(text);
    }
  }
  return [...seen];
};

export async function waitForFonts(arabic) {
  const wanted = [
    document.fonts.load('400 20px "IBM Plex Mono"', "#REF! 0123"),
    document.fonts.load(arabic ? '700 48px "Noto Kufi Arabic"' : '700 48px "Space Grotesk"', arabic ? "إنجاز" : "ENJAZ"),
  ];
  await Promise.race([Promise.allSettled(wanted), new Promise((done) => setTimeout(done, 1500))]);
}

export function createText({ q, dir }) {
  const rtl = dir < 0;
  const main = document.querySelector("main");
  let words = {};
  try {
    words = JSON.parse(main?.dataset.atlas ?? "{}");
  } catch (error) {
    words = {};
  }
  const services = uniqueText(".ticker__track span");
  let phrases = [];
  try {
    phrases = JSON.parse(document.querySelector("[data-typewriter]")?.dataset.typewriter ?? "[]");
  } catch (error) {
    phrases = [];
  }
  const display = rtl ? '"Noto Kufi Arabic", system-ui' : '"Space Grotesk", system-ui';
  const mono = '"IBM Plex Mono", monospace';
  const digits = new Intl.NumberFormat(rtl ? "ar-EG" : "en-US", { useGrouping: false });

  const size = q.atlas;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const cellSize = size / GRID;

  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, size, size);

  const ink = "#23252e";
  const faint = "#9aa0ad";

  /* Draw inside one cell, in a 100 x 134 unit page space. */
  const page = (index, draw) => {
    const col = index % GRID;
    const row = Math.floor(index / GRID);
    ctx.save();
    ctx.beginPath();
    ctx.rect(col * cellSize, row * cellSize, cellSize, cellSize);
    ctx.clip();
    ctx.translate(col * cellSize, row * cellSize);
    ctx.scale(cellSize / 100, cellSize / 134);
    ctx.direction = rtl ? "rtl" : "ltr";
    ctx.textBaseline = "alphabetic";
    draw(ctx);
    ctx.restore();
  };

  const startX = (x) => (rtl ? 100 - x : x);
  const heading = (c, text, y, px = 12) => {
    c.fillStyle = ink;
    c.font = `700 ${px}px ${display}`;
    c.textAlign = "start";
    c.fillText(text, startX(8), y);
  };
  const rule = (c, y, from = 8, to = 92, color = faint, height = 0.7) => {
    c.fillStyle = color;
    c.fillRect(from, y, to - from, height);
  };
  /* Rows are bars rather than words: they must read as a form, not as copy. */
  const rows = (c, y, count, step, jitter = 0) => {
    for (let i = 0; i < count; i += 1) {
      const w = 34 + ((i * 37 + jitter) % 40);
      c.fillStyle = i % 3 === 0 ? ink : faint;
      c.fillRect(rtl ? 92 - w : 8, y + i * step, w, 1.4);
      c.fillStyle = faint;
      c.fillRect(rtl ? 8 : 80, y + i * step, 12, 1.4);
    }
  };

  page(0, (c) => {
    heading(c, words.invoice ?? "", 20, 14);
    rule(c, 26);
    rows(c, 34, 9, 7);
    rule(c, 104, 8, 92, ink, 1);
    c.fillStyle = ink;
    c.font = `600 9px ${mono}`;
    c.textAlign = rtl ? "left" : "right";
    c.fillText(digits.format(4820), rtl ? 8 : 92, 116);
  });
  page(1, (c) => {
    heading(c, words.receipt ?? "", 18, 12);
    rule(c, 24);
    rows(c, 32, 7, 6, 11);
    c.fillStyle = ink;
    c.fillRect(30, 100, 40, 12);
  });
  page(2, (c) => {
    heading(c, words.quote ?? "", 22, 15);
    rule(c, 28);
    rows(c, 38, 6, 8, 23);
    c.save();
    c.translate(68, 104);
    c.rotate(-0.26);
    c.strokeStyle = "#5e4bd8";
    c.lineWidth = 2;
    c.strokeRect(-23, -9, 46, 18);
    c.fillStyle = "#5e4bd8";
    c.font = `700 10px ${display}`;
    c.textAlign = "center";
    c.fillText(words.paid ?? "", 0, 4);
    c.restore();
  });
  /* Ledger: column A and the row numbers on the right on the Arabic page. */
  const ledger = (c, bad) => {
    const left = rtl ? 8 : 16;
    c.fillStyle = "#e6f6ee";
    for (let i = 0; i < 18; i += 2) {
      c.fillRect(0, 6 + i * 7, 100, 7);
    }
    c.strokeStyle = "#a9b7ae";
    c.lineWidth = 0.4;
    for (let x = 0; x <= 4; x += 1) {
      c.beginPath();
      c.moveTo(left + x * 19, 0);
      c.lineTo(left + x * 19, 134);
      c.stroke();
    }
    c.font = `400 4.8px ${mono}`;
    c.textAlign = "center";
    for (let i = 0; i < 18; i += 1) {
      c.fillStyle = faint;
      c.fillText(digits.format(i + 1), rtl ? 96 : 8, 11.5 + i * 7);
      for (let col = 0; col < 4; col += 1) {
        const seed = (i * 7 + col * 13) % 23;
        let value = digits.format(100 + seed * 317);
        if (bad && seed === 4) {
          value = "#REF!";
          c.fillStyle = "#c2352b";
        } else if (bad && seed === 9) {
          value = "#####";
          c.fillStyle = ink;
        } else {
          c.fillStyle = ink;
        }
        c.fillText(value, left + col * 19 + 9.5, 11.5 + i * 7);
      }
    }
  };
  page(3, (c) => {
    ledger(c, false);
    c.fillStyle = "rgba(255,255,255,.92)";
    c.fillRect(0, 0, 100, 16);
    heading(c, words.ledger ?? "", 12, 10);
  });
  page(4, (c) => ledger(c, true));
  /* Missed-call slip: a phone number's worth of digits and a red bar. */
  page(5, (c) => {
    c.fillStyle = "#c2352b";
    c.fillRect(8, 8, 84, 7);
    c.fillStyle = ink;
    c.font = `600 9px ${mono}`;
    c.textAlign = "center";
    for (let i = 0; i < 4; i += 1) {
      c.fillText(digits.format(1200 + i * 417), 50, 40 + i * 20);
    }
  });
  page(6, (c) => {
    for (let i = 0; i < 16; i += 1) {
      rule(c, 12 + i * 7.4, 6, 94, "#b7c2d8", 0.5);
    }
    rows(c, 14, 7, 7.4, 5);
  });
  page(7, (c) => {
    /* Manila dossier: a label and a cotton tape. */
    c.fillStyle = "#fff";
    c.fillRect(0, 0, 100, 134);
    c.fillStyle = "#f7efd9";
    c.fillRect(18, 18, 64, 30);
    heading(c, words.ledger ?? "", 38, 11);
    c.fillStyle = "#faf6ea";
    c.fillRect(0, 62, 100, 5);
  });
  page(8, (c) => {
    heading(c, words.invoice ?? "", 20, 13);
    rows(c, 30, 12, 6.6, 3);
  });
  page(9, (c) => {
    rows(c, 12, 16, 7, 17);
  });
  /* Calculator tape: a column of digits. */
  page(10, (c) => {
    c.fillStyle = ink;
    c.font = `400 7px ${mono}`;
    c.textAlign = "center";
    for (let i = 0; i < 12; i += 1) {
      c.fillText(digits.format(90 + i * 233), 50, 12 + i * 10.5);
    }
  });

  const texture = canvasTexture(canvas);
  texture.anisotropy = 4;

  /* The fanfold's printout: service names and phrases, read from the page. */
  const printCanvas = document.createElement("canvas");
  printCanvas.width = 512;
  printCanvas.height = 2048;
  const pc = printCanvas.getContext("2d");
  pc.fillStyle = "#fff";
  pc.fillRect(0, 0, 512, 2048);
  pc.direction = rtl ? "rtl" : "ltr";
  pc.textBaseline = "middle";
  const printX = rtl ? 512 - 44 : 44;
  pc.textAlign = "start";
  const lines = [];
  services.forEach((service, index) => {
    lines.push({ text: service, big: true });
    if (phrases[index % Math.max(1, phrases.length)]) {
      lines.push({ text: phrases[index % phrases.length], big: false });
    }
  });
  const gap = 2048 / Math.max(1, lines.length);
  lines.forEach((line, index) => {
    pc.fillStyle = line.big ? "#1f2a24" : "#3d4c44";
    pc.font = line.big ? `700 44px ${display}` : `400 25px ${rtl ? display : mono}`;
    pc.fillText(line.text, printX, gap * (index + 0.5), 424);
  });
  const printTexture = canvasTexture(printCanvas);
  printTexture.anisotropy = 4;

  return {
    texture,
    printTexture,
    services,
    phrases,
    words,
    display,
    mono,
    digits: (value) => digits.format(value),
    /** @returns {number[]} [u, v, w, h], with v measured for flipY textures. */
    cell(key) {
      const index = Math.max(0, CELLS.indexOf(key));
      const col = index % GRID;
      const row = Math.floor(index / GRID);
      return [col / GRID, 1 - (row + 1) / GRID, 1 / GRID, 1 / GRID];
    },
    title(shotId) {
      return document.querySelector(`[data-shot="${shotId}"] .card__title, [data-shot="${shotId}"] .step__title`)?.textContent.trim() ?? "";
    },
    /** A one-off canvas for a sign or a screen, drawn in reading direction. */
    canvas(width, height, draw, options) {
      const surface = document.createElement("canvas");
      surface.width = width;
      surface.height = height;
      const c = surface.getContext("2d");
      c.direction = rtl ? "rtl" : "ltr";
      draw(c, width, height);
      return canvasTexture(surface, options);
    },
  };
}
