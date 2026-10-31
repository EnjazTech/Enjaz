/**
 * The film. Everything the camera sees is a function of the scroll position y;
 * only idle loops (printer tick, phone ring, the cam bank) use time.
 *
 * A shot module exports default { build(ctx), update(p, ctx), hit?, dispose? }:
 * - build is a generator: create meshes under ctx.group, yield at least every 4 ms.
 * - update must not allocate. It writes uniforms and transforms only, as a pure
 *   function of p, and must leave shared state neutral at p.t 0 and 1.
 * p: t (0 to 1 over its whole range), enter, hold, exit, y, v, time, dt, px, py, pointer.
 * ctx: tier, q, dir, place, rng, group, programs, u, atlas, text, sets, solved,
 *      hotspots, solvedShot (this shot's solved framing and floor).
 */

import {
  ColorManagement,
  Group,
  LinearSRGBColorSpace,
  PerspectiveCamera,
  Quaternion,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { Governor } from "./engine/governor.js";
import { seeded } from "./engine/geo.js";
import { bakeLayout, watchLayout } from "./engine/layout.js";
import { bakeKnots, bakeTable, sampleTable, WORLD } from "./engine/rail.js";
import { createText, waitForFonts } from "./engine/text.js";
import { QUALITY } from "./engine/tiers.js";
import { createPrograms } from "./programs.js";
import { METAS, LOADERS } from "./shots/metas.js";
import { createArchive } from "./sets/archive.js";
import { createDesk } from "./sets/desk.js";
import { createPhone } from "./sets/phone.js";
import { createStrip } from "./sets/strip.js";

const CLEAR = 0x07080c;
const IDLE_STOP_MS = 12000;

const nextTask = () =>
  new Promise((done) => {
    if (window.scheduler?.yield) {
      window.scheduler.yield().then(done);
    } else {
      setTimeout(done, 0);
    }
  });

async function runSliced(generator) {
  let started = performance.now();
  for (;;) {
    if (generator.next().done) {
      return;
    }
    if (performance.now() - started > 4) {
      await nextTask();
      started = performance.now();
    }
  }
}

export async function start({ canvas, gl, tier, forced, onFail, onOff, isFailed }) {
  ColorManagement.enabled = false;
  const q = { ...QUALITY[tier], instanceScale: 1 };
  const root = document.documentElement;
  const dir = root.dir === "rtl" ? -1 : 1;
  const coarse = window.matchMedia("(pointer: coarse)").matches;

  /* Passing our own context keeps the canvas opaque: three would ask for alpha. */
  const renderer = new WebGLRenderer({ canvas, context: gl, antialias: true });
  renderer.outputColorSpace = LinearSRGBColorSpace;
  renderer.setClearColor(CLEAR, 1);
  renderer.sortObjects = false;
  renderer.debug.checkShaderErrors = forced;
  renderer.info.autoReset = true;

  const scene = new Scene();
  const camera = new PerspectiveCamera(30, 1, 0.1, 100);

  await waitForFonts(dir < 0);

  const text = createText({ q, dir });

  const shared = {
    uTime: { value: 0 },
    uInline: { value: dir },
    uCamY: { value: 0 },
    uDawn: { value: 0 },
    uPower: { value: new Vector2(0, 0) },
    uPowerY: { value: 0 },
    uLitY: { value: new Vector2(WORLD.slabBottom, -120) },
    uFog: { value: new Vector2(4, 40) },
    uLampOrigin: { value: new Vector3() },
    uLampPos: { value: new Vector3(0.5 * dir, 0.62, -0.62) },
    uLampDir: { value: new Vector3(0, -1, 0) },
    uLampColor: { value: new Vector3(1, 0.7, 0.42) },
    uLampOn: { value: 1 },
    uLampCone: { value: new Vector2(0.55, 0.9) },
    uAtlas: { value: text.texture },
  };

  const programs = createPrograms(shared);

  const strip = createStrip({ programs, shared, printTexture: text.printTexture, dir });
  const desk = createDesk({ programs, shared, text, q, dir, tier });
  const archive = createArchive({ programs, shared, text, q, dir, tier });
  const phone = createPhone({ programs, shared, text, dir });
  const sets = { desk, archive, strip, phone };

  /* One phone for the whole last act, at real size. Its state is a function of y. */
  desk.setPhone(phone.make({ w: 0.0775, h: 0.16, t: 0.0085 }));

  scene.add(desk.group, archive.group, strip.mesh, strip.halo);

  /* --------------------------------------------------------------------------
     Layout and rail
     -------------------------------------------------------------------------- */

  const runtimes = METAS.map((meta, index) => ({
    meta,
    index,
    status: "idle",
    module: null,
    group: new Group(),
    ctx: null,
    on: false,
    a: 0,
    s: 0,
    e: 0,
    b: 0,
    promise: null,
  }));
  const byId = Object.fromEntries(runtimes.map((runtime) => [runtime.meta.id, runtime]));
  runtimes.forEach((runtime) => {
    runtime.group.visible = false;
    scene.add(runtime.group);
  });

  let layout = null;
  let solved = null;
  let table = null;
  let docH = 1;
  let deskFlipY = Infinity;
  let deskOffY = 0;
  let archiveOnY = 0;
  let archiveOffY = 0;
  const pad = () => layout.svh * 0.15;

  function bake() {
    layout = bakeLayout();
    const baked = bakeKnots(layout, METAS);
    solved = baked.solved;
    docH = layout.docH;
    table = bakeTable(baked.knots, docH);

    const auto = solved["svc.auto"];
    const word = solved["process.head"];
    const q2 = solved["why.q"];

    const yaws = METAS.filter((meta) => meta.floor && meta.stripYaw !== undefined).map((meta) => ({
      y: solved[meta.id].floorY,
      yaw: meta.stripYaw,
    }));
    yaws.unshift({ y: WORLD.deskY, yaw: 0 });
    yaws.push({ y: auto.floorY + 3, yaw: 0 }, { y: auto.floorY + 1, yaw: 90 }, { y: auto.floorY - 3, yaw: 90 }, { y: word.floorY + 2, yaw: 0 });
    yaws.sort((a, b) => b.y - a.y);

    strip.rebuild({
      yaws,
      lineStartY: auto.floorY - 1.8,
      endY: q2.floorY + 0.03,
      dense: [{ a: solved["svc.rescue"].floorY + 2.4, b: solved["svc.rescue"].floorY - 2.4 }],
    });

    shared.uLitY.value.set(WORLD.slabBottom, word.floorY + 4);
    archive.setRange(WORLD.slabBottom, word.floorY);

    /* Sets swap only in the dark: inside the slab, and in the fall. */
    const dropRange = layout.shots.drop;
    const fallRange = layout.shots.fall;
    deskOffY = dropRange.pinStart + (dropRange.pinEnd - dropRange.pinStart) * 0.86;
    deskFlipY = fallRange.pinStart + (fallRange.pinEnd - fallRange.pinStart) * 0.5;
    archiveOnY = dropRange.pinStart + (dropRange.pinEnd - dropRange.pinStart) * 0.8;
    archiveOffY = fallRange.pinStart + (fallRange.pinEnd - fallRange.pinStart) * 0.4;

    for (const runtime of runtimes) {
      const i = runtime.index;
      const shot = layout.shots[runtime.meta.id];
      const prev = i > 0 ? layout.shots[METAS[i - 1].id] : null;
      const next = i < METAS.length - 1 ? layout.shots[METAS[i + 1].id] : null;
      runtime.a = prev ? prev.pinEnd : 0;
      runtime.s = shot.pinStart;
      runtime.e = shot.pinEnd;
      runtime.b = next ? next.pinStart : docH;
      const s = solved[runtime.meta.id];
      runtime.group.position.set(0, s.floorY ?? 0, 0);
      if (runtime.status === "ready" && runtime.module.layout) {
        runtime.module.layout(runtime.ctx);
      }
    }
    desk.setActPositions(solved.deskAct4);
    resize();
  }

  /* --------------------------------------------------------------------------
     Size, pixel cap
     -------------------------------------------------------------------------- */

  let pixelScale = 1;
  let pendingPixelScale = 0;
  let film = null;

  function resize() {
    const W = layout.W;
    const H = layout.H;
    const cap = q.pixelCap * pixelScale;
    const pr = Math.min(window.devicePixelRatio || 1, Math.sqrt(cap / (W * H)));
    renderer.setPixelRatio(pr);
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    film?.resize(W * pr, H * pr);
  }

  /* --------------------------------------------------------------------------
     Shots
     -------------------------------------------------------------------------- */

  const hotspotList = [];
  const makeCtx = (runtime) => ({
    tier,
    q,
    dir,
    id: runtime.meta.id,
    group: runtime.group,
    programs,
    u: shared,
    text,
    sets,
    camera,
    renderer,
    rng: seeded(runtime.meta.id),
    get solved() {
      return solved;
    },
    get layout() {
      return layout;
    },
    get self() {
      return solved[runtime.meta.id];
    },
    place(object, { inline = 0, y = 0, z = 0, yaw = 0 } = {}) {
      object.position.set(inline * dir, y, z);
      object.rotation.y = yaw * dir;
      return object;
    },
    hotspots: {
      add(spot) {
        hotspotList.push({ ...spot, runtime });
      },
    },
  });

  async function load(runtime) {
    if (runtime.status === "ready") {
      return;
    }
    if (runtime.promise) {
      return runtime.promise;
    }
    runtime.status = "loading";
    runtime.promise = (async () => {
      try {
        const loaded = await LOADERS[runtime.meta.id]();
        const module = loaded.default;
        runtime.ctx = makeCtx(runtime);
        await runSliced(module.build(runtime.ctx));
        await renderer.compileAsync(runtime.group, camera, scene);
        if (module.layout) {
          module.layout(runtime.ctx);
        }
        runtime.module = module;
        runtime.status = "ready";
        needsFrame = true;
      } catch (error) {
        /* A stale chunk after a deploy lands here: that shot is simply absent. */
        console.warn(`shot ${runtime.meta.id} failed`, error);
        runtime.status = "failed";
      }
    })();
    return runtime.promise;
  }

  function nearestIndex(y2) {
    for (let i = runtimes.length - 1; i >= 0; i -= 1) {
      if (y2 >= runtimes[i].a) {
        return i;
      }
    }
    return 0;
  }

  /* Neighbours load at idle, nearest first. An anchor jump jumps the queue. */
  let loading = false;
  async function pumpQueue() {
    if (loading) {
      return;
    }
    loading = true;
    for (;;) {
      if (stopped || isFailed()) {
        break;
      }
      const at = nearestIndex(y);
      let best = null;
      let bestDistance = Infinity;
      for (const runtime of runtimes) {
        if (runtime.status === "idle") {
          const distance = Math.abs(runtime.index - at);
          if (distance < bestDistance) {
            best = runtime;
            bestDistance = distance;
          }
        }
      }
      if (!best) {
        break;
      }
      await new Promise((done) => {
        if ("requestIdleCallback" in window) {
          window.requestIdleCallback(done, { timeout: 200 });
        } else {
          setTimeout(done, 16);
        }
      });
      await load(best);
    }
    loading = false;
  }

  /* --------------------------------------------------------------------------
     Frame
     -------------------------------------------------------------------------- */

  const sample = new Float32Array(13);
  const tilt = new Quaternion();
  const axisY = new Vector3(0, 1, 0);
  const axisX = new Vector3(1, 0, 0);
  const p = { t: 0, enter: 0, hold: 0, exit: 0, y: 0, v: 0, time: 0, dt: 0, px: 0, py: 0, pointer: 0 };

  let y = window.scrollY;
  let velocity = 0;
  let stopped = false;
  let frozenTime = null;
  let needsFrame = true;
  let time = 0;
  let lastFrame = performance.now();
  let lastRender = 0;
  let lastInput = performance.now();
  let pointerX = 0;
  let pointerY = 0;
  let pointerKind = 0;
  let smoothX = 0;
  let smoothY = 0;
  let cadence = 0;
  let contextLost = false;

  const smoothTime = coarse ? 0.09 : 0.14;

  function follow(target, dt) {
    /* Second-order smooth damp. Allocation-free, and it never overshoots much. */
    const omega = 2 / smoothTime;
    const x = omega * dt;
    const decay = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
    const change = y - target;
    const temp = (velocity + omega * change) * dt;
    velocity = (velocity - omega * temp) * decay;
    y = target + (change + temp) * decay;
    if (Math.abs(y - target) < 0.25 && Math.abs(velocity) < 2) {
      y = target;
      velocity = 0;
    }
  }

  function fillP(runtime, dt) {
    const clamp = (value) => Math.min(1, Math.max(0, value));
    p.t = runtime.b > runtime.a ? clamp((y - runtime.a) / (runtime.b - runtime.a)) : 1;
    p.enter = runtime.s > runtime.a ? clamp((y - runtime.a) / (runtime.s - runtime.a)) : y >= runtime.s ? 1 : 0;
    p.hold = runtime.e > runtime.s ? clamp((y - runtime.s) / (runtime.e - runtime.s)) : y >= runtime.e ? 1 : 0;
    p.exit = runtime.b > runtime.e ? clamp((y - runtime.e) / (runtime.b - runtime.e)) : y >= runtime.b ? 1 : 0;
    p.y = y;
    p.v = velocity;
    p.time = time;
    p.dt = dt;
    p.px = smoothX;
    p.py = smoothY;
    p.pointer = pointerKind;
  }

  const progress = (a, b) => (b > a ? Math.min(1, Math.max(0, (y - a) / (b - a))) : y >= b ? 1 : 0);
  const eased = (u) => u * u * (3 - 2 * u);

  /* Story state. Lives here rather than in shots, because anchor jumps skip shots. */
  function applyGlobals() {
    const word = layout.shots["process.head"];
    archive.u.uTurn.value = eased(progress(word.pinStart, word.pinEnd));

    const list = layout.shots["why.list"];
    const stats = layout.shots["why.stats"];
    const cta = layout.shots.cta;
    const clear = progress(list.pinStart, list.pinEnd) * 3.2;
    desk.setClear(clear);
    const dawn = eased(progress(list.pinStart + (list.pinEnd - list.pinStart) * 0.45, cta.pinStart));
    shared.uDawn.value = dawn;
    desk.setClock(3.2 + eased(progress(list.pinStart, stats.pinEnd)) * 3.8);

    const hero = layout.shots.hero;
    if (y < deskFlipY) {
      desk.setRing(1 - progress(hero.pinEnd, hero.pinEnd + (layout.shots.drop.pinEnd - hero.pinEnd) * 0.14));
    } else {
      desk.setRing(1 - progress(list.pinStart, list.pinStart + (list.pinEnd - list.pinStart) * 0.5));
    }

    /* The phone falls down its line, lands, and later turns under the CTA panel. */
    const heroPhone = desk.phone;
    heroPhone.visible = y > deskFlipY;
    strip.setEnd(-Infinity);
    if (y > deskFlipY) {
      const qShot = layout.shots["why.q"];
      const height = solved["why.q"].d * 0.62;
      const fallen = eased(progress(layout.shots.fall.pinEnd - (layout.shots.fall.pinEnd - deskFlipY) * 0.2, qShot.pinEnd));
      const landing = eased(progress(list.pinStart, list.pinStart + (list.pinEnd - list.pinStart) * 0.14));
      const above = height + (0.42 - height) * fallen;
      const py = above + (0.0043 - above) * landing;
      heroPhone.position.y = py;
      const size = 2.1 + (1 - 2.1) * fallen;
      heroPhone.scale.setScalar(size);
      heroPhone.rotation.y = layout.portrait ? 0 : (Math.PI / 2) * eased(progress(stats.pinEnd, cta.pinStart));
      strip.setEnd(desk.group.position.y + py + 0.01);
    }

    const rescue = runtimes.find((runtime) => runtime.meta.id === "svc.rescue");
    if (y < rescue.a || y > rescue.b) {
      shared.uPower.value.set(0, 0);
      strip.u.uJamK.value = 0;
    }
  }

  function draw(dt) {
    sampleTable(table, docH, y, sample);

    /* The pointer tips the camera slightly: the world is there, not painted on. */
    camera.position.set(sample[0], sample[1], sample[2]);
    camera.quaternion.set(sample[3], sample[4], sample[5], sample[6]);
    if (pointerKind === 1) {
      tilt.setFromAxisAngle(axisY, -smoothX * 0.012);
      camera.quaternion.multiply(tilt);
      tilt.setFromAxisAngle(axisX, smoothY * 0.009);
      camera.quaternion.multiply(tilt);
    }
    camera.fov = sample[7];
    camera.near = sample[8];
    camera.far = sample[9];
    camera.setViewOffset(layout.W, layout.H, sample[11], sample[12], layout.W, layout.H);

    shared.uTime.value = time;
    shared.uCamY.value = sample[1];
    shared.uFog.value.set(sample[10] * 0.16, sample[10]);

    applyGlobals();

    const deskVisible = y < deskOffY || y > deskFlipY;
    const act = y > deskFlipY ? 4 : 1;
    desk.group.visible = deskVisible;
    desk.setAct(act);
    archive.group.visible = y > archiveOnY && y < archiveOffY;
    shared.uLampOn.value = deskVisible ? 1 - shared.uDawn.value * 0.72 : 0;
    shared.uLampOrigin.value.copy(desk.group.position);
    shared.uLampColor.value.set(1, 0.7, 0.42);

    strip.u.uFeed.value = y * 0.00018;
    fillP(runtimes[0], dt);
    if (deskVisible) {
      desk.resetSpot();
      desk.update(p, time);
    }

    for (const runtime of runtimes) {
      const inRange = y >= runtime.a - pad() && y <= runtime.b + pad();
      if (runtime.status === "ready" && (inRange || runtime.on)) {
        fillP(runtime, dt);
        runtime.module.update(p, runtime.ctx);
        runtime.on = inRange;
        runtime.group.visible = inRange;
      }
    }

    /* After the shots, because they decide where the line ends. */
    strip.focus(sample[1], sample[9]);

    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
    if (film) {
      film.render(scene, camera);
    } else {
      renderer.render(scene, camera);
    }
  }

  const governor = new Governor({
    onChange(rung, name) {
      applyRung(name);
    },
  });

  function applyRung(name) {
    if (name === "pixel-85" || name === "pixel-72") {
      /* Reallocating the buffer is visible, so it waits for idle or the dark. */
      pendingPixelScale = name === "pixel-85" ? 0.85 : 0.72;
    } else if (name === "drop-film") {
      film?.dispose();
      film = null;
    } else if (name === "instances-70" || name === "instances-50") {
      q.instanceScale = name === "instances-70" ? 0.7 : 0.5;
      desk.setDensity(q.instanceScale);
      archive.setDensity(q.instanceScale);
    } else if (name === "shadow-1") {
      desk.setShadowTaps(1);
    } else if (name === "extras-off") {
      archive.setWeather(false);
      desk.setExtras(false);
    } else if (name === "cadence-30") {
      cadence = 33.3;
    } else if (name === "stills") {
      try {
        window.localStorage.setItem("enjaz:tier", `S:${Date.now()}`);
      } catch (error) {
        /* Non-fatal. */
      }
      stop();
      onOff("governor");
    }
  }

  function tick(now) {
    if (stopped) {
      return;
    }
    window.requestAnimationFrame(tick);
    if (document.hidden || contextLost || frozenTime !== null) {
      lastFrame = now;
      return;
    }

    const rawDt = now - lastFrame;
    lastFrame = now;
    const dt = Math.min(rawDt, 100) / 1000;
    time += dt;

    const target = window.scrollY;
    const scrolling = Math.abs(target - y) > 0.25 || Math.abs(velocity) > 2;
    follow(target, dt);

    smoothX += (pointerX - smoothX) * Math.min(1, dt * 6);
    smoothY += (pointerY - smoothY) * Math.min(1, dt * 6);
    const pointerMoving = Math.abs(pointerX - smoothX) > 0.001 || Math.abs(pointerY - smoothY) > 0.001;

    const active = runtimes[nearestIndex(y)];
    const idleHz = active.meta.idleHz;
    /* Render-on-demand is the thermal control: a resting page costs no GPU. */
    let dirty = scrolling || pointerMoving || needsFrame;
    if (!dirty && idleHz > 0 && !(tier === "L" && now - lastInput > IDLE_STOP_MS)) {
      dirty = now - lastRender >= 1000 / idleHz - 1;
    }
    if (cadence && now - lastRender < cadence - 2) {
      dirty = false;
    }
    if (!dirty) {
      return;
    }

    if (scrolling) {
      lastInput = now;
    }
    if (pendingPixelScale && (!scrolling || (y > layout.shots.fall.pinStart && y < layout.shots.fall.pinEnd))) {
      pixelScale = pendingPixelScale;
      pendingPixelScale = 0;
      resize();
    }

    needsFrame = false;
    const renderDt = (now - lastRender) / 1000;
    lastRender = now;
    draw(Math.min(renderDt, 0.1));
    if (rawDt < 250 && (scrolling || idleHz > 0)) {
      governor.push(rawDt);
    }
  }

  function stop() {
    stopped = true;
  }

  /* --------------------------------------------------------------------------
     Input: never blocks scrolling or selection
     -------------------------------------------------------------------------- */

  window.addEventListener(
    "pointermove",
    (event) => {
      pointerKind = event.pointerType === "mouse" ? 1 : 2;
      pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      pointerY = (event.clientY / window.innerHeight) * 2 - 1;
      lastInput = performance.now();
    },
    { passive: true }
  );

  const projected = new Vector3();
  window.addEventListener(
    "click",
    (event) => {
      if (event.target.closest?.("a, button, .shot")) {
        return;
      }
      for (const spot of hotspotList) {
        if (!spot.runtime.on) {
          continue;
        }
        projected.set(spot.center[0], spot.center[1], spot.center[2]);
        spot.runtime.group.localToWorld(projected).project(camera);
        const sx = (projected.x * 0.5 + 0.5) * layout.W;
        const sy = (0.5 - projected.y * 0.5) * layout.H;
        if (Math.hypot(sx - event.clientX, sy - event.clientY) < spot.radius) {
          spot.runtime.module.hit?.(spot.id, p, spot.runtime.ctx);
          needsFrame = true;
        }
      }
    },
    { passive: true }
  );

  window.addEventListener("pageshow", () => {
    y = window.scrollY;
    needsFrame = true;
  });

  /* --------------------------------------------------------------------------
     Context loss
     -------------------------------------------------------------------------- */

  let losses = 0;
  canvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    contextLost = true;
    losses += 1;
    onOff("context-lost");
  });
  canvas.addEventListener("webglcontextrestored", () => {
    if (losses > 1) {
      return;
    }
    contextLost = false;
    /* three re-uploads everything, but the baked lamp depth is simply gone. */
    desk.bakeShadow(renderer);
    needsFrame = true;
    root.classList.remove("world-off");
  });

  /* --------------------------------------------------------------------------
     Start
     -------------------------------------------------------------------------- */

  bake();
  y = window.scrollY;

  await runSliced(desk.build());
  await runSliced(archive.build());
  await load(byId.hero);
  await load(byId.drop);
  await renderer.compileAsync(scene, camera);
  desk.bakeShadow(renderer);

  if (isFailed()) {
    return null;
  }

  /* Hidden bench: six real frames with the canvas still at opacity 0. */
  if (!forced) {
    const frames = [];
    const pixel = new Uint8Array(4);
    for (let i = 0; i < 6; i += 1) {
      await new Promise((done) => window.requestAnimationFrame(done));
      const before = performance.now();
      draw(0.016);
      gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
      frames.push(performance.now() - before);
    }
    const median = frames.slice(2).sort((a, b) => a - b)[1];
    if (median > 40) {
      try {
        window.localStorage.setItem("enjaz:tier", `S:${Date.now()}`);
      } catch (error) {
        /* Non-fatal. */
      }
      onFail("bench");
      return null;
    }
    if (median > 20) {
      pixelScale = 0.7;
      q.instanceScale = 0.7;
      desk.setDensity(0.7);
      archive.setDensity(0.7);
      resize();
    }
  }

  if (q.film) {
    const module = await import("./film.js");
    film = module.createFilm(renderer);
    film.resize(layout.W * renderer.getPixelRatio(), layout.H * renderer.getPixelRatio());
  }

  draw(0.016);
  root.classList.add("world-on");
  window.requestAnimationFrame(tick);
  pumpQueue();

  const unwatch = watchLayout(() => {
    bake();
    needsFrame = true;
  });

  if (/[?&]hud=1\b/.test(window.location.search)) {
    import("./hud.js").then((hud) =>
      hud.mountHud({ renderer, governor, tier, q, get y() { return y; } })
    );
  }

  /* Test and diagnostics hook. Nothing on the page depends on it. */
  const world = {
    tier,
    renderer,
    governor,
    scene,
    stop,
    get layout() {
      return layout;
    },
    get solved() {
      return solved;
    },
    /** Jump straight to y, with no easing, and draw. */
    seek(target) {
      window.scrollTo({ top: target, behavior: "instant" });
      y = window.scrollY;
      velocity = 0;
      draw(0.016);
      return y;
    },
    /** Stops time, so repeated frames compare equal. */
    freeze(value) {
      frozenTime = value;
      time = value;
    },
    unfreeze() {
      frozenTime = null;
    },
    renderOnce() {
      draw(0.016);
    },
    info() {
      draw(0.016);
      return {
        calls: renderer.info.render.calls,
        triangles: renderer.info.render.triangles,
        programs: renderer.info.programs.length,
        rung: governor.rung,
        y,
      };
    },
    /** The scene's own numbers: a post chain adds passes that are not its cost. */
    sceneInfo() {
      const chain = film;
      film = null;
      draw(0.016);
      const info = { calls: renderer.info.render.calls, triangles: renderer.info.render.triangles };
      film = chain;
      return info;
    },
    feedFrameTimes(list) {
      list.forEach((value) => governor.push(value));
    },
    async loadAll() {
      await Promise.all(runtimes.map((runtime) => load(runtime)));
      needsFrame = true;
    },
    status() {
      return Object.fromEntries(runtimes.map((runtime) => [runtime.meta.id, runtime.status]));
    },
    dispose() {
      stop();
      unwatch();
    },
  };
  window.__enjazWorld = world;
  return world;
}
