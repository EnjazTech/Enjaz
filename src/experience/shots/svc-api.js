/**
 * The pneumatic exchange, the original API. Four cabinets joined by glass tubes,
 * with brass capsules shooting between them and no clerk in sight.
 */

import { CatmullRomCurve3, CylinderGeometry, Mesh, TubeGeometry, Vector3 } from "three";
import { instances, merge, part } from "../engine/geo.js";
import { gantryParts } from "../sets/gantry.js";
import { cabinetParts } from "../sets/props.js";

const SAMPLES = 64;

export default {
  *build(ctx) {
    const { programs, dir } = ctx;
    const stations = [
      { x: -1.42, z: 0.5, tint: [0.34, 0.38, 0.44] },
      { x: -0.52, z: 0.95, tint: [0.42, 0.34, 0.3] },
      { x: 0.52, z: 0.95, tint: [0.3, 0.38, 0.34] },
      { x: 1.42, z: 0.5, tint: [0.38, 0.34, 0.44] },
    ].map((station) => ({ ...station, x: station.x * dir }));
    const FOOT = -1.15;

    ctx.group.add(
      new Mesh(
        merge([...gantryParts(FOOT - 0.12), ...stations.flatMap((station) => cabinetParts([station.x, FOOT, station.z], station.tint))]),
        programs.solid({ ambient: 0.1 })
      )
    );
    yield;

    /* Glass tubes between every pair: the top of each cabinet, up and over. */
    const pairs = [[0, 1], [1, 2], [2, 3], [0, 2], [1, 3], [0, 3]];
    const tubes = [];
    const tables = [];
    const collars = [];
    const point = new Vector3();
    pairs.forEach(([a, b], index) => {
      const from = stations[a];
      const to = stations[b];
      const rise = 0.9 + index * 0.17;
      const top = FOOT + 1.5;
      const curve = new CatmullRomCurve3([
        new Vector3(from.x, top, from.z),
        new Vector3(from.x, top + rise * 0.45, from.z),
        new Vector3((from.x + to.x) / 2, top + rise, (from.z + to.z) / 2 - 0.18 + index * 0.04),
        new Vector3(to.x, top + rise * 0.45, to.z),
        new Vector3(to.x, top, to.z),
      ]);
      tubes.push(new TubeGeometry(curve, 64, 0.052, 6, false));
      const table = new Float32Array((SAMPLES + 1) * 3);
      for (let i = 0; i <= SAMPLES; i += 1) {
        curve.getPointAt(i / SAMPLES, point);
        table.set([point.x, point.y, point.z], i * 3);
      }
      tables.push(table);
      for (const end of [from, to]) {
        collars.push(part(new CylinderGeometry(0.08, 0.08, 0.1, 12), { at: [end.x, top + 0.04, end.z], color: [0.76, 0.58, 0.3], mat: 1 }));
      }
    });
    ctx.group.add(new Mesh(merge(collars), programs.solid({ ambient: 0.1 })));
    const glass = new Mesh(merge(tubes.map((tube) => {
      tube.deleteAttribute("uv");
      return tube.index ? tube.toNonIndexed() : tube;
    })), programs.glow({ color: [0.72, 0.92, 1], alpha: 0.55, shape: 3, house: 1 }));
    glass.frustumCulled = false;
    ctx.tables = tables;
    yield;

    /* Capsules: brass, with a mint core. Positions read from the tube tables. */
    const count = 24;
    const capsuleBase = merge([
      part(new CylinderGeometry(0.04, 0.04, 0.13, 10), { color: [0.9, 0.72, 0.4], mat: 1 }),
      part(new CylinderGeometry(0.041, 0.041, 0.024, 10), { color: [0.36, 1, 0.87], mat: 2 }),
    ]);
    const capsules = new Mesh(
      instances(capsuleBase, count, (i, o) => {
        o.pos = [0, 0, 0];
        o.seed = i / count;
      }),
      programs.solid({ ambient: 0.22, defines: { INSTANCED: 1 } })
    );
    capsules.frustumCulled = false;
    ctx.group.add(capsules);
    /* Glass draws after what it holds. */
    ctx.group.add(glass);
    ctx.capsules = capsules;
    ctx.fire = 0;
    stations.forEach((station, index) => {
      ctx.hotspots.add({ id: `cabinet-${index}`, center: [station.x, FOOT + 0.8, station.z], radius: 70 });
    });
    yield;
  },
  update(p, ctx) {
    const positions = ctx.capsules.geometry.attributes.iPos;
    const tables = ctx.tables;
    const speed = p.y * 0.0019 + p.time * 0.05 + ctx.fire;
    for (let i = 0; i < 24; i += 1) {
      const table = tables[i % tables.length];
      let t = (speed * (0.8 + (i % 5) * 0.1) + i * 0.137) % 1;
      /* Half of them travel back again, so the network reads as two-way. */
      t = i % 2 ? 1 - t : t;
      /* Main flow in reading direction. */
      const f = t * SAMPLES;
      const a = Math.min(SAMPLES - 1, Math.floor(f));
      const u = f - a;
      positions.array[i * 3] = table[a * 3] + (table[a * 3 + 3] - table[a * 3]) * u;
      positions.array[i * 3 + 1] = table[a * 3 + 1] + (table[a * 3 + 4] - table[a * 3 + 1]) * u;
      positions.array[i * 3 + 2] = table[a * 3 + 2] + (table[a * 3 + 5] - table[a * 3 + 2]) * u;
    }
    positions.needsUpdate = true;
  },
  hit(id, p, ctx) {
    ctx.fire += 0.4;
  },
};
