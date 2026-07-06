'use client';
import React, { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from './_anim';

const Stars = () => (
  <div className="testimonial-stars">
    {Array.from({ length: 5 }).map((_, i) => <div className="star" key={i} />)}
  </div>
);

const REVIEWS = [
  {
    quote: 'We pointed Plugin AI at our program handbooks and had an admissions assistant answering students the same afternoon. The citations mean staff actually trust the answers.',
    name: 'Ayesha Khan', role: 'Admissions Lead, University', initials: 'AK', color: '#7c6df0',
  },
  {
    quote: 'Support ticket volume dropped noticeably once the bot could quote our docs word-for-word with the page number. Setup was a workspace and a few uploads — that was it.',
    name: 'Daniel Ortiz', role: 'Head of Support, SaaS', initials: 'DO', color: '#0ea5e9',
  },
  {
    quote: 'The agentic retrieval is the difference-maker. It reruns queries and reasons across documents instead of returning the first fuzzy match. Answers are genuinely accurate.',
    name: 'Priya Nair', role: 'Engineering Manager', initials: 'PN', color: '#f59e0b',
  },
  {
    quote: 'Isolated workspaces and per-workspace API keys let us onboard each client without their data ever mixing. Usage tracking made billing them trivial.',
    name: 'Marcus Lee', role: 'Founder, Agency', initials: 'ML', color: '#22c55e',
  },
  {
    quote: 'We embedded it in our internal wiki and onboarding time for new hires dropped. People ask questions in plain English instead of digging through Confluence.',
    name: 'Sara Ahmed', role: 'People Ops', initials: 'SA', color: '#ec4899',
  },
  {
    quote: 'Uploaded a mix of PDFs and spreadsheets and it handled the tables cleanly. The REST API dropped straight into our existing product with almost no glue code.',
    name: 'Tom Becker', role: 'CTO, Startup', initials: 'TB', color: '#8b5cf6',
  },
];

export function Testimonials() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.from('.testimonials-head > *', {
      y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.testimonials-head', start: 'top 85%' },
    });
    gsap.utils.toArray<HTMLElement>('.testimonial-card').forEach((card, i) => {
      gsap.from(card, {
        y: 40, autoAlpha: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 90%' },
        delay: (i % 3) * 0.08,
      });
    });
  }, { scope: root });

  return (
    <section className="section" id="testimonials" ref={root}>
      <div className="testimonials-head" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
        <div className="section-tag">Testimonials</div>
        <h2 className="section-title">Loved by teams that ship</h2>
        <p className="section-sub" style={{ margin: '0 auto' }}>
          From universities to fast-moving startups — here&apos;s what teams say after
          putting their documents to work.
        </p>
      </div>

      <div className="testimonials-grid">
        {REVIEWS.map((r) => (
          <div className="testimonial-card" key={r.name}>
            <Stars />
            <p>&ldquo;{r.quote}&rdquo;</p>
            <div className="testimonial-author">
              <div className="avatar" style={{ background: `${r.color}22`, color: r.color }}>{r.initials}</div>
              <div className="author-info">
                <div className="author-name">{r.name}</div>
                <div className="author-role">{r.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
