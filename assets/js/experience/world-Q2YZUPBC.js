/* three.js r187 (c) three.js authors, MIT. ENJAZ film. */
import{a as te,b as ao,c as io,d as ro}from"./chunk-6ETZZDVU.js";import{a as lo,b as co,c as uo,d as po,e as fo,f as It,g as ho,h as mo}from"./chunk-2EEOQMQQ.js";import{c as Fe,d as j,f as Ae,g as Ne,h as Ce,i as Oe,j as no,k as Mt,l as Ze}from"./chunk-GBHZZ3DY.js";import{A as Qt,B as eo,C as Ee,D as Ft,E as to,J as Le,N as oo,O as bt,S as so,a as zt,c as Tt,d as Rt,e as it,f as Wt,g as Yt,h as Gt,i as Ut,j as qt,k as ht,l as $t,m as Xe,n as jt,o as ce,p as Vt,q as Xt,r as kt,t as qe,u as Jt,v as Je,w as Zt,x as W,z as Kt}from"./chunk-ZD75F7KI.js";import"./chunk-AEJNSRIJ.js";var St=l=>Math.min(1,Math.max(0,l));function vo({inPlace:l,blur:i}){let n=[],o=NaN,u=0,c=0;function p(a){a.el.style.opacity="",a.el.style.transform="",a.el.classList.remove("is-gone");for(let t of a.kids)t.style.opacity="",t.style.transform="",t.style.filter=""}function v(a,t,r,m){let d=t<.5;if(d!==a.gone&&(a.gone=d,a.el.classList.toggle("is-gone",d),document.dispatchEvent(new CustomEvent("enjaz:captions"))),t===1&&r===0){p(a);return}a.el.style.opacity=St(t/.55).toFixed(3),a.el.style.transform=r?`translate3d(0, ${r.toFixed(1)}px, 0)`:"";let f=a.kids.length,g=f>1?Math.min(.14,.5/(f-1)):0,y=1-(f-1)*g;a.kids.forEach((x,k)=>{let b=St((t-k*g)/y);if(b===1){x.style.opacity="",x.style.transform="",x.style.filter="";return}let L=1-b;x.style.opacity=b.toFixed(3),x.style.transform=`translate3d(0, ${(L*L*L*1.1*(m?-1:1)).toFixed(3)}em, 0)`,i&&(x.style.filter=`blur(${(L*.28).toFixed(3)}em)`)})}return{bake(a){let t=.35*a.svh;n=[];for(let[m,d]of Object.entries(a.shots)){if(!d.caption||d.caption.h>a.svh*.7)continue;let f=document.querySelector(`[data-shot="${m}"] > .shot`);f&&n.push({el:f,kids:[...f.children],a:m==="hero"?-1:d.pinStart-t,s:m==="hero"?-1:d.pinStart,e:d.pinEnd,b:d.pinEnd+t,unpin:d.pinEnd,hero:m==="hero",pin:d.pin??0,shown:-1,shift:0,gone:!1})}let r=.5*a.svh;for(let m=1;m<n.length;m+=1){let d=n[m-1],f=n[m],g=f.s-d.e;if(!(g<=0)){if(l){let y=Math.min(r,g/2);d.b=d.e+y,f.a=f.s-y}else d.b=d.e+Math.min(r,Math.max(t,g-f.pin));d.hero&&(d.b=d.unpin+g*.18,d.e=Math.min(d.unpin,d.b-t*.6))}}o=NaN},update(a,t){u=a===o?u+t:0,o=a,c=u>.25?Math.min(1,c+t/.4):Math.max(0,c-t/.12);for(let r of n){let m=r.s>r.a?St((a-r.a)/(r.s-r.a)):1,d=St((a-r.e)/(r.b-r.e)),f=a>r.a&&a<r.b,g=f?Math.max(Math.min(m,1-d),c):0;r.hero&&f&&d>.3&&(g=Math.min(1-d,1-c));let y=0;l&&f&&(y=m<1?(a-r.s)*.85:d>0?Math.max(0,a-r.unpin)*.85:0),(g!==r.shown||y!==r.shift)&&(r.shown=g,r.shift=y,v(r,g,y,d>0))}},release(){for(let a of n)p(a),a.shown=-1,a.gone=!1}}}var Ht=["pixel-85","pixel-72","drop-film","instances-70","instances-50","shadow-1","extras-off","cadence-30","stills"];function Dt(l,i){return l[Math.min(l.length-1,Math.floor(l.length*i))]}var Et=class{constructor({onChange:i=()=>{}}={}){this.onChange=i,this.buffer=new Float32Array(90),this.sorted=new Float32Array(90),this.count=0,this.head=0,this.rung=-1,this.elapsed=0,this.overBudget=0,this.underBudget=0,this.cooldown=0,this.climbs=0,this.upWait=240,this.locked=!1,this.refreshCap=!1,this.seen=0,this.belowBail=0,this.p50=0,this.p90=0,this.vsync=16.6}target(){return this.refreshCap?33.3:Math.max(this.vsync,16.6)}push(i){if(this.elapsed+=i,this.elapsed<1e3||i>250||(this.buffer[this.head]=i,this.head=(this.head+1)%90,this.count=Math.min(90,this.count+1),this.seen+=1,this.cooldown=Math.max(0,this.cooldown-i),this.count<90/2))return;this.sorted.set(this.buffer);let n=this.sorted.subarray(0,this.count).sort();this.p50=Dt(n,.5),this.p90=Dt(n,.9),this.vsync=Dt(n.subarray(0,Math.max(1,Math.floor(this.count*.2))),.5),this.seen<=60&&Math.abs(this.p50-33.3)/33.3<.04&&this.p90/this.p50<1.08&&(this.refreshCap=!0);let o=this.target();if(this.p90>o*1.25?(this.overBudget+=1,this.underBudget=0):this.p90<o*.75?(this.underBudget+=1,this.overBudget=0):(this.overBudget=0,this.underBudget=0),this.rung===Ht.length-2&&this.p50>50){if(this.belowBail+=i,this.belowBail>4e3){this.step(1);return}}else this.belowBail=0;this.cooldown>0||(this.overBudget>=45&&this.rung<Ht.length-2?(this.underBudgetClimbed&&(this.upWait*=2,this.underBudgetClimbed=!1),this.step(1)):this.underBudget>=this.upWait&&this.rung>=0&&!this.locked&&(this.climbs+=1,this.underBudgetClimbed=!0,this.climbs>=2&&(this.locked=!0),this.step(-1)))}step(i){this.rung+=i,this.overBudget=0,this.underBudget=0,this.cooldown=1500,this.count=0,this.onChange(this.rung,Ht[this.rung]??"full")}};var mt=(l,i,n)=>Math.min(n,Math.max(i,l));var Ho=l=>l*l*(3-2*l);function Nt(){let l=0,i=1,n=null,o=null,u=[],c=[],p=v=>Math.min(8191,Math.max(0,v/i));return{bake({zones:v,down:a=[],up:t=[]},r,m){l=Math.max(1,r),i=l/8191,n=new Float64Array(8192),o=new Float32Array(8192);let d=.45*m;for(let f=0;f<8192;f+=1){let g=f*i,y=1/0;for(let[x,k]of v)y=Math.min(y,g<x?x-g:g>k?g-k:0);o[f]=1+3*Ho(Math.min(1,y/d)),f>0&&(n[f]=n[f-1]+i*2/(o[f-1]+o[f]))}u=a.map(Math.round).sort((f,g)=>f-g),c=t.map(Math.round).sort((f,g)=>g-f)},speed(v){return o?o[Math.round(p(v))]:1},toEffort(v){if(!n)return v;let a=p(v),t=Math.min(8190,Math.floor(a)),r=Math.max(0,v-l)+Math.min(0,v);return n[t]+(n[t+1]-n[t])*(a-t)+r},fromEffort(v){if(!n)return v;let a=n[8191];if(v<=0||v>=a)return v<=0?v:l+(v-a);let t=0,r=8191;for(;r-t>1;){let m=t+r>>1;n[m]<=v?t=m:r=m}return(t+(v-n[t])/(n[r]-n[t]))*i},stop(v,a){return a>v?u.find(t=>t>v+.5&&t<=a)??null:c.find(t=>t<v-.5&&t>=a)??null}}}function wo(l=0){return{y:l,v:0,step(i,n,o,u=1){let p=10*n,v=1/(1+p+.48*p*p+.235*p*p*p),a=4.2*Math.min(u,2.5)*o*.2,t=mt(this.y-i,-a,a),r=(this.v+10*t)*n;return this.v=(this.v-10*r)*v,this.y=this.y-t+(t+r)*v,Math.abs(this.y-i)<.25&&Math.abs(this.v)<2&&(this.y=i,this.v=0),this.y},reset(i){this.y=i,this.v=0},land(i,n){let o=Math.sign(i-this.y);this.y=i-o*.8*n,this.v=o*4.2*n*.5}}}function go(l=Nt()){return{on:!1,at:0,aim:0,written:0,rest:null,input(i,n,o,u,c,p=0){this.on||(this.on=!0,this.at=o,this.aim=o,this.written=o);let a=mt(i*(n===1?40:n===2?u:1),-200,200),t=this.rest;if(t&&Math.sign(a)===t.dir&&Math.abs(this.at-t.y)<2){let x=p-t.since;if(x<.35*1e3||x<1.2*1e3&&p-t.last<.14*1e3){t.last=p,this.aim=this.at;return}}this.rest=null;let r=Math.sign(a)===-Math.sign(this.aim-this.at)?this.at:this.aim,m=1.6*u,d=l.toEffort(this.at),f=mt(l.toEffort(r)+a,d-m,d+m),g=mt(l.fromEffort(f),0,c),y=l.stop(this.at,g);y!==null&&(g=y),this.aim=g},step(i,n,o,u=0){if(!this.on)return i;if(Math.abs(i-this.written)>2)return this.on=!1,this.rest=null,i;let c=l.toEffort(this.at),p=l.fromEffort(c+(l.toEffort(this.aim)-c)*(1-Math.exp(-12*n))),v=3.5*Math.min(l.speed(this.at),2.5)*o*n;if(this.at+=mt(p-this.at,-v,v),Math.abs(this.aim-this.at)<.5){let a=Math.sign(this.aim-this.written);this.at=this.aim,this.on=!1,l.stop(this.aim-a*3,this.aim)===this.aim&&(this.rest={y:this.aim,dir:a,since:u,last:u})}return this.written=Math.round(this.at),this.written}}}var xo=l=>{let i=document.createElement("div");i.style.position="fixed",i.style.top="0",i.style.width="0",i.style.visibility="hidden",i.style.height=`100${l}`,document.body.appendChild(i);let n=i.getBoundingClientRect().height;return i.remove(),n},vt=l=>parseFloat(l)||0;function yo(){let l=xo("svh"),i=xo("lvh"),n=document.documentElement.clientWidth,o=i,u=window.scrollY,c=document.querySelector("[data-nav]"),p=c?c.getBoundingClientRect().height:0,v=document.documentElement.dir==="rtl"?-1:1,a=document.documentElement.scrollHeight,t=getComputedStyle(document.documentElement),r=parseFloat(t.getPropertyValue("--pace"))||1,m=parseFloat(t.getPropertyValue("--pace-gap"))||r,d={};for(let f of document.querySelectorAll("[data-shot]")){let g=f.dataset.shot,y=f.getBoundingClientRect(),x=y.top+u,k=f.querySelector(":scope > .shot"),b={id:g,top:x,height:y.height,caption:null,pinStart:x,pinEnd:x};if(k){let L=k.getBoundingClientRect(),G=getComputedStyle(f),ae=getComputedStyle(k),ie=vt(G.paddingBlockEnd);if(g==="hero"){let F=vt(ae.insetBlockStart),se=vt(ae.marginBlockEnd),E=vt(G.paddingBlockStart);b.pinStart=0,b.pinEnd=Math.max(0,y.height-E-L.height-se),b.caption={x:L.left,y:F,w:L.width,h:L.height}}else{let F=vt(ae.insetBlockEnd);b.pinStart=x+L.height+F-l,b.pinEnd=b.pinStart+Math.max(0,y.height-ie-L.height),b.caption={x:L.left,y:l-F-L.height,w:L.width,h:L.height},b.pin=F,b.gap=ie}}d[g]=b}return{W:n,H:o,svh:l,lvh:i,navH:p,docH:a,dir:v,pace:r,paceGap:m,portrait:o>=n,shots:d}}function bo(l){let i=window.matchMedia("(pointer: coarse)").matches,n=document.documentElement.clientWidth,o=document.documentElement.scrollHeight,u=0,c=()=>{window.clearTimeout(u),u=window.setTimeout(l,160)},p=new ResizeObserver(()=>{let v=document.documentElement.clientWidth,a=document.documentElement.scrollHeight;if(v===n&&a===o)return;let t=i&&v===n&&Math.abs(a-o)<200;n=v,o=a,t||c()});return p.observe(document.documentElement),document.fonts?.ready.then(c),document.fonts?.addEventListener?.("loadingdone",c),()=>p.disconnect()}var lt=`
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
}`;function Mo(l,i={}){return l.replace("//#pars",i.pars??"").replace("//#fpars",i.fpars??"").replace("//#local",i.local??"").replace("//#world",i.world??"").replace("//#frag",i.frag??"")}function Ke(l,{mips:i=!0,repeat:n=!1}={}){let o=new Qt(l);return o.colorSpace=Gt,o.generateMipmaps=i,o.minFilter=i?Wt:it,o.magFilter=it,n&&(o.wrapS=Rt,o.wrapT=Rt),o}function Vo(){let i=document.createElement("canvas");i.width=256*2,i.height=256;let n=i.getContext("2d"),o=(u,c,p)=>{let v=n.createRadialGradient(u+107.52,76.8,5.12,u+128,128,184.32);c.forEach(([t,r])=>v.addColorStop(t,r)),n.fillStyle=v,n.fillRect(u,0,256,256);let a=n.createRadialGradient(u+256*.38,256*.24,0,u+256*.38,256*.24,256*.26);a.addColorStop(0,p),a.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=a,n.fillRect(u,0,256,256)};return o(0,[[0,"#bcbcc0"],[.5,"#8c8d92"],[.85,"#55565c"],[1,"#35363c"]],"rgba(255,255,255,.18)"),o(256,[[0,"#f6d58c"],[.45,"#c9963f"],[.8,"#6e4a1c"],[1,"#2c1c0a"]],"rgba(255,244,214,.75)"),Ke(i,{mips:!1})}function So(l){let i=Vo(),n=(o,u,c,p,v={})=>{let{deform:a,defines:t,...r}=v;return new oo({name:o,glslVersion:$t,vertexShader:Mo(u,a),fragmentShader:Mo(c,a),defines:t??{},uniforms:{...l,...p,...a?.uniforms??{}},...r})};return{matcap:i,solid(o={}){return n("solid",Do,No,{uMatcap:{value:i},uEmit:{value:o.emit??[0,0,0]},uAmbient:{value:o.ambient??.06},uHouse:{value:o.house??1}},rt(o,["emit","ambient","house"]))},paper(o={}){return n("paper",Oo,_o,{uAtlas:o.atlas??l.uAtlas,uCell:{value:o.cell??[0,0,1,1]},uAmbient:{value:o.ambient??.07},uHouse:{value:o.house??1},uLitBoost:{value:o.boost??1}},{side:zt,...rt(o,["atlas","cell","ambient","house","boost"])})},wood(o={}){return n("wood",Bo,Wo,{uHouse:{value:0},...o.uniforms},rt(o,["uniforms"]))},strip(o={}){return n("strip",Yo,Go,{uHouse:{value:1},...o.uniforms},rt(o,["uniforms"]))},glow(o={}){return n("glow",Uo,qo,{uColor:{value:o.color??[1,1,1]},uAlpha:{value:o.alpha??1},uShape:{value:o.shape??0},uRadius:{value:0},uMap:{value:o.map??i},uHouse:{value:o.house??0}},{transparent:!0,depthWrite:!1,blending:Tt,side:zt,...rt(o,["color","alpha","shape","map","house"])})},wire(o={}){return n("wire",$o,jo,{uColor:{value:o.color??[.365,1,.87]},uAlpha:{value:o.alpha??1},uHouse:{value:0}},{transparent:!0,depthWrite:!1,blending:Tt,...rt(o,["color","alpha"])})}}}function rt(l,i){let n={};for(let o of Object.keys(l))i.includes(o)||(n[o]=l[o]);return n}var We=4,Xo=["invoice","receipt","quote","ledger","sheet","slip","lines","dossier","carbon","memo","tape","blank"],Jo=l=>{let i=new Set;for(let n of document.querySelectorAll(l)){let o=n.textContent.trim();o&&o!=="\u2726"&&i.add(o)}return[...i]};async function Eo(l){let i=[document.fonts.load('400 20px "IBM Plex Mono"',"#REF! 0123"),document.fonts.load(l?'700 48px "Noto Kufi Arabic"':'700 48px "Space Grotesk"',l?"\u0625\u0646\u062C\u0627\u0632":"ENJAZ")];await Promise.race([Promise.allSettled(i),new Promise(n=>setTimeout(n,1500))])}function Lo({q:l,dir:i}){let n=i<0,o=document.querySelector("main"),u={};try{u=JSON.parse(o?.dataset.atlas??"{}")}catch{u={}}let c=Jo(".ticker__track span"),p=[];try{p=JSON.parse(document.querySelector("[data-typewriter]")?.dataset.typewriter??"[]")}catch{p=[]}let v=n?'"Noto Kufi Arabic", system-ui':'"Space Grotesk", system-ui',a='"IBM Plex Mono", monospace',t=new Intl.NumberFormat(n?"ar-EG":"en-US",{useGrouping:!1}),r=l.atlas,m=document.createElement("canvas");m.width=r,m.height=r;let d=m.getContext("2d"),f=r/We;d.fillStyle="#fff",d.fillRect(0,0,r,r);let g="#23252e",y="#9aa0ad",x=(s,T)=>{let Y=s%We,z=Math.floor(s/We);d.save(),d.beginPath(),d.rect(Y*f,z*f,f,f),d.clip(),d.translate(Y*f,z*f),d.scale(f/100,f/134),d.direction=n?"rtl":"ltr",d.textBaseline="alphabetic",T(d),d.restore()},k=s=>n?100-s:s,b=(s,T,Y,z=12)=>{s.fillStyle=g,s.font=`700 ${z}px ${v}`,s.textAlign="start",s.fillText(T,k(8),Y)},L=(s,T,Y=8,z=92,U=y,I=.7)=>{s.fillStyle=U,s.fillRect(Y,T,z-Y,I)},G=(s,T,Y,z,U=0)=>{for(let I=0;I<Y;I+=1){let $=34+(I*37+U)%40;s.fillStyle=I%3===0?g:y,s.fillRect(n?92-$:8,T+I*z,$,1.4),s.fillStyle=y,s.fillRect(n?8:80,T+I*z,12,1.4)}};x(0,s=>{b(s,u.invoice??"",20,14),L(s,26),G(s,34,9,7),L(s,104,8,92,g,1),s.fillStyle=g,s.font=`600 9px ${a}`,s.textAlign=n?"left":"right",s.fillText(t.format(4820),n?8:92,116)}),x(1,s=>{b(s,u.receipt??"",18,12),L(s,24),G(s,32,7,6,11),s.fillStyle=g,s.fillRect(30,100,40,12)}),x(2,s=>{b(s,u.quote??"",22,15),L(s,28),G(s,38,6,8,23),s.save(),s.translate(68,104),s.rotate(-.26),s.strokeStyle="#5e4bd8",s.lineWidth=2,s.strokeRect(-23,-9,46,18),s.fillStyle="#5e4bd8",s.font=`700 10px ${v}`,s.textAlign="center",s.fillText(u.paid??"",0,4),s.restore()});let ae=(s,T)=>{let Y=n?8:16;s.fillStyle="#e6f6ee";for(let z=0;z<18;z+=2)s.fillRect(0,6+z*7,100,7);s.strokeStyle="#a9b7ae",s.lineWidth=.4;for(let z=0;z<=4;z+=1)s.beginPath(),s.moveTo(Y+z*19,0),s.lineTo(Y+z*19,134),s.stroke();s.font=`400 4.8px ${a}`,s.textAlign="center";for(let z=0;z<18;z+=1){s.fillStyle=y,s.fillText(t.format(z+1),n?96:8,11.5+z*7);for(let U=0;U<4;U+=1){let I=(z*7+U*13)%23,$=t.format(100+I*317);T&&I===4?($="#REF!",s.fillStyle="#c2352b"):(T&&I===9&&($="#####"),s.fillStyle=g),s.fillText($,Y+U*19+9.5,11.5+z*7)}}};x(3,s=>{ae(s,!1),s.fillStyle="rgba(255,255,255,.92)",s.fillRect(0,0,100,16),b(s,u.ledger??"",12,10)}),x(4,s=>ae(s,!0)),x(5,s=>{s.fillStyle="#c2352b",s.fillRect(8,8,84,7),s.fillStyle=g,s.font=`600 9px ${a}`,s.textAlign="center";for(let T=0;T<4;T+=1)s.fillText(t.format(1200+T*417),50,40+T*20)}),x(6,s=>{for(let T=0;T<16;T+=1)L(s,12+T*7.4,6,94,"#b7c2d8",.5);G(s,14,7,7.4,5)}),x(7,s=>{s.fillStyle="#fff",s.fillRect(0,0,100,134),s.fillStyle="#f7efd9",s.fillRect(18,18,64,30),b(s,u.ledger??"",38,11),s.fillStyle="#faf6ea",s.fillRect(0,62,100,5)}),x(8,s=>{b(s,u.invoice??"",20,13),G(s,30,12,6.6,3)}),x(9,s=>{G(s,12,16,7,17)}),x(10,s=>{s.fillStyle=g,s.font=`400 7px ${a}`,s.textAlign="center";for(let T=0;T<12;T+=1)s.fillText(t.format(90+T*233),50,12+T*10.5)});let ie=Ke(m);ie.anisotropy=4;let F=document.createElement("canvas");F.width=512,F.height=2048;let se=F.getContext("2d");se.fillStyle="#fff",se.fillRect(0,0,512,2048),se.direction=n?"rtl":"ltr",se.textBaseline="middle";let E=n?468:44;se.textAlign="start";let R=[];c.forEach((s,T)=>{R.push({text:s,big:!0}),p[T%Math.max(1,p.length)]&&R.push({text:p[T%p.length],big:!1})});let _=2048/Math.max(1,R.length);R.forEach((s,T)=>{se.fillStyle=s.big?"#1f2a24":"#3d4c44",se.font=s.big?`700 44px ${v}`:`400 25px ${n?v:a}`,se.fillText(s.text,E,_*(T+.5),424)});let Q=Ke(F);return Q.anisotropy=4,{texture:ie,printTexture:Q,services:c,phrases:p,words:u,display:v,mono:a,digits:s=>t.format(s),cell(s){let T=Math.max(0,Xo.indexOf(s)),Y=T%We,z=Math.floor(T/We);return[Y/We,1-(z+1)/We,1/We,1/We]},title(s){return document.querySelector(`[data-shot="${s}"] .card__title, [data-shot="${s}"] .step__title`)?.textContent.trim()??""},canvas(s,T,Y,z){let U=document.createElement("canvas");U.width=s,U.height=T;let I=U.getContext("2d");return I.direction=n?"rtl":"ltr",Y(I,s,T),Ke(U,z)}}}var Ao={L:{pixelCap:55e4,draws:28,tris:7e4,sheets:420,sheetSeg:2,stacks:180,dossiers:120,boxes:1400,weather:140,uxGrid:[32,45],shadowSize:1024,shadowTaps:1,atlas:512,dust:60,allReflections:!1,film:!1},M:{pixelCap:13e5,draws:45,tris:22e4,sheets:1100,sheetSeg:3,stacks:360,dossiers:240,boxes:3e3,weather:320,uxGrid:[48,68],shadowSize:1024,shadowTaps:4,atlas:1024,dust:150,allReflections:!0,film:!1},H:{pixelCap:28e5,draws:70,tris:6e5,sheets:2400,sheetSeg:4,stacks:720,dossiers:480,boxes:6e3,weather:700,uxGrid:[64,90],shadowSize:2048,shadowTaps:8,atlas:2048,dust:300,allReflections:!0,film:!0}};var wt={clip:[.3,40],fog:26},Qe=[{id:"hero",act:1,set:"desk",subject:{radius:.62,center:[0,.1,-.4]},pose:{lens:24,elevation:-15,portrait:{elevation:-28},pushIn:.15,...wt},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:30},{id:"drop",act:1,set:"desk",idleHz:0,budget:{draws:12,tris:{L:3e4,M:8e4,H:2e5}},authored(l,i){let n=i.W/i.H,o=i.portrait?20:15.6,u=Math.tan(o*Math.PI/360),p=.24/(i.portrait?.92:.36)/(2*u*n),v=te.floorY;return[{t:.18,position:[0,-.03,p],elevation:-1,lens:20,clip:[.1,30],fog:26},{t:.48,position:[0,v*.72,p*.96],elevation:-2,lens:20,clip:[.1,30],fog:26},{t:.64,position:[0,.28,.5],elevation:-84,lens:36,clip:[.05,20],fog:20},{t:.84,position:[0,v-.25,.1],elevation:-90,lens:40,clip:[.04,20],fog:16},{t:.93,position:[0,te.slabBottom+.1,.5],elevation:-90,lens:24,clip:[.05,60],fog:40}]}},{id:"svc.head",act:2,set:"archive",pose:{lens:[24,62],elevation:-90,clip:[.2,90],fog:72},budget:{draws:8,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0,holdKnots:()=>[{t:0,position:[0,te.slabBottom-.6,1.5],lens:24},{t:1,position:[0,te.slabBottom-5.2,1.5],lens:62}]},{id:"svc.web",act:2,set:"archive",floor:"first",subject:{radius:1.3,center:[0,0,0]},pose:{lens:32,bearing:12,elevation:-6,drift:[0,-.15,-.5],clip:[.3,80],fog:62},budget:{draws:11,tris:{L:25e3,M:7e4,H:16e4}},idleHz:0,stripYaw:0},{id:"svc.apps",act:2,set:"archive",floor:"locked",subject:{radius:1.1,center:[0,0,0]},pose:{lens:32,bearing:[-12,13],elevation:-4,clip:[.3,80],fog:62},budget:{draws:9,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"svc.api",act:2,set:"archive",floor:"locked",subject:{radius:1.75,center:[0,.35,.3]},pose:{lens:32,bearing:-18,elevation:14,drift:[0,-.2,-.3],clip:[.3,80],fog:60},budget:{draws:14,tris:{L:3e4,M:8e4,H:18e4}},idleHz:0},{id:"svc.rescue",act:2,set:"archive",floor:"locked",subject:{radius:1.2,center:[0,0,0]},pose:{lens:30,bearing:10,elevation:-8,roll:[0,7],clip:[.3,80],fog:58},budget:{draws:12,tris:{L:24e3,M:7e4,H:16e4}},idleHz:0},{id:"svc.ux",act:2,set:"archive",floor:"locked",subject:{radius:1.5,center:[0,0,0]},pose:{lens:28,elevation:0,clip:[.3,80],fog:56},budget:{draws:8,tris:{L:24e3,M:6e4,H:14e4}},idleHz:0},{id:"svc.auto",act:2,set:"archive",floor:"locked",subject:{radius:1.4,center:[0,0,0]},pose:{lens:30,bearing:90,elevation:-3,clip:[.3,80],fog:54},budget:{draws:9,tris:{L:22e3,M:6e4,H:14e4}},idleHz:30},{id:"process.head",act:3,set:"archive",floor:{clear:9},subject:{radius:4,center:[0,0,0]},pose:{lens:50,elevation:-90,shift:[0,0,1.1],clip:[.05,90],fog:70},budget:{draws:10,tris:{L:26e3,M:7e4,H:16e4}},idleHz:0,exitKnots(l,i,n){let o=n.floorY;return[{t:.55,position:[.16,o+3.2,.18],elevation:-90,lens:44,clip:[.05,70],fog:60},{t:.74,position:[.16,o-.9,.12],elevation:-90,lens:44,clip:[.05,70],fog:60}]}},{id:"step.talk",act:3,set:"archive",floor:{clear:5},subject:{radius:1.5,center:[0,.1,0]},pose:{lens:28,bearing:8,elevation:-10,clip:[.2,70],fog:42},budget:{draws:10,tris:{L:25e3,M:7e4,H:16e4}},idleHz:0},{id:"step.scope",act:3,set:"archive",floor:"locked",subject:{radius:1.75,center:[0,0,0]},pose:{lens:28,bearing:-6,elevation:-24,clip:[.2,70],fog:40},budget:{draws:8,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"step.build",act:3,set:"archive",floor:"locked",subject:{radius:1.25,center:[0,0,.3]},pose:{lens:28,bearing:[20,-10],elevation:-8,clip:[.2,70],fog:40},budget:{draws:9,tris:{L:26e3,M:7e4,H:16e4}},idleHz:0},{id:"step.ship",act:3,set:"archive",floor:"locked",subject:{radius:1.6,center:[0,-.2,0]},pose:{lens:28,elevation:[-12,-74],clip:[.2,70],fog:40},budget:{draws:7,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"fall",act:3,set:"none",idleHz:0,budget:{draws:4,tris:{L:3e3,M:6e3,H:12e3}},authored(l){let i=l["step.ship"],n=l["why.q"],o=i.floorY-2,u=n.floorY+n.d+1.6;return[{t:.2,position:[.2,o,.2],elevation:-90,lens:70,clip:[.05,60],fog:44},{t:.86,position:[.05,u+1.2,.06],elevation:-90,lens:70,clip:[.05,40],fog:34}]}},{id:"why.q",act:4,set:"desk",desk:!0,floor:{clear:26},subject:{radius:.85,center:[0,0,-.4]},pose:{lens:40,elevation:-90,...wt},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:30},{id:"why.list",act:4,set:"desk",desk:!0,subject:{radius:.8,center:[0,0,-.4]},pose:{lens:40,elevation:-90,...wt},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:0},{id:"why.stats",act:4,set:"desk",desk:!0,subject:{radius:.7,center:[0,0,-.4]},pose:{lens:36,elevation:-70,...wt},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0},{id:"cta",act:4,set:"desk",desk:!0,subject:{radius:.55,center:[0,0,-.4]},pose:{lens:40,elevation:-90,clip:[.02,12],fog:26},solve(l,i){let{W:n,H:o,portrait:u}=i,c=l.shot.caption,p=l.fov*Math.PI/180,v=Math.tan(p/2)*(n/o),a=.072,t=.148;if(u)l.d=.0775*.965/(2*v),l.ox=0,l.oy=0;else{let r=Math.max((c.w+32)/t,(c.h+32)/a);l.d=n/r/(2*v),l.ox=n/2-(c.x+c.w/2),l.oy=o/2-(c.y+c.h/2)}},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0},{id:"coda",act:4,set:"desk",desk:!0,subject:{radius:.62,center:[0,.1,-.4]},pose:{lens:24,elevation:-15,...wt},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0}],Co={hero:()=>import("./chunk-FQ644PTX.js"),drop:()=>import("./chunk-FL6CESEL.js"),"svc.head":()=>import("./chunk-RSFST4BX.js"),"svc.web":()=>import("./chunk-BU75ANWF.js"),"svc.apps":()=>import("./chunk-SPG4BJQV.js"),"svc.api":()=>import("./chunk-NAYGZMI2.js"),"svc.rescue":()=>import("./chunk-4WBBAYPS.js"),"svc.ux":()=>import("./chunk-2ALBFH2P.js"),"svc.auto":()=>import("./chunk-ZJHTRPCR.js"),"process.head":()=>import("./chunk-QILWQIDR.js"),"step.talk":()=>import("./chunk-6NUKT6FF.js"),"step.scope":()=>import("./chunk-4GXKCHKF.js"),"step.build":()=>import("./chunk-O2FCLXP4.js"),"step.ship":()=>import("./chunk-R65BVCNZ.js"),fall:()=>import("./chunk-DJNW65WT.js"),"why.q":()=>import("./chunk-CQ55MCPA.js"),"why.list":()=>import("./chunk-GCBXT2J2.js"),"why.stats":()=>import("./chunk-PCMLZPEU.js"),cta:()=>import("./chunk-TYQRNBVE.js"),coda:()=>import("./chunk-F3VOJLJZ.js")};var _e=te.archiveHalf,et=te.galleryH,ue=11.4;function Po(l,i){return l.canvas(512,512,o=>{let u=Oe(`shelf-${i}`);o.fillStyle=i===0?"#2a2520":"#0a0c11",o.fillRect(0,0,512,512);let c=6,p=512/c;for(let v=0;v<c;v+=1){let a=0;for(;a<512;){let t=8+u()*22,r=p*(.74+u()*.22);if(i===0){let m=u(),d=.5+u()*.5,f=m<.6?[176,136,86]:m<.8?[214,202,170]:m<.92?[96,110,128]:[150,70,60];o.fillStyle=`rgb(${f[0]*d},${f[1]*d},${f[2]*d})`,o.save(),o.translate(a+t/2,p*(v+1)-4),o.rotate(u()>.86?(u()-.5)*.5:0),o.fillRect(-t/2,-r,t-1.5,r),o.fillStyle="rgba(255,255,255,.35)",o.fillRect(-t/2+t*.25,-r*.82,t*.4,r*.2),o.restore()}else{let m=12+u()*10;o.fillStyle=`rgb(${m},${m+2},${m+8})`,o.fillRect(a,p*(v+1)-r-4,t-2,r),u()>.72&&(o.fillStyle=u()>.8?"#a48bff":"#5dffde",o.fillRect(a+t/2-1,p*(v+1)-r,1.5,r-8))}a+=t}o.fillStyle=i===0?"#141210":"#1c2027",o.fillRect(0,p*(v+1)-4,512,4)}},{repeat:!0})}function zo({programs:l,text:i,q:n,dir:o}){let u=new qe;u.name="archive";let c={uTurn:{value:0},uOrderY:{value:new Xe(te.slabBottom,-60)},uGalleryH:{value:et}},p=40,v=new Le(_e*2,et*p,4,p),a=v.attributes.uv;for(let P=0;P<a.count;P+=1)a.setXY(P,a.getX(P)*8,a.getY(P)*p);let t=[[0,0,-_e,0],[0,0,_e,Math.PI],[-_e,0,0,Math.PI/2],[_e,0,0,-Math.PI/2]].map(([P,A,B,J])=>{let M=v.clone();return M.rotateY(J),M.translate(P,A,B),M}),r=Ae(t.map(P=>P.toNonIndexed())),m=Po(i,0);m.anisotropy=8;let d=Po(i,1);d.anisotropy=8;let f=l.paper({atlas:{value:m},ambient:.03,boost:.62,deform:{pars:"uniform float uTurn, uGalleryH; out float vTurn, vLit;",fpars:"uniform sampler2D uShelf2; in float vTurn, vLit;",world:`
        wp.y += floor(uCamY / uGalleryH) * uGalleryH;
        {
          float along = abs(wn.z) > 0.5 ? wp.x : wp.z;
          vTurn = smoothstep(0.0, 1.0, uTurn * 2.2 - (along * uInline / 14.0 * 0.5 + 0.5) - 0.1);
        }
        vLit = uTurn;`,frag:"c = mix(c, texture(uShelf2, vUv).rgb * (vec3(0.42) + vHouse * 0.7), vTurn);",uniforms:{uTurn:c.uTurn,uGalleryH:c.uGalleryH,uShelf2:{value:d}}}}),g=new W(r,f);g.frustumCulled=!1,u.add(g);let y=[.26,.25,.25],x=P=>`wp.y -= floor((iPos.y - uCamY) / ${P.toFixed(2)} + 0.5) * ${P.toFixed(2)};`,k=Fe(new Ee(1,1,1)),b=18,L=[];for(let P=0;P<b;P+=1){let A=-P*et;for(let[B,J]of[[1,0],[-1,0],[0,1],[0,-1]]){let M=ue*2+6,ee=(_e+ue)/2;L.push({pos:[B*ee,A-.1,J*ee],scale:B?[_e-ue,.2,M]:[M,.2,_e-ue],tint:y}),L.push({pos:[B*ue,A+.95,J*ue],scale:B?[.06,.06,M]:[M,.06,.06],tint:[.55,.52,.48]}),L.push({pos:[B*ue,A+.55,J*ue],scale:B?[.03,.03,M]:[M,.03,.03],tint:[.4,.38,.36]})}}let G=new W(Ce(k,L.length,(P,A)=>{let B=L[P];A.pos=B.pos,A.scale=B.scale,A.tint=B.tint}),l.solid({ambient:.05,defines:{INSTANCED:1},deform:{world:x(et*b)}}));G.frustumCulled=!1,u.add(G);let ae=[];for(let P of[-1,1])for(let A of[-ue,-ue/3,ue/3,ue])ae.push([P*ue,A]),ae.push([A,P*ue]);let ie=new W(Ce(Fe(new Ee(.34,1,.34,1,44,1)),ae.length,(P,A)=>{A.pos=[ae[P][0],0,ae[P][1]],A.scale=[1,180,1],A.tint=[.36,.35,.34]}),l.solid({ambient:.05,defines:{INSTANCED:1},deform:{world:"wp.y += uCamY;"}}));ie.frustumCulled=!1,u.add(ie);let F=Oe("archive"),E=Math.max(3,Math.round(n.boxes/460))*et,R=Fe(new Ee(1,1,.8)),_=R.attributes.normal;for(let P=0;P<_.count;P+=1)_.getZ(P)<-.5&&R.attributes.aColor.setXYZ(P,0,0,0);let Q=Ae([R,j(.05,.86,.01,{at:[0,0,-.41],color:[.36,1,.87],mat:2})]),s=n.boxes,T=new W(Ce(Q,s,(P,A)=>{let B=P%4,J=(F()*2-1)*(_e-1),M=-F()*E,ee=(F()-.5)*.5,de=_e-.3-F()*2.2,he=.5+F()*.5,Ie=.55+F()*.4;B===0?(A.pos=[J,M,-de],Ne(0,0,ee,A.quat)):B===1?(A.pos=[J,M,de],Ne(0,Math.PI,ee,A.quat)):B===2?(A.pos=[-de,M,J],Ne(0,Math.PI/2,ee,A.quat)):(A.pos=[de,M,J],Ne(0,-Math.PI/2,ee,A.quat)),A.scale=[he,Ie,.4];let q=.62+F()*.38,fe=F();A.tint=fe<.62?[.74*q,.56*q,.33*q]:fe<.86?[.86*q,.8*q,.66*q]:fe<.95?[.38*q,.44*q,.52*q]:[.6*q,.24*q,.2*q],A.seed=F()}),l.solid({ambient:.05,defines:{INSTANCED:1},deform:{pars:"uniform float uTurn; uniform vec2 uOrderY; out float vBack;",local:`
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
          }`,uniforms:{uTurn:c.uTurn,uOrderY:c.uOrderY}}}));T.frustumCulled=!1,u.add(T);let Y=new Le(1,1,1,3),z=["ledger","invoice","lines","sheet","memo","receipt"],U=Math.min(180,Math.floor(n.weather*.75)),I=new W(Ce(Y,U,(P,A)=>{let B=P%4,J=(F()*2-1)*(ue-.5),M=-Math.floor(F()*18)*et+.3;A.pos=B===0?[J,M,-ue]:B===1?[J,M,ue]:B===2?[-ue,M,J]:[ue,M,J],Ne(0,B<2?0:Math.PI/2,(F()-.5)*.2,A.quat);let ee=.55+F()*.6;A.scale=[ee,ee*1.42,1],A.cell=i.cell(z[Math.floor(F()*z.length)]);let de=.75+F()*.25;A.tint=[de,de,de*.95]}),l.paper({ambient:.05,defines:{INSTANCED:1},deform:{world:x(et*18)}}));I.frustumCulled=!1,u.add(I);let $=new Le(.34,.46),me=new W(Ce($,n.weather,(P,A)=>{A.pos=[(F()*2-1)*10.5,-F()*24,(F()*2-1)*10.5],A.cell=i.cell(z[Math.floor(F()*z.length)]);let B=.78+F()*.22;A.tint=[B,B,B*.95],A.seed=F()}),l.paper({ambient:.08,defines:{INSTANCED:1},deform:{pars:"uniform float uTurn;",local:`{
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
        }`,uniforms:{uTurn:c.uTurn}}}));me.frustumCulled=!1,u.add(me);let ne=s,pe=n.weather;return{group:u,u:c,*build(){yield},setRange(P,A){c.uOrderY.value.set(P,A)},setDensity(P){T.geometry.instanceCount=Math.floor(ne*P),me.geometry.instanceCount=Math.floor(pe*P)},setWeather(P){me.visible=P,I.visible=P}}}var Lt={pars:"in float iClear; uniform float uClear;",world:`
    float clearF = clamp((uClear - iClear - seed * 0.34) / 0.62, 0.0, 1.0);
    if (clearF > 0.0) {
      clearF *= clearF;
      vec3 away = wp - (uLampOrigin + vec3(0.0, 0.0, -0.4));
      away.y = 0.0;
      wp += normalize(away + vec3(0.001)) * clearF * 2.4;
      wp.y += clearF * 0.9 - clearF * clearF * 1.9;
    }`};function Zo(){let n=document.createElement("canvas");n.width=1024,n.height=512;let o=n.getContext("2d");o.fillStyle="#7b4c2b",o.fillRect(0,0,1024,512);let u=Oe("walnut");for(let c=0;c<520;c+=1){let p=u()*512,v=u()>.45;o.strokeStyle=v?`rgba(44,22,10,${.05+u()*.2})`:`rgba(180,120,74,${.03+u()*.1})`,o.lineWidth=.5+u()*2.4,o.beginPath(),o.moveTo(0,p);let a=u()*1.2;for(let t=0;t<=1024;t+=48)p+=(u()-.5)*4*a,o.lineTo(t,p);o.stroke()}for(let c=0;c<3;c+=1){let p=u()*1024,v=u()*512;for(let a=8;a<90;a+=5+u()*5)o.strokeStyle=`rgba(40,20,9,${.1+u()*.09})`,o.lineWidth=.8,o.beginPath(),o.ellipse(p,v,a*3.2,a*.8,0,0,Math.PI*2),o.stroke()}return Ke(n)}function To({programs:l,shared:i,text:n,q:o,dir:u}){let c=w=>w*u,p=new qe;p.name="desk";let v={uClear:{value:0},uRing:{value:0},uRingOn:{value:0}},a=new ce(c(.27),.62,-.5),t=[c(-.02),-.38],r=[t[0],t[1]],m=new Xt(o.shadowSize,o.shadowSize,{depthTexture:new eo(o.shadowSize,o.shadowSize,Yt)});m.depthTexture.compareFunction=qt,m.depthTexture.minFilter=it,m.depthTexture.magFilter=it;let d=new kt,f={uMap:{value:Zo()},uShadow:{value:m.depthTexture},uClear:v.uClear,uDawnStripes:{value:1},uAmbient:{value:.045},uShadowTaps:{value:o.shadowTaps},uGloss:{value:1},uRings:{value:[1,0,0,0]},uRingCentreA:{value:[c(-.2),-.21,.046]},uRingCentreB:{value:[c(-.112),-.21,.046]},uTint:{value:[1,1,1]},uLampMatrix:{value:d}},g=new W(new Ee(1.6,.045,.8),l.wood({uniforms:f}));g.position.set(0,-.0225,-.4),p.add(g);let y={...f,uTint:{value:[.34,.31,.28]},uGloss:{value:0},uRings:{value:[0,0,0,0]}},x=.5,k=new W(Ae([[0,-x-2.5,10,5],[0,x+2.5,10,5],[-x-2.5,0,5,x*2],[x+2.5,0,5,x*2]].map(([w,S,C,O])=>{let V=new Ee(C,.1,O);return V.translate(w,te.floorY-.05,S),V})),l.wood({uniforms:y}));p.add(k);let b=[c(-.52),0,-.56],L=[c(-.156),0,-.21],G=[c(.66),.88,-.95],ae=[c(.31),0,-.64],ie=[c(.62),0,-.62],F=[c(.72),.42,-.62],se=[c(.27),.72,-.5],E=[.24,.14,.08],R=Ae([j(.07,.75,.07,{at:[-.74,-.4,-.06],color:E}),j(.07,.75,.07,{at:[.74,-.4,-.06],color:E}),j(.07,.75,.07,{at:[-.74,-.4,-.74],color:E}),j(.07,.75,.07,{at:[.74,-.4,-.74],color:E}),j(1.42,.09,.02,{at:[0,-.1,-.03],color:E}),j(.1,.012,.018,{at:[c(.42),-.1,-.014],color:[.76,.58,.3],mat:1}),j(.1,.012,.018,{at:[c(-.42),-.1,-.014],color:[.76,.58,.3],mat:1}),...mo(G),...uo(ie,F,se,u),...ho(L,u),j(.07,.006,.07,{at:[c(-.02),.003,-.7],color:[.25,.25,.27]}),Fe(new Ft(.002,.003,.17,6),{at:[c(-.02),.09,-.7],color:[.7,.7,.72]})]),_=new W(R,l.solid({ambient:.17,house:0}));p.add(_);let Q=new W(Ae([j(12,7,.1,{at:[0,1.6,-1.05],color:[.62,.6,.6]}),j(12,.12,.03,{at:[0,te.floorY+.06,-.99],color:[.2,.18,.17]}),j(1.62,.04,.04,{at:[c(-.46),1.54,-.97],color:[.55,.52,.5]}),j(1.62,.04,.04,{at:[c(-.46),.5,-.97],color:[.55,.52,.5]}),j(.04,1.08,.04,{at:[c(-1.27),1.02,-.97],color:[.55,.52,.5]}),j(.04,1.08,.04,{at:[c(.35),1.02,-.97],color:[.55,.52,.5]})]),l.solid({ambient:.2,house:0}));p.add(Q);let s=new W(Ae(co(ae,u)),_.material),T=It([[b[0]-.11*u,.05,b[2]+.03],[b[0]-.17*u,.03,b[2]+.06],[b[0]-.2*u,.012,b[2]+.13],[b[0]-.19*u,.05,b[2]-.03],[b[0]-.13*u,.11,b[2]-.08]],24),Y=l.solid({house:0,deform:lo()}),z=new W(Ae([...po(b),T]),Y);p.add(s,z);let U={x:b[0],y:.135,z:b[2]-.08},I=new W(fo(),Y);I.name="handset",I.position.set(U.x,U.y,U.z),p.add(I);let $=new W(It([[0,0,0],[0,-.2,0],[0,-.4,.01],[0,-.6,0]],22,.008),Y);$.visible=!1,p.add($);let me=_.material,ne=new W(j(.012,.095,.004,{at:[0,.042,0],color:[.1,.1,.1]}),me),pe=new W(j(.007,.14,.004,{at:[0,.064,0],color:[.1,.1,.1]}),me);ne.position.set(G[0],G[1],G[2]+.026),pe.position.set(G[0],G[1],G[2]+.03),p.add(ne,pe);let P=c(-.46),A=new W(Fe(new Le(1.58,1),{at:[P,1.02,-.985],color:[.075,.11,.21],mat:2}),l.solid({house:0,deform:{fpars:"uniform highp float uDawn;",frag:"c = mix(c, mix(vec3(0.365, 1.0, 0.87), vec3(0.643, 0.545, 1.0), clamp((vLampP.x + 0.5) * 0.7, 0.0, 1.0)), uDawn);"}}));p.add(A);let B=j(1.58,.042,.004,{color:[.72,.72,.7]});B.deleteAttribute("uv");let J=new W(Ce(B,24,(w,S)=>{S.pos=[P,.54+(w+.5)*.0405,-.965]}),l.solid({house:0,ambient:.14,defines:{INSTANCED:1},deform:{local:`{
          float a = mix(0.86, 1.32, uDawn);
          float ca = cos(a), sa = sin(a);
          p = vec3(p.x, p.y * ca - p.z * sa, p.y * sa + p.z * ca);
          n = vec3(n.x, n.y * ca - n.z * sa, n.y * sa + n.z * ca);
        }`}}));J.frustumCulled=!1,p.add(J);let M=Oe("desk"),ee=[{x:-.66,z:-.3,h:.34},{x:-.58,z:-.68,h:.44},{x:-.27,z:-.67,h:.27},{x:.66,z:-.22,h:.2},{x:-.36,z:-.28,h:.13},{x:-.14,z:-.7,h:.15},{x:.66,z:-.42,h:.1},{x:-.7,z:-.08,h:.09}],de=[],he=new Map;for(let w of ee){let S=0,C=0,O=0;for(;S<w.h&&de.length<o.stacks;){let V=.01+M()*.022;C+=(M()-.5)*.012,O+=(M()-.5)*.012,de.push({x:w.x+C,y:S+V/2,z:w.z+O,h:V,yaw:(M()-.5)*.34}),S+=V}he.set(w,{y:S,x:w.x+C,z:w.z+O})}let Ie=new Ee(1,1,1);Ie.deleteAttribute("uv");let q=Fe(Ie),fe=new W(Ce(q,de.length,(w,S)=>{let C=de[w];S.pos=[c(C.x),C.y,C.z],Ne(0,C.yaw,0,S.quat),S.scale=[.21+M()*.03,C.h,.297+M()*.03];let O=.74+M()*.26;S.tint=M()>.86?[O,O*.84,O*.72]:[O,O,O*.95],S.extra.iClear=2},{iClear:1}),l.solid({house:0,ambient:.13,defines:{INSTANCED:1},deform:Lt}));fe.frustumCulled=!1,p.add(fe);let tt=[{x:.5,z:-.14,n:.3},{x:-.5,z:-.2,n:.3},{x:-.3,z:-.5,n:.26}],ve=Fe(new Ee(1,1,1)),le=[];for(let w of tt){let S=Math.floor(o.dossiers*w.n*.5),C=0;for(let O=0;O<S&&C<.2;O+=1){let V=.016+M()*.014,re=(M()-.5)*.5,e=.7+M()*.3;le.push({x:w.x+(M()-.5)*.02,y:C+V/2,z:w.z+(M()-.5)*.02,yaw:re,sx:.24,sy:V,sz:.33,tint:[.86*e,.7*e,.42*e]}),le.push({x:w.x,y:C+V+6e-4,z:w.z,yaw:re,sx:.016,sy:.0015,sz:.335,tint:[.92,.9,.84]}),C+=V}}let oe=new W(Ce(ve,le.length,(w,S)=>{let C=le[w];S.pos=[c(C.x),C.y,C.z],Ne(0,C.yaw,0,S.quat),S.scale=[C.sx,C.sy,C.sz],S.tint=C.tint,S.extra.iClear=2},{iClear:1}),l.solid({house:0,ambient:.13,defines:{INSTANCED:1},deform:Lt}));oe.frustumCulled=!1,p.add(oe);let ot=new Le(1,1,o.sheetSeg,o.sheetSeg);ot.rotateX(-Math.PI/2);let N=["invoice","ledger","quote","receipt","lines","sheet","memo","invoice","carbon","slip"],ge=[],yt=Math.min(30,Math.floor(o.sheets*.1));for(let w=0;w<yt;w+=1){let S=.36+M()*.46,C=M()*Math.PI*2,O=Math.cos(C)*S*1.08,V=-.4+Math.sin(C)*S*.42;ge.push({x:O,z:V,y:.0012+M()*.012,yaw:M()*6.28,kind:0,clear:M()>.4?0:1})}for(let[w,S]of he){let C=Math.floor(o.sheets*.5/ee.length*(.5+w.h*2));for(let O=0;O<C;O+=1)ge.push({x:S.x+(M()-.5)*.06,z:S.z+(M()-.5)*.06,y:S.y+O*.0015,yaw:(M()-.5)*.7,kind:1,clear:2})}let st=Math.min(8,Math.floor(o.sheets*.02));for(let w=0;w<st;w+=1){let S=w%2===0?1:-1;ge.push({x:S*(.24+M()*.46),z:-.08+M()*.05,y:.002+M()*.004,yaw:(M()-.5)*.3,kind:2,clear:0})}let nt=Math.max(0,Math.floor(o.sheets*.24));for(let w=0;w<nt;w+=1){let S=M()*Math.PI*2,C=.7+M()*1.5,O=Math.cos(S)*C*1.2,V=.1+Math.abs(Math.sin(S))*C*.7;Math.hypot(O,V)>.75&&ge.push({x:O,z:V,y:te.floorY+.002+M()*.004,yaw:M()*6.28,kind:0,clear:2})}for(let w=0;w<8;w+=1)ge.push({x:-.02+(M()-.5)*.015,z:-.7+(M()-.5)*.015,y:.02+w*.012,yaw:M()*6.28,kind:3,clear:2});let He=l.paper({house:0,ambient:.05,defines:{INSTANCED:1},deform:{pars:`${Lt.pars} in float iCurl;`,local:`
        float cx = uv.x - 0.5, cz = uv.y - 0.5;
        p.y += (cx * cx * 0.03 + cz * cz * 0.05) * iCurl;
        /* A sheet by the edge lifts a little in the draught from the printer. */
        p.y += sin(uTime * 2.6 + seed * 37.0) * 0.0012 * max(iCurl - 0.8, 0.0) * (cz + 0.5);
        n.xz -= vec2(cx * 0.06, cz * 0.1) * iCurl;`,world:Lt.world}}),Te=new W(Ce(ot,ge.length,(w,S)=>{let C=ge[w],O=C.kind===3;S.pos=[c(C.x),C.y,C.z],Ne(0,C.yaw,0,S.quat),S.scale=O?[.08,1,.16]:[.21,1,.297];let V=O?"receipt":N[Math.floor(M()*N.length)];S.cell=n.cell(V);let re=.82+M()*.18;S.tint=V==="carbon"?[.98,.72*re,.72*re]:V==="slip"?[.99,.9*re,.62*re]:[re,re,re*.96],S.extra.iClear=C.clear,S.extra.iCurl=C.kind===2?1.6:.5+M()},{iClear:1,iCurl:1}),He);Te.frustumCulled=!1,p.add(Te);let Ye=new W(new Le(.34,.34),l.glow({color:[1,.74,.46],alpha:.5,defines:{BILLBOARD:1}}));Ye.position.set(a.x,a.y+.03,a.z),Ye.frustumCulled=!1,p.add(Ye);let Ge=new W(Ce(new Le(1,1),2,(w,S)=>{S.pos=w===0?[c(.34),.42,-.985]:[c(-.46),.95,-.98],S.scale=w===0?[2.6,1.9,1]:[3.2,2.2,1],S.tint=w===0?[.13,.086,.047]:[.028,.038,.067]}),l.glow({defines:{INSTANCED:1}}));Ge.frustumCulled=!1,p.add(Ge);let at=new Ft(.05,.54,.86,26,1,!0),De=new W(at,l.glow({color:[1,.72,.42],alpha:.13,shape:5,deform:{frag:"a = vUv.y * vUv.y; { float f = abs(dot(normalize(vN), normalize(vV))); a *= f * f; }"}}));De.frustumCulled=!1,p.add(De);let ut=new Le(.009,.009),Ue=new W(Ce(ut,o.dust,(w,S)=>{let C=Math.sqrt(M()),O=M()*Math.PI*2,V=C*.34;S.pos=[a.x+(r[0]-a.x)*C+Math.cos(O)*V,a.y*(1-C)+.04,a.z+(r[1]-a.z)*C+Math.sin(O)*V],S.tint=[1,.82,.6]}),l.glow({alpha:.42,defines:{INSTANCED:1,BILLBOARD:1},deform:{world:"wp += vec3(sin(uTime * 0.21 + seed * 40.0), sin(uTime * 0.17 + seed * 90.0), cos(uTime * 0.19 + seed * 70.0)) * 0.03;"}}));Ue.frustumCulled=!1,p.add(Ue);let we=a.clone(),xe=new bt(122,1,.05,2.2),pt=new ce(0,0,-1),Re=new ce,$e={x:0,y:0,z:0},ye=0,ke=0,At=new kt().set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.4975,0,0,0,1),Be=Te.geometry.instanceCount,je=fe.geometry.instanceCount,Ct=oe.geometry.instanceCount,dt=w=>{ne.rotation.z=-(w%12/12)*Math.PI*2,pe.rotation.z=-(w%1)*Math.PI*2};return dt(3.2),{group:p,u:v,setClock:dt,lampPos:we,pool:t,*build(){yield},setActPositions(w){$e=w},setPhone(w){w.position.set(0,.0043,-.4),w.visible=!1,p.add(w),this.phone=w},setAct(w){w===4?p.position.set($e.x,$e.y,$e.z):p.position.set(0,0,0)},setSpot(w,S){r[0]=w,r[1]=S},resetSpot(){r[0]=t[0],r[1]=t[1]},setRing(w){ye=w},setOffHook(w){ke=w},setShadowTaps(w){f.uShadowTaps.value=w},setDensity(w){Te.geometry.instanceCount=Math.floor(Be*w),fe.geometry.instanceCount=Math.floor(je*w),oe.geometry.instanceCount=Math.floor(Ct*w)},setExtras(w){Ue.visible=w,De.visible=w},bakeShadow(w){let S=[g,k,Ye,De,Ue,A,J,Q,Ge,$];this.phone&&S.push(this.phone);let C=S.map(h=>h.visible),O=p.position.clone(),V=v.uClear.value,re=p.visible;p.visible=!0,S.forEach(h=>{h.visible=!1}),p.position.set(0,0,0),this.setClear(0),I.position.set(U.x,U.y,U.z),I.rotation.set(0,0,0),I.visible=!0,p.updateMatrixWorld(!0),i.uLampOrigin.value.set(0,0,0),xe.position.copy(we),xe.up.copy(pt),xe.lookAt(c(-.02),0,-.38),xe.updateMatrixWorld(),xe.updateProjectionMatrix();let e=w.getRenderTarget();w.setRenderTarget(m),w.clear(),w.render(p,xe),w.setRenderTarget(e),d.multiplyMatrices(At,xe.projectionMatrix).multiply(xe.matrixWorldInverse),S.forEach((h,D)=>{h.visible=C[D]}),p.position.copy(O),p.visible=re,this.setClear(V),p.updateMatrixWorld(!0)},setClear(w){v.uClear.value=w,f.uClear.value=w;let S=(O,V,re)=>{let e=no((w-V)/.7),h=e*e;O.position.set(re*h*2.2*u,h*.5-h*h*1.6,-h*.2),O.rotation.z=-h*1.2*re*u,O.visible=e<1};S(z,1,-1),S(s,2,1);let C=w>=3;Te.visible=!C,fe.visible=!C,oe.visible=!C},update(w,S){let C=S%3,O=C<.42||C>.62&&C<1.04?1:0,V=Math.abs(Math.sin(S*37.7))*.006*O*ye,re=Math.sin(S*75)*.012*O*ye,e=Ze(0,.5,ke),h=Ze(.42,1,ke),D=U.x+(-.3*u-U.x)*e,H=U.z+(.1-U.z)*e;I.position.set(D+z.position.x,U.y+V-h*.62+z.position.y,H+z.position.z),I.rotation.set(h*1.3,0,e*.9*u+re+z.rotation.z),I.visible=z.visible,$.visible=h>.02,$.position.set(D,0,H-.02),$.scale.y=Math.max(.01,h);let X=r[0]+(w.pointer===1?w.px*.2:0),Z=r[1]+(w.pointer===1?w.py*.12:0);Re.set(X-we.x,-we.y,Z-we.z).normalize(),i.uLampDir.value.copy(Re),i.uLampPos.value.copy(we),i.uLampCone.value.set(.6,.93),De.position.set(we.x+Re.x*.43,we.y+Re.y*.43,we.z+Re.z*.43),De.quaternion.setFromUnitVectors(Ko,Re.negate())}}}var Ko=new ce(0,1,0);var gt=new ce;function Pe(l,i,n,o,u,c){let p=2*Math.PI*u/4,v=Math.max(c-2*u,0),a=Math.PI/4;gt.copy(i),gt[o]=0,gt.normalize();let t=.5*p/(p+v),r=1-gt.angleTo(l)/a;return Math.sign(gt[n])===1?r*t:v/(p+v)+t+t*(1-r)}var xt=class l extends Ee{constructor(i=1,n=1,o=1,u=2,c=.1){let p=u*2+1;if(c=Math.min(i/2,n/2,o/2,c),super(1,1,1,p,p,p),this.type="RoundedBoxGeometry",this.parameters={width:i,height:n,depth:o,segments:u,radius:c},p===1)return;let v=this.toNonIndexed();this.index=null,this.attributes.position=v.attributes.position,this.attributes.normal=v.attributes.normal,this.attributes.uv=v.attributes.uv;let a=new ce,t=new ce,r=new ce(i,n,o).divideScalar(2).subScalar(c),m=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,g=m.length/6,y=new ce,x=.5/p;for(let k=0,b=0;k<m.length;k+=3,b+=2)switch(a.fromArray(m,k),t.copy(a),t.x-=Math.sign(t.x)*x,t.y-=Math.sign(t.y)*x,t.z-=Math.sign(t.z)*x,t.normalize(),m[k+0]=r.x*Math.sign(a.x)+t.x*c,m[k+1]=r.y*Math.sign(a.y)+t.y*c,m[k+2]=r.z*Math.sign(a.z)+t.z*c,d[k+0]=t.x,d[k+1]=t.y,d[k+2]=t.z,Math.floor(k/g)){case 0:y.set(1,0,0),f[b+0]=Pe(y,t,"z","y",c,o),f[b+1]=1-Pe(y,t,"y","z",c,n);break;case 1:y.set(-1,0,0),f[b+0]=1-Pe(y,t,"z","y",c,o),f[b+1]=1-Pe(y,t,"y","z",c,n);break;case 2:y.set(0,1,0),f[b+0]=1-Pe(y,t,"x","z",c,i),f[b+1]=Pe(y,t,"z","x",c,o);break;case 3:y.set(0,-1,0),f[b+0]=1-Pe(y,t,"x","z",c,i),f[b+1]=1-Pe(y,t,"z","x",c,o);break;case 4:y.set(0,0,1),f[b+0]=1-Pe(y,t,"x","y",c,i),f[b+1]=1-Pe(y,t,"y","x",c,n);break;case 5:y.set(0,0,-1),f[b+0]=Pe(y,t,"x","y",c,i),f[b+1]=1-Pe(y,t,"y","x",c,n);break}}static fromJSON(i){return new l(i.width,i.height,i.depth,i.segments,i.radius)}};var Qo=[.2,.21,.25],es=[.365,1,.87];function Ro({programs:l,text:i,dir:n}){let o=(t,r,m)=>Fe(new xt(t,r,m,4,Math.min(m*.45,t*.12)),{color:Qo}),u=null;function c({w:t=.78,h:r=1.6,t:m=.09,emissive:d=1}={}){let f=new qe,g=new W(Ae([o(t,m,r),j(t*.965,m*.02,t*.012,{at:[0,m/2+.001,-r*.482],color:[.7,.72,.76],mat:1}),j(t*.965,m*.02,t*.012,{at:[0,m/2+.001,r*.482],color:[.7,.72,.76],mat:1}),j(t*.012,m*.02,r*.965,{at:[-t*.482,m/2+.001,0],color:[.7,.72,.76],mat:1}),j(t*.012,m*.02,r*.965,{at:[t*.482,m/2+.001,0],color:[.7,.72,.76],mat:1})]),l.solid({ambient:.32,house:1}));f.add(g);let y=new Le(t*.94,r*.96);y.rotateX(-Math.PI/2),y.translate(0,m/2+.003,0),u??(u=a(360,720,12));let x=l.paper({atlas:{value:u},house:0,ambient:d,defines:{}}),k=new W(y,x);return f.add(k),f.userData={screen:k,screenMaterial:x,w:t,h:r,t:m},f}function p({w:t=.78,h:r=1.6,t:m=.09,color:d=es,alpha:f=.9}={}){let g=new to(new xt(t,m,r,3,Math.min(m*.45,t*.12)),10);return new Kt(g,l.wire({color:d,alpha:f}))}function v({w:t=.78,h:r=1.6}={}){let m=Oe("phone-board"),d=l.solid({ambient:.14,house:1}),f=new W(o(t,.03,r),d),y=[j(t*.88,.016,r*.9,{color:[.05,.3,.2]}),j(t*.68,.03,r*.42,{at:[0,.02,r*.19],color:[.2,.22,.26]})];for(let se=0;se<30;se+=1){let E=.03+m()*.08,R=.03+m()*.09;y.push(j(E,.018,R,{at:[(m()-.5)*t*.74,.016,-r*.28+(m()-.5)*r*.26],color:m()>.7?[.76,.58,.3]:[.1,.1,.12],mat:m()>.7?1:0}))}let x=new W(Ae(y),d),k=Ae([j(t,.05,.05,{at:[0,0,-r/2+.025],color:[.62,.64,.68],mat:1}),j(t,.05,.05,{at:[0,0,r/2-.025],color:[.62,.64,.68],mat:1}),j(.05,.05,r,{at:[-t/2+.025,0,0],color:[.62,.64,.68],mat:1}),j(.05,.05,r,{at:[t/2-.025,0,0],color:[.62,.64,.68],mat:1})]),b=new W(k,d),L=new Le(t*.94,r*.96);L.rotateX(-Math.PI/2);let G=l.paper({atlas:{value:i.texture},cell:[0,0,1,1],house:0,ambient:1}),ae=new W(L,G),ie=new Ee(t*.98,.006,r*.98),F=new W(ie,l.glow({color:[.8,.9,1],alpha:.05,shape:5}));return{back:f,board:x,frame:b,display:ae,displayMaterial:G,glass:F}}function a(t,r,m,d){return i.canvas(t,r,(f,g,y)=>{if(f.fillStyle="#0b0d13",f.fillRect(0,0,g,y),d){d(f,g,y);return}let x=y/13;for(let k=0;k<m;k+=1){f.fillStyle="rgba(255,255,255,.07)",f.fillRect(g*.06,x*(k+1),g*.88,x*.74),f.fillStyle=k%3===0?"#5dffde":"#a48bff";let b=n<0?g*.78:g*.1;f.fillRect(b,x*(k+1)+x*.16,g*.12,x*.42),f.fillStyle="rgba(232,236,244,.7)",f.fillRect(n<0?g*.28:g*.26,x*(k+1)+x*.28,g*.46,x*.16)}})}return{make:c,wire:p,layers:v,listTexture:a}}var ze=4200,ko=.12,ts=.6,os=.03;function Fo({programs:l,shared:i,printTexture:n,dir:o}){let u=new Je(new Float32Array(ze*2*3),3).setUsage(ht),c=new Je(new Float32Array(ze*2*3),3).setUsage(ht),p=new Je(new Float32Array(ze*2),1),v=new Je(new Float32Array(ze*2),1).setUsage(ht),a=new Je(new Float32Array(ze*2),1).setUsage(ht),t=new Uint32Array((ze-1)*6);for(let R=0;R<ze;R+=1)if(p.array[R*2]=-1,p.array[R*2+1]=1,R<ze-1){let _=R*2;t.set([_,_+1,_+2,_+1,_+3,_+2],R*6)}let r=new Zt;r.setAttribute("position",u),r.setAttribute("aAcross",c),r.setAttribute("aSide",p),r.setAttribute("aS",v),r.setAttribute("aW",a),r.setIndex(new Je(t,1));let m={uFeed:{value:0},uLine:{value:1e6},uLineLen:{value:4},uJamA:{value:0},uJamB:{value:0},uJamK:{value:0},uFlutter:{value:1},uWide:{value:1e6},uPrint:{value:n},uPrintRange:{value:0},uPaperGlow:{value:.22},uLineColor:{value:[.365,1,.87]}},d=l.strip({uniforms:m,side:2}),f=new W(r,d);f.frustumCulled=!1;let g=new W(r,l.glow({color:[.365,1,.87],alpha:.5,shape:5,house:0,deform:{pars:"in vec3 aAcross; in float aSide, aS, aW; uniform float uLine, uLineLen; out float vSide, vAlive;",fpars:"in float vSide, vAlive;",local:`{
          float z = max(-(viewMatrix * vec4(p, 1.0)).z, 0.05);
          p += aAcross * aSide * min(max(aW * 5.0, 0.16), z * 0.02);
        }`,world:"vSide = aSide; vAlive = smoothstep(uLine + uLineLen * 0.7, uLine + uLineLen, aS);",frag:"a = (1.0 - abs(vSide)); a = a * a * vAlive;",uniforms:{uLine:m.uLine,uLineLen:m.uLineLen}}}));g.frustumCulled=!1;let y=new Float32Array(ze),x=new Float32Array(ze),k=0,b=0,L=0,G=(R,_,Q,s,T,Y,z,U)=>{if(k>=ze)return;let I=k*2;u.setXYZ(I,R,_,Q),u.setXYZ(I+1,R,_,Q),c.setXYZ(I,s,T,Y),c.setXYZ(I+1,s,T,Y),v.setX(I,z),v.setX(I+1,z),a.setX(I,U),a.setX(I+1,U),y[k]=z,x[k]=_,k+=1};function ae({yaws:R,lineStartY:_,endY:Q,dense:s}){k=0;let T=0,Y=.31*o,z=[[Y,.11,-.5],[Y,.085,-.43],[Y*.92,.012,-.34],[Y*.62,.003,-.24],[Y*.22,.003,-.11],[0,.003,-.025],[0,-.004,.008],[0,-.03,.012]],U=24,I=z[0];for(let ne=0;ne<z.length-1;ne+=1){let pe=z[Math.max(0,ne-1)],P=z[ne],A=z[ne+1],B=z[Math.min(z.length-1,ne+2)];for(let J=ne===0?0:1;J<=U;J+=1){let M=J/U,ee=M*M,de=ee*M,he=[0,1,2].map(ve=>.5*(2*P[ve]+(A[ve]-pe[ve])*M+(2*pe[ve]-5*P[ve]+4*A[ve]-B[ve])*ee+(3*P[ve]-pe[ve]-3*A[ve]+B[ve])*de)),Ie=he[0]-I[0],q=he[1]-I[1],fe=he[2]-I[2];T+=Math.hypot(Ie,q,fe);let tt=Math.hypot(Ie,fe)||1;G(he[0],he[1],he[2],fe/tt||1,0,-Ie/tt||0,T,ko),I=he}}b=T,L=I[1];let $=I[1],me=0;for(;$>Q&&k<ze;){let ne=.22;$>te.slabBottom-.5&&(ne=.05);for(let ee of s)$<ee.a&&$>ee.b&&(ne=.022);for($-=ne,T+=ne;me<R.length-1&&$<R[me+1].y;)me+=1;let pe=R[me],P=R[Math.min(me+1,R.length-1)],A=P===pe?0:Ze(.25,.75,(pe.y-$)/Math.max(.001,pe.y-P.y)),B=Mt(pe.yaw,P.yaw,A)*Math.PI/180,J=Ze(te.floorY-.2,te.slabBottom+.2,$),M=Mt(ko,ts,J);$<_&&(M=Mt(M,os,Ze(0,4,_-$))),G(0,$,0,Math.cos(B),0,Math.sin(B),T,M)}u.needsUpdate=!0,c.needsUpdate=!0,v.needsUpdate=!0,a.needsUpdate=!0,m.uLine.value=ie(_),m.uPrintRange.value=ie(te.floorY-.1),m.uWide.value=ie(te.deskY)}function ie(R){return b+(L-R)}function F(R){let _=0,Q=k-1;for(;_<Q;){let s=_+Q>>1;y[s]<R?_=s+1:Q=s}return _}let se=-1/0;function E(R,_){let Q=R+_,s=Q>L?0:F(ie(Q)),T=F(ie(Math.max(R-_,se))),Y=Math.max(0,T-s)*6;r.setDrawRange(s*6,Y)}return{mesh:f,halo:g,u:m,rebuild:ae,focus:E,setEnd(R){se=R},sAtY:ie,pointAtY(R,_){return _[0]=0,_[1]=R,_[2]=0,_}}}var as=460812,is=12e3,rs=190,ls=900,cs=()=>new Promise(l=>{window.scheduler?.yield?window.scheduler.yield().then(l):setTimeout(l,0)});async function Ot(l){let i=performance.now();for(;;){if(l.next().done)return;performance.now()-i>4&&(await cs(),i=performance.now())}}async function on({canvas:l,gl:i,tier:n,forced:o,onFail:u,onOff:c,onOn:p,isFailed:v}){Vt.enabled=!1;let a={...Ao[n],instanceScale:1},t=document.documentElement,r=t.dir==="rtl"?-1:1,m=window.matchMedia("(pointer: coarse)").matches,d=new so({canvas:l,context:i,antialias:!0});d.outputColorSpace=Ut,d.setClearColor(as,1),d.sortObjects=!1,d.debug.checkShaderErrors=o,d.info.autoReset=!0;let f=new Jt,g=new bt(30,1,.1,100);await Eo(r<0);let y=Lo({q:a,dir:r}),x={uTime:{value:0},uInline:{value:r},uCamY:{value:0},uDawn:{value:0},uPower:{value:new Xe(0,0)},uPowerY:{value:0},uLitY:{value:new Xe(te.slabBottom,-120)},uFog:{value:new Xe(4,40)},uLampOrigin:{value:new ce},uLampPos:{value:new ce(.5*r,.62,-.62)},uLampDir:{value:new ce(0,-1,0)},uLampColor:{value:new ce(1,.7,.42)},uLampOn:{value:1},uLampCone:{value:new Xe(.55,.9)},uAtlas:{value:y.texture}},k=So(x),b=Fo({programs:k,shared:x,printTexture:y.printTexture,dir:r}),L=To({programs:k,shared:x,text:y,q:a,dir:r,tier:n}),G=zo({programs:k,shared:x,text:y,q:a,dir:r,tier:n}),ae=Ro({programs:k,shared:x,text:y,dir:r}),ie={desk:L,archive:G,strip:b,phone:ae};L.setPhone(ae.make({w:.0775,h:.16,t:.0085})),f.add(L.group,G.group,b.mesh,b.halo);let F=Qe.map((e,h)=>({meta:e,index:h,status:"idle",module:null,group:new qe,ctx:null,on:!1,a:0,s:0,e:0,b:0,promise:null})),se=Object.fromEntries(F.map(e=>[e.meta.id,e]));F.forEach(e=>{e.group.visible=!1,f.add(e.group)});let E=null,R=null,_=null,Q=1,s=1/0,T=0,Y=0,z=0,U=()=>E.svh*.15,I=vo({inPlace:!m,blur:!m&&n!=="L"}),$=Nt();function me(e){let h=[],D=[],H=[];for(let[X,Z]of Object.entries(e.shots))Z.caption&&(X==="hero"?h.push([0,Z.pinEnd]):(h.push([Z.pinStart-.35*e.svh,Z.pinEnd]),D.push(Z.pinStart)),H.push(Z.pinEnd));return{zones:h,down:D,up:H}}function ne(){I.release(),E=yo(),I.bake(E),$.bake(me(E),E.docH,E.svh);let e=ao(E,Qe);R=e.solved,Q=E.docH,_=io(e.knots,Q);let h=R["svc.auto"],D=R["process.head"],H=R["why.q"],X=Qe.filter(K=>K.floor&&K.stripYaw!==void 0).map(K=>({y:R[K.id].floorY,yaw:K.stripYaw}));X.unshift({y:te.deskY,yaw:0}),X.push({y:h.floorY+3,yaw:0},{y:h.floorY+1,yaw:90},{y:h.floorY-3,yaw:90},{y:D.floorY+2,yaw:0}),X.sort((K,Se)=>Se.y-K.y),b.rebuild({yaws:X,lineStartY:h.floorY-1.8,endY:H.floorY+.03,dense:[{a:R["svc.rescue"].floorY+2.4,b:R["svc.rescue"].floorY-2.4}]}),x.uLitY.value.set(te.slabBottom,D.floorY+4),G.setRange(te.slabBottom,D.floorY);let Z=E.shots.drop,be=E.shots.fall;T=Z.pinStart+(Z.pinEnd-Z.pinStart)*.86,s=be.pinStart+(be.pinEnd-be.pinStart)*.5,Y=Z.pinStart+(Z.pinEnd-Z.pinStart)*.8,z=be.pinStart+(be.pinEnd-be.pinStart)*.4;for(let K of F){let Se=K.index,Me=E.shots[K.meta.id],Ve=Se>0?E.shots[Qe[Se-1].id]:null,ft=Se<Qe.length-1?E.shots[Qe[Se+1].id]:null;K.a=Ve?Ve.pinEnd:0,K.s=Me.pinStart,K.e=Me.pinEnd,K.b=ft?ft.pinStart:Q;let Pt=R[K.meta.id];K.group.position.set(0,Pt.floorY??0,0),K.status==="ready"&&K.module.layout&&K.module.layout(K.ctx)}L.setActPositions(R.deskAct4),B()}let pe=1,P=0,A=null;function B(){let e=E.W,h=E.H,D=a.pixelCap*pe,H=Math.min(window.devicePixelRatio||1,Math.sqrt(D/(e*h)));d.setPixelRatio(H),d.setSize(e,h,!1),g.aspect=e/h,A?.resize(e*H,h*H)}let J=[],M=e=>({tier:n,q:a,dir:r,id:e.meta.id,group:e.group,programs:k,u:x,text:y,sets:ie,camera:g,renderer:d,rng:Oe(e.meta.id),get solved(){return R},get layout(){return E},get self(){return R[e.meta.id]},place(h,{inline:D=0,y:H=0,z:X=0,yaw:Z=0}={}){return h.position.set(D*r,H,X),h.rotation.y=Z*r,h},hotspots:{add(h){J.push({...h,runtime:e})}}});async function ee(e){if(e.status!=="ready")return e.promise||(e.status="loading",e.promise=(async()=>{try{let D=(await Co[e.meta.id]()).default;e.ctx=M(e),await Ot(D.build(e.ctx)),await d.compileAsync(e.group,g,f),D.layout&&D.layout(e.ctx),e.module=D,e.status="ready",He=!0}catch(h){console.warn(`shot ${e.meta.id} failed`,h),e.status="failed"}})()),e.promise}function de(e){for(let h=F.length-1;h>=0;h-=1)if(e>=F[h].a)return h;return 0}let he=!1;async function Ie(){if(!he){for(he=!0;!(st||v());){let e=de(N),h=null,D=1/0;for(let H of F)if(H.status==="idle"){let X=Math.abs(H.index-e);X<D&&(h=H,D=X)}if(!h)break;await new Promise(H=>{"requestIdleCallback"in window?window.requestIdleCallback(H,{timeout:200}):setTimeout(H,16)}),await ee(h)}he=!1}}let q=new Float32Array(13),fe=new jt,tt=new ce(0,1,0),ve=new ce(1,0,0),le={t:0,enter:0,hold:0,exit:0,y:0,v:0,time:0,dt:0,px:0,py:0,pointer:0},oe=wo(window.scrollY),ot=go($),N=oe.y,ge=0,yt=0,st=!1,nt=null,He=!0,Te=0,Ye=performance.now(),Ge=0,at=performance.now(),De=0,ut=0,Ue=0,we=0,xe=0,pt=0,Re=!1;function $e(e,h){let D=H=>Math.min(1,Math.max(0,H));le.t=e.b>e.a?D((N-e.a)/(e.b-e.a)):1,le.enter=e.s>e.a?D((N-e.a)/(e.s-e.a)):N>=e.s?1:0,le.hold=e.e>e.s?D((N-e.s)/(e.e-e.s)):N>=e.e?1:0,le.exit=e.b>e.e?D((N-e.e)/(e.b-e.e)):N>=e.b?1:0,le.y=N/E.pace,le.v=oe.v,le.time=Te,le.dt=h,le.px=we,le.py=xe,le.pointer=Ue}let ye=(e,h)=>h>e?Math.min(1,Math.max(0,(N-e)/(h-e))):N>=h?1:0,ke=e=>e*e*(3-2*e);function At(){let e=E.shots["process.head"];G.u.uTurn.value=ke(ye(e.pinStart,e.pinEnd));let h=E.shots["why.list"],D=E.shots["why.stats"],H=E.shots.cta,X=ye(h.pinStart,h.pinEnd)*3.2;L.setClear(X);let Z=ke(ye(h.pinStart+(h.pinEnd-h.pinStart)*.45,H.pinStart));x.uDawn.value=Z,L.setClock(3.2+ke(ye(h.pinStart,D.pinEnd))*3.8);let be=E.shots.hero;if(N<s){let Me=E.shots.drop.pinEnd-be.pinEnd;L.setRing(1-ye(be.pinEnd,be.pinEnd+Me*.14)),L.setOffHook(ke(ye(be.pinEnd,be.pinEnd+Me*.22)))}else L.setRing(1-ye(h.pinStart,h.pinStart+(h.pinEnd-h.pinStart)*.5)),L.setOffHook(0);let K=L.phone;if(K.visible=N>s,b.setEnd(-1/0),N>s){let Me=E.shots["why.q"],Ve=R["why.q"].d*.62,ft=ke(ye(E.shots.fall.pinEnd-(E.shots.fall.pinEnd-s)*.2,Me.pinEnd)),Pt=ke(ye(h.pinStart,h.pinStart+(h.pinEnd-h.pinStart)*.14)),_t=Ve+(.42-Ve)*ft,Bt=_t+(.0043-_t)*Pt;K.position.y=Bt;let Io=2.1+(1-2.1)*ft;K.scale.setScalar(Io),K.rotation.y=E.portrait?0:Math.PI/2*ke(ye(D.pinEnd,H.pinStart)),b.setEnd(L.group.position.y+Bt+.01)}let Se=F.find(Me=>Me.meta.id==="svc.rescue");(N<Se.a||N>Se.b)&&(x.uPower.value.set(0,0),b.u.uJamK.value=0)}function Be(e){ro(_,Q,N,q),g.position.set(q[0],q[1],q[2]),g.quaternion.set(q[3],q[4],q[5],q[6]),Ue===1&&(fe.setFromAxisAngle(tt,-we*.012),g.quaternion.multiply(fe),fe.setFromAxisAngle(ve,xe*.009),g.quaternion.multiply(fe)),g.fov=q[7],g.near=q[8],g.far=q[9],g.setViewOffset(E.W,E.H,q[11],q[12],E.W,E.H),x.uTime.value=Te,x.uCamY.value=q[1],x.uFog.value.set(q[10]*.16,q[10]),At();let h=N<T||N>s,D=N>s?4:1;L.group.visible=h,L.setAct(D),G.group.visible=N>Y&&N<z,x.uLampOn.value=h?1-x.uDawn.value*.72:0,x.uLampOrigin.value.copy(L.group.position),x.uLampColor.value.set(1,.7,.42),b.u.uFeed.value=N*18e-5/E.pace,$e(F[0],e),h&&(L.resetSpot(),L.update(le,Te));for(let H of F){let X=N>=H.a-U()&&N<=H.b+U();H.status==="ready"&&(X||H.on)&&($e(H,e),H.module.update(le,H.ctx),H.on=X,H.group.visible=X)}b.focus(q[1],q[9]),g.updateProjectionMatrix(),g.updateMatrixWorld(),A?A.render(f,g):d.render(f,g)}let je=new Et({onChange(e,h){Ct(h)}});function Ct(e){if(e==="pixel-85"||e==="pixel-72")P=e==="pixel-85"?.85:.72;else if(e==="drop-film")A?.dispose(),A=null;else if(e==="instances-70"||e==="instances-50")a.instanceScale=e==="instances-70"?.7:.5,L.setDensity(a.instanceScale),G.setDensity(a.instanceScale);else if(e==="shadow-1")L.setShadowTaps(1);else if(e==="extras-off")G.setWeather(!1),L.setExtras(!1);else if(e==="cadence-30")pt=33.3;else if(e==="stills"){try{window.localStorage.setItem("enjaz:tier",`S:${Date.now()}`)}catch{}S(),c("governor")}}function dt(e){if(st)return;if(window.requestAnimationFrame(dt),document.hidden||Re||nt!==null){Ye=e;return}let h=e-Ye;Ye=e;let D=Math.min(h,100)/1e3;Te+=D;let H=window.scrollY,X=ot.step(H,D,E.svh,e);X!==H&&window.scrollTo({top:X,behavior:"instant"}),I.update(X,D),!ge&&Math.abs(X-N)>6*E.svh&&e>yt?(ge=e,t.classList.add("world-dip")):ge&&e-ge>=rs&&(oe.land(X,E.svh),ge=0,yt=e+ls,t.classList.remove("world-dip"));let Z=Math.abs(X-oe.y)>.25||Math.abs(oe.v)>2;N=oe.step(X,D,E.svh,$.speed(oe.y)),we+=(De-we)*Math.min(1,D*6),xe+=(ut-xe)*Math.min(1,D*6);let be=Math.abs(De-we)>.001||Math.abs(ut-xe)>.001,Se=F[de(N)].meta.idleHz,Me=Z||be||He;if(!Me&&Se>0&&!(n==="L"&&e-at>is)&&(Me=e-Ge>=1e3/Se-1),pt&&e-Ge<pt-2&&(Me=!1),!Me)return;Z&&(at=e),P&&(!Z||N>E.shots.fall.pinStart&&N<E.shots.fall.pinEnd)&&(pe=P,P=0,B()),He=!1;let Ve=(e-Ge)/1e3;Ge=e,Be(Math.min(Ve,.1)),h<250&&(Z||Se>0)&&je.push(h)}function w(){ot.on=!1,ge=0,t.classList.remove("world-dip")}function S(){st=!0,w(),I.release()}window.addEventListener("pointermove",e=>{Ue=e.pointerType==="mouse"?1:2,De=e.clientX/window.innerWidth*2-1,ut=e.clientY/window.innerHeight*2-1,at=performance.now()},{passive:!0});let C=new ce;window.addEventListener("click",e=>{if(!e.target.closest?.("a, button, .shot"))for(let h of J){if(!h.runtime.on)continue;C.set(h.center[0],h.center[1],h.center[2]),h.runtime.group.localToWorld(C).project(g);let D=(C.x*.5+.5)*E.W,H=(.5-C.y*.5)*E.H;Math.hypot(D-e.clientX,H-e.clientY)<h.radius&&(h.runtime.module.hit?.(h.id,le,h.runtime.ctx),He=!0)}},{passive:!0}),window.addEventListener("pageshow",()=>{oe.reset(window.scrollY),N=oe.y,He=!0});let O=0;if(l.addEventListener("webglcontextlost",e=>{e.preventDefault(),Re=!0,w(),O+=1,c("context-lost")}),l.addEventListener("webglcontextrestored",()=>{O>1||(Re=!1,L.bakeShadow(d),p(),ne(),oe.reset(window.scrollY),N=oe.y,He=!0)}),ne(),oe.reset(window.scrollY),N=oe.y,await Ot(L.build()),await Ot(G.build()),await ee(se.hero),await ee(se.drop),await d.compileAsync(f,g),L.bakeShadow(d),v())return null;if(!o){let e=[],h=new Uint8Array(4);for(let H=0;H<6;H+=1){await new Promise(Z=>window.requestAnimationFrame(Z));let X=performance.now();Be(.016),i.readPixels(0,0,1,1,i.RGBA,i.UNSIGNED_BYTE,h),e.push(performance.now()-X)}let D=e.slice(2).sort((H,X)=>H-X)[1];if(D>40){try{window.localStorage.setItem("enjaz:tier",`S:${Date.now()}`)}catch{}return u("bench"),null}D>20&&(pe=.7,a.instanceScale=.7,L.setDensity(.7),G.setDensity(.7),B())}a.film&&(A=(await import("./chunk-WOIDP7SL.js")).createFilm(d),A.resize(E.W*d.getPixelRatio(),E.H*d.getPixelRatio())),oe.reset(window.scrollY),N=oe.y,I.update(N,0),Be(.016),t.classList.add("world-on"),window.requestAnimationFrame(dt),Ie(),window.addEventListener("wheel",e=>{e.ctrlKey||st||Re||nt!==null||document.body.classList.contains("is-nav-open")||Math.abs(e.deltaX)>Math.abs(e.deltaY)||(e.preventDefault(),ot.input(e.deltaY,e.deltaMode,window.scrollY,E.svh,E.docH-E.svh,performance.now()),at=performance.now())},{passive:!1});let V=bo(()=>{ne(),He=!0});/[?&]hud=1\b/.test(window.location.search)&&import("./chunk-FKFVKEYL.js").then(e=>e.mountHud({renderer:d,governor:je,tier:n,q:a,get y(){return N}}));let re={tier:n,renderer:d,governor:je,scene:f,stop:S,pacer:$,get layout(){return E},get solved(){return R},get y(){return N},seek(e){return window.scrollTo({top:e,behavior:"instant"}),w(),oe.reset(window.scrollY),N=oe.y,I.update(N,0),Be(.016),N},freeze(e){nt=e,Te=e},unfreeze(){nt=null},renderOnce(){Be(.016)},info(){return Be(.016),{calls:d.info.render.calls,triangles:d.info.render.triangles,programs:d.info.programs.length,rung:je.rung,y:N}},sceneInfo(){let e=A;A=null,Be(.016);let h={calls:d.info.render.calls,triangles:d.info.render.triangles};return A=e,h},feedFrameTimes(e){e.forEach(h=>je.push(h))},async loadAll(){await Promise.all(F.map(e=>ee(e))),He=!0},status(){return Object.fromEntries(F.map(e=>[e.meta.id,e.status]))},dispose(){S(),V()}};return window.__enjazWorld=re,re}export{on as start};
