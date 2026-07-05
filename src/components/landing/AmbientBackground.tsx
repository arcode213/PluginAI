'use client';
// Site-wide ambient background for the public site:
//  • a fixed layer BEHIND content: drifting aurora blobs (GSAP), masked grid, vignette
//  • a fixed layer ON TOP of content: a cursor-following "focus light" that uses a
//    lightening blend mode so it reads as a real spotlight (pointer-events:none).
// Fully degrades under prefers-reduced-motion / on touch devices.
import React, { useEffect, useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from './_anim';

export function AmbientBackground() {
  const root = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  // Drifting blobs (behind content)
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.to('.amb-blob-1', { x: 130, y: 90, duration: 18, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.amb-blob-2', { x: -110, y: 130, duration: 23, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.amb-blob-3', { x: 90, y: -100, duration: 27, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }, { scope: root });

  // Cursor focus light (on top). Smooth trailing via a small lerp loop that
  // updates CSS custom properties the radial-gradient reads from.
  useEffect(() => {
    const el = glow.current;
    if (!el || prefersReducedMotion()) return;
    if (window.matchMedia('(pointer: coarse)').matches) return; // no cursor on touch

    let tx = window.innerWidth / 2, ty = window.innerHeight / 3;
    let cx = tx, cy = ty, raf = 0, seen = false;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY;
      if (!seen) { seen = true; el.style.opacity = '1'; }
    };
    const loop = () => {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      el.style.setProperty('--mx', `${cx.toFixed(1)}px`);
      el.style.setProperty('--my', `${cy.toFixed(1)}px`);
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div className="ambient" ref={root} aria-hidden="true">
        <div className="amb-grid" />
        <div className="amb-blob amb-blob-1" />
        <div className="amb-blob amb-blob-2" />
        <div className="amb-blob amb-blob-3" />
        <div className="amb-vignette" />
      </div>
      <div className="cursor-glow" ref={glow} aria-hidden="true" />
    </>
  );
}
