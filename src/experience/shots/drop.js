/**
 * Down the strip like end credits, then through the hole in the floor. About a
 * quarter of a screen of black inside the slab, where the set swap happens.
 */

import { BoxGeometry, Mesh, PlaneGeometry } from "three";
import { box, instances, merge, part, quatEuler } from "../engine/geo.js";
import { WORLD } from "../engine/rail.js";

const FLOOR = WORLD.floorY;
const BOTTOM = WORLD.slabBottom;

export default {
  *build(ctx) {
    const { programs, rng, text, q } = ctx;
    const hole = 0.5;
    /* The splintered rim: broken boards reaching in over the hole. */
    const planks = [];
    for (let side = 0; side < 4; side += 1) {
      for (let i = 0; i < 11; i += 1) {
        const along = (i / 10 - 0.5) * hole * 2.1;
        const reach = 0.06 + rng() * rng() * 0.34;
        planks.push({ side, along, reach, droop: 0.05 + rng() * 0.42, width: 0.075 + rng() * 0.012, shade: 0.5 + rng() * 0.4 });
      }
    }
    const plankBase = part(new BoxGeometry(1, 1, 1));
    const rim = new Mesh(
      instances(plankBase, planks.length, (i, o) => {
        const p = planks[i];
        const reach = hole - p.reach / 2 + 0.03;
        const dx = p.side === 0 ? reach : p.side === 1 ? -reach : p.along;
        const dz = p.side === 2 ? reach : p.side === 3 ? -reach : p.along;
        o.pos = [dx, FLOOR - 0.03 - p.droop * p.reach * 0.5, dz];
        if (p.side < 2) {
          quatEuler(0, 0, (p.side === 0 ? 1 : -1) * p.droop, o.quat);
          o.scale = [p.reach + 0.08, 0.03, p.width];
        } else {
          quatEuler((p.side === 2 ? -1 : 1) * p.droop, 0, 0, o.quat);
          o.scale = [p.width, 0.03, p.reach + 0.08];
        }
        o.tint = [0.36 * p.shade, 0.21 * p.shade, 0.12 * p.shade];
      }),
      programs.solid({ house: 0, ambient: 0.16, defines: { INSTANCED: 1 } })
    );
    rim.frustumCulled = false;
    ctx.group.add(rim);
    yield;

    /* The inside of the slab: rough concrete, into black. */
    const depth = FLOOR - BOTTOM;
    const shaft = new Mesh(
      merge([
        box(1.1, depth, 0.04, { at: [0, FLOOR - depth / 2, -hole - 0.02], color: [0.18, 0.18, 0.18] }),
        box(1.1, depth, 0.04, { at: [0, FLOOR - depth / 2, hole + 0.02], color: [0.18, 0.18, 0.18] }),
        box(0.04, depth, 1.1, { at: [-hole - 0.02, FLOOR - depth / 2, 0], color: [0.18, 0.18, 0.18] }),
        box(0.04, depth, 1.1, { at: [hole + 0.02, FLOOR - depth / 2, 0], color: [0.18, 0.18, 0.18] }),
      ]),
      programs.solid({ house: 0, ambient: 0.05 })
    );
    ctx.group.add(shaft);
    yield;

    /* Paper sliding toward the hole as you fall past it. */
    const count = Math.min(140, Math.floor(q.sheets * 0.25));
    const faces = ["ledger", "invoice", "lines", "memo"];
    const plane = new PlaneGeometry(1, 1);
    plane.rotateX(-Math.PI / 2);
    const slidersMaterial = programs.paper({
      house: 0,
      ambient: 0.13,
      defines: { INSTANCED: 1 },
      deform: {
        pars: `uniform float uSlide;`,
        world: `{
          float f = clamp(uSlide * 1.5 - seed * 0.5, 0.0, 1.0);
          vec2 toHole = -wp.xz;
          float dist = length(toHole);
          wp.xz += toHole * f * f * 0.97;
          wp.y -= smoothstep(0.65, 1.0, f) * dist * 1.2;
        }`,
        uniforms: { uSlide: { value: 0 } },
      },
    });
    const sliders = new Mesh(
      instances(plane, count, (i, o) => {
        const a = rng() * Math.PI * 2;
        const r = 0.62 + rng() * 1.5;
        o.pos = [Math.cos(a) * r, FLOOR + 0.003 + rng() * 0.004, Math.sin(a) * r];
        quatEuler(0, rng() * 6.28, 0, o.quat);
        o.scale = [0.21, 1, 0.297];
        o.cell = text.cell(faces[Math.floor(rng() * faces.length)]);
        const shade = 0.75 + rng() * 0.25;
        o.tint = [shade, shade, shade * 0.95];
        o.seed = rng();
      }),
      slidersMaterial
    );
    sliders.frustumCulled = false;
    ctx.group.add(sliders);
    ctx.slide = slidersMaterial.uniforms.uSlide;
    yield;
  },
  update(p, ctx) {
    ctx.slide.value = Math.min(1, Math.max(0, (p.t - 0.38) / 0.42));
    /* Backlit by the lamp above: the paper glows and the ink reads through it. */
    const strip = ctx.sets.strip;
    strip.u.uPaperGlow.value = 0.22 + 0.52 * Math.sin(Math.min(1, p.t * 1.5) * Math.PI);
  },
};
