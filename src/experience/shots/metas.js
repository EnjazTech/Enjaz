/**
 * The film's shot list, in page order. Loaded eagerly, because the rail needs it
 * before any shot exists. No imports of three.
 *
 * pose: lens is vertical FOV in portrait; bearing and roll are in reading space,
 * multiplied by the document direction at bake. A two-item array means start and
 * end of the hold. subject: metres, relative to the shot's solved floor (or to the
 * desk group for desk shots). floor: how the rail places the group in Y.
 */

import { WORLD } from "../engine/rail.js";

const sharedDesk = { clip: [0.3, 40], fog: 26 };

export const METAS = [
  {
    id: "hero",
    act: 1,
    set: "desk",
    subject: { radius: 0.62, center: [0, 0.1, -0.4] },
    pose: { lens: 24, elevation: -15, portrait: { elevation: -28 }, pushIn: 0.15, ...sharedDesk },
    budget: { draws: 18, tris: { L: 55000, M: 140000, H: 300000 } },
    idleHz: 30,
  },
  {
    id: "drop",
    act: 1,
    set: "desk",
    idleHz: 0,
    budget: { draws: 12, tris: { L: 30000, M: 80000, H: 200000 } },
    /* Follow the paper off the desk and down through the hole in the floor. */
    authored(solved, layout) {
      const aspect = layout.W / layout.H;
      const lens = layout.portrait ? 20 : 15.6;
      const tan = Math.tan((lens * Math.PI) / 360);
      /* Frame the 24 cm strip: nearly full width on a phone, a column on desktop. */
      const fraction = layout.portrait ? 0.92 : 0.36;
      const d = 0.24 / fraction / (2 * tan * aspect);
      const y = WORLD.floorY;
      return [
        { t: 0.18, position: [0, -0.03, d], elevation: -1, lens: 20, clip: [0.1, 30], fog: 26 },
        { t: 0.48, position: [0, y * 0.72, d * 0.96], elevation: -2, lens: 20, clip: [0.1, 30], fog: 26 },
        { t: 0.64, position: [0, 0.28, 0.5], elevation: -84, lens: 36, clip: [0.05, 20], fog: 20 },
        { t: 0.84, position: [0, y - 0.25, 0.1], elevation: -90, lens: 40, clip: [0.04, 20], fog: 16 },
        { t: 0.93, position: [0, WORLD.slabBottom + 0.1, 0.5], elevation: -90, lens: 24, clip: [0.05, 60], fog: 40 },
      ];
    },
  },
  {
    id: "svc.head",
    act: 2,
    set: "archive",
    pose: { lens: [24, 62], elevation: -90, clip: [0.2, 90], fog: 72 },
    budget: { draws: 8, tris: { L: 22000, M: 60000, H: 140000 } },
    idleHz: 0,
    holdKnots: () => [
      { t: 0, position: [0, WORLD.slabBottom - 0.6, 1.5], lens: 24 },
      { t: 1, position: [0, WORLD.slabBottom - 5.2, 1.5], lens: 62 },
    ],
  },
  {
    id: "svc.web",
    act: 2,
    set: "archive",
    floor: "first",
    subject: { radius: 1.3, center: [0, 0, 0] },
    pose: { lens: 32, bearing: 12, elevation: -6, drift: [0, -0.15, -0.5], clip: [0.3, 80], fog: 62 },
    budget: { draws: 11, tris: { L: 25000, M: 70000, H: 160000 } },
    idleHz: 0,
    stripYaw: 0,
  },
  {
    id: "svc.apps",
    act: 2,
    set: "archive",
    floor: "locked",
    subject: { radius: 1.1, center: [0, 0, 0] },
    pose: { lens: 32, bearing: [-12, 13], elevation: -4, clip: [0.3, 80], fog: 62 },
    budget: { draws: 9, tris: { L: 22000, M: 60000, H: 140000 } },
    idleHz: 0,
  },
  {
    id: "svc.api",
    act: 2,
    set: "archive",
    floor: "locked",
    subject: { radius: 1.4, center: [0, 0, 0] },
    pose: { lens: 32, bearing: -18, elevation: 14, drift: [0, -0.2, -0.3], clip: [0.3, 80], fog: 60 },
    budget: { draws: 14, tris: { L: 30000, M: 80000, H: 180000 } },
    idleHz: 0,
  },
  {
    id: "svc.rescue",
    act: 2,
    set: "archive",
    floor: "locked",
    subject: { radius: 1.2, center: [0, 0, 0] },
    pose: { lens: 30, bearing: 10, elevation: -8, roll: [0, 7], clip: [0.3, 80], fog: 58 },
    budget: { draws: 12, tris: { L: 24000, M: 70000, H: 160000 } },
    idleHz: 0,
  },
  {
    id: "svc.ux",
    act: 2,
    set: "archive",
    floor: "locked",
    subject: { radius: 1.5, center: [0, 0, 0] },
    pose: { lens: 28, elevation: 0, clip: [0.3, 80], fog: 56 },
    budget: { draws: 8, tris: { L: 24000, M: 60000, H: 140000 } },
    idleHz: 0,
  },
  {
    id: "svc.auto",
    act: 2,
    set: "archive",
    floor: "locked",
    subject: { radius: 1.4, center: [0, 0, 0] },
    pose: { lens: 30, bearing: 90, elevation: -3, clip: [0.3, 80], fog: 54 },
    budget: { draws: 9, tris: { L: 22000, M: 60000, H: 140000 } },
    idleHz: 30,
  },
  {
    id: "process.head",
    act: 3,
    set: "archive",
    floor: { clear: 9 },
    subject: { radius: 4, center: [0, 0, 0] },
    pose: { lens: 50, elevation: -90, shift: [0, 0, 1.1], clip: [0.05, 90], fog: 70 },
    budget: { draws: 10, tris: { L: 26000, M: 70000, H: 160000 } },
    idleHz: 0,
    /* Threads the gap in the word, alongside the line. Never looks back up. */
    exitKnots(solved, layout, self) {
      const y = self.floorY;
      return [
        { t: 0.55, position: [0.16, y + 3.2, 0.18], elevation: -90, lens: 44, clip: [0.05, 70], fog: 60 },
        { t: 0.74, position: [0.16, y - 0.9, 0.12], elevation: -90, lens: 44, clip: [0.05, 70], fog: 60 },
      ];
    },
  },
  {
    id: "step.talk",
    act: 3,
    set: "archive",
    floor: { clear: 5 },
    subject: { radius: 1, center: [0, 0, 0] },
    pose: { lens: 28, bearing: 8, elevation: -10, clip: [0.2, 70], fog: 42 },
    budget: { draws: 10, tris: { L: 25000, M: 70000, H: 160000 } },
    idleHz: 0,
  },
  {
    id: "step.scope",
    act: 3,
    set: "archive",
    floor: "locked",
    subject: { radius: 1, center: [0, 0, 0] },
    pose: { lens: 28, bearing: -6, elevation: -24, clip: [0.2, 70], fog: 40 },
    budget: { draws: 8, tris: { L: 22000, M: 60000, H: 140000 } },
    idleHz: 0,
  },
  {
    id: "step.build",
    act: 3,
    set: "archive",
    floor: "locked",
    subject: { radius: 1, center: [0, 0, 0] },
    pose: { lens: 28, bearing: [20, -10], elevation: -8, clip: [0.2, 70], fog: 40 },
    budget: { draws: 9, tris: { L: 26000, M: 70000, H: 160000 } },
    idleHz: 0,
  },
  {
    id: "step.ship",
    act: 3,
    set: "archive",
    floor: "locked",
    subject: { radius: 0.9, center: [0, 0, 0] },
    pose: { lens: 28, elevation: [-12, -74], clip: [0.2, 70], fog: 40 },
    budget: { draws: 7, tris: { L: 22000, M: 60000, H: 140000 } },
    idleHz: 0,
  },
  {
    id: "fall",
    act: 3,
    set: "none",
    idleHz: 0,
    budget: { draws: 4, tris: { L: 3000, M: 6000, H: 12000 } },
    /* The fastest stretch of the film, and the cheapest frames. */
    authored(solved) {
      const ship = solved["step.ship"];
      const q = solved["why.q"];
      const top = ship.floorY - 2;
      const ceiling = q.floorY + q.d + 1.6;
      return [
        { t: 0.2, position: [0.2, top, 0.2], elevation: -90, lens: 70, clip: [0.05, 60], fog: 44 },
        { t: 0.86, position: [0.05, ceiling + 1.2, 0.06], elevation: -90, lens: 70, clip: [0.05, 40], fog: 34 },
      ];
    },
  },
  {
    id: "why.q",
    act: 4,
    set: "desk",
    desk: true,
    floor: { clear: 26 },
    subject: { radius: 0.85, center: [0, 0, -0.4] },
    pose: { lens: 40, elevation: -90, ...sharedDesk },
    budget: { draws: 18, tris: { L: 55000, M: 140000, H: 300000 } },
    idleHz: 30,
  },
  {
    id: "why.list",
    act: 4,
    set: "desk",
    desk: true,
    subject: { radius: 0.8, center: [0, 0, -0.4] },
    pose: { lens: 40, elevation: -90, ...sharedDesk },
    budget: { draws: 18, tris: { L: 55000, M: 140000, H: 300000 } },
    idleHz: 0,
  },
  {
    id: "why.stats",
    act: 4,
    set: "desk",
    desk: true,
    subject: { radius: 0.7, center: [0, 0, -0.4] },
    pose: { lens: 36, elevation: -70, ...sharedDesk },
    budget: { draws: 12, tris: { L: 14000, M: 60000, H: 140000 } },
    idleHz: 0,
  },
  {
    id: "cta",
    act: 4,
    set: "desk",
    desk: true,
    subject: { radius: 0.55, center: [0, 0, -0.4] },
    pose: { lens: 40, elevation: -90, clip: [0.02, 12], fog: 26 },
    /* Solved so the 3D phone's screen sits exactly behind the real panel. */
    solve(s, layout) {
      const { W, H, portrait, svh } = layout;
      const caption = s.shot.caption;
      const fov = (s.fov * Math.PI) / 180;
      const tanH = Math.tan(fov / 2) * (W / H);
      const screenShort = 0.072;
      const screenLong = 0.148;
      if (portrait) {
        /* Bezels just past the viewport edges: the visitor's phone becomes the phone. */
        s.d = 0.0775 * 0.965 / (2 * tanH);
        s.ox = 0;
        s.oy = 0;
      } else {
        const pixelsPerMetre = Math.max((caption.w + 32) / screenLong, (caption.h + 32) / screenShort);
        s.d = W / pixelsPerMetre / (2 * tanH);
        s.ox = W / 2 - (caption.x + caption.w / 2);
        s.oy = H / 2 - (caption.y + caption.h / 2);
      }
      void svh;
    },
    budget: { draws: 12, tris: { L: 14000, M: 60000, H: 140000 } },
    idleHz: 0,
  },
  {
    id: "coda",
    act: 4,
    set: "desk",
    desk: true,
    subject: { radius: 0.62, center: [0, 0.1, -0.4] },
    pose: { lens: 24, elevation: -15, ...sharedDesk },
    budget: { draws: 12, tris: { L: 14000, M: 60000, H: 140000 } },
    idleHz: 0,
  },
];

export const LOADERS = {
  hero: () => import("./hero.js"),
  drop: () => import("./drop.js"),
  "svc.head": () => import("./svc-head.js"),
  "svc.web": () => import("./svc-web.js"),
  "svc.apps": () => import("./svc-apps.js"),
  "svc.api": () => import("./svc-api.js"),
  "svc.rescue": () => import("./svc-rescue.js"),
  "svc.ux": () => import("./svc-ux.js"),
  "svc.auto": () => import("./svc-auto.js"),
  "process.head": () => import("./process-head.js"),
  "step.talk": () => import("./step-talk.js"),
  "step.scope": () => import("./step-scope.js"),
  "step.build": () => import("./step-build.js"),
  "step.ship": () => import("./step-ship.js"),
  fall: () => import("./fall.js"),
  "why.q": () => import("./why-q.js"),
  "why.list": () => import("./why-list.js"),
  "why.stats": () => import("./why-stats.js"),
  cta: () => import("./cta.js"),
  coda: () => import("./coda.js"),
};
