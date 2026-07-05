'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import { ThreeBackground } from './ThreeBackground';
import { Button } from '@/components/shadcn/button';
import { gsap, useGSAP, prefersReducedMotion } from './_anim';

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('[data-hero="badge"]', { y: 20, autoAlpha: 0, duration: 0.7 })
      .from('[data-hero="line"]', { yPercent: 120, opacity: 0, duration: 0.9, stagger: 0.12 }, '-=0.3')
      .from('[data-hero="sub"]', { y: 24, autoAlpha: 0, duration: 0.8 }, '-=0.5')
      .from('[data-hero="actions"] > *', {
        y: 20, autoAlpha: 0, duration: 0.6, stagger: 0.1,
        clearProps: 'transform,opacity,visibility',
      }, '-=0.5')
      .from('[data-hero="hint"]', { autoAlpha: 0, duration: 0.8 }, '-=0.2');

    gsap.to('[data-hero="hint"] .hero-hint-dot', {
      y: 8, repeat: -1, yoyo: true, duration: 1, ease: 'sine.inOut',
    });
  }, { scope: root });

  return (
    <section className="hero-3d" ref={root}>
      <ThreeBackground />
      <div className="hero-glow" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-badge" data-hero="badge">
          <span className="hero-badge-dot" /> Now with Agentic RAG — smarter, multi-step answers
        </div>

        <h1 className="hero-title">
          <span className="hero-line-mask"><span className="hero-line" data-hero="line">Your AI assistant</span></span>
          <span className="hero-line-mask">
            <span className="hero-line" data-hero="line">powered by <span className="grad-text">your data</span></span>
          </span>
        </h1>

        <p className="hero-sub" data-hero="sub">
          Upload your documents, build AI workspaces, and deploy intelligent support
          assistants — all in minutes. No ML expertise required.
        </p>

        <div className="hero-actions" data-hero="actions">
          <Button asChild variant="gradient" size="lg"><Link href="/register">Start for free</Link></Button>
          <Button asChild variant="outline" size="lg"><Link href="#demo">View live demo</Link></Button>
        </div>

        <div className="hero-hint" data-hero="hint">
          <span>Scroll to explore</span>
          <span className="hero-hint-track"><span className="hero-hint-dot" /></span>
        </div>
      </div>
    </section>
  );
}
