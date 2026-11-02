/* three.js r187 (c) three.js authors, MIT. ENJAZ film. */
import{a as ee,b as oo,c as so,d as no}from"./chunk-FKZIRWLH.js";import{a as ao,b as io,c as ro,d as lo,e as co,f as Rt,g as uo,h as po}from"./chunk-2EEOQMQQ.js";import{c as Te,d as $,f as Me,g as He,h as Le,i as De,j as to,k as yt,l as Je}from"./chunk-GBHZZ3DY.js";import{A as Jt,B as Qt,C as be,D as kt,E as Zt,J as Se,N as Kt,O as xt,S as eo,a as At,c as Et,d as Pt,e as ot,f as Ot,g as Bt,h as Wt,i as Yt,j as _t,k as pt,l as Gt,m as Ve,n as Ut,o as le,p as qt,q as $t,r as Tt,t as _e,u as jt,v as Xe,w as Vt,x as W,z as Xt}from"./chunk-ZD75F7KI.js";import"./chunk-AEJNSRIJ.js";var bt=c=>Math.min(1,Math.max(0,c));function fo({inPlace:c,blur:n}){let a=[],t=NaN,u=0,l=0;function d(i){i.el.style.opacity="",i.el.style.transform="",i.el.classList.remove("is-gone");for(let s of i.kids)s.style.opacity="",s.style.transform="",s.style.filter=""}function y(i,s,r,h){let m=s<.5;if(m!==i.gone&&(i.gone=m,i.el.classList.toggle("is-gone",m),document.dispatchEvent(new CustomEvent("enjaz:captions"))),s===1&&r===0){d(i);return}i.el.style.opacity=bt(s/.55).toFixed(3),i.el.style.transform=r?`translate3d(0, ${r.toFixed(1)}px, 0)`:"";let w=i.kids.length,x=w>1?Math.min(.14,.5/(w-1)):0,L=1-(w-1)*x;i.kids.forEach((v,A)=>{let S=bt((s-A*x)/L);if(S===1){v.style.opacity="",v.style.transform="",v.style.filter="";return}let k=1-S;v.style.opacity=S.toFixed(3),v.style.transform=`translate3d(0, ${(k*k*k*1.1*(h?-1:1)).toFixed(3)}em, 0)`,n&&(v.style.filter=`blur(${(k*.28).toFixed(3)}em)`)})}return{bake(i){let s=.35*i.svh;a=[];for(let[r,h]of Object.entries(i.shots)){if(!h.caption||h.caption.h>i.svh*.7)continue;let m=document.querySelector(`[data-shot="${r}"] > .shot`);m&&a.push({el:m,kids:[...m.children],a:r==="hero"?-1:h.pinStart-s,s:r==="hero"?-1:h.pinStart,e:h.pinEnd,b:h.pinEnd+s,shown:-1,shift:0,gone:!1})}t=NaN},update(i,s){u=i===t?u+s:0,t=i,l=u>.25?Math.min(1,l+s/.4):Math.max(0,l-s/.12);for(let r of a){let h=r.s>r.a?bt((i-r.a)/(r.s-r.a)):1,m=bt((i-r.e)/(r.b-r.e)),w=i>r.a&&i<r.b,x=w?Math.max(Math.min(h,1-m),l):0,L=0;c&&w&&(L=h<1?(i-r.s)*.85:m>0?(i-r.e)*.85:0),(x!==r.shown||L!==r.shift)&&(r.shown=x,r.shift=L,y(r,x,L,m>0))}},release(){for(let i of a)d(i),i.shown=-1,i.gone=!1}}}var Ft=["pixel-85","pixel-72","drop-film","instances-70","instances-50","shadow-1","extras-off","cadence-30","stills"];function It(c,n){return c[Math.min(c.length-1,Math.floor(c.length*n))]}var St=class{constructor({onChange:n=()=>{}}={}){this.onChange=n,this.buffer=new Float32Array(90),this.sorted=new Float32Array(90),this.count=0,this.head=0,this.rung=-1,this.elapsed=0,this.overBudget=0,this.underBudget=0,this.cooldown=0,this.climbs=0,this.upWait=240,this.locked=!1,this.refreshCap=!1,this.seen=0,this.belowBail=0,this.p50=0,this.p90=0,this.vsync=16.6}target(){return this.refreshCap?33.3:Math.max(this.vsync,16.6)}push(n){if(this.elapsed+=n,this.elapsed<1e3||n>250||(this.buffer[this.head]=n,this.head=(this.head+1)%90,this.count=Math.min(90,this.count+1),this.seen+=1,this.cooldown=Math.max(0,this.cooldown-n),this.count<90/2))return;this.sorted.set(this.buffer);let a=this.sorted.subarray(0,this.count).sort();this.p50=It(a,.5),this.p90=It(a,.9),this.vsync=It(a.subarray(0,Math.max(1,Math.floor(this.count*.2))),.5),this.seen<=60&&Math.abs(this.p50-33.3)/33.3<.04&&this.p90/this.p50<1.08&&(this.refreshCap=!0);let t=this.target();if(this.p90>t*1.25?(this.overBudget+=1,this.underBudget=0):this.p90<t*.75?(this.underBudget+=1,this.overBudget=0):(this.overBudget=0,this.underBudget=0),this.rung===Ft.length-2&&this.p50>50){if(this.belowBail+=n,this.belowBail>4e3){this.step(1);return}}else this.belowBail=0;this.cooldown>0||(this.overBudget>=45&&this.rung<Ft.length-2?(this.underBudgetClimbed&&(this.upWait*=2,this.underBudgetClimbed=!1),this.step(1)):this.underBudget>=this.upWait&&this.rung>=0&&!this.locked&&(this.climbs+=1,this.underBudgetClimbed=!0,this.climbs>=2&&(this.locked=!0),this.step(-1)))}step(n){this.rung+=n,this.overBudget=0,this.underBudget=0,this.cooldown=1500,this.count=0,this.onChange(this.rung,Ft[this.rung]??"full")}};var Mt=(c,n,a)=>Math.min(a,Math.max(n,c));function ho(c=0){return{y:c,v:0,step(n,a,t){let l=10*a,d=1/(1+l+.48*l*l+.235*l*l*l),y=4.2*t*.2,i=Mt(this.y-n,-y,y),s=(this.v+10*i)*a;return this.v=(this.v-10*s)*d,this.y=this.y-i+(i+s)*d,Math.abs(this.y-n)<.25&&Math.abs(this.v)<2&&(this.y=n,this.v=0),this.y},reset(n){this.y=n,this.v=0},land(n,a){let t=Math.sign(n-this.y);this.y=n-t*.8*a,this.v=t*4.2*a*.5}}}function mo(){return{on:!1,at:0,aim:0,written:0,input(c,n,a,t,u){this.on||(this.on=!0,this.at=a,this.aim=a,this.written=a);let d=Mt(c*(n===1?40:n===2?t:1),-200,200),y=Math.sign(d)===-Math.sign(this.aim-this.at)?this.at:this.aim,i=1.6*t;this.aim=Mt(y+d,Math.max(0,this.at-i),Math.min(u,this.at+i))},step(c,n,a){if(!this.on)return c;if(Math.abs(c-this.written)>2)return this.on=!1,c;let t=3.5*a*n;return this.at+=Mt((this.aim-this.at)*(1-Math.exp(-12*n)),-t,t),Math.abs(this.aim-this.at)<.5&&(this.at=this.aim,this.on=!1),this.written=Math.round(this.at),this.written}}}var vo=c=>{let n=document.createElement("div");n.style.position="fixed",n.style.top="0",n.style.width="0",n.style.visibility="hidden",n.style.height=`100${c}`,document.body.appendChild(n);let a=n.getBoundingClientRect().height;return n.remove(),a},ft=c=>parseFloat(c)||0;function wo(){let c=vo("svh"),n=vo("lvh"),a=document.documentElement.clientWidth,t=n,u=window.scrollY,l=document.querySelector("[data-nav]"),d=l?l.getBoundingClientRect().height:0,y=document.documentElement.dir==="rtl"?-1:1,i=document.documentElement.scrollHeight,s=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--pace"))||1,r={};for(let h of document.querySelectorAll("[data-shot]")){let m=h.dataset.shot,w=h.getBoundingClientRect(),x=w.top+u,L=h.querySelector(":scope > .shot"),v={id:m,top:x,height:w.height,caption:null,pinStart:x,pinEnd:x};if(L){let A=L.getBoundingClientRect(),S=getComputedStyle(h),k=getComputedStyle(L),_=ft(S.paddingBlockEnd);if(m==="hero"){let te=ft(k.insetBlockStart),ne=ft(k.marginBlockEnd),D=ft(S.paddingBlockStart);v.pinStart=0,v.pinEnd=Math.max(0,w.height-D-A.height-ne),v.caption={x:A.left,y:te,w:A.width,h:A.height}}else{let te=ft(k.insetBlockEnd);v.pinStart=x+A.height+te-c,v.pinEnd=v.pinStart+Math.max(0,w.height-_-A.height),v.caption={x:A.left,y:c-te-A.height,w:A.width,h:A.height},v.pin=te,v.gap=_}}r[m]=v}return{W:a,H:t,svh:c,lvh:n,navH:d,docH:i,dir:y,pace:s,portrait:t>=a,shots:r}}function go(c){let n=window.matchMedia("(pointer: coarse)").matches,a=document.documentElement.clientWidth,t=document.documentElement.scrollHeight,u=0,l=()=>{window.clearTimeout(u),u=window.setTimeout(c,160)},d=new ResizeObserver(()=>{let y=document.documentElement.clientWidth,i=document.documentElement.scrollHeight;if(y===a&&i===t)return;let s=n&&y===a&&Math.abs(i-t)<200;a=y,t=i,s||l()});return d.observe(document.documentElement),document.fonts?.ready.then(l),document.fonts?.addEventListener?.("loadingdone",l),()=>d.disconnect()}var nt=`
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
`,at=`
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
`,Ro=`
${nt}
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
}`,Fo=`
${at}
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
}`,Io=`
${nt}
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
}`,Ho=`
${at}
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
}`,Do=`
${nt}
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
}`,No=`
${at}
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
}`,Oo=`
${nt}
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
}`,Bo=`
${at}
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
}`,Wo=`
${nt}
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
}`,Yo=`
${at}
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
}`,_o=`
${nt}
in vec3 position;
out float vFog;
//#pars
void main() {
  vec3 p = position;
  //#local
  vec3 wp = (modelMatrix * vec4(p, 1.0)).xyz;
  gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
  vFog = fogAt(wp);
}`,Go=`
${at}
uniform vec3 uColor;
uniform float uAlpha;
in float vFog;
void main() {
  fragColor = vec4(uColor * uAlpha * (1.0 - clamp(vFog, 0.0, 1.0)), 1.0);
}`;function xo(c,n={}){return c.replace("//#pars",n.pars??"").replace("//#fpars",n.fpars??"").replace("//#local",n.local??"").replace("//#world",n.world??"").replace("//#frag",n.frag??"")}function Qe(c,{mips:n=!0,repeat:a=!1}={}){let t=new Jt(c);return t.colorSpace=Wt,t.generateMipmaps=n,t.minFilter=n?Ot:ot,t.magFilter=ot,a&&(t.wrapS=Pt,t.wrapT=Pt),t}function Uo(){let n=document.createElement("canvas");n.width=256*2,n.height=256;let a=n.getContext("2d"),t=(u,l,d)=>{let y=a.createRadialGradient(u+107.52,76.8,5.12,u+128,128,184.32);l.forEach(([s,r])=>y.addColorStop(s,r)),a.fillStyle=y,a.fillRect(u,0,256,256);let i=a.createRadialGradient(u+256*.38,256*.24,0,u+256*.38,256*.24,256*.26);i.addColorStop(0,d),i.addColorStop(1,"rgba(255,255,255,0)"),a.fillStyle=i,a.fillRect(u,0,256,256)};return t(0,[[0,"#bcbcc0"],[.5,"#8c8d92"],[.85,"#55565c"],[1,"#35363c"]],"rgba(255,255,255,.18)"),t(256,[[0,"#f6d58c"],[.45,"#c9963f"],[.8,"#6e4a1c"],[1,"#2c1c0a"]],"rgba(255,244,214,.75)"),Qe(n,{mips:!1})}function yo(c){let n=Uo(),a=(t,u,l,d,y={})=>{let{deform:i,defines:s,...r}=y;return new Kt({name:t,glslVersion:Gt,vertexShader:xo(u,i),fragmentShader:xo(l,i),defines:s??{},uniforms:{...c,...d,...i?.uniforms??{}},...r})};return{matcap:n,solid(t={}){return a("solid",Ro,Fo,{uMatcap:{value:n},uEmit:{value:t.emit??[0,0,0]},uAmbient:{value:t.ambient??.06},uHouse:{value:t.house??1}},st(t,["emit","ambient","house"]))},paper(t={}){return a("paper",Io,Ho,{uAtlas:t.atlas??c.uAtlas,uCell:{value:t.cell??[0,0,1,1]},uAmbient:{value:t.ambient??.07},uHouse:{value:t.house??1},uLitBoost:{value:t.boost??1}},{side:At,...st(t,["atlas","cell","ambient","house","boost"])})},wood(t={}){return a("wood",Do,No,{uHouse:{value:0},...t.uniforms},st(t,["uniforms"]))},strip(t={}){return a("strip",Oo,Bo,{uHouse:{value:1},...t.uniforms},st(t,["uniforms"]))},glow(t={}){return a("glow",Wo,Yo,{uColor:{value:t.color??[1,1,1]},uAlpha:{value:t.alpha??1},uShape:{value:t.shape??0},uRadius:{value:0},uMap:{value:t.map??n},uHouse:{value:t.house??0}},{transparent:!0,depthWrite:!1,blending:Et,side:At,...st(t,["color","alpha","shape","map","house"])})},wire(t={}){return a("wire",_o,Go,{uColor:{value:t.color??[.365,1,.87]},uAlpha:{value:t.alpha??1},uHouse:{value:0}},{transparent:!0,depthWrite:!1,blending:Et,...st(t,["color","alpha"])})}}}function st(c,n){let a={};for(let t of Object.keys(c))n.includes(t)||(a[t]=c[t]);return a}var We=4,qo=["invoice","receipt","quote","ledger","sheet","slip","lines","dossier","carbon","memo","tape","blank"],$o=c=>{let n=new Set;for(let a of document.querySelectorAll(c)){let t=a.textContent.trim();t&&t!=="\u2726"&&n.add(t)}return[...n]};async function bo(c){let n=[document.fonts.load('400 20px "IBM Plex Mono"',"#REF! 0123"),document.fonts.load(c?'700 48px "Noto Kufi Arabic"':'700 48px "Space Grotesk"',c?"\u0625\u0646\u062C\u0627\u0632":"ENJAZ")];await Promise.race([Promise.allSettled(n),new Promise(a=>setTimeout(a,1500))])}function So({q:c,dir:n}){let a=n<0,t=document.querySelector("main"),u={};try{u=JSON.parse(t?.dataset.atlas??"{}")}catch{u={}}let l=$o(".ticker__track span"),d=[];try{d=JSON.parse(document.querySelector("[data-typewriter]")?.dataset.typewriter??"[]")}catch{d=[]}let y=a?'"Noto Kufi Arabic", system-ui':'"Space Grotesk", system-ui',i='"IBM Plex Mono", monospace',s=new Intl.NumberFormat(a?"ar-EG":"en-US",{useGrouping:!1}),r=c.atlas,h=document.createElement("canvas");h.width=r,h.height=r;let m=h.getContext("2d"),w=r/We;m.fillStyle="#fff",m.fillRect(0,0,r,r);let x="#23252e",L="#9aa0ad",v=(o,T)=>{let Y=o%We,E=Math.floor(o/We);m.save(),m.beginPath(),m.rect(Y*w,E*w,w,w),m.clip(),m.translate(Y*w,E*w),m.scale(w/100,w/134),m.direction=a?"rtl":"ltr",m.textBaseline="alphabetic",T(m),m.restore()},A=o=>a?100-o:o,S=(o,T,Y,E=12)=>{o.fillStyle=x,o.font=`700 ${E}px ${y}`,o.textAlign="start",o.fillText(T,A(8),Y)},k=(o,T,Y=8,E=92,G=L,I=.7)=>{o.fillStyle=G,o.fillRect(Y,T,E-Y,I)},_=(o,T,Y,E,G=0)=>{for(let I=0;I<Y;I+=1){let j=34+(I*37+G)%40;o.fillStyle=I%3===0?x:L,o.fillRect(a?92-j:8,T+I*E,j,1.4),o.fillStyle=L,o.fillRect(a?8:80,T+I*E,12,1.4)}};v(0,o=>{S(o,u.invoice??"",20,14),k(o,26),_(o,34,9,7),k(o,104,8,92,x,1),o.fillStyle=x,o.font=`600 9px ${i}`,o.textAlign=a?"left":"right",o.fillText(s.format(4820),a?8:92,116)}),v(1,o=>{S(o,u.receipt??"",18,12),k(o,24),_(o,32,7,6,11),o.fillStyle=x,o.fillRect(30,100,40,12)}),v(2,o=>{S(o,u.quote??"",22,15),k(o,28),_(o,38,6,8,23),o.save(),o.translate(68,104),o.rotate(-.26),o.strokeStyle="#5e4bd8",o.lineWidth=2,o.strokeRect(-23,-9,46,18),o.fillStyle="#5e4bd8",o.font=`700 10px ${y}`,o.textAlign="center",o.fillText(u.paid??"",0,4),o.restore()});let te=(o,T)=>{let Y=a?8:16;o.fillStyle="#e6f6ee";for(let E=0;E<18;E+=2)o.fillRect(0,6+E*7,100,7);o.strokeStyle="#a9b7ae",o.lineWidth=.4;for(let E=0;E<=4;E+=1)o.beginPath(),o.moveTo(Y+E*19,0),o.lineTo(Y+E*19,134),o.stroke();o.font=`400 4.8px ${i}`,o.textAlign="center";for(let E=0;E<18;E+=1){o.fillStyle=L,o.fillText(s.format(E+1),a?96:8,11.5+E*7);for(let G=0;G<4;G+=1){let I=(E*7+G*13)%23,j=s.format(100+I*317);T&&I===4?(j="#REF!",o.fillStyle="#c2352b"):(T&&I===9&&(j="#####"),o.fillStyle=x),o.fillText(j,Y+G*19+9.5,11.5+E*7)}}};v(3,o=>{te(o,!1),o.fillStyle="rgba(255,255,255,.92)",o.fillRect(0,0,100,16),S(o,u.ledger??"",12,10)}),v(4,o=>te(o,!0)),v(5,o=>{o.fillStyle="#c2352b",o.fillRect(8,8,84,7),o.fillStyle=x,o.font=`600 9px ${i}`,o.textAlign="center";for(let T=0;T<4;T+=1)o.fillText(s.format(1200+T*417),50,40+T*20)}),v(6,o=>{for(let T=0;T<16;T+=1)k(o,12+T*7.4,6,94,"#b7c2d8",.5);_(o,14,7,7.4,5)}),v(7,o=>{o.fillStyle="#fff",o.fillRect(0,0,100,134),o.fillStyle="#f7efd9",o.fillRect(18,18,64,30),S(o,u.ledger??"",38,11),o.fillStyle="#faf6ea",o.fillRect(0,62,100,5)}),v(8,o=>{S(o,u.invoice??"",20,13),_(o,30,12,6.6,3)}),v(9,o=>{_(o,12,16,7,17)}),v(10,o=>{o.fillStyle=x,o.font=`400 7px ${i}`,o.textAlign="center";for(let T=0;T<12;T+=1)o.fillText(s.format(90+T*233),50,12+T*10.5)});let ne=Qe(h);ne.anisotropy=4;let D=document.createElement("canvas");D.width=512,D.height=2048;let ae=D.getContext("2d");ae.fillStyle="#fff",ae.fillRect(0,0,512,2048),ae.direction=a?"rtl":"ltr",ae.textBaseline="middle";let M=a?468:44;ae.textAlign="start";let R=[];l.forEach((o,T)=>{R.push({text:o,big:!0}),d[T%Math.max(1,d.length)]&&R.push({text:d[T%d.length],big:!1})});let B=2048/Math.max(1,R.length);R.forEach((o,T)=>{ae.fillStyle=o.big?"#1f2a24":"#3d4c44",ae.font=o.big?`700 44px ${y}`:`400 25px ${a?y:i}`,ae.fillText(o.text,M,B*(T+.5),424)});let K=Qe(D);return K.anisotropy=4,{texture:ne,printTexture:K,services:l,phrases:d,words:u,display:y,mono:i,digits:o=>s.format(o),cell(o){let T=Math.max(0,qo.indexOf(o)),Y=T%We,E=Math.floor(T/We);return[Y/We,1-(E+1)/We,1/We,1/We]},title(o){return document.querySelector(`[data-shot="${o}"] .card__title, [data-shot="${o}"] .step__title`)?.textContent.trim()??""},canvas(o,T,Y,E){let G=document.createElement("canvas");G.width=o,G.height=T;let I=G.getContext("2d");return I.direction=a?"rtl":"ltr",Y(I,o,T),Qe(G,E)}}}var Mo={L:{pixelCap:55e4,draws:28,tris:7e4,sheets:420,sheetSeg:2,stacks:180,dossiers:120,boxes:1400,weather:140,uxGrid:[32,45],shadowSize:1024,shadowTaps:1,atlas:512,dust:60,allReflections:!1,film:!1},M:{pixelCap:13e5,draws:45,tris:22e4,sheets:1100,sheetSeg:3,stacks:360,dossiers:240,boxes:3e3,weather:320,uxGrid:[48,68],shadowSize:1024,shadowTaps:4,atlas:1024,dust:150,allReflections:!0,film:!1},H:{pixelCap:28e5,draws:70,tris:6e5,sheets:2400,sheetSeg:4,stacks:720,dossiers:480,boxes:6e3,weather:700,uxGrid:[64,90],shadowSize:2048,shadowTaps:8,atlas:2048,dust:300,allReflections:!0,film:!0}};var ht={clip:[.3,40],fog:26},Ze=[{id:"hero",act:1,set:"desk",subject:{radius:.62,center:[0,.1,-.4]},pose:{lens:24,elevation:-15,portrait:{elevation:-28},pushIn:.15,...ht},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:30},{id:"drop",act:1,set:"desk",idleHz:0,budget:{draws:12,tris:{L:3e4,M:8e4,H:2e5}},authored(c,n){let a=n.W/n.H,t=n.portrait?20:15.6,u=Math.tan(t*Math.PI/360),d=.24/(n.portrait?.92:.36)/(2*u*a),y=ee.floorY;return[{t:.18,position:[0,-.03,d],elevation:-1,lens:20,clip:[.1,30],fog:26},{t:.48,position:[0,y*.72,d*.96],elevation:-2,lens:20,clip:[.1,30],fog:26},{t:.64,position:[0,.28,.5],elevation:-84,lens:36,clip:[.05,20],fog:20},{t:.84,position:[0,y-.25,.1],elevation:-90,lens:40,clip:[.04,20],fog:16},{t:.93,position:[0,ee.slabBottom+.1,.5],elevation:-90,lens:24,clip:[.05,60],fog:40}]}},{id:"svc.head",act:2,set:"archive",pose:{lens:[24,62],elevation:-90,clip:[.2,90],fog:72},budget:{draws:8,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0,holdKnots:()=>[{t:0,position:[0,ee.slabBottom-.6,1.5],lens:24},{t:1,position:[0,ee.slabBottom-5.2,1.5],lens:62}]},{id:"svc.web",act:2,set:"archive",floor:"first",subject:{radius:1.3,center:[0,0,0]},pose:{lens:32,bearing:12,elevation:-6,drift:[0,-.15,-.5],clip:[.3,80],fog:62},budget:{draws:11,tris:{L:25e3,M:7e4,H:16e4}},idleHz:0,stripYaw:0},{id:"svc.apps",act:2,set:"archive",floor:"locked",subject:{radius:1.1,center:[0,0,0]},pose:{lens:32,bearing:[-12,13],elevation:-4,clip:[.3,80],fog:62},budget:{draws:9,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"svc.api",act:2,set:"archive",floor:"locked",subject:{radius:1.75,center:[0,.35,.3]},pose:{lens:32,bearing:-18,elevation:14,drift:[0,-.2,-.3],clip:[.3,80],fog:60},budget:{draws:14,tris:{L:3e4,M:8e4,H:18e4}},idleHz:0},{id:"svc.rescue",act:2,set:"archive",floor:"locked",subject:{radius:1.2,center:[0,0,0]},pose:{lens:30,bearing:10,elevation:-8,roll:[0,7],clip:[.3,80],fog:58},budget:{draws:12,tris:{L:24e3,M:7e4,H:16e4}},idleHz:0},{id:"svc.ux",act:2,set:"archive",floor:"locked",subject:{radius:1.5,center:[0,0,0]},pose:{lens:28,elevation:0,clip:[.3,80],fog:56},budget:{draws:8,tris:{L:24e3,M:6e4,H:14e4}},idleHz:0},{id:"svc.auto",act:2,set:"archive",floor:"locked",subject:{radius:1.4,center:[0,0,0]},pose:{lens:30,bearing:90,elevation:-3,clip:[.3,80],fog:54},budget:{draws:9,tris:{L:22e3,M:6e4,H:14e4}},idleHz:30},{id:"process.head",act:3,set:"archive",floor:{clear:9},subject:{radius:4,center:[0,0,0]},pose:{lens:50,elevation:-90,shift:[0,0,1.1],clip:[.05,90],fog:70},budget:{draws:10,tris:{L:26e3,M:7e4,H:16e4}},idleHz:0,exitKnots(c,n,a){let t=a.floorY;return[{t:.55,position:[.16,t+3.2,.18],elevation:-90,lens:44,clip:[.05,70],fog:60},{t:.74,position:[.16,t-.9,.12],elevation:-90,lens:44,clip:[.05,70],fog:60}]}},{id:"step.talk",act:3,set:"archive",floor:{clear:5},subject:{radius:1.5,center:[0,.1,0]},pose:{lens:28,bearing:8,elevation:-10,clip:[.2,70],fog:42},budget:{draws:10,tris:{L:25e3,M:7e4,H:16e4}},idleHz:0},{id:"step.scope",act:3,set:"archive",floor:"locked",subject:{radius:1.75,center:[0,0,0]},pose:{lens:28,bearing:-6,elevation:-24,clip:[.2,70],fog:40},budget:{draws:8,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"step.build",act:3,set:"archive",floor:"locked",subject:{radius:1.25,center:[0,0,.3]},pose:{lens:28,bearing:[20,-10],elevation:-8,clip:[.2,70],fog:40},budget:{draws:9,tris:{L:26e3,M:7e4,H:16e4}},idleHz:0},{id:"step.ship",act:3,set:"archive",floor:"locked",subject:{radius:1.6,center:[0,-.2,0]},pose:{lens:28,elevation:[-12,-74],clip:[.2,70],fog:40},budget:{draws:7,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"fall",act:3,set:"none",idleHz:0,budget:{draws:4,tris:{L:3e3,M:6e3,H:12e3}},authored(c){let n=c["step.ship"],a=c["why.q"],t=n.floorY-2,u=a.floorY+a.d+1.6;return[{t:.2,position:[.2,t,.2],elevation:-90,lens:70,clip:[.05,60],fog:44},{t:.86,position:[.05,u+1.2,.06],elevation:-90,lens:70,clip:[.05,40],fog:34}]}},{id:"why.q",act:4,set:"desk",desk:!0,floor:{clear:26},subject:{radius:.85,center:[0,0,-.4]},pose:{lens:40,elevation:-90,...ht},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:30},{id:"why.list",act:4,set:"desk",desk:!0,subject:{radius:.8,center:[0,0,-.4]},pose:{lens:40,elevation:-90,...ht},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:0},{id:"why.stats",act:4,set:"desk",desk:!0,subject:{radius:.7,center:[0,0,-.4]},pose:{lens:36,elevation:-70,...ht},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0},{id:"cta",act:4,set:"desk",desk:!0,subject:{radius:.55,center:[0,0,-.4]},pose:{lens:40,elevation:-90,clip:[.02,12],fog:26},solve(c,n){let{W:a,H:t,portrait:u}=n,l=c.shot.caption,d=c.fov*Math.PI/180,y=Math.tan(d/2)*(a/t),i=.072,s=.148;if(u)c.d=.0775*.965/(2*y),c.ox=0,c.oy=0;else{let r=Math.max((l.w+32)/s,(l.h+32)/i);c.d=a/r/(2*y),c.ox=a/2-(l.x+l.w/2),c.oy=t/2-(l.y+l.h/2)}},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0},{id:"coda",act:4,set:"desk",desk:!0,subject:{radius:.62,center:[0,.1,-.4]},pose:{lens:24,elevation:-15,...ht},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0}],Lo={hero:()=>import("./chunk-FQ644PTX.js"),drop:()=>import("./chunk-3JAGEUCC.js"),"svc.head":()=>import("./chunk-33YN23M5.js"),"svc.web":()=>import("./chunk-BU75ANWF.js"),"svc.apps":()=>import("./chunk-SPG4BJQV.js"),"svc.api":()=>import("./chunk-NAYGZMI2.js"),"svc.rescue":()=>import("./chunk-4WBBAYPS.js"),"svc.ux":()=>import("./chunk-2ALBFH2P.js"),"svc.auto":()=>import("./chunk-ZJHTRPCR.js"),"process.head":()=>import("./chunk-QILWQIDR.js"),"step.talk":()=>import("./chunk-6NUKT6FF.js"),"step.scope":()=>import("./chunk-4GXKCHKF.js"),"step.build":()=>import("./chunk-O2FCLXP4.js"),"step.ship":()=>import("./chunk-R65BVCNZ.js"),fall:()=>import("./chunk-DJNW65WT.js"),"why.q":()=>import("./chunk-CQ55MCPA.js"),"why.list":()=>import("./chunk-GCBXT2J2.js"),"why.stats":()=>import("./chunk-PCMLZPEU.js"),cta:()=>import("./chunk-TYQRNBVE.js"),coda:()=>import("./chunk-F3VOJLJZ.js")};var Ne=ee.archiveHalf,Ke=ee.galleryH,ce=11.4;function Co(c,n){return c.canvas(512,512,t=>{let u=De(`shelf-${n}`);t.fillStyle=n===0?"#2a2520":"#0a0c11",t.fillRect(0,0,512,512);let l=6,d=512/l;for(let y=0;y<l;y+=1){let i=0;for(;i<512;){let s=8+u()*22,r=d*(.74+u()*.22);if(n===0){let h=u(),m=.5+u()*.5,w=h<.6?[176,136,86]:h<.8?[214,202,170]:h<.92?[96,110,128]:[150,70,60];t.fillStyle=`rgb(${w[0]*m},${w[1]*m},${w[2]*m})`,t.save(),t.translate(i+s/2,d*(y+1)-4),t.rotate(u()>.86?(u()-.5)*.5:0),t.fillRect(-s/2,-r,s-1.5,r),t.fillStyle="rgba(255,255,255,.35)",t.fillRect(-s/2+s*.25,-r*.82,s*.4,r*.2),t.restore()}else{let h=12+u()*10;t.fillStyle=`rgb(${h},${h+2},${h+8})`,t.fillRect(i,d*(y+1)-r-4,s-2,r),u()>.72&&(t.fillStyle=u()>.8?"#a48bff":"#5dffde",t.fillRect(i+s/2-1,d*(y+1)-r,1.5,r-8))}i+=s}t.fillStyle=n===0?"#141210":"#1c2027",t.fillRect(0,d*(y+1)-4,512,4)}},{repeat:!0})}function zo({programs:c,text:n,q:a,dir:t}){let u=new _e;u.name="archive";let l={uTurn:{value:0},uOrderY:{value:new Ve(ee.slabBottom,-60)},uGalleryH:{value:Ke}},d=40,y=new Se(Ne*2,Ke*d,4,d),i=y.attributes.uv;for(let P=0;P<i.count;P+=1)i.setXY(P,i.getX(P)*8,i.getY(P)*d);let s=[[0,0,-Ne,0],[0,0,Ne,Math.PI],[-Ne,0,0,Math.PI/2],[Ne,0,0,-Math.PI/2]].map(([P,F,U,X])=>{let g=y.clone();return g.rotateY(X),g.translate(P,F,U),g}),r=Me(s.map(P=>P.toNonIndexed())),h=Co(n,0);h.anisotropy=8;let m=Co(n,1);m.anisotropy=8;let w=c.paper({atlas:{value:h},ambient:.03,boost:.62,deform:{pars:"uniform float uTurn, uGalleryH; out float vTurn, vLit;",fpars:"uniform sampler2D uShelf2; in float vTurn, vLit;",world:`
        wp.y += floor(uCamY / uGalleryH) * uGalleryH;
        {
          float along = abs(wn.z) > 0.5 ? wp.x : wp.z;
          vTurn = smoothstep(0.0, 1.0, uTurn * 2.2 - (along * uInline / 14.0 * 0.5 + 0.5) - 0.1);
        }
        vLit = uTurn;`,frag:"c = mix(c, texture(uShelf2, vUv).rgb * (vec3(0.42) + vHouse * 0.7), vTurn);",uniforms:{uTurn:l.uTurn,uGalleryH:l.uGalleryH,uShelf2:{value:m}}}}),x=new W(r,w);x.frustumCulled=!1,u.add(x);let L=[.26,.25,.25],v=P=>`wp.y -= floor((iPos.y - uCamY) / ${P.toFixed(2)} + 0.5) * ${P.toFixed(2)};`,A=Te(new be(1,1,1)),S=18,k=[];for(let P=0;P<S;P+=1){let F=-P*Ke;for(let[U,X]of[[1,0],[-1,0],[0,1],[0,-1]]){let g=ce*2+6,se=(Ne+ce)/2;k.push({pos:[U*se,F-.1,X*se],scale:U?[Ne-ce,.2,g]:[g,.2,Ne-ce],tint:L}),k.push({pos:[U*ce,F+.95,X*ce],scale:U?[.06,.06,g]:[g,.06,.06],tint:[.55,.52,.48]}),k.push({pos:[U*ce,F+.55,X*ce],scale:U?[.03,.03,g]:[g,.03,.03],tint:[.4,.38,.36]})}}let _=new W(Le(A,k.length,(P,F)=>{let U=k[P];F.pos=U.pos,F.scale=U.scale,F.tint=U.tint}),c.solid({ambient:.05,defines:{INSTANCED:1},deform:{world:v(Ke*S)}}));_.frustumCulled=!1,u.add(_);let te=[];for(let P of[-1,1])for(let F of[-ce,-ce/3,ce/3,ce])te.push([P*ce,F]),te.push([F,P*ce]);let ne=new W(Le(Te(new be(.34,1,.34,1,44,1)),te.length,(P,F)=>{F.pos=[te[P][0],0,te[P][1]],F.scale=[1,180,1],F.tint=[.36,.35,.34]}),c.solid({ambient:.05,defines:{INSTANCED:1},deform:{world:"wp.y += uCamY;"}}));ne.frustumCulled=!1,u.add(ne);let D=De("archive"),M=Math.max(3,Math.round(a.boxes/460))*Ke,R=Te(new be(1,1,.8)),B=R.attributes.normal;for(let P=0;P<B.count;P+=1)B.getZ(P)<-.5&&R.attributes.aColor.setXYZ(P,0,0,0);let K=Me([R,$(.05,.86,.01,{at:[0,0,-.41],color:[.36,1,.87],mat:2})]),o=a.boxes,T=new W(Le(K,o,(P,F)=>{let U=P%4,X=(D()*2-1)*(Ne-1),g=-D()*M,se=(D()-.5)*.5,pe=Ne-.3-D()*2.2,V=.5+D()*.5,we=.55+D()*.4;U===0?(F.pos=[X,g,-pe],He(0,0,se,F.quat)):U===1?(F.pos=[X,g,pe],He(0,Math.PI,se,F.quat)):U===2?(F.pos=[-pe,g,X],He(0,Math.PI/2,se,F.quat)):(F.pos=[pe,g,X],He(0,-Math.PI/2,se,F.quat)),F.scale=[V,we,.4];let ue=.62+D()*.38,me=D();F.tint=me<.62?[.74*ue,.56*ue,.33*ue]:me<.86?[.86*ue,.8*ue,.66*ue]:me<.95?[.38*ue,.44*ue,.52*ue]:[.6*ue,.24*ue,.2*ue],F.seed=D()}),c.solid({ambient:.05,defines:{INSTANCED:1},deform:{pars:"uniform float uTurn; uniform vec2 uOrderY; out float vBack;",local:`
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
            float shift = floor((iPos.y - uCamY) / ${M.toFixed(2)} + 0.5) * ${M.toFixed(2)};
            /* Files sink into the wall at the edges of the wrap, so they never pop. */
            float edge = smoothstep(${(M/2).toFixed(2)}, ${(M*.36).toFixed(2)}, abs(iPos.y - shift - uCamY));
            wp.y -= shift;
            float order = clamp((uOrderY.x - wp.y) / (uOrderY.x - uOrderY.y), 0.0, 1.0);
            if (aColor.a < 1.5) { tint = mix(mix(tint, vec3(0.1, 0.11, 0.13), order * 0.55), vec3(0.075, 0.08, 0.1), vBack); }
            vec3 towardsWall = normalize(vec3(sign(iPos.x) * step(10.0, abs(iPos.x)), 0.0, sign(iPos.z) * step(10.0, abs(iPos.z))) + vec3(0.0001));
            wp += towardsWall * (1.0 - edge) * 2.8;
          }`,uniforms:{uTurn:l.uTurn,uOrderY:l.uOrderY}}}));T.frustumCulled=!1,u.add(T);let Y=new Se(1,1,1,3),E=["ledger","invoice","lines","sheet","memo","receipt"],G=Math.min(180,Math.floor(a.weather*.75)),I=new W(Le(Y,G,(P,F)=>{let U=P%4,X=(D()*2-1)*(ce-.5),g=-Math.floor(D()*18)*Ke+.3;F.pos=U===0?[X,g,-ce]:U===1?[X,g,ce]:U===2?[-ce,g,X]:[ce,g,X],He(0,U<2?0:Math.PI/2,(D()-.5)*.2,F.quat);let se=.55+D()*.6;F.scale=[se,se*1.42,1],F.cell=n.cell(E[Math.floor(D()*E.length)]);let pe=.75+D()*.25;F.tint=[pe,pe,pe*.95]}),c.paper({ambient:.05,defines:{INSTANCED:1},deform:{world:v(Ke*18)}}));I.frustumCulled=!1,u.add(I);let j=new Se(.34,.46),de=new W(Le(j,a.weather,(P,F)=>{F.pos=[(D()*2-1)*10.5,-D()*24,(D()*2-1)*10.5],F.cell=n.cell(E[Math.floor(D()*E.length)]);let U=.78+D()*.22;F.tint=[U,U,U*.95],F.seed=D()}),c.paper({ambient:.08,defines:{INSTANCED:1},deform:{pars:"uniform float uTurn;",local:`{
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
        }`,uniforms:{uTurn:l.uTurn}}}));de.frustumCulled=!1,u.add(de);let oe=o,Z=a.weather;return{group:u,u:l,*build(){yield},setRange(P,F){l.uOrderY.value.set(P,F)},setDensity(P){T.geometry.instanceCount=Math.floor(oe*P),de.geometry.instanceCount=Math.floor(Z*P)},setWeather(P){de.visible=P,I.visible=P}}}var Lt={pars:"in float iClear; uniform float uClear;",world:`
    float clearF = clamp((uClear - iClear - seed * 0.34) / 0.62, 0.0, 1.0);
    if (clearF > 0.0) {
      clearF *= clearF;
      vec3 away = wp - (uLampOrigin + vec3(0.0, 0.0, -0.4));
      away.y = 0.0;
      wp += normalize(away + vec3(0.001)) * clearF * 2.4;
      wp.y += clearF * 0.9 - clearF * clearF * 1.9;
    }`};function jo(){let a=document.createElement("canvas");a.width=1024,a.height=512;let t=a.getContext("2d");t.fillStyle="#7b4c2b",t.fillRect(0,0,1024,512);let u=De("walnut");for(let l=0;l<520;l+=1){let d=u()*512,y=u()>.45;t.strokeStyle=y?`rgba(44,22,10,${.05+u()*.2})`:`rgba(180,120,74,${.03+u()*.1})`,t.lineWidth=.5+u()*2.4,t.beginPath(),t.moveTo(0,d);let i=u()*1.2;for(let s=0;s<=1024;s+=48)d+=(u()-.5)*4*i,t.lineTo(s,d);t.stroke()}for(let l=0;l<3;l+=1){let d=u()*1024,y=u()*512;for(let i=8;i<90;i+=5+u()*5)t.strokeStyle=`rgba(40,20,9,${.1+u()*.09})`,t.lineWidth=.8,t.beginPath(),t.ellipse(d,y,i*3.2,i*.8,0,0,Math.PI*2),t.stroke()}return Qe(a)}function Ao({programs:c,shared:n,text:a,q:t,dir:u}){let l=f=>f*u,d=new _e;d.name="desk";let y={uClear:{value:0},uRing:{value:0},uRingOn:{value:0}},i=new le(l(.27),.62,-.5),s=[l(-.02),-.38],r=[s[0],s[1]],h=new $t(t.shadowSize,t.shadowSize,{depthTexture:new Qt(t.shadowSize,t.shadowSize,Bt)});h.depthTexture.compareFunction=_t,h.depthTexture.minFilter=ot,h.depthTexture.magFilter=ot;let m=new Tt,w={uMap:{value:jo()},uShadow:{value:h.depthTexture},uClear:y.uClear,uDawnStripes:{value:1},uAmbient:{value:.045},uShadowTaps:{value:t.shadowTaps},uGloss:{value:1},uRings:{value:[1,0,0,0]},uRingCentreA:{value:[l(-.2),-.21,.046]},uRingCentreB:{value:[l(-.112),-.21,.046]},uTint:{value:[1,1,1]},uLampMatrix:{value:m}},x=new W(new be(1.6,.045,.8),c.wood({uniforms:w}));x.position.set(0,-.0225,-.4),d.add(x);let L={...w,uTint:{value:[.34,.31,.28]},uGloss:{value:0},uRings:{value:[0,0,0,0]}},v=.5,A=new W(Me([[0,-v-2.5,10,5],[0,v+2.5,10,5],[-v-2.5,0,5,v*2],[v+2.5,0,5,v*2]].map(([f,b,C,O])=>{let e=new be(C,.1,O);return e.translate(f,ee.floorY-.05,b),e})),c.wood({uniforms:L}));d.add(A);let S=[l(-.52),0,-.56],k=[l(-.156),0,-.21],_=[l(.66),.88,-.95],te=[l(.31),0,-.64],ne=[l(.62),0,-.62],D=[l(.72),.42,-.62],ae=[l(.27),.72,-.5],M=[.24,.14,.08],R=Me([$(.07,.75,.07,{at:[-.74,-.4,-.06],color:M}),$(.07,.75,.07,{at:[.74,-.4,-.06],color:M}),$(.07,.75,.07,{at:[-.74,-.4,-.74],color:M}),$(.07,.75,.07,{at:[.74,-.4,-.74],color:M}),$(1.42,.09,.02,{at:[0,-.1,-.03],color:M}),$(.1,.012,.018,{at:[l(.42),-.1,-.014],color:[.76,.58,.3],mat:1}),$(.1,.012,.018,{at:[l(-.42),-.1,-.014],color:[.76,.58,.3],mat:1}),...po(_),...ro(ne,D,ae,u),...uo(k,u),$(.07,.006,.07,{at:[l(-.02),.003,-.7],color:[.25,.25,.27]}),Te(new kt(.002,.003,.17,6),{at:[l(-.02),.09,-.7],color:[.7,.7,.72]})]),B=new W(R,c.solid({ambient:.17,house:0}));d.add(B);let K=new W(Me([$(12,7,.1,{at:[0,1.6,-1.05],color:[.62,.6,.6]}),$(12,.12,.03,{at:[0,ee.floorY+.06,-.99],color:[.2,.18,.17]}),$(1.62,.04,.04,{at:[l(-.46),1.54,-.97],color:[.55,.52,.5]}),$(1.62,.04,.04,{at:[l(-.46),.5,-.97],color:[.55,.52,.5]}),$(.04,1.08,.04,{at:[l(-1.27),1.02,-.97],color:[.55,.52,.5]}),$(.04,1.08,.04,{at:[l(.35),1.02,-.97],color:[.55,.52,.5]})]),c.solid({ambient:.2,house:0}));d.add(K);let o=new W(Me(io(te,u)),B.material),T=Rt([[S[0]-.11*u,.05,S[2]+.03],[S[0]-.17*u,.03,S[2]+.06],[S[0]-.2*u,.012,S[2]+.13],[S[0]-.19*u,.05,S[2]-.03],[S[0]-.13*u,.11,S[2]-.08]],24),Y=c.solid({house:0,deform:ao()}),E=new W(Me([...lo(S),T]),Y);d.add(o,E);let G={x:S[0],y:.135,z:S[2]-.08},I=new W(co(),Y);I.name="handset",I.position.set(G.x,G.y,G.z),d.add(I);let j=new W(Rt([[0,0,0],[0,-.2,0],[0,-.4,.01],[0,-.6,0]],22,.008),Y);j.visible=!1,d.add(j);let de=B.material,oe=new W($(.012,.095,.004,{at:[0,.042,0],color:[.1,.1,.1]}),de),Z=new W($(.007,.14,.004,{at:[0,.064,0],color:[.1,.1,.1]}),de);oe.position.set(_[0],_[1],_[2]+.026),Z.position.set(_[0],_[1],_[2]+.03),d.add(oe,Z);let P=l(-.46),F=new W(Te(new Se(1.58,1),{at:[P,1.02,-.985],color:[.075,.11,.21],mat:2}),c.solid({house:0,deform:{fpars:"uniform highp float uDawn;",frag:"c = mix(c, mix(vec3(0.365, 1.0, 0.87), vec3(0.643, 0.545, 1.0), clamp((vLampP.x + 0.5) * 0.7, 0.0, 1.0)), uDawn);"}}));d.add(F);let U=$(1.58,.042,.004,{color:[.72,.72,.7]});U.deleteAttribute("uv");let X=new W(Le(U,24,(f,b)=>{b.pos=[P,.54+(f+.5)*.0405,-.965]}),c.solid({house:0,ambient:.14,defines:{INSTANCED:1},deform:{local:`{
          float a = mix(0.86, 1.32, uDawn);
          float ca = cos(a), sa = sin(a);
          p = vec3(p.x, p.y * ca - p.z * sa, p.y * sa + p.z * ca);
          n = vec3(n.x, n.y * ca - n.z * sa, n.y * sa + n.z * ca);
        }`}}));X.frustumCulled=!1,d.add(X);let g=De("desk"),se=[{x:-.66,z:-.3,h:.34},{x:-.58,z:-.68,h:.44},{x:-.27,z:-.67,h:.27},{x:.66,z:-.22,h:.2},{x:-.36,z:-.28,h:.13},{x:-.14,z:-.7,h:.15},{x:.66,z:-.42,h:.1},{x:-.7,z:-.08,h:.09}],pe=[],V=new Map;for(let f of se){let b=0,C=0,O=0;for(;b<f.h&&pe.length<t.stacks;){let e=.01+g()*.022;C+=(g()-.5)*.012,O+=(g()-.5)*.012,pe.push({x:f.x+C,y:b+e/2,z:f.z+O,h:e,yaw:(g()-.5)*.34}),b+=e}V.set(f,{y:b,x:f.x+C,z:f.z+O})}let we=new be(1,1,1);we.deleteAttribute("uv");let ue=Te(we),me=new W(Le(ue,pe.length,(f,b)=>{let C=pe[f];b.pos=[l(C.x),C.y,C.z],He(0,C.yaw,0,b.quat),b.scale=[.21+g()*.03,C.h,.297+g()*.03];let O=.74+g()*.26;b.tint=g()>.86?[O,O*.84,O*.72]:[O,O,O*.95],b.extra.iClear=2},{iClear:1}),c.solid({house:0,ambient:.13,defines:{INSTANCED:1},deform:Lt}));me.frustumCulled=!1,d.add(me);let re=[{x:.5,z:-.14,n:.3},{x:-.5,z:-.2,n:.3},{x:-.3,z:-.5,n:.26}],J=Te(new be(1,1,1)),Ye=[];for(let f of re){let b=Math.floor(t.dossiers*f.n*.5),C=0;for(let O=0;O<b&&C<.2;O+=1){let e=.016+g()*.014,p=(g()-.5)*.5,H=.7+g()*.3;Ye.push({x:f.x+(g()-.5)*.02,y:C+e/2,z:f.z+(g()-.5)*.02,yaw:p,sx:.24,sy:e,sz:.33,tint:[.86*H,.7*H,.42*H]}),Ye.push({x:f.x,y:C+e+6e-4,z:f.z,yaw:p,sx:.016,sy:.0015,sz:.335,tint:[.92,.9,.84]}),C+=e}}let N=new W(Le(J,Ye.length,(f,b)=>{let C=Ye[f];b.pos=[l(C.x),C.y,C.z],He(0,C.yaw,0,b.quat),b.scale=[C.sx,C.sy,C.sz],b.tint=C.tint,b.extra.iClear=2},{iClear:1}),c.solid({house:0,ambient:.13,defines:{INSTANCED:1},deform:Lt}));N.frustumCulled=!1,d.add(N);let Oe=new Se(1,1,t.sheetSeg,t.sheetSeg);Oe.rotateX(-Math.PI/2);let it=["invoice","ledger","quote","receipt","lines","sheet","memo","invoice","carbon","slip"],Ce=[],et=Math.min(30,Math.floor(t.sheets*.1));for(let f=0;f<et;f+=1){let b=.36+g()*.46,C=g()*Math.PI*2,O=Math.cos(C)*b*1.08,e=-.4+Math.sin(C)*b*.42;Ce.push({x:O,z:e,y:.0012+g()*.012,yaw:g()*6.28,kind:0,clear:g()>.4?0:1})}for(let[f,b]of V){let C=Math.floor(t.sheets*.5/se.length*(.5+f.h*2));for(let O=0;O<C;O+=1)Ce.push({x:b.x+(g()-.5)*.06,z:b.z+(g()-.5)*.06,y:b.y+O*.0015,yaw:(g()-.5)*.7,kind:1,clear:2})}let ke=Math.min(8,Math.floor(t.sheets*.02));for(let f=0;f<ke;f+=1){let b=f%2===0?1:-1;Ce.push({x:b*(.24+g()*.46),z:-.08+g()*.05,y:.002+g()*.004,yaw:(g()-.5)*.3,kind:2,clear:0})}let Ge=Math.max(0,Math.floor(t.sheets*.24));for(let f=0;f<Ge;f+=1){let b=g()*Math.PI*2,C=.7+g()*1.5,O=Math.cos(b)*C*1.2,e=.1+Math.abs(Math.sin(b))*C*.7;Math.hypot(O,e)>.75&&Ce.push({x:O,z:e,y:ee.floorY+.002+g()*.004,yaw:g()*6.28,kind:0,clear:2})}for(let f=0;f<8;f+=1)Ce.push({x:-.02+(g()-.5)*.015,z:-.7+(g()-.5)*.015,y:.02+f*.012,yaw:g()*6.28,kind:3,clear:2});let rt=c.paper({house:0,ambient:.05,defines:{INSTANCED:1},deform:{pars:`${Lt.pars} in float iCurl;`,local:`
        float cx = uv.x - 0.5, cz = uv.y - 0.5;
        p.y += (cx * cx * 0.03 + cz * cz * 0.05) * iCurl;
        /* A sheet by the edge lifts a little in the draught from the printer. */
        p.y += sin(uTime * 2.6 + seed * 37.0) * 0.0012 * max(iCurl - 0.8, 0.0) * (cz + 0.5);
        n.xz -= vec2(cx * 0.06, cz * 0.1) * iCurl;`,world:Lt.world}}),Re=new W(Le(Oe,Ce.length,(f,b)=>{let C=Ce[f],O=C.kind===3;b.pos=[l(C.x),C.y,C.z],He(0,C.yaw,0,b.quat),b.scale=O?[.08,1,.16]:[.21,1,.297];let e=O?"receipt":it[Math.floor(g()*it.length)];b.cell=a.cell(e);let p=.82+g()*.18;b.tint=e==="carbon"?[.98,.72*p,.72*p]:e==="slip"?[.99,.9*p,.62*p]:[p,p,p*.96],b.extra.iClear=C.clear,b.extra.iCurl=C.kind===2?1.6:.5+g()},{iClear:1,iCurl:1}),rt);Re.frustumCulled=!1,d.add(Re);let Be=new W(new Se(.34,.34),c.glow({color:[1,.74,.46],alpha:.5,defines:{BILLBOARD:1}}));Be.position.set(i.x,i.y+.03,i.z),Be.frustumCulled=!1,d.add(Be);let Ue=new W(Le(new Se(1,1),2,(f,b)=>{b.pos=f===0?[l(.34),.42,-.985]:[l(-.46),.95,-.98],b.scale=f===0?[2.6,1.9,1]:[3.2,2.2,1],b.tint=f===0?[.13,.086,.047]:[.028,.038,.067]}),c.glow({defines:{INSTANCED:1}}));Ue.frustumCulled=!1,d.add(Ue);let lt=new kt(.05,.54,.86,26,1,!0),Fe=new W(lt,c.glow({color:[1,.72,.42],alpha:.13,shape:5,deform:{frag:"a = vUv.y * vUv.y; { float f = abs(dot(normalize(vN), normalize(vV))); a *= f * f; }"}}));Fe.frustumCulled=!1,d.add(Fe);let qe=new Se(.009,.009),Ie=new W(Le(qe,t.dust,(f,b)=>{let C=Math.sqrt(g()),O=g()*Math.PI*2,e=C*.34;b.pos=[i.x+(r[0]-i.x)*C+Math.cos(O)*e,i.y*(1-C)+.04,i.z+(r[1]-i.z)*C+Math.sin(O)*e],b.tint=[1,.82,.6]}),c.glow({alpha:.42,defines:{INSTANCED:1,BILLBOARD:1},deform:{world:"wp += vec3(sin(uTime * 0.21 + seed * 40.0), sin(uTime * 0.17 + seed * 90.0), cos(uTime * 0.19 + seed * 70.0)) * 0.03;"}}));Ie.frustumCulled=!1,d.add(Ie);let ge=i.clone(),xe=new xt(122,1,.05,2.2),wt=new le(0,0,-1),fe=new le,ze={x:0,y:0,z:0},ct=0,Pe=0,$e=new Tt().set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.4975,0,0,0,1),Ct=Re.geometry.instanceCount,gt=me.geometry.instanceCount,ut=N.geometry.instanceCount,tt=f=>{oe.rotation.z=-(f%12/12)*Math.PI*2,Z.rotation.z=-(f%1)*Math.PI*2};return tt(3.2),{group:d,u:y,setClock:tt,lampPos:ge,pool:s,*build(){yield},setActPositions(f){ze=f},setPhone(f){f.position.set(0,.0043,-.4),f.visible=!1,d.add(f),this.phone=f},setAct(f){f===4?d.position.set(ze.x,ze.y,ze.z):d.position.set(0,0,0)},setSpot(f,b){r[0]=f,r[1]=b},resetSpot(){r[0]=s[0],r[1]=s[1]},setRing(f){ct=f},setOffHook(f){Pe=f},setShadowTaps(f){w.uShadowTaps.value=f},setDensity(f){Re.geometry.instanceCount=Math.floor(Ct*f),me.geometry.instanceCount=Math.floor(gt*f),N.geometry.instanceCount=Math.floor(ut*f)},setExtras(f){Ie.visible=f,Fe.visible=f},bakeShadow(f){let b=[x,A,Be,Fe,Ie,F,X,K,Ue,j];this.phone&&b.push(this.phone);let C=b.map(z=>z.visible),O=d.position.clone(),e=y.uClear.value,p=d.visible;d.visible=!0,b.forEach(z=>{z.visible=!1}),d.position.set(0,0,0),this.setClear(0),I.position.set(G.x,G.y,G.z),I.rotation.set(0,0,0),I.visible=!0,d.updateMatrixWorld(!0),n.uLampOrigin.value.set(0,0,0),xe.position.copy(ge),xe.up.copy(wt),xe.lookAt(l(-.02),0,-.38),xe.updateMatrixWorld(),xe.updateProjectionMatrix();let H=f.getRenderTarget();f.setRenderTarget(h),f.clear(),f.render(d,xe),f.setRenderTarget(H),m.multiplyMatrices($e,xe.projectionMatrix).multiply(xe.matrixWorldInverse),b.forEach((z,q)=>{z.visible=C[q]}),d.position.copy(O),d.visible=p,this.setClear(e),d.updateMatrixWorld(!0)},setClear(f){y.uClear.value=f,w.uClear.value=f;let b=(O,e,p)=>{let H=to((f-e)/.7),z=H*H;O.position.set(p*z*2.2*u,z*.5-z*z*1.6,-z*.2),O.rotation.z=-z*1.2*p*u,O.visible=H<1};b(E,1,-1),b(o,2,1);let C=f>=3;Re.visible=!C,me.visible=!C,N.visible=!C},update(f,b){let C=b%3,O=C<.42||C>.62&&C<1.04?1:0,e=Math.abs(Math.sin(b*37.7))*.006*O*ct,p=Math.sin(b*75)*.012*O*ct,H=Je(0,.5,Pe),z=Je(.42,1,Pe),q=G.x+(-.3*u-G.x)*H,ie=G.z+(.1-G.z)*H;I.position.set(q+E.position.x,G.y+e-z*.62+E.position.y,ie+E.position.z),I.rotation.set(z*1.3,0,H*.9*u+p+E.rotation.z),I.visible=E.visible,j.visible=z>.02,j.position.set(q,0,ie-.02),j.scale.y=Math.max(.01,z);let he=r[0]+(f.pointer===1?f.px*.2:0),Q=r[1]+(f.pointer===1?f.py*.12:0);fe.set(he-ge.x,-ge.y,Q-ge.z).normalize(),n.uLampDir.value.copy(fe),n.uLampPos.value.copy(ge),n.uLampCone.value.set(.6,.93),Fe.position.set(ge.x+fe.x*.43,ge.y+fe.y*.43,ge.z+fe.z*.43),Fe.quaternion.setFromUnitVectors(Vo,fe.negate())}}}var Vo=new le(0,1,0);var mt=new le;function Ae(c,n,a,t,u,l){let d=2*Math.PI*u/4,y=Math.max(l-2*u,0),i=Math.PI/4;mt.copy(n),mt[t]=0,mt.normalize();let s=.5*d/(d+y),r=1-mt.angleTo(c)/i;return Math.sign(mt[a])===1?r*s:y/(d+y)+s+s*(1-r)}var vt=class c extends be{constructor(n=1,a=1,t=1,u=2,l=.1){let d=u*2+1;if(l=Math.min(n/2,a/2,t/2,l),super(1,1,1,d,d,d),this.type="RoundedBoxGeometry",this.parameters={width:n,height:a,depth:t,segments:u,radius:l},d===1)return;let y=this.toNonIndexed();this.index=null,this.attributes.position=y.attributes.position,this.attributes.normal=y.attributes.normal,this.attributes.uv=y.attributes.uv;let i=new le,s=new le,r=new le(n,a,t).divideScalar(2).subScalar(l),h=this.attributes.position.array,m=this.attributes.normal.array,w=this.attributes.uv.array,x=h.length/6,L=new le,v=.5/d;for(let A=0,S=0;A<h.length;A+=3,S+=2)switch(i.fromArray(h,A),s.copy(i),s.x-=Math.sign(s.x)*v,s.y-=Math.sign(s.y)*v,s.z-=Math.sign(s.z)*v,s.normalize(),h[A+0]=r.x*Math.sign(i.x)+s.x*l,h[A+1]=r.y*Math.sign(i.y)+s.y*l,h[A+2]=r.z*Math.sign(i.z)+s.z*l,m[A+0]=s.x,m[A+1]=s.y,m[A+2]=s.z,Math.floor(A/x)){case 0:L.set(1,0,0),w[S+0]=Ae(L,s,"z","y",l,t),w[S+1]=1-Ae(L,s,"y","z",l,a);break;case 1:L.set(-1,0,0),w[S+0]=1-Ae(L,s,"z","y",l,t),w[S+1]=1-Ae(L,s,"y","z",l,a);break;case 2:L.set(0,1,0),w[S+0]=1-Ae(L,s,"x","z",l,n),w[S+1]=Ae(L,s,"z","x",l,t);break;case 3:L.set(0,-1,0),w[S+0]=1-Ae(L,s,"x","z",l,n),w[S+1]=1-Ae(L,s,"z","x",l,t);break;case 4:L.set(0,0,1),w[S+0]=1-Ae(L,s,"x","y",l,n),w[S+1]=1-Ae(L,s,"y","x",l,a);break;case 5:L.set(0,0,-1),w[S+0]=Ae(L,s,"x","y",l,n),w[S+1]=1-Ae(L,s,"y","x",l,a);break}}static fromJSON(n){return new c(n.width,n.height,n.depth,n.segments,n.radius)}};var Xo=[.2,.21,.25],Jo=[.365,1,.87];function Eo({programs:c,text:n,dir:a}){let t=(s,r,h)=>Te(new vt(s,r,h,4,Math.min(h*.45,s*.12)),{color:Xo}),u=null;function l({w:s=.78,h:r=1.6,t:h=.09,emissive:m=1}={}){let w=new _e,x=new W(Me([t(s,h,r),$(s*.965,h*.02,s*.012,{at:[0,h/2+.001,-r*.482],color:[.7,.72,.76],mat:1}),$(s*.965,h*.02,s*.012,{at:[0,h/2+.001,r*.482],color:[.7,.72,.76],mat:1}),$(s*.012,h*.02,r*.965,{at:[-s*.482,h/2+.001,0],color:[.7,.72,.76],mat:1}),$(s*.012,h*.02,r*.965,{at:[s*.482,h/2+.001,0],color:[.7,.72,.76],mat:1})]),c.solid({ambient:.32,house:1}));w.add(x);let L=new Se(s*.94,r*.96);L.rotateX(-Math.PI/2),L.translate(0,h/2+.003,0),u??(u=i(360,720,12));let v=c.paper({atlas:{value:u},house:0,ambient:m,defines:{}}),A=new W(L,v);return w.add(A),w.userData={screen:A,screenMaterial:v,w:s,h:r,t:h},w}function d({w:s=.78,h:r=1.6,t:h=.09,color:m=Jo,alpha:w=.9}={}){let x=new Zt(new vt(s,h,r,3,Math.min(h*.45,s*.12)),10);return new Xt(x,c.wire({color:m,alpha:w}))}function y({w:s=.78,h:r=1.6}={}){let h=De("phone-board"),m=c.solid({ambient:.14,house:1}),w=new W(t(s,.03,r),m),L=[$(s*.88,.016,r*.9,{color:[.05,.3,.2]}),$(s*.68,.03,r*.42,{at:[0,.02,r*.19],color:[.2,.22,.26]})];for(let ae=0;ae<30;ae+=1){let M=.03+h()*.08,R=.03+h()*.09;L.push($(M,.018,R,{at:[(h()-.5)*s*.74,.016,-r*.28+(h()-.5)*r*.26],color:h()>.7?[.76,.58,.3]:[.1,.1,.12],mat:h()>.7?1:0}))}let v=new W(Me(L),m),A=Me([$(s,.05,.05,{at:[0,0,-r/2+.025],color:[.62,.64,.68],mat:1}),$(s,.05,.05,{at:[0,0,r/2-.025],color:[.62,.64,.68],mat:1}),$(.05,.05,r,{at:[-s/2+.025,0,0],color:[.62,.64,.68],mat:1}),$(.05,.05,r,{at:[s/2-.025,0,0],color:[.62,.64,.68],mat:1})]),S=new W(A,m),k=new Se(s*.94,r*.96);k.rotateX(-Math.PI/2);let _=c.paper({atlas:{value:n.texture},cell:[0,0,1,1],house:0,ambient:1}),te=new W(k,_),ne=new be(s*.98,.006,r*.98),D=new W(ne,c.glow({color:[.8,.9,1],alpha:.05,shape:5}));return{back:w,board:v,frame:S,display:te,displayMaterial:_,glass:D}}function i(s,r,h,m){return n.canvas(s,r,(w,x,L)=>{if(w.fillStyle="#0b0d13",w.fillRect(0,0,x,L),m){m(w,x,L);return}let v=L/13;for(let A=0;A<h;A+=1){w.fillStyle="rgba(255,255,255,.07)",w.fillRect(x*.06,v*(A+1),x*.88,v*.74),w.fillStyle=A%3===0?"#5dffde":"#a48bff";let S=a<0?x*.78:x*.1;w.fillRect(S,v*(A+1)+v*.16,x*.12,v*.42),w.fillStyle="rgba(232,236,244,.7)",w.fillRect(a<0?x*.28:x*.26,v*(A+1)+v*.28,x*.46,v*.16)}})}return{make:l,wire:d,layers:y,listTexture:i}}var Ee=4200,Po=.12,Qo=.6,Zo=.03;function To({programs:c,shared:n,printTexture:a,dir:t}){let u=new Xe(new Float32Array(Ee*2*3),3).setUsage(pt),l=new Xe(new Float32Array(Ee*2*3),3).setUsage(pt),d=new Xe(new Float32Array(Ee*2),1),y=new Xe(new Float32Array(Ee*2),1).setUsage(pt),i=new Xe(new Float32Array(Ee*2),1).setUsage(pt),s=new Uint32Array((Ee-1)*6);for(let R=0;R<Ee;R+=1)if(d.array[R*2]=-1,d.array[R*2+1]=1,R<Ee-1){let B=R*2;s.set([B,B+1,B+2,B+1,B+3,B+2],R*6)}let r=new Vt;r.setAttribute("position",u),r.setAttribute("aAcross",l),r.setAttribute("aSide",d),r.setAttribute("aS",y),r.setAttribute("aW",i),r.setIndex(new Xe(s,1));let h={uFeed:{value:0},uLine:{value:1e6},uLineLen:{value:4},uJamA:{value:0},uJamB:{value:0},uJamK:{value:0},uFlutter:{value:1},uWide:{value:1e6},uPrint:{value:a},uPrintRange:{value:0},uPaperGlow:{value:.22},uLineColor:{value:[.365,1,.87]}},m=c.strip({uniforms:h,side:2}),w=new W(r,m);w.frustumCulled=!1;let x=new W(r,c.glow({color:[.365,1,.87],alpha:.5,shape:5,house:0,deform:{pars:"in vec3 aAcross; in float aSide, aS, aW; uniform float uLine, uLineLen; out float vSide, vAlive;",fpars:"in float vSide, vAlive;",local:`{
          float z = max(-(viewMatrix * vec4(p, 1.0)).z, 0.05);
          p += aAcross * aSide * min(max(aW * 5.0, 0.16), z * 0.02);
        }`,world:"vSide = aSide; vAlive = smoothstep(uLine + uLineLen * 0.7, uLine + uLineLen, aS);",frag:"a = (1.0 - abs(vSide)); a = a * a * vAlive;",uniforms:{uLine:h.uLine,uLineLen:h.uLineLen}}}));x.frustumCulled=!1;let L=new Float32Array(Ee),v=new Float32Array(Ee),A=0,S=0,k=0,_=(R,B,K,o,T,Y,E,G)=>{if(A>=Ee)return;let I=A*2;u.setXYZ(I,R,B,K),u.setXYZ(I+1,R,B,K),l.setXYZ(I,o,T,Y),l.setXYZ(I+1,o,T,Y),y.setX(I,E),y.setX(I+1,E),i.setX(I,G),i.setX(I+1,G),L[A]=E,v[A]=B,A+=1};function te({yaws:R,lineStartY:B,endY:K,dense:o}){A=0;let T=0,Y=.31*t,E=[[Y,.11,-.5],[Y,.085,-.43],[Y*.92,.012,-.34],[Y*.62,.003,-.24],[Y*.22,.003,-.11],[0,.003,-.025],[0,-.004,.008],[0,-.03,.012]],G=24,I=E[0];for(let oe=0;oe<E.length-1;oe+=1){let Z=E[Math.max(0,oe-1)],P=E[oe],F=E[oe+1],U=E[Math.min(E.length-1,oe+2)];for(let X=oe===0?0:1;X<=G;X+=1){let g=X/G,se=g*g,pe=se*g,V=[0,1,2].map(J=>.5*(2*P[J]+(F[J]-Z[J])*g+(2*Z[J]-5*P[J]+4*F[J]-U[J])*se+(3*P[J]-Z[J]-3*F[J]+U[J])*pe)),we=V[0]-I[0],ue=V[1]-I[1],me=V[2]-I[2];T+=Math.hypot(we,ue,me);let re=Math.hypot(we,me)||1;_(V[0],V[1],V[2],me/re||1,0,-we/re||0,T,Po),I=V}}S=T,k=I[1];let j=I[1],de=0;for(;j>K&&A<Ee;){let oe=.22;j>ee.slabBottom-.5&&(oe=.05);for(let se of o)j<se.a&&j>se.b&&(oe=.022);for(j-=oe,T+=oe;de<R.length-1&&j<R[de+1].y;)de+=1;let Z=R[de],P=R[Math.min(de+1,R.length-1)],F=P===Z?0:Je(.25,.75,(Z.y-j)/Math.max(.001,Z.y-P.y)),U=yt(Z.yaw,P.yaw,F)*Math.PI/180,X=Je(ee.floorY-.2,ee.slabBottom+.2,j),g=yt(Po,Qo,X);j<B&&(g=yt(g,Zo,Je(0,4,B-j))),_(0,j,0,Math.cos(U),0,Math.sin(U),T,g)}u.needsUpdate=!0,l.needsUpdate=!0,y.needsUpdate=!0,i.needsUpdate=!0,h.uLine.value=ne(B),h.uPrintRange.value=ne(ee.floorY-.1),h.uWide.value=ne(ee.deskY)}function ne(R){return S+(k-R)}function D(R){let B=0,K=A-1;for(;B<K;){let o=B+K>>1;L[o]<R?B=o+1:K=o}return B}let ae=-1/0;function M(R,B){let K=R+B,o=K>k?0:D(ne(K)),T=D(ne(Math.max(R-B,ae))),Y=Math.max(0,T-o)*6;r.setDrawRange(o*6,Y)}return{mesh:w,halo:x,u:h,rebuild:te,focus:M,setEnd(R){ae=R},sAtY:ne,pointAtY(R,B){return B[0]=0,B[1]=R,B[2]=0,B}}}var e0=460812,t0=12e3,o0=190,s0=900,n0=()=>new Promise(c=>{window.scheduler?.yield?window.scheduler.yield().then(c):setTimeout(c,0)});async function Ht(c){let n=performance.now();for(;;){if(c.next().done)return;performance.now()-n>4&&(await n0(),n=performance.now())}}async function Q0({canvas:c,gl:n,tier:a,forced:t,onFail:u,onOff:l,onOn:d,isFailed:y}){qt.enabled=!1;let i={...Mo[a],instanceScale:1},s=document.documentElement,r=s.dir==="rtl"?-1:1,h=window.matchMedia("(pointer: coarse)").matches,m=new eo({canvas:c,context:n,antialias:!0});m.outputColorSpace=Yt,m.setClearColor(e0,1),m.sortObjects=!1,m.debug.checkShaderErrors=t,m.info.autoReset=!0;let w=new jt,x=new xt(30,1,.1,100);await bo(r<0);let L=So({q:i,dir:r}),v={uTime:{value:0},uInline:{value:r},uCamY:{value:0},uDawn:{value:0},uPower:{value:new Ve(0,0)},uPowerY:{value:0},uLitY:{value:new Ve(ee.slabBottom,-120)},uFog:{value:new Ve(4,40)},uLampOrigin:{value:new le},uLampPos:{value:new le(.5*r,.62,-.62)},uLampDir:{value:new le(0,-1,0)},uLampColor:{value:new le(1,.7,.42)},uLampOn:{value:1},uLampCone:{value:new Ve(.55,.9)},uAtlas:{value:L.texture}},A=yo(v),S=To({programs:A,shared:v,printTexture:L.printTexture,dir:r}),k=Ao({programs:A,shared:v,text:L,q:i,dir:r,tier:a}),_=zo({programs:A,shared:v,text:L,q:i,dir:r,tier:a}),te=Eo({programs:A,shared:v,text:L,dir:r}),ne={desk:k,archive:_,strip:S,phone:te};k.setPhone(te.make({w:.0775,h:.16,t:.0085})),w.add(k.group,_.group,S.mesh,S.halo);let D=Ze.map((e,p)=>({meta:e,index:p,status:"idle",module:null,group:new _e,ctx:null,on:!1,a:0,s:0,e:0,b:0,promise:null})),ae=Object.fromEntries(D.map(e=>[e.meta.id,e]));D.forEach(e=>{e.group.visible=!1,w.add(e.group)});let M=null,R=null,B=null,K=1,o=1/0,T=0,Y=0,E=0,G=()=>M.svh*.15,I=fo({inPlace:!h,blur:!h&&a!=="L"});function j(){I.release(),M=wo(),I.bake(M);let e=oo(M,Ze);R=e.solved,K=M.docH,B=so(e.knots,K);let p=R["svc.auto"],H=R["process.head"],z=R["why.q"],q=Ze.filter(Q=>Q.floor&&Q.stripYaw!==void 0).map(Q=>({y:R[Q.id].floorY,yaw:Q.stripYaw}));q.unshift({y:ee.deskY,yaw:0}),q.push({y:p.floorY+3,yaw:0},{y:p.floorY+1,yaw:90},{y:p.floorY-3,yaw:90},{y:H.floorY+2,yaw:0}),q.sort((Q,ye)=>ye.y-Q.y),S.rebuild({yaws:q,lineStartY:p.floorY-1.8,endY:z.floorY+.03,dense:[{a:R["svc.rescue"].floorY+2.4,b:R["svc.rescue"].floorY-2.4}]}),v.uLitY.value.set(ee.slabBottom,H.floorY+4),_.setRange(ee.slabBottom,H.floorY);let ie=M.shots.drop,he=M.shots.fall;T=ie.pinStart+(ie.pinEnd-ie.pinStart)*.86,o=he.pinStart+(he.pinEnd-he.pinStart)*.5,Y=ie.pinStart+(ie.pinEnd-ie.pinStart)*.8,E=he.pinStart+(he.pinEnd-he.pinStart)*.4;for(let Q of D){let ye=Q.index,ve=M.shots[Q.meta.id],je=ye>0?M.shots[Ze[ye-1].id]:null,dt=ye<Ze.length-1?M.shots[Ze[ye+1].id]:null;Q.a=je?je.pinEnd:0,Q.s=ve.pinStart,Q.e=ve.pinEnd,Q.b=dt?dt.pinStart:K;let zt=R[Q.meta.id];Q.group.position.set(0,zt.floorY??0,0),Q.status==="ready"&&Q.module.layout&&Q.module.layout(Q.ctx)}k.setActPositions(R.deskAct4),P()}let de=1,oe=0,Z=null;function P(){let e=M.W,p=M.H,H=i.pixelCap*de,z=Math.min(window.devicePixelRatio||1,Math.sqrt(H/(e*p)));m.setPixelRatio(z),m.setSize(e,p,!1),x.aspect=e/p,Z?.resize(e*z,p*z)}let F=[],U=e=>({tier:a,q:i,dir:r,id:e.meta.id,group:e.group,programs:A,u:v,text:L,sets:ne,camera:x,renderer:m,rng:De(e.meta.id),get solved(){return R},get layout(){return M},get self(){return R[e.meta.id]},place(p,{inline:H=0,y:z=0,z:q=0,yaw:ie=0}={}){return p.position.set(H*r,z,q),p.rotation.y=ie*r,p},hotspots:{add(p){F.push({...p,runtime:e})}}});async function X(e){if(e.status!=="ready")return e.promise||(e.status="loading",e.promise=(async()=>{try{let H=(await Lo[e.meta.id]()).default;e.ctx=U(e),await Ht(H.build(e.ctx)),await m.compileAsync(e.group,x,w),H.layout&&H.layout(e.ctx),e.module=H,e.status="ready",ke=!0}catch(p){console.warn(`shot ${e.meta.id} failed`,p),e.status="failed"}})()),e.promise}function g(e){for(let p=D.length-1;p>=0;p-=1)if(e>=D[p].a)return p;return 0}let se=!1;async function pe(){if(!se){for(se=!0;!(Ce||y());){let e=g(N),p=null,H=1/0;for(let z of D)if(z.status==="idle"){let q=Math.abs(z.index-e);q<H&&(p=z,H=q)}if(!p)break;await new Promise(z=>{"requestIdleCallback"in window?window.requestIdleCallback(z,{timeout:200}):setTimeout(z,16)}),await X(p)}se=!1}}let V=new Float32Array(13),we=new Ut,ue=new le(0,1,0),me=new le(1,0,0),re={t:0,enter:0,hold:0,exit:0,y:0,v:0,time:0,dt:0,px:0,py:0,pointer:0},J=ho(window.scrollY),Ye=mo(),N=J.y,Oe=0,it=0,Ce=!1,et=null,ke=!0,Ge=0,rt=performance.now(),Re=0,Be=performance.now(),Ue=0,lt=0,Fe=0,qe=0,Ie=0,ge=0,xe=!1;function wt(e,p){let H=z=>Math.min(1,Math.max(0,z));re.t=e.b>e.a?H((N-e.a)/(e.b-e.a)):1,re.enter=e.s>e.a?H((N-e.a)/(e.s-e.a)):N>=e.s?1:0,re.hold=e.e>e.s?H((N-e.s)/(e.e-e.s)):N>=e.e?1:0,re.exit=e.b>e.e?H((N-e.e)/(e.b-e.e)):N>=e.b?1:0,re.y=N/M.pace,re.v=J.v,re.time=Ge,re.dt=p,re.px=qe,re.py=Ie,re.pointer=Fe}let fe=(e,p)=>p>e?Math.min(1,Math.max(0,(N-e)/(p-e))):N>=p?1:0,ze=e=>e*e*(3-2*e);function ct(){let e=M.shots["process.head"];_.u.uTurn.value=ze(fe(e.pinStart,e.pinEnd));let p=M.shots["why.list"],H=M.shots["why.stats"],z=M.shots.cta,q=fe(p.pinStart,p.pinEnd)*3.2;k.setClear(q);let ie=ze(fe(p.pinStart+(p.pinEnd-p.pinStart)*.45,z.pinStart));v.uDawn.value=ie,k.setClock(3.2+ze(fe(p.pinStart,H.pinEnd))*3.8);let he=M.shots.hero;if(N<o){let ve=M.shots.drop.pinEnd-he.pinEnd;k.setRing(1-fe(he.pinEnd,he.pinEnd+ve*.14)),k.setOffHook(ze(fe(he.pinEnd,he.pinEnd+ve*.22)))}else k.setRing(1-fe(p.pinStart,p.pinStart+(p.pinEnd-p.pinStart)*.5)),k.setOffHook(0);let Q=k.phone;if(Q.visible=N>o,S.setEnd(-1/0),N>o){let ve=M.shots["why.q"],je=R["why.q"].d*.62,dt=ze(fe(M.shots.fall.pinEnd-(M.shots.fall.pinEnd-o)*.2,ve.pinEnd)),zt=ze(fe(p.pinStart,p.pinStart+(p.pinEnd-p.pinStart)*.14)),Dt=je+(.42-je)*dt,Nt=Dt+(.0043-Dt)*zt;Q.position.y=Nt;let ko=2.1+(1-2.1)*dt;Q.scale.setScalar(ko),Q.rotation.y=M.portrait?0:Math.PI/2*ze(fe(H.pinEnd,z.pinStart)),S.setEnd(k.group.position.y+Nt+.01)}let ye=D.find(ve=>ve.meta.id==="svc.rescue");(N<ye.a||N>ye.b)&&(v.uPower.value.set(0,0),S.u.uJamK.value=0)}function Pe(e){no(B,K,N,V),x.position.set(V[0],V[1],V[2]),x.quaternion.set(V[3],V[4],V[5],V[6]),Fe===1&&(we.setFromAxisAngle(ue,-qe*.012),x.quaternion.multiply(we),we.setFromAxisAngle(me,Ie*.009),x.quaternion.multiply(we)),x.fov=V[7],x.near=V[8],x.far=V[9],x.setViewOffset(M.W,M.H,V[11],V[12],M.W,M.H),v.uTime.value=Ge,v.uCamY.value=V[1],v.uFog.value.set(V[10]*.16,V[10]),ct();let p=N<T||N>o,H=N>o?4:1;k.group.visible=p,k.setAct(H),_.group.visible=N>Y&&N<E,v.uLampOn.value=p?1-v.uDawn.value*.72:0,v.uLampOrigin.value.copy(k.group.position),v.uLampColor.value.set(1,.7,.42),S.u.uFeed.value=N*18e-5/M.pace,wt(D[0],e),p&&(k.resetSpot(),k.update(re,Ge));for(let z of D){let q=N>=z.a-G()&&N<=z.b+G();z.status==="ready"&&(q||z.on)&&(wt(z,e),z.module.update(re,z.ctx),z.on=q,z.group.visible=q)}S.focus(V[1],V[9]),x.updateProjectionMatrix(),x.updateMatrixWorld(),Z?Z.render(w,x):m.render(w,x)}let $e=new St({onChange(e,p){Ct(p)}});function Ct(e){if(e==="pixel-85"||e==="pixel-72")oe=e==="pixel-85"?.85:.72;else if(e==="drop-film")Z?.dispose(),Z=null;else if(e==="instances-70"||e==="instances-50")i.instanceScale=e==="instances-70"?.7:.5,k.setDensity(i.instanceScale),_.setDensity(i.instanceScale);else if(e==="shadow-1")k.setShadowTaps(1);else if(e==="extras-off")_.setWeather(!1),k.setExtras(!1);else if(e==="cadence-30")ge=33.3;else if(e==="stills"){try{window.localStorage.setItem("enjaz:tier",`S:${Date.now()}`)}catch{}tt(),l("governor")}}function gt(e){if(Ce)return;if(window.requestAnimationFrame(gt),document.hidden||xe||et!==null){rt=e;return}let p=e-rt;rt=e;let H=Math.min(p,100)/1e3;Ge+=H;let z=window.scrollY,q=Ye.step(z,H,M.svh);q!==z&&window.scrollTo({top:q,behavior:"instant"}),I.update(q,H),!Oe&&Math.abs(q-N)>6*M.svh&&e>it?(Oe=e,s.classList.add("world-dip")):Oe&&e-Oe>=o0&&(J.land(q,M.svh),Oe=0,it=e+s0,s.classList.remove("world-dip"));let ie=Math.abs(q-J.y)>.25||Math.abs(J.v)>2;N=J.step(q,H,M.svh),qe+=(Ue-qe)*Math.min(1,H*6),Ie+=(lt-Ie)*Math.min(1,H*6);let he=Math.abs(Ue-qe)>.001||Math.abs(lt-Ie)>.001,ye=D[g(N)].meta.idleHz,ve=ie||he||ke;if(!ve&&ye>0&&!(a==="L"&&e-Be>t0)&&(ve=e-Re>=1e3/ye-1),ge&&e-Re<ge-2&&(ve=!1),!ve)return;ie&&(Be=e),oe&&(!ie||N>M.shots.fall.pinStart&&N<M.shots.fall.pinEnd)&&(de=oe,oe=0,P()),ke=!1;let je=(e-Re)/1e3;Re=e,Pe(Math.min(je,.1)),p<250&&(ie||ye>0)&&$e.push(p)}function ut(){Ye.on=!1,Oe=0,s.classList.remove("world-dip")}function tt(){Ce=!0,ut(),I.release()}window.addEventListener("pointermove",e=>{Fe=e.pointerType==="mouse"?1:2,Ue=e.clientX/window.innerWidth*2-1,lt=e.clientY/window.innerHeight*2-1,Be=performance.now()},{passive:!0});let f=new le;window.addEventListener("click",e=>{if(!e.target.closest?.("a, button, .shot"))for(let p of F){if(!p.runtime.on)continue;f.set(p.center[0],p.center[1],p.center[2]),p.runtime.group.localToWorld(f).project(x);let H=(f.x*.5+.5)*M.W,z=(.5-f.y*.5)*M.H;Math.hypot(H-e.clientX,z-e.clientY)<p.radius&&(p.runtime.module.hit?.(p.id,re,p.runtime.ctx),ke=!0)}},{passive:!0}),window.addEventListener("pageshow",()=>{J.reset(window.scrollY),N=J.y,ke=!0});let b=0;if(c.addEventListener("webglcontextlost",e=>{e.preventDefault(),xe=!0,ut(),b+=1,l("context-lost")}),c.addEventListener("webglcontextrestored",()=>{b>1||(xe=!1,k.bakeShadow(m),d(),j(),J.reset(window.scrollY),N=J.y,ke=!0)}),j(),J.reset(window.scrollY),N=J.y,await Ht(k.build()),await Ht(_.build()),await X(ae.hero),await X(ae.drop),await m.compileAsync(w,x),k.bakeShadow(m),y())return null;if(!t){let e=[],p=new Uint8Array(4);for(let z=0;z<6;z+=1){await new Promise(ie=>window.requestAnimationFrame(ie));let q=performance.now();Pe(.016),n.readPixels(0,0,1,1,n.RGBA,n.UNSIGNED_BYTE,p),e.push(performance.now()-q)}let H=e.slice(2).sort((z,q)=>z-q)[1];if(H>40){try{window.localStorage.setItem("enjaz:tier",`S:${Date.now()}`)}catch{}return u("bench"),null}H>20&&(de=.7,i.instanceScale=.7,k.setDensity(.7),_.setDensity(.7),P())}i.film&&(Z=(await import("./chunk-WOIDP7SL.js")).createFilm(m),Z.resize(M.W*m.getPixelRatio(),M.H*m.getPixelRatio())),J.reset(window.scrollY),N=J.y,I.update(N,0),Pe(.016),s.classList.add("world-on"),window.requestAnimationFrame(gt),pe(),window.addEventListener("wheel",e=>{e.ctrlKey||Ce||xe||et!==null||document.body.classList.contains("is-nav-open")||Math.abs(e.deltaX)>Math.abs(e.deltaY)||(e.preventDefault(),Ye.input(e.deltaY,e.deltaMode,window.scrollY,M.svh,M.docH-M.svh),Be=performance.now())},{passive:!1});let C=go(()=>{j(),ke=!0});/[?&]hud=1\b/.test(window.location.search)&&import("./chunk-FKFVKEYL.js").then(e=>e.mountHud({renderer:m,governor:$e,tier:a,q:i,get y(){return N}}));let O={tier:a,renderer:m,governor:$e,scene:w,stop:tt,get layout(){return M},get solved(){return R},get y(){return N},seek(e){return window.scrollTo({top:e,behavior:"instant"}),ut(),J.reset(window.scrollY),N=J.y,I.update(N,0),Pe(.016),N},freeze(e){et=e,Ge=e},unfreeze(){et=null},renderOnce(){Pe(.016)},info(){return Pe(.016),{calls:m.info.render.calls,triangles:m.info.render.triangles,programs:m.info.programs.length,rung:$e.rung,y:N}},sceneInfo(){let e=Z;Z=null,Pe(.016);let p={calls:m.info.render.calls,triangles:m.info.render.triangles};return Z=e,p},feedFrameTimes(e){e.forEach(p=>$e.push(p))},async loadAll(){await Promise.all(D.map(e=>X(e))),ke=!0},status(){return Object.fromEntries(D.map(e=>[e.meta.id,e.status]))},dispose(){tt(),C()}};return window.__enjazWorld=O,O}export{Q0 as start};
