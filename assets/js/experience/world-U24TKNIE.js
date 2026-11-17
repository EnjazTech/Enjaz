/* three.js r187 (c) three.js authors, MIT. ENJAZ film. */
import{a as st,b as po,c as fo,d as ho}from"./chunk-6ETZZDVU.js";import{a as mo,b as vo,c as wo,d as go,e as xo,f as Be,g as yo,h as bo}from"./chunk-2EEOQMQQ.js";import{c as Dt,d as X,f as Pt,g as Wt,h as Tt,i as Yt,j as uo,k as ze,l as oe}from"./chunk-GBHZZ3DY.js";import{A as ao,B as io,C as At,D as Oe,E as ro,J as Ct,N as lo,O as Te,S as co,a as He,c as De,d as Ne,e as fe,f as je,g as Ve,h as Xe,i as Je,j as Ke,k as ye,l as Ze,m as te,n as Qe,o as dt,p as to,q as eo,r as _e,t as Jt,u as oo,v as ee,w as so,x as Y,z as no}from"./chunk-ZD75F7KI.js";import"./chunk-AEJNSRIJ.js";var Wo=[.24,.45],Re=r=>Math.min(1,Math.max(0,r));function Mo({inPlace:r,blur:i}){let a=[],t=null,d=1/0,c=NaN,u=0,v=0;function p(e){e.el.style.opacity="",e.el.style.transform="",e.el.classList.remove("is-gone");for(let h of e.kids)h.style.opacity="",h.style.transform="",h.style.filter=""}function n(e,h,m,f){let l=h<.5;if(l!==e.gone&&(e.gone=l,e.el.classList.toggle("is-gone",l),document.dispatchEvent(new CustomEvent("enjaz:captions"))),h===1&&m===0){p(e);return}e.el.style.opacity=Re(h/.55).toFixed(3),e.el.style.transform=m?`translate3d(0, ${m.toFixed(1)}px, 0)`:"";let x=e.kids.length,g=x>1?Math.min(.14,.5/(x-1)):0,L=1-(x-1)*g;e.kids.forEach((b,P)=>{let O=Re((h-P*g)/L);if(O===1){b.style.opacity="",b.style.transform="",b.style.filter="";return}let K=1-O;b.style.opacity=O.toFixed(3),b.style.transform=`translate3d(0, ${(K*K*K*1.1*(f?-1:1)).toFixed(3)}em, 0)`,i&&(b.style.filter=`blur(${(K*.28).toFixed(3)}em)`)})}return{bake(e){let h=.35*e.svh;a=[];for(let[f,l]of Object.entries(e.shots)){if(!l.caption||l.caption.h>e.svh*.7)continue;let x=document.querySelector(`[data-shot="${f}"] > .shot`);x&&a.push({el:x,kids:[...x.children],a:f==="hero"?-1:l.pinStart-h,s:f==="hero"?-1:l.pinStart,e:l.pinEnd,b:l.pinEnd+h,unpin:l.pinEnd,hero:f==="hero",pin:l.pin??0,h:l.caption.h,shown:-1,shift:0,gone:!1})}let m=.5*e.svh;t=null,d=e.docH-e.svh;for(let f=1;f<a.length;f+=1){let l=a[f-1],x=a[f],g=x.s-l.e;if(!(g<=0)){if(r){let L=Math.min(m,g/2);l.b=l.e+L,x.a=x.s-L}else l.b=l.e+Math.min(m,Math.max(h,g-x.pin));l.hero&&(l.b=l.unpin+g*.18,l.e=Math.min(l.unpin,l.b-h*.6),t=Wo.map(L=>l.unpin+g*L))}}c=NaN},update(e,h){u=e===c?u+h:0,c=e,v=u>.25?Math.min(1,v+h/.4):Math.max(0,v-h/.12);for(let m of a){let f=m.s>m.a?Re((e-m.a)/(m.s-m.a)):1,l=Re((e-m.e)/(m.b-m.e)),x=e>m.a&&e<m.b,g=x?Math.max(Math.min(f,1-l),v):0;m.hero&&x&&l>.3&&(g=Math.min(1-l,1-v));let L=0;r&&x&&(L=f<1?(e-m.s)*.85:l>0?Math.max(0,e-m.unpin)*.85:0),(g!==m.shown||L!==m.shift)&&(m.shown=g,m.shift=L,n(m,g,L,l>0))}},settle(e){if(!a.length||e>=d-2||t&&e>=t[0]&&e<=t[1])return null;let h=null,m=1/0,f=(l,x)=>{let g=Math.min(x,Math.max(l,e));Math.abs(g-e)<m&&(m=Math.abs(g-e),h=g)};for(let l of a){if(l.hero){let g=l.e+(l.b-l.e)*.3;if(e<g)return null;f(0,l.e);continue}let x=r?l.a:l.s-l.h*.5;if(e>x&&e<l.b)return null;f(l.s,l.e)}return t&&f(t[0],t[1]),h===null?null:Math.round(h)},release(){for(let e of a)p(e),e.shown=-1,e.gone=!1}}}var We=["pixel-85","pixel-72","drop-film","instances-70","instances-50","shadow-1","extras-off","cadence-30","stills"];function Ye(r,i){return r[Math.min(r.length-1,Math.floor(r.length*i))]}var ke=class{constructor({onChange:i=()=>{}}={}){this.onChange=i,this.buffer=new Float32Array(90),this.sorted=new Float32Array(90),this.count=0,this.head=0,this.rung=-1,this.elapsed=0,this.overBudget=0,this.underBudget=0,this.cooldown=0,this.climbs=0,this.upWait=240,this.locked=!1,this.refreshCap=!1,this.seen=0,this.belowBail=0,this.p50=0,this.p90=0,this.vsync=16.6}target(){return this.refreshCap?33.3:Math.max(this.vsync,16.6)}push(i){if(this.elapsed+=i,this.elapsed<1e3||i>250||(this.buffer[this.head]=i,this.head=(this.head+1)%90,this.count=Math.min(90,this.count+1),this.seen+=1,this.cooldown=Math.max(0,this.cooldown-i),this.count<90/2))return;this.sorted.set(this.buffer);let a=this.sorted.subarray(0,this.count).sort();this.p50=Ye(a,.5),this.p90=Ye(a,.9),this.vsync=Ye(a.subarray(0,Math.max(1,Math.floor(this.count*.2))),.5),this.seen<=60&&Math.abs(this.p50-33.3)/33.3<.04&&this.p90/this.p50<1.08&&(this.refreshCap=!0);let t=this.target();if(this.p90>t*1.25?(this.overBudget+=1,this.underBudget=0):this.p90<t*.75?(this.underBudget+=1,this.overBudget=0):(this.overBudget=0,this.underBudget=0),this.rung===We.length-2&&this.p50>50){if(this.belowBail+=i,this.belowBail>4e3){this.step(1);return}}else this.belowBail=0;this.cooldown>0||(this.overBudget>=45&&this.rung<We.length-2?(this.underBudgetClimbed&&(this.upWait*=2,this.underBudgetClimbed=!1),this.step(1)):this.underBudget>=this.upWait&&this.rung>=0&&!this.locked&&(this.climbs+=1,this.underBudgetClimbed=!0,this.climbs>=2&&(this.locked=!0),this.step(-1)))}step(i){this.rung+=i,this.overBudget=0,this.underBudget=0,this.cooldown=1500,this.count=0,this.onChange(this.rung,We[this.rung]??"full")}};var be=(r,i,a)=>Math.min(a,Math.max(i,r));var Yo=r=>r*r*(3-2*r);function Ge(){let r=0,i=1,a=null,t=null,d=[],c=[],u=v=>Math.min(8191,Math.max(0,v/i));return{bake({zones:v,down:p=[],up:n=[]},e,h){r=Math.max(1,e),i=r/8191,a=new Float64Array(8192),t=new Float32Array(8192);let m=.45*h;for(let f=0;f<8192;f+=1){let l=f*i,x=1/0;for(let[g,L]of v)x=Math.min(x,l<g?g-l:l>L?l-L:0);t[f]=1+3*Yo(Math.min(1,x/m)),f>0&&(a[f]=a[f-1]+i*2/(t[f-1]+t[f]))}d=p.map(Math.round).sort((f,l)=>f-l),c=n.map(Math.round).sort((f,l)=>l-f)},speed(v){return t?t[Math.round(u(v))]:1},toEffort(v){if(!a)return v;let p=u(v),n=Math.min(8190,Math.floor(p)),e=Math.max(0,v-r)+Math.min(0,v);return a[n]+(a[n+1]-a[n])*(p-n)+e},fromEffort(v){if(!a)return v;let p=a[8191];if(v<=0||v>=p)return v<=0?v:r+(v-p);let n=0,e=8191;for(;e-n>1;){let h=n+e>>1;a[h]<=v?n=h:e=h}return(n+(v-a[n])/(a[e]-a[n]))*i},stop(v,p){return p>v?d.find(n=>n>v+.5&&n<=p)??null:c.find(n=>n<v-.5&&n>=p)??null}}}function So(r=0){return{y:r,v:0,step(i,a,t,d=1){let u=10*a,v=1/(1+u+.48*u*u+.235*u*u*u),p=4.2*Math.min(d,2.5)*t*.2,n=be(this.y-i,-p,p),e=(this.v+10*n)*a;return this.v=(this.v-10*e)*v,this.y=this.y-n+(n+e)*v,Math.abs(this.y-i)<.25&&Math.abs(this.v)<2&&(this.y=i,this.v=0),this.y},reset(i){this.y=i,this.v=0},land(i,a){let t=Math.sign(i-this.y);this.y=i-t*.8*a,this.v=t*4.2*a*.5}}}function Eo(r=Ge()){return{on:!1,at:0,aim:0,written:0,rest:null,input(i,a,t,d,c,u=0){this.on||(this.on=!0,this.at=t,this.aim=t,this.written=t);let p=be(i*(a===1?40:a===2?d:1),-200,200),n=this.rest;if(n&&Math.sign(p)===n.dir&&Math.abs(this.at-n.y)<2){let g=u-n.since;if(g<.35*1e3||g<1.2*1e3&&u-n.last<.14*1e3){n.last=u,this.aim=this.at;return}}this.rest=null;let e=Math.sign(p)===-Math.sign(this.aim-this.at)?this.at:this.aim,h=1.6*d,m=r.toEffort(this.at),f=be(r.toEffort(e)+p,m-h,m+h),l=be(r.fromEffort(f),0,c),x=r.stop(this.at,l);x!==null&&(l=x),this.aim=l},step(i,a,t,d=0){if(!this.on)return i;if(Math.abs(i-this.written)>2)return this.on=!1,this.rest=null,i;let c=r.toEffort(this.at),u=r.fromEffort(c+(r.toEffort(this.aim)-c)*(1-Math.exp(-12*a))),v=3.5*Math.min(r.speed(this.at),2.5)*t*a;if(this.at+=be(u-this.at,-v,v),Math.abs(this.aim-this.at)<.5){let p=Math.sign(this.aim-this.written);this.at=this.aim,this.on=!1,r.stop(this.aim-p*3,this.aim)===this.aim&&(this.rest={y:this.aim,dir:p,since:d,last:d})}return this.written=Math.round(this.at),this.written}}}var Lo=r=>{let i=document.createElement("div");i.style.position="fixed",i.style.top="0",i.style.width="0",i.style.visibility="hidden",i.style.height=`100${r}`,document.body.appendChild(i);let a=i.getBoundingClientRect().height;return i.remove(),a},Me=r=>parseFloat(r)||0;function Ao(){let r=Lo("svh"),i=Lo("lvh"),a=document.documentElement.clientWidth,t=i,d=window.scrollY,c=document.querySelector("[data-nav]"),u=c?c.getBoundingClientRect().height:0,v=document.documentElement.dir==="rtl"?-1:1,p=document.documentElement.scrollHeight,n=getComputedStyle(document.documentElement),e=parseFloat(n.getPropertyValue("--pace"))||1,h=parseFloat(n.getPropertyValue("--pace-gap"))||e,m={};for(let f of document.querySelectorAll("[data-shot]")){let l=f.dataset.shot,x=f.getBoundingClientRect(),g=x.top+d,L=f.querySelector(":scope > .shot"),b={id:l,top:g,height:x.height,caption:null,pinStart:g,pinEnd:g};if(L){let P=L.getBoundingClientRect(),O=getComputedStyle(f),K=getComputedStyle(L),rt=Me(O.paddingBlockEnd);if(l==="hero"){let F=Me(K.insetBlockStart),at=Me(K.marginBlockEnd),E=Me(O.paddingBlockStart);b.pinStart=0,b.pinEnd=Math.max(0,x.height-E-P.height-at),b.caption={x:P.left,y:F,w:P.width,h:P.height}}else{let F=Me(K.insetBlockEnd);b.pinStart=g+P.height+F-r,b.pinEnd=b.pinStart+Math.max(0,x.height-rt-P.height),b.caption={x:P.left,y:r-F-P.height,w:P.width,h:P.height},b.pin=F,b.gap=rt}}m[l]=b}return{W:a,H:t,svh:r,lvh:i,navH:u,docH:p,dir:v,pace:e,paceGap:h,portrait:t>=a,shots:m}}function Co(r){let i=window.matchMedia("(pointer: coarse)").matches,a=document.documentElement.clientWidth,t=document.documentElement.scrollHeight,d=0,c=()=>{window.clearTimeout(d),d=window.setTimeout(r,160)},u=new ResizeObserver(()=>{let v=document.documentElement.clientWidth,p=document.documentElement.scrollHeight;if(v===a&&p===t)return;let n=i&&v===a&&Math.abs(p-t)<200;a=v,t=p,n||c()});return u.observe(document.documentElement),document.fonts?.ready.then(c),document.fonts?.addEventListener?.("loadingdone",c),()=>u.disconnect()}var me=`
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
`,ve=`
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
`,Go=`
${me}
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
}`,Uo=`
${ve}
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
}`,qo=`
${me}
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
}`,$o=`
${ve}
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
}`,jo=`
${me}
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
}`,Vo=`
${ve}
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
}`,Xo=`
${me}
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
}`,Jo=`
${ve}
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
}`,Ko=`
${me}
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
}`,Zo=`
${ve}
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
${me}
in vec3 position;
out float vFog;
//#pars
void main() {
  vec3 p = position;
  //#local
  vec3 wp = (modelMatrix * vec4(p, 1.0)).xyz;
  gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
  vFog = fogAt(wp);
}`,ts=`
${ve}
uniform vec3 uColor;
uniform float uAlpha;
in float vFog;
void main() {
  fragColor = vec4(uColor * uAlpha * (1.0 - clamp(vFog, 0.0, 1.0)), 1.0);
}`;function Po(r,i={}){return r.replace("//#pars",i.pars??"").replace("//#fpars",i.fpars??"").replace("//#local",i.local??"").replace("//#world",i.world??"").replace("//#frag",i.frag??"")}function se(r,{mips:i=!0,repeat:a=!1}={}){let t=new ao(r);return t.colorSpace=Xe,t.generateMipmaps=i,t.minFilter=i?je:fe,t.magFilter=fe,a&&(t.wrapS=Ne,t.wrapT=Ne),t}function es(){let i=document.createElement("canvas");i.width=256*2,i.height=256;let a=i.getContext("2d"),t=(d,c,u)=>{let v=a.createRadialGradient(d+107.52,76.8,5.12,d+128,128,184.32);c.forEach(([n,e])=>v.addColorStop(n,e)),a.fillStyle=v,a.fillRect(d,0,256,256);let p=a.createRadialGradient(d+256*.38,256*.24,0,d+256*.38,256*.24,256*.26);p.addColorStop(0,u),p.addColorStop(1,"rgba(255,255,255,0)"),a.fillStyle=p,a.fillRect(d,0,256,256)};return t(0,[[0,"#bcbcc0"],[.5,"#8c8d92"],[.85,"#55565c"],[1,"#35363c"]],"rgba(255,255,255,.18)"),t(256,[[0,"#f6d58c"],[.45,"#c9963f"],[.8,"#6e4a1c"],[1,"#2c1c0a"]],"rgba(255,244,214,.75)"),se(i,{mips:!1})}function To(r){let i=es(),a=(t,d,c,u,v={})=>{let{deform:p,defines:n,...e}=v;return new lo({name:t,glslVersion:Ze,vertexShader:Po(d,p),fragmentShader:Po(c,p),defines:n??{},uniforms:{...r,...u,...p?.uniforms??{}},...e})};return{matcap:i,solid(t={}){return a("solid",Go,Uo,{uMatcap:{value:i},uEmit:{value:t.emit??[0,0,0]},uAmbient:{value:t.ambient??.06},uHouse:{value:t.house??1}},he(t,["emit","ambient","house"]))},paper(t={}){return a("paper",qo,$o,{uAtlas:t.atlas??r.uAtlas,uCell:{value:t.cell??[0,0,1,1]},uAmbient:{value:t.ambient??.07},uHouse:{value:t.house??1},uLitBoost:{value:t.boost??1}},{side:He,...he(t,["atlas","cell","ambient","house","boost"])})},wood(t={}){return a("wood",jo,Vo,{uHouse:{value:0},...t.uniforms},he(t,["uniforms"]))},strip(t={}){return a("strip",Xo,Jo,{uHouse:{value:1},...t.uniforms},he(t,["uniforms"]))},glow(t={}){return a("glow",Ko,Zo,{uColor:{value:t.color??[1,1,1]},uAlpha:{value:t.alpha??1},uShape:{value:t.shape??0},uRadius:{value:0},uMap:{value:t.map??i},uHouse:{value:t.house??0}},{transparent:!0,depthWrite:!1,blending:De,side:He,...he(t,["color","alpha","shape","map","house"])})},wire(t={}){return a("wire",Qo,ts,{uColor:{value:t.color??[.365,1,.87]},uAlpha:{value:t.alpha??1},uHouse:{value:0}},{transparent:!0,depthWrite:!1,blending:De,...he(t,["color","alpha"])})}}}function he(r,i){let a={};for(let t of Object.keys(r))i.includes(t)||(a[t]=r[t]);return a}var qt=4,os=["invoice","receipt","quote","ledger","sheet","slip","lines","dossier","carbon","memo","tape","blank"],ss=r=>{let i=new Set;for(let a of document.querySelectorAll(r)){let t=a.textContent.trim();t&&t!=="\u2726"&&i.add(t)}return[...i]};async function zo(r){let i=[document.fonts.load('400 20px "IBM Plex Mono"',"#REF! 0123"),document.fonts.load(r?'700 48px "Noto Kufi Arabic"':'700 48px "Space Grotesk"',r?"\u0625\u0646\u062C\u0627\u0632":"ENJAZ")];await Promise.race([Promise.allSettled(i),new Promise(a=>setTimeout(a,1500))])}function Ro({q:r,dir:i}){let a=i<0,t=document.querySelector("main"),d={};try{d=JSON.parse(t?.dataset.atlas??"{}")}catch{d={}}let c=ss(".ticker__track span"),u=[];try{u=JSON.parse(document.querySelector("[data-typewriter]")?.dataset.typewriter??"[]")}catch{u=[]}let v=a?'"Noto Kufi Arabic", system-ui':'"Space Grotesk", system-ui',p='"IBM Plex Mono", monospace',n=new Intl.NumberFormat(a?"ar-EG":"en-US",{useGrouping:!1}),e=r.atlas,h=document.createElement("canvas");h.width=e,h.height=e;let m=h.getContext("2d"),f=e/qt;m.fillStyle="#fff",m.fillRect(0,0,e,e);let l="#23252e",x="#9aa0ad",g=(s,R)=>{let G=s%qt,z=Math.floor(s/qt);m.save(),m.beginPath(),m.rect(G*f,z*f,f,f),m.clip(),m.translate(G*f,z*f),m.scale(f/100,f/134),m.direction=a?"rtl":"ltr",m.textBaseline="alphabetic",R(m),m.restore()},L=s=>a?100-s:s,b=(s,R,G,z=12)=>{s.fillStyle=l,s.font=`700 ${z}px ${v}`,s.textAlign="start",s.fillText(R,L(8),G)},P=(s,R,G=8,z=92,U=x,I=.7)=>{s.fillStyle=U,s.fillRect(G,R,z-G,I)},O=(s,R,G,z,U=0)=>{for(let I=0;I<G;I+=1){let $=34+(I*37+U)%40;s.fillStyle=I%3===0?l:x,s.fillRect(a?92-$:8,R+I*z,$,1.4),s.fillStyle=x,s.fillRect(a?8:80,R+I*z,12,1.4)}};g(0,s=>{b(s,d.invoice??"",20,14),P(s,26),O(s,34,9,7),P(s,104,8,92,l,1),s.fillStyle=l,s.font=`600 9px ${p}`,s.textAlign=a?"left":"right",s.fillText(n.format(4820),a?8:92,116)}),g(1,s=>{b(s,d.receipt??"",18,12),P(s,24),O(s,32,7,6,11),s.fillStyle=l,s.fillRect(30,100,40,12)}),g(2,s=>{b(s,d.quote??"",22,15),P(s,28),O(s,38,6,8,23),s.save(),s.translate(68,104),s.rotate(-.26),s.strokeStyle="#5e4bd8",s.lineWidth=2,s.strokeRect(-23,-9,46,18),s.fillStyle="#5e4bd8",s.font=`700 10px ${v}`,s.textAlign="center",s.fillText(d.paid??"",0,4),s.restore()});let K=(s,R)=>{let G=a?8:16;s.fillStyle="#e6f6ee";for(let z=0;z<18;z+=2)s.fillRect(0,6+z*7,100,7);s.strokeStyle="#a9b7ae",s.lineWidth=.4;for(let z=0;z<=4;z+=1)s.beginPath(),s.moveTo(G+z*19,0),s.lineTo(G+z*19,134),s.stroke();s.font=`400 4.8px ${p}`,s.textAlign="center";for(let z=0;z<18;z+=1){s.fillStyle=x,s.fillText(n.format(z+1),a?96:8,11.5+z*7);for(let U=0;U<4;U+=1){let I=(z*7+U*13)%23,$=n.format(100+I*317);R&&I===4?($="#REF!",s.fillStyle="#c2352b"):(R&&I===9&&($="#####"),s.fillStyle=l),s.fillText($,G+U*19+9.5,11.5+z*7)}}};g(3,s=>{K(s,!1),s.fillStyle="rgba(255,255,255,.92)",s.fillRect(0,0,100,16),b(s,d.ledger??"",12,10)}),g(4,s=>K(s,!0)),g(5,s=>{s.fillStyle="#c2352b",s.fillRect(8,8,84,7),s.fillStyle=l,s.font=`600 9px ${p}`,s.textAlign="center";for(let R=0;R<4;R+=1)s.fillText(n.format(1200+R*417),50,40+R*20)}),g(6,s=>{for(let R=0;R<16;R+=1)P(s,12+R*7.4,6,94,"#b7c2d8",.5);O(s,14,7,7.4,5)}),g(7,s=>{s.fillStyle="#fff",s.fillRect(0,0,100,134),s.fillStyle="#f7efd9",s.fillRect(18,18,64,30),b(s,d.ledger??"",38,11),s.fillStyle="#faf6ea",s.fillRect(0,62,100,5)}),g(8,s=>{b(s,d.invoice??"",20,13),O(s,30,12,6.6,3)}),g(9,s=>{O(s,12,16,7,17)}),g(10,s=>{s.fillStyle=l,s.font=`400 7px ${p}`,s.textAlign="center";for(let R=0;R<12;R+=1)s.fillText(n.format(90+R*233),50,12+R*10.5)});let rt=se(h);rt.anisotropy=4;let F=document.createElement("canvas");F.width=512,F.height=2048;let at=F.getContext("2d");at.fillStyle="#fff",at.fillRect(0,0,512,2048),at.direction=a?"rtl":"ltr",at.textBaseline="middle";let E=a?468:44;at.textAlign="start";let k=[];c.forEach((s,R)=>{k.push({text:s,big:!0}),u[R%Math.max(1,u.length)]&&k.push({text:u[R%u.length],big:!1})});let B=2048/Math.max(1,k.length);k.forEach((s,R)=>{at.fillStyle=s.big?"#1f2a24":"#3d4c44",at.font=s.big?`700 44px ${v}`:`400 25px ${a?v:p}`,at.fillText(s.text,E,B*(R+.5),424)});let Q=se(F);return Q.anisotropy=4,{texture:rt,printTexture:Q,services:c,phrases:u,words:d,display:v,mono:p,digits:s=>n.format(s),cell(s){let R=Math.max(0,os.indexOf(s)),G=R%qt,z=Math.floor(R/qt);return[G/qt,1-(z+1)/qt,1/qt,1/qt]},title(s){return document.querySelector(`[data-shot="${s}"] .card__title, [data-shot="${s}"] .step__title`)?.textContent.trim()??""},canvas(s,R,G,z){let U=document.createElement("canvas");U.width=s,U.height=R;let I=U.getContext("2d");return I.direction=a?"rtl":"ltr",G(I,s,R),se(U,z)}}}var ko={L:{pixelCap:55e4,draws:28,tris:7e4,sheets:420,sheetSeg:2,stacks:180,dossiers:120,boxes:1400,weather:140,uxGrid:[32,45],shadowSize:1024,shadowTaps:1,atlas:512,dust:60,allReflections:!1,film:!1},M:{pixelCap:13e5,draws:45,tris:22e4,sheets:1100,sheetSeg:3,stacks:360,dossiers:240,boxes:3e3,weather:320,uxGrid:[48,68],shadowSize:1024,shadowTaps:4,atlas:1024,dust:150,allReflections:!0,film:!1},H:{pixelCap:28e5,draws:70,tris:6e5,sheets:2400,sheetSeg:4,stacks:720,dossiers:480,boxes:6e3,weather:700,uxGrid:[64,90],shadowSize:2048,shadowTaps:8,atlas:2048,dust:300,allReflections:!0,film:!0}};var Se={clip:[.3,40],fog:26},ne=[{id:"hero",act:1,set:"desk",subject:{radius:.62,center:[0,.1,-.4]},pose:{lens:24,elevation:-15,portrait:{elevation:-28},pushIn:.15,...Se},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:30},{id:"drop",act:1,set:"desk",idleHz:0,budget:{draws:12,tris:{L:3e4,M:8e4,H:2e5}},authored(r,i){let a=i.W/i.H,t=i.portrait?20:15.6,d=Math.tan(t*Math.PI/360),u=.24/(i.portrait?.92:.36)/(2*d*a),v=st.floorY;return[{t:.18,position:[0,-.03,u],elevation:-1,lens:20,clip:[.1,30],fog:26},{t:.48,position:[0,v*.72,u*.96],elevation:-2,lens:20,clip:[.1,30],fog:26},{t:.64,position:[0,.28,.5],elevation:-84,lens:36,clip:[.05,20],fog:20},{t:.84,position:[0,v-.25,.1],elevation:-90,lens:40,clip:[.04,20],fog:16},{t:.93,position:[0,st.slabBottom+.1,.5],elevation:-90,lens:24,clip:[.05,60],fog:40}]}},{id:"svc.head",act:2,set:"archive",pose:{lens:[24,62],elevation:-90,clip:[.2,90],fog:72},budget:{draws:8,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0,holdKnots:()=>[{t:0,position:[0,st.slabBottom-.6,1.5],lens:24},{t:1,position:[0,st.slabBottom-5.2,1.5],lens:62}]},{id:"svc.web",act:2,set:"archive",floor:"first",subject:{radius:1.3,center:[0,0,0]},pose:{lens:32,bearing:12,elevation:-6,drift:[0,-.15,-.5],clip:[.3,80],fog:62},budget:{draws:11,tris:{L:25e3,M:7e4,H:16e4}},idleHz:0,stripYaw:0},{id:"svc.apps",act:2,set:"archive",floor:"locked",subject:{radius:1.1,center:[0,0,0]},pose:{lens:32,bearing:[-12,13],elevation:-4,clip:[.3,80],fog:62},budget:{draws:9,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"svc.api",act:2,set:"archive",floor:"locked",subject:{radius:1.75,center:[0,.35,.3]},pose:{lens:32,bearing:-18,elevation:14,drift:[0,-.2,-.3],clip:[.3,80],fog:60},budget:{draws:14,tris:{L:3e4,M:8e4,H:18e4}},idleHz:0},{id:"svc.rescue",act:2,set:"archive",floor:"locked",subject:{radius:1.2,center:[0,0,0]},pose:{lens:30,bearing:10,elevation:-8,roll:[0,7],clip:[.3,80],fog:58},budget:{draws:12,tris:{L:24e3,M:7e4,H:16e4}},idleHz:0},{id:"svc.ux",act:2,set:"archive",floor:"locked",subject:{radius:1.5,center:[0,0,0]},pose:{lens:28,elevation:0,clip:[.3,80],fog:56},budget:{draws:8,tris:{L:24e3,M:6e4,H:14e4}},idleHz:0},{id:"svc.auto",act:2,set:"archive",floor:"locked",subject:{radius:1.4,center:[0,0,0]},pose:{lens:30,bearing:90,elevation:-3,clip:[.3,80],fog:54},budget:{draws:9,tris:{L:22e3,M:6e4,H:14e4}},idleHz:30},{id:"process.head",act:3,set:"archive",floor:{clear:9},subject:{radius:4,center:[0,0,0]},pose:{lens:50,elevation:-90,shift:[0,0,1.1],clip:[.05,90],fog:70},budget:{draws:10,tris:{L:26e3,M:7e4,H:16e4}},idleHz:0,exitKnots(r,i,a){let t=a.floorY;return[{t:.55,position:[.16,t+3.2,.18],elevation:-90,lens:44,clip:[.05,70],fog:60},{t:.74,position:[.16,t-.9,.12],elevation:-90,lens:44,clip:[.05,70],fog:60}]}},{id:"step.talk",act:3,set:"archive",floor:{clear:5},subject:{radius:1.5,center:[0,.1,0]},pose:{lens:28,bearing:8,elevation:-10,clip:[.2,70],fog:42},budget:{draws:10,tris:{L:25e3,M:7e4,H:16e4}},idleHz:0},{id:"step.scope",act:3,set:"archive",floor:"locked",subject:{radius:1.75,center:[0,0,0]},pose:{lens:28,bearing:-6,elevation:-24,clip:[.2,70],fog:40},budget:{draws:8,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"step.build",act:3,set:"archive",floor:"locked",subject:{radius:1.25,center:[0,0,.3]},pose:{lens:28,bearing:[20,-10],elevation:-8,clip:[.2,70],fog:40},budget:{draws:9,tris:{L:26e3,M:7e4,H:16e4}},idleHz:0},{id:"step.ship",act:3,set:"archive",floor:"locked",subject:{radius:1.6,center:[0,-.2,0]},pose:{lens:28,elevation:[-12,-74],clip:[.2,70],fog:40},budget:{draws:7,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"fall",act:3,set:"none",idleHz:0,budget:{draws:4,tris:{L:3e3,M:6e3,H:12e3}},authored(r){let i=r["step.ship"],a=r["why.q"],t=i.floorY-2,d=a.floorY+a.d+1.6;return[{t:.2,position:[.2,t,.2],elevation:-90,lens:70,clip:[.05,60],fog:44},{t:.86,position:[.05,d+1.2,.06],elevation:-90,lens:70,clip:[.05,40],fog:34}]}},{id:"why.q",act:4,set:"desk",desk:!0,floor:{clear:26},subject:{radius:.85,center:[0,0,-.4]},pose:{lens:40,elevation:-90,...Se},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:30},{id:"why.list",act:4,set:"desk",desk:!0,subject:{radius:.8,center:[0,0,-.4]},pose:{lens:40,elevation:-90,...Se},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:0},{id:"why.stats",act:4,set:"desk",desk:!0,subject:{radius:.7,center:[0,0,-.4]},pose:{lens:36,elevation:-70,...Se},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0},{id:"cta",act:4,set:"desk",desk:!0,subject:{radius:.55,center:[0,0,-.4]},pose:{lens:40,elevation:-90,clip:[.02,12],fog:26},solve(r,i){let{W:a,H:t,portrait:d}=i,c=r.shot.caption,u=r.fov*Math.PI/180,v=Math.tan(u/2)*(a/t),p=.072,n=.148;if(d)r.d=.0775*.965/(2*v),r.ox=0,r.oy=0;else{let e=Math.max((c.w+32)/n,(c.h+32)/p);r.d=a/e/(2*v),r.ox=a/2-(c.x+c.w/2),r.oy=t/2-(c.y+c.h/2)}},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0},{id:"coda",act:4,set:"desk",desk:!0,subject:{radius:.62,center:[0,.1,-.4]},pose:{lens:24,elevation:-15,...Se},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0}],Io={hero:()=>import("./chunk-FQ644PTX.js"),drop:()=>import("./chunk-FL6CESEL.js"),"svc.head":()=>import("./chunk-RSFST4BX.js"),"svc.web":()=>import("./chunk-BU75ANWF.js"),"svc.apps":()=>import("./chunk-SPG4BJQV.js"),"svc.api":()=>import("./chunk-NAYGZMI2.js"),"svc.rescue":()=>import("./chunk-4WBBAYPS.js"),"svc.ux":()=>import("./chunk-2ALBFH2P.js"),"svc.auto":()=>import("./chunk-ZJHTRPCR.js"),"process.head":()=>import("./chunk-QILWQIDR.js"),"step.talk":()=>import("./chunk-6NUKT6FF.js"),"step.scope":()=>import("./chunk-4GXKCHKF.js"),"step.build":()=>import("./chunk-O2FCLXP4.js"),"step.ship":()=>import("./chunk-R65BVCNZ.js"),fall:()=>import("./chunk-DJNW65WT.js"),"why.q":()=>import("./chunk-CQ55MCPA.js"),"why.list":()=>import("./chunk-GCBXT2J2.js"),"why.stats":()=>import("./chunk-PCMLZPEU.js"),cta:()=>import("./chunk-TYQRNBVE.js"),coda:()=>import("./chunk-F3VOJLJZ.js")};var Gt=st.archiveHalf,ae=st.galleryH,pt=11.4;function Fo(r,i){return r.canvas(512,512,t=>{let d=Yt(`shelf-${i}`);t.fillStyle=i===0?"#2a2520":"#0a0c11",t.fillRect(0,0,512,512);let c=6,u=512/c;for(let v=0;v<c;v+=1){let p=0;for(;p<512;){let n=8+d()*22,e=u*(.74+d()*.22);if(i===0){let h=d(),m=.5+d()*.5,f=h<.6?[176,136,86]:h<.8?[214,202,170]:h<.92?[96,110,128]:[150,70,60];t.fillStyle=`rgb(${f[0]*m},${f[1]*m},${f[2]*m})`,t.save(),t.translate(p+n/2,u*(v+1)-4),t.rotate(d()>.86?(d()-.5)*.5:0),t.fillRect(-n/2,-e,n-1.5,e),t.fillStyle="rgba(255,255,255,.35)",t.fillRect(-n/2+n*.25,-e*.82,n*.4,e*.2),t.restore()}else{let h=12+d()*10;t.fillStyle=`rgb(${h},${h+2},${h+8})`,t.fillRect(p,u*(v+1)-e-4,n-2,e),d()>.72&&(t.fillStyle=d()>.8?"#a48bff":"#5dffde",t.fillRect(p+n/2-1,u*(v+1)-e,1.5,e-8))}p+=n}t.fillStyle=i===0?"#141210":"#1c2027",t.fillRect(0,u*(v+1)-4,512,4)}},{repeat:!0})}function Ho({programs:r,text:i,q:a,dir:t}){let d=new Jt;d.name="archive";let c={uTurn:{value:0},uOrderY:{value:new te(st.slabBottom,-60)},uGalleryH:{value:ae}},u=40,v=new Ct(Gt*2,ae*u,4,u),p=v.attributes.uv;for(let T=0;T<p.count;T+=1)p.setXY(T,p.getX(T)*8,p.getY(T)*u);let n=[[0,0,-Gt,0],[0,0,Gt,Math.PI],[-Gt,0,0,Math.PI/2],[Gt,0,0,-Math.PI/2]].map(([T,A,W,J])=>{let S=v.clone();return S.rotateY(J),S.translate(T,A,W),S}),e=Pt(n.map(T=>T.toNonIndexed())),h=Fo(i,0);h.anisotropy=8;let m=Fo(i,1);m.anisotropy=8;let f=r.paper({atlas:{value:h},ambient:.03,boost:.62,deform:{pars:"uniform float uTurn, uGalleryH; out float vTurn, vLit;",fpars:"uniform sampler2D uShelf2; in float vTurn, vLit;",world:`
        wp.y += floor(uCamY / uGalleryH) * uGalleryH;
        {
          float along = abs(wn.z) > 0.5 ? wp.x : wp.z;
          vTurn = smoothstep(0.0, 1.0, uTurn * 2.2 - (along * uInline / 14.0 * 0.5 + 0.5) - 0.1);
        }
        vLit = uTurn;`,frag:"c = mix(c, texture(uShelf2, vUv).rgb * (vec3(0.42) + vHouse * 0.7), vTurn);",uniforms:{uTurn:c.uTurn,uGalleryH:c.uGalleryH,uShelf2:{value:m}}}}),l=new Y(e,f);l.frustumCulled=!1,d.add(l);let x=[.26,.25,.25],g=T=>`wp.y -= floor((iPos.y - uCamY) / ${T.toFixed(2)} + 0.5) * ${T.toFixed(2)};`,L=Dt(new At(1,1,1)),b=18,P=[];for(let T=0;T<b;T+=1){let A=-T*ae;for(let[W,J]of[[1,0],[-1,0],[0,1],[0,-1]]){let S=pt*2+6,tt=(Gt+pt)/2;P.push({pos:[W*tt,A-.1,J*tt],scale:W?[Gt-pt,.2,S]:[S,.2,Gt-pt],tint:x}),P.push({pos:[W*pt,A+.95,J*pt],scale:W?[.06,.06,S]:[S,.06,.06],tint:[.55,.52,.48]}),P.push({pos:[W*pt,A+.55,J*pt],scale:W?[.03,.03,S]:[S,.03,.03],tint:[.4,.38,.36]})}}let O=new Y(Tt(L,P.length,(T,A)=>{let W=P[T];A.pos=W.pos,A.scale=W.scale,A.tint=W.tint}),r.solid({ambient:.05,defines:{INSTANCED:1},deform:{world:g(ae*b)}}));O.frustumCulled=!1,d.add(O);let K=[];for(let T of[-1,1])for(let A of[-pt,-pt/3,pt/3,pt])K.push([T*pt,A]),K.push([A,T*pt]);let rt=new Y(Tt(Dt(new At(.34,1,.34,1,44,1)),K.length,(T,A)=>{A.pos=[K[T][0],0,K[T][1]],A.scale=[1,180,1],A.tint=[.36,.35,.34]}),r.solid({ambient:.05,defines:{INSTANCED:1},deform:{world:"wp.y += uCamY;"}}));rt.frustumCulled=!1,d.add(rt);let F=Yt("archive"),E=Math.max(3,Math.round(a.boxes/460))*ae,k=Dt(new At(1,1,.8)),B=k.attributes.normal;for(let T=0;T<B.count;T+=1)B.getZ(T)<-.5&&k.attributes.aColor.setXYZ(T,0,0,0);let Q=Pt([k,X(.05,.86,.01,{at:[0,0,-.41],color:[.36,1,.87],mat:2})]),s=a.boxes,R=new Y(Tt(Q,s,(T,A)=>{let W=T%4,J=(F()*2-1)*(Gt-1),S=-F()*E,tt=(F()-.5)*.5,ht=Gt-.3-F()*2.2,wt=.5+F()*.5,Nt=.55+F()*.4;W===0?(A.pos=[J,S,-ht],Wt(0,0,tt,A.quat)):W===1?(A.pos=[J,S,ht],Wt(0,Math.PI,tt,A.quat)):W===2?(A.pos=[-ht,S,J],Wt(0,Math.PI/2,tt,A.quat)):(A.pos=[ht,S,J],Wt(0,-Math.PI/2,tt,A.quat)),A.scale=[wt,Nt,.4];let q=.62+F()*.38,mt=F();A.tint=mt<.62?[.74*q,.56*q,.33*q]:mt<.86?[.86*q,.8*q,.66*q]:mt<.95?[.38*q,.44*q,.52*q]:[.6*q,.24*q,.2*q],A.seed=F()}),r.solid({ambient:.05,defines:{INSTANCED:1},deform:{pars:"uniform float uTurn; uniform vec2 uOrderY; out float vBack;",local:`
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
            float shift = floor((iPos.y - uCamY) / ${E.toFixed(2)} + 0.5) * ${E.toFixed(2)};
            /* Files sink into the wall at the edges of the wrap, so they never pop. */
            float edge = smoothstep(${(E/2).toFixed(2)}, ${(E*.36).toFixed(2)}, abs(iPos.y - shift - uCamY));
            wp.y -= shift;
            float order = clamp((uOrderY.x - wp.y) / (uOrderY.x - uOrderY.y), 0.0, 1.0);
            if (aColor.a < 1.5) { tint = mix(mix(tint, vec3(0.1, 0.11, 0.13), order * 0.55), vec3(0.075, 0.08, 0.1), vBack); }
            vec3 towardsWall = normalize(vec3(sign(iPos.x) * step(10.0, abs(iPos.x)), 0.0, sign(iPos.z) * step(10.0, abs(iPos.z))) + vec3(0.0001));
            wp += towardsWall * (1.0 - edge) * 2.8;
          }`,uniforms:{uTurn:c.uTurn,uOrderY:c.uOrderY}}}));R.frustumCulled=!1,d.add(R);let G=new Ct(1,1,1,3),z=["ledger","invoice","lines","sheet","memo","receipt"],U=Math.min(180,Math.floor(a.weather*.75)),I=new Y(Tt(G,U,(T,A)=>{let W=T%4,J=(F()*2-1)*(pt-.5),S=-Math.floor(F()*18)*ae+.3;A.pos=W===0?[J,S,-pt]:W===1?[J,S,pt]:W===2?[-pt,S,J]:[pt,S,J],Wt(0,W<2?0:Math.PI/2,(F()-.5)*.2,A.quat);let tt=.55+F()*.6;A.scale=[tt,tt*1.42,1],A.cell=i.cell(z[Math.floor(F()*z.length)]);let ht=.75+F()*.25;A.tint=[ht,ht,ht*.95]}),r.paper({ambient:.05,defines:{INSTANCED:1},deform:{world:g(ae*18)}}));I.frustumCulled=!1,d.add(I);let $=new Ct(.34,.46),gt=new Y(Tt($,a.weather,(T,A)=>{A.pos=[(F()*2-1)*10.5,-F()*24,(F()*2-1)*10.5],A.cell=i.cell(z[Math.floor(F()*z.length)]);let W=.78+F()*.22;A.tint=[W,W,W*.95],A.seed=F()}),r.paper({ambient:.08,defines:{INSTANCED:1},deform:{pars:"uniform float uTurn;",local:`{
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
        }`,uniforms:{uTurn:c.uTurn}}}));gt.frustumCulled=!1,d.add(gt);let it=s,ft=a.weather;return{group:d,u:c,*build(){yield},setRange(T,A){c.uOrderY.value.set(T,A)},setDensity(T){R.geometry.instanceCount=Math.floor(it*T),gt.geometry.instanceCount=Math.floor(ft*T)},setWeather(T){gt.visible=T,I.visible=T}}}var Ie={pars:"in float iClear; uniform float uClear;",world:`
    float clearF = clamp((uClear - iClear - seed * 0.34) / 0.62, 0.0, 1.0);
    if (clearF > 0.0) {
      clearF *= clearF;
      vec3 away = wp - (uLampOrigin + vec3(0.0, 0.0, -0.4));
      away.y = 0.0;
      wp += normalize(away + vec3(0.001)) * clearF * 2.4;
      wp.y += clearF * 0.9 - clearF * clearF * 1.9;
    }`};function ns(){let a=document.createElement("canvas");a.width=1024,a.height=512;let t=a.getContext("2d");t.fillStyle="#7b4c2b",t.fillRect(0,0,1024,512);let d=Yt("walnut");for(let c=0;c<520;c+=1){let u=d()*512,v=d()>.45;t.strokeStyle=v?`rgba(44,22,10,${.05+d()*.2})`:`rgba(180,120,74,${.03+d()*.1})`,t.lineWidth=.5+d()*2.4,t.beginPath(),t.moveTo(0,u);let p=d()*1.2;for(let n=0;n<=1024;n+=48)u+=(d()-.5)*4*p,t.lineTo(n,u);t.stroke()}for(let c=0;c<3;c+=1){let u=d()*1024,v=d()*512;for(let p=8;p<90;p+=5+d()*5)t.strokeStyle=`rgba(40,20,9,${.1+d()*.09})`,t.lineWidth=.8,t.beginPath(),t.ellipse(u,v,p*3.2,p*.8,0,0,Math.PI*2),t.stroke()}return se(a)}function Do({programs:r,shared:i,text:a,q:t,dir:d}){let c=w=>w*d,u=new Jt;u.name="desk";let v={uClear:{value:0},uRing:{value:0},uRingOn:{value:0}},p=new dt(c(.27),.62,-.5),n=[c(-.02),-.38],e=[n[0],n[1]],h=new eo(t.shadowSize,t.shadowSize,{depthTexture:new io(t.shadowSize,t.shadowSize,Ve)});h.depthTexture.compareFunction=Ke,h.depthTexture.minFilter=fe,h.depthTexture.magFilter=fe;let m=new _e,f={uMap:{value:ns()},uShadow:{value:h.depthTexture},uClear:v.uClear,uDawnStripes:{value:1},uAmbient:{value:.045},uShadowTaps:{value:t.shadowTaps},uGloss:{value:1},uRings:{value:[1,0,0,0]},uRingCentreA:{value:[c(-.2),-.21,.046]},uRingCentreB:{value:[c(-.112),-.21,.046]},uTint:{value:[1,1,1]},uLampMatrix:{value:m}},l=new Y(new At(1.6,.045,.8),r.wood({uniforms:f}));l.position.set(0,-.0225,-.4),u.add(l);let x={...f,uTint:{value:[.34,.31,.28]},uGloss:{value:0},uRings:{value:[0,0,0,0]}},g=.5,L=new Y(Pt([[0,-g-2.5,10,5],[0,g+2.5,10,5],[-g-2.5,0,5,g*2],[g+2.5,0,5,g*2]].map(([w,M,C,_])=>{let j=new At(C,.1,_);return j.translate(w,st.floorY-.05,M),j})),r.wood({uniforms:x}));u.add(L);let b=[c(-.52),0,-.56],P=[c(-.156),0,-.21],O=[c(.66),.88,-.95],K=[c(.31),0,-.64],rt=[c(.62),0,-.62],F=[c(.72),.42,-.62],at=[c(.27),.72,-.5],E=[.24,.14,.08],k=Pt([X(.07,.75,.07,{at:[-.74,-.4,-.06],color:E}),X(.07,.75,.07,{at:[.74,-.4,-.06],color:E}),X(.07,.75,.07,{at:[-.74,-.4,-.74],color:E}),X(.07,.75,.07,{at:[.74,-.4,-.74],color:E}),X(1.42,.09,.02,{at:[0,-.1,-.03],color:E}),X(.1,.012,.018,{at:[c(.42),-.1,-.014],color:[.76,.58,.3],mat:1}),X(.1,.012,.018,{at:[c(-.42),-.1,-.014],color:[.76,.58,.3],mat:1}),...bo(O),...wo(rt,F,at,d),...yo(P,d),X(.07,.006,.07,{at:[c(-.02),.003,-.7],color:[.25,.25,.27]}),Dt(new Oe(.002,.003,.17,6),{at:[c(-.02),.09,-.7],color:[.7,.7,.72]})]),B=new Y(k,r.solid({ambient:.17,house:0}));u.add(B);let Q=new Y(Pt([X(12,7,.1,{at:[0,1.6,-1.05],color:[.62,.6,.6]}),X(12,.12,.03,{at:[0,st.floorY+.06,-.99],color:[.2,.18,.17]}),X(1.62,.04,.04,{at:[c(-.46),1.54,-.97],color:[.55,.52,.5]}),X(1.62,.04,.04,{at:[c(-.46),.5,-.97],color:[.55,.52,.5]}),X(.04,1.08,.04,{at:[c(-1.27),1.02,-.97],color:[.55,.52,.5]}),X(.04,1.08,.04,{at:[c(.35),1.02,-.97],color:[.55,.52,.5]})]),r.solid({ambient:.2,house:0}));u.add(Q);let s=new Y(Pt(vo(K,d)),B.material),R=Be([[b[0]-.11*d,.05,b[2]+.03],[b[0]-.17*d,.03,b[2]+.06],[b[0]-.2*d,.012,b[2]+.13],[b[0]-.19*d,.05,b[2]-.03],[b[0]-.13*d,.11,b[2]-.08]],24),G=r.solid({house:0,deform:mo()}),z=new Y(Pt([...go(b),R]),G);u.add(s,z);let U={x:b[0],y:.135,z:b[2]-.08},I=new Y(xo(),G);I.name="handset",I.position.set(U.x,U.y,U.z),u.add(I);let $=new Y(Be([[0,0,0],[0,-.2,0],[0,-.4,.01],[0,-.6,0]],22,.008),G);$.visible=!1,u.add($);let gt=B.material,it=new Y(X(.012,.095,.004,{at:[0,.042,0],color:[.1,.1,.1]}),gt),ft=new Y(X(.007,.14,.004,{at:[0,.064,0],color:[.1,.1,.1]}),gt);it.position.set(O[0],O[1],O[2]+.026),ft.position.set(O[0],O[1],O[2]+.03),u.add(it,ft);let T=c(-.46),A=new Y(Dt(new Ct(1.58,1),{at:[T,1.02,-.985],color:[.075,.11,.21],mat:2}),r.solid({house:0,deform:{fpars:"uniform highp float uDawn;",frag:"c = mix(c, mix(vec3(0.365, 1.0, 0.87), vec3(0.643, 0.545, 1.0), clamp((vLampP.x + 0.5) * 0.7, 0.0, 1.0)), uDawn);"}}));u.add(A);let W=X(1.58,.042,.004,{color:[.72,.72,.7]});W.deleteAttribute("uv");let J=new Y(Tt(W,24,(w,M)=>{M.pos=[T,.54+(w+.5)*.0405,-.965]}),r.solid({house:0,ambient:.14,defines:{INSTANCED:1},deform:{local:`{
          float a = mix(0.86, 1.32, uDawn);
          float ca = cos(a), sa = sin(a);
          p = vec3(p.x, p.y * ca - p.z * sa, p.y * sa + p.z * ca);
          n = vec3(n.x, n.y * ca - n.z * sa, n.y * sa + n.z * ca);
        }`}}));J.frustumCulled=!1,u.add(J);let S=Yt("desk"),tt=[{x:-.66,z:-.3,h:.34},{x:-.58,z:-.68,h:.44},{x:-.27,z:-.67,h:.27},{x:.66,z:-.22,h:.2},{x:-.36,z:-.28,h:.13},{x:-.14,z:-.7,h:.15},{x:.66,z:-.42,h:.1},{x:-.7,z:-.08,h:.09}],ht=[],wt=new Map;for(let w of tt){let M=0,C=0,_=0;for(;M<w.h&&ht.length<t.stacks;){let j=.01+S()*.022;C+=(S()-.5)*.012,_+=(S()-.5)*.012,ht.push({x:w.x+C,y:M+j/2,z:w.z+_,h:j,yaw:(S()-.5)*.34}),M+=j}wt.set(w,{y:M,x:w.x+C,z:w.z+_})}let Nt=new At(1,1,1);Nt.deleteAttribute("uv");let q=Dt(Nt),mt=new Y(Tt(q,ht.length,(w,M)=>{let C=ht[w];M.pos=[c(C.x),C.y,C.z],Wt(0,C.yaw,0,M.quat),M.scale=[.21+S()*.03,C.h,.297+S()*.03];let _=.74+S()*.26;M.tint=S()>.86?[_,_*.84,_*.72]:[_,_,_*.95],M.extra.iClear=2},{iClear:1}),r.solid({house:0,ambient:.13,defines:{INSTANCED:1},deform:Ie}));mt.frustumCulled=!1,u.add(mt);let ie=[{x:.5,z:-.14,n:.3},{x:-.5,z:-.2,n:.3},{x:-.3,z:-.5,n:.26}],xt=Dt(new At(1,1,1)),ut=[];for(let w of ie){let M=Math.floor(t.dossiers*w.n*.5),C=0;for(let _=0;_<M&&C<.2;_+=1){let j=.016+S()*.014,lt=(S()-.5)*.5,vt=.7+S()*.3;ut.push({x:w.x+(S()-.5)*.02,y:C+j/2,z:w.z+(S()-.5)*.02,yaw:lt,sx:.24,sy:j,sz:.33,tint:[.86*vt,.7*vt,.42*vt]}),ut.push({x:w.x,y:C+j+6e-4,z:w.z,yaw:lt,sx:.016,sy:.0015,sz:.335,tint:[.92,.9,.84]}),C+=j}}let nt=new Y(Tt(xt,ut.length,(w,M)=>{let C=ut[w];M.pos=[c(C.x),C.y,C.z],Wt(0,C.yaw,0,M.quat),M.scale=[C.sx,C.sy,C.sz],M.tint=C.tint,M.extra.iClear=2},{iClear:1}),r.solid({house:0,ambient:.13,defines:{INSTANCED:1},deform:Ie}));nt.frustumCulled=!1,u.add(nt);let $t=new Ct(1,1,t.sheetSeg,t.sheetSeg);$t.rotateX(-Math.PI/2);let D=["invoice","ledger","quote","receipt","lines","sheet","memo","invoice","carbon","slip"],yt=[],Ae=Math.min(30,Math.floor(t.sheets*.1));for(let w=0;w<Ae;w+=1){let M=.36+S()*.46,C=S()*Math.PI*2,_=Math.cos(C)*M*1.08,j=-.4+Math.sin(C)*M*.42;yt.push({x:_,z:j,y:.0012+S()*.012,yaw:S()*6.28,kind:0,clear:S()>.4?0:1})}for(let[w,M]of wt){let C=Math.floor(t.sheets*.5/tt.length*(.5+w.h*2));for(let _=0;_<C;_+=1)yt.push({x:M.x+(S()-.5)*.06,z:M.z+(S()-.5)*.06,y:M.y+_*.0015,yaw:(S()-.5)*.7,kind:1,clear:2})}let re=Math.min(8,Math.floor(t.sheets*.02));for(let w=0;w<re;w+=1){let M=w%2===0?1:-1;yt.push({x:M*(.24+S()*.46),z:-.08+S()*.05,y:.002+S()*.004,yaw:(S()-.5)*.3,kind:2,clear:0})}let le=Math.max(0,Math.floor(t.sheets*.24));for(let w=0;w<le;w+=1){let M=S()*Math.PI*2,C=.7+S()*1.5,_=Math.cos(M)*C*1.2,j=.1+Math.abs(Math.sin(M))*C*.7;Math.hypot(_,j)>.75&&yt.push({x:_,z:j,y:st.floorY+.002+S()*.004,yaw:S()*6.28,kind:0,clear:2})}for(let w=0;w<8;w+=1)yt.push({x:-.02+(S()-.5)*.015,z:-.7+(S()-.5)*.015,y:.02+w*.012,yaw:S()*6.28,kind:3,clear:2});let _t=r.paper({house:0,ambient:.05,defines:{INSTANCED:1},deform:{pars:`${Ie.pars} in float iCurl;`,local:`
        float cx = uv.x - 0.5, cz = uv.y - 0.5;
        p.y += (cx * cx * 0.03 + cz * cz * 0.05) * iCurl;
        /* A sheet by the edge lifts a little in the draught from the printer. */
        p.y += sin(uTime * 2.6 + seed * 37.0) * 0.0012 * max(iCurl - 0.8, 0.0) * (cz + 0.5);
        n.xz -= vec2(cx * 0.06, cz * 0.1) * iCurl;`,world:Ie.world}}),It=new Y(Tt($t,yt.length,(w,M)=>{let C=yt[w],_=C.kind===3;M.pos=[c(C.x),C.y,C.z],Wt(0,C.yaw,0,M.quat),M.scale=_?[.08,1,.16]:[.21,1,.297];let j=_?"receipt":D[Math.floor(S()*D.length)];M.cell=a.cell(j);let lt=.82+S()*.18;M.tint=j==="carbon"?[.98,.72*lt,.72*lt]:j==="slip"?[.99,.9*lt,.62*lt]:[lt,lt,lt*.96],M.extra.iClear=C.clear,M.extra.iCurl=C.kind===2?1.6:.5+S()},{iClear:1,iCurl:1}),_t);It.frustumCulled=!1,u.add(It);let jt=new Y(new Ct(.34,.34),r.glow({color:[1,.74,.46],alpha:.5,defines:{BILLBOARD:1}}));jt.position.set(p.x,p.y+.03,p.z),jt.frustumCulled=!1,u.add(jt);let Vt=new Y(Tt(new Ct(1,1),2,(w,M)=>{M.pos=w===0?[c(.34),.42,-.985]:[c(-.46),.95,-.98],M.scale=w===0?[2.6,1.9,1]:[3.2,2.2,1],M.tint=w===0?[.13,.086,.047]:[.028,.038,.067]}),r.glow({defines:{INSTANCED:1}}));Vt.frustumCulled=!1,u.add(Vt);let ce=new Oe(.05,.54,.86,26,1,!0),Ot=new Y(ce,r.glow({color:[1,.72,.42],alpha:.13,shape:5,deform:{frag:"a = vUv.y * vUv.y; { float f = abs(dot(normalize(vN), normalize(vV))); a *= f * f; }"}}));Ot.frustumCulled=!1,u.add(Ot);let we=new Ct(.009,.009),Xt=new Y(Tt(we,t.dust,(w,M)=>{let C=Math.sqrt(S()),_=S()*Math.PI*2,j=C*.34;M.pos=[p.x+(e[0]-p.x)*C+Math.cos(_)*j,p.y*(1-C)+.04,p.z+(e[1]-p.z)*C+Math.sin(_)*j],M.tint=[1,.82,.6]}),r.glow({alpha:.42,defines:{INSTANCED:1,BILLBOARD:1},deform:{world:"wp += vec3(sin(uTime * 0.21 + seed * 40.0), sin(uTime * 0.17 + seed * 90.0), cos(uTime * 0.19 + seed * 70.0)) * 0.03;"}}));Xt.frustumCulled=!1,u.add(Xt);let bt=p.clone(),Mt=new Te(122,1,.05,2.2),ge=new dt(0,0,-1),Ft=new dt,et={x:0,y:0,z:0},Kt=0,Zt=0,ue=new _e().set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.4975,0,0,0,1),de=It.geometry.instanceCount,Ce=mt.geometry.instanceCount,zt=nt.geometry.instanceCount,Bt=w=>{it.rotation.z=-(w%12/12)*Math.PI*2,ft.rotation.z=-(w%1)*Math.PI*2};return Bt(3.2),{group:u,u:v,setClock:Bt,lampPos:bt,pool:n,*build(){yield},setActPositions(w){et=w},setPhone(w){w.position.set(0,.0043,-.4),w.visible=!1,u.add(w),this.phone=w},setAct(w){w===4?u.position.set(et.x,et.y,et.z):u.position.set(0,0,0)},setSpot(w,M){e[0]=w,e[1]=M},resetSpot(){e[0]=n[0],e[1]=n[1]},setRing(w){Kt=w},setOffHook(w){Zt=w},setShadowTaps(w){f.uShadowTaps.value=w},setDensity(w){It.geometry.instanceCount=Math.floor(de*w),mt.geometry.instanceCount=Math.floor(Ce*w),nt.geometry.instanceCount=Math.floor(zt*w)},setExtras(w){Xt.visible=w,Ot.visible=w},bakeShadow(w){let M=[l,L,jt,Ot,Xt,A,J,Q,Vt,$];this.phone&&M.push(this.phone);let C=M.map(ct=>ct.visible),_=u.position.clone(),j=v.uClear.value,lt=u.visible;u.visible=!0,M.forEach(ct=>{ct.visible=!1}),u.position.set(0,0,0),this.setClear(0),I.position.set(U.x,U.y,U.z),I.rotation.set(0,0,0),I.visible=!0,u.updateMatrixWorld(!0),i.uLampOrigin.value.set(0,0,0),Mt.position.copy(bt),Mt.up.copy(ge),Mt.lookAt(c(-.02),0,-.38),Mt.updateMatrixWorld(),Mt.updateProjectionMatrix();let vt=w.getRenderTarget();w.setRenderTarget(h),w.clear(),w.render(u,Mt),w.setRenderTarget(vt),m.multiplyMatrices(ue,Mt.projectionMatrix).multiply(Mt.matrixWorldInverse),M.forEach((ct,Ut)=>{ct.visible=C[Ut]}),u.position.copy(_),u.visible=lt,this.setClear(j),u.updateMatrixWorld(!0)},setClear(w){v.uClear.value=w,f.uClear.value=w;let M=(_,j,lt)=>{let vt=uo((w-j)/.7),ct=vt*vt;_.position.set(lt*ct*2.2*d,ct*.5-ct*ct*1.6,-ct*.2),_.rotation.z=-ct*1.2*lt*d,_.visible=vt<1};M(z,1,-1),M(s,2,1);let C=w>=3;It.visible=!C,mt.visible=!C,nt.visible=!C},update(w,M){let C=M%3,_=C<.42||C>.62&&C<1.04?1:0,j=Math.abs(Math.sin(M*37.7))*.006*_*Kt,lt=Math.sin(M*75)*.012*_*Kt,vt=oe(0,.5,Zt),ct=oe(.42,1,Zt),Ut=U.x+(-.3*d-U.x)*vt,xe=U.z+(.1-U.z)*vt;I.position.set(Ut+z.position.x,U.y+j-ct*.62+z.position.y,xe+z.position.z),I.rotation.set(ct*1.3,0,vt*.9*d+lt+z.rotation.z),I.visible=z.visible,$.visible=ct>.02,$.position.set(Ut,0,xe-.02),$.scale.y=Math.max(.01,ct);let Fe=e[0]+(w.pointer===1?w.px*.2:0),Pe=e[1]+(w.pointer===1?w.py*.12:0);Ft.set(Fe-bt.x,-bt.y,Pe-bt.z).normalize(),i.uLampDir.value.copy(Ft),i.uLampPos.value.copy(bt),i.uLampCone.value.set(.6,.93),Ot.position.set(bt.x+Ft.x*.43,bt.y+Ft.y*.43,bt.z+Ft.z*.43),Ot.quaternion.setFromUnitVectors(as,Ft.negate())}}}var as=new dt(0,1,0);var Ee=new dt;function Rt(r,i,a,t,d,c){let u=2*Math.PI*d/4,v=Math.max(c-2*d,0),p=Math.PI/4;Ee.copy(i),Ee[t]=0,Ee.normalize();let n=.5*u/(u+v),e=1-Ee.angleTo(r)/p;return Math.sign(Ee[a])===1?e*n:v/(u+v)+n+n*(1-e)}var Le=class r extends At{constructor(i=1,a=1,t=1,d=2,c=.1){let u=d*2+1;if(c=Math.min(i/2,a/2,t/2,c),super(1,1,1,u,u,u),this.type="RoundedBoxGeometry",this.parameters={width:i,height:a,depth:t,segments:d,radius:c},u===1)return;let v=this.toNonIndexed();this.index=null,this.attributes.position=v.attributes.position,this.attributes.normal=v.attributes.normal,this.attributes.uv=v.attributes.uv;let p=new dt,n=new dt,e=new dt(i,a,t).divideScalar(2).subScalar(c),h=this.attributes.position.array,m=this.attributes.normal.array,f=this.attributes.uv.array,l=h.length/6,x=new dt,g=.5/u;for(let L=0,b=0;L<h.length;L+=3,b+=2)switch(p.fromArray(h,L),n.copy(p),n.x-=Math.sign(n.x)*g,n.y-=Math.sign(n.y)*g,n.z-=Math.sign(n.z)*g,n.normalize(),h[L+0]=e.x*Math.sign(p.x)+n.x*c,h[L+1]=e.y*Math.sign(p.y)+n.y*c,h[L+2]=e.z*Math.sign(p.z)+n.z*c,m[L+0]=n.x,m[L+1]=n.y,m[L+2]=n.z,Math.floor(L/l)){case 0:x.set(1,0,0),f[b+0]=Rt(x,n,"z","y",c,t),f[b+1]=1-Rt(x,n,"y","z",c,a);break;case 1:x.set(-1,0,0),f[b+0]=1-Rt(x,n,"z","y",c,t),f[b+1]=1-Rt(x,n,"y","z",c,a);break;case 2:x.set(0,1,0),f[b+0]=1-Rt(x,n,"x","z",c,i),f[b+1]=Rt(x,n,"z","x",c,t);break;case 3:x.set(0,-1,0),f[b+0]=1-Rt(x,n,"x","z",c,i),f[b+1]=1-Rt(x,n,"z","x",c,t);break;case 4:x.set(0,0,1),f[b+0]=1-Rt(x,n,"x","y",c,i),f[b+1]=1-Rt(x,n,"y","x",c,a);break;case 5:x.set(0,0,-1),f[b+0]=Rt(x,n,"x","y",c,i),f[b+1]=1-Rt(x,n,"y","x",c,a);break}}static fromJSON(i){return new r(i.width,i.height,i.depth,i.segments,i.radius)}};var is=[.2,.21,.25],rs=[.365,1,.87];function No({programs:r,text:i,dir:a}){let t=(n,e,h)=>Dt(new Le(n,e,h,4,Math.min(h*.45,n*.12)),{color:is}),d=null;function c({w:n=.78,h:e=1.6,t:h=.09,emissive:m=1}={}){let f=new Jt,l=new Y(Pt([t(n,h,e),X(n*.965,h*.02,n*.012,{at:[0,h/2+.001,-e*.482],color:[.7,.72,.76],mat:1}),X(n*.965,h*.02,n*.012,{at:[0,h/2+.001,e*.482],color:[.7,.72,.76],mat:1}),X(n*.012,h*.02,e*.965,{at:[-n*.482,h/2+.001,0],color:[.7,.72,.76],mat:1}),X(n*.012,h*.02,e*.965,{at:[n*.482,h/2+.001,0],color:[.7,.72,.76],mat:1})]),r.solid({ambient:.32,house:1}));f.add(l);let x=new Ct(n*.94,e*.96);x.rotateX(-Math.PI/2),x.translate(0,h/2+.003,0),d??(d=p(360,720,12));let g=r.paper({atlas:{value:d},house:0,ambient:m,defines:{}}),L=new Y(x,g);return f.add(L),f.userData={screen:L,screenMaterial:g,w:n,h:e,t:h},f}function u({w:n=.78,h:e=1.6,t:h=.09,color:m=rs,alpha:f=.9}={}){let l=new ro(new Le(n,h,e,3,Math.min(h*.45,n*.12)),10);return new no(l,r.wire({color:m,alpha:f}))}function v({w:n=.78,h:e=1.6}={}){let h=Yt("phone-board"),m=r.solid({ambient:.14,house:1}),f=new Y(t(n,.03,e),m),x=[X(n*.88,.016,e*.9,{color:[.05,.3,.2]}),X(n*.68,.03,e*.42,{at:[0,.02,e*.19],color:[.2,.22,.26]})];for(let at=0;at<30;at+=1){let E=.03+h()*.08,k=.03+h()*.09;x.push(X(E,.018,k,{at:[(h()-.5)*n*.74,.016,-e*.28+(h()-.5)*e*.26],color:h()>.7?[.76,.58,.3]:[.1,.1,.12],mat:h()>.7?1:0}))}let g=new Y(Pt(x),m),L=Pt([X(n,.05,.05,{at:[0,0,-e/2+.025],color:[.62,.64,.68],mat:1}),X(n,.05,.05,{at:[0,0,e/2-.025],color:[.62,.64,.68],mat:1}),X(.05,.05,e,{at:[-n/2+.025,0,0],color:[.62,.64,.68],mat:1}),X(.05,.05,e,{at:[n/2-.025,0,0],color:[.62,.64,.68],mat:1})]),b=new Y(L,m),P=new Ct(n*.94,e*.96);P.rotateX(-Math.PI/2);let O=r.paper({atlas:{value:i.texture},cell:[0,0,1,1],house:0,ambient:1}),K=new Y(P,O),rt=new At(n*.98,.006,e*.98),F=new Y(rt,r.glow({color:[.8,.9,1],alpha:.05,shape:5}));return{back:f,board:g,frame:b,display:K,displayMaterial:O,glass:F}}function p(n,e,h,m){return i.canvas(n,e,(f,l,x)=>{if(f.fillStyle="#0b0d13",f.fillRect(0,0,l,x),m){m(f,l,x);return}let g=x/13;for(let L=0;L<h;L+=1){f.fillStyle="rgba(255,255,255,.07)",f.fillRect(l*.06,g*(L+1),l*.88,g*.74),f.fillStyle=L%3===0?"#5dffde":"#a48bff";let b=a<0?l*.78:l*.1;f.fillRect(b,g*(L+1)+g*.16,l*.12,g*.42),f.fillStyle="rgba(232,236,244,.7)",f.fillRect(a<0?l*.28:l*.26,g*(L+1)+g*.28,l*.46,g*.16)}})}return{make:c,wire:u,layers:v,listTexture:p}}var kt=4200,_o=.12,ls=.6,cs=.03;function Oo({programs:r,shared:i,printTexture:a,dir:t}){let d=new ee(new Float32Array(kt*2*3),3).setUsage(ye),c=new ee(new Float32Array(kt*2*3),3).setUsage(ye),u=new ee(new Float32Array(kt*2),1),v=new ee(new Float32Array(kt*2),1).setUsage(ye),p=new ee(new Float32Array(kt*2),1).setUsage(ye),n=new Uint32Array((kt-1)*6);for(let k=0;k<kt;k+=1)if(u.array[k*2]=-1,u.array[k*2+1]=1,k<kt-1){let B=k*2;n.set([B,B+1,B+2,B+1,B+3,B+2],k*6)}let e=new so;e.setAttribute("position",d),e.setAttribute("aAcross",c),e.setAttribute("aSide",u),e.setAttribute("aS",v),e.setAttribute("aW",p),e.setIndex(new ee(n,1));let h={uFeed:{value:0},uLine:{value:1e6},uLineLen:{value:4},uJamA:{value:0},uJamB:{value:0},uJamK:{value:0},uFlutter:{value:1},uWide:{value:1e6},uPrint:{value:a},uPrintRange:{value:0},uPaperGlow:{value:.22},uLineColor:{value:[.365,1,.87]}},m=r.strip({uniforms:h,side:2}),f=new Y(e,m);f.frustumCulled=!1;let l=new Y(e,r.glow({color:[.365,1,.87],alpha:.5,shape:5,house:0,deform:{pars:"in vec3 aAcross; in float aSide, aS, aW; uniform float uLine, uLineLen; out float vSide, vAlive;",fpars:"in float vSide, vAlive;",local:`{
          float z = max(-(viewMatrix * vec4(p, 1.0)).z, 0.05);
          p += aAcross * aSide * min(max(aW * 5.0, 0.16), z * 0.02);
        }`,world:"vSide = aSide; vAlive = smoothstep(uLine + uLineLen * 0.7, uLine + uLineLen, aS);",frag:"a = (1.0 - abs(vSide)); a = a * a * vAlive;",uniforms:{uLine:h.uLine,uLineLen:h.uLineLen}}}));l.frustumCulled=!1;let x=new Float32Array(kt),g=new Float32Array(kt),L=0,b=0,P=0,O=(k,B,Q,s,R,G,z,U)=>{if(L>=kt)return;let I=L*2;d.setXYZ(I,k,B,Q),d.setXYZ(I+1,k,B,Q),c.setXYZ(I,s,R,G),c.setXYZ(I+1,s,R,G),v.setX(I,z),v.setX(I+1,z),p.setX(I,U),p.setX(I+1,U),x[L]=z,g[L]=B,L+=1};function K({yaws:k,lineStartY:B,endY:Q,dense:s}){L=0;let R=0,G=.31*t,z=[[G,.11,-.5],[G,.085,-.43],[G*.92,.012,-.34],[G*.62,.003,-.24],[G*.22,.003,-.11],[0,.003,-.025],[0,-.004,.008],[0,-.03,.012]],U=24,I=z[0];for(let it=0;it<z.length-1;it+=1){let ft=z[Math.max(0,it-1)],T=z[it],A=z[it+1],W=z[Math.min(z.length-1,it+2)];for(let J=it===0?0:1;J<=U;J+=1){let S=J/U,tt=S*S,ht=tt*S,wt=[0,1,2].map(xt=>.5*(2*T[xt]+(A[xt]-ft[xt])*S+(2*ft[xt]-5*T[xt]+4*A[xt]-W[xt])*tt+(3*T[xt]-ft[xt]-3*A[xt]+W[xt])*ht)),Nt=wt[0]-I[0],q=wt[1]-I[1],mt=wt[2]-I[2];R+=Math.hypot(Nt,q,mt);let ie=Math.hypot(Nt,mt)||1;O(wt[0],wt[1],wt[2],mt/ie||1,0,-Nt/ie||0,R,_o),I=wt}}b=R,P=I[1];let $=I[1],gt=0;for(;$>Q&&L<kt;){let it=.22;$>st.slabBottom-.5&&(it=.05);for(let tt of s)$<tt.a&&$>tt.b&&(it=.022);for($-=it,R+=it;gt<k.length-1&&$<k[gt+1].y;)gt+=1;let ft=k[gt],T=k[Math.min(gt+1,k.length-1)],A=T===ft?0:oe(.25,.75,(ft.y-$)/Math.max(.001,ft.y-T.y)),W=ze(ft.yaw,T.yaw,A)*Math.PI/180,J=oe(st.floorY-.2,st.slabBottom+.2,$),S=ze(_o,ls,J);$<B&&(S=ze(S,cs,oe(0,4,B-$))),O(0,$,0,Math.cos(W),0,Math.sin(W),R,S)}d.needsUpdate=!0,c.needsUpdate=!0,v.needsUpdate=!0,p.needsUpdate=!0,h.uLine.value=rt(B),h.uPrintRange.value=rt(st.floorY-.1),h.uWide.value=rt(st.deskY)}function rt(k){return b+(P-k)}function F(k){let B=0,Q=L-1;for(;B<Q;){let s=B+Q>>1;x[s]<k?B=s+1:Q=s}return B}let at=-1/0;function E(k,B){let Q=k+B,s=Q>P?0:F(rt(Q)),R=F(rt(Math.max(k-B,at))),G=Math.max(0,R-s)*6;e.setDrawRange(s*6,G)}return{mesh:f,halo:l,u:h,rebuild:K,focus:E,setEnd(k){at=k},sAtY:rt,pointAtY(k,B){return B[0]=0,B[1]=k,B[2]=0,B}}}var ps=460812,fs=12e3,hs=190,ms=900,vs=.35,ws=5,gs=2,xs=()=>new Promise(r=>{window.scheduler?.yield?window.scheduler.yield().then(r):setTimeout(r,0)});async function Ue(r){let i=performance.now();for(;;){if(r.next().done)return;performance.now()-i>4&&(await xs(),i=performance.now())}}async function fn({canvas:r,gl:i,tier:a,forced:t,onFail:d,onOff:c,onOn:u,isFailed:v}){to.enabled=!1;let p={...ko[a],instanceScale:1},n=document.documentElement,e=n.dir==="rtl"?-1:1,h=window.matchMedia("(pointer: coarse)").matches,m=new co({canvas:r,context:i,antialias:!0});m.outputColorSpace=Je,m.setClearColor(ps,1),m.sortObjects=!1,m.debug.checkShaderErrors=t,m.info.autoReset=!0;let f=new oo,l=new Te(30,1,.1,100);await zo(e<0);let x=Ro({q:p,dir:e}),g={uTime:{value:0},uInline:{value:e},uCamY:{value:0},uDawn:{value:0},uPower:{value:new te(0,0)},uPowerY:{value:0},uLitY:{value:new te(st.slabBottom,-120)},uFog:{value:new te(4,40)},uLampOrigin:{value:new dt},uLampPos:{value:new dt(.5*e,.62,-.62)},uLampDir:{value:new dt(0,-1,0)},uLampColor:{value:new dt(1,.7,.42)},uLampOn:{value:1},uLampCone:{value:new te(.55,.9)},uAtlas:{value:x.texture}},L=To(g),b=Oo({programs:L,shared:g,printTexture:x.printTexture,dir:e}),P=Do({programs:L,shared:g,text:x,q:p,dir:e,tier:a}),O=Ho({programs:L,shared:g,text:x,q:p,dir:e,tier:a}),K=No({programs:L,shared:g,text:x,dir:e}),rt={desk:P,archive:O,strip:b,phone:K};P.setPhone(K.make({w:.0775,h:.16,t:.0085})),f.add(P.group,O.group,b.mesh,b.halo);let F=ne.map((o,y)=>({meta:o,index:y,status:"idle",module:null,group:new Jt,ctx:null,on:!1,a:0,s:0,e:0,b:0,promise:null})),at=Object.fromEntries(F.map(o=>[o.meta.id,o]));F.forEach(o=>{o.group.visible=!1,f.add(o.group)});let E=null,k=null,B=null,Q=1,s=1/0,R=0,G=0,z=0,U=()=>E.svh*.15,I=Mo({inPlace:!h,blur:!h&&a!=="L"}),$=Ge();function gt(o){let y=[],N=[],H=[];for(let[V,ot]of Object.entries(o.shots))ot.caption&&(V==="hero"?y.push([0,ot.pinEnd]):(y.push([ot.pinStart-.35*o.svh,ot.pinEnd]),N.push(ot.pinStart)),H.push(ot.pinEnd));return{zones:y,down:N,up:H}}function it(){I.release(),E=Ao(),I.bake(E),$.bake(gt(E),E.docH,E.svh);let o=po(E,ne);k=o.solved,Q=E.docH,B=fo(o.knots,Q);let y=k["svc.auto"],N=k["process.head"],H=k["why.q"],V=ne.filter(Z=>Z.floor&&Z.stripYaw!==void 0).map(Z=>({y:k[Z.id].floorY,yaw:Z.stripYaw}));V.unshift({y:st.deskY,yaw:0}),V.push({y:y.floorY+3,yaw:0},{y:y.floorY+1,yaw:90},{y:y.floorY-3,yaw:90},{y:N.floorY+2,yaw:0}),V.sort((Z,Lt)=>Lt.y-Z.y),b.rebuild({yaws:V,lineStartY:y.floorY-1.8,endY:H.floorY+.03,dense:[{a:k["svc.rescue"].floorY+2.4,b:k["svc.rescue"].floorY-2.4}]}),g.uLitY.value.set(st.slabBottom,N.floorY+4),O.setRange(st.slabBottom,N.floorY);let ot=E.shots.drop,St=E.shots.fall;R=ot.pinStart+(ot.pinEnd-ot.pinStart)*.86,s=St.pinStart+(St.pinEnd-St.pinStart)*.5,G=ot.pinStart+(ot.pinEnd-ot.pinStart)*.8,z=St.pinStart+(St.pinEnd-St.pinStart)*.4;for(let Z of F){let Lt=Z.index,Et=E.shots[Z.meta.id],Qt=Lt>0?E.shots[ne[Lt-1].id]:null,Ht=Lt<ne.length-1?E.shots[ne[Lt+1].id]:null;Z.a=Qt?Qt.pinEnd:0,Z.s=Et.pinStart,Z.e=Et.pinEnd,Z.b=Ht?Ht.pinStart:Q;let pe=k[Z.meta.id];Z.group.position.set(0,pe.floorY??0,0),Z.status==="ready"&&Z.module.layout&&Z.module.layout(Z.ctx)}P.setActPositions(k.deskAct4),W()}let ft=1,T=0,A=null;function W(){let o=E.W,y=E.H,N=p.pixelCap*ft,H=Math.min(window.devicePixelRatio||1,Math.sqrt(N/(o*y)));m.setPixelRatio(H),m.setSize(o,y,!1),l.aspect=o/y,A?.resize(o*H,y*H)}let J=[],S=o=>({tier:a,q:p,dir:e,id:o.meta.id,group:o.group,programs:L,u:g,text:x,sets:rt,camera:l,renderer:m,rng:Yt(o.meta.id),get solved(){return k},get layout(){return E},get self(){return k[o.meta.id]},place(y,{inline:N=0,y:H=0,z:V=0,yaw:ot=0}={}){return y.position.set(N*e,H,V),y.rotation.y=ot*e,y},hotspots:{add(y){J.push({...y,runtime:o})}}});async function tt(o){if(o.status!=="ready")return o.promise||(o.status="loading",o.promise=(async()=>{try{let N=(await Io[o.meta.id]()).default;o.ctx=S(o),await Ue(N.build(o.ctx)),await m.compileAsync(o.group,l,f),N.layout&&N.layout(o.ctx),o.module=N,o.status="ready",_t=!0}catch(y){console.warn(`shot ${o.meta.id} failed`,y),o.status="failed"}})()),o.promise}function ht(o){for(let y=F.length-1;y>=0;y-=1)if(o>=F[y].a)return y;return 0}let wt=!1;async function Nt(){if(!wt){for(wt=!0;!(re||v());){let o=ht(D),y=null,N=1/0;for(let H of F)if(H.status==="idle"){let V=Math.abs(H.index-o);V<N&&(y=H,N=V)}if(!y)break;await new Promise(H=>{"requestIdleCallback"in window?window.requestIdleCallback(H,{timeout:200}):setTimeout(H,16)}),await tt(y)}wt=!1}}let q=new Float32Array(13),mt=new Qe,ie=new dt(0,1,0),xt=new dt(1,0,0),ut={t:0,enter:0,hold:0,exit:0,y:0,v:0,time:0,dt:0,px:0,py:0,pointer:0},nt=So(window.scrollY),$t=Eo($),D=nt.y,yt=0,Ae=0,re=!1,le=null,_t=!0,It=0,jt=performance.now(),Vt=0,ce=performance.now(),Ot=0,we=0,Xt=0,bt=0,Mt=0,ge=0,Ft=!1,et=null,Kt=0,Zt=NaN,ue=!1,de=!1;function Ce(o,y){let N=H=>Math.min(1,Math.max(0,H));ut.t=o.b>o.a?N((D-o.a)/(o.b-o.a)):1,ut.enter=o.s>o.a?N((D-o.a)/(o.s-o.a)):D>=o.s?1:0,ut.hold=o.e>o.s?N((D-o.s)/(o.e-o.s)):D>=o.e?1:0,ut.exit=o.b>o.e?N((D-o.e)/(o.b-o.e)):D>=o.b?1:0,ut.y=D/E.pace,ut.v=nt.v,ut.time=It,ut.dt=y,ut.px=bt,ut.py=Mt,ut.pointer=Xt}let zt=(o,y)=>y>o?Math.min(1,Math.max(0,(D-o)/(y-o))):D>=y?1:0,Bt=o=>o*o*(3-2*o);function w(){let o=E.shots["process.head"];O.u.uTurn.value=Bt(zt(o.pinStart,o.pinEnd));let y=E.shots["why.list"],N=E.shots["why.stats"],H=E.shots.cta,V=zt(y.pinStart,y.pinEnd)*3.2;P.setClear(V);let ot=Bt(zt(y.pinStart+(y.pinEnd-y.pinStart)*.45,H.pinStart));g.uDawn.value=ot,P.setClock(3.2+Bt(zt(y.pinStart,N.pinEnd))*3.8);let St=E.shots.hero;if(D<s){let Et=E.shots.drop.pinEnd-St.pinEnd;P.setRing(1-zt(St.pinEnd,St.pinEnd+Et*.14)),P.setOffHook(Bt(zt(St.pinEnd,St.pinEnd+Et*.22)))}else P.setRing(1-zt(y.pinStart,y.pinStart+(y.pinEnd-y.pinStart)*.5)),P.setOffHook(0);let Z=P.phone;if(Z.visible=D>s,b.setEnd(-1/0),D>s){let Et=E.shots["why.q"],Qt=k["why.q"].d*.62,Ht=Bt(zt(E.shots.fall.pinEnd-(E.shots.fall.pinEnd-s)*.2,Et.pinEnd)),pe=Bt(zt(y.pinStart,y.pinStart+(y.pinEnd-y.pinStart)*.14)),qe=Qt+(.42-Qt)*Ht,$e=qe+(.0043-qe)*pe;Z.position.y=$e;let Bo=2.1+(1-2.1)*Ht;Z.scale.setScalar(Bo),Z.rotation.y=E.portrait?0:Math.PI/2*Bt(zt(N.pinEnd,H.pinStart)),b.setEnd(P.group.position.y+$e+.01)}let Lt=F.find(Et=>Et.meta.id==="svc.rescue");(D<Lt.a||D>Lt.b)&&(g.uPower.value.set(0,0),b.u.uJamK.value=0)}function M(o){ho(B,Q,D,q),l.position.set(q[0],q[1],q[2]),l.quaternion.set(q[3],q[4],q[5],q[6]),Xt===1&&(mt.setFromAxisAngle(ie,-bt*.012),l.quaternion.multiply(mt),mt.setFromAxisAngle(xt,Mt*.009),l.quaternion.multiply(mt)),l.fov=q[7],l.near=q[8],l.far=q[9],l.setViewOffset(E.W,E.H,q[11],q[12],E.W,E.H),g.uTime.value=It,g.uCamY.value=q[1],g.uFog.value.set(q[10]*.16,q[10]),w();let y=D<R||D>s,N=D>s?4:1;P.group.visible=y,P.setAct(N),O.group.visible=D>G&&D<z,g.uLampOn.value=y?1-g.uDawn.value*.72:0,g.uLampOrigin.value.copy(P.group.position),g.uLampColor.value.set(1,.7,.42),b.u.uFeed.value=D*18e-5/E.pace,Ce(F[0],o),y&&(P.resetSpot(),P.update(ut,It));for(let H of F){let V=D>=H.a-U()&&D<=H.b+U();H.status==="ready"&&(V||H.on)&&(Ce(H,o),H.module.update(ut,H.ctx),H.on=V,H.group.visible=V)}b.focus(q[1],q[9]),l.updateProjectionMatrix(),l.updateMatrixWorld(),A?A.render(f,l):m.render(f,l)}let C=new ke({onChange(o,y){_(y)}});function _(o){if(o==="pixel-85"||o==="pixel-72")T=o==="pixel-85"?.85:.72;else if(o==="drop-film")A?.dispose(),A=null;else if(o==="instances-70"||o==="instances-50")p.instanceScale=o==="instances-70"?.7:.5,P.setDensity(p.instanceScale),O.setDensity(p.instanceScale);else if(o==="shadow-1")P.setShadowTaps(1);else if(o==="extras-off")O.setWeather(!1),P.setExtras(!1);else if(o==="cadence-30")ge=33.3;else if(o==="stills"){try{window.localStorage.setItem("enjaz:tier",`S:${Date.now()}`)}catch{}vt(),c("governor")}}function j(o){if(re)return;if(window.requestAnimationFrame(j),document.hidden||Ft||le!==null){jt=o;return}let y=o-jt;jt=o;let N=Math.min(y,100)/1e3;It+=N;let H=window.scrollY,V=$t.step(H,N,E.svh,o);if(et)if(de||$t.on||Math.abs(H-et.written)>2)et=null;else{let Ht=et.at+(et.to-et.at)*(1-Math.exp(-ws*N)),pe=gs*E.svh*N;et.at+=Math.max(-pe,Math.min(pe,Ht-et.at)),Math.abs(et.to-et.at)<.5&&(et.at=et.to),V=Math.round(et.at),et.written=V,et.at===et.to&&(et=null)}else if(!$t.on&&!de&&!yt&&!document.body.classList.contains("is-nav-open")&&(H!==Zt?(Kt=0,ue=!1):Kt+=N,!ue&&Kt>vs)){ue=!0;let Ht=I.settle(H);Ht!==null&&Math.abs(Ht-H)>2&&(et={at:H,to:Ht,written:H})}Zt=V,V!==H&&window.scrollTo({top:V,behavior:"instant"}),I.update(V,N),!yt&&Math.abs(V-D)>6*E.svh&&o>Ae?(yt=o,n.classList.add("world-dip")):yt&&o-yt>=hs&&(nt.land(V,E.svh),yt=0,Ae=o+ms,n.classList.remove("world-dip"));let ot=Math.abs(V-nt.y)>.25||Math.abs(nt.v)>2;D=nt.step(V,N,E.svh,$.speed(nt.y)),bt+=(Ot-bt)*Math.min(1,N*6),Mt+=(we-Mt)*Math.min(1,N*6);let St=Math.abs(Ot-bt)>.001||Math.abs(we-Mt)>.001,Lt=F[ht(D)].meta.idleHz,Et=ot||St||_t;if(!Et&&Lt>0&&!(a==="L"&&o-ce>fs)&&(Et=o-Vt>=1e3/Lt-1),ge&&o-Vt<ge-2&&(Et=!1),!Et)return;ot&&(ce=o),T&&(!ot||D>E.shots.fall.pinStart&&D<E.shots.fall.pinEnd)&&(ft=T,T=0,W()),_t=!1;let Qt=(o-Vt)/1e3;Vt=o,M(Math.min(Qt,.1)),y<250&&(ot||Lt>0)&&C.push(y)}function lt(){$t.on=!1,et=null,yt=0,n.classList.remove("world-dip")}function vt(){re=!0,lt(),I.release()}window.addEventListener("touchstart",()=>{de=!0},{passive:!0});let ct=()=>{de=!1};window.addEventListener("touchend",ct,{passive:!0}),window.addEventListener("touchcancel",ct,{passive:!0}),window.addEventListener("pointermove",o=>{Xt=o.pointerType==="mouse"?1:2,Ot=o.clientX/window.innerWidth*2-1,we=o.clientY/window.innerHeight*2-1,ce=performance.now()},{passive:!0});let Ut=new dt;window.addEventListener("click",o=>{if(!o.target.closest?.("a, button, .shot"))for(let y of J){if(!y.runtime.on)continue;Ut.set(y.center[0],y.center[1],y.center[2]),y.runtime.group.localToWorld(Ut).project(l);let N=(Ut.x*.5+.5)*E.W,H=(.5-Ut.y*.5)*E.H;Math.hypot(N-o.clientX,H-o.clientY)<y.radius&&(y.runtime.module.hit?.(y.id,ut,y.runtime.ctx),_t=!0)}},{passive:!0}),window.addEventListener("pageshow",()=>{nt.reset(window.scrollY),D=nt.y,_t=!0});let xe=0;if(r.addEventListener("webglcontextlost",o=>{o.preventDefault(),Ft=!0,lt(),xe+=1,c("context-lost")}),r.addEventListener("webglcontextrestored",()=>{xe>1||(Ft=!1,P.bakeShadow(m),u(),it(),nt.reset(window.scrollY),D=nt.y,_t=!0)}),it(),nt.reset(window.scrollY),D=nt.y,await Ue(P.build()),await Ue(O.build()),await tt(at.hero),await tt(at.drop),await m.compileAsync(f,l),P.bakeShadow(m),v())return null;if(!t){let o=[],y=new Uint8Array(4);for(let H=0;H<6;H+=1){await new Promise(ot=>window.requestAnimationFrame(ot));let V=performance.now();M(.016),i.readPixels(0,0,1,1,i.RGBA,i.UNSIGNED_BYTE,y),o.push(performance.now()-V)}let N=o.slice(2).sort((H,V)=>H-V)[1];if(N>40){try{window.localStorage.setItem("enjaz:tier",`S:${Date.now()}`)}catch{}return d("bench"),null}N>20&&(ft=.7,p.instanceScale=.7,P.setDensity(.7),O.setDensity(.7),W())}p.film&&(A=(await import("./chunk-WOIDP7SL.js")).createFilm(m),A.resize(E.W*m.getPixelRatio(),E.H*m.getPixelRatio())),nt.reset(window.scrollY),D=nt.y,I.update(D,0),M(.016),n.classList.add("world-on"),window.requestAnimationFrame(j),Nt(),window.addEventListener("wheel",o=>{o.ctrlKey||re||Ft||le!==null||document.body.classList.contains("is-nav-open")||Math.abs(o.deltaX)>Math.abs(o.deltaY)||(o.preventDefault(),$t.input(o.deltaY,o.deltaMode,window.scrollY,E.svh,E.docH-E.svh,performance.now()),ce=performance.now())},{passive:!1});let Fe=Co(()=>{it(),_t=!0});/[?&]hud=1\b/.test(window.location.search)&&import("./chunk-FKFVKEYL.js").then(o=>o.mountHud({renderer:m,governor:C,tier:a,q:p,get y(){return D}}));let Pe={tier:a,renderer:m,governor:C,scene:f,stop:vt,pacer:$,get layout(){return E},get solved(){return k},get y(){return D},seek(o){return window.scrollTo({top:o,behavior:"instant"}),lt(),nt.reset(window.scrollY),D=nt.y,Zt=window.scrollY,ue=!0,I.update(D,0),M(.016),D},freeze(o){le=o,It=o},unfreeze(){le=null},renderOnce(){M(.016)},info(){return M(.016),{calls:m.info.render.calls,triangles:m.info.render.triangles,programs:m.info.programs.length,rung:C.rung,y:D}},sceneInfo(){let o=A;A=null,M(.016);let y={calls:m.info.render.calls,triangles:m.info.render.triangles};return A=o,y},feedFrameTimes(o){o.forEach(y=>C.push(y))},async loadAll(){await Promise.all(F.map(o=>tt(o))),_t=!0},status(){return Object.fromEntries(F.map(o=>[o.meta.id,o.status]))},dispose(){vt(),Fe()}};return window.__enjazWorld=Pe,Pe}export{fn as start};
