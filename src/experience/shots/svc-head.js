/**
 * Out of the slab and into everything that was ever filed: straight down, with a
 * dolly-zoom as you clear the ceiling and a small mint mark far below.
 */

import { CylinderGeometry, Mesh, PlaneGeometry } from "three";
import { WORLD } from "../engine/rail.js";

export default {
  *build(ctx) {
    const { programs } = ctx;
    /* The shaft of tungsten from the hole above. */
    const beam = new Mesh(
      new CylinderGeometry(0.6, 3.4, 28, 24, 1, true),
      programs.glow({
        color: [1, 0.7, 0.4],
        alpha: 0.075,
        shape: 5,
        deform: { frag: `a = vUv.y * vUv.y; { float f = abs(dot(normalize(vN), normalize(vV))); a *= f; }` },
      })
    );
    beam.position.set(0, WORLD.slabBottom - 14, 0);
    beam.frustumCulled = false;
    ctx.group.add(beam);
    ctx.beam = beam;

    /* The mark far below: where you are going. */
    const mark = new Mesh(
      new PlaneGeometry(1, 1),
      programs.glow({ color: [0.365, 1, 0.87], alpha: 0.85, defines: { BILLBOARD: 1, NOFOG: 1 } })
    );
    mark.frustumCulled = false;
    ctx.group.add(mark);
    ctx.mark = mark;
    yield;
  },
  update(p, ctx) {
    const word = ctx.solved["process.head"];
    /* Far enough to read small, but always inside the camera's far plane. */
    ctx.mark.position.set(0, ctx.u.uCamY.value - Math.min(78, ctx.u.uCamY.value - word.floorY), 0);
    const s = 1.6 + p.hold * 1.2;
    ctx.mark.scale.set(s, s, 1);
    ctx.mark.material.uniforms.uAlpha.value = 0.85 * (1 - p.exit);
    ctx.beam.material.uniforms.uAlpha.value = 0.075 * (1 - p.exit * 0.8);
  },
};
