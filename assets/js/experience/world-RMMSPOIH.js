/* three.js r187 (c) three.js authors, MIT. ENJAZ film. */
import{a as Z,b as Ut,c as $t,d as jt}from"./chunk-MYMBQIGU.js";import{a as bt,b as Vt,c as Xt,d as Jt,e as Qt,f as Kt,g as Zt,h as eo}from"./chunk-E35DVFUS.js";import{c as Se,d as j,f as ge,g as Ce,h as de,i as Ae,j as yt,k as ut,l as st}from"./chunk-X7IJIEOY.js";import{A as Wt,B as Yt,C as be,D as xt,E as Gt,J as ue,N as qt,O as ct,R as _t,a as mt,b as zt,c as vt,d as wt,e as je,f as Pt,g as Tt,h as kt,i as Et,j as Rt,k as ot,l as Ft,m as Ne,n as Ht,o as he,p as Dt,q as It,r as gt,t as Te,u as Bt,v as Oe,w as Nt,x as D,z as Ot}from"./chunk-JHKT6OHR.js";import"./chunk-AEJNSRIJ.js";var St=["pixel-85","pixel-72","drop-film","instances-70","instances-50","shadow-1","extras-off","cadence-30","stills"];function Mt(i,r){return i[Math.min(i.length-1,Math.floor(i.length*r))]}var dt=class{constructor({onChange:r=()=>{}}={}){this.onChange=r,this.buffer=new Float32Array(90),this.sorted=new Float32Array(90),this.count=0,this.head=0,this.rung=-1,this.elapsed=0,this.overBudget=0,this.underBudget=0,this.cooldown=0,this.climbs=0,this.upWait=240,this.locked=!1,this.refreshCap=!1,this.seen=0,this.belowBail=0,this.p50=0,this.p90=0,this.vsync=16.6}target(){return this.refreshCap?33.3:Math.max(this.vsync,16.6)}push(r){if(this.elapsed+=r,this.elapsed<1e3||r>250||(this.buffer[this.head]=r,this.head=(this.head+1)%90,this.count=Math.min(90,this.count+1),this.seen+=1,this.cooldown=Math.max(0,this.cooldown-r),this.count<90/2))return;this.sorted.set(this.buffer);let l=this.sorted.subarray(0,this.count).sort();this.p50=Mt(l,.5),this.p90=Mt(l,.9),this.vsync=Mt(l.subarray(0,Math.max(1,Math.floor(this.count*.2))),.5),this.seen<=60&&Math.abs(this.p50-33.3)/33.3<.04&&this.p90/this.p50<1.08&&(this.refreshCap=!0);let s=this.target();if(this.p90>s*1.25?(this.overBudget+=1,this.underBudget=0):this.p90<s*.75?(this.underBudget+=1,this.overBudget=0):(this.overBudget=0,this.underBudget=0),this.rung===St.length-2&&this.p50>50){if(this.belowBail+=r,this.belowBail>4e3){this.step(1);return}}else this.belowBail=0;this.cooldown>0||(this.overBudget>=45&&this.rung<St.length-2?(this.underBudgetClimbed&&(this.upWait*=2,this.underBudgetClimbed=!1),this.step(1)):this.underBudget>=this.upWait&&this.rung>=0&&!this.locked&&(this.climbs+=1,this.underBudgetClimbed=!0,this.climbs>=2&&(this.locked=!0),this.step(-1)))}step(r){this.rung+=r,this.overBudget=0,this.underBudget=0,this.cooldown=1500,this.count=0,this.onChange(this.rung,St[this.rung]??"full")}};var to=i=>{let r=document.createElement("div");r.style.position="fixed",r.style.top="0",r.style.width="0",r.style.visibility="hidden",r.style.height=`100${i}`,document.body.appendChild(r);let l=r.getBoundingClientRect().height;return r.remove(),l},nt=i=>parseFloat(i)||0;function oo(){let i=to("svh"),r=to("lvh"),l=document.documentElement.clientWidth,s=r,d=window.scrollY,h=document.querySelector("[data-nav]"),u=h?h.getBoundingClientRect().height:0,g=document.documentElement.dir==="rtl"?-1:1,c=document.documentElement.scrollHeight,p={};for(let f of document.querySelectorAll("[data-shot]")){let m=f.dataset.shot,b=f.getBoundingClientRect(),x=b.top+d,I=f.querySelector(":scope > .shot"),L={id:m,top:x,height:b.height,caption:null,pinStart:x,pinEnd:x};if(I){let C=I.getBoundingClientRect(),q=getComputedStyle(f),R=getComputedStyle(I),G=nt(q.paddingBlockEnd);if(m==="hero"){let B=nt(R.insetBlockStart),se=nt(R.marginBlockEnd),U=nt(q.paddingBlockStart);L.pinStart=0,L.pinEnd=Math.max(0,b.height-U-C.height-se),L.caption={x:C.left,y:B,w:C.width,h:C.height}}else{let B=nt(R.insetBlockEnd);L.pinStart=x+C.height+B-i,L.pinEnd=L.pinStart+Math.max(0,b.height-G-C.height),L.caption={x:C.left,y:i-B-C.height,w:C.width,h:C.height},L.pin=B,L.gap=G}}p[m]=L}return{W:l,H:s,svh:i,lvh:r,navH:u,docH:c,dir:g,portrait:s>=l,shots:p}}function so(i){let r=window.matchMedia("(pointer: coarse)").matches,l=document.documentElement.clientWidth,s=document.documentElement.scrollHeight,d=0,h=()=>{window.clearTimeout(d),d=window.setTimeout(i,160)},u=new ResizeObserver(()=>{let g=document.documentElement.clientWidth,c=document.documentElement.scrollHeight;if(g===l&&c===s)return;let p=g===l;l=g,s=c,r&&p&&Math.abs(c-s)<200||h()});return u.observe(document.documentElement),document.fonts?.ready.then(h),document.fonts?.addEventListener?.("loadingdone",h),()=>u.disconnect()}var Xe=`
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
`,Je=`
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
`,go=`
${Xe}
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
}`,xo=`
${Je}
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
}`,yo=`
${Xe}
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
}`,bo=`
${Je}
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
}`,So=`
${Xe}
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
}`,Mo=`
${Je}
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
}`,Lo=`
${Xe}
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
}`,Co=`
${Je}
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
}`,Ao=`
${Xe}
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
}`,zo=`
${Je}
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
}`,Po=`
${Xe}
in vec3 position;
out float vFog;
//#pars
void main() {
  vec3 p = position;
  //#local
  vec3 wp = (modelMatrix * vec4(p, 1.0)).xyz;
  gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
  vFog = fogAt(wp);
}`,To=`
${Je}
uniform vec3 uColor;
uniform float uAlpha;
in float vFog;
void main() {
  fragColor = vec4(uColor * uAlpha * (1.0 - clamp(vFog, 0.0, 1.0)), 1.0);
}`;function no(i,r={}){return i.replace("//#pars",r.pars??"").replace("//#fpars",r.fpars??"").replace("//#local",r.local??"").replace("//#world",r.world??"").replace("//#frag",r.frag??"")}function We(i,{mips:r=!0,repeat:l=!1}={}){let s=new Wt(i);return s.colorSpace=kt,s.generateMipmaps=r,s.minFilter=r?Pt:je,s.magFilter=je,l&&(s.wrapS=wt,s.wrapT=wt),s}function ko(){let r=document.createElement("canvas");r.width=256*2,r.height=256;let l=r.getContext("2d"),s=(d,h,u)=>{let g=l.createRadialGradient(d+107.52,76.8,5.12,d+128,128,184.32);h.forEach(([p,f])=>g.addColorStop(p,f)),l.fillStyle=g,l.fillRect(d,0,256,256);let c=l.createRadialGradient(d+256*.38,256*.24,0,d+256*.38,256*.24,256*.26);c.addColorStop(0,u),c.addColorStop(1,"rgba(255,255,255,0)"),l.fillStyle=c,l.fillRect(d,0,256,256)};return s(0,[[0,"#bcbcc0"],[.5,"#8c8d92"],[.85,"#55565c"],[1,"#35363c"]],"rgba(255,255,255,.18)"),s(256,[[0,"#f6d58c"],[.45,"#c9963f"],[.8,"#6e4a1c"],[1,"#2c1c0a"]],"rgba(255,244,214,.75)"),We(r,{mips:!1})}function ao(i){let r=ko(),l=(s,d,h,u,g={})=>{let{deform:c,defines:p,...f}=g;return new qt({name:s,glslVersion:Ft,vertexShader:no(d,c),fragmentShader:no(h,c),defines:p??{},uniforms:{...i,...u,...c?.uniforms??{}},...f})};return{matcap:r,solid(s={}){return l("solid",go,xo,{uMatcap:{value:r},uEmit:{value:s.emit??[0,0,0]},uAmbient:{value:s.ambient??.06},uHouse:{value:s.house??1}},Ve(s,["emit","ambient","house"]))},paper(s={}){return l("paper",yo,bo,{uAtlas:s.atlas??i.uAtlas,uCell:{value:s.cell??[0,0,1,1]},uAmbient:{value:s.ambient??.07},uHouse:{value:s.house??1},uLitBoost:{value:s.boost??1}},{side:mt,...Ve(s,["atlas","cell","ambient","house","boost"])})},wood(s={}){return l("wood",So,Mo,{uHouse:{value:0},...s.uniforms},Ve(s,["uniforms"]))},strip(s={}){return l("strip",Lo,Co,{uHouse:{value:1},...s.uniforms},Ve(s,["uniforms"]))},glow(s={}){return l("glow",Ao,zo,{uColor:{value:s.color??[1,1,1]},uAlpha:{value:s.alpha??1},uShape:{value:s.shape??0},uRadius:{value:0},uMap:{value:s.map??r},uHouse:{value:s.house??0}},{transparent:!0,depthWrite:!1,blending:vt,side:mt,...Ve(s,["color","alpha","shape","map","house"])})},wire(s={}){return l("wire",Po,To,{uColor:{value:s.color??[.365,1,.87]},uAlpha:{value:s.alpha??1},uHouse:{value:0}},{transparent:!0,depthWrite:!1,blending:vt,...Ve(s,["color","alpha"])})},normalBlending:zt}}function Ve(i,r){let l={};for(let s of Object.keys(i))r.includes(s)||(l[s]=i[s]);return l}var ke=4,Eo=["invoice","receipt","quote","ledger","sheet","slip","lines","dossier","carbon","memo","tape","blank"],Ro=i=>{let r=new Set;for(let l of document.querySelectorAll(i)){let s=l.textContent.trim();s&&s!=="\u2726"&&r.add(s)}return[...r]};async function io(i){let r=[document.fonts.load('400 20px "IBM Plex Mono"',"#REF! 0123"),document.fonts.load(i?'700 48px "Noto Kufi Arabic"':'700 48px "Space Grotesk"',i?"\u0625\u0646\u062C\u0627\u0632":"ENJAZ")];await Promise.race([Promise.allSettled(r),new Promise(l=>setTimeout(l,1500))])}function ro({q:i,dir:r}){let l=r<0,s=document.querySelector("main"),d={};try{d=JSON.parse(s?.dataset.atlas??"{}")}catch{d={}}let h=Ro(".ticker__track span"),u=[];try{u=JSON.parse(document.querySelector("[data-typewriter]")?.dataset.typewriter??"[]")}catch{u=[]}let g=l?'"Noto Kufi Arabic", system-ui':'"Space Grotesk", system-ui',c='"IBM Plex Mono", monospace',p=new Intl.NumberFormat(l?"ar-EG":"en-US",{useGrouping:!1}),f=i.atlas,m=document.createElement("canvas");m.width=f,m.height=f;let b=m.getContext("2d"),x=f/ke;b.fillStyle="#fff",b.fillRect(0,0,f,f);let I="#23252e",L="#9aa0ad",C=(t,y)=>{let Y=t%ke,A=Math.floor(t/ke);b.save(),b.beginPath(),b.rect(Y*x,A*x,x,x),b.clip(),b.translate(Y*x,A*x),b.scale(x/100,x/134),b.direction=l?"rtl":"ltr",b.textBaseline="alphabetic",y(b),b.restore()},q=t=>l?100-t:t,R=(t,y,Y,A=12)=>{t.fillStyle=I,t.font=`700 ${A}px ${g}`,t.textAlign="start",t.fillText(y,q(8),Y)},G=(t,y,Y=8,A=92,X=L,E=.7)=>{t.fillStyle=X,t.fillRect(Y,y,A-Y,E)},B=(t,y,Y,A,X=0)=>{for(let E=0;E<Y;E+=1){let J=34+(E*37+X)%40;t.fillStyle=E%3===0?I:L,t.fillRect(l?92-J:8,y+E*A,J,1.4),t.fillStyle=L,t.fillRect(l?8:80,y+E*A,12,1.4)}};C(0,t=>{R(t,d.invoice??"",20,14),G(t,26),B(t,34,9,7),G(t,104,8,92,I,1),t.fillStyle=I,t.font=`600 9px ${c}`,t.textAlign=l?"left":"right",t.fillText(p.format(4820),l?8:92,116)}),C(1,t=>{R(t,d.receipt??"",18,12),G(t,24),B(t,32,7,6,11),t.fillStyle=I,t.fillRect(30,100,40,12)}),C(2,t=>{R(t,d.quote??"",22,15),G(t,28),B(t,38,6,8,23),t.save(),t.translate(68,104),t.rotate(-.26),t.strokeStyle="#5e4bd8",t.lineWidth=2,t.strokeRect(-23,-9,46,18),t.fillStyle="#5e4bd8",t.font=`700 10px ${g}`,t.textAlign="center",t.fillText(d.paid??"",0,4),t.restore()});let se=(t,y)=>{let Y=l?8:16;t.fillStyle="#e6f6ee";for(let A=0;A<18;A+=2)t.fillRect(0,6+A*7,100,7);t.strokeStyle="#a9b7ae",t.lineWidth=.4;for(let A=0;A<=4;A+=1)t.beginPath(),t.moveTo(Y+A*19,0),t.lineTo(Y+A*19,134),t.stroke();t.font=`400 4.8px ${c}`,t.textAlign="center";for(let A=0;A<18;A+=1){t.fillStyle=L,t.fillText(p.format(A+1),l?96:8,11.5+A*7);for(let X=0;X<4;X+=1){let E=(A*7+X*13)%23,J=p.format(100+E*317);y&&E===4?(J="#REF!",t.fillStyle="#c2352b"):(y&&E===9&&(J="#####"),t.fillStyle=I),t.fillText(J,Y+X*19+9.5,11.5+A*7)}}};C(3,t=>{se(t,!1),t.fillStyle="rgba(255,255,255,.92)",t.fillRect(0,0,100,16),R(t,d.ledger??"",12,10)}),C(4,t=>se(t,!0)),C(5,t=>{t.fillStyle="#c2352b",t.fillRect(8,8,84,7),t.fillStyle=I,t.font=`600 9px ${c}`,t.textAlign="center";for(let y=0;y<4;y+=1)t.fillText(p.format(1200+y*417),50,40+y*20)}),C(6,t=>{for(let y=0;y<16;y+=1)G(t,12+y*7.4,6,94,"#b7c2d8",.5);B(t,14,7,7.4,5)}),C(7,t=>{t.fillStyle="#fff",t.fillRect(0,0,100,134),t.fillStyle="#f7efd9",t.fillRect(18,18,64,30),R(t,d.ledger??"",38,11),t.fillStyle="#faf6ea",t.fillRect(0,62,100,5)}),C(8,t=>{R(t,d.invoice??"",20,13),B(t,30,12,6.6,3)}),C(9,t=>{B(t,12,16,7,17)}),C(10,t=>{t.fillStyle=I,t.font=`400 7px ${c}`,t.textAlign="center";for(let y=0;y<12;y+=1)t.fillText(p.format(90+y*233),50,12+y*10.5)});let U=We(m);U.anisotropy=4;let F=document.createElement("canvas");F.width=512,F.height=2048;let T=F.getContext("2d");T.fillStyle="#fff",T.fillRect(0,0,512,2048),T.direction=l?"rtl":"ltr",T.textBaseline="middle";let Q=l?468:44;T.textAlign="start";let N=[];h.forEach((t,y)=>{N.push({text:t,big:!0}),u[y%Math.max(1,u.length)]&&N.push({text:u[y%u.length],big:!1})});let k=2048/Math.max(1,N.length);N.forEach((t,y)=>{T.fillStyle=t.big?"#1f2a24":"#3d4c44",T.font=t.big?`700 44px ${g}`:`400 25px ${l?g:c}`,T.fillText(t.text,Q,k*(y+.5),424)});let ee=We(F);return ee.anisotropy=4,{texture:U,printTexture:ee,services:h,phrases:u,words:d,display:g,mono:c,digits:t=>p.format(t),cell(t){let y=Math.max(0,Eo.indexOf(t)),Y=y%ke,A=Math.floor(y/ke);return[Y/ke,1-(A+1)/ke,1/ke,1/ke]},title(t){return document.querySelector(`[data-shot="${t}"] .card__title, [data-shot="${t}"] .step__title`)?.textContent.trim()??""},canvas(t,y,Y,A){let X=document.createElement("canvas");X.width=t,X.height=y;let E=X.getContext("2d");return E.direction=l?"rtl":"ltr",Y(E,t,y),We(X,A)}}}var lo={L:{pixelCap:55e4,draws:28,tris:7e4,sheets:420,sheetSeg:2,stacks:180,dossiers:120,boxes:1400,weather:140,uxGrid:[32,45],shadowSize:1024,shadowTaps:1,atlas:512,dust:60,allReflections:!1,film:!1},M:{pixelCap:13e5,draws:45,tris:22e4,sheets:1100,sheetSeg:3,stacks:360,dossiers:240,boxes:3e3,weather:320,uxGrid:[48,68],shadowSize:1024,shadowTaps:4,atlas:1024,dust:150,allReflections:!0,film:!1},H:{pixelCap:28e5,draws:70,tris:6e5,sheets:2400,sheetSeg:4,stacks:720,dossiers:480,boxes:6e3,weather:700,uxGrid:[64,90],shadowSize:2048,shadowTaps:8,atlas:2048,dust:300,allReflections:!0,film:!0}};var at={clip:[.3,40],fog:26},Ye=[{id:"hero",act:1,set:"desk",subject:{radius:.62,center:[0,.1,-.4]},pose:{lens:24,elevation:-15,portrait:{elevation:-28},pushIn:.15,...at},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:30},{id:"drop",act:1,set:"desk",idleHz:0,budget:{draws:12,tris:{L:3e4,M:8e4,H:2e5}},authored(i,r){let l=r.W/r.H,s=r.portrait?20:15.6,d=Math.tan(s*Math.PI/360),u=.24/(r.portrait?.92:.36)/(2*d*l),g=Z.floorY;return[{t:.18,position:[0,-.03,u],elevation:-1,lens:20,clip:[.1,30],fog:26},{t:.48,position:[0,g*.72,u*.96],elevation:-2,lens:20,clip:[.1,30],fog:26},{t:.64,position:[0,.28,.5],elevation:-84,lens:36,clip:[.05,20],fog:20},{t:.84,position:[0,g-.25,.1],elevation:-90,lens:40,clip:[.04,20],fog:16},{t:.93,position:[0,Z.slabBottom+.1,.5],elevation:-90,lens:24,clip:[.05,60],fog:40}]}},{id:"svc.head",act:2,set:"archive",pose:{lens:[24,62],elevation:-90,clip:[.2,90],fog:72},budget:{draws:8,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0,holdKnots:()=>[{t:0,position:[0,Z.slabBottom-.6,1.5],lens:24},{t:1,position:[0,Z.slabBottom-5.2,1.5],lens:62}]},{id:"svc.web",act:2,set:"archive",floor:"first",subject:{radius:1.3,center:[0,0,0]},pose:{lens:32,bearing:12,elevation:-6,drift:[0,-.15,-.5],clip:[.3,80],fog:62},budget:{draws:11,tris:{L:25e3,M:7e4,H:16e4}},idleHz:0,stripYaw:0},{id:"svc.apps",act:2,set:"archive",floor:"locked",subject:{radius:1.1,center:[0,0,0]},pose:{lens:32,bearing:[-12,13],elevation:-4,clip:[.3,80],fog:62},budget:{draws:9,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"svc.api",act:2,set:"archive",floor:"locked",subject:{radius:1.4,center:[0,0,0]},pose:{lens:32,bearing:-18,elevation:14,drift:[0,-.2,-.3],clip:[.3,80],fog:60},budget:{draws:14,tris:{L:3e4,M:8e4,H:18e4}},idleHz:0},{id:"svc.rescue",act:2,set:"archive",floor:"locked",subject:{radius:1.2,center:[0,0,0]},pose:{lens:30,bearing:10,elevation:-8,roll:[0,7],clip:[.3,80],fog:58},budget:{draws:12,tris:{L:24e3,M:7e4,H:16e4}},idleHz:0},{id:"svc.ux",act:2,set:"archive",floor:"locked",subject:{radius:1.5,center:[0,0,0]},pose:{lens:28,elevation:0,clip:[.3,80],fog:56},budget:{draws:8,tris:{L:24e3,M:6e4,H:14e4}},idleHz:0},{id:"svc.auto",act:2,set:"archive",floor:"locked",subject:{radius:1.4,center:[0,0,0]},pose:{lens:30,bearing:90,elevation:-3,clip:[.3,80],fog:54},budget:{draws:9,tris:{L:22e3,M:6e4,H:14e4}},idleHz:30},{id:"process.head",act:3,set:"archive",floor:{clear:9},subject:{radius:4,center:[0,0,0]},pose:{lens:50,elevation:-90,shift:[0,0,1.1],clip:[.05,90],fog:70},budget:{draws:10,tris:{L:26e3,M:7e4,H:16e4}},idleHz:0,exitKnots(i,r,l){let s=l.floorY;return[{t:.55,position:[.16,s+3.2,.18],elevation:-90,lens:44,clip:[.05,70],fog:60},{t:.74,position:[.16,s-.9,.12],elevation:-90,lens:44,clip:[.05,70],fog:60}]}},{id:"step.talk",act:3,set:"archive",floor:{clear:5},subject:{radius:1,center:[0,0,0]},pose:{lens:28,bearing:8,elevation:-10,clip:[.2,70],fog:42},budget:{draws:10,tris:{L:25e3,M:7e4,H:16e4}},idleHz:0},{id:"step.scope",act:3,set:"archive",floor:"locked",subject:{radius:1,center:[0,0,0]},pose:{lens:28,bearing:-6,elevation:-24,clip:[.2,70],fog:40},budget:{draws:8,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"step.build",act:3,set:"archive",floor:"locked",subject:{radius:1,center:[0,0,0]},pose:{lens:28,bearing:[20,-10],elevation:-8,clip:[.2,70],fog:40},budget:{draws:9,tris:{L:26e3,M:7e4,H:16e4}},idleHz:0},{id:"step.ship",act:3,set:"archive",floor:"locked",subject:{radius:.9,center:[0,0,0]},pose:{lens:28,elevation:[-12,-74],clip:[.2,70],fog:40},budget:{draws:7,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"fall",act:3,set:"none",idleHz:0,budget:{draws:4,tris:{L:3e3,M:6e3,H:12e3}},authored(i){let r=i["step.ship"],l=i["why.q"],s=r.floorY-2,d=l.floorY+l.d+1.6;return[{t:.2,position:[.2,s,.2],elevation:-90,lens:70,clip:[.05,60],fog:44},{t:.86,position:[.05,d+1.2,.06],elevation:-90,lens:70,clip:[.05,40],fog:34}]}},{id:"why.q",act:4,set:"desk",desk:!0,floor:{clear:26},subject:{radius:.85,center:[0,0,-.4]},pose:{lens:40,elevation:-90,...at},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:30},{id:"why.list",act:4,set:"desk",desk:!0,subject:{radius:.8,center:[0,0,-.4]},pose:{lens:40,elevation:-90,...at},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:0},{id:"why.stats",act:4,set:"desk",desk:!0,subject:{radius:.7,center:[0,0,-.4]},pose:{lens:36,elevation:-70,...at},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0},{id:"cta",act:4,set:"desk",desk:!0,subject:{radius:.55,center:[0,0,-.4]},pose:{lens:40,elevation:-90,clip:[.02,12],fog:26},solve(i,r){let{W:l,H:s,portrait:d,svh:h}=r,u=i.shot.caption,g=i.fov*Math.PI/180,c=Math.tan(g/2)*(l/s),p=.072,f=.148;if(d)i.d=.0775*.965/(2*c),i.ox=0,i.oy=0;else{let m=Math.max((u.w+32)/f,(u.h+32)/p);i.d=l/m/(2*c),i.ox=l/2-(u.x+u.w/2),i.oy=s/2-(u.y+u.h/2)}},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0},{id:"coda",act:4,set:"desk",desk:!0,subject:{radius:.62,center:[0,.1,-.4]},pose:{lens:24,elevation:-15,...at},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0}],co={hero:()=>import("./chunk-ZMPIHQLL.js"),drop:()=>import("./chunk-E3XYQIT3.js"),"svc.head":()=>import("./chunk-SU3OKXW5.js"),"svc.web":()=>import("./chunk-RA7MQPGB.js"),"svc.apps":()=>import("./chunk-J7NGB3KP.js"),"svc.api":()=>import("./chunk-G6HYXMVT.js"),"svc.rescue":()=>import("./chunk-K5OLA4F5.js"),"svc.ux":()=>import("./chunk-EJCOHC65.js"),"svc.auto":()=>import("./chunk-6NKUVUUW.js"),"process.head":()=>import("./chunk-5I6ZEH2K.js"),"step.talk":()=>import("./chunk-DVLGH6BM.js"),"step.scope":()=>import("./chunk-KSX7X4OQ.js"),"step.build":()=>import("./chunk-YDW25PWT.js"),"step.ship":()=>import("./chunk-PFX4PKBS.js"),fall:()=>import("./chunk-2FFFNAGG.js"),"why.q":()=>import("./chunk-27ENIP5Z.js"),"why.list":()=>import("./chunk-24CGU6NY.js"),"why.stats":()=>import("./chunk-3TCMZYV7.js"),cta:()=>import("./chunk-X76KV2CF.js"),coda:()=>import("./chunk-NOLPIKUJ.js")};var ze=Z.archiveHalf,Ge=Z.galleryH,ne=11.4;function uo(i,r){return i.canvas(512,512,s=>{let d=Ae(`shelf-${r}`);s.fillStyle=r===0?"#2a2520":"#0a0c11",s.fillRect(0,0,512,512);let h=6,u=512/h;for(let g=0;g<h;g+=1){let c=0;for(;c<512;){let p=8+d()*22,f=u*(.74+d()*.22);if(r===0){let m=d(),b=.5+d()*.5,x=m<.6?[176,136,86]:m<.8?[214,202,170]:m<.92?[96,110,128]:[150,70,60];s.fillStyle=`rgb(${x[0]*b},${x[1]*b},${x[2]*b})`,s.save(),s.translate(c+p/2,u*(g+1)-4),s.rotate(d()>.86?(d()-.5)*.5:0),s.fillRect(-p/2,-f,p-1.5,f),s.fillStyle="rgba(255,255,255,.35)",s.fillRect(-p/2+p*.25,-f*.82,p*.4,f*.2),s.restore()}else{let m=12+d()*10;s.fillStyle=`rgb(${m},${m+2},${m+8})`,s.fillRect(c,u*(g+1)-f-4,p-2,f),d()>.72&&(s.fillStyle=d()>.8?"#a48bff":"#5dffde",s.fillRect(c+p/2-1,u*(g+1)-f,1.5,f-8))}c+=p}s.fillStyle=r===0?"#141210":"#1c2027",s.fillRect(0,u*(g+1)-4,512,4)}},{repeat:!0})}function po({programs:i,text:r,q:l,dir:s}){let d=new Te;d.name="archive";let h={uTurn:{value:0},uOrderY:{value:new Ne(Z.slabBottom,-60)},uGalleryH:{value:Ge}},u=40,g=new ue(ze*2,Ge*u,4,u),c=g.attributes.uv;for(let M=0;M<c.count;M+=1)c.setXY(M,c.getX(M)*8,c.getY(M)*u);let p=[[0,0,-ze,0],[0,0,ze,Math.PI],[-ze,0,0,Math.PI/2],[ze,0,0,-Math.PI/2]].map(([M,S,W,w])=>{let _=g.clone();return _.rotateY(w),_.translate(M,S,W),_}),f=ge(p.map(M=>M.toNonIndexed())),m=uo(r,0);m.anisotropy=8;let b=uo(r,1);b.anisotropy=8;let x=i.paper({atlas:{value:m},ambient:.03,boost:.62,deform:{pars:"uniform float uTurn, uGalleryH; out float vTurn, vLit;",fpars:"uniform sampler2D uShelf2; in float vTurn, vLit;",world:`
        wp.y += floor(uCamY / uGalleryH) * uGalleryH;
        {
          float along = abs(wn.z) > 0.5 ? wp.x : wp.z;
          vTurn = smoothstep(0.0, 1.0, uTurn * 2.2 - (along * uInline / 14.0 * 0.5 + 0.5) - 0.1);
        }
        vLit = uTurn;`,frag:"c = mix(c, texture(uShelf2, vUv).rgb * (vec3(0.42) + vHouse * 0.7), vTurn);",uniforms:{uTurn:h.uTurn,uGalleryH:h.uGalleryH,uShelf2:{value:b}}}}),I=new D(f,x);I.frustumCulled=!1,d.add(I);let L=[.42,.41,.4],C=M=>`{
    float period = ${M.toFixed(2)};
    float d = mod(wp.y - uCamY + period * 0.5, period) - period * 0.5;
    wp.y = uCamY + d;
  }`,q=Se(new be(1,1,1)),R=18,G=[];for(let M=0;M<R;M+=1){let S=-M*Ge;for(let[W,w]of[[1,0],[-1,0],[0,1],[0,-1]]){let _=ne*2+6,H=(ze+ne)/2;G.push({pos:[W*H,S-.1,w*H],scale:W?[ze-ne,.2,_]:[_,.2,ze-ne],tint:L}),G.push({pos:[W*ne,S+.95,w*ne],scale:W?[.06,.06,_]:[_,.06,.06],tint:[.55,.52,.48]}),G.push({pos:[W*ne,S+.55,w*ne],scale:W?[.03,.03,_]:[_,.03,.03],tint:[.4,.38,.36]})}}let B=new D(de(q,G.length,(M,S)=>{let W=G[M];S.pos=W.pos,S.scale=W.scale,S.tint=W.tint}),i.solid({ambient:.05,defines:{INSTANCED:1},deform:{world:C(Ge*R)}}));B.frustumCulled=!1,d.add(B);let se=[];for(let M of[-1,1])for(let S of[-ne,-ne/3,ne/3,ne])se.push([M*ne,S]),se.push([S,M*ne]);let U=new D(de(Se(new be(.34,1,.34,1,44,1)),se.length,(M,S)=>{S.pos=[se[M][0],0,se[M][1]],S.scale=[1,180,1],S.tint=[.36,.35,.34]}),i.solid({ambient:.05,defines:{INSTANCED:1},deform:{world:"wp.y += uCamY;"}}));U.frustumCulled=!1,d.add(U);let F=Ae("archive"),Q=Math.max(3,Math.round(l.boxes/460))*Ge,N=Se(new be(1,1,.8)),k=N.attributes.normal;for(let M=0;M<k.count;M+=1)k.getZ(M)<-.5&&N.attributes.aColor.setXYZ(M,0,0,0);let ee=ge([N,j(.05,.86,.01,{at:[0,0,-.41],color:[.36,1,.87],mat:2})]),t=l.boxes,y=new D(de(ee,t,(M,S)=>{let W=M%4,w=(F()*2-1)*(ze-1),_=-F()*Q,H=(F()-.5)*.5,ae=ze-.3-F()*2.2,ce=.5+F()*.5,Pe=.55+F()*.4;W===0?(S.pos=[w,_,-ae],Ce(0,0,H,S.quat)):W===1?(S.pos=[w,_,ae],Ce(0,Math.PI,H,S.quat)):W===2?(S.pos=[-ae,_,w],Ce(0,Math.PI/2,H,S.quat)):(S.pos=[ae,_,w],Ce(0,-Math.PI/2,H,S.quat)),S.scale=[ce,Pe,.4];let V=.62+F()*.38,z=F();S.tint=z<.62?[.74*V,.56*V,.33*V]:z<.86?[.86*V,.8*V,.66*V]:z<.95?[.38*V,.44*V,.52*V]:[.6*V,.24*V,.2*V],S.seed=F()}),i.solid({ambient:.05,defines:{INSTANCED:1},deform:{pars:"uniform float uTurn; uniform vec2 uOrderY; out float vBack;",local:`
          /* The turnover: 180 degrees about the file's own vertical axis, in reading direction. */
          float baseAlong = abs(iQuat.y) > 0.3 && abs(iQuat.y) < 0.9 ? iPos.z : iPos.x;
          float inlinePos = baseAlong * uInline / 14.0;
          float flip = smoothstep(0.0, 1.0, uTurn * 2.2 - (inlinePos * 0.5 + 0.5) - seed * 0.2);
          float flipA = flip * 3.14159 * uInline;
          float cf = cos(flipA), sf = sin(flipA);
          p = vec3(p.x * cf + p.z * sf, p.y, -p.x * sf + p.z * cf);
          n = vec3(n.x * cf + n.z * sf, n.y, -n.x * sf + n.z * cf);
          vBack = step(aColor.r + aColor.g + aColor.b, 0.01);
          if (aColor.a > 1.5) { tint = aColor.rgb * flip; }`,world:`
          {
            float d = mod(wp.y - uCamY + ${(Q/2).toFixed(2)}, ${Q.toFixed(2)}) - ${(Q/2).toFixed(2)};
            /* Files shrink into the wall at the edges of the wrap, so they never pop. */
            float edge = smoothstep(${(Q/2).toFixed(2)}, ${(Q*.36).toFixed(2)}, abs(d));
            wp.y = uCamY + d;
            float order = clamp((uOrderY.x - wp.y) / (uOrderY.x - uOrderY.y), 0.0, 1.0);
            if (aColor.a < 1.5) { tint = mix(mix(tint, vec3(0.1, 0.11, 0.13), order * 0.55), vec3(0.075, 0.08, 0.1), vBack); }
            vec3 towardsWall = normalize(vec3(sign(iPos.x) * step(10.0, abs(iPos.x)), 0.0, sign(iPos.z) * step(10.0, abs(iPos.z))) + vec3(0.0001));
            wp += towardsWall * (1.0 - edge) * 2.8;
          }`,uniforms:{uTurn:h.uTurn,uOrderY:h.uOrderY}}}));y.frustumCulled=!1,d.add(y);let Y=new ue(1,1,1,3),A=["ledger","invoice","lines","sheet","memo","receipt"],X=Math.min(180,Math.floor(l.weather*.75)),E=new D(de(Y,X,(M,S)=>{let W=M%4,w=(F()*2-1)*(ne-.5),_=-Math.floor(F()*18)*Ge+.3;S.pos=W===0?[w,_,-ne]:W===1?[w,_,ne]:W===2?[-ne,_,w]:[ne,_,w],Ce(0,W<2?0:Math.PI/2,(F()-.5)*.2,S.quat);let H=.55+F()*.6;S.scale=[H,H*1.42,1],S.cell=r.cell(A[Math.floor(F()*A.length)]);let ae=.75+F()*.25;S.tint=[ae,ae,ae*.95]}),i.paper({ambient:.05,defines:{INSTANCED:1},deform:{world:C(Ge*18)}}));E.frustumCulled=!1,d.add(E);let J=new ue(.34,.46),te=new D(de(J,l.weather,(M,S)=>{S.pos=[(F()*2-1)*10.5,-F()*24,(F()*2-1)*10.5],S.cell=r.cell(A[Math.floor(F()*A.length)]);let W=.78+F()*.22;S.tint=[W,W,W*.95],S.seed=F()}),i.paper({ambient:.08,defines:{INSTANCED:1},deform:{pars:"uniform float uTurn;",local:`{
          float t = uTime * 0.25 + seed * 40.0;
          float ca = cos(t * 1.3), sa = sin(t * 1.3), cb = cos(t), sb = sin(t);
          p = vec3(p.x * ca - p.y * sa, p.x * sa + p.y * ca, p.z);
          p = vec3(p.x, p.y * cb - p.z * sb, p.y * sb + p.z * cb);
          n = vec3(n.x * ca - n.y * sa, n.x * sa + n.y * ca, n.z);
          n = vec3(n.x, n.y * cb - n.z * sb, n.y * sb + n.z * cb);
        }`,world:`{
          float d = mod(wp.y - uCamY - uTime * 0.3 + 12.0, 24.0) - 12.0;
          wp.y = uCamY + d;
          wp.x += sin(uTime * 0.2 + seed * 30.0) * uInline * 0.4;
          float gone = smoothstep(0.1, 0.6, uTurn);
          wp.xz += (wp.xz) * gone * 2.0;
        }`,uniforms:{uTurn:h.uTurn}}}));te.frustumCulled=!1,d.add(te);let oe=t,re=l.weather;return{group:d,u:h,*build(){yield},setRange(M,S){h.uOrderY.value.set(M,S)},setDensity(M){y.geometry.instanceCount=Math.floor(oe*M),te.geometry.instanceCount=Math.floor(re*M)},setWeather(M){te.visible=M,E.visible=M}}}var pt={pars:"in float iClear; uniform float uClear;",world:`
    float clearF = clamp((uClear - iClear - seed * 0.34) / 0.62, 0.0, 1.0);
    if (clearF > 0.0) {
      clearF *= clearF;
      vec3 away = wp - (uLampOrigin + vec3(0.0, 0.0, -0.4));
      away.y = 0.0;
      wp += normalize(away + vec3(0.001)) * clearF * 2.4;
      wp.y += clearF * 0.9 - clearF * clearF * 1.9;
    }`};function Fo(){let l=document.createElement("canvas");l.width=1024,l.height=512;let s=l.getContext("2d");s.fillStyle="#7b4c2b",s.fillRect(0,0,1024,512);let d=Ae("walnut");for(let h=0;h<520;h+=1){let u=d()*512,g=d()>.45;s.strokeStyle=g?`rgba(44,22,10,${.05+d()*.2})`:`rgba(180,120,74,${.03+d()*.1})`,s.lineWidth=.5+d()*2.4,s.beginPath(),s.moveTo(0,u);let c=d()*1.2;for(let p=0;p<=1024;p+=48)u+=(d()-.5)*4*c,s.lineTo(p,u);s.stroke()}for(let h=0;h<3;h+=1){let u=d()*1024,g=d()*512;for(let c=8;c<90;c+=5+d()*5)s.strokeStyle=`rgba(40,20,9,${.1+d()*.09})`,s.lineWidth=.8,s.beginPath(),s.ellipse(u,g,c*3.2,c*.8,0,0,Math.PI*2),s.stroke()}return We(l)}function fo({programs:i,shared:r,text:l,q:s,dir:d}){let h=e=>e*d,u=new Te;u.name="desk";let g={uClear:{value:0},uRing:{value:0},uRingOn:{value:0}},c=new he(h(.27),.62,-.5),p=[h(-.02),-.38],f=[p[0],p[1]],m=new It(s.shadowSize,s.shadowSize,{depthTexture:new Yt(s.shadowSize,s.shadowSize,Tt)});m.depthTexture.compareFunction=Rt,m.depthTexture.minFilter=je,m.depthTexture.magFilter=je;let b=new gt,x={uMap:{value:Fo()},uShadow:{value:m.depthTexture},uClear:g.uClear,uDawnStripes:{value:1},uAmbient:{value:.045},uShadowTaps:{value:s.shadowTaps},uGloss:{value:1},uRings:{value:[1,0,0,0]},uRingCentreA:{value:[h(-.2),-.21,.046]},uRingCentreB:{value:[h(-.112),-.21,.046]},uTint:{value:[1,1,1]},uLampMatrix:{value:b}},I=new D(new be(1.6,.045,.8),i.wood({uniforms:x}));I.position.set(0,-.0225,-.4),u.add(I);let L={...x,uTint:{value:[.34,.31,.28]},uGloss:{value:0},uRings:{value:[0,0,0,0]}},C=.5,q=i.wood({uniforms:L}),R=[[0,-C-2.5,10,5],[0,C+2.5,10,5],[-C-2.5,0,5,C*2],[C+2.5,0,5,C*2]].map(([e,a,n,v])=>{let P=new be(n,.1,v);return P.translate(e,Z.floorY-.05,a),P}),G=new Te;R.forEach(e=>G.add(new D(e,q))),u.add(G);let B=[h(-.52),0,-.56],se=[h(-.156),0,-.21],U=[h(.66),.88,-.95],F=[h(.31),0,-.64],T=[h(.62),0,-.62],Q=[h(.72),.42,-.62],N=[h(.27),.72,-.5],k=[.24,.14,.08],ee=ge([j(.07,.75,.07,{at:[-.74,-.4,-.06],color:k}),j(.07,.75,.07,{at:[.74,-.4,-.06],color:k}),j(.07,.75,.07,{at:[-.74,-.4,-.74],color:k}),j(.07,.75,.07,{at:[.74,-.4,-.74],color:k}),j(1.42,.09,.02,{at:[0,-.1,-.03],color:k}),j(.1,.012,.018,{at:[h(.42),-.1,-.014],color:[.76,.58,.3],mat:1}),j(.1,.012,.018,{at:[h(-.42),-.1,-.014],color:[.76,.58,.3],mat:1}),...eo(U),...Xt(T,Q,N,d),...Zt(se,d),j(.07,.006,.07,{at:[h(-.02),.003,-.7],color:[.25,.25,.27]}),Se(new xt(.002,.003,.17,6),{at:[h(-.02),.09,-.7],color:[.7,.7,.72]})]),t=new D(ee,i.solid({ambient:.17,house:0}));u.add(t);let y=new D(ge([j(12,7,.1,{at:[0,1.6,-1.05],color:[.62,.6,.6]}),j(12,.12,.03,{at:[0,Z.floorY+.06,-.99],color:[.2,.18,.17]}),j(1.62,.04,.04,{at:[h(-.46),1.54,-.97],color:[.55,.52,.5]}),j(1.62,.04,.04,{at:[h(-.46),.5,-.97],color:[.55,.52,.5]}),j(.04,1.08,.04,{at:[h(-1.27),1.02,-.97],color:[.55,.52,.5]}),j(.04,1.08,.04,{at:[h(.35),1.02,-.97],color:[.55,.52,.5]})]),i.solid({ambient:.2,house:0}));u.add(y);let Y=new D(ge(Vt(F,d)),t.material),A=new D(ge(Jt(B)),t.material);u.add(Y,A);let X=new D(Qt(),t.material);X.position.set(B[0],.135,B[2]-.08),u.add(X);let E=new D(Kt([[B[0]-.11*d,.05,B[2]+.03],[B[0]-.17*d,.03,B[2]+.06],[B[0]-.2*d,.012,B[2]+.13],[B[0]-.19*d,.05,B[2]-.03],[B[0]-.13*d,.11,B[2]-.08]],24),t.material);u.add(E);let J=t.material,te=new D(j(.012,.095,.004,{at:[0,.042,0],color:[.1,.1,.1]}),J),oe=new D(j(.007,.14,.004,{at:[0,.064,0],color:[.1,.1,.1]}),J);te.position.set(U[0],U[1],U[2]+.026),oe.position.set(U[0],U[1],U[2]+.03),u.add(te,oe);let re=h(-.46),M=new D(Se(new ue(1.58,1),{at:[re,1.02,-.985],color:[.075,.11,.21],mat:2}),i.solid({house:0,deform:{fpars:"uniform highp float uDawn;",frag:"c = mix(c, mix(vec3(0.365, 1.0, 0.87), vec3(0.643, 0.545, 1.0), clamp((vLampP.x + 0.5) * 0.7, 0.0, 1.0)), uDawn);"}}));u.add(M);let S=j(1.58,.042,.004,{color:[.72,.72,.7]});S.deleteAttribute("uv");let W=new D(de(S,24,(e,a)=>{a.pos=[re,.54+(e+.5)*.0405,-.965]}),i.solid({house:0,ambient:.14,defines:{INSTANCED:1},deform:{local:`{
          float a = mix(0.86, 1.32, uDawn);
          float ca = cos(a), sa = sin(a);
          p = vec3(p.x, p.y * ca - p.z * sa, p.y * sa + p.z * ca);
          n = vec3(n.x, n.y * ca - n.z * sa, n.y * sa + n.z * ca);
        }`}}));W.frustumCulled=!1,u.add(W);let w=Ae("desk"),_=[{x:-.66,z:-.3,h:.34},{x:-.58,z:-.68,h:.44},{x:-.27,z:-.67,h:.27},{x:.66,z:-.22,h:.2},{x:-.36,z:-.28,h:.13},{x:-.14,z:-.7,h:.15},{x:.66,z:-.42,h:.1},{x:-.7,z:-.08,h:.09}],H=[],ae=new Map;for(let e of _){let a=0,n=0,v=0;for(;a<e.h&&H.length<s.stacks;){let P=.01+w()*.022;n+=(w()-.5)*.012,v+=(w()-.5)*.012,H.push({x:e.x+n,y:a+P/2,z:e.z+v,h:P,yaw:(w()-.5)*.34}),a+=P}ae.set(e,{y:a,x:e.x+n,z:e.z+v})}let ce=new be(1,1,1);ce.deleteAttribute("uv");let Pe=Se(ce),V={iClear:1},z=new D(de(Pe,H.length,(e,a)=>{let n=H[e];a.pos=[h(n.x),n.y,n.z],Ce(0,n.yaw,0,a.quat),a.scale=[.21+w()*.03,n.h,.297+w()*.03];let v=.74+w()*.26;a.tint=w()>.86?[v,v*.84,v*.72]:[v,v,v*.95],a.extra.iClear=2},V),i.solid({house:0,ambient:.13,defines:{INSTANCED:1},deform:pt}));z.frustumCulled=!1,u.add(z);let pe=[{x:.5,z:-.14,n:.3},{x:-.5,z:-.2,n:.3},{x:-.3,z:-.5,n:.26}],ie=Se(new be(1,1,1)),Ee=[];for(let e of pe){let a=Math.floor(s.dossiers*e.n*.5),n=0;for(let v=0;v<a&&n<.2;v+=1){let P=.016+w()*.014,$=(w()-.5)*.5,O=.7+w()*.3;Ee.push({x:e.x+(w()-.5)*.02,y:n+P/2,z:e.z+(w()-.5)*.02,yaw:$,sx:.24,sy:P,sz:.33,tint:[.86*O,.7*O,.42*O]}),Ee.push({x:e.x,y:n+P+6e-4,z:e.z,yaw:$,sx:.016,sy:.0015,sz:.335,tint:[.92,.9,.84]}),n+=P}}let le=new D(de(ie,Ee.length,(e,a)=>{let n=Ee[e];a.pos=[h(n.x),n.y,n.z],Ce(0,n.yaw,0,a.quat),a.scale=[n.sx,n.sy,n.sz],a.tint=n.tint,a.extra.iClear=2},{iClear:1}),i.solid({house:0,ambient:.13,defines:{INSTANCED:1},deform:pt}));le.frustumCulled=!1,u.add(le);let Re=new ue(1,1,s.sheetSeg,s.sheetSeg);Re.rotateX(-Math.PI/2);let qe=["invoice","ledger","quote","receipt","lines","sheet","memo","invoice","carbon","slip"],me=[],Qe=Math.min(30,Math.floor(s.sheets*.1));for(let e=0;e<Qe;e+=1){let a=.36+w()*.46,n=w()*Math.PI*2,v=Math.cos(n)*a*1.08,P=-.4+Math.sin(n)*a*.42;me.push({x:v,z:P,y:.0012+w()*.012,yaw:w()*6.28,kind:0,clear:w()>.4?0:1})}for(let[e,a]of ae){let n=Math.floor(s.sheets*.5/_.length*(.5+e.h*2));for(let v=0;v<n;v+=1)me.push({x:a.x+(w()-.5)*.06,z:a.z+(w()-.5)*.06,y:a.y+v*.0015,yaw:(w()-.5)*.7,kind:1,clear:2})}let Ke=Math.min(8,Math.floor(s.sheets*.02));for(let e=0;e<Ke;e+=1){let a=e%2===0?1:-1;me.push({x:a*(.24+w()*.46),z:-.08+w()*.05,y:.002+w()*.004,yaw:(w()-.5)*.3,kind:2,clear:0})}let Ze=Math.max(0,Math.floor(s.sheets*.24));for(let e=0;e<Ze;e+=1){let a=w()*Math.PI*2,n=.7+w()*1.5,v=Math.cos(a)*n*1.2,P=.1+Math.abs(Math.sin(a))*n*.7;Math.hypot(v,P)>.75&&me.push({x:v,z:P,y:Z.floorY+.002+w()*.004,yaw:w()*6.28,kind:0,clear:2})}for(let e=0;e<8;e+=1)me.push({x:-.02+(w()-.5)*.015,z:-.7+(w()-.5)*.015,y:.02+e*.012,yaw:w()*6.28,kind:3,clear:2});let et=i.paper({house:0,ambient:.05,defines:{INSTANCED:1},deform:{pars:`${pt.pars} in float iCurl;`,local:`
        float cx = uv.x - 0.5, cz = uv.y - 0.5;
        p.y += (cx * cx * 0.03 + cz * cz * 0.05) * iCurl;
        /* A sheet by the edge lifts a little in the draught from the printer. */
        p.y += sin(uTime * 2.6 + seed * 37.0) * 0.0012 * max(iCurl - 0.8, 0.0) * (cz + 0.5);
        n.xz -= vec2(cx * 0.06, cz * 0.1) * iCurl;`,world:pt.world}}),ve=new D(de(Re,me.length,(e,a)=>{let n=me[e],v=n.kind===3;a.pos=[h(n.x),n.y,n.z],Ce(0,n.yaw,0,a.quat),a.scale=v?[.08,1,.16]:[.21,1,.297];let P=v?"receipt":qe[Math.floor(w()*qe.length)];a.cell=l.cell(P);let $=.82+w()*.18;a.tint=P==="carbon"?[.98,.72*$,.72*$]:P==="slip"?[.99,.9*$,.62*$]:[$,$,$*.96],a.extra.iClear=n.clear,a.extra.iCurl=n.kind===2?1.6:.5+w()},{iClear:1,iCurl:1}),et);ve.frustumCulled=!1,u.add(ve);let Me=new D(new ue(.34,.34),i.glow({color:[1,.74,.46],alpha:.5,defines:{BILLBOARD:1}}));Me.position.set(c.x,c.y+.03,c.z),Me.frustumCulled=!1,u.add(Me);let Fe=new D(new ue(2.6,1.9),i.glow({color:[1,.66,.36],alpha:.13}));Fe.position.set(h(.34),.42,-.985),Fe.frustumCulled=!1,u.add(Fe);let He=new D(new ue(3.2,2.2),i.glow({color:[.4,.55,.95],alpha:.07}));He.position.set(h(-.46),.95,-.98),He.frustumCulled=!1,u.add(He);let ft=new xt(.05,.54,.86,26,1,!0),De=new D(ft,i.glow({color:[1,.72,.42],alpha:.13,shape:5,deform:{frag:"a = vUv.y * vUv.y; { float f = abs(dot(normalize(vN), normalize(vV))); a *= f * f; }"}}));De.frustumCulled=!1,u.add(De);let it=new ue(.009,.009),ye=new D(de(it,s.dust,(e,a)=>{let n=Math.sqrt(w()),v=w()*Math.PI*2,P=n*.34;a.pos=[c.x+(f[0]-c.x)*n+Math.cos(v)*P,c.y*(1-n)+.04,c.z+(f[1]-c.z)*n+Math.sin(v)*P],a.tint=[1,.82,.6]}),i.glow({alpha:.42,defines:{INSTANCED:1,BILLBOARD:1},deform:{world:"wp += vec3(sin(uTime * 0.21 + seed * 40.0), sin(uTime * 0.17 + seed * 90.0), cos(uTime * 0.19 + seed * 70.0)) * 0.03;"}}));ye.frustumCulled=!1,u.add(ye);let fe=c.clone(),Le=new ct(122,1,.05,2.2),Ie=new he(0,0,-1),we=new he,_e={x:0,y:0,z:0},Be=0,tt=3.2,Ue=new gt().set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.4975,0,0,0,1),rt=ve.geometry.instanceCount,ht=z.geometry.instanceCount,lt=le.geometry.instanceCount,o=e=>{tt=e,te.rotation.z=-(e%12/12)*Math.PI*2,oe.rotation.z=-(e%1)*Math.PI*2};return o(3.2),{group:u,u:g,handset:X,cord:E,setClock:o,lampPos:fe,pool:p,landline:{x:B[0],z:B[2]-.08},*build(){yield},setActPositions(e){_e=e},setAct(e){e===4?u.position.set(_e.x,_e.y,_e.z):u.position.set(0,0,0)},setSpot(e,a){f[0]=e,f[1]=a},resetSpot(){f[0]=p[0],f[1]=p[1]},setRing(e){Be=e},setShadowTaps(e){x.uShadowTaps.value=e},setRoom(e){G.visible=e},setDensity(e){ve.geometry.instanceCount=Math.floor(rt*e),z.geometry.instanceCount=Math.floor(ht*e),le.geometry.instanceCount=Math.floor(lt*e)},setClearedCounts(e){let a=yt(e);ve.visible=a<1,z.visible=a<1,le.visible=a<1},setExtras(e){ye.visible=e,De.visible=e},bakeShadow(e){let a=[I,G,Me,De,ye,M,W,y,Fe,He],n=a.map(K=>K.visible),v=u.position.clone(),P=g.uClear.value,$=u.visible;u.visible=!0,a.forEach(K=>{K.visible=!1}),u.position.set(0,0,0),u.updateMatrixWorld(!0),g.uClear.value=0,r.uLampOrigin.value.set(0,0,0),Le.position.copy(fe),Le.up.copy(Ie),Le.lookAt(h(-.02),0,-.38),Le.updateMatrixWorld(),Le.updateProjectionMatrix();let O=e.getRenderTarget();e.setRenderTarget(m),e.clear(),e.render(u,Le),e.setRenderTarget(O),b.multiplyMatrices(Ue,Le.projectionMatrix).multiply(Le.matrixWorldInverse),a.forEach((K,$e)=>{K.visible=n[$e]}),u.position.copy(v),u.visible=$,u.updateMatrixWorld(!0),g.uClear.value=P},setClear(e){g.uClear.value=e,x.uClear.value=e;let a=(v,P,$)=>{let O=yt((e-P)/.7),K=O*O;v.position.set($*K*2.2*d,K*.5-K*K*1.6,-K*.2),v.rotation.z=-K*1.2*$*d,v.visible=O<1};a(A,1,-1),a(E,1,-1),a(Y,2,1);let n=e>=3;ve.visible=!n,z.visible=!n,le.visible=!n},update(e,a){let n=a%3,v=n<.42||n>.62&&n<1.04?1:0,P=Math.abs(Math.sin(a*37.7))*.006*v*Be;Be>0&&(X.position.y=.135+P,X.rotation.z=Math.sin(a*75)*.012*v*Be);let $=f[0]+(e.pointer===1?e.px*.2:0),O=f[1]+(e.pointer===1?e.py*.12:0);we.set($-fe.x,-fe.y,O-fe.z).normalize(),r.uLampDir.value.copy(we),r.uLampPos.value.copy(fe),r.uLampCone.value.set(.6,.93),De.position.set(fe.x+we.x*.43,fe.y+we.y*.43,fe.z+we.z*.43),De.quaternion.setFromUnitVectors(Ho,we.negate())}}}var Ho=new he(0,1,0);var Do=[.1,.105,.125],Io=[.365,1,.87];function ho({programs:i,text:r,dir:l}){let s=(c,p,f)=>Se(new bt(c,p,f,4,Math.min(f*.45,c*.12)),{color:Do});function d({w:c=.78,h:p=1.6,t:f=.09,emissive:m=1}={}){let b=new Te,x=new D(s(c,f,p),i.solid({ambient:.13,house:1}));b.add(x);let I=new D(ge([j(c*.965,.002,.006,{at:[0,f/2+.001,-p*.482],color:[.7,.72,.76],mat:1}),j(c*.965,.002,.006,{at:[0,f/2+.001,p*.482],color:[.7,.72,.76],mat:1}),j(.006,.002,p*.965,{at:[-c*.482,f/2+.001,0],color:[.7,.72,.76],mat:1}),j(.006,.002,p*.965,{at:[c*.482,f/2+.001,0],color:[.7,.72,.76],mat:1})]),i.solid({ambient:.2,house:0}));b.add(I);let L=new ue(c*.94,p*.96);L.rotateX(-Math.PI/2),L.translate(0,f/2+.003,0);let C=i.paper({atlas:{value:r.texture},cell:[0,0,1,1],house:0,ambient:m,defines:{}}),q=new D(L,C);return b.add(q),b.userData={screen:q,screenMaterial:C,w:c,h:p,t:f},b}function h({w:c=.78,h:p=1.6,t:f=.09,color:m=Io,alpha:b=.9}={}){let x=new Gt(new bt(c,f,p,2,Math.min(f*.45,c*.12)),30);return new Ot(x,i.wire({color:m,alpha:b}))}function u({w:c=.78,h:p=1.6}={}){let f=Ae("phone-board"),m=i.solid({ambient:.14,house:1}),b=new D(s(c,.03,p),m),I=[j(c*.88,.016,p*.9,{color:[.05,.3,.2]}),j(c*.68,.03,p*.42,{at:[0,.02,p*.19],color:[.2,.22,.26]})];for(let F=0;F<30;F+=1){let T=.03+f()*.08,Q=.03+f()*.09;I.push(j(T,.018,Q,{at:[(f()-.5)*c*.74,.016,-p*.28+(f()-.5)*p*.26],color:f()>.7?[.76,.58,.3]:[.1,.1,.12],mat:f()>.7?1:0}))}let L=new D(ge(I),m),C=ge([j(c,.05,.05,{at:[0,0,-p/2+.025],color:[.62,.64,.68],mat:1}),j(c,.05,.05,{at:[0,0,p/2-.025],color:[.62,.64,.68],mat:1}),j(.05,.05,p,{at:[-c/2+.025,0,0],color:[.62,.64,.68],mat:1}),j(.05,.05,p,{at:[c/2-.025,0,0],color:[.62,.64,.68],mat:1})]),q=new D(C,m),R=new ue(c*.94,p*.96);R.rotateX(-Math.PI/2);let G=i.paper({atlas:{value:r.texture},cell:[0,0,1,1],house:0,ambient:1}),B=new D(R,G),se=new be(c*.98,.006,p*.98),U=new D(se,i.glow({color:[.8,.9,1],alpha:.05,shape:5}));return{back:b,board:L,frame:q,display:B,displayMaterial:G,glass:U}}function g(c,p,f,m){return r.canvas(c,p,(b,x,I)=>{if(b.fillStyle="#0b0d13",b.fillRect(0,0,x,I),m){m(b,x,I);return}let L=I/13;for(let C=0;C<f;C+=1){b.fillStyle="rgba(255,255,255,.07)",b.fillRect(x*.06,L*(C+1),x*.88,L*.74),b.fillStyle=C%3===0?"#5dffde":"#a48bff";let q=l<0?x*.78:x*.1;b.fillRect(q,L*(C+1)+L*.16,x*.12,L*.42),b.fillStyle="rgba(232,236,244,.7)",b.fillRect(l<0?x*.28:x*.26,L*(C+1)+L*.28,x*.46,L*.16)}})}return{make:d,wire:h,layers:u,listTexture:g,instances:de}}var xe=4200,mo=.12,Bo=.6,No=.03;function vo({programs:i,shared:r,printTexture:l,dir:s}){let d=new Oe(new Float32Array(xe*2*3),3).setUsage(ot),h=new Oe(new Float32Array(xe*2*3),3).setUsage(ot),u=new Oe(new Float32Array(xe*2),1),g=new Oe(new Float32Array(xe*2),1).setUsage(ot),c=new Oe(new Float32Array(xe*2),1).setUsage(ot),p=new Uint32Array((xe-1)*6);for(let N=0;N<xe;N+=1)if(u.array[N*2]=-1,u.array[N*2+1]=1,N<xe-1){let k=N*2;p.set([k,k+1,k+2,k+1,k+3,k+2],N*6)}let f=new Nt;f.setAttribute("position",d),f.setAttribute("aAcross",h),f.setAttribute("aSide",u),f.setAttribute("aS",g),f.setAttribute("aW",c),f.setIndex(new Oe(p,1));let m={uFeed:{value:0},uLine:{value:1e6},uLineLen:{value:4},uJamA:{value:0},uJamB:{value:0},uJamK:{value:0},uFlutter:{value:1},uWide:{value:1e6},uPrint:{value:l},uPrintRange:{value:0},uPaperGlow:{value:.22},uLineColor:{value:[.365,1,.87]}},b=i.strip({uniforms:m,side:2}),x=new D(f,b);x.frustumCulled=!1;let I=new D(f,i.glow({color:[.365,1,.87],alpha:.5,shape:5,house:0,deform:{pars:"in vec3 aAcross; in float aSide, aS, aW; uniform float uLine, uLineLen; out float vSide, vAlive;",fpars:"in float vSide, vAlive;",local:"p += aAcross * aSide * max(aW * 5.0, 0.16);",world:"vSide = aSide; vAlive = smoothstep(uLine + uLineLen * 0.7, uLine + uLineLen, aS);",frag:"a = (1.0 - abs(vSide)); a = a * a * vAlive;",uniforms:{uLine:m.uLine,uLineLen:m.uLineLen}}}));I.frustumCulled=!1;let L=new Float32Array(xe),C=new Float32Array(xe),q=0,R=0,G=0,B=0,se=(N,k,ee,t,y,Y,A,X)=>{if(q>=xe)return;let E=q*2;d.setXYZ(E,N,k,ee),d.setXYZ(E+1,N,k,ee),h.setXYZ(E,t,y,Y),h.setXYZ(E+1,t,y,Y),g.setX(E,A),g.setX(E+1,A),c.setX(E,X),c.setX(E+1,X),L[q]=A,C[q]=k,q+=1};function U({yaws:N,lineStartY:k,endY:ee,dense:t}){q=0;let y=0,Y=.31*s,A=[[Y,.11,-.5],[Y,.085,-.43],[Y*.92,.012,-.34],[Y*.62,.003,-.24],[Y*.22,.003,-.11],[0,.003,-.025],[0,-.004,.008],[0,-.03,.012]],X=24,E=A[0];for(let oe=0;oe<A.length-1;oe+=1){let re=A[Math.max(0,oe-1)],M=A[oe],S=A[oe+1],W=A[Math.min(A.length-1,oe+2)];for(let w=oe===0?0:1;w<=X;w+=1){let _=w/X,H=_*_,ae=H*_,ce=[0,1,2].map(ie=>.5*(2*M[ie]+(S[ie]-re[ie])*_+(2*re[ie]-5*M[ie]+4*S[ie]-W[ie])*H+(3*M[ie]-re[ie]-3*S[ie]+W[ie])*ae)),Pe=ce[0]-E[0],V=ce[1]-E[1],z=ce[2]-E[2];y+=Math.hypot(Pe,V,z);let pe=Math.hypot(Pe,z)||1;se(ce[0],ce[1],ce[2],z/pe||1,0,-Pe/pe||0,y,mo),E=ce}}R=q,G=y,B=E[1];let J=E[1],te=0;for(;J>ee&&q<xe;){let oe=.22;J>Z.slabBottom-.5&&(oe=.05);for(let H of t)J<H.a&&J>H.b&&(oe=.022);for(J-=oe,y+=oe;te<N.length-1&&J<N[te+1].y;)te+=1;let re=N[te],M=N[Math.min(te+1,N.length-1)],S=M===re?0:st(.25,.75,(re.y-J)/Math.max(.001,re.y-M.y)),W=ut(re.yaw,M.yaw,S)*Math.PI/180,w=st(Z.floorY-.2,Z.slabBottom+.2,J),_=ut(mo,Bo,w);J<k&&(_=ut(_,No,st(0,4,k-J))),se(0,J,0,Math.cos(W),0,Math.sin(W),y,_)}d.needsUpdate=!0,h.needsUpdate=!0,g.needsUpdate=!0,c.needsUpdate=!0,m.uLine.value=F(k),m.uPrintRange.value=F(Z.floorY-.1),m.uWide.value=F(Z.deskY)}function F(N){return G+(B-N)}function T(N){let k=0,ee=q-1;for(;k<ee;){let t=k+ee>>1;L[t]<N?k=t+1:ee=t}return k}function Q(N,k){let ee=N+k,t=ee>B?0:T(F(ee)),y=T(F(N-k)),Y=Math.max(0,y-t)*6;f.setDrawRange(t*6,Y)}return{mesh:x,halo:I,u:m,rebuild:U,focus:Q,sAtY:F,pointAtY(N,k){return k[0]=0,k[1]=N,k[2]=0,k},get rings(){return q},verticalFrom(){return R}}}var Oo=460812,Wo=12e3,Yo=()=>new Promise(i=>{window.scheduler?.yield?window.scheduler.yield().then(i):setTimeout(i,0)});async function Lt(i){let r=performance.now();for(;;){if(i.next().done)return;performance.now()-r>4&&(await Yo(),r=performance.now())}}async function T0({canvas:i,gl:r,tier:l,forced:s,onFail:d,onOff:h,isFailed:u}){Dt.enabled=!1;let g={...lo[l],instanceScale:1},c=document.documentElement,p=c.dir==="rtl"?-1:1,f=window.matchMedia("(pointer: coarse)").matches,m=new _t({canvas:i,context:r,antialias:!0});m.outputColorSpace=Et,m.setClearColor(Oo,1),m.sortObjects=!1,m.debug.checkShaderErrors=s,m.info.autoReset=!0;let b=new Bt,x=new ct(30,1,.1,100);await io(p<0);let I=ro({q:g,dir:p}),L={uTime:{value:0},uInline:{value:p},uCamY:{value:0},uDawn:{value:0},uPower:{value:new Ne(0,0)},uPowerY:{value:0},uLitY:{value:new Ne(Z.slabBottom,-120)},uFog:{value:new Ne(4,40)},uCull:{value:1},uLampOrigin:{value:new he},uLampPos:{value:new he(.5*p,.62,-.62)},uLampDir:{value:new he(0,-1,0)},uLampColor:{value:new he(1,.7,.42)},uLampOn:{value:1},uLampCone:{value:new Ne(.55,.9)},uAtlas:{value:I.texture}},C=ao(L),q=vo({programs:C,shared:L,printTexture:I.printTexture,dir:p}),R=fo({programs:C,shared:L,text:I,q:g,dir:p,tier:l}),G=po({programs:C,shared:L,text:I,q:g,dir:p,tier:l}),B=ho({programs:C,shared:L,text:I,dir:p}),se={desk:R,archive:G,strip:q,phone:B};b.add(R.group,G.group,q.mesh,q.halo);let U=Ye.map((o,e)=>({meta:o,index:e,status:"idle",module:null,group:new Te,ctx:null,on:!1,a:0,s:0,e:0,b:0,promise:null})),F=Object.fromEntries(U.map(o=>[o.meta.id,o]));U.forEach(o=>{o.group.visible=!1,b.add(o.group)});let T=null,Q=null,N=null,k=1,ee=1/0,t=0,y=0,Y=0,A=()=>T.svh*.15;function X(){T=oo();let o=Ut(T,Ye);Q=o.solved,k=T.docH,N=$t(o.knots,k);let e=Q["svc.auto"],a=Q["process.head"],n=Q["why.q"],v=Ye.filter(O=>O.floor&&O.stripYaw!==void 0).map(O=>({y:Q[O.id].floorY,yaw:O.stripYaw}));v.unshift({y:Z.deskY,yaw:0}),v.push({y:e.floorY+3,yaw:0},{y:e.floorY+1,yaw:90},{y:e.floorY-3,yaw:90},{y:a.floorY+2,yaw:0}),v.sort((O,K)=>K.y-O.y),q.rebuild({yaws:v,lineStartY:e.floorY-1.8,endY:n.floorY+.03,dense:[{a:Q["svc.rescue"].floorY+2.4,b:Q["svc.rescue"].floorY-2.4}]}),L.uLitY.value.set(Z.slabBottom,a.floorY+4),G.setRange(Z.slabBottom,a.floorY);let P=T.shots.drop,$=T.shots.fall;t=P.pinStart+(P.pinEnd-P.pinStart)*.86,ee=$.pinStart+($.pinEnd-$.pinStart)*.5,y=P.pinStart+(P.pinEnd-P.pinStart)*.8,Y=$.pinStart+($.pinEnd-$.pinStart)*.4;for(let O of U){let K=O.index,$e=T.shots[O.meta.id],Ct=K>0?T.shots[Ye[K-1].id]:null,At=K<Ye.length-1?T.shots[Ye[K+1].id]:null;O.a=Ct?Ct.pinEnd:0,O.s=$e.pinStart,O.e=$e.pinEnd,O.b=At?At.pinStart:k;let wo=Q[O.meta.id];O.group.position.set(0,wo.floorY??0,0),O.status==="ready"&&O.module.layout&&O.module.layout(O.ctx)}R.setActPositions(Q.deskAct4),oe()}let E=1,J=0,te=null;function oe(){let o=T.W,e=T.H,a=g.pixelCap*E,n=Math.min(window.devicePixelRatio||1,Math.sqrt(a/(o*e)));m.setPixelRatio(n),m.setSize(o,e,!1),x.aspect=o/e,te?.resize(o*n,e*n)}let re=[],M=o=>({tier:l,q:g,dir:p,id:o.meta.id,group:o.group,programs:C,u:L,text:I,sets:se,camera:x,renderer:m,rng:Ae(o.meta.id),get solved(){return Q},get layout(){return T},get self(){return Q[o.meta.id]},place(e,{inline:a=0,y:n=0,z:v=0,yaw:P=0}={}){return e.position.set(a*p,n,v),e.rotation.y=P*p,e},hotspots:{add(e){re.push({...e,runtime:o})}}});async function S(o){if(o.status!=="ready")return o.promise||(o.status="loading",o.promise=(async()=>{try{let a=(await co[o.meta.id]()).default;o.ctx=M(o),await Lt(a.build(o.ctx)),await m.compileAsync(o.group,x,b),a.layout&&a.layout(o.ctx),o.module=a,o.status="ready",le=!0}catch(e){console.warn(`shot ${o.meta.id} failed`,e),o.status="failed"}})()),o.promise}function W(o){for(let e=U.length-1;e>=0;e-=1)if(o>=U[e].a)return e;return 0}let w=!1;async function _(){if(!w){for(w=!0;!(ie||u());){let o=W(z),e=null,a=1/0;for(let n of U)if(n.status==="idle"){let v=Math.abs(n.index-o);v<a&&(e=n,a=v)}if(!e)break;await new Promise(n=>{"requestIdleCallback"in window?window.requestIdleCallback(n,{timeout:200}):setTimeout(n,16)}),await S(e)}w=!1}}let H=new Float32Array(13),ae=new Ht,ce=new he(0,1,0),Pe=new he(1,0,0),V={t:0,enter:0,hold:0,exit:0,y:0,v:0,time:0,dt:0,px:0,py:0,pointer:0},z=window.scrollY,pe=0,ie=!1,Ee=null,le=!0,Re=0,qe=performance.now(),me=0,Qe=performance.now(),Ke=0,Ze=0,et=0,ve=0,Me=0,Fe=0,He=!1,ft=f?.09:.14;function De(o,e){let a=2/ft,n=a*e,v=1/(1+n+.48*n*n+.235*n*n*n),P=z-o,$=(pe+a*P)*e;pe=(pe-a*$)*v,z=o+(P+$)*v,Math.abs(z-o)<.25&&Math.abs(pe)<2&&(z=o,pe=0)}function it(o,e){let a=n=>Math.min(1,Math.max(0,n));V.t=o.b>o.a?a((z-o.a)/(o.b-o.a)):1,V.enter=o.s>o.a?a((z-o.a)/(o.s-o.a)):z>=o.s?1:0,V.hold=o.e>o.s?a((z-o.s)/(o.e-o.s)):z>=o.e?1:0,V.exit=o.b>o.e?a((z-o.e)/(o.b-o.e)):z>=o.b?1:0,V.y=z,V.v=pe,V.time=Re,V.dt=e,V.px=ve,V.py=Me,V.pointer=et}let ye=(o,e)=>e>o?Math.min(1,Math.max(0,(z-o)/(e-o))):z>=e?1:0,fe=o=>o*o*(3-2*o);function Le(){let o=T.shots["process.head"];G.u.uTurn.value=fe(ye(o.pinStart,o.pinEnd));let e=T.shots["why.list"],a=T.shots["why.stats"],n=T.shots.cta,v=ye(e.pinStart,e.pinEnd)*3.2;R.setClear(v);let P=fe(ye(e.pinStart+(e.pinEnd-e.pinStart)*.45,n.pinStart));L.uDawn.value=P,R.setClock(3.2+fe(ye(e.pinStart,a.pinEnd))*3.8);let $=T.shots.hero;z<ee?R.setRing(1-ye($.pinEnd,$.pinEnd+(T.shots.drop.pinEnd-$.pinEnd)*.14)):R.setRing(1-ye(e.pinStart,e.pinStart+(e.pinEnd-e.pinStart)*.5));let O=U.find(K=>K.meta.id==="svc.rescue");(z<O.a||z>O.b)&&(L.uPower.value.set(0,0),q.u.uJamK.value=0)}function Ie(o){jt(N,k,z,H),x.position.set(H[0],H[1],H[2]),x.quaternion.set(H[3],H[4],H[5],H[6]),et===1&&(ae.setFromAxisAngle(ce,-ve*.012),x.quaternion.multiply(ae),ae.setFromAxisAngle(Pe,Me*.009),x.quaternion.multiply(ae)),x.fov=H[7],x.near=H[8],x.far=H[9],x.setViewOffset(T.W,T.H,H[11],H[12],T.W,T.H),L.uTime.value=Re,L.uCamY.value=H[1],L.uFog.value.set(H[10]*.16,H[10]),Le();let e=z<t||z>ee,a=z>ee?4:1;R.group.visible=e,R.setAct(a),G.group.visible=z>y&&z<Y,L.uLampOn.value=e?1:0,L.uLampOrigin.value.copy(R.group.position),L.uLampColor.value.set(1,.7,.42),q.focus(H[1],H[9]),q.u.uFeed.value=z*18e-5,it(U[0],o),e&&(R.resetSpot(),R.update(V,Re));for(let n of U){let v=z>=n.a-A()&&z<=n.b+A();n.status==="ready"&&(v||n.on)&&(it(n,o),n.module.update(V,n.ctx),n.on=v,n.group.visible=v)}x.updateProjectionMatrix(),x.updateMatrixWorld(),te?te.render(b,x):m.render(b,x)}let we=new dt({onChange(o,e){_e(e)}});function _e(o){if(o==="pixel-85"||o==="pixel-72")J=o==="pixel-85"?.85:.72;else if(o==="drop-film")te?.dispose(),te=null;else if(o==="instances-70"||o==="instances-50")g.instanceScale=o==="instances-70"?.7:.5,R.setDensity(g.instanceScale),G.setDensity(g.instanceScale);else if(o==="shadow-1")R.setShadowTaps(1);else if(o==="extras-off")G.setWeather(!1),R.setExtras(!1);else if(o==="cadence-30")Fe=33.3;else if(o==="stills"){try{window.localStorage.setItem("enjaz:tier",`S:${Date.now()}`)}catch{}tt(),h("governor")}}function Be(o){if(ie)return;if(window.requestAnimationFrame(Be),document.hidden||He||Ee!==null){qe=o;return}let e=o-qe;qe=o;let a=Math.min(e,100)/1e3;Re+=a;let n=window.scrollY,v=Math.abs(n-z)>.25||Math.abs(pe)>2;De(n,a),ve+=(Ke-ve)*Math.min(1,a*6),Me+=(Ze-Me)*Math.min(1,a*6);let P=Math.abs(Ke-ve)>.001||Math.abs(Ze-Me)>.001,O=U[W(z)].meta.idleHz,K=v||P||le;if(!K&&O>0&&!(l==="L"&&o-Qe>Wo)&&(K=o-me>=1e3/O-1),Fe&&o-me<Fe-2&&(K=!1),!K)return;v&&(Qe=o),J&&(!v||z>T.shots.fall.pinStart&&z<T.shots.fall.pinEnd)&&(E=J,J=0,oe()),le=!1;let $e=(o-me)/1e3;me=o,Ie(Math.min($e,.1)),e<250&&(v||O>0)&&we.push(e)}function tt(){ie=!0}window.addEventListener("pointermove",o=>{et=o.pointerType==="mouse"?1:2,Ke=o.clientX/window.innerWidth*2-1,Ze=o.clientY/window.innerHeight*2-1,Qe=performance.now()},{passive:!0});let Ue=new he;window.addEventListener("click",o=>{if(!o.target.closest?.("a, button, .shot"))for(let e of re){if(!e.runtime.on)continue;Ue.set(e.center[0],e.center[1],e.center[2]),e.runtime.group.localToWorld(Ue).project(x);let a=(Ue.x*.5+.5)*T.W,n=(.5-Ue.y*.5)*T.H;Math.hypot(a-o.clientX,n-o.clientY)<e.radius&&(e.runtime.module.hit?.(e.id,V,e.runtime.ctx),le=!0)}},{passive:!0}),window.addEventListener("pageshow",()=>{z=window.scrollY,le=!0});let rt=0;if(i.addEventListener("webglcontextlost",o=>{o.preventDefault(),He=!0,rt+=1,h("context-lost")}),i.addEventListener("webglcontextrestored",()=>{rt>1||(He=!1,R.bakeShadow(m),le=!0,c.classList.remove("world-off"))}),X(),z=window.scrollY,await Lt(R.build()),await Lt(G.build()),await S(F.hero),await S(F.drop),await m.compileAsync(b,x),R.bakeShadow(m),u())return null;if(!s){let o=[],e=new Uint8Array(4);for(let n=0;n<6;n+=1){await new Promise(P=>window.requestAnimationFrame(P));let v=performance.now();Ie(.016),r.readPixels(0,0,1,1,r.RGBA,r.UNSIGNED_BYTE,e),o.push(performance.now()-v)}let a=o.slice(2).sort((n,v)=>n-v)[1];if(a>40){try{window.localStorage.setItem("enjaz:tier",`S:${Date.now()}`)}catch{}return d("bench"),null}a>20&&(E=.7,g.instanceScale=.7,R.setDensity(.7),G.setDensity(.7),oe())}g.film&&(te=(await import("./chunk-ISAYENIP.js")).createFilm(m),te.resize(T.W*m.getPixelRatio(),T.H*m.getPixelRatio())),Ie(.016),c.classList.add("world-on"),window.requestAnimationFrame(Be),_();let ht=so(()=>{X(),R.bakeShadow(m),le=!0});/[?&]hud=1\b/.test(window.location.search)&&import("./chunk-KZXS7KYC.js").then(o=>o.mountHud({renderer:m,governor:we,tier:l,q:g,get y(){return z}}));let lt={tier:l,renderer:m,governor:we,stop:tt,get layout(){return T},get solved(){return Q},seek(o){return window.scrollTo({top:o,behavior:"instant"}),z=window.scrollY,pe=0,Ie(.016),z},freeze(o){Ee=o,Re=o},unfreeze(){Ee=null},renderOnce(){Ie(.016)},info(){return Ie(.016),{calls:m.info.render.calls,triangles:m.info.render.triangles,programs:m.info.programs.length,rung:we.rung,y:z}},feedFrameTimes(o){o.forEach(e=>we.push(e))},async loadAll(){await Promise.all(U.map(o=>S(o))),le=!0},status(){return Object.fromEntries(U.map(o=>[o.meta.id,o.status]))},dispose(){tt(),ht()}};return window.__enjazWorld=lt,lt}export{T0 as start};
