/* three.js r187 (c) three.js authors, MIT. ENJAZ film. */
import{a as te,b as io,c as ro,d as lo,e as co}from"./chunk-FMMD3VW3.js";import{a as uo,b as po,c as fo,d as ho,e as mo,f as _t,g as vo,h as wo}from"./chunk-2EEOQMQQ.js";import{c as ke,d as V,f as Ce,g as He,h as Ae,i as Ne,j as ao,k as At,l as tt}from"./chunk-GBHZZ3DY.js";import{A as to,B as oo,C as Le,D as Nt,E as so,J as xe,N as Lt,O as Ct,S as no,a as Ft,c as It,d as Dt,e as ut,f as Ut,g as qt,h as $t,i as jt,j as Vt,k as vt,l as Et,m as Ke,n as Xt,o as ue,p as Jt,q as Zt,r as Ht,t as $e,u as Qt,v as et,w as Kt,x as B,z as eo}from"./chunk-ZD75F7KI.js";import"./chunk-AEJNSRIJ.js";var Pt=l=>Math.min(1,Math.max(0,l));function go({inPlace:l,blur:r}){let a=[],o=NaN,d=0,c=0;function p(n){n.el.style.opacity="",n.el.style.transform="",n.el.classList.remove("is-gone");for(let t of n.kids)t.style.opacity="",t.style.transform="",t.style.filter=""}function m(n,t,i,w){let v=t<.5;if(v!==n.gone&&(n.gone=v,n.el.classList.toggle("is-gone",v),document.dispatchEvent(new CustomEvent("enjaz:captions"))),t===1&&i===0){p(n);return}n.el.style.opacity=Pt(t/.55).toFixed(3),n.el.style.transform=i?`translate3d(0, ${i.toFixed(1)}px, 0)`:"";let u=n.kids.length,f=u>1?Math.min(.14,.5/(u-1)):0,b=1-(u-1)*f;n.kids.forEach((x,R)=>{let S=Pt((t-R*f)/b);if(S===1){x.style.opacity="",x.style.transform="",x.style.filter="";return}let L=1-S;x.style.opacity=S.toFixed(3),x.style.transform=`translate3d(0, ${(L*L*L*1.1*(w?-1:1)).toFixed(3)}em, 0)`,r&&(x.style.filter=`blur(${(L*.28).toFixed(3)}em)`)})}return{bake(n,t=[]){let i=.35*n.svh;a=[];for(let[v,u]of Object.entries(n.shots)){if(!u.caption||u.caption.h>n.svh*.7)continue;let f=document.querySelector(`[data-shot="${v}"] > .shot`);f&&a.push({el:f,kids:[...f.children],a:v==="hero"?-1:u.pinStart-i,s:v==="hero"?-1:u.pinStart,e:u.pinEnd,b:u.pinEnd+i,pin:u.pin??0,shown:-1,shift:0,gone:!1})}let w=.5*n.svh;for(let v=1;v<a.length;v+=1){let u=a[v-1],f=a[v],b=f.s-u.e;if(!(b<=0)){if(l){let x=Math.min(w,b/2);u.b=u.e+x,f.a=f.s-x}else u.b=u.e+Math.min(w,Math.max(i,b-f.pin));for(let x of t)x>u.e&&x<f.s&&(u.b=Math.min(u.b,x),f.a=Math.max(f.a,x))}}o=NaN},update(n,t){d=n===o?d+t:0,o=n,c=d>.25?Math.min(1,c+t/.4):Math.max(0,c-t/.12);for(let i of a){let w=i.s>i.a?Pt((n-i.a)/(i.s-i.a)):1,v=Pt((n-i.e)/(i.b-i.e)),u=n>i.a&&n<i.b,f=u?Math.max(Math.min(w,1-v),c):0,b=0;l&&u&&(b=w<1?(n-i.s)*.85:v>0?(n-i.e)*.85:0),(f!==i.shown||b!==i.shift)&&(i.shown=f,i.shift=b,m(i,f,b,v>0))}},release(){for(let n of a)p(n),n.shown=-1,n.gone=!1}}}var Ot=["pixel-85","pixel-72","drop-film","instances-70","instances-50","shadow-1","extras-off","cadence-30","stills"];function Bt(l,r){return l[Math.min(l.length-1,Math.floor(l.length*r))]}var zt=class{constructor({onChange:r=()=>{}}={}){this.onChange=r,this.buffer=new Float32Array(90),this.sorted=new Float32Array(90),this.count=0,this.head=0,this.rung=-1,this.elapsed=0,this.overBudget=0,this.underBudget=0,this.cooldown=0,this.climbs=0,this.upWait=240,this.locked=!1,this.refreshCap=!1,this.seen=0,this.belowBail=0,this.p50=0,this.p90=0,this.vsync=16.6}target(){return this.refreshCap?33.3:Math.max(this.vsync,16.6)}push(r){if(this.elapsed+=r,this.elapsed<1e3||r>250||(this.buffer[this.head]=r,this.head=(this.head+1)%90,this.count=Math.min(90,this.count+1),this.seen+=1,this.cooldown=Math.max(0,this.cooldown-r),this.count<90/2))return;this.sorted.set(this.buffer);let a=this.sorted.subarray(0,this.count).sort();this.p50=Bt(a,.5),this.p90=Bt(a,.9),this.vsync=Bt(a.subarray(0,Math.max(1,Math.floor(this.count*.2))),.5),this.seen<=60&&Math.abs(this.p50-33.3)/33.3<.04&&this.p90/this.p50<1.08&&(this.refreshCap=!0);let o=this.target();if(this.p90>o*1.25?(this.overBudget+=1,this.underBudget=0):this.p90<o*.75?(this.underBudget+=1,this.overBudget=0):(this.overBudget=0,this.underBudget=0),this.rung===Ot.length-2&&this.p50>50){if(this.belowBail+=r,this.belowBail>4e3){this.step(1);return}}else this.belowBail=0;this.cooldown>0||(this.overBudget>=45&&this.rung<Ot.length-2?(this.underBudgetClimbed&&(this.upWait*=2,this.underBudgetClimbed=!1),this.step(1)):this.underBudget>=this.upWait&&this.rung>=0&&!this.locked&&(this.climbs+=1,this.underBudgetClimbed=!0,this.climbs>=2&&(this.locked=!0),this.step(-1)))}step(r){this.rung+=r,this.overBudget=0,this.underBudget=0,this.cooldown=1500,this.count=0,this.onChange(this.rung,Ot[this.rung]??"full")}};var wt=(l,r,a)=>Math.min(a,Math.max(r,l));var _o=l=>l*l*(3-2*l);function Wt(){let l=0,r=1,a=null,o=null,d=[],c=[],p=m=>Math.min(8191,Math.max(0,m/r));return{bake({zones:m,down:n=[],up:t=[]},i,w){l=Math.max(1,i),r=l/8191,a=new Float64Array(8192),o=new Float32Array(8192);let v=.45*w;for(let u=0;u<8192;u+=1){let f=u*r,b=1/0;for(let[x,R]of m)b=Math.min(b,f<x?x-f:f>R?f-R:0);o[u]=1+3*_o(Math.min(1,b/v)),u>0&&(a[u]=a[u-1]+r*2/(o[u-1]+o[u]))}d=n.map(Math.round).sort((u,f)=>u-f),c=t.map(Math.round).sort((u,f)=>f-u)},speed(m){return o?o[Math.round(p(m))]:1},toEffort(m){if(!a)return m;let n=p(m),t=Math.min(8190,Math.floor(n)),i=Math.max(0,m-l)+Math.min(0,m);return a[t]+(a[t+1]-a[t])*(n-t)+i},fromEffort(m){if(!a)return m;let n=a[8191];if(m<=0||m>=n)return m<=0?m:l+(m-n);let t=0,i=8191;for(;i-t>1;){let w=t+i>>1;a[w]<=m?t=w:i=w}return(t+(m-a[t])/(a[i]-a[t]))*r},stop(m,n){return n>m?d.find(t=>t>m+.5&&t<=n)??null:c.find(t=>t<m-.5&&t>=n)??null}}}function xo(l=0){return{y:l,v:0,step(r,a,o,d=1){let p=10*a,m=1/(1+p+.48*p*p+.235*p*p*p),n=4.2*Math.min(d,2.5)*o*.2,t=wt(this.y-r,-n,n),i=(this.v+10*t)*a;return this.v=(this.v-10*i)*m,this.y=this.y-t+(t+i)*m,Math.abs(this.y-r)<.25&&Math.abs(this.v)<2&&(this.y=r,this.v=0),this.y},reset(r){this.y=r,this.v=0},land(r,a){let o=Math.sign(r-this.y);this.y=r-o*.8*a,this.v=o*4.2*a*.5}}}function yo(l=Wt()){return{on:!1,at:0,aim:0,written:0,rest:null,input(r,a,o,d,c,p=0){this.on||(this.on=!0,this.at=o,this.aim=o,this.written=o);let n=wt(r*(a===1?40:a===2?d:1),-200,200),t=this.rest;if(t&&Math.sign(n)===t.dir&&Math.abs(this.at-t.y)<2){let x=p-t.since;if(x<.35*1e3||x<1.2*1e3&&p-t.last<.14*1e3){t.last=p,this.aim=this.at;return}}this.rest=null;let i=Math.sign(n)===-Math.sign(this.aim-this.at)?this.at:this.aim,w=1.6*d,v=l.toEffort(this.at),u=wt(l.toEffort(i)+n,v-w,v+w),f=wt(l.fromEffort(u),0,c),b=l.stop(this.at,f);b!==null&&(f=b),this.aim=f},step(r,a,o,d=0){if(!this.on)return r;if(Math.abs(r-this.written)>2)return this.on=!1,this.rest=null,r;let c=l.toEffort(this.at),p=l.fromEffort(c+(l.toEffort(this.aim)-c)*(1-Math.exp(-12*a))),m=3.5*Math.min(l.speed(this.at),2.5)*o*a;if(this.at+=wt(p-this.at,-m,m),Math.abs(this.aim-this.at)<.5){let n=Math.sign(this.aim-this.written);this.at=this.aim,this.on=!1,l.stop(this.aim-n*3,this.aim)===this.aim&&(this.rest={y:this.aim,dir:n,since:d,last:d})}return this.written=Math.round(this.at),this.written}}}var bo=l=>{let r=document.createElement("div");r.style.position="fixed",r.style.top="0",r.style.width="0",r.style.visibility="hidden",r.style.height=`100${l}`,document.body.appendChild(r);let a=r.getBoundingClientRect().height;return r.remove(),a},gt=l=>parseFloat(l)||0;function Mo(){let l=bo("svh"),r=bo("lvh"),a=document.documentElement.clientWidth,o=r,d=window.scrollY,c=document.querySelector("[data-nav]"),p=c?c.getBoundingClientRect().height:0,m=document.documentElement.dir==="rtl"?-1:1,n=document.documentElement.scrollHeight,t=getComputedStyle(document.documentElement),i=parseFloat(t.getPropertyValue("--pace"))||1,w=parseFloat(t.getPropertyValue("--pace-gap"))||i,v={};for(let u of document.querySelectorAll("[data-shot]")){let f=u.dataset.shot,b=u.getBoundingClientRect(),x=b.top+d,R=u.querySelector(":scope > .shot"),S={id:f,top:x,height:b.height,caption:null,pinStart:x,pinEnd:x};if(R){let L=R.getBoundingClientRect(),G=getComputedStyle(u),oe=getComputedStyle(R),se=gt(G.paddingBlockEnd);if(f==="hero"){let k=gt(oe.insetBlockStart),Q=gt(oe.marginBlockEnd),Z=gt(G.paddingBlockStart);S.pinStart=0,S.pinEnd=Math.max(0,b.height-Z-L.height-Q),S.caption={x:L.left,y:k,w:L.width,h:L.height}}else{let k=gt(oe.insetBlockEnd);S.pinStart=x+L.height+k-l,S.pinEnd=S.pinStart+Math.max(0,b.height-se-L.height),S.caption={x:L.left,y:l-k-L.height,w:L.width,h:L.height},S.pin=k,S.gap=se}}v[f]=S}return{W:a,H:o,svh:l,lvh:r,navH:p,docH:n,dir:m,pace:i,paceGap:w,portrait:o>=a,shots:v}}function So(l){let r=window.matchMedia("(pointer: coarse)").matches,a=document.documentElement.clientWidth,o=document.documentElement.scrollHeight,d=0,c=()=>{window.clearTimeout(d),d=window.setTimeout(l,160)},p=new ResizeObserver(()=>{let m=document.documentElement.clientWidth,n=document.documentElement.scrollHeight;if(m===a&&n===o)return;let t=r&&m===a&&Math.abs(n-o)<200;a=m,o=n,t||c()});return p.observe(document.documentElement),document.fonts?.ready.then(c),document.fonts?.addEventListener?.("loadingdone",c),()=>p.disconnect()}var pt=`
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
`,ft=`
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
`,Oo=`
${pt}
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
}`,Bo=`
${ft}
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
}`,Wo=`
${pt}
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
}`,Yo=`
${ft}
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
}`,Go=`
${pt}
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
}`,Uo=`
${ft}
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
}`,qo=`
${pt}
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
}`,$o=`
${ft}
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
}`,jo=`
${pt}
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
}`,Vo=`
${ft}
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
}`,Xo=`
${pt}
in vec3 position;
out float vFog;
//#pars
void main() {
  vec3 p = position;
  //#local
  vec3 wp = (modelMatrix * vec4(p, 1.0)).xyz;
  gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
  vFog = fogAt(wp);
}`,Jo=`
${ft}
uniform vec3 uColor;
uniform float uAlpha;
in float vFog;
void main() {
  fragColor = vec4(uColor * uAlpha * (1.0 - clamp(vFog, 0.0, 1.0)), 1.0);
}`;function Eo(l,r={}){return l.replace("//#pars",r.pars??"").replace("//#fpars",r.fpars??"").replace("//#local",r.local??"").replace("//#world",r.world??"").replace("//#frag",r.frag??"")}function ot(l,{mips:r=!0,repeat:a=!1}={}){let o=new to(l);return o.colorSpace=$t,o.generateMipmaps=r,o.minFilter=r?Ut:ut,o.magFilter=ut,a&&(o.wrapS=Dt,o.wrapT=Dt),o}function Zo(){let r=document.createElement("canvas");r.width=256*2,r.height=256;let a=r.getContext("2d"),o=(d,c,p)=>{let m=a.createRadialGradient(d+107.52,76.8,5.12,d+128,128,184.32);c.forEach(([t,i])=>m.addColorStop(t,i)),a.fillStyle=m,a.fillRect(d,0,256,256);let n=a.createRadialGradient(d+256*.38,256*.24,0,d+256*.38,256*.24,256*.26);n.addColorStop(0,p),n.addColorStop(1,"rgba(255,255,255,0)"),a.fillStyle=n,a.fillRect(d,0,256,256)};return o(0,[[0,"#bcbcc0"],[.5,"#8c8d92"],[.85,"#55565c"],[1,"#35363c"]],"rgba(255,255,255,.18)"),o(256,[[0,"#f6d58c"],[.45,"#c9963f"],[.8,"#6e4a1c"],[1,"#2c1c0a"]],"rgba(255,244,214,.75)"),ot(r,{mips:!1})}function Lo(l){let r=Zo(),a=(o,d,c,p,m={})=>{let{deform:n,defines:t,...i}=m;return new Lt({name:o,glslVersion:Et,vertexShader:Eo(d,n),fragmentShader:Eo(c,n),defines:t??{},uniforms:{...l,...p,...n?.uniforms??{}},...i})};return{matcap:r,solid(o={}){return a("solid",Oo,Bo,{uMatcap:{value:r},uEmit:{value:o.emit??[0,0,0]},uAmbient:{value:o.ambient??.06},uHouse:{value:o.house??1}},dt(o,["emit","ambient","house"]))},paper(o={}){return a("paper",Wo,Yo,{uAtlas:o.atlas??l.uAtlas,uCell:{value:o.cell??[0,0,1,1]},uAmbient:{value:o.ambient??.07},uHouse:{value:o.house??1},uLitBoost:{value:o.boost??1}},{side:Ft,...dt(o,["atlas","cell","ambient","house","boost"])})},wood(o={}){return a("wood",Go,Uo,{uHouse:{value:0},...o.uniforms},dt(o,["uniforms"]))},strip(o={}){return a("strip",qo,$o,{uHouse:{value:1},...o.uniforms},dt(o,["uniforms"]))},glow(o={}){return a("glow",jo,Vo,{uColor:{value:o.color??[1,1,1]},uAlpha:{value:o.alpha??1},uShape:{value:o.shape??0},uRadius:{value:0},uMap:{value:o.map??r},uHouse:{value:o.house??0}},{transparent:!0,depthWrite:!1,blending:It,side:Ft,...dt(o,["color","alpha","shape","map","house"])})},wire(o={}){return a("wire",Xo,Jo,{uColor:{value:o.color??[.365,1,.87]},uAlpha:{value:o.alpha??1},uHouse:{value:0}},{transparent:!0,depthWrite:!1,blending:It,...dt(o,["color","alpha"])})}}}function dt(l,r){let a={};for(let o of Object.keys(l))r.includes(o)||(a[o]=l[o]);return a}var Ge=4,Qo=["invoice","receipt","quote","ledger","sheet","slip","lines","dossier","carbon","memo","tape","blank"],Ko=l=>{let r=new Set;for(let a of document.querySelectorAll(l)){let o=a.textContent.trim();o&&o!=="\u2726"&&r.add(o)}return[...r]};async function Co(l){let r=[document.fonts.load('400 20px "IBM Plex Mono"',"#REF! 0123"),document.fonts.load(l?'700 48px "Noto Kufi Arabic"':'700 48px "Space Grotesk"',l?"\u0625\u0646\u062C\u0627\u0632":"ENJAZ")];await Promise.race([Promise.allSettled(r),new Promise(a=>setTimeout(a,1500))])}function Ao({q:l,dir:r}){let a=r<0,o=document.querySelector("main"),d={};try{d=JSON.parse(o?.dataset.atlas??"{}")}catch{d={}}let c=Ko(".ticker__track span"),p=[];try{p=JSON.parse(document.querySelector("[data-typewriter]")?.dataset.typewriter??"[]")}catch{p=[]}let m=a?'"Noto Kufi Arabic", system-ui':'"Space Grotesk", system-ui',n='"IBM Plex Mono", monospace',t=new Intl.NumberFormat(a?"ar-EG":"en-US",{useGrouping:!1}),i=l.atlas,w=document.createElement("canvas");w.width=i,w.height=i;let v=w.getContext("2d"),u=i/Ge;v.fillStyle="#fff",v.fillRect(0,0,i,i);let f="#23252e",b="#9aa0ad",x=(s,C)=>{let Y=s%Ge,P=Math.floor(s/Ge);v.save(),v.beginPath(),v.rect(Y*u,P*u,u,u),v.clip(),v.translate(Y*u,P*u),v.scale(u/100,u/134),v.direction=a?"rtl":"ltr",v.textBaseline="alphabetic",C(v),v.restore()},R=s=>a?100-s:s,S=(s,C,Y,P=12)=>{s.fillStyle=f,s.font=`700 ${P}px ${m}`,s.textAlign="start",s.fillText(C,R(8),Y)},L=(s,C,Y=8,P=92,U=b,D=.7)=>{s.fillStyle=U,s.fillRect(Y,C,P-Y,D)},G=(s,C,Y,P,U=0)=>{for(let D=0;D<Y;D+=1){let q=34+(D*37+U)%40;s.fillStyle=D%3===0?f:b,s.fillRect(a?92-q:8,C+D*P,q,1.4),s.fillStyle=b,s.fillRect(a?8:80,C+D*P,12,1.4)}};x(0,s=>{S(s,d.invoice??"",20,14),L(s,26),G(s,34,9,7),L(s,104,8,92,f,1),s.fillStyle=f,s.font=`600 9px ${n}`,s.textAlign=a?"left":"right",s.fillText(t.format(4820),a?8:92,116)}),x(1,s=>{S(s,d.receipt??"",18,12),L(s,24),G(s,32,7,6,11),s.fillStyle=f,s.fillRect(30,100,40,12)}),x(2,s=>{S(s,d.quote??"",22,15),L(s,28),G(s,38,6,8,23),s.save(),s.translate(68,104),s.rotate(-.26),s.strokeStyle="#5e4bd8",s.lineWidth=2,s.strokeRect(-23,-9,46,18),s.fillStyle="#5e4bd8",s.font=`700 10px ${m}`,s.textAlign="center",s.fillText(d.paid??"",0,4),s.restore()});let oe=(s,C)=>{let Y=a?8:16;s.fillStyle="#e6f6ee";for(let P=0;P<18;P+=2)s.fillRect(0,6+P*7,100,7);s.strokeStyle="#a9b7ae",s.lineWidth=.4;for(let P=0;P<=4;P+=1)s.beginPath(),s.moveTo(Y+P*19,0),s.lineTo(Y+P*19,134),s.stroke();s.font=`400 4.8px ${n}`,s.textAlign="center";for(let P=0;P<18;P+=1){s.fillStyle=b,s.fillText(t.format(P+1),a?96:8,11.5+P*7);for(let U=0;U<4;U+=1){let D=(P*7+U*13)%23,q=t.format(100+D*317);C&&D===4?(q="#REF!",s.fillStyle="#c2352b"):(C&&D===9&&(q="#####"),s.fillStyle=f),s.fillText(q,Y+U*19+9.5,11.5+P*7)}}};x(3,s=>{oe(s,!1),s.fillStyle="rgba(255,255,255,.92)",s.fillRect(0,0,100,16),S(s,d.ledger??"",12,10)}),x(4,s=>oe(s,!0)),x(5,s=>{s.fillStyle="#c2352b",s.fillRect(8,8,84,7),s.fillStyle=f,s.font=`600 9px ${n}`,s.textAlign="center";for(let C=0;C<4;C+=1)s.fillText(t.format(1200+C*417),50,40+C*20)}),x(6,s=>{for(let C=0;C<16;C+=1)L(s,12+C*7.4,6,94,"#b7c2d8",.5);G(s,14,7,7.4,5)}),x(7,s=>{s.fillStyle="#fff",s.fillRect(0,0,100,134),s.fillStyle="#f7efd9",s.fillRect(18,18,64,30),S(s,d.ledger??"",38,11),s.fillStyle="#faf6ea",s.fillRect(0,62,100,5)}),x(8,s=>{S(s,d.invoice??"",20,13),G(s,30,12,6.6,3)}),x(9,s=>{G(s,12,16,7,17)}),x(10,s=>{s.fillStyle=f,s.font=`400 7px ${n}`,s.textAlign="center";for(let C=0;C<12;C+=1)s.fillText(t.format(90+C*233),50,12+C*10.5)});let se=ot(w);se.anisotropy=4;let k=document.createElement("canvas");k.width=512,k.height=2048;let Q=k.getContext("2d");Q.fillStyle="#fff",Q.fillRect(0,0,512,2048),Q.direction=a?"rtl":"ltr",Q.textBaseline="middle";let Z=a?468:44;Q.textAlign="start";let g=[];c.forEach((s,C)=>{g.push({text:s,big:!0}),p[C%Math.max(1,p.length)]&&g.push({text:p[C%p.length],big:!1})});let F=2048/Math.max(1,g.length);g.forEach((s,C)=>{Q.fillStyle=s.big?"#1f2a24":"#3d4c44",Q.font=s.big?`700 44px ${m}`:`400 25px ${a?m:n}`,Q.fillText(s.text,Z,F*(C+.5),424)});let K=ot(k);return K.anisotropy=4,{texture:se,printTexture:K,services:c,phrases:p,words:d,display:m,mono:n,digits:s=>t.format(s),cell(s){let C=Math.max(0,Qo.indexOf(s)),Y=C%Ge,P=Math.floor(C/Ge);return[Y/Ge,1-(P+1)/Ge,1/Ge,1/Ge]},title(s){return document.querySelector(`[data-shot="${s}"] .card__title, [data-shot="${s}"] .step__title`)?.textContent.trim()??""},canvas(s,C,Y,P){let U=document.createElement("canvas");U.width=s,U.height=C;let D=U.getContext("2d");return D.direction=a?"rtl":"ltr",Y(D,s,C),ot(U,P)}}}var Po={L:{pixelCap:55e4,draws:28,tris:7e4,sheets:420,sheetSeg:2,stacks:180,dossiers:120,boxes:1400,weather:140,uxGrid:[32,45],shadowSize:1024,shadowTaps:1,atlas:512,dust:60,allReflections:!1,film:!1},M:{pixelCap:13e5,draws:45,tris:22e4,sheets:1100,sheetSeg:3,stacks:360,dossiers:240,boxes:3e3,weather:320,uxGrid:[48,68],shadowSize:1024,shadowTaps:4,atlas:1024,dust:150,allReflections:!0,film:!1},H:{pixelCap:28e5,draws:70,tris:6e5,sheets:2400,sheetSeg:4,stacks:720,dossiers:480,boxes:6e3,weather:700,uxGrid:[64,90],shadowSize:2048,shadowTaps:8,atlas:2048,dust:300,allReflections:!0,film:!0}};var xt={clip:[.3,40],fog:26},je=[{id:"hero",act:1,set:"desk",subject:{radius:.62,center:[0,.1,-.4]},pose:{lens:24,elevation:-15,portrait:{elevation:-28},pushIn:.15,...xt},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:30},{id:"drop",act:1,set:"desk",idleHz:0,budget:{draws:12,tris:{L:3e4,M:8e4,H:2e5}},cut:!0},{id:"svc.head",act:2,set:"archive",pose:{lens:[24,62],elevation:-90,clip:[.2,90],fog:72},budget:{draws:8,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0,holdKnots:()=>[{t:0,position:[0,te.slabBottom-.6,1.5],lens:24},{t:1,position:[0,te.slabBottom-5.2,1.5],lens:62}]},{id:"svc.web",act:2,set:"archive",floor:"first",subject:{radius:1.3,center:[0,0,0]},pose:{lens:32,bearing:12,elevation:-6,drift:[0,-.15,-.5],clip:[.3,80],fog:62},budget:{draws:11,tris:{L:25e3,M:7e4,H:16e4}},idleHz:0,stripYaw:0},{id:"svc.apps",act:2,set:"archive",floor:"locked",subject:{radius:1.1,center:[0,0,0]},pose:{lens:32,bearing:[-12,13],elevation:-4,clip:[.3,80],fog:62},budget:{draws:9,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"svc.api",act:2,set:"archive",floor:"locked",subject:{radius:1.75,center:[0,.35,.3]},pose:{lens:32,bearing:-18,elevation:14,drift:[0,-.2,-.3],clip:[.3,80],fog:60},budget:{draws:14,tris:{L:3e4,M:8e4,H:18e4}},idleHz:0},{id:"svc.rescue",act:2,set:"archive",floor:"locked",subject:{radius:1.2,center:[0,0,0]},pose:{lens:30,bearing:10,elevation:-8,roll:[0,7],clip:[.3,80],fog:58},budget:{draws:12,tris:{L:24e3,M:7e4,H:16e4}},idleHz:0},{id:"svc.ux",act:2,set:"archive",floor:"locked",subject:{radius:1.5,center:[0,0,0]},pose:{lens:28,elevation:0,clip:[.3,80],fog:56},budget:{draws:8,tris:{L:24e3,M:6e4,H:14e4}},idleHz:0},{id:"svc.auto",act:2,set:"archive",floor:"locked",subject:{radius:1.4,center:[0,0,0]},pose:{lens:30,bearing:90,elevation:-3,clip:[.3,80],fog:54},budget:{draws:9,tris:{L:22e3,M:6e4,H:14e4}},idleHz:30},{id:"process.head",act:3,set:"archive",floor:{clear:9},subject:{radius:4,center:[0,0,0]},pose:{lens:50,elevation:-90,shift:[0,0,1.1],clip:[.05,90],fog:70},budget:{draws:10,tris:{L:26e3,M:7e4,H:16e4}},idleHz:0,cutIn:!0,exitKnots(l,r,a){let o=a.floorY;return[{t:.55,position:[.16,o+3.2,.18],elevation:-90,lens:44,clip:[.05,70],fog:60},{t:.74,position:[.16,o-.9,.12],elevation:-90,lens:44,clip:[.05,70],fog:60}]}},{id:"step.talk",act:3,set:"archive",floor:{clear:5},subject:{radius:1.5,center:[0,.1,0]},pose:{lens:28,bearing:8,elevation:-10,clip:[.2,70],fog:42},budget:{draws:10,tris:{L:25e3,M:7e4,H:16e4}},idleHz:0},{id:"step.scope",act:3,set:"archive",floor:"locked",subject:{radius:1.75,center:[0,0,0]},pose:{lens:28,bearing:-6,elevation:-24,clip:[.2,70],fog:40},budget:{draws:8,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"step.build",act:3,set:"archive",floor:"locked",subject:{radius:1.25,center:[0,0,.3]},pose:{lens:28,bearing:[20,-10],elevation:-8,clip:[.2,70],fog:40},budget:{draws:9,tris:{L:26e3,M:7e4,H:16e4}},idleHz:0},{id:"step.ship",act:3,set:"archive",floor:"locked",subject:{radius:1.6,center:[0,-.2,0]},pose:{lens:28,elevation:[-12,-74],clip:[.2,70],fog:40},budget:{draws:7,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"fall",act:3,set:"none",idleHz:0,budget:{draws:4,tris:{L:3e3,M:6e3,H:12e3}},cut:!0},{id:"why.q",act:4,set:"desk",desk:!0,floor:{clear:26},subject:{radius:.85,center:[0,0,-.4]},pose:{lens:40,elevation:-90,...xt},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:30},{id:"why.list",act:4,set:"desk",desk:!0,subject:{radius:.8,center:[0,0,-.4]},pose:{lens:40,elevation:-90,...xt},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:0},{id:"why.stats",act:4,set:"desk",desk:!0,subject:{radius:.7,center:[0,0,-.4]},pose:{lens:36,elevation:-70,...xt},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0},{id:"cta",act:4,set:"desk",desk:!0,subject:{radius:.55,center:[0,0,-.4]},pose:{lens:40,elevation:-90,clip:[.02,12],fog:26},solve(l,r){let{W:a,H:o,portrait:d}=r,c=l.shot.caption,p=l.fov*Math.PI/180,m=Math.tan(p/2)*(a/o),n=.072,t=.148;if(d)l.d=.0775*.965/(2*m),l.ox=0,l.oy=0;else{let i=Math.max((c.w+32)/t,(c.h+32)/n);l.d=a/i/(2*m),l.ox=a/2-(c.x+c.w/2),l.oy=o/2-(c.y+c.h/2)}},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0},{id:"coda",act:4,set:"desk",desk:!0,subject:{radius:.62,center:[0,.1,-.4]},pose:{lens:24,elevation:-15,...xt},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0}],zo=async()=>({default:{*build(){},update(){}}}),To={hero:()=>import("./chunk-FQ644PTX.js"),drop:zo,"svc.head":()=>import("./chunk-BJOOKVMW.js"),"svc.web":()=>import("./chunk-BU75ANWF.js"),"svc.apps":()=>import("./chunk-SPG4BJQV.js"),"svc.api":()=>import("./chunk-NAYGZMI2.js"),"svc.rescue":()=>import("./chunk-4WBBAYPS.js"),"svc.ux":()=>import("./chunk-2ALBFH2P.js"),"svc.auto":()=>import("./chunk-ZJHTRPCR.js"),"process.head":()=>import("./chunk-QILWQIDR.js"),"step.talk":()=>import("./chunk-6NUKT6FF.js"),"step.scope":()=>import("./chunk-4GXKCHKF.js"),"step.build":()=>import("./chunk-O2FCLXP4.js"),"step.ship":()=>import("./chunk-R65BVCNZ.js"),fall:zo,"why.q":()=>import("./chunk-CQ55MCPA.js"),"why.list":()=>import("./chunk-GCBXT2J2.js"),"why.stats":()=>import("./chunk-PCMLZPEU.js"),cta:()=>import("./chunk-TYQRNBVE.js"),coda:()=>import("./chunk-F3VOJLJZ.js")};var _e=te.archiveHalf,st=te.galleryH,de=11.4;function Ro(l,r){return l.canvas(512,512,o=>{let d=Ne(`shelf-${r}`);o.fillStyle=r===0?"#2a2520":"#0a0c11",o.fillRect(0,0,512,512);let c=6,p=512/c;for(let m=0;m<c;m+=1){let n=0;for(;n<512;){let t=8+d()*22,i=p*(.74+d()*.22);if(r===0){let w=d(),v=.5+d()*.5,u=w<.6?[176,136,86]:w<.8?[214,202,170]:w<.92?[96,110,128]:[150,70,60];o.fillStyle=`rgb(${u[0]*v},${u[1]*v},${u[2]*v})`,o.save(),o.translate(n+t/2,p*(m+1)-4),o.rotate(d()>.86?(d()-.5)*.5:0),o.fillRect(-t/2,-i,t-1.5,i),o.fillStyle="rgba(255,255,255,.35)",o.fillRect(-t/2+t*.25,-i*.82,t*.4,i*.2),o.restore()}else{let w=12+d()*10;o.fillStyle=`rgb(${w},${w+2},${w+8})`,o.fillRect(n,p*(m+1)-i-4,t-2,i),d()>.72&&(o.fillStyle=d()>.8?"#a48bff":"#5dffde",o.fillRect(n+t/2-1,p*(m+1)-i,1.5,i-8))}n+=t}o.fillStyle=r===0?"#141210":"#1c2027",o.fillRect(0,p*(m+1)-4,512,4)}},{repeat:!0})}function ko({programs:l,text:r,q:a,dir:o}){let d=new $e;d.name="archive";let c={uTurn:{value:0},uOrderY:{value:new Ke(te.slabBottom,-60)},uGalleryH:{value:st}},p=40,m=new xe(_e*2,st*p,4,p),n=m.attributes.uv;for(let z=0;z<n.count;z+=1)n.setXY(z,n.getX(z)*8,n.getY(z)*p);let t=[[0,0,-_e,0],[0,0,_e,Math.PI],[-_e,0,0,Math.PI/2],[_e,0,0,-Math.PI/2]].map(([z,T,N,X])=>{let M=m.clone();return M.rotateY(X),M.translate(z,T,N),M}),i=Ce(t.map(z=>z.toNonIndexed())),w=Ro(r,0);w.anisotropy=8;let v=Ro(r,1);v.anisotropy=8;let u=l.paper({atlas:{value:w},ambient:.03,boost:.62,deform:{pars:"uniform float uTurn, uGalleryH; out float vTurn, vLit;",fpars:"uniform sampler2D uShelf2; in float vTurn, vLit;",world:`
        wp.y += floor(uCamY / uGalleryH) * uGalleryH;
        {
          float along = abs(wn.z) > 0.5 ? wp.x : wp.z;
          vTurn = smoothstep(0.0, 1.0, uTurn * 2.2 - (along * uInline / 14.0 * 0.5 + 0.5) - 0.1);
        }
        vLit = uTurn;`,frag:"c = mix(c, texture(uShelf2, vUv).rgb * (vec3(0.42) + vHouse * 0.7), vTurn);",uniforms:{uTurn:c.uTurn,uGalleryH:c.uGalleryH,uShelf2:{value:v}}}}),f=new B(i,u);f.frustumCulled=!1,d.add(f);let b=[.26,.25,.25],x=z=>`wp.y -= floor((iPos.y - uCamY) / ${z.toFixed(2)} + 0.5) * ${z.toFixed(2)};`,R=ke(new Le(1,1,1)),S=18,L=[];for(let z=0;z<S;z+=1){let T=-z*st;for(let[N,X]of[[1,0],[-1,0],[0,1],[0,-1]]){let M=de*2+6,ne=(_e+de)/2;L.push({pos:[N*ne,T-.1,X*ne],scale:N?[_e-de,.2,M]:[M,.2,_e-de],tint:b}),L.push({pos:[N*de,T+.95,X*de],scale:N?[.06,.06,M]:[M,.06,.06],tint:[.55,.52,.48]}),L.push({pos:[N*de,T+.55,X*de],scale:N?[.03,.03,M]:[M,.03,.03],tint:[.4,.38,.36]})}}let G=new B(Ae(R,L.length,(z,T)=>{let N=L[z];T.pos=N.pos,T.scale=N.scale,T.tint=N.tint}),l.solid({ambient:.05,defines:{INSTANCED:1},deform:{world:x(st*S)}}));G.frustumCulled=!1,d.add(G);let oe=[];for(let z of[-1,1])for(let T of[-de,-de/3,de/3,de])oe.push([z*de,T]),oe.push([T,z*de]);let se=new B(Ae(ke(new Le(.34,1,.34,1,44,1)),oe.length,(z,T)=>{T.pos=[oe[z][0],0,oe[z][1]],T.scale=[1,180,1],T.tint=[.36,.35,.34]}),l.solid({ambient:.05,defines:{INSTANCED:1},deform:{world:"wp.y += uCamY;"}}));se.frustumCulled=!1,d.add(se);let k=Ne("archive"),Z=Math.max(3,Math.round(a.boxes/460))*st,g=ke(new Le(1,1,.8)),F=g.attributes.normal;for(let z=0;z<F.count;z+=1)F.getZ(z)<-.5&&g.attributes.aColor.setXYZ(z,0,0,0);let K=Ce([g,V(.05,.86,.01,{at:[0,0,-.41],color:[.36,1,.87],mat:2})]),s=a.boxes,C=new B(Ae(K,s,(z,T)=>{let N=z%4,X=(k()*2-1)*(_e-1),M=-k()*Z,ne=(k()-.5)*.5,ie=_e-.3-k()*2.2,ve=.5+k()*.5,Pe=.55+k()*.4;N===0?(T.pos=[X,M,-ie],He(0,0,ne,T.quat)):N===1?(T.pos=[X,M,ie],He(0,Math.PI,ne,T.quat)):N===2?(T.pos=[-ie,M,X],He(0,Math.PI/2,ne,T.quat)):(T.pos=[ie,M,X],He(0,-Math.PI/2,ne,T.quat)),T.scale=[ve,Pe,.4];let he=.62+k()*.38,$=k();T.tint=$<.62?[.74*he,.56*he,.33*he]:$<.86?[.86*he,.8*he,.66*he]:$<.95?[.38*he,.44*he,.52*he]:[.6*he,.24*he,.2*he],T.seed=k()}),l.solid({ambient:.05,defines:{INSTANCED:1},deform:{pars:"uniform float uTurn; uniform vec2 uOrderY; out float vBack;",local:`
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
            float shift = floor((iPos.y - uCamY) / ${Z.toFixed(2)} + 0.5) * ${Z.toFixed(2)};
            /* Files sink into the wall at the edges of the wrap, so they never pop. */
            float edge = smoothstep(${(Z/2).toFixed(2)}, ${(Z*.36).toFixed(2)}, abs(iPos.y - shift - uCamY));
            wp.y -= shift;
            float order = clamp((uOrderY.x - wp.y) / (uOrderY.x - uOrderY.y), 0.0, 1.0);
            if (aColor.a < 1.5) { tint = mix(mix(tint, vec3(0.1, 0.11, 0.13), order * 0.55), vec3(0.075, 0.08, 0.1), vBack); }
            vec3 towardsWall = normalize(vec3(sign(iPos.x) * step(10.0, abs(iPos.x)), 0.0, sign(iPos.z) * step(10.0, abs(iPos.z))) + vec3(0.0001));
            wp += towardsWall * (1.0 - edge) * 2.8;
          }`,uniforms:{uTurn:c.uTurn,uOrderY:c.uOrderY}}}));C.frustumCulled=!1,d.add(C);let Y=new xe(1,1,1,3),P=["ledger","invoice","lines","sheet","memo","receipt"],U=Math.min(180,Math.floor(a.weather*.75)),D=new B(Ae(Y,U,(z,T)=>{let N=z%4,X=(k()*2-1)*(de-.5),M=-Math.floor(k()*18)*st+.3;T.pos=N===0?[X,M,-de]:N===1?[X,M,de]:N===2?[-de,M,X]:[de,M,X],He(0,N<2?0:Math.PI/2,(k()-.5)*.2,T.quat);let ne=.55+k()*.6;T.scale=[ne,ne*1.42,1],T.cell=r.cell(P[Math.floor(k()*P.length)]);let ie=.75+k()*.25;T.tint=[ie,ie,ie*.95]}),l.paper({ambient:.05,defines:{INSTANCED:1},deform:{world:x(st*18)}}));D.frustumCulled=!1,d.add(D);let q=new xe(.34,.46),pe=new B(Ae(q,a.weather,(z,T)=>{T.pos=[(k()*2-1)*10.5,-k()*24,(k()*2-1)*10.5],T.cell=r.cell(P[Math.floor(k()*P.length)]);let N=.78+k()*.22;T.tint=[N,N,N*.95],T.seed=k()}),l.paper({ambient:.08,defines:{INSTANCED:1},deform:{pars:"uniform float uTurn;",local:`{
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
        }`,uniforms:{uTurn:c.uTurn}}}));pe.frustumCulled=!1,d.add(pe);let ae=s,fe=a.weather;return{group:d,u:c,*build(){yield},setRange(z,T){c.uOrderY.value.set(z,T)},setDensity(z){C.geometry.instanceCount=Math.floor(ae*z),pe.geometry.instanceCount=Math.floor(fe*z)},setWeather(z){pe.visible=z,D.visible=z}}}var Tt={pars:"in float iClear; uniform float uClear;",world:`
    float clearF = clamp((uClear - iClear - seed * 0.34) / 0.62, 0.0, 1.0);
    if (clearF > 0.0) {
      clearF *= clearF;
      vec3 away = wp - (uLampOrigin + vec3(0.0, 0.0, -0.4));
      away.y = 0.0;
      wp += normalize(away + vec3(0.001)) * clearF * 2.4;
      wp.y += clearF * 0.9 - clearF * clearF * 1.9;
    }`};function es(){let a=document.createElement("canvas");a.width=1024,a.height=512;let o=a.getContext("2d");o.fillStyle="#7b4c2b",o.fillRect(0,0,1024,512);let d=Ne("walnut");for(let c=0;c<520;c+=1){let p=d()*512,m=d()>.45;o.strokeStyle=m?`rgba(44,22,10,${.05+d()*.2})`:`rgba(180,120,74,${.03+d()*.1})`,o.lineWidth=.5+d()*2.4,o.beginPath(),o.moveTo(0,p);let n=d()*1.2;for(let t=0;t<=1024;t+=48)p+=(d()-.5)*4*n,o.lineTo(t,p);o.stroke()}for(let c=0;c<3;c+=1){let p=d()*1024,m=d()*512;for(let n=8;n<90;n+=5+d()*5)o.strokeStyle=`rgba(40,20,9,${.1+d()*.09})`,o.lineWidth=.8,o.beginPath(),o.ellipse(p,m,n*3.2,n*.8,0,0,Math.PI*2),o.stroke()}return ot(a)}function Fo({programs:l,shared:r,text:a,q:o,dir:d}){let c=h=>h*d,p=new $e;p.name="desk";let m={uClear:{value:0},uRing:{value:0},uRingOn:{value:0}},n=new ue(c(.27),.62,-.5),t=[c(-.02),-.38],i=[t[0],t[1]],w=new Zt(o.shadowSize,o.shadowSize,{depthTexture:new oo(o.shadowSize,o.shadowSize,qt)});w.depthTexture.compareFunction=Vt,w.depthTexture.minFilter=ut,w.depthTexture.magFilter=ut;let v=new Ht,u={uMap:{value:es()},uShadow:{value:w.depthTexture},uClear:m.uClear,uDawnStripes:{value:1},uAmbient:{value:.045},uShadowTaps:{value:o.shadowTaps},uGloss:{value:1},uRings:{value:[1,0,0,0]},uRingCentreA:{value:[c(-.2),-.21,.046]},uRingCentreB:{value:[c(-.112),-.21,.046]},uTint:{value:[1,1,1]},uLampMatrix:{value:v}},f=new B(new Le(1.6,.045,.8),l.wood({uniforms:u}));f.position.set(0,-.0225,-.4),p.add(f);let b={...u,uTint:{value:[.34,.31,.28]},uGloss:{value:0},uRings:{value:[0,0,0,0]}},x=.5,R=new B(Ce([[0,-x-2.5,10,5],[0,x+2.5,10,5],[-x-2.5,0,5,x*2],[x+2.5,0,5,x*2]].map(([h,E,A,_])=>{let j=new Le(A,.1,_);return j.translate(h,te.floorY-.05,E),j})),l.wood({uniforms:b}));p.add(R);let S=[c(-.52),0,-.56],L=[c(-.156),0,-.21],G=[c(.66),.88,-.95],oe=[c(.31),0,-.64],se=[c(.62),0,-.62],k=[c(.72),.42,-.62],Q=[c(.27),.72,-.5],Z=[.24,.14,.08],g=Ce([V(.07,.75,.07,{at:[-.74,-.4,-.06],color:Z}),V(.07,.75,.07,{at:[.74,-.4,-.06],color:Z}),V(.07,.75,.07,{at:[-.74,-.4,-.74],color:Z}),V(.07,.75,.07,{at:[.74,-.4,-.74],color:Z}),V(1.42,.09,.02,{at:[0,-.1,-.03],color:Z}),V(.1,.012,.018,{at:[c(.42),-.1,-.014],color:[.76,.58,.3],mat:1}),V(.1,.012,.018,{at:[c(-.42),-.1,-.014],color:[.76,.58,.3],mat:1}),...wo(G),...fo(se,k,Q,d),...vo(L,d),V(.07,.006,.07,{at:[c(-.02),.003,-.7],color:[.25,.25,.27]}),ke(new Nt(.002,.003,.17,6),{at:[c(-.02),.09,-.7],color:[.7,.7,.72]})]),F=new B(g,l.solid({ambient:.17,house:0}));p.add(F);let K=new B(Ce([V(12,7,.1,{at:[0,1.6,-1.05],color:[.62,.6,.6]}),V(12,.12,.03,{at:[0,te.floorY+.06,-.99],color:[.2,.18,.17]}),V(1.62,.04,.04,{at:[c(-.46),1.54,-.97],color:[.55,.52,.5]}),V(1.62,.04,.04,{at:[c(-.46),.5,-.97],color:[.55,.52,.5]}),V(.04,1.08,.04,{at:[c(-1.27),1.02,-.97],color:[.55,.52,.5]}),V(.04,1.08,.04,{at:[c(.35),1.02,-.97],color:[.55,.52,.5]})]),l.solid({ambient:.2,house:0}));p.add(K);let s=new B(Ce(po(oe,d)),F.material),C=_t([[S[0]-.11*d,.05,S[2]+.03],[S[0]-.17*d,.03,S[2]+.06],[S[0]-.2*d,.012,S[2]+.13],[S[0]-.19*d,.05,S[2]-.03],[S[0]-.13*d,.11,S[2]-.08]],24),Y=l.solid({house:0,deform:uo()}),P=new B(Ce([...ho(S),C]),Y);p.add(s,P);let U={x:S[0],y:.135,z:S[2]-.08},D=new B(mo(),Y);D.name="handset",D.position.set(U.x,U.y,U.z),p.add(D);let q=new B(_t([[0,0,0],[0,-.2,0],[0,-.4,.01],[0,-.6,0]],22,.008),Y);q.visible=!1,p.add(q);let pe=F.material,ae=new B(V(.012,.095,.004,{at:[0,.042,0],color:[.1,.1,.1]}),pe),fe=new B(V(.007,.14,.004,{at:[0,.064,0],color:[.1,.1,.1]}),pe);ae.position.set(G[0],G[1],G[2]+.026),fe.position.set(G[0],G[1],G[2]+.03),p.add(ae,fe);let z=c(-.46),T=new B(ke(new xe(1.58,1),{at:[z,1.02,-.985],color:[.075,.11,.21],mat:2}),l.solid({house:0,deform:{fpars:"uniform highp float uDawn;",frag:"c = mix(c, mix(vec3(0.365, 1.0, 0.87), vec3(0.643, 0.545, 1.0), clamp((vLampP.x + 0.5) * 0.7, 0.0, 1.0)), uDawn);"}}));p.add(T);let N=V(1.58,.042,.004,{color:[.72,.72,.7]});N.deleteAttribute("uv");let X=new B(Ae(N,24,(h,E)=>{E.pos=[z,.54+(h+.5)*.0405,-.965]}),l.solid({house:0,ambient:.14,defines:{INSTANCED:1},deform:{local:`{
          float a = mix(0.86, 1.32, uDawn);
          float ca = cos(a), sa = sin(a);
          p = vec3(p.x, p.y * ca - p.z * sa, p.y * sa + p.z * ca);
          n = vec3(n.x, n.y * ca - n.z * sa, n.y * sa + n.z * ca);
        }`}}));X.frustumCulled=!1,p.add(X);let M=Ne("desk"),ne=[{x:-.66,z:-.3,h:.34},{x:-.58,z:-.68,h:.44},{x:-.27,z:-.67,h:.27},{x:.66,z:-.22,h:.2},{x:-.36,z:-.28,h:.13},{x:-.14,z:-.7,h:.15},{x:.66,z:-.42,h:.1},{x:-.7,z:-.08,h:.09}],ie=[],ve=new Map;for(let h of ne){let E=0,A=0,_=0;for(;E<h.h&&ie.length<o.stacks;){let j=.01+M()*.022;A+=(M()-.5)*.012,_+=(M()-.5)*.012,ie.push({x:h.x+A,y:E+j/2,z:h.z+_,h:j,yaw:(M()-.5)*.34}),E+=j}ve.set(h,{y:E,x:h.x+A,z:h.z+_})}let Pe=new Le(1,1,1);Pe.deleteAttribute("uv");let he=ke(Pe),$=new B(Ae(he,ie.length,(h,E)=>{let A=ie[h];E.pos=[c(A.x),A.y,A.z],He(0,A.yaw,0,E.quat),E.scale=[.21+M()*.03,A.h,.297+M()*.03];let _=.74+M()*.26;E.tint=M()>.86?[_,_*.84,_*.72]:[_,_,_*.95],E.extra.iClear=2},{iClear:1}),l.solid({house:0,ambient:.13,defines:{INSTANCED:1},deform:Tt}));$.frustumCulled=!1,p.add($);let Oe=[{x:.5,z:-.14,n:.3},{x:-.5,z:-.2,n:.3},{x:-.3,z:-.5,n:.26}],we=ke(new Le(1,1,1)),nt=[];for(let h of Oe){let E=Math.floor(o.dossiers*h.n*.5),A=0;for(let _=0;_<E&&A<.2;_+=1){let j=.016+M()*.014,ce=(M()-.5)*.5,me=.7+M()*.3;nt.push({x:h.x+(M()-.5)*.02,y:A+j/2,z:h.z+(M()-.5)*.02,yaw:ce,sx:.24,sy:j,sz:.33,tint:[.86*me,.7*me,.42*me]}),nt.push({x:h.x,y:A+j+6e-4,z:h.z,yaw:ce,sx:.016,sy:.0015,sz:.335,tint:[.92,.9,.84]}),A+=j}}let re=new B(Ae(we,nt.length,(h,E)=>{let A=nt[h];E.pos=[c(A.x),A.y,A.z],He(0,A.yaw,0,E.quat),E.scale=[A.sx,A.sy,A.sz],E.tint=A.tint,E.extra.iClear=2},{iClear:1}),l.solid({house:0,ambient:.13,defines:{INSTANCED:1},deform:Tt}));re.frustumCulled=!1,p.add(re);let le=new xe(1,1,o.sheetSeg,o.sheetSeg);le.rotateX(-Math.PI/2);let at=["invoice","ledger","quote","receipt","lines","sheet","memo","invoice","carbon","slip"],I=[],Ue=Math.min(30,Math.floor(o.sheets*.1));for(let h=0;h<Ue;h+=1){let E=.36+M()*.46,A=M()*Math.PI*2,_=Math.cos(A)*E*1.08,j=-.4+Math.sin(A)*E*.42;I.push({x:_,z:j,y:.0012+M()*.012,yaw:M()*6.28,kind:0,clear:M()>.4?0:1})}for(let[h,E]of ve){let A=Math.floor(o.sheets*.5/ne.length*(.5+h.h*2));for(let _=0;_<A;_+=1)I.push({x:E.x+(M()-.5)*.06,z:E.z+(M()-.5)*.06,y:E.y+_*.0015,yaw:(M()-.5)*.7,kind:1,clear:2})}let Mt=Math.min(8,Math.floor(o.sheets*.02));for(let h=0;h<Mt;h+=1){let E=h%2===0?1:-1;I.push({x:E*(.24+M()*.46),z:-.08+M()*.05,y:.002+M()*.004,yaw:(M()-.5)*.3,kind:2,clear:0})}let it=Math.max(0,Math.floor(o.sheets*.24));for(let h=0;h<it;h+=1){let E=M()*Math.PI*2,A=.7+M()*1.5,_=Math.cos(E)*A*1.2,j=.1+Math.abs(Math.sin(E))*A*.7;Math.hypot(_,j)>.75&&I.push({x:_,z:j,y:te.floorY+.002+M()*.004,yaw:M()*6.28,kind:0,clear:2})}for(let h=0;h<8;h+=1)I.push({x:-.02+(M()-.5)*.015,z:-.7+(M()-.5)*.015,y:.02+h*.012,yaw:M()*6.28,kind:3,clear:2});let rt=l.paper({house:0,ambient:.05,defines:{INSTANCED:1},deform:{pars:`${Tt.pars} in float iCurl;`,local:`
        float cx = uv.x - 0.5, cz = uv.y - 0.5;
        p.y += (cx * cx * 0.03 + cz * cz * 0.05) * iCurl;
        /* A sheet by the edge lifts a little in the draught from the printer. */
        p.y += sin(uTime * 2.6 + seed * 37.0) * 0.0012 * max(iCurl - 0.8, 0.0) * (cz + 0.5);
        n.xz -= vec2(cx * 0.06, cz * 0.1) * iCurl;`,world:Tt.world}}),ye=new B(Ae(le,I.length,(h,E)=>{let A=I[h],_=A.kind===3;E.pos=[c(A.x),A.y,A.z],He(0,A.yaw,0,E.quat),E.scale=_?[.08,1,.16]:[.21,1,.297];let j=_?"receipt":at[Math.floor(M()*at.length)];E.cell=a.cell(j);let ce=.82+M()*.18;E.tint=j==="carbon"?[.98,.72*ce,.72*ce]:j==="slip"?[.99,.9*ce,.62*ce]:[ce,ce,ce*.96],E.extra.iClear=A.clear,E.extra.iCurl=A.kind===2?1.6:.5+M()},{iClear:1,iCurl:1}),rt);ye.frustumCulled=!1,p.add(ye);let Fe=new B(new xe(.34,.34),l.glow({color:[1,.74,.46],alpha:.5,defines:{BILLBOARD:1}}));Fe.position.set(n.x,n.y+.03,n.z),Fe.frustumCulled=!1,p.add(Fe);let Ve=new B(Ae(new xe(1,1),2,(h,E)=>{E.pos=h===0?[c(.34),.42,-.985]:[c(-.46),.95,-.98],E.scale=h===0?[2.6,1.9,1]:[3.2,2.2,1],E.tint=h===0?[.13,.086,.047]:[.028,.038,.067]}),l.glow({defines:{INSTANCED:1}}));Ve.frustumCulled=!1,p.add(Ve);let lt=new Nt(.05,.54,.86,26,1,!0),Re=new B(lt,l.glow({color:[1,.72,.42],alpha:.13,shape:5,deform:{frag:"a = vUv.y * vUv.y; { float f = abs(dot(normalize(vN), normalize(vV))); a *= f * f; }"}}));Re.frustumCulled=!1,p.add(Re);let ht=new xe(.009,.009),qe=new B(Ae(ht,o.dust,(h,E)=>{let A=Math.sqrt(M()),_=M()*Math.PI*2,j=A*.34;E.pos=[n.x+(i[0]-n.x)*A+Math.cos(_)*j,n.y*(1-A)+.04,n.z+(i[1]-n.z)*A+Math.sin(_)*j],E.tint=[1,.82,.6]}),l.glow({alpha:.42,defines:{INSTANCED:1,BILLBOARD:1},deform:{world:"wp += vec3(sin(uTime * 0.21 + seed * 40.0), sin(uTime * 0.17 + seed * 90.0), cos(uTime * 0.19 + seed * 70.0)) * 0.03;"}}));qe.frustumCulled=!1,p.add(qe);let Ee=n.clone(),be=new Ct(122,1,.05,2.2),Xe=new ue(0,0,-1),Ie=new ue,Be={x:0,y:0,z:0},ct=0,Me=0,We=new Ht().set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.4975,0,0,0,1),Rt=ye.geometry.instanceCount,Ye=$.geometry.instanceCount,Je=re.geometry.instanceCount,St=h=>{ae.rotation.z=-(h%12/12)*Math.PI*2,fe.rotation.z=-(h%1)*Math.PI*2};return St(3.2),{group:p,u:m,setClock:St,lampPos:Ee,pool:t,*build(){yield},setActPositions(h){Be=h},setPhone(h){h.position.set(0,.0043,-.4),h.visible=!1,p.add(h),this.phone=h},setAct(h){h===4?p.position.set(Be.x,Be.y,Be.z):p.position.set(0,0,0)},setSpot(h,E){i[0]=h,i[1]=E},resetSpot(){i[0]=t[0],i[1]=t[1]},setRing(h){ct=h},setOffHook(h){Me=h},setShadowTaps(h){u.uShadowTaps.value=h},setDensity(h){ye.geometry.instanceCount=Math.floor(Rt*h),$.geometry.instanceCount=Math.floor(Ye*h),re.geometry.instanceCount=Math.floor(Je*h)},setExtras(h){qe.visible=h,Re.visible=h},bakeShadow(h){let E=[f,R,Fe,Re,qe,T,X,K,Ve,q];this.phone&&E.push(this.phone);let A=E.map(e=>e.visible),_=p.position.clone(),j=m.uClear.value,ce=p.visible;p.visible=!0,E.forEach(e=>{e.visible=!1}),p.position.set(0,0,0),this.setClear(0),D.position.set(U.x,U.y,U.z),D.rotation.set(0,0,0),D.visible=!0,p.updateMatrixWorld(!0),r.uLampOrigin.value.set(0,0,0),be.position.copy(Ee),be.up.copy(Xe),be.lookAt(c(-.02),0,-.38),be.updateMatrixWorld(),be.updateProjectionMatrix();let me=h.getRenderTarget();h.setRenderTarget(w),h.clear(),h.render(p,be),h.setRenderTarget(me),v.multiplyMatrices(We,be.projectionMatrix).multiply(be.matrixWorldInverse),E.forEach((e,y)=>{e.visible=A[y]}),p.position.copy(_),p.visible=ce,this.setClear(j),p.updateMatrixWorld(!0)},setClear(h){m.uClear.value=h,u.uClear.value=h;let E=(_,j,ce)=>{let me=ao((h-j)/.7),e=me*me;_.position.set(ce*e*2.2*d,e*.5-e*e*1.6,-e*.2),_.rotation.z=-e*1.2*ce*d,_.visible=me<1};E(P,1,-1),E(s,2,1);let A=h>=3;ye.visible=!A,$.visible=!A,re.visible=!A},update(h,E){let A=E%3,_=A<.42||A>.62&&A<1.04?1:0,j=Math.abs(Math.sin(E*37.7))*.006*_*ct,ce=Math.sin(E*75)*.012*_*ct,me=tt(0,.5,Me),e=tt(.42,1,Me),y=U.x+(-.3*d-U.x)*me,O=U.z+(.1-U.z)*me;D.position.set(y+P.position.x,U.y+j-e*.62+P.position.y,O+P.position.z),D.rotation.set(e*1.3,0,me*.9*d+ce+P.rotation.z),D.visible=P.visible,q.visible=e>.02,q.position.set(y,0,O-.02),q.scale.y=Math.max(.01,e);let H=i[0]+(h.pointer===1?h.px*.2:0),J=i[1]+(h.pointer===1?h.py*.12:0);Ie.set(H-Ee.x,-Ee.y,J-Ee.z).normalize(),r.uLampDir.value.copy(Ie),r.uLampPos.value.copy(Ee),r.uLampCone.value.set(.6,.93),Re.position.set(Ee.x+Ie.x*.43,Ee.y+Ie.y*.43,Ee.z+Ie.z*.43),Re.quaternion.setFromUnitVectors(ts,Ie.negate())}}}var ts=new ue(0,1,0);var yt=new ue;function ze(l,r,a,o,d,c){let p=2*Math.PI*d/4,m=Math.max(c-2*d,0),n=Math.PI/4;yt.copy(r),yt[o]=0,yt.normalize();let t=.5*p/(p+m),i=1-yt.angleTo(l)/n;return Math.sign(yt[a])===1?i*t:m/(p+m)+t+t*(1-i)}var bt=class l extends Le{constructor(r=1,a=1,o=1,d=2,c=.1){let p=d*2+1;if(c=Math.min(r/2,a/2,o/2,c),super(1,1,1,p,p,p),this.type="RoundedBoxGeometry",this.parameters={width:r,height:a,depth:o,segments:d,radius:c},p===1)return;let m=this.toNonIndexed();this.index=null,this.attributes.position=m.attributes.position,this.attributes.normal=m.attributes.normal,this.attributes.uv=m.attributes.uv;let n=new ue,t=new ue,i=new ue(r,a,o).divideScalar(2).subScalar(c),w=this.attributes.position.array,v=this.attributes.normal.array,u=this.attributes.uv.array,f=w.length/6,b=new ue,x=.5/p;for(let R=0,S=0;R<w.length;R+=3,S+=2)switch(n.fromArray(w,R),t.copy(n),t.x-=Math.sign(t.x)*x,t.y-=Math.sign(t.y)*x,t.z-=Math.sign(t.z)*x,t.normalize(),w[R+0]=i.x*Math.sign(n.x)+t.x*c,w[R+1]=i.y*Math.sign(n.y)+t.y*c,w[R+2]=i.z*Math.sign(n.z)+t.z*c,v[R+0]=t.x,v[R+1]=t.y,v[R+2]=t.z,Math.floor(R/f)){case 0:b.set(1,0,0),u[S+0]=ze(b,t,"z","y",c,o),u[S+1]=1-ze(b,t,"y","z",c,a);break;case 1:b.set(-1,0,0),u[S+0]=1-ze(b,t,"z","y",c,o),u[S+1]=1-ze(b,t,"y","z",c,a);break;case 2:b.set(0,1,0),u[S+0]=1-ze(b,t,"x","z",c,r),u[S+1]=ze(b,t,"z","x",c,o);break;case 3:b.set(0,-1,0),u[S+0]=1-ze(b,t,"x","z",c,r),u[S+1]=1-ze(b,t,"z","x",c,o);break;case 4:b.set(0,0,1),u[S+0]=1-ze(b,t,"x","y",c,r),u[S+1]=1-ze(b,t,"y","x",c,a);break;case 5:b.set(0,0,-1),u[S+0]=ze(b,t,"x","y",c,r),u[S+1]=1-ze(b,t,"y","x",c,a);break}}static fromJSON(r){return new l(r.width,r.height,r.depth,r.segments,r.radius)}};var os=[.2,.21,.25],ss=[.365,1,.87];function Io({programs:l,text:r,dir:a}){let o=(t,i,w)=>ke(new bt(t,i,w,4,Math.min(w*.45,t*.12)),{color:os}),d=null;function c({w:t=.78,h:i=1.6,t:w=.09,emissive:v=1}={}){let u=new $e,f=new B(Ce([o(t,w,i),V(t*.965,w*.02,t*.012,{at:[0,w/2+.001,-i*.482],color:[.7,.72,.76],mat:1}),V(t*.965,w*.02,t*.012,{at:[0,w/2+.001,i*.482],color:[.7,.72,.76],mat:1}),V(t*.012,w*.02,i*.965,{at:[-t*.482,w/2+.001,0],color:[.7,.72,.76],mat:1}),V(t*.012,w*.02,i*.965,{at:[t*.482,w/2+.001,0],color:[.7,.72,.76],mat:1})]),l.solid({ambient:.32,house:1}));u.add(f);let b=new xe(t*.94,i*.96);b.rotateX(-Math.PI/2),b.translate(0,w/2+.003,0),d??(d=n(360,720,12));let x=l.paper({atlas:{value:d},house:0,ambient:v,defines:{}}),R=new B(b,x);return u.add(R),u.userData={screen:R,screenMaterial:x,w:t,h:i,t:w},u}function p({w:t=.78,h:i=1.6,t:w=.09,color:v=ss,alpha:u=.9}={}){let f=new so(new bt(t,w,i,3,Math.min(w*.45,t*.12)),10);return new eo(f,l.wire({color:v,alpha:u}))}function m({w:t=.78,h:i=1.6}={}){let w=Ne("phone-board"),v=l.solid({ambient:.14,house:1}),u=new B(o(t,.03,i),v),b=[V(t*.88,.016,i*.9,{color:[.05,.3,.2]}),V(t*.68,.03,i*.42,{at:[0,.02,i*.19],color:[.2,.22,.26]})];for(let Q=0;Q<30;Q+=1){let Z=.03+w()*.08,g=.03+w()*.09;b.push(V(Z,.018,g,{at:[(w()-.5)*t*.74,.016,-i*.28+(w()-.5)*i*.26],color:w()>.7?[.76,.58,.3]:[.1,.1,.12],mat:w()>.7?1:0}))}let x=new B(Ce(b),v),R=Ce([V(t,.05,.05,{at:[0,0,-i/2+.025],color:[.62,.64,.68],mat:1}),V(t,.05,.05,{at:[0,0,i/2-.025],color:[.62,.64,.68],mat:1}),V(.05,.05,i,{at:[-t/2+.025,0,0],color:[.62,.64,.68],mat:1}),V(.05,.05,i,{at:[t/2-.025,0,0],color:[.62,.64,.68],mat:1})]),S=new B(R,v),L=new xe(t*.94,i*.96);L.rotateX(-Math.PI/2);let G=l.paper({atlas:{value:r.texture},cell:[0,0,1,1],house:0,ambient:1}),oe=new B(L,G),se=new Le(t*.98,.006,i*.98),k=new B(se,l.glow({color:[.8,.9,1],alpha:.05,shape:5}));return{back:u,board:x,frame:S,display:oe,displayMaterial:G,glass:k}}function n(t,i,w,v){return r.canvas(t,i,(u,f,b)=>{if(u.fillStyle="#0b0d13",u.fillRect(0,0,f,b),v){v(u,f,b);return}let x=b/13;for(let R=0;R<w;R+=1){u.fillStyle="rgba(255,255,255,.07)",u.fillRect(f*.06,x*(R+1),f*.88,x*.74),u.fillStyle=R%3===0?"#5dffde":"#a48bff";let S=a<0?f*.78:f*.1;u.fillRect(S,x*(R+1)+x*.16,f*.12,x*.42),u.fillStyle="rgba(232,236,244,.7)",u.fillRect(a<0?f*.28:f*.26,x*(R+1)+x*.28,f*.46,x*.16)}})}return{make:c,wire:p,layers:m,listTexture:n}}var Te=4200,Do=.12,ns=.6,as=.03;function Ho({programs:l,shared:r,printTexture:a,dir:o}){let d=new et(new Float32Array(Te*2*3),3).setUsage(vt),c=new et(new Float32Array(Te*2*3),3).setUsage(vt),p=new et(new Float32Array(Te*2),1),m=new et(new Float32Array(Te*2),1).setUsage(vt),n=new et(new Float32Array(Te*2),1).setUsage(vt),t=new Uint32Array((Te-1)*6);for(let g=0;g<Te;g+=1)if(p.array[g*2]=-1,p.array[g*2+1]=1,g<Te-1){let F=g*2;t.set([F,F+1,F+2,F+1,F+3,F+2],g*6)}let i=new Kt;i.setAttribute("position",d),i.setAttribute("aAcross",c),i.setAttribute("aSide",p),i.setAttribute("aS",m),i.setAttribute("aW",n),i.setIndex(new et(t,1));let w={uFeed:{value:0},uLine:{value:1e6},uLineLen:{value:4},uJamA:{value:0},uJamB:{value:0},uJamK:{value:0},uFlutter:{value:1},uWide:{value:1e6},uPrint:{value:a},uPrintRange:{value:0},uPaperGlow:{value:.22},uLineColor:{value:[.365,1,.87]}},v=l.strip({uniforms:w,side:2}),u=new B(i,v);u.frustumCulled=!1;let f=new B(i,l.glow({color:[.365,1,.87],alpha:.5,shape:5,house:0,deform:{pars:"in vec3 aAcross; in float aSide, aS, aW; uniform float uLine, uLineLen; out float vSide, vAlive;",fpars:"in float vSide, vAlive;",local:`{
          float z = max(-(viewMatrix * vec4(p, 1.0)).z, 0.05);
          p += aAcross * aSide * min(max(aW * 5.0, 0.16), z * 0.02);
        }`,world:"vSide = aSide; vAlive = smoothstep(uLine + uLineLen * 0.7, uLine + uLineLen, aS);",frag:"a = (1.0 - abs(vSide)); a = a * a * vAlive;",uniforms:{uLine:w.uLine,uLineLen:w.uLineLen}}}));f.frustumCulled=!1;let b=new Float32Array(Te),x=new Float32Array(Te),R=0,S=0,L=0,G=(g,F,K,s,C,Y,P,U)=>{if(R>=Te)return;let D=R*2;d.setXYZ(D,g,F,K),d.setXYZ(D+1,g,F,K),c.setXYZ(D,s,C,Y),c.setXYZ(D+1,s,C,Y),m.setX(D,P),m.setX(D+1,P),n.setX(D,U),n.setX(D+1,U),b[R]=P,x[R]=F,R+=1};function oe({yaws:g,lineStartY:F,endY:K,dense:s}){R=0;let C=0,Y=.31*o,P=[[Y,.11,-.5],[Y,.085,-.43],[Y*.92,.012,-.34],[Y*.62,.003,-.24],[Y*.22,.003,-.11],[0,.003,-.025],[0,-.004,.008],[0,-.03,.012]],U=24,D=P[0];for(let ae=0;ae<P.length-1;ae+=1){let fe=P[Math.max(0,ae-1)],z=P[ae],T=P[ae+1],N=P[Math.min(P.length-1,ae+2)];for(let X=ae===0?0:1;X<=U;X+=1){let M=X/U,ne=M*M,ie=ne*M,ve=[0,1,2].map(we=>.5*(2*z[we]+(T[we]-fe[we])*M+(2*fe[we]-5*z[we]+4*T[we]-N[we])*ne+(3*z[we]-fe[we]-3*T[we]+N[we])*ie)),Pe=ve[0]-D[0],he=ve[1]-D[1],$=ve[2]-D[2];C+=Math.hypot(Pe,he,$);let Oe=Math.hypot(Pe,$)||1;G(ve[0],ve[1],ve[2],$/Oe||1,0,-Pe/Oe||0,C,Do),D=ve}}S=C,L=D[1];let q=D[1],pe=0;for(;q>K&&R<Te;){let ae=.22;q>te.slabBottom-.5&&(ae=.05);for(let ne of s)q<ne.a&&q>ne.b&&(ae=.022);for(q-=ae,C+=ae;pe<g.length-1&&q<g[pe+1].y;)pe+=1;let fe=g[pe],z=g[Math.min(pe+1,g.length-1)],T=z===fe?0:tt(.25,.75,(fe.y-q)/Math.max(.001,fe.y-z.y)),N=At(fe.yaw,z.yaw,T)*Math.PI/180,X=tt(te.floorY-.2,te.slabBottom+.2,q),M=At(Do,ns,X);q<F&&(M=At(M,as,tt(0,4,F-q))),G(0,q,0,Math.cos(N),0,Math.sin(N),C,M)}d.needsUpdate=!0,c.needsUpdate=!0,m.needsUpdate=!0,n.needsUpdate=!0,w.uLine.value=se(F),w.uPrintRange.value=se(te.floorY-.1),w.uWide.value=se(te.deskY)}function se(g){return S+(L-g)}function k(g){let F=0,K=R-1;for(;F<K;){let s=F+K>>1;b[s]<g?F=s+1:K=s}return F}let Q=-1/0;function Z(g,F){let K=g+F,s=K>L?0:k(se(K)),C=k(se(Math.max(g-F,Q))),Y=Math.max(0,C-s)*6;i.setDrawRange(s*6,Y)}return{mesh:u,halo:f,u:w,rebuild:oe,focus:Z,setEnd(g){Q=g},sAtY:se,pointAtY(g,F){return F[0]=0,F[1]=g,F[2]=0,F}}}var ls=460812,cs=12e3,us=190,ds=900,ps=()=>new Promise(l=>{window.scheduler?.yield?window.scheduler.yield().then(l):setTimeout(l,0)});async function Yt(l){let r=performance.now();for(;;){if(l.next().done)return;performance.now()-r>4&&(await ps(),r=performance.now())}}async function an({canvas:l,gl:r,tier:a,forced:o,onFail:d,onOff:c,onOn:p,isFailed:m}){Jt.enabled=!1;let n={...Po[a],instanceScale:1},t=document.documentElement,i=t.dir==="rtl"?-1:1,w=window.matchMedia("(pointer: coarse)").matches,v=new no({canvas:l,context:r,antialias:!0});v.outputColorSpace=jt,v.setClearColor(ls,1),v.sortObjects=!1,v.debug.checkShaderErrors=o,v.info.autoReset=!0;let u=new Qt,f=new Ct(30,1,.1,100);await Co(i<0);let b=Ao({q:n,dir:i}),x={uTime:{value:0},uInline:{value:i},uCamY:{value:0},uDawn:{value:0},uPower:{value:new Ke(0,0)},uPowerY:{value:0},uLitY:{value:new Ke(te.slabBottom,-120)},uFog:{value:new Ke(4,40)},uLampOrigin:{value:new ue},uLampPos:{value:new ue(.5*i,.62,-.62)},uLampDir:{value:new ue(0,-1,0)},uLampColor:{value:new ue(1,.7,.42)},uLampOn:{value:1},uLampCone:{value:new Ke(.55,.9)},uAtlas:{value:b.texture}},R=Lo(x),S=Ho({programs:R,shared:x,printTexture:b.printTexture,dir:i}),L=Fo({programs:R,shared:x,text:b,q:n,dir:i,tier:a}),G=ko({programs:R,shared:x,text:b,q:n,dir:i,tier:a}),oe=Io({programs:R,shared:x,text:b,dir:i}),se={desk:L,archive:G,strip:S,phone:oe};L.setPhone(oe.make({w:.0775,h:.16,t:.0085})),u.add(L.group,G.group,S.mesh,S.halo);let k=je.map((e,y)=>({meta:e,index:y,status:"idle",module:null,group:new $e,ctx:null,on:!1,a:0,s:0,e:0,b:0,promise:null})),Q=Object.fromEntries(k.map(e=>[e.meta.id,e]));k.forEach(e=>{e.group.visible=!1,u.add(e.group)});let Z=new B(new xe(2,2),new Lt({glslVersion:Et,uniforms:{uDim:{value:0}},vertexShader:"in vec3 position; void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }",fragmentShader:`precision mediump float; uniform float uDim; out vec4 fragColor;
        void main() { fragColor = vec4(0.0275, 0.0314, 0.0471, uDim); }`,transparent:!0,depthTest:!1,depthWrite:!1}));Z.frustumCulled=!1,Z.visible=!1,u.add(Z);let g=null,F=null,K=null,s=1,C=1/0,Y=0,P=0,U=0,D=()=>g.svh*.15,q=go({inPlace:!w,blur:!w&&a!=="L"}),pe=Wt();function ae(e){let y=[],O=[],H=[];for(let[J,ee]of Object.entries(e.shots))ee.caption&&(J==="hero"?y.push([0,ee.pinEnd]):(y.push([ee.pinStart-.35*e.svh,ee.pinEnd]),O.push(ee.pinStart)),H.push(ee.pinEnd));return{zones:y,down:O,up:H}}function fe(){q.release(),g=Mo();let e=io(g,je);q.bake(g,e.map(W=>W.y)),pe.bake(ae(g),g.docH,g.svh);let y=ro(g,je);F=y.solved,s=g.docH,K=lo(y.knots,s,e.filter(W=>W.to-W.from>=1).map(W=>W.y));let O=F["svc.auto"],H=F["process.head"],J=F["why.q"],ee=je.filter(W=>W.floor&&W.stripYaw!==void 0).map(W=>({y:F[W.id].floorY,yaw:W.stripYaw}));ee.unshift({y:te.deskY,yaw:0}),ee.push({y:O.floorY+3,yaw:0},{y:O.floorY+1,yaw:90},{y:O.floorY-3,yaw:90},{y:H.floorY+2,yaw:0}),ee.sort((W,ge)=>ge.y-W.y),S.rebuild({yaws:ee,lineStartY:O.floorY-1.8,endY:J.floorY+.03,dense:[{a:F["svc.rescue"].floorY+2.4,b:F["svc.rescue"].floorY-2.4}]}),x.uLitY.value.set(te.slabBottom,H.floorY+4),G.setRange(te.slabBottom,H.floorY);let De=W=>e.find(ge=>ge.after===W).y;Y=De("svc.head"),P=Y,C=De("why.q"),U=C;for(let W of k){let ge=W.index,Se=g.shots[W.meta.id],Ze=ge>0?g.shots[je[ge-1].id]:null,mt=ge<je.length-1?g.shots[je[ge+1].id]:null;W.a=Ze?Ze.pinEnd:0,W.s=Se.pinStart,W.e=Se.pinEnd,W.b=mt?mt.pinStart:s;for(let Qe of e)Qe.before===W.meta.id?W.b=Qe.y:Qe.after===W.meta.id&&(W.a=Qe.y);let kt=F[W.meta.id];W.group.position.set(0,kt.floorY??0,0),W.status==="ready"&&W.module.layout&&W.module.layout(W.ctx)}L.setActPositions(F.deskAct4),X()}let z=1,T=0,N=null;function X(){let e=g.W,y=g.H,O=n.pixelCap*z,H=Math.min(window.devicePixelRatio||1,Math.sqrt(O/(e*y)));v.setPixelRatio(H),v.setSize(e,y,!1),f.aspect=e/y,N?.resize(e*H,y*H)}let M=[],ne=e=>({tier:a,q:n,dir:i,id:e.meta.id,group:e.group,programs:R,u:x,text:b,sets:se,camera:f,renderer:v,rng:Ne(e.meta.id),get solved(){return F},get layout(){return g},get self(){return F[e.meta.id]},place(y,{inline:O=0,y:H=0,z:J=0,yaw:ee=0}={}){return y.position.set(O*i,H,J),y.rotation.y=ee*i,y},hotspots:{add(y){M.push({...y,runtime:e})}}});async function ie(e){if(e.status!=="ready")return e.promise||(e.status="loading",e.promise=(async()=>{try{let O=(await To[e.meta.id]()).default;e.ctx=ne(e),await Yt(O.build(e.ctx)),await v.compileAsync(e.group,f,u),O.layout&&O.layout(e.ctx),e.module=O,e.status="ready",ye=!0}catch(y){console.warn(`shot ${e.meta.id} failed`,y),e.status="failed"}})()),e.promise}function ve(e){for(let y=k.length-1;y>=0;y-=1)if(e>=k[y].a)return y;return 0}let Pe=!1;async function he(){if(!Pe){for(Pe=!0;!(it||m());){let e=ve(I),y=null,O=1/0;for(let H of k)if(H.status==="idle"){let J=Math.abs(H.index-e);J<O&&(y=H,O=J)}if(!y)break;await new Promise(H=>{"requestIdleCallback"in window?window.requestIdleCallback(H,{timeout:200}):setTimeout(H,16)}),await ie(y)}Pe=!1}}let $=new Float32Array(14),Oe=new Xt,we=new ue(0,1,0),nt=new ue(1,0,0),re={t:0,enter:0,hold:0,exit:0,y:0,v:0,time:0,dt:0,px:0,py:0,pointer:0},le=xo(window.scrollY),at=yo(pe),I=le.y,Ue=0,Mt=0,it=!1,rt=null,ye=!0,Fe=0,Ve=performance.now(),lt=0,Re=performance.now(),ht=0,qe=0,Ee=0,be=0,Xe=0,Ie=0,Be=!1;function ct(e,y){let O=H=>Math.min(1,Math.max(0,H));re.t=e.b>e.a?O((I-e.a)/(e.b-e.a)):1,re.enter=e.s>e.a?O((I-e.a)/(e.s-e.a)):I>=e.s?1:0,re.hold=e.e>e.s?O((I-e.s)/(e.e-e.s)):I>=e.e?1:0,re.exit=e.b>e.e?O((I-e.e)/(e.b-e.e)):I>=e.b?1:0,re.y=I/g.pace,re.v=le.v,re.time=Fe,re.dt=y,re.px=be,re.py=Xe,re.pointer=Ee}let Me=(e,y)=>y>e?Math.min(1,Math.max(0,(I-e)/(y-e))):I>=y?1:0,We=e=>e*e*(3-2*e);function Rt(){let e=g.shots["process.head"];G.u.uTurn.value=We(Me(e.pinStart,e.pinEnd));let y=g.shots["why.list"],O=g.shots["why.stats"],H=g.shots.cta,J=Me(y.pinStart,y.pinEnd)*3.2;L.setClear(J);let ee=We(Me(y.pinStart+(y.pinEnd-y.pinStart)*.45,H.pinStart));x.uDawn.value=ee,L.setClock(3.2+We(Me(y.pinStart,O.pinEnd))*3.8);let De=g.shots.hero;if(I<C){let Se=g.shots.drop.pinEnd-De.pinEnd;L.setRing(1-Me(De.pinEnd,De.pinEnd+Se*.14)),L.setOffHook(We(Me(De.pinEnd,De.pinEnd+Se*.22)))}else L.setRing(1-Me(y.pinStart,y.pinStart+(y.pinEnd-y.pinStart)*.5)),L.setOffHook(0);let W=L.phone;if(W.visible=I>C,S.setEnd(-1/0),I>C){let Se=g.shots["why.q"],Ze=F["why.q"].d*.62,mt=We(Me(g.shots.fall.pinEnd-(g.shots.fall.pinEnd-C)*.2,Se.pinEnd)),kt=We(Me(y.pinStart,y.pinStart+(y.pinEnd-y.pinStart)*.14)),Qe=Ze+(.42-Ze)*mt,Gt=Qe+(.0043-Qe)*kt;W.position.y=Gt;let No=2.1+(1-2.1)*mt;W.scale.setScalar(No),W.rotation.y=g.portrait?0:Math.PI/2*We(Me(O.pinEnd,H.pinStart)),S.setEnd(L.group.position.y+Gt+.01)}let ge=k.find(Se=>Se.meta.id==="svc.rescue");(I<ge.a||I>ge.b)&&(x.uPower.value.set(0,0),S.u.uJamK.value=0)}function Ye(e){co(K,s,I,$),f.position.set($[0],$[1],$[2]),f.quaternion.set($[3],$[4],$[5],$[6]),Ee===1&&(Oe.setFromAxisAngle(we,-be*.012),f.quaternion.multiply(Oe),Oe.setFromAxisAngle(nt,Xe*.009),f.quaternion.multiply(Oe)),f.fov=$[7],f.near=$[8],f.far=$[9],f.setViewOffset(g.W,g.H,$[11],$[12],g.W,g.H),x.uTime.value=Fe,x.uCamY.value=$[1],x.uFog.value.set($[10]*.16,$[10]),Z.visible=$[13]>.002,Z.material.uniforms.uDim.value=Math.min(1,$[13]),Rt();let y=I<Y||I>C,O=I>C?4:1;L.group.visible=y,L.setAct(O),G.group.visible=I>P&&I<U,x.uLampOn.value=y?1-x.uDawn.value*.72:0,x.uLampOrigin.value.copy(L.group.position),x.uLampColor.value.set(1,.7,.42),S.u.uFeed.value=I*18e-5/g.pace,ct(k[0],e),y&&(L.resetSpot(),L.update(re,Fe));for(let H of k){let J=I>=H.a-D()&&I<=H.b+D();H.status==="ready"&&(J||H.on)&&(ct(H,e),H.module.update(re,H.ctx),H.on=J,H.group.visible=J)}S.focus($[1],$[9]),f.updateProjectionMatrix(),f.updateMatrixWorld(),N?N.render(u,f):v.render(u,f)}let Je=new zt({onChange(e,y){St(y)}});function St(e){if(e==="pixel-85"||e==="pixel-72")T=e==="pixel-85"?.85:.72;else if(e==="drop-film")N?.dispose(),N=null;else if(e==="instances-70"||e==="instances-50")n.instanceScale=e==="instances-70"?.7:.5,L.setDensity(n.instanceScale),G.setDensity(n.instanceScale);else if(e==="shadow-1")L.setShadowTaps(1);else if(e==="extras-off")G.setWeather(!1),L.setExtras(!1);else if(e==="cadence-30")Ie=33.3;else if(e==="stills"){try{window.localStorage.setItem("enjaz:tier",`S:${Date.now()}`)}catch{}A(),c("governor")}}function h(e){if(it)return;if(window.requestAnimationFrame(h),document.hidden||Be||rt!==null){Ve=e;return}let y=e-Ve;Ve=e;let O=Math.min(y,100)/1e3;Fe+=O;let H=window.scrollY,J=at.step(H,O,g.svh,e);J!==H&&window.scrollTo({top:J,behavior:"instant"}),q.update(J,O),!Ue&&Math.abs(J-I)>6*g.svh&&e>Mt?(Ue=e,t.classList.add("world-dip")):Ue&&e-Ue>=us&&(le.land(J,g.svh),Ue=0,Mt=e+ds,t.classList.remove("world-dip"));let ee=Math.abs(J-le.y)>.25||Math.abs(le.v)>2;I=le.step(J,O,g.svh,pe.speed(le.y)),be+=(ht-be)*Math.min(1,O*6),Xe+=(qe-Xe)*Math.min(1,O*6);let De=Math.abs(ht-be)>.001||Math.abs(qe-Xe)>.001,ge=k[ve(I)].meta.idleHz,Se=ee||De||ye;if(!Se&&ge>0&&!(a==="L"&&e-Re>cs)&&(Se=e-lt>=1e3/ge-1),Ie&&e-lt<Ie-2&&(Se=!1),!Se)return;ee&&(Re=e),T&&(!ee||I>g.shots.fall.pinStart&&I<g.shots.fall.pinEnd)&&(z=T,T=0,X()),ye=!1;let Ze=(e-lt)/1e3;lt=e,Ye(Math.min(Ze,.1)),y<250&&(ee||ge>0)&&Je.push(y)}function E(){at.on=!1,Ue=0,t.classList.remove("world-dip")}function A(){it=!0,E(),q.release()}window.addEventListener("pointermove",e=>{Ee=e.pointerType==="mouse"?1:2,ht=e.clientX/window.innerWidth*2-1,qe=e.clientY/window.innerHeight*2-1,Re=performance.now()},{passive:!0});let _=new ue;window.addEventListener("click",e=>{if(!e.target.closest?.("a, button, .shot"))for(let y of M){if(!y.runtime.on)continue;_.set(y.center[0],y.center[1],y.center[2]),y.runtime.group.localToWorld(_).project(f);let O=(_.x*.5+.5)*g.W,H=(.5-_.y*.5)*g.H;Math.hypot(O-e.clientX,H-e.clientY)<y.radius&&(y.runtime.module.hit?.(y.id,re,y.runtime.ctx),ye=!0)}},{passive:!0}),window.addEventListener("pageshow",()=>{le.reset(window.scrollY),I=le.y,ye=!0});let j=0;if(l.addEventListener("webglcontextlost",e=>{e.preventDefault(),Be=!0,E(),j+=1,c("context-lost")}),l.addEventListener("webglcontextrestored",()=>{j>1||(Be=!1,L.bakeShadow(v),p(),fe(),le.reset(window.scrollY),I=le.y,ye=!0)}),fe(),le.reset(window.scrollY),I=le.y,await Yt(L.build()),await Yt(G.build()),await ie(Q.hero),await ie(Q.drop),await v.compileAsync(u,f),L.bakeShadow(v),m())return null;if(!o){let e=[],y=new Uint8Array(4);for(let H=0;H<6;H+=1){await new Promise(ee=>window.requestAnimationFrame(ee));let J=performance.now();Ye(.016),r.readPixels(0,0,1,1,r.RGBA,r.UNSIGNED_BYTE,y),e.push(performance.now()-J)}let O=e.slice(2).sort((H,J)=>H-J)[1];if(O>40){try{window.localStorage.setItem("enjaz:tier",`S:${Date.now()}`)}catch{}return d("bench"),null}O>20&&(z=.7,n.instanceScale=.7,L.setDensity(.7),G.setDensity(.7),X())}n.film&&(N=(await import("./chunk-WOIDP7SL.js")).createFilm(v),N.resize(g.W*v.getPixelRatio(),g.H*v.getPixelRatio())),le.reset(window.scrollY),I=le.y,q.update(I,0),Ye(.016),t.classList.add("world-on"),window.requestAnimationFrame(h),he(),window.addEventListener("wheel",e=>{e.ctrlKey||it||Be||rt!==null||document.body.classList.contains("is-nav-open")||Math.abs(e.deltaX)>Math.abs(e.deltaY)||(e.preventDefault(),at.input(e.deltaY,e.deltaMode,window.scrollY,g.svh,g.docH-g.svh,performance.now()),Re=performance.now())},{passive:!1});let ce=So(()=>{fe(),ye=!0});/[?&]hud=1\b/.test(window.location.search)&&import("./chunk-FKFVKEYL.js").then(e=>e.mountHud({renderer:v,governor:Je,tier:a,q:n,get y(){return I}}));let me={tier:a,renderer:v,governor:Je,scene:u,stop:A,pacer:pe,get layout(){return g},get solved(){return F},get y(){return I},seek(e){return window.scrollTo({top:e,behavior:"instant"}),E(),le.reset(window.scrollY),I=le.y,q.update(I,0),Ye(.016),I},freeze(e){rt=e,Fe=e},unfreeze(){rt=null},renderOnce(){Ye(.016)},info(){return Ye(.016),{calls:v.info.render.calls,triangles:v.info.render.triangles,programs:v.info.programs.length,rung:Je.rung,y:I}},sceneInfo(){let e=N;N=null,Ye(.016);let y={calls:v.info.render.calls,triangles:v.info.render.triangles};return N=e,y},feedFrameTimes(e){e.forEach(y=>Je.push(y))},async loadAll(){await Promise.all(k.map(e=>ie(e))),ye=!0},status(){return Object.fromEntries(k.map(e=>[e.meta.id,e.status]))},dispose(){A(),ce()}};return window.__enjazWorld=me,me}export{an as start};
