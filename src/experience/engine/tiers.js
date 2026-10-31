/**
 * Quality tiers. No DOM at import time, so it runs under plain Node for tests.
 * Every number except bytes is a target until measured on a real device.
 */

export const FORCED_TIER = /[?&]tier=(L|M|H)\b/;

const SOFTWARE = /swiftshader|llvmpipe|softpipe|software|basic render/i;
const BELOW_L = /adreno[^0-9]*[34]\d\d\b|mali-4\d\d|mali-t[678]\d\d|powervr sgx|ge8100/i;
const LOW = /adreno[^0-9]*(50[5-9]|5[1-3]\d|540|610|612|613|616)\b|mali-g(31|51|52|57)\b|ge832[02]/i;
const MID = /adreno[^0-9]*6\d\d\b|mali-g(68|71|72|76|77|78)\b|apple gpu|intel|amd radeon\(tm\) graphics/i;
const HIGH = /adreno[^0-9]*[7-9]\d\d\b|mali-g[7-9]\d\d\b|immortalis|apple m\d|nvidia|geforce|radeon|\bamd\b/i;

/** @returns {'L'|'M'|'H'|'S'} S means straight to stills. */
export function classify(renderer, mobile) {
  if (SOFTWARE.test(renderer) || BELOW_L.test(renderer)) {
    return "S";
  }
  if (LOW.test(renderer)) {
    return "L";
  }
  if (MID.test(renderer)) {
    return "M";
  }
  if (HIGH.test(renderer)) {
    return "H";
  }
  return mobile ? "L" : "M";
}

export function isMobileDevice(nav = navigator) {
  return /Android|iPhone|iPad|iPod/i.test(nav.userAgent) || nav.maxTouchPoints > 1;
}

export const QUALITY = {
  L: {
    pixelCap: 0.55e6,
    draws: 28,
    tris: 70000,
    sheets: 420,
    sheetSeg: 2,
    stacks: 180,
    dossiers: 120,
    boxes: 1400,
    weather: 140,
    uxGrid: [32, 45],
    shadowSize: 1024,
    shadowTaps: 1,
    atlas: 512,
    dust: 60,
    allReflections: false,
    film: false,
  },
  M: {
    pixelCap: 1.3e6,
    draws: 45,
    tris: 220000,
    sheets: 1100,
    sheetSeg: 3,
    stacks: 360,
    dossiers: 240,
    boxes: 3000,
    weather: 320,
    uxGrid: [48, 68],
    shadowSize: 1024,
    shadowTaps: 4,
    atlas: 1024,
    dust: 150,
    allReflections: true,
    film: false,
  },
  H: {
    pixelCap: 2.8e6,
    draws: 70,
    tris: 600000,
    sheets: 2400,
    sheetSeg: 4,
    stacks: 720,
    dossiers: 480,
    boxes: 6000,
    weather: 700,
    uxGrid: [64, 90],
    shadowSize: 2048,
    shadowTaps: 8,
    atlas: 2048,
    dust: 300,
    allReflections: true,
    film: true,
  },
};
