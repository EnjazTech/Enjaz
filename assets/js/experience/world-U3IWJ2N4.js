/* three.js r187 (c) three.js authors, MIT. ENJAZ film. */
import{a as oe,b as Xt,c as Jt,d as Qt}from"./chunk-UCOIGGEA.js";import{a as Kt,b as Zt,c as eo,d as to,e as oo,f as no,g as so}from"./chunk-CQBUOHZD.js";import{c as ze,d as U,f as xe,g as Pe,h as ye,i as Te,j as Vt,k as mt,l as vt}from"./chunk-GBHZZ3DY.js";import{A as qt,B as _t,C as we,D as Ct,E as Ut,J as ge,N as $t,O as ht,S as jt,a as bt,c as St,d as Mt,e as Ke,f as Et,g as Rt,h as Ft,i as Ht,j as Dt,k as rt,l as It,m as qe,n as Bt,o as se,p as Nt,q as Ot,r as Lt,t as Ne,u as Wt,v as _e,w as Yt,x as O,z as Gt}from"./chunk-ZD75F7KI.js";import"./chunk-AEJNSRIJ.js";var zt=["pixel-85","pixel-72","drop-film","instances-70","instances-50","shadow-1","extras-off","cadence-30","stills"];function At(l,s){return l[Math.min(l.length-1,Math.floor(l.length*s))]}var wt=class{constructor({onChange:s=()=>{}}={}){this.onChange=s,this.buffer=new Float32Array(90),this.sorted=new Float32Array(90),this.count=0,this.head=0,this.rung=-1,this.elapsed=0,this.overBudget=0,this.underBudget=0,this.cooldown=0,this.climbs=0,this.upWait=240,this.locked=!1,this.refreshCap=!1,this.seen=0,this.belowBail=0,this.p50=0,this.p90=0,this.vsync=16.6}target(){return this.refreshCap?33.3:Math.max(this.vsync,16.6)}push(s){if(this.elapsed+=s,this.elapsed<1e3||s>250||(this.buffer[this.head]=s,this.head=(this.head+1)%90,this.count=Math.min(90,this.count+1),this.seen+=1,this.cooldown=Math.max(0,this.cooldown-s),this.count<90/2))return;this.sorted.set(this.buffer);let a=this.sorted.subarray(0,this.count).sort();this.p50=At(a,.5),this.p90=At(a,.9),this.vsync=At(a.subarray(0,Math.max(1,Math.floor(this.count*.2))),.5),this.seen<=60&&Math.abs(this.p50-33.3)/33.3<.04&&this.p90/this.p50<1.08&&(this.refreshCap=!0);let o=this.target();if(this.p90>o*1.25?(this.overBudget+=1,this.underBudget=0):this.p90<o*.75?(this.underBudget+=1,this.overBudget=0):(this.overBudget=0,this.underBudget=0),this.rung===zt.length-2&&this.p50>50){if(this.belowBail+=s,this.belowBail>4e3){this.step(1);return}}else this.belowBail=0;this.cooldown>0||(this.overBudget>=45&&this.rung<zt.length-2?(this.underBudgetClimbed&&(this.upWait*=2,this.underBudgetClimbed=!1),this.step(1)):this.underBudget>=this.upWait&&this.rung>=0&&!this.locked&&(this.climbs+=1,this.underBudgetClimbed=!0,this.climbs>=2&&(this.locked=!0),this.step(-1)))}step(s){this.rung+=s,this.overBudget=0,this.underBudget=0,this.cooldown=1500,this.count=0,this.onChange(this.rung,zt[this.rung]??"full")}};var ao=l=>{let s=document.createElement("div");s.style.position="fixed",s.style.top="0",s.style.width="0",s.style.visibility="hidden",s.style.height=`100${l}`,document.body.appendChild(s);let a=s.getBoundingClientRect().height;return s.remove(),a},lt=l=>parseFloat(l)||0;function io(){let l=ao("svh"),s=ao("lvh"),a=document.documentElement.clientWidth,o=s,p=window.scrollY,r=document.querySelector("[data-nav]"),f=r?r.getBoundingClientRect().height:0,w=document.documentElement.dir==="rtl"?-1:1,g=document.documentElement.scrollHeight,n={};for(let h of document.querySelectorAll("[data-shot]")){let c=h.dataset.shot,A=h.getBoundingClientRect(),m=A.top+p,R=h.querySelector(":scope > .shot"),x={id:c,top:m,height:A.height,caption:null,pinStart:m,pinEnd:m};if(R){let S=R.getBoundingClientRect(),T=getComputedStyle(h),v=getComputedStyle(R),G=lt(T.paddingBlockEnd);if(c==="hero"){let _=lt(v.insetBlockStart),ie=lt(v.marginBlockEnd),$=lt(T.paddingBlockStart);x.pinStart=0,x.pinEnd=Math.max(0,A.height-$-S.height-ie),x.caption={x:S.left,y:_,w:S.width,h:S.height}}else{let _=lt(v.insetBlockEnd);x.pinStart=m+S.height+_-l,x.pinEnd=x.pinStart+Math.max(0,A.height-G-S.height),x.caption={x:S.left,y:l-_-S.height,w:S.width,h:S.height},x.pin=_,x.gap=G}}n[c]=x}return{W:a,H:o,svh:l,lvh:s,navH:f,docH:g,dir:w,portrait:o>=a,shots:n}}function ro(l){let s=window.matchMedia("(pointer: coarse)").matches,a=document.documentElement.clientWidth,o=document.documentElement.scrollHeight,p=0,r=()=>{window.clearTimeout(p),p=window.setTimeout(l,160)},f=new ResizeObserver(()=>{let w=document.documentElement.clientWidth,g=document.documentElement.scrollHeight;if(w===a&&g===o)return;let n=s&&w===a&&Math.abs(g-o)<200;a=w,o=g,n||r()});return f.observe(document.documentElement),document.fonts?.ready.then(r),document.fonts?.addEventListener?.("loadingdone",r),()=>f.disconnect()}var et=`
precision highp float;
uniform mat4 modelMatrix, viewMatrix, projectionMatrix;
uniform vec3 cameraPosition, uLampOrigin;
uniform float uTime, uInline, uCamY, uDawn, uPowerY, uHouse;
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
`,tt=`
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
`,So=`
${et}
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
}`,Mo=`
${tt}
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
}`,Lo=`
${et}
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
}`,Co=`
${tt}
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
}`,zo=`
${et}
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
}`,Ao=`
${tt}
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
}`,Po=`
${et}
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
  /* The line keeps an apparent width: close to the camera it must not become a wedge. */
  float viewZ = max(-(viewMatrix * vec4(wp, 1.0)).z, 0.05);
  float halfWidth = mix(aW, min(aW, viewZ * 0.0038), lineMix);
  wp += aAcross * halfWidth * aSide;
  //#world
  gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
  vec3 wn = normalize(cross(aAcross, vec3(0.0, 1.0, 0.0)) + vec3(0.0, 0.25, 0.0));
  vUv = vec2(aSide, s - uFeed);
  vW = halfWidth;
  vS = s;
  vLineMix = lineMix;
  vLampP = wp - uLampOrigin;
  vHouse = buildingLight(wp.y, wn) * 0.62 + vec3(0.03);
  vFog = fogAt(wp) * (1.0 - lineMix);
}`,To=`
${tt}
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
}`,ko=`
${et}
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
}`,Eo=`
${tt}
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
}`,Ro=`
${et}
in vec3 position;
out float vFog;
//#pars
void main() {
  vec3 p = position;
  //#local
  vec3 wp = (modelMatrix * vec4(p, 1.0)).xyz;
  gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
  vFog = fogAt(wp);
}`,Fo=`
${tt}
uniform vec3 uColor;
uniform float uAlpha;
in float vFog;
void main() {
  fragColor = vec4(uColor * uAlpha * (1.0 - clamp(vFog, 0.0, 1.0)), 1.0);
}`;function lo(l,s={}){return l.replace("//#pars",s.pars??"").replace("//#fpars",s.fpars??"").replace("//#local",s.local??"").replace("//#world",s.world??"").replace("//#frag",s.frag??"")}function Ue(l,{mips:s=!0,repeat:a=!1}={}){let o=new qt(l);return o.colorSpace=Ft,o.generateMipmaps=s,o.minFilter=s?Et:Ke,o.magFilter=Ke,a&&(o.wrapS=Mt,o.wrapT=Mt),o}function Ho(){let s=document.createElement("canvas");s.width=256*2,s.height=256;let a=s.getContext("2d"),o=(p,r,f)=>{let w=a.createRadialGradient(p+107.52,76.8,5.12,p+128,128,184.32);r.forEach(([n,h])=>w.addColorStop(n,h)),a.fillStyle=w,a.fillRect(p,0,256,256);let g=a.createRadialGradient(p+256*.38,256*.24,0,p+256*.38,256*.24,256*.26);g.addColorStop(0,f),g.addColorStop(1,"rgba(255,255,255,0)"),a.fillStyle=g,a.fillRect(p,0,256,256)};return o(0,[[0,"#bcbcc0"],[.5,"#8c8d92"],[.85,"#55565c"],[1,"#35363c"]],"rgba(255,255,255,.18)"),o(256,[[0,"#f6d58c"],[.45,"#c9963f"],[.8,"#6e4a1c"],[1,"#2c1c0a"]],"rgba(255,244,214,.75)"),Ue(s,{mips:!1})}function co(l){let s=Ho(),a=(o,p,r,f,w={})=>{let{deform:g,defines:n,...h}=w;return new $t({name:o,glslVersion:It,vertexShader:lo(p,g),fragmentShader:lo(r,g),defines:n??{},uniforms:{...l,...f,...g?.uniforms??{}},...h})};return{matcap:s,solid(o={}){return a("solid",So,Mo,{uMatcap:{value:s},uEmit:{value:o.emit??[0,0,0]},uAmbient:{value:o.ambient??.06},uHouse:{value:o.house??1}},Ze(o,["emit","ambient","house"]))},paper(o={}){return a("paper",Lo,Co,{uAtlas:o.atlas??l.uAtlas,uCell:{value:o.cell??[0,0,1,1]},uAmbient:{value:o.ambient??.07},uHouse:{value:o.house??1},uLitBoost:{value:o.boost??1}},{side:bt,...Ze(o,["atlas","cell","ambient","house","boost"])})},wood(o={}){return a("wood",zo,Ao,{uHouse:{value:0},...o.uniforms},Ze(o,["uniforms"]))},strip(o={}){return a("strip",Po,To,{uHouse:{value:1},...o.uniforms},Ze(o,["uniforms"]))},glow(o={}){return a("glow",ko,Eo,{uColor:{value:o.color??[1,1,1]},uAlpha:{value:o.alpha??1},uShape:{value:o.shape??0},uRadius:{value:0},uMap:{value:o.map??s},uHouse:{value:o.house??0}},{transparent:!0,depthWrite:!1,blending:St,side:bt,...Ze(o,["color","alpha","shape","map","house"])})},wire(o={}){return a("wire",Ro,Fo,{uColor:{value:o.color??[.365,1,.87]},uAlpha:{value:o.alpha??1},uHouse:{value:0}},{transparent:!0,depthWrite:!1,blending:St,...Ze(o,["color","alpha"])})}}}function Ze(l,s){let a={};for(let o of Object.keys(l))s.includes(o)||(a[o]=l[o]);return a}var He=4,Do=["invoice","receipt","quote","ledger","sheet","slip","lines","dossier","carbon","memo","tape","blank"],Io=l=>{let s=new Set;for(let a of document.querySelectorAll(l)){let o=a.textContent.trim();o&&o!=="\u2726"&&s.add(o)}return[...s]};async function uo(l){let s=[document.fonts.load('400 20px "IBM Plex Mono"',"#REF! 0123"),document.fonts.load(l?'700 48px "Noto Kufi Arabic"':'700 48px "Space Grotesk"',l?"\u0625\u0646\u062C\u0627\u0632":"ENJAZ")];await Promise.race([Promise.allSettled(s),new Promise(a=>setTimeout(a,1500))])}function po({q:l,dir:s}){let a=s<0,o=document.querySelector("main"),p={};try{p=JSON.parse(o?.dataset.atlas??"{}")}catch{p={}}let r=Io(".ticker__track span"),f=[];try{f=JSON.parse(document.querySelector("[data-typewriter]")?.dataset.typewriter??"[]")}catch{f=[]}let w=a?'"Noto Kufi Arabic", system-ui':'"Space Grotesk", system-ui',g='"IBM Plex Mono", monospace',n=new Intl.NumberFormat(a?"ar-EG":"en-US",{useGrouping:!1}),h=l.atlas,c=document.createElement("canvas");c.width=h,c.height=h;let A=c.getContext("2d"),m=h/He;A.fillStyle="#fff",A.fillRect(0,0,h,h);let R="#23252e",x="#9aa0ad",S=(t,L)=>{let Y=t%He,z=Math.floor(t/He);A.save(),A.beginPath(),A.rect(Y*m,z*m,m,m),A.clip(),A.translate(Y*m,z*m),A.scale(m/100,m/134),A.direction=a?"rtl":"ltr",A.textBaseline="alphabetic",L(A),A.restore()},T=t=>a?100-t:t,v=(t,L,Y,z=12)=>{t.fillStyle=R,t.font=`700 ${z}px ${w}`,t.textAlign="start",t.fillText(L,T(8),Y)},G=(t,L,Y=8,z=92,ee=x,D=.7)=>{t.fillStyle=ee,t.fillRect(Y,L,z-Y,D)},_=(t,L,Y,z,ee=0)=>{for(let D=0;D<Y;D+=1){let J=34+(D*37+ee)%40;t.fillStyle=D%3===0?R:x,t.fillRect(a?92-J:8,L+D*z,J,1.4),t.fillStyle=x,t.fillRect(a?8:80,L+D*z,12,1.4)}};S(0,t=>{v(t,p.invoice??"",20,14),G(t,26),_(t,34,9,7),G(t,104,8,92,R,1),t.fillStyle=R,t.font=`600 9px ${g}`,t.textAlign=a?"left":"right",t.fillText(n.format(4820),a?8:92,116)}),S(1,t=>{v(t,p.receipt??"",18,12),G(t,24),_(t,32,7,6,11),t.fillStyle=R,t.fillRect(30,100,40,12)}),S(2,t=>{v(t,p.quote??"",22,15),G(t,28),_(t,38,6,8,23),t.save(),t.translate(68,104),t.rotate(-.26),t.strokeStyle="#5e4bd8",t.lineWidth=2,t.strokeRect(-23,-9,46,18),t.fillStyle="#5e4bd8",t.font=`700 10px ${w}`,t.textAlign="center",t.fillText(p.paid??"",0,4),t.restore()});let ie=(t,L)=>{let Y=a?8:16;t.fillStyle="#e6f6ee";for(let z=0;z<18;z+=2)t.fillRect(0,6+z*7,100,7);t.strokeStyle="#a9b7ae",t.lineWidth=.4;for(let z=0;z<=4;z+=1)t.beginPath(),t.moveTo(Y+z*19,0),t.lineTo(Y+z*19,134),t.stroke();t.font=`400 4.8px ${g}`,t.textAlign="center";for(let z=0;z<18;z+=1){t.fillStyle=x,t.fillText(n.format(z+1),a?96:8,11.5+z*7);for(let ee=0;ee<4;ee+=1){let D=(z*7+ee*13)%23,J=n.format(100+D*317);L&&D===4?(J="#REF!",t.fillStyle="#c2352b"):(L&&D===9&&(J="#####"),t.fillStyle=R),t.fillText(J,Y+ee*19+9.5,11.5+z*7)}}};S(3,t=>{ie(t,!1),t.fillStyle="rgba(255,255,255,.92)",t.fillRect(0,0,100,16),v(t,p.ledger??"",12,10)}),S(4,t=>ie(t,!0)),S(5,t=>{t.fillStyle="#c2352b",t.fillRect(8,8,84,7),t.fillStyle=R,t.font=`600 9px ${g}`,t.textAlign="center";for(let L=0;L<4;L+=1)t.fillText(n.format(1200+L*417),50,40+L*20)}),S(6,t=>{for(let L=0;L<16;L+=1)G(t,12+L*7.4,6,94,"#b7c2d8",.5);_(t,14,7,7.4,5)}),S(7,t=>{t.fillStyle="#fff",t.fillRect(0,0,100,134),t.fillStyle="#f7efd9",t.fillRect(18,18,64,30),v(t,p.ledger??"",38,11),t.fillStyle="#faf6ea",t.fillRect(0,62,100,5)}),S(8,t=>{v(t,p.invoice??"",20,13),_(t,30,12,6.6,3)}),S(9,t=>{_(t,12,16,7,17)}),S(10,t=>{t.fillStyle=R,t.font=`400 7px ${g}`,t.textAlign="center";for(let L=0;L<12;L+=1)t.fillText(n.format(90+L*233),50,12+L*10.5)});let $=Ue(c);$.anisotropy=4;let W=document.createElement("canvas");W.width=512,W.height=2048;let k=W.getContext("2d");k.fillStyle="#fff",k.fillRect(0,0,512,2048),k.direction=a?"rtl":"ltr",k.textBaseline="middle";let j=a?468:44;k.textAlign="start";let H=[];r.forEach((t,L)=>{H.push({text:t,big:!0}),f[L%Math.max(1,f.length)]&&H.push({text:f[L%f.length],big:!1})});let F=2048/Math.max(1,H.length);H.forEach((t,L)=>{k.fillStyle=t.big?"#1f2a24":"#3d4c44",k.font=t.big?`700 44px ${w}`:`400 25px ${a?w:g}`,k.fillText(t.text,j,F*(L+.5),424)});let Z=Ue(W);return Z.anisotropy=4,{texture:$,printTexture:Z,services:r,phrases:f,words:p,display:w,mono:g,digits:t=>n.format(t),cell(t){let L=Math.max(0,Do.indexOf(t)),Y=L%He,z=Math.floor(L/He);return[Y/He,1-(z+1)/He,1/He,1/He]},title(t){return document.querySelector(`[data-shot="${t}"] .card__title, [data-shot="${t}"] .step__title`)?.textContent.trim()??""},canvas(t,L,Y,z){let ee=document.createElement("canvas");ee.width=t,ee.height=L;let D=ee.getContext("2d");return D.direction=a?"rtl":"ltr",Y(D,t,L),Ue(ee,z)}}}var fo={L:{pixelCap:55e4,draws:28,tris:7e4,sheets:420,sheetSeg:2,stacks:180,dossiers:120,boxes:1400,weather:140,uxGrid:[32,45],shadowSize:1024,shadowTaps:1,atlas:512,dust:60,allReflections:!1,film:!1},M:{pixelCap:13e5,draws:45,tris:22e4,sheets:1100,sheetSeg:3,stacks:360,dossiers:240,boxes:3e3,weather:320,uxGrid:[48,68],shadowSize:1024,shadowTaps:4,atlas:1024,dust:150,allReflections:!0,film:!1},H:{pixelCap:28e5,draws:70,tris:6e5,sheets:2400,sheetSeg:4,stacks:720,dossiers:480,boxes:6e3,weather:700,uxGrid:[64,90],shadowSize:2048,shadowTaps:8,atlas:2048,dust:300,allReflections:!0,film:!0}};var ct={clip:[.3,40],fog:26},$e=[{id:"hero",act:1,set:"desk",subject:{radius:.62,center:[0,.1,-.4]},pose:{lens:24,elevation:-15,portrait:{elevation:-28},pushIn:.15,...ct},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:30},{id:"drop",act:1,set:"desk",idleHz:0,budget:{draws:12,tris:{L:3e4,M:8e4,H:2e5}},authored(l,s){let a=s.W/s.H,o=s.portrait?20:15.6,p=Math.tan(o*Math.PI/360),f=.24/(s.portrait?.92:.36)/(2*p*a),w=oe.floorY;return[{t:.18,position:[0,-.03,f],elevation:-1,lens:20,clip:[.1,30],fog:26},{t:.48,position:[0,w*.72,f*.96],elevation:-2,lens:20,clip:[.1,30],fog:26},{t:.64,position:[0,.28,.5],elevation:-84,lens:36,clip:[.05,20],fog:20},{t:.84,position:[0,w-.25,.1],elevation:-90,lens:40,clip:[.04,20],fog:16},{t:.93,position:[0,oe.slabBottom+.1,.5],elevation:-90,lens:24,clip:[.05,60],fog:40}]}},{id:"svc.head",act:2,set:"archive",pose:{lens:[24,62],elevation:-90,clip:[.2,90],fog:72},budget:{draws:8,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0,holdKnots:()=>[{t:0,position:[0,oe.slabBottom-.6,1.5],lens:24},{t:1,position:[0,oe.slabBottom-5.2,1.5],lens:62}]},{id:"svc.web",act:2,set:"archive",floor:"first",subject:{radius:1.3,center:[0,0,0]},pose:{lens:32,bearing:12,elevation:-6,drift:[0,-.15,-.5],clip:[.3,80],fog:62},budget:{draws:11,tris:{L:25e3,M:7e4,H:16e4}},idleHz:0,stripYaw:0},{id:"svc.apps",act:2,set:"archive",floor:"locked",subject:{radius:1.1,center:[0,0,0]},pose:{lens:32,bearing:[-12,13],elevation:-4,clip:[.3,80],fog:62},budget:{draws:9,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"svc.api",act:2,set:"archive",floor:"locked",subject:{radius:1.75,center:[0,.35,.3]},pose:{lens:32,bearing:-18,elevation:14,drift:[0,-.2,-.3],clip:[.3,80],fog:60},budget:{draws:14,tris:{L:3e4,M:8e4,H:18e4}},idleHz:0},{id:"svc.rescue",act:2,set:"archive",floor:"locked",subject:{radius:1.2,center:[0,0,0]},pose:{lens:30,bearing:10,elevation:-8,roll:[0,7],clip:[.3,80],fog:58},budget:{draws:12,tris:{L:24e3,M:7e4,H:16e4}},idleHz:0},{id:"svc.ux",act:2,set:"archive",floor:"locked",subject:{radius:1.5,center:[0,0,0]},pose:{lens:28,elevation:0,clip:[.3,80],fog:56},budget:{draws:8,tris:{L:24e3,M:6e4,H:14e4}},idleHz:0},{id:"svc.auto",act:2,set:"archive",floor:"locked",subject:{radius:1.4,center:[0,0,0]},pose:{lens:30,bearing:90,elevation:-3,clip:[.3,80],fog:54},budget:{draws:9,tris:{L:22e3,M:6e4,H:14e4}},idleHz:30},{id:"process.head",act:3,set:"archive",floor:{clear:9},subject:{radius:4,center:[0,0,0]},pose:{lens:50,elevation:-90,shift:[0,0,1.1],clip:[.05,90],fog:70},budget:{draws:10,tris:{L:26e3,M:7e4,H:16e4}},idleHz:0,exitKnots(l,s,a){let o=a.floorY;return[{t:.55,position:[.16,o+3.2,.18],elevation:-90,lens:44,clip:[.05,70],fog:60},{t:.74,position:[.16,o-.9,.12],elevation:-90,lens:44,clip:[.05,70],fog:60}]}},{id:"step.talk",act:3,set:"archive",floor:{clear:5},subject:{radius:1.5,center:[0,.1,0]},pose:{lens:28,bearing:8,elevation:-10,clip:[.2,70],fog:42},budget:{draws:10,tris:{L:25e3,M:7e4,H:16e4}},idleHz:0},{id:"step.scope",act:3,set:"archive",floor:"locked",subject:{radius:1.75,center:[0,0,0]},pose:{lens:28,bearing:-6,elevation:-24,clip:[.2,70],fog:40},budget:{draws:8,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"step.build",act:3,set:"archive",floor:"locked",subject:{radius:1.25,center:[0,0,.3]},pose:{lens:28,bearing:[20,-10],elevation:-8,clip:[.2,70],fog:40},budget:{draws:9,tris:{L:26e3,M:7e4,H:16e4}},idleHz:0},{id:"step.ship",act:3,set:"archive",floor:"locked",subject:{radius:1.6,center:[0,-.2,0]},pose:{lens:28,elevation:[-12,-74],clip:[.2,70],fog:40},budget:{draws:7,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"fall",act:3,set:"none",idleHz:0,budget:{draws:4,tris:{L:3e3,M:6e3,H:12e3}},authored(l){let s=l["step.ship"],a=l["why.q"],o=s.floorY-2,p=a.floorY+a.d+1.6;return[{t:.2,position:[.2,o,.2],elevation:-90,lens:70,clip:[.05,60],fog:44},{t:.86,position:[.05,p+1.2,.06],elevation:-90,lens:70,clip:[.05,40],fog:34}]}},{id:"why.q",act:4,set:"desk",desk:!0,floor:{clear:26},subject:{radius:.85,center:[0,0,-.4]},pose:{lens:40,elevation:-90,...ct},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:30},{id:"why.list",act:4,set:"desk",desk:!0,subject:{radius:.8,center:[0,0,-.4]},pose:{lens:40,elevation:-90,...ct},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:0},{id:"why.stats",act:4,set:"desk",desk:!0,subject:{radius:.7,center:[0,0,-.4]},pose:{lens:36,elevation:-70,...ct},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0},{id:"cta",act:4,set:"desk",desk:!0,subject:{radius:.55,center:[0,0,-.4]},pose:{lens:40,elevation:-90,clip:[.02,12],fog:26},solve(l,s){let{W:a,H:o,portrait:p}=s,r=l.shot.caption,f=l.fov*Math.PI/180,w=Math.tan(f/2)*(a/o),g=.072,n=.148;if(p)l.d=.0775*.965/(2*w),l.ox=0,l.oy=0;else{let h=Math.max((r.w+32)/n,(r.h+32)/g);l.d=a/h/(2*w),l.ox=a/2-(r.x+r.w/2),l.oy=o/2-(r.y+r.h/2)}},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0},{id:"coda",act:4,set:"desk",desk:!0,subject:{radius:.62,center:[0,.1,-.4]},pose:{lens:24,elevation:-15,...ct},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0}],ho={hero:()=>import("./chunk-IB3V3J36.js"),drop:()=>import("./chunk-K6MLBH2F.js"),"svc.head":()=>import("./chunk-XCFQESEV.js"),"svc.web":()=>import("./chunk-BU75ANWF.js"),"svc.apps":()=>import("./chunk-SPG4BJQV.js"),"svc.api":()=>import("./chunk-NJWZDHR7.js"),"svc.rescue":()=>import("./chunk-B2VXPZQF.js"),"svc.ux":()=>import("./chunk-2ALBFH2P.js"),"svc.auto":()=>import("./chunk-ZJHTRPCR.js"),"process.head":()=>import("./chunk-QILWQIDR.js"),"step.talk":()=>import("./chunk-JU4QDHGF.js"),"step.scope":()=>import("./chunk-4GXKCHKF.js"),"step.build":()=>import("./chunk-O2FCLXP4.js"),"step.ship":()=>import("./chunk-R65BVCNZ.js"),fall:()=>import("./chunk-DJNW65WT.js"),"why.q":()=>import("./chunk-CQ55MCPA.js"),"why.list":()=>import("./chunk-GCBXT2J2.js"),"why.stats":()=>import("./chunk-PCMLZPEU.js"),cta:()=>import("./chunk-TYQRNBVE.js"),coda:()=>import("./chunk-F3VOJLJZ.js")};var ke=oe.archiveHalf,je=oe.galleryH,ae=11.4;function mo(l,s){return l.canvas(512,512,o=>{let p=Te(`shelf-${s}`);o.fillStyle=s===0?"#2a2520":"#0a0c11",o.fillRect(0,0,512,512);let r=6,f=512/r;for(let w=0;w<r;w+=1){let g=0;for(;g<512;){let n=8+p()*22,h=f*(.74+p()*.22);if(s===0){let c=p(),A=.5+p()*.5,m=c<.6?[176,136,86]:c<.8?[214,202,170]:c<.92?[96,110,128]:[150,70,60];o.fillStyle=`rgb(${m[0]*A},${m[1]*A},${m[2]*A})`,o.save(),o.translate(g+n/2,f*(w+1)-4),o.rotate(p()>.86?(p()-.5)*.5:0),o.fillRect(-n/2,-h,n-1.5,h),o.fillStyle="rgba(255,255,255,.35)",o.fillRect(-n/2+n*.25,-h*.82,n*.4,h*.2),o.restore()}else{let c=12+p()*10;o.fillStyle=`rgb(${c},${c+2},${c+8})`,o.fillRect(g,f*(w+1)-h-4,n-2,h),p()>.72&&(o.fillStyle=p()>.8?"#a48bff":"#5dffde",o.fillRect(g+n/2-1,f*(w+1)-h,1.5,h-8))}g+=n}o.fillStyle=s===0?"#141210":"#1c2027",o.fillRect(0,f*(w+1)-4,512,4)}},{repeat:!0})}function vo({programs:l,text:s,q:a,dir:o}){let p=new Ne;p.name="archive";let r={uTurn:{value:0},uOrderY:{value:new qe(oe.slabBottom,-60)},uGalleryH:{value:je}},f=40,w=new ge(ke*2,je*f,4,f),g=w.attributes.uv;for(let C=0;C<g.count;C+=1)g.setXY(C,g.getX(C)*8,g.getY(C)*f);let n=[[0,0,-ke,0],[0,0,ke,Math.PI],[-ke,0,0,Math.PI/2],[ke,0,0,-Math.PI/2]].map(([C,u,N,X])=>{let q=w.clone();return q.rotateY(X),q.translate(C,u,N),q}),h=xe(n.map(C=>C.toNonIndexed())),c=mo(s,0);c.anisotropy=8;let A=mo(s,1);A.anisotropy=8;let m=l.paper({atlas:{value:c},ambient:.03,boost:.62,deform:{pars:"uniform float uTurn, uGalleryH; out float vTurn, vLit;",fpars:"uniform sampler2D uShelf2; in float vTurn, vLit;",world:`
        wp.y += floor(uCamY / uGalleryH) * uGalleryH;
        {
          float along = abs(wn.z) > 0.5 ? wp.x : wp.z;
          vTurn = smoothstep(0.0, 1.0, uTurn * 2.2 - (along * uInline / 14.0 * 0.5 + 0.5) - 0.1);
        }
        vLit = uTurn;`,frag:"c = mix(c, texture(uShelf2, vUv).rgb * (vec3(0.42) + vHouse * 0.7), vTurn);",uniforms:{uTurn:r.uTurn,uGalleryH:r.uGalleryH,uShelf2:{value:A}}}}),R=new O(h,m);R.frustumCulled=!1,p.add(R);let x=[.26,.25,.25],S=C=>`wp.y -= floor((iPos.y - uCamY) / ${C.toFixed(2)} + 0.5) * ${C.toFixed(2)};`,T=ze(new we(1,1,1)),v=18,G=[];for(let C=0;C<v;C+=1){let u=-C*je;for(let[N,X]of[[1,0],[-1,0],[0,1],[0,-1]]){let q=ae*2+6,B=(ke+ae)/2;G.push({pos:[N*B,u-.1,X*B],scale:N?[ke-ae,.2,q]:[q,.2,ke-ae],tint:x}),G.push({pos:[N*ae,u+.95,X*ae],scale:N?[.06,.06,q]:[q,.06,.06],tint:[.55,.52,.48]}),G.push({pos:[N*ae,u+.55,X*ae],scale:N?[.03,.03,q]:[q,.03,.03],tint:[.4,.38,.36]})}}let _=new O(ye(T,G.length,(C,u)=>{let N=G[C];u.pos=N.pos,u.scale=N.scale,u.tint=N.tint}),l.solid({ambient:.05,defines:{INSTANCED:1},deform:{world:S(je*v)}}));_.frustumCulled=!1,p.add(_);let ie=[];for(let C of[-1,1])for(let u of[-ae,-ae/3,ae/3,ae])ie.push([C*ae,u]),ie.push([u,C*ae]);let $=new O(ye(ze(new we(.34,1,.34,1,44,1)),ie.length,(C,u)=>{u.pos=[ie[C][0],0,ie[C][1]],u.scale=[1,180,1],u.tint=[.36,.35,.34]}),l.solid({ambient:.05,defines:{INSTANCED:1},deform:{world:"wp.y += uCamY;"}}));$.frustumCulled=!1,p.add($);let W=Te("archive"),j=Math.max(3,Math.round(a.boxes/460))*je,H=ze(new we(1,1,.8)),F=H.attributes.normal;for(let C=0;C<F.count;C+=1)F.getZ(C)<-.5&&H.attributes.aColor.setXYZ(C,0,0,0);let Z=xe([H,U(.05,.86,.01,{at:[0,0,-.41],color:[.36,1,.87],mat:2})]),t=a.boxes,L=new O(ye(Z,t,(C,u)=>{let N=C%4,X=(W()*2-1)*(ke-1),q=-W()*j,B=(W()-.5)*.5,le=ke-.3-W()*2.2,ce=.5+W()*.5,Ee=.55+W()*.4;N===0?(u.pos=[X,q,-le],Pe(0,0,B,u.quat)):N===1?(u.pos=[X,q,le],Pe(0,Math.PI,B,u.quat)):N===2?(u.pos=[-le,q,X],Pe(0,Math.PI/2,B,u.quat)):(u.pos=[le,q,X],Pe(0,-Math.PI/2,B,u.quat)),u.scale=[ce,Ee,.4];let V=.62+W()*.38,P=W();u.tint=P<.62?[.74*V,.56*V,.33*V]:P<.86?[.86*V,.8*V,.66*V]:P<.95?[.38*V,.44*V,.52*V]:[.6*V,.24*V,.2*V],u.seed=W()}),l.solid({ambient:.05,defines:{INSTANCED:1},deform:{pars:"uniform float uTurn; uniform vec2 uOrderY; out float vBack;",local:`
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
            float shift = floor((iPos.y - uCamY) / ${j.toFixed(2)} + 0.5) * ${j.toFixed(2)};
            /* Files sink into the wall at the edges of the wrap, so they never pop. */
            float edge = smoothstep(${(j/2).toFixed(2)}, ${(j*.36).toFixed(2)}, abs(iPos.y - shift - uCamY));
            wp.y -= shift;
            float order = clamp((uOrderY.x - wp.y) / (uOrderY.x - uOrderY.y), 0.0, 1.0);
            if (aColor.a < 1.5) { tint = mix(mix(tint, vec3(0.1, 0.11, 0.13), order * 0.55), vec3(0.075, 0.08, 0.1), vBack); }
            vec3 towardsWall = normalize(vec3(sign(iPos.x) * step(10.0, abs(iPos.x)), 0.0, sign(iPos.z) * step(10.0, abs(iPos.z))) + vec3(0.0001));
            wp += towardsWall * (1.0 - edge) * 2.8;
          }`,uniforms:{uTurn:r.uTurn,uOrderY:r.uOrderY}}}));L.frustumCulled=!1,p.add(L);let Y=new ge(1,1,1,3),z=["ledger","invoice","lines","sheet","memo","receipt"],ee=Math.min(180,Math.floor(a.weather*.75)),D=new O(ye(Y,ee,(C,u)=>{let N=C%4,X=(W()*2-1)*(ae-.5),q=-Math.floor(W()*18)*je+.3;u.pos=N===0?[X,q,-ae]:N===1?[X,q,ae]:N===2?[-ae,q,X]:[ae,q,X],Pe(0,N<2?0:Math.PI/2,(W()-.5)*.2,u.quat);let B=.55+W()*.6;u.scale=[B,B*1.42,1],u.cell=s.cell(z[Math.floor(W()*z.length)]);let le=.75+W()*.25;u.tint=[le,le,le*.95]}),l.paper({ambient:.05,defines:{INSTANCED:1},deform:{world:S(je*18)}}));D.frustumCulled=!1,p.add(D);let J=new ge(.34,.46),te=new O(ye(J,a.weather,(C,u)=>{u.pos=[(W()*2-1)*10.5,-W()*24,(W()*2-1)*10.5],u.cell=s.cell(z[Math.floor(W()*z.length)]);let N=.78+W()*.22;u.tint=[N,N,N*.95],u.seed=W()}),l.paper({ambient:.08,defines:{INSTANCED:1},deform:{pars:"uniform float uTurn;",local:`{
          float t = uTime * 0.25 + seed * 40.0;
          float ca = cos(t * 1.3), sa = sin(t * 1.3), cb = cos(t), sb = sin(t);
          p = vec3(p.x * ca - p.y * sa, p.x * sa + p.y * ca, p.z);
          p = vec3(p.x, p.y * cb - p.z * sb, p.y * sb + p.z * cb);
          n = vec3(n.x * ca - n.y * sa, n.x * sa + n.y * ca, n.z);
          n = vec3(n.x, n.y * cb - n.z * sb, n.y * sb + n.z * cb);
        }`,world:`{
          float fallen = iPos.y - uTime * 0.3;
          float y = fallen - floor((fallen - uCamY) / 24.0 + 0.5) * 24.0;
          vec3 centre = vec3(iPos.x + sin(uTime * 0.2 + seed * 30.0) * uInline * 0.4, y, iPos.z);
          float gone = smoothstep(0.1, 0.6, uTurn);
          centre.xz *= 1.0 + gone * 2.0;
          /* Tumbling paper keeps out of the lens: a huge sheet in the shot is noise. */
          vec3 fromCam = centre - cameraPosition;
          float dist = length(fromCam);
          centre += fromCam / max(dist, 0.001) * max(0.0, 5.0 - dist);
          wp += centre - iPos;
        }`,uniforms:{uTurn:r.uTurn}}}));te.frustumCulled=!1,p.add(te);let ne=t,pe=a.weather;return{group:p,u:r,*build(){yield},setRange(C,u){r.uOrderY.value.set(C,u)},setDensity(C){L.geometry.instanceCount=Math.floor(ne*C),te.geometry.instanceCount=Math.floor(pe*C)},setWeather(C){te.visible=C,D.visible=C}}}var gt={pars:"in float iClear; uniform float uClear;",world:`
    float clearF = clamp((uClear - iClear - seed * 0.34) / 0.62, 0.0, 1.0);
    if (clearF > 0.0) {
      clearF *= clearF;
      vec3 away = wp - (uLampOrigin + vec3(0.0, 0.0, -0.4));
      away.y = 0.0;
      wp += normalize(away + vec3(0.001)) * clearF * 2.4;
      wp.y += clearF * 0.9 - clearF * clearF * 1.9;
    }`};function Bo(){let a=document.createElement("canvas");a.width=1024,a.height=512;let o=a.getContext("2d");o.fillStyle="#7b4c2b",o.fillRect(0,0,1024,512);let p=Te("walnut");for(let r=0;r<520;r+=1){let f=p()*512,w=p()>.45;o.strokeStyle=w?`rgba(44,22,10,${.05+p()*.2})`:`rgba(180,120,74,${.03+p()*.1})`,o.lineWidth=.5+p()*2.4,o.beginPath(),o.moveTo(0,f);let g=p()*1.2;for(let n=0;n<=1024;n+=48)f+=(p()-.5)*4*g,o.lineTo(n,f);o.stroke()}for(let r=0;r<3;r+=1){let f=p()*1024,w=p()*512;for(let g=8;g<90;g+=5+p()*5)o.strokeStyle=`rgba(40,20,9,${.1+p()*.09})`,o.lineWidth=.8,o.beginPath(),o.ellipse(f,w,g*3.2,g*.8,0,0,Math.PI*2),o.stroke()}return Ue(a)}function wo({programs:l,shared:s,text:a,q:o,dir:p}){let r=d=>d*p,f=new Ne;f.name="desk";let w={uClear:{value:0},uRing:{value:0},uRingOn:{value:0}},g=new se(r(.27),.62,-.5),n=[r(-.02),-.38],h=[n[0],n[1]],c=new Ot(o.shadowSize,o.shadowSize,{depthTexture:new _t(o.shadowSize,o.shadowSize,Rt)});c.depthTexture.compareFunction=Dt,c.depthTexture.minFilter=Ke,c.depthTexture.magFilter=Ke;let A=new Lt,m={uMap:{value:Bo()},uShadow:{value:c.depthTexture},uClear:w.uClear,uDawnStripes:{value:1},uAmbient:{value:.045},uShadowTaps:{value:o.shadowTaps},uGloss:{value:1},uRings:{value:[1,0,0,0]},uRingCentreA:{value:[r(-.2),-.21,.046]},uRingCentreB:{value:[r(-.112),-.21,.046]},uTint:{value:[1,1,1]},uLampMatrix:{value:A}},R=new O(new we(1.6,.045,.8),l.wood({uniforms:m}));R.position.set(0,-.0225,-.4),f.add(R);let x={...m,uTint:{value:[.34,.31,.28]},uGloss:{value:0},uRings:{value:[0,0,0,0]}},S=.5,T=new O(xe([[0,-S-2.5,10,5],[0,S+2.5,10,5],[-S-2.5,0,5,S*2],[S+2.5,0,5,S*2]].map(([d,y,M,I])=>{let e=new we(M,.1,I);return e.translate(d,oe.floorY-.05,y),e})),l.wood({uniforms:x}));f.add(T);let v=[r(-.52),0,-.56],G=[r(-.156),0,-.21],_=[r(.66),.88,-.95],ie=[r(.31),0,-.64],$=[r(.62),0,-.62],W=[r(.72),.42,-.62],k=[r(.27),.72,-.5],j=[.24,.14,.08],H=xe([U(.07,.75,.07,{at:[-.74,-.4,-.06],color:j}),U(.07,.75,.07,{at:[.74,-.4,-.06],color:j}),U(.07,.75,.07,{at:[-.74,-.4,-.74],color:j}),U(.07,.75,.07,{at:[.74,-.4,-.74],color:j}),U(1.42,.09,.02,{at:[0,-.1,-.03],color:j}),U(.1,.012,.018,{at:[r(.42),-.1,-.014],color:[.76,.58,.3],mat:1}),U(.1,.012,.018,{at:[r(-.42),-.1,-.014],color:[.76,.58,.3],mat:1}),...so(_),...Zt($,W,k,p),...no(G,p),U(.07,.006,.07,{at:[r(-.02),.003,-.7],color:[.25,.25,.27]}),ze(new Ct(.002,.003,.17,6),{at:[r(-.02),.09,-.7],color:[.7,.7,.72]})]),F=new O(H,l.solid({ambient:.17,house:0}));f.add(F);let Z=new O(xe([U(12,7,.1,{at:[0,1.6,-1.05],color:[.62,.6,.6]}),U(12,.12,.03,{at:[0,oe.floorY+.06,-.99],color:[.2,.18,.17]}),U(1.62,.04,.04,{at:[r(-.46),1.54,-.97],color:[.55,.52,.5]}),U(1.62,.04,.04,{at:[r(-.46),.5,-.97],color:[.55,.52,.5]}),U(.04,1.08,.04,{at:[r(-1.27),1.02,-.97],color:[.55,.52,.5]}),U(.04,1.08,.04,{at:[r(.35),1.02,-.97],color:[.55,.52,.5]})]),l.solid({ambient:.2,house:0}));f.add(Z);let t=new O(xe(Kt(ie,p)),F.material),L=oo([[v[0]-.11*p,.05,v[2]+.03],[v[0]-.17*p,.03,v[2]+.06],[v[0]-.2*p,.012,v[2]+.13],[v[0]-.19*p,.05,v[2]-.03],[v[0]-.13*p,.11,v[2]-.08]],24),Y=new O(xe([...eo(v),L]),F.material);f.add(t,Y);let z=new O(to(),F.material);z.position.set(v[0],.135,v[2]-.08),f.add(z);let ee=F.material,D=new O(U(.012,.095,.004,{at:[0,.042,0],color:[.1,.1,.1]}),ee),J=new O(U(.007,.14,.004,{at:[0,.064,0],color:[.1,.1,.1]}),ee);D.position.set(_[0],_[1],_[2]+.026),J.position.set(_[0],_[1],_[2]+.03),f.add(D,J);let te=r(-.46),ne=new O(ze(new ge(1.58,1),{at:[te,1.02,-.985],color:[.075,.11,.21],mat:2}),l.solid({house:0,deform:{fpars:"uniform highp float uDawn;",frag:"c = mix(c, mix(vec3(0.365, 1.0, 0.87), vec3(0.643, 0.545, 1.0), clamp((vLampP.x + 0.5) * 0.7, 0.0, 1.0)), uDawn);"}}));f.add(ne);let pe=U(1.58,.042,.004,{color:[.72,.72,.7]});pe.deleteAttribute("uv");let C=new O(ye(pe,24,(d,y)=>{y.pos=[te,.54+(d+.5)*.0405,-.965]}),l.solid({house:0,ambient:.14,defines:{INSTANCED:1},deform:{local:`{
          float a = mix(0.86, 1.32, uDawn);
          float ca = cos(a), sa = sin(a);
          p = vec3(p.x, p.y * ca - p.z * sa, p.y * sa + p.z * ca);
          n = vec3(n.x, n.y * ca - n.z * sa, n.y * sa + n.z * ca);
        }`}}));C.frustumCulled=!1,f.add(C);let u=Te("desk"),N=[{x:-.66,z:-.3,h:.34},{x:-.58,z:-.68,h:.44},{x:-.27,z:-.67,h:.27},{x:.66,z:-.22,h:.2},{x:-.36,z:-.28,h:.13},{x:-.14,z:-.7,h:.15},{x:.66,z:-.42,h:.1},{x:-.7,z:-.08,h:.09}],X=[],q=new Map;for(let d of N){let y=0,M=0,I=0;for(;y<d.h&&X.length<o.stacks;){let e=.01+u()*.022;M+=(u()-.5)*.012,I+=(u()-.5)*.012,X.push({x:d.x+M,y:y+e/2,z:d.z+I,h:e,yaw:(u()-.5)*.34}),y+=e}q.set(d,{y,x:d.x+M,z:d.z+I})}let B=new we(1,1,1);B.deleteAttribute("uv");let le=ze(B),ce=new O(ye(le,X.length,(d,y)=>{let M=X[d];y.pos=[r(M.x),M.y,M.z],Pe(0,M.yaw,0,y.quat),y.scale=[.21+u()*.03,M.h,.297+u()*.03];let I=.74+u()*.26;y.tint=u()>.86?[I,I*.84,I*.72]:[I,I,I*.95],y.extra.iClear=2},{iClear:1}),l.solid({house:0,ambient:.13,defines:{INSTANCED:1},deform:gt}));ce.frustumCulled=!1,f.add(ce);let Ee=[{x:.5,z:-.14,n:.3},{x:-.5,z:-.2,n:.3},{x:-.3,z:-.5,n:.26}],V=ze(new we(1,1,1)),P=[];for(let d of Ee){let y=Math.floor(o.dossiers*d.n*.5),M=0;for(let I=0;I<y&&M<.2;I+=1){let e=.016+u()*.014,i=(u()-.5)*.5,E=.7+u()*.3;P.push({x:d.x+(u()-.5)*.02,y:M+e/2,z:d.z+(u()-.5)*.02,yaw:i,sx:.24,sy:e,sz:.33,tint:[.86*E,.7*E,.42*E]}),P.push({x:d.x,y:M+e+6e-4,z:d.z,yaw:i,sx:.016,sy:.0015,sz:.335,tint:[.92,.9,.84]}),M+=e}}let ue=new O(ye(V,P.length,(d,y)=>{let M=P[d];y.pos=[r(M.x),M.y,M.z],Pe(0,M.yaw,0,y.quat),y.scale=[M.sx,M.sy,M.sz],y.tint=M.tint,y.extra.iClear=2},{iClear:1}),l.solid({house:0,ambient:.13,defines:{INSTANCED:1},deform:gt}));ue.frustumCulled=!1,f.add(ue);let re=new ge(1,1,o.sheetSeg,o.sheetSeg);re.rotateX(-Math.PI/2);let Ve=["invoice","ledger","quote","receipt","lines","sheet","memo","invoice","carbon","slip"],fe=[],Oe=Math.min(30,Math.floor(o.sheets*.1));for(let d=0;d<Oe;d+=1){let y=.36+u()*.46,M=u()*Math.PI*2,I=Math.cos(M)*y*1.08,e=-.4+Math.sin(M)*y*.42;fe.push({x:I,z:e,y:.0012+u()*.012,yaw:u()*6.28,kind:0,clear:u()>.4?0:1})}for(let[d,y]of q){let M=Math.floor(o.sheets*.5/N.length*(.5+d.h*2));for(let I=0;I<M;I+=1)fe.push({x:y.x+(u()-.5)*.06,z:y.z+(u()-.5)*.06,y:y.y+I*.0015,yaw:(u()-.5)*.7,kind:1,clear:2})}let ot=Math.min(8,Math.floor(o.sheets*.02));for(let d=0;d<ot;d+=1){let y=d%2===0?1:-1;fe.push({x:y*(.24+u()*.46),z:-.08+u()*.05,y:.002+u()*.004,yaw:(u()-.5)*.3,kind:2,clear:0})}let Xe=Math.max(0,Math.floor(o.sheets*.24));for(let d=0;d<Xe;d+=1){let y=u()*Math.PI*2,M=.7+u()*1.5,I=Math.cos(y)*M*1.2,e=.1+Math.abs(Math.sin(y))*M*.7;Math.hypot(I,e)>.75&&fe.push({x:I,z:e,y:oe.floorY+.002+u()*.004,yaw:u()*6.28,kind:0,clear:2})}for(let d=0;d<8;d+=1)fe.push({x:-.02+(u()-.5)*.015,z:-.7+(u()-.5)*.015,y:.02+d*.012,yaw:u()*6.28,kind:3,clear:2});let nt=l.paper({house:0,ambient:.05,defines:{INSTANCED:1},deform:{pars:`${gt.pars} in float iCurl;`,local:`
        float cx = uv.x - 0.5, cz = uv.y - 0.5;
        p.y += (cx * cx * 0.03 + cz * cz * 0.05) * iCurl;
        /* A sheet by the edge lifts a little in the draught from the printer. */
        p.y += sin(uTime * 2.6 + seed * 37.0) * 0.0012 * max(iCurl - 0.8, 0.0) * (cz + 0.5);
        n.xz -= vec2(cx * 0.06, cz * 0.1) * iCurl;`,world:gt.world}}),Re=new O(ye(re,fe.length,(d,y)=>{let M=fe[d],I=M.kind===3;y.pos=[r(M.x),M.y,M.z],Pe(0,M.yaw,0,y.quat),y.scale=I?[.08,1,.16]:[.21,1,.297];let e=I?"receipt":Ve[Math.floor(u()*Ve.length)];y.cell=a.cell(e);let i=.82+u()*.18;y.tint=e==="carbon"?[.98,.72*i,.72*i]:e==="slip"?[.99,.9*i,.62*i]:[i,i,i*.96],y.extra.iClear=M.clear,y.extra.iCurl=M.kind===2?1.6:.5+u()},{iClear:1,iCurl:1}),nt);Re.frustumCulled=!1,f.add(Re);let De=new O(new ge(.34,.34),l.glow({color:[1,.74,.46],alpha:.5,defines:{BILLBOARD:1}}));De.position.set(g.x,g.y+.03,g.z),De.frustumCulled=!1,f.add(De);let We=new O(ye(new ge(1,1),2,(d,y)=>{y.pos=d===0?[r(.34),.42,-.985]:[r(-.46),.95,-.98],y.scale=d===0?[2.6,1.9,1]:[3.2,2.2,1],y.tint=d===0?[.13,.086,.047]:[.028,.038,.067]}),l.glow({defines:{INSTANCED:1}}));We.frustumCulled=!1,f.add(We);let Ye=new Ct(.05,.54,.86,26,1,!0),be=new O(Ye,l.glow({color:[1,.72,.42],alpha:.13,shape:5,deform:{frag:"a = vUv.y * vUv.y; { float f = abs(dot(normalize(vN), normalize(vV))); a *= f * f; }"}}));be.frustumCulled=!1,f.add(be);let st=new ge(.009,.009),Ie=new O(ye(st,o.dust,(d,y)=>{let M=Math.sqrt(u()),I=u()*Math.PI*2,e=M*.34;y.pos=[g.x+(h[0]-g.x)*M+Math.cos(I)*e,g.y*(1-M)+.04,g.z+(h[1]-g.z)*M+Math.sin(I)*e],y.tint=[1,.82,.6]}),l.glow({alpha:.42,defines:{INSTANCED:1,BILLBOARD:1},deform:{world:"wp += vec3(sin(uTime * 0.21 + seed * 40.0), sin(uTime * 0.17 + seed * 90.0), cos(uTime * 0.19 + seed * 70.0)) * 0.03;"}}));Ie.frustumCulled=!1,f.add(Ie);let Le=g.clone(),Ae=new ht(122,1,.05,2.2),pt=new se(0,0,-1),he=new se,Ce={x:0,y:0,z:0},Je=0,Fe=new Lt().set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.4975,0,0,0,1),Ge=Re.geometry.instanceCount,xt=ce.geometry.instanceCount,ft=ue.geometry.instanceCount,Qe=d=>{D.rotation.z=-(d%12/12)*Math.PI*2,J.rotation.z=-(d%1)*Math.PI*2};return Qe(3.2),{group:f,u:w,handset:z,material:F.material,setClock:Qe,lampPos:Le,pool:n,landline:{x:v[0],z:v[2]-.08},*build(){yield},setActPositions(d){Ce=d},setPhone(d){d.position.set(0,.0043,-.4),d.visible=!1,f.add(d),this.phone=d},setAct(d){d===4?f.position.set(Ce.x,Ce.y,Ce.z):f.position.set(0,0,0)},setSpot(d,y){h[0]=d,h[1]=y},resetSpot(){h[0]=n[0],h[1]=n[1]},setRing(d){Je=d},setShadowTaps(d){m.uShadowTaps.value=d},setDensity(d){Re.geometry.instanceCount=Math.floor(Ge*d),ce.geometry.instanceCount=Math.floor(xt*d),ue.geometry.instanceCount=Math.floor(ft*d)},setExtras(d){Ie.visible=d,be.visible=d},bakeShadow(d){let y=[R,T,De,be,Ie,ne,C,Z,We];this.phone&&y.push(this.phone);let M=y.map(b=>b.visible),I=f.position.clone(),e=w.uClear.value,i=f.visible;f.visible=!0,y.forEach(b=>{b.visible=!1}),f.position.set(0,0,0),f.updateMatrixWorld(!0),w.uClear.value=0,s.uLampOrigin.value.set(0,0,0),Ae.position.copy(Le),Ae.up.copy(pt),Ae.lookAt(r(-.02),0,-.38),Ae.updateMatrixWorld(),Ae.updateProjectionMatrix();let E=d.getRenderTarget();d.setRenderTarget(c),d.clear(),d.render(f,Ae),d.setRenderTarget(E),A.multiplyMatrices(Fe,Ae.projectionMatrix).multiply(Ae.matrixWorldInverse),y.forEach((b,Q)=>{b.visible=M[Q]}),f.position.copy(I),f.visible=i,f.updateMatrixWorld(!0),w.uClear.value=e},setClear(d){w.uClear.value=d,m.uClear.value=d;let y=(I,e,i)=>{let E=Vt((d-e)/.7),b=E*E;I.position.set(i*b*2.2*p,b*.5-b*b*1.6,-b*.2),I.rotation.z=-b*1.2*i*p,I.visible=E<1};y(Y,1,-1),y(t,2,1);let M=d>=3;Re.visible=!M,ce.visible=!M,ue.visible=!M},update(d,y){let M=y%3,I=M<.42||M>.62&&M<1.04?1:0,e=Math.abs(Math.sin(y*37.7))*.006*I*Je;Je>0&&(z.position.y=.135+e,z.rotation.z=Math.sin(y*75)*.012*I*Je);let i=h[0]+(d.pointer===1?d.px*.2:0),E=h[1]+(d.pointer===1?d.py*.12:0);he.set(i-Le.x,-Le.y,E-Le.z).normalize(),s.uLampDir.value.copy(he),s.uLampPos.value.copy(Le),s.uLampCone.value.set(.6,.93),be.position.set(Le.x+he.x*.43,Le.y+he.y*.43,Le.z+he.z*.43),be.quaternion.setFromUnitVectors(No,he.negate())}}}var No=new se(0,1,0);var ut=new se;function Se(l,s,a,o,p,r){let f=2*Math.PI*p/4,w=Math.max(r-2*p,0),g=Math.PI/4;ut.copy(s),ut[o]=0,ut.normalize();let n=.5*f/(f+w),h=1-ut.angleTo(l)/g;return Math.sign(ut[a])===1?h*n:w/(f+w)+n+n*(1-h)}var dt=class l extends we{constructor(s=1,a=1,o=1,p=2,r=.1){let f=p*2+1;if(r=Math.min(s/2,a/2,o/2,r),super(1,1,1,f,f,f),this.type="RoundedBoxGeometry",this.parameters={width:s,height:a,depth:o,segments:p,radius:r},f===1)return;let w=this.toNonIndexed();this.index=null,this.attributes.position=w.attributes.position,this.attributes.normal=w.attributes.normal,this.attributes.uv=w.attributes.uv;let g=new se,n=new se,h=new se(s,a,o).divideScalar(2).subScalar(r),c=this.attributes.position.array,A=this.attributes.normal.array,m=this.attributes.uv.array,R=c.length/6,x=new se,S=.5/f;for(let T=0,v=0;T<c.length;T+=3,v+=2)switch(g.fromArray(c,T),n.copy(g),n.x-=Math.sign(n.x)*S,n.y-=Math.sign(n.y)*S,n.z-=Math.sign(n.z)*S,n.normalize(),c[T+0]=h.x*Math.sign(g.x)+n.x*r,c[T+1]=h.y*Math.sign(g.y)+n.y*r,c[T+2]=h.z*Math.sign(g.z)+n.z*r,A[T+0]=n.x,A[T+1]=n.y,A[T+2]=n.z,Math.floor(T/R)){case 0:x.set(1,0,0),m[v+0]=Se(x,n,"z","y",r,o),m[v+1]=1-Se(x,n,"y","z",r,a);break;case 1:x.set(-1,0,0),m[v+0]=1-Se(x,n,"z","y",r,o),m[v+1]=1-Se(x,n,"y","z",r,a);break;case 2:x.set(0,1,0),m[v+0]=1-Se(x,n,"x","z",r,s),m[v+1]=Se(x,n,"z","x",r,o);break;case 3:x.set(0,-1,0),m[v+0]=1-Se(x,n,"x","z",r,s),m[v+1]=1-Se(x,n,"z","x",r,o);break;case 4:x.set(0,0,1),m[v+0]=1-Se(x,n,"x","y",r,s),m[v+1]=1-Se(x,n,"y","x",r,a);break;case 5:x.set(0,0,-1),m[v+0]=Se(x,n,"x","y",r,s),m[v+1]=1-Se(x,n,"y","x",r,a);break}}static fromJSON(s){return new l(s.width,s.height,s.depth,s.segments,s.radius)}};var Oo=[.2,.21,.25],Wo=[.365,1,.87];function go({programs:l,text:s,dir:a}){let o=(n,h,c)=>ze(new dt(n,h,c,4,Math.min(c*.45,n*.12)),{color:Oo}),p=null;function r({w:n=.78,h=1.6,t:c=.09,emissive:A=1}={}){let m=new Ne,R=new O(xe([o(n,c,h),U(n*.965,c*.02,n*.012,{at:[0,c/2+.001,-h*.482],color:[.7,.72,.76],mat:1}),U(n*.965,c*.02,n*.012,{at:[0,c/2+.001,h*.482],color:[.7,.72,.76],mat:1}),U(n*.012,c*.02,h*.965,{at:[-n*.482,c/2+.001,0],color:[.7,.72,.76],mat:1}),U(n*.012,c*.02,h*.965,{at:[n*.482,c/2+.001,0],color:[.7,.72,.76],mat:1})]),l.solid({ambient:.32,house:1}));m.add(R);let x=new ge(n*.94,h*.96);x.rotateX(-Math.PI/2),x.translate(0,c/2+.003,0),p??(p=g(360,720,12));let S=l.paper({atlas:{value:p},house:0,ambient:A,defines:{}}),T=new O(x,S);return m.add(T),m.userData={screen:T,screenMaterial:S,w:n,h,t:c},m}function f({w:n=.78,h=1.6,t:c=.09,color:A=Wo,alpha:m=.9}={}){let R=new Ut(new dt(n,c,h,3,Math.min(c*.45,n*.12)),10);return new Gt(R,l.wire({color:A,alpha:m}))}function w({w:n=.78,h=1.6}={}){let c=Te("phone-board"),A=l.solid({ambient:.14,house:1}),m=new O(o(n,.03,h),A),x=[U(n*.88,.016,h*.9,{color:[.05,.3,.2]}),U(n*.68,.03,h*.42,{at:[0,.02,h*.19],color:[.2,.22,.26]})];for(let k=0;k<30;k+=1){let j=.03+c()*.08,H=.03+c()*.09;x.push(U(j,.018,H,{at:[(c()-.5)*n*.74,.016,-h*.28+(c()-.5)*h*.26],color:c()>.7?[.76,.58,.3]:[.1,.1,.12],mat:c()>.7?1:0}))}let S=new O(xe(x),A),T=xe([U(n,.05,.05,{at:[0,0,-h/2+.025],color:[.62,.64,.68],mat:1}),U(n,.05,.05,{at:[0,0,h/2-.025],color:[.62,.64,.68],mat:1}),U(.05,.05,h,{at:[-n/2+.025,0,0],color:[.62,.64,.68],mat:1}),U(.05,.05,h,{at:[n/2-.025,0,0],color:[.62,.64,.68],mat:1})]),v=new O(T,A),G=new ge(n*.94,h*.96);G.rotateX(-Math.PI/2);let _=l.paper({atlas:{value:s.texture},cell:[0,0,1,1],house:0,ambient:1}),ie=new O(G,_),$=new we(n*.98,.006,h*.98),W=new O($,l.glow({color:[.8,.9,1],alpha:.05,shape:5}));return{back:m,board:S,frame:v,display:ie,displayMaterial:_,glass:W}}function g(n,h,c,A){return s.canvas(n,h,(m,R,x)=>{if(m.fillStyle="#0b0d13",m.fillRect(0,0,R,x),A){A(m,R,x);return}let S=x/13;for(let T=0;T<c;T+=1){m.fillStyle="rgba(255,255,255,.07)",m.fillRect(R*.06,S*(T+1),R*.88,S*.74),m.fillStyle=T%3===0?"#5dffde":"#a48bff";let v=a<0?R*.78:R*.1;m.fillRect(v,S*(T+1)+S*.16,R*.12,S*.42),m.fillStyle="rgba(232,236,244,.7)",m.fillRect(a<0?R*.28:R*.26,S*(T+1)+S*.28,R*.46,S*.16)}})}return{make:r,wire:f,layers:w,listTexture:g}}var Me=4200,xo=.12,Yo=.6,Go=.03;function yo({programs:l,shared:s,printTexture:a,dir:o}){let p=new _e(new Float32Array(Me*2*3),3).setUsage(rt),r=new _e(new Float32Array(Me*2*3),3).setUsage(rt),f=new _e(new Float32Array(Me*2),1),w=new _e(new Float32Array(Me*2),1).setUsage(rt),g=new _e(new Float32Array(Me*2),1).setUsage(rt),n=new Uint32Array((Me-1)*6);for(let H=0;H<Me;H+=1)if(f.array[H*2]=-1,f.array[H*2+1]=1,H<Me-1){let F=H*2;n.set([F,F+1,F+2,F+1,F+3,F+2],H*6)}let h=new Yt;h.setAttribute("position",p),h.setAttribute("aAcross",r),h.setAttribute("aSide",f),h.setAttribute("aS",w),h.setAttribute("aW",g),h.setIndex(new _e(n,1));let c={uFeed:{value:0},uLine:{value:1e6},uLineLen:{value:4},uJamA:{value:0},uJamB:{value:0},uJamK:{value:0},uFlutter:{value:1},uWide:{value:1e6},uPrint:{value:a},uPrintRange:{value:0},uPaperGlow:{value:.22},uLineColor:{value:[.365,1,.87]}},A=l.strip({uniforms:c,side:2}),m=new O(h,A);m.frustumCulled=!1;let R=new O(h,l.glow({color:[.365,1,.87],alpha:.5,shape:5,house:0,deform:{pars:"in vec3 aAcross; in float aSide, aS, aW; uniform float uLine, uLineLen; out float vSide, vAlive;",fpars:"in float vSide, vAlive;",local:`{
          float z = max(-(viewMatrix * vec4(p, 1.0)).z, 0.05);
          p += aAcross * aSide * min(max(aW * 5.0, 0.16), z * 0.02);
        }`,world:"vSide = aSide; vAlive = smoothstep(uLine + uLineLen * 0.7, uLine + uLineLen, aS);",frag:"a = (1.0 - abs(vSide)); a = a * a * vAlive;",uniforms:{uLine:c.uLine,uLineLen:c.uLineLen}}}));R.frustumCulled=!1;let x=new Float32Array(Me),S=new Float32Array(Me),T=0,v=0,G=0,_=(H,F,Z,t,L,Y,z,ee)=>{if(T>=Me)return;let D=T*2;p.setXYZ(D,H,F,Z),p.setXYZ(D+1,H,F,Z),r.setXYZ(D,t,L,Y),r.setXYZ(D+1,t,L,Y),w.setX(D,z),w.setX(D+1,z),g.setX(D,ee),g.setX(D+1,ee),x[T]=z,S[T]=F,T+=1};function ie({yaws:H,lineStartY:F,endY:Z,dense:t}){T=0;let L=0,Y=.31*o,z=[[Y,.11,-.5],[Y,.085,-.43],[Y*.92,.012,-.34],[Y*.62,.003,-.24],[Y*.22,.003,-.11],[0,.003,-.025],[0,-.004,.008],[0,-.03,.012]],ee=24,D=z[0];for(let ne=0;ne<z.length-1;ne+=1){let pe=z[Math.max(0,ne-1)],C=z[ne],u=z[ne+1],N=z[Math.min(z.length-1,ne+2)];for(let X=ne===0?0:1;X<=ee;X+=1){let q=X/ee,B=q*q,le=B*q,ce=[0,1,2].map(re=>.5*(2*C[re]+(u[re]-pe[re])*q+(2*pe[re]-5*C[re]+4*u[re]-N[re])*B+(3*C[re]-pe[re]-3*u[re]+N[re])*le)),Ee=ce[0]-D[0],V=ce[1]-D[1],P=ce[2]-D[2];L+=Math.hypot(Ee,V,P);let ue=Math.hypot(Ee,P)||1;_(ce[0],ce[1],ce[2],P/ue||1,0,-Ee/ue||0,L,xo),D=ce}}v=L,G=D[1];let J=D[1],te=0;for(;J>Z&&T<Me;){let ne=.22;J>oe.slabBottom-.5&&(ne=.05);for(let B of t)J<B.a&&J>B.b&&(ne=.022);for(J-=ne,L+=ne;te<H.length-1&&J<H[te+1].y;)te+=1;let pe=H[te],C=H[Math.min(te+1,H.length-1)],u=C===pe?0:vt(.25,.75,(pe.y-J)/Math.max(.001,pe.y-C.y)),N=mt(pe.yaw,C.yaw,u)*Math.PI/180,X=vt(oe.floorY-.2,oe.slabBottom+.2,J),q=mt(xo,Yo,X);J<F&&(q=mt(q,Go,vt(0,4,F-J))),_(0,J,0,Math.cos(N),0,Math.sin(N),L,q)}p.needsUpdate=!0,r.needsUpdate=!0,w.needsUpdate=!0,g.needsUpdate=!0,c.uLine.value=$(F),c.uPrintRange.value=$(oe.floorY-.1),c.uWide.value=$(oe.deskY)}function $(H){return v+(G-H)}function W(H){let F=0,Z=T-1;for(;F<Z;){let t=F+Z>>1;x[t]<H?F=t+1:Z=t}return F}let k=-1/0;function j(H,F){let Z=H+F,t=Z>G?0:W($(Z)),L=W($(Math.max(H-F,k))),Y=Math.max(0,L-t)*6;h.setDrawRange(t*6,Y)}return{mesh:m,halo:R,u:c,rebuild:ie,focus:j,setEnd(H){k=H},sAtY:$,pointAtY(H,F){return F[0]=0,F[1]=H,F[2]=0,F}}}var qo=460812,_o=12e3,Uo=()=>new Promise(l=>{window.scheduler?.yield?window.scheduler.yield().then(l):setTimeout(l,0)});async function Pt(l){let s=performance.now();for(;;){if(l.next().done)return;performance.now()-s>4&&(await Uo(),s=performance.now())}}async function H0({canvas:l,gl:s,tier:a,forced:o,onFail:p,onOff:r,isFailed:f}){Nt.enabled=!1;let w={...fo[a],instanceScale:1},g=document.documentElement,n=g.dir==="rtl"?-1:1,h=window.matchMedia("(pointer: coarse)").matches,c=new jt({canvas:l,context:s,antialias:!0});c.outputColorSpace=Ht,c.setClearColor(qo,1),c.sortObjects=!1,c.debug.checkShaderErrors=o,c.info.autoReset=!0;let A=new Wt,m=new ht(30,1,.1,100);await uo(n<0);let R=po({q:w,dir:n}),x={uTime:{value:0},uInline:{value:n},uCamY:{value:0},uDawn:{value:0},uPower:{value:new qe(0,0)},uPowerY:{value:0},uLitY:{value:new qe(oe.slabBottom,-120)},uFog:{value:new qe(4,40)},uLampOrigin:{value:new se},uLampPos:{value:new se(.5*n,.62,-.62)},uLampDir:{value:new se(0,-1,0)},uLampColor:{value:new se(1,.7,.42)},uLampOn:{value:1},uLampCone:{value:new qe(.55,.9)},uAtlas:{value:R.texture}},S=co(x),T=yo({programs:S,shared:x,printTexture:R.printTexture,dir:n}),v=wo({programs:S,shared:x,text:R,q:w,dir:n,tier:a}),G=vo({programs:S,shared:x,text:R,q:w,dir:n,tier:a}),_=go({programs:S,shared:x,text:R,dir:n}),ie={desk:v,archive:G,strip:T,phone:_};v.setPhone(_.make({w:.0775,h:.16,t:.0085})),A.add(v.group,G.group,T.mesh,T.halo);let $=$e.map((e,i)=>({meta:e,index:i,status:"idle",module:null,group:new Ne,ctx:null,on:!1,a:0,s:0,e:0,b:0,promise:null})),W=Object.fromEntries($.map(e=>[e.meta.id,e]));$.forEach(e=>{e.group.visible=!1,A.add(e.group)});let k=null,j=null,H=null,F=1,Z=1/0,t=0,L=0,Y=0,z=()=>k.svh*.15;function ee(){k=io();let e=Xt(k,$e);j=e.solved,F=k.docH,H=Jt(e.knots,F);let i=j["svc.auto"],E=j["process.head"],b=j["why.q"],Q=$e.filter(K=>K.floor&&K.stripYaw!==void 0).map(K=>({y:j[K.id].floorY,yaw:K.stripYaw}));Q.unshift({y:oe.deskY,yaw:0}),Q.push({y:i.floorY+3,yaw:0},{y:i.floorY+1,yaw:90},{y:i.floorY-3,yaw:90},{y:E.floorY+2,yaw:0}),Q.sort((K,ve)=>ve.y-K.y),T.rebuild({yaws:Q,lineStartY:i.floorY-1.8,endY:b.floorY+.03,dense:[{a:j["svc.rescue"].floorY+2.4,b:j["svc.rescue"].floorY-2.4}]}),x.uLitY.value.set(oe.slabBottom,E.floorY+4),G.setRange(oe.slabBottom,E.floorY);let de=k.shots.drop,me=k.shots.fall;t=de.pinStart+(de.pinEnd-de.pinStart)*.86,Z=me.pinStart+(me.pinEnd-me.pinStart)*.5,L=de.pinStart+(de.pinEnd-de.pinStart)*.8,Y=me.pinStart+(me.pinEnd-me.pinStart)*.4;for(let K of $){let ve=K.index,Be=k.shots[K.meta.id],at=ve>0?k.shots[$e[ve-1].id]:null,it=ve<$e.length-1?k.shots[$e[ve+1].id]:null;K.a=at?at.pinEnd:0,K.s=Be.pinStart,K.e=Be.pinEnd,K.b=it?it.pinStart:F;let yt=j[K.meta.id];K.group.position.set(0,yt.floorY??0,0),K.status==="ready"&&K.module.layout&&K.module.layout(K.ctx)}v.setActPositions(j.deskAct4),ne()}let D=1,J=0,te=null;function ne(){let e=k.W,i=k.H,E=w.pixelCap*D,b=Math.min(window.devicePixelRatio||1,Math.sqrt(E/(e*i)));c.setPixelRatio(b),c.setSize(e,i,!1),m.aspect=e/i,te?.resize(e*b,i*b)}let pe=[],C=e=>({tier:a,q:w,dir:n,id:e.meta.id,group:e.group,programs:S,u:x,text:R,sets:ie,camera:m,renderer:c,rng:Te(e.meta.id),get solved(){return j},get layout(){return k},get self(){return j[e.meta.id]},place(i,{inline:E=0,y:b=0,z:Q=0,yaw:de=0}={}){return i.position.set(E*n,b,Q),i.rotation.y=de*n,i},hotspots:{add(i){pe.push({...i,runtime:e})}}});async function u(e){if(e.status!=="ready")return e.promise||(e.status="loading",e.promise=(async()=>{try{let E=(await ho[e.meta.id]()).default;e.ctx=C(e),await Pt(E.build(e.ctx)),await c.compileAsync(e.group,m,A),E.layout&&E.layout(e.ctx),e.module=E,e.status="ready",fe=!0}catch(i){console.warn(`shot ${e.meta.id} failed`,i),e.status="failed"}})()),e.promise}function N(e){for(let i=$.length-1;i>=0;i-=1)if(e>=$[i].a)return i;return 0}let X=!1;async function q(){if(!X){for(X=!0;!(re||f());){let e=N(P),i=null,E=1/0;for(let b of $)if(b.status==="idle"){let Q=Math.abs(b.index-e);Q<E&&(i=b,E=Q)}if(!i)break;await new Promise(b=>{"requestIdleCallback"in window?window.requestIdleCallback(b,{timeout:200}):setTimeout(b,16)}),await u(i)}X=!1}}let B=new Float32Array(13),le=new Bt,ce=new se(0,1,0),Ee=new se(1,0,0),V={t:0,enter:0,hold:0,exit:0,y:0,v:0,time:0,dt:0,px:0,py:0,pointer:0},P=window.scrollY,ue=0,re=!1,Ve=null,fe=!0,Oe=0,ot=performance.now(),Xe=0,nt=performance.now(),Re=0,De=0,We=0,Ye=0,be=0,st=0,Ie=!1,Le=h?.09:.14;function Ae(e,i){let E=2/Le,b=E*i,Q=1/(1+b+.48*b*b+.235*b*b*b),de=P-e,me=(ue+E*de)*i;ue=(ue-E*me)*Q,P=e+(de+me)*Q,Math.abs(P-e)<.25&&Math.abs(ue)<2&&(P=e,ue=0)}function pt(e,i){let E=b=>Math.min(1,Math.max(0,b));V.t=e.b>e.a?E((P-e.a)/(e.b-e.a)):1,V.enter=e.s>e.a?E((P-e.a)/(e.s-e.a)):P>=e.s?1:0,V.hold=e.e>e.s?E((P-e.s)/(e.e-e.s)):P>=e.e?1:0,V.exit=e.b>e.e?E((P-e.e)/(e.b-e.e)):P>=e.b?1:0,V.y=P,V.v=ue,V.time=Oe,V.dt=i,V.px=Ye,V.py=be,V.pointer=We}let he=(e,i)=>i>e?Math.min(1,Math.max(0,(P-e)/(i-e))):P>=i?1:0,Ce=e=>e*e*(3-2*e);function Je(){let e=k.shots["process.head"];G.u.uTurn.value=Ce(he(e.pinStart,e.pinEnd));let i=k.shots["why.list"],E=k.shots["why.stats"],b=k.shots.cta,Q=he(i.pinStart,i.pinEnd)*3.2;v.setClear(Q);let de=Ce(he(i.pinStart+(i.pinEnd-i.pinStart)*.45,b.pinStart));x.uDawn.value=de,v.setClock(3.2+Ce(he(i.pinStart,E.pinEnd))*3.8);let me=k.shots.hero;P<Z?v.setRing(1-he(me.pinEnd,me.pinEnd+(k.shots.drop.pinEnd-me.pinEnd)*.14)):v.setRing(1-he(i.pinStart,i.pinStart+(i.pinEnd-i.pinStart)*.5));let K=v.phone;if(K.visible=P>Z,T.setEnd(-1/0),P>Z){let Be=k.shots["why.q"],at=j["why.q"].d*.62,it=Ce(he(k.shots.fall.pinEnd-(k.shots.fall.pinEnd-Z)*.2,Be.pinEnd)),yt=Ce(he(i.pinStart,i.pinStart+(i.pinEnd-i.pinStart)*.14)),Tt=at+(.42-at)*it,kt=Tt+(.0043-Tt)*yt;K.position.y=kt;let bo=2.1+(1-2.1)*it;K.scale.setScalar(bo),K.rotation.y=k.portrait?0:Math.PI/2*Ce(he(E.pinEnd,b.pinStart)),T.setEnd(v.group.position.y+kt+.01)}let ve=$.find(Be=>Be.meta.id==="svc.rescue");(P<ve.a||P>ve.b)&&(x.uPower.value.set(0,0),T.u.uJamK.value=0)}function Fe(e){Qt(H,F,P,B),m.position.set(B[0],B[1],B[2]),m.quaternion.set(B[3],B[4],B[5],B[6]),We===1&&(le.setFromAxisAngle(ce,-Ye*.012),m.quaternion.multiply(le),le.setFromAxisAngle(Ee,be*.009),m.quaternion.multiply(le)),m.fov=B[7],m.near=B[8],m.far=B[9],m.setViewOffset(k.W,k.H,B[11],B[12],k.W,k.H),x.uTime.value=Oe,x.uCamY.value=B[1],x.uFog.value.set(B[10]*.16,B[10]),Je();let i=P<t||P>Z,E=P>Z?4:1;v.group.visible=i,v.setAct(E),G.group.visible=P>L&&P<Y,x.uLampOn.value=i?1-x.uDawn.value*.72:0,x.uLampOrigin.value.copy(v.group.position),x.uLampColor.value.set(1,.7,.42),T.u.uFeed.value=P*18e-5,pt($[0],e),i&&(v.resetSpot(),v.update(V,Oe));for(let b of $){let Q=P>=b.a-z()&&P<=b.b+z();b.status==="ready"&&(Q||b.on)&&(pt(b,e),b.module.update(V,b.ctx),b.on=Q,b.group.visible=Q)}T.focus(B[1],B[9]),m.updateProjectionMatrix(),m.updateMatrixWorld(),te?te.render(A,m):c.render(A,m)}let Ge=new wt({onChange(e,i){xt(i)}});function xt(e){if(e==="pixel-85"||e==="pixel-72")J=e==="pixel-85"?.85:.72;else if(e==="drop-film")te?.dispose(),te=null;else if(e==="instances-70"||e==="instances-50")w.instanceScale=e==="instances-70"?.7:.5,v.setDensity(w.instanceScale),G.setDensity(w.instanceScale);else if(e==="shadow-1")v.setShadowTaps(1);else if(e==="extras-off")G.setWeather(!1),v.setExtras(!1);else if(e==="cadence-30")st=33.3;else if(e==="stills"){try{window.localStorage.setItem("enjaz:tier",`S:${Date.now()}`)}catch{}Qe(),r("governor")}}function ft(e){if(re)return;if(window.requestAnimationFrame(ft),document.hidden||Ie||Ve!==null){ot=e;return}let i=e-ot;ot=e;let E=Math.min(i,100)/1e3;Oe+=E;let b=window.scrollY,Q=Math.abs(b-P)>.25||Math.abs(ue)>2;Ae(b,E),Ye+=(Re-Ye)*Math.min(1,E*6),be+=(De-be)*Math.min(1,E*6);let de=Math.abs(Re-Ye)>.001||Math.abs(De-be)>.001,K=$[N(P)].meta.idleHz,ve=Q||de||fe;if(!ve&&K>0&&!(a==="L"&&e-nt>_o)&&(ve=e-Xe>=1e3/K-1),st&&e-Xe<st-2&&(ve=!1),!ve)return;Q&&(nt=e),J&&(!Q||P>k.shots.fall.pinStart&&P<k.shots.fall.pinEnd)&&(D=J,J=0,ne()),fe=!1;let Be=(e-Xe)/1e3;Xe=e,Fe(Math.min(Be,.1)),i<250&&(Q||K>0)&&Ge.push(i)}function Qe(){re=!0}window.addEventListener("pointermove",e=>{We=e.pointerType==="mouse"?1:2,Re=e.clientX/window.innerWidth*2-1,De=e.clientY/window.innerHeight*2-1,nt=performance.now()},{passive:!0});let d=new se;window.addEventListener("click",e=>{if(!e.target.closest?.("a, button, .shot"))for(let i of pe){if(!i.runtime.on)continue;d.set(i.center[0],i.center[1],i.center[2]),i.runtime.group.localToWorld(d).project(m);let E=(d.x*.5+.5)*k.W,b=(.5-d.y*.5)*k.H;Math.hypot(E-e.clientX,b-e.clientY)<i.radius&&(i.runtime.module.hit?.(i.id,V,i.runtime.ctx),fe=!0)}},{passive:!0}),window.addEventListener("pageshow",()=>{P=window.scrollY,fe=!0});let y=0;if(l.addEventListener("webglcontextlost",e=>{e.preventDefault(),Ie=!0,y+=1,r("context-lost")}),l.addEventListener("webglcontextrestored",()=>{y>1||(Ie=!1,v.bakeShadow(c),fe=!0,g.classList.remove("world-off"))}),ee(),P=window.scrollY,await Pt(v.build()),await Pt(G.build()),await u(W.hero),await u(W.drop),await c.compileAsync(A,m),v.bakeShadow(c),f())return null;if(!o){let e=[],i=new Uint8Array(4);for(let b=0;b<6;b+=1){await new Promise(de=>window.requestAnimationFrame(de));let Q=performance.now();Fe(.016),s.readPixels(0,0,1,1,s.RGBA,s.UNSIGNED_BYTE,i),e.push(performance.now()-Q)}let E=e.slice(2).sort((b,Q)=>b-Q)[1];if(E>40){try{window.localStorage.setItem("enjaz:tier",`S:${Date.now()}`)}catch{}return p("bench"),null}E>20&&(D=.7,w.instanceScale=.7,v.setDensity(.7),G.setDensity(.7),ne())}w.film&&(te=(await import("./chunk-WOIDP7SL.js")).createFilm(c),te.resize(k.W*c.getPixelRatio(),k.H*c.getPixelRatio())),Fe(.016),g.classList.add("world-on"),window.requestAnimationFrame(ft),q();let M=ro(()=>{ee(),fe=!0});/[?&]hud=1\b/.test(window.location.search)&&import("./chunk-FKFVKEYL.js").then(e=>e.mountHud({renderer:c,governor:Ge,tier:a,q:w,get y(){return P}}));let I={tier:a,renderer:c,governor:Ge,scene:A,stop:Qe,get layout(){return k},get solved(){return j},seek(e){return window.scrollTo({top:e,behavior:"instant"}),P=window.scrollY,ue=0,Fe(.016),P},freeze(e){Ve=e,Oe=e},unfreeze(){Ve=null},renderOnce(){Fe(.016)},info(){return Fe(.016),{calls:c.info.render.calls,triangles:c.info.render.triangles,programs:c.info.programs.length,rung:Ge.rung,y:P}},sceneInfo(){let e=te;te=null,Fe(.016);let i={calls:c.info.render.calls,triangles:c.info.render.triangles};return te=e,i},feedFrameTimes(e){e.forEach(i=>Ge.push(i))},async loadAll(){await Promise.all($.map(e=>u(e))),fe=!0},status(){return Object.fromEntries($.map(e=>[e.meta.id,e.status]))},dispose(){Qe(),M()}};return window.__enjazWorld=I,I}export{H0 as start};
