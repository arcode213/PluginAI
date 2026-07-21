'use client';
// Site-wide premium ambient background for the public/marketing surface:
//  • fixed aurora blobs (blue-violet) + masked grid + vignette (behind content)
//  • a fixed noise texture layer + a cursor-follow focus light (above content)
// Degrades gracefully under prefers-reduced-motion / touch devices.
import React, { useEffect, useRef } from 'react';

export function AmbientBackground() {
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glow.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let tx = window.innerWidth / 2, ty = window.innerHeight / 3;
    let cx = tx, cy = ty, raf = 0, seen = false;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY;
      if (!seen) { seen = true; el.style.opacity = '1'; }
      if (!raf) raf = requestAnimationFrame(loop); // wake the loop on demand
    };

    // The glow is a large blurred radial gradient, so every frame that touches
    // --mx/--my repaints a big area. Idle the rAF out once the easing has
    // settled instead of running it for the lifetime of the page; a fresh
    // mousemove restarts it. Saves a continuous repaint during scrolling.
    const loop = () => {
      const dx = tx - cx, dy = ty - cy;
      cx += dx * 0.15; cy += dy * 0.15;
      el.style.setProperty('--mx', `${cx.toFixed(1)}px`);
      el.style.setProperty('--my', `${cy.toFixed(1)}px`);
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) { raf = 0; return; }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="ambient" aria-hidden="true">
        <div className="grid-layer" />
        <div className="aurora-blob" style={{ width: 560, height: 560, top: -170, left: -130, background: 'radial-gradient(circle, rgba(109,94,249,0.42), transparent 70%)', animation: 'aurora-drift 22s ease-in-out infinite' }} />
        <div className="aurora-blob" style={{ width: 640, height: 640, top: '38%', right: -230, background: 'radial-gradient(circle, rgba(139,92,246,0.30), transparent 70%)', animation: 'aurora-drift 30s ease-in-out infinite reverse' }} />
        <div className="aurora-blob" style={{ width: 500, height: 500, bottom: -200, left: '28%', background: 'radial-gradient(circle, rgba(34,211,238,0.12), transparent 70%)', animation: 'aurora-drift 34s ease-in-out infinite' }} />
        <div className="amb-vignette" />
      </div>
      <div className="noise-layer" aria-hidden="true" />
      <div className="cursor-glow" ref={glow} aria-hidden="true" />
    </>
  );
}
