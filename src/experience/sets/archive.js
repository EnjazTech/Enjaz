/**
 * The archive: a concrete atrium walled with everything ever filed. It wraps
 * around the camera in the vertex shader, so a whole building costs one uniform.
 * Light and tidiness are functions of world Y: the deeper, the cleaner.
 */

import { BoxGeometry, Group, Mesh, PlaneGeometry, Vector2 } from "three";
import { box, instances, merge, part, quatEuler, seeded } from "../engine/geo.js";
import { WORLD } from "../engine/rail.js";

const HALF = WORLD.archiveHalf;
const GALLERY = WORLD.galleryH;
const OPENING = 11.4;

function shelfCanvas(text, variant) {
  const size = 512;
  return text.canvas(size, size, (c) => {
    const rng = seeded(`shelf-${variant}`);
    c.fillStyle = variant === 0 ? "#2a2520" : "#0a0c11";
    c.fillRect(0, 0, size, size);
    const rows = 6;
    const rowH = size / rows;
    for (let row = 0; row < rows; row += 1) {
      let x = 0;
      while (x < size) {
        const w = 8 + rng() * 22;
        const h = rowH * (0.74 + rng() * 0.22);
        if (variant === 0) {
          const pick = rng();
          const shade = 0.5 + rng() * 0.5;
          const base = pick < 0.6 ? [176, 136, 86] : pick < 0.8 ? [214, 202, 170] : pick < 0.92 ? [96, 110, 128] : [150, 70, 60];
          c.fillStyle = `rgb(${base[0] * shade},${base[1] * shade},${base[2] * shade})`;
          /* A few files have slumped: the top of the building is a mess. */
          c.save();
          c.translate(x + w / 2, rowH * (row + 1) - 4);
          c.rotate(rng() > 0.86 ? (rng() - 0.5) * 0.5 : 0);
          c.fillRect(-w / 2, -h, w - 1.5, h);
          c.fillStyle = "rgba(255,255,255,.35)";
          c.fillRect(-w / 2 + w * 0.25, -h * 0.82, w * 0.4, h * 0.2);
          c.restore();
        } else {
          /* Software side: graphite, with a mint hairline. */
          const shade = 12 + rng() * 10;
          c.fillStyle = `rgb(${shade},${shade + 2},${shade + 8})`;
          c.fillRect(x, rowH * (row + 1) - h - 4, w - 2, h);
          if (rng() > 0.72) {
            c.fillStyle = rng() > 0.8 ? "#a48bff" : "#5dffde";
            c.fillRect(x + w / 2 - 1, rowH * (row + 1) - h, 1.5, h - 8);
          }
        }
        x += w;
      }
      c.fillStyle = variant === 0 ? "#141210" : "#1c2027";
      c.fillRect(0, rowH * (row + 1) - 4, size, 4);
    }
  }, { repeat: true });
}

export function createArchive({ programs, text, q, dir }) {
  const group = new Group();
  group.name = "archive";

  const u = {
    uTurn: { value: 0 },
    uOrderY: { value: new Vector2(WORLD.slabBottom, -60) },
    uGalleryH: { value: GALLERY },
  };

  /* --------------------------------------------------------------------------
     Walls: one quad each, textured with shelves, snapped to the camera by floor
     -------------------------------------------------------------------------- */

  const floors = 40;
  const wallPlane = new PlaneGeometry(HALF * 2, GALLERY * floors, 4, floors);
  const uvs = wallPlane.attributes.uv;
  for (let i = 0; i < uvs.count; i += 1) {
    uvs.setXY(i, uvs.getX(i) * 8, uvs.getY(i) * floors);
  }
  const wallGeometries = [
    [0, 0, -HALF, 0],
    [0, 0, HALF, Math.PI],
    [-HALF, 0, 0, Math.PI / 2],
    [HALF, 0, 0, -Math.PI / 2],
  ].map(([x, y, z, yaw]) => {
    const g = wallPlane.clone();
    g.rotateY(yaw);
    g.translate(x, y, z);
    return g;
  });
  const wallMerged = merge(
    wallGeometries.map((g) => {
      const idx = g.toNonIndexed();
      return idx;
    })
  );
  const shelfFront = shelfCanvas(text, 0);
  shelfFront.anisotropy = 8;
  const shelfBack = shelfCanvas(text, 1);
  shelfBack.anisotropy = 8;
  const wallMaterial = programs.paper({
    atlas: { value: shelfFront },
    ambient: 0.03,
    boost: 0.62,
    deform: {
      pars: `uniform float uTurn, uGalleryH; out float vTurn, vLit;`,
      fpars: `uniform sampler2D uShelf2; in float vTurn, vLit;`,
      world: `
        wp.y += floor(uCamY / uGalleryH) * uGalleryH;
        {
          float along = abs(wn.z) > 0.5 ? wp.x : wp.z;
          vTurn = smoothstep(0.0, 1.0, uTurn * 2.2 - (along * uInline / 14.0 * 0.5 + 0.5) - 0.1);
        }
        vLit = uTurn;`,
      frag: `c = mix(c, texture(uShelf2, vUv).rgb * (vec3(0.42) + vHouse * 0.7), vTurn);`,
      uniforms: { uTurn: u.uTurn, uGalleryH: u.uGalleryH, uShelf2: { value: shelfBack } },
    },
  });
  const walls = new Mesh(wallMerged, wallMaterial);
  walls.frustumCulled = false;
  group.add(walls);

  /* --------------------------------------------------------------------------
     Galleries and piers
     -------------------------------------------------------------------------- */

  const concrete = [0.26, 0.25, 0.25];
  /* Wrap by the instance's own position, never per vertex: an object straddling the
     boundary would otherwise tear into a band as tall as the period. */
  const wrap = (period) => `wp.y -= floor((iPos.y - uCamY) / ${period.toFixed(2)} + 0.5) * ${period.toFixed(2)};`;

  const galleryBase = part(new BoxGeometry(1, 1, 1));
  const galleryRows = 18;
  const galleryEntries = [];
  for (let f = 0; f < galleryRows; f += 1) {
    const y = -f * GALLERY;
    for (const [nx, nz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const along = OPENING * 2 + 6;
      const slabAt = (HALF + OPENING) / 2;
      /* Slab, then a rail above its lip, then the darker soffit shadow line. */
      galleryEntries.push({
        pos: [nx * slabAt, y - 0.1, nz * slabAt],
        scale: nx ? [HALF - OPENING, 0.2, along] : [along, 0.2, HALF - OPENING],
        tint: concrete,
      });
      galleryEntries.push({
        pos: [nx * OPENING, y + 0.95, nz * OPENING],
        scale: nx ? [0.06, 0.06, along] : [along, 0.06, 0.06],
        tint: [0.55, 0.52, 0.48],
      });
      galleryEntries.push({
        pos: [nx * OPENING, y + 0.55, nz * OPENING],
        scale: nx ? [0.03, 0.03, along] : [along, 0.03, 0.03],
        tint: [0.4, 0.38, 0.36],
      });
    }
  }
  const galleries = new Mesh(
    instances(galleryBase, galleryEntries.length, (i, o) => {
      const e = galleryEntries[i];
      o.pos = e.pos;
      o.scale = e.scale;
      o.tint = e.tint;
    }),
    programs.solid({
      ambient: 0.05,
      defines: { INSTANCED: 1 },
      deform: { world: wrap(GALLERY * galleryRows) },
    })
  );
  galleries.frustumCulled = false;
  group.add(galleries);

  const pierEntries = [];
  for (const side of [-1, 1]) {
    for (const along of [-OPENING, -OPENING / 3, OPENING / 3, OPENING]) {
      pierEntries.push([side * OPENING, along]);
      pierEntries.push([along, side * OPENING]);
    }
  }
  const piers = new Mesh(
    instances(part(new BoxGeometry(0.34, 1, 0.34, 1, 44, 1)), pierEntries.length, (i, o) => {
      o.pos = [pierEntries[i][0], 0, pierEntries[i][1]];
      o.scale = [1, 180, 1];
      o.tint = [0.36, 0.35, 0.34];
    }),
    programs.solid({
      ambient: 0.05,
      defines: { INSTANCED: 1 },
      deform: { world: `wp.y += uCamY;` },
    })
  );
  piers.frustumCulled = false;
  group.add(piers);

  /* --------------------------------------------------------------------------
     Box files: instanced, turning over from cardboard to graphite in reading order
     -------------------------------------------------------------------------- */

  const rng = seeded("archive");
  const floorsWrapped = Math.max(3, Math.round(q.boxes / 460));
  const period = floorsWrapped * GALLERY;
  /* One box per file. Only its back face is the software side, plus a mint hairline. */
  const fileBox = part(new BoxGeometry(1, 1, 0.8));
  const fileNormals = fileBox.attributes.normal;
  for (let i = 0; i < fileNormals.count; i += 1) {
    if (fileNormals.getZ(i) < -0.5) {
      fileBox.attributes.aColor.setXYZ(i, 0, 0, 0);
    }
  }
  const fileBase = merge([fileBox, box(0.05, 0.86, 0.01, { at: [0, 0, -0.41], color: [0.36, 1, 0.87], mat: 2 })]);

  const boxCount = q.boxes;
  const files = new Mesh(
    instances(fileBase, boxCount, (i, o) => {
      const wall = i % 4;
      const across = (rng() * 2 - 1) * (HALF - 1);
      const y = -rng() * period;
      const lean = (rng() - 0.5) * 0.5;
      const depth = HALF - 0.3 - rng() * 2.2;
      const width = 0.5 + rng() * 0.5;
      const height = 0.55 + rng() * 0.4;
      if (wall === 0) {
        o.pos = [across, y, -depth];
        quatEuler(0, 0, lean, o.quat);
      } else if (wall === 1) {
        o.pos = [across, y, depth];
        quatEuler(0, Math.PI, lean, o.quat);
      } else if (wall === 2) {
        o.pos = [-depth, y, across];
        quatEuler(0, Math.PI / 2, lean, o.quat);
      } else {
        o.pos = [depth, y, across];
        quatEuler(0, -Math.PI / 2, lean, o.quat);
      }
      o.scale = [width, height, 0.4];
      const shade = 0.62 + rng() * 0.38;
      const pick = rng();
      o.tint = pick < 0.62 ? [0.74 * shade, 0.56 * shade, 0.33 * shade] : pick < 0.86 ? [0.86 * shade, 0.8 * shade, 0.66 * shade] : pick < 0.95 ? [0.38 * shade, 0.44 * shade, 0.52 * shade] : [0.6 * shade, 0.24 * shade, 0.2 * shade];
      o.seed = rng();
    }),
    programs.solid({
      ambient: 0.05,
      defines: { INSTANCED: 1 },
      deform: {
        pars: `uniform float uTurn; uniform vec2 uOrderY; out float vBack;`,
        local: `
          /* The turnover: 180 degrees about the file's own vertical axis, in reading direction. */
          float baseAlong = abs(iQuat.y) > 0.3 && abs(iQuat.y) < 0.9 ? iPos.z : iPos.x;
          float inlinePos = baseAlong * uInline / 14.0;
          float flip = smoothstep(0.0, 1.0, uTurn * 2.2 - (inlinePos * 0.5 + 0.5) - seed * 0.2);
          float flipA = flip * 3.14159 * uInline;
          float cf = cos(flipA), sf = sin(flipA);
          p = vec3(p.x * cf + p.z * sf, p.y, -p.x * sf + p.z * cf);
          n = vec3(n.x * cf + n.z * sf, n.y, -n.x * sf + n.z * cf);
          vBack = step(aColor.r + aColor.g + aColor.b, 0.01);
          if (aColor.a > 1.5) { tint = aColor.rgb * flip; }`,
        world: `
          {
            float shift = floor((iPos.y - uCamY) / ${period.toFixed(2)} + 0.5) * ${period.toFixed(2)};
            /* Files sink into the wall at the edges of the wrap, so they never pop. */
            float edge = smoothstep(${(period / 2).toFixed(2)}, ${(period * 0.36).toFixed(2)}, abs(iPos.y - shift - uCamY));
            wp.y -= shift;
            float order = clamp((uOrderY.x - wp.y) / (uOrderY.x - uOrderY.y), 0.0, 1.0);
            if (aColor.a < 1.5) { tint = mix(mix(tint, vec3(0.1, 0.11, 0.13), order * 0.55), vec3(0.075, 0.08, 0.1), vBack); }
            vec3 towardsWall = normalize(vec3(sign(iPos.x) * step(10.0, abs(iPos.x)), 0.0, sign(iPos.z) * step(10.0, abs(iPos.z))) + vec3(0.0001));
            wp += towardsWall * (1.0 - edge) * 2.8;
          }`,
        uniforms: { uTurn: u.uTurn, uOrderY: u.uOrderY },
      },
    })
  );
  files.frustumCulled = false;
  group.add(files);

  /* --------------------------------------------------------------------------
     Paper hanging over the rails, and paper weather around the camera
     -------------------------------------------------------------------------- */

  const sheetPlane = new PlaneGeometry(1, 1, 1, 3);
  const faces = ["ledger", "invoice", "lines", "sheet", "memo", "receipt"];
  const hangCount = Math.min(180, Math.floor(q.weather * 0.75));
  const hanging = new Mesh(
    instances(sheetPlane, hangCount, (i, o) => {
      const side = i % 4;
      const along = (rng() * 2 - 1) * (OPENING - 0.5);
      const y = -Math.floor(rng() * 18) * GALLERY + 0.3;
      o.pos = side === 0 ? [along, y, -OPENING] : side === 1 ? [along, y, OPENING] : side === 2 ? [-OPENING, y, along] : [OPENING, y, along];
      quatEuler(0, side < 2 ? 0 : Math.PI / 2, (rng() - 0.5) * 0.2, o.quat);
      const s = 0.55 + rng() * 0.6;
      o.scale = [s, s * 1.42, 1];
      o.cell = text.cell(faces[Math.floor(rng() * faces.length)]);
      const shade = 0.75 + rng() * 0.25;
      o.tint = [shade, shade, shade * 0.95];
    }),
    programs.paper({
      ambient: 0.05,
      defines: { INSTANCED: 1 },
      deform: { world: wrap(GALLERY * 18) },
    })
  );
  hanging.frustumCulled = false;
  group.add(hanging);

  const weatherPlane = new PlaneGeometry(0.34, 0.46);
  const weather = new Mesh(
    instances(weatherPlane, q.weather, (i, o) => {
      o.pos = [(rng() * 2 - 1) * 10.5, -rng() * 24, (rng() * 2 - 1) * 10.5];
      o.cell = text.cell(faces[Math.floor(rng() * faces.length)]);
      const shade = 0.78 + rng() * 0.22;
      o.tint = [shade, shade, shade * 0.95];
      o.seed = rng();
    }),
    programs.paper({
      ambient: 0.08,
      defines: { INSTANCED: 1 },
      deform: {
        pars: `uniform float uTurn;`,
        local: `{
          float t = uTime * 0.25 + seed * 40.0;
          float ca = cos(t * 1.3), sa = sin(t * 1.3), cb = cos(t), sb = sin(t);
          p = vec3(p.x * ca - p.y * sa, p.x * sa + p.y * ca, p.z);
          p = vec3(p.x, p.y * cb - p.z * sb, p.y * sb + p.z * cb);
          n = vec3(n.x * ca - n.y * sa, n.x * sa + n.y * ca, n.z);
          n = vec3(n.x, n.y * cb - n.z * sb, n.y * sb + n.z * cb);
        }`,
        world: `{
          float fallen = iPos.y - uTime * 0.3;
          float y = fallen - floor((fallen - uCamY) / 24.0 + 0.5) * 24.0;
          vec3 centre = vec3(iPos.x + sin(uTime * 0.2 + seed * 30.0) * uInline * 0.4, y, iPos.z);
          float gone = smoothstep(0.1, 0.6, uTurn);
          centre.xz *= 1.0 + gone * 2.0;
          /* Tumbling paper keeps out of the lens: a huge sheet in the shot is noise. */
          vec3 fromCam = centre - cameraPosition;
          float dist = length(fromCam);
          centre += fromCam / max(dist, 0.001) * max(0.0, 5.0 - dist);
          wp += centre - iPos;
        }`,
        uniforms: { uTurn: u.uTurn },
      },
    })
  );
  weather.frustumCulled = false;
  group.add(weather);

  const fullFiles = boxCount;
  const fullWeather = q.weather;

  return {
    group,
    u,
    *build() {
      yield;
    },
    setRange(topY, bottomY) {
      u.uOrderY.value.set(topY, bottomY);
    },
    setDensity(scale) {
      files.geometry.instanceCount = Math.floor(fullFiles * scale);
      weather.geometry.instanceCount = Math.floor(fullWeather * scale);
    },
    setWeather(enabled) {
      weather.visible = enabled;
      hanging.visible = enabled;
    },
  };
}
