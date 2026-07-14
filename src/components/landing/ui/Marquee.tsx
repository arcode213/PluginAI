'use client';
import React from 'react';

/** Infinite CSS marquee — duplicates children for a seamless loop, pauses on hover. */
export function Marquee({ children, reverse = false, className = '' }: { children: React.ReactNode; reverse?: boolean; className?: string }) {
  return (
    <div className={`marquee ${className}`}>
      <div className={`marquee-track ${reverse ? 'reverse' : ''}`}>
        <span className="marquee-group">{children}</span>
        <span className="marquee-group" aria-hidden>{children}</span>
      </div>
    </div>
  );
}
