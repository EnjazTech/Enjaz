/**
 * The cam bank: a script that runs by itself. It is the only machine that keeps
 * moving when you stop scrolling, and it deliberately takes no input, which is the
 * joke and the point. Past the last arm the paper ends and becomes the mint line.
 */

import { CylinderGeometry, Mesh, PlaneGeometry } from "three";
import { box, instances, merge, part, quatEuler } from "../engine/geo.js";
import { gantryParts } from "../sets/gantry.js";

const ARMS = 8;
const SPAN = 2.6;

export default {
  *build(ctx) {
    const { programs, text, dir } = ctx;
    /* The strip faces the camera here, on the +x side in English and -x in Arabic. */
    const side = 0.07 * dir;
    /* A vertical camshaft on the far side of the strip, in brass and steel. */
    const shaft = new Mesh(
      merge([
        part(new CylinderGeometry(0.06, 0.06, SPAN + 0.6, 16), { at: [side, 0, -0.95], color: [0.72, 0.56, 0.3], mat: 1 }),
        box(0.28, 0.18, 0.28, { at: [side, SPAN / 2 + 0.34, -0.95], color: [0.3, 0.31, 0.34] }),
        box(0.28, 0.18, 0.28, { at: [side, -SPAN / 2 - 0.34, -0.95], color: [0.3, 0.31, 0.34] }),
        ...gantryParts(-SPAN / 2 - 0.5),
      ]),
      programs.solid({ ambient: 0.1 })
    );
    ctx.group.add(shaft);
    yield;

    const armBase = merge([
      box(0.05, 0.05, 0.86, { at: [0, 0, 0.43], color: [0.54, 0.56, 0.6] }),
      /* The stamp head, and the cam it rides on. */
      box(0.16, 0.1, 0.1, { at: [0, 0, 0.86], color: [0.22, 0.24, 0.28] }),
      box(0.14, 0.012, 0.09, { at: [0, -0.056, 0.86], color: [0.36, 1, 0.87], mat: 2 }),
      part(new CylinderGeometry(0.1, 0.1, 0.05, 12), { color: [0.72, 0.56, 0.3], mat: 1 }),
    ]);
    const arms = new Mesh(
      instances(armBase, ARMS, (i, o) => {
        o.pos = [side, SPAN / 2 - (i / (ARMS - 1)) * SPAN, -0.95];
        o.seed = i / ARMS;
      }),
      programs.solid({
        ambient: 0.12,
        defines: { INSTANCED: 1 },
        deform: {
          /* Rise and fall on the cam: rotate the arm about the shaft's axis. */
          local: `{
            float cam = pow(0.5 + 0.5 * sin(uTime * 2.1 + seed * 6.283), 3.0);
            float a = (cam - 0.5) * 0.3;
            float ca = cos(a), sa = sin(a);
            p = vec3(p.x, p.y * ca - p.z * sa, p.y * sa + p.z * ca);
            n = vec3(n.x, n.y * ca - n.z * sa, n.y * sa + n.z * ca);
          }`,
        },
      })
    );
    arms.frustumCulled = false;
    ctx.group.add(arms);
    yield;

    /* An invoice under each arm. The word comes from the page's own atlas data. */
    const plane = new PlaneGeometry(0.52, 0.3);
    const invoice = text.cell("invoice");
    const invoices = new Mesh(
      instances(plane, ARMS, (i, o) => {
        o.pos = [0.005 * dir, SPAN / 2 - (i / (ARMS - 1)) * SPAN - 0.05, 0.002];
        quatEuler(0, (Math.PI / 2) * dir, 0, o.quat);
        o.cell = invoice;
        o.tint = [0.96, 0.95, 0.9];
        o.seed = i / ARMS;
      }),
      programs.paper({
        ambient: 0.24,
        boost: 1.05,
        defines: { INSTANCED: 1 },
      })
    );
    invoices.frustumCulled = false;
    ctx.group.add(invoices);

    /* The mint check, printed the instant its arm comes down. */
    const checks = new Mesh(
      instances(new PlaneGeometry(0.1, 0.1), ARMS, (i, o) => {
        o.pos = [0.022 * dir, SPAN / 2 - (i / (ARMS - 1)) * SPAN - 0.05, 0.05];
        quatEuler(0, (Math.PI / 2) * dir, 0, o.quat);
        o.seed = i / ARMS;
        o.tint = [0.36, 1, 0.87];
      }),
      programs.glow({
        alpha: 1,
        defines: { INSTANCED: 1 },
        deform: {
          pars: `out float vHit;`,
          fpars: `in float vHit;`,
          local: `vHit = pow(0.5 + 0.5 * sin(uTime * 2.1 + seed * 6.283), 3.0);`,
          frag: `a *= smoothstep(0.2, 0.75, vHit) * 1.8;`,
        },
      })
    );
    checks.frustumCulled = false;
    ctx.group.add(checks);
    yield;
  },
  update() {},
};
