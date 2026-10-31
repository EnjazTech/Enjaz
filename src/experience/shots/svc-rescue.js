/**
 * The blackout. The strip jams in a mangle and the whole building loses power.
 * The caption is DOM, so it stays lit: "Site down?" is the brightest thing left.
 * Your cursor is the torch. An arm clears the jam and the lights come back.
 */

import { Mesh, PlaneGeometry, Vector3 } from "three";
import { box, instances, merge, smoothstep } from "../engine/geo.js";
import { gantryParts } from "../sets/gantry.js";
import { mangleParts, rollerGeometry } from "../sets/props.js";

const TORCH_ORIGIN = new Vector3();

export default {
  *build(ctx) {
    const { programs, rng } = ctx;
    const frame = new Mesh(merge([...mangleParts(), ...gantryParts()]), programs.solid({ ambient: 0.08 }));
    ctx.group.add(frame);
    yield;

    const rollers = [
      { y: 0.42, z: 0.24 },
      { y: 0.42, z: -0.24 },
      { y: -0.1, z: 0.24 },
    ].map(({ y, z }) => {
      const mesh = new Mesh(rollerGeometry(), programs.solid({ ambient: 0.08 }));
      mesh.position.set(0, y, z);
      ctx.group.add(mesh);
      return mesh;
    });
    ctx.rollers = rollers;
    yield;

    /* The arm that pulls the jam. */
    const arm = new Mesh(
      merge([
        box(0.09, 0.09, 1.4, { at: [0, 0, 0.7], color: [0.7, 0.54, 0.28], mat: 1 }),
        box(0.34, 0.06, 0.12, { at: [0, 0, 1.46], color: [0.3, 0.31, 0.34] }),
        box(0.22, 0.22, 0.22, { at: [0, 0, 0], color: [0.3, 0.31, 0.34] }),
      ]),
      programs.solid({ ambient: 0.08 })
    );
    arm.position.set(ctx.dir * 0.92, -0.72, 1.3);
    arm.rotation.y = Math.PI;
    ctx.group.add(arm);
    ctx.arm = arm;

    /* Violet emergency lamp on the gantry. */
    const lamp = new Mesh(
      new PlaneGeometry(1.5, 1.5),
      programs.glow({ color: [0.643, 0.545, 1], alpha: 0, defines: { BILLBOARD: 1 } })
    );
    lamp.position.set(ctx.dir * 2.1, 1.05, 0.2);
    lamp.frustumCulled = false;
    ctx.group.add(lamp);
    ctx.emergency = lamp;
    const lampBody = new Mesh(box(0.14, 0.14, 0.14, { at: [ctx.dir * 2.1, 1.05, 0.2], color: [0.5, 0.42, 0.9], mat: 2 }), programs.solid());
    ctx.group.add(lampBody);
    ctx.lampBody = lampBody;
    yield;

    /* Sparks: slow, at most two flashes a second, each with a reason to be there. */
    const spark = new PlaneGeometry(0.018, 0.14);
    const sparks = new Mesh(
      instances(spark, 30, (i, o) => {
        o.pos = [(rng() - 0.5) * 1.2, 0.16, 0.05 + rng() * 0.2];
        o.tint = [1, 0.8, 0.45];
        o.seed = rng();
      }),
      programs.glow({
        alpha: 0,
        defines: { INSTANCED: 1 },
        deform: {
          world: `{
            float t = fract(uTime * 0.42 + seed * 7.0);
            wp.x += (seed - 0.5) * t * 1.1;
            wp.z += t * 0.7;
            wp.y += t * 0.5 - t * t * 1.9;
          }`,
        },
      })
    );
    sparks.frustumCulled = false;
    ctx.group.add(sparks);
    ctx.sparks = sparks;
    yield;
  },
  update(p, ctx) {
    const { strip } = ctx.sets;
    const { uPower, uPowerY, uLampOn, uLampColor, uLampOrigin, uLampPos, uLampDir, uLampCone } = ctx.u;
    const floorY = ctx.self.floorY;

    uPowerY.value = floorY;

    /* The jam: the concertina builds, and the arm clears it. */
    const jam = smoothstep(0.02, 0.3, p.hold) * (1 - smoothstep(0.72, 0.86, p.hold));
    strip.u.uJamA.value = strip.sAtY(floorY + 2.1);
    strip.u.uJamB.value = strip.sAtY(floorY - 1.6);
    strip.u.uJamK.value = jam * (p.exit > 0.99 ? 0 : 1);

    const out = smoothstep(0.12, 0.4, p.hold);
    const back = smoothstep(0.62, 0.92, p.hold);
    const dark = out * (1 - back);

    if (p.t <= 0 || p.t >= 1 || p.exit > 0.5) {
      uPower.value.set(0, 0);
    } else {
      uPower.value.set(out, back);
    }

    const spin = p.y * 0.012 * (1 - jam);
    ctx.rollers[0].rotation.x = spin;
    ctx.rollers[1].rotation.x = -spin;
    ctx.rollers[2].rotation.x = spin;

    const pull = smoothstep(0.62, 0.8, p.hold);
    ctx.arm.position.z = 1.3 - Math.sin(pull * Math.PI) * 0.75;

    ctx.emergency.material.uniforms.uAlpha.value = dark * (0.55 + 0.25 * Math.sin(p.time * 3.2));
    ctx.lampBody.visible = dark > 0.02;
    ctx.sparks.material.uniforms.uAlpha.value = dark * 0.85;

    /* The torch reuses the lamp: mint, from the camera's side. Fine pointers aim it. */
    if (dark > 0.01) {
      uLampOn.value = dark;
      /* Metres from the machine rather than centimetres from a desk: far more gain. */
      uLampColor.value.set(2.8, 6.6, 5.8);
      uLampOrigin.value.set(0, floorY, 0);
      const sweepX = p.pointer === 1 ? p.px * 1.7 : Math.sin(p.time * 0.55) * 1.3;
      const sweepY = p.pointer === 1 ? -p.py * 1.3 : Math.cos(p.time * 0.4) * 0.7;
      TORCH_ORIGIN.set(ctx.dir * 0.9, 1.5, 3.4);
      uLampPos.value.copy(TORCH_ORIGIN);
      uLampDir.value.set(sweepX - TORCH_ORIGIN.x, sweepY - TORCH_ORIGIN.y, -TORCH_ORIGIN.z).normalize();
      uLampCone.value.set(0.94, 0.99);
    }
  },
};
