/**
 * Scope: fixed price, fixed plan. A ring of 48 ticks lights one by one, an hour
 * per tick, around a phone that exists only as a wireframe. At tick 48 four
 * crop-mark brackets clamp shut. Deliberately one of the quietest frames.
 */

import { BoxGeometry, CylinderGeometry, Mesh } from "three";
import { box, instances, merge, part, quatEuler, smoothstep } from "../engine/geo.js";

export default {
  *build(ctx) {
    const { programs, sets } = ctx;
    ctx.group.add(
      new Mesh(
        part(new CylinderGeometry(1.75, 1.8, 0.06, 64), { at: [0, -0.04, 0], color: [0.12, 0.13, 0.16] }),
        programs.solid({ ambient: 0.13 })
      )
    );

    const tick = part(new BoxGeometry(0.03, 0.012, 0.16));
    const material = programs.solid({
      ambient: 0.22,
      defines: { INSTANCED: 1 },
      deform: {
        pars: `uniform float uLit; out float vLit;`,
        fpars: `in float vLit;`,
        world: `vLit = step(seed, uLit);`,
        frag: `c = mix(c, vec3(0.365, 1.0, 0.87), vLit);`,
        uniforms: { uLit: { value: 0 } },
      },
    });
    const ticks = new Mesh(
      instances(tick, 48, (i, o) => {
        const a = (i / 48) * Math.PI * 2 * ctx.dir;
        o.pos = [Math.sin(a) * 1.5, 0.002, -Math.cos(a) * 1.5];
        quatEuler(0, -a, 0, o.quat);
        o.seed = (i + 0.5) / 48;
        o.tint = [0.5, 0.52, 0.58];
      }),
      material
    );
    ticks.frustumCulled = false;
    ctx.group.add(ticks);
    ctx.lit = material.uniforms.uLit;
    yield;

    /* The same outline as the real phone, lying flat in the ring. */
    const wire = sets.phone.wire({ w: 0.86, h: 1.76, t: 0.1 });
    wire.position.y = 0.08;
    ctx.group.add(wire);

    const bracket = merge([
      box(0.32, 0.02, 0.04, { at: [0.14, 0, 0], color: [0.643, 0.545, 1], mat: 2 }),
      box(0.04, 0.02, 0.32, { at: [0, 0, 0.14], color: [0.643, 0.545, 1], mat: 2 }),
    ]);
    const brackets = new Mesh(
      instances(bracket, 4, (i, o) => {
        o.pos = [0, 0.1, 0];
        const sx = i % 2 ? 1 : -1;
        const sz = i < 2 ? 1 : -1;
        o.seed = sx;
        o.scale = [sx, 1, sz];
        o.tint = [1, 1, 1];
      }),
      programs.solid({
        ambient: 0.2,
        side: 2,
        defines: { INSTANCED: 1 },
        deform: {
          pars: `uniform float uClamp;`,
          /* Corners close in from outside: fixed price, fixed scope. */
          world: `wp.xz += sign(iScale.xz) * vec2(-1.0, -1.0) * vec2(mix(0.86, 0.5, uClamp) - 0.0, mix(1.3, 0.94, uClamp));`,
          uniforms: { uClamp: { value: 0 } },
        },
      })
    );
    brackets.frustumCulled = false;
    ctx.group.add(brackets);
    ctx.clampU = brackets.material.uniforms.uClamp;
    ctx.brackets = brackets;
    yield;
  },
  update(p, ctx) {
    ctx.lit.value = smoothstep(0.02, 0.8, p.hold) * 1.02;
    const closing = smoothstep(0.8, 0.96, p.hold);
    ctx.clampU.value = closing;
    ctx.brackets.visible = p.hold > 0.02 || p.enter > 0.9;
  },
};
