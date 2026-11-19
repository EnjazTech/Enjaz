/* three.js r187 (c) three.js authors, MIT. ENJAZ film. */
import{a as st,b as Lo,c as Ao,d as To}from"./chunk-6ETZZDVU.js";import{a as Co,b as Po,c as zo,d as Ro,e as ko,f as Ve,g as Io,h as Fo}from"./chunk-2EEOQMQQ.js";import{c as Ht,d as j,f as Ct,g as Yt,h as Pt,i as Ut,j as Eo,k as Oe,l as ue}from"./chunk-GBHZZ3DY.js";import{A as yo,B as xo,C as At,D as je,E as bo,J as Tt,N as Mo,O as He,S as So,a as Ue,c as Ge,d as qe,e as ve,f as io,g as ro,h as lo,i as co,j as uo,k as Ae,l as po,m as le,n as fo,o as vt,p as ho,q as mo,r as $e,t as oe,u as vo,v as ce,w as wo,x as U,z as go}from"./chunk-ZD75F7KI.js";import"./chunk-AEJNSRIJ.js";var as=[.24,.45],De=r=>Math.min(1,Math.max(0,r));function Ho({inPlace:r,blur:n}){let i=[],e=null,d=1/0,c=NaN,u=0,v=0;function h(o){o.el.style.opacity="",o.el.style.transform="",o.el.classList.remove("is-gone");for(let f of o.kids)f.style.opacity="",f.style.transform="",f.style.filter=""}function s(o,f,p,m){let l=f<.5;if(l!==o.gone&&(o.gone=l,o.el.classList.toggle("is-gone",l),document.dispatchEvent(new CustomEvent("enjaz:captions"))),f===1&&p===0){h(o);return}o.el.style.opacity=De(f/.55).toFixed(3),o.el.style.transform=p?`translate3d(0, ${p.toFixed(1)}px, 0)`:"";let y=o.kids.length,w=y>1?Math.min(.14,.5/(y-1)):0,S=1-(y-1)*w;o.kids.forEach((b,T)=>{let N=De((f-T*w)/S);if(N===1){b.style.opacity="",b.style.transform="",b.style.filter="";return}let tt=1-N;b.style.opacity=N.toFixed(3),b.style.transform=`translate3d(0, ${(tt*tt*tt*1.1*(m?-1:1)).toFixed(3)}em, 0)`,n&&(b.style.filter=`blur(${(tt*.28).toFixed(3)}em)`)})}return{bake(o){let f=.35*o.svh;i=[];for(let[m,l]of Object.entries(o.shots)){if(!l.caption||l.caption.h>o.svh*.7)continue;let y=document.querySelector(`[data-shot="${m}"] > .shot`);y&&i.push({el:y,kids:[...y.children],a:m==="hero"?-1:l.pinStart-f,s:m==="hero"?-1:l.pinStart,e:l.pinEnd,b:l.pinEnd+f,unpin:l.pinEnd,hero:m==="hero",pin:l.pin??0,h:l.caption.h,shown:-1,shift:0,gone:!1})}let p=.5*o.svh;e=null,d=o.docH-o.svh;for(let m=1;m<i.length;m+=1){let l=i[m-1],y=i[m],w=y.s-l.e;if(!(w<=0)){if(r){let S=Math.min(p,w/2);l.b=l.e+S,y.a=y.s-S}else l.b=l.e+Math.min(p,Math.max(f,w-y.pin));l.hero&&(l.b=l.unpin+w*.18,l.e=Math.min(l.unpin,l.b-f*.6),e=as.map(S=>l.unpin+w*S))}}c=NaN},update(o,f){u=o===c?u+f:0,c=o,v=u>.25?Math.min(1,v+f/.4):Math.max(0,v-f/.12);for(let p of i){let m=p.s>p.a?De((o-p.a)/(p.s-p.a)):1,l=De((o-p.e)/(p.b-p.e)),y=o>p.a&&o<p.b,w=y?Math.max(Math.min(m,1-l),v):0;p.hero&&y&&l>.3&&(w=Math.min(1-l,1-v));let S=0;r&&y&&(S=m<1?(o-p.s)*.85:l>0?Math.max(0,o-p.unpin)*.85:0),(w!==p.shown||S!==p.shift)&&(p.shown=w,p.shift=S,s(p,w,S,l>0))}},settle(o){if(!i.length||o>=d-2||e&&o>=e[0]&&o<=e[1])return null;let f=null,p=1/0,m=(l,y)=>{let w=Math.min(y,Math.max(l,o));Math.abs(w-o)<p&&(p=Math.abs(w-o),f=w)};for(let l of i){if(l.hero){let w=l.e+(l.b-l.e)*.3;if(o<w)return null;m(0,l.e);continue}let y=r?l.a:l.s-l.h*.5;if(o>y&&o<l.b)return null;m(l.s,l.e)}return e&&m(e[0],e[1]),f===null?null:Math.round(f)},stripWords(){return e},release(){for(let o of i)h(o),o.shown=-1,o.gone=!1}}}var Xe=["pixel-85","pixel-72","drop-film","instances-70","instances-50","shadow-1","extras-off","cadence-30","stills"];function Je(r,n){return r[Math.min(r.length-1,Math.floor(r.length*n))]}var _e=class{constructor({onChange:n=()=>{}}={}){this.onChange=n,this.buffer=new Float32Array(90),this.sorted=new Float32Array(90),this.count=0,this.head=0,this.rung=-1,this.elapsed=0,this.overBudget=0,this.underBudget=0,this.cooldown=0,this.climbs=0,this.upWait=240,this.locked=!1,this.refreshCap=!1,this.seen=0,this.belowBail=0,this.p50=0,this.p90=0,this.vsync=16.6}target(){return this.refreshCap?33.3:Math.max(this.vsync,16.6)}push(n){if(this.elapsed+=n,this.elapsed<1e3||n>250||(this.buffer[this.head]=n,this.head=(this.head+1)%90,this.count=Math.min(90,this.count+1),this.seen+=1,this.cooldown=Math.max(0,this.cooldown-n),this.count<90/2))return;this.sorted.set(this.buffer);let i=this.sorted.subarray(0,this.count).sort();this.p50=Je(i,.5),this.p90=Je(i,.9),this.vsync=Je(i.subarray(0,Math.max(1,Math.floor(this.count*.2))),.5),this.seen<=60&&Math.abs(this.p50-33.3)/33.3<.04&&this.p90/this.p50<1.08&&(this.refreshCap=!0);let e=this.target();if(this.p90>e*1.25?(this.overBudget+=1,this.underBudget=0):this.p90<e*.75?(this.underBudget+=1,this.overBudget=0):(this.overBudget=0,this.underBudget=0),this.rung===Xe.length-2&&this.p50>50){if(this.belowBail+=n,this.belowBail>4e3){this.step(1);return}}else this.belowBail=0;this.cooldown>0||(this.overBudget>=45&&this.rung<Xe.length-2?(this.underBudgetClimbed&&(this.upWait*=2,this.underBudgetClimbed=!1),this.step(1)):this.underBudget>=this.upWait&&this.rung>=0&&!this.locked&&(this.climbs+=1,this.underBudgetClimbed=!0,this.climbs>=2&&(this.locked=!0),this.step(-1)))}step(n){this.rung+=n,this.overBudget=0,this.underBudget=0,this.cooldown=1500,this.count=0,this.onChange(this.rung,Xe[this.rung]??"full")}};var Te=(r,n,i)=>Math.min(i,Math.max(n,r));var is=r=>r*r*(3-2*r),rs=r=>r*r*(6-8*r+3*r*r);function Ne(){let r=0,n=1,i=null,e=null,d=[],c=[],u=v=>Math.min(8191,Math.max(0,v/n));return{bake({zones:v,down:h=[],up:s=[]},o,f){r=Math.max(1,o),n=r/8191,i=new Float64Array(8192),e=new Float32Array(8192);let p=.45*f;for(let m=0;m<8192;m+=1){let l=m*n,y=1/0;for(let[w,S]of v)y=Math.min(y,l<w?w-l:l>S?l-S:0);e[m]=1+3*is(Math.min(1,y/p)),m>0&&(i[m]=i[m-1]+n*2/(e[m-1]+e[m]))}d=h.map(Math.round).sort((m,l)=>m-l),c=s.map(Math.round).sort((m,l)=>l-m)},speed(v){return e?e[Math.round(u(v))]:1},toEffort(v){if(!i)return v;let h=u(v),s=Math.min(8190,Math.floor(h)),o=Math.max(0,v-r)+Math.min(0,v);return i[s]+(i[s+1]-i[s])*(h-s)+o},fromEffort(v){if(!i)return v;let h=i[8191];if(v<=0||v>=h)return v<=0?v:r+(v-h);let s=0,o=8191;for(;o-s>1;){let f=s+o>>1;i[f]<=v?s=f:o=f}return(s+(v-i[s])/(i[o]-i[s]))*n},stop(v,h){return h>v?d.find(s=>s>v+.5&&s<=h)??null:c.find(s=>s<v-.5&&s>=h)??null}}}function Oo(r=Ne()){let n=[],i=0,e=0,d="hold",c=0,u=0,v=0,h=0,s=0;return{playing:!1,get stops(){return n},plan(o,f=55){n=[];for(let y of[...o].sort((w,S)=>w.y-S.y)){let w=Math.max(0,Math.round(y.y)),S=n.at(-1);S&&w-S.y<3?S.words=Math.max(S.words,y.words):n.push({y:w,words:y.words,read:0})}if(n.length<2){i=0;return}let p=f*.65,m=n.slice(0,-1).reduce((y,w)=>y+w.words+12,0);n.forEach((y,w)=>{y.read=w<n.length-1?p*(y.words+12)/m:0});let l=r.toEffort(n.at(-1).y)-r.toEffort(n[0].y);i=l>0?(f-p)/l:0},start(o,f=!1){if(n.length<2)return;this.playing=!0,d="hold",c=0,e=n.findIndex(m=>m.y>o+2),e===-1&&(e=1,o=n[0].y,f=!0);let p=e>0&&o-n[e-1].y<=2?n[e-1]:null;p?(s=p.y,u=f?p.read+.6:Math.min(.6,p.read)):(s=o,u=.6)},stop(){this.playing=!1},step(o,f=()=>!0){if(!this.playing)return s;if(c+=o,d==="hold"){if(c<u||c<u+4&&!f(s,n[e].y))return s;v=r.toEffort(s),h=r.toEffort(n[e].y),d="move",c=0,u=Math.max(.3,(h-v)*i)}let p=Math.min(1,c/u);return s=r.fromEffort(v+(h-v)*rs(p)),p>=1&&(s=n[e].y,e===n.length-1?this.playing=!1:(d="hold",c=0,u=n[e].read,e+=1)),s}}}function Do(r=0){return{y:r,v:0,step(n,i,e,d=1){let u=10*i,v=1/(1+u+.48*u*u+.235*u*u*u),h=4.2*Math.min(d,2.5)*e*.2,s=Te(this.y-n,-h,h),o=(this.v+10*s)*i;return this.v=(this.v-10*o)*v,this.y=this.y-s+(s+o)*v,Math.abs(this.y-n)<.25&&Math.abs(this.v)<2&&(this.y=n,this.v=0),this.y},reset(n){this.y=n,this.v=0},land(n,i){let e=Math.sign(n-this.y);this.y=n-e*.8*i,this.v=e*4.2*i*.5}}}function _o(r=Ne()){return{on:!1,at:0,aim:0,written:0,rest:null,input(n,i,e,d,c,u=0){this.on||(this.on=!0,this.at=e,this.aim=e,this.written=e);let h=Te(n*(i===1?40:i===2?d:1),-200,200),s=this.rest;if(s&&Math.sign(h)===s.dir&&Math.abs(this.at-s.y)<2){let w=u-s.since;if(w<.35*1e3||w<1.2*1e3&&u-s.last<.14*1e3){s.last=u,this.aim=this.at;return}}this.rest=null;let o=Math.sign(h)===-Math.sign(this.aim-this.at)?this.at:this.aim,f=1.6*d,p=r.toEffort(this.at),m=Te(r.toEffort(o)+h,p-f,p+f),l=Te(r.fromEffort(m),0,c),y=r.stop(this.at,l);y!==null&&(l=y),this.aim=l},step(n,i,e,d=0){if(!this.on)return n;if(Math.abs(n-this.written)>2)return this.on=!1,this.rest=null,n;let c=r.toEffort(this.at),u=r.fromEffort(c+(r.toEffort(this.aim)-c)*(1-Math.exp(-12*i))),v=3.5*Math.min(r.speed(this.at),2.5)*e*i;if(this.at+=Te(u-this.at,-v,v),Math.abs(this.aim-this.at)<.5){let h=Math.sign(this.aim-this.written);this.at=this.aim,this.on=!1,r.stop(this.aim-h*3,this.aim)===this.aim&&(this.rest={y:this.aim,dir:h,since:d,last:d})}return this.written=Math.round(this.at),this.written}}}var No=r=>{let n=document.createElement("div");n.style.position="fixed",n.style.top="0",n.style.width="0",n.style.visibility="hidden",n.style.height=`100${r}`,document.body.appendChild(n);let i=n.getBoundingClientRect().height;return n.remove(),i},Ce=r=>parseFloat(r)||0;function Bo(){let r=No("svh"),n=No("lvh"),i=document.documentElement.clientWidth,e=n,d=window.scrollY,c=document.querySelector("[data-nav]"),u=c?c.getBoundingClientRect().height:0,v=document.documentElement.dir==="rtl"?-1:1,h=document.documentElement.scrollHeight,s=getComputedStyle(document.documentElement),o=parseFloat(s.getPropertyValue("--pace"))||1,f=parseFloat(s.getPropertyValue("--pace-gap"))||o,p={};for(let m of document.querySelectorAll("[data-shot]")){let l=m.dataset.shot,y=m.getBoundingClientRect(),w=y.top+d,S=m.querySelector(":scope > .shot"),b={id:l,top:w,height:y.height,caption:null,pinStart:w,pinEnd:w};if(S){let T=S.getBoundingClientRect(),N=getComputedStyle(m),tt=getComputedStyle(S),lt=Ce(N.paddingBlockEnd);if(l==="hero"){let H=Ce(tt.insetBlockStart),at=Ce(tt.marginBlockEnd),E=Ce(N.paddingBlockStart);b.pinStart=0,b.pinEnd=Math.max(0,y.height-E-T.height-at),b.caption={x:T.left,y:H,w:T.width,h:T.height}}else{let H=Ce(tt.insetBlockEnd);b.pinStart=w+T.height+H-r,b.pinEnd=b.pinStart+Math.max(0,y.height-lt-T.height),b.caption={x:T.left,y:r-H-T.height,w:T.width,h:T.height},b.pin=H,b.gap=lt}}p[l]=b}return{W:i,H:e,svh:r,lvh:n,navH:u,docH:h,dir:v,pace:o,paceGap:f,portrait:e>=i,shots:p}}function Wo(r){let n=window.matchMedia("(pointer: coarse)").matches,i=document.documentElement.clientWidth,e=document.documentElement.scrollHeight,d=0,c=()=>{window.clearTimeout(d),d=window.setTimeout(r,160)},u=new ResizeObserver(()=>{let v=document.documentElement.clientWidth,h=document.documentElement.scrollHeight;if(v===i&&h===e)return;let s=n&&v===i&&Math.abs(h-e)<200;i=v,e=h,s||c()});return u.observe(document.documentElement),document.fonts?.ready.then(c),document.fonts?.addEventListener?.("loadingdone",c),()=>u.disconnect()}var ge=`
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
`,ye=`
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
`,ls=`
${ge}
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
}`,cs=`
${ye}
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
}`,us=`
${ge}
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
}`,ds=`
${ye}
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
}`,ps=`
${ge}
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
}`,fs=`
${ye}
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
}`,hs=`
${ge}
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
}`,ms=`
${ye}
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
}`,vs=`
${ge}
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
}`,ws=`
${ye}
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
}`,gs=`
${ge}
in vec3 position;
out float vFog;
//#pars
void main() {
  vec3 p = position;
  //#local
  vec3 wp = (modelMatrix * vec4(p, 1.0)).xyz;
  gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
  vFog = fogAt(wp);
}`,ys=`
${ye}
uniform vec3 uColor;
uniform float uAlpha;
in float vFog;
void main() {
  fragColor = vec4(uColor * uAlpha * (1.0 - clamp(vFog, 0.0, 1.0)), 1.0);
}`;function Yo(r,n={}){return r.replace("//#pars",n.pars??"").replace("//#fpars",n.fpars??"").replace("//#local",n.local??"").replace("//#world",n.world??"").replace("//#frag",n.frag??"")}function de(r,{mips:n=!0,repeat:i=!1}={}){let e=new yo(r);return e.colorSpace=lo,e.generateMipmaps=n,e.minFilter=n?io:ve,e.magFilter=ve,i&&(e.wrapS=qe,e.wrapT=qe),e}function xs(){let n=document.createElement("canvas");n.width=256*2,n.height=256;let i=n.getContext("2d"),e=(d,c,u)=>{let v=i.createRadialGradient(d+107.52,76.8,5.12,d+128,128,184.32);c.forEach(([s,o])=>v.addColorStop(s,o)),i.fillStyle=v,i.fillRect(d,0,256,256);let h=i.createRadialGradient(d+256*.38,256*.24,0,d+256*.38,256*.24,256*.26);h.addColorStop(0,u),h.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=h,i.fillRect(d,0,256,256)};return e(0,[[0,"#bcbcc0"],[.5,"#8c8d92"],[.85,"#55565c"],[1,"#35363c"]],"rgba(255,255,255,.18)"),e(256,[[0,"#f6d58c"],[.45,"#c9963f"],[.8,"#6e4a1c"],[1,"#2c1c0a"]],"rgba(255,244,214,.75)"),de(n,{mips:!1})}function Uo(r){let n=xs(),i=(e,d,c,u,v={})=>{let{deform:h,defines:s,...o}=v;return new Mo({name:e,glslVersion:po,vertexShader:Yo(d,h),fragmentShader:Yo(c,h),defines:s??{},uniforms:{...r,...u,...h?.uniforms??{}},...o})};return{matcap:n,solid(e={}){return i("solid",ls,cs,{uMatcap:{value:n},uEmit:{value:e.emit??[0,0,0]},uAmbient:{value:e.ambient??.06},uHouse:{value:e.house??1}},we(e,["emit","ambient","house"]))},paper(e={}){return i("paper",us,ds,{uAtlas:e.atlas??r.uAtlas,uCell:{value:e.cell??[0,0,1,1]},uAmbient:{value:e.ambient??.07},uHouse:{value:e.house??1},uLitBoost:{value:e.boost??1}},{side:Ue,...we(e,["atlas","cell","ambient","house","boost"])})},wood(e={}){return i("wood",ps,fs,{uHouse:{value:0},...e.uniforms},we(e,["uniforms"]))},strip(e={}){return i("strip",hs,ms,{uHouse:{value:1},...e.uniforms},we(e,["uniforms"]))},glow(e={}){return i("glow",vs,ws,{uColor:{value:e.color??[1,1,1]},uAlpha:{value:e.alpha??1},uShape:{value:e.shape??0},uRadius:{value:0},uMap:{value:e.map??n},uHouse:{value:e.house??0}},{transparent:!0,depthWrite:!1,blending:Ge,side:Ue,...we(e,["color","alpha","shape","map","house"])})},wire(e={}){return i("wire",gs,ys,{uColor:{value:e.color??[.365,1,.87]},uAlpha:{value:e.alpha??1},uHouse:{value:0}},{transparent:!0,depthWrite:!1,blending:Ge,...we(e,["color","alpha"])})}}}function we(r,n){let i={};for(let e of Object.keys(r))n.includes(e)||(i[e]=r[e]);return i}var Jt=4,bs=["invoice","receipt","quote","ledger","sheet","slip","lines","dossier","carbon","memo","tape","blank"],Ms=r=>{let n=new Set;for(let i of document.querySelectorAll(r)){let e=i.textContent.trim();e&&e!=="\u2726"&&n.add(e)}return[...n]};async function Go(r){let n=[document.fonts.load('400 20px "IBM Plex Mono"',"#REF! 0123"),document.fonts.load(r?'700 48px "Noto Kufi Arabic"':'700 48px "Space Grotesk"',r?"\u0625\u0646\u062C\u0627\u0632":"ENJAZ")];await Promise.race([Promise.allSettled(n),new Promise(i=>setTimeout(i,1500))])}function qo({q:r,dir:n}){let i=n<0,e=document.querySelector("main"),d={};try{d=JSON.parse(e?.dataset.atlas??"{}")}catch{d={}}let c=Ms(".ticker__track span"),u=[];try{u=JSON.parse(document.querySelector("[data-typewriter]")?.dataset.typewriter??"[]")}catch{u=[]}let v=i?'"Noto Kufi Arabic", system-ui':'"Space Grotesk", system-ui',h='"IBM Plex Mono", monospace',s=new Intl.NumberFormat(i?"ar-EG":"en-US",{useGrouping:!1}),o=r.atlas,f=document.createElement("canvas");f.width=o,f.height=o;let p=f.getContext("2d"),m=o/Jt;p.fillStyle="#fff",p.fillRect(0,0,o,o);let l="#23252e",y="#9aa0ad",w=(a,P)=>{let G=a%Jt,C=Math.floor(a/Jt);p.save(),p.beginPath(),p.rect(G*m,C*m,m,m),p.clip(),p.translate(G*m,C*m),p.scale(m/100,m/134),p.direction=i?"rtl":"ltr",p.textBaseline="alphabetic",P(p),p.restore()},S=a=>i?100-a:a,b=(a,P,G,C=12)=>{a.fillStyle=l,a.font=`700 ${C}px ${v}`,a.textAlign="start",a.fillText(P,S(8),G)},T=(a,P,G=8,C=92,q=y,k=.7)=>{a.fillStyle=q,a.fillRect(G,P,C-G,k)},N=(a,P,G,C,q=0)=>{for(let k=0;k<G;k+=1){let $=34+(k*37+q)%40;a.fillStyle=k%3===0?l:y,a.fillRect(i?92-$:8,P+k*C,$,1.4),a.fillStyle=y,a.fillRect(i?8:80,P+k*C,12,1.4)}};w(0,a=>{b(a,d.invoice??"",20,14),T(a,26),N(a,34,9,7),T(a,104,8,92,l,1),a.fillStyle=l,a.font=`600 9px ${h}`,a.textAlign=i?"left":"right",a.fillText(s.format(4820),i?8:92,116)}),w(1,a=>{b(a,d.receipt??"",18,12),T(a,24),N(a,32,7,6,11),a.fillStyle=l,a.fillRect(30,100,40,12)}),w(2,a=>{b(a,d.quote??"",22,15),T(a,28),N(a,38,6,8,23),a.save(),a.translate(68,104),a.rotate(-.26),a.strokeStyle="#5e4bd8",a.lineWidth=2,a.strokeRect(-23,-9,46,18),a.fillStyle="#5e4bd8",a.font=`700 10px ${v}`,a.textAlign="center",a.fillText(d.paid??"",0,4),a.restore()});let tt=(a,P)=>{let G=i?8:16;a.fillStyle="#e6f6ee";for(let C=0;C<18;C+=2)a.fillRect(0,6+C*7,100,7);a.strokeStyle="#a9b7ae",a.lineWidth=.4;for(let C=0;C<=4;C+=1)a.beginPath(),a.moveTo(G+C*19,0),a.lineTo(G+C*19,134),a.stroke();a.font=`400 4.8px ${h}`,a.textAlign="center";for(let C=0;C<18;C+=1){a.fillStyle=y,a.fillText(s.format(C+1),i?96:8,11.5+C*7);for(let q=0;q<4;q+=1){let k=(C*7+q*13)%23,$=s.format(100+k*317);P&&k===4?($="#REF!",a.fillStyle="#c2352b"):(P&&k===9&&($="#####"),a.fillStyle=l),a.fillText($,G+q*19+9.5,11.5+C*7)}}};w(3,a=>{tt(a,!1),a.fillStyle="rgba(255,255,255,.92)",a.fillRect(0,0,100,16),b(a,d.ledger??"",12,10)}),w(4,a=>tt(a,!0)),w(5,a=>{a.fillStyle="#c2352b",a.fillRect(8,8,84,7),a.fillStyle=l,a.font=`600 9px ${h}`,a.textAlign="center";for(let P=0;P<4;P+=1)a.fillText(s.format(1200+P*417),50,40+P*20)}),w(6,a=>{for(let P=0;P<16;P+=1)T(a,12+P*7.4,6,94,"#b7c2d8",.5);N(a,14,7,7.4,5)}),w(7,a=>{a.fillStyle="#fff",a.fillRect(0,0,100,134),a.fillStyle="#f7efd9",a.fillRect(18,18,64,30),b(a,d.ledger??"",38,11),a.fillStyle="#faf6ea",a.fillRect(0,62,100,5)}),w(8,a=>{b(a,d.invoice??"",20,13),N(a,30,12,6.6,3)}),w(9,a=>{N(a,12,16,7,17)}),w(10,a=>{a.fillStyle=l,a.font=`400 7px ${h}`,a.textAlign="center";for(let P=0;P<12;P+=1)a.fillText(s.format(90+P*233),50,12+P*10.5)});let lt=de(f);lt.anisotropy=4;let H=document.createElement("canvas");H.width=512,H.height=2048;let at=H.getContext("2d");at.fillStyle="#fff",at.fillRect(0,0,512,2048),at.direction=i?"rtl":"ltr",at.textBaseline="middle";let E=i?468:44;at.textAlign="start";let R=[];c.forEach((a,P)=>{R.push({text:a,big:!0}),u[P%Math.max(1,u.length)]&&R.push({text:u[P%u.length],big:!1})});let B=2048/Math.max(1,R.length);R.forEach((a,P)=>{at.fillStyle=a.big?"#1f2a24":"#3d4c44",at.font=a.big?`700 44px ${v}`:`400 25px ${i?v:h}`,at.fillText(a.text,E,B*(P+.5),424)});let ot=de(H);return ot.anisotropy=4,{texture:lt,printTexture:ot,services:c,phrases:u,words:d,display:v,mono:h,digits:a=>s.format(a),cell(a){let P=Math.max(0,bs.indexOf(a)),G=P%Jt,C=Math.floor(P/Jt);return[G/Jt,1-(C+1)/Jt,1/Jt,1/Jt]},title(a){return document.querySelector(`[data-shot="${a}"] .card__title, [data-shot="${a}"] .step__title`)?.textContent.trim()??""},canvas(a,P,G,C){let q=document.createElement("canvas");q.width=a,q.height=P;let k=q.getContext("2d");return k.direction=i?"rtl":"ltr",G(k,a,P),de(q,C)}}}var $o={L:{pixelCap:55e4,draws:28,tris:7e4,sheets:420,sheetSeg:2,stacks:180,dossiers:120,boxes:1400,weather:140,uxGrid:[32,45],shadowSize:1024,shadowTaps:1,atlas:512,dust:60,allReflections:!1,film:!1},M:{pixelCap:13e5,draws:45,tris:22e4,sheets:1100,sheetSeg:3,stacks:360,dossiers:240,boxes:3e3,weather:320,uxGrid:[48,68],shadowSize:1024,shadowTaps:4,atlas:1024,dust:150,allReflections:!0,film:!1},H:{pixelCap:28e5,draws:70,tris:6e5,sheets:2400,sheetSeg:4,stacks:720,dossiers:480,boxes:6e3,weather:700,uxGrid:[64,90],shadowSize:2048,shadowTaps:8,atlas:2048,dust:300,allReflections:!0,film:!0}};var Pe={clip:[.3,40],fog:26},pe=[{id:"hero",act:1,set:"desk",subject:{radius:.62,center:[0,.1,-.4]},pose:{lens:24,elevation:-15,portrait:{elevation:-28},pushIn:.15,...Pe},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:30},{id:"drop",act:1,set:"desk",idleHz:0,budget:{draws:12,tris:{L:3e4,M:8e4,H:2e5}},authored(r,n){let i=n.W/n.H,e=n.portrait?20:15.6,d=Math.tan(e*Math.PI/360),u=.24/(n.portrait?.92:.36)/(2*d*i),v=st.floorY;return[{t:.18,position:[0,-.03,u],elevation:-1,lens:20,clip:[.1,30],fog:26},{t:.48,position:[0,v*.72,u*.96],elevation:-2,lens:20,clip:[.1,30],fog:26},{t:.64,position:[0,.28,.5],elevation:-84,lens:36,clip:[.05,20],fog:20},{t:.84,position:[0,v-.25,.1],elevation:-90,lens:40,clip:[.04,20],fog:16},{t:.93,position:[0,st.slabBottom+.1,.5],elevation:-90,lens:24,clip:[.05,60],fog:40}]}},{id:"svc.head",act:2,set:"archive",pose:{lens:[24,62],elevation:-90,clip:[.2,90],fog:72},budget:{draws:8,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0,holdKnots:()=>[{t:0,position:[0,st.slabBottom-.6,1.5],lens:24},{t:1,position:[0,st.slabBottom-5.2,1.5],lens:62}]},{id:"svc.web",act:2,set:"archive",floor:"first",subject:{radius:1.3,center:[0,0,0]},pose:{lens:32,bearing:12,elevation:-6,drift:[0,-.15,-.5],clip:[.3,80],fog:62},budget:{draws:11,tris:{L:25e3,M:7e4,H:16e4}},idleHz:0,stripYaw:0},{id:"svc.apps",act:2,set:"archive",floor:"locked",subject:{radius:1.1,center:[0,0,0]},pose:{lens:32,bearing:[-12,13],elevation:-4,clip:[.3,80],fog:62},budget:{draws:9,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"svc.api",act:2,set:"archive",floor:"locked",subject:{radius:1.75,center:[0,.35,.3]},pose:{lens:32,bearing:-18,elevation:14,drift:[0,-.2,-.3],clip:[.3,80],fog:60},budget:{draws:14,tris:{L:3e4,M:8e4,H:18e4}},idleHz:0},{id:"svc.rescue",act:2,set:"archive",floor:"locked",subject:{radius:1.2,center:[0,0,0]},pose:{lens:30,bearing:10,elevation:-8,roll:[0,7],clip:[.3,80],fog:58},budget:{draws:12,tris:{L:24e3,M:7e4,H:16e4}},idleHz:0},{id:"svc.ux",act:2,set:"archive",floor:"locked",subject:{radius:1.5,center:[0,0,0]},pose:{lens:28,elevation:0,clip:[.3,80],fog:56},budget:{draws:8,tris:{L:24e3,M:6e4,H:14e4}},idleHz:0},{id:"svc.auto",act:2,set:"archive",floor:"locked",subject:{radius:1.4,center:[0,0,0]},pose:{lens:30,bearing:90,elevation:-3,clip:[.3,80],fog:54},budget:{draws:9,tris:{L:22e3,M:6e4,H:14e4}},idleHz:30},{id:"process.head",act:3,set:"archive",floor:{clear:9},subject:{radius:4,center:[0,0,0]},pose:{lens:50,elevation:-90,shift:[0,0,1.1],clip:[.05,90],fog:70},budget:{draws:10,tris:{L:26e3,M:7e4,H:16e4}},idleHz:0,exitKnots(r,n,i){let e=i.floorY;return[{t:.55,position:[.16,e+3.2,.18],elevation:-90,lens:44,clip:[.05,70],fog:60},{t:.74,position:[.16,e-.9,.12],elevation:-90,lens:44,clip:[.05,70],fog:60}]}},{id:"step.talk",act:3,set:"archive",floor:{clear:5},subject:{radius:1.5,center:[0,.1,0]},pose:{lens:28,bearing:8,elevation:-10,clip:[.2,70],fog:42},budget:{draws:10,tris:{L:25e3,M:7e4,H:16e4}},idleHz:0},{id:"step.scope",act:3,set:"archive",floor:"locked",subject:{radius:1.75,center:[0,0,0]},pose:{lens:28,bearing:-6,elevation:-24,clip:[.2,70],fog:40},budget:{draws:8,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"step.build",act:3,set:"archive",floor:"locked",subject:{radius:1.25,center:[0,0,.3]},pose:{lens:28,bearing:[20,-10],elevation:-8,clip:[.2,70],fog:40},budget:{draws:9,tris:{L:26e3,M:7e4,H:16e4}},idleHz:0},{id:"step.ship",act:3,set:"archive",floor:"locked",subject:{radius:1.6,center:[0,-.2,0]},pose:{lens:28,elevation:[-12,-74],clip:[.2,70],fog:40},budget:{draws:7,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"fall",act:3,set:"none",idleHz:0,budget:{draws:4,tris:{L:3e3,M:6e3,H:12e3}},authored(r){let n=r["step.ship"],i=r["why.q"],e=n.floorY-2,d=i.floorY+i.d+1.6;return[{t:.2,position:[.2,e,.2],elevation:-90,lens:70,clip:[.05,60],fog:44},{t:.86,position:[.05,d+1.2,.06],elevation:-90,lens:70,clip:[.05,40],fog:34}]}},{id:"why.q",act:4,set:"desk",desk:!0,floor:{clear:26},subject:{radius:.85,center:[0,0,-.4]},pose:{lens:40,elevation:-90,...Pe},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:30},{id:"why.list",act:4,set:"desk",desk:!0,subject:{radius:.8,center:[0,0,-.4]},pose:{lens:40,elevation:-90,...Pe},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:0},{id:"why.stats",act:4,set:"desk",desk:!0,subject:{radius:.7,center:[0,0,-.4]},pose:{lens:36,elevation:-70,...Pe},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0},{id:"cta",act:4,set:"desk",desk:!0,subject:{radius:.55,center:[0,0,-.4]},pose:{lens:40,elevation:-90,clip:[.02,12],fog:26},solve(r,n){let{W:i,H:e,portrait:d}=n,c=r.shot.caption,u=r.fov*Math.PI/180,v=Math.tan(u/2)*(i/e),h=.072,s=.148;if(d)r.d=.0775*.965/(2*v),r.ox=0,r.oy=0;else{let o=Math.max((c.w+32)/s,(c.h+32)/h);r.d=i/o/(2*v),r.ox=i/2-(c.x+c.w/2),r.oy=e/2-(c.y+c.h/2)}},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0},{id:"coda",act:4,set:"desk",desk:!0,subject:{radius:.62,center:[0,.1,-.4]},pose:{lens:24,elevation:-15,...Pe},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0}],jo={hero:()=>import("./chunk-FQ644PTX.js"),drop:()=>import("./chunk-FL6CESEL.js"),"svc.head":()=>import("./chunk-RSFST4BX.js"),"svc.web":()=>import("./chunk-BU75ANWF.js"),"svc.apps":()=>import("./chunk-SPG4BJQV.js"),"svc.api":()=>import("./chunk-NAYGZMI2.js"),"svc.rescue":()=>import("./chunk-4WBBAYPS.js"),"svc.ux":()=>import("./chunk-2ALBFH2P.js"),"svc.auto":()=>import("./chunk-ZJHTRPCR.js"),"process.head":()=>import("./chunk-QILWQIDR.js"),"step.talk":()=>import("./chunk-6NUKT6FF.js"),"step.scope":()=>import("./chunk-4GXKCHKF.js"),"step.build":()=>import("./chunk-O2FCLXP4.js"),"step.ship":()=>import("./chunk-R65BVCNZ.js"),fall:()=>import("./chunk-DJNW65WT.js"),"why.q":()=>import("./chunk-CQ55MCPA.js"),"why.list":()=>import("./chunk-GCBXT2J2.js"),"why.stats":()=>import("./chunk-PCMLZPEU.js"),cta:()=>import("./chunk-TYQRNBVE.js"),coda:()=>import("./chunk-F3VOJLJZ.js")};var Gt=st.archiveHalf,fe=st.galleryH,wt=11.4;function Vo(r,n){return r.canvas(512,512,e=>{let d=Ut(`shelf-${n}`);e.fillStyle=n===0?"#2a2520":"#0a0c11",e.fillRect(0,0,512,512);let c=6,u=512/c;for(let v=0;v<c;v+=1){let h=0;for(;h<512;){let s=8+d()*22,o=u*(.74+d()*.22);if(n===0){let f=d(),p=.5+d()*.5,m=f<.6?[176,136,86]:f<.8?[214,202,170]:f<.92?[96,110,128]:[150,70,60];e.fillStyle=`rgb(${m[0]*p},${m[1]*p},${m[2]*p})`,e.save(),e.translate(h+s/2,u*(v+1)-4),e.rotate(d()>.86?(d()-.5)*.5:0),e.fillRect(-s/2,-o,s-1.5,o),e.fillStyle="rgba(255,255,255,.35)",e.fillRect(-s/2+s*.25,-o*.82,s*.4,o*.2),e.restore()}else{let f=12+d()*10;e.fillStyle=`rgb(${f},${f+2},${f+8})`,e.fillRect(h,u*(v+1)-o-4,s-2,o),d()>.72&&(e.fillStyle=d()>.8?"#a48bff":"#5dffde",e.fillRect(h+s/2-1,u*(v+1)-o,1.5,o-8))}h+=s}e.fillStyle=n===0?"#141210":"#1c2027",e.fillRect(0,u*(v+1)-4,512,4)}},{repeat:!0})}function Xo({programs:r,text:n,q:i,dir:e}){let d=new oe;d.name="archive";let c={uTurn:{value:0},uOrderY:{value:new le(st.slabBottom,-60)},uGalleryH:{value:fe}},u=40,v=new Tt(Gt*2,fe*u,4,u),h=v.attributes.uv;for(let z=0;z<h.count;z+=1)h.setXY(z,h.getX(z)*8,h.getY(z)*u);let s=[[0,0,-Gt,0],[0,0,Gt,Math.PI],[-Gt,0,0,Math.PI/2],[Gt,0,0,-Math.PI/2]].map(([z,I,W,Z])=>{let M=v.clone();return M.rotateY(Z),M.translate(z,I,W),M}),o=Ct(s.map(z=>z.toNonIndexed())),f=Vo(n,0);f.anisotropy=8;let p=Vo(n,1);p.anisotropy=8;let m=r.paper({atlas:{value:f},ambient:.03,boost:.62,deform:{pars:"uniform float uTurn, uGalleryH; out float vTurn, vLit;",fpars:"uniform sampler2D uShelf2; in float vTurn, vLit;",world:`
        wp.y += floor(uCamY / uGalleryH) * uGalleryH;
        {
          float along = abs(wn.z) > 0.5 ? wp.x : wp.z;
          vTurn = smoothstep(0.0, 1.0, uTurn * 2.2 - (along * uInline / 14.0 * 0.5 + 0.5) - 0.1);
        }
        vLit = uTurn;`,frag:"c = mix(c, texture(uShelf2, vUv).rgb * (vec3(0.42) + vHouse * 0.7), vTurn);",uniforms:{uTurn:c.uTurn,uGalleryH:c.uGalleryH,uShelf2:{value:p}}}}),l=new U(o,m);l.frustumCulled=!1,d.add(l);let y=[.26,.25,.25],w=z=>`wp.y -= floor((iPos.y - uCamY) / ${z.toFixed(2)} + 0.5) * ${z.toFixed(2)};`,S=Ht(new At(1,1,1)),b=18,T=[];for(let z=0;z<b;z+=1){let I=-z*fe;for(let[W,Z]of[[1,0],[-1,0],[0,1],[0,-1]]){let M=wt*2+6,X=(Gt+wt)/2;T.push({pos:[W*X,I-.1,Z*X],scale:W?[Gt-wt,.2,M]:[M,.2,Gt-wt],tint:y}),T.push({pos:[W*wt,I+.95,Z*wt],scale:W?[.06,.06,M]:[M,.06,.06],tint:[.55,.52,.48]}),T.push({pos:[W*wt,I+.55,Z*wt],scale:W?[.03,.03,M]:[M,.03,.03],tint:[.4,.38,.36]})}}let N=new U(Pt(S,T.length,(z,I)=>{let W=T[z];I.pos=W.pos,I.scale=W.scale,I.tint=W.tint}),r.solid({ambient:.05,defines:{INSTANCED:1},deform:{world:w(fe*b)}}));N.frustumCulled=!1,d.add(N);let tt=[];for(let z of[-1,1])for(let I of[-wt,-wt/3,wt/3,wt])tt.push([z*wt,I]),tt.push([I,z*wt]);let lt=new U(Pt(Ht(new At(.34,1,.34,1,44,1)),tt.length,(z,I)=>{I.pos=[tt[z][0],0,tt[z][1]],I.scale=[1,180,1],I.tint=[.36,.35,.34]}),r.solid({ambient:.05,defines:{INSTANCED:1},deform:{world:"wp.y += uCamY;"}}));lt.frustumCulled=!1,d.add(lt);let H=Ut("archive"),E=Math.max(3,Math.round(i.boxes/460))*fe,R=Ht(new At(1,1,.8)),B=R.attributes.normal;for(let z=0;z<B.count;z+=1)B.getZ(z)<-.5&&R.attributes.aColor.setXYZ(z,0,0,0);let ot=Ct([R,j(.05,.86,.01,{at:[0,0,-.41],color:[.36,1,.87],mat:2})]),a=i.boxes,P=new U(Pt(ot,a,(z,I)=>{let W=z%4,Z=(H()*2-1)*(Gt-1),M=-H()*E,X=(H()-.5)*.5,pt=Gt-.3-H()*2.2,xt=.5+H()*.5,Ot=.55+H()*.4;W===0?(I.pos=[Z,M,-pt],Yt(0,0,X,I.quat)):W===1?(I.pos=[Z,M,pt],Yt(0,Math.PI,X,I.quat)):W===2?(I.pos=[-pt,M,Z],Yt(0,Math.PI/2,X,I.quat)):(I.pos=[pt,M,Z],Yt(0,-Math.PI/2,X,I.quat)),I.scale=[xt,Ot,.4];let ut=.62+H()*.38,gt=H();I.tint=gt<.62?[.74*ut,.56*ut,.33*ut]:gt<.86?[.86*ut,.8*ut,.66*ut]:gt<.95?[.38*ut,.44*ut,.52*ut]:[.6*ut,.24*ut,.2*ut],I.seed=H()}),r.solid({ambient:.05,defines:{INSTANCED:1},deform:{pars:"uniform float uTurn; uniform vec2 uOrderY; out float vBack;",local:`
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
          }`,uniforms:{uTurn:c.uTurn,uOrderY:c.uOrderY}}}));P.frustumCulled=!1,d.add(P);let G=new Tt(1,1,1,3),C=["ledger","invoice","lines","sheet","memo","receipt"],q=Math.min(180,Math.floor(i.weather*.75)),k=new U(Pt(G,q,(z,I)=>{let W=z%4,Z=(H()*2-1)*(wt-.5),M=-Math.floor(H()*18)*fe+.3;I.pos=W===0?[Z,M,-wt]:W===1?[Z,M,wt]:W===2?[-wt,M,Z]:[wt,M,Z],Yt(0,W<2?0:Math.PI/2,(H()-.5)*.2,I.quat);let X=.55+H()*.6;I.scale=[X,X*1.42,1],I.cell=n.cell(C[Math.floor(H()*C.length)]);let pt=.75+H()*.25;I.tint=[pt,pt,pt*.95]}),r.paper({ambient:.05,defines:{INSTANCED:1},deform:{world:w(fe*18)}}));k.frustumCulled=!1,d.add(k);let $=new Tt(.34,.46),K=new U(Pt($,i.weather,(z,I)=>{I.pos=[(H()*2-1)*10.5,-H()*24,(H()*2-1)*10.5],I.cell=n.cell(C[Math.floor(H()*C.length)]);let W=.78+H()*.22;I.tint=[W,W,W*.95],I.seed=H()}),r.paper({ambient:.08,defines:{INSTANCED:1},deform:{pars:"uniform float uTurn;",local:`{
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
        }`,uniforms:{uTurn:c.uTurn}}}));K.frustumCulled=!1,d.add(K);let ct=a,dt=i.weather;return{group:d,u:c,*build(){yield},setRange(z,I){c.uOrderY.value.set(z,I)},setDensity(z){P.geometry.instanceCount=Math.floor(ct*z),K.geometry.instanceCount=Math.floor(dt*z)},setWeather(z){K.visible=z,k.visible=z}}}var Be={pars:"in float iClear; uniform float uClear;",world:`
    float clearF = clamp((uClear - iClear - seed * 0.34) / 0.62, 0.0, 1.0);
    if (clearF > 0.0) {
      clearF *= clearF;
      vec3 away = wp - (uLampOrigin + vec3(0.0, 0.0, -0.4));
      away.y = 0.0;
      wp += normalize(away + vec3(0.001)) * clearF * 2.4;
      wp.y += clearF * 0.9 - clearF * clearF * 1.9;
    }`};function Ss(){let i=document.createElement("canvas");i.width=1024,i.height=512;let e=i.getContext("2d");e.fillStyle="#7b4c2b",e.fillRect(0,0,1024,512);let d=Ut("walnut");for(let c=0;c<520;c+=1){let u=d()*512,v=d()>.45;e.strokeStyle=v?`rgba(44,22,10,${.05+d()*.2})`:`rgba(180,120,74,${.03+d()*.1})`,e.lineWidth=.5+d()*2.4,e.beginPath(),e.moveTo(0,u);let h=d()*1.2;for(let s=0;s<=1024;s+=48)u+=(d()-.5)*4*h,e.lineTo(s,u);e.stroke()}for(let c=0;c<3;c+=1){let u=d()*1024,v=d()*512;for(let h=8;h<90;h+=5+d()*5)e.strokeStyle=`rgba(40,20,9,${.1+d()*.09})`,e.lineWidth=.8,e.beginPath(),e.ellipse(u,v,h*3.2,h*.8,0,0,Math.PI*2),e.stroke()}return de(i)}function Jo({programs:r,shared:n,text:i,q:e,dir:d}){let c=g=>g*d,u=new oe;u.name="desk";let v={uClear:{value:0},uRing:{value:0},uRingOn:{value:0}},h=new vt(c(.27),.62,-.5),s=[c(-.02),-.38],o=[s[0],s[1]],f=new mo(e.shadowSize,e.shadowSize,{depthTexture:new xo(e.shadowSize,e.shadowSize,ro)});f.depthTexture.compareFunction=uo,f.depthTexture.minFilter=ve,f.depthTexture.magFilter=ve;let p=new $e,m={uMap:{value:Ss()},uShadow:{value:f.depthTexture},uClear:v.uClear,uDawnStripes:{value:1},uAmbient:{value:.045},uShadowTaps:{value:e.shadowTaps},uGloss:{value:1},uRings:{value:[1,0,0,0]},uRingCentreA:{value:[c(-.2),-.21,.046]},uRingCentreB:{value:[c(-.112),-.21,.046]},uTint:{value:[1,1,1]},uLampMatrix:{value:p}},l=new U(new At(1.6,.045,.8),r.wood({uniforms:m}));l.position.set(0,-.0225,-.4),u.add(l);let y={...m,uTint:{value:[.34,.31,.28]},uGloss:{value:0},uRings:{value:[0,0,0,0]}},w=.5,S=new U(Ct([[0,-w-2.5,10,5],[0,w+2.5,10,5],[-w-2.5,0,5,w*2],[w+2.5,0,5,w*2]].map(([g,A,L,D])=>{let V=new At(L,.1,D);return V.translate(g,st.floorY-.05,A),V})),r.wood({uniforms:y}));u.add(S);let b=[c(-.52),0,-.56],T=[c(-.156),0,-.21],N=[c(.66),.88,-.95],tt=[c(.31),0,-.64],lt=[c(.62),0,-.62],H=[c(.72),.42,-.62],at=[c(.27),.72,-.5],E=[.24,.14,.08],R=Ct([j(.07,.75,.07,{at:[-.74,-.4,-.06],color:E}),j(.07,.75,.07,{at:[.74,-.4,-.06],color:E}),j(.07,.75,.07,{at:[-.74,-.4,-.74],color:E}),j(.07,.75,.07,{at:[.74,-.4,-.74],color:E}),j(1.42,.09,.02,{at:[0,-.1,-.03],color:E}),j(.1,.012,.018,{at:[c(.42),-.1,-.014],color:[.76,.58,.3],mat:1}),j(.1,.012,.018,{at:[c(-.42),-.1,-.014],color:[.76,.58,.3],mat:1}),...Fo(N),...zo(lt,H,at,d),...Io(T,d),j(.07,.006,.07,{at:[c(-.02),.003,-.7],color:[.25,.25,.27]}),Ht(new je(.002,.003,.17,6),{at:[c(-.02),.09,-.7],color:[.7,.7,.72]})]),B=new U(R,r.solid({ambient:.17,house:0}));u.add(B);let ot=new U(Ct([j(12,7,.1,{at:[0,1.6,-1.05],color:[.62,.6,.6]}),j(12,.12,.03,{at:[0,st.floorY+.06,-.99],color:[.2,.18,.17]}),j(1.62,.04,.04,{at:[c(-.46),1.54,-.97],color:[.55,.52,.5]}),j(1.62,.04,.04,{at:[c(-.46),.5,-.97],color:[.55,.52,.5]}),j(.04,1.08,.04,{at:[c(-1.27),1.02,-.97],color:[.55,.52,.5]}),j(.04,1.08,.04,{at:[c(.35),1.02,-.97],color:[.55,.52,.5]})]),r.solid({ambient:.2,house:0}));u.add(ot);let a=new U(Ct(Po(tt,d)),B.material),P=Ve([[b[0]-.11*d,.05,b[2]+.03],[b[0]-.17*d,.03,b[2]+.06],[b[0]-.2*d,.012,b[2]+.13],[b[0]-.19*d,.05,b[2]-.03],[b[0]-.13*d,.11,b[2]-.08]],24),G=r.solid({house:0,deform:Co()}),C=new U(Ct([...Ro(b),P]),G);u.add(a,C);let q={x:b[0],y:.135,z:b[2]-.08},k=new U(ko(),G);k.name="handset",k.position.set(q.x,q.y,q.z),u.add(k);let $=new U(Ve([[0,0,0],[0,-.2,0],[0,-.4,.01],[0,-.6,0]],22,.008),G);$.visible=!1,u.add($);let K=B.material,ct=new U(j(.012,.095,.004,{at:[0,.042,0],color:[.1,.1,.1]}),K),dt=new U(j(.007,.14,.004,{at:[0,.064,0],color:[.1,.1,.1]}),K);ct.position.set(N[0],N[1],N[2]+.026),dt.position.set(N[0],N[1],N[2]+.03),u.add(ct,dt);let z=c(-.46),I=new U(Ht(new Tt(1.58,1),{at:[z,1.02,-.985],color:[.075,.11,.21],mat:2}),r.solid({house:0,deform:{fpars:"uniform highp float uDawn;",frag:"c = mix(c, mix(vec3(0.365, 1.0, 0.87), vec3(0.643, 0.545, 1.0), clamp((vLampP.x + 0.5) * 0.7, 0.0, 1.0)), uDawn);"}}));u.add(I);let W=j(1.58,.042,.004,{color:[.72,.72,.7]});W.deleteAttribute("uv");let Z=new U(Pt(W,24,(g,A)=>{A.pos=[z,.54+(g+.5)*.0405,-.965]}),r.solid({house:0,ambient:.14,defines:{INSTANCED:1},deform:{local:`{
          float a = mix(0.86, 1.32, uDawn);
          float ca = cos(a), sa = sin(a);
          p = vec3(p.x, p.y * ca - p.z * sa, p.y * sa + p.z * ca);
          n = vec3(n.x, n.y * ca - n.z * sa, n.y * sa + n.z * ca);
        }`}}));Z.frustumCulled=!1,u.add(Z);let M=Ut("desk"),X=[{x:-.66,z:-.3,h:.34},{x:-.58,z:-.68,h:.44},{x:-.27,z:-.67,h:.27},{x:.66,z:-.22,h:.2},{x:-.36,z:-.28,h:.13},{x:-.14,z:-.7,h:.15},{x:.66,z:-.42,h:.1},{x:-.7,z:-.08,h:.09}],pt=[],xt=new Map;for(let g of X){let A=0,L=0,D=0;for(;A<g.h&&pt.length<e.stacks;){let V=.01+M()*.022;L+=(M()-.5)*.012,D+=(M()-.5)*.012,pt.push({x:g.x+L,y:A+V/2,z:g.z+D,h:V,yaw:(M()-.5)*.34}),A+=V}xt.set(g,{y:A,x:g.x+L,z:g.z+D})}let Ot=new At(1,1,1);Ot.deleteAttribute("uv");let ut=Ht(Ot),gt=new U(Pt(ut,pt.length,(g,A)=>{let L=pt[g];A.pos=[c(L.x),L.y,L.z],Yt(0,L.yaw,0,A.quat),A.scale=[.21+M()*.03,L.h,.297+M()*.03];let D=.74+M()*.26;A.tint=M()>.86?[D,D*.84,D*.72]:[D,D,D*.95],A.extra.iClear=2},{iClear:1}),r.solid({house:0,ambient:.13,defines:{INSTANCED:1},deform:Be}));gt.frustumCulled=!1,u.add(gt);let Kt=[{x:.5,z:-.14,n:.3},{x:-.5,z:-.2,n:.3},{x:-.3,z:-.5,n:.26}],bt=Ht(new At(1,1,1)),nt=[];for(let g of Kt){let A=Math.floor(e.dossiers*g.n*.5),L=0;for(let D=0;D<A&&L<.2;D+=1){let V=.016+M()*.014,et=(M()-.5)*.5,ht=.7+M()*.3;nt.push({x:g.x+(M()-.5)*.02,y:L+V/2,z:g.z+(M()-.5)*.02,yaw:et,sx:.24,sy:V,sz:.33,tint:[.86*ht,.7*ht,.42*ht]}),nt.push({x:g.x,y:L+V+6e-4,z:g.z,yaw:et,sx:.016,sy:.0015,sz:.335,tint:[.92,.9,.84]}),L+=V}}let Dt=new U(Pt(bt,nt.length,(g,A)=>{let L=nt[g];A.pos=[c(L.x),L.y,L.z],Yt(0,L.yaw,0,A.quat),A.scale=[L.sx,L.sy,L.sz],A.tint=L.tint,A.extra.iClear=2},{iClear:1}),r.solid({house:0,ambient:.13,defines:{INSTANCED:1},deform:Be}));Dt.frustumCulled=!1,u.add(Dt);let ke=new Tt(1,1,e.sheetSeg,e.sheetSeg);ke.rotateX(-Math.PI/2);let Ie=["invoice","ledger","quote","receipt","lines","sheet","memo","invoice","carbon","slip"],it=[],ft=Math.min(30,Math.floor(e.sheets*.1));for(let g=0;g<ft;g+=1){let A=.36+M()*.46,L=M()*Math.PI*2,D=Math.cos(L)*A*1.08,V=-.4+Math.sin(L)*A*.42;it.push({x:D,z:V,y:.0012+M()*.012,yaw:M()*6.28,kind:0,clear:M()>.4?0:1})}for(let[g,A]of xt){let L=Math.floor(e.sheets*.5/X.length*(.5+g.h*2));for(let D=0;D<L;D+=1)it.push({x:A.x+(M()-.5)*.06,z:A.z+(M()-.5)*.06,y:A.y+D*.0015,yaw:(M()-.5)*.7,kind:1,clear:2})}let qt=Math.min(8,Math.floor(e.sheets*.02));for(let g=0;g<qt;g+=1){let A=g%2===0?1:-1;it.push({x:A*(.24+M()*.46),z:-.08+M()*.05,y:.002+M()*.004,yaw:(M()-.5)*.3,kind:2,clear:0})}let _=Math.max(0,Math.floor(e.sheets*.24));for(let g=0;g<_;g+=1){let A=M()*Math.PI*2,L=.7+M()*1.5,D=Math.cos(A)*L*1.2,V=.1+Math.abs(Math.sin(A))*L*.7;Math.hypot(D,V)>.75&&it.push({x:D,z:V,y:st.floorY+.002+M()*.004,yaw:M()*6.28,kind:0,clear:2})}for(let g=0;g<8;g+=1)it.push({x:-.02+(M()-.5)*.015,z:-.7+(M()-.5)*.015,y:.02+g*.012,yaw:M()*6.28,kind:3,clear:2});let $t=r.paper({house:0,ambient:.05,defines:{INSTANCED:1},deform:{pars:`${Be.pars} in float iCurl;`,local:`
        float cx = uv.x - 0.5, cz = uv.y - 0.5;
        p.y += (cx * cx * 0.03 + cz * cz * 0.05) * iCurl;
        /* A sheet by the edge lifts a little in the draught from the printer. */
        p.y += sin(uTime * 2.6 + seed * 37.0) * 0.0012 * max(iCurl - 0.8, 0.0) * (cz + 0.5);
        n.xz -= vec2(cx * 0.06, cz * 0.1) * iCurl;`,world:Be.world}}),Zt=new U(Pt(ke,it.length,(g,A)=>{let L=it[g],D=L.kind===3;A.pos=[c(L.x),L.y,L.z],Yt(0,L.yaw,0,A.quat),A.scale=D?[.08,1,.16]:[.21,1,.297];let V=D?"receipt":Ie[Math.floor(M()*Ie.length)];A.cell=i.cell(V);let et=.82+M()*.18;A.tint=V==="carbon"?[.98,.72*et,.72*et]:V==="slip"?[.99,.9*et,.62*et]:[et,et,et*.96],A.extra.iClear=L.clear,A.extra.iCurl=L.kind===2?1.6:.5+M()},{iClear:1,iCurl:1}),$t);Zt.frustumCulled=!1,u.add(Zt);let _t=new U(new Tt(.34,.34),r.glow({color:[1,.74,.46],alpha:.5,defines:{BILLBOARD:1}}));_t.position.set(h.x,h.y+.03,h.z),_t.frustumCulled=!1,u.add(_t);let Qt=new U(Pt(new Tt(1,1),2,(g,A)=>{A.pos=g===0?[c(.34),.42,-.985]:[c(-.46),.95,-.98],A.scale=g===0?[2.6,1.9,1]:[3.2,2.2,1],A.tint=g===0?[.13,.086,.047]:[.028,.038,.067]}),r.glow({defines:{INSTANCED:1}}));Qt.frustumCulled=!1,u.add(Qt);let Nt=new je(.05,.54,.86,26,1,!0),zt=new U(Nt,r.glow({color:[1,.72,.42],alpha:.13,shape:5,deform:{frag:"a = vUv.y * vUv.y; { float f = abs(dot(normalize(vN), normalize(vV))); a *= f * f; }"}}));zt.frustumCulled=!1,u.add(zt);let xe=new Tt(.009,.009),jt=new U(Pt(xe,e.dust,(g,A)=>{let L=Math.sqrt(M()),D=M()*Math.PI*2,V=L*.34;A.pos=[h.x+(o[0]-h.x)*L+Math.cos(D)*V,h.y*(1-L)+.04,h.z+(o[1]-h.z)*L+Math.sin(D)*V],A.tint=[1,.82,.6]}),r.glow({alpha:.42,defines:{INSTANCED:1,BILLBOARD:1},deform:{world:"wp += vec3(sin(uTime * 0.21 + seed * 40.0), sin(uTime * 0.17 + seed * 90.0), cos(uTime * 0.19 + seed * 70.0)) * 0.03;"}}));jt.frustumCulled=!1,u.add(jt);let St=h.clone(),Rt=new He(122,1,.05,2.2),be=new vt(0,0,-1),Bt=new vt,Wt={x:0,y:0,z:0},Vt=0,se=0,ne=new $e().set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.4975,0,0,0,1),rt=Zt.geometry.instanceCount,he=gt.geometry.instanceCount,Me=Dt.geometry.instanceCount,te=g=>{ct.rotation.z=-(g%12/12)*Math.PI*2,dt.rotation.z=-(g%1)*Math.PI*2};return te(3.2),{group:u,u:v,setClock:te,lampPos:St,pool:s,*build(){yield},setActPositions(g){Wt=g},setPhone(g){g.position.set(0,.0043,-.4),g.visible=!1,u.add(g),this.phone=g},setAct(g){g===4?u.position.set(Wt.x,Wt.y,Wt.z):u.position.set(0,0,0)},setSpot(g,A){o[0]=g,o[1]=A},resetSpot(){o[0]=s[0],o[1]=s[1]},setRing(g){Vt=g},setOffHook(g){se=g},setShadowTaps(g){m.uShadowTaps.value=g},setDensity(g){Zt.geometry.instanceCount=Math.floor(rt*g),gt.geometry.instanceCount=Math.floor(he*g),Dt.geometry.instanceCount=Math.floor(Me*g)},setExtras(g){jt.visible=g,zt.visible=g},bakeShadow(g){let A=[l,S,_t,zt,jt,I,Z,ot,Qt,$];this.phone&&A.push(this.phone);let L=A.map(mt=>mt.visible),D=u.position.clone(),V=v.uClear.value,et=u.visible;u.visible=!0,A.forEach(mt=>{mt.visible=!1}),u.position.set(0,0,0),this.setClear(0),k.position.set(q.x,q.y,q.z),k.rotation.set(0,0,0),k.visible=!0,u.updateMatrixWorld(!0),n.uLampOrigin.value.set(0,0,0),Rt.position.copy(St),Rt.up.copy(be),Rt.lookAt(c(-.02),0,-.38),Rt.updateMatrixWorld(),Rt.updateProjectionMatrix();let ht=g.getRenderTarget();g.setRenderTarget(f),g.clear(),g.render(u,Rt),g.setRenderTarget(ht),p.multiplyMatrices(ne,Rt.projectionMatrix).multiply(Rt.matrixWorldInverse),A.forEach((mt,ae)=>{mt.visible=L[ae]}),u.position.copy(D),u.visible=et,this.setClear(V),u.updateMatrixWorld(!0)},setClear(g){v.uClear.value=g,m.uClear.value=g;let A=(D,V,et)=>{let ht=Eo((g-V)/.7),mt=ht*ht;D.position.set(et*mt*2.2*d,mt*.5-mt*mt*1.6,-mt*.2),D.rotation.z=-mt*1.2*et*d,D.visible=ht<1};A(C,1,-1),A(a,2,1);let L=g>=3;Zt.visible=!L,gt.visible=!L,Dt.visible=!L},update(g,A){let L=A%3,D=L<.42||L>.62&&L<1.04?1:0,V=Math.abs(Math.sin(A*37.7))*.006*D*Vt,et=Math.sin(A*75)*.012*D*Vt,ht=ue(0,.5,se),mt=ue(.42,1,se),ae=q.x+(-.3*d-q.x)*ht,me=q.z+(.1-q.z)*ht;k.position.set(ae+C.position.x,q.y+V-mt*.62+C.position.y,me+C.position.z),k.rotation.set(mt*1.3,0,ht*.9*d+et+C.rotation.z),k.visible=C.visible,$.visible=mt>.02,$.position.set(ae,0,me-.02),$.scale.y=Math.max(.01,mt);let Se=o[0]+(g.pointer===1?g.px*.2:0),Ft=o[1]+(g.pointer===1?g.py*.12:0);Bt.set(Se-St.x,-St.y,Ft-St.z).normalize(),n.uLampDir.value.copy(Bt),n.uLampPos.value.copy(St),n.uLampCone.value.set(.6,.93),zt.position.set(St.x+Bt.x*.43,St.y+Bt.y*.43,St.z+Bt.z*.43),zt.quaternion.setFromUnitVectors(Es,Bt.negate())}}}var Es=new vt(0,1,0);var ze=new vt;function kt(r,n,i,e,d,c){let u=2*Math.PI*d/4,v=Math.max(c-2*d,0),h=Math.PI/4;ze.copy(n),ze[e]=0,ze.normalize();let s=.5*u/(u+v),o=1-ze.angleTo(r)/h;return Math.sign(ze[i])===1?o*s:v/(u+v)+s+s*(1-o)}var Re=class r extends At{constructor(n=1,i=1,e=1,d=2,c=.1){let u=d*2+1;if(c=Math.min(n/2,i/2,e/2,c),super(1,1,1,u,u,u),this.type="RoundedBoxGeometry",this.parameters={width:n,height:i,depth:e,segments:d,radius:c},u===1)return;let v=this.toNonIndexed();this.index=null,this.attributes.position=v.attributes.position,this.attributes.normal=v.attributes.normal,this.attributes.uv=v.attributes.uv;let h=new vt,s=new vt,o=new vt(n,i,e).divideScalar(2).subScalar(c),f=this.attributes.position.array,p=this.attributes.normal.array,m=this.attributes.uv.array,l=f.length/6,y=new vt,w=.5/u;for(let S=0,b=0;S<f.length;S+=3,b+=2)switch(h.fromArray(f,S),s.copy(h),s.x-=Math.sign(s.x)*w,s.y-=Math.sign(s.y)*w,s.z-=Math.sign(s.z)*w,s.normalize(),f[S+0]=o.x*Math.sign(h.x)+s.x*c,f[S+1]=o.y*Math.sign(h.y)+s.y*c,f[S+2]=o.z*Math.sign(h.z)+s.z*c,p[S+0]=s.x,p[S+1]=s.y,p[S+2]=s.z,Math.floor(S/l)){case 0:y.set(1,0,0),m[b+0]=kt(y,s,"z","y",c,e),m[b+1]=1-kt(y,s,"y","z",c,i);break;case 1:y.set(-1,0,0),m[b+0]=1-kt(y,s,"z","y",c,e),m[b+1]=1-kt(y,s,"y","z",c,i);break;case 2:y.set(0,1,0),m[b+0]=1-kt(y,s,"x","z",c,n),m[b+1]=kt(y,s,"z","x",c,e);break;case 3:y.set(0,-1,0),m[b+0]=1-kt(y,s,"x","z",c,n),m[b+1]=1-kt(y,s,"z","x",c,e);break;case 4:y.set(0,0,1),m[b+0]=1-kt(y,s,"x","y",c,n),m[b+1]=1-kt(y,s,"y","x",c,i);break;case 5:y.set(0,0,-1),m[b+0]=kt(y,s,"x","y",c,n),m[b+1]=1-kt(y,s,"y","x",c,i);break}}static fromJSON(n){return new r(n.width,n.height,n.depth,n.segments,n.radius)}};var Ls=[.2,.21,.25],As=[.365,1,.87];function Ko({programs:r,text:n,dir:i}){let e=(s,o,f)=>Ht(new Re(s,o,f,4,Math.min(f*.45,s*.12)),{color:Ls}),d=null;function c({w:s=.78,h:o=1.6,t:f=.09,emissive:p=1}={}){let m=new oe,l=new U(Ct([e(s,f,o),j(s*.965,f*.02,s*.012,{at:[0,f/2+.001,-o*.482],color:[.7,.72,.76],mat:1}),j(s*.965,f*.02,s*.012,{at:[0,f/2+.001,o*.482],color:[.7,.72,.76],mat:1}),j(s*.012,f*.02,o*.965,{at:[-s*.482,f/2+.001,0],color:[.7,.72,.76],mat:1}),j(s*.012,f*.02,o*.965,{at:[s*.482,f/2+.001,0],color:[.7,.72,.76],mat:1})]),r.solid({ambient:.32,house:1}));m.add(l);let y=new Tt(s*.94,o*.96);y.rotateX(-Math.PI/2),y.translate(0,f/2+.003,0),d??(d=h(360,720,12));let w=r.paper({atlas:{value:d},house:0,ambient:p,defines:{}}),S=new U(y,w);return m.add(S),m.userData={screen:S,screenMaterial:w,w:s,h:o,t:f},m}function u({w:s=.78,h:o=1.6,t:f=.09,color:p=As,alpha:m=.9}={}){let l=new bo(new Re(s,f,o,3,Math.min(f*.45,s*.12)),10);return new go(l,r.wire({color:p,alpha:m}))}function v({w:s=.78,h:o=1.6}={}){let f=Ut("phone-board"),p=r.solid({ambient:.14,house:1}),m=new U(e(s,.03,o),p),y=[j(s*.88,.016,o*.9,{color:[.05,.3,.2]}),j(s*.68,.03,o*.42,{at:[0,.02,o*.19],color:[.2,.22,.26]})];for(let at=0;at<30;at+=1){let E=.03+f()*.08,R=.03+f()*.09;y.push(j(E,.018,R,{at:[(f()-.5)*s*.74,.016,-o*.28+(f()-.5)*o*.26],color:f()>.7?[.76,.58,.3]:[.1,.1,.12],mat:f()>.7?1:0}))}let w=new U(Ct(y),p),S=Ct([j(s,.05,.05,{at:[0,0,-o/2+.025],color:[.62,.64,.68],mat:1}),j(s,.05,.05,{at:[0,0,o/2-.025],color:[.62,.64,.68],mat:1}),j(.05,.05,o,{at:[-s/2+.025,0,0],color:[.62,.64,.68],mat:1}),j(.05,.05,o,{at:[s/2-.025,0,0],color:[.62,.64,.68],mat:1})]),b=new U(S,p),T=new Tt(s*.94,o*.96);T.rotateX(-Math.PI/2);let N=r.paper({atlas:{value:n.texture},cell:[0,0,1,1],house:0,ambient:1}),tt=new U(T,N),lt=new At(s*.98,.006,o*.98),H=new U(lt,r.glow({color:[.8,.9,1],alpha:.05,shape:5}));return{back:m,board:w,frame:b,display:tt,displayMaterial:N,glass:H}}function h(s,o,f,p){return n.canvas(s,o,(m,l,y)=>{if(m.fillStyle="#0b0d13",m.fillRect(0,0,l,y),p){p(m,l,y);return}let w=y/13;for(let S=0;S<f;S+=1){m.fillStyle="rgba(255,255,255,.07)",m.fillRect(l*.06,w*(S+1),l*.88,w*.74),m.fillStyle=S%3===0?"#5dffde":"#a48bff";let b=i<0?l*.78:l*.1;m.fillRect(b,w*(S+1)+w*.16,l*.12,w*.42),m.fillStyle="rgba(232,236,244,.7)",m.fillRect(i<0?l*.28:l*.26,w*(S+1)+w*.28,l*.46,w*.16)}})}return{make:c,wire:u,layers:v,listTexture:h}}var It=4200,Zo=.12,Ts=.6,Cs=.03;function Qo({programs:r,shared:n,printTexture:i,dir:e}){let d=new ce(new Float32Array(It*2*3),3).setUsage(Ae),c=new ce(new Float32Array(It*2*3),3).setUsage(Ae),u=new ce(new Float32Array(It*2),1),v=new ce(new Float32Array(It*2),1).setUsage(Ae),h=new ce(new Float32Array(It*2),1).setUsage(Ae),s=new Uint32Array((It-1)*6);for(let R=0;R<It;R+=1)if(u.array[R*2]=-1,u.array[R*2+1]=1,R<It-1){let B=R*2;s.set([B,B+1,B+2,B+1,B+3,B+2],R*6)}let o=new wo;o.setAttribute("position",d),o.setAttribute("aAcross",c),o.setAttribute("aSide",u),o.setAttribute("aS",v),o.setAttribute("aW",h),o.setIndex(new ce(s,1));let f={uFeed:{value:0},uLine:{value:1e6},uLineLen:{value:4},uJamA:{value:0},uJamB:{value:0},uJamK:{value:0},uFlutter:{value:1},uWide:{value:1e6},uPrint:{value:i},uPrintRange:{value:0},uPaperGlow:{value:.22},uLineColor:{value:[.365,1,.87]}},p=r.strip({uniforms:f,side:2}),m=new U(o,p);m.frustumCulled=!1;let l=new U(o,r.glow({color:[.365,1,.87],alpha:.5,shape:5,house:0,deform:{pars:"in vec3 aAcross; in float aSide, aS, aW; uniform float uLine, uLineLen; out float vSide, vAlive;",fpars:"in float vSide, vAlive;",local:`{
          float z = max(-(viewMatrix * vec4(p, 1.0)).z, 0.05);
          p += aAcross * aSide * min(max(aW * 5.0, 0.16), z * 0.02);
        }`,world:"vSide = aSide; vAlive = smoothstep(uLine + uLineLen * 0.7, uLine + uLineLen, aS);",frag:"a = (1.0 - abs(vSide)); a = a * a * vAlive;",uniforms:{uLine:f.uLine,uLineLen:f.uLineLen}}}));l.frustumCulled=!1;let y=new Float32Array(It),w=new Float32Array(It),S=0,b=0,T=0,N=(R,B,ot,a,P,G,C,q)=>{if(S>=It)return;let k=S*2;d.setXYZ(k,R,B,ot),d.setXYZ(k+1,R,B,ot),c.setXYZ(k,a,P,G),c.setXYZ(k+1,a,P,G),v.setX(k,C),v.setX(k+1,C),h.setX(k,q),h.setX(k+1,q),y[S]=C,w[S]=B,S+=1};function tt({yaws:R,lineStartY:B,endY:ot,dense:a}){S=0;let P=0,G=.31*e,C=[[G,.11,-.5],[G,.085,-.43],[G*.92,.012,-.34],[G*.62,.003,-.24],[G*.22,.003,-.11],[0,.003,-.025],[0,-.004,.008],[0,-.03,.012]],q=24,k=C[0];for(let ct=0;ct<C.length-1;ct+=1){let dt=C[Math.max(0,ct-1)],z=C[ct],I=C[ct+1],W=C[Math.min(C.length-1,ct+2)];for(let Z=ct===0?0:1;Z<=q;Z+=1){let M=Z/q,X=M*M,pt=X*M,xt=[0,1,2].map(bt=>.5*(2*z[bt]+(I[bt]-dt[bt])*M+(2*dt[bt]-5*z[bt]+4*I[bt]-W[bt])*X+(3*z[bt]-dt[bt]-3*I[bt]+W[bt])*pt)),Ot=xt[0]-k[0],ut=xt[1]-k[1],gt=xt[2]-k[2];P+=Math.hypot(Ot,ut,gt);let Kt=Math.hypot(Ot,gt)||1;N(xt[0],xt[1],xt[2],gt/Kt||1,0,-Ot/Kt||0,P,Zo),k=xt}}b=P,T=k[1];let $=k[1],K=0;for(;$>ot&&S<It;){let ct=.22;$>st.slabBottom-.5&&(ct=.05);for(let X of a)$<X.a&&$>X.b&&(ct=.022);for($-=ct,P+=ct;K<R.length-1&&$<R[K+1].y;)K+=1;let dt=R[K],z=R[Math.min(K+1,R.length-1)],I=z===dt?0:ue(.25,.75,(dt.y-$)/Math.max(.001,dt.y-z.y)),W=Oe(dt.yaw,z.yaw,I)*Math.PI/180,Z=ue(st.floorY-.2,st.slabBottom+.2,$),M=Oe(Zo,Ts,Z);$<B&&(M=Oe(M,Cs,ue(0,4,B-$))),N(0,$,0,Math.cos(W),0,Math.sin(W),P,M)}d.needsUpdate=!0,c.needsUpdate=!0,v.needsUpdate=!0,h.needsUpdate=!0,f.uLine.value=lt(B),f.uPrintRange.value=lt(st.floorY-.1),f.uWide.value=lt(st.deskY)}function lt(R){return b+(T-R)}function H(R){let B=0,ot=S-1;for(;B<ot;){let a=B+ot>>1;y[a]<R?B=a+1:ot=a}return B}let at=-1/0;function E(R,B){let ot=R+B,a=ot>T?0:H(lt(ot)),P=H(lt(Math.max(R-B,at))),G=Math.max(0,P-a)*6;o.setDrawRange(a*6,G)}return{mesh:m,halo:l,u:f,rebuild:tt,focus:E,setEnd(R){at=R},sAtY:lt,pointAtY(R,B){return B[0]=0,B[1]=R,B[2]=0,B}}}var ks=460812,Is=12e3,Fs=190,Hs=900,Os=.35,Ds=5,_s=2,Ns=()=>new Promise(r=>{window.scheduler?.yield?window.scheduler.yield().then(r):setTimeout(r,0)});async function Ke(r){let n=performance.now();for(;;){if(r.next().done)return;performance.now()-n>4&&(await Ns(),n=performance.now())}}async function In({canvas:r,gl:n,tier:i,forced:e,onFail:d,onOff:c,onOn:u,isFailed:v}){ho.enabled=!1;let h={...$o[i],instanceScale:1},s=document.documentElement,o=s.dir==="rtl"?-1:1,f=window.matchMedia("(pointer: coarse)").matches,p=new So({canvas:r,context:n,antialias:!0});p.outputColorSpace=co,p.setClearColor(ks,1),p.sortObjects=!1,p.debug.checkShaderErrors=e,p.info.autoReset=!0;let m=new vo,l=new He(30,1,.1,100);await Go(o<0);let y=qo({q:h,dir:o}),w={uTime:{value:0},uInline:{value:o},uCamY:{value:0},uDawn:{value:0},uPower:{value:new le(0,0)},uPowerY:{value:0},uLitY:{value:new le(st.slabBottom,-120)},uFog:{value:new le(4,40)},uLampOrigin:{value:new vt},uLampPos:{value:new vt(.5*o,.62,-.62)},uLampDir:{value:new vt(0,-1,0)},uLampColor:{value:new vt(1,.7,.42)},uLampOn:{value:1},uLampCone:{value:new le(.55,.9)},uAtlas:{value:y.texture}},S=Uo(w),b=Qo({programs:S,shared:w,printTexture:y.printTexture,dir:o}),T=Jo({programs:S,shared:w,text:y,q:h,dir:o,tier:i}),N=Xo({programs:S,shared:w,text:y,q:h,dir:o,tier:i}),tt=Ko({programs:S,shared:w,text:y,dir:o}),lt={desk:T,archive:N,strip:b,phone:tt};T.setPhone(tt.make({w:.0775,h:.16,t:.0085})),m.add(T.group,N.group,b.mesh,b.halo);let H=pe.map((t,x)=>({meta:t,index:x,status:"idle",module:null,group:new oe,ctx:null,on:!1,a:0,s:0,e:0,b:0,promise:null})),at=Object.fromEntries(H.map(t=>[t.meta.id,t]));H.forEach(t=>{t.group.visible=!1,m.add(t.group)});let E=null,R=null,B=null,ot=1,a=1/0,P=0,G=0,C=0,q=()=>E.svh*.15,k=Ho({inPlace:!f,blur:!f&&i!=="L"}),$=Ne(),K=Oo($),ct=55,dt=0;function z(t){let x=[],O=[],F=[];for(let[Y,Q]of Object.entries(t.shots))Q.caption&&(Y==="hero"?x.push([0,Q.pinEnd]):(x.push([Q.pinStart-.35*t.svh,Q.pinEnd]),O.push(Q.pinStart)),F.push(Q.pinEnd));return{zones:x,down:O,up:F}}function I(){let t=[];for(let[F,Y]of Object.entries(E.shots)){let Q=Y.caption&&document.querySelector(`[data-shot="${F}"] > .shot`);if(Q){let yt=[...Q.children].filter(J=>J.getAttribute("aria-hidden")!=="true").reduce((J,Mt)=>J+Mt.textContent.trim().split(/\s+/).filter(Boolean).length,0);t.push({y:F==="hero"?0:Y.pinStart,words:yt})}}let x=k.stripWords();x&&t.push({y:(x[0]+x[1])/2,words:0});let O=K.playing;K.plan(t,ct),O&&(K.start(window.scrollY),dt=Math.round(window.scrollY))}function W(){k.release(),E=Bo(),k.bake(E),$.bake(z(E),E.docH,E.svh),I();let t=Lo(E,pe);R=t.solved,ot=E.docH,B=Ao(t.knots,ot);let x=R["svc.auto"],O=R["process.head"],F=R["why.q"],Y=pe.filter(J=>J.floor&&J.stripYaw!==void 0).map(J=>({y:R[J.id].floorY,yaw:J.stripYaw}));Y.unshift({y:st.deskY,yaw:0}),Y.push({y:x.floorY+3,yaw:0},{y:x.floorY+1,yaw:90},{y:x.floorY-3,yaw:90},{y:O.floorY+2,yaw:0}),Y.sort((J,Mt)=>Mt.y-J.y),b.rebuild({yaws:Y,lineStartY:x.floorY-1.8,endY:F.floorY+.03,dense:[{a:R["svc.rescue"].floorY+2.4,b:R["svc.rescue"].floorY-2.4}]}),w.uLitY.value.set(st.slabBottom,O.floorY+4),N.setRange(st.slabBottom,O.floorY);let Q=E.shots.drop,yt=E.shots.fall;P=Q.pinStart+(Q.pinEnd-Q.pinStart)*.86,a=yt.pinStart+(yt.pinEnd-yt.pinStart)*.5,G=Q.pinStart+(Q.pinEnd-Q.pinStart)*.8,C=yt.pinStart+(yt.pinEnd-yt.pinStart)*.4;for(let J of H){let Mt=J.index,Et=E.shots[J.meta.id],re=Mt>0?E.shots[pe[Mt-1].id]:null,Lt=Mt<pe.length-1?E.shots[pe[Mt+1].id]:null;J.a=re?re.pinEnd:0,J.s=Et.pinStart,J.e=Et.pinEnd,J.b=Lt?Lt.pinStart:ot;let Xt=R[J.meta.id];J.group.position.set(0,Xt.floorY??0,0),J.status==="ready"&&J.module.layout&&J.module.layout(J.ctx)}T.setActPositions(R.deskAct4),pt()}let Z=1,M=0,X=null;function pt(){let t=E.W,x=E.H,O=h.pixelCap*Z,F=Math.min(window.devicePixelRatio||1,Math.sqrt(O/(t*x)));p.setPixelRatio(F),p.setSize(t,x,!1),l.aspect=t/x,X?.resize(t*F,x*F)}let xt=[],Ot=t=>({tier:i,q:h,dir:o,id:t.meta.id,group:t.group,programs:S,u:w,text:y,sets:lt,camera:l,renderer:p,rng:Ut(t.meta.id),get solved(){return R},get layout(){return E},get self(){return R[t.meta.id]},place(x,{inline:O=0,y:F=0,z:Y=0,yaw:Q=0}={}){return x.position.set(O*o,F,Y),x.rotation.y=Q*o,x},hotspots:{add(x){xt.push({...x,runtime:t})}}});async function ut(t){if(t.status!=="ready")return t.promise||(t.status="loading",t.promise=(async()=>{try{let O=(await jo[t.meta.id]()).default;t.ctx=Ot(t),await Ke(O.build(t.ctx)),await p.compileAsync(t.group,l,m),O.layout&&O.layout(t.ctx),t.module=O,t.status="ready",Nt=!0}catch(x){console.warn(`shot ${t.meta.id} failed`,x),t.status="failed"}})()),t.promise}function gt(t){for(let x=H.length-1;x>=0;x-=1)if(t>=H[x].a)return x;return 0}let Kt=!1;async function bt(){if(!Kt){for(Kt=!0;!(_t||v());){let t=gt(_),x=null,O=1/0;for(let F of H)if(F.status==="idle"){let Y=Math.abs(F.index-t);Y<O&&(x=F,O=Y)}if(!x)break;await new Promise(F=>{"requestIdleCallback"in window?window.requestIdleCallback(F,{timeout:200}):setTimeout(F,16)}),await ut(x)}Kt=!1}}let nt=new Float32Array(13),Dt=new fo,ke=new vt(0,1,0),Ie=new vt(1,0,0),it={t:0,enter:0,hold:0,exit:0,y:0,v:0,time:0,dt:0,px:0,py:0,pointer:0},ft=Do(window.scrollY),qt=_o($),_=ft.y,$t=0,Zt=0,_t=!1,Qt=null,Nt=!0,zt=0,xe=performance.now(),jt=0,St=performance.now(),Rt=0,be=0,Bt=0,Wt=0,Vt=0,se=0,ne=!1,rt=null,he=0,Me=NaN,te=!1,g=!1;function A(t,x){let O=F=>Math.min(1,Math.max(0,F));it.t=t.b>t.a?O((_-t.a)/(t.b-t.a)):1,it.enter=t.s>t.a?O((_-t.a)/(t.s-t.a)):_>=t.s?1:0,it.hold=t.e>t.s?O((_-t.s)/(t.e-t.s)):_>=t.e?1:0,it.exit=t.b>t.e?O((_-t.e)/(t.b-t.e)):_>=t.b?1:0,it.y=_/E.pace,it.v=ft.v,it.time=zt,it.dt=x,it.px=Wt,it.py=Vt,it.pointer=Bt}let L=(t,x)=>x>t?Math.min(1,Math.max(0,(_-t)/(x-t))):_>=x?1:0,D=t=>t*t*(3-2*t);function V(){let t=E.shots["process.head"];N.u.uTurn.value=D(L(t.pinStart,t.pinEnd));let x=E.shots["why.list"],O=E.shots["why.stats"],F=E.shots.cta,Y=L(x.pinStart,x.pinEnd)*3.2;T.setClear(Y);let Q=D(L(x.pinStart+(x.pinEnd-x.pinStart)*.45,F.pinStart));w.uDawn.value=Q,T.setClock(3.2+D(L(x.pinStart,O.pinEnd))*3.8);let yt=E.shots.hero;if(_<a){let Et=E.shots.drop.pinEnd-yt.pinEnd;T.setRing(1-L(yt.pinEnd,yt.pinEnd+Et*.14)),T.setOffHook(D(L(yt.pinEnd,yt.pinEnd+Et*.22)))}else T.setRing(1-L(x.pinStart,x.pinStart+(x.pinEnd-x.pinStart)*.5)),T.setOffHook(0);let J=T.phone;if(J.visible=_>a,b.setEnd(-1/0),_>a){let Et=E.shots["why.q"],re=R["why.q"].d*.62,Lt=D(L(E.shots.fall.pinEnd-(E.shots.fall.pinEnd-a)*.2,Et.pinEnd)),Xt=D(L(x.pinStart,x.pinStart+(x.pinEnd-x.pinStart)*.14)),no=re+(.42-re)*Lt,ao=no+(.0043-no)*Xt;J.position.y=ao;let ns=2.1+(1-2.1)*Lt;J.scale.setScalar(ns),J.rotation.y=E.portrait?0:Math.PI/2*D(L(O.pinEnd,F.pinStart)),b.setEnd(T.group.position.y+ao+.01)}let Mt=H.find(Et=>Et.meta.id==="svc.rescue");(_<Mt.a||_>Mt.b)&&(w.uPower.value.set(0,0),b.u.uJamK.value=0)}function et(t){To(B,ot,_,nt),l.position.set(nt[0],nt[1],nt[2]),l.quaternion.set(nt[3],nt[4],nt[5],nt[6]),Bt===1&&(Dt.setFromAxisAngle(ke,-Wt*.012),l.quaternion.multiply(Dt),Dt.setFromAxisAngle(Ie,Vt*.009),l.quaternion.multiply(Dt)),l.fov=nt[7],l.near=nt[8],l.far=nt[9],l.setViewOffset(E.W,E.H,nt[11],nt[12],E.W,E.H),w.uTime.value=zt,w.uCamY.value=nt[1],w.uFog.value.set(nt[10]*.16,nt[10]),V();let x=_<P||_>a,O=_>a?4:1;T.group.visible=x,T.setAct(O),N.group.visible=_>G&&_<C,w.uLampOn.value=x?1-w.uDawn.value*.72:0,w.uLampOrigin.value.copy(T.group.position),w.uLampColor.value.set(1,.7,.42),b.u.uFeed.value=_*18e-5/E.pace,A(H[0],t),x&&(T.resetSpot(),T.update(it,zt));for(let F of H){let Y=_>=F.a-q()&&_<=F.b+q();F.status==="ready"&&(Y||F.on)&&(A(F,t),F.module.update(it,F.ctx),F.on=Y,F.group.visible=Y)}b.focus(nt[1],nt[9]),l.updateProjectionMatrix(),l.updateMatrixWorld(),X?X.render(m,l):p.render(m,l)}let ht=new _e({onChange(t,x){mt(x)}});function mt(t){if(t==="pixel-85"||t==="pixel-72")M=t==="pixel-85"?.85:.72;else if(t==="drop-film")X?.dispose(),X=null;else if(t==="instances-70"||t==="instances-50")h.instanceScale=t==="instances-70"?.7:.5,T.setDensity(h.instanceScale),N.setDensity(h.instanceScale);else if(t==="shadow-1")T.setShadowTaps(1);else if(t==="extras-off")N.setWeather(!1),T.setExtras(!1);else if(t==="cadence-30")se=33.3;else if(t==="stills"){try{window.localStorage.setItem("enjaz:tier",`S:${Date.now()}`)}catch{}Se(),c("governor")}}function ae(t){if(_t)return;if(window.requestAnimationFrame(ae),document.hidden||ne||Qt!==null){xe=t;return}let x=t-xe;xe=t;let O=Math.min(x,100)/1e3;zt+=O;let F=window.scrollY,Y=qt.step(F,O,E.svh,t);if(Ee&&Math.abs(F-dt)>2&&(Ee=!1,Le()),K.playing)if(g||qt.on||Math.abs(F-dt)>2||document.body.classList.contains("is-nav-open"))ee();else{let Lt=document.documentElement.scrollHeight-window.innerHeight;Y=Math.round(Math.min(Lt,K.step(O,os))),dt=Y;let Xt=K.stops[K.stops.length-1].y;Ft.style.setProperty("--tour",(Xt>0?Math.min(1,Y/Xt):1).toFixed(3)),K.playing||(Ee=!0,Le())}else if(rt)if(g||qt.on||Math.abs(F-rt.written)>2)rt=null;else{let Lt=rt.at+(rt.to-rt.at)*(1-Math.exp(-Ds*O)),Xt=_s*E.svh*O;rt.at+=Math.max(-Xt,Math.min(Xt,Lt-rt.at)),Math.abs(rt.to-rt.at)<.5&&(rt.at=rt.to),Y=Math.round(rt.at),rt.written=Y,rt.at===rt.to&&(rt=null)}else if(!qt.on&&!g&&!$t&&!document.body.classList.contains("is-nav-open")&&(F!==Me?(he=0,te=!1):he+=O,!te&&he>Os)){te=!0;let Lt=k.settle(F);Lt!==null&&Math.abs(Lt-F)>2&&(rt={at:F,to:Lt,written:F})}Me=Y,Y!==F&&window.scrollTo({top:Y,behavior:"instant"}),k.update(Y,O),!$t&&Math.abs(Y-_)>6*E.svh&&t>Zt?($t=t,s.classList.add("world-dip")):$t&&t-$t>=Fs&&(ft.land(Y,E.svh),$t=0,Zt=t+Hs,s.classList.remove("world-dip"));let Q=Math.abs(Y-ft.y)>.25||Math.abs(ft.v)>2;_=ft.step(Y,O,E.svh,$.speed(ft.y)),Wt+=(Rt-Wt)*Math.min(1,O*6),Vt+=(be-Vt)*Math.min(1,O*6);let yt=Math.abs(Rt-Wt)>.001||Math.abs(be-Vt)>.001,Mt=H[gt(_)].meta.idleHz,Et=Q||yt||Nt;if(!Et&&Mt>0&&!(i==="L"&&t-St>Is)&&(Et=t-jt>=1e3/Mt-1),se&&t-jt<se-2&&(Et=!1),!Et)return;Q&&(St=t),M&&(!Q||_>E.shots.fall.pinStart&&_<E.shots.fall.pinEnd)&&(Z=M,M=0,pt()),Nt=!1;let re=(t-jt)/1e3;jt=t,et(Math.min(re,.1)),x<250&&(Q||Mt>0)&&ht.push(x)}function me(){ee(),qt.on=!1,rt=null,$t=0,s.classList.remove("world-dip")}function Se(){_t=!0,me(),k.release(),Ft.remove()}let Ft=document.createElement("button");Ft.type="button",Ft.className="tour";let ie=document.createElementNS("http://www.w3.org/2000/svg","svg");ie.setAttribute("viewBox","0 0 24 24"),ie.setAttribute("width","18"),ie.setAttribute("height","18"),ie.setAttribute("aria-hidden","true"),ie.setAttribute("focusable","false");let Ze=document.createElementNS("http://www.w3.org/2000/svg","path");ie.append(Ze);let Qe=document.createElement("span");Ft.append(ie,Qe);let ts=s.lang==="ar"?{play:"\u062C\u0648\u0644\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0629",pause:"\u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u062C\u0648\u0644\u0629",replay:"\u0623\u0639\u062F \u0627\u0644\u062C\u0648\u0644\u0629"}:{play:"Auto tour",pause:"Pause tour",replay:"Replay tour"},es={play:"M8 5.2v13.6L18.8 12z",pause:"M7 5h3.6v14H7zm6.4 0H17v14h-3.6z",replay:"M5.4 13.2a6.8 6.8 0 1 0 1.9-5.9M6.6 3.6v4.2h4.2"},Ee=!1,to="";function Le(){let t=K.playing?"pause":Ee?"replay":"play";t!==to&&(to=t,Ft.dataset.state=t,Ze.setAttribute("d",es[t]),Qe.textContent=ts[t])}function We(t=!1){_t||ne||(qt.on=!1,rt=null,Ee=!1,K.start(window.scrollY,t),dt=Math.round(window.scrollY),Le())}function ee(){K.playing&&(K.stop(),he=0,te=!1,Le())}function os(t,x){for(let O of H)if(O.b>=t&&O.a<=x&&(O.status==="idle"||O.status==="loading"))return!1;return!0}let Ye=t=>t.target instanceof Node&&Ft.contains(t.target);Ft.addEventListener("click",()=>K.playing?ee():We()),window.addEventListener("touchstart",t=>{g=!Ye(t)},{passive:!0}),window.addEventListener("keydown",t=>{Ye(t)&&(t.key==="Enter"||t.key===" ")||ee()},{passive:!0}),window.addEventListener("pointerdown",t=>{Ye(t)||ee()},{passive:!0});let eo=()=>{g=!1};window.addEventListener("touchend",eo,{passive:!0}),window.addEventListener("touchcancel",eo,{passive:!0}),window.addEventListener("pointermove",t=>{Bt=t.pointerType==="mouse"?1:2,Rt=t.clientX/window.innerWidth*2-1,be=t.clientY/window.innerHeight*2-1,St=performance.now()},{passive:!0});let Fe=new vt;window.addEventListener("click",t=>{if(!t.target.closest?.("a, button, .shot"))for(let x of xt){if(!x.runtime.on)continue;Fe.set(x.center[0],x.center[1],x.center[2]),x.runtime.group.localToWorld(Fe).project(l);let O=(Fe.x*.5+.5)*E.W,F=(.5-Fe.y*.5)*E.H;Math.hypot(O-t.clientX,F-t.clientY)<x.radius&&(x.runtime.module.hit?.(x.id,it,x.runtime.ctx),Nt=!0)}},{passive:!0}),window.addEventListener("pageshow",()=>{ee(),ft.reset(window.scrollY),_=ft.y,Nt=!0});let oo=0;if(r.addEventListener("webglcontextlost",t=>{t.preventDefault(),ne=!0,me(),oo+=1,c("context-lost")}),r.addEventListener("webglcontextrestored",()=>{oo>1||(ne=!1,T.bakeShadow(p),u(),W(),ft.reset(window.scrollY),_=ft.y,Nt=!0)}),W(),ft.reset(window.scrollY),_=ft.y,await Ke(T.build()),await Ke(N.build()),await ut(at.hero),await ut(at.drop),await p.compileAsync(m,l),T.bakeShadow(p),v())return null;if(!e){let t=[],x=new Uint8Array(4);for(let F=0;F<6;F+=1){await new Promise(Q=>window.requestAnimationFrame(Q));let Y=performance.now();et(.016),n.readPixels(0,0,1,1,n.RGBA,n.UNSIGNED_BYTE,x),t.push(performance.now()-Y)}let O=t.slice(2).sort((F,Y)=>F-Y)[1];if(O>40){try{window.localStorage.setItem("enjaz:tier",`S:${Date.now()}`)}catch{}return d("bench"),null}O>20&&(Z=.7,h.instanceScale=.7,T.setDensity(.7),N.setDensity(.7),pt())}h.film&&(X=(await import("./chunk-WOIDP7SL.js")).createFilm(p),X.resize(E.W*p.getPixelRatio(),E.H*p.getPixelRatio())),ft.reset(window.scrollY),_=ft.y,k.update(_,0),et(.016),s.classList.add("world-on"),Le(),document.body.append(Ft),window.requestAnimationFrame(ae),bt(),/[?&]tour=1\b/.test(window.location.search)&&We(!0),window.addEventListener("wheel",t=>{ee(),!(t.ctrlKey||_t||ne||Qt!==null||document.body.classList.contains("is-nav-open")||Math.abs(t.deltaX)>Math.abs(t.deltaY))&&(t.preventDefault(),qt.input(t.deltaY,t.deltaMode,window.scrollY,E.svh,E.docH-E.svh,performance.now()),St=performance.now())},{passive:!1});let ss=Wo(()=>{W(),Nt=!0});/[?&]hud=1\b/.test(window.location.search)&&import("./chunk-FKFVKEYL.js").then(t=>t.mountHud({renderer:p,governor:ht,tier:i,q:h,get y(){return _}}));let so={tier:i,renderer:p,governor:ht,scene:m,stop:Se,pacer:$,get layout(){return E},get solved(){return R},tour:{play:t=>We(t),pause:ee,get playing(){return K.playing},get stops(){return K.stops.map(t=>({...t}))},set seconds(t){ct=t,I()}},get y(){return _},seek(t){return window.scrollTo({top:t,behavior:"instant"}),me(),ft.reset(window.scrollY),_=ft.y,Me=window.scrollY,te=!0,k.update(_,0),et(.016),_},freeze(t){Qt=t,zt=t},unfreeze(){Qt=null},renderOnce(){et(.016)},info(){return et(.016),{calls:p.info.render.calls,triangles:p.info.render.triangles,programs:p.info.programs.length,rung:ht.rung,y:_}},sceneInfo(){let t=X;X=null,et(.016);let x={calls:p.info.render.calls,triangles:p.info.render.triangles};return X=t,x},feedFrameTimes(t){t.forEach(x=>ht.push(x))},async loadAll(){await Promise.all(H.map(t=>ut(t))),Nt=!0},status(){return Object.fromEntries(H.map(t=>[t.meta.id,t.status]))},dispose(){Se(),ss()}};return window.__enjazWorld=so,so}export{In as start};
