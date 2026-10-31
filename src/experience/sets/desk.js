/**
 * The desk: the first frame and the last frame of the film. A deterministic seed
 * is what makes it recognisably the same desk both times. All lamp maths is in
 * desk-local space, so the group can be moved in the dark without a re-bake.
 */

import {
  BoxGeometry,
  CylinderGeometry,
  DepthTexture,
  Group,
  LessEqualCompare,
  LinearFilter,
  Matrix4,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  UnsignedIntType,
  Vector3,
  WebGLRenderTarget,
} from "three";
import { box, clamp01, instances, merge, part, quatEuler, seeded } from "../engine/geo.js";
import { WORLD } from "../engine/rail.js";
import { canvasTexture } from "../programs.js";
import {
  clockParts,
  cordGeometry,
  handsetGeometry,
  landlineBaseParts,
  lampParts,
  mugParts,
  printerParts,
} from "./props.js";

const CLEAR_DEFORM = {
  pars: `in float iClear; uniform float uClear;`,
  /* Each ring of the checklist lifts its things outward, off the edge of the desk. */
  world: `
    float clearF = clamp((uClear - iClear - seed * 0.34) / 0.62, 0.0, 1.0);
    if (clearF > 0.0) {
      clearF *= clearF;
      vec3 away = wp - (uLampOrigin + vec3(0.0, 0.0, -0.4));
      away.y = 0.0;
      wp += normalize(away + vec3(0.001)) * clearF * 2.4;
      wp.y += clearF * 0.9 - clearF * clearF * 1.9;
    }`,
};

function grainTexture() {
  const w = 1024;
  const h = 512;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const c = canvas.getContext("2d");
  c.fillStyle = "#7b4c2b";
  c.fillRect(0, 0, w, h);
  const rng = seeded("walnut");
  /* Long, gently wandering grain lines. */
  for (let i = 0; i < 520; i += 1) {
    let y = rng() * h;
    const dark = rng() > 0.45;
    c.strokeStyle = dark ? `rgba(44,22,10,${0.05 + rng() * 0.2})` : `rgba(180,120,74,${0.03 + rng() * 0.1})`;
    c.lineWidth = 0.5 + rng() * 2.4;
    c.beginPath();
    c.moveTo(0, y);
    const wander = rng() * 1.2;
    for (let x = 0; x <= w; x += 48) {
      y += (rng() - 0.5) * 4 * wander;
      c.lineTo(x, y);
    }
    c.stroke();
  }
  /* A cathedral figure or two, so it stops looking like a gradient. */
  for (let k = 0; k < 3; k += 1) {
    const cx = rng() * w;
    const cy = rng() * h;
    for (let r = 8; r < 90; r += 5 + rng() * 5) {
      c.strokeStyle = `rgba(40,20,9,${0.1 + rng() * 0.09})`;
      c.lineWidth = 0.8;
      c.beginPath();
      c.ellipse(cx, cy, r * 3.2, r * 0.8, 0, 0, Math.PI * 2);
      c.stroke();
    }
  }
  return canvasTexture(canvas);
}

export function createDesk({ programs, shared, text, q, dir }) {
  const ix = (value) => value * dir;
  const group = new Group();
  group.name = "desk";

  const u = {
    uClear: { value: 0 },
    uRing: { value: 0 },
    uRingOn: { value: 0 },
  };

  /* Light: one lamp at the inline-end back corner, throwing a pool to the centre. */
  const lampPos = new Vector3(ix(0.27), 0.62, -0.5);
  const poolDefault = [ix(-0.02), -0.38];
  const spot = [poolDefault[0], poolDefault[1]];

  /* --------------------------------------------------------------------------
     Wood
     -------------------------------------------------------------------------- */

  const shadowTarget = new WebGLRenderTarget(q.shadowSize, q.shadowSize, {
    depthTexture: new DepthTexture(q.shadowSize, q.shadowSize, UnsignedIntType),
  });
  shadowTarget.depthTexture.compareFunction = LessEqualCompare;
  shadowTarget.depthTexture.minFilter = LinearFilter;
  shadowTarget.depthTexture.magFilter = LinearFilter;

  const lampMatrix = new Matrix4();
  const woodUniforms = {
    uMap: { value: grainTexture() },
    uShadow: { value: shadowTarget.depthTexture },
    uClear: u.uClear,
    uDawnStripes: { value: 1 },
    uAmbient: { value: 0.045 },
    uShadowTaps: { value: q.shadowTaps },
    uGloss: { value: 1 },
    uRings: { value: [1, 0, 0, 0] },
    uRingCentreA: { value: [ix(-0.2), -0.21, 0.046] },
    uRingCentreB: { value: [ix(-0.112), -0.21, 0.046] },
    uTint: { value: [1, 1, 1] },
    uLampMatrix: { value: lampMatrix },
  };
  const top = new Mesh(new BoxGeometry(1.6, 0.045, 0.8), programs.wood({ uniforms: woodUniforms }));
  top.position.set(0, -0.0225, -0.4);
  group.add(top);

  const reflectUniforms = { ...woodUniforms, uTint: { value: [0.34, 0.31, 0.28] }, uGloss: { value: 0 }, uRings: { value: [0, 0, 0, 0] } };
  /* Floorboards, with the hole years of paperwork have torn in them. */
  const hole = 0.5;
  const floors = new Mesh(
    merge(
      [
        [0, -hole - 2.5, 10, 5],
        [0, hole + 2.5, 10, 5],
        [-hole - 2.5, 0, 5, hole * 2],
        [hole + 2.5, 0, 5, hole * 2],
      ].map(([x, z, w, d]) => {
        const geometry = new BoxGeometry(w, 0.1, d);
        geometry.translate(x, WORLD.floorY - 0.05, z);
        return geometry;
      })
    ),
    programs.wood({ uniforms: reflectUniforms })
  );
  group.add(floors);

  /* --------------------------------------------------------------------------
     Everything static, merged into one draw
     -------------------------------------------------------------------------- */

  const landlineAt = [ix(-0.52), 0, -0.56];
  const mugAt = [ix(-0.156), 0, -0.21];
  const clockAt = [ix(0.66), 0.88, -0.95];
  const printerAt = [ix(0.31), 0, -0.64];
  const lampBase = [ix(0.62), 0, -0.62];
  const lampElbow = [ix(0.72), 0.42, -0.62];
  const lampHead = [ix(0.27), 0.72, -0.5];
  const woodDark = [0.24, 0.14, 0.08];

  const statics = merge([
    /* The desk's own legs and drawers. */
    box(0.07, 0.75, 0.07, { at: [-0.74, -0.4, -0.06], color: woodDark }),
    box(0.07, 0.75, 0.07, { at: [0.74, -0.4, -0.06], color: woodDark }),
    box(0.07, 0.75, 0.07, { at: [-0.74, -0.4, -0.74], color: woodDark }),
    box(0.07, 0.75, 0.07, { at: [0.74, -0.4, -0.74], color: woodDark }),
    box(1.42, 0.09, 0.02, { at: [0, -0.1, -0.03], color: woodDark }),
    box(0.1, 0.012, 0.018, { at: [ix(0.42), -0.1, -0.014], color: [0.76, 0.58, 0.3], mat: 1 }),
    box(0.1, 0.012, 0.018, { at: [ix(-0.42), -0.1, -0.014], color: [0.76, 0.58, 0.3], mat: 1 }),
    ...clockParts(clockAt),
    ...lampParts(lampBase, lampElbow, lampHead, dir),
    ...mugParts(mugAt, dir),
    /* The receipt spike. */
    box(0.07, 0.006, 0.07, { at: [ix(-0.02), 0.003, -0.7], color: [0.25, 0.25, 0.27] }),
    part(new CylinderGeometry(0.002, 0.003, 0.17, 6), { at: [ix(-0.02), 0.09, -0.7], color: [0.7, 0.7, 0.72] }),
  ]);
  const staticMesh = new Mesh(statics, programs.solid({ ambient: 0.17, house: 0 }));
  group.add(staticMesh);

  /* The room: plaster wall, skirting and the window frame. */
  const room = new Mesh(
    merge([
      box(12, 7, 0.1, { at: [0, 1.6, -1.05], color: [0.62, 0.6, 0.6] }),
      box(12, 0.12, 0.03, { at: [0, WORLD.floorY + 0.06, -0.99], color: [0.2, 0.18, 0.17] }),
      box(1.62, 0.04, 0.04, { at: [ix(-0.46), 1.54, -0.97], color: [0.55, 0.52, 0.5] }),
      box(1.62, 0.04, 0.04, { at: [ix(-0.46), 0.5, -0.97], color: [0.55, 0.52, 0.5] }),
      box(0.04, 1.08, 0.04, { at: [ix(-1.27), 1.02, -0.97], color: [0.55, 0.52, 0.5] }),
      box(0.04, 1.08, 0.04, { at: [ix(0.35), 1.02, -0.97], color: [0.55, 0.52, 0.5] }),
    ]),
    programs.solid({ ambient: 0.2, house: 0 })
  );
  group.add(room);

  /* Printer and landline leave the desk as whole objects, on their checklist line. */
  const printer = new Mesh(merge(printerParts(printerAt, dir)), staticMesh.material);
  const cordParts = cordGeometry(
    [
      [landlineAt[0] - 0.11 * dir, 0.05, landlineAt[2] + 0.03],
      [landlineAt[0] - 0.17 * dir, 0.03, landlineAt[2] + 0.06],
      [landlineAt[0] - 0.2 * dir, 0.012, landlineAt[2] + 0.13],
      [landlineAt[0] - 0.19 * dir, 0.05, landlineAt[2] - 0.03],
      [landlineAt[0] - 0.13 * dir, 0.11, landlineAt[2] - 0.08],
    ],
    24
  );
  const landlineBase = new Mesh(merge([...landlineBaseParts(landlineAt), cordParts]), staticMesh.material);
  group.add(printer, landlineBase);

  /* The handset rings on its cradle; the shot shakes it off the hook. */
  const handset = new Mesh(handsetGeometry(), staticMesh.material);
  handset.position.set(landlineAt[0], 0.135, landlineAt[2] - 0.08);
  group.add(handset);

  /* Clock hands: 03:12 at night, 07:00 at dawn. */
  const handMaterial = staticMesh.material;
  const hourHand = new Mesh(box(0.012, 0.095, 0.004, { at: [0, 0.042, 0], color: [0.1, 0.1, 0.1] }), handMaterial);
  const minuteHand = new Mesh(box(0.007, 0.14, 0.004, { at: [0, 0.064, 0], color: [0.1, 0.1, 0.1] }), handMaterial);
  hourHand.position.set(clockAt[0], clockAt[1], clockAt[2] + 0.026);
  minuteHand.position.set(clockAt[0], clockAt[1], clockAt[2] + 0.03);
  group.add(hourHand, minuteHand);

  /* --------------------------------------------------------------------------
     The window: a sky behind 24 slats, and the sky is the brand gradient at dawn
     -------------------------------------------------------------------------- */

  const skyCentre = ix(-0.46);
  const sky = new Mesh(
    part(new PlaneGeometry(1.58, 1.0), { at: [skyCentre, 1.02, -0.985], color: [0.075, 0.11, 0.21], mat: 2 }),
    programs.solid({
      house: 0,
      deform: {
        fpars: `uniform highp float uDawn;`,
        frag: `c = mix(c, mix(vec3(0.365, 1.0, 0.87), vec3(0.643, 0.545, 1.0), clamp((vLampP.x + 0.5) * 0.7, 0.0, 1.0)), uDawn);`,
      },
    })
  );
  group.add(sky);
  const slatBase = box(1.58, 0.042, 0.004, { color: [0.72, 0.72, 0.7] });
  slatBase.deleteAttribute("uv");
  const slats = new Mesh(
    instances(slatBase, 24, (i, o) => {
      o.pos = [skyCentre, 0.54 + (i + 0.5) * 0.0405, -0.965];
    }),
    programs.solid({
      house: 0,
      ambient: 0.14,
      defines: { INSTANCED: 1 },
      deform: {
        local: `{
          float a = mix(0.86, 1.32, uDawn);
          float ca = cos(a), sa = sin(a);
          p = vec3(p.x, p.y * ca - p.z * sa, p.y * sa + p.z * ca);
          n = vec3(n.x, n.y * ca - n.z * sa, n.y * sa + n.z * ca);
        }`,
      },
    })
  );
  slats.frustumCulled = false;
  group.add(slats);

  /* --------------------------------------------------------------------------
     The mess
     -------------------------------------------------------------------------- */

  const rng = seeded("desk");

  /* Towers: bundles of paper in leaning stacks. Instances ordered by importance. */
  const towers = [
    { x: -0.66, z: -0.3, h: 0.34 },
    { x: -0.58, z: -0.68, h: 0.44 },
    { x: -0.27, z: -0.67, h: 0.27 },
    { x: 0.66, z: -0.22, h: 0.2 },
    { x: -0.36, z: -0.28, h: 0.13 },
    { x: -0.14, z: -0.7, h: 0.15 },
    { x: 0.66, z: -0.42, h: 0.1 },
    { x: -0.7, z: -0.08, h: 0.09 },
  ];
  const stackPlacements = [];
  const towerTop = new Map();
  for (const tower of towers) {
    let y = 0;
    let leanX = 0;
    let leanZ = 0;
    while (y < tower.h && stackPlacements.length < q.stacks) {
      const h = 0.01 + rng() * 0.022;
      leanX += (rng() - 0.5) * 0.012;
      leanZ += (rng() - 0.5) * 0.012;
      stackPlacements.push({ x: tower.x + leanX, y: y + h / 2, z: tower.z + leanZ, h, yaw: (rng() - 0.5) * 0.34 });
      y += h;
    }
    towerTop.set(tower, { y, x: tower.x + leanX, z: tower.z + leanZ });
  }
  const stackBase = new BoxGeometry(1, 1, 1);
  stackBase.deleteAttribute("uv");
  const stackGeometry = part(stackBase);
    const stacks = new Mesh(
    instances(
      stackGeometry,
      stackPlacements.length,
      (i, o) => {
        const s = stackPlacements[i];
        o.pos = [ix(s.x), s.y, s.z];
        quatEuler(0, s.yaw, 0, o.quat);
        o.scale = [0.21 + rng() * 0.03, s.h, 0.297 + rng() * 0.03];
        const shade = 0.74 + rng() * 0.26;
        o.tint = rng() > 0.86 ? [shade, shade * 0.84, shade * 0.72] : [shade, shade, shade * 0.95];
        o.extra.iClear = 2;
      },
      { iClear: 1 }
    ),
    programs.solid({ house: 0, ambient: 0.13, defines: { INSTANCED: 1 }, deform: CLEAR_DEFORM })
  );
  stacks.frustumCulled = false;
  group.add(stacks);

  /* Dossiers: manila, tied with cotton tape. */
  const dossierPiles = [
    { x: 0.5, z: -0.14, n: 0.3 },
    { x: -0.5, z: -0.2, n: 0.3 },
    { x: -0.3, z: -0.5, n: 0.26 },
  ];
  const dossierBase = part(new BoxGeometry(1, 1, 1));
  const dossierList = [];
  for (const pile of dossierPiles) {
    const count = Math.floor(q.dossiers * pile.n * 0.5);
    let y = 0;
    for (let i = 0; i < count && y < 0.2; i += 1) {
      const h = 0.016 + rng() * 0.014;
      const yaw = (rng() - 0.5) * 0.5;
      const shade = 0.7 + rng() * 0.3;
      dossierList.push({ x: pile.x + (rng() - 0.5) * 0.02, y: y + h / 2, z: pile.z + (rng() - 0.5) * 0.02, yaw, sx: 0.24, sy: h, sz: 0.33, tint: [0.86 * shade, 0.7 * shade, 0.42 * shade] });
      /* The tape, slightly proud of the folder. */
      dossierList.push({ x: pile.x, y: y + h + 0.0006, z: pile.z, yaw, sx: 0.016, sy: 0.0015, sz: 0.335, tint: [0.92, 0.9, 0.84] });
      y += h;
    }
  }
  const dossiers = new Mesh(
    instances(
      dossierBase,
      dossierList.length,
      (i, o) => {
        const d = dossierList[i];
        o.pos = [ix(d.x), d.y, d.z];
        quatEuler(0, d.yaw, 0, o.quat);
        o.scale = [d.sx, d.sy, d.sz];
        o.tint = d.tint;
        o.extra.iClear = 2;
      },
      { iClear: 1 }
    ),
    programs.solid({ house: 0, ambient: 0.13, defines: { INSTANCED: 1 }, deform: CLEAR_DEFORM })
  );
  dossiers.frustumCulled = false;
  group.add(dossiers);

  /* Loose sheets: the important ones first, so a density cut loses the rest. */
  const sheetPlane = new PlaneGeometry(1, 1, q.sheetSeg, q.sheetSeg);
  sheetPlane.rotateX(-Math.PI / 2);
  const faces = ["invoice", "ledger", "quote", "receipt", "lines", "sheet", "memo", "invoice", "carbon", "slip"];
  const sheetList = [];

  /* A scatter across the pool of light, avoiding the printer's own strip. */
  const scatter = Math.min(30, Math.floor(q.sheets * 0.1));
  for (let i = 0; i < scatter; i += 1) {
    /* Favour the outer ring: the middle of the pool stays walnut. */
    const r = 0.36 + rng() * 0.46;
    const a = rng() * Math.PI * 2;
    const x = Math.cos(a) * r * 1.08;
    const z = -0.4 + Math.sin(a) * r * 0.42;
    sheetList.push({ x, z, y: 0.0012 + rng() * 0.012, yaw: rng() * 6.28, kind: 0, clear: rng() > 0.4 ? 0 : 1 });
  }
  /* Slumping off the tops of the towers. */
  for (const [tower, topAt] of towerTop) {
    const count = Math.floor(((q.sheets * 0.5) / towers.length) * (0.5 + tower.h * 2));
    for (let i = 0; i < count; i += 1) {
      sheetList.push({
        x: topAt.x + (rng() - 0.5) * 0.06,
        z: topAt.z + (rng() - 0.5) * 0.06,
        y: topAt.y + i * 0.0015,
        yaw: (rng() - 0.5) * 0.7,
        kind: 1,
        clear: 2,
      });
    }
  }
  /* Hanging over the front edge. */
  const hanging = Math.min(8, Math.floor(q.sheets * 0.02));
  for (let i = 0; i < hanging; i += 1) {
    /* Never over the strip's own exit in the middle of the edge. */
    const side = i % 2 === 0 ? 1 : -1;
    sheetList.push({ x: side * (0.24 + rng() * 0.46), z: -0.08 + rng() * 0.05, y: 0.002 + rng() * 0.004, yaw: (rng() - 0.5) * 0.3, kind: 2, clear: 0 });
  }
  /* The overflow: more paper on the floor around the desk. */
  const onFloor = Math.max(0, Math.floor(q.sheets * 0.24));
  for (let i = 0; i < onFloor; i += 1) {
    const a = rng() * Math.PI * 2;
    const r = 0.7 + rng() * 1.5;
    const x = Math.cos(a) * r * 1.2;
    const z = 0.1 + Math.abs(Math.sin(a)) * r * 0.7;
    if (Math.hypot(x, z) > 0.75) {
      sheetList.push({ x, z, y: WORLD.floorY + 0.002 + rng() * 0.004, yaw: rng() * 6.28, kind: 0, clear: 2 });
    }
  }
  /* Receipts on the spike. */
  for (let i = 0; i < 8; i += 1) {
    sheetList.push({ x: -0.02 + (rng() - 0.5) * 0.015, z: -0.7 + (rng() - 0.5) * 0.015, y: 0.02 + i * 0.012, yaw: rng() * 6.28, kind: 3, clear: 2 });
  }

  const sheetMaterial = programs.paper({
    house: 0,
    ambient: 0.05,
    defines: { INSTANCED: 1 },
    deform: {
      pars: `${CLEAR_DEFORM.pars} in float iCurl;`,
      local: `
        float cx = uv.x - 0.5, cz = uv.y - 0.5;
        p.y += (cx * cx * 0.03 + cz * cz * 0.05) * iCurl;
        /* A sheet by the edge lifts a little in the draught from the printer. */
        p.y += sin(uTime * 2.6 + seed * 37.0) * 0.0012 * max(iCurl - 0.8, 0.0) * (cz + 0.5);
        n.xz -= vec2(cx * 0.06, cz * 0.1) * iCurl;`,
      world: CLEAR_DEFORM.world,
    },
  });

  const sheets = new Mesh(
    instances(
      sheetPlane,
      sheetList.length,
      (i, o) => {
        const s = sheetList[i];
        const receipt = s.kind === 3;
        o.pos = [ix(s.x), s.y, s.z];
        quatEuler(0, s.yaw, 0, o.quat);
        o.scale = receipt ? [0.08, 1, 0.16] : [0.21, 1, 0.297];
        const face = receipt ? "receipt" : faces[Math.floor(rng() * faces.length)];
        o.cell = text.cell(face);
        const shade = 0.82 + rng() * 0.18;
        o.tint = face === "carbon" ? [0.98, 0.72 * shade, 0.72 * shade] : face === "slip" ? [0.99, 0.9 * shade, 0.62 * shade] : [shade, shade, shade * 0.96];
        o.extra.iClear = s.clear;
        o.extra.iCurl = s.kind === 2 ? 1.6 : 0.5 + rng();
      },
      { iClear: 1, iCurl: 1 }
    ),
    sheetMaterial
  );
  sheets.frustumCulled = false;
  group.add(sheets);

  /* --------------------------------------------------------------------------
     The glow: bulb, beam and dust inside the beam only
     -------------------------------------------------------------------------- */

  const bulb = new Mesh(
    new PlaneGeometry(0.34, 0.34),
    programs.glow({ color: [1, 0.74, 0.46], alpha: 0.5, defines: { BILLBOARD: 1 } })
  );
  bulb.position.set(lampPos.x, lampPos.y + 0.03, lampPos.z);
  bulb.frustumCulled = false;
  group.add(bulb);

  /* What the lamp and the window do to the wall: authored as cards, not computed. */
  const wash = new Mesh(
    instances(new PlaneGeometry(1, 1), 2, (i, o) => {
      o.pos = i === 0 ? [ix(0.34), 0.42, -0.985] : [ix(-0.46), 0.95, -0.98];
      o.scale = i === 0 ? [2.6, 1.9, 1] : [3.2, 2.2, 1];
      o.tint = i === 0 ? [0.13, 0.086, 0.047] : [0.028, 0.038, 0.067];
    }),
    programs.glow({ defines: { INSTANCED: 1 } })
  );
  wash.frustumCulled = false;
  group.add(wash);

  const beamGeometry = new CylinderGeometry(0.05, 0.54, 0.86, 26, 1, true);
  const beamMesh = new Mesh(
    beamGeometry,
    programs.glow({
      color: [1, 0.72, 0.42],
      alpha: 0.13,
      shape: 5,
      deform: {
        frag: `a = vUv.y * vUv.y; { float f = abs(dot(normalize(vN), normalize(vV))); a *= f * f; }`,
      },
    })
  );
  beamMesh.frustumCulled = false;
  group.add(beamMesh);

  const dustPlane = new PlaneGeometry(0.009, 0.009);
  const dust = new Mesh(
    instances(dustPlane, q.dust, (i, o) => {
      const t = Math.sqrt(rng());
      const a = rng() * Math.PI * 2;
      const spread = t * 0.34;
      o.pos = [lampPos.x + (spot[0] - lampPos.x) * t + Math.cos(a) * spread, lampPos.y * (1 - t) + 0.04, lampPos.z + (spot[1] - lampPos.z) * t + Math.sin(a) * spread];
      o.tint = [1, 0.82, 0.6];
    }),
    programs.glow({
      alpha: 0.42,
      defines: { INSTANCED: 1, BILLBOARD: 1 },
      deform: { world: `wp += vec3(sin(uTime * 0.21 + seed * 40.0), sin(uTime * 0.17 + seed * 90.0), cos(uTime * 0.19 + seed * 70.0)) * 0.03;` },
    })
  );
  dust.frustumCulled = false;
  group.add(dust);

  /* --------------------------------------------------------------------------
     Handles
     -------------------------------------------------------------------------- */

  const lampLocal = lampPos.clone();
  const lampCamera = new PerspectiveCamera(122, 1, 0.05, 2.2);
  const up = new Vector3(0, 0, -1);
  const scratch = new Vector3();
  let act4 = { x: 0, y: 0, z: 0 };
  let ringAmount = 0;
  const bias = new Matrix4().set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.4975, 0, 0, 0, 1);

  const sheetsFull = sheets.geometry.instanceCount;
  const stacksFull = stacks.geometry.instanceCount;
  const dossiersFull = dossiers.geometry.instanceCount;

  const setClock = (hours) => {
    hourHand.rotation.z = -((hours % 12) / 12) * Math.PI * 2;
    minuteHand.rotation.z = -(hours % 1) * Math.PI * 2;
  };
  setClock(3.2);

  return {
    group,
    u,
    handset,
    material: staticMesh.material,
    setClock,
    lampPos: lampLocal,
    pool: poolDefault,
    landline: { x: landlineAt[0], z: landlineAt[2] - 0.08 },
    *build() {
      yield;
    },
    setActPositions(position) {
      act4 = position;
    },
    /** The new phone, in desk space, on the spot under the line. */
    setPhone(phone) {
      phone.position.set(0, 0.0043, -0.4);
      phone.visible = false;
      group.add(phone);
      this.phone = phone;
    },
    setAct(act) {
      if (act === 4) {
        group.position.set(act4.x, act4.y, act4.z);
      } else {
        group.position.set(0, 0, 0);
      }
    },
    /** The bulb stays put; the pointer only moves where the cone lands. */
    setSpot(x, z) {
      spot[0] = x;
      spot[1] = z;
    },
    resetSpot() {
      spot[0] = poolDefault[0];
      spot[1] = poolDefault[1];
    },
    setRing(amount) {
      ringAmount = amount;
    },
    setShadowTaps(taps) {
      woodUniforms.uShadowTaps.value = taps;
    },
    setDensity(scale) {
      sheets.geometry.instanceCount = Math.floor(sheetsFull * scale);
      stacks.geometry.instanceCount = Math.floor(stacksFull * scale);
      dossiers.geometry.instanceCount = Math.floor(dossiersFull * scale);
    },
    setExtras(enabled) {
      dust.visible = enabled;
      beamMesh.visible = enabled;
    },
    /** One depth map, from one fixed bulb. Must be re-rendered after a context restore. */
    bakeShadow(renderer) {
      const hidden = [top, floors, bulb, beamMesh, dust, sky, slats, room, wash];
      if (this.phone) {
        hidden.push(this.phone);
      }
      const before = hidden.map((object) => object.visible);
      const previousPosition = group.position.clone();
      const previousClear = u.uClear.value;
      const wasVisible = group.visible;
      group.visible = true;
      hidden.forEach((object) => {
        object.visible = false;
      });
      group.position.set(0, 0, 0);
      group.updateMatrixWorld(true);
      u.uClear.value = 0;
      shared.uLampOrigin.value.set(0, 0, 0);
      lampCamera.position.copy(lampLocal);
      lampCamera.up.copy(up);
      lampCamera.lookAt(ix(-0.02), 0, -0.38);
      lampCamera.updateMatrixWorld();
      lampCamera.updateProjectionMatrix();

      const previousTarget = renderer.getRenderTarget();
      renderer.setRenderTarget(shadowTarget);
      renderer.clear();
      renderer.render(group, lampCamera);
      renderer.setRenderTarget(previousTarget);

      lampMatrix.multiplyMatrices(bias, lampCamera.projectionMatrix).multiply(lampCamera.matrixWorldInverse);
      hidden.forEach((object, index) => {
        object.visible = before[index];
      });
      group.position.copy(previousPosition);
      group.visible = wasVisible;
      group.updateMatrixWorld(true);
      u.uClear.value = previousClear;
    },
    /** The checklist's rings: printer on the last line, landline on the second. */
    setClear(clear) {
      u.uClear.value = clear;
      woodUniforms.uClear.value = clear;
      const fly = (mesh, from, sign) => {
        const f = clamp01((clear - from) / 0.7);
        const eased = f * f;
        mesh.position.set(sign * eased * 2.2 * dir, eased * 0.5 - eased * eased * 1.6, -eased * 0.2);
        mesh.rotation.z = -eased * 1.2 * sign * dir;
        mesh.visible = f < 1;
      };
      fly(landlineBase, 1, -1);
      fly(printer, 2, 1);
      const paperGone = clear >= 3;
      sheets.visible = !paperGone;
      stacks.visible = !paperGone;
      dossiers.visible = !paperGone;
    },
    /** Per frame while the desk is on screen. */
    update(p, time) {
      /* The handset hops in two bursts every 3 s: the ring you can see. */
      const cycle = time % 3;
      const burst = (cycle < 0.42 || (cycle > 0.62 && cycle < 1.04)) ? 1 : 0;
      const hop = Math.abs(Math.sin(time * 37.7)) * 0.006 * burst * ringAmount;
      if (ringAmount > 0) {
        handset.position.y = 0.135 + hop;
        handset.rotation.z = Math.sin(time * 75) * 0.012 * burst * ringAmount;
      }

      const targetX = spot[0] + (p.pointer === 1 ? p.px * 0.2 : 0);
      const targetZ = spot[1] + (p.pointer === 1 ? p.py * 0.12 : 0);
      scratch.set(targetX - lampLocal.x, -lampLocal.y, targetZ - lampLocal.z).normalize();
      shared.uLampDir.value.copy(scratch);
      shared.uLampPos.value.copy(lampLocal);
      shared.uLampCone.value.set(0.6, 0.93);

      /* The beam is a cone hung from the bulb along that same direction. */
      beamMesh.position.set(lampLocal.x + scratch.x * 0.43, lampLocal.y + scratch.y * 0.43, lampLocal.z + scratch.z * 0.43);
      beamMesh.quaternion.setFromUnitVectors(UP_AXIS, scratch.negate());
    },
  };
}

const UP_AXIS = new Vector3(0, 1, 0);
