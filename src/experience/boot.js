/**
 * Entry point, imported by assets/js/main.js. Imports no three: a device with no
 * usable GPU gets its answer from here and never downloads the film.
 */

import { classify, isMobileDevice, FORCED_TIER } from "./engine/tiers.js";

/* global __WORLD_URL__ */

const WATCHDOG_MS = 20000;

export async function boot({ onFail, onOff }) {
  const forced = FORCED_TIER.exec(window.location.search)?.[1] ?? null;
  const canvas = document.createElement("canvas");
  canvas.className = "world";
  canvas.setAttribute("aria-hidden", "true");

  let failed = false;
  const fail = (reason) => {
    if (!failed) {
      failed = true;
      canvas.remove();
      onFail(reason);
    }
  };

  /* alpha:false is the point of owning the context: three would ask for alpha. */
  const gl = canvas.getContext("webgl2", {
    alpha: false,
    antialias: true,
    depth: true,
    stencil: false,
    powerPreference: "default",
    failIfMajorPerformanceCaveat: !forced,
  });
  if (!gl) {
    fail("no-context");
    return null;
  }

  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const name = String(gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER));
  const tier = forced ?? classify(name, isMobileDevice());
  if (tier === "S") {
    fail(`gpu:${name}`);
    return null;
  }

  document.body.insertBefore(canvas, document.body.firstChild);

  const watchdog = forced ? 0 : window.setTimeout(() => fail("watchdog"), WATCHDOG_MS);

  try {
    const { start } = await import(__WORLD_URL__);
    const world = await start({
      canvas,
      gl,
      tier,
      forced: Boolean(forced),
      onFail: fail,
      onOff,
      isFailed: () => failed,
    });
    window.clearTimeout(watchdog);
    return world;
  } catch (error) {
    window.clearTimeout(watchdog);
    console.warn("film failed to start", error);
    fail("start");
    return null;
  }
}
