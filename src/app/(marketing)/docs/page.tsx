import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/landing/Reveal';
import { Badge } from '@/components/shadcn/badge';

export const metadata: Metadata = {
  title: 'Documentation — Plugin AI',
  description: 'Quickstart, core concepts, and the Query API for building document-grounded AI assistants with Plugin AI.',
};

const curl = `curl -X POST "https://api.pluginai.app/v1/web/query/portal_query" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "What are the admission requirements?",
    "workspace_name": "my-workspace",
    "unique_id": "session-abc123"
  }'`;

const js = `const res = await fetch(
  "https://api.pluginai.app/v1/web/query/portal_query",
  {
    method: "POST",
    headers: {
      "Authorization": \`Bearer \${API_KEY}\`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: "Summarize the refund policy",
      workspace_name: "my-workspace",
      unique_id: crypto.randomUUID(),
    }),
  }
);
const data = await res.json();
console.log(data.answer);`;

const TOC = [
  ['introduction', 'Introduction'],
  ['quickstart', 'Quickstart'],
  ['concepts', 'Core concepts'],
  ['query-api', 'Query API'],
  ['limits', 'Rate limits & usage'],
  ['help', 'Getting help'],
];

export default function DocsPage() {
  return (
    <>
      <section className="page-hero">
        <Reveal className="page-eyebrow">Documentation</Reveal>
        <Reveal><h1 className="page-title">Build with <span className="grad-text">Plugin AI</span></h1></Reveal>
        <Reveal><p className="page-lead">Everything you need to turn your documents into an intelligent, API-accessible assistant — from your first upload to production integration.</p></Reveal>
      </section>

      <div className="doc-wrap">
        <aside className="doc-side">
          <div className="doc-side-title">On this page</div>
          <nav>
            {TOC.map(([id, label]) => (<a key={id} href={`#${id}`}>{label}</a>))}
          </nav>
        </aside>

        <div className="doc-content prose">
          <Reveal id="introduction">
            <h2>Introduction</h2>
            <p>Plugin AI is a multi-tenant Retrieval-Augmented Generation (RAG) platform. You upload documents into a <strong>workspace</strong>; we chunk, embed, and index them into a vector store. Your assistant then answers natural-language questions grounded in that content — with source citations — over the dashboard sandbox or the REST API.</p>
          </Reveal>

          <Reveal id="quickstart">
            <h2>Quickstart</h2>
            <ol>
              <li><strong>Create an account</strong> and verify your email, then complete two-factor sign-in.</li>
              <li><strong>Create a workspace</strong> from the dashboard — it isolates your data, keys, and usage limits.</li>
              <li><strong>Upload documents</strong> (PDF, Word, Excel, or text). Indexing starts automatically.</li>
              <li><strong>Test in the Agent Sandbox</strong> to confirm answers look right.</li>
              <li><strong>Generate an API key</strong> for that workspace and call the Query API from your app.</li>
            </ol>
            <div className="callout">
              <strong>Tip:</strong> Start on the Free plan (1 workspace, 10 documents, 100 queries/month) — no credit card required.
            </div>
          </Reveal>

          <Reveal id="concepts">
            <h2>Core concepts</h2>
            <div className="concept-grid">
              <div className="concept"><h4>Workspaces</h4><p>Isolated tenants. Each has its own documents, API keys, subscription limits, and conversation history.</p></div>
              <div className="concept"><h4>Documents</h4><p>Uploaded files are chunked and embedded. Chunking preserves tables, lists, and section structure.</p></div>
              <div className="concept"><h4>API keys</h4><p>Scoped per workspace. Use them to authenticate Query API calls from your own applications.</p></div>
              <div className="concept"><h4>Usage & quotas</h4><p>Documents, queries, API calls, and tokens are metered against your plan and shown live on the dashboard.</p></div>
            </div>
          </Reveal>

          <Reveal id="query-api">
            <h2>Query API</h2>
            <p>Send a question to a workspace and receive a grounded answer. Authenticate with a workspace API key.</p>
            <div className="endpoint"><Badge variant="solid" className="rounded-md px-2 py-0.5 text-[11px] font-bold tracking-wide">POST</Badge> <code>/v1/web/query/portal_query</code></div>
            <h4>Request body</h4>
            <ul>
              <li><code>query</code> — the user&apos;s natural-language question.</li>
              <li><code>workspace_name</code> — the workspace to search.</li>
              <li><code>unique_id</code> — a stable session id to group a conversation.</li>
            </ul>
            <h4>cURL</h4>
            <pre className="code"><code>{curl}</code></pre>
            <h4>JavaScript</h4>
            <pre className="code"><code>{js}</code></pre>
            <h4>Response</h4>
            <p>Returns the grounded <code>answer</code>, a <code>status</code> (e.g. <code>no_data</code> when nothing relevant is found), and <code>response_time_seconds</code>.</p>
          </Reveal>

          <Reveal id="limits">
            <h2>Rate limits & usage</h2>
            <p>Limits are defined by your subscription plan and enforced per workspace:</p>
            <div className="table-scroll">
              <table className="doc-table">
                <thead><tr><th>Plan</th><th>Workspaces</th><th>Documents</th><th>Queries / mo</th><th>API access</th></tr></thead>
                <tbody>
                  <tr><td>Free</td><td>1</td><td>10</td><td>100</td><td>—</td></tr>
                  <tr><td>Pro</td><td>5</td><td>100</td><td>10,000</td><td>Yes</td></tr>
                  <tr><td>Enterprise</td><td>Unlimited</td><td>Unlimited</td><td>Custom</td><td>Yes</td></tr>
                </tbody>
              </table>
            </div>
            <p>Track consumption in real time under <strong>Dashboard → Overview</strong> and per workspace under <strong>Usage</strong>.</p>
          </Reveal>

          <Reveal id="help">
            <h2>Getting help</h2>
            <p>Stuck on something? Visit <Link href="/support" className="link">Support</Link> for FAQs and contact options, or check the <Link href="/status" className="link">Status</Link> page for live service health.</p>
            <div className="doc-cta">
              <Link href="/register" className="btn-hero btn-hero-primary">Create your workspace</Link>
              <Link href="/support" className="btn-hero btn-hero-secondary">Contact support</Link>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
