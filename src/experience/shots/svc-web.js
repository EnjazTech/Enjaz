/**
 * The pop-up shop. The strip feeds a table and a paper shopfront hinges up like a
 * pop-up book. Paper figures walk through the door and turn mint as they cross:
 * "visitors into customers", with no words.
 */

import { BoxGeometry, Mesh, PlaneGeometry, Shape, ShapeGeometry } from "three";
import { box, instances, merge, part, quatEuler, smoothstep } from "../engine/geo.js";
import { gantryParts } from "../sets/gantry.js";

const W = 0.92;

export default {
  *build(ctx) {
    const { programs, text, dir } = ctx;
    const steel = new Mesh(
      merge([
        ...gantryParts(-1.2),
        /* The table the shop stands on. */
        box(3, 0.08, 1.5, { at: [0, -0.86, 0.34], color: [0.44, 0.42, 0.38] }),
        box(0.08, 0.3, 0.08, { at: [-1.4, -1.03, 1], color: [0.3, 0.3, 0.32] }),
        box(0.08, 0.3, 0.08, { at: [1.4, -1.03, 1], color: [0.3, 0.3, 0.32] }),
      ]),
      programs.solid({ ambient: 0.1 })
    );
    ctx.group.add(steel);
    yield;

    /* Hinged panels: bottom edge at y=0, folded flat until their turn. */
    const plane = new PlaneGeometry(1, 1);
    plane.translate(0, 0.5, 0);
    const paper = [0.95, 0.93, 0.87];
    const dark = [0.62, 0.66, 0.74];
    const panels = [
      /* inline, z, yaw, width, height, y, tint, delay */
      { x: 0, z: 0.5, yaw: 0, w: W * 1.9, h: 1.05, y: -0.82, tint: paper, delay: 0 },
      { x: -W * 0.95, z: 0.2, yaw: 1.57, w: 0.6, h: 1.05, y: -0.82, tint: [0.84, 0.82, 0.76], delay: 0.08 },
      { x: W * 0.95, z: 0.2, yaw: -1.57, w: 0.6, h: 1.05, y: -0.82, tint: [0.84, 0.82, 0.76], delay: 0.08 },
      { x: 0, z: 0.52, yaw: 0, w: 0.34, h: 0.62, y: -0.82, tint: dark, delay: 0.2 },
      { x: -0.56, z: 0.52, yaw: 0, w: 0.58, h: 0.46, y: -0.6, tint: dark, delay: 0.26 },
      { x: 0.56, z: 0.52, yaw: 0, w: 0.58, h: 0.46, y: -0.6, tint: dark, delay: 0.3 },
      { x: 0, z: 0.5, yaw: 0, w: W * 1.9, h: 0.42, y: 0.22, tint: paper, delay: 0.34 },
    ];
    const stripes = 9;
    for (let i = 0; i < stripes; i += 1) {
      panels.push({
        x: (i / (stripes - 1) - 0.5) * W * 1.82,
        z: 0.52,
        yaw: 0,
        w: W * 0.2,
        h: 0.34,
        y: 0.2,
        tint: i % 2 ? [0.95, 0.94, 0.9] : [0.36, 1, 0.84],
        delay: 0.42 + i * 0.012,
        tilt: -1,
      });
    }
    const material = programs.paper({
      ambient: 0.16,
      boost: 1.1,
      defines: { INSTANCED: 1 },
      deform: {
        pars: `in float iDelay, iTilt; uniform float uOpen;`,
        local: `{
          float f = clamp((uOpen - iDelay) / 0.22, 0.0, 1.0);
          f = f * f * (3.0 - 2.0 * f);
          float a = (1.0 - f) * 1.57 + iTilt * 0.78 * f;
          float ca = cos(a), sa = sin(a);
          p = vec3(p.x, p.y * ca - p.z * sa, p.y * sa + p.z * ca);
          n = vec3(n.x, n.y * ca - n.z * sa, n.y * sa + n.z * ca);
        }`,
        uniforms: { uOpen: { value: 0 } },
      },
    });
    const blank = text.cell("blank");
    const shop = new Mesh(
      instances(
        plane,
        panels.length,
        (i, o) => {
          const panel = panels[i];
          o.pos = [panel.x * dir, panel.y, panel.z];
          quatEuler(0, panel.yaw * dir, 0, o.quat);
          o.scale = [panel.w, panel.h, 1];
          o.tint = panel.tint;
          o.cell = blank;
          o.extra.iDelay = panel.delay;
          o.extra.iTilt = panel.tilt ?? 0;
        },
        { iDelay: 1, iTilt: 1 }
      ),
      material
    );
    shop.frustumCulled = false;
    ctx.group.add(shop);
    ctx.open = material.uniforms.uOpen;
    yield;

    /* The sign carries the card's real title, in the page's own font. */
    const title = text.title("svc.web");
    const sign = new Mesh(
      new PlaneGeometry(1.5, 0.3),
      programs.paper({
        ambient: 0.3,
        boost: 1.1,
        atlas: {
          value: text.canvas(768, 154, (c, w, h) => {
            c.fillStyle = "#f4f1e8";
            c.fillRect(0, 0, w, h);
            c.fillStyle = "#111622";
            c.textAlign = "center";
            c.textBaseline = "middle";
            let px = 70;
            do {
              c.font = `700 ${px}px ${text.display}`;
              px -= 2;
            } while (c.measureText(title).width > w * 0.9 && px > 20);
            c.fillText(title, w / 2, h * 0.54);
          }),
        },
      })
    );
    sign.position.set(0, 0.36, 0.53);
    ctx.group.add(sign);
    ctx.sign = sign;

    /* Window light: warm until the shop opens, then mint. */
    const glow = new Mesh(
      new PlaneGeometry(2.6, 1.3),
      programs.glow({ color: [1, 0.7, 0.4], alpha: 0, house: 1 })
    );
    glow.position.set(0, -0.35, 0.56);
    ctx.group.add(glow);
    ctx.glow = glow;
    yield;

    /* Paper cut-out figures, four triangles each from the shoulders down. */
    const shape = new Shape();
    shape.moveTo(-0.055, 0);
    shape.lineTo(0.055, 0);
    shape.lineTo(0.05, 0.17);
    shape.lineTo(0.02, 0.19);
    shape.absarc(0, 0.235, 0.038, -1.2, 4.3, false);
    shape.lineTo(-0.05, 0.17);
    shape.lineTo(-0.055, 0);
    const figureBase = new ShapeGeometry(shape, 3);
    const figuresMaterial = programs.paper({
      ambient: 0.28,
      boost: 1.05,
      defines: { INSTANCED: 1 },
      deform: {
        pars: `uniform float uWalk; out float vDone;`,
        fpars: `in float vDone;`,
        local: `p.y *= 1.0;`,
        world: `{
          /* Along the pavement in reading direction, then in through the door. */
          float t = fract(seed + uWalk);
          float along = mix(-1.5, 0.05, smoothstep(0.0, 0.62, t));
          wp.x = along * uInline;
          wp.z += 0.55 + (1.0 - smoothstep(0.62, 0.86, t)) * 0.44 - 0.44 * smoothstep(0.86, 1.0, t);
          wp.y += abs(sin(t * 60.0)) * 0.012;
          vDone = smoothstep(0.64, 0.74, t);
        }`,
        frag: `c = mix(c, vec3(0.365, 1.0, 0.87), vDone * 0.92);`,
        uniforms: { uWalk: { value: 0 } },
      },
    });
    const figures = new Mesh(
      instances(figureBase, 48, (i, o) => {
        o.pos = [0, -0.82, 0];
        o.seed = i / 48;
        o.cell = blank;
        const shade = 0.82 + (i % 5) * 0.04;
        o.tint = [shade, shade, shade];
        const s = 0.9 + (i % 4) * 0.08;
        o.scale = [s, s, s];
      }),
      figuresMaterial
    );
    figures.frustumCulled = false;
    ctx.group.add(figures);
    ctx.walk = figuresMaterial.uniforms.uWalk;
    ctx.boost = 0;
    ctx.hotspots.add({ id: "shop", center: [0, -0.2, 0.5], radius: 140 });
    void BoxGeometry;
    void part;
    yield;
  },
  update(p, ctx) {
    const open = smoothstep(0, 0.82, p.enter * 0.5 + p.hold * 0.62);
    ctx.open.value = open;
    ctx.sign.visible = open > 0.46;
    ctx.sign.scale.y = smoothstep(0.46, 0.62, open) || 0.001;
    ctx.walk.value = p.y * 0.00042 + ctx.boost;
    const opened = smoothstep(0.62, 1, open);
    const uniforms = ctx.glow.material.uniforms;
    uniforms.uColor.value = [1 + (0.365 - 1) * opened, 0.7 + (1 - 0.7) * opened, 0.4 + (0.87 - 0.4) * opened];
    uniforms.uAlpha.value = 0.1 + opened * 0.22;
  },
  hit(id, p, ctx) {
    ctx.boost += 0.1;
  },
};
