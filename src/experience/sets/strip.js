/**
 * The one strip of fanfold paper, from the printer to the phone. Width and
 * emission are functions of arc length, so there is no join between paper and
 * line. Rebuilt whenever the layout rebakes, because the floors move.
 */

import { BufferAttribute, BufferGeometry, DynamicDrawUsage, Mesh } from "three";
import { smoothstep, lerp } from "../engine/geo.js";
import { WORLD } from "../engine/rail.js";

const MAX_RINGS = 4200;
const PAPER_HALF = 0.12;
const ARCHIVE_HALF = 0.6;
const LINE_HALF = 0.03;

export function createStrip({ programs, shared, printTexture, dir }) {
  const positions = new BufferAttribute(new Float32Array(MAX_RINGS * 2 * 3), 3).setUsage(DynamicDrawUsage);
  const across = new BufferAttribute(new Float32Array(MAX_RINGS * 2 * 3), 3).setUsage(DynamicDrawUsage);
  const sides = new BufferAttribute(new Float32Array(MAX_RINGS * 2), 1);
  const arcs = new BufferAttribute(new Float32Array(MAX_RINGS * 2), 1).setUsage(DynamicDrawUsage);
  const widths = new BufferAttribute(new Float32Array(MAX_RINGS * 2), 1).setUsage(DynamicDrawUsage);
  const index = new Uint32Array((MAX_RINGS - 1) * 6);

  for (let i = 0; i < MAX_RINGS; i += 1) {
    sides.array[i * 2] = -1;
    sides.array[i * 2 + 1] = 1;
    if (i < MAX_RINGS - 1) {
      const a = i * 2;
      index.set([a, a + 1, a + 2, a + 1, a + 3, a + 2], i * 6);
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", positions);
  geometry.setAttribute("aAcross", across);
  geometry.setAttribute("aSide", sides);
  geometry.setAttribute("aS", arcs);
  geometry.setAttribute("aW", widths);
  geometry.setIndex(new BufferAttribute(index, 1));

  const u = {
    uFeed: { value: 0 },
    uLine: { value: 1e6 },
    uLineLen: { value: 4 },
    uJamA: { value: 0 },
    uJamB: { value: 0 },
    uJamK: { value: 0 },
    uFlutter: { value: 1 },
    uWide: { value: 1e6 },
    uPrint: { value: printTexture },
    uPrintRange: { value: 0 },
    uPaperGlow: { value: 0.22 },
    uLineColor: { value: [0.365, 1, 0.87] },
  };

  const material = programs.strip({ uniforms: u, side: 2 });
  const mesh = new Mesh(geometry, material);
  mesh.frustumCulled = false;

  const halo = new Mesh(
    geometry,
    programs.glow({
      color: [0.365, 1, 0.87],
      alpha: 0.5,
      shape: 5,
      house: 0,
      deform: {
        pars: `in vec3 aAcross; in float aSide, aS, aW; uniform float uLine, uLineLen; out float vSide, vAlive;`,
        fpars: `in float vSide, vAlive;`,
        local: `p += aAcross * aSide * max(aW * 5.0, 0.16);`,
        world: `vSide = aSide; vAlive = smoothstep(uLine + uLineLen * 0.7, uLine + uLineLen, aS);`,
        frag: `a = (1.0 - abs(vSide)); a = a * a * vAlive;`,
        uniforms: { uLine: u.uLine, uLineLen: u.uLineLen },
      },
    })
  );
  halo.frustumCulled = false;

  /* Ring table for pointAt and the draw range. */
  const ringS = new Float32Array(MAX_RINGS);
  const ringY = new Float32Array(MAX_RINGS);
  let rings = 0;
  let verticalFrom = 0;
  let verticalS = 0;
  let verticalY = 0;

  const pushRing = (x, y, z, ax, ay, az, s, w) => {
    if (rings >= MAX_RINGS) {
      return;
    }
    const a = rings * 2;
    positions.setXYZ(a, x, y, z);
    positions.setXYZ(a + 1, x, y, z);
    across.setXYZ(a, ax, ay, az);
    across.setXYZ(a + 1, ax, ay, az);
    arcs.setX(a, s);
    arcs.setX(a + 1, s);
    widths.setX(a, w);
    widths.setX(a + 1, w);
    ringS[rings] = s;
    ringY[rings] = y;
    rings += 1;
  };

  /**
   * @param yaws sorted list of { y, yaw } giving the ribbon's facing by height.
   * @param marks { lineStart: y where the paper starts narrowing, end: bottom y,
   *                dense: [{a, b}] y ranges needing fine rings for vertex effects }
   */
  function rebuild({ yaws, lineStartY, endY, dense }) {
    rings = 0;
    let s = 0;

    /* On the desk: out of the printer, across the wood, over the front edge. */
    const x0 = 0.31 * dir;
    const onDesk = [
      [x0, 0.11, -0.5],
      [x0, 0.085, -0.43],
      [x0 * 0.92, 0.012, -0.34],
      [x0 * 0.62, 0.003, -0.24],
      [x0 * 0.22, 0.003, -0.11],
      [0, 0.003, -0.025],
      [0, -0.004, 0.008],
      [0, -0.03, 0.012],
    ];
    const steps = 24;
    let last = onDesk[0];
    for (let k = 0; k < onDesk.length - 1; k += 1) {
      const p0 = onDesk[Math.max(0, k - 1)];
      const p1 = onDesk[k];
      const p2 = onDesk[k + 1];
      const p3 = onDesk[Math.min(onDesk.length - 1, k + 2)];
      for (let j = k === 0 ? 0 : 1; j <= steps; j += 1) {
        const t = j / steps;
        const t2 = t * t;
        const t3 = t2 * t;
        const q = [0, 1, 2].map((c) =>
          0.5 * (2 * p1[c] + (p2[c] - p0[c]) * t + (2 * p0[c] - 5 * p1[c] + 4 * p2[c] - p3[c]) * t2 + (3 * p1[c] - p0[c] - 3 * p2[c] + p3[c]) * t3)
        );
        const dx = q[0] - last[0];
        const dy = q[1] - last[1];
        const dz = q[2] - last[2];
        s += Math.hypot(dx, dy, dz);
        const len = Math.hypot(dx, dz) || 1;
        /* Across the strip, in the desk plane. */
        pushRing(q[0], q[1], q[2], dz / len || 1, 0, -dx / len || 0, s, PAPER_HALF);
        last = q;
      }
    }

    /* The long fall: straight down x=0, z=0. Dense rings only where effects need them. */
    verticalFrom = rings;
    verticalS = s;
    verticalY = last[1];
    let y = last[1];
    let yawIndex = 0;
    while (y > endY && rings < MAX_RINGS) {
      let step = 0.22;
      if (y > WORLD.slabBottom - 0.5) {
        step = 0.05;
      }
      for (const range of dense) {
        if (y < range.a && y > range.b) {
          step = 0.022;
        }
      }
      y -= step;
      s += step;
      while (yawIndex < yaws.length - 1 && y < yaws[yawIndex + 1].y) {
        yawIndex += 1;
      }
      const from = yaws[yawIndex];
      const to = yaws[Math.min(yawIndex + 1, yaws.length - 1)];
      const u2 = to === from ? 0 : smoothstep(0.25, 0.75, (from.y - y) / Math.max(0.001, from.y - to.y));
      const yaw = (lerp(from.yaw, to.yaw, u2) * Math.PI) / 180;
      const sinkingIntoSlab = smoothstep(WORLD.floorY - 0.2, WORLD.slabBottom + 0.2, y);
      let w = lerp(PAPER_HALF, ARCHIVE_HALF, sinkingIntoSlab);
      if (y < lineStartY) {
        w = lerp(w, LINE_HALF, smoothstep(0, 4, lineStartY - y));
      }
      pushRing(0, y, 0, Math.cos(yaw), 0, Math.sin(yaw), s, w);
    }

    positions.needsUpdate = true;
    across.needsUpdate = true;
    arcs.needsUpdate = true;
    widths.needsUpdate = true;
    u.uLine.value = sAtY(lineStartY);
    u.uPrintRange.value = sAtY(WORLD.floorY - 0.1);
    u.uWide.value = sAtY(WORLD.deskY);
  }

  function sAtY(y) {
    return verticalS + (verticalY - y);
  }

  function ringAtS(target) {
    let lo = 0;
    let hi = rings - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (ringS[mid] < target) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }
    return lo;
  }

  /** Limits drawing to rings near the camera. */
  function focus(cameraY, far) {
    const top = cameraY + far;
    const start = top > verticalY ? 0 : ringAtS(sAtY(top));
    const end = ringAtS(sAtY(cameraY - far));
    const count = Math.max(0, end - start) * 6;
    geometry.setDrawRange(start * 6, count);
  }

  return {
    mesh,
    halo,
    u,
    rebuild,
    focus,
    sAtY,
    /** World position at height y on the vertical stretch, which is x=0, z=0. */
    pointAtY(y, out) {
      out[0] = 0;
      out[1] = y;
      out[2] = 0;
      return out;
    },
    get rings() {
      return rings;
    },
    verticalFrom() {
      return verticalFrom;
    },
  };
}
