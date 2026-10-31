/**
 * The first clean floor. The handset from Act I hangs here on its curly cord,
 * beside the line. The cord touches the line and turns mint: paper and phone
 * calls, the two old threads, become one thread.
 */

import { CylinderGeometry, Group, Mesh, PlaneGeometry } from "three";
import { merge, part, smoothstep } from "../engine/geo.js";
import { cordGeometry, handsetGeometry } from "../sets/props.js";

export default {
  *build(ctx) {
    const { programs, dir } = ctx;
    const platform = new Mesh(
      merge([part(new CylinderGeometry(1.7, 1.75, 0.08, 64), { at: [0, -1.05, 0], color: [0.16, 0.17, 0.2] })]),
      programs.solid({ ambient: 0.16 })
    );
    ctx.group.add(platform);

    /* A polished floor is the subject again, upside down and dimmed. */
    const hanging = new Group();
    hanging.position.set(dir * 0.32, 1.0, 0.2);
    const cord = new Mesh(
      cordGeometry([[0, 0.4, 0], [0, 0, 0], [0.02, -0.5, 0], [0, -1.05, 0]], 42, 0.03),
      programs.solid({
        ambient: 0.25,
        deform: {
          fpars: `uniform float uMint;`,
          frag: `c = mix(c, vec3(0.365, 1.0, 0.87), uMint);`,
          uniforms: { uMint: { value: 0 } },
        },
      })
    );
    const handset = new Mesh(handsetGeometry(), programs.solid({ ambient: 0.75 }));
    handset.scale.setScalar(2.4);
    handset.position.set(0, -1.18, 0);
    handset.rotation.z = 1.25;
    hanging.add(cord, handset);
    ctx.group.add(hanging);
    ctx.hanging = hanging;
    ctx.cord = cord;

    const mirrored = new Group();
    const cordMirror = new Mesh(cord.geometry, programs.solid({ ambient: 0.05 }));
    const handsetMirror = new Mesh(handset.geometry, cordMirror.material);
    handsetMirror.scale.setScalar(2.4);
    handsetMirror.position.copy(handset.position);
    handsetMirror.rotation.z = 1.25;
    mirrored.add(cordMirror, handsetMirror);
    mirrored.position.set(dir * 0.32, -3.1, 0.2);
    mirrored.scale.y = -1;
    ctx.mirrored = mirrored;
    if (ctx.q.allReflections) {
      ctx.group.add(mirrored);
    }
    yield;

    const ripple = new Mesh(
      new PlaneGeometry(3.6, 3.6),
      programs.glow({ color: [0.365, 1, 0.87], alpha: 0.9, shape: 2 })
    );
    ripple.rotation.x = -Math.PI / 2;
    ripple.position.set(0, -0.99, 0);
    ctx.group.add(ripple);
    ctx.ripple = ripple;
    ctx.tap = 0;
    ctx.hotspots.add({ id: "handset", center: [dir * 0.32, -0.2, 0.2], radius: 90 });
    yield;
  },
  update(p, ctx) {
    const reach = smoothstep(0.15, 0.85, p.hold);
    ctx.cord.material.uniforms.uMint.value = reach;
    const sway = Math.sin(p.time * 0.8) * (1 - reach) * 0.07;
    ctx.hanging.rotation.z = sway * ctx.dir;
    /* Drawn toward the line as it joins. */
    ctx.hanging.position.x = ctx.dir * (0.32 - reach * 0.26);
    const r = (p.hold * 2.2 + ctx.tap + p.time * 0.1) % 1;
    const uniforms = ctx.ripple.material.uniforms;
    uniforms.uRadius.value = r;
    uniforms.uAlpha.value = (1 - r) * 0.9 * smoothstep(0, 0.1, p.hold + p.enter);
  },
  hit(id, p, ctx) {
    ctx.tap += 0.3;
  },
};
