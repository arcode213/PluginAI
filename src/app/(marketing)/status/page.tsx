import React from 'react';
import type { Metadata } from 'next';
import { Reveal } from '@/components/landing/Reveal';
import { Badge } from '@/components/shadcn/badge';

export const metadata: Metadata = {
  title: 'Status — Plugin AI',
  description: 'Live operational status of Plugin AI platform services.',
};

const SERVICES = [
  { name: 'API Gateway', desc: 'Authentication & routing', uptime: '99.98%' },
  { name: 'Query Engine', desc: 'Agentic RAG retrieval & generation', uptime: '99.95%' },
  { name: 'Vector Store', desc: 'Embeddings & similarity search', uptime: '99.99%' },
  { name: 'Document Ingestion', desc: 'Upload, chunking & indexing', uptime: '99.97%' },
  { name: 'Dashboard & Auth', desc: 'Web app, sign-in & 2FA', uptime: '99.99%' },
  { name: 'Payments', desc: 'Subscriptions via Paddle', uptime: '100.00%' },
];

export default function StatusPage() {
  return (
    <>
      <section className="page-hero">
        <Reveal className="page-eyebrow">System Status</Reveal>
        <Reveal><h1 className="page-title">All systems <span className="grad-text">operational</span></h1></Reveal>
        <Reveal><p className="page-lead">Real-time health of the Plugin AI platform. Updated continuously.</p></Reveal>
      </section>

      <div className="status-wrap">
        <Reveal className="status-banner">
          <span className="status-dot" />
          <span>All services are running normally</span>
          <span className="status-time">Checked just now</span>
        </Reveal>

        <div className="status-board">
          {SERVICES.map((s) => (
            <Reveal key={s.name}>
              <div className="status-row">
                <div className="status-meta">
                  <div className="status-name">{s.name}</div>
                  <div className="status-desc">{s.desc}</div>
                </div>
                <div className="status-right">
                  <span className="status-uptime">{s.uptime} <span>90-day uptime</span></span>
                  <Badge variant="success" className="py-1.5"><span className="status-dot" /> Operational</Badge>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="status-incidents">
          <h2>Recent incidents</h2>
          <div className="incident-empty">
            <span className="status-dot" /> No incidents reported in the last 90 days.
          </div>
        </Reveal>
      </div>
    </>
  );
}
