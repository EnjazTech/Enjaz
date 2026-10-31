/* three.js r187 (c) three.js authors, MIT. ENJAZ film. */
import{a as y}from"./chunk-5VWIPLWC.js";import{f as h,h as v,l as w}from"./chunk-X7IJIEOY.js";import{J as c,x as i}from"./chunk-JHKT6OHR.js";import"./chunk-AEJNSRIJ.js";var k={*build(e){let{programs:t,rng:s,sets:m,text:b}=e;e.group.add(new i(h(y(-1.45)),t.solid({ambient:.1})));let a=m.phone.make({w:.92,h:1.86,t:.1});a.rotation.x=Math.PI/2,a.position.set(0,0,.42),e.group.add(a);let g=m.phone.listTexture(360,720,12),u=a.userData.screen;u.material=t.paper({atlas:{value:g},house:0,ambient:1.05,deform:{fpars:"uniform float uRows;",frag:"c *= mix(0.1, 1.0, step(1.0 - vUv.y, uRows));",uniforms:{uRows:{value:0}}}}),e.rows=u.material.uniforms.uRows,yield;let d=["invoice","receipt","memo","slip","ledger","quote"],n=Math.max(60,Math.floor(140*(e.q.instanceScale??1))),r=t.paper({ambient:.14,defines:{INSTANCED:1},deform:{pars:"uniform float uLand; uniform vec2 uStir; in vec3 iSlab;",local:`{
          float spin = uTime * 0.6 + seed * 50.0;
          float cs = cos(spin), ss = sin(spin);
          float settle = clamp((uLand - seed * 0.8) / 0.2, 0.0, 1.0);
          float k = 1.0 - settle;
          p = vec3(p.x, p.y * cs * k + p.y * (1.0 - k), p.y * ss * k);
        }`,world:`{
          float settle = clamp((uLand - seed * 0.8) / 0.2, 0.0, 1.0);
          settle = settle * settle * (3.0 - 2.0 * settle);
          float a = seed * 40.0 + uTime * 0.45 * (0.6 + seed) + uLand * 7.0;
          float r = 1.3 + seed * 1.15 - uLand * 0.4;
          vec3 orbit = vec3(cos(a) * r, sin(a * 1.7) * 1.05 + (seed - 0.5) * 1.2, sin(a) * r * 0.74 + 0.4);
          orbit.xy += normalize(orbit.xy + 0.001) * max(0.0, 0.5 - length(orbit.xy - uStir)) * 0.9;
          vec3 home = wp;
          wp = mix(orbit + (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz, home, settle);
          /* Landed sheets have become rows: they are gone. */
          wp += (home - wp) * step(0.999, settle);
          float vanish = 1.0 - smoothstep(0.92, 1.0, settle);
          wp = mix(home + (wp - home) * 0.0, wp, 1.0);
          tint *= vanish;
        }`,uniforms:{uLand:{value:0},uStir:{value:[0,0]}}}}),x=new c(.42,.56),p=new i(v(x,n,(f,o)=>{o.pos=[0,.72-f/n*1.44,.46],o.cell=b.cell(d[Math.floor(s()*d.length)]);let l=.82+s()*.18;o.tint=[l,l,l*.95],o.seed=f/n,o.extra.iSlab=[0,0,0]},{iSlab:3}),r);p.frustumCulled=!1,e.group.add(p),e.land=r.uniforms.uLand,e.stir=r.uniforms.uStir,yield},update(e,t){let s=w(0,1,e.enter*.16+e.hold*.9+e.exit*.2);t.land.value=s,t.rows.value=s*.96,t.stir.value=e.pointer===1?[e.px*2.2,-e.py*2.2]:[0,0]}};export{k as default};
