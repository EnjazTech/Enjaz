/**
 * The clearing. The phone lands in the middle of the pool and the checklist clears
 * the desk in three rings, each taking what its bullet names. The clock starts to
 * run and the blinds begin to lighten. Scrolling back flies everything home again.
 */

import { Mesh, PlaneGeometry } from "three";
import { smoothstep } from "../engine/geo.js";

export default {
  *build(ctx) {
    const { programs } = ctx;
    /* The contact flash where it lands. */
    const flash = new Mesh(new PlaneGeometry(0.5, 0.5), programs.glow({ color: [0.365, 1, 0.87], alpha: 0, shape: 2 }));
    flash.rotation.x = -Math.PI / 2;
    flash.position.y = 0.002;
    ctx.group.add(flash);
    ctx.flash = flash;
    yield;
  },
  layout(ctx) {
    ctx.group.position.set(0, ctx.solved.deskAct4.y, 0);
  },
  update(p, ctx) {
    const uniforms = ctx.flash.material.uniforms;
    uniforms.uRadius.value = smoothstep(0.1, 0.3, p.hold) * 0.9;
    uniforms.uAlpha.value = (1 - smoothstep(0.14, 0.34, p.hold)) * smoothstep(0.1, 0.14, p.hold) * 1.4;
  },
};
