'use client';
// Lightweight scroll-reveal wrapper used across the marketing sub-pages.
//
// Previously driven by GSAP ScrollTrigger. That was replaced because the
// triggers computed their start positions before web fonts and layout had
// settled and were never refreshed, so on a long page (e.g. /docs/integrations)
// whole sections stayed at `visibility: hidden` — and, unlike a normal reveal,
// they never recovered on scroll, leaving the documentation unreadable. Some
// sections also froze mid-tween at partial opacity.
//
// This now uses the same IntersectionObserver-backed approach as the landing
// page's Reveal: no cached scroll math that can go stale, and it animates only
// opacity/transform, which the compositor handles without layout or paint.
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

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
  const reduce = useReducedMotion();
  const [done, setDone] = React.useState(false);

  if (reduce) {
    return <div id={id} className={className} style={style}>{children}</div>;
  }

  return (
    <motion.div
      id={id}
      className={className}
      style={done ? style : { ...style, willChange: 'opacity, transform' }}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      // Positive bottom margin starts the reveal before the block scrolls in,
      // so jumping via a table-of-contents link never lands on blank space.
      viewport={{ once: true, margin: '0px 0px 240px 0px' }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      onAnimationComplete={() => setDone(true)}
    >
      {children}
    </motion.div>
  );
}
