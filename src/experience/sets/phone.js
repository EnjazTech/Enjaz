/**
 * The new phone: from wireframe to exploded view to the object the visitor ends
 * up holding. One construction, so it is recognisably the same phone in every act.
 */

import { BoxGeometry, EdgesGeometry, Group, LineSegments, Mesh, PlaneGeometry } from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { box, instances, merge, part, seeded } from "../engine/geo.js";

const BODY = [0.1, 0.105, 0.125];
const MINT = [0.365, 1, 0.87];

export function createPhone({ programs, text, dir }) {
  const bodyGeometry = (w, h, t) => part(new RoundedBoxGeometry(w, h, t, 4, Math.min(t * 0.45, w * 0.12)), { color: BODY });

  /** Default framing: lying on its back in XZ, screen up, 1 unit = 1 m. */
  function make({ w = 0.78, h = 1.6, t = 0.09, emissive = 1 } = {}) {
    const group = new Group();
    const body = new Mesh(bodyGeometry(w, t, h), programs.solid({ ambient: 0.13, house: 1 }));
    group.add(body);
    /* Bezel highlight: a thin brass line around the screen says "expensive phone". */
    const frame = new Mesh(
      merge([
        box(w * 0.965, 0.002, 0.006, { at: [0, t / 2 + 0.001, -h * 0.482], color: [0.7, 0.72, 0.76], mat: 1 }),
        box(w * 0.965, 0.002, 0.006, { at: [0, t / 2 + 0.001, h * 0.482], color: [0.7, 0.72, 0.76], mat: 1 }),
        box(0.006, 0.002, h * 0.965, { at: [-w * 0.482, t / 2 + 0.001, 0], color: [0.7, 0.72, 0.76], mat: 1 }),
        box(0.006, 0.002, h * 0.965, { at: [w * 0.482, t / 2 + 0.001, 0], color: [0.7, 0.72, 0.76], mat: 1 }),
      ]),
      programs.solid({ ambient: 0.2, house: 0 })
    );
    group.add(frame);

    const screenPlane = new PlaneGeometry(w * 0.94, h * 0.96);
    screenPlane.rotateX(-Math.PI / 2);
    screenPlane.translate(0, t / 2 + 0.003, 0);
    const screenMaterial = programs.paper({
      atlas: { value: text.texture },
      cell: [0, 0, 1, 1],
      house: 0,
      ambient: emissive,
      defines: {},
    });
    const screen = new Mesh(screenPlane, screenMaterial);
    group.add(screen);
    group.userData = { screen, screenMaterial, w, h, t };
    return group;
  }

  /** Wireframe of the same outline. */
  function wire({ w = 0.78, h = 1.6, t = 0.09, color = MINT, alpha = 0.9 } = {}) {
    const edges = new EdgesGeometry(new RoundedBoxGeometry(w, t, h, 2, Math.min(t * 0.45, w * 0.12)), 30);
    return new LineSegments(edges, programs.wire({ color, alpha }));
  }

  /** Five layers for the exploded view: back, board, frame, display, glass. */
  function layers({ w = 0.78, h = 1.6 } = {}) {
    const rng = seeded("phone-board");
    const solid = programs.solid({ ambient: 0.14, house: 1 });
    const back = new Mesh(bodyGeometry(w, 0.03, h), solid);
    const boardBase = box(w * 0.88, 0.016, h * 0.9, { color: [0.05, 0.3, 0.2] });
    const parts = [boardBase, box(w * 0.68, 0.03, h * 0.42, { at: [0, 0.02, h * 0.19], color: [0.2, 0.22, 0.26] })];
    for (let i = 0; i < 30; i += 1) {
      const sx = 0.03 + rng() * 0.08;
      const sz = 0.03 + rng() * 0.09;
      parts.push(
        box(sx, 0.018, sz, {
          at: [(rng() - 0.5) * w * 0.74, 0.016, -h * 0.28 + (rng() - 0.5) * h * 0.26],
          color: rng() > 0.7 ? [0.76, 0.58, 0.3] : [0.1, 0.1, 0.12],
          mat: rng() > 0.7 ? 1 : 0,
        })
      );
    }
    const board = new Mesh(merge(parts), solid);
    const frameParts = merge([
      box(w, 0.05, 0.05, { at: [0, 0, -h / 2 + 0.025], color: [0.62, 0.64, 0.68], mat: 1 }),
      box(w, 0.05, 0.05, { at: [0, 0, h / 2 - 0.025], color: [0.62, 0.64, 0.68], mat: 1 }),
      box(0.05, 0.05, h, { at: [-w / 2 + 0.025, 0, 0], color: [0.62, 0.64, 0.68], mat: 1 }),
      box(0.05, 0.05, h, { at: [w / 2 - 0.025, 0, 0], color: [0.62, 0.64, 0.68], mat: 1 }),
    ]);
    const frame = new Mesh(frameParts, solid);
    const displayPlane = new PlaneGeometry(w * 0.94, h * 0.96);
    displayPlane.rotateX(-Math.PI / 2);
    const displayMaterial = programs.paper({ atlas: { value: text.texture }, cell: [0, 0, 1, 1], house: 0, ambient: 1 });
    const display = new Mesh(displayPlane, displayMaterial);
    const glassGeometry = new BoxGeometry(w * 0.98, 0.006, h * 0.98);
    const glass = new Mesh(glassGeometry, programs.glow({ color: [0.8, 0.9, 1], alpha: 0.05, shape: 5 }));
    return { back, board, frame, display, displayMaterial, glass };
  }

  /** Paints a list screen: rows filling up, in reading direction. */
  function listTexture(width, height, rows, draw) {
    return text.canvas(width, height, (c, w, h) => {
      c.fillStyle = "#0b0d13";
      c.fillRect(0, 0, w, h);
      if (draw) {
        draw(c, w, h);
        return;
      }
      const rowH = h / 13;
      for (let i = 0; i < rows; i += 1) {
        c.fillStyle = "rgba(255,255,255,.07)";
        c.fillRect(w * 0.06, rowH * (i + 1), w * 0.88, rowH * 0.74);
        c.fillStyle = i % 3 === 0 ? "#5dffde" : "#a48bff";
        const x = dir < 0 ? w * 0.78 : w * 0.1;
        c.fillRect(x, rowH * (i + 1) + rowH * 0.16, w * 0.12, rowH * 0.42);
        c.fillStyle = "rgba(232,236,244,.7)";
        c.fillRect(dir < 0 ? w * 0.28 : w * 0.26, rowH * (i + 1) + rowH * 0.28, w * 0.46, rowH * 0.16);
      }
    });
  }

  return { make, wire, layers, listTexture, instances };
}
