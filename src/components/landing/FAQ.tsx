'use client';
import React, { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from './_anim';

const FAQS = [
  {
    q: 'What file formats can I upload?',
    a: 'PDF, Word, Excel, and plain-text files are supported today. Smart chunking preserves tables, lists, and section structure so the assistant can reason over mixed content — not just flat paragraphs.',
  },
  {
    q: 'How is agentic RAG different from regular RAG?',
    a: 'Instead of a single vector lookup, our AI agent uses multiple tools to search, rerank, and synthesize — and it retries with different strategies when the first result is weak. That means fewer wrong answers and better multi-step reasoning across documents.',
  },
  {
    q: 'Is my data isolated from other organizations?',
    a: 'Yes. Every organization gets its own multi-tenant workspace with row-level security, isolated data, and its own API keys and usage limits. Your documents are never shared across tenants.',
  },
  {
    q: 'Do you train models on my documents?',
    a: 'No. Your documents are used only to answer queries within your own workspace. They are never used to train shared models or exposed to other customers.',
  },
  {
    q: 'Can I access it through an API?',
    a: 'Yes. Each workspace gets its own REST API key, so you can embed the assistant into any app, website, or support flow. Answers come back with source references you can display to your users.',
  },
  {
    q: 'How is usage measured and billed?',
    a: 'We track token consumption, query counts, and document uploads per workspace in real time, and email you a monthly usage report. Plans set the limits — you only move up a tier when you actually need more.',
  },
  {
    q: 'What happens when I hit my plan limit?',
    a: 'You get clear in-app warnings as you approach your workspace limits. Upgrading is instant, and nothing you have already uploaded is lost — you simply unlock more workspaces, documents, and queries.',
  },
  {
    q: 'How long does setup take?',
    a: 'Minutes. Create a workspace, upload your documents, and start asking questions — there are no pipelines to wire up and no models to train. Generate an API key whenever you are ready to deploy.',
  },
];

export function FAQ() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.from('.faq-head > *', {
      y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.faq-head', start: 'top 85%' },
    });
    gsap.from('.faq-item', {
      y: 24, autoAlpha: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: '.faq', start: 'top 85%' },
    });
  }, { scope: root });

  return (
    <section className="section" id="faq" ref={root}>
      <div className="faq-head" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
        <div className="section-tag">FAQ</div>
        <h2 className="section-title">Questions, answered</h2>
        <p className="section-sub" style={{ margin: '0 auto' }}>
          Everything you need to know about how Plugin AI turns your documents into
          an accurate, deployable assistant.
        </p>
      </div>

      <div className="faq">
        {FAQS.map((item) => (
          <details className="faq-item" key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
