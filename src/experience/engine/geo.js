/**
 * Procedural modelling helpers. Props are lists of tinted primitives merged into
 * one geometry; everything repeated goes through instances().
 */

import {
  BoxGeometry,
  BufferAttribute,
  CylinderGeometry,
  Euler,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  Matrix4,
  Quaternion,
  Vector3,
} from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

export const GRAPHITE = 0;
export const BRASS = 1;
export const UNLIT = 2;

const matrix = new Matrix4();
const euler = new Euler();
const quaternion = new Quaternion();
const translation = new Vector3();
const scaling = new Vector3();

/**
 * Applies a transform and writes the vertex colour.
 * aColor: rgb tint (with ao multiplied in), a = 0 graphite, 1 brass, 2 unlit.
 */
export function part(geometry, { at = [0, 0, 0], rot = [0, 0, 0], scale = [1, 1, 1], color = [1, 1, 1], mat = GRAPHITE, ao = 1 } = {}) {
  const g = geometry.index ? geometry.toNonIndexed() : geometry;
  euler.set(rot[0], rot[1], rot[2]);
  quaternion.setFromEuler(euler);
  translation.set(at[0], at[1], at[2]);
  scaling.set(scale[0], scale[1], scale[2]);
  matrix.compose(translation, quaternion, scaling);
  g.applyMatrix4(matrix);
  const count = g.attributes.position.count;
  const colors = new Float32Array(count * 4);
  const positions = g.attributes.position;
  let minY = Infinity;
  let maxY = -Infinity;
  for (let i = 0; i < count; i += 1) {
    const y = positions.getY(i);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }
  for (let i = 0; i < count; i += 1) {
    /* Cheap vertex AO: darker toward the bottom of each part. */
    const h = (positions.getY(i) - minY) / Math.max(1e-4, maxY - minY);
    const shade = ao * (0.72 + 0.28 * h);
    colors[i * 4] = color[0] * shade;
    colors[i * 4 + 1] = color[1] * shade;
    colors[i * 4 + 2] = color[2] * shade;
    colors[i * 4 + 3] = mat;
  }
  g.setAttribute("aColor", new BufferAttribute(colors, 4));
  g.deleteAttribute("uv");
  return g;
}

export const box = (w, h, d, options) => part(new BoxGeometry(w, h, d), options);
export const cylinder = (rTop, rBottom, h, segments, options) =>
  part(new CylinderGeometry(rTop, rBottom, h, segments), options);

export const merge = (parts) => mergeGeometries(parts, false);

export function quatEuler(x, y, z, out = [0, 0, 0, 1]) {
  euler.set(x, y, z);
  quaternion.setFromEuler(euler);
  out[0] = quaternion.x;
  out[1] = quaternion.y;
  out[2] = quaternion.z;
  out[3] = quaternion.w;
  return out;
}

/**
 * Builds an InstancedBufferGeometry on `base`. `write(i, o)` fills
 * o.pos, o.quat, o.scale, o.tint, o.seed and o.cell. Instance order matters: ids
 * run most important first, so lowering instanceCount is a one-integer LOD.
 */
export function instances(base, count, write, extra = {}) {
  const pos = new Float32Array(count * 3);
  const quat = new Float32Array(count * 4);
  const scale = new Float32Array(count * 3);
  const tint = new Float32Array(count * 3);
  const seed = new Float32Array(count);
  const cell = new Float32Array(count * 4);
  const extras = Object.fromEntries(
    Object.entries(extra).map(([name, size]) => [name, new Float32Array(count * size)])
  );
  const o = { pos: [0, 0, 0], quat: [0, 0, 0, 1], scale: [1, 1, 1], tint: [1, 1, 1], seed: 0, cell: [0, 0, 1, 1], extra: {} };

  for (let i = 0; i < count; i += 1) {
    o.quat[0] = o.quat[1] = o.quat[2] = 0;
    o.quat[3] = 1;
    o.scale[0] = o.scale[1] = o.scale[2] = 1;
    o.tint[0] = o.tint[1] = o.tint[2] = 1;
    o.seed = i / count;
    write(i, o);
    pos.set(o.pos, i * 3);
    quat.set(o.quat, i * 4);
    scale.set(o.scale, i * 3);
    tint.set(o.tint, i * 3);
    seed[i] = o.seed;
    cell.set(o.cell, i * 4);
    for (const name of Object.keys(extras)) {
      const value = o.extra[name];
      extras[name].set(Array.isArray(value) ? value : [value], i * extra[name]);
    }
  }

  const geometry = new InstancedBufferGeometry();
  geometry.index = base.index;
  for (const name of Object.keys(base.attributes)) {
    geometry.setAttribute(name, base.attributes[name]);
  }
  geometry.setAttribute("iPos", new InstancedBufferAttribute(pos, 3));
  geometry.setAttribute("iQuat", new InstancedBufferAttribute(quat, 4));
  geometry.setAttribute("iScale", new InstancedBufferAttribute(scale, 3));
  geometry.setAttribute("iTint", new InstancedBufferAttribute(tint, 3));
  geometry.setAttribute("iSeed", new InstancedBufferAttribute(seed, 1));
  geometry.setAttribute("iCell", new InstancedBufferAttribute(cell, 4));
  for (const name of Object.keys(extras)) {
    geometry.setAttribute(name, new InstancedBufferAttribute(extras[name], extra[name]));
  }
  geometry.instanceCount = count;
  return geometry;
}

/** mulberry32, seeded from a string. Same world in both locales. */
export function seeded(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  }
  return () => {
    h = (h + 0x6d2b79f5) | 0;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const clamp01 = (value) => Math.min(1, Math.max(0, value));
export const lerp = (a, b, t) => a + (b - a) * t;
export const smoothstep = (a, b, x) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
