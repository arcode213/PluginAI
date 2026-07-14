'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion, animate } from 'framer-motion';
import { EASE } from './motion';

type Props = { value: number; decimals?: number; prefix?: string; suffix?: string; className?: string };

/** Count-up number that animates once when scrolled into view. */
export function StatCounter({ value, decimals = 0, prefix = '', suffix = '', className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) { setN(value); return; }
    const controls = animate(0, value, { duration: 1.6, ease: EASE, onUpdate: (v) => setN(v) });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return <span ref={ref} className={className}>{prefix}{n.toFixed(decimals)}{suffix}</span>;
}
