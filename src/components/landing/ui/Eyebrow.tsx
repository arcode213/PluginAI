import React from 'react';

/** Small pill eyebrow used above section headings. */
export function Eyebrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`eyebrow-premium ${className}`}>
      <span className="dot" aria-hidden />
      {children}
    </span>
  );
}
