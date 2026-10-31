/**
 * The crumple. After the chaos, stillness: a 3 m sheet crushed into hard facets,
 * printed with a bad interface. Scrolling irons it flat, and the print becomes a
 * calm layout in the right reading direction, carrying the card's real title.
 */

import { Mesh, PlaneGeometry } from "three";
import { smoothstep } from "../engine/geo.js";

export default {
  *build(ctx) {
    const { programs, q, text, dir } = ctx;
    const [nx, ny] = q.uxGrid;
    const sheet = new PlaneGeometry(2.2, 3.1, nx, ny);

    const bad = text.canvas(512, 720, (c, w, h) => {
      c.fillStyle = "#e9e6dd";
      c.fillRect(0, 0, w, h);
      /* Too many buttons, misaligned boxes, four competing colours. */
      const colors = ["#c2352b", "#2a4fd1", "#d1a12a", "#2d9c4a", "#7a2ab5"];
      let seed = 7;
      const next = () => {
        seed = (seed * 37 + 11) % 101;
        return seed / 101;
      };
      for (let i = 0; i < 34; i += 1) {
        c.fillStyle = colors[i % colors.length];
        c.globalAlpha = 0.45 + next() * 0.5;
        c.fillRect(next() * w * 0.82, next() * h * 0.92, 40 + next() * 150, 16 + next() * 60);
      }
      c.globalAlpha = 1;
      c.strokeStyle = "#333";
      for (let i = 0; i < 16; i += 1) {
        c.strokeRect(next() * w * 0.8, next() * h * 0.9, 50 + next() * 120, 20 + next() * 50);
      }
    });

    const title = text.title("svc.ux");
    const good = text.canvas(512, 720, (c, w, h) => {
      c.fillStyle = "#0d1016";
      c.fillRect(0, 0, w, h);
      const start = dir < 0 ? w - 44 : 44;
      c.textAlign = "start";
      c.fillStyle = "#e8ecf4";
      let px = 44;
      do {
        c.font = `700 ${px}px ${text.display}`;
        px -= 2;
      } while (c.measureText(title).width > w - 88 && px > 18);
      c.fillText(title, start, 104);
      c.fillStyle = "#5dffde";
      c.fillRect(dir < 0 ? w - 44 - 90 : 44, 128, 90, 5);
      c.fillStyle = "rgba(232,236,244,.5)";
      for (let i = 0; i < 4; i += 1) {
        const width = w - 88 - (i % 2) * 90;
        c.fillRect(dir < 0 ? w - 44 - width : 44, 174 + i * 28, width, 8);
      }
      c.fillStyle = "rgba(255,255,255,.05)";
      c.fillRect(44, 310, w - 88, 170);
      c.fillRect(44, 500, w - 88, 110);
      c.fillStyle = "#a48bff";
      c.fillRect(dir < 0 ? 44 : w - 44 - 150, 636, 150, 40);
    });

    /* Six fold planes, each adding a hard crease scaled by one uniform. */
    const material = programs.paper({
      atlas: { value: bad },
      ambient: 0.2,
      boost: 1.05,
      defines: { FACET: 1 },
      deform: {
        pars: `uniform float uCrumple; uniform vec3 uIron;`,
        fpars: `uniform float uFacet, uIroned; uniform sampler2D uGood;`,
        local: `{
          vec3 q = vec3(p.xy, 0.0);
          float amount = uCrumple;
          amount *= smoothstep(uIron.z * 0.4, uIron.z, length(p.xy - uIron.xy));
          float z = 0.0;
          z += abs(dot(q, normalize(vec3(0.8, 0.5, 0.0))) + 0.1) * 0.42;
          z -= abs(dot(q, normalize(vec3(-0.5, 0.9, 0.0))) - 0.4) * 0.38;
          z += abs(dot(q, normalize(vec3(0.3, -0.8, 0.0))) + 0.6) * 0.3;
          z -= abs(dot(q, normalize(vec3(0.95, 0.1, 0.0))) - 0.2) * 0.26;
          z += abs(dot(q, normalize(vec3(-0.7, -0.4, 0.0))) + 0.3) * 0.22;
          z -= abs(dot(q, normalize(vec3(0.15, 0.9, 0.0))) + 0.9) * 0.2;
          p.z += (z - 0.2) * amount;
          /* The sheet draws in as it crumples. */
          p.xy *= 1.0 - amount * 0.1;
        }`,
        frag: `c = mix(c, texture(uGood, vUv).rgb * 1.05, uIroned);`,
        uniforms: {
          uCrumple: { value: 1 },
          uIron: { value: [9, 9, 0.5] },
          uFacet: { value: 1 },
          uIroned: { value: 0 },
          uGood: { value: good },
        },
      },
    });
    const mesh = new Mesh(sheet, material);
    mesh.position.set(0, 0, 0.1);
    mesh.frustumCulled = false;
    ctx.group.add(mesh);
    ctx.mesh = mesh;
    yield;
  },
  update(p, ctx) {
    const uniforms = ctx.mesh.material.uniforms;
    const iron = smoothstep(0.08, 0.78, p.hold);
    uniforms.uCrumple.value = 1 - iron;
    uniforms.uFacet.value = 1 - smoothstep(0.7, 1, iron);
    uniforms.uIroned.value = smoothstep(0.55, 0.9, iron);
    if (p.pointer === 1) {
      /* The pointer irons a disc flat as it passes, and creases spring back behind it. */
      uniforms.uIron.value[0] = p.px * 1.6;
      uniforms.uIron.value[1] = -p.py * 1.6;
    } else {
      uniforms.uIron.value[0] = 9;
    }
  },
};
