/**
 * The same shot, before and after. Same desk, same lamp, same angle: clock at
 * 07:00, no paper, and a thin mint line going up from the phone. The first and last
 * frames together are the sales argument.
 */

export default {
  *build(ctx) {
    const phone = ctx.sets.phone.make({ w: 0.0775, h: 0.16, t: 0.0085 });
    phone.position.set(0, 0.0043, 0);
    ctx.group.add(phone);
    yield;
  },
  layout(ctx) {
    ctx.group.position.set(0, ctx.solved.deskAct4.y, 0);
  },
  update() {},
};
