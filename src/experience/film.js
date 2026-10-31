/**
 * Tier H post chain: half-resolution bright pass, 5-level dual-filter bloom, then a
 * composite with grain, slight chromatic aberration and a vignette. Lazy, because
 * only strong GPUs ever see it, and the governor can drop it without a new context.
 */

import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  GLSL3,
  LinearFilter,
  Mesh,
  NoBlending,
  OrthographicCamera,
  RawShaderMaterial,
  Scene,
  Vector2,
  WebGLRenderTarget,
} from "three";

const LEVELS = 5;

const VERTEX = /* glsl */ `
precision highp float;
in vec3 position;
out vec2 vUv;
void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`;

const DOWN = /* glsl */ `
precision highp float;
uniform sampler2D uTex;
uniform vec2 uTexel;
uniform float uThreshold;
in vec2 vUv;
out vec4 fragColor;
void main() {
  vec3 c = texture(uTex, vUv).rgb * 4.0;
  c += texture(uTex, vUv + uTexel * vec2(-1.0, -1.0)).rgb;
  c += texture(uTex, vUv + uTexel * vec2(1.0, -1.0)).rgb;
  c += texture(uTex, vUv + uTexel * vec2(-1.0, 1.0)).rgb;
  c += texture(uTex, vUv + uTexel * vec2(1.0, 1.0)).rgb;
  c /= 8.0;
  if (uThreshold > 0.0) {
    float l = max(c.r, max(c.g, c.b));
    c *= smoothstep(uThreshold, uThreshold + 0.25, l);
  }
  fragColor = vec4(c, 1.0);
}`;

const UP = /* glsl */ `
precision highp float;
uniform sampler2D uTex;
uniform vec2 uTexel;
in vec2 vUv;
out vec4 fragColor;
void main() {
  vec3 c = texture(uTex, vUv + uTexel * vec2(-2.0, 0.0)).rgb;
  c += texture(uTex, vUv + uTexel * vec2(2.0, 0.0)).rgb;
  c += texture(uTex, vUv + uTexel * vec2(0.0, -2.0)).rgb;
  c += texture(uTex, vUv + uTexel * vec2(0.0, 2.0)).rgb;
  c += texture(uTex, vUv + uTexel * vec2(-1.0, -1.0)).rgb * 2.0;
  c += texture(uTex, vUv + uTexel * vec2(1.0, -1.0)).rgb * 2.0;
  c += texture(uTex, vUv + uTexel * vec2(-1.0, 1.0)).rgb * 2.0;
  c += texture(uTex, vUv + uTexel * vec2(1.0, 1.0)).rgb * 2.0;
  fragColor = vec4(c / 12.0, 1.0);
}`;

const COMPOSITE = /* glsl */ `
precision highp float;
uniform sampler2D uScene, uBloom;
uniform float uTime;
in vec2 vUv;
out vec4 fragColor;
void main() {
  vec2 q = vUv - 0.5;
  float r2 = dot(q, q);
  vec2 shift = q * r2 * 0.012;
  vec3 c = vec3(texture(uScene, vUv + shift).r, texture(uScene, vUv).g, texture(uScene, vUv - shift).b);
  c += texture(uBloom, vUv).rgb * 0.34;
  c *= 1.0 - r2 * 0.62;
  float g = fract(sin(dot(gl_FragCoord.xy + uTime * 61.0, vec2(12.9898, 78.233))) * 43758.5453);
  c += (g - 0.5) * 0.018;
  fragColor = vec4(c, 1.0);
}`;

export function createFilm(renderer) {
  const triangle = new BufferGeometry();
  triangle.setAttribute("position", new BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));
  const mesh = new Mesh(triangle);
  mesh.frustumCulled = false;
  const stage = new Scene();
  stage.add(mesh);
  const camera = new OrthographicCamera();

  const program = (fragmentShader, uniforms, blending = NoBlending) =>
    new RawShaderMaterial({
      glslVersion: GLSL3,
      vertexShader: VERTEX,
      fragmentShader,
      uniforms,
      blending,
      depthTest: false,
      depthWrite: false,
      transparent: blending !== NoBlending,
    });

  const down = program(DOWN, { uTex: { value: null }, uTexel: { value: new Vector2() }, uThreshold: { value: 0 } });
  const up = program(UP, { uTex: { value: null }, uTexel: { value: new Vector2() } }, AdditiveBlending);
  const composite = program(COMPOSITE, { uScene: { value: null }, uBloom: { value: null }, uTime: { value: 0 } });

  const target = (width, height, options = {}) =>
    new WebGLRenderTarget(Math.max(2, width), Math.max(2, height), {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      depthBuffer: false,
      ...options,
    });

  let sceneTarget = null;
  let chain = [];

  const pass = (material, destination) => {
    mesh.material = material;
    renderer.setRenderTarget(destination);
    renderer.render(stage, camera);
  };

  const frame = { time: 0 };

  return {
    resize(width, height) {
      const w = Math.floor(width);
      const h = Math.floor(height);
      sceneTarget?.dispose();
      chain.forEach((level) => level.dispose());
      sceneTarget = target(w, h, { depthBuffer: true, samples: 4 });
      chain = [];
      for (let i = 1; i <= LEVELS; i += 1) {
        chain.push(target(w >> i, h >> i));
      }
    },
    render(scene, sceneCamera) {
      renderer.setRenderTarget(sceneTarget);
      renderer.clear();
      renderer.render(scene, sceneCamera);

      const autoClear = renderer.autoClear;
      renderer.autoClear = false;

      for (let i = 0; i < LEVELS; i += 1) {
        const from = i === 0 ? sceneTarget : chain[i - 1];
        down.uniforms.uTex.value = from.texture;
        down.uniforms.uTexel.value.set(1 / from.width, 1 / from.height);
        /* High, because paper is meant to be bright: only lights and the mint line bloom. */
        down.uniforms.uThreshold.value = i === 0 ? 0.86 : 0;
        pass(down, chain[i]);
      }
      for (let i = LEVELS - 1; i > 0; i -= 1) {
        up.uniforms.uTex.value = chain[i].texture;
        up.uniforms.uTexel.value.set(0.5 / chain[i].width, 0.5 / chain[i].height);
        pass(up, chain[i - 1]);
      }

      composite.uniforms.uScene.value = sceneTarget.texture;
      composite.uniforms.uBloom.value = chain[0].texture;
      frame.time = (frame.time + 0.016) % 10;
      composite.uniforms.uTime.value = frame.time;
      pass(composite, null);
      renderer.autoClear = autoClear;
    },
    dispose() {
      sceneTarget?.dispose();
      chain.forEach((level) => level.dispose());
      down.dispose();
      up.dispose();
      composite.dispose();
      triangle.dispose();
    },
  };
}
