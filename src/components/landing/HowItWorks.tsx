'use client';
import React, { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from './_anim';

const STEPS = [
  { n: 1, title: 'Create a workspace', body: 'Spin up an isolated workspace for your organization in seconds — its own data, keys, and limits.' },
  { n: 2, title: 'Upload your documents', body: 'Drop in PDFs, docs, and spreadsheets. We chunk, embed, and index them into a vector store automatically.' },
  { n: 3, title: 'Ask in natural language', body: 'The agentic RAG pipeline searches, reranks, and synthesizes accurate answers with source citations.' },
  { n: 4, title: 'Deploy anywhere', body: 'Generate an API key and embed your assistant into any app, website, or support flow via REST.' },
];

export function HowItWorks() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.from('.how-inner .section-tag, .how-inner .section-title, .how-inner > p', {
      y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: root.current, start: 'top 80%' },
    });
    gsap.from('.step', {
      y: 40, autoAlpha: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: '.steps', start: 'top 85%' },
    });
  }, { scope: root });

  return (
    <section className="how-section" id="how-it-works" ref={root}>
      <div className="how-inner">
        <div className="section-tag">How it works</div>
        <h2 className="section-title">From documents to answers<br />in four steps</h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', maxWidth: '520px', lineHeight: 1.7 }}>
          No pipelines to wire, no models to train. Plugin AI handles ingestion,
          retrieval, and serving end-to-end.
        </p>
        <div className="steps">
          {STEPS.map((s) => (
            <div className="step" key={s.n}>
              <div className="step-num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
