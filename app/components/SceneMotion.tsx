"use client";
import { useEffect, useRef } from "react";
type P = [number, number, number];
type E = [P,P];
function box(x:number,y:number,z:number,w:number,h:number,d:number):E[]{
  const p:P[]=Array.from({length:8},(_,i)=>[x+(i&1?w:-w),y+(i&2?h:-h),z+(i&4?d:-d)]);
  const edges:E[]=[];
  for(let i=0;i<8;i++)for(const bit of [1,2,4])if(!(i&bit))edges.push([p[i],p[i|bit]]);
  return edges;
}
const models:E[][]=[
  [...box(0,0,0,1,1,1),...box(0,0,0,.5,.5,.5)],
  [...box(0,-.25,0,1,.8,.55),...box(-.45,-.35,-.58,.13,.13,.02),...box(.45,-.35,-.58,.13,.13,.02),[[-.4,.15,-.58],[.4,.15,-.58]],[[0,-1.05,0],[0,-1.5,0]],...box(0,-1.55,0,.07,.07,.07),...box(0,1.1,0,.7,.35,.4)],
  [...box(0,-.2,0,1.2,.8,.12),...box(0,-.2,-.15,1.05,.65,.02),[[0,.6,0],[0,1,0]],[[-.5,1,0],[.5,1,0]],...box(0,1.05,0,.6,.04,.4)]
];
export default function SceneMotion(){
  const scene=useRef<HTMLCanvasElement>(null),cursor=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const surface=scene.current,overlay=cursor.current;
    const ctx=surface?.getContext("2d"),ink=overlay?.getContext("2d");
    if(!surface||!overlay||!ctx||!ink)return;
    const reduced=matchMedia("(prefers-reduced-motion: reduce)"),fine=matchMedia("(pointer: fine) and (hover: hover)");
    let w=innerWidth,h=innerHeight,frame=0,angle=0,last=0,active=false,hover=false;
    const mouse={x:w/2,y:h/2},trail=Array.from({length:32},()=>({...mouse}));
    const resize=()=>{w=innerWidth;h=innerHeight;const d=Math.min(devicePixelRatio||1,2);for(const c of [surface,overlay]){c.width=w*d;c.height=h*d;}ctx.setTransform(d,0,0,d,0,0);ink.setTransform(d,0,0,d,0,0);};
    const move=(e:PointerEvent)=>{mouse.x=e.clientX;mouse.y=e.clientY;active=true;hover=e.target instanceof Element&&!!e.target.closest("a,button,summary,input,textarea");};
    const leave=(e:PointerEvent)=>{if(!e.relatedTarget)active=false;};
    const draw=(now:number)=>{
      const dt=Math.min(40,now-last);last=now;if(!reduced.matches)angle+=dt*.00013;
      ctx.clearRect(0,0,w,h);ink.clearRect(0,0,w,h);
      document.documentElement.style.setProperty("--reading-progress",String(scrollY / Math.max(1,document.documentElement.scrollHeight-h)));
      const stage=document.querySelector<HTMLElement>(".cinematic-intro");
      const top=stage?.offsetTop??0,end=(stage?.offsetHeight??h*3)-h;
      const t=Math.min(1,Math.max(0,(scrollY-top)/Math.max(end,1)));
      const chapter=Math.min(2,Math.floor(t*3)),phase=t*3-chapter;
      const scale=Math.min(w*.19,h*.19)*(1+Math.sin(phase*Math.PI)*.22);
      const rotation=angle+t*Math.PI*2,tilt=reduced.matches?.15:(mouse.y/h-.5)*.25;
      const cx=w/2+Math.sin(t*Math.PI*2)*w*.14,cy=h*.49;
      const project=(p:P)=>{const x=p[0]*Math.cos(rotation)+p[2]*Math.sin(rotation),z=-p[0]*Math.sin(rotation)+p[2]*Math.cos(rotation),y=p[1]*Math.cos(tilt)-z*Math.sin(tilt);const depth=z*Math.cos(tilt)+p[1]*Math.sin(tilt),f=4/(4+depth);return{x:cx+x*scale*f,y:cy+y*scale*f,z:depth};};
      const onStage=scrollY<top+(stage?.offsetHeight??0)-h*.3;
      if(onStage){
        const opacity=Math.min(1,phase*8+.3,(1-phase)*8+.3);
        for(let i=0;i<300;i++){const a=Math.acos(1-2*(i+.5)/300),b=i*2.39996;const p=project([1.85*Math.sin(a)*Math.cos(b),1.85*Math.cos(a),1.85*Math.sin(a)*Math.sin(b)]);ctx.fillStyle=`rgba(225,174,135,${(.18+(p.z+2)*.04)*opacity})`;ctx.fillRect(p.x,p.y,1.4,1.4);}
        for(const e of models[chapter]){const a=project(e[0]),b=project(e[1]);ctx.strokeStyle=`rgba(247,208,177,${Math.max(.2,.7-(a.z+b.z)*.1)*opacity})`;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();ctx.fillStyle=`rgba(255,121,95,${opacity})`;ctx.beginPath();ctx.arc(a.x,a.y,2,0,Math.PI*2);ctx.fill();}
        surface.dataset.chapter=String(chapter);surface.dataset.progress=t.toFixed(3);
        ctx.strokeStyle="#ffbd781c";for(let i=-6;i<=6;i++){ctx.beginPath();ctx.moveTo(w/2+i*22,h*.81);ctx.lineTo(w/2+i*150,h);ctx.stroke();}
        stage?.style.setProperty("--scene-progress",String(t));
      }
      if(fine.matches&&active&&!reduced.matches){
        document.documentElement.classList.add("cinematic-cursor");
        trail[0].x+=(mouse.x-trail[0].x)*.55;trail[0].y+=(mouse.y-trail[0].y)*.55;
        for(let i=1;i<trail.length;i++){trail[i].x+=(trail[i-1].x-trail[i].x)*.34;trail[i].y+=(trail[i-1].y-trail[i].y)*.34;}
        for(let k=0;k<9;k++)for(let i=1;i<trail.length;i++){const wave=Math.sin(i*.24+k+angle*5)*i*.6;ink.strokeStyle=`rgba(${k%3===0?'255,121,95':'246,199,159'},${(1-i/trail.length)*.3})`;ink.beginPath();ink.moveTo(trail[i-1].x+wave,trail[i-1].y+wave*.4);ink.lineTo(trail[i].x+wave,trail[i].y+wave*.4);ink.stroke();}
        ink.shadowColor="#ff795f";ink.shadowBlur=10;ink.fillStyle="#fff1da";ink.beginPath();ink.arc(mouse.x,mouse.y,2.5,0,Math.PI*2);ink.fill();ink.shadowBlur=0;
        if(hover){ink.strokeStyle="#ff795f88";ink.beginPath();ink.arc(mouse.x,mouse.y,14,0,Math.PI*2);ink.stroke();}
      }else document.documentElement.classList.remove("cinematic-cursor");
      if(!reduced.matches&&!document.hidden)frame=requestAnimationFrame(draw);
    };
    const restart=()=>{cancelAnimationFrame(frame);last=performance.now();draw(last);};
    const onResize=()=>{resize();restart();};const onScroll=()=>{if(reduced.matches)restart();};
    const panels=document.querySelectorAll<HTMLElement>(".section-heading,.service-card,.project-card,.track-list>a,.experience-list article,.credentials-grid,.cv-panel");
    const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add("scene-visible");observer.unobserve(entry.target);}},{threshold:.08});
    if(!reduced.matches)panels.forEach((p,i)=>{p.classList.add("scene-reveal");p.style.setProperty("--reveal-delay",`${i%3*60}ms`);observer.observe(p);});
    resize();restart();addEventListener("resize",onResize);addEventListener("pointermove",move,{passive:true});addEventListener("pointerout",leave);addEventListener("scroll",onScroll,{passive:true});document.addEventListener("visibilitychange",restart);reduced.addEventListener("change",restart);
    return()=>{observer.disconnect();panels.forEach(p=>p.classList.remove("scene-reveal","scene-visible"));cancelAnimationFrame(frame);removeEventListener("resize",onResize);removeEventListener("pointermove",move);removeEventListener("pointerout",leave);removeEventListener("scroll",onScroll);document.removeEventListener("visibilitychange",restart);reduced.removeEventListener("change",restart);document.documentElement.classList.remove("cinematic-cursor");};
  },[]);
  return <><canvas ref={scene} className="scene-canvas" aria-hidden="true"/><canvas ref={cursor} className="cursor-trail" aria-hidden="true"/></>;
}
