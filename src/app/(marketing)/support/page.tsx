import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/landing/Reveal';
import { Card } from '@/components/shadcn/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/shadcn/accordion';

export const metadata: Metadata = {
  title: 'Support — Plugin AI',
  description: 'Get help with Plugin AI — FAQs, documentation, and contact options.',
};

const FAQ = [
  { q: 'Which file formats can I upload?', a: 'PDF, Word (.docx), Excel (.xlsx), and plain text. Files are chunked automatically while preserving tables, lists, and section structure.' },
  { q: 'How do query limits work?', a: 'Each plan includes a monthly query allowance enforced per workspace — 100 on Free, 10,000 on Pro, and custom on Enterprise. Usage is shown live on your dashboard.' },
  { q: 'How do I get an API key?', a: 'Open a workspace, go to API Keys, and generate one. Keys are scoped to that workspace and used to authenticate Query API calls.' },
  { q: 'Why does the assistant say it has no context?', a: 'That means nothing relevant was found in the workspace vector store for your question. Upload more source documents or rephrase the query.' },
  { q: 'How is billing handled?', a: 'Subscriptions are processed securely through Paddle. You can upgrade, cancel, or renew from the Subscriptions page; changes to limits apply immediately on upgrade.' },
  { q: 'Is my data isolated from other tenants?', a: 'Yes. Every workspace is logically isolated with its own documents, keys, and access controls, protected by row-level security.' },
];

export default function SupportPage() {
  return (
    <>
      <section className="page-hero">
        <Reveal className="page-eyebrow">Support</Reveal>
        <Reveal><h1 className="page-title">How can we <span className="grad-text">help?</span></h1></Reveal>
        <Reveal><p className="page-lead">Browse common questions, read the docs, or reach out directly — we&apos;re here to get you unblocked.</p></Reveal>
      </section>

      <div className="support-wrap">
        <Reveal className="support-cards">
          <a href="mailto:support@pluginai.app" className="block no-underline">
            <Card className="h-full p-6 hover:-translate-y-1 hover:border-[rgba(124,109,240,0.45)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)]">
              <div className="mb-3 text-[26px]">✉️</div>
              <h3 className="mb-2 text-base font-semibold text-white">Email us</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">support@pluginai.app — we typically reply within one business day.</p>
            </Card>
          </a>
          <Link href="/docs" className="block no-underline">
            <Card className="h-full p-6 hover:-translate-y-1 hover:border-[rgba(124,109,240,0.45)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)]">
              <div className="mb-3 text-[26px]">📘</div>
              <h3 className="mb-2 text-base font-semibold text-white">Read the docs</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">Quickstart, core concepts, and the Query API reference.</p>
            </Card>
          </Link>
          <Link href="/status" className="block no-underline">
            <Card className="h-full p-6 hover:-translate-y-1 hover:border-[rgba(124,109,240,0.45)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)]">
              <div className="mb-3 text-[26px]">📈</div>
              <h3 className="mb-2 text-base font-semibold text-white">Service status</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">Check live platform health and any ongoing incidents.</p>
            </Card>
          </Link>
        </Reveal>

        <Reveal>
          <h2 className="support-h2">Frequently asked questions</h2>
        </Reveal>
        <Reveal>
          <Accordion type="single" collapsible className="mx-auto flex max-w-[720px] flex-col gap-2.5">
            {FAQ.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <Reveal className="support-foot">
          <p>Still need a hand? <a href="mailto:support@pluginai.app" className="link">Email support</a> and include your workspace name and a description of the issue.</p>
        </Reveal>
      </div>
    </>
  );
}
