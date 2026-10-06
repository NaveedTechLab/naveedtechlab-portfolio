"use client";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
const subscribe=()=>()=>{};
export default function AnimatedCursor(){
 const mounted=useSyncExternalStore(subscribe,()=>true,()=>false);
 const canvas=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{const el=canvas.current,ctx=el?.getContext('2d');if(!el||!ctx)return;const fine=matchMedia('(hover:hover) and (pointer:fine)'),reduced=matchMedia('(prefers-reduced-motion:reduce)');let w=innerWidth,h=innerHeight,raf=0,last=0,active=false,hover=false,pressed=false,angle=0;const mouse={x:w/2,y:h/2},trail=Array.from({length:32},()=>({...mouse}));
 const resize=()=>{w=innerWidth;h=innerHeight;const d=Math.min(devicePixelRatio||1,1.5);el.width=Math.round(w*d);el.height=Math.round(h*d);ctx.setTransform(d,0,0,d,0,0);};
 const stop=()=>{active=false;cancelAnimationFrame(raf);raf=0;ctx.clearRect(0,0,w,h);document.documentElement.classList.remove('custom-pointer');};
 const draw=(now:number)=>{raf=0;if(!active)return;const dt=Math.min(40,now-last||16);last=now;angle+=dt*.00013;ctx.clearRect(0,0,w,h);const follow=1-Math.pow(.45,dt/16.67),lag=1-Math.pow(.66,dt/16.67);trail[0].x+=(mouse.x-trail[0].x)*follow;trail[0].y+=(mouse.y-trail[0].y)*follow;for(let i=1;i<trail.length;i++){trail[i].x+=(trail[i-1].x-trail[i].x)*lag;trail[i].y+=(trail[i-1].y-trail[i].y)*lag;}
 ctx.globalCompositeOperation='lighter';for(let k=0;k<9;k++){ctx.beginPath();for(let i=0;i<trail.length;i++){const wave=Math.sin(i*.24+k+angle*5)*i*.6;const x=trail[i].x+wave,y=trail[i].y+wave*.4;if(!i)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.lineWidth=.65;ctx.strokeStyle=k%3===0?'rgba(255,104,188,.21)':'rgba(255,194,226,.15)';ctx.stroke();}
 ctx.shadowColor='#ff79c3';ctx.shadowBlur=14;ctx.fillStyle='#fff1fa';ctx.beginPath();ctx.arc(mouse.x,mouse.y,pressed?1.7:2.5,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;if(hover){ctx.strokeStyle='#ffb5df88';ctx.lineWidth=1;ctx.beginPath();ctx.arc(mouse.x,mouse.y,pressed?9:14,0,Math.PI*2);ctx.stroke();}ctx.globalCompositeOperation='source-over';raf=requestAnimationFrame(draw);};
 const move=(e:PointerEvent)=>{if(!fine.matches||reduced.matches||e.pointerType==='touch'){stop();return;}mouse.x=e.clientX;mouse.y=e.clientY;hover=e.target instanceof Element&&!!e.target.closest('a,button,summary,input,textarea');if(!active){active=true;trail.forEach(p=>{p.x=mouse.x;p.y=mouse.y;});document.documentElement.classList.add('custom-pointer');last=performance.now();raf=requestAnimationFrame(draw);}};
 const down=()=>{pressed=true;},up=()=>{pressed=false;},visibility=()=>{if(document.hidden)stop();};resize();addEventListener('resize',resize);addEventListener('pointermove',move,{passive:true});addEventListener('pointerdown',down);addEventListener('pointerup',up);addEventListener('blur',stop);document.addEventListener('mouseleave',stop);document.addEventListener('visibilitychange',visibility);fine.addEventListener('change',stop);reduced.addEventListener('change',stop);
 return()=>{stop();removeEventListener('resize',resize);removeEventListener('pointermove',move);removeEventListener('pointerdown',down);removeEventListener('pointerup',up);removeEventListener('blur',stop);document.removeEventListener('mouseleave',stop);document.removeEventListener('visibilitychange',visibility);fine.removeEventListener('change',stop);reduced.removeEventListener('change',stop);};
 },[mounted]);
 return mounted?createPortal(<canvas ref={canvas} className="flowing-cursor" style={{position:"fixed",inset:0,width:"100%",height:"100%",zIndex:10000,pointerEvents:"none"}} aria-hidden="true"/>,document.body):null;
}
