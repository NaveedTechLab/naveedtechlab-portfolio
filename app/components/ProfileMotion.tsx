"use client";
import { useEffect, useRef } from "react";
const COUNT = 300;
export default function ProfileMotion() {
 const canvas = useRef<HTMLCanvasElement>(null);
 useEffect(() => {
  const surface=canvas.current, context=surface?.getContext("2d",{alpha:false});
  if(!surface||!context)return;
  const stage=surface.closest<HTMLElement>(".cinematic-intro");
  const reduced=matchMedia("(prefers-reduced-motion: reduce)");
  const frames: (HTMLImageElement|undefined)[]=Array(COUNT);
  const pending=new Set<number>();
  

  let alive=true,animation=0,current=0,target=0,last=0,painted=-1,width=0,height=0;
  const paint=()=>{
   const desired=Math.round(current);
   let index=desired;
   if(!frames[index]){for(let distance=1;distance<COUNT;distance++){if(frames[desired-distance]){index=desired-distance;break;}if(frames[desired+distance]){index=desired+distance;break;}}}
   const image=frames[index];if(!image||painted===index)return;
   const scale=Math.max(width/image.naturalWidth,height/image.naturalHeight);
   const dw=image.naturalWidth*scale,dh=image.naturalHeight*scale;
   context.drawImage(image,(width-dw)*.53,(height-dh)*.5,dw,dh);
   painted=index;surface.dataset.frame=String(index+1);
  };
  const load=(index:number)=>{if(index<0||index>=COUNT||frames[index]||pending.has(index))return Promise.resolve();pending.add(index);return new Promise<void>(resolve=>{const image=new window.Image();image.decoding="async";image.onload=async()=>{try{await image.decode();}catch{}if(alive){frames[index]=image;pending.delete(index);painted=-1;paint();}resolve();};image.onerror=()=>{pending.delete(index);resolve();};image.src=`/portrait-frames/ezgif-frame-${String(index+1).padStart(3,"0")}.jpg?v=emerald-20261007`;});};
  const tick=(now:number)=>{animation=0;if(!alive)return;const dt=Math.min(50,now-last||16);last=now;current+= (target-current)*(1-Math.exp(-dt/85));if(Math.abs(target-current)<.03)current=target;void load(Math.round(current));stage?.style.setProperty("--scene-progress",String(current/(COUNT-1)));paint();if(current!==target)animation=requestAnimationFrame(tick);};
  const scroll=()=>{const top=stage?.offsetTop??0;const range=Math.max(1,(stage?.offsetHeight??innerHeight)-innerHeight);target=reduced.matches?0:Math.max(0,Math.min(1,(scrollY-top)/range))*(COUNT-1);void load(Math.round(target));if(!animation){last=performance.now();animation=requestAnimationFrame(tick);}};
  const resize=()=>{width=innerWidth;height=innerHeight;const ratio=Math.min(devicePixelRatio||1,1.5);surface.width=Math.round(width*ratio);surface.height=Math.round(height*ratio);context.setTransform(ratio,0,0,ratio,0,0);painted=-1;paint();scroll();};
  resize();void load(0).then(async()=>{let next=1;await Promise.all(Array.from({length:6},async()=>{while(alive&&next<COUNT){const i=next++;await load(i);}}));if(alive)surface.dataset.loaded=String(frames.filter(Boolean).length);});
  addEventListener("scroll",scroll,{passive:true});addEventListener("resize",resize);reduced.addEventListener("change",scroll);
  return()=>{alive=false;cancelAnimationFrame(animation);removeEventListener("scroll",scroll);removeEventListener("resize",resize);reduced.removeEventListener("change",scroll);frames.length=0;};
 },[]);
 return <canvas ref={canvas} className="profile-motion profile-sequence" role="img" aria-label="Muhammad Naveed portrait, side pose to front face as you scroll"/>;
}
