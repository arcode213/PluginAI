'use client';
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from './motion';

type Props = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  /** @deprecated Kept for API compatibility; blur is no longer animated. */
  blur?: boolean;
  className?: string;
  once?: boolean;
};

/**
 * Scroll-reveal wrapper — fade + rise. Reduced-motion safe.
 *
 * PERF: this component is mounted ~60x on the landing page, so whatever it
 * animates runs 60x during scroll. It therefore animates ONLY `opacity` and
 * `transform` — the two properties the compositor can handle without involving
 * layout or paint. The previous version also animated `filter: blur(10px)`,
 * which forces the GPU to re-rasterize the whole subtree on every frame of
 * every reveal; with dozens of them firing during a scroll that was the main
 * source of dropped frames. The `blur` prop is accepted and ignored so call
 * sites did not have to change.
 */
export function Reveal({ children, delay = 0, y = 26, className, once = true }: Props) {
  const reduce = useReducedMotion();
  const [done, setDone] = React.useState(false);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      // Trigger BEFORE the element reaches the viewport (positive bottom margin
      // expands the observer root downwards), so content has already faded in
      // by the time it scrolls into view. The previous '-80px' did the
      // opposite — it waited until the element was 80px *inside* the viewport,
      // which is why a moderately fast scroll landed on blank screens.
      viewport={{ once, margin: '0px 0px 240px 0px' }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      onAnimationComplete={() => setDone(true)}
      // Promote to its own layer only while actually animating, then release it.
      // Leaving `will-change` on permanently would keep ~60 compositor layers
      // alive for the whole session and cost more memory than it saves.
      style={done ? undefined : { willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  );
}
