/**
 * Ship and support. The assembled phone hangs from the mint line like a bead on a
 * thread. An iris opens in the floor and it drops through, and the line stays
 * attached: that is the "stay on call" in the copy.
 */

import { BoxGeometry, CylinderGeometry, Mesh } from "three";
import { box, instances, part, quatEuler, smoothstep } from "../engine/geo.js";

export default {
  *build(ctx) {
    const { programs, sets } = ctx;
    const phone = sets.phone.make({ w: 0.56, h: 1.14, t: 0.07 });
    phone.rotation.x = Math.PI / 2;
    phone.position.set(0, 0.2, 0);
    ctx.group.add(phone);
    phone.userData.screen.material = programs.paper({
      atlas: { value: sets.phone.listTexture(360, 720, 12) },
      house: 0,
      ambient: 1.05,
    });
    ctx.phone = phone;

    /* The clasp where the line meets the phone. */
    const clasp = new Mesh(box(0.05, 0.1, 0.05, { color: [0.36, 1, 0.87], mat: 2 }), programs.solid());
    clasp.position.y = 0.6;
    phone.add(clasp);
    clasp.position.set(0, 0, -0.6);
    clasp.rotation.x = Math.PI / 2;

    const blade = part(new BoxGeometry(1.5, 0.05, 0.9));
    const material = programs.solid({
      ambient: 0.15,
      defines: { INSTANCED: 1 },
      deform: {
        pars: `uniform float uIris;`,
        local: `{
          /* Eight blades: rotating each about its own pivot opens the aperture. */
          float a = uIris * 1.15;
          float ca = cos(a), sa = sin(a);
          vec3 pivot = vec3(0.75, 0.0, 0.0);
          vec3 q = p - pivot;
          p = vec3(q.x * ca + q.z * sa, q.y, -q.x * sa + q.z * ca) + pivot;
        }`,
        uniforms: { uIris: { value: 0 } },
      },
    });
    const blades = new Mesh(
      instances(blade, 8, (i, o) => {
        const a = (i / 8) * Math.PI * 2;
        o.pos = [Math.cos(a) * 0.72, -1.2, Math.sin(a) * 0.72];
        quatEuler(0, -a + Math.PI / 2, 0, o.quat);
        o.tint = [0.2, 0.21, 0.25];
      }),
      material
    );
    blades.frustumCulled = false;
    ctx.group.add(blades);
    ctx.iris = material.uniforms.uIris;

    const rim = new Mesh(
      part(new CylinderGeometry(1.85, 1.9, 0.14, 48, 1, true), { at: [0, -1.2, 0], color: [0.2, 0.21, 0.25] }),
      programs.solid({ ambient: 0.16, side: 2 })
    );
    ctx.group.add(rim);
    yield;
  },
  update(p, ctx) {
    ctx.iris.value = smoothstep(0.1, 0.72, p.hold);
    const drop = smoothstep(0.62, 1, p.hold) * 0.5 + smoothstep(0, 0.8, p.exit) * 8;
    ctx.phone.position.y = 0.2 - drop;
    /* It falls ahead of the camera: as its bead tips over, the screen stays visible. */
    ctx.phone.rotation.x = Math.PI / 2 - smoothstep(0.1, 0.9, p.hold) * (Math.PI / 2) * 0.72;
  },
};
