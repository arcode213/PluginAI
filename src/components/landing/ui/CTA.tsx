'use client';
import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'glass';
  arrow?: boolean;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

/** Premium CTA: magnetic hover, ripple on click, animated arrow. */
export function CTA({ href, children, variant = 'primary', arrow = false, className = '', onClick, ariaLabel }: Props) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18 });
  const sy = useSpring(y, { stiffness: 260, damping: 18 });
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const rippleId = useRef(0);

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.22);
    y.set((e.clientY - r.top - r.height / 2) * 0.32);
  };
  const onLeave = () => { x.set(0); y.set(0); };
  const onDown = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const id = rippleId.current++;
    setRipples((p) => [...p, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
    setTimeout(() => setRipples((p) => p.filter((rp) => rp.id !== id)), 650);
  };

  const cls = `${variant === 'primary' ? 'btn-premium' : 'btn-glass'} ${className}`;
  const inner = (
    <>
      <span style={{ position: 'relative', zIndex: 2, display: 'inline-flex', alignItems: 'center', gap: 9 }}>
        {children}
        {arrow && <ArrowRight className="arrow" size={18} strokeWidth={2.2} />}
      </span>
      {variant === 'primary' && ripples.map((rp) => (
        <span key={rp.id} aria-hidden style={{
          position: 'absolute', left: rp.x, top: rp.y, width: 12, height: 12, borderRadius: '50%',
          transform: 'translate(-50%, -50%)', background: 'rgba(255,255,255,0.5)', pointerEvents: 'none',
          animation: 'ripple-expand 0.65s ease-out forwards', zIndex: 1,
        }} />
      ))}
    </>
  );
  const common = {
    className: cls,
    style: { x: sx, y: sy },
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    onMouseDown: onDown,
    'aria-label': ariaLabel,
  };

  return href ? (
    <motion.a href={href} {...common}>{inner}</motion.a>
  ) : (
    <motion.button type="button" onClick={onClick} {...common}>{inner}</motion.button>
  );
}
