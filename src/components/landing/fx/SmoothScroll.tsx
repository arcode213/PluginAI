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

    const lenis = new Lenis({
      // lerp 0.1 is heavily damped: the viewport keeps gliding well after the
      // wheel stops, which reads as lag rather than smoothness. 0.14 keeps the
      // easing but stays attached to the input.
      lerp: 0.14,
      smoothWheel: true,
      wheelMultiplier: 1,
      // Let touch devices use their own native (already smooth, GPU-driven)
      // scrolling instead of running JS per frame on the weakest hardware.
      syncTouch: false,
    });
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    const start = () => { if (!raf) raf = requestAnimationFrame(loop); };
    const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = 0; } };
    start();

    // Don't burn frames animating a document nobody is looking at.
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);

    const scrollToEl = (el: Element, immediate = false) =>
      lenis.scrollTo(el as HTMLElement, { offset: -84, immediate });

    const onClick = (e: MouseEvent) => {
      // Respect modified clicks (new tab/window) and non-primary buttons.
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;

      // Match both '#faq' and '/#faq' — the nav uses root-relative hashes so the
      // same links work from the sub-pages. Anything pointing at a *different*
      // path is a real navigation and must be left to Next.js.
      let url: URL;
      try { url = new URL(a.href, location.href); } catch { return; }
      if (url.origin !== location.origin || url.pathname !== location.pathname) return;
      if (!url.hash || url.hash === '#') return;

      const el = document.querySelector(url.hash);
      if (el) {
        e.preventDefault();
        scrollToEl(el);
        history.pushState(null, '', url.hash); // keep the URL in sync without a jump
      }
    };
    document.addEventListener('click', onClick);

    // A hash in the URL (deep link, back/forward) makes the browser jump
    // natively, which Lenis then fights — it animates back to where it thought
    // it was, so the section appears to slide away on its own. Take over both.
    const goToHash = (immediate: boolean) => {
      if (!location.hash) return;
      const el = document.querySelector(location.hash);
      if (el) scrollToEl(el, immediate);
    };
    const onHashChange = () => goToHash(false);
    window.addEventListener('hashchange', onHashChange);
    const initial = window.setTimeout(() => goToHash(true), 0);

    return () => {
      stop();
      window.clearTimeout(initial);
      document.removeEventListener('click', onClick);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('hashchange', onHashChange);
      lenis.destroy();
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
    };
  }, []);

  return null;
}
