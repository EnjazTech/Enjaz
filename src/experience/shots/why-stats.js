/**
 * The follow spot. Four things are left, and the lamp's beam moves between them
 * with the stats: 48h on the stamped quote, 100% on the phone and its line, 24h on
 * the wall clock, and infinity on the mug's two overlapping coffee rings.
 */

import { Mesh, PlaneGeometry } from "three";
import { lerp, smoothstep } from "../engine/geo.js";

export default {
  *build(ctx) {
    const { programs, text, dir } = ctx;

    /* The one stamped page that stays on the desk. */
    const plane = new PlaneGeometry(0.21, 0.297);
    plane.rotateX(-Math.PI / 2);
    const quote = new Mesh(plane, programs.paper({ cell: text.cell("quote"), house: 0, ambient: 0.16 }));
    quote.position.set(dir * 0.24, 0.002, -0.12);
    quote.rotation.y = -0.16 * dir;
    ctx.group.add(quote);
    ctx.quote = quote;

    ctx.stops = [
      [dir * 0.24, -0.5],
      [0, -0.4],
      [dir * 0.5, -0.7],
      [dir * -0.156, -0.61],
    ];
    yield;
  },
  layout(ctx) {
    ctx.group.position.set(0, ctx.solved.deskAct4.y, 0);
  },
  update(p, ctx) {
    /* The spot is the lamp-direction target, so baked shadows stay valid. */
    const f = p.hold * (ctx.stops.length - 1);
    const i = Math.min(ctx.stops.length - 2, Math.floor(f));
    const u = smoothstep(0.15, 0.85, f - i);
    ctx.sets.desk.setSpot(lerp(ctx.stops[i][0], ctx.stops[i + 1][0], u), lerp(ctx.stops[i][1], ctx.stops[i + 1][1], u));
    ctx.sets.desk.update(p, p.time);
  },
};
