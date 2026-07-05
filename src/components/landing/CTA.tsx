'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/shadcn/button';
import { gsap, useGSAP, prefersReducedMotion } from './_anim';

export function CTA() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.from('.cta-inner > *', {
      y: 28, autoAlpha: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: root.current, start: 'top 80%' },
    });
  }, { scope: root });

  return (
    <section className="cta-section" ref={root}>
      <div className="cta-glow" aria-hidden="true" />
      <div className="cta-inner">
        <h2>Ready to build your<br /><span className="grad-text">AI assistant?</span></h2>
        <p>Join teams shipping intelligent, document-grounded support in minutes. Start free — no credit card required.</p>
        <div className="cta-actions">
          <Button asChild variant="gradient" size="lg"><Link href="/register">Start for free</Link></Button>
          <Button asChild variant="outline" size="lg"><Link href="/login">Sign in</Link></Button>
        </div>
      </div>
    </section>
  );
}
