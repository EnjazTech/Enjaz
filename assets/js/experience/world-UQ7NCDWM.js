/* three.js r187 (c) three.js authors, MIT. ENJAZ film. */
import{a as ee,b as uo,c as po,d as fo}from"./chunk-FKZIRWLH.js";import{a as ho,b as mo,c as vo,d as wo,e as go,f as Yt,g as xo,h as yo}from"./chunk-2EEOQMQQ.js";import{c as He,d as q,f as Ce,g as Be,h as Ae,i as We,j as co,k as Pt,l as at}from"./chunk-GBHZZ3DY.js";import{A as no,B as ao,C as Me,D as Wt,E as io,J as Le,N as ro,O as zt,S as lo,a as Dt,c as Ot,d as Nt,e as ht,f as $t,g as jt,h as Vt,i as Xt,j as Jt,k as yt,l as Qt,m as st,n as Zt,o as de,p as Kt,q as eo,r as Bt,t as et,u as to,v as nt,w as oo,x as W,z as so}from"./chunk-ZD75F7KI.js";import"./chunk-AEJNSRIJ.js";var Tt=r=>Math.min(1,Math.max(0,r));function bo({inPlace:r,blur:s}){let a=[],t=NaN,c=0,l=0;function p(i){i.el.style.opacity="",i.el.style.transform="",i.el.classList.remove("is-gone");for(let n of i.kids)n.style.opacity="",n.style.transform="",n.style.filter=""}function y(i,n,u,d){let v=n<.5;if(v!==i.gone&&(i.gone=v,i.el.classList.toggle("is-gone",v),document.dispatchEvent(new CustomEvent("enjaz:captions"))),n===1&&u===0){p(i);return}i.el.style.opacity=Tt(n/.55).toFixed(3),i.el.style.transform=u?`translate3d(0, ${u.toFixed(1)}px, 0)`:"";let w=i.kids.length,b=w>1?Math.min(.14,.5/(w-1)):0,C=1-(w-1)*b;i.kids.forEach((h,A)=>{let M=Tt((n-A*b)/C);if(M===1){h.style.opacity="",h.style.transform="",h.style.filter="";return}let T=1-M;h.style.opacity=M.toFixed(3),h.style.transform=`translate3d(0, ${(T*T*T*1.1*(d?-1:1)).toFixed(3)}em, 0)`,s&&(h.style.filter=`blur(${(T*.28).toFixed(3)}em)`)})}return{bake(i){let n=.35*i.svh;a=[];for(let[u,d]of Object.entries(i.shots)){if(!d.caption||d.caption.h>i.svh*.7)continue;let v=document.querySelector(`[data-shot="${u}"] > .shot`);v&&a.push({el:v,kids:[...v.children],a:u==="hero"?-1:d.pinStart-n,s:u==="hero"?-1:d.pinStart,e:d.pinEnd,b:d.pinEnd+n,shown:-1,shift:0,gone:!1})}t=NaN},update(i,n,u=!1){c=i===t?c+n:0,t=i,l=c>.25?Math.min(1,l+n/.4):Math.max(0,l-n/(u?1.2:.12));for(let d of a){let v=d.s>d.a?Tt((i-d.a)/(d.s-d.a)):1,w=Tt((i-d.e)/(d.b-d.e)),b=i>d.a&&i<d.b,C=b?Math.max(Math.min(v,1-w),l):0,h=0;r&&b&&(h=v<1?(i-d.s)*.85:w>0?(i-d.e)*.85:0),(C!==d.shown||h!==d.shift)&&(d.shown=C,d.shift=h,y(d,C,h,w>0))}},release(){for(let i of a)p(i),i.shown=-1,i.gone=!1}}}var _t=["pixel-85","pixel-72","drop-film","instances-70","instances-50","shadow-1","extras-off","cadence-30","stills"];function Gt(r,s){return r[Math.min(r.length-1,Math.floor(r.length*s))]}var kt=class{constructor({onChange:s=()=>{}}={}){this.onChange=s,this.buffer=new Float32Array(90),this.sorted=new Float32Array(90),this.count=0,this.head=0,this.rung=-1,this.elapsed=0,this.overBudget=0,this.underBudget=0,this.cooldown=0,this.climbs=0,this.upWait=240,this.locked=!1,this.refreshCap=!1,this.seen=0,this.belowBail=0,this.p50=0,this.p90=0,this.vsync=16.6}target(){return this.refreshCap?33.3:Math.max(this.vsync,16.6)}push(s){if(this.elapsed+=s,this.elapsed<1e3||s>250||(this.buffer[this.head]=s,this.head=(this.head+1)%90,this.count=Math.min(90,this.count+1),this.seen+=1,this.cooldown=Math.max(0,this.cooldown-s),this.count<90/2))return;this.sorted.set(this.buffer);let a=this.sorted.subarray(0,this.count).sort();this.p50=Gt(a,.5),this.p90=Gt(a,.9),this.vsync=Gt(a.subarray(0,Math.max(1,Math.floor(this.count*.2))),.5),this.seen<=60&&Math.abs(this.p50-33.3)/33.3<.04&&this.p90/this.p50<1.08&&(this.refreshCap=!0);let t=this.target();if(this.p90>t*1.25?(this.overBudget+=1,this.underBudget=0):this.p90<t*.75?(this.underBudget+=1,this.overBudget=0):(this.overBudget=0,this.underBudget=0),this.rung===_t.length-2&&this.p50>50){if(this.belowBail+=s,this.belowBail>4e3){this.step(1);return}}else this.belowBail=0;this.cooldown>0||(this.overBudget>=45&&this.rung<_t.length-2?(this.underBudgetClimbed&&(this.upWait*=2,this.underBudgetClimbed=!1),this.step(1)):this.underBudget>=this.upWait&&this.rung>=0&&!this.locked&&(this.climbs+=1,this.underBudgetClimbed=!0,this.climbs>=2&&(this.locked=!0),this.step(-1)))}step(s){this.rung+=s,this.overBudget=0,this.underBudget=0,this.cooldown=1500,this.count=0,this.onChange(this.rung,_t[this.rung]??"full")}};var Rt=(r,s,a)=>Math.min(a,Math.max(s,r));function So(r=0){return{y:r,v:0,step(s,a,t){let l=10*a,p=1/(1+l+.48*l*l+.235*l*l*l),y=4.2*t*.2,i=Rt(this.y-s,-y,y),n=(this.v+10*i)*a;return this.v=(this.v-10*n)*p,this.y=this.y-i+(i+n)*p,Math.abs(this.y-s)<.25&&Math.abs(this.v)<2&&(this.y=s,this.v=0),this.y},reset(s){this.y=s,this.v=0},land(s,a){let t=Math.sign(s-this.y);this.y=s-t*.8*a,this.v=t*4.2*a*.5}}}function Mo(){return{idle:0,moving:!1,speed:0,at:0,seen:0,wake(){this.idle=0,this.moving=!1,this.speed=0},go(){this.idle=2.5},step(r,s,a,t,c){return(!c||Math.abs(r-this.seen)>2)&&this.wake(),this.seen=r,c?(this.idle+=s,this.idle<2.5||r>=t-1?(this.moving=!1,this.speed=0,r):(this.moving||(this.moving=!0,this.at=r),this.speed=Math.min(1,this.speed+s/1.6),this.at=Math.min(t,this.at+this.speed*.08*a*s),this.seen=this.at,this.at)):r}}}function Lo(){return{on:!1,at:0,aim:0,written:0,input(r,s,a,t,c){this.on||(this.on=!0,this.at=a,this.aim=a,this.written=a);let p=Rt(r*(s===1?40:s===2?t:1),-200,200),y=Math.sign(p)===-Math.sign(this.aim-this.at)?this.at:this.aim,i=1.6*t;this.aim=Rt(y+p,Math.max(0,this.at-i),Math.min(c,this.at+i))},step(r,s,a){if(!this.on)return r;if(Math.abs(r-this.written)>2)return this.on=!1,r;let t=3.5*a*s;return this.at+=Rt((this.aim-this.at)*(1-Math.exp(-12*s)),-t,t),Math.abs(this.aim-this.at)<.5&&(this.at=this.aim,this.on=!1),this.written=Math.round(this.at),this.written}}}var Co=r=>{let s=document.createElement("div");s.style.position="fixed",s.style.top="0",s.style.width="0",s.style.visibility="hidden",s.style.height=`100${r}`,document.body.appendChild(s);let a=s.getBoundingClientRect().height;return s.remove(),a},bt=r=>parseFloat(r)||0;function Ao(){let r=Co("svh"),s=Co("lvh"),a=document.documentElement.clientWidth,t=s,c=window.scrollY,l=document.querySelector("[data-nav]"),p=l?l.getBoundingClientRect().height:0,y=document.documentElement.dir==="rtl"?-1:1,i=document.documentElement.scrollHeight,n=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--pace"))||1,u={};for(let d of document.querySelectorAll("[data-shot]")){let v=d.dataset.shot,w=d.getBoundingClientRect(),b=w.top+c,C=d.querySelector(":scope > .shot"),h={id:v,top:b,height:w.height,caption:null,pinStart:b,pinEnd:b};if(C){let A=C.getBoundingClientRect(),M=getComputedStyle(d),T=getComputedStyle(C),_=bt(M.paddingBlockEnd);if(v==="hero"){let te=bt(T.insetBlockStart),re=bt(T.marginBlockEnd),I=bt(M.paddingBlockStart);h.pinStart=0,h.pinEnd=Math.max(0,w.height-I-A.height-re),h.caption={x:A.left,y:te,w:A.width,h:A.height}}else{let te=bt(T.insetBlockEnd);h.pinStart=b+A.height+te-r,h.pinEnd=h.pinStart+Math.max(0,w.height-_-A.height),h.caption={x:A.left,y:r-te-A.height,w:A.width,h:A.height},h.pin=te,h.gap=_}}u[v]=h}return{W:a,H:t,svh:r,lvh:s,navH:p,docH:i,dir:y,pace:n,portrait:t>=a,shots:u}}function Eo(r){let s=window.matchMedia("(pointer: coarse)").matches,a=document.documentElement.clientWidth,t=document.documentElement.scrollHeight,c=0,l=()=>{window.clearTimeout(c),c=window.setTimeout(r,160)},p=new ResizeObserver(()=>{let y=document.documentElement.clientWidth,i=document.documentElement.scrollHeight;if(y===a&&i===t)return;let n=s&&y===a&&Math.abs(i-t)<200;a=y,t=i,n||l()});return p.observe(document.documentElement),document.fonts?.ready.then(l),document.fonts?.addEventListener?.("loadingdone",l),()=>p.disconnect()}var vt=`
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
`,wt=`
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
`,Yo=`
${vt}
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
}`,_o=`
${wt}
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
}`,Go=`
${vt}
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
}`,Uo=`
${wt}
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
}`,qo=`
${vt}
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
}`,$o=`
${wt}
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
}`,jo=`
${vt}
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
}`,Vo=`
${wt}
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
}`,Xo=`
${vt}
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
}`,Jo=`
${wt}
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
}`,Qo=`
${vt}
in vec3 position;
out float vFog;
//#pars
void main() {
  vec3 p = position;
  //#local
  vec3 wp = (modelMatrix * vec4(p, 1.0)).xyz;
  gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
  vFog = fogAt(wp);
}`,Zo=`
${wt}
uniform vec3 uColor;
uniform float uAlpha;
in float vFog;
void main() {
  fragColor = vec4(uColor * uAlpha * (1.0 - clamp(vFog, 0.0, 1.0)), 1.0);
}`;function zo(r,s={}){return r.replace("//#pars",s.pars??"").replace("//#fpars",s.fpars??"").replace("//#local",s.local??"").replace("//#world",s.world??"").replace("//#frag",s.frag??"")}function it(r,{mips:s=!0,repeat:a=!1}={}){let t=new no(r);return t.colorSpace=Vt,t.generateMipmaps=s,t.minFilter=s?$t:ht,t.magFilter=ht,a&&(t.wrapS=Nt,t.wrapT=Nt),t}function Ko(){let s=document.createElement("canvas");s.width=256*2,s.height=256;let a=s.getContext("2d"),t=(c,l,p)=>{let y=a.createRadialGradient(c+107.52,76.8,5.12,c+128,128,184.32);l.forEach(([n,u])=>y.addColorStop(n,u)),a.fillStyle=y,a.fillRect(c,0,256,256);let i=a.createRadialGradient(c+256*.38,256*.24,0,c+256*.38,256*.24,256*.26);i.addColorStop(0,p),i.addColorStop(1,"rgba(255,255,255,0)"),a.fillStyle=i,a.fillRect(c,0,256,256)};return t(0,[[0,"#bcbcc0"],[.5,"#8c8d92"],[.85,"#55565c"],[1,"#35363c"]],"rgba(255,255,255,.18)"),t(256,[[0,"#f6d58c"],[.45,"#c9963f"],[.8,"#6e4a1c"],[1,"#2c1c0a"]],"rgba(255,244,214,.75)"),it(s,{mips:!1})}function Po(r){let s=Ko(),a=(t,c,l,p,y={})=>{let{deform:i,defines:n,...u}=y;return new ro({name:t,glslVersion:Qt,vertexShader:zo(c,i),fragmentShader:zo(l,i),defines:n??{},uniforms:{...r,...p,...i?.uniforms??{}},...u})};return{matcap:s,solid(t={}){return a("solid",Yo,_o,{uMatcap:{value:s},uEmit:{value:t.emit??[0,0,0]},uAmbient:{value:t.ambient??.06},uHouse:{value:t.house??1}},mt(t,["emit","ambient","house"]))},paper(t={}){return a("paper",Go,Uo,{uAtlas:t.atlas??r.uAtlas,uCell:{value:t.cell??[0,0,1,1]},uAmbient:{value:t.ambient??.07},uHouse:{value:t.house??1},uLitBoost:{value:t.boost??1}},{side:Dt,...mt(t,["atlas","cell","ambient","house","boost"])})},wood(t={}){return a("wood",qo,$o,{uHouse:{value:0},...t.uniforms},mt(t,["uniforms"]))},strip(t={}){return a("strip",jo,Vo,{uHouse:{value:1},...t.uniforms},mt(t,["uniforms"]))},glow(t={}){return a("glow",Xo,Jo,{uColor:{value:t.color??[1,1,1]},uAlpha:{value:t.alpha??1},uShape:{value:t.shape??0},uRadius:{value:0},uMap:{value:t.map??s},uHouse:{value:t.house??0}},{transparent:!0,depthWrite:!1,blending:Ot,side:Dt,...mt(t,["color","alpha","shape","map","house"])})},wire(t={}){return a("wire",Qo,Zo,{uColor:{value:t.color??[.365,1,.87]},uAlpha:{value:t.alpha??1},uHouse:{value:0}},{transparent:!0,depthWrite:!1,blending:Ot,...mt(t,["color","alpha"])})}}}function mt(r,s){let a={};for(let t of Object.keys(r))s.includes(t)||(a[t]=r[t]);return a}var Je=4,es=["invoice","receipt","quote","ledger","sheet","slip","lines","dossier","carbon","memo","tape","blank"],ts=r=>{let s=new Set;for(let a of document.querySelectorAll(r)){let t=a.textContent.trim();t&&t!=="\u2726"&&s.add(t)}return[...s]};async function To(r){let s=[document.fonts.load('400 20px "IBM Plex Mono"',"#REF! 0123"),document.fonts.load(r?'700 48px "Noto Kufi Arabic"':'700 48px "Space Grotesk"',r?"\u0625\u0646\u062C\u0627\u0632":"ENJAZ")];await Promise.race([Promise.allSettled(s),new Promise(a=>setTimeout(a,1500))])}function ko({q:r,dir:s}){let a=s<0,t=document.querySelector("main"),c={};try{c=JSON.parse(t?.dataset.atlas??"{}")}catch{c={}}let l=ts(".ticker__track span"),p=[];try{p=JSON.parse(document.querySelector("[data-typewriter]")?.dataset.typewriter??"[]")}catch{p=[]}let y=a?'"Noto Kufi Arabic", system-ui':'"Space Grotesk", system-ui',i='"IBM Plex Mono", monospace',n=new Intl.NumberFormat(a?"ar-EG":"en-US",{useGrouping:!1}),u=r.atlas,d=document.createElement("canvas");d.width=u,d.height=u;let v=d.getContext("2d"),w=u/Je;v.fillStyle="#fff",v.fillRect(0,0,u,u);let b="#23252e",C="#9aa0ad",h=(o,P)=>{let Y=o%Je,E=Math.floor(o/Je);v.save(),v.beginPath(),v.rect(Y*w,E*w,w,w),v.clip(),v.translate(Y*w,E*w),v.scale(w/100,w/134),v.direction=a?"rtl":"ltr",v.textBaseline="alphabetic",P(v),v.restore()},A=o=>a?100-o:o,M=(o,P,Y,E=12)=>{o.fillStyle=b,o.font=`700 ${E}px ${y}`,o.textAlign="start",o.fillText(P,A(8),Y)},T=(o,P,Y=8,E=92,G=C,F=.7)=>{o.fillStyle=G,o.fillRect(Y,P,E-Y,F)},_=(o,P,Y,E,G=0)=>{for(let F=0;F<Y;F+=1){let $=34+(F*37+G)%40;o.fillStyle=F%3===0?b:C,o.fillRect(a?92-$:8,P+F*E,$,1.4),o.fillStyle=C,o.fillRect(a?8:80,P+F*E,12,1.4)}};h(0,o=>{M(o,c.invoice??"",20,14),T(o,26),_(o,34,9,7),T(o,104,8,92,b,1),o.fillStyle=b,o.font=`600 9px ${i}`,o.textAlign=a?"left":"right",o.fillText(n.format(4820),a?8:92,116)}),h(1,o=>{M(o,c.receipt??"",18,12),T(o,24),_(o,32,7,6,11),o.fillStyle=b,o.fillRect(30,100,40,12)}),h(2,o=>{M(o,c.quote??"",22,15),T(o,28),_(o,38,6,8,23),o.save(),o.translate(68,104),o.rotate(-.26),o.strokeStyle="#5e4bd8",o.lineWidth=2,o.strokeRect(-23,-9,46,18),o.fillStyle="#5e4bd8",o.font=`700 10px ${y}`,o.textAlign="center",o.fillText(c.paid??"",0,4),o.restore()});let te=(o,P)=>{let Y=a?8:16;o.fillStyle="#e6f6ee";for(let E=0;E<18;E+=2)o.fillRect(0,6+E*7,100,7);o.strokeStyle="#a9b7ae",o.lineWidth=.4;for(let E=0;E<=4;E+=1)o.beginPath(),o.moveTo(Y+E*19,0),o.lineTo(Y+E*19,134),o.stroke();o.font=`400 4.8px ${i}`,o.textAlign="center";for(let E=0;E<18;E+=1){o.fillStyle=C,o.fillText(n.format(E+1),a?96:8,11.5+E*7);for(let G=0;G<4;G+=1){let F=(E*7+G*13)%23,$=n.format(100+F*317);P&&F===4?($="#REF!",o.fillStyle="#c2352b"):(P&&F===9&&($="#####"),o.fillStyle=b),o.fillText($,Y+G*19+9.5,11.5+E*7)}}};h(3,o=>{te(o,!1),o.fillStyle="rgba(255,255,255,.92)",o.fillRect(0,0,100,16),M(o,c.ledger??"",12,10)}),h(4,o=>te(o,!0)),h(5,o=>{o.fillStyle="#c2352b",o.fillRect(8,8,84,7),o.fillStyle=b,o.font=`600 9px ${i}`,o.textAlign="center";for(let P=0;P<4;P+=1)o.fillText(n.format(1200+P*417),50,40+P*20)}),h(6,o=>{for(let P=0;P<16;P+=1)T(o,12+P*7.4,6,94,"#b7c2d8",.5);_(o,14,7,7.4,5)}),h(7,o=>{o.fillStyle="#fff",o.fillRect(0,0,100,134),o.fillStyle="#f7efd9",o.fillRect(18,18,64,30),M(o,c.ledger??"",38,11),o.fillStyle="#faf6ea",o.fillRect(0,62,100,5)}),h(8,o=>{M(o,c.invoice??"",20,13),_(o,30,12,6.6,3)}),h(9,o=>{_(o,12,16,7,17)}),h(10,o=>{o.fillStyle=b,o.font=`400 7px ${i}`,o.textAlign="center";for(let P=0;P<12;P+=1)o.fillText(n.format(90+P*233),50,12+P*10.5)});let re=it(d);re.anisotropy=4;let I=document.createElement("canvas");I.width=512,I.height=2048;let le=I.getContext("2d");le.fillStyle="#fff",le.fillRect(0,0,512,2048),le.direction=a?"rtl":"ltr",le.textBaseline="middle";let S=a?468:44;le.textAlign="start";let k=[];l.forEach((o,P)=>{k.push({text:o,big:!0}),p[P%Math.max(1,p.length)]&&k.push({text:p[P%p.length],big:!1})});let N=2048/Math.max(1,k.length);k.forEach((o,P)=>{le.fillStyle=o.big?"#1f2a24":"#3d4c44",le.font=o.big?`700 44px ${y}`:`400 25px ${a?y:i}`,le.fillText(o.text,S,N*(P+.5),424)});let K=it(I);return K.anisotropy=4,{texture:re,printTexture:K,services:l,phrases:p,words:c,display:y,mono:i,digits:o=>n.format(o),cell(o){let P=Math.max(0,es.indexOf(o)),Y=P%Je,E=Math.floor(P/Je);return[Y/Je,1-(E+1)/Je,1/Je,1/Je]},title(o){return document.querySelector(`[data-shot="${o}"] .card__title, [data-shot="${o}"] .step__title`)?.textContent.trim()??""},canvas(o,P,Y,E){let G=document.createElement("canvas");G.width=o,G.height=P;let F=G.getContext("2d");return F.direction=a?"rtl":"ltr",Y(F,o,P),it(G,E)}}}var Ro={L:{pixelCap:55e4,draws:28,tris:7e4,sheets:420,sheetSeg:2,stacks:180,dossiers:120,boxes:1400,weather:140,uxGrid:[32,45],shadowSize:1024,shadowTaps:1,atlas:512,dust:60,allReflections:!1,film:!1},M:{pixelCap:13e5,draws:45,tris:22e4,sheets:1100,sheetSeg:3,stacks:360,dossiers:240,boxes:3e3,weather:320,uxGrid:[48,68],shadowSize:1024,shadowTaps:4,atlas:1024,dust:150,allReflections:!0,film:!1},H:{pixelCap:28e5,draws:70,tris:6e5,sheets:2400,sheetSeg:4,stacks:720,dossiers:480,boxes:6e3,weather:700,uxGrid:[64,90],shadowSize:2048,shadowTaps:8,atlas:2048,dust:300,allReflections:!0,film:!0}};var St={clip:[.3,40],fog:26},rt=[{id:"hero",act:1,set:"desk",subject:{radius:.62,center:[0,.1,-.4]},pose:{lens:24,elevation:-15,portrait:{elevation:-28},pushIn:.15,...St},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:30},{id:"drop",act:1,set:"desk",idleHz:0,budget:{draws:12,tris:{L:3e4,M:8e4,H:2e5}},authored(r,s){let a=s.W/s.H,t=s.portrait?20:15.6,c=Math.tan(t*Math.PI/360),p=.24/(s.portrait?.92:.36)/(2*c*a),y=ee.floorY;return[{t:.18,position:[0,-.03,p],elevation:-1,lens:20,clip:[.1,30],fog:26},{t:.48,position:[0,y*.72,p*.96],elevation:-2,lens:20,clip:[.1,30],fog:26},{t:.64,position:[0,.28,.5],elevation:-84,lens:36,clip:[.05,20],fog:20},{t:.84,position:[0,y-.25,.1],elevation:-90,lens:40,clip:[.04,20],fog:16},{t:.93,position:[0,ee.slabBottom+.1,.5],elevation:-90,lens:24,clip:[.05,60],fog:40}]}},{id:"svc.head",act:2,set:"archive",pose:{lens:[24,62],elevation:-90,clip:[.2,90],fog:72},budget:{draws:8,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0,holdKnots:()=>[{t:0,position:[0,ee.slabBottom-.6,1.5],lens:24},{t:1,position:[0,ee.slabBottom-5.2,1.5],lens:62}]},{id:"svc.web",act:2,set:"archive",floor:"first",subject:{radius:1.3,center:[0,0,0]},pose:{lens:32,bearing:12,elevation:-6,drift:[0,-.15,-.5],clip:[.3,80],fog:62},budget:{draws:11,tris:{L:25e3,M:7e4,H:16e4}},idleHz:0,stripYaw:0},{id:"svc.apps",act:2,set:"archive",floor:"locked",subject:{radius:1.1,center:[0,0,0]},pose:{lens:32,bearing:[-12,13],elevation:-4,clip:[.3,80],fog:62},budget:{draws:9,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"svc.api",act:2,set:"archive",floor:"locked",subject:{radius:1.75,center:[0,.35,.3]},pose:{lens:32,bearing:-18,elevation:14,drift:[0,-.2,-.3],clip:[.3,80],fog:60},budget:{draws:14,tris:{L:3e4,M:8e4,H:18e4}},idleHz:0},{id:"svc.rescue",act:2,set:"archive",floor:"locked",subject:{radius:1.2,center:[0,0,0]},pose:{lens:30,bearing:10,elevation:-8,roll:[0,7],clip:[.3,80],fog:58},budget:{draws:12,tris:{L:24e3,M:7e4,H:16e4}},idleHz:0},{id:"svc.ux",act:2,set:"archive",floor:"locked",subject:{radius:1.5,center:[0,0,0]},pose:{lens:28,elevation:0,clip:[.3,80],fog:56},budget:{draws:8,tris:{L:24e3,M:6e4,H:14e4}},idleHz:0},{id:"svc.auto",act:2,set:"archive",floor:"locked",subject:{radius:1.4,center:[0,0,0]},pose:{lens:30,bearing:90,elevation:-3,clip:[.3,80],fog:54},budget:{draws:9,tris:{L:22e3,M:6e4,H:14e4}},idleHz:30},{id:"process.head",act:3,set:"archive",floor:{clear:9},subject:{radius:4,center:[0,0,0]},pose:{lens:50,elevation:-90,shift:[0,0,1.1],clip:[.05,90],fog:70},budget:{draws:10,tris:{L:26e3,M:7e4,H:16e4}},idleHz:0,exitKnots(r,s,a){let t=a.floorY;return[{t:.55,position:[.16,t+3.2,.18],elevation:-90,lens:44,clip:[.05,70],fog:60},{t:.74,position:[.16,t-.9,.12],elevation:-90,lens:44,clip:[.05,70],fog:60}]}},{id:"step.talk",act:3,set:"archive",floor:{clear:5},subject:{radius:1.5,center:[0,.1,0]},pose:{lens:28,bearing:8,elevation:-10,clip:[.2,70],fog:42},budget:{draws:10,tris:{L:25e3,M:7e4,H:16e4}},idleHz:0},{id:"step.scope",act:3,set:"archive",floor:"locked",subject:{radius:1.75,center:[0,0,0]},pose:{lens:28,bearing:-6,elevation:-24,clip:[.2,70],fog:40},budget:{draws:8,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"step.build",act:3,set:"archive",floor:"locked",subject:{radius:1.25,center:[0,0,.3]},pose:{lens:28,bearing:[20,-10],elevation:-8,clip:[.2,70],fog:40},budget:{draws:9,tris:{L:26e3,M:7e4,H:16e4}},idleHz:0},{id:"step.ship",act:3,set:"archive",floor:"locked",subject:{radius:1.6,center:[0,-.2,0]},pose:{lens:28,elevation:[-12,-74],clip:[.2,70],fog:40},budget:{draws:7,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"fall",act:3,set:"none",idleHz:0,budget:{draws:4,tris:{L:3e3,M:6e3,H:12e3}},authored(r){let s=r["step.ship"],a=r["why.q"],t=s.floorY-2,c=a.floorY+a.d+1.6;return[{t:.2,position:[.2,t,.2],elevation:-90,lens:70,clip:[.05,60],fog:44},{t:.86,position:[.05,c+1.2,.06],elevation:-90,lens:70,clip:[.05,40],fog:34}]}},{id:"why.q",act:4,set:"desk",desk:!0,floor:{clear:26},subject:{radius:.85,center:[0,0,-.4]},pose:{lens:40,elevation:-90,...St},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:30},{id:"why.list",act:4,set:"desk",desk:!0,subject:{radius:.8,center:[0,0,-.4]},pose:{lens:40,elevation:-90,...St},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:0},{id:"why.stats",act:4,set:"desk",desk:!0,subject:{radius:.7,center:[0,0,-.4]},pose:{lens:36,elevation:-70,...St},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0},{id:"cta",act:4,set:"desk",desk:!0,subject:{radius:.55,center:[0,0,-.4]},pose:{lens:40,elevation:-90,clip:[.02,12],fog:26},solve(r,s){let{W:a,H:t,portrait:c}=s,l=r.shot.caption,p=r.fov*Math.PI/180,y=Math.tan(p/2)*(a/t),i=.072,n=.148;if(c)r.d=.0775*.965/(2*y),r.ox=0,r.oy=0;else{let u=Math.max((l.w+32)/n,(l.h+32)/i);r.d=a/u/(2*y),r.ox=a/2-(l.x+l.w/2),r.oy=t/2-(l.y+l.h/2)}},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0},{id:"coda",act:4,set:"desk",desk:!0,subject:{radius:.62,center:[0,.1,-.4]},pose:{lens:24,elevation:-15,...St},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0}],Fo={hero:()=>import("./chunk-FQ644PTX.js"),drop:()=>import("./chunk-3JAGEUCC.js"),"svc.head":()=>import("./chunk-33YN23M5.js"),"svc.web":()=>import("./chunk-BU75ANWF.js"),"svc.apps":()=>import("./chunk-SPG4BJQV.js"),"svc.api":()=>import("./chunk-NAYGZMI2.js"),"svc.rescue":()=>import("./chunk-4WBBAYPS.js"),"svc.ux":()=>import("./chunk-2ALBFH2P.js"),"svc.auto":()=>import("./chunk-ZJHTRPCR.js"),"process.head":()=>import("./chunk-QILWQIDR.js"),"step.talk":()=>import("./chunk-6NUKT6FF.js"),"step.scope":()=>import("./chunk-4GXKCHKF.js"),"step.build":()=>import("./chunk-O2FCLXP4.js"),"step.ship":()=>import("./chunk-R65BVCNZ.js"),fall:()=>import("./chunk-DJNW65WT.js"),"why.q":()=>import("./chunk-CQ55MCPA.js"),"why.list":()=>import("./chunk-GCBXT2J2.js"),"why.stats":()=>import("./chunk-PCMLZPEU.js"),cta:()=>import("./chunk-TYQRNBVE.js"),coda:()=>import("./chunk-F3VOJLJZ.js")};var Ye=ee.archiveHalf,lt=ee.galleryH,pe=11.4;function Io(r,s){return r.canvas(512,512,t=>{let c=We(`shelf-${s}`);t.fillStyle=s===0?"#2a2520":"#0a0c11",t.fillRect(0,0,512,512);let l=6,p=512/l;for(let y=0;y<l;y+=1){let i=0;for(;i<512;){let n=8+c()*22,u=p*(.74+c()*.22);if(s===0){let d=c(),v=.5+c()*.5,w=d<.6?[176,136,86]:d<.8?[214,202,170]:d<.92?[96,110,128]:[150,70,60];t.fillStyle=`rgb(${w[0]*v},${w[1]*v},${w[2]*v})`,t.save(),t.translate(i+n/2,p*(y+1)-4),t.rotate(c()>.86?(c()-.5)*.5:0),t.fillRect(-n/2,-u,n-1.5,u),t.fillStyle="rgba(255,255,255,.35)",t.fillRect(-n/2+n*.25,-u*.82,n*.4,u*.2),t.restore()}else{let d=12+c()*10;t.fillStyle=`rgb(${d},${d+2},${d+8})`,t.fillRect(i,p*(y+1)-u-4,n-2,u),c()>.72&&(t.fillStyle=c()>.8?"#a48bff":"#5dffde",t.fillRect(i+n/2-1,p*(y+1)-u,1.5,u-8))}i+=n}t.fillStyle=s===0?"#141210":"#1c2027",t.fillRect(0,p*(y+1)-4,512,4)}},{repeat:!0})}function Ho({programs:r,text:s,q:a,dir:t}){let c=new et;c.name="archive";let l={uTurn:{value:0},uOrderY:{value:new st(ee.slabBottom,-60)},uGalleryH:{value:lt}},p=40,y=new Le(Ye*2,lt*p,4,p),i=y.attributes.uv;for(let z=0;z<i.count;z+=1)i.setXY(z,i.getX(z)*8,i.getY(z)*p);let n=[[0,0,-Ye,0],[0,0,Ye,Math.PI],[-Ye,0,0,Math.PI/2],[Ye,0,0,-Math.PI/2]].map(([z,R,U,X])=>{let x=y.clone();return x.rotateY(X),x.translate(z,R,U),x}),u=Ce(n.map(z=>z.toNonIndexed())),d=Io(s,0);d.anisotropy=8;let v=Io(s,1);v.anisotropy=8;let w=r.paper({atlas:{value:d},ambient:.03,boost:.62,deform:{pars:"uniform float uTurn, uGalleryH; out float vTurn, vLit;",fpars:"uniform sampler2D uShelf2; in float vTurn, vLit;",world:`
        wp.y += floor(uCamY / uGalleryH) * uGalleryH;
        {
          float along = abs(wn.z) > 0.5 ? wp.x : wp.z;
          vTurn = smoothstep(0.0, 1.0, uTurn * 2.2 - (along * uInline / 14.0 * 0.5 + 0.5) - 0.1);
        }
        vLit = uTurn;`,frag:"c = mix(c, texture(uShelf2, vUv).rgb * (vec3(0.42) + vHouse * 0.7), vTurn);",uniforms:{uTurn:l.uTurn,uGalleryH:l.uGalleryH,uShelf2:{value:v}}}}),b=new W(u,w);b.frustumCulled=!1,c.add(b);let C=[.26,.25,.25],h=z=>`wp.y -= floor((iPos.y - uCamY) / ${z.toFixed(2)} + 0.5) * ${z.toFixed(2)};`,A=He(new Me(1,1,1)),M=18,T=[];for(let z=0;z<M;z+=1){let R=-z*lt;for(let[U,X]of[[1,0],[-1,0],[0,1],[0,-1]]){let x=pe*2+6,se=(Ye+pe)/2;T.push({pos:[U*se,R-.1,X*se],scale:U?[Ye-pe,.2,x]:[x,.2,Ye-pe],tint:C}),T.push({pos:[U*pe,R+.95,X*pe],scale:U?[.06,.06,x]:[x,.06,.06],tint:[.55,.52,.48]}),T.push({pos:[U*pe,R+.55,X*pe],scale:U?[.03,.03,x]:[x,.03,.03],tint:[.4,.38,.36]})}}let _=new W(Ae(A,T.length,(z,R)=>{let U=T[z];R.pos=U.pos,R.scale=U.scale,R.tint=U.tint}),r.solid({ambient:.05,defines:{INSTANCED:1},deform:{world:h(lt*M)}}));_.frustumCulled=!1,c.add(_);let te=[];for(let z of[-1,1])for(let R of[-pe,-pe/3,pe/3,pe])te.push([z*pe,R]),te.push([R,z*pe]);let re=new W(Ae(He(new Me(.34,1,.34,1,44,1)),te.length,(z,R)=>{R.pos=[te[z][0],0,te[z][1]],R.scale=[1,180,1],R.tint=[.36,.35,.34]}),r.solid({ambient:.05,defines:{INSTANCED:1},deform:{world:"wp.y += uCamY;"}}));re.frustumCulled=!1,c.add(re);let I=We("archive"),S=Math.max(3,Math.round(a.boxes/460))*lt,k=He(new Me(1,1,.8)),N=k.attributes.normal;for(let z=0;z<N.count;z+=1)N.getZ(z)<-.5&&k.attributes.aColor.setXYZ(z,0,0,0);let K=Ce([k,q(.05,.86,.01,{at:[0,0,-.41],color:[.36,1,.87],mat:2})]),o=a.boxes,P=new W(Ae(K,o,(z,R)=>{let U=z%4,X=(I()*2-1)*(Ye-1),x=-I()*S,se=(I()-.5)*.5,ve=Ye-.3-I()*2.2,j=.5+I()*.5,ye=.55+I()*.4;U===0?(R.pos=[X,x,-ve],Be(0,0,se,R.quat)):U===1?(R.pos=[X,x,ve],Be(0,Math.PI,se,R.quat)):U===2?(R.pos=[-ve,x,X],Be(0,Math.PI/2,se,R.quat)):(R.pos=[ve,x,X],Be(0,-Math.PI/2,se,R.quat)),R.scale=[j,ye,.4];let fe=.62+I()*.38,ge=I();R.tint=ge<.62?[.74*fe,.56*fe,.33*fe]:ge<.86?[.86*fe,.8*fe,.66*fe]:ge<.95?[.38*fe,.44*fe,.52*fe]:[.6*fe,.24*fe,.2*fe],R.seed=I()}),r.solid({ambient:.05,defines:{INSTANCED:1},deform:{pars:"uniform float uTurn; uniform vec2 uOrderY; out float vBack;",local:`
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
            float shift = floor((iPos.y - uCamY) / ${S.toFixed(2)} + 0.5) * ${S.toFixed(2)};
            /* Files sink into the wall at the edges of the wrap, so they never pop. */
            float edge = smoothstep(${(S/2).toFixed(2)}, ${(S*.36).toFixed(2)}, abs(iPos.y - shift - uCamY));
            wp.y -= shift;
            float order = clamp((uOrderY.x - wp.y) / (uOrderY.x - uOrderY.y), 0.0, 1.0);
            if (aColor.a < 1.5) { tint = mix(mix(tint, vec3(0.1, 0.11, 0.13), order * 0.55), vec3(0.075, 0.08, 0.1), vBack); }
            vec3 towardsWall = normalize(vec3(sign(iPos.x) * step(10.0, abs(iPos.x)), 0.0, sign(iPos.z) * step(10.0, abs(iPos.z))) + vec3(0.0001));
            wp += towardsWall * (1.0 - edge) * 2.8;
          }`,uniforms:{uTurn:l.uTurn,uOrderY:l.uOrderY}}}));P.frustumCulled=!1,c.add(P);let Y=new Le(1,1,1,3),E=["ledger","invoice","lines","sheet","memo","receipt"],G=Math.min(180,Math.floor(a.weather*.75)),F=new W(Ae(Y,G,(z,R)=>{let U=z%4,X=(I()*2-1)*(pe-.5),x=-Math.floor(I()*18)*lt+.3;R.pos=U===0?[X,x,-pe]:U===1?[X,x,pe]:U===2?[-pe,x,X]:[pe,x,X],Be(0,U<2?0:Math.PI/2,(I()-.5)*.2,R.quat);let se=.55+I()*.6;R.scale=[se,se*1.42,1],R.cell=s.cell(E[Math.floor(I()*E.length)]);let ve=.75+I()*.25;R.tint=[ve,ve,ve*.95]}),r.paper({ambient:.05,defines:{INSTANCED:1},deform:{world:h(lt*18)}}));F.frustumCulled=!1,c.add(F);let $=new Le(.34,.46),me=new W(Ae($,a.weather,(z,R)=>{R.pos=[(I()*2-1)*10.5,-I()*24,(I()*2-1)*10.5],R.cell=s.cell(E[Math.floor(I()*E.length)]);let U=.78+I()*.22;R.tint=[U,U,U*.95],R.seed=I()}),r.paper({ambient:.08,defines:{INSTANCED:1},deform:{pars:"uniform float uTurn;",local:`{
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
        }`,uniforms:{uTurn:l.uTurn}}}));me.frustumCulled=!1,c.add(me);let oe=o,Z=a.weather;return{group:c,u:l,*build(){yield},setRange(z,R){l.uOrderY.value.set(z,R)},setDensity(z){P.geometry.instanceCount=Math.floor(oe*z),me.geometry.instanceCount=Math.floor(Z*z)},setWeather(z){me.visible=z,F.visible=z}}}var Ft={pars:"in float iClear; uniform float uClear;",world:`
    float clearF = clamp((uClear - iClear - seed * 0.34) / 0.62, 0.0, 1.0);
    if (clearF > 0.0) {
      clearF *= clearF;
      vec3 away = wp - (uLampOrigin + vec3(0.0, 0.0, -0.4));
      away.y = 0.0;
      wp += normalize(away + vec3(0.001)) * clearF * 2.4;
      wp.y += clearF * 0.9 - clearF * clearF * 1.9;
    }`};function os(){let a=document.createElement("canvas");a.width=1024,a.height=512;let t=a.getContext("2d");t.fillStyle="#7b4c2b",t.fillRect(0,0,1024,512);let c=We("walnut");for(let l=0;l<520;l+=1){let p=c()*512,y=c()>.45;t.strokeStyle=y?`rgba(44,22,10,${.05+c()*.2})`:`rgba(180,120,74,${.03+c()*.1})`,t.lineWidth=.5+c()*2.4,t.beginPath(),t.moveTo(0,p);let i=c()*1.2;for(let n=0;n<=1024;n+=48)p+=(c()-.5)*4*i,t.lineTo(n,p);t.stroke()}for(let l=0;l<3;l+=1){let p=c()*1024,y=c()*512;for(let i=8;i<90;i+=5+c()*5)t.strokeStyle=`rgba(40,20,9,${.1+c()*.09})`,t.lineWidth=.8,t.beginPath(),t.ellipse(p,y,i*3.2,i*.8,0,0,Math.PI*2),t.stroke()}return it(a)}function Do({programs:r,shared:s,text:a,q:t,dir:c}){let l=f=>f*c,p=new et;p.name="desk";let y={uClear:{value:0},uRing:{value:0},uRingOn:{value:0}},i=new de(l(.27),.62,-.5),n=[l(-.02),-.38],u=[n[0],n[1]],d=new eo(t.shadowSize,t.shadowSize,{depthTexture:new ao(t.shadowSize,t.shadowSize,jt)});d.depthTexture.compareFunction=Jt,d.depthTexture.minFilter=ht,d.depthTexture.magFilter=ht;let v=new Bt,w={uMap:{value:os()},uShadow:{value:d.depthTexture},uClear:y.uClear,uDawnStripes:{value:1},uAmbient:{value:.045},uShadowTaps:{value:t.shadowTaps},uGloss:{value:1},uRings:{value:[1,0,0,0]},uRingCentreA:{value:[l(-.2),-.21,.046]},uRingCentreB:{value:[l(-.112),-.21,.046]},uTint:{value:[1,1,1]},uLampMatrix:{value:v}},b=new W(new Me(1.6,.045,.8),r.wood({uniforms:w}));b.position.set(0,-.0225,-.4),p.add(b);let C={...w,uTint:{value:[.34,.31,.28]},uGloss:{value:0},uRings:{value:[0,0,0,0]}},h=.5,A=new W(Ce([[0,-h-2.5,10,5],[0,h+2.5,10,5],[-h-2.5,0,5,h*2],[h+2.5,0,5,h*2]].map(([f,g,L,D])=>{let V=new Me(L,.1,D);return V.translate(f,ee.floorY-.05,g),V})),r.wood({uniforms:C}));p.add(A);let M=[l(-.52),0,-.56],T=[l(-.156),0,-.21],_=[l(.66),.88,-.95],te=[l(.31),0,-.64],re=[l(.62),0,-.62],I=[l(.72),.42,-.62],le=[l(.27),.72,-.5],S=[.24,.14,.08],k=Ce([q(.07,.75,.07,{at:[-.74,-.4,-.06],color:S}),q(.07,.75,.07,{at:[.74,-.4,-.06],color:S}),q(.07,.75,.07,{at:[-.74,-.4,-.74],color:S}),q(.07,.75,.07,{at:[.74,-.4,-.74],color:S}),q(1.42,.09,.02,{at:[0,-.1,-.03],color:S}),q(.1,.012,.018,{at:[l(.42),-.1,-.014],color:[.76,.58,.3],mat:1}),q(.1,.012,.018,{at:[l(-.42),-.1,-.014],color:[.76,.58,.3],mat:1}),...yo(_),...vo(re,I,le,c),...xo(T,c),q(.07,.006,.07,{at:[l(-.02),.003,-.7],color:[.25,.25,.27]}),He(new Wt(.002,.003,.17,6),{at:[l(-.02),.09,-.7],color:[.7,.7,.72]})]),N=new W(k,r.solid({ambient:.17,house:0}));p.add(N);let K=new W(Ce([q(12,7,.1,{at:[0,1.6,-1.05],color:[.62,.6,.6]}),q(12,.12,.03,{at:[0,ee.floorY+.06,-.99],color:[.2,.18,.17]}),q(1.62,.04,.04,{at:[l(-.46),1.54,-.97],color:[.55,.52,.5]}),q(1.62,.04,.04,{at:[l(-.46),.5,-.97],color:[.55,.52,.5]}),q(.04,1.08,.04,{at:[l(-1.27),1.02,-.97],color:[.55,.52,.5]}),q(.04,1.08,.04,{at:[l(.35),1.02,-.97],color:[.55,.52,.5]})]),r.solid({ambient:.2,house:0}));p.add(K);let o=new W(Ce(mo(te,c)),N.material),P=Yt([[M[0]-.11*c,.05,M[2]+.03],[M[0]-.17*c,.03,M[2]+.06],[M[0]-.2*c,.012,M[2]+.13],[M[0]-.19*c,.05,M[2]-.03],[M[0]-.13*c,.11,M[2]-.08]],24),Y=r.solid({house:0,deform:ho()}),E=new W(Ce([...wo(M),P]),Y);p.add(o,E);let G={x:M[0],y:.135,z:M[2]-.08},F=new W(go(),Y);F.name="handset",F.position.set(G.x,G.y,G.z),p.add(F);let $=new W(Yt([[0,0,0],[0,-.2,0],[0,-.4,.01],[0,-.6,0]],22,.008),Y);$.visible=!1,p.add($);let me=N.material,oe=new W(q(.012,.095,.004,{at:[0,.042,0],color:[.1,.1,.1]}),me),Z=new W(q(.007,.14,.004,{at:[0,.064,0],color:[.1,.1,.1]}),me);oe.position.set(_[0],_[1],_[2]+.026),Z.position.set(_[0],_[1],_[2]+.03),p.add(oe,Z);let z=l(-.46),R=new W(He(new Le(1.58,1),{at:[z,1.02,-.985],color:[.075,.11,.21],mat:2}),r.solid({house:0,deform:{fpars:"uniform highp float uDawn;",frag:"c = mix(c, mix(vec3(0.365, 1.0, 0.87), vec3(0.643, 0.545, 1.0), clamp((vLampP.x + 0.5) * 0.7, 0.0, 1.0)), uDawn);"}}));p.add(R);let U=q(1.58,.042,.004,{color:[.72,.72,.7]});U.deleteAttribute("uv");let X=new W(Ae(U,24,(f,g)=>{g.pos=[z,.54+(f+.5)*.0405,-.965]}),r.solid({house:0,ambient:.14,defines:{INSTANCED:1},deform:{local:`{
          float a = mix(0.86, 1.32, uDawn);
          float ca = cos(a), sa = sin(a);
          p = vec3(p.x, p.y * ca - p.z * sa, p.y * sa + p.z * ca);
          n = vec3(n.x, n.y * ca - n.z * sa, n.y * sa + n.z * ca);
        }`}}));X.frustumCulled=!1,p.add(X);let x=We("desk"),se=[{x:-.66,z:-.3,h:.34},{x:-.58,z:-.68,h:.44},{x:-.27,z:-.67,h:.27},{x:.66,z:-.22,h:.2},{x:-.36,z:-.28,h:.13},{x:-.14,z:-.7,h:.15},{x:.66,z:-.42,h:.1},{x:-.7,z:-.08,h:.09}],ve=[],j=new Map;for(let f of se){let g=0,L=0,D=0;for(;g<f.h&&ve.length<t.stacks;){let V=.01+x()*.022;L+=(x()-.5)*.012,D+=(x()-.5)*.012,ve.push({x:f.x+L,y:g+V/2,z:f.z+D,h:V,yaw:(x()-.5)*.34}),g+=V}j.set(f,{y:g,x:f.x+L,z:f.z+D})}let ye=new Me(1,1,1);ye.deleteAttribute("uv");let fe=He(ye),ge=new W(Ae(fe,ve.length,(f,g)=>{let L=ve[f];g.pos=[l(L.x),L.y,L.z],Be(0,L.yaw,0,g.quat),g.scale=[.21+x()*.03,L.h,.297+x()*.03];let D=.74+x()*.26;g.tint=x()>.86?[D,D*.84,D*.72]:[D,D,D*.95],g.extra.iClear=2},{iClear:1}),r.solid({house:0,ambient:.13,defines:{INSTANCED:1},deform:Ft}));ge.frustumCulled=!1,p.add(ge);let ue=[{x:.5,z:-.14,n:.3},{x:-.5,z:-.2,n:.3},{x:-.3,z:-.5,n:.26}],J=He(new Me(1,1,1)),_e=[];for(let f of ue){let g=Math.floor(t.dossiers*f.n*.5),L=0;for(let D=0;D<g&&L<.2;D+=1){let V=.016+x()*.014,ce=(x()-.5)*.5,we=.7+x()*.3;_e.push({x:f.x+(x()-.5)*.02,y:L+V/2,z:f.z+(x()-.5)*.02,yaw:ce,sx:.24,sy:V,sz:.33,tint:[.86*we,.7*we,.42*we]}),_e.push({x:f.x,y:L+V+6e-4,z:f.z,yaw:ce,sx:.016,sy:.0015,sz:.335,tint:[.92,.9,.84]}),L+=V}}let he=new W(Ae(J,_e.length,(f,g)=>{let L=_e[f];g.pos=[l(L.x),L.y,L.z],Be(0,L.yaw,0,g.quat),g.scale=[L.sx,L.sy,L.sz],g.tint=L.tint,g.extra.iClear=2},{iClear:1}),r.solid({house:0,ambient:.13,defines:{INSTANCED:1},deform:Ft}));he.frustumCulled=!1,p.add(he);let Ge=new Le(1,1,t.sheetSeg,t.sheetSeg);Ge.rotateX(-Math.PI/2);let ct=["invoice","ledger","quote","receipt","lines","sheet","memo","invoice","carbon","slip"],Re=[],H=Math.min(30,Math.floor(t.sheets*.1));for(let f=0;f<H;f+=1){let g=.36+x()*.46,L=x()*Math.PI*2,D=Math.cos(L)*g*1.08,V=-.4+Math.sin(L)*g*.42;Re.push({x:D,z:V,y:.0012+x()*.012,yaw:x()*6.28,kind:0,clear:x()>.4?0:1})}for(let[f,g]of j){let L=Math.floor(t.sheets*.5/se.length*(.5+f.h*2));for(let D=0;D<L;D+=1)Re.push({x:g.x+(x()-.5)*.06,z:g.z+(x()-.5)*.06,y:g.y+D*.0015,yaw:(x()-.5)*.7,kind:1,clear:2})}let Ue=Math.min(8,Math.floor(t.sheets*.02));for(let f=0;f<Ue;f+=1){let g=f%2===0?1:-1;Re.push({x:g*(.24+x()*.46),z:-.08+x()*.05,y:.002+x()*.004,yaw:(x()-.5)*.3,kind:2,clear:0})}let Ct=Math.max(0,Math.floor(t.sheets*.24));for(let f=0;f<Ct;f+=1){let g=x()*Math.PI*2,L=.7+x()*1.5,D=Math.cos(g)*L*1.2,V=.1+Math.abs(Math.sin(g))*L*.7;Math.hypot(D,V)>.75&&Re.push({x:D,z:V,y:ee.floorY+.002+x()*.004,yaw:x()*6.28,kind:0,clear:2})}for(let f=0;f<8;f+=1)Re.push({x:-.02+(x()-.5)*.015,z:-.7+(x()-.5)*.015,y:.02+f*.012,yaw:x()*6.28,kind:3,clear:2});let ut=r.paper({house:0,ambient:.05,defines:{INSTANCED:1},deform:{pars:`${Ft.pars} in float iCurl;`,local:`
        float cx = uv.x - 0.5, cz = uv.y - 0.5;
        p.y += (cx * cx * 0.03 + cz * cz * 0.05) * iCurl;
        /* A sheet by the edge lifts a little in the draught from the printer. */
        p.y += sin(uTime * 2.6 + seed * 37.0) * 0.0012 * max(iCurl - 0.8, 0.0) * (cz + 0.5);
        n.xz -= vec2(cx * 0.06, cz * 0.1) * iCurl;`,world:Ft.world}}),De=new W(Ae(Ge,Re.length,(f,g)=>{let L=Re[f],D=L.kind===3;g.pos=[l(L.x),L.y,L.z],Be(0,L.yaw,0,g.quat),g.scale=D?[.08,1,.16]:[.21,1,.297];let V=D?"receipt":ct[Math.floor(x()*ct.length)];g.cell=a.cell(V);let ce=.82+x()*.18;g.tint=V==="carbon"?[.98,.72*ce,.72*ce]:V==="slip"?[.99,.9*ce,.62*ce]:[ce,ce,ce*.96],g.extra.iClear=L.clear,g.extra.iCurl=L.kind===2?1.6:.5+x()},{iClear:1,iCurl:1}),ut);De.frustumCulled=!1,p.add(De);let be=new W(new Le(.34,.34),r.glow({color:[1,.74,.46],alpha:.5,defines:{BILLBOARD:1}}));be.position.set(i.x,i.y+.03,i.z),be.frustumCulled=!1,p.add(be);let qe=new W(Ae(new Le(1,1),2,(f,g)=>{g.pos=f===0?[l(.34),.42,-.985]:[l(-.46),.95,-.98],g.scale=f===0?[2.6,1.9,1]:[3.2,2.2,1],g.tint=f===0?[.13,.086,.047]:[.028,.038,.067]}),r.glow({defines:{INSTANCED:1}}));qe.frustumCulled=!1,p.add(qe);let gt=new Wt(.05,.54,.86,26,1,!0),Fe=new W(gt,r.glow({color:[1,.72,.42],alpha:.13,shape:5,deform:{frag:"a = vUv.y * vUv.y; { float f = abs(dot(normalize(vN), normalize(vV))); a *= f * f; }"}}));Fe.frustumCulled=!1,p.add(Fe);let dt=new Le(.009,.009),Qe=new W(Ae(dt,t.dust,(f,g)=>{let L=Math.sqrt(x()),D=x()*Math.PI*2,V=L*.34;g.pos=[i.x+(u[0]-i.x)*L+Math.cos(D)*V,i.y*(1-L)+.04,i.z+(u[1]-i.z)*L+Math.sin(D)*V],g.tint=[1,.82,.6]}),r.glow({alpha:.42,defines:{INSTANCED:1,BILLBOARD:1},deform:{world:"wp += vec3(sin(uTime * 0.21 + seed * 40.0), sin(uTime * 0.17 + seed * 90.0), cos(uTime * 0.19 + seed * 70.0)) * 0.03;"}}));Qe.frustumCulled=!1,p.add(Qe);let Se=i.clone(),Ee=new zt(122,1,.05,2.2),tt=new de(0,0,-1),ze=new de,ot={x:0,y:0,z:0},Ze=0,pt=0,Pe=new Bt().set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.4975,0,0,0,1),$e=De.geometry.instanceCount,It=ge.geometry.instanceCount,je=he.geometry.instanceCount,Ke=f=>{oe.rotation.z=-(f%12/12)*Math.PI*2,Z.rotation.z=-(f%1)*Math.PI*2};return Ke(3.2),{group:p,u:y,setClock:Ke,lampPos:Se,pool:n,*build(){yield},setActPositions(f){ot=f},setPhone(f){f.position.set(0,.0043,-.4),f.visible=!1,p.add(f),this.phone=f},setAct(f){f===4?p.position.set(ot.x,ot.y,ot.z):p.position.set(0,0,0)},setSpot(f,g){u[0]=f,u[1]=g},resetSpot(){u[0]=n[0],u[1]=n[1]},setRing(f){Ze=f},setOffHook(f){pt=f},setShadowTaps(f){w.uShadowTaps.value=f},setDensity(f){De.geometry.instanceCount=Math.floor($e*f),ge.geometry.instanceCount=Math.floor(It*f),he.geometry.instanceCount=Math.floor(je*f)},setExtras(f){Qe.visible=f,Fe.visible=f},bakeShadow(f){let g=[b,A,be,Fe,Qe,R,X,K,qe,$];this.phone&&g.push(this.phone);let L=g.map(ae=>ae.visible),D=p.position.clone(),V=y.uClear.value,ce=p.visible;p.visible=!0,g.forEach(ae=>{ae.visible=!1}),p.position.set(0,0,0),this.setClear(0),F.position.set(G.x,G.y,G.z),F.rotation.set(0,0,0),F.visible=!0,p.updateMatrixWorld(!0),s.uLampOrigin.value.set(0,0,0),Ee.position.copy(Se),Ee.up.copy(tt),Ee.lookAt(l(-.02),0,-.38),Ee.updateMatrixWorld(),Ee.updateProjectionMatrix();let we=f.getRenderTarget();f.setRenderTarget(d),f.clear(),f.render(p,Ee),f.setRenderTarget(we),v.multiplyMatrices(Pe,Ee.projectionMatrix).multiply(Ee.matrixWorldInverse),g.forEach((ae,Ve)=>{ae.visible=L[Ve]}),p.position.copy(D),p.visible=ce,this.setClear(V),p.updateMatrixWorld(!0)},setClear(f){y.uClear.value=f,w.uClear.value=f;let g=(D,V,ce)=>{let we=co((f-V)/.7),ae=we*we;D.position.set(ce*ae*2.2*c,ae*.5-ae*ae*1.6,-ae*.2),D.rotation.z=-ae*1.2*ce*c,D.visible=we<1};g(E,1,-1),g(o,2,1);let L=f>=3;De.visible=!L,ge.visible=!L,he.visible=!L},update(f,g){let L=g%3,D=L<.42||L>.62&&L<1.04?1:0,V=Math.abs(Math.sin(g*37.7))*.006*D*Ze,ce=Math.sin(g*75)*.012*D*Ze,we=at(0,.5,pt),ae=at(.42,1,pt),Ve=G.x+(-.3*c-G.x)*we,xt=G.z+(.1-G.z)*we;F.position.set(Ve+E.position.x,G.y+V-ae*.62+E.position.y,xt+E.position.z),F.rotation.set(ae*1.3,0,we*.9*c+ce+E.rotation.z),F.visible=E.visible,$.visible=ae>.02,$.position.set(Ve,0,xt-.02),$.scale.y=Math.max(.01,ae);let Ht=u[0]+(f.pointer===1?f.px*.2:0),At=u[1]+(f.pointer===1?f.py*.12:0);ze.set(Ht-Se.x,-Se.y,At-Se.z).normalize(),s.uLampDir.value.copy(ze),s.uLampPos.value.copy(Se),s.uLampCone.value.set(.6,.93),Fe.position.set(Se.x+ze.x*.43,Se.y+ze.y*.43,Se.z+ze.z*.43),Fe.quaternion.setFromUnitVectors(ss,ze.negate())}}}var ss=new de(0,1,0);var Mt=new de;function Te(r,s,a,t,c,l){let p=2*Math.PI*c/4,y=Math.max(l-2*c,0),i=Math.PI/4;Mt.copy(s),Mt[t]=0,Mt.normalize();let n=.5*p/(p+y),u=1-Mt.angleTo(r)/i;return Math.sign(Mt[a])===1?u*n:y/(p+y)+n+n*(1-u)}var Lt=class r extends Me{constructor(s=1,a=1,t=1,c=2,l=.1){let p=c*2+1;if(l=Math.min(s/2,a/2,t/2,l),super(1,1,1,p,p,p),this.type="RoundedBoxGeometry",this.parameters={width:s,height:a,depth:t,segments:c,radius:l},p===1)return;let y=this.toNonIndexed();this.index=null,this.attributes.position=y.attributes.position,this.attributes.normal=y.attributes.normal,this.attributes.uv=y.attributes.uv;let i=new de,n=new de,u=new de(s,a,t).divideScalar(2).subScalar(l),d=this.attributes.position.array,v=this.attributes.normal.array,w=this.attributes.uv.array,b=d.length/6,C=new de,h=.5/p;for(let A=0,M=0;A<d.length;A+=3,M+=2)switch(i.fromArray(d,A),n.copy(i),n.x-=Math.sign(n.x)*h,n.y-=Math.sign(n.y)*h,n.z-=Math.sign(n.z)*h,n.normalize(),d[A+0]=u.x*Math.sign(i.x)+n.x*l,d[A+1]=u.y*Math.sign(i.y)+n.y*l,d[A+2]=u.z*Math.sign(i.z)+n.z*l,v[A+0]=n.x,v[A+1]=n.y,v[A+2]=n.z,Math.floor(A/b)){case 0:C.set(1,0,0),w[M+0]=Te(C,n,"z","y",l,t),w[M+1]=1-Te(C,n,"y","z",l,a);break;case 1:C.set(-1,0,0),w[M+0]=1-Te(C,n,"z","y",l,t),w[M+1]=1-Te(C,n,"y","z",l,a);break;case 2:C.set(0,1,0),w[M+0]=1-Te(C,n,"x","z",l,s),w[M+1]=Te(C,n,"z","x",l,t);break;case 3:C.set(0,-1,0),w[M+0]=1-Te(C,n,"x","z",l,s),w[M+1]=1-Te(C,n,"z","x",l,t);break;case 4:C.set(0,0,1),w[M+0]=1-Te(C,n,"x","y",l,s),w[M+1]=1-Te(C,n,"y","x",l,a);break;case 5:C.set(0,0,-1),w[M+0]=Te(C,n,"x","y",l,s),w[M+1]=1-Te(C,n,"y","x",l,a);break}}static fromJSON(s){return new r(s.width,s.height,s.depth,s.segments,s.radius)}};var ns=[.2,.21,.25],as=[.365,1,.87];function Oo({programs:r,text:s,dir:a}){let t=(n,u,d)=>He(new Lt(n,u,d,4,Math.min(d*.45,n*.12)),{color:ns}),c=null;function l({w:n=.78,h:u=1.6,t:d=.09,emissive:v=1}={}){let w=new et,b=new W(Ce([t(n,d,u),q(n*.965,d*.02,n*.012,{at:[0,d/2+.001,-u*.482],color:[.7,.72,.76],mat:1}),q(n*.965,d*.02,n*.012,{at:[0,d/2+.001,u*.482],color:[.7,.72,.76],mat:1}),q(n*.012,d*.02,u*.965,{at:[-n*.482,d/2+.001,0],color:[.7,.72,.76],mat:1}),q(n*.012,d*.02,u*.965,{at:[n*.482,d/2+.001,0],color:[.7,.72,.76],mat:1})]),r.solid({ambient:.32,house:1}));w.add(b);let C=new Le(n*.94,u*.96);C.rotateX(-Math.PI/2),C.translate(0,d/2+.003,0),c??(c=i(360,720,12));let h=r.paper({atlas:{value:c},house:0,ambient:v,defines:{}}),A=new W(C,h);return w.add(A),w.userData={screen:A,screenMaterial:h,w:n,h:u,t:d},w}function p({w:n=.78,h:u=1.6,t:d=.09,color:v=as,alpha:w=.9}={}){let b=new io(new Lt(n,d,u,3,Math.min(d*.45,n*.12)),10);return new so(b,r.wire({color:v,alpha:w}))}function y({w:n=.78,h:u=1.6}={}){let d=We("phone-board"),v=r.solid({ambient:.14,house:1}),w=new W(t(n,.03,u),v),C=[q(n*.88,.016,u*.9,{color:[.05,.3,.2]}),q(n*.68,.03,u*.42,{at:[0,.02,u*.19],color:[.2,.22,.26]})];for(let le=0;le<30;le+=1){let S=.03+d()*.08,k=.03+d()*.09;C.push(q(S,.018,k,{at:[(d()-.5)*n*.74,.016,-u*.28+(d()-.5)*u*.26],color:d()>.7?[.76,.58,.3]:[.1,.1,.12],mat:d()>.7?1:0}))}let h=new W(Ce(C),v),A=Ce([q(n,.05,.05,{at:[0,0,-u/2+.025],color:[.62,.64,.68],mat:1}),q(n,.05,.05,{at:[0,0,u/2-.025],color:[.62,.64,.68],mat:1}),q(.05,.05,u,{at:[-n/2+.025,0,0],color:[.62,.64,.68],mat:1}),q(.05,.05,u,{at:[n/2-.025,0,0],color:[.62,.64,.68],mat:1})]),M=new W(A,v),T=new Le(n*.94,u*.96);T.rotateX(-Math.PI/2);let _=r.paper({atlas:{value:s.texture},cell:[0,0,1,1],house:0,ambient:1}),te=new W(T,_),re=new Me(n*.98,.006,u*.98),I=new W(re,r.glow({color:[.8,.9,1],alpha:.05,shape:5}));return{back:w,board:h,frame:M,display:te,displayMaterial:_,glass:I}}function i(n,u,d,v){return s.canvas(n,u,(w,b,C)=>{if(w.fillStyle="#0b0d13",w.fillRect(0,0,b,C),v){v(w,b,C);return}let h=C/13;for(let A=0;A<d;A+=1){w.fillStyle="rgba(255,255,255,.07)",w.fillRect(b*.06,h*(A+1),b*.88,h*.74),w.fillStyle=A%3===0?"#5dffde":"#a48bff";let M=a<0?b*.78:b*.1;w.fillRect(M,h*(A+1)+h*.16,b*.12,h*.42),w.fillStyle="rgba(232,236,244,.7)",w.fillRect(a<0?b*.28:b*.26,h*(A+1)+h*.28,b*.46,h*.16)}})}return{make:l,wire:p,layers:y,listTexture:i}}var ke=4200,No=.12,is=.6,rs=.03;function Bo({programs:r,shared:s,printTexture:a,dir:t}){let c=new nt(new Float32Array(ke*2*3),3).setUsage(yt),l=new nt(new Float32Array(ke*2*3),3).setUsage(yt),p=new nt(new Float32Array(ke*2),1),y=new nt(new Float32Array(ke*2),1).setUsage(yt),i=new nt(new Float32Array(ke*2),1).setUsage(yt),n=new Uint32Array((ke-1)*6);for(let k=0;k<ke;k+=1)if(p.array[k*2]=-1,p.array[k*2+1]=1,k<ke-1){let N=k*2;n.set([N,N+1,N+2,N+1,N+3,N+2],k*6)}let u=new oo;u.setAttribute("position",c),u.setAttribute("aAcross",l),u.setAttribute("aSide",p),u.setAttribute("aS",y),u.setAttribute("aW",i),u.setIndex(new nt(n,1));let d={uFeed:{value:0},uLine:{value:1e6},uLineLen:{value:4},uJamA:{value:0},uJamB:{value:0},uJamK:{value:0},uFlutter:{value:1},uWide:{value:1e6},uPrint:{value:a},uPrintRange:{value:0},uPaperGlow:{value:.22},uLineColor:{value:[.365,1,.87]}},v=r.strip({uniforms:d,side:2}),w=new W(u,v);w.frustumCulled=!1;let b=new W(u,r.glow({color:[.365,1,.87],alpha:.5,shape:5,house:0,deform:{pars:"in vec3 aAcross; in float aSide, aS, aW; uniform float uLine, uLineLen; out float vSide, vAlive;",fpars:"in float vSide, vAlive;",local:`{
          float z = max(-(viewMatrix * vec4(p, 1.0)).z, 0.05);
          p += aAcross * aSide * min(max(aW * 5.0, 0.16), z * 0.02);
        }`,world:"vSide = aSide; vAlive = smoothstep(uLine + uLineLen * 0.7, uLine + uLineLen, aS);",frag:"a = (1.0 - abs(vSide)); a = a * a * vAlive;",uniforms:{uLine:d.uLine,uLineLen:d.uLineLen}}}));b.frustumCulled=!1;let C=new Float32Array(ke),h=new Float32Array(ke),A=0,M=0,T=0,_=(k,N,K,o,P,Y,E,G)=>{if(A>=ke)return;let F=A*2;c.setXYZ(F,k,N,K),c.setXYZ(F+1,k,N,K),l.setXYZ(F,o,P,Y),l.setXYZ(F+1,o,P,Y),y.setX(F,E),y.setX(F+1,E),i.setX(F,G),i.setX(F+1,G),C[A]=E,h[A]=N,A+=1};function te({yaws:k,lineStartY:N,endY:K,dense:o}){A=0;let P=0,Y=.31*t,E=[[Y,.11,-.5],[Y,.085,-.43],[Y*.92,.012,-.34],[Y*.62,.003,-.24],[Y*.22,.003,-.11],[0,.003,-.025],[0,-.004,.008],[0,-.03,.012]],G=24,F=E[0];for(let oe=0;oe<E.length-1;oe+=1){let Z=E[Math.max(0,oe-1)],z=E[oe],R=E[oe+1],U=E[Math.min(E.length-1,oe+2)];for(let X=oe===0?0:1;X<=G;X+=1){let x=X/G,se=x*x,ve=se*x,j=[0,1,2].map(J=>.5*(2*z[J]+(R[J]-Z[J])*x+(2*Z[J]-5*z[J]+4*R[J]-U[J])*se+(3*z[J]-Z[J]-3*R[J]+U[J])*ve)),ye=j[0]-F[0],fe=j[1]-F[1],ge=j[2]-F[2];P+=Math.hypot(ye,fe,ge);let ue=Math.hypot(ye,ge)||1;_(j[0],j[1],j[2],ge/ue||1,0,-ye/ue||0,P,No),F=j}}M=P,T=F[1];let $=F[1],me=0;for(;$>K&&A<ke;){let oe=.22;$>ee.slabBottom-.5&&(oe=.05);for(let se of o)$<se.a&&$>se.b&&(oe=.022);for($-=oe,P+=oe;me<k.length-1&&$<k[me+1].y;)me+=1;let Z=k[me],z=k[Math.min(me+1,k.length-1)],R=z===Z?0:at(.25,.75,(Z.y-$)/Math.max(.001,Z.y-z.y)),U=Pt(Z.yaw,z.yaw,R)*Math.PI/180,X=at(ee.floorY-.2,ee.slabBottom+.2,$),x=Pt(No,is,X);$<N&&(x=Pt(x,rs,at(0,4,N-$))),_(0,$,0,Math.cos(U),0,Math.sin(U),P,x)}c.needsUpdate=!0,l.needsUpdate=!0,y.needsUpdate=!0,i.needsUpdate=!0,d.uLine.value=re(N),d.uPrintRange.value=re(ee.floorY-.1),d.uWide.value=re(ee.deskY)}function re(k){return M+(T-k)}function I(k){let N=0,K=A-1;for(;N<K;){let o=N+K>>1;C[o]<k?N=o+1:K=o}return N}let le=-1/0;function S(k,N){let K=k+N,o=K>T?0:I(re(K)),P=I(re(Math.max(k-N,le))),Y=Math.max(0,P-o)*6;u.setDrawRange(o*6,Y)}return{mesh:w,halo:b,u:d,rebuild:te,focus:S,setEnd(k){le=k},sAtY:re,pointAtY(k,N){return N[0]=0,N[1]=k,N[2]=0,N}}}var cs=460812,us=12e3,ds=190,ps=900,fs=()=>new Promise(r=>{window.scheduler?.yield?window.scheduler.yield().then(r):setTimeout(r,0)});async function Ut(r){let s=performance.now();for(;;){if(r.next().done)return;performance.now()-s>4&&(await fs(),s=performance.now())}}async function rn({canvas:r,gl:s,tier:a,forced:t,onFail:c,onOff:l,onOn:p,isFailed:y}){Kt.enabled=!1;let i={...Ro[a],instanceScale:1},n=document.documentElement,u=n.dir==="rtl"?-1:1,d=window.matchMedia("(pointer: coarse)").matches,v=new lo({canvas:r,context:s,antialias:!0});v.outputColorSpace=Xt,v.setClearColor(cs,1),v.sortObjects=!1,v.debug.checkShaderErrors=t,v.info.autoReset=!0;let w=new to,b=new zt(30,1,.1,100);await To(u<0);let C=ko({q:i,dir:u}),h={uTime:{value:0},uInline:{value:u},uCamY:{value:0},uDawn:{value:0},uPower:{value:new st(0,0)},uPowerY:{value:0},uLitY:{value:new st(ee.slabBottom,-120)},uFog:{value:new st(4,40)},uLampOrigin:{value:new de},uLampPos:{value:new de(.5*u,.62,-.62)},uLampDir:{value:new de(0,-1,0)},uLampColor:{value:new de(1,.7,.42)},uLampOn:{value:1},uLampCone:{value:new st(.55,.9)},uAtlas:{value:C.texture}},A=Po(h),M=Bo({programs:A,shared:h,printTexture:C.printTexture,dir:u}),T=Do({programs:A,shared:h,text:C,q:i,dir:u,tier:a}),_=Ho({programs:A,shared:h,text:C,q:i,dir:u,tier:a}),te=Oo({programs:A,shared:h,text:C,dir:u}),re={desk:T,archive:_,strip:M,phone:te};T.setPhone(te.make({w:.0775,h:.16,t:.0085})),w.add(T.group,_.group,M.mesh,M.halo);let I=rt.map((e,m)=>({meta:e,index:m,status:"idle",module:null,group:new et,ctx:null,on:!1,a:0,s:0,e:0,b:0,promise:null})),le=Object.fromEntries(I.map(e=>[e.meta.id,e]));I.forEach(e=>{e.group.visible=!1,w.add(e.group)});let S=null,k=null,N=null,K=1,o=1/0,P=0,Y=0,E=0,G=()=>S.svh*.15,F=bo({inPlace:!d,blur:!d&&a!=="L"});function $(){F.release(),S=Ao(),F.bake(S);let e=uo(S,rt);k=e.solved,K=S.docH,N=po(e.knots,K);let m=k["svc.auto"],B=k["process.head"],O=k["why.q"],ne=rt.filter(Q=>Q.floor&&Q.stripYaw!==void 0).map(Q=>({y:k[Q.id].floorY,yaw:Q.stripYaw}));ne.unshift({y:ee.deskY,yaw:0}),ne.push({y:m.floorY+3,yaw:0},{y:m.floorY+1,yaw:90},{y:m.floorY-3,yaw:90},{y:B.floorY+2,yaw:0}),ne.sort((Q,Ie)=>Ie.y-Q.y),M.rebuild({yaws:ne,lineStartY:m.floorY-1.8,endY:O.floorY+.03,dense:[{a:k["svc.rescue"].floorY+2.4,b:k["svc.rescue"].floorY-2.4}]}),h.uLitY.value.set(ee.slabBottom,B.floorY+4),_.setRange(ee.slabBottom,B.floorY);let ie=S.shots.drop,xe=S.shots.fall;P=ie.pinStart+(ie.pinEnd-ie.pinStart)*.86,o=xe.pinStart+(xe.pinEnd-xe.pinStart)*.5,Y=ie.pinStart+(ie.pinEnd-ie.pinStart)*.8,E=xe.pinStart+(xe.pinEnd-xe.pinStart)*.4;for(let Q of I){let Ie=Q.index,Oe=S.shots[Q.meta.id],Xe=Ie>0?S.shots[rt[Ie-1].id]:null,Ne=Ie<rt.length-1?S.shots[rt[Ie+1].id]:null;Q.a=Xe?Xe.pinEnd:0,Q.s=Oe.pinStart,Q.e=Oe.pinEnd,Q.b=Ne?Ne.pinStart:K;let ft=k[Q.meta.id];Q.group.position.set(0,ft.floorY??0,0),Q.status==="ready"&&Q.module.layout&&Q.module.layout(Q.ctx)}T.setActPositions(k.deskAct4),z()}let me=1,oe=0,Z=null;function z(){let e=S.W,m=S.H,B=i.pixelCap*me,O=Math.min(window.devicePixelRatio||1,Math.sqrt(B/(e*m)));v.setPixelRatio(O),v.setSize(e,m,!1),b.aspect=e/m,Z?.resize(e*O,m*O)}let R=[],U=e=>({tier:a,q:i,dir:u,id:e.meta.id,group:e.group,programs:A,u:h,text:C,sets:re,camera:b,renderer:v,rng:We(e.meta.id),get solved(){return k},get layout(){return S},get self(){return k[e.meta.id]},place(m,{inline:B=0,y:O=0,z:ne=0,yaw:ie=0}={}){return m.position.set(B*u,O,ne),m.rotation.y=ie*u,m},hotspots:{add(m){R.push({...m,runtime:e})}}});async function X(e){if(e.status!=="ready")return e.promise||(e.status="loading",e.promise=(async()=>{try{let B=(await Fo[e.meta.id]()).default;e.ctx=U(e),await Ut(B.build(e.ctx)),await v.compileAsync(e.group,b,w),B.layout&&B.layout(e.ctx),e.module=B,e.status="ready",be=!0}catch(m){console.warn(`shot ${e.meta.id} failed`,m),e.status="failed"}})()),e.promise}function x(e){for(let m=I.length-1;m>=0;m-=1)if(e>=I[m].a)return m;return 0}let se=!1;async function ve(){if(!se){for(se=!0;!(ut||y());){let e=x(H),m=null,B=1/0;for(let O of I)if(O.status==="idle"){let ne=Math.abs(O.index-e);ne<B&&(m=O,B=ne)}if(!m)break;await new Promise(O=>{"requestIdleCallback"in window?window.requestIdleCallback(O,{timeout:200}):setTimeout(O,16)}),await X(m)}se=!1}}let j=new Float32Array(13),ye=new Zt,fe=new de(0,1,0),ge=new de(1,0,0),ue={t:0,enter:0,hold:0,exit:0,y:0,v:0,time:0,dt:0,px:0,py:0,pointer:0},J=So(window.scrollY),_e=Lo(),he=Mo(),Ge=!/[?&]autoplay=0\b/.test(window.location.search),ct=!1,Re=!1,H=J.y,Ue=0,Ct=0,ut=!1,De=null,be=!0,qe=0,gt=performance.now(),Fe=0,dt=performance.now(),Qe=0,Se=0,Ee=0,tt=0,ze=0,ot=0,Ze=!1;function pt(e,m){let B=O=>Math.min(1,Math.max(0,O));ue.t=e.b>e.a?B((H-e.a)/(e.b-e.a)):1,ue.enter=e.s>e.a?B((H-e.a)/(e.s-e.a)):H>=e.s?1:0,ue.hold=e.e>e.s?B((H-e.s)/(e.e-e.s)):H>=e.e?1:0,ue.exit=e.b>e.e?B((H-e.e)/(e.b-e.e)):H>=e.b?1:0,ue.y=H/S.pace,ue.v=J.v,ue.time=qe,ue.dt=m,ue.px=tt,ue.py=ze,ue.pointer=Ee}let Pe=(e,m)=>m>e?Math.min(1,Math.max(0,(H-e)/(m-e))):H>=m?1:0,$e=e=>e*e*(3-2*e);function It(){let e=S.shots["process.head"];_.u.uTurn.value=$e(Pe(e.pinStart,e.pinEnd));let m=S.shots["why.list"],B=S.shots["why.stats"],O=S.shots.cta,ne=Pe(m.pinStart,m.pinEnd)*3.2;T.setClear(ne);let ie=$e(Pe(m.pinStart+(m.pinEnd-m.pinStart)*.45,O.pinStart));h.uDawn.value=ie,T.setClock(3.2+$e(Pe(m.pinStart,B.pinEnd))*3.8);let xe=S.shots.hero;if(H<o){let Oe=S.shots.drop.pinEnd-xe.pinEnd;T.setRing(1-Pe(xe.pinEnd,xe.pinEnd+Oe*.14)),T.setOffHook($e(Pe(xe.pinEnd,xe.pinEnd+Oe*.22)))}else T.setRing(1-Pe(m.pinStart,m.pinStart+(m.pinEnd-m.pinStart)*.5)),T.setOffHook(0);let Q=T.phone;if(Q.visible=H>o,M.setEnd(-1/0),H>o){let Oe=S.shots["why.q"],Xe=k["why.q"].d*.62,Ne=$e(Pe(S.shots.fall.pinEnd-(S.shots.fall.pinEnd-o)*.2,Oe.pinEnd)),ft=$e(Pe(m.pinStart,m.pinStart+(m.pinEnd-m.pinStart)*.14)),Et=Xe+(.42-Xe)*Ne,qt=Et+(.0043-Et)*ft;Q.position.y=qt;let Wo=2.1+(1-2.1)*Ne;Q.scale.setScalar(Wo),Q.rotation.y=S.portrait?0:Math.PI/2*$e(Pe(B.pinEnd,O.pinStart)),M.setEnd(T.group.position.y+qt+.01)}let Ie=I.find(Oe=>Oe.meta.id==="svc.rescue");(H<Ie.a||H>Ie.b)&&(h.uPower.value.set(0,0),M.u.uJamK.value=0)}function je(e){fo(N,K,H,j),b.position.set(j[0],j[1],j[2]),b.quaternion.set(j[3],j[4],j[5],j[6]),Ee===1&&(ye.setFromAxisAngle(fe,-tt*.012),b.quaternion.multiply(ye),ye.setFromAxisAngle(ge,ze*.009),b.quaternion.multiply(ye)),b.fov=j[7],b.near=j[8],b.far=j[9],b.setViewOffset(S.W,S.H,j[11],j[12],S.W,S.H),h.uTime.value=qe,h.uCamY.value=j[1],h.uFog.value.set(j[10]*.16,j[10]),It();let m=H<P||H>o,B=H>o?4:1;T.group.visible=m,T.setAct(B),_.group.visible=H>Y&&H<E,h.uLampOn.value=m?1-h.uDawn.value*.72:0,h.uLampOrigin.value.copy(T.group.position),h.uLampColor.value.set(1,.7,.42),M.u.uFeed.value=H*18e-5/S.pace,pt(I[0],e),m&&(T.resetSpot(),T.update(ue,qe));for(let O of I){let ne=H>=O.a-G()&&H<=O.b+G();O.status==="ready"&&(ne||O.on)&&(pt(O,e),O.module.update(ue,O.ctx),O.on=ne,O.group.visible=ne)}M.focus(j[1],j[9]),b.updateProjectionMatrix(),b.updateMatrixWorld(),Z?Z.render(w,b):v.render(w,b)}let Ke=new kt({onChange(e,m){f(m)}});function f(e){if(e==="pixel-85"||e==="pixel-72")oe=e==="pixel-85"?.85:.72;else if(e==="drop-film")Z?.dispose(),Z=null;else if(e==="instances-70"||e==="instances-50")i.instanceScale=e==="instances-70"?.7:.5,T.setDensity(i.instanceScale),_.setDensity(i.instanceScale);else if(e==="shadow-1")T.setShadowTaps(1);else if(e==="extras-off")_.setWeather(!1),T.setExtras(!1);else if(e==="cadence-30")ot=33.3;else if(e==="stills"){try{window.localStorage.setItem("enjaz:tier",`S:${Date.now()}`)}catch{}ae(),l("governor")}}let g=document.createElement("button");g.type="button",g.className="film-toggle",g.addEventListener("click",()=>D(!Ge));function L(){let e=u<0?Ge?"\u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A":"\u062A\u0634\u063A\u064A\u0644 \u062A\u0644\u0642\u0627\u0626\u064A":Ge?"Pause autoplay":"Play autoplay";g.classList.toggle("is-paused",!Ge),g.setAttribute("aria-label",e),g.title=e}function D(e){Ge=e,L(),he.wake(),e&&he.go()}function V(){if(!Ge||ct||Re||_e.on||Ue||!document.hasFocus()||document.body.classList.contains("is-nav-open")||!window.getSelection()?.isCollapsed)return!1;let e=document.activeElement;return e===g||!e?.matches(":focus-visible")}function ce(e){if(ut)return;if(window.requestAnimationFrame(ce),document.hidden||Ze||De!==null){gt=e;return}let m=e-gt;gt=e;let B=Math.min(m,100)/1e3;qe+=B;let O=window.scrollY,ne=S.docH-window.innerHeight,ie=he.step(_e.step(O,B,S.svh),B,S.svh,ne,V());ie!==O&&window.scrollTo({top:ie,behavior:"instant"}),F.update(ie,B,he.moving);let xe=ie>=ne-1;xe!==g.hidden&&(g.hidden=xe),!Ue&&Math.abs(ie-H)>6*S.svh&&e>Ct?(Ue=e,n.classList.add("world-dip")):Ue&&e-Ue>=ds&&(J.land(ie,S.svh),Ue=0,Ct=e+ps,n.classList.remove("world-dip"));let Q=Math.abs(ie-J.y)>.25||Math.abs(J.v)>2;H=J.step(ie,B,S.svh),tt+=(Qe-tt)*Math.min(1,B*6),ze+=(Se-ze)*Math.min(1,B*6);let Ie=Math.abs(Qe-tt)>.001||Math.abs(Se-ze)>.001,Xe=I[x(H)].meta.idleHz,Ne=Q||Ie||be;!Ne&&Xe>0&&!(a==="L"&&e-dt>us)&&(Ne=e-Fe>=1e3/Xe-1);let ft=ot||(he.moving&&(d||a==="L")?33.3:0);if(ft&&e-Fe<ft-2&&(Ne=!1),!Ne)return;Q&&(dt=e),oe&&(!Q||he.moving||H>S.shots.fall.pinStart&&H<S.shots.fall.pinEnd)&&(me=oe,oe=0,z()),be=!1;let Et=(e-Fe)/1e3;Fe=e,je(Math.min(Et,.1)),m<250&&(Q||Xe>0)&&Ke.push(m)}function we(){he.wake(),_e.on=!1,Ue=0,n.classList.remove("world-dip")}function ae(){ut=!0,we(),F.release(),g.remove()}window.addEventListener("pointermove",e=>{Ee=e.pointerType==="mouse"?1:2,Qe=e.clientX/window.innerWidth*2-1,Se=e.clientY/window.innerHeight*2-1,dt=performance.now()},{passive:!0}),window.addEventListener("keydown",()=>he.wake(),{passive:!0}),window.addEventListener("pointerdown",()=>{Re=!0,he.wake()},{passive:!0});for(let e of["pointerup","pointercancel"])window.addEventListener(e,()=>Re=!1,{passive:!0});window.addEventListener("touchstart",()=>{ct=!0,he.wake()},{passive:!0});for(let e of["touchend","touchcancel"])window.addEventListener(e,m=>ct=m.touches?.length>0,{passive:!0});let Ve=new de;window.addEventListener("click",e=>{if(!e.target.closest?.("a, button, .shot"))for(let m of R){if(!m.runtime.on)continue;Ve.set(m.center[0],m.center[1],m.center[2]),m.runtime.group.localToWorld(Ve).project(b);let B=(Ve.x*.5+.5)*S.W,O=(.5-Ve.y*.5)*S.H;Math.hypot(B-e.clientX,O-e.clientY)<m.radius&&(m.runtime.module.hit?.(m.id,ue,m.runtime.ctx),be=!0)}},{passive:!0}),window.addEventListener("pageshow",()=>{J.reset(window.scrollY),H=J.y,be=!0});let xt=0;if(r.addEventListener("webglcontextlost",e=>{e.preventDefault(),Ze=!0,we(),xt+=1,l("context-lost")}),r.addEventListener("webglcontextrestored",()=>{xt>1||(Ze=!1,T.bakeShadow(v),p(),$(),J.reset(window.scrollY),H=J.y,be=!0)}),$(),J.reset(window.scrollY),H=J.y,await Ut(T.build()),await Ut(_.build()),await X(le.hero),await X(le.drop),await v.compileAsync(w,b),T.bakeShadow(v),y())return null;if(!t){let e=[],m=new Uint8Array(4);for(let O=0;O<6;O+=1){await new Promise(ie=>window.requestAnimationFrame(ie));let ne=performance.now();je(.016),s.readPixels(0,0,1,1,s.RGBA,s.UNSIGNED_BYTE,m),e.push(performance.now()-ne)}let B=e.slice(2).sort((O,ne)=>O-ne)[1];if(B>40){try{window.localStorage.setItem("enjaz:tier",`S:${Date.now()}`)}catch{}return c("bench"),null}B>20&&(me=.7,i.instanceScale=.7,T.setDensity(.7),_.setDensity(.7),z())}i.film&&(Z=(await import("./chunk-WOIDP7SL.js")).createFilm(v),Z.resize(S.W*v.getPixelRatio(),S.H*v.getPixelRatio())),J.reset(window.scrollY),H=J.y,F.update(H,0),je(.016),n.classList.add("world-on"),L(),document.body.append(g),window.requestAnimationFrame(ce),ve(),window.addEventListener("wheel",e=>{he.wake(),!(e.ctrlKey||ut||Ze||De!==null||document.body.classList.contains("is-nav-open")||Math.abs(e.deltaX)>Math.abs(e.deltaY))&&(e.preventDefault(),_e.input(e.deltaY,e.deltaMode,window.scrollY,S.svh,S.docH-S.svh),dt=performance.now())},{passive:!1});let Ht=Eo(()=>{$(),be=!0});/[?&]hud=1\b/.test(window.location.search)&&import("./chunk-FKFVKEYL.js").then(e=>e.mountHud({renderer:v,governor:Ke,tier:a,q:i,get y(){return H}}));let At={tier:a,renderer:v,governor:Ke,scene:w,stop:ae,get layout(){return S},get solved(){return k},get y(){return H},get playing(){return he.moving},setAutoplay:D,seek(e){return window.scrollTo({top:e,behavior:"instant"}),we(),J.reset(window.scrollY),H=J.y,F.update(H,0),je(.016),H},freeze(e){De=e,qe=e},unfreeze(){De=null},renderOnce(){je(.016)},info(){return je(.016),{calls:v.info.render.calls,triangles:v.info.render.triangles,programs:v.info.programs.length,rung:Ke.rung,y:H}},sceneInfo(){let e=Z;Z=null,je(.016);let m={calls:v.info.render.calls,triangles:v.info.render.triangles};return Z=e,m},feedFrameTimes(e){e.forEach(m=>Ke.push(m))},async loadAll(){await Promise.all(I.map(e=>X(e))),be=!0},status(){return Object.fromEntries(I.map(e=>[e.meta.id,e.status]))},dispose(){ae(),Ht()}};return window.__enjazWorld=At,At}export{rn as start};
