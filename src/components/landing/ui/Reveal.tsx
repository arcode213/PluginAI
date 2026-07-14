'use client';
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from './motion';

type Props = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  blur?: boolean;
  className?: string;
  once?: boolean;
};

/** Scroll-reveal wrapper — fade + rise + optional blur, reduced-motion safe. */
export function Reveal({ children, delay = 0, y = 26, blur = true, className, once = true }: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: blur ? 'blur(10px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
