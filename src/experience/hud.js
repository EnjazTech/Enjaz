/**
 * ?hud=1: frame times and budgets, on a real phone, in production. This is how the
 * film gets its first real-device numbers, which nothing here can measure.
 */

export function mountHud({ renderer, governor, tier, q }) {
  const box = document.createElement("pre");
  const style = box.style;
  style.position = "fixed";
  style.zIndex = "90";
  style.left = "8px";
  style.top = "84px";
  style.margin = "0";
  style.padding = "6px 8px";
  style.font = "11px/1.4 monospace";
  style.color = "#5dffde";
  style.background = "rgba(0,0,0,.72)";
  style.pointerEvents = "none";
  style.direction = "ltr";
  box.setAttribute("aria-hidden", "true");
  document.body.appendChild(box);

  const gl = renderer.getContext();
  const debug = gl.getExtension("WEBGL_debug_renderer_info");
  const name = debug ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) : "masked";

  window.setInterval(() => {
    const { calls, triangles } = renderer.info.render;
    box.textContent = [
      `tier ${tier}  rung ${governor.rung}  scale ${q.instanceScale}`,
      `p50 ${governor.p50.toFixed(1)}  p90 ${governor.p90.toFixed(1)} ms`,
      `draws ${calls}  tris ${triangles}`,
      `programs ${renderer.info.programs.length}  dpr ${renderer.getPixelRatio().toFixed(2)}`,
      String(name).slice(0, 44),
    ].join("\n");
  }, 500);
}
