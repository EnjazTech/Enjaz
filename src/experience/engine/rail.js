/**
 * The camera rail: a table indexed directly by scroll pixels, baked from the real
 * page layout. Everything scroll-related is a pure function of y, so reverse
 * scroll, anchor jumps and deep links are correct by construction.
 *
 * World: metres, +Y up. The strip runs down x=0, z=0 from the first desk's front
 * edge. Camera orientation is yaw * pitch * roll rather than lookAt, because the
 * film spends a lot of time at nadir, where lookAt flips. At nadir the top of the
 * screen is world -Z.
 *
 * No DOM here, so it runs under plain Node for tests.
 */

const DEG = Math.PI / 180;
const SAMPLES = 2048;
const STRIDE = 13;

export const WORLD = {
  deskY: 0, // Top of the desk in Act I.
  floorY: -0.75, // Office floor below it.
  slabBottom: -1.6, // Top of the archive.
  archiveHalf: 14,
  galleryH: 3.6,
};

const clamp01 = (value) => Math.min(1, Math.max(0, value));
const lerp = (a, b, t) => a + (b - a) * t;

/** Trapezoid velocity: 18% ramps, then constant speed through the middle 64%. */
export function trapezoid(u, ramp = 0.18) {
  const peak = 1 / (1 - ramp);
  if (u < ramp) {
    return (peak * u * u) / (2 * ramp);
  }
  if (u > 1 - ramp) {
    const rest = 1 - u;
    return 1 - (peak * rest * rest) / (2 * ramp);
  }
  return peak * (u - ramp / 2);
}

function quatFromEuler(yaw, pitch, roll) {
  /* q = Qy(yaw) * Qx(pitch) * Qz(roll) */
  const cy = Math.cos(yaw / 2);
  const sy = Math.sin(yaw / 2);
  const cp = Math.cos(pitch / 2);
  const sp = Math.sin(pitch / 2);
  const cr = Math.cos(roll / 2);
  const sr = Math.sin(roll / 2);
  return [
    cy * sp * cr + sy * cp * sr,
    sy * cp * cr - cy * sp * sr,
    cy * cp * sr - sy * sp * cr,
    cy * cp * cr + sy * sp * sr,
  ];
}

/** Largest rect beside the caption, once the nav is taken off the top. */
export function freeRect(caption, layout) {
  const { W, H, navH } = layout;
  const margin = 48;
  if (!caption) {
    return { x: 0, y: navH, w: W, h: H - navH };
  }
  /* On a wide screen the subject always stands beside the copy, so RTL simply mirrors. */
  const candidates = [
    { x: 0, y: navH, w: caption.x - margin, h: H - navH },
    { x: caption.x + caption.w + margin, y: navH, w: W - caption.x - caption.w - margin, h: H - navH },
  ];
  if (layout.portrait) {
    candidates.push(
      { x: 0, y: navH, w: W, h: caption.y - margin - navH },
      { x: 0, y: caption.y + caption.h + margin, w: W, h: H - caption.y - caption.h - margin }
    );
  }
  let best = candidates[0];
  let bestArea = -1;
  for (const rect of candidates) {
    const area = Math.max(0, rect.w) * Math.max(0, rect.h);
    if (area > bestArea) {
      best = rect;
      bestArea = area;
    }
  }
  return best;
}

export function lensFov(lens, portrait) {
  return portrait ? lens : lens * 0.78;
}

/** Distance that puts a subject of radius r at 45% of the free rect's short side. */
export function frameDistance(radius, fovDegrees, free, H, nadir) {
  const tan = Math.tan((fovDegrees * DEG) / 2);
  const d = (radius * (H / 2)) / (tan * 0.45 * Math.max(1, Math.min(free.w, free.h)));
  /* Inside the archive the camera must not pass through the wall. */
  return Math.min(nadir ? 30 : 10.4, Math.max(2.2 * radius, d));
}

function offsetFromPose(bearing, elevation, d) {
  const b = bearing * DEG;
  const e = elevation * DEG;
  return [d * Math.cos(e) * Math.sin(b), -d * Math.sin(e), d * Math.cos(e) * Math.cos(b)];
}

/** Solves floors and framing, then returns the knot list. */
export function bakeKnots(layout, metas) {
  const { dir, portrait, H, W } = layout;
  const solved = {};
  const knots = [];

  const poseFor = (meta) => ({ lens: 30, elevation: 0, ...meta.pose, ...(portrait ? meta.pose?.portrait : meta.pose?.landscape) });

  /* Framing first, because floor spacing depends on it. */
  for (const meta of metas) {
    const shot = layout.shots[meta.id];
    const pose = poseFor(meta);
    const free = freeRect(shot.caption, layout);
    const lens0 = Array.isArray(pose.lens) ? pose.lens[0] : pose.lens;
    const fov = lensFov(lens0, portrait);
    const elevation = Array.isArray(pose.elevation) ? pose.elevation[0] : pose.elevation;
    const d = meta.subject ? frameDistance(meta.subject.radius, fov, free, H, elevation < -60) : 0;
    solved[meta.id] = {
      id: meta.id,
      meta,
      pose,
      free,
      fov,
      d,
      ox: W / 2 - (free.x + free.w / 2),
      oy: H / 2 - (free.y + free.h / 2),
      floorY: 0,
      shot,
    };
  }

  for (const meta of metas) {
    meta.solve?.(solved[meta.id], layout);
  }

  /* Floors. Page-locked shots: the subject plane moves with the page in a transit. */
  const list = metas.map((meta) => solved[meta.id]);
  let y = WORLD.slabBottom - 12;
  const k = portrait ? 1.15 : 1.6;
  for (let i = 0; i < list.length; i += 1) {
    const s = list[i];
    if (!s.meta.floor) {
      continue;
    }
    if (s.meta.floor === "first") {
      s.floorY = y;
      continue;
    }
    const prev = list[i - 1];
    if (s.meta.floor === "locked") {
      const transit = (prev.shot.gap ?? 0) + (s.shot.caption?.h ?? 0);
      const sep = k * transit * 2 * prev.d * Math.tan((prev.fov * DEG) / 2) / H;
      y -= Math.max(3.6, sep);
    } else {
      /* Nadir shots and big reveals: clear the previous machine and this camera. */
      y -= s.meta.floor.clear + Math.max(s.meta.floor.minD ?? 0, s.d);
    }
    s.floorY = y;
  }

  const deskFall = solved["why.q"];
  const deskX = 0;
  const deskZ = 0.4;
  solved.deskAct4 = { x: deskX, y: deskFall.floorY, z: deskZ };

  const hero = solved.hero;
  const heroCenter = hero.meta.subject.center;
  const heroOffset = offsetFromPose(0, hero.pose.elevation, hero.d);

  const pushKnot = (y2, position, pose, s, extra = {}) => {
    const bearing = (pose.bearing ?? 0) * dir;
    const quat = quatFromEuler(bearing * DEG, (pose.elevation ?? 0) * DEG, ((pose.roll ?? 0) * dir) * DEG);
    knots.push({
      y: y2,
      position,
      quat,
      fov: lensFov(pose.lens, portrait),
      near: pose.clip?.[0] ?? 0.2,
      far: pose.clip?.[1] ?? 80,
      fog: pose.fog ?? 60,
      ox: extra.ox ?? s.ox,
      oy: extra.oy ?? s.oy,
      ease: extra.ease ?? "trapezoid",
    });
  };

  for (let i = 0; i < list.length; i += 1) {
    const s = list[i];
    const { meta, pose, shot } = s;
    const prev = list[i - 1];
    const next = list[i + 1];
    const from = prev ? prev.shot.pinEnd : 0;
    const to = next ? next.shot.pinStart : layout.docH;

    if (meta.authored) {
      /* Caption-less stretch: owns the whole interval between its neighbours. */
      shot.pinStart = from;
      shot.pinEnd = to;
      for (const knot of meta.authored(solved, layout)) {
        pushKnot(lerp(from, to, knot.t), knot.position, knot, s, {
          ox: knot.ox ?? 0,
          oy: knot.oy ?? 0,
          ease: "smooth",
        });
      }
      continue;
    }

    if (meta.holdKnots) {
      const list2 = meta.holdKnots(solved, layout);
      list2.forEach((knot, index) => {
        pushKnot(lerp(shot.pinStart, shot.pinEnd, knot.t), knot.position, { ...pose, ...knot }, s, {
          ease: index === list2.length - 1 ? "trapezoid" : "linear",
        });
      });
      continue;
    }

    const center = meta.subject.center;
    const subject = meta.id === "hero" || meta.desk
      ? [
          center[0] * dir + (meta.desk ? solved.deskAct4.x : 0),
          center[1] + (meta.desk ? solved.deskAct4.y : WORLD.deskY),
          center[2] + (meta.desk ? solved.deskAct4.z : 0),
        ]
      : [center[0] * dir, center[1] + s.floorY, center[2]];
    s.subject = subject;

    const pick = (value, index) => (Array.isArray(value) ? value[index] : value);
    const drift = pose.drift ?? [0, 0, 0];

    if (meta.id === "coda") {
      /* The bookend: the exact hero framing, on the same desk, at dawn. */
      const heroPose = hero.pose;
      const position = [
        heroCenter[0] * dir + heroOffset[0] + solved.deskAct4.x,
        heroCenter[1] + heroOffset[1] + solved.deskAct4.y,
        heroCenter[2] + heroOffset[2] + solved.deskAct4.z,
      ];
      /* The footer has no caption: the bookend lands as the page ends. */
      const end = Math.max(layout.docH - layout.svh, prev.shot.pinEnd + 1);
      shot.pinStart = end;
      shot.pinEnd = end;
      pushKnot(end, position, { ...heroPose, lens: pick(heroPose.lens, 0) }, s, { ox: hero.ox, oy: hero.oy });
      continue;
    }

    for (const index of [0, 1]) {
      const yAt = index === 0 ? shot.pinStart : shot.pinEnd;
      const lens = pick(pose.lens, index);
      const bearing = pick(pose.bearing ?? 0, index);
      const elevation = pick(pose.elevation, index);
      const roll = pick(pose.roll ?? 0, index);
      const d = s.d * (lensFov(pick(pose.lens, 0), portrait) / lensFov(lens, portrait));
      const pushed = Math.min(d, s.d * 3) * (1 - (pose.pushIn ?? 0) * index);
      const offset = offsetFromPose(bearing * dir, elevation, pushed);
      const position = [
        subject[0] + offset[0] + (pose.shift?.[0] ?? 0) * dir + index * drift[0] * dir,
        subject[1] + offset[1] + (pose.shift?.[1] ?? 0) + index * drift[1],
        subject[2] + offset[2] + (pose.shift?.[2] ?? 0) + index * drift[2],
      ];
      pushKnot(yAt, position, { ...pose, lens, bearing, elevation, roll }, s, { ease: index === 0 ? "linear" : "trapezoid" });
    }

    if (meta.exitKnots) {
      for (const knot of meta.exitKnots(solved, layout, s)) {
        pushKnot(lerp(shot.pinEnd, to, knot.t), knot.position, knot, s, {
          ox: knot.ox ?? s.ox,
          oy: knot.oy ?? s.oy,
          ease: "smooth",
        });
      }
    }
  }

  /* Knots must be strictly increasing for the table bake. */
  knots.sort((a, b) => a.y - b.y);
  return { knots, solved };
}

const smooth = (u) => u * u * (3 - 2 * u);

/** Samples the knots into a flat table. */
export function bakeTable(knots, docH) {
  const table = new Float32Array(SAMPLES * STRIDE);
  let segment = 0;
  const q = [0, 0, 0, 1];

  for (let i = 0; i < SAMPLES; i += 1) {
    const y = (i / (SAMPLES - 1)) * docH;
    while (segment < knots.length - 2 && y > knots[segment + 1].y) {
      segment += 1;
    }
    const a = knots[segment];
    const b = knots[Math.min(segment + 1, knots.length - 1)];
    const span = b.y - a.y;
    let u = span > 0 ? clamp01((y - a.y) / span) : 0;
    /* The ease of the outgoing knot decides how this segment moves. */
    if (a.ease === "trapezoid") {
      u = trapezoid(u);
    } else if (a.ease === "smooth") {
      u = smooth(u);
    }

    const flip = a.quat[0] * b.quat[0] + a.quat[1] * b.quat[1] + a.quat[2] * b.quat[2] + a.quat[3] * b.quat[3] < 0 ? -1 : 1;
    for (let c = 0; c < 4; c += 1) {
      q[c] = lerp(a.quat[c], b.quat[c] * flip, u);
    }
    const length = Math.hypot(q[0], q[1], q[2], q[3]) || 1;

    const at = i * STRIDE;
    table[at] = lerp(a.position[0], b.position[0], u);
    table[at + 1] = lerp(a.position[1], b.position[1], u);
    table[at + 2] = lerp(a.position[2], b.position[2], u);
    table[at + 3] = q[0] / length;
    table[at + 4] = q[1] / length;
    table[at + 5] = q[2] / length;
    table[at + 6] = q[3] / length;
    table[at + 7] = lerp(a.fov, b.fov, u);
    table[at + 8] = lerp(a.near, b.near, u);
    table[at + 9] = lerp(a.far, b.far, u);
    table[at + 10] = lerp(a.fog, b.fog, u);
    table[at + 11] = lerp(a.ox, b.ox, u);
    table[at + 12] = lerp(a.oy, b.oy, u);
  }
  return table;
}

/** Reads the table at scroll y into `out`, with no allocation. */
export function sampleTable(table, docH, y, out) {
  const f = clamp01(y / docH) * (SAMPLES - 1);
  const i = Math.min(SAMPLES - 2, Math.floor(f));
  const u = f - i;
  const a = i * STRIDE;
  const b = a + STRIDE;
  for (let c = 0; c < STRIDE; c += 1) {
    out[c] = table[a + c] + (table[b + c] - table[a + c]) * u;
  }
  /* Renormalise the quaternion after the lerp. */
  const n = Math.hypot(out[3], out[4], out[5], out[6]) || 1;
  out[3] /= n;
  out[4] /= n;
  out[5] /= n;
  out[6] /= n;
  return out;
}
