'use client';
import React, { useRef } from 'react';
import { Card } from '../ui/Card';
import { gsap, useGSAP, prefersReducedMotion } from './_anim';

// Static stroke icons matching `.feature-icon svg` (24x24, stroke #7c6df0).
const IconEducation = () => (
  <svg viewBox="0 0 24 24"><path d="M22 10 12 5 2 10l10 5 10-5z" /><path d="M6 12v5c0 1.2 2.7 2.5 6 2.5s6-1.3 6-2.5v-5" /><line x1="22" y1="10" x2="22" y2="15" /></svg>
);
const IconSupport = () => (
  <svg viewBox="0 0 24 24"><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="2" y="13" width="4" height="7" rx="1.5" /><rect x="18" y="13" width="4" height="7" rx="1.5" /><path d="M18 20a4 4 0 0 1-4 3h-2" /></svg>
);
const IconKnowledge = () => (
  <svg viewBox="0 0 24 24"><path d="M4 5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-2z" /><path d="M19 3v18" /><line x1="8" y1="8" x2="15" y2="8" /><line x1="8" y1="12" x2="15" y2="12" /></svg>
);
const IconDev = () => (
  <svg viewBox="0 0 24 24"><polyline points="8 6 3 12 8 18" /><polyline points="16 6 21 12 16 18" /><line x1="13" y1="4" x2="11" y2="20" /></svg>
);
const IconPolicy = () => (
  <svg viewBox="0 0 24 24"><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V3h6v1" /><line x1="8.5" y1="10" x2="15.5" y2="10" /><line x1="8.5" y1="14" x2="13" y2="14" /></svg>
);
const IconResearch = () => (
  <svg viewBox="0 0 24 24"><path d="M9 3v6l-5 8.5A2 2 0 0 0 5.7 21h12.6a2 2 0 0 0 1.7-3.5L15 9V3" /><line x1="8" y1="3" x2="16" y2="3" /><line x1="7" y1="15" x2="17" y2="15" /></svg>
);

const CASES = [
  { Icon: IconEducation, title: 'Universities & education', body: 'Turn prospectuses, program guides, and policy handbooks into a 24/7 admissions assistant that answers students with exact page citations.' },
  { Icon: IconSupport, title: 'Customer support', body: 'Ground your support bot in help docs and FAQs so it deflects repetitive tickets with accurate, source-linked answers — not hallucinations.' },
  { Icon: IconKnowledge, title: 'Internal knowledge base', body: 'Let employees ask onboarding docs, SOPs, and wikis in plain language instead of hunting through folders and outdated shared drives.' },
  { Icon: IconDev, title: 'Product & developer docs', body: 'Embed an assistant in your docs site so developers get precise answers from your API reference, guides, and changelogs via the REST API.' },
  { Icon: IconPolicy, title: 'HR & policy Q&A', body: 'Answer questions about leave policies, benefits, and compliance handbooks with citations — no more forwarding the same PDF every week.' },
  { Icon: IconResearch, title: 'Research & reports', body: 'Query large collections of reports, papers, and spreadsheets. The agent reasons across multiple documents to synthesize a single answer.' },
];

export function UseCases() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.from('.usecases-head > *', {
      y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.usecases-head', start: 'top 85%' },
    });
    gsap.utils.toArray<HTMLElement>('.usecase-card').forEach((card, i) => {
      gsap.from(card, {
        y: 40, autoAlpha: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 88%' },
        delay: (i % 3) * 0.08,
      });
    });
  }, { scope: root });

  return (
    <section className="section" id="use-cases" ref={root}>
      <div className="usecases-head" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 8px' }}>
        <div className="section-tag">Use cases</div>
        <h2 className="section-title">One platform, many assistants</h2>
        <p className="section-sub" style={{ margin: '0 auto 56px' }}>
          Any team sitting on a pile of documents can turn it into an accurate,
          conversational assistant — no ML expertise required.
        </p>
      </div>

      <div className="features-grid">
        {CASES.map(({ Icon, title, body }) => (
          <Card className="feature-card usecase-card" key={title}>
            <div className="feature-icon"><Icon /></div>
            <h3>{title}</h3>
            <p>{body}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
