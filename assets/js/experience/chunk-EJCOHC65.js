/* three.js r187 (c) three.js authors, MIT. ENJAZ film. */
import{l as m}from"./chunk-X7IJIEOY.js";import{J as b,x as c}from"./chunk-JHKT6OHR.js";import"./chunk-AEJNSRIJ.js";var q={*build(a){let{programs:p,q:r,text:n,dir:i}=a,[y,z]=r.uxGrid,x=new b(2.2,3.1,y,z),h=n.canvas(512,720,(e,t,s)=>{e.fillStyle="#e9e6dd",e.fillRect(0,0,t,s);let d=["#c2352b","#2a4fd1","#d1a12a","#2d9c4a","#7a2ab5"],u=7,l=()=>(u=(u*37+11)%101,u/101);for(let o=0;o<34;o+=1)e.fillStyle=d[o%d.length],e.globalAlpha=.45+l()*.5,e.fillRect(l()*t*.82,l()*s*.92,40+l()*150,16+l()*60);e.globalAlpha=1,e.strokeStyle="#333";for(let o=0;o<16;o+=1)e.strokeRect(l()*t*.8,l()*s*.9,50+l()*120,20+l()*50)}),v=n.title("svc.ux"),g=n.canvas(512,720,(e,t,s)=>{e.fillStyle="#0d1016",e.fillRect(0,0,t,s);let d=i<0?t-44:44;e.textAlign="start",e.fillStyle="#e8ecf4";let u=44;do e.font=`700 ${u}px ${n.display}`,u-=2;while(e.measureText(v).width>t-88&&u>18);e.fillText(v,d,104),e.fillStyle="#5dffde",e.fillRect(i<0?t-44-90:44,128,90,5),e.fillStyle="rgba(232,236,244,.5)";for(let l=0;l<4;l+=1){let o=t-88-l%2*90;e.fillRect(i<0?t-44-o:44,174+l*28,o,8)}e.fillStyle="rgba(255,255,255,.05)",e.fillRect(44,310,t-88,170),e.fillRect(44,500,t-88,110),e.fillStyle="#a48bff",e.fillRect(i<0?44:t-44-150,636,150,40)}),I=p.paper({atlas:{value:h},ambient:.2,boost:1.05,defines:{FACET:1},deform:{pars:"uniform float uCrumple; uniform vec3 uIron;",fpars:"uniform float uFacet, uIroned; uniform sampler2D uGood;",local:`{
          vec3 q = vec3(p.xy, 0.0);
          float amount = uCrumple;
          amount *= smoothstep(uIron.z * 0.4, uIron.z, length(p.xy - uIron.xy));
          float z = 0.0;
          z += abs(dot(q, normalize(vec3(0.8, 0.5, 0.0))) + 0.1) * 0.42;
          z -= abs(dot(q, normalize(vec3(-0.5, 0.9, 0.0))) - 0.4) * 0.38;
          z += abs(dot(q, normalize(vec3(0.3, -0.8, 0.0))) + 0.6) * 0.3;
          z -= abs(dot(q, normalize(vec3(0.95, 0.1, 0.0))) - 0.2) * 0.26;
          z += abs(dot(q, normalize(vec3(-0.7, -0.4, 0.0))) + 0.3) * 0.22;
          z -= abs(dot(q, normalize(vec3(0.15, 0.9, 0.0))) + 0.9) * 0.2;
          p.z += (z - 0.2) * amount;
          /* The sheet draws in as it crumples. */
          p.xy *= 1.0 - amount * 0.1;
        }`,frag:"c = mix(c, texture(uGood, vUv).rgb * 1.05, uIroned);",uniforms:{uCrumple:{value:1},uIron:{value:[9,9,.5]},uFacet:{value:1},uIroned:{value:0},uGood:{value:g}}}}),f=new c(x,I);f.position.set(0,0,.1),f.frustumCulled=!1,a.group.add(f),a.mesh=f,yield},update(a,p){let r=p.mesh.material.uniforms,n=m(.08,.78,a.hold);r.uCrumple.value=1-n,r.uFacet.value=1-m(.7,1,n),r.uIroned.value=m(.55,.9,n),a.pointer===1?(r.uIron.value[0]=a.px*1.6,r.uIron.value[1]=-a.py*1.6):r.uIron.value[0]=9}};export{q as default};
