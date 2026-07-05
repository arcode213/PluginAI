import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/landing/Reveal';

export const metadata: Metadata = {
  title: 'Terms of Service — Plugin AI',
  description: 'The terms governing your use of the Plugin AI platform.',
};

export default function TermsPage() {
  return (
    <>
      <section className="page-hero">
        <Reveal className="page-eyebrow">Legal</Reveal>
        <Reveal><h1 className="page-title">Terms of <span className="grad-text">Service</span></h1></Reveal>
        <Reveal><p className="page-lead">Last updated: July 5, 2026. By creating an account or using Plugin AI, you agree to these terms.</p></Reveal>
      </section>

      <div className="legal prose">
        <Reveal>
          <h2>1. Accounts</h2>
          <p>You must provide accurate information, verify your email, and keep your credentials secure. You are responsible for all activity under your account and API keys. You must be legally able to enter this agreement.</p>
        </Reveal>

        <Reveal>
          <h2>2. Acceptable use</h2>
          <p>You may not upload content you have no right to use, attempt to breach tenant isolation, reverse-engineer the service, abuse rate limits, or use the platform for unlawful, harmful, or infringing purposes. You retain ownership of documents you upload; you grant us the limited rights needed to index and serve them back to you.</p>
        </Reveal>

        <Reveal>
          <h2>3. Subscriptions and billing</h2>
          <p>Plugin AI offers Free, Pro, and Enterprise plans. Paid subscriptions are billed through <strong>Paddle</strong> on a recurring basis until cancelled. Plan limits (workspaces, documents, queries, tokens, API access) apply per your active plan. Upgrades take effect immediately; cancellations take effect at the end of the current billing period.</p>
        </Reveal>

        <Reveal>
          <h2>4. API usage</h2>
          <p>API keys are scoped to a workspace and count against your plan quotas. We may throttle or suspend keys that exceed limits or threaten platform stability. Keep your keys secret; you are responsible for requests made with them.</p>
        </Reveal>

        <Reveal>
          <h2>5. Service availability</h2>
          <p>We strive for high availability but do not guarantee uninterrupted service except where a specific SLA is agreed in an Enterprise plan. We may modify or discontinue features with reasonable notice. Live status is published on the <Link href="/status" className="link">Status</Link> page.</p>
        </Reveal>

        <Reveal>
          <h2>6. Termination</h2>
          <p>You may cancel or delete your account at any time. We may suspend or terminate accounts that violate these terms. Upon termination, your access ends and associated data is removed per our <Link href="/privacy" className="link">Privacy Policy</Link>.</p>
        </Reveal>

        <Reveal>
          <h2>7. Disclaimer & liability</h2>
          <p>The service is provided &quot;as is.&quot; AI-generated answers may contain errors and should be verified for critical decisions. To the extent permitted by law, Plugin AI is not liable for indirect or consequential damages arising from use of the platform.</p>
        </Reveal>

        <Reveal>
          <h2>8. Contact</h2>
          <p>Questions about these terms? Reach us through the <Link href="/support" className="link">Support</Link> page.</p>
        </Reveal>
      </div>
    </>
  );
}
