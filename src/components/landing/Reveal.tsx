'use client';
// Lightweight scroll-reveal wrapper used across the marketing sub-pages.
import React, { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from './_anim';

export function Reveal({
  children, y = 24, delay = 0, className, style, id,
}: {
  children: React.ReactNode;
  y?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current || prefersReducedMotion()) return;
    gsap.from(ref.current, {
      y, autoAlpha: 0, duration: 0.7, delay, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 88%' },
    });
  }, { scope: ref });

  return <div ref={ref} id={id} className={className} style={style}>{children}</div>;
}
