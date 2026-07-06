'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/shadcn/button';
import { gsap, useGSAP, prefersReducedMotion } from '../landing/_anim';

export function Navbar() {
  const nav = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.from('[data-nav]', {
      y: -18, autoAlpha: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.1,
      clearProps: 'transform,opacity,visibility',
    });
  }, { scope: nav });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? ' navbar-scrolled' : ''}`} ref={nav}>
      <Link href="/" className="nav-logo" data-nav>
        Plugin<span>AI</span>
      </Link>
      <ul className="nav-links">
        <li data-nav><Link href="/#features">Features</Link></li>
        <li data-nav><Link href="/#use-cases">Use cases</Link></li>
        <li data-nav><Link href="/#how-it-works">How it works</Link></li>
        <li data-nav><Link href="/#pricing">Pricing</Link></li>
        <li data-nav><Link href="/#faq">FAQ</Link></li>
        <li data-nav><Link href="/docs">Docs</Link></li>
      </ul>
      <div style={{ display: 'flex', gap: '12px' }} data-nav>
        <Button asChild variant="ghost" size="sm"><a href="https://app.pluginai.space/login">Sign in</a></Button>
        <Button asChild variant="gradient" size="sm"><a href="https://app.pluginai.space/register">Get started free</a></Button>
      </div>
    </nav>
  );
}
