/* three.js r187 (c) three.js authors, MIT. ENJAZ film. */
import{a as st,b as Lo,c as To,d as Ao}from"./chunk-6ETZZDVU.js";import{a as Co,b as Po,c as zo,d as Ro,e as ko,f as Ve,g as Oo,h as Io}from"./chunk-2EEOQMQQ.js";import{c as _t,d as V,f as Ct,g as Ut,h as Pt,i as Gt,j as Eo,k as _e,l as ue}from"./chunk-GBHZZ3DY.js";import{A as yo,B as xo,C as Tt,D as je,E as bo,J as At,N as So,O as Fe,S as Mo,a as Ue,c as Ge,d as qe,e as ve,f as io,g as ro,h as lo,i as co,j as uo,k as Te,l as po,m as le,n as fo,o as vt,p as ho,q as mo,r as $e,t as se,u as vo,v as ce,w as wo,x as U,z as go}from"./chunk-ZD75F7KI.js";import"./chunk-AEJNSRIJ.js";var is=[.24,.45],He=r=>Math.min(1,Math.max(0,r));function Fo({inPlace:r,blur:n}){let i=[],t=null,d=1/0,c=NaN,u=0,v=0;function p(s){s.el.style.opacity="",s.el.style.transform="",s.el.classList.remove("is-gone");for(let h of s.kids)h.style.opacity="",h.style.transform="",h.style.filter=""}function o(s,h,f,m){let l=h<.5;if(l!==s.gone&&(s.gone=l,s.el.classList.toggle("is-gone",l),document.dispatchEvent(new CustomEvent("enjaz:captions"))),h===1&&f===0){p(s);return}s.el.style.opacity=He(h/.55).toFixed(3),s.el.style.transform=f?`translate3d(0, ${f.toFixed(1)}px, 0)`:"";let g=s.kids.length,w=g>1?Math.min(.14,.5/(g-1)):0,M=1-(g-1)*w;s.kids.forEach((b,A)=>{let N=He((h-A*w)/M);if(N===1){b.style.opacity="",b.style.transform="",b.style.filter="";return}let $=1-N;b.style.opacity=N.toFixed(3),b.style.transform=`translate3d(0, ${($*$*$*1.1*(m?-1:1)).toFixed(3)}em, 0)`,n&&(b.style.filter=`blur(${($*.28).toFixed(3)}em)`)})}return{bake(s){let h=.35*s.svh;i=[];for(let[m,l]of Object.entries(s.shots)){if(!l.caption||l.caption.h>s.svh*.7)continue;let g=document.querySelector(`[data-shot="${m}"] > .shot`);g&&i.push({el:g,kids:[...g.children],a:m==="hero"?-1:l.pinStart-h,s:m==="hero"?-1:l.pinStart,e:l.pinEnd,b:l.pinEnd+h,unpin:l.pinEnd,hero:m==="hero",pin:l.pin??0,h:l.caption.h,shown:-1,shift:0,gone:!1})}let f=.5*s.svh;t=null,d=s.docH-s.svh;for(let m=1;m<i.length;m+=1){let l=i[m-1],g=i[m],w=g.s-l.e;if(!(w<=0)){if(r){let M=Math.min(f,w/2);l.b=l.e+M,g.a=g.s-M}else l.b=l.e+Math.min(f,Math.max(h,w-g.pin));l.hero&&(l.b=l.unpin+w*.18,l.e=Math.min(l.unpin,l.b-h*.6),t=is.map(M=>l.unpin+w*M))}}c=NaN},update(s,h){u=s===c?u+h:0,c=s,v=u>.25?Math.min(1,v+h/.4):Math.max(0,v-h/.12);for(let f of i){let m=f.s>f.a?He((s-f.a)/(f.s-f.a)):1,l=He((s-f.e)/(f.b-f.e)),g=s>f.a&&s<f.b,w=g?Math.max(Math.min(m,1-l),v):0;f.hero&&g&&l>.3&&(w=Math.min(1-l,1-v));let M=0;r&&g&&(M=m<1?(s-f.s)*.85:l>0?Math.max(0,s-f.unpin)*.85:0),(w!==f.shown||M!==f.shift)&&(f.shown=w,f.shift=M,o(f,w,M,l>0))}},settle(s){if(!i.length||s>=d-2||t&&s>=t[0]&&s<=t[1])return null;let h=null,f=1/0,m=(l,g)=>{let w=Math.min(g,Math.max(l,s));Math.abs(w-s)<f&&(f=Math.abs(w-s),h=w)};for(let l of i){if(l.hero){let w=l.e+(l.b-l.e)*.3;if(s<w)return null;m(0,l.e);continue}let g=r?l.a:l.s-l.h*.5;if(s>g&&s<l.b)return null;m(l.s,l.e)}return t&&m(t[0],t[1]),h===null?null:Math.round(h)},stripWords(){return t},release(){for(let s of i)p(s),s.shown=-1,s.gone=!1}}}var Xe=["pixel-85","pixel-72","drop-film","instances-70","instances-50","shadow-1","extras-off","cadence-30","stills"];function Je(r,n){return r[Math.min(r.length-1,Math.floor(r.length*n))]}var De=class{constructor({onChange:n=()=>{}}={}){this.onChange=n,this.buffer=new Float32Array(90),this.sorted=new Float32Array(90),this.count=0,this.head=0,this.rung=-1,this.elapsed=0,this.overBudget=0,this.underBudget=0,this.cooldown=0,this.climbs=0,this.upWait=240,this.locked=!1,this.refreshCap=!1,this.seen=0,this.belowBail=0,this.p50=0,this.p90=0,this.vsync=16.6}target(){return this.refreshCap?33.3:Math.max(this.vsync,16.6)}push(n){if(this.elapsed+=n,this.elapsed<1e3||n>250||(this.buffer[this.head]=n,this.head=(this.head+1)%90,this.count=Math.min(90,this.count+1),this.seen+=1,this.cooldown=Math.max(0,this.cooldown-n),this.count<90/2))return;this.sorted.set(this.buffer);let i=this.sorted.subarray(0,this.count).sort();this.p50=Je(i,.5),this.p90=Je(i,.9),this.vsync=Je(i.subarray(0,Math.max(1,Math.floor(this.count*.2))),.5),this.seen<=60&&Math.abs(this.p50-33.3)/33.3<.04&&this.p90/this.p50<1.08&&(this.refreshCap=!0);let t=this.target();if(this.p90>t*1.25?(this.overBudget+=1,this.underBudget=0):this.p90<t*.75?(this.underBudget+=1,this.overBudget=0):(this.overBudget=0,this.underBudget=0),this.rung===Xe.length-2&&this.p50>50){if(this.belowBail+=n,this.belowBail>4e3){this.step(1);return}}else this.belowBail=0;this.cooldown>0||(this.overBudget>=45&&this.rung<Xe.length-2?(this.underBudgetClimbed&&(this.upWait*=2,this.underBudgetClimbed=!1),this.step(1)):this.underBudget>=this.upWait&&this.rung>=0&&!this.locked&&(this.climbs+=1,this.underBudgetClimbed=!0,this.climbs>=2&&(this.locked=!0),this.step(-1)))}step(n){this.rung+=n,this.overBudget=0,this.underBudget=0,this.cooldown=1500,this.count=0,this.onChange(this.rung,Xe[this.rung]??"full")}};var Ae=(r,n,i)=>Math.min(i,Math.max(n,r));var _o=r=>r*r*(3-2*r),rs=r=>r*r*(6-8*r+3*r*r);function Ne(){let r=0,n=1,i=null,t=null,d=[],c=[],u=v=>Math.min(8191,Math.max(0,v/n));return{bake({zones:v,down:p=[],up:o=[]},s,h){r=Math.max(1,s),n=r/8191,i=new Float64Array(8192),t=new Float32Array(8192);let f=.45*h;for(let m=0;m<8192;m+=1){let l=m*n,g=1/0;for(let[w,M]of v)g=Math.min(g,l<w?w-l:l>M?l-M:0);t[m]=1+3*_o(Math.min(1,g/f)),m>0&&(i[m]=i[m-1]+n*2/(t[m-1]+t[m]))}d=p.map(Math.round).sort((m,l)=>m-l),c=o.map(Math.round).sort((m,l)=>l-m)},speed(v){return t?t[Math.round(u(v))]:1},toEffort(v){if(!i)return v;let p=u(v),o=Math.min(8190,Math.floor(p)),s=Math.max(0,v-r)+Math.min(0,v);return i[o]+(i[o+1]-i[o])*(p-o)+s},fromEffort(v){if(!i)return v;let p=i[8191];if(v<=0||v>=p)return v<=0?v:r+(v-p);let o=0,s=8191;for(;s-o>1;){let h=o+s>>1;i[h]<=v?o=h:s=h}return(o+(v-i[o])/(i[s]-i[o]))*n},stop(v,p){return p>v?d.find(o=>o>v+.5&&o<=p)??null:c.find(o=>o<v-.5&&o>=p)??null}}}function Ho(r=Ne()){let n=[],i=0,t=0,d="hold",c=0,u=0,v=0,p=0,o=0;return{playing:!1,get stops(){return n},plan(s,h=60){n=[];for(let g of[...s].sort((w,M)=>w.y-M.y)){let w=Math.max(0,Math.round(g.y)),M=g.hold??1,b=g.slow??1,A=g.through>w+2?Math.round(g.through):w,N=A>w?g.play??0:0,$=n.at(-1);$&&w-$.y<3?($.words=Math.max($.words,g.words),$.hold=Math.max($.hold,M),$.slow=Math.max($.slow,b)):n.push({y:w,words:g.words,hold:M,slow:b,through:A,play:N,read:0})}if(n.forEach((g,w)=>{let M=n[w+1];(!M||g.through>=M.y||g.play<=0)&&(g.through=g.y,g.play=0)}),n.length<2){i=0;return}let f=h*.85,m=n.slice(0,-1).reduce((g,w)=>g+w.words+12,0);n.forEach((g,w)=>{g.read=w<n.length-1?f*(g.words+12)*g.hold/m:0});let l=r.toEffort(n.at(-1).y)-r.toEffort(n[0].y);i=l>0?(h-f)/l:0},start(s,h=!1){if(n.length<2)return;this.playing=!0,d="hold",c=0,t=n.findIndex(m=>m.y>s+2),t===-1&&(t=1,s=n[0].y,h=!0);let f=t>0&&s-n[t-1].y<=2?n[t-1]:null;f?(o=f.y,u=h?f.read+.6:Math.min(.6,f.read)):(o=s,u=.6)},stop(){this.playing=!1},step(s,h=()=>!0){if(!this.playing)return o;c+=s;let f=()=>{v=r.toEffort(o),p=r.toEffort(n[t].y),d="move",c=0,u=Math.max(.3,(p-v)*i)*n[t].slow};if(d==="hold"){if(c<u||c<u+4&&!h(o,n[t].y))return o;let l=t>0?n[t-1]:null;l&&l.through>o+2&&o>=l.y-2?(d="play",v=o,p=l.through,c=0,u=l.play*(p-v)/(p-l.y)):f()}if(d==="play"){let l=Math.min(1,c/u);if(o=v+(p-v)*_o(l),l<1)return o;o=p,f()}let m=Math.min(1,c/u);return o=r.fromEffort(v+(p-v)*rs(m)),m>=1&&(o=n[t].y,t===n.length-1?this.playing=!1:(d="hold",c=0,u=n[t].read,t+=1)),o}}}function Do(r=0){return{y:r,v:0,step(n,i,t,d=1){let u=10*i,v=1/(1+u+.48*u*u+.235*u*u*u),p=4.2*Math.min(d,2.5)*t*.2,o=Ae(this.y-n,-p,p),s=(this.v+10*o)*i;return this.v=(this.v-10*s)*v,this.y=this.y-o+(o+s)*v,Math.abs(this.y-n)<.25&&Math.abs(this.v)<2&&(this.y=n,this.v=0),this.y},reset(n){this.y=n,this.v=0},land(n,i){let t=Math.sign(n-this.y);this.y=n-t*.8*i,this.v=t*4.2*i*.5}}}function No(r=Ne()){return{on:!1,at:0,aim:0,written:0,rest:null,input(n,i,t,d,c,u=0){this.on||(this.on=!0,this.at=t,this.aim=t,this.written=t);let p=Ae(n*(i===1?40:i===2?d:1),-200,200),o=this.rest;if(o&&Math.sign(p)===o.dir&&Math.abs(this.at-o.y)<2){let w=u-o.since;if(w<.35*1e3||w<1.2*1e3&&u-o.last<.14*1e3){o.last=u,this.aim=this.at;return}}this.rest=null;let s=Math.sign(p)===-Math.sign(this.aim-this.at)?this.at:this.aim,h=1.6*d,f=r.toEffort(this.at),m=Ae(r.toEffort(s)+p,f-h,f+h),l=Ae(r.fromEffort(m),0,c),g=r.stop(this.at,l);g!==null&&(l=g),this.aim=l},step(n,i,t,d=0){if(!this.on)return n;if(Math.abs(n-this.written)>2)return this.on=!1,this.rest=null,n;let c=r.toEffort(this.at),u=r.fromEffort(c+(r.toEffort(this.aim)-c)*(1-Math.exp(-12*i))),v=3.5*Math.min(r.speed(this.at),2.5)*t*i;if(this.at+=Ae(u-this.at,-v,v),Math.abs(this.aim-this.at)<.5){let p=Math.sign(this.aim-this.written);this.at=this.aim,this.on=!1,r.stop(this.aim-p*3,this.aim)===this.aim&&(this.rest={y:this.aim,dir:p,since:d,last:d})}return this.written=Math.round(this.at),this.written}}}var Bo=r=>{let n=document.createElement("div");n.style.position="fixed",n.style.top="0",n.style.width="0",n.style.visibility="hidden",n.style.height=`100${r}`,document.body.appendChild(n);let i=n.getBoundingClientRect().height;return n.remove(),i},Ce=r=>parseFloat(r)||0;function Wo(){let r=Bo("svh"),n=Bo("lvh"),i=document.documentElement.clientWidth,t=n,d=window.scrollY,c=document.querySelector("[data-nav]"),u=c?c.getBoundingClientRect().height:0,v=document.documentElement.dir==="rtl"?-1:1,p=document.documentElement.scrollHeight,o=getComputedStyle(document.documentElement),s=parseFloat(o.getPropertyValue("--pace"))||1,h=parseFloat(o.getPropertyValue("--pace-gap"))||s,f={};for(let m of document.querySelectorAll("[data-shot]")){let l=m.dataset.shot,g=m.getBoundingClientRect(),w=g.top+d,M=m.querySelector(":scope > .shot"),b={id:l,top:w,height:g.height,caption:null,pinStart:w,pinEnd:w};if(M){let A=M.getBoundingClientRect(),N=getComputedStyle(m),$=getComputedStyle(M),lt=Ce(N.paddingBlockEnd);if(l==="hero"){let F=Ce($.insetBlockStart),at=Ce($.marginBlockEnd),E=Ce(N.paddingBlockStart);b.pinStart=0,b.pinEnd=Math.max(0,g.height-E-A.height-at),b.caption={x:A.left,y:F,w:A.width,h:A.height}}else{let F=Ce($.insetBlockEnd);b.pinStart=w+A.height+F-r,b.pinEnd=b.pinStart+Math.max(0,g.height-lt-A.height),b.caption={x:A.left,y:r-F-A.height,w:A.width,h:A.height},b.pin=F,b.gap=lt}}f[l]=b}return{W:i,H:t,svh:r,lvh:n,navH:u,docH:p,dir:v,pace:s,paceGap:h,portrait:t>=i,shots:f}}function Yo(r){let n=window.matchMedia("(pointer: coarse)").matches,i=document.documentElement.clientWidth,t=document.documentElement.scrollHeight,d=0,c=()=>{window.clearTimeout(d),d=window.setTimeout(r,160)},u=new ResizeObserver(()=>{let v=document.documentElement.clientWidth,p=document.documentElement.scrollHeight;if(v===i&&p===t)return;let o=n&&v===i&&Math.abs(p-t)<200;i=v,t=p,o||c()});return u.observe(document.documentElement),document.fonts?.ready.then(c),document.fonts?.addEventListener?.("loadingdone",c),()=>u.disconnect()}var ge=`
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
}`;function Uo(r,n={}){return r.replace("//#pars",n.pars??"").replace("//#fpars",n.fpars??"").replace("//#local",n.local??"").replace("//#world",n.world??"").replace("//#frag",n.frag??"")}function de(r,{mips:n=!0,repeat:i=!1}={}){let t=new yo(r);return t.colorSpace=lo,t.generateMipmaps=n,t.minFilter=n?io:ve,t.magFilter=ve,i&&(t.wrapS=qe,t.wrapT=qe),t}function xs(){let n=document.createElement("canvas");n.width=256*2,n.height=256;let i=n.getContext("2d"),t=(d,c,u)=>{let v=i.createRadialGradient(d+107.52,76.8,5.12,d+128,128,184.32);c.forEach(([o,s])=>v.addColorStop(o,s)),i.fillStyle=v,i.fillRect(d,0,256,256);let p=i.createRadialGradient(d+256*.38,256*.24,0,d+256*.38,256*.24,256*.26);p.addColorStop(0,u),p.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=p,i.fillRect(d,0,256,256)};return t(0,[[0,"#bcbcc0"],[.5,"#8c8d92"],[.85,"#55565c"],[1,"#35363c"]],"rgba(255,255,255,.18)"),t(256,[[0,"#f6d58c"],[.45,"#c9963f"],[.8,"#6e4a1c"],[1,"#2c1c0a"]],"rgba(255,244,214,.75)"),de(n,{mips:!1})}function Go(r){let n=xs(),i=(t,d,c,u,v={})=>{let{deform:p,defines:o,...s}=v;return new So({name:t,glslVersion:po,vertexShader:Uo(d,p),fragmentShader:Uo(c,p),defines:o??{},uniforms:{...r,...u,...p?.uniforms??{}},...s})};return{matcap:n,solid(t={}){return i("solid",ls,cs,{uMatcap:{value:n},uEmit:{value:t.emit??[0,0,0]},uAmbient:{value:t.ambient??.06},uHouse:{value:t.house??1}},we(t,["emit","ambient","house"]))},paper(t={}){return i("paper",us,ds,{uAtlas:t.atlas??r.uAtlas,uCell:{value:t.cell??[0,0,1,1]},uAmbient:{value:t.ambient??.07},uHouse:{value:t.house??1},uLitBoost:{value:t.boost??1}},{side:Ue,...we(t,["atlas","cell","ambient","house","boost"])})},wood(t={}){return i("wood",ps,fs,{uHouse:{value:0},...t.uniforms},we(t,["uniforms"]))},strip(t={}){return i("strip",hs,ms,{uHouse:{value:1},...t.uniforms},we(t,["uniforms"]))},glow(t={}){return i("glow",vs,ws,{uColor:{value:t.color??[1,1,1]},uAlpha:{value:t.alpha??1},uShape:{value:t.shape??0},uRadius:{value:0},uMap:{value:t.map??n},uHouse:{value:t.house??0}},{transparent:!0,depthWrite:!1,blending:Ge,side:Ue,...we(t,["color","alpha","shape","map","house"])})},wire(t={}){return i("wire",gs,ys,{uColor:{value:t.color??[.365,1,.87]},uAlpha:{value:t.alpha??1},uHouse:{value:0}},{transparent:!0,depthWrite:!1,blending:Ge,...we(t,["color","alpha"])})}}}function we(r,n){let i={};for(let t of Object.keys(r))n.includes(t)||(i[t]=r[t]);return i}var Kt=4,bs=["invoice","receipt","quote","ledger","sheet","slip","lines","dossier","carbon","memo","tape","blank"],Ss=r=>{let n=new Set;for(let i of document.querySelectorAll(r)){let t=i.textContent.trim();t&&t!=="\u2726"&&n.add(t)}return[...n]};async function qo(r){let n=[document.fonts.load('400 20px "IBM Plex Mono"',"#REF! 0123"),document.fonts.load(r?'700 48px "Noto Kufi Arabic"':'700 48px "Space Grotesk"',r?"\u0625\u0646\u062C\u0627\u0632":"ENJAZ")];await Promise.race([Promise.allSettled(n),new Promise(i=>setTimeout(i,1500))])}function $o({q:r,dir:n}){let i=n<0,t=document.querySelector("main"),d={};try{d=JSON.parse(t?.dataset.atlas??"{}")}catch{d={}}let c=Ss(".ticker__track span"),u=[];try{u=JSON.parse(document.querySelector("[data-typewriter]")?.dataset.typewriter??"[]")}catch{u=[]}let v=i?'"Noto Kufi Arabic", system-ui':'"Space Grotesk", system-ui',p='"IBM Plex Mono", monospace',o=new Intl.NumberFormat(i?"ar-EG":"en-US",{useGrouping:!1}),s=r.atlas,h=document.createElement("canvas");h.width=s,h.height=s;let f=h.getContext("2d"),m=s/Kt;f.fillStyle="#fff",f.fillRect(0,0,s,s);let l="#23252e",g="#9aa0ad",w=(a,z)=>{let G=a%Kt,P=Math.floor(a/Kt);f.save(),f.beginPath(),f.rect(G*m,P*m,m,m),f.clip(),f.translate(G*m,P*m),f.scale(m/100,m/134),f.direction=i?"rtl":"ltr",f.textBaseline="alphabetic",z(f),f.restore()},M=a=>i?100-a:a,b=(a,z,G,P=12)=>{a.fillStyle=l,a.font=`700 ${P}px ${v}`,a.textAlign="start",a.fillText(z,M(8),G)},A=(a,z,G=8,P=92,q=g,O=.7)=>{a.fillStyle=q,a.fillRect(G,z,P-G,O)},N=(a,z,G,P,q=0)=>{for(let O=0;O<G;O+=1){let j=34+(O*37+q)%40;a.fillStyle=O%3===0?l:g,a.fillRect(i?92-j:8,z+O*P,j,1.4),a.fillStyle=g,a.fillRect(i?8:80,z+O*P,12,1.4)}};w(0,a=>{b(a,d.invoice??"",20,14),A(a,26),N(a,34,9,7),A(a,104,8,92,l,1),a.fillStyle=l,a.font=`600 9px ${p}`,a.textAlign=i?"left":"right",a.fillText(o.format(4820),i?8:92,116)}),w(1,a=>{b(a,d.receipt??"",18,12),A(a,24),N(a,32,7,6,11),a.fillStyle=l,a.fillRect(30,100,40,12)}),w(2,a=>{b(a,d.quote??"",22,15),A(a,28),N(a,38,6,8,23),a.save(),a.translate(68,104),a.rotate(-.26),a.strokeStyle="#5e4bd8",a.lineWidth=2,a.strokeRect(-23,-9,46,18),a.fillStyle="#5e4bd8",a.font=`700 10px ${v}`,a.textAlign="center",a.fillText(d.paid??"",0,4),a.restore()});let $=(a,z)=>{let G=i?8:16;a.fillStyle="#e6f6ee";for(let P=0;P<18;P+=2)a.fillRect(0,6+P*7,100,7);a.strokeStyle="#a9b7ae",a.lineWidth=.4;for(let P=0;P<=4;P+=1)a.beginPath(),a.moveTo(G+P*19,0),a.lineTo(G+P*19,134),a.stroke();a.font=`400 4.8px ${p}`,a.textAlign="center";for(let P=0;P<18;P+=1){a.fillStyle=g,a.fillText(o.format(P+1),i?96:8,11.5+P*7);for(let q=0;q<4;q+=1){let O=(P*7+q*13)%23,j=o.format(100+O*317);z&&O===4?(j="#REF!",a.fillStyle="#c2352b"):(z&&O===9&&(j="#####"),a.fillStyle=l),a.fillText(j,G+q*19+9.5,11.5+P*7)}}};w(3,a=>{$(a,!1),a.fillStyle="rgba(255,255,255,.92)",a.fillRect(0,0,100,16),b(a,d.ledger??"",12,10)}),w(4,a=>$(a,!0)),w(5,a=>{a.fillStyle="#c2352b",a.fillRect(8,8,84,7),a.fillStyle=l,a.font=`600 9px ${p}`,a.textAlign="center";for(let z=0;z<4;z+=1)a.fillText(o.format(1200+z*417),50,40+z*20)}),w(6,a=>{for(let z=0;z<16;z+=1)A(a,12+z*7.4,6,94,"#b7c2d8",.5);N(a,14,7,7.4,5)}),w(7,a=>{a.fillStyle="#fff",a.fillRect(0,0,100,134),a.fillStyle="#f7efd9",a.fillRect(18,18,64,30),b(a,d.ledger??"",38,11),a.fillStyle="#faf6ea",a.fillRect(0,62,100,5)}),w(8,a=>{b(a,d.invoice??"",20,13),N(a,30,12,6.6,3)}),w(9,a=>{N(a,12,16,7,17)}),w(10,a=>{a.fillStyle=l,a.font=`400 7px ${p}`,a.textAlign="center";for(let z=0;z<12;z+=1)a.fillText(o.format(90+z*233),50,12+z*10.5)});let lt=de(h);lt.anisotropy=4;let F=document.createElement("canvas");F.width=512,F.height=2048;let at=F.getContext("2d");at.fillStyle="#fff",at.fillRect(0,0,512,2048),at.direction=i?"rtl":"ltr",at.textBaseline="middle";let E=i?468:44;at.textAlign="start";let k=[];c.forEach((a,z)=>{k.push({text:a,big:!0}),u[z%Math.max(1,u.length)]&&k.push({text:u[z%u.length],big:!1})});let B=2048/Math.max(1,k.length);k.forEach((a,z)=>{at.fillStyle=a.big?"#1f2a24":"#3d4c44",at.font=a.big?`700 44px ${v}`:`400 25px ${i?v:p}`,at.fillText(a.text,E,B*(z+.5),424)});let ot=de(F);return ot.anisotropy=4,{texture:lt,printTexture:ot,services:c,phrases:u,words:d,display:v,mono:p,digits:a=>o.format(a),cell(a){let z=Math.max(0,bs.indexOf(a)),G=z%Kt,P=Math.floor(z/Kt);return[G/Kt,1-(P+1)/Kt,1/Kt,1/Kt]},title(a){return document.querySelector(`[data-shot="${a}"] .card__title, [data-shot="${a}"] .step__title`)?.textContent.trim()??""},canvas(a,z,G,P){let q=document.createElement("canvas");q.width=a,q.height=z;let O=q.getContext("2d");return O.direction=i?"rtl":"ltr",G(O,a,z),de(q,P)}}}var jo={L:{pixelCap:55e4,draws:28,tris:7e4,sheets:420,sheetSeg:2,stacks:180,dossiers:120,boxes:1400,weather:140,uxGrid:[32,45],shadowSize:1024,shadowTaps:1,atlas:512,dust:60,allReflections:!1,film:!1},M:{pixelCap:13e5,draws:45,tris:22e4,sheets:1100,sheetSeg:3,stacks:360,dossiers:240,boxes:3e3,weather:320,uxGrid:[48,68],shadowSize:1024,shadowTaps:4,atlas:1024,dust:150,allReflections:!0,film:!1},H:{pixelCap:28e5,draws:70,tris:6e5,sheets:2400,sheetSeg:4,stacks:720,dossiers:480,boxes:6e3,weather:700,uxGrid:[64,90],shadowSize:2048,shadowTaps:8,atlas:2048,dust:300,allReflections:!0,film:!0}};var Pe={clip:[.3,40],fog:26},pe=[{id:"hero",act:1,set:"desk",subject:{radius:.62,center:[0,.1,-.4]},pose:{lens:24,elevation:-15,portrait:{elevation:-28},pushIn:.15,...Pe},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:30},{id:"drop",act:1,set:"desk",idleHz:0,budget:{draws:12,tris:{L:3e4,M:8e4,H:2e5}},authored(r,n){let i=n.W/n.H,t=n.portrait?20:15.6,d=Math.tan(t*Math.PI/360),u=.24/(n.portrait?.92:.36)/(2*d*i),v=st.floorY;return[{t:.18,position:[0,-.03,u],elevation:-1,lens:20,clip:[.1,30],fog:26},{t:.48,position:[0,v*.72,u*.96],elevation:-2,lens:20,clip:[.1,30],fog:26},{t:.64,position:[0,.28,.5],elevation:-84,lens:36,clip:[.05,20],fog:20},{t:.84,position:[0,v-.25,.1],elevation:-90,lens:40,clip:[.04,20],fog:16},{t:.93,position:[0,st.slabBottom+.1,.5],elevation:-90,lens:24,clip:[.05,60],fog:40}]}},{id:"svc.head",act:2,set:"archive",pose:{lens:[24,62],elevation:-90,clip:[.2,90],fog:72},budget:{draws:8,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0,holdKnots:()=>[{t:0,position:[0,st.slabBottom-.6,1.5],lens:24},{t:1,position:[0,st.slabBottom-5.2,1.5],lens:62}]},{id:"svc.web",act:2,set:"archive",floor:"first",subject:{radius:1.3,center:[0,0,0]},pose:{lens:32,bearing:12,elevation:-6,drift:[0,-.15,-.5],clip:[.3,80],fog:62},budget:{draws:11,tris:{L:25e3,M:7e4,H:16e4}},idleHz:0,stripYaw:0},{id:"svc.apps",act:2,set:"archive",floor:"locked",subject:{radius:1.1,center:[0,0,0]},pose:{lens:32,bearing:[-12,13],elevation:-4,clip:[.3,80],fog:62},budget:{draws:9,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"svc.api",act:2,set:"archive",floor:"locked",subject:{radius:1.75,center:[0,.35,.3]},pose:{lens:32,bearing:-18,elevation:14,drift:[0,-.2,-.3],clip:[.3,80],fog:60},budget:{draws:14,tris:{L:3e4,M:8e4,H:18e4}},idleHz:0},{id:"svc.rescue",act:2,set:"archive",floor:"locked",subject:{radius:1.2,center:[0,0,0]},pose:{lens:30,bearing:10,elevation:-8,roll:[0,7],clip:[.3,80],fog:58},budget:{draws:12,tris:{L:24e3,M:7e4,H:16e4}},idleHz:0},{id:"svc.ux",act:2,set:"archive",floor:"locked",subject:{radius:1.5,center:[0,0,0]},pose:{lens:28,elevation:0,clip:[.3,80],fog:56},budget:{draws:8,tris:{L:24e3,M:6e4,H:14e4}},idleHz:0},{id:"svc.auto",act:2,set:"archive",floor:"locked",subject:{radius:1.4,center:[0,0,0]},pose:{lens:30,bearing:90,elevation:-3,clip:[.3,80],fog:54},budget:{draws:9,tris:{L:22e3,M:6e4,H:14e4}},idleHz:30},{id:"process.head",act:3,set:"archive",floor:{clear:9},subject:{radius:4,center:[0,0,0]},pose:{lens:50,elevation:-90,shift:[0,0,1.1],clip:[.05,90],fog:70},budget:{draws:10,tris:{L:26e3,M:7e4,H:16e4}},idleHz:0,exitKnots(r,n,i){let t=i.floorY;return[{t:.55,position:[.16,t+3.2,.18],elevation:-90,lens:44,clip:[.05,70],fog:60},{t:.74,position:[.16,t-.9,.12],elevation:-90,lens:44,clip:[.05,70],fog:60}]}},{id:"step.talk",act:3,set:"archive",floor:{clear:5},subject:{radius:1.5,center:[0,.1,0]},pose:{lens:28,bearing:8,elevation:-10,clip:[.2,70],fog:42},budget:{draws:10,tris:{L:25e3,M:7e4,H:16e4}},idleHz:0},{id:"step.scope",act:3,set:"archive",floor:"locked",subject:{radius:1.75,center:[0,0,0]},pose:{lens:28,bearing:-6,elevation:-24,clip:[.2,70],fog:40},budget:{draws:8,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"step.build",act:3,set:"archive",floor:"locked",subject:{radius:1.25,center:[0,0,.3]},pose:{lens:28,bearing:[20,-10],elevation:-8,clip:[.2,70],fog:40},budget:{draws:9,tris:{L:26e3,M:7e4,H:16e4}},idleHz:0},{id:"step.ship",act:3,set:"archive",floor:"locked",subject:{radius:1.6,center:[0,-.2,0]},pose:{lens:28,elevation:[-12,-74],clip:[.2,70],fog:40},budget:{draws:7,tris:{L:22e3,M:6e4,H:14e4}},idleHz:0},{id:"fall",act:3,set:"none",idleHz:0,budget:{draws:4,tris:{L:3e3,M:6e3,H:12e3}},authored(r){let n=r["step.ship"],i=r["why.q"],t=n.floorY-2,d=i.floorY+i.d+1.6;return[{t:.2,position:[.2,t,.2],elevation:-90,lens:70,clip:[.05,60],fog:44},{t:.86,position:[.05,d+1.2,.06],elevation:-90,lens:70,clip:[.05,40],fog:34}]}},{id:"why.q",act:4,set:"desk",desk:!0,floor:{clear:26},subject:{radius:.85,center:[0,0,-.4]},pose:{lens:40,elevation:-90,...Pe},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:30},{id:"why.list",act:4,set:"desk",desk:!0,subject:{radius:.8,center:[0,0,-.4]},pose:{lens:40,elevation:-90,...Pe},budget:{draws:18,tris:{L:55e3,M:14e4,H:3e5}},idleHz:0},{id:"why.stats",act:4,set:"desk",desk:!0,subject:{radius:.7,center:[0,0,-.4]},pose:{lens:36,elevation:-70,...Pe},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0},{id:"cta",act:4,set:"desk",desk:!0,subject:{radius:.55,center:[0,0,-.4]},pose:{lens:40,elevation:-90,clip:[.02,12],fog:26},solve(r,n){let{W:i,H:t,portrait:d}=n,c=r.shot.caption,u=r.fov*Math.PI/180,v=Math.tan(u/2)*(i/t),p=.072,o=.148;if(d)r.d=.0775*.965/(2*v),r.ox=0,r.oy=0;else{let s=Math.max((c.w+32)/o,(c.h+32)/p);r.d=i/s/(2*v),r.ox=i/2-(c.x+c.w/2),r.oy=t/2-(c.y+c.h/2)}},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0},{id:"coda",act:4,set:"desk",desk:!0,subject:{radius:.62,center:[0,.1,-.4]},pose:{lens:24,elevation:-15,...Pe},budget:{draws:12,tris:{L:14e3,M:6e4,H:14e4}},idleHz:0}],Vo={hero:()=>import("./chunk-FQ644PTX.js"),drop:()=>import("./chunk-FL6CESEL.js"),"svc.head":()=>import("./chunk-RSFST4BX.js"),"svc.web":()=>import("./chunk-BU75ANWF.js"),"svc.apps":()=>import("./chunk-SPG4BJQV.js"),"svc.api":()=>import("./chunk-NAYGZMI2.js"),"svc.rescue":()=>import("./chunk-4WBBAYPS.js"),"svc.ux":()=>import("./chunk-2ALBFH2P.js"),"svc.auto":()=>import("./chunk-ZJHTRPCR.js"),"process.head":()=>import("./chunk-QILWQIDR.js"),"step.talk":()=>import("./chunk-6NUKT6FF.js"),"step.scope":()=>import("./chunk-4GXKCHKF.js"),"step.build":()=>import("./chunk-O2FCLXP4.js"),"step.ship":()=>import("./chunk-R65BVCNZ.js"),fall:()=>import("./chunk-DJNW65WT.js"),"why.q":()=>import("./chunk-CQ55MCPA.js"),"why.list":()=>import("./chunk-GCBXT2J2.js"),"why.stats":()=>import("./chunk-PCMLZPEU.js"),cta:()=>import("./chunk-TYQRNBVE.js"),coda:()=>import("./chunk-F3VOJLJZ.js")};var qt=st.archiveHalf,fe=st.galleryH,wt=11.4;function Xo(r,n){return r.canvas(512,512,t=>{let d=Gt(`shelf-${n}`);t.fillStyle=n===0?"#2a2520":"#0a0c11",t.fillRect(0,0,512,512);let c=6,u=512/c;for(let v=0;v<c;v+=1){let p=0;for(;p<512;){let o=8+d()*22,s=u*(.74+d()*.22);if(n===0){let h=d(),f=.5+d()*.5,m=h<.6?[176,136,86]:h<.8?[214,202,170]:h<.92?[96,110,128]:[150,70,60];t.fillStyle=`rgb(${m[0]*f},${m[1]*f},${m[2]*f})`,t.save(),t.translate(p+o/2,u*(v+1)-4),t.rotate(d()>.86?(d()-.5)*.5:0),t.fillRect(-o/2,-s,o-1.5,s),t.fillStyle="rgba(255,255,255,.35)",t.fillRect(-o/2+o*.25,-s*.82,o*.4,s*.2),t.restore()}else{let h=12+d()*10;t.fillStyle=`rgb(${h},${h+2},${h+8})`,t.fillRect(p,u*(v+1)-s-4,o-2,s),d()>.72&&(t.fillStyle=d()>.8?"#a48bff":"#5dffde",t.fillRect(p+o/2-1,u*(v+1)-s,1.5,s-8))}p+=o}t.fillStyle=n===0?"#141210":"#1c2027",t.fillRect(0,u*(v+1)-4,512,4)}},{repeat:!0})}function Jo({programs:r,text:n,q:i,dir:t}){let d=new se;d.name="archive";let c={uTurn:{value:0},uOrderY:{value:new le(st.slabBottom,-60)},uGalleryH:{value:fe}},u=40,v=new At(qt*2,fe*u,4,u),p=v.attributes.uv;for(let R=0;R<p.count;R+=1)p.setXY(R,p.getX(R)*8,p.getY(R)*u);let o=[[0,0,-qt,0],[0,0,qt,Math.PI],[-qt,0,0,Math.PI/2],[qt,0,0,-Math.PI/2]].map(([R,I,Y,Z])=>{let S=v.clone();return S.rotateY(Z),S.translate(R,I,Y),S}),s=Ct(o.map(R=>R.toNonIndexed())),h=Xo(n,0);h.anisotropy=8;let f=Xo(n,1);f.anisotropy=8;let m=r.paper({atlas:{value:h},ambient:.03,boost:.62,deform:{pars:"uniform float uTurn, uGalleryH; out float vTurn, vLit;",fpars:"uniform sampler2D uShelf2; in float vTurn, vLit;",world:`
        wp.y += floor(uCamY / uGalleryH) * uGalleryH;
        {
          float along = abs(wn.z) > 0.5 ? wp.x : wp.z;
          vTurn = smoothstep(0.0, 1.0, uTurn * 2.2 - (along * uInline / 14.0 * 0.5 + 0.5) - 0.1);
        }
        vLit = uTurn;`,frag:"c = mix(c, texture(uShelf2, vUv).rgb * (vec3(0.42) + vHouse * 0.7), vTurn);",uniforms:{uTurn:c.uTurn,uGalleryH:c.uGalleryH,uShelf2:{value:f}}}}),l=new U(s,m);l.frustumCulled=!1,d.add(l);let g=[.26,.25,.25],w=R=>`wp.y -= floor((iPos.y - uCamY) / ${R.toFixed(2)} + 0.5) * ${R.toFixed(2)};`,M=_t(new Tt(1,1,1)),b=18,A=[];for(let R=0;R<b;R+=1){let I=-R*fe;for(let[Y,Z]of[[1,0],[-1,0],[0,1],[0,-1]]){let S=wt*2+6,J=(qt+wt)/2;A.push({pos:[Y*J,I-.1,Z*J],scale:Y?[qt-wt,.2,S]:[S,.2,qt-wt],tint:g}),A.push({pos:[Y*wt,I+.95,Z*wt],scale:Y?[.06,.06,S]:[S,.06,.06],tint:[.55,.52,.48]}),A.push({pos:[Y*wt,I+.55,Z*wt],scale:Y?[.03,.03,S]:[S,.03,.03],tint:[.4,.38,.36]})}}let N=new U(Pt(M,A.length,(R,I)=>{let Y=A[R];I.pos=Y.pos,I.scale=Y.scale,I.tint=Y.tint}),r.solid({ambient:.05,defines:{INSTANCED:1},deform:{world:w(fe*b)}}));N.frustumCulled=!1,d.add(N);let $=[];for(let R of[-1,1])for(let I of[-wt,-wt/3,wt/3,wt])$.push([R*wt,I]),$.push([I,R*wt]);let lt=new U(Pt(_t(new Tt(.34,1,.34,1,44,1)),$.length,(R,I)=>{I.pos=[$[R][0],0,$[R][1]],I.scale=[1,180,1],I.tint=[.36,.35,.34]}),r.solid({ambient:.05,defines:{INSTANCED:1},deform:{world:"wp.y += uCamY;"}}));lt.frustumCulled=!1,d.add(lt);let F=Gt("archive"),E=Math.max(3,Math.round(i.boxes/460))*fe,k=_t(new Tt(1,1,.8)),B=k.attributes.normal;for(let R=0;R<B.count;R+=1)B.getZ(R)<-.5&&k.attributes.aColor.setXYZ(R,0,0,0);let ot=Ct([k,V(.05,.86,.01,{at:[0,0,-.41],color:[.36,1,.87],mat:2})]),a=i.boxes,z=new U(Pt(ot,a,(R,I)=>{let Y=R%4,Z=(F()*2-1)*(qt-1),S=-F()*E,J=(F()-.5)*.5,pt=qt-.3-F()*2.2,bt=.5+F()*.5,Ht=.55+F()*.4;Y===0?(I.pos=[Z,S,-pt],Ut(0,0,J,I.quat)):Y===1?(I.pos=[Z,S,pt],Ut(0,Math.PI,J,I.quat)):Y===2?(I.pos=[-pt,S,Z],Ut(0,Math.PI/2,J,I.quat)):(I.pos=[pt,S,Z],Ut(0,-Math.PI/2,J,I.quat)),I.scale=[bt,Ht,.4];let ut=.62+F()*.38,gt=F();I.tint=gt<.62?[.74*ut,.56*ut,.33*ut]:gt<.86?[.86*ut,.8*ut,.66*ut]:gt<.95?[.38*ut,.44*ut,.52*ut]:[.6*ut,.24*ut,.2*ut],I.seed=F()}),r.solid({ambient:.05,defines:{INSTANCED:1},deform:{pars:"uniform float uTurn; uniform vec2 uOrderY; out float vBack;",local:`
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
          }`,uniforms:{uTurn:c.uTurn,uOrderY:c.uOrderY}}}));z.frustumCulled=!1,d.add(z);let G=new At(1,1,1,3),P=["ledger","invoice","lines","sheet","memo","receipt"],q=Math.min(180,Math.floor(i.weather*.75)),O=new U(Pt(G,q,(R,I)=>{let Y=R%4,Z=(F()*2-1)*(wt-.5),S=-Math.floor(F()*18)*fe+.3;I.pos=Y===0?[Z,S,-wt]:Y===1?[Z,S,wt]:Y===2?[-wt,S,Z]:[wt,S,Z],Ut(0,Y<2?0:Math.PI/2,(F()-.5)*.2,I.quat);let J=.55+F()*.6;I.scale=[J,J*1.42,1],I.cell=n.cell(P[Math.floor(F()*P.length)]);let pt=.75+F()*.25;I.tint=[pt,pt,pt*.95]}),r.paper({ambient:.05,defines:{INSTANCED:1},deform:{world:w(fe*18)}}));O.frustumCulled=!1,d.add(O);let j=new At(.34,.46),K=new U(Pt(j,i.weather,(R,I)=>{I.pos=[(F()*2-1)*10.5,-F()*24,(F()*2-1)*10.5],I.cell=n.cell(P[Math.floor(F()*P.length)]);let Y=.78+F()*.22;I.tint=[Y,Y,Y*.95],I.seed=F()}),r.paper({ambient:.08,defines:{INSTANCED:1},deform:{pars:"uniform float uTurn;",local:`{
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
        }`,uniforms:{uTurn:c.uTurn}}}));K.frustumCulled=!1,d.add(K);let ct=a,dt=i.weather;return{group:d,u:c,*build(){yield},setRange(R,I){c.uOrderY.value.set(R,I)},setDensity(R){z.geometry.instanceCount=Math.floor(ct*R),K.geometry.instanceCount=Math.floor(dt*R)},setWeather(R){K.visible=R,O.visible=R}}}var Be={pars:"in float iClear; uniform float uClear;",world:`
    float clearF = clamp((uClear - iClear - seed * 0.34) / 0.62, 0.0, 1.0);
    if (clearF > 0.0) {
      clearF *= clearF;
      vec3 away = wp - (uLampOrigin + vec3(0.0, 0.0, -0.4));
      away.y = 0.0;
      wp += normalize(away + vec3(0.001)) * clearF * 2.4;
      wp.y += clearF * 0.9 - clearF * clearF * 1.9;
    }`};function Ms(){let i=document.createElement("canvas");i.width=1024,i.height=512;let t=i.getContext("2d");t.fillStyle="#7b4c2b",t.fillRect(0,0,1024,512);let d=Gt("walnut");for(let c=0;c<520;c+=1){let u=d()*512,v=d()>.45;t.strokeStyle=v?`rgba(44,22,10,${.05+d()*.2})`:`rgba(180,120,74,${.03+d()*.1})`,t.lineWidth=.5+d()*2.4,t.beginPath(),t.moveTo(0,u);let p=d()*1.2;for(let o=0;o<=1024;o+=48)u+=(d()-.5)*4*p,t.lineTo(o,u);t.stroke()}for(let c=0;c<3;c+=1){let u=d()*1024,v=d()*512;for(let p=8;p<90;p+=5+d()*5)t.strokeStyle=`rgba(40,20,9,${.1+d()*.09})`,t.lineWidth=.8,t.beginPath(),t.ellipse(u,v,p*3.2,p*.8,0,0,Math.PI*2),t.stroke()}return de(i)}function Ko({programs:r,shared:n,text:i,q:t,dir:d}){let c=y=>y*d,u=new se;u.name="desk";let v={uClear:{value:0},uRing:{value:0},uRingOn:{value:0}},p=new vt(c(.27),.62,-.5),o=[c(-.02),-.38],s=[o[0],o[1]],h=new mo(t.shadowSize,t.shadowSize,{depthTexture:new xo(t.shadowSize,t.shadowSize,ro)});h.depthTexture.compareFunction=uo,h.depthTexture.minFilter=ve,h.depthTexture.magFilter=ve;let f=new $e,m={uMap:{value:Ms()},uShadow:{value:h.depthTexture},uClear:v.uClear,uDawnStripes:{value:1},uAmbient:{value:.045},uShadowTaps:{value:t.shadowTaps},uGloss:{value:1},uRings:{value:[1,0,0,0]},uRingCentreA:{value:[c(-.2),-.21,.046]},uRingCentreB:{value:[c(-.112),-.21,.046]},uTint:{value:[1,1,1]},uLampMatrix:{value:f}},l=new U(new Tt(1.6,.045,.8),r.wood({uniforms:m}));l.position.set(0,-.0225,-.4),u.add(l);let g={...m,uTint:{value:[.34,.31,.28]},uGloss:{value:0},uRings:{value:[0,0,0,0]}},w=.5,M=new U(Ct([[0,-w-2.5,10,5],[0,w+2.5,10,5],[-w-2.5,0,5,w*2],[w+2.5,0,5,w*2]].map(([y,T,L,H])=>{let X=new Tt(L,.1,H);return X.translate(y,st.floorY-.05,T),X})),r.wood({uniforms:g}));u.add(M);let b=[c(-.52),0,-.56],A=[c(-.156),0,-.21],N=[c(.66),.88,-.95],$=[c(.31),0,-.64],lt=[c(.62),0,-.62],F=[c(.72),.42,-.62],at=[c(.27),.72,-.5],E=[.24,.14,.08],k=Ct([V(.07,.75,.07,{at:[-.74,-.4,-.06],color:E}),V(.07,.75,.07,{at:[.74,-.4,-.06],color:E}),V(.07,.75,.07,{at:[-.74,-.4,-.74],color:E}),V(.07,.75,.07,{at:[.74,-.4,-.74],color:E}),V(1.42,.09,.02,{at:[0,-.1,-.03],color:E}),V(.1,.012,.018,{at:[c(.42),-.1,-.014],color:[.76,.58,.3],mat:1}),V(.1,.012,.018,{at:[c(-.42),-.1,-.014],color:[.76,.58,.3],mat:1}),...Io(N),...zo(lt,F,at,d),...Oo(A,d),V(.07,.006,.07,{at:[c(-.02),.003,-.7],color:[.25,.25,.27]}),_t(new je(.002,.003,.17,6),{at:[c(-.02),.09,-.7],color:[.7,.7,.72]})]),B=new U(k,r.solid({ambient:.17,house:0}));u.add(B);let ot=new U(Ct([V(12,7,.1,{at:[0,1.6,-1.05],color:[.62,.6,.6]}),V(12,.12,.03,{at:[0,st.floorY+.06,-.99],color:[.2,.18,.17]}),V(1.62,.04,.04,{at:[c(-.46),1.54,-.97],color:[.55,.52,.5]}),V(1.62,.04,.04,{at:[c(-.46),.5,-.97],color:[.55,.52,.5]}),V(.04,1.08,.04,{at:[c(-1.27),1.02,-.97],color:[.55,.52,.5]}),V(.04,1.08,.04,{at:[c(.35),1.02,-.97],color:[.55,.52,.5]})]),r.solid({ambient:.2,house:0}));u.add(ot);let a=new U(Ct(Po($,d)),B.material),z=Ve([[b[0]-.11*d,.05,b[2]+.03],[b[0]-.17*d,.03,b[2]+.06],[b[0]-.2*d,.012,b[2]+.13],[b[0]-.19*d,.05,b[2]-.03],[b[0]-.13*d,.11,b[2]-.08]],24),G=r.solid({house:0,deform:Co()}),P=new U(Ct([...Ro(b),z]),G);u.add(a,P);let q={x:b[0],y:.135,z:b[2]-.08},O=new U(ko(),G);O.name="handset",O.position.set(q.x,q.y,q.z),u.add(O);let j=new U(Ve([[0,0,0],[0,-.2,0],[0,-.4,.01],[0,-.6,0]],22,.008),G);j.visible=!1,u.add(j);let K=B.material,ct=new U(V(.012,.095,.004,{at:[0,.042,0],color:[.1,.1,.1]}),K),dt=new U(V(.007,.14,.004,{at:[0,.064,0],color:[.1,.1,.1]}),K);ct.position.set(N[0],N[1],N[2]+.026),dt.position.set(N[0],N[1],N[2]+.03),u.add(ct,dt);let R=c(-.46),I=new U(_t(new At(1.58,1),{at:[R,1.02,-.985],color:[.075,.11,.21],mat:2}),r.solid({house:0,deform:{fpars:"uniform highp float uDawn;",frag:"c = mix(c, mix(vec3(0.365, 1.0, 0.87), vec3(0.643, 0.545, 1.0), clamp((vLampP.x + 0.5) * 0.7, 0.0, 1.0)), uDawn);"}}));u.add(I);let Y=V(1.58,.042,.004,{color:[.72,.72,.7]});Y.deleteAttribute("uv");let Z=new U(Pt(Y,24,(y,T)=>{T.pos=[R,.54+(y+.5)*.0405,-.965]}),r.solid({house:0,ambient:.14,defines:{INSTANCED:1},deform:{local:`{
          float a = mix(0.86, 1.32, uDawn);
          float ca = cos(a), sa = sin(a);
          p = vec3(p.x, p.y * ca - p.z * sa, p.y * sa + p.z * ca);
          n = vec3(n.x, n.y * ca - n.z * sa, n.y * sa + n.z * ca);
        }`}}));Z.frustumCulled=!1,u.add(Z);let S=Gt("desk"),J=[{x:-.66,z:-.3,h:.34},{x:-.58,z:-.68,h:.44},{x:-.27,z:-.67,h:.27},{x:.66,z:-.22,h:.2},{x:-.36,z:-.28,h:.13},{x:-.14,z:-.7,h:.15},{x:.66,z:-.42,h:.1},{x:-.7,z:-.08,h:.09}],pt=[],bt=new Map;for(let y of J){let T=0,L=0,H=0;for(;T<y.h&&pt.length<t.stacks;){let X=.01+S()*.022;L+=(S()-.5)*.012,H+=(S()-.5)*.012,pt.push({x:y.x+L,y:T+X/2,z:y.z+H,h:X,yaw:(S()-.5)*.34}),T+=X}bt.set(y,{y:T,x:y.x+L,z:y.z+H})}let Ht=new Tt(1,1,1);Ht.deleteAttribute("uv");let ut=_t(Ht),gt=new U(Pt(ut,pt.length,(y,T)=>{let L=pt[y];T.pos=[c(L.x),L.y,L.z],Ut(0,L.yaw,0,T.quat),T.scale=[.21+S()*.03,L.h,.297+S()*.03];let H=.74+S()*.26;T.tint=S()>.86?[H,H*.84,H*.72]:[H,H,H*.95],T.extra.iClear=2},{iClear:1}),r.solid({house:0,ambient:.13,defines:{INSTANCED:1},deform:Be}));gt.frustumCulled=!1,u.add(gt);let Zt=[{x:.5,z:-.14,n:.3},{x:-.5,z:-.2,n:.3},{x:-.3,z:-.5,n:.26}],St=_t(new Tt(1,1,1)),nt=[];for(let y of Zt){let T=Math.floor(t.dossiers*y.n*.5),L=0;for(let H=0;H<T&&L<.2;H+=1){let X=.016+S()*.014,et=(S()-.5)*.5,ht=.7+S()*.3;nt.push({x:y.x+(S()-.5)*.02,y:L+X/2,z:y.z+(S()-.5)*.02,yaw:et,sx:.24,sy:X,sz:.33,tint:[.86*ht,.7*ht,.42*ht]}),nt.push({x:y.x,y:L+X+6e-4,z:y.z,yaw:et,sx:.016,sy:.0015,sz:.335,tint:[.92,.9,.84]}),L+=X}}let Dt=new U(Pt(St,nt.length,(y,T)=>{let L=nt[y];T.pos=[c(L.x),L.y,L.z],Ut(0,L.yaw,0,T.quat),T.scale=[L.sx,L.sy,L.sz],T.tint=L.tint,T.extra.iClear=2},{iClear:1}),r.solid({house:0,ambient:.13,defines:{INSTANCED:1},deform:Be}));Dt.frustumCulled=!1,u.add(Dt);let ke=new At(1,1,t.sheetSeg,t.sheetSeg);ke.rotateX(-Math.PI/2);let Oe=["invoice","ledger","quote","receipt","lines","sheet","memo","invoice","carbon","slip"],it=[],ft=Math.min(30,Math.floor(t.sheets*.1));for(let y=0;y<ft;y+=1){let T=.36+S()*.46,L=S()*Math.PI*2,H=Math.cos(L)*T*1.08,X=-.4+Math.sin(L)*T*.42;it.push({x:H,z:X,y:.0012+S()*.012,yaw:S()*6.28,kind:0,clear:S()>.4?0:1})}for(let[y,T]of bt){let L=Math.floor(t.sheets*.5/J.length*(.5+y.h*2));for(let H=0;H<L;H+=1)it.push({x:T.x+(S()-.5)*.06,z:T.z+(S()-.5)*.06,y:T.y+H*.0015,yaw:(S()-.5)*.7,kind:1,clear:2})}let $t=Math.min(8,Math.floor(t.sheets*.02));for(let y=0;y<$t;y+=1){let T=y%2===0?1:-1;it.push({x:T*(.24+S()*.46),z:-.08+S()*.05,y:.002+S()*.004,yaw:(S()-.5)*.3,kind:2,clear:0})}let D=Math.max(0,Math.floor(t.sheets*.24));for(let y=0;y<D;y+=1){let T=S()*Math.PI*2,L=.7+S()*1.5,H=Math.cos(T)*L*1.2,X=.1+Math.abs(Math.sin(T))*L*.7;Math.hypot(H,X)>.75&&it.push({x:H,z:X,y:st.floorY+.002+S()*.004,yaw:S()*6.28,kind:0,clear:2})}for(let y=0;y<8;y+=1)it.push({x:-.02+(S()-.5)*.015,z:-.7+(S()-.5)*.015,y:.02+y*.012,yaw:S()*6.28,kind:3,clear:2});let jt=r.paper({house:0,ambient:.05,defines:{INSTANCED:1},deform:{pars:`${Be.pars} in float iCurl;`,local:`
        float cx = uv.x - 0.5, cz = uv.y - 0.5;
        p.y += (cx * cx * 0.03 + cz * cz * 0.05) * iCurl;
        /* A sheet by the edge lifts a little in the draught from the printer. */
        p.y += sin(uTime * 2.6 + seed * 37.0) * 0.0012 * max(iCurl - 0.8, 0.0) * (cz + 0.5);
        n.xz -= vec2(cx * 0.06, cz * 0.1) * iCurl;`,world:Be.world}}),Qt=new U(Pt(ke,it.length,(y,T)=>{let L=it[y],H=L.kind===3;T.pos=[c(L.x),L.y,L.z],Ut(0,L.yaw,0,T.quat),T.scale=H?[.08,1,.16]:[.21,1,.297];let X=H?"receipt":Oe[Math.floor(S()*Oe.length)];T.cell=i.cell(X);let et=.82+S()*.18;T.tint=X==="carbon"?[.98,.72*et,.72*et]:X==="slip"?[.99,.9*et,.62*et]:[et,et,et*.96],T.extra.iClear=L.clear,T.extra.iCurl=L.kind===2?1.6:.5+S()},{iClear:1,iCurl:1}),jt);Qt.frustumCulled=!1,u.add(Qt);let Nt=new U(new At(.34,.34),r.glow({color:[1,.74,.46],alpha:.5,defines:{BILLBOARD:1}}));Nt.position.set(p.x,p.y+.03,p.z),Nt.frustumCulled=!1,u.add(Nt);let te=new U(Pt(new At(1,1),2,(y,T)=>{T.pos=y===0?[c(.34),.42,-.985]:[c(-.46),.95,-.98],T.scale=y===0?[2.6,1.9,1]:[3.2,2.2,1],T.tint=y===0?[.13,.086,.047]:[.028,.038,.067]}),r.glow({defines:{INSTANCED:1}}));te.frustumCulled=!1,u.add(te);let Bt=new je(.05,.54,.86,26,1,!0),zt=new U(Bt,r.glow({color:[1,.72,.42],alpha:.13,shape:5,deform:{frag:"a = vUv.y * vUv.y; { float f = abs(dot(normalize(vN), normalize(vV))); a *= f * f; }"}}));zt.frustumCulled=!1,u.add(zt);let xe=new At(.009,.009),Vt=new U(Pt(xe,t.dust,(y,T)=>{let L=Math.sqrt(S()),H=S()*Math.PI*2,X=L*.34;T.pos=[p.x+(s[0]-p.x)*L+Math.cos(H)*X,p.y*(1-L)+.04,p.z+(s[1]-p.z)*L+Math.sin(H)*X],T.tint=[1,.82,.6]}),r.glow({alpha:.42,defines:{INSTANCED:1,BILLBOARD:1},deform:{world:"wp += vec3(sin(uTime * 0.21 + seed * 40.0), sin(uTime * 0.17 + seed * 90.0), cos(uTime * 0.19 + seed * 70.0)) * 0.03;"}}));Vt.frustumCulled=!1,u.add(Vt);let Lt=p.clone(),Rt=new Fe(122,1,.05,2.2),be=new vt(0,0,-1),Wt=new vt,Yt={x:0,y:0,z:0},Xt=0,ne=0,ae=new $e().set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.4975,0,0,0,1),rt=Qt.geometry.instanceCount,he=gt.geometry.instanceCount,Se=Dt.geometry.instanceCount,ee=y=>{ct.rotation.z=-(y%12/12)*Math.PI*2,dt.rotation.z=-(y%1)*Math.PI*2};return ee(3.2),{group:u,u:v,setClock:ee,lampPos:Lt,pool:o,*build(){yield},setActPositions(y){Yt=y},setPhone(y){y.position.set(0,.0043,-.4),y.visible=!1,u.add(y),this.phone=y},setAct(y){y===4?u.position.set(Yt.x,Yt.y,Yt.z):u.position.set(0,0,0)},setSpot(y,T){s[0]=y,s[1]=T},resetSpot(){s[0]=o[0],s[1]=o[1]},setRing(y){Xt=y},setOffHook(y){ne=y},setShadowTaps(y){m.uShadowTaps.value=y},setDensity(y){Qt.geometry.instanceCount=Math.floor(rt*y),gt.geometry.instanceCount=Math.floor(he*y),Dt.geometry.instanceCount=Math.floor(Se*y)},setExtras(y){Vt.visible=y,zt.visible=y},bakeShadow(y){let T=[l,M,Nt,zt,Vt,I,Z,ot,te,j];this.phone&&T.push(this.phone);let L=T.map(mt=>mt.visible),H=u.position.clone(),X=v.uClear.value,et=u.visible;u.visible=!0,T.forEach(mt=>{mt.visible=!1}),u.position.set(0,0,0),this.setClear(0),O.position.set(q.x,q.y,q.z),O.rotation.set(0,0,0),O.visible=!0,u.updateMatrixWorld(!0),n.uLampOrigin.value.set(0,0,0),Rt.position.copy(Lt),Rt.up.copy(be),Rt.lookAt(c(-.02),0,-.38),Rt.updateMatrixWorld(),Rt.updateProjectionMatrix();let ht=y.getRenderTarget();y.setRenderTarget(h),y.clear(),y.render(u,Rt),y.setRenderTarget(ht),f.multiplyMatrices(ae,Rt.projectionMatrix).multiply(Rt.matrixWorldInverse),T.forEach((mt,ie)=>{mt.visible=L[ie]}),u.position.copy(H),u.visible=et,this.setClear(X),u.updateMatrixWorld(!0)},setClear(y){v.uClear.value=y,m.uClear.value=y;let T=(H,X,et)=>{let ht=Eo((y-X)/.7),mt=ht*ht;H.position.set(et*mt*2.2*d,mt*.5-mt*mt*1.6,-mt*.2),H.rotation.z=-mt*1.2*et*d,H.visible=ht<1};T(P,1,-1),T(a,2,1);let L=y>=3;Qt.visible=!L,gt.visible=!L,Dt.visible=!L},update(y,T){let L=T%3,H=L<.42||L>.62&&L<1.04?1:0,X=Math.abs(Math.sin(T*37.7))*.006*H*Xt,et=Math.sin(T*75)*.012*H*Xt,ht=ue(0,.5,ne),mt=ue(.42,1,ne),ie=q.x+(-.3*d-q.x)*ht,me=q.z+(.1-q.z)*ht;O.position.set(ie+P.position.x,q.y+X-mt*.62+P.position.y,me+P.position.z),O.rotation.set(mt*1.3,0,ht*.9*d+et+P.rotation.z),O.visible=P.visible,j.visible=mt>.02,j.position.set(ie,0,me-.02),j.scale.y=Math.max(.01,mt);let Me=s[0]+(y.pointer===1?y.px*.2:0),It=s[1]+(y.pointer===1?y.py*.12:0);Wt.set(Me-Lt.x,-Lt.y,It-Lt.z).normalize(),n.uLampDir.value.copy(Wt),n.uLampPos.value.copy(Lt),n.uLampCone.value.set(.6,.93),zt.position.set(Lt.x+Wt.x*.43,Lt.y+Wt.y*.43,Lt.z+Wt.z*.43),zt.quaternion.setFromUnitVectors(Es,Wt.negate())}}}var Es=new vt(0,1,0);var ze=new vt;function kt(r,n,i,t,d,c){let u=2*Math.PI*d/4,v=Math.max(c-2*d,0),p=Math.PI/4;ze.copy(n),ze[t]=0,ze.normalize();let o=.5*u/(u+v),s=1-ze.angleTo(r)/p;return Math.sign(ze[i])===1?s*o:v/(u+v)+o+o*(1-s)}var Re=class r extends Tt{constructor(n=1,i=1,t=1,d=2,c=.1){let u=d*2+1;if(c=Math.min(n/2,i/2,t/2,c),super(1,1,1,u,u,u),this.type="RoundedBoxGeometry",this.parameters={width:n,height:i,depth:t,segments:d,radius:c},u===1)return;let v=this.toNonIndexed();this.index=null,this.attributes.position=v.attributes.position,this.attributes.normal=v.attributes.normal,this.attributes.uv=v.attributes.uv;let p=new vt,o=new vt,s=new vt(n,i,t).divideScalar(2).subScalar(c),h=this.attributes.position.array,f=this.attributes.normal.array,m=this.attributes.uv.array,l=h.length/6,g=new vt,w=.5/u;for(let M=0,b=0;M<h.length;M+=3,b+=2)switch(p.fromArray(h,M),o.copy(p),o.x-=Math.sign(o.x)*w,o.y-=Math.sign(o.y)*w,o.z-=Math.sign(o.z)*w,o.normalize(),h[M+0]=s.x*Math.sign(p.x)+o.x*c,h[M+1]=s.y*Math.sign(p.y)+o.y*c,h[M+2]=s.z*Math.sign(p.z)+o.z*c,f[M+0]=o.x,f[M+1]=o.y,f[M+2]=o.z,Math.floor(M/l)){case 0:g.set(1,0,0),m[b+0]=kt(g,o,"z","y",c,t),m[b+1]=1-kt(g,o,"y","z",c,i);break;case 1:g.set(-1,0,0),m[b+0]=1-kt(g,o,"z","y",c,t),m[b+1]=1-kt(g,o,"y","z",c,i);break;case 2:g.set(0,1,0),m[b+0]=1-kt(g,o,"x","z",c,n),m[b+1]=kt(g,o,"z","x",c,t);break;case 3:g.set(0,-1,0),m[b+0]=1-kt(g,o,"x","z",c,n),m[b+1]=1-kt(g,o,"z","x",c,t);break;case 4:g.set(0,0,1),m[b+0]=1-kt(g,o,"x","y",c,n),m[b+1]=1-kt(g,o,"y","x",c,i);break;case 5:g.set(0,0,-1),m[b+0]=kt(g,o,"x","y",c,n),m[b+1]=1-kt(g,o,"y","x",c,i);break}}static fromJSON(n){return new r(n.width,n.height,n.depth,n.segments,n.radius)}};var Ls=[.2,.21,.25],Ts=[.365,1,.87];function Zo({programs:r,text:n,dir:i}){let t=(o,s,h)=>_t(new Re(o,s,h,4,Math.min(h*.45,o*.12)),{color:Ls}),d=null;function c({w:o=.78,h:s=1.6,t:h=.09,emissive:f=1}={}){let m=new se,l=new U(Ct([t(o,h,s),V(o*.965,h*.02,o*.012,{at:[0,h/2+.001,-s*.482],color:[.7,.72,.76],mat:1}),V(o*.965,h*.02,o*.012,{at:[0,h/2+.001,s*.482],color:[.7,.72,.76],mat:1}),V(o*.012,h*.02,s*.965,{at:[-o*.482,h/2+.001,0],color:[.7,.72,.76],mat:1}),V(o*.012,h*.02,s*.965,{at:[o*.482,h/2+.001,0],color:[.7,.72,.76],mat:1})]),r.solid({ambient:.32,house:1}));m.add(l);let g=new At(o*.94,s*.96);g.rotateX(-Math.PI/2),g.translate(0,h/2+.003,0),d??(d=p(360,720,12));let w=r.paper({atlas:{value:d},house:0,ambient:f,defines:{}}),M=new U(g,w);return m.add(M),m.userData={screen:M,screenMaterial:w,w:o,h:s,t:h},m}function u({w:o=.78,h:s=1.6,t:h=.09,color:f=Ts,alpha:m=.9}={}){let l=new bo(new Re(o,h,s,3,Math.min(h*.45,o*.12)),10);return new go(l,r.wire({color:f,alpha:m}))}function v({w:o=.78,h:s=1.6}={}){let h=Gt("phone-board"),f=r.solid({ambient:.14,house:1}),m=new U(t(o,.03,s),f),g=[V(o*.88,.016,s*.9,{color:[.05,.3,.2]}),V(o*.68,.03,s*.42,{at:[0,.02,s*.19],color:[.2,.22,.26]})];for(let at=0;at<30;at+=1){let E=.03+h()*.08,k=.03+h()*.09;g.push(V(E,.018,k,{at:[(h()-.5)*o*.74,.016,-s*.28+(h()-.5)*s*.26],color:h()>.7?[.76,.58,.3]:[.1,.1,.12],mat:h()>.7?1:0}))}let w=new U(Ct(g),f),M=Ct([V(o,.05,.05,{at:[0,0,-s/2+.025],color:[.62,.64,.68],mat:1}),V(o,.05,.05,{at:[0,0,s/2-.025],color:[.62,.64,.68],mat:1}),V(.05,.05,s,{at:[-o/2+.025,0,0],color:[.62,.64,.68],mat:1}),V(.05,.05,s,{at:[o/2-.025,0,0],color:[.62,.64,.68],mat:1})]),b=new U(M,f),A=new At(o*.94,s*.96);A.rotateX(-Math.PI/2);let N=r.paper({atlas:{value:n.texture},cell:[0,0,1,1],house:0,ambient:1}),$=new U(A,N),lt=new Tt(o*.98,.006,s*.98),F=new U(lt,r.glow({color:[.8,.9,1],alpha:.05,shape:5}));return{back:m,board:w,frame:b,display:$,displayMaterial:N,glass:F}}function p(o,s,h,f){return n.canvas(o,s,(m,l,g)=>{if(m.fillStyle="#0b0d13",m.fillRect(0,0,l,g),f){f(m,l,g);return}let w=g/13;for(let M=0;M<h;M+=1){m.fillStyle="rgba(255,255,255,.07)",m.fillRect(l*.06,w*(M+1),l*.88,w*.74),m.fillStyle=M%3===0?"#5dffde":"#a48bff";let b=i<0?l*.78:l*.1;m.fillRect(b,w*(M+1)+w*.16,l*.12,w*.42),m.fillStyle="rgba(232,236,244,.7)",m.fillRect(i<0?l*.28:l*.26,w*(M+1)+w*.28,l*.46,w*.16)}})}return{make:c,wire:u,layers:v,listTexture:p}}var Ot=4200,Qo=.12,As=.6,Cs=.03;function ts({programs:r,shared:n,printTexture:i,dir:t}){let d=new ce(new Float32Array(Ot*2*3),3).setUsage(Te),c=new ce(new Float32Array(Ot*2*3),3).setUsage(Te),u=new ce(new Float32Array(Ot*2),1),v=new ce(new Float32Array(Ot*2),1).setUsage(Te),p=new ce(new Float32Array(Ot*2),1).setUsage(Te),o=new Uint32Array((Ot-1)*6);for(let k=0;k<Ot;k+=1)if(u.array[k*2]=-1,u.array[k*2+1]=1,k<Ot-1){let B=k*2;o.set([B,B+1,B+2,B+1,B+3,B+2],k*6)}let s=new wo;s.setAttribute("position",d),s.setAttribute("aAcross",c),s.setAttribute("aSide",u),s.setAttribute("aS",v),s.setAttribute("aW",p),s.setIndex(new ce(o,1));let h={uFeed:{value:0},uLine:{value:1e6},uLineLen:{value:4},uJamA:{value:0},uJamB:{value:0},uJamK:{value:0},uFlutter:{value:1},uWide:{value:1e6},uPrint:{value:i},uPrintRange:{value:0},uPaperGlow:{value:.22},uLineColor:{value:[.365,1,.87]}},f=r.strip({uniforms:h,side:2}),m=new U(s,f);m.frustumCulled=!1;let l=new U(s,r.glow({color:[.365,1,.87],alpha:.5,shape:5,house:0,deform:{pars:"in vec3 aAcross; in float aSide, aS, aW; uniform float uLine, uLineLen; out float vSide, vAlive;",fpars:"in float vSide, vAlive;",local:`{
          float z = max(-(viewMatrix * vec4(p, 1.0)).z, 0.05);
          p += aAcross * aSide * min(max(aW * 5.0, 0.16), z * 0.02);
        }`,world:"vSide = aSide; vAlive = smoothstep(uLine + uLineLen * 0.7, uLine + uLineLen, aS);",frag:"a = (1.0 - abs(vSide)); a = a * a * vAlive;",uniforms:{uLine:h.uLine,uLineLen:h.uLineLen}}}));l.frustumCulled=!1;let g=new Float32Array(Ot),w=new Float32Array(Ot),M=0,b=0,A=0,N=(k,B,ot,a,z,G,P,q)=>{if(M>=Ot)return;let O=M*2;d.setXYZ(O,k,B,ot),d.setXYZ(O+1,k,B,ot),c.setXYZ(O,a,z,G),c.setXYZ(O+1,a,z,G),v.setX(O,P),v.setX(O+1,P),p.setX(O,q),p.setX(O+1,q),g[M]=P,w[M]=B,M+=1};function $({yaws:k,lineStartY:B,endY:ot,dense:a}){M=0;let z=0,G=.31*t,P=[[G,.11,-.5],[G,.085,-.43],[G*.92,.012,-.34],[G*.62,.003,-.24],[G*.22,.003,-.11],[0,.003,-.025],[0,-.004,.008],[0,-.03,.012]],q=24,O=P[0];for(let ct=0;ct<P.length-1;ct+=1){let dt=P[Math.max(0,ct-1)],R=P[ct],I=P[ct+1],Y=P[Math.min(P.length-1,ct+2)];for(let Z=ct===0?0:1;Z<=q;Z+=1){let S=Z/q,J=S*S,pt=J*S,bt=[0,1,2].map(St=>.5*(2*R[St]+(I[St]-dt[St])*S+(2*dt[St]-5*R[St]+4*I[St]-Y[St])*J+(3*R[St]-dt[St]-3*I[St]+Y[St])*pt)),Ht=bt[0]-O[0],ut=bt[1]-O[1],gt=bt[2]-O[2];z+=Math.hypot(Ht,ut,gt);let Zt=Math.hypot(Ht,gt)||1;N(bt[0],bt[1],bt[2],gt/Zt||1,0,-Ht/Zt||0,z,Qo),O=bt}}b=z,A=O[1];let j=O[1],K=0;for(;j>ot&&M<Ot;){let ct=.22;j>st.slabBottom-.5&&(ct=.05);for(let J of a)j<J.a&&j>J.b&&(ct=.022);for(j-=ct,z+=ct;K<k.length-1&&j<k[K+1].y;)K+=1;let dt=k[K],R=k[Math.min(K+1,k.length-1)],I=R===dt?0:ue(.25,.75,(dt.y-j)/Math.max(.001,dt.y-R.y)),Y=_e(dt.yaw,R.yaw,I)*Math.PI/180,Z=ue(st.floorY-.2,st.slabBottom+.2,j),S=_e(Qo,As,Z);j<B&&(S=_e(S,Cs,ue(0,4,B-j))),N(0,j,0,Math.cos(Y),0,Math.sin(Y),z,S)}d.needsUpdate=!0,c.needsUpdate=!0,v.needsUpdate=!0,p.needsUpdate=!0,h.uLine.value=lt(B),h.uPrintRange.value=lt(st.floorY-.1),h.uWide.value=lt(st.deskY)}function lt(k){return b+(A-k)}function F(k){let B=0,ot=M-1;for(;B<ot;){let a=B+ot>>1;g[a]<k?B=a+1:ot=a}return B}let at=-1/0;function E(k,B){let ot=k+B,a=ot>A?0:F(lt(ot)),z=F(lt(Math.max(k-B,at))),G=Math.max(0,z-a)*6;s.setDrawRange(a*6,G)}return{mesh:m,halo:l,u:h,rebuild:$,focus:E,setEnd(k){at=k},sAtY:lt,pointAtY(k,B){return B[0]=0,B[1]=k,B[2]=0,B}}}var Ds=460812,Ns=12e3,Bs=190,Ws=900,Ys=.35,Us=5,Gs=2,qs=new Set(["svc.web","svc.apps","svc.api","svc.rescue","svc.ux","step.talk","step.scope","step.build"]),$s=()=>new Promise(r=>{window.scheduler?.yield?window.scheduler.yield().then(r):setTimeout(r,0)});async function Ke(r){let n=performance.now();for(;;){if(r.next().done)return;performance.now()-n>4&&(await $s(),n=performance.now())}}async function Bn({canvas:r,gl:n,tier:i,forced:t,onFail:d,onOff:c,onOn:u,isFailed:v}){ho.enabled=!1;let p={...jo[i],instanceScale:1},o=document.documentElement,s=o.dir==="rtl"?-1:1,h=window.matchMedia("(pointer: coarse)").matches,f=new Mo({canvas:r,context:n,antialias:!0});f.outputColorSpace=co,f.setClearColor(Ds,1),f.sortObjects=!1,f.debug.checkShaderErrors=t,f.info.autoReset=!0;let m=new vo,l=new Fe(30,1,.1,100);await qo(s<0);let g=$o({q:p,dir:s}),w={uTime:{value:0},uInline:{value:s},uCamY:{value:0},uDawn:{value:0},uPower:{value:new le(0,0)},uPowerY:{value:0},uLitY:{value:new le(st.slabBottom,-120)},uFog:{value:new le(4,40)},uLampOrigin:{value:new vt},uLampPos:{value:new vt(.5*s,.62,-.62)},uLampDir:{value:new vt(0,-1,0)},uLampColor:{value:new vt(1,.7,.42)},uLampOn:{value:1},uLampCone:{value:new le(.55,.9)},uAtlas:{value:g.texture}},M=Go(w),b=ts({programs:M,shared:w,printTexture:g.printTexture,dir:s}),A=Ko({programs:M,shared:w,text:g,q:p,dir:s,tier:i}),N=Jo({programs:M,shared:w,text:g,q:p,dir:s,tier:i}),$=Zo({programs:M,shared:w,text:g,dir:s}),lt={desk:A,archive:N,strip:b,phone:$};A.setPhone($.make({w:.0775,h:.16,t:.0085})),m.add(A.group,N.group,b.mesh,b.halo);let F=pe.map((e,x)=>({meta:e,index:x,status:"idle",module:null,group:new se,ctx:null,on:!1,a:0,s:0,e:0,b:0,promise:null})),at=Object.fromEntries(F.map(e=>[e.meta.id,e]));F.forEach(e=>{e.group.visible=!1,m.add(e.group)});let E=null,k=null,B=null,ot=1,a=1/0,z=0,G=0,P=0,q=()=>E.svh*.15,O=Fo({inPlace:!h,blur:!h&&i!=="L"}),j=Ne(),K=Ho(j),ct=60,dt=0;function R(e){let x=[],_=[],C=[];for(let[W,tt]of Object.entries(e.shots))tt.caption&&(W==="hero"?x.push([0,tt.pinEnd]):(x.push([tt.pinStart-.35*e.svh,tt.pinEnd]),_.push(tt.pinStart)),C.push(tt.pinEnd));return{zones:x,down:_,up:C}}function I(){let e=[];for(let[C,W]of Object.entries(E.shots)){let tt=W.caption&&document.querySelector(`[data-shot="${C}"] > .shot`);if(tt){let yt=[...tt.children].filter(Ft=>Ft.getAttribute("aria-hidden")!=="true").reduce((Ft,Et)=>Ft+Et.textContent.trim().split(/\s+/).filter(Boolean).length,0),Q=/^(svc|process|step)\./.test(C)?1.75:C==="why.q"?1.5:1,Mt=C==="svc.head"?1.8:1,xt=qs.has(C)?2.2:0;e.push({y:C==="hero"?0:W.pinStart,words:yt,hold:Q,slow:Mt,through:W.pinEnd,play:xt})}}let x=O.stripWords();x&&e.push({y:(x[0]+x[1])/2,words:0,hold:2.5,slow:3.4});let _=K.playing;K.plan(e,ct),_&&(K.start(window.scrollY),dt=Math.round(window.scrollY))}function Y(){O.release(),E=Wo(),O.bake(E),j.bake(R(E),E.docH,E.svh),I();let e=Lo(E,pe);k=e.solved,ot=E.docH,B=To(e.knots,ot);let x=k["svc.auto"],_=k["process.head"],C=k["why.q"],W=pe.filter(Q=>Q.floor&&Q.stripYaw!==void 0).map(Q=>({y:k[Q.id].floorY,yaw:Q.stripYaw}));W.unshift({y:st.deskY,yaw:0}),W.push({y:x.floorY+3,yaw:0},{y:x.floorY+1,yaw:90},{y:x.floorY-3,yaw:90},{y:_.floorY+2,yaw:0}),W.sort((Q,Mt)=>Mt.y-Q.y),b.rebuild({yaws:W,lineStartY:x.floorY-1.8,endY:C.floorY+.03,dense:[{a:k["svc.rescue"].floorY+2.4,b:k["svc.rescue"].floorY-2.4}]}),w.uLitY.value.set(st.slabBottom,_.floorY+4),N.setRange(st.slabBottom,_.floorY);let tt=E.shots.drop,yt=E.shots.fall;z=tt.pinStart+(tt.pinEnd-tt.pinStart)*.86,a=yt.pinStart+(yt.pinEnd-yt.pinStart)*.5,G=tt.pinStart+(tt.pinEnd-tt.pinStart)*.8,P=yt.pinStart+(yt.pinEnd-yt.pinStart)*.4;for(let Q of F){let Mt=Q.index,xt=E.shots[Q.meta.id],Ft=Mt>0?E.shots[pe[Mt-1].id]:null,Et=Mt<pe.length-1?E.shots[pe[Mt+1].id]:null;Q.a=Ft?Ft.pinEnd:0,Q.s=xt.pinStart,Q.e=xt.pinEnd,Q.b=Et?Et.pinStart:ot;let Jt=k[Q.meta.id];Q.group.position.set(0,Jt.floorY??0,0),Q.status==="ready"&&Q.module.layout&&Q.module.layout(Q.ctx)}A.setActPositions(k.deskAct4),pt()}let Z=1,S=0,J=null;function pt(){let e=E.W,x=E.H,_=p.pixelCap*Z,C=Math.min(window.devicePixelRatio||1,Math.sqrt(_/(e*x)));f.setPixelRatio(C),f.setSize(e,x,!1),l.aspect=e/x,J?.resize(e*C,x*C)}let bt=[],Ht=e=>({tier:i,q:p,dir:s,id:e.meta.id,group:e.group,programs:M,u:w,text:g,sets:lt,camera:l,renderer:f,rng:Gt(e.meta.id),get solved(){return k},get layout(){return E},get self(){return k[e.meta.id]},place(x,{inline:_=0,y:C=0,z:W=0,yaw:tt=0}={}){return x.position.set(_*s,C,W),x.rotation.y=tt*s,x},hotspots:{add(x){bt.push({...x,runtime:e})}}});async function ut(e){if(e.status!=="ready")return e.promise||(e.status="loading",e.promise=(async()=>{try{let _=(await Vo[e.meta.id]()).default;e.ctx=Ht(e),await Ke(_.build(e.ctx)),await f.compileAsync(e.group,l,m),_.layout&&_.layout(e.ctx),e.module=_,e.status="ready",Bt=!0}catch(x){console.warn(`shot ${e.meta.id} failed`,x),e.status="failed"}})()),e.promise}function gt(e){for(let x=F.length-1;x>=0;x-=1)if(e>=F[x].a)return x;return 0}let Zt=!1;async function St(){if(!Zt){for(Zt=!0;!(Nt||v());){let e=gt(D),x=null,_=1/0;for(let C of F)if(C.status==="idle"){let W=Math.abs(C.index-e);W<_&&(x=C,_=W)}if(!x)break;await new Promise(C=>{"requestIdleCallback"in window?window.requestIdleCallback(C,{timeout:200}):setTimeout(C,16)}),await ut(x)}Zt=!1}}let nt=new Float32Array(13),Dt=new fo,ke=new vt(0,1,0),Oe=new vt(1,0,0),it={t:0,enter:0,hold:0,exit:0,y:0,v:0,time:0,dt:0,px:0,py:0,pointer:0},ft=Do(window.scrollY),$t=No(j),D=ft.y,jt=0,Qt=0,Nt=!1,te=null,Bt=!0,zt=0,xe=performance.now(),Vt=0,Lt=performance.now(),Rt=0,be=0,Wt=0,Yt=0,Xt=0,ne=0,ae=!1,rt=null,he=0,Se=NaN,ee=!1,y=!1;function T(e,x){let _=C=>Math.min(1,Math.max(0,C));it.t=e.b>e.a?_((D-e.a)/(e.b-e.a)):1,it.enter=e.s>e.a?_((D-e.a)/(e.s-e.a)):D>=e.s?1:0,it.hold=e.e>e.s?_((D-e.s)/(e.e-e.s)):D>=e.e?1:0,it.exit=e.b>e.e?_((D-e.e)/(e.b-e.e)):D>=e.b?1:0,it.y=D/E.pace,it.v=ft.v,it.time=zt,it.dt=x,it.px=Yt,it.py=Xt,it.pointer=Wt}let L=(e,x)=>x>e?Math.min(1,Math.max(0,(D-e)/(x-e))):D>=x?1:0,H=e=>e*e*(3-2*e);function X(){let e=E.shots["process.head"];N.u.uTurn.value=H(L(e.pinStart,e.pinEnd));let x=E.shots["why.list"],_=E.shots["why.stats"],C=E.shots.cta,W=L(x.pinStart,x.pinEnd)*3.2;A.setClear(W);let tt=H(L(x.pinStart+(x.pinEnd-x.pinStart)*.45,C.pinStart));w.uDawn.value=tt,A.setClock(3.2+H(L(x.pinStart,_.pinEnd))*3.8);let yt=E.shots.hero;if(D<a){let xt=E.shots.drop.pinEnd-yt.pinEnd;A.setRing(1-L(yt.pinEnd,yt.pinEnd+xt*.14)),A.setOffHook(H(L(yt.pinEnd,yt.pinEnd+xt*.22)))}else A.setRing(1-L(x.pinStart,x.pinStart+(x.pinEnd-x.pinStart)*.5)),A.setOffHook(0);let Q=A.phone;if(Q.visible=D>a,b.setEnd(-1/0),D>a){let xt=E.shots["why.q"],Ft=k["why.q"].d*.62,Et=H(L(E.shots.fall.pinEnd-(E.shots.fall.pinEnd-a)*.2,xt.pinEnd)),Jt=H(L(x.pinStart,x.pinStart+(x.pinEnd-x.pinStart)*.14)),no=Ft+(.42-Ft)*Et,ao=no+(.0043-no)*Jt;Q.position.y=ao;let as=2.1+(1-2.1)*Et;Q.scale.setScalar(as),Q.rotation.y=E.portrait?0:Math.PI/2*H(L(_.pinEnd,C.pinStart)),b.setEnd(A.group.position.y+ao+.01)}let Mt=F.find(xt=>xt.meta.id==="svc.rescue");(D<Mt.a||D>Mt.b)&&(w.uPower.value.set(0,0),b.u.uJamK.value=0)}function et(e){Ao(B,ot,D,nt),l.position.set(nt[0],nt[1],nt[2]),l.quaternion.set(nt[3],nt[4],nt[5],nt[6]),Wt===1&&(Dt.setFromAxisAngle(ke,-Yt*.012),l.quaternion.multiply(Dt),Dt.setFromAxisAngle(Oe,Xt*.009),l.quaternion.multiply(Dt)),l.fov=nt[7],l.near=nt[8],l.far=nt[9],l.setViewOffset(E.W,E.H,nt[11],nt[12],E.W,E.H),w.uTime.value=zt,w.uCamY.value=nt[1],w.uFog.value.set(nt[10]*.16,nt[10]),X();let x=D<z||D>a,_=D>a?4:1;A.group.visible=x,A.setAct(_),N.group.visible=D>G&&D<P,w.uLampOn.value=x?1-w.uDawn.value*.72:0,w.uLampOrigin.value.copy(A.group.position),w.uLampColor.value.set(1,.7,.42),b.u.uFeed.value=D*18e-5/E.pace,T(F[0],e),x&&(A.resetSpot(),A.update(it,zt));for(let C of F){let W=D>=C.a-q()&&D<=C.b+q();C.status==="ready"&&(W||C.on)&&(T(C,e),C.module.update(it,C.ctx),C.on=W,C.group.visible=W)}b.focus(nt[1],nt[9]),l.updateProjectionMatrix(),l.updateMatrixWorld(),J?J.render(m,l):f.render(m,l)}let ht=new De({onChange(e,x){mt(x)}});function mt(e){if(e==="pixel-85"||e==="pixel-72")S=e==="pixel-85"?.85:.72;else if(e==="drop-film")J?.dispose(),J=null;else if(e==="instances-70"||e==="instances-50")p.instanceScale=e==="instances-70"?.7:.5,A.setDensity(p.instanceScale),N.setDensity(p.instanceScale);else if(e==="shadow-1")A.setShadowTaps(1);else if(e==="extras-off")N.setWeather(!1),A.setExtras(!1);else if(e==="cadence-30")ne=33.3;else if(e==="stills"){try{window.localStorage.setItem("enjaz:tier",`S:${Date.now()}`)}catch{}Me(),c("governor")}}function ie(e){if(Nt)return;if(window.requestAnimationFrame(ie),document.hidden||ae||te!==null){xe=e;return}let x=e-xe;xe=e;let _=Math.min(x,100)/1e3;zt+=_;let C=window.scrollY,W=$t.step(C,_,E.svh,e);if(Ee&&Math.abs(C-dt)>2&&(Ee=!1,Le()),K.playing)if(y||$t.on||Math.abs(C-dt)>2||document.body.classList.contains("is-nav-open"))oe();else{let Et=document.documentElement.scrollHeight-window.innerHeight;W=Math.round(Math.min(Et,K.step(_,ss))),dt=W;let Jt=K.stops[K.stops.length-1].y;It.style.setProperty("--tour",(Jt>0?Math.min(1,W/Jt):1).toFixed(3)),K.playing||(Ee=!0,Le())}else if(rt)if(y||$t.on||Math.abs(C-rt.written)>2)rt=null;else{let Et=rt.at+(rt.to-rt.at)*(1-Math.exp(-Us*_)),Jt=Gs*E.svh*_;rt.at+=Math.max(-Jt,Math.min(Jt,Et-rt.at)),Math.abs(rt.to-rt.at)<.5&&(rt.at=rt.to),W=Math.round(rt.at),rt.written=W,rt.at===rt.to&&(rt=null)}else if(!$t.on&&!y&&!jt&&!document.body.classList.contains("is-nav-open")&&(C!==Se?(he=0,ee=!1):he+=_,!ee&&he>Ys)){ee=!0;let Et=O.settle(C);Et!==null&&Math.abs(Et-C)>2&&(rt={at:C,to:Et,written:C})}Se=W,W!==C&&window.scrollTo({top:W,behavior:"instant"}),O.update(W,_),!jt&&Math.abs(W-D)>6*E.svh&&e>Qt?(jt=e,o.classList.add("world-dip")):jt&&e-jt>=Bs&&(ft.land(W,E.svh),jt=0,Qt=e+Ws,o.classList.remove("world-dip"));let tt=Math.abs(W-ft.y)>.25||Math.abs(ft.v)>2;D=ft.step(W,_,E.svh,j.speed(ft.y)),Yt+=(Rt-Yt)*Math.min(1,_*6),Xt+=(be-Xt)*Math.min(1,_*6);let yt=Math.abs(Rt-Yt)>.001||Math.abs(be-Xt)>.001,Mt=F[gt(D)].meta.idleHz,xt=tt||yt||Bt;if(!xt&&Mt>0&&!(i==="L"&&e-Lt>Ns)&&(xt=e-Vt>=1e3/Mt-1),ne&&e-Vt<ne-2&&(xt=!1),!xt)return;tt&&(Lt=e),S&&(!tt||D>E.shots.fall.pinStart&&D<E.shots.fall.pinEnd)&&(Z=S,S=0,pt()),Bt=!1;let Ft=(e-Vt)/1e3;Vt=e,et(Math.min(Ft,.1)),x<250&&(tt||Mt>0)&&ht.push(x)}function me(){oe(),$t.on=!1,rt=null,jt=0,o.classList.remove("world-dip")}function Me(){Nt=!0,me(),O.release(),It.remove()}let It=document.createElement("button");It.type="button",It.className="tour";let re=document.createElementNS("http://www.w3.org/2000/svg","svg");re.setAttribute("viewBox","0 0 24 24"),re.setAttribute("width","18"),re.setAttribute("height","18"),re.setAttribute("aria-hidden","true"),re.setAttribute("focusable","false");let Ze=document.createElementNS("http://www.w3.org/2000/svg","path");re.append(Ze);let Qe=document.createElement("span");It.append(re,Qe);let es=o.lang==="ar"?{play:"\u062C\u0648\u0644\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0629",pause:"\u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u062C\u0648\u0644\u0629",replay:"\u0623\u0639\u062F \u0627\u0644\u062C\u0648\u0644\u0629"}:{play:"Auto tour",pause:"Pause tour",replay:"Replay tour"},os={play:"M8 5.2v13.6L18.8 12z",pause:"M7 5h3.6v14H7zm6.4 0H17v14h-3.6z",replay:"M5.4 13.2a6.8 6.8 0 1 0 1.9-5.9M6.6 3.6v4.2h4.2"},Ee=!1,to="";function Le(){let e=K.playing?"pause":Ee?"replay":"play";e!==to&&(to=e,It.dataset.state=e,Ze.setAttribute("d",os[e]),Qe.textContent=es[e])}function We(e=!1){Nt||ae||($t.on=!1,rt=null,Ee=!1,K.start(window.scrollY,e),dt=Math.round(window.scrollY),Le())}function oe(){K.playing&&(K.stop(),he=0,ee=!1,Le())}function ss(e,x){for(let _ of F)if(_.b>=e&&_.a<=x&&(_.status==="idle"||_.status==="loading"))return!1;return!0}let Ye=e=>e.target instanceof Node&&It.contains(e.target);It.addEventListener("click",()=>K.playing?oe():We()),window.addEventListener("touchstart",e=>{y=!Ye(e)},{passive:!0}),window.addEventListener("keydown",e=>{Ye(e)&&(e.key==="Enter"||e.key===" ")||oe()},{passive:!0}),window.addEventListener("pointerdown",e=>{Ye(e)||oe()},{passive:!0});let eo=()=>{y=!1};window.addEventListener("touchend",eo,{passive:!0}),window.addEventListener("touchcancel",eo,{passive:!0}),window.addEventListener("pointermove",e=>{Wt=e.pointerType==="mouse"?1:2,Rt=e.clientX/window.innerWidth*2-1,be=e.clientY/window.innerHeight*2-1,Lt=performance.now()},{passive:!0});let Ie=new vt;window.addEventListener("click",e=>{if(!e.target.closest?.("a, button, .shot"))for(let x of bt){if(!x.runtime.on)continue;Ie.set(x.center[0],x.center[1],x.center[2]),x.runtime.group.localToWorld(Ie).project(l);let _=(Ie.x*.5+.5)*E.W,C=(.5-Ie.y*.5)*E.H;Math.hypot(_-e.clientX,C-e.clientY)<x.radius&&(x.runtime.module.hit?.(x.id,it,x.runtime.ctx),Bt=!0)}},{passive:!0}),window.addEventListener("pageshow",()=>{oe(),ft.reset(window.scrollY),D=ft.y,Bt=!0});let oo=0;if(r.addEventListener("webglcontextlost",e=>{e.preventDefault(),ae=!0,me(),oo+=1,c("context-lost")}),r.addEventListener("webglcontextrestored",()=>{oo>1||(ae=!1,A.bakeShadow(f),u(),Y(),ft.reset(window.scrollY),D=ft.y,Bt=!0)}),Y(),ft.reset(window.scrollY),D=ft.y,await Ke(A.build()),await Ke(N.build()),await ut(at.hero),await ut(at.drop),await f.compileAsync(m,l),A.bakeShadow(f),v())return null;if(!t){let e=[],x=new Uint8Array(4);for(let C=0;C<6;C+=1){await new Promise(tt=>window.requestAnimationFrame(tt));let W=performance.now();et(.016),n.readPixels(0,0,1,1,n.RGBA,n.UNSIGNED_BYTE,x),e.push(performance.now()-W)}let _=e.slice(2).sort((C,W)=>C-W)[1];if(_>40){try{window.localStorage.setItem("enjaz:tier",`S:${Date.now()}`)}catch{}return d("bench"),null}_>20&&(Z=.7,p.instanceScale=.7,A.setDensity(.7),N.setDensity(.7),pt())}p.film&&(J=(await import("./chunk-WOIDP7SL.js")).createFilm(f),J.resize(E.W*f.getPixelRatio(),E.H*f.getPixelRatio())),ft.reset(window.scrollY),D=ft.y,O.update(D,0),et(.016),o.classList.add("world-on"),Le(),document.body.append(It),window.requestAnimationFrame(ie),St(),/[?&]tour=1\b/.test(window.location.search)&&We(!0),window.addEventListener("wheel",e=>{oe(),!(e.ctrlKey||Nt||ae||te!==null||document.body.classList.contains("is-nav-open")||Math.abs(e.deltaX)>Math.abs(e.deltaY))&&(e.preventDefault(),$t.input(e.deltaY,e.deltaMode,window.scrollY,E.svh,E.docH-E.svh,performance.now()),Lt=performance.now())},{passive:!1});let ns=Yo(()=>{Y(),Bt=!0});/[?&]hud=1\b/.test(window.location.search)&&import("./chunk-FKFVKEYL.js").then(e=>e.mountHud({renderer:f,governor:ht,tier:i,q:p,get y(){return D}}));let so={tier:i,renderer:f,governor:ht,scene:m,stop:Me,pacer:j,get layout(){return E},get solved(){return k},tour:{play:e=>We(e),pause:oe,get playing(){return K.playing},get stops(){return K.stops.map(e=>({...e}))},set seconds(e){ct=e,I()}},get y(){return D},seek(e){return window.scrollTo({top:e,behavior:"instant"}),me(),ft.reset(window.scrollY),D=ft.y,Se=window.scrollY,ee=!0,O.update(D,0),et(.016),D},freeze(e){te=e,zt=e},unfreeze(){te=null},renderOnce(){et(.016)},info(){return et(.016),{calls:f.info.render.calls,triangles:f.info.render.triangles,programs:f.info.programs.length,rung:ht.rung,y:D}},sceneInfo(){let e=J;J=null,et(.016);let x={calls:f.info.render.calls,triangles:f.info.render.triangles};return J=e,x},feedFrameTimes(e){e.forEach(x=>ht.push(x))},async loadAll(){await Promise.all(F.map(e=>ut(e))),Bt=!0},status(){return Object.fromEntries(F.map(e=>[e.meta.id,e.status]))},dispose(){Me(),ns()}};return window.__enjazWorld=so,so}export{Bn as start};
