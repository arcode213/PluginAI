// Shared motion tokens for the premium landing. Keep timing/easing consistent
// across every section so the whole page feels like one system.
export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_EMPH = [0.34, 1.56, 0.64, 1] as const;

export const fadeUp = (delay = 0, y = 24) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, delay, ease: EASE },
});

export const container = (stagger = 0.08, delayChildren = 0) => ({
  initial: {},
  whileInView: {},
  viewport: { once: true, margin: '-80px' },
  transition: { staggerChildren: stagger, delayChildren },
});
