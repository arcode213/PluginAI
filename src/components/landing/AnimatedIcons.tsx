'use client';
// Self-contained GSAP-animated SVG icons — smooth looping micro-animations,
// no external assets. Each icon inherits stroke/size from `.feature-icon svg`.
import React, { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from './_anim';

type Build = (helpers: {
  draw: (sel: string, dur?: number, delay?: number) => void;
}) => void;

function useIconAnim(build: Build) {
  const ref = useRef<SVGSVGElement>(null);
  useGSAP(() => {
    if (!ref.current || prefersReducedMotion()) return;
    const draw = (sel: string, dur = 1.6, delay = 0) => {
      (gsap.utils.toArray(sel) as SVGGeometryElement[]).forEach((s) => {
        let len = 0;
        try { len = s.getTotalLength?.() ?? 0; } catch { len = 0; }
        if (!len) return;
        gsap.set(s, { strokeDasharray: len });
        gsap.fromTo(
          s,
          { strokeDashoffset: len },
          { strokeDashoffset: 0, duration: dur, delay, ease: 'power1.inOut', repeat: -1, repeatDelay: 1 }
        );
      });
    };
    build({ draw });
  }, { scope: ref });
  return ref;
}

// 1 ── Multi-format ingestion: a document with a scanning line
export function IconIngestion() {
  const ref = useIconAnim(() => {
    gsap.to('.scan', { y: 9, repeat: -1, yoyo: true, duration: 1.4, ease: 'sine.inOut' });
    gsap.to('.scan', { opacity: 0.35, repeat: -1, yoyo: true, duration: 0.7, ease: 'sine.inOut' });
  });
  return (
    <svg ref={ref} viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line className="scan" x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}

// 2 ── Agentic RAG retrieval: magnifier with a pulsing search ring
export function IconRetrieval() {
  const ref = useIconAnim(() => {
    gsap.fromTo('.pulse',
      { scale: 0.5, opacity: 0.8, transformOrigin: '11px 11px' },
      { scale: 1.4, opacity: 0, duration: 1.8, ease: 'power1.out', repeat: -1 });
    gsap.to('.lens', { rotation: 8, transformOrigin: '11px 11px', repeat: -1, yoyo: true, duration: 1.6, ease: 'sine.inOut' });
  });
  return (
    <svg ref={ref} viewBox="0 0 24 24">
      <g className="lens">
        <circle className="pulse" cx="11" cy="11" r="7" />
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </g>
    </svg>
  );
}

// 3 ── Multi-tenant workspaces: 4 tiles that breathe in sequence
export function IconWorkspaces() {
  const ref = useIconAnim(() => {
    gsap.fromTo('.tile',
      { scale: 0.6, opacity: 0.4, transformOrigin: 'center' },
      { scale: 1, opacity: 1, duration: 0.6, stagger: { each: 0.18, repeat: -1, yoyo: true }, ease: 'sine.inOut' });
  });
  return (
    <svg ref={ref} viewBox="0 0 24 24">
      <rect className="tile" x="3" y="3" width="7" height="7" rx="1" />
      <rect className="tile" x="14" y="3" width="7" height="7" rx="1" />
      <rect className="tile" x="3" y="14" width="7" height="7" rx="1" />
      <rect className="tile" x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

// 4 ── Real-time usage tracking: an EKG/activity line that redraws
export function IconUsage() {
  const ref = useIconAnim(({ draw }) => { draw('.ekg', 1.8); });
  return (
    <svg ref={ref} viewBox="0 0 24 24">
      <polyline className="ekg" points="2 12 6 12 9 3 15 21 18 12 22 12" />
    </svg>
  );
}

// 5 ── REST API access: a window with a blinking cursor
export function IconApi() {
  const ref = useIconAnim(() => {
    gsap.to('.cursor', { opacity: 0, repeat: -1, yoyo: true, duration: 0.55, ease: 'steps(1)' });
    gsap.fromTo('.typed', { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 1.1, ease: 'power2.out', repeat: -1, repeatDelay: 1.2 });
  });
  return (
    <svg ref={ref} viewBox="0 0 24 24">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <line x1="2" y1="8" x2="22" y2="8" />
      <line className="typed" x1="6" y1="14" x2="13" y2="14" />
      <line className="cursor" x1="15" y1="14" x2="15" y2="14" strokeWidth="2.4" />
    </svg>
  );
}

// 6 ── Enterprise security: a shield whose check draws itself
export function IconSecurity() {
  const ref = useIconAnim(({ draw }) => {
    draw('.check', 0.9);
    gsap.to('.shield', { scale: 1.06, transformOrigin: 'center', repeat: -1, yoyo: true, duration: 1.6, ease: 'sine.inOut' });
  });
  return (
    <svg ref={ref} viewBox="0 0 24 24">
      <path className="shield" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline className="check" points="8.5 12 11 14.5 15.5 9.5" />
    </svg>
  );
}
