/* three.js r187 (c) three.js authors, MIT. ENJAZ film. */
import{a as ee,b as Jt,c as Qt,d as Kt}from"./chunk-UCOIGGEA.js";import{a as Zt,b as eo,c as to,d as oo,e as so,f as Ct,g as no,h as ao}from"./chunk-2EEOQMQQ.js";import{c as Le,d as $,f as ge,g as Pe,h as xe,i as Te,j as Xt,k as ht,l as Ge}from"./chunk-GBHZZ3DY.js";import{A as _t,B as Ut,C as ve,D as zt,E as $t,J as we,N as jt,O as ft,S as Vt,a as bt,c as St,d as Mt,e as Xe,f as Rt,g as Ft,h as Ht,i as Dt,j as It,k as rt,l as Bt,m as We,n as Nt,o as ae,p as Ot,q as Wt,r as Lt,t as De,u as Yt,v as Ye,w as Gt,x as B,z as qt}from"./chunk-ZD75F7KI.js";import"./chunk-AEJNSRIJ.js";var At=["pixel-85","pixel-72","drop-film","instances-70","instances-50","shadow-1","extras-off","cadence-30","stills"];function Pt(c,a){return c[Math.min(c.length-1,Math.floor(c.length*a))]}var mt=class{constructor({onChange:a=()=>{}}={}){this.onChange=a,this.buffer=new Float32Array(90),this.sorted=new Float32Array(90),this.count=0,this.head=0,this.rung=-1,this.elapsed=0,this.overBudget=0,this.underBudget=0,this.cooldown=0,this.climbs=0,this.upWait=240,this.locked=!1,this.refreshCap=!1,this.seen=0,this.belowBail=0,this.p50=0,this.p90=0,this.vsync=16.6}target(){return this.refreshCap?33.3:Math.max(this.vsync,16.6)}push(a){if(this.elapsed+=a,this.elapsed<1e3||a>250||(this.buffer[this.head]=a,this.head=(this.head+1)%90,this.count=Math.min(90,this.count+1),this.seen+=1,this.cooldown=Math.max(0,this.cooldown-a),this.count<90/2))return;this.sorted.set(this.buffer);let i=this.sorted.subarray(0,this.count).sort();this.p50=Pt(i,.5),this.p90=Pt(i,.9),this.vsync=Pt(i.subarray(0,Math.max(1,Math.floor(this.count*.2))),.5),this.seen<=60&&Math.abs(this.p50-33.3)/33.3<.04&&this.p90/this.p50<1.08&&(this.refreshCap=!0);let s=this.target();if(this.p90>s*1.25?(this.overBudget+=1,this.underBudget=0):this.p90<s*.75?(this.underBudget+=1,this.overBudget=0):(this.overBudget=0,this.underBudget=0),this.rung===At.length-2&&this.p50>50){if(this.belowBail+=a,this.belowBail>4e3){this.step(1);return}}else this.belowBail=0;this.cooldown>0||(this.overBudget>=45&&this.rung<At.length-2?(this.underBudgetClimbed&&(this.upWait*=2,this.underBudgetClimbed=!1),this.step(1)):this.underBudget>=this.upWait&&this.rung>=0&&!this.locked&&(this.climbs+=1,this.underBudgetClimbed=!0,this.climbs>=2&&(this.locked=!0),this.step(-1)))}step(a){this.rung+=a,this.overBudget=0,this.underBudget=0,this.cooldown=1500,this.count=0,this.onChange(this.rung,At[this.rung]??"full")}};var io=c=>{let a=document.createElement("div");a.style.position="fixed",a.style.top="0",a.style.width="0",a.style.visibility="hidden",a.style.height=`100${c}`,document.body.appendChild(a);let i=a.getBoundingClientRect().height;return a.remove(),i},lt=c=>parseFloat(c)||0;function ro(){let c=io("svh"),a=io("lvh"),i=document.documentElement.clientWidth,s=a,d=window.scrollY,r=document.querySelector("[data-nav]"),p=r?r.getBoundingClientRect().height:0,y=document.documentElement.dir==="rtl"?-1:1,w=document.documentElement.scrollHeight,n={};for(let h of document.querySelectorAll("[data-shot]")){let u=h.dataset.shot,P=h.getBoundingClientRect(),m=P.top+d,R=h.querySelector(":scope > .shot"),g={id:u,top:m,height:P.height,caption:null,pinStart:m,pinEnd:m};if(R){let b=R.getBoundingClientRect(),T=getComputedStyle(h),v=getComputedStyle(R),q=lt(T.paddingBlockEnd);if(u==="hero"){let _=lt(v.insetBlockStart),re=lt(v.marginBlockEnd),j=lt(T.paddingBlockStart);g.pinStart=0,g.pinEnd=Math.max(0,P.height-j-b.height-re),g.caption={x:b.left,y:_,w:b.width,h:b.height}}else{let _=lt(v.insetBlockEnd);g.pinStart=m+b.height+_-c,g.pinEnd=g.pinStart+Math.max(0,P.height-q-b.height),g.caption={x:b.left,y:c-_-b.height,w:b.width,h:b.height},g.pin=_,g.gap=q}}n[u]=g}return{W:i,H:s,svh:c,lvh:a,navH:p,docH:w,dir:y,portrait:s>=i,shots:n}}function lo(c){let a=window.matchMedia("(pointer: coarse)").matches,i=document.documentElement.clientWidth,s=document.documentElement.scrollHeight,d=0,r=()=>{window.clearTimeout(d),d=window.setTimeout(c,160)},p=new ResizeObserver(()=>{let y=document.documentElement.clientWidth,w=document.documentElement.scrollHeight;if(y===i&&w===s)return;let n=a&&y===i&&Math.abs(w-s)<200;i=y,s=w,n||r()});return p.observe(document.documentElement),document.fonts?.ready.then(r),document.fonts?.addEventListener?.("loadingdone",r),()=>p.disconnect()}var Qe=`
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
`,Ke=`
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
`,Mo=`
${Qe}
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
}`,Lo=`
${Ke}
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
}`,zo=`
${Qe}
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
${Ke}
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
}`,Ao=`
${Qe}
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
}`,Po=`
${Ke}
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
}`,To=`
${Qe}
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
}`,ko=`
${Ke}
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
}`,Eo=`
${Qe}
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
}`,Ro=`
${Ke}
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
}`,Fo=`
${Qe}
in vec3 position;
out float vFog;
//#pars
void main() {
  vec3 p = position;
  //#local
  vec3 wp = (modelMatrix * vec4(p, 1.0)).xyz;
  gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
  vFog = fogAt(wp);
}`,Ho=`
${Ke}
uniform vec3 uColor;
uniform float uAlpha;
in float vFog;
void main() {
  fragColor = vec4(uColor * uAlpha * (1.0 - clamp(vFog, 0.0, 1.0)), 1.0);
}`;function co(c,a={}){return c.replace("//#pars",a.pars??"").replace("//#fpars",a.fpars??"").replace("//#local",a.local??"").replace("//#world",a.world??"").replace("//#frag",a.frag??"")}function qe(c,{mips:a=!0,repeat:i=!1}={}){let s=new _t(c);return s.colorSpace=Ht,s.generateMipmaps=a,s.minFilter=a?Rt:Xe,s.magFilter=Xe,i&&(s.wrapS=Mt,s.wrapT=Mt),s}function Do(){let a=document.createElement("canvas");a.width=256*2,a.height=256;let i=a.getContext("2d"),s=(d,r,p)=>{let y=i.createRadialGradient(d+107.52,76.8,5.12,d+128,128,184.32);r.forEach(([n,h])=>y.addColorStop(n,h)),i.fillStyle=y,i.fillRect(d,0,256,256);let w=i.createRadialGradient(d+256*.38,256*.24,0,d+256*.38,256*.24,256*.26);w.addColorStop(0,p),w.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=w,i.fillRect(d,0,256,256)};return s(0,[[0,"#bcbcc0"],[.5,"#8c8d92"],[.85,"#55565c"],[1,"#35363c"]],"rgba(255,255,255,.18)"),s(256,[[0,"#f6d58c"],[.45,"#c9963f"],[.8,"#6e4a1c"],[1,"#2c1c0a"]],"rgba(255,244,214,.75)"),qe(a,{mips:!1})}function uo(c){let a=Do(),i=(s,d,r,p,y={})=>{let{deform:w,defines:n,...h}=y;return new jt({name:s,glslVersion:Bt,vertexShader:co(d,w),fragmentShader:co(r,w),defines:n??{},uniforms:{...c,...p,...w?.uniforms??{}},...h})};return{matcap:a,solid(s={}){return i("solid",Mo,Lo,{uMatcap:{value:a},uEmit:{value:s.emit??[0,0,0]},uAmbient:{value:s.ambient??.06},uHouse:{value:s.house??1}},Je(s,["emit","ambient","house"]))},paper(s={}){return i("paper",zo,Co,{uAtlas:s.atlas??c.uAtlas,uCell:{value:s.cell??[0,0,1,1]},uAmbient:{value:s.ambient??.07},uHouse:{value:s.house??1},uLitBoost:{value:s.boost??1}},{side:bt,...Je(s,["atlas","cell","ambient","house","boost"])})},wood(s={}){return i("wood",Ao,Po,{uHouse:{value:0},...s.uniforms},Je(s,["uniforms"]))},strip(s={}){return i("strip",To,ko,{uHouse:{value:1},...s.uniforms},Je(s,["uniforms"]))},glow(s={}){return i("glow",Eo,Ro,{uColor:{value:s.color??[1,1,1]},uAlpha:{value:s.alpha??1},uShape:{value:s.shape??0},uRadius:{value:0},uMap:{value:s.map??a},uHouse:{value:s.house??0}},{transparent:!0,depthWrite:!1,blending:St,side:bt,...Je(s,["color","alpha","shape","map","house"])})},wire(s={}){return i("wire",Fo,Ho,{uColor:{value:s.color??[.365,1,.87]},uAlpha:{value:s.alpha??1},uHouse:{value:0}},{transparent:!0,depthWrite:!1,blending:St,...Je(s,["color","alpha"])})}}}function Je(c,a){let i={};for(let s of Object.keys(c))a.includes(s)||(i[s]=c[s]);return i}var Ee=4,Io=["invoice","receipt","quote","ledger","sheet","slip","lines","dossier","carbon","memo","tape","blank"],Bo=c=>{let a=new Set;for(let i of document.querySelectorAll(c)){let s=i.textContent.trim();s&&s!=="\u2726"&&a.add(s)}return[...a]};async function po(c){let a=[document.fonts.load('400 20px "IBM Plex Mono"',"#REF! 0123"),document.fonts.load(c?'700 48px "Noto Kufi Arabic"':'700 48px "Space Grotesk"',c?"\u0625\u0646\u062C\u0627\u0632":"ENJAZ")];await Promise.race([Promise.allSettled(a),new Promise(i=>setTimeout(i,1500))])}function fo({q:c,dir:a}){let i=a<0,s=document.querySelector("main"),d={};try{d=JSON.parse(s?.dataset.atlas??"{}")}catch{d={}}let r=Bo(".ticker__track span"),p=[];try{p=JSON.parse(document.querySelector("[data-typewriter]")?.dataset.typewriter??"[]")}catch{p=[]}let y=i?'"Noto Kufi Arabic", system-ui':'"Space Grotesk", system-ui',w='"IBM Plex Mono", monospace',n=new Intl.NumberFormat(i?"ar-EG":"en-US",{useGrouping:!1}),h=c.atlas,u=document.createElement("canvas");u.width=h,u.height=h;let P=u.getContext("2d"),m=h/Ee;P.fillStyle="#fff",P.fillRect(0,0,h,h);let R="#23252e",g="#9aa0ad",b=(o,L)=>{let N=o%Ee,S=Math.floor(o/Ee);P.save(),P.beginPath(),P.rect(N*m,S*m,m,m),P.clip(),P.translate(N*m,S*m),P.scale(m/100,m/134),P.direction=i?"rtl":"ltr",P.textBaseline="alphabetic",L(P),P.restore()},T=o=>i?100-o:o,v=(o,L,N,S=12)=>{o.fillStyle=R,o.font=`700 ${S}px ${y}`,o.textAlign="start",o.fillText(L,T(8),N)},q=(o,L,N=8,S=92,Y=g,E=.7)=>{o.fillStyle=Y,o.fillRect(N,L,S-N,E)},_=(o,L,N,S,Y=0)=>{for(let E=0;E<N;E+=1){let U=34+(E*37+Y)%40;o.fillStyle=E%3===0?R:g,o.fillRect(i?92-U:8,L+E*S,U,1.4),o.fillStyle=g,o.fillRect(i?8:80,L+E*S,12,1.4)}};b(0,o=>{v(o,d.invoice??"",20,14),q(o,26),_(o,34,9,7),q(o,104,8,92,R,1),o.fillStyle=R,o.font=`600 9px ${w}`,o.textAlign=i?"left":"right",o.fillText(n.format(4820),i?8:92,116)}),b(1,o=>{v(o,d.receipt??"",18,12),q(o,24),_(o,32,7,6,11),o.fillStyle=R,o.fillRect(30,100,40,12)}),b(2,o=>{v(o,d.quote??"",22,15),q(o,28),_(o,38,6,8,23),o.save(),o.translate(68,104),o.rotate(-.26),o.strokeStyle="#5e4bd8",o.lineWidth=2,o.strokeRect(-23,-9,46,18),o.fillStyle="#5e4bd8",o.font=`700 10px ${y}`,o.textAlign="center",o.fillText(d.paid??"",0,4),o.restore()});let re=(o,L)=>{let N=i?8:16;o.fillStyle="#e6f6ee";for(let S=0;S<18;S+=2)o.fillRect(0,6+S*7,100,7);o.strokeStyle="#a9b7ae",o.lineWidth=.4;for(let S=0;S<=4;S+=1)o.beginPath(),o.moveTo(N+S*19,0),o.lineTo(N+S*19,134),o.stroke();o.font=`400 4.8px ${w}`,o.textAlign="center";for(let S=0;S<18;S+=1){o.fillStyle=g,o.fillText(n.format(S+1),i?96:8,11.5+S*7);for(let Y=0;Y<4;Y+=1){let E=(S*7+Y*13)%23,U=n.format(100+E*317);L&&E===4?(U="#REF!",o.fillStyle="#c2352b"):(L&&E===9&&(U="#####"),o.fillStyle=R),o.fillText(U,N+Y*19+9.5,11.5+S*7)}}};b(3,o=>{re(o,!1),o.fillStyle="rgba(255,255,255,.92)",o.fillRect(0,0,100,16),v(o,d.ledger??"",12,10)}),b(4,o=>re(o,!0)),b(5,o=>{o.fillStyle="#c2352b",o.fillRect(8,8,84,7),o.fillStyle=R,o.font=`600 9px ${w}`,o.textAlign="center";for(let L=0;L<4;L+=1)o.fillText(n.format(1200+L*417),50,40+L*20)}),b(6,o=>{for(let L=0;L<16;L+=1)q(o,12+L*7.4,6,94,"#b7c2d8",.5);_(o,14,7,7.4,5)}),b(7,o=>{o.fillStyle="#fff",o.fillRect(0,0,100,134),o.fillStyle="#f7efd9",o.fillRect(18,18,64,30),v(o,d.ledger??"",38,11),o.fillStyle="#faf6ea",o.fillRect(0,62,100,5)}),b(8,o=>{v(o,d.invoice??"",20,13),_(o,30,12,6.6,3)}),b(9,o=>{_(o,12,16,7,17)}),b(10,o=>{o.fillStyle=R,o.font=`400 7px ${w}`,o.textAlign="center";for(let L=0;L<12;L+=1)o.fillText(n.format(90+L*233),50,12+L*10.5)});let j=qe(u);j.anisotropy=4;let W=document.createElement("canvas");W.width=512,W.height=2048;let k=W.getContext("2d");k.fillStyle="#fff",k.fillRect(0,0,512,2048),k.direction=i?"rtl":"ltr",k.textBaseline="middle";let V=i?468:44;k.textAlign="start";let H=[];r.forEach((o,L)=>{H.push({text:o,big:!0}),p[L%Math.max(1,p.length)]&&H.push({text:p[L%p.length],big:!1})});let D=2048/Math.max(1,H.length);H.forEach((o,L)=>{k.fillStyle=o.big?"#1f2a24":"#3d4c44",k.font=o.big?`700 44px ${y}`:`400 25px ${i?y:w}`,k.fillText(o.text,V,D*(L+.5),424)});let K=qe(W);return K.anisotropy=4,{texture:j,printTexture:K,services:r,phrases:p,words:d,display:y,mono:w,digits:o=>n.format(o),cell(o){let L=Math.max(0,Io.indexOf(o)),N=L%Ee,S=Math.floor(L/Ee);return[N/Ee,1-(S+1)/Ee,1/Ee,1/Ee]},title(o){return document.querySelector(`[data-shot="${o}"] .card__title, [data-shot="${o}"] .step__title`)?.textContent.trim()??""},canvas(o,L,N,S){let Y=document.createElement("canvas");Y.width=o,Y.height=L;let E=Y.getContext("2d");return E.direction=i?"rtl":"ltr",N(E,o,L),qe(Y,S)}}}var ho={L:{pixelCap:55e4,draws:28,tris:7e4,sheets:420,sheetSeg:2,stacks:180,dossiers:120,boxes:1400,weather:140,uxGrid:[32,45],shadowSize:1024,shadowTaps:1,atlas:512,dust:60,allReflections:!1,film:!1},M:{pixelCap:13e5,draws:45,tris:22e4,sheets:1100,sheetSeg:3,stacks:360,dossiers:240,boxes:3e3,weather:320,uxGrid:[48,68],shadowSize:1024,shadowTaps:4,atlas:1024,dust:150,allReflections:!0,film:!1},H:{pixelCap:28e5,draws:70,tris:6e5,sheets:2400,sheetSeg:4,stacks:720,dossiers:480,boxes:6e3,weather:700,uxGrid:[64,90],shadowSize:2048,shadowTaps:8,atlas:2048,dust:300,allReflections:!0,film:!0}};var ct={clip:[.3,40],fog:26},_e=[{id:"hero",act:1,set:"desk",subject:{radius:.62,center:[0,.1,-.4]},pose:{lens:24,elevation:-15,portrait:{elevation:-28},pushIn:.15,...ct},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:30},{id:"drop",act:1,set:"desk",idleHz:0,budget:{draws:12,tris:{L:3e4,M:8e4,H:2e5}},authored(c,a){let i=a.W/a.H,s=a.portrait?20:15.6,d=Math.tan(s*Math.PI/360),p=.24/(a.portrait?.92:.36)/(2*d*i),y=ee.floorY;return[{t:.18,position:[0,-.03,p],elevation:-1,lens:20,clip:[.1,30],fog:26},{t:.48,position:[0,y*.72,p*.96],elevation:-2,lens:20,clip:[.1,30],fog:26},{t:.64,position:[0,.28,.5],elevation:-84,lens:36,clip:[.05,20],fog:20},{t:.84,position:[0,y-.25,.1],elevation:-90,lens:40,clip:[.04,20],fog:16},{t:.93,position:[0,ee.slabBottom+.1,.5],elevation:-90,lens:24,clip:[.05,60],fog:40}]}},{id:"svc.head",act:2,set:"archive",pose:{lens:[24,62],elevation:-90,clip:[.2,90],fog:72},budget:{draws:8,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0,holdKnots:()=>[{t:0,position:[0,ee.slabBottom-.6,1.5],lens:24},{t:1,position:[0,ee.slabBottom-5.2,1.5],lens:62}]},{id:"svc.web",act:2,set:"archive",floor:"first",subject:{radius:1.3,center:[0,0,0]},pose:{lens:32,bearing:12,elevation:-6,drift:[0,-.15,-.5],clip:[.3,80],fog:62},budget:{draws:11,tris:{L:25e3,M:7e4,H:16e4}},idleHz:0,stripYaw:0},{id:"svc.apps",act:2,set:"archive",floor:"locked",subject:{radius:1.1,center:[0,0,0]},pose:{lens:32,bearing:[-12,13],elevation:-4,clip:[.3,80],fog:62},budget:{draws:9,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"svc.api",act:2,set:"archive",floor:"locked",subject:{radius:1.75,center:[0,.35,.3]},pose:{lens:32,bearing:-18,elevation:14,drift:[0,-.2,-.3],clip:[.3,80],fog:60},budget:{draws:14,tris:{L:3e4,M:8e4,H:18e4}},idleHz:0},{id:"svc.rescue",act:2,set:"archive",floor:"locked",subject:{radius:1.2,center:[0,0,0]},pose:{lens:30,bearing:10,elevation:-8,roll:[0,7],clip:[.3,80],fog:58},budget:{draws:12,tris:{L:24e3,M:7e4,H:16e4}},idleHz:0},{id:"svc.ux",act:2,set:"archive",floor:"locked",subject:{radius:1.5,center:[0,0,0]},pose:{lens:28,elevation:0,clip:[.3,80],fog:56},budget:{draws:8,tris:{L:24e3,M:6e4,H:14e4}},idleHz:0},{id:"svc.auto",act:2,set:"archive",floor:"locked",subject:{radius:1.4,center:[0,0,0]},pose:{lens:30,bearing:90,elevation:-3,clip:[.3,80],fog:54},budget:{draws:9,tris:{L:22e3,M:6e4,H:14e4}},idleHz:30},{id:"process.head",act:3,set:"archive",floor:{clear:9},subject:{radius:4,center:[0,0,0]},pose:{lens:50,elevation:-90,shift:[0,0,1.1],clip:[.05,90],fog:70},budget:{draws:10,tris:{L:26e3,M:7e4,H:16e4}},idleHz:0,exitKnots(c,a,i){let s=i.floorY;return[{t:.55,position:[.16,s+3.2,.18],elevation:-90,lens:44,clip:[.05,70],fog:60},{t:.74,position:[.16,s-.9,.12],elevation:-90,lens:44,clip:[.05,70],fog:60}]}},{id:"step.talk",act:3,set:"archive",floor:{clear:5},subject:{radius:1.5,center:[0,.1,0]},pose:{lens:28,bearing:8,elevation:-10,clip:[.2,70],fog:42},budget:{draws:10,tris:{L:25e3,M:7e4,H:16e4}},idleHz:0},{id:"step.scope",act:3,set:"archive",floor:"locked",subject:{radius:1.75,center:[0,0,0]},pose:{lens:28,bearing:-6,elevation:-24,clip:[.2,70],fog:40},budget:{draws:8,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"step.build",act:3,set:"archive",floor:"locked",subject:{radius:1.25,center:[0,0,.3]},pose:{lens:28,bearing:[20,-10],elevation:-8,clip:[.2,70],fog:40},budget:{draws:9,tris:{L:26e3,M:7e4,H:16e4}},idleHz:0},{id:"step.ship",act:3,set:"archive",floor:"locked",subject:{radius:1.6,center:[0,-.2,0]},pose:{lens:28,elevation:[-12,-74],clip:[.2,70],fog:40},budget:{draws:7,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"fall",act:3,set:"none",idleHz:0,budget:{draws:4,tris:{L:3e3,M:6e3,H:12e3}},authored(c){let a=c["step.ship"],i=c["why.q"],s=a.floorY-2,d=i.floorY+i.d+1.6;return[{t:.2,position:[.2,s,.2],elevation:-90,lens:70,clip:[.05,60],fog:44},{t:.86,position:[.05,d+1.2,.06],elevation:-90,lens:70,clip:[.05,40],fog:34}]}},{id:"why.q",act:4,set:"desk",desk:!0,floor:{clear:26},subject:{radius:.85,center:[0,0,-.4]},pose:{lens:40,elevation:-90,...ct},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:30},{id:"why.list",act:4,set:"desk",desk:!0,subject:{radius:.8,center:[0,0,-.4]},pose:{lens:40,elevation:-90,...ct},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:0},{id:"why.stats",act:4,set:"desk",desk:!0,subject:{radius:.7,center:[0,0,-.4]},pose:{lens:36,elevation:-70,...ct},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0},{id:"cta",act:4,set:"desk",desk:!0,subject:{radius:.55,center:[0,0,-.4]},pose:{lens:40,elevation:-90,clip:[.02,12],fog:26},solve(c,a){let{W:i,H:s,portrait:d}=a,r=c.shot.caption,p=c.fov*Math.PI/180,y=Math.tan(p/2)*(i/s),w=.072,n=.148;if(d)c.d=.0775*.965/(2*y),c.ox=0,c.oy=0;else{let h=Math.max((r.w+32)/n,(r.h+32)/w);c.d=i/h/(2*y),c.ox=i/2-(r.x+r.w/2),c.oy=s/2-(r.y+r.h/2)}},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0},{id:"coda",act:4,set:"desk",desk:!0,subject:{radius:.62,center:[0,.1,-.4]},pose:{lens:24,elevation:-15,...ct},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0}],mo={hero:()=>import("./chunk-FQ644PTX.js"),drop:()=>import("./chunk-K6MLBH2F.js"),"svc.head":()=>import("./chunk-XCFQESEV.js"),"svc.web":()=>import("./chunk-BU75ANWF.js"),"svc.apps":()=>import("./chunk-SPG4BJQV.js"),"svc.api":()=>import("./chunk-NAYGZMI2.js"),"svc.rescue":()=>import("./chunk-4WBBAYPS.js"),"svc.ux":()=>import("./chunk-2ALBFH2P.js"),"svc.auto":()=>import("./chunk-ZJHTRPCR.js"),"process.head":()=>import("./chunk-QILWQIDR.js"),"step.talk":()=>import("./chunk-6NUKT6FF.js"),"step.scope":()=>import("./chunk-4GXKCHKF.js"),"step.build":()=>import("./chunk-O2FCLXP4.js"),"step.ship":()=>import("./chunk-R65BVCNZ.js"),fall:()=>import("./chunk-DJNW65WT.js"),"why.q":()=>import("./chunk-CQ55MCPA.js"),"why.list":()=>import("./chunk-GCBXT2J2.js"),"why.stats":()=>import("./chunk-PCMLZPEU.js"),cta:()=>import("./chunk-TYQRNBVE.js"),coda:()=>import("./chunk-F3VOJLJZ.js")};var ke=ee.archiveHalf,Ue=ee.galleryH,ie=11.4;function vo(c,a){return c.canvas(512,512,s=>{let d=Te(`shelf-${a}`);s.fillStyle=a===0?"#2a2520":"#0a0c11",s.fillRect(0,0,512,512);let r=6,p=512/r;for(let y=0;y<r;y+=1){let w=0;for(;w<512;){let n=8+d()*22,h=p*(.74+d()*.22);if(a===0){let u=d(),P=.5+d()*.5,m=u<.6?[176,136,86]:u<.8?[214,202,170]:u<.92?[96,110,128]:[150,70,60];s.fillStyle=`rgb(${m[0]*P},${m[1]*P},${m[2]*P})`,s.save(),s.translate(w+n/2,p*(y+1)-4),s.rotate(d()>.86?(d()-.5)*.5:0),s.fillRect(-n/2,-h,n-1.5,h),s.fillStyle="rgba(255,255,255,.35)",s.fillRect(-n/2+n*.25,-h*.82,n*.4,h*.2),s.restore()}else{let u=12+d()*10;s.fillStyle=`rgb(${u},${u+2},${u+8})`,s.fillRect(w,p*(y+1)-h-4,n-2,h),d()>.72&&(s.fillStyle=d()>.8?"#a48bff":"#5dffde",s.fillRect(w+n/2-1,p*(y+1)-h,1.5,h-8))}w+=n}s.fillStyle=a===0?"#141210":"#1c2027",s.fillRect(0,p*(y+1)-4,512,4)}},{repeat:!0})}function wo({programs:c,text:a,q:i,dir:s}){let d=new De;d.name="archive";let r={uTurn:{value:0},uOrderY:{value:new We(ee.slabBottom,-60)},uGalleryH:{value:Ue}},p=40,y=new we(ke*2,Ue*p,4,p),w=y.attributes.uv;for(let C=0;C<w.count;C+=1)w.setXY(C,w.getX(C)*8,w.getY(C)*p);let n=[[0,0,-ke,0],[0,0,ke,Math.PI],[-ke,0,0,Math.PI/2],[ke,0,0,-Math.PI/2]].map(([C,z,O,Q])=>{let x=y.clone();return x.rotateY(Q),x.translate(C,z,O),x}),h=ge(n.map(C=>C.toNonIndexed())),u=vo(a,0);u.anisotropy=8;let P=vo(a,1);P.anisotropy=8;let m=c.paper({atlas:{value:u},ambient:.03,boost:.62,deform:{pars:"uniform float uTurn, uGalleryH; out float vTurn, vLit;",fpars:"uniform sampler2D uShelf2; in float vTurn, vLit;",world:`
        wp.y += floor(uCamY / uGalleryH) * uGalleryH;
        {
          float along = abs(wn.z) > 0.5 ? wp.x : wp.z;
          vTurn = smoothstep(0.0, 1.0, uTurn * 2.2 - (along * uInline / 14.0 * 0.5 + 0.5) - 0.1);
        }
        vLit = uTurn;`,frag:"c = mix(c, texture(uShelf2, vUv).rgb * (vec3(0.42) + vHouse * 0.7), vTurn);",uniforms:{uTurn:r.uTurn,uGalleryH:r.uGalleryH,uShelf2:{value:P}}}}),R=new B(h,m);R.frustumCulled=!1,d.add(R);let g=[.26,.25,.25],b=C=>`wp.y -= floor((iPos.y - uCamY) / ${C.toFixed(2)} + 0.5) * ${C.toFixed(2)};`,T=Le(new ve(1,1,1)),v=18,q=[];for(let C=0;C<v;C+=1){let z=-C*Ue;for(let[O,Q]of[[1,0],[-1,0],[0,1],[0,-1]]){let x=ie*2+6,I=(ke+ie)/2;q.push({pos:[O*I,z-.1,Q*I],scale:O?[ke-ie,.2,x]:[x,.2,ke-ie],tint:g}),q.push({pos:[O*ie,z+.95,Q*ie],scale:O?[.06,.06,x]:[x,.06,.06],tint:[.55,.52,.48]}),q.push({pos:[O*ie,z+.55,Q*ie],scale:O?[.03,.03,x]:[x,.03,.03],tint:[.4,.38,.36]})}}let _=new B(xe(T,q.length,(C,z)=>{let O=q[C];z.pos=O.pos,z.scale=O.scale,z.tint=O.tint}),c.solid({ambient:.05,defines:{INSTANCED:1},deform:{world:b(Ue*v)}}));_.frustumCulled=!1,d.add(_);let re=[];for(let C of[-1,1])for(let z of[-ie,-ie/3,ie/3,ie])re.push([C*ie,z]),re.push([z,C*ie]);let j=new B(xe(Le(new ve(.34,1,.34,1,44,1)),re.length,(C,z)=>{z.pos=[re[C][0],0,re[C][1]],z.scale=[1,180,1],z.tint=[.36,.35,.34]}),c.solid({ambient:.05,defines:{INSTANCED:1},deform:{world:"wp.y += uCamY;"}}));j.frustumCulled=!1,d.add(j);let W=Te("archive"),V=Math.max(3,Math.round(i.boxes/460))*Ue,H=Le(new ve(1,1,.8)),D=H.attributes.normal;for(let C=0;C<D.count;C+=1)D.getZ(C)<-.5&&H.attributes.aColor.setXYZ(C,0,0,0);let K=ge([H,$(.05,.86,.01,{at:[0,0,-.41],color:[.36,1,.87],mat:2})]),o=i.boxes,L=new B(xe(K,o,(C,z)=>{let O=C%4,Q=(W()*2-1)*(ke-1),x=-W()*V,I=(W()-.5)*.5,oe=ke-.3-W()*2.2,de=.5+W()*.5,ze=.55+W()*.4;O===0?(z.pos=[Q,x,-oe],Pe(0,0,I,z.quat)):O===1?(z.pos=[Q,x,oe],Pe(0,Math.PI,I,z.quat)):O===2?(z.pos=[-oe,x,Q],Pe(0,Math.PI/2,I,z.quat)):(z.pos=[oe,x,Q],Pe(0,-Math.PI/2,I,z.quat)),z.scale=[de,ze,.4];let X=.62+W()*.38,A=W();z.tint=A<.62?[.74*X,.56*X,.33*X]:A<.86?[.86*X,.8*X,.66*X]:A<.95?[.38*X,.44*X,.52*X]:[.6*X,.24*X,.2*X],z.seed=W()}),c.solid({ambient:.05,defines:{INSTANCED:1},deform:{pars:"uniform float uTurn; uniform vec2 uOrderY; out float vBack;",local:`
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
            float shift = floor((iPos.y - uCamY) / ${V.toFixed(2)} + 0.5) * ${V.toFixed(2)};
            /* Files sink into the wall at the edges of the wrap, so they never pop. */
            float edge = smoothstep(${(V/2).toFixed(2)}, ${(V*.36).toFixed(2)}, abs(iPos.y - shift - uCamY));
            wp.y -= shift;
            float order = clamp((uOrderY.x - wp.y) / (uOrderY.x - uOrderY.y), 0.0, 1.0);
            if (aColor.a < 1.5) { tint = mix(mix(tint, vec3(0.1, 0.11, 0.13), order * 0.55), vec3(0.075, 0.08, 0.1), vBack); }
            vec3 towardsWall = normalize(vec3(sign(iPos.x) * step(10.0, abs(iPos.x)), 0.0, sign(iPos.z) * step(10.0, abs(iPos.z))) + vec3(0.0001));
            wp += towardsWall * (1.0 - edge) * 2.8;
          }`,uniforms:{uTurn:r.uTurn,uOrderY:r.uOrderY}}}));L.frustumCulled=!1,d.add(L);let N=new we(1,1,1,3),S=["ledger","invoice","lines","sheet","memo","receipt"],Y=Math.min(180,Math.floor(i.weather*.75)),E=new B(xe(N,Y,(C,z)=>{let O=C%4,Q=(W()*2-1)*(ie-.5),x=-Math.floor(W()*18)*Ue+.3;z.pos=O===0?[Q,x,-ie]:O===1?[Q,x,ie]:O===2?[-ie,x,Q]:[ie,x,Q],Pe(0,O<2?0:Math.PI/2,(W()-.5)*.2,z.quat);let I=.55+W()*.6;z.scale=[I,I*1.42,1],z.cell=a.cell(S[Math.floor(W()*S.length)]);let oe=.75+W()*.25;z.tint=[oe,oe,oe*.95]}),c.paper({ambient:.05,defines:{INSTANCED:1},deform:{world:b(Ue*18)}}));E.frustumCulled=!1,d.add(E);let U=new we(.34,.46),Z=new B(xe(U,i.weather,(C,z)=>{z.pos=[(W()*2-1)*10.5,-W()*24,(W()*2-1)*10.5],z.cell=a.cell(S[Math.floor(W()*S.length)]);let O=.78+W()*.22;z.tint=[O,O,O*.95],z.seed=W()}),c.paper({ambient:.08,defines:{INSTANCED:1},deform:{pars:"uniform float uTurn;",local:`{
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
        }`,uniforms:{uTurn:r.uTurn}}}));Z.frustumCulled=!1,d.add(Z);let te=o,le=i.weather;return{group:d,u:r,*build(){yield},setRange(C,z){r.uOrderY.value.set(C,z)},setDensity(C){L.geometry.instanceCount=Math.floor(te*C),Z.geometry.instanceCount=Math.floor(le*C)},setWeather(C){Z.visible=C,E.visible=C}}}var vt={pars:"in float iClear; uniform float uClear;",world:`
    float clearF = clamp((uClear - iClear - seed * 0.34) / 0.62, 0.0, 1.0);
    if (clearF > 0.0) {
      clearF *= clearF;
      vec3 away = wp - (uLampOrigin + vec3(0.0, 0.0, -0.4));
      away.y = 0.0;
      wp += normalize(away + vec3(0.001)) * clearF * 2.4;
      wp.y += clearF * 0.9 - clearF * clearF * 1.9;
    }`};function No(){let i=document.createElement("canvas");i.width=1024,i.height=512;let s=i.getContext("2d");s.fillStyle="#7b4c2b",s.fillRect(0,0,1024,512);let d=Te("walnut");for(let r=0;r<520;r+=1){let p=d()*512,y=d()>.45;s.strokeStyle=y?`rgba(44,22,10,${.05+d()*.2})`:`rgba(180,120,74,${.03+d()*.1})`,s.lineWidth=.5+d()*2.4,s.beginPath(),s.moveTo(0,p);let w=d()*1.2;for(let n=0;n<=1024;n+=48)p+=(d()-.5)*4*w,s.lineTo(n,p);s.stroke()}for(let r=0;r<3;r+=1){let p=d()*1024,y=d()*512;for(let w=8;w<90;w+=5+d()*5)s.strokeStyle=`rgba(40,20,9,${.1+d()*.09})`,s.lineWidth=.8,s.beginPath(),s.ellipse(p,y,w*3.2,w*.8,0,0,Math.PI*2),s.stroke()}return qe(i)}function go({programs:c,shared:a,text:i,q:s,dir:d}){let r=e=>e*d,p=new De;p.name="desk";let y={uClear:{value:0},uRing:{value:0},uRingOn:{value:0}},w=new ae(r(.27),.62,-.5),n=[r(-.02),-.38],h=[n[0],n[1]],u=new Wt(s.shadowSize,s.shadowSize,{depthTexture:new Ut(s.shadowSize,s.shadowSize,Ft)});u.depthTexture.compareFunction=It,u.depthTexture.minFilter=Xe,u.depthTexture.magFilter=Xe;let P=new Lt,m={uMap:{value:No()},uShadow:{value:u.depthTexture},uClear:y.uClear,uDawnStripes:{value:1},uAmbient:{value:.045},uShadowTaps:{value:s.shadowTaps},uGloss:{value:1},uRings:{value:[1,0,0,0]},uRingCentreA:{value:[r(-.2),-.21,.046]},uRingCentreB:{value:[r(-.112),-.21,.046]},uTint:{value:[1,1,1]},uLampMatrix:{value:P}},R=new B(new ve(1.6,.045,.8),c.wood({uniforms:m}));R.position.set(0,-.0225,-.4),p.add(R);let g={...m,uTint:{value:[.34,.31,.28]},uGloss:{value:0},uRings:{value:[0,0,0,0]}},b=.5,T=new B(ge([[0,-b-2.5,10,5],[0,b+2.5,10,5],[-b-2.5,0,5,b*2],[b+2.5,0,5,b*2]].map(([e,t,l,f])=>{let M=new ve(l,.1,f);return M.translate(e,ee.floorY-.05,t),M})),c.wood({uniforms:g}));p.add(T);let v=[r(-.52),0,-.56],q=[r(-.156),0,-.21],_=[r(.66),.88,-.95],re=[r(.31),0,-.64],j=[r(.62),0,-.62],W=[r(.72),.42,-.62],k=[r(.27),.72,-.5],V=[.24,.14,.08],H=ge([$(.07,.75,.07,{at:[-.74,-.4,-.06],color:V}),$(.07,.75,.07,{at:[.74,-.4,-.06],color:V}),$(.07,.75,.07,{at:[-.74,-.4,-.74],color:V}),$(.07,.75,.07,{at:[.74,-.4,-.74],color:V}),$(1.42,.09,.02,{at:[0,-.1,-.03],color:V}),$(.1,.012,.018,{at:[r(.42),-.1,-.014],color:[.76,.58,.3],mat:1}),$(.1,.012,.018,{at:[r(-.42),-.1,-.014],color:[.76,.58,.3],mat:1}),...ao(_),...to(j,W,k,d),...no(q,d),$(.07,.006,.07,{at:[r(-.02),.003,-.7],color:[.25,.25,.27]}),Le(new zt(.002,.003,.17,6),{at:[r(-.02),.09,-.7],color:[.7,.7,.72]})]),D=new B(H,c.solid({ambient:.17,house:0}));p.add(D);let K=new B(ge([$(12,7,.1,{at:[0,1.6,-1.05],color:[.62,.6,.6]}),$(12,.12,.03,{at:[0,ee.floorY+.06,-.99],color:[.2,.18,.17]}),$(1.62,.04,.04,{at:[r(-.46),1.54,-.97],color:[.55,.52,.5]}),$(1.62,.04,.04,{at:[r(-.46),.5,-.97],color:[.55,.52,.5]}),$(.04,1.08,.04,{at:[r(-1.27),1.02,-.97],color:[.55,.52,.5]}),$(.04,1.08,.04,{at:[r(.35),1.02,-.97],color:[.55,.52,.5]})]),c.solid({ambient:.2,house:0}));p.add(K);let o=new B(ge(eo(re,d)),D.material),L=Ct([[v[0]-.11*d,.05,v[2]+.03],[v[0]-.17*d,.03,v[2]+.06],[v[0]-.2*d,.012,v[2]+.13],[v[0]-.19*d,.05,v[2]-.03],[v[0]-.13*d,.11,v[2]-.08]],24),N=c.solid({house:0,deform:Zt()}),S=new B(ge([...oo(v),L]),N);p.add(o,S);let Y={x:v[0],y:.135,z:v[2]-.08},E=new B(so(),N);E.name="handset",E.position.set(Y.x,Y.y,Y.z),p.add(E);let U=new B(Ct([[0,0,0],[0,-.2,0],[0,-.4,.01],[0,-.6,0]],22,.008),N);U.visible=!1,p.add(U);let Z=D.material,te=new B($(.012,.095,.004,{at:[0,.042,0],color:[.1,.1,.1]}),Z),le=new B($(.007,.14,.004,{at:[0,.064,0],color:[.1,.1,.1]}),Z);te.position.set(_[0],_[1],_[2]+.026),le.position.set(_[0],_[1],_[2]+.03),p.add(te,le);let C=r(-.46),z=new B(Le(new we(1.58,1),{at:[C,1.02,-.985],color:[.075,.11,.21],mat:2}),c.solid({house:0,deform:{fpars:"uniform highp float uDawn;",frag:"c = mix(c, mix(vec3(0.365, 1.0, 0.87), vec3(0.643, 0.545, 1.0), clamp((vLampP.x + 0.5) * 0.7, 0.0, 1.0)), uDawn);"}}));p.add(z);let O=$(1.58,.042,.004,{color:[.72,.72,.7]});O.deleteAttribute("uv");let Q=new B(xe(O,24,(e,t)=>{t.pos=[C,.54+(e+.5)*.0405,-.965]}),c.solid({house:0,ambient:.14,defines:{INSTANCED:1},deform:{local:`{
          float a = mix(0.86, 1.32, uDawn);
          float ca = cos(a), sa = sin(a);
          p = vec3(p.x, p.y * ca - p.z * sa, p.y * sa + p.z * ca);
          n = vec3(n.x, n.y * ca - n.z * sa, n.y * sa + n.z * ca);
        }`}}));Q.frustumCulled=!1,p.add(Q);let x=Te("desk"),I=[{x:-.66,z:-.3,h:.34},{x:-.58,z:-.68,h:.44},{x:-.27,z:-.67,h:.27},{x:.66,z:-.22,h:.2},{x:-.36,z:-.28,h:.13},{x:-.14,z:-.7,h:.15},{x:.66,z:-.42,h:.1},{x:-.7,z:-.08,h:.09}],oe=[],de=new Map;for(let e of I){let t=0,l=0,f=0;for(;t<e.h&&oe.length<s.stacks;){let M=.01+x()*.022;l+=(x()-.5)*.012,f+=(x()-.5)*.012,oe.push({x:e.x+l,y:t+M/2,z:e.z+f,h:M,yaw:(x()-.5)*.34}),t+=M}de.set(e,{y:t,x:e.x+l,z:e.z+f})}let ze=new ve(1,1,1);ze.deleteAttribute("uv");let X=Le(ze),A=new B(xe(X,oe.length,(e,t)=>{let l=oe[e];t.pos=[r(l.x),l.y,l.z],Pe(0,l.yaw,0,t.quat),t.scale=[.21+x()*.03,l.h,.297+x()*.03];let f=.74+x()*.26;t.tint=x()>.86?[f,f*.84,f*.72]:[f,f,f*.95],t.extra.iClear=2},{iClear:1}),c.solid({house:0,ambient:.13,defines:{INSTANCED:1},deform:vt}));A.frustumCulled=!1,p.add(A);let me=[{x:.5,z:-.14,n:.3},{x:-.5,z:-.2,n:.3},{x:-.3,z:-.5,n:.26}],ce=Le(new ve(1,1,1)),Re=[];for(let e of me){let t=Math.floor(s.dossiers*e.n*.5),l=0;for(let f=0;f<t&&l<.2;f+=1){let M=.016+x()*.014,G=(x()-.5)*.5,J=.7+x()*.3;Re.push({x:e.x+(x()-.5)*.02,y:l+M/2,z:e.z+(x()-.5)*.02,yaw:G,sx:.24,sy:M,sz:.33,tint:[.86*J,.7*J,.42*J]}),Re.push({x:e.x,y:l+M+6e-4,z:e.z,yaw:G,sx:.016,sy:.0015,sz:.335,tint:[.92,.9,.84]}),l+=M}}let pe=new B(xe(ce,Re.length,(e,t)=>{let l=Re[e];t.pos=[r(l.x),l.y,l.z],Pe(0,l.yaw,0,t.quat),t.scale=[l.sx,l.sy,l.sz],t.tint=l.tint,t.extra.iClear=2},{iClear:1}),c.solid({house:0,ambient:.13,defines:{INSTANCED:1},deform:vt}));pe.frustumCulled=!1,p.add(pe);let Fe=new we(1,1,s.sheetSeg,s.sheetSeg);Fe.rotateX(-Math.PI/2);let $e=["invoice","ledger","quote","receipt","lines","sheet","memo","invoice","carbon","slip"],ye=[],Ze=Math.min(30,Math.floor(s.sheets*.1));for(let e=0;e<Ze;e+=1){let t=.36+x()*.46,l=x()*Math.PI*2,f=Math.cos(l)*t*1.08,M=-.4+Math.sin(l)*t*.42;ye.push({x:f,z:M,y:.0012+x()*.012,yaw:x()*6.28,kind:0,clear:x()>.4?0:1})}for(let[e,t]of de){let l=Math.floor(s.sheets*.5/I.length*(.5+e.h*2));for(let f=0;f<l;f+=1)ye.push({x:t.x+(x()-.5)*.06,z:t.z+(x()-.5)*.06,y:t.y+f*.0015,yaw:(x()-.5)*.7,kind:1,clear:2})}let et=Math.min(8,Math.floor(s.sheets*.02));for(let e=0;e<et;e+=1){let t=e%2===0?1:-1;ye.push({x:t*(.24+x()*.46),z:-.08+x()*.05,y:.002+x()*.004,yaw:(x()-.5)*.3,kind:2,clear:0})}let tt=Math.max(0,Math.floor(s.sheets*.24));for(let e=0;e<tt;e+=1){let t=x()*Math.PI*2,l=.7+x()*1.5,f=Math.cos(t)*l*1.2,M=.1+Math.abs(Math.sin(t))*l*.7;Math.hypot(f,M)>.75&&ye.push({x:f,z:M,y:ee.floorY+.002+x()*.004,yaw:x()*6.28,kind:0,clear:2})}for(let e=0;e<8;e+=1)ye.push({x:-.02+(x()-.5)*.015,z:-.7+(x()-.5)*.015,y:.02+e*.012,yaw:x()*6.28,kind:3,clear:2});let ot=c.paper({house:0,ambient:.05,defines:{INSTANCED:1},deform:{pars:`${vt.pars} in float iCurl;`,local:`
        float cx = uv.x - 0.5, cz = uv.y - 0.5;
        p.y += (cx * cx * 0.03 + cz * cz * 0.05) * iCurl;
        /* A sheet by the edge lifts a little in the draught from the printer. */
        p.y += sin(uTime * 2.6 + seed * 37.0) * 0.0012 * max(iCurl - 0.8, 0.0) * (cz + 0.5);
        n.xz -= vec2(cx * 0.06, cz * 0.1) * iCurl;`,world:vt.world}}),Me=new B(xe(Fe,ye.length,(e,t)=>{let l=ye[e],f=l.kind===3;t.pos=[r(l.x),l.y,l.z],Pe(0,l.yaw,0,t.quat),t.scale=f?[.08,1,.16]:[.21,1,.297];let M=f?"receipt":$e[Math.floor(x()*$e.length)];t.cell=i.cell(M);let G=.82+x()*.18;t.tint=M==="carbon"?[.98,.72*G,.72*G]:M==="slip"?[.99,.9*G,.62*G]:[G,G,G*.96],t.extra.iClear=l.clear,t.extra.iCurl=l.kind===2?1.6:.5+x()},{iClear:1,iCurl:1}),ot);Me.frustumCulled=!1,p.add(Me);let Ce=new B(new we(.34,.34),c.glow({color:[1,.74,.46],alpha:.5,defines:{BILLBOARD:1}}));Ce.position.set(w.x,w.y+.03,w.z),Ce.frustumCulled=!1,p.add(Ce);let Ie=new B(xe(new we(1,1),2,(e,t)=>{t.pos=e===0?[r(.34),.42,-.985]:[r(-.46),.95,-.98],t.scale=e===0?[2.6,1.9,1]:[3.2,2.2,1],t.tint=e===0?[.13,.086,.047]:[.028,.038,.067]}),c.glow({defines:{INSTANCED:1}}));Ie.frustumCulled=!1,p.add(Ie);let st=new zt(.05,.54,.86,26,1,!0),He=new B(st,c.glow({color:[1,.72,.42],alpha:.13,shape:5,deform:{frag:"a = vUv.y * vUv.y; { float f = abs(dot(normalize(vN), normalize(vV))); a *= f * f; }"}}));He.frustumCulled=!1,p.add(He);let wt=new we(.009,.009),Be=new B(xe(wt,s.dust,(e,t)=>{let l=Math.sqrt(x()),f=x()*Math.PI*2,M=l*.34;t.pos=[w.x+(h[0]-w.x)*l+Math.cos(f)*M,w.y*(1-l)+.04,w.z+(h[1]-w.z)*l+Math.sin(f)*M],t.tint=[1,.82,.6]}),c.glow({alpha:.42,defines:{INSTANCED:1,BILLBOARD:1},deform:{world:"wp += vec3(sin(uTime * 0.21 + seed * 40.0), sin(uTime * 0.17 + seed * 90.0), cos(uTime * 0.19 + seed * 70.0)) * 0.03;"}}));Be.frustumCulled=!1,p.add(Be);let se=w.clone(),ue=new ft(122,1,.05,2.2),gt=new ae(0,0,-1),fe=new ae,Ae={x:0,y:0,z:0},nt=0,je=0,at=new Lt().set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.4975,0,0,0,1),Ve=Me.geometry.instanceCount,pt=A.geometry.instanceCount,xt=pe.geometry.instanceCount,it=e=>{te.rotation.z=-(e%12/12)*Math.PI*2,le.rotation.z=-(e%1)*Math.PI*2};return it(3.2),{group:p,u:y,setClock:it,lampPos:se,pool:n,*build(){yield},setActPositions(e){Ae=e},setPhone(e){e.position.set(0,.0043,-.4),e.visible=!1,p.add(e),this.phone=e},setAct(e){e===4?p.position.set(Ae.x,Ae.y,Ae.z):p.position.set(0,0,0)},setSpot(e,t){h[0]=e,h[1]=t},resetSpot(){h[0]=n[0],h[1]=n[1]},setRing(e){nt=e},setOffHook(e){je=e},setShadowTaps(e){m.uShadowTaps.value=e},setDensity(e){Me.geometry.instanceCount=Math.floor(Ve*e),A.geometry.instanceCount=Math.floor(pt*e),pe.geometry.instanceCount=Math.floor(xt*e)},setExtras(e){Be.visible=e,He.visible=e},bakeShadow(e){let t=[R,T,Ce,He,Be,z,Q,K,Ie,U];this.phone&&t.push(this.phone);let l=t.map(F=>F.visible),f=p.position.clone(),M=y.uClear.value,G=p.visible;p.visible=!0,t.forEach(F=>{F.visible=!1}),p.position.set(0,0,0),this.setClear(0),E.position.set(Y.x,Y.y,Y.z),E.rotation.set(0,0,0),E.visible=!0,p.updateMatrixWorld(!0),a.uLampOrigin.value.set(0,0,0),ue.position.copy(se),ue.up.copy(gt),ue.lookAt(r(-.02),0,-.38),ue.updateMatrixWorld(),ue.updateProjectionMatrix();let J=e.getRenderTarget();e.setRenderTarget(u),e.clear(),e.render(p,ue),e.setRenderTarget(J),P.multiplyMatrices(at,ue.projectionMatrix).multiply(ue.matrixWorldInverse),t.forEach((F,ne)=>{F.visible=l[ne]}),p.position.copy(f),p.visible=G,this.setClear(M),p.updateMatrixWorld(!0)},setClear(e){y.uClear.value=e,m.uClear.value=e;let t=(f,M,G)=>{let J=Xt((e-M)/.7),F=J*J;f.position.set(G*F*2.2*d,F*.5-F*F*1.6,-F*.2),f.rotation.z=-F*1.2*G*d,f.visible=J<1};t(S,1,-1),t(o,2,1);let l=e>=3;Me.visible=!l,A.visible=!l,pe.visible=!l},update(e,t){let l=t%3,f=l<.42||l>.62&&l<1.04?1:0,M=Math.abs(Math.sin(t*37.7))*.006*f*nt,G=Math.sin(t*75)*.012*f*nt,J=Ge(0,.5,je),F=Ge(.42,1,je),ne=Y.x+(-.3*d-Y.x)*J,he=Y.z+(.1-Y.z)*J;E.position.set(ne+S.position.x,Y.y+M-F*.62+S.position.y,he+S.position.z),E.rotation.set(F*1.3,0,J*.9*d+G+S.rotation.z),E.visible=S.visible,U.visible=F>.02,U.position.set(ne,0,he-.02),U.scale.y=Math.max(.01,F);let Ne=h[0]+(e.pointer===1?e.px*.2:0),Oe=h[1]+(e.pointer===1?e.py*.12:0);fe.set(Ne-se.x,-se.y,Oe-se.z).normalize(),a.uLampDir.value.copy(fe),a.uLampPos.value.copy(se),a.uLampCone.value.set(.6,.93),He.position.set(se.x+fe.x*.43,se.y+fe.y*.43,se.z+fe.z*.43),He.quaternion.setFromUnitVectors(Oo,fe.negate())}}}var Oo=new ae(0,1,0);var ut=new ae;function be(c,a,i,s,d,r){let p=2*Math.PI*d/4,y=Math.max(r-2*d,0),w=Math.PI/4;ut.copy(a),ut[s]=0,ut.normalize();let n=.5*p/(p+y),h=1-ut.angleTo(c)/w;return Math.sign(ut[i])===1?h*n:y/(p+y)+n+n*(1-h)}var dt=class c extends ve{constructor(a=1,i=1,s=1,d=2,r=.1){let p=d*2+1;if(r=Math.min(a/2,i/2,s/2,r),super(1,1,1,p,p,p),this.type="RoundedBoxGeometry",this.parameters={width:a,height:i,depth:s,segments:d,radius:r},p===1)return;let y=this.toNonIndexed();this.index=null,this.attributes.position=y.attributes.position,this.attributes.normal=y.attributes.normal,this.attributes.uv=y.attributes.uv;let w=new ae,n=new ae,h=new ae(a,i,s).divideScalar(2).subScalar(r),u=this.attributes.position.array,P=this.attributes.normal.array,m=this.attributes.uv.array,R=u.length/6,g=new ae,b=.5/p;for(let T=0,v=0;T<u.length;T+=3,v+=2)switch(w.fromArray(u,T),n.copy(w),n.x-=Math.sign(n.x)*b,n.y-=Math.sign(n.y)*b,n.z-=Math.sign(n.z)*b,n.normalize(),u[T+0]=h.x*Math.sign(w.x)+n.x*r,u[T+1]=h.y*Math.sign(w.y)+n.y*r,u[T+2]=h.z*Math.sign(w.z)+n.z*r,P[T+0]=n.x,P[T+1]=n.y,P[T+2]=n.z,Math.floor(T/R)){case 0:g.set(1,0,0),m[v+0]=be(g,n,"z","y",r,s),m[v+1]=1-be(g,n,"y","z",r,i);break;case 1:g.set(-1,0,0),m[v+0]=1-be(g,n,"z","y",r,s),m[v+1]=1-be(g,n,"y","z",r,i);break;case 2:g.set(0,1,0),m[v+0]=1-be(g,n,"x","z",r,a),m[v+1]=be(g,n,"z","x",r,s);break;case 3:g.set(0,-1,0),m[v+0]=1-be(g,n,"x","z",r,a),m[v+1]=1-be(g,n,"z","x",r,s);break;case 4:g.set(0,0,1),m[v+0]=1-be(g,n,"x","y",r,a),m[v+1]=1-be(g,n,"y","x",r,i);break;case 5:g.set(0,0,-1),m[v+0]=be(g,n,"x","y",r,a),m[v+1]=1-be(g,n,"y","x",r,i);break}}static fromJSON(a){return new c(a.width,a.height,a.depth,a.segments,a.radius)}};var Wo=[.2,.21,.25],Yo=[.365,1,.87];function xo({programs:c,text:a,dir:i}){let s=(n,h,u)=>Le(new dt(n,h,u,4,Math.min(u*.45,n*.12)),{color:Wo}),d=null;function r({w:n=.78,h=1.6,t:u=.09,emissive:P=1}={}){let m=new De,R=new B(ge([s(n,u,h),$(n*.965,u*.02,n*.012,{at:[0,u/2+.001,-h*.482],color:[.7,.72,.76],mat:1}),$(n*.965,u*.02,n*.012,{at:[0,u/2+.001,h*.482],color:[.7,.72,.76],mat:1}),$(n*.012,u*.02,h*.965,{at:[-n*.482,u/2+.001,0],color:[.7,.72,.76],mat:1}),$(n*.012,u*.02,h*.965,{at:[n*.482,u/2+.001,0],color:[.7,.72,.76],mat:1})]),c.solid({ambient:.32,house:1}));m.add(R);let g=new we(n*.94,h*.96);g.rotateX(-Math.PI/2),g.translate(0,u/2+.003,0),d??(d=w(360,720,12));let b=c.paper({atlas:{value:d},house:0,ambient:P,defines:{}}),T=new B(g,b);return m.add(T),m.userData={screen:T,screenMaterial:b,w:n,h,t:u},m}function p({w:n=.78,h=1.6,t:u=.09,color:P=Yo,alpha:m=.9}={}){let R=new $t(new dt(n,u,h,3,Math.min(u*.45,n*.12)),10);return new qt(R,c.wire({color:P,alpha:m}))}function y({w:n=.78,h=1.6}={}){let u=Te("phone-board"),P=c.solid({ambient:.14,house:1}),m=new B(s(n,.03,h),P),g=[$(n*.88,.016,h*.9,{color:[.05,.3,.2]}),$(n*.68,.03,h*.42,{at:[0,.02,h*.19],color:[.2,.22,.26]})];for(let k=0;k<30;k+=1){let V=.03+u()*.08,H=.03+u()*.09;g.push($(V,.018,H,{at:[(u()-.5)*n*.74,.016,-h*.28+(u()-.5)*h*.26],color:u()>.7?[.76,.58,.3]:[.1,.1,.12],mat:u()>.7?1:0}))}let b=new B(ge(g),P),T=ge([$(n,.05,.05,{at:[0,0,-h/2+.025],color:[.62,.64,.68],mat:1}),$(n,.05,.05,{at:[0,0,h/2-.025],color:[.62,.64,.68],mat:1}),$(.05,.05,h,{at:[-n/2+.025,0,0],color:[.62,.64,.68],mat:1}),$(.05,.05,h,{at:[n/2-.025,0,0],color:[.62,.64,.68],mat:1})]),v=new B(T,P),q=new we(n*.94,h*.96);q.rotateX(-Math.PI/2);let _=c.paper({atlas:{value:a.texture},cell:[0,0,1,1],house:0,ambient:1}),re=new B(q,_),j=new ve(n*.98,.006,h*.98),W=new B(j,c.glow({color:[.8,.9,1],alpha:.05,shape:5}));return{back:m,board:b,frame:v,display:re,displayMaterial:_,glass:W}}function w(n,h,u,P){return a.canvas(n,h,(m,R,g)=>{if(m.fillStyle="#0b0d13",m.fillRect(0,0,R,g),P){P(m,R,g);return}let b=g/13;for(let T=0;T<u;T+=1){m.fillStyle="rgba(255,255,255,.07)",m.fillRect(R*.06,b*(T+1),R*.88,b*.74),m.fillStyle=T%3===0?"#5dffde":"#a48bff";let v=i<0?R*.78:R*.1;m.fillRect(v,b*(T+1)+b*.16,R*.12,b*.42),m.fillStyle="rgba(232,236,244,.7)",m.fillRect(i<0?R*.28:R*.26,b*(T+1)+b*.28,R*.46,b*.16)}})}return{make:r,wire:p,layers:y,listTexture:w}}var Se=4200,yo=.12,Go=.6,qo=.03;function bo({programs:c,shared:a,printTexture:i,dir:s}){let d=new Ye(new Float32Array(Se*2*3),3).setUsage(rt),r=new Ye(new Float32Array(Se*2*3),3).setUsage(rt),p=new Ye(new Float32Array(Se*2),1),y=new Ye(new Float32Array(Se*2),1).setUsage(rt),w=new Ye(new Float32Array(Se*2),1).setUsage(rt),n=new Uint32Array((Se-1)*6);for(let H=0;H<Se;H+=1)if(p.array[H*2]=-1,p.array[H*2+1]=1,H<Se-1){let D=H*2;n.set([D,D+1,D+2,D+1,D+3,D+2],H*6)}let h=new Gt;h.setAttribute("position",d),h.setAttribute("aAcross",r),h.setAttribute("aSide",p),h.setAttribute("aS",y),h.setAttribute("aW",w),h.setIndex(new Ye(n,1));let u={uFeed:{value:0},uLine:{value:1e6},uLineLen:{value:4},uJamA:{value:0},uJamB:{value:0},uJamK:{value:0},uFlutter:{value:1},uWide:{value:1e6},uPrint:{value:i},uPrintRange:{value:0},uPaperGlow:{value:.22},uLineColor:{value:[.365,1,.87]}},P=c.strip({uniforms:u,side:2}),m=new B(h,P);m.frustumCulled=!1;let R=new B(h,c.glow({color:[.365,1,.87],alpha:.5,shape:5,house:0,deform:{pars:"in vec3 aAcross; in float aSide, aS, aW; uniform float uLine, uLineLen; out float vSide, vAlive;",fpars:"in float vSide, vAlive;",local:`{
          float z = max(-(viewMatrix * vec4(p, 1.0)).z, 0.05);
          p += aAcross * aSide * min(max(aW * 5.0, 0.16), z * 0.02);
        }`,world:"vSide = aSide; vAlive = smoothstep(uLine + uLineLen * 0.7, uLine + uLineLen, aS);",frag:"a = (1.0 - abs(vSide)); a = a * a * vAlive;",uniforms:{uLine:u.uLine,uLineLen:u.uLineLen}}}));R.frustumCulled=!1;let g=new Float32Array(Se),b=new Float32Array(Se),T=0,v=0,q=0,_=(H,D,K,o,L,N,S,Y)=>{if(T>=Se)return;let E=T*2;d.setXYZ(E,H,D,K),d.setXYZ(E+1,H,D,K),r.setXYZ(E,o,L,N),r.setXYZ(E+1,o,L,N),y.setX(E,S),y.setX(E+1,S),w.setX(E,Y),w.setX(E+1,Y),g[T]=S,b[T]=D,T+=1};function re({yaws:H,lineStartY:D,endY:K,dense:o}){T=0;let L=0,N=.31*s,S=[[N,.11,-.5],[N,.085,-.43],[N*.92,.012,-.34],[N*.62,.003,-.24],[N*.22,.003,-.11],[0,.003,-.025],[0,-.004,.008],[0,-.03,.012]],Y=24,E=S[0];for(let te=0;te<S.length-1;te+=1){let le=S[Math.max(0,te-1)],C=S[te],z=S[te+1],O=S[Math.min(S.length-1,te+2)];for(let Q=te===0?0:1;Q<=Y;Q+=1){let x=Q/Y,I=x*x,oe=I*x,de=[0,1,2].map(ce=>.5*(2*C[ce]+(z[ce]-le[ce])*x+(2*le[ce]-5*C[ce]+4*z[ce]-O[ce])*I+(3*C[ce]-le[ce]-3*z[ce]+O[ce])*oe)),ze=de[0]-E[0],X=de[1]-E[1],A=de[2]-E[2];L+=Math.hypot(ze,X,A);let me=Math.hypot(ze,A)||1;_(de[0],de[1],de[2],A/me||1,0,-ze/me||0,L,yo),E=de}}v=L,q=E[1];let U=E[1],Z=0;for(;U>K&&T<Se;){let te=.22;U>ee.slabBottom-.5&&(te=.05);for(let I of o)U<I.a&&U>I.b&&(te=.022);for(U-=te,L+=te;Z<H.length-1&&U<H[Z+1].y;)Z+=1;let le=H[Z],C=H[Math.min(Z+1,H.length-1)],z=C===le?0:Ge(.25,.75,(le.y-U)/Math.max(.001,le.y-C.y)),O=ht(le.yaw,C.yaw,z)*Math.PI/180,Q=Ge(ee.floorY-.2,ee.slabBottom+.2,U),x=ht(yo,Go,Q);U<D&&(x=ht(x,qo,Ge(0,4,D-U))),_(0,U,0,Math.cos(O),0,Math.sin(O),L,x)}d.needsUpdate=!0,r.needsUpdate=!0,y.needsUpdate=!0,w.needsUpdate=!0,u.uLine.value=j(D),u.uPrintRange.value=j(ee.floorY-.1),u.uWide.value=j(ee.deskY)}function j(H){return v+(q-H)}function W(H){let D=0,K=T-1;for(;D<K;){let o=D+K>>1;g[o]<H?D=o+1:K=o}return D}let k=-1/0;function V(H,D){let K=H+D,o=K>q?0:W(j(K)),L=W(j(Math.max(H-D,k))),N=Math.max(0,L-o)*6;h.setDrawRange(o*6,N)}return{mesh:m,halo:R,u,rebuild:re,focus:V,setEnd(H){k=H},sAtY:j,pointAtY(H,D){return D[0]=0,D[1]=H,D[2]=0,D}}}var _o=460812,Uo=12e3,$o=()=>new Promise(c=>{window.scheduler?.yield?window.scheduler.yield().then(c):setTimeout(c,0)});async function Tt(c){let a=performance.now();for(;;){if(c.next().done)return;performance.now()-a>4&&(await $o(),a=performance.now())}}async function D0({canvas:c,gl:a,tier:i,forced:s,onFail:d,onOff:r,isFailed:p}){Ot.enabled=!1;let y={...ho[i],instanceScale:1},w=document.documentElement,n=w.dir==="rtl"?-1:1,h=window.matchMedia("(pointer: coarse)").matches,u=new Vt({canvas:c,context:a,antialias:!0});u.outputColorSpace=Dt,u.setClearColor(_o,1),u.sortObjects=!1,u.debug.checkShaderErrors=s,u.info.autoReset=!0;let P=new Yt,m=new ft(30,1,.1,100);await po(n<0);let R=fo({q:y,dir:n}),g={uTime:{value:0},uInline:{value:n},uCamY:{value:0},uDawn:{value:0},uPower:{value:new We(0,0)},uPowerY:{value:0},uLitY:{value:new We(ee.slabBottom,-120)},uFog:{value:new We(4,40)},uLampOrigin:{value:new ae},uLampPos:{value:new ae(.5*n,.62,-.62)},uLampDir:{value:new ae(0,-1,0)},uLampColor:{value:new ae(1,.7,.42)},uLampOn:{value:1},uLampCone:{value:new We(.55,.9)},uAtlas:{value:R.texture}},b=uo(g),T=bo({programs:b,shared:g,printTexture:R.printTexture,dir:n}),v=go({programs:b,shared:g,text:R,q:y,dir:n,tier:i}),q=wo({programs:b,shared:g,text:R,q:y,dir:n,tier:i}),_=xo({programs:b,shared:g,text:R,dir:n}),re={desk:v,archive:q,strip:T,phone:_};v.setPhone(_.make({w:.0775,h:.16,t:.0085})),P.add(v.group,q.group,T.mesh,T.halo);let j=_e.map((e,t)=>({meta:e,index:t,status:"idle",module:null,group:new De,ctx:null,on:!1,a:0,s:0,e:0,b:0,promise:null})),W=Object.fromEntries(j.map(e=>[e.meta.id,e]));j.forEach(e=>{e.group.visible=!1,P.add(e.group)});let k=null,V=null,H=null,D=1,K=1/0,o=0,L=0,N=0,S=()=>k.svh*.15;function Y(){k=ro();let e=Jt(k,_e);V=e.solved,D=k.docH,H=Qt(e.knots,D);let t=V["svc.auto"],l=V["process.head"],f=V["why.q"],M=_e.filter(F=>F.floor&&F.stripYaw!==void 0).map(F=>({y:V[F.id].floorY,yaw:F.stripYaw}));M.unshift({y:ee.deskY,yaw:0}),M.push({y:t.floorY+3,yaw:0},{y:t.floorY+1,yaw:90},{y:t.floorY-3,yaw:90},{y:l.floorY+2,yaw:0}),M.sort((F,ne)=>ne.y-F.y),T.rebuild({yaws:M,lineStartY:t.floorY-1.8,endY:f.floorY+.03,dense:[{a:V["svc.rescue"].floorY+2.4,b:V["svc.rescue"].floorY-2.4}]}),g.uLitY.value.set(ee.slabBottom,l.floorY+4),q.setRange(ee.slabBottom,l.floorY);let G=k.shots.drop,J=k.shots.fall;o=G.pinStart+(G.pinEnd-G.pinStart)*.86,K=J.pinStart+(J.pinEnd-J.pinStart)*.5,L=G.pinStart+(G.pinEnd-G.pinStart)*.8,N=J.pinStart+(J.pinEnd-J.pinStart)*.4;for(let F of j){let ne=F.index,he=k.shots[F.meta.id],Ne=ne>0?k.shots[_e[ne-1].id]:null,Oe=ne<_e.length-1?k.shots[_e[ne+1].id]:null;F.a=Ne?Ne.pinEnd:0,F.s=he.pinStart,F.e=he.pinEnd,F.b=Oe?Oe.pinStart:D;let yt=V[F.meta.id];F.group.position.set(0,yt.floorY??0,0),F.status==="ready"&&F.module.layout&&F.module.layout(F.ctx)}v.setActPositions(V.deskAct4),te()}let E=1,U=0,Z=null;function te(){let e=k.W,t=k.H,l=y.pixelCap*E,f=Math.min(window.devicePixelRatio||1,Math.sqrt(l/(e*t)));u.setPixelRatio(f),u.setSize(e,t,!1),m.aspect=e/t,Z?.resize(e*f,t*f)}let le=[],C=e=>({tier:i,q:y,dir:n,id:e.meta.id,group:e.group,programs:b,u:g,text:R,sets:re,camera:m,renderer:u,rng:Te(e.meta.id),get solved(){return V},get layout(){return k},get self(){return V[e.meta.id]},place(t,{inline:l=0,y:f=0,z:M=0,yaw:G=0}={}){return t.position.set(l*n,f,M),t.rotation.y=G*n,t},hotspots:{add(t){le.push({...t,runtime:e})}}});async function z(e){if(e.status!=="ready")return e.promise||(e.status="loading",e.promise=(async()=>{try{let l=(await mo[e.meta.id]()).default;e.ctx=C(e),await Tt(l.build(e.ctx)),await u.compileAsync(e.group,m,P),l.layout&&l.layout(e.ctx),e.module=l,e.status="ready",pe=!0}catch(t){console.warn(`shot ${e.meta.id} failed`,t),e.status="failed"}})()),e.promise}function O(e){for(let t=j.length-1;t>=0;t-=1)if(e>=j[t].a)return t;return 0}let Q=!1;async function x(){if(!Q){for(Q=!0;!(ce||p());){let e=O(A),t=null,l=1/0;for(let f of j)if(f.status==="idle"){let M=Math.abs(f.index-e);M<l&&(t=f,l=M)}if(!t)break;await new Promise(f=>{"requestIdleCallback"in window?window.requestIdleCallback(f,{timeout:200}):setTimeout(f,16)}),await z(t)}Q=!1}}let I=new Float32Array(13),oe=new Nt,de=new ae(0,1,0),ze=new ae(1,0,0),X={t:0,enter:0,hold:0,exit:0,y:0,v:0,time:0,dt:0,px:0,py:0,pointer:0},A=window.scrollY,me=0,ce=!1,Re=null,pe=!0,Fe=0,$e=performance.now(),ye=0,Ze=performance.now(),et=0,tt=0,ot=0,Me=0,Ce=0,Ie=0,st=!1,He=h?.09:.14;function wt(e,t){let l=2/He,f=l*t,M=1/(1+f+.48*f*f+.235*f*f*f),G=A-e,J=(me+l*G)*t;me=(me-l*J)*M,A=e+(G+J)*M,Math.abs(A-e)<.25&&Math.abs(me)<2&&(A=e,me=0)}function Be(e,t){let l=f=>Math.min(1,Math.max(0,f));X.t=e.b>e.a?l((A-e.a)/(e.b-e.a)):1,X.enter=e.s>e.a?l((A-e.a)/(e.s-e.a)):A>=e.s?1:0,X.hold=e.e>e.s?l((A-e.s)/(e.e-e.s)):A>=e.e?1:0,X.exit=e.b>e.e?l((A-e.e)/(e.b-e.e)):A>=e.b?1:0,X.y=A,X.v=me,X.time=Fe,X.dt=t,X.px=Me,X.py=Ce,X.pointer=ot}let se=(e,t)=>t>e?Math.min(1,Math.max(0,(A-e)/(t-e))):A>=t?1:0,ue=e=>e*e*(3-2*e);function gt(){let e=k.shots["process.head"];q.u.uTurn.value=ue(se(e.pinStart,e.pinEnd));let t=k.shots["why.list"],l=k.shots["why.stats"],f=k.shots.cta,M=se(t.pinStart,t.pinEnd)*3.2;v.setClear(M);let G=ue(se(t.pinStart+(t.pinEnd-t.pinStart)*.45,f.pinStart));g.uDawn.value=G,v.setClock(3.2+ue(se(t.pinStart,l.pinEnd))*3.8);let J=k.shots.hero;if(A<K){let he=k.shots.drop.pinEnd-J.pinEnd;v.setRing(1-se(J.pinEnd,J.pinEnd+he*.14)),v.setOffHook(ue(se(J.pinEnd,J.pinEnd+he*.22)))}else v.setRing(1-se(t.pinStart,t.pinStart+(t.pinEnd-t.pinStart)*.5)),v.setOffHook(0);let F=v.phone;if(F.visible=A>K,T.setEnd(-1/0),A>K){let he=k.shots["why.q"],Ne=V["why.q"].d*.62,Oe=ue(se(k.shots.fall.pinEnd-(k.shots.fall.pinEnd-K)*.2,he.pinEnd)),yt=ue(se(t.pinStart,t.pinStart+(t.pinEnd-t.pinStart)*.14)),kt=Ne+(.42-Ne)*Oe,Et=kt+(.0043-kt)*yt;F.position.y=Et;let So=2.1+(1-2.1)*Oe;F.scale.setScalar(So),F.rotation.y=k.portrait?0:Math.PI/2*ue(se(l.pinEnd,f.pinStart)),T.setEnd(v.group.position.y+Et+.01)}let ne=j.find(he=>he.meta.id==="svc.rescue");(A<ne.a||A>ne.b)&&(g.uPower.value.set(0,0),T.u.uJamK.value=0)}function fe(e){Kt(H,D,A,I),m.position.set(I[0],I[1],I[2]),m.quaternion.set(I[3],I[4],I[5],I[6]),ot===1&&(oe.setFromAxisAngle(de,-Me*.012),m.quaternion.multiply(oe),oe.setFromAxisAngle(ze,Ce*.009),m.quaternion.multiply(oe)),m.fov=I[7],m.near=I[8],m.far=I[9],m.setViewOffset(k.W,k.H,I[11],I[12],k.W,k.H),g.uTime.value=Fe,g.uCamY.value=I[1],g.uFog.value.set(I[10]*.16,I[10]),gt();let t=A<o||A>K,l=A>K?4:1;v.group.visible=t,v.setAct(l),q.group.visible=A>L&&A<N,g.uLampOn.value=t?1-g.uDawn.value*.72:0,g.uLampOrigin.value.copy(v.group.position),g.uLampColor.value.set(1,.7,.42),T.u.uFeed.value=A*18e-5,Be(j[0],e),t&&(v.resetSpot(),v.update(X,Fe));for(let f of j){let M=A>=f.a-S()&&A<=f.b+S();f.status==="ready"&&(M||f.on)&&(Be(f,e),f.module.update(X,f.ctx),f.on=M,f.group.visible=M)}T.focus(I[1],I[9]),m.updateProjectionMatrix(),m.updateMatrixWorld(),Z?Z.render(P,m):u.render(P,m)}let Ae=new mt({onChange(e,t){nt(t)}});function nt(e){if(e==="pixel-85"||e==="pixel-72")U=e==="pixel-85"?.85:.72;else if(e==="drop-film")Z?.dispose(),Z=null;else if(e==="instances-70"||e==="instances-50")y.instanceScale=e==="instances-70"?.7:.5,v.setDensity(y.instanceScale),q.setDensity(y.instanceScale);else if(e==="shadow-1")v.setShadowTaps(1);else if(e==="extras-off")q.setWeather(!1),v.setExtras(!1);else if(e==="cadence-30")Ie=33.3;else if(e==="stills"){try{window.localStorage.setItem("enjaz:tier",`S:${Date.now()}`)}catch{}at(),r("governor")}}function je(e){if(ce)return;if(window.requestAnimationFrame(je),document.hidden||st||Re!==null){$e=e;return}let t=e-$e;$e=e;let l=Math.min(t,100)/1e3;Fe+=l;let f=window.scrollY,M=Math.abs(f-A)>.25||Math.abs(me)>2;wt(f,l),Me+=(et-Me)*Math.min(1,l*6),Ce+=(tt-Ce)*Math.min(1,l*6);let G=Math.abs(et-Me)>.001||Math.abs(tt-Ce)>.001,F=j[O(A)].meta.idleHz,ne=M||G||pe;if(!ne&&F>0&&!(i==="L"&&e-Ze>Uo)&&(ne=e-ye>=1e3/F-1),Ie&&e-ye<Ie-2&&(ne=!1),!ne)return;M&&(Ze=e),U&&(!M||A>k.shots.fall.pinStart&&A<k.shots.fall.pinEnd)&&(E=U,U=0,te()),pe=!1;let he=(e-ye)/1e3;ye=e,fe(Math.min(he,.1)),t<250&&(M||F>0)&&Ae.push(t)}function at(){ce=!0}window.addEventListener("pointermove",e=>{ot=e.pointerType==="mouse"?1:2,et=e.clientX/window.innerWidth*2-1,tt=e.clientY/window.innerHeight*2-1,Ze=performance.now()},{passive:!0});let Ve=new ae;window.addEventListener("click",e=>{if(!e.target.closest?.("a, button, .shot"))for(let t of le){if(!t.runtime.on)continue;Ve.set(t.center[0],t.center[1],t.center[2]),t.runtime.group.localToWorld(Ve).project(m);let l=(Ve.x*.5+.5)*k.W,f=(.5-Ve.y*.5)*k.H;Math.hypot(l-e.clientX,f-e.clientY)<t.radius&&(t.runtime.module.hit?.(t.id,X,t.runtime.ctx),pe=!0)}},{passive:!0}),window.addEventListener("pageshow",()=>{A=window.scrollY,pe=!0});let pt=0;if(c.addEventListener("webglcontextlost",e=>{e.preventDefault(),st=!0,pt+=1,r("context-lost")}),c.addEventListener("webglcontextrestored",()=>{pt>1||(st=!1,v.bakeShadow(u),pe=!0,w.classList.remove("world-off"))}),Y(),A=window.scrollY,await Tt(v.build()),await Tt(q.build()),await z(W.hero),await z(W.drop),await u.compileAsync(P,m),v.bakeShadow(u),p())return null;if(!s){let e=[],t=new Uint8Array(4);for(let f=0;f<6;f+=1){await new Promise(G=>window.requestAnimationFrame(G));let M=performance.now();fe(.016),a.readPixels(0,0,1,1,a.RGBA,a.UNSIGNED_BYTE,t),e.push(performance.now()-M)}let l=e.slice(2).sort((f,M)=>f-M)[1];if(l>40){try{window.localStorage.setItem("enjaz:tier",`S:${Date.now()}`)}catch{}return d("bench"),null}l>20&&(E=.7,y.instanceScale=.7,v.setDensity(.7),q.setDensity(.7),te())}y.film&&(Z=(await import("./chunk-WOIDP7SL.js")).createFilm(u),Z.resize(k.W*u.getPixelRatio(),k.H*u.getPixelRatio())),fe(.016),w.classList.add("world-on"),window.requestAnimationFrame(je),x();let xt=lo(()=>{Y(),pe=!0});/[?&]hud=1\b/.test(window.location.search)&&import("./chunk-FKFVKEYL.js").then(e=>e.mountHud({renderer:u,governor:Ae,tier:i,q:y,get y(){return A}}));let it={tier:i,renderer:u,governor:Ae,scene:P,stop:at,get layout(){return k},get solved(){return V},seek(e){return window.scrollTo({top:e,behavior:"instant"}),A=window.scrollY,me=0,fe(.016),A},freeze(e){Re=e,Fe=e},unfreeze(){Re=null},renderOnce(){fe(.016)},info(){return fe(.016),{calls:u.info.render.calls,triangles:u.info.render.triangles,programs:u.info.programs.length,rung:Ae.rung,y:A}},sceneInfo(){let e=Z;Z=null,fe(.016);let t={calls:u.info.render.calls,triangles:u.info.render.triangles};return Z=e,t},feedFrameTimes(e){e.forEach(t=>Ae.push(t))},async loadAll(){await Promise.all(j.map(e=>z(e))),pe=!0},status(){return Object.fromEntries(j.map(e=>[e.meta.id,e.status]))},dispose(){at(),xt()}};return window.__enjazWorld=it,it}export{D0 as start};
