'use client';
import React, { useRef } from 'react';
import { Button } from '@/components/shadcn/button';
import { gsap, useGSAP, prefersReducedMotion } from './_anim';

const CHECK = (
  <div className="check"><svg viewBox="0 0 10 10"><polyline points="2,5 4,7 8,3" /></svg></div>
);

const PLANS = [
  {
    name: 'Free', price: '$0', unit: '/mo', featured: false,
    desc: 'Perfect for individuals and small projects.',
    features: ['1 workspace', '10 documents', '100 queries/month', 'Community support'],
    cta: 'Get started free', href: 'https://app.pluginai.space/register', btn: 'plan-btn-outline',
  },
  {
    name: 'Pro', price: '$29', unit: '/mo', featured: true,
    desc: 'For growing teams and businesses.',
    features: ['5 workspaces', '100 documents', '10,000 queries/month', 'API access', 'Priority support'],
    cta: 'Start Pro trial', href: 'https://app.pluginai.space/register', btn: 'plan-btn-filled',
  },
  {
    name: 'Enterprise', price: 'Custom', unit: '', featured: false,
    desc: 'For large organizations with custom needs.',
    features: ['Unlimited workspaces', 'Unlimited documents', 'Custom token limits', 'SSO & advanced security', 'Dedicated support'],
    cta: 'Contact sales', href: 'https://app.pluginai.space/register', btn: 'plan-btn-outline',
  },
];

export function Pricing() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.from('.pricing-head > *', {
      y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: root.current, start: 'top 82%' },
    });
    gsap.from('.plan-card', {
      y: 44, autoAlpha: 0, duration: 0.75, stagger: 0.14, ease: 'power3.out',
      scrollTrigger: { trigger: '.pricing-grid', start: 'top 85%' },
    });
  }, { scope: root });

  return (
    <section className="section" id="pricing" style={{ paddingTop: '20px' }} ref={root}>
      <div className="pricing-head">
        <div className="section-tag">Pricing</div>
        <h2 className="section-title">Simple, transparent pricing</h2>
        <p className="section-sub">Start for free. Scale as you grow. No hidden fees.</p>
      </div>

      <div className="pricing-grid">
        {PLANS.map((p) => (
          <div className={`plan-card${p.featured ? ' featured' : ''}`} key={p.name}>
            {p.featured && <div className="plan-badge">Most popular</div>}
            <div className="plan-name">{p.name}</div>
            <div className="plan-price">{p.price}{p.unit && <span>{p.unit}</span>}</div>
            <div className="plan-desc">{p.desc}</div>
            <ul className="plan-features">
              {p.features.map((f) => (<li key={f}>{CHECK}{f}</li>))}
            </ul>
            <Button asChild variant={p.featured ? 'gradient' : 'outline'} className="w-full">
              <a href={p.href}>{p.cta}</a>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
