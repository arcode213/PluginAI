'use client';
// Shared GSAP setup for all landing-page animations.
// Uses the official @gsap/react useGSAP() hook, which correctly handles React
// Strict Mode's double-invoked effects (the cause of "from()" tweens getting
// stuck at opacity:0). Registers ScrollTrigger once and exposes a
// reduced-motion helper so animations degrade gracefully.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export { gsap, ScrollTrigger, useGSAP };
