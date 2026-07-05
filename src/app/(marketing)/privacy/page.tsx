import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/landing/Reveal';

export const metadata: Metadata = {
  title: 'Privacy Policy — Plugin AI',
  description: 'How Plugin AI collects, uses, stores, and protects your data.',
};

export default function PrivacyPage() {
  return (
    <>
      <section className="page-hero">
        <Reveal className="page-eyebrow">Legal</Reveal>
        <Reveal><h1 className="page-title">Privacy <span className="grad-text">Policy</span></h1></Reveal>
        <Reveal><p className="page-lead">Last updated: July 5, 2026. This policy explains what we collect and how we handle your data on the Plugin AI platform.</p></Reveal>
      </section>

      <div className="legal prose">
        <Reveal>
          <h2>1. Information we collect</h2>
          <ul>
            <li><strong>Account information</strong> — name, email, phone number, company name, and a securely hashed password.</li>
            <li><strong>Documents you upload</strong> — files added to your workspaces, and the text chunks and vector embeddings we derive from them.</li>
            <li><strong>Usage data</strong> — queries, token consumption, API calls, conversation history, and workspace activity.</li>
            <li><strong>Billing data</strong> — subscription plan and transaction references. Card details are handled by our payment processor, not stored by us.</li>
          </ul>
        </Reveal>

        <Reveal>
          <h2>2. How we use your information</h2>
          <p>We use your data to operate the service: to index documents, run retrieval and generate grounded answers, enforce plan limits, process payments, secure accounts, and provide support. We do not sell your personal data, and we do not use your uploaded documents to train third-party foundation models.</p>
        </Reveal>

        <Reveal>
          <h2>3. Storage and security</h2>
          <p>Data is stored using managed database and object-storage providers with encryption in transit (HTTPS/TLS). Access is protected by JWT-based authentication, two-factor sign-in, per-workspace API keys, and row-level access controls. Each tenant&apos;s workspace data is logically isolated.</p>
        </Reveal>

        <Reveal>
          <h2>4. Third-party services</h2>
          <p>We rely on trusted sub-processors, including cloud database/storage and vector-search providers, an email provider for verification and reports, and <strong>Paddle</strong> as our merchant of record for subscription payments. Each processes only the data needed for its function.</p>
        </Reveal>

        <Reveal>
          <h2>5. Data retention</h2>
          <p>We retain your account and workspace data for as long as your account is active. Deleting a document removes it and its derived embeddings. Deleting your account permanently removes associated workspaces, files, and keys, subject to legal retention requirements for billing records.</p>
        </Reveal>

        <Reveal>
          <h2>6. Your rights</h2>
          <p>You can access and update your profile, export or delete documents, revoke API keys, and permanently delete your account from the dashboard at any time. To exercise any additional rights, contact us.</p>
        </Reveal>

        <Reveal>
          <h2>7. Contact</h2>
          <p>Questions about this policy? Reach us via the <Link href="/support" className="link">Support</Link> page. This document may be updated periodically; material changes will be announced in-app.</p>
        </Reveal>
      </div>
    </>
  );
}
