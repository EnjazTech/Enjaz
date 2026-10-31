/* three.js r187 (c) three.js authors, MIT. ENJAZ film. */
import{c as p,d as c,g as f,h as v,l as e}from"./chunk-X7IJIEOY.js";import{C as h,D as m,x as n}from"./chunk-JHKT6OHR.js";import"./chunk-AEJNSRIJ.js";var y={*build(o){let{programs:t,sets:s}=o,a=s.phone.make({w:.56,h:1.14,t:.07});a.rotation.x=Math.PI/2,a.position.set(0,.2,0),o.group.add(a),a.userData.screen.material=t.paper({atlas:{value:s.phone.listTexture(360,720,12)},house:0,ambient:1.05}),o.phone=a;let i=new n(c(.05,.1,.05,{color:[.36,1,.87],mat:2}),t.solid());i.position.y=.6,a.add(i),i.position.set(0,0,-.6),i.rotation.x=Math.PI/2;let I=p(new h(1.5,.05,.9)),u=t.solid({ambient:.15,defines:{INSTANCED:1},deform:{pars:"uniform float uIris;",local:`{
          /* Eight blades: rotating each about its own pivot opens the aperture. */
          float a = uIris * 1.15;
          float ca = cos(a), sa = sin(a);
          vec3 pivot = vec3(0.75, 0.0, 0.0);
          vec3 q = p - pivot;
          p = vec3(q.x * ca + q.z * sa, q.y, -q.x * sa + q.z * ca) + pivot;
        }`,uniforms:{uIris:{value:0}}}}),d=new n(v(I,8,(M,r)=>{let l=M/8*Math.PI*2;r.pos=[Math.cos(l)*.72,-1.2,Math.sin(l)*.72],f(0,-l+Math.PI/2,0,r.quat),r.tint=[.2,.21,.25]}),u);d.frustumCulled=!1,o.group.add(d),o.iris=u.uniforms.uIris;let b=new n(p(new m(1.85,1.9,.14,48,1,!0),{at:[0,-1.2,0],color:[.2,.21,.25]}),t.solid({ambient:.16,side:2}));o.group.add(b),yield},update(o,t){t.iris.value=e(.1,.72,o.hold);let s=e(.62,1,o.hold)*.5+e(0,.8,o.exit)*8;t.phone.position.y=.2-s,t.phone.rotation.x=Math.PI/2-e(.1,.9,o.hold)*(Math.PI/2)*.72}};export{y as default};
