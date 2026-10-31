/**
 * Nine props modelled in code, silhouette first: each must read as its real
 * object from its outline alone at its shot's camera distance. Local origin at
 * the object's footprint centre, resting on y = 0.
 */

import { CylinderGeometry, Group, LatheGeometry, Mesh, TorusGeometry, TubeGeometry, Vector2, Vector3, CatmullRomCurve3, BoxGeometry } from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { box, BRASS, cylinder, GRAPHITE, merge, part, UNLIT } from "../engine/geo.js";

/** A rectangular bar from point a to point b. */
export function beam(a, b, thickness, options) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const dz = b[2] - a[2];
  const length = Math.hypot(dx, dy, dz);
  const geometry = new BoxGeometry(thickness, length, thickness);
  const up = new Vector3(0, 1, 0);
  const direction = new Vector3(dx / length, dy / length, dz / length);
  const axis = new Vector3().crossVectors(up, direction);
  const angle = Math.acos(Math.min(1, Math.max(-1, up.dot(direction))));
  const mesh = new Mesh();
  if (axis.lengthSq() > 1e-8) {
    mesh.quaternion.setFromAxisAngle(axis.normalize(), angle);
  }
  mesh.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
  mesh.updateMatrix();
  geometry.applyMatrix4(mesh.matrix);
  return part(geometry, options);
}

const BEIGE = [0.78, 0.72, 0.6];
const BEIGE_DARK = [0.56, 0.51, 0.42];
const PLASTIC = [0.2, 0.19, 0.18];
const RUST = [0.46, 0.14, 0.12];

/** Dot-matrix printer: the wedge body, the platen and its knob, the paper slot. */
export function printerParts(at, dir) {
  const [x, y, z] = at;
  const color = BEIGE;
  return [
    box(0.5, 0.075, 0.32, { at: [x, y + 0.0375, z], color }),
    box(0.5, 0.05, 0.19, { at: [x, y + 0.095, z - 0.05], rot: [-0.12, 0, 0], color: BEIGE_DARK }),
    /* Paper slot and dark platen roller along the front of the lid. */
    box(0.42, 0.012, 0.03, { at: [x, y + 0.112, z + 0.09], color: [0.05, 0.05, 0.05] }),
    cylinder(0.018, 0.018, 0.44, 12, { at: [x, y + 0.112, z + 0.11], rot: [0, 0, Math.PI / 2], color: PLASTIC }),
    /* The knob your scroll turns: on the reading-end side. */
    cylinder(0.026, 0.026, 0.03, 16, { at: [x + 0.265 * dir, y + 0.108, z + 0.11], rot: [0, 0, Math.PI / 2], color: BEIGE_DARK }),
    /* Status panel with two lit LEDs. */
    box(0.12, 0.012, 0.05, { at: [x - 0.17 * dir, y + 0.078, z + 0.13], color: PLASTIC }),
    box(0.012, 0.006, 0.012, { at: [x - 0.2 * dir, y + 0.086, z + 0.13], color: [0.3, 1, 0.5], mat: UNLIT }),
    box(0.012, 0.006, 0.012, { at: [x - 0.17 * dir, y + 0.086, z + 0.13], color: [1, 0.55, 0.15], mat: UNLIT }),
    /* Ventilation ribs: they catch the lamp and say "1980s" at a glance. */
    ...[0, 1, 2, 3, 4].map((i) =>
      box(0.16, 0.004, 0.004, { at: [x + 0.12 * dir, y + 0.128 + 0.0005, z - 0.1 + i * 0.022], color: BEIGE_DARK })
    ),
    /* The waiting fanfold stack behind it. */
    box(0.26, 0.05, 0.16, { at: [x, y + 0.025, z - 0.22], color: [0.86, 0.87, 0.82] }),
  ];
}

/** Architect lamp: base, two parallel-rod arms, spring at the elbow, cone shade. */
export function lampParts(baseAt, elbow, head, dir) {
  const base = baseAt;
  const color = [0.76, 0.56, 0.3];
  const rods = (a, b) => {
    const off = 0.012;
    return [
      beam([a[0], a[1], a[2] - off], [b[0], b[1], b[2] - off], 0.008, { color, mat: BRASS }),
      beam([a[0], a[1], a[2] + off], [b[0], b[1], b[2] + off], 0.008, { color, mat: BRASS }),
    ];
  };
  const shade = new CylinderGeometry(0.038, 0.105, 0.15, 28, 1, true);
  const shadeUp = new Vector3(0, 1, 0);
  return [
    cylinder(0.09, 0.098, 0.022, 24, { at: [base[0], base[1] + 0.011, base[2]], color: [0.26, 0.22, 0.17], mat: BRASS }),
    ...rods([base[0], base[1] + 0.02, base[2]], elbow),
    ...rods(elbow, head),
    cylinder(0.018, 0.018, 0.05, 12, { at: elbow, rot: [Math.PI / 2, 0, 0], color: [0.3, 0.28, 0.24], mat: BRASS }),
    beam([elbow[0] - 0.05 * dir, elbow[1] - 0.08, elbow[2]], [elbow[0] + 0.05 * dir, elbow[1] - 0.05, elbow[2]], 0.006, { color: [0.5, 0.5, 0.48], mat: BRASS }),
    /* Shade, tipped toward the pool of light. */
    (() => {
      const tiltAxis = new Vector3(0, 0, 1);
      const mesh = new Mesh(shade);
      mesh.position.set(head[0], head[1] - 0.05, head[2]);
      mesh.quaternion.setFromAxisAngle(tiltAxis, 0.42 * dir);
      mesh.updateMatrix();
      shade.applyMatrix4(mesh.matrix);
      shadeUp.set(0, 1, 0);
      return part(shade, { color: [1.9, 1.4, 0.8], mat: BRASS });
    })(),
    cylinder(0.038, 0.038, 0.03, 16, { at: [head[0] + 0.022 * dir, head[1] + 0.03, head[2]], rot: [0, 0, 0.42 * dir], color: [0.5, 0.36, 0.2], mat: BRASS }),
  ];
}

/** Desk phone: sloped body, dial plate, cradle. The handset is a separate mesh. */
export function landlineBaseParts(at) {
  const [x, y, z] = at;
  return [
    box(0.22, 0.05, 0.24, { at: [x, y + 0.025, z], color: RUST }),
    box(0.18, 0.04, 0.16, { at: [x, y + 0.07, z + 0.015], rot: [0.32, 0, 0], color: RUST }),
    cylinder(0.05, 0.05, 0.006, 24, { at: [x, y + 0.097, z + 0.03], rot: [0.32, 0, 0], color: [0.86, 0.82, 0.72] }),
    /* Cradle prongs. */
    box(0.03, 0.05, 0.05, { at: [x - 0.075, y + 0.1, z - 0.08], color: RUST }),
    box(0.03, 0.05, 0.05, { at: [x + 0.075, y + 0.1, z - 0.08], color: RUST }),
  ];
}

export function handsetGeometry() {
  return merge([
    box(0.24, 0.024, 0.04, { at: [0, 0, 0], color: RUST }),
    cylinder(0.033, 0.03, 0.03, 16, { at: [-0.11, -0.022, 0], color: RUST }),
    cylinder(0.033, 0.03, 0.03, 16, { at: [0.11, -0.022, 0], color: RUST }),
  ]);
}

/** A curly phone cord: a tight helix around a spline. */
export function cordGeometry(points, loops = 26, radius = 0.009) {
  const spline = new CatmullRomCurve3(points.map((point) => new Vector3(...point)));
  const pts = [];
  const samples = loops * 8;
  const tangent = new Vector3();
  const side = new Vector3();
  const up = new Vector3();
  for (let i = 0; i <= samples; i += 1) {
    const t = i / samples;
    const center = spline.getPoint(t);
    spline.getTangent(t, tangent);
    side.set(0.3, 1, 0.2).cross(tangent).normalize();
    up.crossVectors(tangent, side).normalize();
    const angle = t * loops * Math.PI * 2;
    pts.push(center.addScaledVector(side, Math.cos(angle) * radius).addScaledVector(up, Math.sin(angle) * radius));
  }
  return part(new TubeGeometry(new CatmullRomCurve3(pts), samples, 0.0034, 4, false), { color: [0.34, 0.1, 0.09] });
}

/** Mug: a lathe, a handle and a dark surface of cold coffee. */
export function mugParts(at, dir) {
  const [x, y, z] = at;
  const r = 0.045;
  const profile = [
    new Vector2(0.001, 0),
    new Vector2(r * 0.95, 0),
    new Vector2(r, 0.006),
    new Vector2(r, 0.095),
    new Vector2(r * 0.9, 0.095),
    new Vector2(r * 0.9, 0.012),
    new Vector2(0.001, 0.012),
  ];
  const body = new LatheGeometry(profile, 24);
  body.translate(x, y, z);
  return [
    part(body, { color: [0.9, 0.88, 0.82] }),
    part(new TorusGeometry(0.028, 0.0065, 8, 16), { at: [x + (r + 0.016) * dir, y + 0.05, z], color: [0.9, 0.88, 0.82] }),
    cylinder(r * 0.88, r * 0.88, 0.002, 24, { at: [x, y + 0.078, z], color: [0.12, 0.07, 0.04] }),
  ];
}

/** Wall clock face. Hands are separate so they can run with the scroll. */
export function clockParts(at) {
  const [x, y, z] = at;
  const r = 0.17;
  const ticks = [];
  for (let i = 0; i < 12; i += 1) {
    const a = (i / 12) * Math.PI * 2;
    const long = i % 3 === 0;
    ticks.push(
      box(long ? 0.008 : 0.005, long ? 0.028 : 0.016, 0.003, {
        at: [x + Math.sin(a) * r * 0.82, y + Math.cos(a) * r * 0.82, z + 0.022],
        rot: [0, 0, -a],
        color: [0.12, 0.12, 0.12],
      })
    );
  }
  return [
    cylinder(r + 0.015, r + 0.015, 0.03, 40, { at: [x, y, z], rot: [Math.PI / 2, 0, 0], color: [0.22, 0.2, 0.17], mat: BRASS }),
    cylinder(r, r, 0.012, 40, { at: [x, y, z + 0.012], rot: [Math.PI / 2, 0, 0], color: [0.92, 0.9, 0.82] }),
    ...ticks,
  ];
}

/** Used by the Rescue machine: three rollers in a cast frame. */
export function mangleParts() {
  const iron = [0.36, 0.37, 0.4];
  return [
    box(0.18, 1.5, 1.9, { at: [-1.08, 0, 0], color: iron }),
    box(0.18, 1.5, 1.9, { at: [1.08, 0, 0], color: iron }),
    box(2.3, 0.14, 0.34, { at: [0, 0.82, -0.8], color: iron }),
    box(2.3, 0.14, 0.34, { at: [0, -0.82, -0.8], color: iron }),
    /* Cast-iron gussets and the big drive wheel: this is what makes it read as a mangle. */
    cylinder(0.48, 0.48, 0.08, 40, { at: [-1.2, 0.2, 0], rot: [0, 0, Math.PI / 2], color: [0.3, 0.31, 0.34] }),
    cylinder(0.1, 0.1, 0.12, 16, { at: [-1.25, 0.2, 0], rot: [0, 0, Math.PI / 2], color: [0.7, 0.54, 0.28], mat: BRASS }),
    ...[0, 1, 2, 3, 4, 5].map((i) => {
      const a = (i / 6) * Math.PI * 2;
      return box(0.05, 0.05, 0.42, { at: [-1.22, 0.2 + Math.sin(a) * 0.2, Math.cos(a) * 0.2], rot: [a, 0, 0], color: [0.3, 0.31, 0.34] });
    }),
  ];
}

export function rollerGeometry() {
  return part(new CylinderGeometry(0.2, 0.2, 2.0, 24), { rot: [0, 0, Math.PI / 2], color: [0.74, 0.58, 0.3], mat: BRASS });
}

/** A filing-cabinet tower for the pneumatic exchange. */
export function cabinetParts(at, tint) {
  const [x, y, z] = at;
  const color = tint;
  const parts = [box(0.72, 1.5, 0.62, { at: [x, y + 0.75, z], color })];
  for (let i = 0; i < 4; i += 1) {
    const dy = y + 0.2 + i * 0.36;
    parts.push(
      box(0.64, 0.32, 0.02, { at: [x, dy, z + 0.32], color: [color[0] * 1.2, color[1] * 1.2, color[2] * 1.2] }),
      box(0.14, 0.024, 0.03, { at: [x, dy + 0.06, z + 0.34], color: [0.75, 0.58, 0.3], mat: BRASS }),
      box(0.12, 0.05, 0.006, { at: [x, dy - 0.05, z + 0.333], color: [0.86, 0.84, 0.76] })
    );
  }
  return parts;
}

export { Group, RoundedBoxGeometry, GRAPHITE };
