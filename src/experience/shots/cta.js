/**
 * Dawn and the phone. The sky through the blinds is the brand gradient, its light
 * falling across clean walnut like the bars on the old paper. The real WhatsApp
 * button is a plain link sitting on the 3D phone's screen. On a phone, the bezels
 * pass the edges of the viewport: your phone is the phone.
 */

import { Mesh, PlaneGeometry } from "three";
import { smoothstep } from "../engine/geo.js";

export default {
  *build(ctx) {
    const { sets, programs, text } = ctx;
    const phone = sets.phone.make({ w: 0.0775, h: 0.16, t: 0.0085 });
    phone.position.set(0, 0.0043, 0);
    ctx.group.add(phone);
    ctx.phone = phone;

    const screenTexture = text.canvas(360, 744, (c, w, h) => {
      const gradient = c.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, "#0f2a2a");
      gradient.addColorStop(1, "#1a1538");
      c.fillStyle = gradient;
      c.fillRect(0, 0, w, h);
    });
    phone.userData.screen.material = programs.paper({
      atlas: { value: screenTexture },
      house: 0,
      ambient: 1.05,
      deform: {
        fpars: `uniform float uBright;`,
        frag: `c *= uBright;`,
        uniforms: { uBright: { value: 1 } },
      },
    });
    ctx.screen = phone.userData.screen.material;

    /* Mirrored in the varnish: drawn again, under the wood's dawn light. */
    const reflection = new Mesh(new PlaneGeometry(0.16, 0.16), programs.glow({ color: [0.5, 0.75, 0.9], alpha: 0.12 }));
    reflection.rotation.x = -Math.PI / 2;
    reflection.position.y = 0.0005;
    ctx.group.add(reflection);
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
  layout(ctx) {
    ctx.group.position.set(0, ctx.solved.deskAct4.y, 0);
    /* On a wide screen it lies on its side, under the panel. */
    ctx.phone.rotation.y = ctx.layout.portrait ? 0 : Math.PI / 2;
  },
  update(p, ctx) {
    ctx.buzz = Math.max(0, ctx.buzz - p.dt * 3.3);
    ctx.phone.position.x = Math.sin(p.time * 130) * 0.0009 * ctx.buzz;
    ctx.screen.uniforms.uBright.value = 0.82 + ctx.buzz * 0.45 + smoothstep(0, 1, p.enter) * 0.1;
  },
};
