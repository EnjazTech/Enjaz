/* three.js r187 (c) three.js authors, MIT. ENJAZ film. */
import{a as y}from"./chunk-LB75Y2R3.js";import{f as h,h as v,l as w}from"./chunk-GBHZZ3DY.js";import{J as f,x as i}from"./chunk-ZD75F7KI.js";import"./chunk-AEJNSRIJ.js";var T={*build(e){let{programs:s,rng:t,sets:u,text:b}=e;e.group.add(new i(h(y(-1.45)),s.solid({ambient:.1})));let o=u.phone.make({w:.92,h:1.86,t:.1});o.rotation.x=Math.PI/2,o.position.set(0,0,.42),e.group.add(o);let g=u.phone.listTexture(360,720,12),m=o.userData.screen;m.material=s.paper({atlas:{value:g},house:0,ambient:1.05,deform:{fpars:"uniform float uRows;",frag:"c *= mix(0.1, 1.0, step(1.0 - vUv.y, uRows));",uniforms:{uRows:{value:0}}}}),e.rows=m.material.uniforms.uRows,yield;let d=["invoice","receipt","memo","slip","ledger","quote"],n=Math.max(60,Math.floor(140*(e.q.instanceScale??1))),r=s.paper({ambient:.14,defines:{INSTANCED:1},deform:{pars:"uniform float uLand; uniform vec2 uStir;",local:`{
          /* Tumbling while it circles; flat once it lands. */
          float settle = clamp((uLand - seed * 0.8) / 0.2, 0.0, 1.0);
          float spin = (uTime * 0.6 + seed * 50.0) * (1.0 - settle);
          float cs = cos(spin), ss = sin(spin);
          p = vec3(p.x, p.y * cs, p.y * ss);
          n = vec3(n.x, n.y * cs - n.z * ss, n.y * ss + n.z * cs);
        }`,world:`{
          float settle = clamp((uLand - seed * 0.8) / 0.2, 0.0, 1.0);
          settle = settle * settle * (3.0 - 2.0 * settle);
          float a = seed * 40.0 + uTime * 0.45 * (0.6 + seed) + uLand * 7.0;
          float r = 1.3 + seed * 1.15 - uLand * 0.4;
          vec3 orbit = vec3(cos(a) * r, sin(a * 1.7) * 1.05 + (seed - 0.5) * 1.2, sin(a) * r * 0.74 + 0.4);
          orbit.xy += normalize(orbit.xy + 0.001) * max(0.0, 0.5 - length(orbit.xy - uStir)) * 0.9;
          wp = mix(orbit + (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz, wp, settle);
          /* A landed sheet has become a row on the screen: it shrinks into the slab. */
          tint *= 1.0 - smoothstep(0.86, 1.0, settle);
        }`,uniforms:{uLand:{value:0},uStir:{value:[0,0]}}}}),x=new f(.42,.56),c=new i(v(x,n,(p,a)=>{a.pos=[0,.72-p/n*1.44,.46],a.cell=b.cell(d[Math.floor(t()*d.length)]);let l=.82+t()*.18;a.tint=[l,l,l*.95],a.seed=p/n}),r);c.frustumCulled=!1,e.group.add(c),e.land=r.uniforms.uLand,e.stir=r.uniforms.uStir,yield},update(e,s){let t=w(0,1,e.enter*.16+e.hold*.9+e.exit*.2);s.land.value=t,s.rows.value=t*.96,s.stir.value=e.pointer===1?[e.px*2.2,-e.py*2.2]:[0,0]}};export{T as default};
