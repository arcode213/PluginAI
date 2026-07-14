'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Lenis smooth-scroll provider. Renders nothing; drives the whole document.
 * Intercepts in-page anchor clicks for buttery scroll-to. Fully disabled under
 * prefers-reduced-motion (native scroll takes over).
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (el) { e.preventDefault(); lenis.scrollTo(el as HTMLElement, { offset: -84 }); }
    };
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('click', onClick);
      lenis.destroy();
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
    };
  }, []);

  return null;
}
