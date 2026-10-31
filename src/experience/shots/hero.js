/**
 * 03:12. The desk, the lamp, the printer still printing, the landline ringing.
 * As you leave, the phone shakes itself off the hook.
 */

import { Mesh } from "three";
import { smoothstep } from "../engine/geo.js";
import { cordGeometry } from "../sets/props.js";

export default {
  *build(ctx) {
    const { desk } = ctx.sets;
    const cord = new Mesh(
      cordGeometry([[0, 0, 0], [0, -0.2, 0], [0, -0.4, 0.01], [0, -0.6, 0]], 22, 0.008),
      desk.material
    );
    cord.visible = false;
    ctx.group.add(cord);
    ctx.hangingCord = cord;
    yield;
  },
  update(p, ctx) {
    const { desk } = ctx.sets;
    const off = smoothstep(0.28, 0.72, p.exit);
    const cradleX = desk.landline.x;
    const cradleZ = desk.landline.z;
    if (off > 0) {
      const slide = smoothstep(0, 0.5, off);
      const fall = smoothstep(0.42, 1, off);
      const x = cradleX + (ctx.dir * -0.3 - cradleX) * slide;
      const z = cradleZ + (0.1 - cradleZ) * slide;
      const y = 0.135 - fall * 0.62;
      desk.handset.position.set(x, y, z);
      desk.handset.rotation.set(fall * 1.3, 0, slide * 0.9 * ctx.dir);
      ctx.hangingCord.visible = fall > 0.02;
      ctx.hangingCord.position.set(x, 0, z - 0.02);
      ctx.hangingCord.scale.y = Math.max(0.01, fall);
    } else {
      desk.handset.position.set(cradleX, desk.handset.position.y, cradleZ);
      desk.handset.rotation.x = 0;
      ctx.hangingCord.visible = false;
    }
  },
};
