/* three.js r187 (c) three.js authors, MIT. ENJAZ film. */
import{a as te,b as ao,c as io,d as ro}from"./chunk-6ETZZDVU.js";import{a as lo,b as co,c as uo,d as po,e as fo,f as It,g as ho,h as mo}from"./chunk-2EEOQMQQ.js";import{c as Fe,d as j,f as Ae,g as Ne,h as Pe,i as Oe,j as no,k as St,l as Qe}from"./chunk-GBHZZ3DY.js";import{A as Kt,B as eo,C as Ee,D as Ft,E as to,J as Le,N as oo,O as bt,S as so,a as zt,c as Tt,d as Rt,e as it,f as Wt,g as Yt,h as Gt,i as Ut,j as qt,k as ht,l as $t,m as Xe,n as jt,o as ce,p as Vt,q as Xt,r as kt,t as qe,u as Jt,v as Je,w as Qt,x as W,z as Zt}from"./chunk-ZD75F7KI.js";import"./chunk-AEJNSRIJ.js";var Mt=l=>Math.min(1,Math.max(0,l));function vo({inPlace:l,blur:a}){let n=[],t=NaN,u=0,c=0;function d(i){i.el.style.opacity="",i.el.style.transform="",i.el.classList.remove("is-gone");for(let o of i.kids)o.style.opacity="",o.style.transform="",o.style.filter=""}function f(i,o,r,m){let w=o<.5;if(w!==i.gone&&(i.gone=w,i.el.classList.toggle("is-gone",w),document.dispatchEvent(new CustomEvent("enjaz:captions"))),o===1&&r===0){d(i);return}i.el.style.opacity=Mt(o/.55).toFixed(3),i.el.style.transform=r?`translate3d(0, ${r.toFixed(1)}px, 0)`:"";let v=i.kids.length,g=v>1?Math.min(.14,.5/(v-1)):0,S=1-(v-1)*g;i.kids.forEach((x,k)=>{let y=Mt((o-k*g)/S);if(y===1){x.style.opacity="",x.style.transform="",x.style.filter="";return}let L=1-y;x.style.opacity=y.toFixed(3),x.style.transform=`translate3d(0, ${(L*L*L*1.1*(m?-1:1)).toFixed(3)}em, 0)`,a&&(x.style.filter=`blur(${(L*.28).toFixed(3)}em)`)})}return{bake(i){let o=.35*i.svh;n=[];for(let[r,m]of Object.entries(i.shots)){if(!m.caption||m.caption.h>i.svh*.7)continue;let w=document.querySelector(`[data-shot="${r}"] > .shot`);w&&n.push({el:w,kids:[...w.children],a:r==="hero"?-1:m.pinStart-o,s:r==="hero"?-1:m.pinStart,e:m.pinEnd,b:m.pinEnd+o,shown:-1,shift:0,gone:!1})}t=NaN},update(i,o){u=i===t?u+o:0,t=i,c=u>.25?Math.min(1,c+o/.4):Math.max(0,c-o/.12);for(let r of n){let m=r.s>r.a?Mt((i-r.a)/(r.s-r.a)):1,w=Mt((i-r.e)/(r.b-r.e)),v=i>r.a&&i<r.b,g=v?Math.max(Math.min(m,1-w),c):0,S=0;l&&v&&(S=m<1?(i-r.s)*.85:w>0?(i-r.e)*.85:0),(g!==r.shown||S!==r.shift)&&(r.shown=g,r.shift=S,f(r,g,S,w>0))}},release(){for(let i of n)d(i),i.shown=-1,i.gone=!1}}}var Ht=["pixel-85","pixel-72","drop-film","instances-70","instances-50","shadow-1","extras-off","cadence-30","stills"];function Dt(l,a){return l[Math.min(l.length-1,Math.floor(l.length*a))]}var Et=class{constructor({onChange:a=()=>{}}={}){this.onChange=a,this.buffer=new Float32Array(90),this.sorted=new Float32Array(90),this.count=0,this.head=0,this.rung=-1,this.elapsed=0,this.overBudget=0,this.underBudget=0,this.cooldown=0,this.climbs=0,this.upWait=240,this.locked=!1,this.refreshCap=!1,this.seen=0,this.belowBail=0,this.p50=0,this.p90=0,this.vsync=16.6}target(){return this.refreshCap?33.3:Math.max(this.vsync,16.6)}push(a){if(this.elapsed+=a,this.elapsed<1e3||a>250||(this.buffer[this.head]=a,this.head=(this.head+1)%90,this.count=Math.min(90,this.count+1),this.seen+=1,this.cooldown=Math.max(0,this.cooldown-a),this.count<90/2))return;this.sorted.set(this.buffer);let n=this.sorted.subarray(0,this.count).sort();this.p50=Dt(n,.5),this.p90=Dt(n,.9),this.vsync=Dt(n.subarray(0,Math.max(1,Math.floor(this.count*.2))),.5),this.seen<=60&&Math.abs(this.p50-33.3)/33.3<.04&&this.p90/this.p50<1.08&&(this.refreshCap=!0);let t=this.target();if(this.p90>t*1.25?(this.overBudget+=1,this.underBudget=0):this.p90<t*.75?(this.underBudget+=1,this.overBudget=0):(this.overBudget=0,this.underBudget=0),this.rung===Ht.length-2&&this.p50>50){if(this.belowBail+=a,this.belowBail>4e3){this.step(1);return}}else this.belowBail=0;this.cooldown>0||(this.overBudget>=45&&this.rung<Ht.length-2?(this.underBudgetClimbed&&(this.upWait*=2,this.underBudgetClimbed=!1),this.step(1)):this.underBudget>=this.upWait&&this.rung>=0&&!this.locked&&(this.climbs+=1,this.underBudgetClimbed=!0,this.climbs>=2&&(this.locked=!0),this.step(-1)))}step(a){this.rung+=a,this.overBudget=0,this.underBudget=0,this.cooldown=1500,this.count=0,this.onChange(this.rung,Ht[this.rung]??"full")}};var mt=(l,a,n)=>Math.min(n,Math.max(a,l));var Ho=l=>l*l*(3-2*l);function Nt(){let l=0,a=1,n=null,t=null,u=[],c=[],d=f=>Math.min(8191,Math.max(0,f/a));return{bake({zones:f,down:i=[],up:o=[]},r,m){l=Math.max(1,r),a=l/8191,n=new Float64Array(8192),t=new Float32Array(8192);let w=.45*m;for(let v=0;v<8192;v+=1){let g=v*a,S=1/0;for(let[x,k]of f)S=Math.min(S,g<x?x-g:g>k?g-k:0);t[v]=1+3*Ho(Math.min(1,S/w)),v>0&&(n[v]=n[v-1]+a*2/(t[v-1]+t[v]))}u=i.map(Math.round).sort((v,g)=>v-g),c=o.map(Math.round).sort((v,g)=>g-v)},speed(f){return t?t[Math.round(d(f))]:1},toEffort(f){if(!n)return f;let i=d(f),o=Math.min(8190,Math.floor(i)),r=Math.max(0,f-l)+Math.min(0,f);return n[o]+(n[o+1]-n[o])*(i-o)+r},fromEffort(f){if(!n)return f;let i=n[8191];if(f<=0||f>=i)return f<=0?f:l+(f-i);let o=0,r=8191;for(;r-o>1;){let m=o+r>>1;n[m]<=f?o=m:r=m}return(o+(f-n[o])/(n[r]-n[o]))*a},stop(f,i){return i>f?u.find(o=>o>f+.5&&o<=i)??null:c.find(o=>o<f-.5&&o>=i)??null}}}function wo(l=0){return{y:l,v:0,step(a,n,t,u=1){let d=10*n,f=1/(1+d+.48*d*d+.235*d*d*d),i=4.2*Math.min(u,2.5)*t*.2,o=mt(this.y-a,-i,i),r=(this.v+10*o)*n;return this.v=(this.v-10*r)*f,this.y=this.y-o+(o+r)*f,Math.abs(this.y-a)<.25&&Math.abs(this.v)<2&&(this.y=a,this.v=0),this.y},reset(a){this.y=a,this.v=0},land(a,n){let t=Math.sign(a-this.y);this.y=a-t*.8*n,this.v=t*4.2*n*.5}}}function go(l=Nt()){return{on:!1,at:0,aim:0,written:0,rest:null,input(a,n,t,u,c,d=0){this.on||(this.on=!0,this.at=t,this.aim=t,this.written=t);let i=mt(a*(n===1?40:n===2?u:1),-200,200),o=this.rest;if(o&&Math.sign(i)===o.dir&&Math.abs(this.at-o.y)<2){let x=d-o.since;if(x<.35*1e3||x<1.2*1e3&&d-o.last<.14*1e3){o.last=d,this.aim=this.at;return}}this.rest=null;let r=Math.sign(i)===-Math.sign(this.aim-this.at)?this.at:this.aim,m=1.6*u,w=l.toEffort(this.at),v=mt(l.toEffort(r)+i,w-m,w+m),g=mt(l.fromEffort(v),0,c),S=l.stop(this.at,g);S!==null&&(g=S),this.aim=g},step(a,n,t,u=0){if(!this.on)return a;if(Math.abs(a-this.written)>2)return this.on=!1,this.rest=null,a;let c=l.toEffort(this.at),d=l.fromEffort(c+(l.toEffort(this.aim)-c)*(1-Math.exp(-12*n))),f=3.5*Math.min(l.speed(this.at),2.5)*t*n;if(this.at+=mt(d-this.at,-f,f),Math.abs(this.aim-this.at)<.5){let i=Math.sign(this.aim-this.written);this.at=this.aim,this.on=!1,l.stop(this.aim-i*3,this.aim)===this.aim&&(this.rest={y:this.aim,dir:i,since:u,last:u})}return this.written=Math.round(this.at),this.written}}}var xo=l=>{let a=document.createElement("div");a.style.position="fixed",a.style.top="0",a.style.width="0",a.style.visibility="hidden",a.style.height=`100${l}`,document.body.appendChild(a);let n=a.getBoundingClientRect().height;return a.remove(),n},vt=l=>parseFloat(l)||0;function yo(){let l=xo("svh"),a=xo("lvh"),n=document.documentElement.clientWidth,t=a,u=window.scrollY,c=document.querySelector("[data-nav]"),d=c?c.getBoundingClientRect().height:0,f=document.documentElement.dir==="rtl"?-1:1,i=document.documentElement.scrollHeight,o=getComputedStyle(document.documentElement),r=parseFloat(o.getPropertyValue("--pace"))||1,m=parseFloat(o.getPropertyValue("--pace-gap"))||r,w={};for(let v of document.querySelectorAll("[data-shot]")){let g=v.dataset.shot,S=v.getBoundingClientRect(),x=S.top+u,k=v.querySelector(":scope > .shot"),y={id:g,top:x,height:S.height,caption:null,pinStart:x,pinEnd:x};if(k){let L=k.getBoundingClientRect(),G=getComputedStyle(v),ae=getComputedStyle(k),ie=vt(G.paddingBlockEnd);if(g==="hero"){let F=vt(ae.insetBlockStart),se=vt(ae.marginBlockEnd),E=vt(G.paddingBlockStart);y.pinStart=0,y.pinEnd=Math.max(0,S.height-E-L.height-se),y.caption={x:L.left,y:F,w:L.width,h:L.height}}else{let F=vt(ae.insetBlockEnd);y.pinStart=x+L.height+F-l,y.pinEnd=y.pinStart+Math.max(0,S.height-ie-L.height),y.caption={x:L.left,y:l-F-L.height,w:L.width,h:L.height},y.pin=F,y.gap=ie}}w[g]=y}return{W:n,H:t,svh:l,lvh:a,navH:d,docH:i,dir:f,pace:r,paceGap:m,portrait:t>=n,shots:w}}function bo(l){let a=window.matchMedia("(pointer: coarse)").matches,n=document.documentElement.clientWidth,t=document.documentElement.scrollHeight,u=0,c=()=>{window.clearTimeout(u),u=window.setTimeout(l,160)},d=new ResizeObserver(()=>{let f=document.documentElement.clientWidth,i=document.documentElement.scrollHeight;if(f===n&&i===t)return;let o=a&&f===n&&Math.abs(i-t)<200;n=f,t=i,o||c()});return d.observe(document.documentElement),document.fonts?.ready.then(c),document.fonts?.addEventListener?.("loadingdone",c),()=>d.disconnect()}var lt=`
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
`,ct=`
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
`,Do=`
${lt}
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
}`,No=`
${ct}
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
}`,Oo=`
${lt}
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
}`,_o=`
${ct}
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
}`,Bo=`
${lt}
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
}`,Wo=`
${ct}
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
}`,Yo=`
${lt}
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
}`,Go=`
${ct}
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
}`,Uo=`
${lt}
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
}`,qo=`
${ct}
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
}`,$o=`
${lt}
in vec3 position;
out float vFog;
//#pars
void main() {
  vec3 p = position;
  //#local
  vec3 wp = (modelMatrix * vec4(p, 1.0)).xyz;
  gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
  vFog = fogAt(wp);
}`,jo=`
${ct}
uniform vec3 uColor;
uniform float uAlpha;
in float vFog;
void main() {
  fragColor = vec4(uColor * uAlpha * (1.0 - clamp(vFog, 0.0, 1.0)), 1.0);
}`;function So(l,a={}){return l.replace("//#pars",a.pars??"").replace("//#fpars",a.fpars??"").replace("//#local",a.local??"").replace("//#world",a.world??"").replace("//#frag",a.frag??"")}function Ze(l,{mips:a=!0,repeat:n=!1}={}){let t=new Kt(l);return t.colorSpace=Gt,t.generateMipmaps=a,t.minFilter=a?Wt:it,t.magFilter=it,n&&(t.wrapS=Rt,t.wrapT=Rt),t}function Vo(){let a=document.createElement("canvas");a.width=256*2,a.height=256;let n=a.getContext("2d"),t=(u,c,d)=>{let f=n.createRadialGradient(u+107.52,76.8,5.12,u+128,128,184.32);c.forEach(([o,r])=>f.addColorStop(o,r)),n.fillStyle=f,n.fillRect(u,0,256,256);let i=n.createRadialGradient(u+256*.38,256*.24,0,u+256*.38,256*.24,256*.26);i.addColorStop(0,d),i.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=i,n.fillRect(u,0,256,256)};return t(0,[[0,"#bcbcc0"],[.5,"#8c8d92"],[.85,"#55565c"],[1,"#35363c"]],"rgba(255,255,255,.18)"),t(256,[[0,"#f6d58c"],[.45,"#c9963f"],[.8,"#6e4a1c"],[1,"#2c1c0a"]],"rgba(255,244,214,.75)"),Ze(a,{mips:!1})}function Mo(l){let a=Vo(),n=(t,u,c,d,f={})=>{let{deform:i,defines:o,...r}=f;return new oo({name:t,glslVersion:$t,vertexShader:So(u,i),fragmentShader:So(c,i),defines:o??{},uniforms:{...l,...d,...i?.uniforms??{}},...r})};return{matcap:a,solid(t={}){return n("solid",Do,No,{uMatcap:{value:a},uEmit:{value:t.emit??[0,0,0]},uAmbient:{value:t.ambient??.06},uHouse:{value:t.house??1}},rt(t,["emit","ambient","house"]))},paper(t={}){return n("paper",Oo,_o,{uAtlas:t.atlas??l.uAtlas,uCell:{value:t.cell??[0,0,1,1]},uAmbient:{value:t.ambient??.07},uHouse:{value:t.house??1},uLitBoost:{value:t.boost??1}},{side:zt,...rt(t,["atlas","cell","ambient","house","boost"])})},wood(t={}){return n("wood",Bo,Wo,{uHouse:{value:0},...t.uniforms},rt(t,["uniforms"]))},strip(t={}){return n("strip",Yo,Go,{uHouse:{value:1},...t.uniforms},rt(t,["uniforms"]))},glow(t={}){return n("glow",Uo,qo,{uColor:{value:t.color??[1,1,1]},uAlpha:{value:t.alpha??1},uShape:{value:t.shape??0},uRadius:{value:0},uMap:{value:t.map??a},uHouse:{value:t.house??0}},{transparent:!0,depthWrite:!1,blending:Tt,side:zt,...rt(t,["color","alpha","shape","map","house"])})},wire(t={}){return n("wire",$o,jo,{uColor:{value:t.color??[.365,1,.87]},uAlpha:{value:t.alpha??1},uHouse:{value:0}},{transparent:!0,depthWrite:!1,blending:Tt,...rt(t,["color","alpha"])})}}}function rt(l,a){let n={};for(let t of Object.keys(l))a.includes(t)||(n[t]=l[t]);return n}var We=4,Xo=["invoice","receipt","quote","ledger","sheet","slip","lines","dossier","carbon","memo","tape","blank"],Jo=l=>{let a=new Set;for(let n of document.querySelectorAll(l)){let t=n.textContent.trim();t&&t!=="\u2726"&&a.add(t)}return[...a]};async function Eo(l){let a=[document.fonts.load('400 20px "IBM Plex Mono"',"#REF! 0123"),document.fonts.load(l?'700 48px "Noto Kufi Arabic"':'700 48px "Space Grotesk"',l?"\u0625\u0646\u062C\u0627\u0632":"ENJAZ")];await Promise.race([Promise.allSettled(a),new Promise(n=>setTimeout(n,1500))])}function Lo({q:l,dir:a}){let n=a<0,t=document.querySelector("main"),u={};try{u=JSON.parse(t?.dataset.atlas??"{}")}catch{u={}}let c=Jo(".ticker__track span"),d=[];try{d=JSON.parse(document.querySelector("[data-typewriter]")?.dataset.typewriter??"[]")}catch{d=[]}let f=n?'"Noto Kufi Arabic", system-ui':'"Space Grotesk", system-ui',i='"IBM Plex Mono", monospace',o=new Intl.NumberFormat(n?"ar-EG":"en-US",{useGrouping:!1}),r=l.atlas,m=document.createElement("canvas");m.width=r,m.height=r;let w=m.getContext("2d"),v=r/We;w.fillStyle="#fff",w.fillRect(0,0,r,r);let g="#23252e",S="#9aa0ad",x=(s,T)=>{let Y=s%We,z=Math.floor(s/We);w.save(),w.beginPath(),w.rect(Y*v,z*v,v,v),w.clip(),w.translate(Y*v,z*v),w.scale(v/100,v/134),w.direction=n?"rtl":"ltr",w.textBaseline="alphabetic",T(w),w.restore()},k=s=>n?100-s:s,y=(s,T,Y,z=12)=>{s.fillStyle=g,s.font=`700 ${z}px ${f}`,s.textAlign="start",s.fillText(T,k(8),Y)},L=(s,T,Y=8,z=92,U=S,I=.7)=>{s.fillStyle=U,s.fillRect(Y,T,z-Y,I)},G=(s,T,Y,z,U=0)=>{for(let I=0;I<Y;I+=1){let $=34+(I*37+U)%40;s.fillStyle=I%3===0?g:S,s.fillRect(n?92-$:8,T+I*z,$,1.4),s.fillStyle=S,s.fillRect(n?8:80,T+I*z,12,1.4)}};x(0,s=>{y(s,u.invoice??"",20,14),L(s,26),G(s,34,9,7),L(s,104,8,92,g,1),s.fillStyle=g,s.font=`600 9px ${i}`,s.textAlign=n?"left":"right",s.fillText(o.format(4820),n?8:92,116)}),x(1,s=>{y(s,u.receipt??"",18,12),L(s,24),G(s,32,7,6,11),s.fillStyle=g,s.fillRect(30,100,40,12)}),x(2,s=>{y(s,u.quote??"",22,15),L(s,28),G(s,38,6,8,23),s.save(),s.translate(68,104),s.rotate(-.26),s.strokeStyle="#5e4bd8",s.lineWidth=2,s.strokeRect(-23,-9,46,18),s.fillStyle="#5e4bd8",s.font=`700 10px ${f}`,s.textAlign="center",s.fillText(u.paid??"",0,4),s.restore()});let ae=(s,T)=>{let Y=n?8:16;s.fillStyle="#e6f6ee";for(let z=0;z<18;z+=2)s.fillRect(0,6+z*7,100,7);s.strokeStyle="#a9b7ae",s.lineWidth=.4;for(let z=0;z<=4;z+=1)s.beginPath(),s.moveTo(Y+z*19,0),s.lineTo(Y+z*19,134),s.stroke();s.font=`400 4.8px ${i}`,s.textAlign="center";for(let z=0;z<18;z+=1){s.fillStyle=S,s.fillText(o.format(z+1),n?96:8,11.5+z*7);for(let U=0;U<4;U+=1){let I=(z*7+U*13)%23,$=o.format(100+I*317);T&&I===4?($="#REF!",s.fillStyle="#c2352b"):(T&&I===9&&($="#####"),s.fillStyle=g),s.fillText($,Y+U*19+9.5,11.5+z*7)}}};x(3,s=>{ae(s,!1),s.fillStyle="rgba(255,255,255,.92)",s.fillRect(0,0,100,16),y(s,u.ledger??"",12,10)}),x(4,s=>ae(s,!0)),x(5,s=>{s.fillStyle="#c2352b",s.fillRect(8,8,84,7),s.fillStyle=g,s.font=`600 9px ${i}`,s.textAlign="center";for(let T=0;T<4;T+=1)s.fillText(o.format(1200+T*417),50,40+T*20)}),x(6,s=>{for(let T=0;T<16;T+=1)L(s,12+T*7.4,6,94,"#b7c2d8",.5);G(s,14,7,7.4,5)}),x(7,s=>{s.fillStyle="#fff",s.fillRect(0,0,100,134),s.fillStyle="#f7efd9",s.fillRect(18,18,64,30),y(s,u.ledger??"",38,11),s.fillStyle="#faf6ea",s.fillRect(0,62,100,5)}),x(8,s=>{y(s,u.invoice??"",20,13),G(s,30,12,6.6,3)}),x(9,s=>{G(s,12,16,7,17)}),x(10,s=>{s.fillStyle=g,s.font=`400 7px ${i}`,s.textAlign="center";for(let T=0;T<12;T+=1)s.fillText(o.format(90+T*233),50,12+T*10.5)});let ie=Ze(m);ie.anisotropy=4;let F=document.createElement("canvas");F.width=512,F.height=2048;let se=F.getContext("2d");se.fillStyle="#fff",se.fillRect(0,0,512,2048),se.direction=n?"rtl":"ltr",se.textBaseline="middle";let E=n?468:44;se.textAlign="start";let R=[];c.forEach((s,T)=>{R.push({text:s,big:!0}),d[T%Math.max(1,d.length)]&&R.push({text:d[T%d.length],big:!1})});let _=2048/Math.max(1,R.length);R.forEach((s,T)=>{se.fillStyle=s.big?"#1f2a24":"#3d4c44",se.font=s.big?`700 44px ${f}`:`400 25px ${n?f:i}`,se.fillText(s.text,E,_*(T+.5),424)});let K=Ze(F);return K.anisotropy=4,{texture:ie,printTexture:K,services:c,phrases:d,words:u,display:f,mono:i,digits:s=>o.format(s),cell(s){let T=Math.max(0,Xo.indexOf(s)),Y=T%We,z=Math.floor(T/We);return[Y/We,1-(z+1)/We,1/We,1/We]},title(s){return document.querySelector(`[data-shot="${s}"] .card__title, [data-shot="${s}"] .step__title`)?.textContent.trim()??""},canvas(s,T,Y,z){let U=document.createElement("canvas");U.width=s,U.height=T;let I=U.getContext("2d");return I.direction=n?"rtl":"ltr",Y(I,s,T),Ze(U,z)}}}var Ao={L:{pixelCap:55e4,draws:28,tris:7e4,sheets:420,sheetSeg:2,stacks:180,dossiers:120,boxes:1400,weather:140,uxGrid:[32,45],shadowSize:1024,shadowTaps:1,atlas:512,dust:60,allReflections:!1,film:!1},M:{pixelCap:13e5,draws:45,tris:22e4,sheets:1100,sheetSeg:3,stacks:360,dossiers:240,boxes:3e3,weather:320,uxGrid:[48,68],shadowSize:1024,shadowTaps:4,atlas:1024,dust:150,allReflections:!0,film:!1},H:{pixelCap:28e5,draws:70,tris:6e5,sheets:2400,sheetSeg:4,stacks:720,dossiers:480,boxes:6e3,weather:700,uxGrid:[64,90],shadowSize:2048,shadowTaps:8,atlas:2048,dust:300,allReflections:!0,film:!0}};var wt={clip:[.3,40],fog:26},Ke=[{id:"hero",act:1,set:"desk",subject:{radius:.62,center:[0,.1,-.4]},pose:{lens:24,elevation:-15,portrait:{elevation:-28},pushIn:.15,...wt},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:30},{id:"drop",act:1,set:"desk",idleHz:0,budget:{draws:12,tris:{L:3e4,M:8e4,H:2e5}},authored(l,a){let n=a.W/a.H,t=a.portrait?20:15.6,u=Math.tan(t*Math.PI/360),d=.24/(a.portrait?.92:.36)/(2*u*n),f=te.floorY;return[{t:.18,position:[0,-.03,d],elevation:-1,lens:20,clip:[.1,30],fog:26},{t:.48,position:[0,f*.72,d*.96],elevation:-2,lens:20,clip:[.1,30],fog:26},{t:.64,position:[0,.28,.5],elevation:-84,lens:36,clip:[.05,20],fog:20},{t:.84,position:[0,f-.25,.1],elevation:-90,lens:40,clip:[.04,20],fog:16},{t:.93,position:[0,te.slabBottom+.1,.5],elevation:-90,lens:24,clip:[.05,60],fog:40}]}},{id:"svc.head",act:2,set:"archive",pose:{lens:[24,62],elevation:-90,clip:[.2,90],fog:72},budget:{draws:8,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0,holdKnots:()=>[{t:0,position:[0,te.slabBottom-.6,1.5],lens:24},{t:1,position:[0,te.slabBottom-5.2,1.5],lens:62}]},{id:"svc.web",act:2,set:"archive",floor:"first",subject:{radius:1.3,center:[0,0,0]},pose:{lens:32,bearing:12,elevation:-6,drift:[0,-.15,-.5],clip:[.3,80],fog:62},budget:{draws:11,tris:{L:25e3,M:7e4,H:16e4}},idleHz:0,stripYaw:0},{id:"svc.apps",act:2,set:"archive",floor:"locked",subject:{radius:1.1,center:[0,0,0]},pose:{lens:32,bearing:[-12,13],elevation:-4,clip:[.3,80],fog:62},budget:{draws:9,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"svc.api",act:2,set:"archive",floor:"locked",subject:{radius:1.75,center:[0,.35,.3]},pose:{lens:32,bearing:-18,elevation:14,drift:[0,-.2,-.3],clip:[.3,80],fog:60},budget:{draws:14,tris:{L:3e4,M:8e4,H:18e4}},idleHz:0},{id:"svc.rescue",act:2,set:"archive",floor:"locked",subject:{radius:1.2,center:[0,0,0]},pose:{lens:30,bearing:10,elevation:-8,roll:[0,7],clip:[.3,80],fog:58},budget:{draws:12,tris:{L:24e3,M:7e4,H:16e4}},idleHz:0},{id:"svc.ux",act:2,set:"archive",floor:"locked",subject:{radius:1.5,center:[0,0,0]},pose:{lens:28,elevation:0,clip:[.3,80],fog:56},budget:{draws:8,tris:{L:24e3,M:6e4,H:14e4}},idleHz:0},{id:"svc.auto",act:2,set:"archive",floor:"locked",subject:{radius:1.4,center:[0,0,0]},pose:{lens:30,bearing:90,elevation:-3,clip:[.3,80],fog:54},budget:{draws:9,tris:{L:22e3,M:6e4,H:14e4}},idleHz:30},{id:"process.head",act:3,set:"archive",floor:{clear:9},subject:{radius:4,center:[0,0,0]},pose:{lens:50,elevation:-90,shift:[0,0,1.1],clip:[.05,90],fog:70},budget:{draws:10,tris:{L:26e3,M:7e4,H:16e4}},idleHz:0,exitKnots(l,a,n){let t=n.floorY;return[{t:.55,position:[.16,t+3.2,.18],elevation:-90,lens:44,clip:[.05,70],fog:60},{t:.74,position:[.16,t-.9,.12],elevation:-90,lens:44,clip:[.05,70],fog:60}]}},{id:"step.talk",act:3,set:"archive",floor:{clear:5},subject:{radius:1.5,center:[0,.1,0]},pose:{lens:28,bearing:8,elevation:-10,clip:[.2,70],fog:42},budget:{draws:10,tris:{L:25e3,M:7e4,H:16e4}},idleHz:0},{id:"step.scope",act:3,set:"archive",floor:"locked",subject:{radius:1.75,center:[0,0,0]},pose:{lens:28,bearing:-6,elevation:-24,clip:[.2,70],fog:40},budget:{draws:8,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"step.build",act:3,set:"archive",floor:"locked",subject:{radius:1.25,center:[0,0,.3]},pose:{lens:28,bearing:[20,-10],elevation:-8,clip:[.2,70],fog:40},budget:{draws:9,tris:{L:26e3,M:7e4,H:16e4}},idleHz:0},{id:"step.ship",act:3,set:"archive",floor:"locked",subject:{radius:1.6,center:[0,-.2,0]},pose:{lens:28,elevation:[-12,-74],clip:[.2,70],fog:40},budget:{draws:7,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"fall",act:3,set:"none",idleHz:0,budget:{draws:4,tris:{L:3e3,M:6e3,H:12e3}},authored(l){let a=l["step.ship"],n=l["why.q"],t=a.floorY-2,u=n.floorY+n.d+1.6;return[{t:.2,position:[.2,t,.2],elevation:-90,lens:70,clip:[.05,60],fog:44},{t:.86,position:[.05,u+1.2,.06],elevation:-90,lens:70,clip:[.05,40],fog:34}]}},{id:"why.q",act:4,set:"desk",desk:!0,floor:{clear:26},subject:{radius:.85,center:[0,0,-.4]},pose:{lens:40,elevation:-90,...wt},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:30},{id:"why.list",act:4,set:"desk",desk:!0,subject:{radius:.8,center:[0,0,-.4]},pose:{lens:40,elevation:-90,...wt},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:0},{id:"why.stats",act:4,set:"desk",desk:!0,subject:{radius:.7,center:[0,0,-.4]},pose:{lens:36,elevation:-70,...wt},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0},{id:"cta",act:4,set:"desk",desk:!0,subject:{radius:.55,center:[0,0,-.4]},pose:{lens:40,elevation:-90,clip:[.02,12],fog:26},solve(l,a){let{W:n,H:t,portrait:u}=a,c=l.shot.caption,d=l.fov*Math.PI/180,f=Math.tan(d/2)*(n/t),i=.072,o=.148;if(u)l.d=.0775*.965/(2*f),l.ox=0,l.oy=0;else{let r=Math.max((c.w+32)/o,(c.h+32)/i);l.d=n/r/(2*f),l.ox=n/2-(c.x+c.w/2),l.oy=t/2-(c.y+c.h/2)}},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0},{id:"coda",act:4,set:"desk",desk:!0,subject:{radius:.62,center:[0,.1,-.4]},pose:{lens:24,elevation:-15,...wt},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0}],Po={hero:()=>import("./chunk-FQ644PTX.js"),drop:()=>import("./chunk-FL6CESEL.js"),"svc.head":()=>import("./chunk-RSFST4BX.js"),"svc.web":()=>import("./chunk-BU75ANWF.js"),"svc.apps":()=>import("./chunk-SPG4BJQV.js"),"svc.api":()=>import("./chunk-NAYGZMI2.js"),"svc.rescue":()=>import("./chunk-4WBBAYPS.js"),"svc.ux":()=>import("./chunk-2ALBFH2P.js"),"svc.auto":()=>import("./chunk-ZJHTRPCR.js"),"process.head":()=>import("./chunk-QILWQIDR.js"),"step.talk":()=>import("./chunk-6NUKT6FF.js"),"step.scope":()=>import("./chunk-4GXKCHKF.js"),"step.build":()=>import("./chunk-O2FCLXP4.js"),"step.ship":()=>import("./chunk-R65BVCNZ.js"),fall:()=>import("./chunk-DJNW65WT.js"),"why.q":()=>import("./chunk-CQ55MCPA.js"),"why.list":()=>import("./chunk-GCBXT2J2.js"),"why.stats":()=>import("./chunk-PCMLZPEU.js"),cta:()=>import("./chunk-TYQRNBVE.js"),coda:()=>import("./chunk-F3VOJLJZ.js")};var _e=te.archiveHalf,et=te.galleryH,ue=11.4;function Co(l,a){return l.canvas(512,512,t=>{let u=Oe(`shelf-${a}`);t.fillStyle=a===0?"#2a2520":"#0a0c11",t.fillRect(0,0,512,512);let c=6,d=512/c;for(let f=0;f<c;f+=1){let i=0;for(;i<512;){let o=8+u()*22,r=d*(.74+u()*.22);if(a===0){let m=u(),w=.5+u()*.5,v=m<.6?[176,136,86]:m<.8?[214,202,170]:m<.92?[96,110,128]:[150,70,60];t.fillStyle=`rgb(${v[0]*w},${v[1]*w},${v[2]*w})`,t.save(),t.translate(i+o/2,d*(f+1)-4),t.rotate(u()>.86?(u()-.5)*.5:0),t.fillRect(-o/2,-r,o-1.5,r),t.fillStyle="rgba(255,255,255,.35)",t.fillRect(-o/2+o*.25,-r*.82,o*.4,r*.2),t.restore()}else{let m=12+u()*10;t.fillStyle=`rgb(${m},${m+2},${m+8})`,t.fillRect(i,d*(f+1)-r-4,o-2,r),u()>.72&&(t.fillStyle=u()>.8?"#a48bff":"#5dffde",t.fillRect(i+o/2-1,d*(f+1)-r,1.5,r-8))}i+=o}t.fillStyle=a===0?"#141210":"#1c2027",t.fillRect(0,d*(f+1)-4,512,4)}},{repeat:!0})}function zo({programs:l,text:a,q:n,dir:t}){let u=new qe;u.name="archive";let c={uTurn:{value:0},uOrderY:{value:new Xe(te.slabBottom,-60)},uGalleryH:{value:et}},d=40,f=new Le(_e*2,et*d,4,d),i=f.attributes.uv;for(let C=0;C<i.count;C+=1)i.setXY(C,i.getX(C)*8,i.getY(C)*d);let o=[[0,0,-_e,0],[0,0,_e,Math.PI],[-_e,0,0,Math.PI/2],[_e,0,0,-Math.PI/2]].map(([C,A,B,J])=>{let b=f.clone();return b.rotateY(J),b.translate(C,A,B),b}),r=Ae(o.map(C=>C.toNonIndexed())),m=Co(a,0);m.anisotropy=8;let w=Co(a,1);w.anisotropy=8;let v=l.paper({atlas:{value:m},ambient:.03,boost:.62,deform:{pars:"uniform float uTurn, uGalleryH; out float vTurn, vLit;",fpars:"uniform sampler2D uShelf2; in float vTurn, vLit;",world:`
        wp.y += floor(uCamY / uGalleryH) * uGalleryH;
        {
          float along = abs(wn.z) > 0.5 ? wp.x : wp.z;
          vTurn = smoothstep(0.0, 1.0, uTurn * 2.2 - (along * uInline / 14.0 * 0.5 + 0.5) - 0.1);
        }
        vLit = uTurn;`,frag:"c = mix(c, texture(uShelf2, vUv).rgb * (vec3(0.42) + vHouse * 0.7), vTurn);",uniforms:{uTurn:c.uTurn,uGalleryH:c.uGalleryH,uShelf2:{value:w}}}}),g=new W(r,v);g.frustumCulled=!1,u.add(g);let S=[.26,.25,.25],x=C=>`wp.y -= floor((iPos.y - uCamY) / ${C.toFixed(2)} + 0.5) * ${C.toFixed(2)};`,k=Fe(new Ee(1,1,1)),y=18,L=[];for(let C=0;C<y;C+=1){let A=-C*et;for(let[B,J]of[[1,0],[-1,0],[0,1],[0,-1]]){let b=ue*2+6,ee=(_e+ue)/2;L.push({pos:[B*ee,A-.1,J*ee],scale:B?[_e-ue,.2,b]:[b,.2,_e-ue],tint:S}),L.push({pos:[B*ue,A+.95,J*ue],scale:B?[.06,.06,b]:[b,.06,.06],tint:[.55,.52,.48]}),L.push({pos:[B*ue,A+.55,J*ue],scale:B?[.03,.03,b]:[b,.03,.03],tint:[.4,.38,.36]})}}let G=new W(Pe(k,L.length,(C,A)=>{let B=L[C];A.pos=B.pos,A.scale=B.scale,A.tint=B.tint}),l.solid({ambient:.05,defines:{INSTANCED:1},deform:{world:x(et*y)}}));G.frustumCulled=!1,u.add(G);let ae=[];for(let C of[-1,1])for(let A of[-ue,-ue/3,ue/3,ue])ae.push([C*ue,A]),ae.push([A,C*ue]);let ie=new W(Pe(Fe(new Ee(.34,1,.34,1,44,1)),ae.length,(C,A)=>{A.pos=[ae[C][0],0,ae[C][1]],A.scale=[1,180,1],A.tint=[.36,.35,.34]}),l.solid({ambient:.05,defines:{INSTANCED:1},deform:{world:"wp.y += uCamY;"}}));ie.frustumCulled=!1,u.add(ie);let F=Oe("archive"),E=Math.max(3,Math.round(n.boxes/460))*et,R=Fe(new Ee(1,1,.8)),_=R.attributes.normal;for(let C=0;C<_.count;C+=1)_.getZ(C)<-.5&&R.attributes.aColor.setXYZ(C,0,0,0);let K=Ae([R,j(.05,.86,.01,{at:[0,0,-.41],color:[.36,1,.87],mat:2})]),s=n.boxes,T=new W(Pe(K,s,(C,A)=>{let B=C%4,J=(F()*2-1)*(_e-1),b=-F()*E,ee=(F()-.5)*.5,pe=_e-.3-F()*2.2,he=.5+F()*.5,Ie=.55+F()*.4;B===0?(A.pos=[J,b,-pe],Ne(0,0,ee,A.quat)):B===1?(A.pos=[J,b,pe],Ne(0,Math.PI,ee,A.quat)):B===2?(A.pos=[-pe,b,J],Ne(0,Math.PI/2,ee,A.quat)):(A.pos=[pe,b,J],Ne(0,-Math.PI/2,ee,A.quat)),A.scale=[he,Ie,.4];let q=.62+F()*.38,fe=F();A.tint=fe<.62?[.74*q,.56*q,.33*q]:fe<.86?[.86*q,.8*q,.66*q]:fe<.95?[.38*q,.44*q,.52*q]:[.6*q,.24*q,.2*q],A.seed=F()}),l.solid({ambient:.05,defines:{INSTANCED:1},deform:{pars:"uniform float uTurn; uniform vec2 uOrderY; out float vBack;",local:`
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
          }`,uniforms:{uTurn:c.uTurn,uOrderY:c.uOrderY}}}));T.frustumCulled=!1,u.add(T);let Y=new Le(1,1,1,3),z=["ledger","invoice","lines","sheet","memo","receipt"],U=Math.min(180,Math.floor(n.weather*.75)),I=new W(Pe(Y,U,(C,A)=>{let B=C%4,J=(F()*2-1)*(ue-.5),b=-Math.floor(F()*18)*et+.3;A.pos=B===0?[J,b,-ue]:B===1?[J,b,ue]:B===2?[-ue,b,J]:[ue,b,J],Ne(0,B<2?0:Math.PI/2,(F()-.5)*.2,A.quat);let ee=.55+F()*.6;A.scale=[ee,ee*1.42,1],A.cell=a.cell(z[Math.floor(F()*z.length)]);let pe=.75+F()*.25;A.tint=[pe,pe,pe*.95]}),l.paper({ambient:.05,defines:{INSTANCED:1},deform:{world:x(et*18)}}));I.frustumCulled=!1,u.add(I);let $=new Le(.34,.46),me=new W(Pe($,n.weather,(C,A)=>{A.pos=[(F()*2-1)*10.5,-F()*24,(F()*2-1)*10.5],A.cell=a.cell(z[Math.floor(F()*z.length)]);let B=.78+F()*.22;A.tint=[B,B,B*.95],A.seed=F()}),l.paper({ambient:.08,defines:{INSTANCED:1},deform:{pars:"uniform float uTurn;",local:`{
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
        }`,uniforms:{uTurn:c.uTurn}}}));me.frustumCulled=!1,u.add(me);let ne=s,de=n.weather;return{group:u,u:c,*build(){yield},setRange(C,A){c.uOrderY.value.set(C,A)},setDensity(C){T.geometry.instanceCount=Math.floor(ne*C),me.geometry.instanceCount=Math.floor(de*C)},setWeather(C){me.visible=C,I.visible=C}}}var Lt={pars:"in float iClear; uniform float uClear;",world:`
    float clearF = clamp((uClear - iClear - seed * 0.34) / 0.62, 0.0, 1.0);
    if (clearF > 0.0) {
      clearF *= clearF;
      vec3 away = wp - (uLampOrigin + vec3(0.0, 0.0, -0.4));
      away.y = 0.0;
      wp += normalize(away + vec3(0.001)) * clearF * 2.4;
      wp.y += clearF * 0.9 - clearF * clearF * 1.9;
    }`};function Qo(){let n=document.createElement("canvas");n.width=1024,n.height=512;let t=n.getContext("2d");t.fillStyle="#7b4c2b",t.fillRect(0,0,1024,512);let u=Oe("walnut");for(let c=0;c<520;c+=1){let d=u()*512,f=u()>.45;t.strokeStyle=f?`rgba(44,22,10,${.05+u()*.2})`:`rgba(180,120,74,${.03+u()*.1})`,t.lineWidth=.5+u()*2.4,t.beginPath(),t.moveTo(0,d);let i=u()*1.2;for(let o=0;o<=1024;o+=48)d+=(u()-.5)*4*i,t.lineTo(o,d);t.stroke()}for(let c=0;c<3;c+=1){let d=u()*1024,f=u()*512;for(let i=8;i<90;i+=5+u()*5)t.strokeStyle=`rgba(40,20,9,${.1+u()*.09})`,t.lineWidth=.8,t.beginPath(),t.ellipse(d,f,i*3.2,i*.8,0,0,Math.PI*2),t.stroke()}return Ze(n)}function To({programs:l,shared:a,text:n,q:t,dir:u}){let c=h=>h*u,d=new qe;d.name="desk";let f={uClear:{value:0},uRing:{value:0},uRingOn:{value:0}},i=new ce(c(.27),.62,-.5),o=[c(-.02),-.38],r=[o[0],o[1]],m=new Xt(t.shadowSize,t.shadowSize,{depthTexture:new eo(t.shadowSize,t.shadowSize,Yt)});m.depthTexture.compareFunction=qt,m.depthTexture.minFilter=it,m.depthTexture.magFilter=it;let w=new kt,v={uMap:{value:Qo()},uShadow:{value:m.depthTexture},uClear:f.uClear,uDawnStripes:{value:1},uAmbient:{value:.045},uShadowTaps:{value:t.shadowTaps},uGloss:{value:1},uRings:{value:[1,0,0,0]},uRingCentreA:{value:[c(-.2),-.21,.046]},uRingCentreB:{value:[c(-.112),-.21,.046]},uTint:{value:[1,1,1]},uLampMatrix:{value:w}},g=new W(new Ee(1.6,.045,.8),l.wood({uniforms:v}));g.position.set(0,-.0225,-.4),d.add(g);let S={...v,uTint:{value:[.34,.31,.28]},uGloss:{value:0},uRings:{value:[0,0,0,0]}},x=.5,k=new W(Ae([[0,-x-2.5,10,5],[0,x+2.5,10,5],[-x-2.5,0,5,x*2],[x+2.5,0,5,x*2]].map(([h,M,P,O])=>{let V=new Ee(P,.1,O);return V.translate(h,te.floorY-.05,M),V})),l.wood({uniforms:S}));d.add(k);let y=[c(-.52),0,-.56],L=[c(-.156),0,-.21],G=[c(.66),.88,-.95],ae=[c(.31),0,-.64],ie=[c(.62),0,-.62],F=[c(.72),.42,-.62],se=[c(.27),.72,-.5],E=[.24,.14,.08],R=Ae([j(.07,.75,.07,{at:[-.74,-.4,-.06],color:E}),j(.07,.75,.07,{at:[.74,-.4,-.06],color:E}),j(.07,.75,.07,{at:[-.74,-.4,-.74],color:E}),j(.07,.75,.07,{at:[.74,-.4,-.74],color:E}),j(1.42,.09,.02,{at:[0,-.1,-.03],color:E}),j(.1,.012,.018,{at:[c(.42),-.1,-.014],color:[.76,.58,.3],mat:1}),j(.1,.012,.018,{at:[c(-.42),-.1,-.014],color:[.76,.58,.3],mat:1}),...mo(G),...uo(ie,F,se,u),...ho(L,u),j(.07,.006,.07,{at:[c(-.02),.003,-.7],color:[.25,.25,.27]}),Fe(new Ft(.002,.003,.17,6),{at:[c(-.02),.09,-.7],color:[.7,.7,.72]})]),_=new W(R,l.solid({ambient:.17,house:0}));d.add(_);let K=new W(Ae([j(12,7,.1,{at:[0,1.6,-1.05],color:[.62,.6,.6]}),j(12,.12,.03,{at:[0,te.floorY+.06,-.99],color:[.2,.18,.17]}),j(1.62,.04,.04,{at:[c(-.46),1.54,-.97],color:[.55,.52,.5]}),j(1.62,.04,.04,{at:[c(-.46),.5,-.97],color:[.55,.52,.5]}),j(.04,1.08,.04,{at:[c(-1.27),1.02,-.97],color:[.55,.52,.5]}),j(.04,1.08,.04,{at:[c(.35),1.02,-.97],color:[.55,.52,.5]})]),l.solid({ambient:.2,house:0}));d.add(K);let s=new W(Ae(co(ae,u)),_.material),T=It([[y[0]-.11*u,.05,y[2]+.03],[y[0]-.17*u,.03,y[2]+.06],[y[0]-.2*u,.012,y[2]+.13],[y[0]-.19*u,.05,y[2]-.03],[y[0]-.13*u,.11,y[2]-.08]],24),Y=l.solid({house:0,deform:lo()}),z=new W(Ae([...po(y),T]),Y);d.add(s,z);let U={x:y[0],y:.135,z:y[2]-.08},I=new W(fo(),Y);I.name="handset",I.position.set(U.x,U.y,U.z),d.add(I);let $=new W(It([[0,0,0],[0,-.2,0],[0,-.4,.01],[0,-.6,0]],22,.008),Y);$.visible=!1,d.add($);let me=_.material,ne=new W(j(.012,.095,.004,{at:[0,.042,0],color:[.1,.1,.1]}),me),de=new W(j(.007,.14,.004,{at:[0,.064,0],color:[.1,.1,.1]}),me);ne.position.set(G[0],G[1],G[2]+.026),de.position.set(G[0],G[1],G[2]+.03),d.add(ne,de);let C=c(-.46),A=new W(Fe(new Le(1.58,1),{at:[C,1.02,-.985],color:[.075,.11,.21],mat:2}),l.solid({house:0,deform:{fpars:"uniform highp float uDawn;",frag:"c = mix(c, mix(vec3(0.365, 1.0, 0.87), vec3(0.643, 0.545, 1.0), clamp((vLampP.x + 0.5) * 0.7, 0.0, 1.0)), uDawn);"}}));d.add(A);let B=j(1.58,.042,.004,{color:[.72,.72,.7]});B.deleteAttribute("uv");let J=new W(Pe(B,24,(h,M)=>{M.pos=[C,.54+(h+.5)*.0405,-.965]}),l.solid({house:0,ambient:.14,defines:{INSTANCED:1},deform:{local:`{
          float a = mix(0.86, 1.32, uDawn);
          float ca = cos(a), sa = sin(a);
          p = vec3(p.x, p.y * ca - p.z * sa, p.y * sa + p.z * ca);
          n = vec3(n.x, n.y * ca - n.z * sa, n.y * sa + n.z * ca);
        }`}}));J.frustumCulled=!1,d.add(J);let b=Oe("desk"),ee=[{x:-.66,z:-.3,h:.34},{x:-.58,z:-.68,h:.44},{x:-.27,z:-.67,h:.27},{x:.66,z:-.22,h:.2},{x:-.36,z:-.28,h:.13},{x:-.14,z:-.7,h:.15},{x:.66,z:-.42,h:.1},{x:-.7,z:-.08,h:.09}],pe=[],he=new Map;for(let h of ee){let M=0,P=0,O=0;for(;M<h.h&&pe.length<t.stacks;){let V=.01+b()*.022;P+=(b()-.5)*.012,O+=(b()-.5)*.012,pe.push({x:h.x+P,y:M+V/2,z:h.z+O,h:V,yaw:(b()-.5)*.34}),M+=V}he.set(h,{y:M,x:h.x+P,z:h.z+O})}let Ie=new Ee(1,1,1);Ie.deleteAttribute("uv");let q=Fe(Ie),fe=new W(Pe(q,pe.length,(h,M)=>{let P=pe[h];M.pos=[c(P.x),P.y,P.z],Ne(0,P.yaw,0,M.quat),M.scale=[.21+b()*.03,P.h,.297+b()*.03];let O=.74+b()*.26;M.tint=b()>.86?[O,O*.84,O*.72]:[O,O,O*.95],M.extra.iClear=2},{iClear:1}),l.solid({house:0,ambient:.13,defines:{INSTANCED:1},deform:Lt}));fe.frustumCulled=!1,d.add(fe);let tt=[{x:.5,z:-.14,n:.3},{x:-.5,z:-.2,n:.3},{x:-.3,z:-.5,n:.26}],ve=Fe(new Ee(1,1,1)),le=[];for(let h of tt){let M=Math.floor(t.dossiers*h.n*.5),P=0;for(let O=0;O<M&&P<.2;O+=1){let V=.016+b()*.014,re=(b()-.5)*.5,e=.7+b()*.3;le.push({x:h.x+(b()-.5)*.02,y:P+V/2,z:h.z+(b()-.5)*.02,yaw:re,sx:.24,sy:V,sz:.33,tint:[.86*e,.7*e,.42*e]}),le.push({x:h.x,y:P+V+6e-4,z:h.z,yaw:re,sx:.016,sy:.0015,sz:.335,tint:[.92,.9,.84]}),P+=V}}let oe=new W(Pe(ve,le.length,(h,M)=>{let P=le[h];M.pos=[c(P.x),P.y,P.z],Ne(0,P.yaw,0,M.quat),M.scale=[P.sx,P.sy,P.sz],M.tint=P.tint,M.extra.iClear=2},{iClear:1}),l.solid({house:0,ambient:.13,defines:{INSTANCED:1},deform:Lt}));oe.frustumCulled=!1,d.add(oe);let ot=new Le(1,1,t.sheetSeg,t.sheetSeg);ot.rotateX(-Math.PI/2);let N=["invoice","ledger","quote","receipt","lines","sheet","memo","invoice","carbon","slip"],ge=[],yt=Math.min(30,Math.floor(t.sheets*.1));for(let h=0;h<yt;h+=1){let M=.36+b()*.46,P=b()*Math.PI*2,O=Math.cos(P)*M*1.08,V=-.4+Math.sin(P)*M*.42;ge.push({x:O,z:V,y:.0012+b()*.012,yaw:b()*6.28,kind:0,clear:b()>.4?0:1})}for(let[h,M]of he){let P=Math.floor(t.sheets*.5/ee.length*(.5+h.h*2));for(let O=0;O<P;O+=1)ge.push({x:M.x+(b()-.5)*.06,z:M.z+(b()-.5)*.06,y:M.y+O*.0015,yaw:(b()-.5)*.7,kind:1,clear:2})}let st=Math.min(8,Math.floor(t.sheets*.02));for(let h=0;h<st;h+=1){let M=h%2===0?1:-1;ge.push({x:M*(.24+b()*.46),z:-.08+b()*.05,y:.002+b()*.004,yaw:(b()-.5)*.3,kind:2,clear:0})}let nt=Math.max(0,Math.floor(t.sheets*.24));for(let h=0;h<nt;h+=1){let M=b()*Math.PI*2,P=.7+b()*1.5,O=Math.cos(M)*P*1.2,V=.1+Math.abs(Math.sin(M))*P*.7;Math.hypot(O,V)>.75&&ge.push({x:O,z:V,y:te.floorY+.002+b()*.004,yaw:b()*6.28,kind:0,clear:2})}for(let h=0;h<8;h+=1)ge.push({x:-.02+(b()-.5)*.015,z:-.7+(b()-.5)*.015,y:.02+h*.012,yaw:b()*6.28,kind:3,clear:2});let He=l.paper({house:0,ambient:.05,defines:{INSTANCED:1},deform:{pars:`${Lt.pars} in float iCurl;`,local:`
        float cx = uv.x - 0.5, cz = uv.y - 0.5;
        p.y += (cx * cx * 0.03 + cz * cz * 0.05) * iCurl;
        /* A sheet by the edge lifts a little in the draught from the printer. */
        p.y += sin(uTime * 2.6 + seed * 37.0) * 0.0012 * max(iCurl - 0.8, 0.0) * (cz + 0.5);
        n.xz -= vec2(cx * 0.06, cz * 0.1) * iCurl;`,world:Lt.world}}),Te=new W(Pe(ot,ge.length,(h,M)=>{let P=ge[h],O=P.kind===3;M.pos=[c(P.x),P.y,P.z],Ne(0,P.yaw,0,M.quat),M.scale=O?[.08,1,.16]:[.21,1,.297];let V=O?"receipt":N[Math.floor(b()*N.length)];M.cell=n.cell(V);let re=.82+b()*.18;M.tint=V==="carbon"?[.98,.72*re,.72*re]:V==="slip"?[.99,.9*re,.62*re]:[re,re,re*.96],M.extra.iClear=P.clear,M.extra.iCurl=P.kind===2?1.6:.5+b()},{iClear:1,iCurl:1}),He);Te.frustumCulled=!1,d.add(Te);let Ye=new W(new Le(.34,.34),l.glow({color:[1,.74,.46],alpha:.5,defines:{BILLBOARD:1}}));Ye.position.set(i.x,i.y+.03,i.z),Ye.frustumCulled=!1,d.add(Ye);let Ge=new W(Pe(new Le(1,1),2,(h,M)=>{M.pos=h===0?[c(.34),.42,-.985]:[c(-.46),.95,-.98],M.scale=h===0?[2.6,1.9,1]:[3.2,2.2,1],M.tint=h===0?[.13,.086,.047]:[.028,.038,.067]}),l.glow({defines:{INSTANCED:1}}));Ge.frustumCulled=!1,d.add(Ge);let at=new Ft(.05,.54,.86,26,1,!0),De=new W(at,l.glow({color:[1,.72,.42],alpha:.13,shape:5,deform:{frag:"a = vUv.y * vUv.y; { float f = abs(dot(normalize(vN), normalize(vV))); a *= f * f; }"}}));De.frustumCulled=!1,d.add(De);let ut=new Le(.009,.009),Ue=new W(Pe(ut,t.dust,(h,M)=>{let P=Math.sqrt(b()),O=b()*Math.PI*2,V=P*.34;M.pos=[i.x+(r[0]-i.x)*P+Math.cos(O)*V,i.y*(1-P)+.04,i.z+(r[1]-i.z)*P+Math.sin(O)*V],M.tint=[1,.82,.6]}),l.glow({alpha:.42,defines:{INSTANCED:1,BILLBOARD:1},deform:{world:"wp += vec3(sin(uTime * 0.21 + seed * 40.0), sin(uTime * 0.17 + seed * 90.0), cos(uTime * 0.19 + seed * 70.0)) * 0.03;"}}));Ue.frustumCulled=!1,d.add(Ue);let we=i.clone(),xe=new bt(122,1,.05,2.2),dt=new ce(0,0,-1),Re=new ce,$e={x:0,y:0,z:0},ye=0,ke=0,At=new kt().set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.4975,0,0,0,1),Be=Te.geometry.instanceCount,je=fe.geometry.instanceCount,Pt=oe.geometry.instanceCount,pt=h=>{ne.rotation.z=-(h%12/12)*Math.PI*2,de.rotation.z=-(h%1)*Math.PI*2};return pt(3.2),{group:d,u:f,setClock:pt,lampPos:we,pool:o,*build(){yield},setActPositions(h){$e=h},setPhone(h){h.position.set(0,.0043,-.4),h.visible=!1,d.add(h),this.phone=h},setAct(h){h===4?d.position.set($e.x,$e.y,$e.z):d.position.set(0,0,0)},setSpot(h,M){r[0]=h,r[1]=M},resetSpot(){r[0]=o[0],r[1]=o[1]},setRing(h){ye=h},setOffHook(h){ke=h},setShadowTaps(h){v.uShadowTaps.value=h},setDensity(h){Te.geometry.instanceCount=Math.floor(Be*h),fe.geometry.instanceCount=Math.floor(je*h),oe.geometry.instanceCount=Math.floor(Pt*h)},setExtras(h){Ue.visible=h,De.visible=h},bakeShadow(h){let M=[g,k,Ye,De,Ue,A,J,K,Ge,$];this.phone&&M.push(this.phone);let P=M.map(p=>p.visible),O=d.position.clone(),V=f.uClear.value,re=d.visible;d.visible=!0,M.forEach(p=>{p.visible=!1}),d.position.set(0,0,0),this.setClear(0),I.position.set(U.x,U.y,U.z),I.rotation.set(0,0,0),I.visible=!0,d.updateMatrixWorld(!0),a.uLampOrigin.value.set(0,0,0),xe.position.copy(we),xe.up.copy(dt),xe.lookAt(c(-.02),0,-.38),xe.updateMatrixWorld(),xe.updateProjectionMatrix();let e=h.getRenderTarget();h.setRenderTarget(m),h.clear(),h.render(d,xe),h.setRenderTarget(e),w.multiplyMatrices(At,xe.projectionMatrix).multiply(xe.matrixWorldInverse),M.forEach((p,D)=>{p.visible=P[D]}),d.position.copy(O),d.visible=re,this.setClear(V),d.updateMatrixWorld(!0)},setClear(h){f.uClear.value=h,v.uClear.value=h;let M=(O,V,re)=>{let e=no((h-V)/.7),p=e*e;O.position.set(re*p*2.2*u,p*.5-p*p*1.6,-p*.2),O.rotation.z=-p*1.2*re*u,O.visible=e<1};M(z,1,-1),M(s,2,1);let P=h>=3;Te.visible=!P,fe.visible=!P,oe.visible=!P},update(h,M){let P=M%3,O=P<.42||P>.62&&P<1.04?1:0,V=Math.abs(Math.sin(M*37.7))*.006*O*ye,re=Math.sin(M*75)*.012*O*ye,e=Qe(0,.5,ke),p=Qe(.42,1,ke),D=U.x+(-.3*u-U.x)*e,H=U.z+(.1-U.z)*e;I.position.set(D+z.position.x,U.y+V-p*.62+z.position.y,H+z.position.z),I.rotation.set(p*1.3,0,e*.9*u+re+z.rotation.z),I.visible=z.visible,$.visible=p>.02,$.position.set(D,0,H-.02),$.scale.y=Math.max(.01,p);let X=r[0]+(h.pointer===1?h.px*.2:0),Q=r[1]+(h.pointer===1?h.py*.12:0);Re.set(X-we.x,-we.y,Q-we.z).normalize(),a.uLampDir.value.copy(Re),a.uLampPos.value.copy(we),a.uLampCone.value.set(.6,.93),De.position.set(we.x+Re.x*.43,we.y+Re.y*.43,we.z+Re.z*.43),De.quaternion.setFromUnitVectors(Zo,Re.negate())}}}var Zo=new ce(0,1,0);var gt=new ce;function Ce(l,a,n,t,u,c){let d=2*Math.PI*u/4,f=Math.max(c-2*u,0),i=Math.PI/4;gt.copy(a),gt[t]=0,gt.normalize();let o=.5*d/(d+f),r=1-gt.angleTo(l)/i;return Math.sign(gt[n])===1?r*o:f/(d+f)+o+o*(1-r)}var xt=class l extends Ee{constructor(a=1,n=1,t=1,u=2,c=.1){let d=u*2+1;if(c=Math.min(a/2,n/2,t/2,c),super(1,1,1,d,d,d),this.type="RoundedBoxGeometry",this.parameters={width:a,height:n,depth:t,segments:u,radius:c},d===1)return;let f=this.toNonIndexed();this.index=null,this.attributes.position=f.attributes.position,this.attributes.normal=f.attributes.normal,this.attributes.uv=f.attributes.uv;let i=new ce,o=new ce,r=new ce(a,n,t).divideScalar(2).subScalar(c),m=this.attributes.position.array,w=this.attributes.normal.array,v=this.attributes.uv.array,g=m.length/6,S=new ce,x=.5/d;for(let k=0,y=0;k<m.length;k+=3,y+=2)switch(i.fromArray(m,k),o.copy(i),o.x-=Math.sign(o.x)*x,o.y-=Math.sign(o.y)*x,o.z-=Math.sign(o.z)*x,o.normalize(),m[k+0]=r.x*Math.sign(i.x)+o.x*c,m[k+1]=r.y*Math.sign(i.y)+o.y*c,m[k+2]=r.z*Math.sign(i.z)+o.z*c,w[k+0]=o.x,w[k+1]=o.y,w[k+2]=o.z,Math.floor(k/g)){case 0:S.set(1,0,0),v[y+0]=Ce(S,o,"z","y",c,t),v[y+1]=1-Ce(S,o,"y","z",c,n);break;case 1:S.set(-1,0,0),v[y+0]=1-Ce(S,o,"z","y",c,t),v[y+1]=1-Ce(S,o,"y","z",c,n);break;case 2:S.set(0,1,0),v[y+0]=1-Ce(S,o,"x","z",c,a),v[y+1]=Ce(S,o,"z","x",c,t);break;case 3:S.set(0,-1,0),v[y+0]=1-Ce(S,o,"x","z",c,a),v[y+1]=1-Ce(S,o,"z","x",c,t);break;case 4:S.set(0,0,1),v[y+0]=1-Ce(S,o,"x","y",c,a),v[y+1]=1-Ce(S,o,"y","x",c,n);break;case 5:S.set(0,0,-1),v[y+0]=Ce(S,o,"x","y",c,a),v[y+1]=1-Ce(S,o,"y","x",c,n);break}}static fromJSON(a){return new l(a.width,a.height,a.depth,a.segments,a.radius)}};var Ko=[.2,.21,.25],es=[.365,1,.87];function Ro({programs:l,text:a,dir:n}){let t=(o,r,m)=>Fe(new xt(o,r,m,4,Math.min(m*.45,o*.12)),{color:Ko}),u=null;function c({w:o=.78,h:r=1.6,t:m=.09,emissive:w=1}={}){let v=new qe,g=new W(Ae([t(o,m,r),j(o*.965,m*.02,o*.012,{at:[0,m/2+.001,-r*.482],color:[.7,.72,.76],mat:1}),j(o*.965,m*.02,o*.012,{at:[0,m/2+.001,r*.482],color:[.7,.72,.76],mat:1}),j(o*.012,m*.02,r*.965,{at:[-o*.482,m/2+.001,0],color:[.7,.72,.76],mat:1}),j(o*.012,m*.02,r*.965,{at:[o*.482,m/2+.001,0],color:[.7,.72,.76],mat:1})]),l.solid({ambient:.32,house:1}));v.add(g);let S=new Le(o*.94,r*.96);S.rotateX(-Math.PI/2),S.translate(0,m/2+.003,0),u??(u=i(360,720,12));let x=l.paper({atlas:{value:u},house:0,ambient:w,defines:{}}),k=new W(S,x);return v.add(k),v.userData={screen:k,screenMaterial:x,w:o,h:r,t:m},v}function d({w:o=.78,h:r=1.6,t:m=.09,color:w=es,alpha:v=.9}={}){let g=new to(new xt(o,m,r,3,Math.min(m*.45,o*.12)),10);return new Zt(g,l.wire({color:w,alpha:v}))}function f({w:o=.78,h:r=1.6}={}){let m=Oe("phone-board"),w=l.solid({ambient:.14,house:1}),v=new W(t(o,.03,r),w),S=[j(o*.88,.016,r*.9,{color:[.05,.3,.2]}),j(o*.68,.03,r*.42,{at:[0,.02,r*.19],color:[.2,.22,.26]})];for(let se=0;se<30;se+=1){let E=.03+m()*.08,R=.03+m()*.09;S.push(j(E,.018,R,{at:[(m()-.5)*o*.74,.016,-r*.28+(m()-.5)*r*.26],color:m()>.7?[.76,.58,.3]:[.1,.1,.12],mat:m()>.7?1:0}))}let x=new W(Ae(S),w),k=Ae([j(o,.05,.05,{at:[0,0,-r/2+.025],color:[.62,.64,.68],mat:1}),j(o,.05,.05,{at:[0,0,r/2-.025],color:[.62,.64,.68],mat:1}),j(.05,.05,r,{at:[-o/2+.025,0,0],color:[.62,.64,.68],mat:1}),j(.05,.05,r,{at:[o/2-.025,0,0],color:[.62,.64,.68],mat:1})]),y=new W(k,w),L=new Le(o*.94,r*.96);L.rotateX(-Math.PI/2);let G=l.paper({atlas:{value:a.texture},cell:[0,0,1,1],house:0,ambient:1}),ae=new W(L,G),ie=new Ee(o*.98,.006,r*.98),F=new W(ie,l.glow({color:[.8,.9,1],alpha:.05,shape:5}));return{back:v,board:x,frame:y,display:ae,displayMaterial:G,glass:F}}function i(o,r,m,w){return a.canvas(o,r,(v,g,S)=>{if(v.fillStyle="#0b0d13",v.fillRect(0,0,g,S),w){w(v,g,S);return}let x=S/13;for(let k=0;k<m;k+=1){v.fillStyle="rgba(255,255,255,.07)",v.fillRect(g*.06,x*(k+1),g*.88,x*.74),v.fillStyle=k%3===0?"#5dffde":"#a48bff";let y=n<0?g*.78:g*.1;v.fillRect(y,x*(k+1)+x*.16,g*.12,x*.42),v.fillStyle="rgba(232,236,244,.7)",v.fillRect(n<0?g*.28:g*.26,x*(k+1)+x*.28,g*.46,x*.16)}})}return{make:c,wire:d,layers:f,listTexture:i}}var ze=4200,ko=.12,ts=.6,os=.03;function Fo({programs:l,shared:a,printTexture:n,dir:t}){let u=new Je(new Float32Array(ze*2*3),3).setUsage(ht),c=new Je(new Float32Array(ze*2*3),3).setUsage(ht),d=new Je(new Float32Array(ze*2),1),f=new Je(new Float32Array(ze*2),1).setUsage(ht),i=new Je(new Float32Array(ze*2),1).setUsage(ht),o=new Uint32Array((ze-1)*6);for(let R=0;R<ze;R+=1)if(d.array[R*2]=-1,d.array[R*2+1]=1,R<ze-1){let _=R*2;o.set([_,_+1,_+2,_+1,_+3,_+2],R*6)}let r=new Qt;r.setAttribute("position",u),r.setAttribute("aAcross",c),r.setAttribute("aSide",d),r.setAttribute("aS",f),r.setAttribute("aW",i),r.setIndex(new Je(o,1));let m={uFeed:{value:0},uLine:{value:1e6},uLineLen:{value:4},uJamA:{value:0},uJamB:{value:0},uJamK:{value:0},uFlutter:{value:1},uWide:{value:1e6},uPrint:{value:n},uPrintRange:{value:0},uPaperGlow:{value:.22},uLineColor:{value:[.365,1,.87]}},w=l.strip({uniforms:m,side:2}),v=new W(r,w);v.frustumCulled=!1;let g=new W(r,l.glow({color:[.365,1,.87],alpha:.5,shape:5,house:0,deform:{pars:"in vec3 aAcross; in float aSide, aS, aW; uniform float uLine, uLineLen; out float vSide, vAlive;",fpars:"in float vSide, vAlive;",local:`{
          float z = max(-(viewMatrix * vec4(p, 1.0)).z, 0.05);
          p += aAcross * aSide * min(max(aW * 5.0, 0.16), z * 0.02);
        }`,world:"vSide = aSide; vAlive = smoothstep(uLine + uLineLen * 0.7, uLine + uLineLen, aS);",frag:"a = (1.0 - abs(vSide)); a = a * a * vAlive;",uniforms:{uLine:m.uLine,uLineLen:m.uLineLen}}}));g.frustumCulled=!1;let S=new Float32Array(ze),x=new Float32Array(ze),k=0,y=0,L=0,G=(R,_,K,s,T,Y,z,U)=>{if(k>=ze)return;let I=k*2;u.setXYZ(I,R,_,K),u.setXYZ(I+1,R,_,K),c.setXYZ(I,s,T,Y),c.setXYZ(I+1,s,T,Y),f.setX(I,z),f.setX(I+1,z),i.setX(I,U),i.setX(I+1,U),S[k]=z,x[k]=_,k+=1};function ae({yaws:R,lineStartY:_,endY:K,dense:s}){k=0;let T=0,Y=.31*t,z=[[Y,.11,-.5],[Y,.085,-.43],[Y*.92,.012,-.34],[Y*.62,.003,-.24],[Y*.22,.003,-.11],[0,.003,-.025],[0,-.004,.008],[0,-.03,.012]],U=24,I=z[0];for(let ne=0;ne<z.length-1;ne+=1){let de=z[Math.max(0,ne-1)],C=z[ne],A=z[ne+1],B=z[Math.min(z.length-1,ne+2)];for(let J=ne===0?0:1;J<=U;J+=1){let b=J/U,ee=b*b,pe=ee*b,he=[0,1,2].map(ve=>.5*(2*C[ve]+(A[ve]-de[ve])*b+(2*de[ve]-5*C[ve]+4*A[ve]-B[ve])*ee+(3*C[ve]-de[ve]-3*A[ve]+B[ve])*pe)),Ie=he[0]-I[0],q=he[1]-I[1],fe=he[2]-I[2];T+=Math.hypot(Ie,q,fe);let tt=Math.hypot(Ie,fe)||1;G(he[0],he[1],he[2],fe/tt||1,0,-Ie/tt||0,T,ko),I=he}}y=T,L=I[1];let $=I[1],me=0;for(;$>K&&k<ze;){let ne=.22;$>te.slabBottom-.5&&(ne=.05);for(let ee of s)$<ee.a&&$>ee.b&&(ne=.022);for($-=ne,T+=ne;me<R.length-1&&$<R[me+1].y;)me+=1;let de=R[me],C=R[Math.min(me+1,R.length-1)],A=C===de?0:Qe(.25,.75,(de.y-$)/Math.max(.001,de.y-C.y)),B=St(de.yaw,C.yaw,A)*Math.PI/180,J=Qe(te.floorY-.2,te.slabBottom+.2,$),b=St(ko,ts,J);$<_&&(b=St(b,os,Qe(0,4,_-$))),G(0,$,0,Math.cos(B),0,Math.sin(B),T,b)}u.needsUpdate=!0,c.needsUpdate=!0,f.needsUpdate=!0,i.needsUpdate=!0,m.uLine.value=ie(_),m.uPrintRange.value=ie(te.floorY-.1),m.uWide.value=ie(te.deskY)}function ie(R){return y+(L-R)}function F(R){let _=0,K=k-1;for(;_<K;){let s=_+K>>1;S[s]<R?_=s+1:K=s}return _}let se=-1/0;function E(R,_){let K=R+_,s=K>L?0:F(ie(K)),T=F(ie(Math.max(R-_,se))),Y=Math.max(0,T-s)*6;r.setDrawRange(s*6,Y)}return{mesh:v,halo:g,u:m,rebuild:ae,focus:E,setEnd(R){se=R},sAtY:ie,pointAtY(R,_){return _[0]=0,_[1]=R,_[2]=0,_}}}var as=460812,is=12e3,rs=190,ls=900,cs=()=>new Promise(l=>{window.scheduler?.yield?window.scheduler.yield().then(l):setTimeout(l,0)});async function Ot(l){let a=performance.now();for(;;){if(l.next().done)return;performance.now()-a>4&&(await cs(),a=performance.now())}}async function on({canvas:l,gl:a,tier:n,forced:t,onFail:u,onOff:c,onOn:d,isFailed:f}){Vt.enabled=!1;let i={...Ao[n],instanceScale:1},o=document.documentElement,r=o.dir==="rtl"?-1:1,m=window.matchMedia("(pointer: coarse)").matches,w=new so({canvas:l,context:a,antialias:!0});w.outputColorSpace=Ut,w.setClearColor(as,1),w.sortObjects=!1,w.debug.checkShaderErrors=t,w.info.autoReset=!0;let v=new Jt,g=new bt(30,1,.1,100);await Eo(r<0);let S=Lo({q:i,dir:r}),x={uTime:{value:0},uInline:{value:r},uCamY:{value:0},uDawn:{value:0},uPower:{value:new Xe(0,0)},uPowerY:{value:0},uLitY:{value:new Xe(te.slabBottom,-120)},uFog:{value:new Xe(4,40)},uLampOrigin:{value:new ce},uLampPos:{value:new ce(.5*r,.62,-.62)},uLampDir:{value:new ce(0,-1,0)},uLampColor:{value:new ce(1,.7,.42)},uLampOn:{value:1},uLampCone:{value:new Xe(.55,.9)},uAtlas:{value:S.texture}},k=Mo(x),y=Fo({programs:k,shared:x,printTexture:S.printTexture,dir:r}),L=To({programs:k,shared:x,text:S,q:i,dir:r,tier:n}),G=zo({programs:k,shared:x,text:S,q:i,dir:r,tier:n}),ae=Ro({programs:k,shared:x,text:S,dir:r}),ie={desk:L,archive:G,strip:y,phone:ae};L.setPhone(ae.make({w:.0775,h:.16,t:.0085})),v.add(L.group,G.group,y.mesh,y.halo);let F=Ke.map((e,p)=>({meta:e,index:p,status:"idle",module:null,group:new qe,ctx:null,on:!1,a:0,s:0,e:0,b:0,promise:null})),se=Object.fromEntries(F.map(e=>[e.meta.id,e]));F.forEach(e=>{e.group.visible=!1,v.add(e.group)});let E=null,R=null,_=null,K=1,s=1/0,T=0,Y=0,z=0,U=()=>E.svh*.15,I=vo({inPlace:!m,blur:!m&&n!=="L"}),$=Nt();function me(e){let p=[],D=[],H=[];for(let[X,Q]of Object.entries(e.shots))Q.caption&&(X==="hero"?p.push([0,Q.pinEnd]):(p.push([Q.pinStart-.35*e.svh,Q.pinEnd]),D.push(Q.pinStart)),H.push(Q.pinEnd));return{zones:p,down:D,up:H}}function ne(){I.release(),E=yo(),I.bake(E),$.bake(me(E),E.docH,E.svh);let e=ao(E,Ke);R=e.solved,K=E.docH,_=io(e.knots,K);let p=R["svc.auto"],D=R["process.head"],H=R["why.q"],X=Ke.filter(Z=>Z.floor&&Z.stripYaw!==void 0).map(Z=>({y:R[Z.id].floorY,yaw:Z.stripYaw}));X.unshift({y:te.deskY,yaw:0}),X.push({y:p.floorY+3,yaw:0},{y:p.floorY+1,yaw:90},{y:p.floorY-3,yaw:90},{y:D.floorY+2,yaw:0}),X.sort((Z,Me)=>Me.y-Z.y),y.rebuild({yaws:X,lineStartY:p.floorY-1.8,endY:H.floorY+.03,dense:[{a:R["svc.rescue"].floorY+2.4,b:R["svc.rescue"].floorY-2.4}]}),x.uLitY.value.set(te.slabBottom,D.floorY+4),G.setRange(te.slabBottom,D.floorY);let Q=E.shots.drop,be=E.shots.fall;T=Q.pinStart+(Q.pinEnd-Q.pinStart)*.86,s=be.pinStart+(be.pinEnd-be.pinStart)*.5,Y=Q.pinStart+(Q.pinEnd-Q.pinStart)*.8,z=be.pinStart+(be.pinEnd-be.pinStart)*.4;for(let Z of F){let Me=Z.index,Se=E.shots[Z.meta.id],Ve=Me>0?E.shots[Ke[Me-1].id]:null,ft=Me<Ke.length-1?E.shots[Ke[Me+1].id]:null;Z.a=Ve?Ve.pinEnd:0,Z.s=Se.pinStart,Z.e=Se.pinEnd,Z.b=ft?ft.pinStart:K;let Ct=R[Z.meta.id];Z.group.position.set(0,Ct.floorY??0,0),Z.status==="ready"&&Z.module.layout&&Z.module.layout(Z.ctx)}L.setActPositions(R.deskAct4),B()}let de=1,C=0,A=null;function B(){let e=E.W,p=E.H,D=i.pixelCap*de,H=Math.min(window.devicePixelRatio||1,Math.sqrt(D/(e*p)));w.setPixelRatio(H),w.setSize(e,p,!1),g.aspect=e/p,A?.resize(e*H,p*H)}let J=[],b=e=>({tier:n,q:i,dir:r,id:e.meta.id,group:e.group,programs:k,u:x,text:S,sets:ie,camera:g,renderer:w,rng:Oe(e.meta.id),get solved(){return R},get layout(){return E},get self(){return R[e.meta.id]},place(p,{inline:D=0,y:H=0,z:X=0,yaw:Q=0}={}){return p.position.set(D*r,H,X),p.rotation.y=Q*r,p},hotspots:{add(p){J.push({...p,runtime:e})}}});async function ee(e){if(e.status!=="ready")return e.promise||(e.status="loading",e.promise=(async()=>{try{let D=(await Po[e.meta.id]()).default;e.ctx=b(e),await Ot(D.build(e.ctx)),await w.compileAsync(e.group,g,v),D.layout&&D.layout(e.ctx),e.module=D,e.status="ready",He=!0}catch(p){console.warn(`shot ${e.meta.id} failed`,p),e.status="failed"}})()),e.promise}function pe(e){for(let p=F.length-1;p>=0;p-=1)if(e>=F[p].a)return p;return 0}let he=!1;async function Ie(){if(!he){for(he=!0;!(st||f());){let e=pe(N),p=null,D=1/0;for(let H of F)if(H.status==="idle"){let X=Math.abs(H.index-e);X<D&&(p=H,D=X)}if(!p)break;await new Promise(H=>{"requestIdleCallback"in window?window.requestIdleCallback(H,{timeout:200}):setTimeout(H,16)}),await ee(p)}he=!1}}let q=new Float32Array(13),fe=new jt,tt=new ce(0,1,0),ve=new ce(1,0,0),le={t:0,enter:0,hold:0,exit:0,y:0,v:0,time:0,dt:0,px:0,py:0,pointer:0},oe=wo(window.scrollY),ot=go($),N=oe.y,ge=0,yt=0,st=!1,nt=null,He=!0,Te=0,Ye=performance.now(),Ge=0,at=performance.now(),De=0,ut=0,Ue=0,we=0,xe=0,dt=0,Re=!1;function $e(e,p){let D=H=>Math.min(1,Math.max(0,H));le.t=e.b>e.a?D((N-e.a)/(e.b-e.a)):1,le.enter=e.s>e.a?D((N-e.a)/(e.s-e.a)):N>=e.s?1:0,le.hold=e.e>e.s?D((N-e.s)/(e.e-e.s)):N>=e.e?1:0,le.exit=e.b>e.e?D((N-e.e)/(e.b-e.e)):N>=e.b?1:0,le.y=N/E.pace,le.v=oe.v,le.time=Te,le.dt=p,le.px=we,le.py=xe,le.pointer=Ue}let ye=(e,p)=>p>e?Math.min(1,Math.max(0,(N-e)/(p-e))):N>=p?1:0,ke=e=>e*e*(3-2*e);function At(){let e=E.shots["process.head"];G.u.uTurn.value=ke(ye(e.pinStart,e.pinEnd));let p=E.shots["why.list"],D=E.shots["why.stats"],H=E.shots.cta,X=ye(p.pinStart,p.pinEnd)*3.2;L.setClear(X);let Q=ke(ye(p.pinStart+(p.pinEnd-p.pinStart)*.45,H.pinStart));x.uDawn.value=Q,L.setClock(3.2+ke(ye(p.pinStart,D.pinEnd))*3.8);let be=E.shots.hero;if(N<s){let Se=E.shots.drop.pinEnd-be.pinEnd;L.setRing(1-ye(be.pinEnd,be.pinEnd+Se*.14)),L.setOffHook(ke(ye(be.pinEnd,be.pinEnd+Se*.22)))}else L.setRing(1-ye(p.pinStart,p.pinStart+(p.pinEnd-p.pinStart)*.5)),L.setOffHook(0);let Z=L.phone;if(Z.visible=N>s,y.setEnd(-1/0),N>s){let Se=E.shots["why.q"],Ve=R["why.q"].d*.62,ft=ke(ye(E.shots.fall.pinEnd-(E.shots.fall.pinEnd-s)*.2,Se.pinEnd)),Ct=ke(ye(p.pinStart,p.pinStart+(p.pinEnd-p.pinStart)*.14)),_t=Ve+(.42-Ve)*ft,Bt=_t+(.0043-_t)*Ct;Z.position.y=Bt;let Io=2.1+(1-2.1)*ft;Z.scale.setScalar(Io),Z.rotation.y=E.portrait?0:Math.PI/2*ke(ye(D.pinEnd,H.pinStart)),y.setEnd(L.group.position.y+Bt+.01)}let Me=F.find(Se=>Se.meta.id==="svc.rescue");(N<Me.a||N>Me.b)&&(x.uPower.value.set(0,0),y.u.uJamK.value=0)}function Be(e){ro(_,K,N,q),g.position.set(q[0],q[1],q[2]),g.quaternion.set(q[3],q[4],q[5],q[6]),Ue===1&&(fe.setFromAxisAngle(tt,-we*.012),g.quaternion.multiply(fe),fe.setFromAxisAngle(ve,xe*.009),g.quaternion.multiply(fe)),g.fov=q[7],g.near=q[8],g.far=q[9],g.setViewOffset(E.W,E.H,q[11],q[12],E.W,E.H),x.uTime.value=Te,x.uCamY.value=q[1],x.uFog.value.set(q[10]*.16,q[10]),At();let p=N<T||N>s,D=N>s?4:1;L.group.visible=p,L.setAct(D),G.group.visible=N>Y&&N<z,x.uLampOn.value=p?1-x.uDawn.value*.72:0,x.uLampOrigin.value.copy(L.group.position),x.uLampColor.value.set(1,.7,.42),y.u.uFeed.value=N*18e-5/E.pace,$e(F[0],e),p&&(L.resetSpot(),L.update(le,Te));for(let H of F){let X=N>=H.a-U()&&N<=H.b+U();H.status==="ready"&&(X||H.on)&&($e(H,e),H.module.update(le,H.ctx),H.on=X,H.group.visible=X)}y.focus(q[1],q[9]),g.updateProjectionMatrix(),g.updateMatrixWorld(),A?A.render(v,g):w.render(v,g)}let je=new Et({onChange(e,p){Pt(p)}});function Pt(e){if(e==="pixel-85"||e==="pixel-72")C=e==="pixel-85"?.85:.72;else if(e==="drop-film")A?.dispose(),A=null;else if(e==="instances-70"||e==="instances-50")i.instanceScale=e==="instances-70"?.7:.5,L.setDensity(i.instanceScale),G.setDensity(i.instanceScale);else if(e==="shadow-1")L.setShadowTaps(1);else if(e==="extras-off")G.setWeather(!1),L.setExtras(!1);else if(e==="cadence-30")dt=33.3;else if(e==="stills"){try{window.localStorage.setItem("enjaz:tier",`S:${Date.now()}`)}catch{}M(),c("governor")}}function pt(e){if(st)return;if(window.requestAnimationFrame(pt),document.hidden||Re||nt!==null){Ye=e;return}let p=e-Ye;Ye=e;let D=Math.min(p,100)/1e3;Te+=D;let H=window.scrollY,X=ot.step(H,D,E.svh,e);X!==H&&window.scrollTo({top:X,behavior:"instant"}),I.update(X,D),!ge&&Math.abs(X-N)>6*E.svh&&e>yt?(ge=e,o.classList.add("world-dip")):ge&&e-ge>=rs&&(oe.land(X,E.svh),ge=0,yt=e+ls,o.classList.remove("world-dip"));let Q=Math.abs(X-oe.y)>.25||Math.abs(oe.v)>2;N=oe.step(X,D,E.svh,$.speed(oe.y)),we+=(De-we)*Math.min(1,D*6),xe+=(ut-xe)*Math.min(1,D*6);let be=Math.abs(De-we)>.001||Math.abs(ut-xe)>.001,Me=F[pe(N)].meta.idleHz,Se=Q||be||He;if(!Se&&Me>0&&!(n==="L"&&e-at>is)&&(Se=e-Ge>=1e3/Me-1),dt&&e-Ge<dt-2&&(Se=!1),!Se)return;Q&&(at=e),C&&(!Q||N>E.shots.fall.pinStart&&N<E.shots.fall.pinEnd)&&(de=C,C=0,B()),He=!1;let Ve=(e-Ge)/1e3;Ge=e,Be(Math.min(Ve,.1)),p<250&&(Q||Me>0)&&je.push(p)}function h(){ot.on=!1,ge=0,o.classList.remove("world-dip")}function M(){st=!0,h(),I.release()}window.addEventListener("pointermove",e=>{Ue=e.pointerType==="mouse"?1:2,De=e.clientX/window.innerWidth*2-1,ut=e.clientY/window.innerHeight*2-1,at=performance.now()},{passive:!0});let P=new ce;window.addEventListener("click",e=>{if(!e.target.closest?.("a, button, .shot"))for(let p of J){if(!p.runtime.on)continue;P.set(p.center[0],p.center[1],p.center[2]),p.runtime.group.localToWorld(P).project(g);let D=(P.x*.5+.5)*E.W,H=(.5-P.y*.5)*E.H;Math.hypot(D-e.clientX,H-e.clientY)<p.radius&&(p.runtime.module.hit?.(p.id,le,p.runtime.ctx),He=!0)}},{passive:!0}),window.addEventListener("pageshow",()=>{oe.reset(window.scrollY),N=oe.y,He=!0});let O=0;if(l.addEventListener("webglcontextlost",e=>{e.preventDefault(),Re=!0,h(),O+=1,c("context-lost")}),l.addEventListener("webglcontextrestored",()=>{O>1||(Re=!1,L.bakeShadow(w),d(),ne(),oe.reset(window.scrollY),N=oe.y,He=!0)}),ne(),oe.reset(window.scrollY),N=oe.y,await Ot(L.build()),await Ot(G.build()),await ee(se.hero),await ee(se.drop),await w.compileAsync(v,g),L.bakeShadow(w),f())return null;if(!t){let e=[],p=new Uint8Array(4);for(let H=0;H<6;H+=1){await new Promise(Q=>window.requestAnimationFrame(Q));let X=performance.now();Be(.016),a.readPixels(0,0,1,1,a.RGBA,a.UNSIGNED_BYTE,p),e.push(performance.now()-X)}let D=e.slice(2).sort((H,X)=>H-X)[1];if(D>40){try{window.localStorage.setItem("enjaz:tier",`S:${Date.now()}`)}catch{}return u("bench"),null}D>20&&(de=.7,i.instanceScale=.7,L.setDensity(.7),G.setDensity(.7),B())}i.film&&(A=(await import("./chunk-WOIDP7SL.js")).createFilm(w),A.resize(E.W*w.getPixelRatio(),E.H*w.getPixelRatio())),oe.reset(window.scrollY),N=oe.y,I.update(N,0),Be(.016),o.classList.add("world-on"),window.requestAnimationFrame(pt),Ie(),window.addEventListener("wheel",e=>{e.ctrlKey||st||Re||nt!==null||document.body.classList.contains("is-nav-open")||Math.abs(e.deltaX)>Math.abs(e.deltaY)||(e.preventDefault(),ot.input(e.deltaY,e.deltaMode,window.scrollY,E.svh,E.docH-E.svh,performance.now()),at=performance.now())},{passive:!1});let V=bo(()=>{ne(),He=!0});/[?&]hud=1\b/.test(window.location.search)&&import("./chunk-FKFVKEYL.js").then(e=>e.mountHud({renderer:w,governor:je,tier:n,q:i,get y(){return N}}));let re={tier:n,renderer:w,governor:je,scene:v,stop:M,pacer:$,get layout(){return E},get solved(){return R},get y(){return N},seek(e){return window.scrollTo({top:e,behavior:"instant"}),h(),oe.reset(window.scrollY),N=oe.y,I.update(N,0),Be(.016),N},freeze(e){nt=e,Te=e},unfreeze(){nt=null},renderOnce(){Be(.016)},info(){return Be(.016),{calls:w.info.render.calls,triangles:w.info.render.triangles,programs:w.info.programs.length,rung:je.rung,y:N}},sceneInfo(){let e=A;A=null,Be(.016);let p={calls:w.info.render.calls,triangles:w.info.render.triangles};return A=e,p},feedFrameTimes(e){e.forEach(p=>je.push(p))},async loadAll(){await Promise.all(F.map(e=>ee(e))),He=!0},status(){return Object.fromEntries(F.map(e=>[e.meta.id,e.status]))},dispose(){M(),V()}};return window.__enjazWorld=re,re}export{on as start};
