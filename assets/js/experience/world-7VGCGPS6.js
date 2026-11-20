/* three.js r187 (c) three.js authors, MIT. ENJAZ film. */
import{a as nt,b as zo,c as Io,d as ko}from"./chunk-6ETZZDVU.js";import{a as Fo,b as Oo,c as _o,d as Do,e as Ho,f as to,g as No,h as Wo}from"./chunk-2EEOQMQQ.js";import{c as Wt,d as Q,f as Ct,g as Ut,h as Rt,i as Gt,j as Ro,k as Ne,l as ce}from"./chunk-GBHZZ3DY.js";import{A as Lo,B as To,C as At,D as Ke,E as Ao,J as Pt,N as Po,O as He,S as Co,a as Ve,c as Xe,d as Qe,e as ve,f as ho,g as mo,h as vo,i as wo,j as go,k as Re,l as yo,m as re,n as Je,o as rt,p as xo,q as bo,r as Ze,t as te,u as Mo,v as le,w as So,x as G,z as Eo}from"./chunk-ZD75F7KI.js";import"./chunk-AEJNSRIJ.js";var hs=[.24,.45],We=l=>Math.min(1,Math.max(0,l));function Bo({inPlace:l,blur:n}){let r=[],e=null,p=1/0,c=NaN,u=0,v=0;function d(s){s.el.style.opacity="",s.el.style.transform="",s.el.classList.remove("is-gone");for(let h of s.kids)h.style.opacity="",h.style.transform="",h.style.filter=""}function o(s,h,f,m){let i=h<.5;if(i!==s.gone&&(s.gone=i,s.el.classList.toggle("is-gone",i),document.dispatchEvent(new CustomEvent("enjaz:captions"))),h===1&&f===0){d(s);return}s.el.style.opacity=We(h/.55).toFixed(3),s.el.style.transform=f?`translate3d(0, ${f.toFixed(1)}px, 0)`:"";let g=s.kids.length,w=g>1?Math.min(.14,.5/(g-1)):0,S=1-(g-1)*w;s.kids.forEach((b,A)=>{let B=We((h-A*w)/S);if(B===1){b.style.opacity="",b.style.transform="",b.style.filter="";return}let $=1-B;b.style.opacity=B.toFixed(3),b.style.transform=`translate3d(0, ${($*$*$*1.1*(m?-1:1)).toFixed(3)}em, 0)`,n&&(b.style.filter=`blur(${($*.28).toFixed(3)}em)`)})}return{bake(s){let h=.35*s.svh;r=[];for(let[m,i]of Object.entries(s.shots)){if(!i.caption||i.caption.h>s.svh*.7)continue;let g=document.querySelector(`[data-shot="${m}"] > .shot`);g&&r.push({el:g,kids:[...g.children],a:m==="hero"?-1:i.pinStart-h,s:m==="hero"?-1:i.pinStart,e:i.pinEnd,b:i.pinEnd+h,unpin:i.pinEnd,hero:m==="hero",pin:i.pin??0,h:i.caption.h,shown:-1,shift:0,gone:!1})}let f=.5*s.svh;e=null,p=s.docH-s.svh;for(let m=1;m<r.length;m+=1){let i=r[m-1],g=r[m],w=g.s-i.e;if(!(w<=0)){if(l){let S=Math.min(f,w/2);i.b=i.e+S,g.a=g.s-S}else i.b=i.e+Math.min(f,Math.max(h,w-g.pin));i.hero&&(i.b=i.unpin+w*.18,i.e=Math.min(i.unpin,i.b-h*.6),e=hs.map(S=>i.unpin+w*S))}}c=NaN},update(s,h){u=s===c?u+h:0,c=s,v=u>.25?Math.min(1,v+h/.4):Math.max(0,v-h/.12);for(let f of r){let m=f.s>f.a?We((s-f.a)/(f.s-f.a)):1,i=We((s-f.e)/(f.b-f.e)),g=s>f.a&&s<f.b,w=g?Math.max(Math.min(m,1-i),v):0;f.hero&&g&&i>.3&&(w=Math.min(1-i,1-v));let S=0;l&&g&&(S=m<1?(s-f.s)*.85:i>0?Math.max(0,s-f.unpin)*.85:0),(w!==f.shown||S!==f.shift)&&(f.shown=w,f.shift=S,o(f,w,S,i>0))}},settle(s){if(!r.length||s>=p-2||e&&s>=e[0]&&s<=e[1])return null;let h=null,f=1/0,m=(i,g)=>{let w=Math.min(g,Math.max(i,s));Math.abs(w-s)<f&&(f=Math.abs(w-s),h=w)};for(let i of r){if(i.hero){let w=i.e+(i.b-i.e)*.3;if(s<w)return null;m(0,i.e);continue}let g=l?i.a:i.s-i.h*.5;if(s>g&&s<i.b)return null;m(i.s,i.e)}return e&&m(e[0],e[1]),h===null?null:Math.round(h)},stripWords(){return e},release(){for(let s of r)d(s),s.shown=-1,s.gone=!1}}}var eo=["pixel-85","pixel-72","drop-film","instances-70","instances-50","shadow-1","extras-off","cadence-30","stills"];function oo(l,n){return l[Math.min(l.length-1,Math.floor(l.length*n))]}var Be=class{constructor({onChange:n=()=>{}}={}){this.onChange=n,this.buffer=new Float32Array(90),this.sorted=new Float32Array(90),this.count=0,this.head=0,this.rung=-1,this.elapsed=0,this.overBudget=0,this.underBudget=0,this.cooldown=0,this.climbs=0,this.upWait=240,this.locked=!1,this.refreshCap=!1,this.seen=0,this.belowBail=0,this.p50=0,this.p90=0,this.vsync=16.6}target(){return this.refreshCap?33.3:Math.max(this.vsync,16.6)}push(n){if(this.elapsed+=n,this.elapsed<1e3||n>250||(this.buffer[this.head]=n,this.head=(this.head+1)%90,this.count=Math.min(90,this.count+1),this.seen+=1,this.cooldown=Math.max(0,this.cooldown-n),this.count<90/2))return;this.sorted.set(this.buffer);let r=this.sorted.subarray(0,this.count).sort();this.p50=oo(r,.5),this.p90=oo(r,.9),this.vsync=oo(r.subarray(0,Math.max(1,Math.floor(this.count*.2))),.5),this.seen<=60&&Math.abs(this.p50-33.3)/33.3<.04&&this.p90/this.p50<1.08&&(this.refreshCap=!0);let e=this.target();if(this.p90>e*1.25?(this.overBudget+=1,this.underBudget=0):this.p90<e*.75?(this.underBudget+=1,this.overBudget=0):(this.overBudget=0,this.underBudget=0),this.rung===eo.length-2&&this.p50>50){if(this.belowBail+=n,this.belowBail>4e3){this.step(1);return}}else this.belowBail=0;this.cooldown>0||(this.overBudget>=45&&this.rung<eo.length-2?(this.underBudgetClimbed&&(this.upWait*=2,this.underBudgetClimbed=!1),this.step(1)):this.underBudget>=this.upWait&&this.rung>=0&&!this.locked&&(this.climbs+=1,this.underBudgetClimbed=!0,this.climbs>=2&&(this.locked=!0),this.step(-1)))}step(n){this.rung+=n,this.overBudget=0,this.underBudget=0,this.cooldown=1500,this.count=0,this.onChange(this.rung,eo[this.rung]??"full")}};var ze=(l,n,r)=>Math.min(r,Math.max(n,l));var Yo=l=>l*l*(3-2*l),ms=l=>l*l*(6-8*l+3*l*l);function Ye(){let l=0,n=1,r=null,e=null,p=[],c=[],u=v=>Math.min(8191,Math.max(0,v/n));return{bake({zones:v,down:d=[],up:o=[]},s,h){l=Math.max(1,s),n=l/8191,r=new Float64Array(8192),e=new Float32Array(8192);let f=.45*h;for(let m=0;m<8192;m+=1){let i=m*n,g=1/0;for(let[w,S]of v)g=Math.min(g,i<w?w-i:i>S?i-S:0);e[m]=1+3*Yo(Math.min(1,g/f)),m>0&&(r[m]=r[m-1]+n*2/(e[m-1]+e[m]))}p=d.map(Math.round).sort((m,i)=>m-i),c=o.map(Math.round).sort((m,i)=>i-m)},speed(v){return e?e[Math.round(u(v))]:1},toEffort(v){if(!r)return v;let d=u(v),o=Math.min(8190,Math.floor(d)),s=Math.max(0,v-l)+Math.min(0,v);return r[o]+(r[o+1]-r[o])*(d-o)+s},fromEffort(v){if(!r)return v;let d=r[8191];if(v<=0||v>=d)return v<=0?v:l+(v-d);let o=0,s=8191;for(;s-o>1;){let h=o+s>>1;r[h]<=v?o=h:s=h}return(o+(v-r[o])/(r[s]-r[o]))*n},stop(v,d){return d>v?p.find(o=>o>v+.5&&o<=d)??null:c.find(o=>o<v-.5&&o>=d)??null}}}function Uo(l=Ye()){let n=[],r=0,e=0,p="hold",c=0,u=0,v=0,d=0,o=0;return{playing:!1,get stops(){return n},plan(s,h=60){n=[];for(let g of[...s].sort((w,S)=>w.y-S.y)){let w=Math.max(0,Math.round(g.y)),S=g.hold??1,b=g.slow??1,A=g.through>w+2?Math.round(g.through):w,B=A>w?g.play??0:0,$=n.at(-1);$&&w-$.y<3?($.words=Math.max($.words,g.words),$.hold=Math.max($.hold,S),$.slow=Math.max($.slow,b)):n.push({y:w,words:g.words,hold:S,slow:b,through:A,play:B,read:0})}if(n.forEach((g,w)=>{let S=n[w+1];(!S||g.through>=S.y||g.play<=0)&&(g.through=g.y,g.play=0)}),n.length<2){r=0;return}let f=h*.85,m=n.slice(0,-1).reduce((g,w)=>g+w.words+12,0);n.forEach((g,w)=>{g.read=w<n.length-1?f*(g.words+12)*g.hold/m:0});let i=l.toEffort(n.at(-1).y)-l.toEffort(n[0].y);r=i>0?(h-f)/i:0},start(s,h=!1){if(n.length<2)return;this.playing=!0,p="hold",c=0,e=n.findIndex(m=>m.y>s+2),e===-1&&(e=1,s=n[0].y,h=!0);let f=e>0&&s-n[e-1].y<=2?n[e-1]:null;f?(o=f.y,u=h?f.read+.6:Math.min(.6,f.read)):(o=s,u=.6)},stop(){this.playing=!1},step(s,h=()=>!0){if(!this.playing)return o;c+=s;let f=()=>{v=l.toEffort(o),d=l.toEffort(n[e].y),p="move",c=0,u=Math.max(.3,(d-v)*r)*n[e].slow};if(p==="hold"){if(c<u||c<u+4&&!h(o,n[e].y))return o;let i=e>0?n[e-1]:null;i&&i.through>o+2&&o>=i.y-2?(p="play",v=o,d=i.through,c=0,u=i.play*(d-v)/(d-i.y)):f()}if(p==="play"){let i=Math.min(1,c/u);if(o=v+(d-v)*Yo(i),i<1)return o;o=d,f()}let m=Math.min(1,c/u);return o=l.fromEffort(v+(d-v)*ms(m)),m>=1&&(o=n[e].y,e===n.length-1?this.playing=!1:(p="hold",c=0,u=n[e].read,e+=1)),o}}}function Go(l=0){return{y:l,v:0,step(n,r,e,p=1){let u=10*r,v=1/(1+u+.48*u*u+.235*u*u*u),d=4.2*Math.min(p,2.5)*e*.2,o=ze(this.y-n,-d,d),s=(this.v+10*o)*r;return this.v=(this.v-10*s)*v,this.y=this.y-o+(o+s)*v,Math.abs(this.y-n)<.25&&Math.abs(this.v)<2&&(this.y=n,this.v=0),this.y},reset(n){this.y=n,this.v=0},land(n,r){let e=Math.sign(n-this.y);this.y=n-e*.8*r,this.v=e*4.2*r*.5}}}function qo(l=Ye()){return{on:!1,at:0,aim:0,written:0,rest:null,input(n,r,e,p,c,u=0){this.on||(this.on=!0,this.at=e,this.aim=e,this.written=e);let d=ze(n*(r===1?40:r===2?p:1),-200,200),o=this.rest;if(o&&Math.sign(d)===o.dir&&Math.abs(this.at-o.y)<2){let w=u-o.since;if(w<.35*1e3||w<1.2*1e3&&u-o.last<.14*1e3){o.last=u,this.aim=this.at;return}}this.rest=null;let s=Math.sign(d)===-Math.sign(this.aim-this.at)?this.at:this.aim,h=1.6*p,f=l.toEffort(this.at),m=ze(l.toEffort(s)+d,f-h,f+h),i=ze(l.fromEffort(m),0,c),g=l.stop(this.at,i);g!==null&&(i=g),this.aim=i},step(n,r,e,p=0){if(!this.on)return n;if(Math.abs(n-this.written)>2)return this.on=!1,this.rest=null,n;let c=l.toEffort(this.at),u=l.fromEffort(c+(l.toEffort(this.aim)-c)*(1-Math.exp(-12*r))),v=3.5*Math.min(l.speed(this.at),2.5)*e*r;if(this.at+=ze(u-this.at,-v,v),Math.abs(this.aim-this.at)<.5){let d=Math.sign(this.aim-this.written);this.at=this.aim,this.on=!1,l.stop(this.aim-d*3,this.aim)===this.aim&&(this.rest={y:this.aim,dir:d,since:p,last:p})}return this.written=Math.round(this.at),this.written}}}var jo=l=>{let n=document.createElement("div");n.style.position="fixed",n.style.top="0",n.style.width="0",n.style.visibility="hidden",n.style.height=`100${l}`,document.body.appendChild(n);let r=n.getBoundingClientRect().height;return n.remove(),r},Ie=l=>parseFloat(l)||0;function $o(){let l=jo("svh"),n=jo("lvh"),r=document.documentElement.clientWidth,e=n,p=window.scrollY,c=document.querySelector("[data-nav]"),u=c?c.getBoundingClientRect().height:0,v=document.documentElement.dir==="rtl"?-1:1,d=document.documentElement.scrollHeight,o=getComputedStyle(document.documentElement),s=parseFloat(o.getPropertyValue("--pace"))||1,h=parseFloat(o.getPropertyValue("--pace-gap"))||s,f={};for(let m of document.querySelectorAll("[data-shot]")){let i=m.dataset.shot,g=m.getBoundingClientRect(),w=g.top+p,S=m.querySelector(":scope > .shot"),b={id:i,top:w,height:g.height,caption:null,pinStart:w,pinEnd:w};if(S){let A=S.getBoundingClientRect(),B=getComputedStyle(m),$=getComputedStyle(S),ut=Ie(B.paddingBlockEnd);if(i==="hero"){let I=Ie($.insetBlockStart),et=Ie($.marginBlockEnd),L=Ie(B.paddingBlockStart);b.pinStart=0,b.pinEnd=Math.max(0,g.height-L-A.height-et),b.caption={x:A.left,y:I,w:A.width,h:A.height}}else{let I=Ie($.insetBlockEnd);b.pinStart=w+A.height+I-l,b.pinEnd=b.pinStart+Math.max(0,g.height-ut-A.height),b.caption={x:A.left,y:l-I-A.height,w:A.width,h:A.height},b.pin=I,b.gap=ut}}f[i]=b}return{W:r,H:e,svh:l,lvh:n,navH:u,docH:d,dir:v,pace:s,paceGap:h,portrait:e>=r,shots:f}}function Vo(l){let n=window.matchMedia("(pointer: coarse)").matches,r=document.documentElement.clientWidth,e=document.documentElement.scrollHeight,p=0,c=()=>{window.clearTimeout(p),p=window.setTimeout(l,160)},u=new ResizeObserver(()=>{let v=document.documentElement.clientWidth,d=document.documentElement.scrollHeight;if(v===r&&d===e)return;let o=n&&v===r&&Math.abs(d-e)<200;r=v,e=d,o||c()});return u.observe(document.documentElement),document.fonts?.ready.then(c),document.fonts?.addEventListener?.("loadingdone",c),()=>u.disconnect()}var ge=`
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
`,vs=`
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
}`,ws=`
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
}`,gs=`
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
}`,ys=`
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
}`,xs=`
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
}`,bs=`
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
}`,Ms=`
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
}`,Ss=`
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
}`,Es=`
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
}`,Ls=`
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
}`,Ts=`
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
}`,As=`
${ye}
uniform vec3 uColor;
uniform float uAlpha;
in float vFog;
void main() {
  fragColor = vec4(uColor * uAlpha * (1.0 - clamp(vFog, 0.0, 1.0)), 1.0);
}`;function Xo(l,n={}){return l.replace("//#pars",n.pars??"").replace("//#fpars",n.fpars??"").replace("//#local",n.local??"").replace("//#world",n.world??"").replace("//#frag",n.frag??"")}function ue(l,{mips:n=!0,repeat:r=!1}={}){let e=new Lo(l);return e.colorSpace=vo,e.generateMipmaps=n,e.minFilter=n?ho:ve,e.magFilter=ve,r&&(e.wrapS=Qe,e.wrapT=Qe),e}function Ps(){let n=document.createElement("canvas");n.width=256*2,n.height=256;let r=n.getContext("2d"),e=(p,c,u)=>{let v=r.createRadialGradient(p+107.52,76.8,5.12,p+128,128,184.32);c.forEach(([o,s])=>v.addColorStop(o,s)),r.fillStyle=v,r.fillRect(p,0,256,256);let d=r.createRadialGradient(p+256*.38,256*.24,0,p+256*.38,256*.24,256*.26);d.addColorStop(0,u),d.addColorStop(1,"rgba(255,255,255,0)"),r.fillStyle=d,r.fillRect(p,0,256,256)};return e(0,[[0,"#bcbcc0"],[.5,"#8c8d92"],[.85,"#55565c"],[1,"#35363c"]],"rgba(255,255,255,.18)"),e(256,[[0,"#f6d58c"],[.45,"#c9963f"],[.8,"#6e4a1c"],[1,"#2c1c0a"]],"rgba(255,244,214,.75)"),ue(n,{mips:!1})}function Qo(l){let n=Ps(),r=(e,p,c,u,v={})=>{let{deform:d,defines:o,...s}=v;return new Po({name:e,glslVersion:yo,vertexShader:Xo(p,d),fragmentShader:Xo(c,d),defines:o??{},uniforms:{...l,...u,...d?.uniforms??{}},...s})};return{matcap:n,solid(e={}){return r("solid",vs,ws,{uMatcap:{value:n},uEmit:{value:e.emit??[0,0,0]},uAmbient:{value:e.ambient??.06},uHouse:{value:e.house??1}},we(e,["emit","ambient","house"]))},paper(e={}){return r("paper",gs,ys,{uAtlas:e.atlas??l.uAtlas,uCell:{value:e.cell??[0,0,1,1]},uAmbient:{value:e.ambient??.07},uHouse:{value:e.house??1},uLitBoost:{value:e.boost??1}},{side:Ve,...we(e,["atlas","cell","ambient","house","boost"])})},wood(e={}){return r("wood",xs,bs,{uHouse:{value:0},...e.uniforms},we(e,["uniforms"]))},strip(e={}){return r("strip",Ms,Ss,{uHouse:{value:1},...e.uniforms},we(e,["uniforms"]))},glow(e={}){return r("glow",Es,Ls,{uColor:{value:e.color??[1,1,1]},uAlpha:{value:e.alpha??1},uShape:{value:e.shape??0},uRadius:{value:0},uMap:{value:e.map??n},uHouse:{value:e.house??0}},{transparent:!0,depthWrite:!1,blending:Xe,side:Ve,...we(e,["color","alpha","shape","map","house"])})},wire(e={}){return r("wire",Ts,As,{uColor:{value:e.color??[.365,1,.87]},uAlpha:{value:e.alpha??1},uHouse:{value:0}},{transparent:!0,depthWrite:!1,blending:Xe,...we(e,["color","alpha"])})}}}function we(l,n){let r={};for(let e of Object.keys(l))n.includes(e)||(r[e]=l[e]);return r}var Xt=4,Cs=["invoice","receipt","quote","ledger","sheet","slip","lines","dossier","carbon","memo","tape","blank"],Rs=l=>{let n=new Set;for(let r of document.querySelectorAll(l)){let e=r.textContent.trim();e&&e!=="\u2726"&&n.add(e)}return[...n]};async function Jo(l){let n=[document.fonts.load('400 20px "IBM Plex Mono"',"#REF! 0123"),document.fonts.load(l?'700 48px "Noto Kufi Arabic"':'700 48px "Space Grotesk"',l?"\u0625\u0646\u062C\u0627\u0632":"ENJAZ")];await Promise.race([Promise.allSettled(n),new Promise(r=>setTimeout(r,1500))])}function Zo({q:l,dir:n}){let r=n<0,e=document.querySelector("main"),p={};try{p=JSON.parse(e?.dataset.atlas??"{}")}catch{p={}}let c=Rs(".ticker__track span"),u=[];try{u=JSON.parse(document.querySelector("[data-typewriter]")?.dataset.typewriter??"[]")}catch{u=[]}let v=r?'"Noto Kufi Arabic", system-ui':'"Space Grotesk", system-ui',d='"IBM Plex Mono", monospace',o=new Intl.NumberFormat(r?"ar-EG":"en-US",{useGrouping:!1}),s=l.atlas,h=document.createElement("canvas");h.width=s,h.height=s;let f=h.getContext("2d"),m=s/Xt;f.fillStyle="#fff",f.fillRect(0,0,s,s);let i="#23252e",g="#9aa0ad",w=(a,z)=>{let q=a%Xt,C=Math.floor(a/Xt);f.save(),f.beginPath(),f.rect(q*m,C*m,m,m),f.clip(),f.translate(q*m,C*m),f.scale(m/100,m/134),f.direction=r?"rtl":"ltr",f.textBaseline="alphabetic",z(f),f.restore()},S=a=>r?100-a:a,b=(a,z,q,C=12)=>{a.fillStyle=i,a.font=`700 ${C}px ${v}`,a.textAlign="start",a.fillText(z,S(8),q)},A=(a,z,q=8,C=92,j=g,O=.7)=>{a.fillStyle=j,a.fillRect(q,z,C-q,O)},B=(a,z,q,C,j=0)=>{for(let O=0;O<q;O+=1){let X=34+(O*37+j)%40;a.fillStyle=O%3===0?i:g,a.fillRect(r?92-X:8,z+O*C,X,1.4),a.fillStyle=g,a.fillRect(r?8:80,z+O*C,12,1.4)}};w(0,a=>{b(a,p.invoice??"",20,14),A(a,26),B(a,34,9,7),A(a,104,8,92,i,1),a.fillStyle=i,a.font=`600 9px ${d}`,a.textAlign=r?"left":"right",a.fillText(o.format(4820),r?8:92,116)}),w(1,a=>{b(a,p.receipt??"",18,12),A(a,24),B(a,32,7,6,11),a.fillStyle=i,a.fillRect(30,100,40,12)}),w(2,a=>{b(a,p.quote??"",22,15),A(a,28),B(a,38,6,8,23),a.save(),a.translate(68,104),a.rotate(-.26),a.strokeStyle="#5e4bd8",a.lineWidth=2,a.strokeRect(-23,-9,46,18),a.fillStyle="#5e4bd8",a.font=`700 10px ${v}`,a.textAlign="center",a.fillText(p.paid??"",0,4),a.restore()});let $=(a,z)=>{let q=r?8:16;a.fillStyle="#e6f6ee";for(let C=0;C<18;C+=2)a.fillRect(0,6+C*7,100,7);a.strokeStyle="#a9b7ae",a.lineWidth=.4;for(let C=0;C<=4;C+=1)a.beginPath(),a.moveTo(q+C*19,0),a.lineTo(q+C*19,134),a.stroke();a.font=`400 4.8px ${d}`,a.textAlign="center";for(let C=0;C<18;C+=1){a.fillStyle=g,a.fillText(o.format(C+1),r?96:8,11.5+C*7);for(let j=0;j<4;j+=1){let O=(C*7+j*13)%23,X=o.format(100+O*317);z&&O===4?(X="#REF!",a.fillStyle="#c2352b"):(z&&O===9&&(X="#####"),a.fillStyle=i),a.fillText(X,q+j*19+9.5,11.5+C*7)}}};w(3,a=>{$(a,!1),a.fillStyle="rgba(255,255,255,.92)",a.fillRect(0,0,100,16),b(a,p.ledger??"",12,10)}),w(4,a=>$(a,!0)),w(5,a=>{a.fillStyle="#c2352b",a.fillRect(8,8,84,7),a.fillStyle=i,a.font=`600 9px ${d}`,a.textAlign="center";for(let z=0;z<4;z+=1)a.fillText(o.format(1200+z*417),50,40+z*20)}),w(6,a=>{for(let z=0;z<16;z+=1)A(a,12+z*7.4,6,94,"#b7c2d8",.5);B(a,14,7,7.4,5)}),w(7,a=>{a.fillStyle="#fff",a.fillRect(0,0,100,134),a.fillStyle="#f7efd9",a.fillRect(18,18,64,30),b(a,p.ledger??"",38,11),a.fillStyle="#faf6ea",a.fillRect(0,62,100,5)}),w(8,a=>{b(a,p.invoice??"",20,13),B(a,30,12,6.6,3)}),w(9,a=>{B(a,12,16,7,17)}),w(10,a=>{a.fillStyle=i,a.font=`400 7px ${d}`,a.textAlign="center";for(let z=0;z<12;z+=1)a.fillText(o.format(90+z*233),50,12+z*10.5)});let ut=ue(h);ut.anisotropy=4;let I=document.createElement("canvas");I.width=512,I.height=2048;let et=I.getContext("2d");et.fillStyle="#fff",et.fillRect(0,0,512,2048),et.direction=r?"rtl":"ltr",et.textBaseline="middle";let L=r?468:44;et.textAlign="start";let k=[];c.forEach((a,z)=>{k.push({text:a,big:!0}),u[z%Math.max(1,u.length)]&&k.push({text:u[z%u.length],big:!1})});let Y=2048/Math.max(1,k.length);k.forEach((a,z)=>{et.fillStyle=a.big?"#1f2a24":"#3d4c44",et.font=a.big?`700 44px ${v}`:`400 25px ${r?v:d}`,et.fillText(a.text,L,Y*(z+.5),424)});let ot=ue(I);return ot.anisotropy=4,{texture:ut,printTexture:ot,services:c,phrases:u,words:p,display:v,mono:d,digits:a=>o.format(a),cell(a){let z=Math.max(0,Cs.indexOf(a)),q=z%Xt,C=Math.floor(z/Xt);return[q/Xt,1-(C+1)/Xt,1/Xt,1/Xt]},title(a){return document.querySelector(`[data-shot="${a}"] .card__title, [data-shot="${a}"] .step__title`)?.textContent.trim()??""},canvas(a,z,q,C){let j=document.createElement("canvas");j.width=a,j.height=z;let O=j.getContext("2d");return O.direction=r?"rtl":"ltr",q(O,a,z),ue(j,C)}}}var Ko={L:{pixelCap:55e4,draws:28,tris:7e4,sheets:420,sheetSeg:2,stacks:180,dossiers:120,boxes:1400,weather:140,uxGrid:[32,45],shadowSize:1024,shadowTaps:1,atlas:512,dust:60,allReflections:!1,film:!1},M:{pixelCap:13e5,draws:45,tris:22e4,sheets:1100,sheetSeg:3,stacks:360,dossiers:240,boxes:3e3,weather:320,uxGrid:[48,68],shadowSize:1024,shadowTaps:4,atlas:1024,dust:150,allReflections:!0,film:!1},H:{pixelCap:28e5,draws:70,tris:6e5,sheets:2400,sheetSeg:4,stacks:720,dossiers:480,boxes:6e3,weather:700,uxGrid:[64,90],shadowSize:2048,shadowTaps:8,atlas:2048,dust:300,allReflections:!0,film:!0}};var ke={clip:[.3,40],fog:26},pe=[{id:"hero",act:1,set:"desk",subject:{radius:.62,center:[0,.1,-.4]},pose:{lens:24,elevation:-15,portrait:{elevation:-28},pushIn:.15,...ke},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:30},{id:"drop",act:1,set:"desk",idleHz:0,budget:{draws:12,tris:{L:3e4,M:8e4,H:2e5}},authored(l,n){let r=n.W/n.H,e=n.portrait?20:15.6,p=Math.tan(e*Math.PI/360),u=.24/(n.portrait?.92:.36)/(2*p*r),v=nt.floorY;return[{t:.18,position:[0,-.03,u],elevation:-1,lens:20,clip:[.1,30],fog:26},{t:.48,position:[0,v*.72,u*.96],elevation:-2,lens:20,clip:[.1,30],fog:26},{t:.64,position:[0,.28,.5],elevation:-84,lens:36,clip:[.05,20],fog:20},{t:.84,position:[0,v-.25,.1],elevation:-90,lens:40,clip:[.04,20],fog:16},{t:.93,position:[0,nt.slabBottom+.1,.5],elevation:-90,lens:24,clip:[.05,60],fog:40}]}},{id:"svc.head",act:2,set:"archive",pose:{lens:[24,62],elevation:-90,clip:[.2,90],fog:72},budget:{draws:8,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0,holdKnots:()=>[{t:0,position:[0,nt.slabBottom-.6,1.5],lens:24},{t:1,position:[0,nt.slabBottom-5.2,1.5],lens:62}]},{id:"svc.web",act:2,set:"archive",floor:"first",subject:{radius:1.3,center:[0,0,0]},pose:{lens:32,bearing:12,elevation:-6,drift:[0,-.15,-.5],clip:[.3,80],fog:62},budget:{draws:11,tris:{L:25e3,M:7e4,H:16e4}},idleHz:0,stripYaw:0},{id:"svc.apps",act:2,set:"archive",floor:"locked",subject:{radius:1.1,center:[0,0,0]},pose:{lens:32,bearing:[-12,13],elevation:-4,clip:[.3,80],fog:62},budget:{draws:9,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"svc.api",act:2,set:"archive",floor:"locked",subject:{radius:1.75,center:[0,.35,.3]},pose:{lens:32,bearing:-18,elevation:14,drift:[0,-.2,-.3],clip:[.3,80],fog:60},budget:{draws:14,tris:{L:3e4,M:8e4,H:18e4}},idleHz:0},{id:"svc.rescue",act:2,set:"archive",floor:"locked",subject:{radius:1.2,center:[0,0,0]},pose:{lens:30,bearing:10,elevation:-8,roll:[0,7],clip:[.3,80],fog:58},budget:{draws:12,tris:{L:24e3,M:7e4,H:16e4}},idleHz:0},{id:"svc.ux",act:2,set:"archive",floor:"locked",subject:{radius:1.5,center:[0,0,0]},pose:{lens:28,elevation:0,clip:[.3,80],fog:56},budget:{draws:8,tris:{L:24e3,M:6e4,H:14e4}},idleHz:0},{id:"svc.auto",act:2,set:"archive",floor:"locked",subject:{radius:1.4,center:[0,0,0]},pose:{lens:30,bearing:90,elevation:-3,clip:[.3,80],fog:54},budget:{draws:9,tris:{L:22e3,M:6e4,H:14e4}},idleHz:30},{id:"process.head",act:3,set:"archive",floor:{clear:9},subject:{radius:4,center:[0,0,0]},pose:{lens:50,elevation:-90,shift:[0,0,1.1],clip:[.05,90],fog:70},budget:{draws:10,tris:{L:26e3,M:7e4,H:16e4}},idleHz:0,exitKnots(l,n,r){let e=r.floorY;return[{t:.55,position:[.16,e+3.2,.18],elevation:-90,lens:44,clip:[.05,70],fog:60},{t:.74,position:[.16,e-.9,.12],elevation:-90,lens:44,clip:[.05,70],fog:60}]}},{id:"step.talk",act:3,set:"archive",floor:{clear:5},subject:{radius:1.5,center:[0,.1,0]},pose:{lens:28,bearing:8,elevation:-10,clip:[.2,70],fog:42},budget:{draws:10,tris:{L:25e3,M:7e4,H:16e4}},idleHz:0},{id:"step.scope",act:3,set:"archive",floor:"locked",subject:{radius:1.75,center:[0,0,0]},pose:{lens:28,bearing:-6,elevation:-24,clip:[.2,70],fog:40},budget:{draws:8,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"step.build",act:3,set:"archive",floor:"locked",subject:{radius:1.25,center:[0,0,.3]},pose:{lens:28,bearing:[20,-10],elevation:-8,clip:[.2,70],fog:40},budget:{draws:9,tris:{L:26e3,M:7e4,H:16e4}},idleHz:0},{id:"step.ship",act:3,set:"archive",floor:"locked",subject:{radius:1.6,center:[0,-.2,0]},pose:{lens:28,elevation:[-12,-74],clip:[.2,70],fog:40},budget:{draws:7,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"fall",act:3,set:"none",idleHz:0,budget:{draws:4,tris:{L:3e3,M:6e3,H:12e3}},authored(l){let n=l["step.ship"],r=l["why.q"],e=n.floorY-2,p=r.floorY+r.d+1.6;return[{t:.2,position:[.2,e,.2],elevation:-90,lens:70,clip:[.05,60],fog:44},{t:.86,position:[.05,p+1.2,.06],elevation:-90,lens:70,clip:[.05,40],fog:34}]}},{id:"why.q",act:4,set:"desk",desk:!0,floor:{clear:26},subject:{radius:.85,center:[0,0,-.4]},pose:{lens:40,elevation:-90,...ke},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:30},{id:"why.list",act:4,set:"desk",desk:!0,subject:{radius:.8,center:[0,0,-.4]},pose:{lens:40,elevation:-90,...ke},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:0},{id:"why.stats",act:4,set:"desk",desk:!0,subject:{radius:.7,center:[0,0,-.4]},pose:{lens:36,elevation:-70,...ke},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0},{id:"cta",act:4,set:"desk",desk:!0,subject:{radius:.55,center:[0,0,-.4]},pose:{lens:40,elevation:-90,clip:[.02,12],fog:26},solve(l,n){let{W:r,H:e,portrait:p}=n,c=l.shot.caption,u=l.fov*Math.PI/180,v=Math.tan(u/2)*(r/e),d=.072,o=.148;if(p)l.d=.0775*.965/(2*v),l.ox=0,l.oy=0;else{let s=Math.max((c.w+32)/o,(c.h+32)/d);l.d=r/s/(2*v),l.ox=r/2-(c.x+c.w/2),l.oy=e/2-(c.y+c.h/2)}},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0},{id:"coda",act:4,set:"desk",desk:!0,subject:{radius:.62,center:[0,.1,-.4]},pose:{lens:24,elevation:-15,...ke},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0}],ts={hero:()=>import("./chunk-FQ644PTX.js"),drop:()=>import("./chunk-FL6CESEL.js"),"svc.head":()=>import("./chunk-RSFST4BX.js"),"svc.web":()=>import("./chunk-BU75ANWF.js"),"svc.apps":()=>import("./chunk-SPG4BJQV.js"),"svc.api":()=>import("./chunk-NAYGZMI2.js"),"svc.rescue":()=>import("./chunk-4WBBAYPS.js"),"svc.ux":()=>import("./chunk-2ALBFH2P.js"),"svc.auto":()=>import("./chunk-ZJHTRPCR.js"),"process.head":()=>import("./chunk-QILWQIDR.js"),"step.talk":()=>import("./chunk-6NUKT6FF.js"),"step.scope":()=>import("./chunk-4GXKCHKF.js"),"step.build":()=>import("./chunk-O2FCLXP4.js"),"step.ship":()=>import("./chunk-R65BVCNZ.js"),fall:()=>import("./chunk-DJNW65WT.js"),"why.q":()=>import("./chunk-CQ55MCPA.js"),"why.list":()=>import("./chunk-GCBXT2J2.js"),"why.stats":()=>import("./chunk-PCMLZPEU.js"),cta:()=>import("./chunk-TYQRNBVE.js"),coda:()=>import("./chunk-F3VOJLJZ.js")};var qt=nt.archiveHalf,de=nt.galleryH,mt=11.4;function es(l,n){return l.canvas(512,512,e=>{let p=Gt(`shelf-${n}`);e.fillStyle=n===0?"#2a2520":"#0a0c11",e.fillRect(0,0,512,512);let c=6,u=512/c;for(let v=0;v<c;v+=1){let d=0;for(;d<512;){let o=8+p()*22,s=u*(.74+p()*.22);if(n===0){let h=p(),f=.5+p()*.5,m=h<.6?[176,136,86]:h<.8?[214,202,170]:h<.92?[96,110,128]:[150,70,60];e.fillStyle=`rgb(${m[0]*f},${m[1]*f},${m[2]*f})`,e.save(),e.translate(d+o/2,u*(v+1)-4),e.rotate(p()>.86?(p()-.5)*.5:0),e.fillRect(-o/2,-s,o-1.5,s),e.fillStyle="rgba(255,255,255,.35)",e.fillRect(-o/2+o*.25,-s*.82,o*.4,s*.2),e.restore()}else{let h=12+p()*10;e.fillStyle=`rgb(${h},${h+2},${h+8})`,e.fillRect(d,u*(v+1)-s-4,o-2,s),p()>.72&&(e.fillStyle=p()>.8?"#a48bff":"#5dffde",e.fillRect(d+o/2-1,u*(v+1)-s,1.5,s-8))}d+=o}e.fillStyle=n===0?"#141210":"#1c2027",e.fillRect(0,u*(v+1)-4,512,4)}},{repeat:!0})}function os({programs:l,text:n,q:r,dir:e}){let p=new te;p.name="archive";let c={uTurn:{value:0},uOrderY:{value:new re(nt.slabBottom,-60)},uGalleryH:{value:de}},u=40,v=new Pt(qt*2,de*u,4,u),d=v.attributes.uv;for(let F=0;F<d.count;F+=1)d.setXY(F,d.getX(F)*8,d.getY(F)*u);let o=[[0,0,-qt,0],[0,0,qt,Math.PI],[-qt,0,0,Math.PI/2],[qt,0,0,-Math.PI/2]].map(([F,_,U,tt])=>{let M=v.clone();return M.rotateY(tt),M.translate(F,_,U),M}),s=Ct(o.map(F=>F.toNonIndexed())),h=es(n,0);h.anisotropy=8;let f=es(n,1);f.anisotropy=8;let m=l.paper({atlas:{value:h},ambient:.03,boost:.62,deform:{pars:"uniform float uTurn, uGalleryH; out float vTurn, vLit;",fpars:"uniform sampler2D uShelf2; in float vTurn, vLit;",world:`
        wp.y += floor(uCamY / uGalleryH) * uGalleryH;
        {
          float along = abs(wn.z) > 0.5 ? wp.x : wp.z;
          vTurn = smoothstep(0.0, 1.0, uTurn * 2.2 - (along * uInline / 14.0 * 0.5 + 0.5) - 0.1);
        }
        vLit = uTurn;`,frag:"c = mix(c, texture(uShelf2, vUv).rgb * (vec3(0.42) + vHouse * 0.7), vTurn);",uniforms:{uTurn:c.uTurn,uGalleryH:c.uGalleryH,uShelf2:{value:f}}}}),i=new G(s,m);i.frustumCulled=!1,p.add(i);let g=[.26,.25,.25],w=F=>`wp.y -= floor((iPos.y - uCamY) / ${F.toFixed(2)} + 0.5) * ${F.toFixed(2)};`,S=Wt(new At(1,1,1)),b=18,A=[];for(let F=0;F<b;F+=1){let _=-F*de;for(let[U,tt]of[[1,0],[-1,0],[0,1],[0,-1]]){let M=mt*2+6,Z=(qt+mt)/2;A.push({pos:[U*Z,_-.1,tt*Z],scale:U?[qt-mt,.2,M]:[M,.2,qt-mt],tint:g}),A.push({pos:[U*mt,_+.95,tt*mt],scale:U?[.06,.06,M]:[M,.06,.06],tint:[.55,.52,.48]}),A.push({pos:[U*mt,_+.55,tt*mt],scale:U?[.03,.03,M]:[M,.03,.03],tint:[.4,.38,.36]})}}let B=new G(Rt(S,A.length,(F,_)=>{let U=A[F];_.pos=U.pos,_.scale=U.scale,_.tint=U.tint}),l.solid({ambient:.05,defines:{INSTANCED:1},deform:{world:w(de*b)}}));B.frustumCulled=!1,p.add(B);let $=[];for(let F of[-1,1])for(let _ of[-mt,-mt/3,mt/3,mt])$.push([F*mt,_]),$.push([_,F*mt]);let ut=new G(Rt(Wt(new At(.34,1,.34,1,44,1)),$.length,(F,_)=>{_.pos=[$[F][0],0,$[F][1]],_.scale=[1,180,1],_.tint=[.36,.35,.34]}),l.solid({ambient:.05,defines:{INSTANCED:1},deform:{world:"wp.y += uCamY;"}}));ut.frustumCulled=!1,p.add(ut);let I=Gt("archive"),L=Math.max(3,Math.round(r.boxes/460))*de,k=Wt(new At(1,1,.8)),Y=k.attributes.normal;for(let F=0;F<Y.count;F+=1)Y.getZ(F)<-.5&&k.attributes.aColor.setXYZ(F,0,0,0);let ot=Ct([k,Q(.05,.86,.01,{at:[0,0,-.41],color:[.36,1,.87],mat:2})]),a=r.boxes,z=new G(Rt(ot,a,(F,_)=>{let U=F%4,tt=(I()*2-1)*(qt-1),M=-I()*L,Z=(I()-.5)*.5,ht=qt-.3-I()*2.2,bt=.5+I()*.5,Bt=.55+I()*.4;U===0?(_.pos=[tt,M,-ht],Ut(0,0,Z,_.quat)):U===1?(_.pos=[tt,M,ht],Ut(0,Math.PI,Z,_.quat)):U===2?(_.pos=[-ht,M,tt],Ut(0,Math.PI/2,Z,_.quat)):(_.pos=[ht,M,tt],Ut(0,-Math.PI/2,Z,_.quat)),_.scale=[bt,Bt,.4];let dt=.62+I()*.38,vt=I();_.tint=vt<.62?[.74*dt,.56*dt,.33*dt]:vt<.86?[.86*dt,.8*dt,.66*dt]:vt<.95?[.38*dt,.44*dt,.52*dt]:[.6*dt,.24*dt,.2*dt],_.seed=I()}),l.solid({ambient:.05,defines:{INSTANCED:1},deform:{pars:"uniform float uTurn; uniform vec2 uOrderY; out float vBack;",local:`
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
            float shift = floor((iPos.y - uCamY) / ${L.toFixed(2)} + 0.5) * ${L.toFixed(2)};
            /* Files sink into the wall at the edges of the wrap, so they never pop. */
            float edge = smoothstep(${(L/2).toFixed(2)}, ${(L*.36).toFixed(2)}, abs(iPos.y - shift - uCamY));
            wp.y -= shift;
            float order = clamp((uOrderY.x - wp.y) / (uOrderY.x - uOrderY.y), 0.0, 1.0);
            if (aColor.a < 1.5) { tint = mix(mix(tint, vec3(0.1, 0.11, 0.13), order * 0.55), vec3(0.075, 0.08, 0.1), vBack); }
            vec3 towardsWall = normalize(vec3(sign(iPos.x) * step(10.0, abs(iPos.x)), 0.0, sign(iPos.z) * step(10.0, abs(iPos.z))) + vec3(0.0001));
            wp += towardsWall * (1.0 - edge) * 2.8;
          }`,uniforms:{uTurn:c.uTurn,uOrderY:c.uOrderY}}}));z.frustumCulled=!1,p.add(z);let q=new Pt(1,1,1,3),C=["ledger","invoice","lines","sheet","memo","receipt"],j=Math.min(180,Math.floor(r.weather*.75)),O=new G(Rt(q,j,(F,_)=>{let U=F%4,tt=(I()*2-1)*(mt-.5),M=-Math.floor(I()*18)*de+.3;_.pos=U===0?[tt,M,-mt]:U===1?[tt,M,mt]:U===2?[-mt,M,tt]:[mt,M,tt],Ut(0,U<2?0:Math.PI/2,(I()-.5)*.2,_.quat);let Z=.55+I()*.6;_.scale=[Z,Z*1.42,1],_.cell=n.cell(C[Math.floor(I()*C.length)]);let ht=.75+I()*.25;_.tint=[ht,ht,ht*.95]}),l.paper({ambient:.05,defines:{INSTANCED:1},deform:{world:w(de*18)}}));O.frustumCulled=!1,p.add(O);let X=new Pt(.34,.46),K=new G(Rt(X,r.weather,(F,_)=>{_.pos=[(I()*2-1)*10.5,-I()*24,(I()*2-1)*10.5],_.cell=n.cell(C[Math.floor(I()*C.length)]);let U=.78+I()*.22;_.tint=[U,U,U*.95],_.seed=I()}),l.paper({ambient:.08,defines:{INSTANCED:1},deform:{pars:"uniform float uTurn;",local:`{
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
        }`,uniforms:{uTurn:c.uTurn}}}));K.frustumCulled=!1,p.add(K);let pt=a,ft=r.weather;return{group:p,u:c,*build(){yield},setRange(F,_){c.uOrderY.value.set(F,_)},setDensity(F){z.geometry.instanceCount=Math.floor(pt*F),K.geometry.instanceCount=Math.floor(ft*F)},setWeather(F){K.visible=F,O.visible=F}}}var Ue={pars:"in float iClear; uniform float uClear;",world:`
    float clearF = clamp((uClear - iClear - seed * 0.34) / 0.62, 0.0, 1.0);
    if (clearF > 0.0) {
      clearF *= clearF;
      vec3 away = wp - (uLampOrigin + vec3(0.0, 0.0, -0.4));
      away.y = 0.0;
      wp += normalize(away + vec3(0.001)) * clearF * 2.4;
      wp.y += clearF * 0.9 - clearF * clearF * 1.9;
    }`};function zs(){let r=document.createElement("canvas");r.width=1024,r.height=512;let e=r.getContext("2d");e.fillStyle="#7b4c2b",e.fillRect(0,0,1024,512);let p=Gt("walnut");for(let c=0;c<520;c+=1){let u=p()*512,v=p()>.45;e.strokeStyle=v?`rgba(44,22,10,${.05+p()*.2})`:`rgba(180,120,74,${.03+p()*.1})`,e.lineWidth=.5+p()*2.4,e.beginPath(),e.moveTo(0,u);let d=p()*1.2;for(let o=0;o<=1024;o+=48)u+=(p()-.5)*4*d,e.lineTo(o,u);e.stroke()}for(let c=0;c<3;c+=1){let u=p()*1024,v=p()*512;for(let d=8;d<90;d+=5+p()*5)e.strokeStyle=`rgba(40,20,9,${.1+p()*.09})`,e.lineWidth=.8,e.beginPath(),e.ellipse(u,v,d*3.2,d*.8,0,0,Math.PI*2),e.stroke()}return ue(r)}function ss({programs:l,shared:n,text:r,q:e,dir:p}){let c=x=>x*p,u=new te;u.name="desk";let v={uClear:{value:0},uRing:{value:0},uRingOn:{value:0}},d=new rt(c(.27),.62,-.5),o=[c(-.02),-.38],s=[o[0],o[1]],h=new bo(e.shadowSize,e.shadowSize,{depthTexture:new To(e.shadowSize,e.shadowSize,mo)});h.depthTexture.compareFunction=go,h.depthTexture.minFilter=ve,h.depthTexture.magFilter=ve;let f=new Ze,m={uMap:{value:zs()},uShadow:{value:h.depthTexture},uClear:v.uClear,uDawnStripes:{value:1},uAmbient:{value:.045},uShadowTaps:{value:e.shadowTaps},uGloss:{value:1},uRings:{value:[1,0,0,0]},uRingCentreA:{value:[c(-.2),-.21,.046]},uRingCentreB:{value:[c(-.112),-.21,.046]},uTint:{value:[1,1,1]},uLampMatrix:{value:f}},i=new G(new At(1.6,.045,.8),l.wood({uniforms:m}));i.position.set(0,-.0225,-.4),u.add(i);let g={...m,uTint:{value:[.34,.31,.28]},uGloss:{value:0},uRings:{value:[0,0,0,0]}},w=.5,S=new G(Ct([[0,-w-2.5,10,5],[0,w+2.5,10,5],[-w-2.5,0,5,w*2],[w+2.5,0,5,w*2]].map(([x,E,P,W])=>{let D=new At(P,.1,W);return D.translate(x,nt.floorY-.05,E),D})),l.wood({uniforms:g}));u.add(S);let b=[c(-.52),0,-.56],A=[c(-.156),0,-.21],B=[c(.66),.88,-.95],$=[c(.31),0,-.64],ut=[c(.62),0,-.62],I=[c(.72),.42,-.62],et=[c(.27),.72,-.5],L=[.24,.14,.08],k=Ct([Q(.07,.75,.07,{at:[-.74,-.4,-.06],color:L}),Q(.07,.75,.07,{at:[.74,-.4,-.06],color:L}),Q(.07,.75,.07,{at:[-.74,-.4,-.74],color:L}),Q(.07,.75,.07,{at:[.74,-.4,-.74],color:L}),Q(1.42,.09,.02,{at:[0,-.1,-.03],color:L}),Q(.1,.012,.018,{at:[c(.42),-.1,-.014],color:[.76,.58,.3],mat:1}),Q(.1,.012,.018,{at:[c(-.42),-.1,-.014],color:[.76,.58,.3],mat:1}),...Wo(B),..._o(ut,I,et,p),...No(A,p),Q(.07,.006,.07,{at:[c(-.02),.003,-.7],color:[.25,.25,.27]}),Wt(new Ke(.002,.003,.17,6),{at:[c(-.02),.09,-.7],color:[.7,.7,.72]})]),Y=new G(k,l.solid({ambient:.17,house:0}));u.add(Y);let ot=new G(Ct([Q(12,7,.1,{at:[0,1.6,-1.05],color:[.62,.6,.6]}),Q(12,.12,.03,{at:[0,nt.floorY+.06,-.99],color:[.2,.18,.17]}),Q(1.62,.04,.04,{at:[c(-.46),1.54,-.97],color:[.55,.52,.5]}),Q(1.62,.04,.04,{at:[c(-.46),.5,-.97],color:[.55,.52,.5]}),Q(.04,1.08,.04,{at:[c(-1.27),1.02,-.97],color:[.55,.52,.5]}),Q(.04,1.08,.04,{at:[c(.35),1.02,-.97],color:[.55,.52,.5]})]),l.solid({ambient:.2,house:0}));u.add(ot);let a=new G(Ct(Oo($,p)),Y.material),z=to([[b[0]-.11*p,.05,b[2]+.03],[b[0]-.17*p,.03,b[2]+.06],[b[0]-.2*p,.012,b[2]+.13],[b[0]-.19*p,.05,b[2]-.03],[b[0]-.13*p,.11,b[2]-.08]],24),q=l.solid({house:0,deform:Fo()}),C=new G(Ct([...Do(b),z]),q);u.add(a,C);let j={x:b[0],y:.135,z:b[2]-.08},O=new G(Ho(),q);O.name="handset",O.position.set(j.x,j.y,j.z),u.add(O);let X=new G(to([[0,0,0],[0,-.2,0],[0,-.4,.01],[0,-.6,0]],22,.008),q);X.visible=!1,u.add(X);let K=Y.material,pt=new G(Q(.012,.095,.004,{at:[0,.042,0],color:[.1,.1,.1]}),K),ft=new G(Q(.007,.14,.004,{at:[0,.064,0],color:[.1,.1,.1]}),K);pt.position.set(B[0],B[1],B[2]+.026),ft.position.set(B[0],B[1],B[2]+.03),u.add(pt,ft);let F=c(-.46),_=new G(Wt(new Pt(1.58,1),{at:[F,1.02,-.985],color:[.075,.11,.21],mat:2}),l.solid({house:0,deform:{fpars:"uniform highp float uDawn;",frag:"c = mix(c, mix(vec3(0.365, 1.0, 0.87), vec3(0.643, 0.545, 1.0), clamp((vLampP.x + 0.5) * 0.7, 0.0, 1.0)), uDawn);"}}));u.add(_);let U=Q(1.58,.042,.004,{color:[.72,.72,.7]});U.deleteAttribute("uv");let tt=new G(Rt(U,24,(x,E)=>{E.pos=[F,.54+(x+.5)*.0405,-.965]}),l.solid({house:0,ambient:.14,defines:{INSTANCED:1},deform:{local:`{
          float a = mix(0.86, 1.32, uDawn);
          float ca = cos(a), sa = sin(a);
          p = vec3(p.x, p.y * ca - p.z * sa, p.y * sa + p.z * ca);
          n = vec3(n.x, n.y * ca - n.z * sa, n.y * sa + n.z * ca);
        }`}}));tt.frustumCulled=!1,u.add(tt);let M=Gt("desk"),Z=[{x:-.66,z:-.3,h:.34},{x:-.58,z:-.68,h:.44},{x:-.27,z:-.67,h:.27},{x:.66,z:-.22,h:.2},{x:-.36,z:-.28,h:.13},{x:-.14,z:-.7,h:.15},{x:.66,z:-.42,h:.1},{x:-.7,z:-.08,h:.09}],ht=[],bt=new Map;for(let x of Z){let E=0,P=0,W=0;for(;E<x.h&&ht.length<e.stacks;){let D=.01+M()*.022;P+=(M()-.5)*.012,W+=(M()-.5)*.012,ht.push({x:x.x+P,y:E+D/2,z:x.z+W,h:D,yaw:(M()-.5)*.34}),E+=D}bt.set(x,{y:E,x:x.x+P,z:x.z+W})}let Bt=new At(1,1,1);Bt.deleteAttribute("uv");let dt=Wt(Bt),vt=new G(Rt(dt,ht.length,(x,E)=>{let P=ht[x];E.pos=[c(P.x),P.y,P.z],Ut(0,P.yaw,0,E.quat),E.scale=[.21+M()*.03,P.h,.297+M()*.03];let W=.74+M()*.26;E.tint=M()>.86?[W,W*.84,W*.72]:[W,W,W*.95],E.extra.iClear=2},{iClear:1}),l.solid({house:0,ambient:.13,defines:{INSTANCED:1},deform:Ue}));vt.frustumCulled=!1,u.add(vt);let Qt=[{x:.5,z:-.14,n:.3},{x:-.5,z:-.2,n:.3},{x:-.3,z:-.5,n:.26}],Mt=Wt(new At(1,1,1)),at=[];for(let x of Qt){let E=Math.floor(e.dossiers*x.n*.5),P=0;for(let W=0;W<E&&P<.2;W+=1){let D=.016+M()*.014,lt=(M()-.5)*.5,gt=.7+M()*.3;at.push({x:x.x+(M()-.5)*.02,y:P+D/2,z:x.z+(M()-.5)*.02,yaw:lt,sx:.24,sy:D,sz:.33,tint:[.86*gt,.7*gt,.42*gt]}),at.push({x:x.x,y:P+D+6e-4,z:x.z,yaw:lt,sx:.016,sy:.0015,sz:.335,tint:[.92,.9,.84]}),P+=D}}let zt=new G(Rt(Mt,at.length,(x,E)=>{let P=at[x];E.pos=[c(P.x),P.y,P.z],Ut(0,P.yaw,0,E.quat),E.scale=[P.sx,P.sy,P.sz],E.tint=P.tint,E.extra.iClear=2},{iClear:1}),l.solid({house:0,ambient:.13,defines:{INSTANCED:1},deform:Ue}));zt.frustumCulled=!1,u.add(zt);let xe=new Pt(1,1,e.sheetSeg,e.sheetSeg);xe.rotateX(-Math.PI/2);let _e=["invoice","ledger","quote","receipt","lines","sheet","memo","invoice","carbon","slip"],It=[],be=Math.min(30,Math.floor(e.sheets*.1));for(let x=0;x<be;x+=1){let E=.36+M()*.46,P=M()*Math.PI*2,W=Math.cos(P)*E*1.08,D=-.4+Math.sin(P)*E*.42;It.push({x:W,z:D,y:.0012+M()*.012,yaw:M()*6.28,kind:0,clear:M()>.4?0:1})}for(let[x,E]of bt){let P=Math.floor(e.sheets*.5/Z.length*(.5+x.h*2));for(let W=0;W<P;W+=1)It.push({x:E.x+(M()-.5)*.06,z:E.z+(M()-.5)*.06,y:E.y+W*.0015,yaw:(M()-.5)*.7,kind:1,clear:2})}let Jt=Math.min(8,Math.floor(e.sheets*.02));for(let x=0;x<Jt;x+=1){let E=x%2===0?1:-1;It.push({x:E*(.24+M()*.46),z:-.08+M()*.05,y:.002+M()*.004,yaw:(M()-.5)*.3,kind:2,clear:0})}let Me=Math.max(0,Math.floor(e.sheets*.24));for(let x=0;x<Me;x+=1){let E=M()*Math.PI*2,P=.7+M()*1.5,W=Math.cos(E)*P*1.2,D=.1+Math.abs(Math.sin(E))*P*.7;Math.hypot(W,D)>.75&&It.push({x:W,z:D,y:nt.floorY+.002+M()*.004,yaw:M()*6.28,kind:0,clear:2})}for(let x=0;x<8;x+=1)It.push({x:-.02+(M()-.5)*.015,z:-.7+(M()-.5)*.015,y:.02+x*.012,yaw:M()*6.28,kind:3,clear:2});let ee=l.paper({house:0,ambient:.05,defines:{INSTANCED:1},deform:{pars:`${Ue.pars} in float iCurl;`,local:`
        float cx = uv.x - 0.5, cz = uv.y - 0.5;
        p.y += (cx * cx * 0.03 + cz * cz * 0.05) * iCurl;
        /* A sheet by the edge lifts a little in the draught from the printer. */
        p.y += sin(uTime * 2.6 + seed * 37.0) * 0.0012 * max(iCurl - 0.8, 0.0) * (cz + 0.5);
        n.xz -= vec2(cx * 0.06, cz * 0.1) * iCurl;`,world:Ue.world}}),Zt=new G(Rt(xe,It.length,(x,E)=>{let P=It[x],W=P.kind===3;E.pos=[c(P.x),P.y,P.z],Ut(0,P.yaw,0,E.quat),E.scale=W?[.08,1,.16]:[.21,1,.297];let D=W?"receipt":_e[Math.floor(M()*_e.length)];E.cell=r.cell(D);let lt=.82+M()*.18;E.tint=D==="carbon"?[.98,.72*lt,.72*lt]:D==="slip"?[.99,.9*lt,.62*lt]:[lt,lt,lt*.96],E.extra.iClear=P.clear,E.extra.iCurl=P.kind===2?1.6:.5+M()},{iClear:1,iCurl:1}),ee);Zt.frustumCulled=!1,u.add(Zt);let oe=new G(new Pt(.34,.34),l.glow({color:[1,.74,.46],alpha:.5,defines:{BILLBOARD:1}}));oe.position.set(d.x,d.y+.03,d.z),oe.frustumCulled=!1,u.add(oe);let Se=new G(Rt(new Pt(1,1),2,(x,E)=>{E.pos=x===0?[c(.34),.42,-.985]:[c(-.46),.95,-.98],E.scale=x===0?[2.6,1.9,1]:[3.2,2.2,1],E.tint=x===0?[.13,.086,.047]:[.028,.038,.067]}),l.glow({defines:{INSTANCED:1}}));Se.frustumCulled=!1,u.add(Se);let yt=new Ke(.05,.54,.86,26,1,!0),st=new G(yt,l.glow({color:[1,.72,.42],alpha:.13,shape:5,deform:{frag:"a = vUv.y * vUv.y; { float f = abs(dot(normalize(vN), normalize(vV))); a *= f * f; }"}}));st.frustumCulled=!1,u.add(st);let jt=new Pt(.009,.009),H=new G(Rt(jt,e.dust,(x,E)=>{let P=Math.sqrt(M()),W=M()*Math.PI*2,D=P*.34;E.pos=[d.x+(s[0]-d.x)*P+Math.cos(W)*D,d.y*(1-P)+.04,d.z+(s[1]-d.z)*P+Math.sin(W)*D],E.tint=[1,.82,.6]}),l.glow({alpha:.42,defines:{INSTANCED:1,BILLBOARD:1},deform:{world:"wp += vec3(sin(uTime * 0.21 + seed * 40.0), sin(uTime * 0.17 + seed * 90.0), cos(uTime * 0.19 + seed * 70.0)) * 0.03;"}}));H.frustumCulled=!1,u.add(H);let wt=d.clone(),_t=new He(122,1,.05,2.2),se=new rt(0,0,-1),Dt=new rt,Lt={x:0,y:0,z:0},Ht=0,ne=0,fe=new Ze().set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.4975,0,0,0,1),he=Zt.geometry.instanceCount,Ee=vt.geometry.instanceCount,Le=zt.geometry.instanceCount,me=x=>{pt.rotation.z=-(x%12/12)*Math.PI*2,ft.rotation.z=-(x%1)*Math.PI*2};return me(3.2),{group:u,u:v,setClock:me,lampPos:wt,pool:o,*build(){yield},setActPositions(x){Lt=x},setPhone(x){x.position.set(0,.0043,-.4),x.visible=!1,u.add(x),this.phone=x},setAct(x){x===4?u.position.set(Lt.x,Lt.y,Lt.z):u.position.set(0,0,0)},setSpot(x,E){s[0]=x,s[1]=E},resetSpot(){s[0]=o[0],s[1]=o[1]},setRing(x){Ht=x},setOffHook(x){ne=x},setShadowTaps(x){m.uShadowTaps.value=x},setDensity(x){Zt.geometry.instanceCount=Math.floor(he*x),vt.geometry.instanceCount=Math.floor(Ee*x),zt.geometry.instanceCount=Math.floor(Le*x)},setExtras(x){H.visible=x,st.visible=x},bakeShadow(x){let E=[i,S,oe,st,H,_,tt,ot,Se,X];this.phone&&E.push(this.phone);let P=E.map(it=>it.visible),W=u.position.clone(),D=v.uClear.value,lt=u.visible;u.visible=!0,E.forEach(it=>{it.visible=!1}),u.position.set(0,0,0),this.setClear(0),O.position.set(j.x,j.y,j.z),O.rotation.set(0,0,0),O.visible=!0,u.updateMatrixWorld(!0),n.uLampOrigin.value.set(0,0,0),_t.position.copy(wt),_t.up.copy(se),_t.lookAt(c(-.02),0,-.38),_t.updateMatrixWorld(),_t.updateProjectionMatrix();let gt=x.getRenderTarget();x.setRenderTarget(h),x.clear(),x.render(u,_t),x.setRenderTarget(gt),f.multiplyMatrices(fe,_t.projectionMatrix).multiply(_t.matrixWorldInverse),E.forEach((it,Yt)=>{it.visible=P[Yt]}),u.position.copy(W),u.visible=lt,this.setClear(D),u.updateMatrixWorld(!0)},setClear(x){v.uClear.value=x,m.uClear.value=x;let E=(W,D,lt)=>{let gt=Ro((x-D)/.7),it=gt*gt;W.position.set(lt*it*2.2*p,it*.5-it*it*1.6,-it*.2),W.rotation.z=-it*1.2*lt*p,W.visible=gt<1};E(C,1,-1),E(a,2,1);let P=x>=3;Zt.visible=!P,vt.visible=!P,zt.visible=!P},update(x,E){let P=E%3,W=P<.42||P>.62&&P<1.04?1:0,D=Math.abs(Math.sin(E*37.7))*.006*W*Ht,lt=Math.sin(E*75)*.012*W*Ht,gt=ce(0,.5,ne),it=ce(.42,1,ne),Yt=j.x+(-.3*p-j.x)*gt,Te=j.z+(.1-j.z)*gt;O.position.set(Yt+C.position.x,j.y+D-it*.62+C.position.y,Te+C.position.z),O.rotation.set(it*1.3,0,gt*.9*p+lt+C.rotation.z),O.visible=C.visible,X.visible=it>.02,X.position.set(Yt,0,Te-.02),X.scale.y=Math.max(.01,it);let kt=s[0]+(x.pointer===1?x.px*.2:0),Tt=s[1]+(x.pointer===1?x.py*.12:0);Dt.set(kt-wt.x,-wt.y,Tt-wt.z).normalize(),n.uLampDir.value.copy(Dt),n.uLampPos.value.copy(wt),n.uLampCone.value.set(.6,.93),st.position.set(wt.x+Dt.x*.43,wt.y+Dt.y*.43,wt.z+Dt.z*.43),st.quaternion.setFromUnitVectors(Is,Dt.negate())}}}var Is=new rt(0,1,0);var Fe=new rt;function Ft(l,n,r,e,p,c){let u=2*Math.PI*p/4,v=Math.max(c-2*p,0),d=Math.PI/4;Fe.copy(n),Fe[e]=0,Fe.normalize();let o=.5*u/(u+v),s=1-Fe.angleTo(l)/d;return Math.sign(Fe[r])===1?s*o:v/(u+v)+o+o*(1-s)}var Oe=class l extends At{constructor(n=1,r=1,e=1,p=2,c=.1){let u=p*2+1;if(c=Math.min(n/2,r/2,e/2,c),super(1,1,1,u,u,u),this.type="RoundedBoxGeometry",this.parameters={width:n,height:r,depth:e,segments:p,radius:c},u===1)return;let v=this.toNonIndexed();this.index=null,this.attributes.position=v.attributes.position,this.attributes.normal=v.attributes.normal,this.attributes.uv=v.attributes.uv;let d=new rt,o=new rt,s=new rt(n,r,e).divideScalar(2).subScalar(c),h=this.attributes.position.array,f=this.attributes.normal.array,m=this.attributes.uv.array,i=h.length/6,g=new rt,w=.5/u;for(let S=0,b=0;S<h.length;S+=3,b+=2)switch(d.fromArray(h,S),o.copy(d),o.x-=Math.sign(o.x)*w,o.y-=Math.sign(o.y)*w,o.z-=Math.sign(o.z)*w,o.normalize(),h[S+0]=s.x*Math.sign(d.x)+o.x*c,h[S+1]=s.y*Math.sign(d.y)+o.y*c,h[S+2]=s.z*Math.sign(d.z)+o.z*c,f[S+0]=o.x,f[S+1]=o.y,f[S+2]=o.z,Math.floor(S/i)){case 0:g.set(1,0,0),m[b+0]=Ft(g,o,"z","y",c,e),m[b+1]=1-Ft(g,o,"y","z",c,r);break;case 1:g.set(-1,0,0),m[b+0]=1-Ft(g,o,"z","y",c,e),m[b+1]=1-Ft(g,o,"y","z",c,r);break;case 2:g.set(0,1,0),m[b+0]=1-Ft(g,o,"x","z",c,n),m[b+1]=Ft(g,o,"z","x",c,e);break;case 3:g.set(0,-1,0),m[b+0]=1-Ft(g,o,"x","z",c,n),m[b+1]=1-Ft(g,o,"z","x",c,e);break;case 4:g.set(0,0,1),m[b+0]=1-Ft(g,o,"x","y",c,n),m[b+1]=1-Ft(g,o,"y","x",c,r);break;case 5:g.set(0,0,-1),m[b+0]=Ft(g,o,"x","y",c,n),m[b+1]=1-Ft(g,o,"y","x",c,r);break}}static fromJSON(n){return new l(n.width,n.height,n.depth,n.segments,n.radius)}};var ks=[.2,.21,.25],Fs=[.365,1,.87];function ns({programs:l,text:n,dir:r}){let e=(o,s,h)=>Wt(new Oe(o,s,h,4,Math.min(h*.45,o*.12)),{color:ks}),p=null;function c({w:o=.78,h:s=1.6,t:h=.09,emissive:f=1}={}){let m=new te,i=new G(Ct([e(o,h,s),Q(o*.965,h*.02,o*.012,{at:[0,h/2+.001,-s*.482],color:[.7,.72,.76],mat:1}),Q(o*.965,h*.02,o*.012,{at:[0,h/2+.001,s*.482],color:[.7,.72,.76],mat:1}),Q(o*.012,h*.02,s*.965,{at:[-o*.482,h/2+.001,0],color:[.7,.72,.76],mat:1}),Q(o*.012,h*.02,s*.965,{at:[o*.482,h/2+.001,0],color:[.7,.72,.76],mat:1})]),l.solid({ambient:.32,house:1}));m.add(i);let g=new Pt(o*.94,s*.96);g.rotateX(-Math.PI/2),g.translate(0,h/2+.003,0),p??(p=d(360,720,12));let w=l.paper({atlas:{value:p},house:0,ambient:f,defines:{}}),S=new G(g,w);return m.add(S),m.userData={screen:S,screenMaterial:w,w:o,h:s,t:h},m}function u({w:o=.78,h:s=1.6,t:h=.09,color:f=Fs,alpha:m=.9}={}){let i=new Ao(new Oe(o,h,s,3,Math.min(h*.45,o*.12)),10);return new Eo(i,l.wire({color:f,alpha:m}))}function v({w:o=.78,h:s=1.6}={}){let h=Gt("phone-board"),f=l.solid({ambient:.14,house:1}),m=new G(e(o,.03,s),f),g=[Q(o*.88,.016,s*.9,{color:[.05,.3,.2]}),Q(o*.68,.03,s*.42,{at:[0,.02,s*.19],color:[.2,.22,.26]})];for(let et=0;et<30;et+=1){let L=.03+h()*.08,k=.03+h()*.09;g.push(Q(L,.018,k,{at:[(h()-.5)*o*.74,.016,-s*.28+(h()-.5)*s*.26],color:h()>.7?[.76,.58,.3]:[.1,.1,.12],mat:h()>.7?1:0}))}let w=new G(Ct(g),f),S=Ct([Q(o,.05,.05,{at:[0,0,-s/2+.025],color:[.62,.64,.68],mat:1}),Q(o,.05,.05,{at:[0,0,s/2-.025],color:[.62,.64,.68],mat:1}),Q(.05,.05,s,{at:[-o/2+.025,0,0],color:[.62,.64,.68],mat:1}),Q(.05,.05,s,{at:[o/2-.025,0,0],color:[.62,.64,.68],mat:1})]),b=new G(S,f),A=new Pt(o*.94,s*.96);A.rotateX(-Math.PI/2);let B=l.paper({atlas:{value:n.texture},cell:[0,0,1,1],house:0,ambient:1}),$=new G(A,B),ut=new At(o*.98,.006,s*.98),I=new G(ut,l.glow({color:[.8,.9,1],alpha:.05,shape:5}));return{back:m,board:w,frame:b,display:$,displayMaterial:B,glass:I}}function d(o,s,h,f){return n.canvas(o,s,(m,i,g)=>{if(m.fillStyle="#0b0d13",m.fillRect(0,0,i,g),f){f(m,i,g);return}let w=g/13;for(let S=0;S<h;S+=1){m.fillStyle="rgba(255,255,255,.07)",m.fillRect(i*.06,w*(S+1),i*.88,w*.74),m.fillStyle=S%3===0?"#5dffde":"#a48bff";let b=r<0?i*.78:i*.1;m.fillRect(b,w*(S+1)+w*.16,i*.12,w*.42),m.fillStyle="rgba(232,236,244,.7)",m.fillRect(r<0?i*.28:i*.26,w*(S+1)+w*.28,i*.46,w*.16)}})}return{make:c,wire:u,layers:v,listTexture:d}}var Ot=4200,as=.12,Os=.6,_s=.03;function is({programs:l,shared:n,printTexture:r,dir:e}){let p=new le(new Float32Array(Ot*2*3),3).setUsage(Re),c=new le(new Float32Array(Ot*2*3),3).setUsage(Re),u=new le(new Float32Array(Ot*2),1),v=new le(new Float32Array(Ot*2),1).setUsage(Re),d=new le(new Float32Array(Ot*2),1).setUsage(Re),o=new Uint32Array((Ot-1)*6);for(let k=0;k<Ot;k+=1)if(u.array[k*2]=-1,u.array[k*2+1]=1,k<Ot-1){let Y=k*2;o.set([Y,Y+1,Y+2,Y+1,Y+3,Y+2],k*6)}let s=new So;s.setAttribute("position",p),s.setAttribute("aAcross",c),s.setAttribute("aSide",u),s.setAttribute("aS",v),s.setAttribute("aW",d),s.setIndex(new le(o,1));let h={uFeed:{value:0},uLine:{value:1e6},uLineLen:{value:4},uJamA:{value:0},uJamB:{value:0},uJamK:{value:0},uFlutter:{value:1},uWide:{value:1e6},uPrint:{value:r},uPrintRange:{value:0},uPaperGlow:{value:.22},uLineColor:{value:[.365,1,.87]}},f=l.strip({uniforms:h,side:2}),m=new G(s,f);m.frustumCulled=!1;let i=new G(s,l.glow({color:[.365,1,.87],alpha:.5,shape:5,house:0,deform:{pars:"in vec3 aAcross; in float aSide, aS, aW; uniform float uLine, uLineLen; out float vSide, vAlive;",fpars:"in float vSide, vAlive;",local:`{
          float z = max(-(viewMatrix * vec4(p, 1.0)).z, 0.05);
          p += aAcross * aSide * min(max(aW * 5.0, 0.16), z * 0.02);
        }`,world:"vSide = aSide; vAlive = smoothstep(uLine + uLineLen * 0.7, uLine + uLineLen, aS);",frag:"a = (1.0 - abs(vSide)); a = a * a * vAlive;",uniforms:{uLine:h.uLine,uLineLen:h.uLineLen}}}));i.frustumCulled=!1;let g=new Float32Array(Ot),w=new Float32Array(Ot),S=0,b=0,A=0,B=(k,Y,ot,a,z,q,C,j)=>{if(S>=Ot)return;let O=S*2;p.setXYZ(O,k,Y,ot),p.setXYZ(O+1,k,Y,ot),c.setXYZ(O,a,z,q),c.setXYZ(O+1,a,z,q),v.setX(O,C),v.setX(O+1,C),d.setX(O,j),d.setX(O+1,j),g[S]=C,w[S]=Y,S+=1};function $({yaws:k,lineStartY:Y,endY:ot,dense:a}){S=0;let z=0,q=.31*e,C=[[q,.11,-.5],[q,.085,-.43],[q*.92,.012,-.34],[q*.62,.003,-.24],[q*.22,.003,-.11],[0,.003,-.025],[0,-.004,.008],[0,-.03,.012]],j=24,O=C[0];for(let pt=0;pt<C.length-1;pt+=1){let ft=C[Math.max(0,pt-1)],F=C[pt],_=C[pt+1],U=C[Math.min(C.length-1,pt+2)];for(let tt=pt===0?0:1;tt<=j;tt+=1){let M=tt/j,Z=M*M,ht=Z*M,bt=[0,1,2].map(Mt=>.5*(2*F[Mt]+(_[Mt]-ft[Mt])*M+(2*ft[Mt]-5*F[Mt]+4*_[Mt]-U[Mt])*Z+(3*F[Mt]-ft[Mt]-3*_[Mt]+U[Mt])*ht)),Bt=bt[0]-O[0],dt=bt[1]-O[1],vt=bt[2]-O[2];z+=Math.hypot(Bt,dt,vt);let Qt=Math.hypot(Bt,vt)||1;B(bt[0],bt[1],bt[2],vt/Qt||1,0,-Bt/Qt||0,z,as),O=bt}}b=z,A=O[1];let X=O[1],K=0;for(;X>ot&&S<Ot;){let pt=.22;X>nt.slabBottom-.5&&(pt=.05);for(let Z of a)X<Z.a&&X>Z.b&&(pt=.022);for(X-=pt,z+=pt;K<k.length-1&&X<k[K+1].y;)K+=1;let ft=k[K],F=k[Math.min(K+1,k.length-1)],_=F===ft?0:ce(.25,.75,(ft.y-X)/Math.max(.001,ft.y-F.y)),U=Ne(ft.yaw,F.yaw,_)*Math.PI/180,tt=ce(nt.floorY-.2,nt.slabBottom+.2,X),M=Ne(as,Os,tt);X<Y&&(M=Ne(M,_s,ce(0,4,Y-X))),B(0,X,0,Math.cos(U),0,Math.sin(U),z,M)}p.needsUpdate=!0,c.needsUpdate=!0,v.needsUpdate=!0,d.needsUpdate=!0,h.uLine.value=ut(Y),h.uPrintRange.value=ut(nt.floorY-.1),h.uWide.value=ut(nt.deskY)}function ut(k){return b+(A-k)}function I(k){let Y=0,ot=S-1;for(;Y<ot;){let a=Y+ot>>1;g[a]<k?Y=a+1:ot=a}return Y}let et=-1/0;function L(k,Y){let ot=k+Y,a=ot>A?0:I(ut(ot)),z=I(ut(Math.max(k-Y,et))),q=Math.max(0,z-a)*6;s.setDrawRange(a*6,q)}return{mesh:m,halo:i,u:h,rebuild:$,focus:L,setEnd(k){et=k},sAtY:ut,pointAtY(k,Y){return Y[0]=0,Y[1]=k,Y[2]=0,Y}}}var js=460812,$s=12e3,Vs=190,Xs=900,Qs=.35,Js=5,Zs=2,Ks=new Set(["svc.web","svc.apps","svc.api","svc.rescue","svc.ux","step.talk","step.scope","step.build"]),tn=.06,en=.022,on=1.8,sn=12,nn=17,an=30,rn=8,ln=()=>new Promise(l=>{window.scheduler?.yield?window.scheduler.yield().then(l):setTimeout(l,0)});async function so(l){let n=performance.now();for(;;){if(l.next().done)return;performance.now()-n>4&&(await ln(),n=performance.now())}}async function ea({canvas:l,gl:n,tier:r,forced:e,onFail:p,onOff:c,onOn:u,isFailed:v}){xo.enabled=!1;let d={...Ko[r],instanceScale:1},o=document.documentElement,s=o.dir==="rtl"?-1:1,h=window.matchMedia("(pointer: coarse)").matches,f=new Co({canvas:l,context:n,antialias:!0});f.outputColorSpace=wo,f.setClearColor(js,1),f.sortObjects=!1,f.debug.checkShaderErrors=e,f.info.autoReset=!0;let m=new Mo,i=new He(30,1,.1,100);await Jo(s<0);let g=Zo({q:d,dir:s}),w={uTime:{value:0},uInline:{value:s},uCamY:{value:0},uDawn:{value:0},uPower:{value:new re(0,0)},uPowerY:{value:0},uLitY:{value:new re(nt.slabBottom,-120)},uFog:{value:new re(4,40)},uLampOrigin:{value:new rt},uLampPos:{value:new rt(.5*s,.62,-.62)},uLampDir:{value:new rt(0,-1,0)},uLampColor:{value:new rt(1,.7,.42)},uLampOn:{value:1},uLampCone:{value:new re(.55,.9)},uAtlas:{value:g.texture}},S=Qo(w),b=is({programs:S,shared:w,printTexture:g.printTexture,dir:s}),A=ss({programs:S,shared:w,text:g,q:d,dir:s,tier:r}),B=os({programs:S,shared:w,text:g,q:d,dir:s,tier:r}),$=ns({programs:S,shared:w,text:g,dir:s}),ut={desk:A,archive:B,strip:b,phone:$};A.setPhone($.make({w:.0775,h:.16,t:.0085})),m.add(A.group,B.group,b.mesh,b.halo);let I=pe.map((t,y)=>({meta:t,index:y,status:"idle",module:null,group:new te,ctx:null,on:!1,a:0,s:0,e:0,b:0,promise:null})),et=Object.fromEntries(I.map(t=>[t.meta.id,t]));I.forEach(t=>{t.group.visible=!1,m.add(t.group)});let L=null,k=null,Y=null,ot=1,a=1/0,z=0,q=0,C=0,j=()=>L.svh*.15,O=Bo({inPlace:!h,blur:!h&&r!=="L"}),X=Ye(),K=Uo(X),pt=60,ft=0;function F(t){let y=[],R=[],T=[];for(let[N,V]of Object.entries(t.shots))V.caption&&(N==="hero"?y.push([0,V.pinEnd]):(y.push([V.pinStart-.35*t.svh,V.pinEnd]),R.push(V.pinStart)),T.push(V.pinEnd));return{zones:y,down:R,up:T}}function _(){let t=[];for(let[T,N]of Object.entries(L.shots)){let V=N.caption&&document.querySelector(`[data-shot="${T}"] > .shot`);if(V){let ct=[...V.children].filter(Nt=>Nt.getAttribute("aria-hidden")!=="true").reduce((Nt,Et)=>Nt+Et.textContent.trim().split(/\s+/).filter(Boolean).length,0),J=/^(svc|process|step)\./.test(T)?1.5:T==="why.q"?1.5:1,St=T==="svc.head"?1.3:1,xt=Ks.has(T)?2.2:0;t.push({y:T==="hero"?0:N.pinStart,words:ct,hold:J,slow:St,through:N.pinEnd,play:xt})}}let y=O.stripWords();y&&t.push({y:(y[0]+y[1])/2,words:0,hold:1.5,slow:2.3});let R=K.playing;K.plan(t,pt),R&&(K.start(window.scrollY),ft=Math.round(window.scrollY))}function U(){O.release(),L=$o(),O.bake(L),X.bake(F(L),L.docH,L.svh),_();let t=zo(L,pe);k=t.solved,ot=L.docH,Y=Io(t.knots,ot);let y=k["svc.auto"],R=k["process.head"],T=k["why.q"],N=pe.filter(J=>J.floor&&J.stripYaw!==void 0).map(J=>({y:k[J.id].floorY,yaw:J.stripYaw}));N.unshift({y:nt.deskY,yaw:0}),N.push({y:y.floorY+3,yaw:0},{y:y.floorY+1,yaw:90},{y:y.floorY-3,yaw:90},{y:R.floorY+2,yaw:0}),N.sort((J,St)=>St.y-J.y),b.rebuild({yaws:N,lineStartY:y.floorY-1.8,endY:T.floorY+.03,dense:[{a:k["svc.rescue"].floorY+2.4,b:k["svc.rescue"].floorY-2.4}]}),w.uLitY.value.set(nt.slabBottom,R.floorY+4),B.setRange(nt.slabBottom,R.floorY);let V=L.shots.drop,ct=L.shots.fall;z=V.pinStart+(V.pinEnd-V.pinStart)*.86,a=ct.pinStart+(ct.pinEnd-ct.pinStart)*.5,q=V.pinStart+(V.pinEnd-V.pinStart)*.8,C=ct.pinStart+(ct.pinEnd-ct.pinStart)*.4;for(let J of I){let St=J.index,xt=L.shots[J.meta.id],Nt=St>0?L.shots[pe[St-1].id]:null,Et=St<pe.length-1?L.shots[pe[St+1].id]:null;J.a=Nt?Nt.pinEnd:0,J.s=xt.pinStart,J.e=xt.pinEnd,J.b=Et?Et.pinStart:ot;let Vt=k[J.meta.id];J.group.position.set(0,Vt.floorY??0,0),J.status==="ready"&&J.module.layout&&J.module.layout(J.ctx)}A.setActPositions(k.deskAct4),ht()}let tt=1,M=0,Z=null;function ht(){let t=L.W,y=L.H,R=d.pixelCap*tt,T=Math.min(window.devicePixelRatio||1,Math.sqrt(R/(t*y)));f.setPixelRatio(T),f.setSize(t,y,!1),i.aspect=t/y,Z?.resize(t*T,y*T)}let bt=[],Bt=t=>({tier:r,q:d,dir:s,id:t.meta.id,group:t.group,programs:S,u:w,text:g,sets:ut,camera:i,renderer:f,rng:Gt(t.meta.id),get solved(){return k},get layout(){return L},get self(){return k[t.meta.id]},place(y,{inline:R=0,y:T=0,z:N=0,yaw:V=0}={}){return y.position.set(R*s,T,N),y.rotation.y=V*s,y},hotspots:{add(y){bt.push({...y,runtime:t})}}});async function dt(t){if(t.status!=="ready")return t.promise||(t.status="loading",t.promise=(async()=>{try{let R=(await ts[t.meta.id]()).default;t.ctx=Bt(t),await so(R.build(t.ctx)),await f.compileAsync(t.group,i,m),R.layout&&R.layout(t.ctx),t.module=R,t.status="ready",Lt=!0}catch(y){console.warn(`shot ${t.meta.id} failed`,y),t.status="failed"}})()),t.promise}function vt(t){for(let y=I.length-1;y>=0;y-=1)if(t>=I[y].a)return y;return 0}let Qt=!1;async function Mt(){if(!Qt){for(Qt=!0;!(se||v());){let t=vt(H),y=null,R=1/0;for(let T of I)if(T.status==="idle"){let N=Math.abs(T.index-t);N<R&&(y=T,R=N)}if(!y)break;await new Promise(T=>{"requestIdleCallback"in window?window.requestIdleCallback(T,{timeout:200}):setTimeout(T,16)}),await dt(y)}Qt=!1}}let at=new Float32Array(13),zt=new Je,xe=new rt(0,1,0),_e=new rt(1,0,0),It=new Je,be=new rt,Jt=new rt,Me=new rt,ee=new rt;function Zt(t){let y=et["svc.head"],R=et["why.stats"],T=et.cta,N=(V,ct)=>ct>V?Math.min(1,Math.max(0,(t-V)/(ct-V))):t>=ct?1:0;return Tt(N(y.a,y.s))*(1-Tt(N(R.e,T.s)))}function oe(t){if(t.meta.desk&&A.phone.visible)A.phone.updateWorldMatrix(!0,!1),A.phone.getWorldPosition(Me);else{let y=k[t.meta.id]?.subject;if(!y)return rn;Me.set(y[0],y[1],y[2])}return ee.set(0,0,-1).applyQuaternion(i.quaternion),Math.max(.5,Me.sub(i.position).dot(ee))}function Se(t){let y=Zt(t);if(y<=0)return;let R=vt(t),T=I[R],N=oe(T);R>0&&t<T.s&&T.s>T.a&&(N+=(oe(I[R-1])-N)*(1-Tt((t-T.a)/(T.s-T.a)))),ee.set(0,0,-1).applyQuaternion(i.quaternion);let V=Tt(Math.min(1,Math.max(0,(-ee.y-.75)/.23))),ct=y*tn*(1+V*(on-1))*Math.sin(Ht/sn*Math.PI*2),J=y*(1-V)*en*Math.sin(Ht/nn*Math.PI*2+1.3);be.copy(ee).multiplyScalar(N).add(i.position),Jt.set(0,1,0).applyQuaternion(i.quaternion).lerp(xe,V).normalize(),It.setFromAxisAngle(Jt,ct),Jt.set(1,0,0).applyQuaternion(i.quaternion),zt.setFromAxisAngle(Jt,J),It.multiply(zt),Jt.copy(i.position).sub(be).applyQuaternion(It),i.position.copy(be).add(Jt),i.quaternion.premultiply(It)}let yt={t:0,enter:0,hold:0,exit:0,y:0,v:0,time:0,dt:0,px:0,py:0,pointer:0},st=Go(window.scrollY),jt=qo(X),H=st.y,wt=0,_t=0,se=!1,Dt=null,Lt=!0,Ht=0,ne=performance.now(),fe=0,he=performance.now(),Ee=0,Le=0,me=0,x=0,E=0,P=0,W=!1,D=null,lt=0,gt=NaN,it=!1,Yt=!1;function Te(t,y){let R=T=>Math.min(1,Math.max(0,T));yt.t=t.b>t.a?R((H-t.a)/(t.b-t.a)):1,yt.enter=t.s>t.a?R((H-t.a)/(t.s-t.a)):H>=t.s?1:0,yt.hold=t.e>t.s?R((H-t.s)/(t.e-t.s)):H>=t.e?1:0,yt.exit=t.b>t.e?R((H-t.e)/(t.b-t.e)):H>=t.b?1:0,yt.y=H/L.pace,yt.v=st.v,yt.time=Ht,yt.dt=y,yt.px=x,yt.py=E,yt.pointer=me}let kt=(t,y)=>y>t?Math.min(1,Math.max(0,(H-t)/(y-t))):H>=y?1:0,Tt=t=>t*t*(3-2*t);function rs(){let t=L.shots["process.head"];B.u.uTurn.value=Tt(kt(t.pinStart,t.pinEnd));let y=L.shots["why.list"],R=L.shots["why.stats"],T=L.shots.cta,N=kt(y.pinStart,y.pinEnd)*3.2;A.setClear(N);let V=Tt(kt(y.pinStart+(y.pinEnd-y.pinStart)*.45,T.pinStart));w.uDawn.value=V,A.setClock(3.2+Tt(kt(y.pinStart,R.pinEnd))*3.8);let ct=L.shots.hero;if(H<a){let xt=L.shots.drop.pinEnd-ct.pinEnd;A.setRing(1-kt(ct.pinEnd,ct.pinEnd+xt*.14)),A.setOffHook(Tt(kt(ct.pinEnd,ct.pinEnd+xt*.22)))}else A.setRing(1-kt(y.pinStart,y.pinStart+(y.pinEnd-y.pinStart)*.5)),A.setOffHook(0);let J=A.phone;if(J.visible=H>a,b.setEnd(-1/0),H>a){let xt=L.shots["why.q"],Nt=k["why.q"].d*.62,Et=Tt(kt(L.shots.fall.pinEnd-(L.shots.fall.pinEnd-a)*.2,xt.pinEnd)),Vt=Tt(kt(y.pinStart,y.pinStart+(y.pinEnd-y.pinStart)*.14)),po=Nt+(.42-Nt)*Et,fo=po+(.0043-po)*Vt;J.position.y=fo;let fs=2.1+(1-2.1)*Et;J.scale.setScalar(fs),J.rotation.y=L.portrait?0:Math.PI/2*Tt(kt(R.pinEnd,T.pinStart)),b.setEnd(A.group.position.y+fo+.01)}let St=I.find(xt=>xt.meta.id==="svc.rescue");(H<St.a||H>St.b)&&(w.uPower.value.set(0,0),b.u.uJamK.value=0)}function ae(t){ko(Y,ot,H,at),i.position.set(at[0],at[1],at[2]),i.quaternion.set(at[3],at[4],at[5],at[6]),i.fov=at[7],i.near=at[8],i.far=at[9],i.setViewOffset(L.W,L.H,at[11],at[12],L.W,L.H),w.uTime.value=Ht,w.uCamY.value=at[1],w.uFog.value.set(at[10]*.16,at[10]),rs();let y=H<z||H>a,R=H>a?4:1;A.group.visible=y,A.setAct(R),B.group.visible=H>q&&H<C,Se(H),me===1&&(zt.setFromAxisAngle(xe,-x*.012),i.quaternion.multiply(zt),zt.setFromAxisAngle(_e,E*.009),i.quaternion.multiply(zt)),w.uLampOn.value=y?1-w.uDawn.value*.72:0,w.uLampOrigin.value.copy(A.group.position),w.uLampColor.value.set(1,.7,.42),b.u.uFeed.value=H*18e-5/L.pace,Te(I[0],t),y&&(A.resetSpot(),A.update(yt,Ht));for(let T of I){let N=H>=T.a-j()&&H<=T.b+j();T.status==="ready"&&(N||T.on)&&(Te(T,t),T.module.update(yt,T.ctx),T.on=N,T.group.visible=N)}b.focus(at[1],at[9]),i.updateProjectionMatrix(),i.updateMatrixWorld(),Z?Z.render(m,i):f.render(m,i)}let Ae=new Be({onChange(t,y){ls(y)}});function ls(t){if(t==="pixel-85"||t==="pixel-72")M=t==="pixel-85"?.85:.72;else if(t==="drop-film")Z?.dispose(),Z=null;else if(t==="instances-70"||t==="instances-50")d.instanceScale=t==="instances-70"?.7:.5,A.setDensity(d.instanceScale),B.setDensity(d.instanceScale);else if(t==="shadow-1")A.setShadowTaps(1);else if(t==="extras-off")B.setWeather(!1),A.setExtras(!1);else if(t==="cadence-30")P=33.3;else if(t==="stills"){try{window.localStorage.setItem("enjaz:tier",`S:${Date.now()}`)}catch{}qe(),c("governor")}}function no(t){if(se)return;if(window.requestAnimationFrame(no),document.hidden||W||Dt!==null){ne=t;return}let y=t-ne;ne=t;let R=Math.min(y,100)/1e3;Ht+=R;let T=window.scrollY,N=jt.step(T,R,L.svh,t);if(Pe&&Math.abs(T-ft)>2&&(Pe=!1,Ce()),K.playing)if(Yt||jt.on||Math.abs(T-ft)>2||document.body.classList.contains("is-nav-open"))Kt();else{let Et=document.documentElement.scrollHeight-window.innerHeight;N=Math.round(Math.min(Et,K.step(R,ps))),ft=N;let Vt=K.stops[K.stops.length-1].y;$t.style.setProperty("--tour",(Vt>0?Math.min(1,N/Vt):1).toFixed(3)),K.playing||(Pe=!0,Ce())}else if(D)if(Yt||jt.on||Math.abs(T-D.written)>2)D=null;else{let Et=D.at+(D.to-D.at)*(1-Math.exp(-Js*R)),Vt=Zs*L.svh*R;D.at+=Math.max(-Vt,Math.min(Vt,Et-D.at)),Math.abs(D.to-D.at)<.5&&(D.at=D.to),N=Math.round(D.at),D.written=N,D.at===D.to&&(D=null)}else if(!jt.on&&!Yt&&!wt&&!document.body.classList.contains("is-nav-open")&&(T!==gt?(lt=0,it=!1):lt+=R,!it&&lt>Qs)){it=!0;let Et=O.settle(T);Et!==null&&Math.abs(Et-T)>2&&(D={at:T,to:Et,written:T})}gt=N,N!==T&&window.scrollTo({top:N,behavior:"instant"}),O.update(N,R),!wt&&Math.abs(N-H)>6*L.svh&&t>_t?(wt=t,o.classList.add("world-dip")):wt&&t-wt>=Vs&&(st.land(N,L.svh),wt=0,_t=t+Xs,o.classList.remove("world-dip"));let V=Math.abs(N-st.y)>.25||Math.abs(st.v)>2;H=st.step(N,R,L.svh,X.speed(st.y)),x+=(Ee-x)*Math.min(1,R*6),E+=(Le-E)*Math.min(1,R*6);let ct=Math.abs(Ee-x)>.001||Math.abs(Le-E)>.001,J=I[vt(H)],St=Math.max(J.meta.idleHz,Zt(H)>0?an:0),xt=V||ct||Lt;if(!xt&&St>0&&!(r==="L"&&t-he>$s)&&(xt=t-fe>=1e3/St-1),P&&t-fe<P-2&&(xt=!1),!xt)return;V&&(he=t),M&&(!V||H>L.shots.fall.pinStart&&H<L.shots.fall.pinEnd)&&(tt=M,M=0,ht()),Lt=!1;let Nt=(t-fe)/1e3;fe=t,ae(Math.min(Nt,.1)),y<250&&(V||St>0)&&Ae.push(y)}function Ge(){Kt(),jt.on=!1,D=null,wt=0,o.classList.remove("world-dip")}function qe(){se=!0,Ge(),O.release(),$t.remove()}let $t=document.createElement("button");$t.type="button",$t.className="tour";let ie=document.createElementNS("http://www.w3.org/2000/svg","svg");ie.setAttribute("viewBox","0 0 24 24"),ie.setAttribute("width","18"),ie.setAttribute("height","18"),ie.setAttribute("aria-hidden","true"),ie.setAttribute("focusable","false");let ao=document.createElementNS("http://www.w3.org/2000/svg","path");ie.append(ao);let io=document.createElement("span");$t.append(ie,io);let cs=o.lang==="ar"?{play:"\u062C\u0648\u0644\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0629",pause:"\u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u062C\u0648\u0644\u0629",replay:"\u0623\u0639\u062F \u0627\u0644\u062C\u0648\u0644\u0629"}:{play:"Auto tour",pause:"Pause tour",replay:"Replay tour"},us={play:"M8 5.2v13.6L18.8 12z",pause:"M7 5h3.6v14H7zm6.4 0H17v14h-3.6z",replay:"M5.4 13.2a6.8 6.8 0 1 0 1.9-5.9M6.6 3.6v4.2h4.2"},Pe=!1,ro="";function Ce(){let t=K.playing?"pause":Pe?"replay":"play";t!==ro&&(ro=t,$t.dataset.state=t,ao.setAttribute("d",us[t]),io.textContent=cs[t])}function je(t=!1){se||W||(jt.on=!1,D=null,Pe=!1,K.start(window.scrollY,t),ft=Math.round(window.scrollY),Ce())}function Kt(){K.playing&&(K.stop(),lt=0,it=!1,Ce())}function ps(t,y){for(let R of I)if(R.b>=t&&R.a<=y&&(R.status==="idle"||R.status==="loading"))return!1;return!0}let $e=t=>t.target instanceof Node&&$t.contains(t.target);$t.addEventListener("click",()=>K.playing?Kt():je()),window.addEventListener("touchstart",t=>{Yt=!$e(t)},{passive:!0}),window.addEventListener("keydown",t=>{$e(t)&&(t.key==="Enter"||t.key===" ")||Kt()},{passive:!0}),window.addEventListener("pointerdown",t=>{$e(t)||Kt()},{passive:!0});let lo=()=>{Yt=!1};window.addEventListener("touchend",lo,{passive:!0}),window.addEventListener("touchcancel",lo,{passive:!0}),window.addEventListener("pointermove",t=>{me=t.pointerType==="mouse"?1:2,Ee=t.clientX/window.innerWidth*2-1,Le=t.clientY/window.innerHeight*2-1,he=performance.now()},{passive:!0});let De=new rt;window.addEventListener("click",t=>{if(!t.target.closest?.("a, button, .shot"))for(let y of bt){if(!y.runtime.on)continue;De.set(y.center[0],y.center[1],y.center[2]),y.runtime.group.localToWorld(De).project(i);let R=(De.x*.5+.5)*L.W,T=(.5-De.y*.5)*L.H;Math.hypot(R-t.clientX,T-t.clientY)<y.radius&&(y.runtime.module.hit?.(y.id,yt,y.runtime.ctx),Lt=!0)}},{passive:!0}),window.addEventListener("pageshow",()=>{Kt(),st.reset(window.scrollY),H=st.y,Lt=!0});let co=0;if(l.addEventListener("webglcontextlost",t=>{t.preventDefault(),W=!0,Ge(),co+=1,c("context-lost")}),l.addEventListener("webglcontextrestored",()=>{co>1||(W=!1,A.bakeShadow(f),u(),U(),st.reset(window.scrollY),H=st.y,Lt=!0)}),U(),st.reset(window.scrollY),H=st.y,await so(A.build()),await so(B.build()),await dt(et.hero),await dt(et.drop),await f.compileAsync(m,i),A.bakeShadow(f),v())return null;if(!e){let t=[],y=new Uint8Array(4);for(let T=0;T<6;T+=1){await new Promise(V=>window.requestAnimationFrame(V));let N=performance.now();ae(.016),n.readPixels(0,0,1,1,n.RGBA,n.UNSIGNED_BYTE,y),t.push(performance.now()-N)}let R=t.slice(2).sort((T,N)=>T-N)[1];if(R>40){try{window.localStorage.setItem("enjaz:tier",`S:${Date.now()}`)}catch{}return p("bench"),null}R>20&&(tt=.7,d.instanceScale=.7,A.setDensity(.7),B.setDensity(.7),ht())}d.film&&(Z=(await import("./chunk-WOIDP7SL.js")).createFilm(f),Z.resize(L.W*f.getPixelRatio(),L.H*f.getPixelRatio())),st.reset(window.scrollY),H=st.y,O.update(H,0),ae(.016),o.classList.add("world-on"),Ce(),document.body.append($t),window.requestAnimationFrame(no),Mt(),/[?&]tour=1\b/.test(window.location.search)&&je(!0),window.addEventListener("wheel",t=>{Kt(),!(t.ctrlKey||se||W||Dt!==null||document.body.classList.contains("is-nav-open")||Math.abs(t.deltaX)>Math.abs(t.deltaY))&&(t.preventDefault(),jt.input(t.deltaY,t.deltaMode,window.scrollY,L.svh,L.docH-L.svh,performance.now()),he=performance.now())},{passive:!1});let ds=Vo(()=>{U(),Lt=!0});/[?&]hud=1\b/.test(window.location.search)&&import("./chunk-FKFVKEYL.js").then(t=>t.mountHud({renderer:f,governor:Ae,tier:r,q:d,get y(){return H}}));let uo={tier:r,renderer:f,governor:Ae,scene:m,camera:i,stop:qe,pacer:X,get layout(){return L},get solved(){return k},tour:{play:t=>je(t),pause:Kt,get playing(){return K.playing},get stops(){return K.stops.map(t=>({...t}))},set seconds(t){pt=t,_()}},get y(){return H},seek(t){return window.scrollTo({top:t,behavior:"instant"}),Ge(),st.reset(window.scrollY),H=st.y,gt=window.scrollY,it=!0,O.update(H,0),ae(.016),H},freeze(t){Dt=t,Ht=t},unfreeze(){Dt=null},renderOnce(){ae(.016)},info(){return ae(.016),{calls:f.info.render.calls,triangles:f.info.render.triangles,programs:f.info.programs.length,rung:Ae.rung,y:H}},sceneInfo(){let t=Z;Z=null,ae(.016);let y={calls:f.info.render.calls,triangles:f.info.render.triangles};return Z=t,y},feedFrameTimes(t){t.forEach(y=>Ae.push(y))},async loadAll(){await Promise.all(I.map(t=>dt(t))),Lt=!0},status(){return Object.fromEntries(I.map(t=>[t.meta.id,t.status]))},dispose(){qe(),ds()}};return window.__enjazWorld=uo,uo}export{ea as start};
