/**
 * The six programs that shade the whole film. All RawShaderMaterial, GLSL3,
 * shaded in gamma space so a CSS hex equals the GL colour.
 *
 * A shot may add vertex behaviour through `deform`:
 *   { pars, local, world, frag }
 * `pars` declares its uniforms and attributes. `local` edits `p` and `n` before
 * the instance transform, `world` edits `wp` and `wn` after it, and `frag` (a
 * fragment line) may edit the colour `c`. Variants compile in a shot's build(),
 * never mid-flight, because every source string is a separate GPU program.
 */

import {
  AdditiveBlending,
  CanvasTexture,
  DoubleSide,
  GLSL3,
  LinearFilter,
  LinearMipmapLinearFilter,
  NoColorSpace,
  NormalBlending,
  RawShaderMaterial,
  RepeatWrapping,
} from "three";

const V_COMMON = /* glsl */ `
precision highp float;
uniform mat4 modelMatrix, viewMatrix, projectionMatrix;
uniform vec3 cameraPosition, uLampOrigin;
uniform float uTime, uInline, uCamY, uDawn, uPowerY, uHouse, uCull;
uniform vec2 uPower, uLitY, uFog;

vec3 qrot(vec4 q, vec3 v) { return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v); }

/* The light of the building is a function of world Y, so lighting belongs to the
   place and sections cannot have a lighting seam. uPower is (out, in): the wave
   dying outward from the jam, and the wave returning after it. */
float powerAt(float wy) {
  float d = abs(wy - uPowerY) / 18.0;
  return clamp(1.0 - clamp(uPower.x * 2.2 - d, 0.0, 1.0) + clamp(uPower.y * 2.2 - d, 0.0, 1.0), 0.0, 1.0);
}
vec3 buildingLight(float wy, vec3 n) {
  float k = clamp((wy - uLitY.y) / (uLitY.x - uLitY.y), 0.0, 1.0);
  float up = n.y * 0.5 + 0.5;
  vec3 warm = vec3(1.0, 0.70, 0.42) * (0.18 + 0.82 * up * up);
  vec3 cool = mix(vec3(0.365, 1.0, 0.87), vec3(0.643, 0.545, 1.0), 0.5 + 0.5 * sin(wy * 0.31)) * (0.2 + 0.6 * (1.0 - up * 0.7));
  return (mix(cool, warm, smoothstep(0.1, 0.62, k)) * 1.15 * powerAt(wy)) * uHouse;
}
/* View depth interpolates exactly, so huge quads fog correctly with few vertices. */
float fogAt(vec3 wp) {
  return (-(viewMatrix * vec4(wp, 1.0)).z - uFog.x) / (uFog.y - uFog.x);
}
`;

const F_COMMON = /* glsl */ `
precision mediump float;
precision highp int;
uniform vec3 uLampPos, uLampDir, uLampColor;
uniform vec2 uLampCone;
uniform float uLampOn;
out vec4 fragColor;
const vec3 FOG = vec3(0.0275, 0.0314, 0.0471);
const vec3 AMB = vec3(0.72, 0.8, 1.0);

/* Returns NdotL in .w and the lamp's reach in .rgb. */
vec4 lampAt(vec3 lp, vec3 n) {
  vec3 L = uLampPos - lp;
  float d2 = dot(L, L);
  L /= sqrt(d2);
  float spot = smoothstep(uLampCone.x, uLampCone.y, dot(-L, uLampDir));
  return vec4(uLampColor * spot * uLampOn / (0.5 + d2 * 0.85), dot(n, L));
}
vec3 finish(vec3 c, float fog) {
  c = clamp(c, 0.0, 1.0);
  c = mix(c, c * c * (3.0 - 2.0 * c), 0.28);
  c = mix(c, FOG, clamp(fog, 0.0, 1.0));
  highp float d = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
  return c + (d - 0.5) * 0.006;
}
`;

const SOLID_V = /* glsl */ `
${V_COMMON}
in vec3 position, normal;
in vec4 aColor;
#ifdef INSTANCED
in vec3 iPos, iScale, iTint;
in vec4 iQuat;
in float iSeed;
#endif
out vec3 vN, vLampP, vHouse, vTint;
out float vFog, vMat, vShade;
//#pars
void main() {
  vec3 p = position, n = normal, tint = aColor.rgb;
  float seed = 0.0;
#ifdef INSTANCED
  seed = iSeed;
  tint *= iTint;
  p *= iScale;
#endif
  //#local
#ifdef INSTANCED
  p = qrot(iQuat, p) + iPos;
  n = qrot(iQuat, n);
#endif
  vec3 wp = (modelMatrix * vec4(p, 1.0)).xyz;
  vec3 wn = normalize(mat3(modelMatrix) * n);
  //#world
  vec4 view = viewMatrix * vec4(wp, 1.0);
  gl_Position = projectionMatrix * view;
  vN = normalize(mat3(viewMatrix) * wn);
  vLampP = wp - uLampOrigin;
  vHouse = buildingLight(wp.y, wn);
  vTint = tint;
  vMat = aColor.a;
  vShade = wn.y * 0.5 + 0.5;
  vFog = fogAt(wp);
}`;

const SOLID_F = /* glsl */ `
${F_COMMON}
uniform sampler2D uMatcap;
uniform vec3 uEmit;
uniform float uAmbient;
in vec3 vN, vLampP, vHouse, vTint;
in float vFog, vMat, vShade;
//#fpars
void main() {
  vec3 n = normalize(vN);
  /* Two matcaps share one texture: graphite on the left, brass on the right. */
  vec2 mc = n.xy * 0.49 + 0.5;
  mc.x = mc.x * 0.5 + (vMat > 0.5 && vMat < 1.5 ? 0.5 : 0.0);
  vec3 m = texture(uMatcap, mc).rgb;
  vec4 l = lampAt(vLampP, n);
  float ndl = max(l.w * 0.82 + 0.18, 0.0);
  vec3 c = vTint * m * (AMB * uAmbient + vHouse + l.rgb * ndl * 1.5);
  if (vMat > 1.5) { c = vTint; }
  c += uEmit;
  //#frag
  fragColor = vec4(finish(c, vFog), 1.0);
}`;

const PAPER_V = /* glsl */ `
${V_COMMON}
in vec3 position, normal;
in vec2 uv;
#ifdef INSTANCED
in vec3 iPos, iScale, iTint;
in vec4 iQuat, iCell;
in float iSeed;
#endif
uniform vec4 uCell;
out vec2 vUv;
out vec3 vN, vLampP, vHouse, vTint;
out float vFog;
//#pars
void main() {
  vec3 p = position, n = normal, tint = vec3(1.0);
  float seed = 0.0;
  vec2 cellUv = uCell.xy + uv * uCell.zw;
#ifdef INSTANCED
  seed = iSeed;
  tint = iTint;
  p *= iScale;
  cellUv = iCell.xy + uv * iCell.zw;
#endif
  //#local
#ifdef INSTANCED
  p = qrot(iQuat, p) + iPos;
  n = qrot(iQuat, n);
#endif
  vec3 wp = (modelMatrix * vec4(p, 1.0)).xyz;
  vec3 wn = normalize(mat3(modelMatrix) * n);
  //#world
  gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
  vUv = cellUv;
  vN = wn;
  vLampP = wp - uLampOrigin;
  vHouse = buildingLight(wp.y, wn);
  vTint = tint;
  vFog = fogAt(wp);
}`;

const PAPER_F = /* glsl */ `
${F_COMMON}
uniform sampler2D uAtlas;
uniform float uAmbient, uLitBoost;
in vec2 vUv;
in vec3 vN, vLampP, vHouse, vTint;
in float vFog;
//#fpars
void main() {
  vec3 n = normalize(vN);
#ifdef FACET
  /* Hard creases on a crushed sheet: normals from screen derivatives. */
  n = normalize(mix(n, cross(dFdx(vLampP), dFdy(vLampP)), uFacet));
#endif
  if (!gl_FrontFacing) { n = -n; }
  vec3 ink = texture(uAtlas, vUv).rgb;
  vec4 l = lampAt(vLampP, n);
  /* Wrap lighting, plus thin-sheet translucency so hanging paper glows when backlit. */
  float wrap = max((l.w + 0.4) / 1.4, 0.0) + max(-l.w, 0.0) * 0.55;
  vec3 c = vTint * ink * (AMB * uAmbient + vHouse + l.rgb * wrap * 1.15) * uLitBoost;
  //#frag
  fragColor = vec4(finish(c, vFog), 1.0);
}`;

const WOOD_V = /* glsl */ `
${V_COMMON}
in vec3 position, normal;
in vec2 uv;
uniform mat4 uLampMatrix;
out vec2 vUv;
out vec3 vN, vLampP, vLocal;
out vec4 vShadow;
out float vFog;
//#pars
void main() {
  vec3 p = position, n = normal;
  float seed = 0.0;
  vec3 wp = (modelMatrix * vec4(p, 1.0)).xyz;
  vec3 wn = normalize(mat3(modelMatrix) * n);
  gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
  vUv = uv;
  vN = wn;
  vLampP = wp - uLampOrigin;
  vLocal = position;
  vShadow = uLampMatrix * vec4(wp - uLampOrigin, 1.0);
  vFog = fogAt(wp);
}`;

const WOOD_F = /* glsl */ `
${F_COMMON}
precision highp sampler2DShadow;
uniform sampler2D uMap;
uniform sampler2DShadow uShadow;
uniform float uClear, uDawnStripes, uAmbient, uShadowTaps, uGloss;
uniform highp float uDawn;
uniform vec4 uRings; // two coffee rings: xy centre in desk metres (x,z), per ring
uniform vec3 uRingCentreA, uRingCentreB;
uniform vec3 uTint;
in vec2 vUv;
in vec3 vN, vLampP, vLocal;
in vec4 vShadow;
in float vFog;
float ring(vec2 q, vec3 c) {
  float d = abs(length(q - c.xy) - c.z);
  return smoothstep(0.0035, 0.0012, d) * (0.55 + 0.45 * sin(q.x * 90.0 + q.y * 40.0));
}
void main() {
  vec3 n = normalize(vN);
  vec4 l = lampAt(vLampP, n);
  vec3 albedo = texture(uMap, vUv).rgb * uTint;
  vec2 q = vLampP.xz;
  /* Coffee rings: the second one belongs to the mug, and they overlap as an infinity. */
  float rings = max(ring(q, uRingCentreA), ring(q, uRingCentreB)) * uRings.x;
  albedo *= 1.0 - rings * 0.55;
  /* Baked once: a soft shadow from the lamp, cleared with the desk. */
  float s = 1.0;
  if (uShadowTaps > 0.5) {
    if (uShadowTaps > 1.5) {
      vec2 px = vec2(0.0018) * vShadow.w;
      s = textureProj(uShadow, vShadow + vec4(px.x, px.y, 0.0, 0.0));
      s += textureProj(uShadow, vShadow + vec4(-px.x, px.y, 0.0, 0.0));
      s += textureProj(uShadow, vShadow + vec4(px.x, -px.y, 0.0, 0.0));
      s += textureProj(uShadow, vShadow + vec4(-px.x, -px.y, 0.0, 0.0));
      s *= 0.25;
    } else {
      s = textureProj(uShadow, vShadow);
    }
  }
  float radial = smoothstep(0.0, 0.3, uClear * 1.2 - length(q) * 0.8);
  s = mix(s, 1.0, radial);
  vec3 c = albedo * (AMB * uAmbient + l.rgb * max(l.w, 0.0) * s * 1.5);
  /* Varnish: a broad highlight from the lamp, on the top face only. */
  float spec = pow(max(n.y, 0.0), 8.0) * smoothstep(0.55, 0.0, length(q - uLampPos.xz * 0.45));
  c += uLampColor * spec * 0.12 * uLampOn * s * uGloss;
  /* Dawn: light through the slats, in stripes that echo the bars on the old paper. */
  if (uDawn > 0.01) {
    float stripes = smoothstep(0.3, 0.7, sin(q.y * 42.0 + q.x * 7.0) * 0.5 + 0.5);
    vec3 sky = mix(vec3(0.365, 1.0, 0.87), vec3(0.643, 0.545, 1.0), clamp(q.x * 0.9 + 0.5, 0.0, 1.0));
    c += albedo * sky * stripes * uDawn * uDawnStripes * max(n.y, 0.2);
  }
  fragColor = vec4(finish(c, vFog), 1.0);
}`;

const STRIP_V = /* glsl */ `
${V_COMMON}
in vec3 position, aAcross;
in float aSide, aS, aW;
uniform float uFeed, uLine, uLineLen, uJamA, uJamB, uJamK, uFlutter, uWide;
out vec2 vUv;
out vec3 vLampP, vHouse;
out float vFog, vLineMix, vW, vS;
//#pars
void main() {
  vec3 wp = position;
  float s = aS;
  /* Concertina: a zigzag along a stretch of the strip, driven by one uniform. */
  if (uJamK > 0.0 && s > uJamA && s < uJamB) {
    float u = (s - uJamA) / (uJamB - uJamA);
    float env = sin(u * 3.14159);
    wp.z += sin(u * 62.0) * 0.32 * env * uJamK;
    wp.y += (u - 0.5) * (uJamB - uJamA) * 0.7 * uJamK;
  }
  /* Hanging paper moves. Never on the desk, and less as it nears the line. */
  float air = uFlutter * smoothstep(0.1, 1.5, s - uWide);
  wp.z += sin(s * 2.1 + uTime * 0.9) * 0.012 * air;
  wp.x += sin(s * 1.3 + uTime * 0.6) * 0.008 * air * uInline;
  float lineMix = smoothstep(uLine, uLine + uLineLen, s);
  vec3 across = aAcross * aW * aSide;
  wp += across;
  //#world
  gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
  vec3 wn = normalize(cross(aAcross, vec3(0.0, 1.0, 0.0)) + vec3(0.0, 0.25, 0.0));
  vUv = vec2(aSide, s - uFeed);
  vW = aW;
  vS = s;
  vLineMix = lineMix;
  vLampP = wp - uLampOrigin;
  vHouse = buildingLight(wp.y, wn) + vec3(0.04);
  vFog = fogAt(wp) * (1.0 - lineMix);
}`;

const STRIP_F = /* glsl */ `
${F_COMMON}
uniform sampler2D uPrint;
uniform vec3 uLineColor;
uniform float uPrintRange, uPaperGlow;
in vec2 vUv;
in vec3 vLampP, vHouse;
in float vFog, vLineMix, vW, vS;
void main() {
  highp float s = vUv.y;
  float pitch = 0.0254; // Half-inch bars, as on real computer paper.
  float wS = max(fwidth(s), 0.0004);
  float bar = smoothstep(-wS, wS, abs(fract(s / (pitch * 2.0)) - 0.5) * pitch * 2.0 - pitch * 0.5);
  vec3 paper = mix(vec3(0.91, 0.89, 0.855), vec3(0.78, 0.95, 0.86), bar * 0.75);
  /* Tractor holes are painted dark rather than discarded: keeps early-Z working. */
  float edge = (1.0 - abs(vUv.x)) * vW;
  float hole = length(vec2(edge - 0.006, (fract(s / 0.0127) - 0.5) * 0.0127));
  paper = mix(paper, vec3(0.05, 0.05, 0.06), smoothstep(0.0023, 0.0017, hole));
  paper *= 0.86 + 0.14 * smoothstep(0.012, 0.0125, edge);
  /* The printed text rolls past like end credits. */
  float print = step(vS, uPrintRange) * step(0.012, edge);
  if (print > 0.5) {
    vec2 uv = vec2(vUv.x * 0.5 + 0.5, 1.0 - fract(s / 0.96));
    uv.x = (uv.x - 0.5) * (vW / 0.12) + 0.5;
    paper *= texture(uPrint, uv).rgb;
  }
  vec4 l = lampAt(vLampP, vec3(0.0, 0.0, 1.0));
  vec3 lit = mix(l.rgb, vec3(dot(l.rgb, vec3(0.34))), 0.55) * (max(l.w, 0.0) * 0.9 + max(-l.w, 0.0) * 0.9);
  vec3 c = paper * (AMB * 0.1 + vHouse + lit + vec3(1.0, 0.95, 0.86) * uPaperGlow * step(vS, uPrintRange + 0.6));
  c = mix(c, uLineColor, vLineMix);
  fragColor = vec4(finish(c, vFog), 1.0);
}`;

const GLOW_V = /* glsl */ `
${V_COMMON}
in vec3 position, normal;
in vec2 uv;
#ifdef INSTANCED
in vec3 iPos, iScale, iTint;
in vec4 iQuat;
in float iSeed;
#endif
out vec2 vUv;
out vec3 vTint, vN, vV;
out float vFog, vPower;
//#pars
void main() {
  vec3 p = position, n = normal, tint = vec3(1.0);
  float seed = 0.0;
#ifdef INSTANCED
  seed = iSeed;
  tint = iTint;
  p *= iScale;
#endif
  //#local
#ifdef INSTANCED
#ifdef BILLBOARD
  p = iPos + mat3(inverse(viewMatrix)) * p;
#else
  p = qrot(iQuat, p) + iPos;
  n = qrot(iQuat, n);
#endif
#endif
  vec3 wp = (modelMatrix * vec4(p, 1.0)).xyz;
#if defined(BILLBOARD) && !defined(INSTANCED)
  wp = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz + mat3(inverse(viewMatrix)) * p;
#endif
  vec3 wn = normalize(mat3(modelMatrix) * n);
  //#world
  gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
  vUv = uv;
  vTint = tint;
  vN = wn;
  vV = cameraPosition - wp;
  vFog = fogAt(wp);
  vPower = mix(1.0, powerAt(wp.y), uHouse);
}`;

const GLOW_F = /* glsl */ `
${F_COMMON}
uniform vec3 uColor;
uniform float uAlpha, uShape, uRadius;
uniform sampler2D uMap;
in vec2 vUv;
in vec3 vTint, vN, vV;
in float vFog, vPower;
//#fpars
void main() {
  float a = 1.0;
  vec2 q = vUv * 2.0 - 1.0;
  if (uShape < 0.5) {
    /* Soft card, used for every bulb and halo. */
    a = max(1.0 - dot(q, q), 0.0);
    a *= a;
  } else if (uShape < 1.5) {
    /* Beam: fades along its length, soft across its width. */
    a = (1.0 - vUv.y) * smoothstep(1.0, 0.1, abs(q.x));
  } else if (uShape < 2.5) {
    /* Ripple: a ring that travels out. */
    float r = length(q);
    a = smoothstep(0.02, 0.0, abs(r - uRadius)) * (1.0 - r);
  } else if (uShape < 3.5) {
    /* Glass tube: nearly nothing head-on, bright at the rim. */
    float f = 1.0 - abs(dot(normalize(vN), normalize(vV)));
    a = f * f * f;
  } else if (uShape < 4.5) {
    a = texture(uMap, vUv).a;
  } else {
    /* Plain quad, for hairlines and slits. */
    a = 1.0;
  }
  //#frag
#ifdef NOFOG
  vec3 c = uColor * vTint * a * uAlpha * vPower;
#else
  vec3 c = uColor * vTint * a * uAlpha * vPower * (1.0 - clamp(vFog, 0.0, 1.0));
#endif
  fragColor = vec4(c, 1.0);
}`;

const WIRE_V = /* glsl */ `
${V_COMMON}
in vec3 position;
out float vFog;
//#pars
void main() {
  vec3 p = position;
  //#local
  vec3 wp = (modelMatrix * vec4(p, 1.0)).xyz;
  gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
  vFog = fogAt(wp);
}`;

const WIRE_F = /* glsl */ `
${F_COMMON}
uniform vec3 uColor;
uniform float uAlpha;
in float vFog;
void main() {
  fragColor = vec4(uColor * uAlpha * (1.0 - clamp(vFog, 0.0, 1.0)), 1.0);
}`;

function splice(source, deform = {}) {
  return source
    .replace("//#pars", deform.pars ?? "")
    .replace("//#fpars", deform.fpars ?? "")
    .replace("//#local", deform.local ?? "")
    .replace("//#world", deform.world ?? "")
    .replace("//#frag", deform.frag ?? "");
}

/* --------------------------------------------------------------------------
   Generated textures
   -------------------------------------------------------------------------- */

function canvasTexture(canvas, { mips = true, repeat = false } = {}) {
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = NoColorSpace;
  texture.generateMipmaps = mips;
  texture.minFilter = mips ? LinearMipmapLinearFilter : LinearFilter;
  texture.magFilter = LinearFilter;
  if (repeat) {
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
  }
  return texture;
}
export { canvasTexture };

/* Two matcaps side by side, graphite and brass, lit softly from above. */
function makeMatcap() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size * 2;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const paint = (x, stops, spec) => {
    const gradient = ctx.createRadialGradient(x + size * 0.42, size * 0.3, size * 0.02, x + size * 0.5, size * 0.5, size * 0.72);
    stops.forEach(([at, color]) => gradient.addColorStop(at, color));
    ctx.fillStyle = gradient;
    ctx.fillRect(x, 0, size, size);
    const highlight = ctx.createRadialGradient(x + size * 0.38, size * 0.24, 0, x + size * 0.38, size * 0.24, size * 0.26);
    highlight.addColorStop(0, spec);
    highlight.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = highlight;
    ctx.fillRect(x, 0, size, size);
  };
  paint(0, [[0, "#bcbcc0"], [0.5, "#8c8d92"], [0.85, "#55565c"], [1, "#35363c"]], "rgba(255,255,255,.18)");
  paint(size, [[0, "#f6d58c"], [0.45, "#c9963f"], [0.8, "#6e4a1c"], [1, "#2c1c0a"]], "rgba(255,244,214,.75)");
  return canvasTexture(canvas, { mips: false });
}

/* --------------------------------------------------------------------------
   Factories
   -------------------------------------------------------------------------- */

export function createPrograms(shared) {
  const matcap = makeMatcap();

  const material = (name, vertexShader, fragmentShader, uniforms, options = {}) => {
    const { deform, defines, ...state } = options;
    const instance = new RawShaderMaterial({
      name,
      glslVersion: GLSL3,
      vertexShader: splice(vertexShader, deform),
      fragmentShader: splice(fragmentShader, deform),
      defines: defines ?? {},
      uniforms: { ...shared, ...uniforms, ...(deform?.uniforms ?? {}) },
      ...state,
    });
    return instance;
  };

  return {
    matcap,

    solid(options = {}) {
      return material("solid", SOLID_V, SOLID_F, {
        uMatcap: { value: matcap },
        uEmit: { value: options.emit ?? [0, 0, 0] },
        uAmbient: { value: options.ambient ?? 0.06 },
        uHouse: { value: options.house ?? 1 },
      }, omit(options, ["emit", "ambient", "house"]));
    },

    paper(options = {}) {
      return material("paper", PAPER_V, PAPER_F, {
        uAtlas: options.atlas ?? shared.uAtlas,
        uCell: { value: options.cell ?? [0, 0, 1, 1] },
        uAmbient: { value: options.ambient ?? 0.07 },
        uHouse: { value: options.house ?? 1 },
        uLitBoost: { value: options.boost ?? 1 },
      }, { side: DoubleSide, ...omit(options, ["atlas", "cell", "ambient", "house", "boost"]) });
    },

    wood(options = {}) {
      return material("wood", WOOD_V, WOOD_F, {
        uHouse: { value: 0 },
        ...options.uniforms,
      }, omit(options, ["uniforms"]));
    },

    strip(options = {}) {
      return material("strip", STRIP_V, STRIP_F, { uHouse: { value: 1 }, ...options.uniforms }, omit(options, ["uniforms"]));
    },

    glow(options = {}) {
      return material("glow", GLOW_V, GLOW_F, {
        uColor: { value: options.color ?? [1, 1, 1] },
        uAlpha: { value: options.alpha ?? 1 },
        uShape: { value: options.shape ?? 0 },
        uRadius: { value: 0 },
        uMap: { value: options.map ?? matcap },
        uHouse: { value: options.house ?? 0 },
      }, {
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        side: DoubleSide,
        ...omit(options, ["color", "alpha", "shape", "map", "house"]),
      });
    },

    wire(options = {}) {
      return material("wire", WIRE_V, WIRE_F, {
        uColor: { value: options.color ?? [0.365, 1, 0.87] },
        uAlpha: { value: options.alpha ?? 1 },
        uHouse: { value: 0 },
      }, { transparent: true, depthWrite: false, blending: AdditiveBlending, ...omit(options, ["color", "alpha"]) });
    },

    /* Opaque blend for things that fade via uAlpha without additive light. */
    normalBlending: NormalBlending,
  };
}

function omit(source, keys) {
  const out = {};
  for (const key of Object.keys(source)) {
    if (!keys.includes(key)) {
      out[key] = source[key];
    }
  }
  return out;
}
