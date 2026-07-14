'use client';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  spotlight?: boolean;
  style?: React.CSSProperties;
};

/** Glass card with gradient border + optional mouse-follow spotlight. */
export function GlassCard({ children, className = '', spotlight = true, style }: Props) {
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--sx', `${e.clientX - r.left}px`);
    el.style.setProperty('--sy', `${e.clientY - r.top}px`);
  };
  return (
    <div
      className={`card-glass ${spotlight ? 'card-spot' : ''} ${className}`}
      onMouseMove={spotlight ? onMove : undefined}
      style={style}
    >
      {children}
    </div>
  );
}
