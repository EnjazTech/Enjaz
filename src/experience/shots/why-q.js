/**
 * The question from above. The same desk from the same seed, tiny in its pool of
 * light with black all around, at the moment the heading asks whether you are still
 * running on spreadsheets and phone calls. The new phone falls toward it on its line.
 */

import { lerp, smoothstep } from "../engine/geo.js";

export default {
  *build(ctx) {
    const { sets } = ctx;
    /* Real-world size from here on. */
    const phone = sets.phone.make({ w: 0.0775, h: 0.16, t: 0.0085 });
    ctx.group.add(phone);
    ctx.phone = phone;
    yield;
  },
  layout(ctx) {
    ctx.group.position.set(0, ctx.solved.deskAct4.y, 0);
  },
  update(p, ctx) {
    /* Falling slowly, and always above the desk. Lands in why.list. */
    const eased = smoothstep(0, 1, p.t);
    ctx.phone.position.set(0, lerp(ctx.self.d * 0.7, 0.42, eased), 0);
    ctx.phone.rotation.z = (1 - eased) * 0.5 * ctx.dir;
    ctx.phone.scale.setScalar(lerp(3.2, 1, eased));
  },
};
