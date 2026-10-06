"use client";

import { useEffect, useRef } from "react";

/** Decorative perspective star field; all portfolio content stays in the DOM. */
export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0, height = 0, frame = 0, last = 0;
    const pointer = { x: 0, y: 0 };
    const stars = Array.from({ length: 480 }, (_, index) => ({
      x: Math.random() * 2 - 1, y: Math.random() * 2 - 1,
      z: Math.random() * 1.8 + .2, size: Math.random() * 1.3 + .25,
      warm: index % 9 === 0,
    }));
    const resize = () => {
      width = window.innerWidth; height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio; canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const move = (event: PointerEvent) => {
      pointer.x = (event.clientX / width - .5) * 18;
      pointer.y = (event.clientY / height - .5) * 18;
    };
    const draw = (time: number) => {
      const delta = Math.min(time - last, 40); last = time;
      context.clearRect(0, 0, width, height);
      const scale = Math.max(width, height) * .68;
      const scroll = reduced.matches ? 0 : window.scrollY * .025;
      for (const star of stars) {
        if (!reduced.matches) {
          star.z -= delta * .000009;
          if (star.z < .2) star.z = 2;
        }
        const x = width / 2 + star.x * scale / star.z + pointer.x / star.z;
        const y = height / 2 + star.y * scale / star.z + pointer.y / star.z - scroll % height;
        if (x < 0 || x > width || y < 0 || y > height) continue;
        const alpha = Math.min(.65, .18 / star.z);
        context.fillStyle = star.warm ? `rgba(255,121,95,${alpha})` : `rgba(225,197,164,${alpha})`;
        context.beginPath(); context.arc(x, y, Math.min(2.4, star.size / star.z), 0, Math.PI * 2); context.fill();
      }
      if (!reduced.matches) frame = requestAnimationFrame(draw);
    };
    const restart = () => { cancelAnimationFrame(frame); last = performance.now(); draw(last); };
    const onResize = () => { resize(); if (reduced.matches) restart(); };
    resize(); restart();
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", move, { passive: true });
    reduced.addEventListener("change", restart);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", move);
      reduced.removeEventListener("change", restart);
    };
  }, []);
  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
}
