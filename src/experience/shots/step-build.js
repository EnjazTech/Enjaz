/**
 * Build: an exploded view of that phone. Scrolling assembles it, and three times
 * the half-built screen lights with a more finished interface: wire, layout, real.
 * Those are the regular demos. Scrolling back takes it apart again.
 */

import { Group, Mesh } from "three";
import { lerp, smoothstep } from "../engine/geo.js";

const GAP = 0.62;

export default {
  *build(ctx) {
    const { sets, text, dir, programs } = ctx;
    const parts = sets.phone.layers({ w: 0.86, h: 1.76 });
    const stack = new Group();
    stack.rotation.x = Math.PI / 2;
    stack.position.set(0, 0, 0.3);
    stack.add(parts.back, parts.board, parts.frame, parts.display, parts.glass);
    ctx.group.add(stack);
    ctx.parts = parts;
    ctx.stack = stack;

    /* Three demos, drawn in reading direction, side by side on one canvas. */
    const demos = text.canvas(768, 512, (c, w, h) => {
      const col = w / 3;
      c.fillStyle = "#0b0d13";
      c.fillRect(0, 0, w, h);
      const inX = (i, x, width) => (dir < 0 ? i * col + col - x - width : i * col + x);
      /* Wire */
      c.strokeStyle = "rgba(93,255,222,.8)";
      c.lineWidth = 2;
      for (let row = 0; row < 7; row += 1) {
        c.strokeRect(inX(0, 22, col - 44), 40 + row * 62, col - 44, 44);
      }
      /* Layout */
      for (let row = 0; row < 7; row += 1) {
        c.fillStyle = "rgba(255,255,255,.13)";
        c.fillRect(inX(1, 22, col - 44), 40 + row * 62, col - 44, 44);
      }
      /* Real */
      c.fillStyle = "#101520";
      c.fillRect(2 * col, 0, col, h);
      for (let row = 0; row < 7; row += 1) {
        c.fillStyle = "rgba(255,255,255,.08)";
        c.fillRect(inX(2, 22, col - 44), 40 + row * 62, col - 44, 44);
        c.fillStyle = row % 3 === 0 ? "#5dffde" : "#a48bff";
        c.fillRect(inX(2, 32, 36), 50 + row * 62, 36, 24);
        c.fillStyle = "rgba(232,236,244,.75)";
        c.fillRect(inX(2, 80, col - 130), 56 + row * 62, col - 130, 9);
      }
    });
    const screen = programs.paper({
      atlas: { value: demos },
      cell: [0, 0, 1 / 3, 1],
      house: 0,
      ambient: 1.05,
      deform: {
        fpars: `uniform float uBright;`,
        frag: `c *= uBright;`,
        uniforms: { uBright: { value: 0.1 } },
      },
    });
    parts.display.material = screen;
    ctx.screen = screen;
    yield;
  },
  update(p, ctx) {
    const { back, board, frame, display, glass } = ctx.parts;
    const assembled = smoothstep(0.02, 0.92, p.hold);
    const spread = (1 - assembled) * GAP;
    back.position.y = -spread * 2;
    board.position.y = -spread + 0.02;
    frame.position.y = 0.03;
    display.position.y = spread + 0.055;
    glass.position.y = spread * 2 + 0.06;
    ctx.stack.rotation.y = lerp(0.28, 0, assembled) * ctx.dir;

    /* Which demo: wire at a third, layout at two thirds, the real thing at the end. */
    const stage = p.hold < 0.34 ? 0 : p.hold < 0.67 ? 1 : 2;
    ctx.screen.uniforms.uCell.value = [stage / 3, 0, 1 / 3, 1];
    ctx.screen.uniforms.uBright.value = smoothstep(0.1, 0.24, p.hold) * (0.65 + stage * 0.17);
  },
};
