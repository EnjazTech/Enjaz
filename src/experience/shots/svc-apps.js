/**
 * The slab. Loose forms and receipts circle a dark phone-sized slab in a vortex.
 * Each one that lands adds a row to its list, and by the end of the hold there is
 * no paper and one full list: the card's "one clean tool".
 */

import { Mesh, PlaneGeometry } from "three";
import { instances, merge, smoothstep } from "../engine/geo.js";
import { gantryParts } from "../sets/gantry.js";

export default {
  *build(ctx) {
    const { programs, rng, sets, text } = ctx;
    ctx.group.add(new Mesh(merge(gantryParts(-1.45)), programs.solid({ ambient: 0.1 })));

    const phone = sets.phone.make({ w: 0.92, h: 1.86, t: 0.1 });
    phone.rotation.x = Math.PI / 2;
    phone.position.set(0, 0, 0.42);
    ctx.group.add(phone);

    /* The list, revealed from the top down by one uniform. */
    const list = sets.phone.listTexture(360, 720, 12);
    const screen = phone.userData.screen;
    screen.material = programs.paper({
      atlas: { value: list },
      house: 0,
      ambient: 1.05,
      deform: {
        fpars: `uniform float uRows;`,
        frag: `c *= mix(0.1, 1.0, step(1.0 - vUv.y, uRows));`,
        uniforms: { uRows: { value: 0 } },
      },
    });
    ctx.rows = screen.material.uniforms.uRows;
    yield;

    const faces = ["invoice", "receipt", "memo", "slip", "ledger", "quote"];
    const count = Math.max(60, Math.floor(140 * (ctx.q.instanceScale ?? 1)));
    const material = programs.paper({
      ambient: 0.14,
      defines: { INSTANCED: 1 },
      deform: {
        pars: `uniform float uLand; uniform vec2 uStir;`,
        local: `{
          /* Tumbling while it circles; flat once it lands. */
          float settle = clamp((uLand - seed * 0.8) / 0.2, 0.0, 1.0);
          float spin = (uTime * 0.6 + seed * 50.0) * (1.0 - settle);
          float cs = cos(spin), ss = sin(spin);
          p = vec3(p.x, p.y * cs, p.y * ss);
          n = vec3(n.x, n.y * cs - n.z * ss, n.y * ss + n.z * cs);
        }`,
        world: `{
          float settle = clamp((uLand - seed * 0.8) / 0.2, 0.0, 1.0);
          settle = settle * settle * (3.0 - 2.0 * settle);
          float a = seed * 40.0 + uTime * 0.45 * (0.6 + seed) + uLand * 7.0;
          float r = 1.3 + seed * 1.15 - uLand * 0.4;
          vec3 orbit = vec3(cos(a) * r, sin(a * 1.7) * 1.05 + (seed - 0.5) * 1.2, sin(a) * r * 0.74 + 0.4);
          orbit.xy += normalize(orbit.xy + 0.001) * max(0.0, 0.5 - length(orbit.xy - uStir)) * 0.9;
          wp = mix(orbit + (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz, wp, settle);
          /* A landed sheet has become a row on the screen: it shrinks into the slab. */
          tint *= 1.0 - smoothstep(0.86, 1.0, settle);
        }`,
        uniforms: { uLand: { value: 0 }, uStir: { value: [0, 0] } },
      },
    });
    const sheetPlane = new PlaneGeometry(0.42, 0.56);
    const mesh = new Mesh(
      instances(
        sheetPlane,
        count,
        (i, o) => {
          o.pos = [0, 0.72 - (i / count) * 1.44, 0.46];
          o.cell = text.cell(faces[Math.floor(rng() * faces.length)]);
          const shade = 0.82 + rng() * 0.18;
          o.tint = [shade, shade, shade * 0.95];
          o.seed = i / count;
        }
      ),
      material
    );
    mesh.frustumCulled = false;
    ctx.group.add(mesh);
    ctx.land = material.uniforms.uLand;
    ctx.stir = material.uniforms.uStir;
    yield;
  },
  update(p, ctx) {
    const land = smoothstep(0, 1, p.enter * 0.16 + p.hold * 0.9 + p.exit * 0.2);
    ctx.land.value = land;
    ctx.rows.value = land * 0.96;
    ctx.stir.value = p.pointer === 1 ? [p.px * 2.2, -p.py * 2.2] : [0, 0];
  },
};
