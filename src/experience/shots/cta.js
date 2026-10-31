/**
 * Dawn and the phone. The sky through the blinds is the brand gradient, its light
 * falling across clean walnut like the bars on the old paper. The real WhatsApp
 * button is a plain link sitting on the 3D phone's screen. On a phone, the bezels
 * pass the edges of the viewport: your phone is the phone.
 */

import { smoothstep } from "../engine/geo.js";

export default {
  *build(ctx) {
    const { sets, programs, text } = ctx;
    const phone = sets.desk.phone;
    ctx.phone = phone;
    const screenTexture = text.canvas(360, 744, (c, w, h) => {
      const gradient = c.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, "#0d2626");
      gradient.addColorStop(1, "#171334");
      c.fillStyle = gradient;
      c.fillRect(0, 0, w, h);
    });
    ctx.ctaScreen = programs.paper({
      atlas: { value: screenTexture },
      house: 0,
      ambient: 1.05,
      deform: {
        fpars: `uniform float uBright;`,
        frag: `c *= uBright;`,
        uniforms: { uBright: { value: 1 } },
      },
    });
    ctx.listScreen = phone.userData.screen.material;
    ctx.buzz = 0;

    /* Hover or keyboard focus on the button makes the phone buzz on the wood. */
    const button = document.querySelector(".cta__action");
    const wake = () => {
      ctx.buzz = 1;
    };
    button?.addEventListener("pointerenter", wake);
    button?.addEventListener("focus", wake);
    yield;
  },
  update(p, ctx) {
    ctx.buzz = Math.max(0, ctx.buzz - p.dt * 3.3);
    /* The camera sits on the line's axis here: it would only slash across the copy. */
    if (p.enter > 0.8 && p.exit < 0.55) {
      ctx.sets.strip.setEnd(Infinity);
    }
    /* The list clears off the screen, so the real panel has a calm screen behind it. */
    ctx.phone.userData.screen.material = p.t > 0.02 ? ctx.ctaScreen : ctx.listScreen;
    ctx.phone.position.x = Math.sin(p.time * 130) * 0.0009 * ctx.buzz;
    ctx.ctaScreen.uniforms.uBright.value = 0.9 + ctx.buzz * 0.45 + smoothstep(0, 1, p.enter) * 0.1;
  },
};
