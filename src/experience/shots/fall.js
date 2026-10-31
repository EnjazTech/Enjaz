/**
 * The fastest stretch of the film and the cheapest frames. A black shaft with
 * chevron ticks streaking past, the phone and its line below you, then one drop
 * ceiling tile and the office you started in, seen from above.
 */

import { BoxGeometry, Group, Mesh, PlaneGeometry } from "three";
import { box, instances, merge, part, quatEuler } from "../engine/geo.js";

const PERIOD = 18;

export default {
  *build(ctx) {
    const { programs, sets, rng } = ctx;

    /* The logo's three chevrons, rotated to point down, on all four walls. */
    const stroke = new PlaneGeometry(0.34, 0.05);
    const chevrons = 96;
    const palette = [
      [0.365 * 0.35, 1 * 0.35, 0.87 * 0.35],
      [0.365 * 0.65, 1 * 0.65, 0.87 * 0.65],
      [0.643, 0.545, 1],
    ];
    const ticks = new Mesh(
      instances(stroke, chevrons, (i, o) => {
        const wall = i % 4;
        const across = (Math.floor(i / 8) % 3 - 1) * 1.9 + (i % 2 ? 0.115 : -0.115);
        const y = -((Math.floor(i / 24) + (Math.floor(i / 8) % 3) * 0.08) * (PERIOD / 4));
        const halfW = 3.2;
        const sign = i % 2 ? 1 : -1;
        if (wall === 0) {
          o.pos = [across, y, -halfW];
          quatEuler(0, 0, sign * 0.78, o.quat);
        } else if (wall === 1) {
          o.pos = [across, y, halfW];
          quatEuler(0, 0, sign * 0.78, o.quat);
        } else if (wall === 2) {
          o.pos = [-halfW, y, across];
          quatEuler(sign * 0.78, Math.PI / 2, 0, o.quat);
        } else {
          o.pos = [halfW, y, across];
          quatEuler(sign * 0.78, Math.PI / 2, 0, o.quat);
        }
        o.tint = palette[Math.floor(i / 8) % 3];
        o.seed = rng();
      }),
      programs.glow({
        alpha: 1,
        shape: 5,
        defines: { INSTANCED: 1, NOFOG: 1 },
        deform: {
          world: `{ float d = mod(wp.y - uCamY + ${(PERIOD / 2).toFixed(1)}, ${PERIOD.toFixed(1)}) - ${(PERIOD / 2).toFixed(1)}; wp.y = uCamY + d; }`,
        },
      })
    );
    ticks.frustumCulled = false;
    ctx.group.add(ticks);
    ctx.ticks = ticks;

    const phone = sets.phone.make({ w: 0.36, h: 0.74, t: 0.05 });
    ctx.group.add(phone);
    ctx.phone = phone;
    yield;

    /* The drop ceiling: one tile punched out. */
    const ceiling = new Group();
    const tile = part(new BoxGeometry(0.58, 0.02, 0.58));
    const count = 196;
    const grid = new Mesh(
      instances(tile, count, (i, o) => {
        const col = i % 14;
        const row = Math.floor(i / 14);
        const x = (col - 6.5) * 0.6 + 0.3;
        const z = (row - 6.5) * 0.6 + 0.3;
        const inHole = Math.abs(x) < 0.31 && Math.abs(z) < 0.31;
        o.pos = [x, 0, z];
        o.scale = inHole ? [0.001, 0.001, 0.001] : [1, 1, 1];
        const shade = 0.42 + rng() * 0.08;
        o.tint = [shade, shade, shade * 0.97];
      }),
      programs.solid({ ambient: 0.22, house: 0, defines: { INSTANCED: 1 } })
    );
    grid.frustumCulled = false;
    ceiling.add(grid);
    ceiling.add(new Mesh(merge([box(8.6, 0.01, 8.6, { at: [0, 0.2, 0], color: [0.02, 0.02, 0.02] })]), grid.material.clone()));
    ceiling.children[1].visible = false;
    ctx.group.add(ceiling);
    ctx.ceiling = ceiling;
    yield;
  },
  layout(ctx) {
    const q = ctx.solved["why.q"];
    ctx.ceiling.position.y = q.floorY + q.d + 1.6;
    ctx.ceilingY = ctx.ceiling.position.y;
  },
  update(p, ctx) {
    const camY = ctx.u.uCamY.value;
    /* Below the camera, falling with you, until it punches through the tile. */
    ctx.phone.position.set(0, Math.max(ctx.ceilingY - 1.2 + (1 - p.hold) * 0, camY - 3.2), 0);
    ctx.ceiling.visible = p.hold > 0.4;
    ctx.ticks.visible = p.hold < 0.82;
  },
};
