/**
 * The Turnover. The line reaches the wordmark lying flat across the shaft, and
 * the letters fill from right to left in both locales. As they fill, the whole
 * building turns over, and the back of the paper is software. The camera dives
 * through a natural gap in the word and never looks back up: seen from below the
 * word would be mirrored, and mirrored Arabic is a typographic defect.
 */

import { ExtrudeGeometry, Mesh, ShapePath } from "three";
import { part, smoothstep } from "../engine/geo.js";
import { WORDMARK } from "../generated/wordmark.js";

const WIDE = 8;

export default {
  *build(ctx) {
    const { programs } = ctx;
    const [minX, minY, maxX, maxY] = WORDMARK.bounds;
    const scale = WIDE / (maxX - minX);
    const gapCentre = (WORDMARK.gap[0] + WORDMARK.gap[1]) / 2;
    const midY = (minY + maxY) / 2;

    const path = new ShapePath();
    for (const flat of WORDMARK.shapes) {
      for (let i = 0; i < flat.length; ) {
        const type = flat[i];
        if (type === "M") {
          path.moveTo(flat[i + 1], flat[i + 2]);
          i += 3;
        } else if (type === "L") {
          path.lineTo(flat[i + 1], flat[i + 2]);
          i += 3;
        } else if (type === "Q") {
          path.quadraticCurveTo(flat[i + 1], flat[i + 2], flat[i + 3], flat[i + 4]);
          i += 5;
        } else if (type === "C") {
          path.bezierCurveTo(flat[i + 1], flat[i + 2], flat[i + 3], flat[i + 4], flat[i + 5], flat[i + 6]);
          i += 7;
        } else {
          i += 1;
        }
      }
    }
    const geometry = new ExtrudeGeometry(path.toShapes(), { depth: 130, bevelEnabled: false, curveSegments: 4 });
    /* Font +y maps to world -z, so it reads correctly from above at nadir. */
    geometry.translate(-gapCentre, -midY, 0);
    geometry.rotateX(-Math.PI / 2);
    geometry.scale(scale, scale, scale);

    const left = (minX - gapCentre) * scale;
    const right = (maxX - gapCentre) * scale;
    ctx.fillFrom = right;
    ctx.fillTo = left;

    const material = programs.solid({
      ambient: 0.1,
      deform: {
        pars: `out float vX;`,
        fpars: `in float vX; uniform float uFront; uniform vec2 uSpan;`,
        world: `vX = position.x;`,
        frag: `{
          /* The same colours as the DOM wordmark: mint on the left, violet on the right. */
          vec3 grad = mix(vec3(0.365, 1.0, 0.87), vec3(0.643, 0.545, 1.0), clamp((vX - uSpan.x) / (uSpan.y - uSpan.x), 0.0, 1.0));
          c = mix(c, grad, smoothstep(uFront - 0.08, uFront + 0.08, vX));
        }`,
        uniforms: { uFront: { value: 99 }, uSpan: { value: [left, right] } },
      },
    });
    const word = new Mesh(part(geometry, { color: [0.3, 0.31, 0.34] }), material);
    ctx.group.add(word);
    ctx.word = word;
    ctx.front = material.uniforms.uFront;
    yield;
  },
  update(p, ctx) {
    const fill = smoothstep(0.02, 0.92, p.hold);
    ctx.front.value = ctx.fillFrom + (ctx.fillTo - ctx.fillFrom) * fill + (fill === 0 ? 0.5 : 0);
  },
};
