'use client';
import React, { useRef } from 'react';
import { Card } from '../ui/Card';
import { gsap, useGSAP, prefersReducedMotion } from './_anim';
import {
  IconIngestion, IconRetrieval, IconWorkspaces, IconUsage, IconApi, IconSecurity,
} from './AnimatedIcons';

const FEATURES = [
  { Icon: IconIngestion, title: 'Multi-format ingestion', body: 'Upload PDF, Word, Excel, and plain text files. Smart chunking preserves tables, lists, and section structure automatically.' },
  { Icon: IconRetrieval, title: 'Agentic RAG retrieval', body: 'Our AI agent uses multiple tools to search, rerank, and synthesize answers — retrying with different strategies until it finds the best result.' },
  { Icon: IconWorkspaces, title: 'Multi-tenant workspaces', body: 'Each organization gets isolated workspaces with their own data, API keys, usage limits, and subscription plans.' },
  { Icon: IconUsage, title: 'Real-time usage tracking', body: 'Monitor token consumption, query counts, and document uploads per workspace. Get monthly usage reports via email.' },
  { Icon: IconApi, title: 'REST API access', body: 'Integrate your AI assistant into any application using our simple REST API. Each workspace gets its own API key.' },
  { Icon: IconSecurity, title: 'Enterprise security', body: 'Row-level security, API key management, activity logging, and per-user access controls built in from day one.' },
];

export function Features() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.from('.features-head > *', {
      y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: '.features-head', start: 'top 85%' },
    });
    gsap.utils.toArray<HTMLElement>('.feature-card').forEach((card, i) => {
      gsap.from(card, {
        y: 40, autoAlpha: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 88%' },
        delay: (i % 3) * 0.08,
      });
    });
  }, { scope: root });

  return (
    <section className="section" id="features" ref={root}>
      <div className="features-head">
        <div className="section-tag">Features</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '56px' }}>
          <h2 className="section-title">Everything you need<br />to build AI assistants</h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', maxWidth: '380px', lineHeight: 1.7 }}>
            From document ingestion to intelligent retrieval — Plugin AI handles the full pipeline so you can focus on your product.
          </p>
        </div>
      </div>

      <div className="features-grid">
        {FEATURES.map(({ Icon, title, body }) => (
          <Card className="feature-card" key={title}>
            <div className="feature-icon"><Icon /></div>
            <h3>{title}</h3>
            <p>{body}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
