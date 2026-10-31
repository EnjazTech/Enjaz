/* three.js r187 (c) three.js authors, MIT. ENJAZ film. */
import{N as L,P as y,b as h,c as w,e as g,l as C,m as p,q as S,u as B,v as E,w as M,x as F}from"./chunk-ZD75F7KI.js";import"./chunk-AEJNSRIJ.js";var d=5,q=`
precision highp float;
in vec3 position;
out vec2 vUv;
void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`,A=`
precision highp float;
uniform sampler2D uTex;
uniform vec2 uTexel;
uniform float uThreshold;
in vec2 vUv;
out vec4 fragColor;
void main() {
  vec3 c = texture(uTex, vUv).rgb * 4.0;
  c += texture(uTex, vUv + uTexel * vec2(-1.0, -1.0)).rgb;
  c += texture(uTex, vUv + uTexel * vec2(1.0, -1.0)).rgb;
  c += texture(uTex, vUv + uTexel * vec2(-1.0, 1.0)).rgb;
  c += texture(uTex, vUv + uTexel * vec2(1.0, 1.0)).rgb;
  c /= 8.0;
  if (uThreshold > 0.0) {
    float l = max(c.r, max(c.g, c.b));
    c *= smoothstep(uThreshold, uThreshold + 0.25, l);
  }
  fragColor = vec4(c, 1.0);
}`,D=`
precision highp float;
uniform sampler2D uTex;
uniform vec2 uTexel;
in vec2 vUv;
out vec4 fragColor;
void main() {
  vec3 c = texture(uTex, vUv + uTexel * vec2(-2.0, 0.0)).rgb;
  c += texture(uTex, vUv + uTexel * vec2(2.0, 0.0)).rgb;
  c += texture(uTex, vUv + uTexel * vec2(0.0, -2.0)).rgb;
  c += texture(uTex, vUv + uTexel * vec2(0.0, 2.0)).rgb;
  c += texture(uTex, vUv + uTexel * vec2(-1.0, -1.0)).rgb * 2.0;
  c += texture(uTex, vUv + uTexel * vec2(1.0, -1.0)).rgb * 2.0;
  c += texture(uTex, vUv + uTexel * vec2(-1.0, 1.0)).rgb * 2.0;
  c += texture(uTex, vUv + uTexel * vec2(1.0, 1.0)).rgb * 2.0;
  fragColor = vec4(c / 12.0, 1.0);
}`,O=`
precision highp float;
uniform sampler2D uScene, uBloom;
uniform float uTime;
in vec2 vUv;
out vec4 fragColor;
void main() {
  vec2 q = vUv - 0.5;
  float r2 = dot(q, q);
  vec2 shift = q * r2 * 0.012;
  vec3 c = vec3(texture(uScene, vUv + shift).r, texture(uScene, vUv).g, texture(uScene, vUv - shift).b);
  c += texture(uBloom, vUv).rgb * 0.34;
  c *= 1.0 - r2 * 0.62;
  float g = fract(sin(dot(gl_FragCoord.xy + uTime * 61.0, vec2(12.9898, 78.233))) * 43758.5453);
  c += (g - 0.5) * 0.018;
  fragColor = vec4(c, 1.0);
}`;function G(c){let n=new M;n.setAttribute("position",new E(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3));let x=new F(n);x.frustumCulled=!1;let U=new B;U.add(x);let R=new y,f=(u,r,l=h)=>new L({glslVersion:C,vertexShader:q,fragmentShader:u,uniforms:r,blending:l,depthTest:!1,depthWrite:!1,transparent:l!==h}),i=f(A,{uTex:{value:null},uTexel:{value:new p},uThreshold:{value:0}}),s=f(D,{uTex:{value:null},uTexel:{value:new p}},w),a=f(O,{uScene:{value:null},uBloom:{value:null},uTime:{value:0}}),b=(u,r,l={})=>new S(Math.max(2,u),Math.max(2,r),{minFilter:g,magFilter:g,depthBuffer:!1,...l}),v=null,t=[],m=(u,r)=>{x.material=u,c.setRenderTarget(r),c.render(U,R)},T={time:0};return{resize(u,r){let l=Math.floor(u),e=Math.floor(r);v?.dispose(),t.forEach(o=>o.dispose()),v=b(l,e,{depthBuffer:!0,samples:4}),t=[];for(let o=1;o<=d;o+=1)t.push(b(l>>o,e>>o))},render(u,r){c.setRenderTarget(v),c.clear(),c.render(u,r);let l=c.autoClear;c.autoClear=!1;for(let e=0;e<d;e+=1){let o=e===0?v:t[e-1];i.uniforms.uTex.value=o.texture,i.uniforms.uTexel.value.set(1/o.width,1/o.height),i.uniforms.uThreshold.value=e===0?.86:0,m(i,t[e])}for(let e=d-1;e>0;e-=1)s.uniforms.uTex.value=t[e].texture,s.uniforms.uTexel.value.set(.5/t[e].width,.5/t[e].height),m(s,t[e-1]);a.uniforms.uScene.value=v.texture,a.uniforms.uBloom.value=t[0].texture,T.time=(T.time+.016)%10,a.uniforms.uTime.value=T.time,m(a,null),c.autoClear=l},dispose(){v?.dispose(),t.forEach(u=>u.dispose()),i.dispose(),s.dispose(),a.dispose(),n.dispose()}}}export{G as createFilm};
