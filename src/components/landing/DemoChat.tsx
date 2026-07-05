'use client';
import React, { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from './_anim';

export function DemoChat() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    gsap.from('.demo-text > *', {
      x: -30, autoAlpha: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: root.current, start: 'top 78%' },
    });
    gsap.from('.demo-chat', {
      x: 40, autoAlpha: 0, scale: 0.96, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: root.current, start: 'top 78%' },
    });
    // messages pop in one after another
    gsap.from('.chat-messages .msg', {
      y: 18, autoAlpha: 0, duration: 0.5, stagger: 0.28, ease: 'back.out(1.4)',
      scrollTrigger: { trigger: '.demo-chat', start: 'top 72%' },
    });
  }, { scope: root });

  return (
    <section className="demo-section" id="demo" ref={root}>
      <div className="demo-container">
        <div className="demo-text">
          <div className="section-tag">Live demo</div>
          <h2 className="section-title" style={{ fontSize: '32px' }}>See it in action</h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: '24px' }}>
            Ask questions in natural language. The agent searches your documents, reruns queries if needed, and returns accurate answers with source references.
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['Multi-step reasoning across documents', 'Cites page number and section title', 'Handles tables, lists, and mixed content'].map((t) => (
              <li key={t} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
                <div className="check"><svg viewBox="0 0 10 10"><polyline points="2,5 4,7 8,3" /></svg></div>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="demo-chat">
          <div className="chat-header">
            <div className="chat-dot" />
            <span className="chat-title">Plugin AI — Workspace: Sukkur IBA Docs</span>
          </div>
          <div className="chat-messages">
            <div className="msg msg-user">What graduate programs are available and how long do they take?</div>
            <div className="msg msg-ai">
              <strong>Based on your documents:</strong><br /><br />
              Sukkur IBA offers the following graduate programs, all 2 years in duration:<br /><br />
              • MBA — Marketing, HRM, Finance<br />
              • MS Computer Science — CS, Software Engineering<br />
              • M.Phil Education<br />
              • ME Electrical Engineering — 4 specializations<br />
              • Management Science, Mathematics<br /><br />
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>Source: Page 1 | Section: Graduate Programs</span>
            </div>
            <div className="msg msg-user">What are the admission criteria?</div>
            <div className="msg msg-ai">
              <strong>Admissions are based on:</strong> academic criteria, test results, and interview performance. The institute provides detailed information through publications and their website.<br /><br />
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>Source: Page 1 | Section: Graduate Programs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
