/* three.js r187 (c) three.js authors, MIT. ENJAZ film. */
import{c as p,d as c,g as f,h as v,l as a}from"./chunk-GBHZZ3DY.js";import{C as h,D as m,x as n}from"./chunk-ZD75F7KI.js";import"./chunk-AEJNSRIJ.js";var w={*build(o){let{programs:t,sets:s}=o,e=s.phone.make({w:.56,h:1.14,t:.07});e.rotation.x=Math.PI/2,e.position.set(0,.2,0),o.group.add(e),e.userData.screen.material=t.paper({atlas:{value:s.phone.listTexture(360,720,12)},house:0,ambient:1.05}),o.phone=e;let i=new n(c(.05,.1,.05,{color:[.36,1,.87],mat:2}),t.solid());i.position.y=.6,e.add(i),i.position.set(0,0,-.6),i.rotation.x=Math.PI/2;let I=p(new h(1.5,.05,.9)),d=t.solid({ambient:.15,defines:{INSTANCED:1},deform:{pars:"uniform float uIris;",local:`{
          /* Eight blades: rotating each about its own pivot opens the aperture. */
          float a = uIris * 1.15;
          float ca = cos(a), sa = sin(a);
          vec3 pivot = vec3(0.75, 0.0, 0.0);
          vec3 q = p - pivot;
          p = vec3(q.x * ca + q.z * sa, q.y, -q.x * sa + q.z * ca) + pivot;
        }`,uniforms:{uIris:{value:0}}}}),u=new n(v(I,8,(M,r)=>{let l=M/8*Math.PI*2;r.pos=[Math.cos(l)*.72,-1.2,Math.sin(l)*.72],f(0,-l+Math.PI/2,0,r.quat),r.tint=[.2,.21,.25]}),d);u.frustumCulled=!1,o.group.add(u),o.iris=d.uniforms.uIris;let b=new n(p(new m(1.85,1.9,.14,48,1,!0),{at:[0,-1.2,0],color:[.2,.21,.25]}),t.solid({ambient:.16,side:2}));o.group.add(b),yield},update(o,t){t.iris.value=a(.1,.72,o.hold);let s=a(.62,1,o.hold)*.5+a(0,.8,o.exit)*8;t.phone.position.y=.2-s,t.phone.rotation.x=Math.PI/2-a(.1,.9,o.hold)*(Math.PI/2)*.72,t.sets.strip.setEnd(t.self.floorY+t.phone.position.y+.3)}};export{w as default};
