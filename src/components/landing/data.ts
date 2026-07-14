// ── Single source of truth for all landing-page content ──────────────────────
// Copy is the accurate PluginAI content (from the website content spec). Icons
// are Lucide components attached here so sections stay purely presentational.
import type { LucideIcon } from 'lucide-react';
import {
  Workflow, Files, ShieldCheck, Gauge, Blocks, Puzzle,
  Headset, Contact, GraduationCap, Library, Scale, Globe,
  Target, Users, Lock,
  Scissors, Binary, Search, Filter, Sparkles,
  Building2, TrendingUp,
} from 'lucide-react';

export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Features', href: '#features' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export const APP_URL = 'https://app.pluginai.space';

export const HERO = {
  badge: 'Powered by Advanced RAG + GPT-4o-mini',
  lines: ['Your Documents.', 'Your AI Assistant.', 'Zero Complexity.'],
  gradientLineIndex: 1,
  sub: 'Upload any document — PDF, Word, Excel, or plain text — and instantly deploy a grounded AI assistant that answers from your own content. No hallucinations. No setup. No code.',
  primaryCta: { label: 'Get Started Free', href: `${APP_URL}/register` },
  secondaryCta: { label: 'View Live Demo', href: '#capabilities' },
  floatCards: [
    { label: 'Avg. response', value: '1.8s' },
    { label: 'Retrieval F1', value: '≥85%' },
    { label: 'Sources cited', value: '100%' },
  ],
};

export const TRUST_INTRO = 'Trusted by teams shipping document-grounded AI across industries';
export const TRUST: { name: string; icon: LucideIcon }[] = [
  { name: 'Customer Support', icon: Headset },
  { name: 'Education', icon: GraduationCap },
  { name: 'Legal & Compliance', icon: Scale },
  { name: 'E-commerce', icon: Globe },
  { name: 'Internal Knowledge', icon: Library },
  { name: 'Consulting', icon: Contact },
  { name: 'Enterprise HR', icon: Building2 },
];

export type Service = { icon: LucideIcon; title: string; body: string; span: 'lg' | 'sm' };
export const SERVICES: Service[] = [
  { icon: Headset, span: 'lg', title: 'Customer Support Automation', body: 'Upload product manuals, FAQs, and service policies. Your assistant handles customer queries 24/7 with answers grounded strictly in your content — no hallucinations, no off-brand responses.' },
  { icon: GraduationCap, span: 'sm', title: 'Education & Course Materials', body: 'Educators upload lecture notes, syllabi, and reading lists. Students query for explanations grounded entirely in the course content.' },
  { icon: Library, span: 'sm', title: 'Internal Knowledge Base', body: 'Upload SOPs, HR policies, and internal docs. Employees get instant answers without searching through folders.' },
  { icon: Scale, span: 'sm', title: 'Legal & Compliance Research', body: 'Query contracts and regulatory documents for specific clauses, definitions, and obligations — precise and source-grounded.' },
  { icon: Contact, span: 'sm', title: 'Personal Portfolio Assistant', body: 'Freelancers embed an assistant trained on their CV and services, so visitors get instant answers about their expertise.' },
  { icon: Globe, span: 'lg', title: 'WordPress Business Sites', body: 'Small business owners activate the PluginAI plugin with a single API key. Visitors get immediate answers about products, pricing, and services — no code required.' },
];

export type Feature = { icon: LucideIcon; title: string; body: string };
export const FEATURES: Feature[] = [
  { icon: Workflow, title: 'Advanced RAG Pipeline', body: 'Two-stage retrieval: fast vector search then bge-reranker-v2-m3 cross-encoder reranking. It finds the right answer, not just similar words.' },
  { icon: Files, title: 'Multi-Format Support', body: 'PDF, Word, Excel, and plain text. Our adaptive chunker preserves tables, lists, and document hierarchy — no structure lost.' },
  { icon: ShieldCheck, title: 'Three-Layer Isolation', body: 'JWT workspace scoping, PostgreSQL Row-Level Security, and Pinecone namespaces make your documents inaccessible to any other tenant.' },
  { icon: Gauge, title: 'Sub-3-Second Responses', body: 'Async execution and Redis embedding/conversation caching cut response time from 10–12s to under 3s at the 95th percentile.' },
  { icon: Blocks, title: 'Cross-Platform SDKs', body: 'NPM (pluginai-js, pluginai-react) and PyPI (pluginai) packages embed your assistant in any stack in under 10 lines of code.' },
  { icon: Puzzle, title: 'WordPress Plugin', body: 'Enter your API key, save, and your AI chat widget is live on every page. No shortcodes. No PHP. No developer needed.' },
];

export type Value = { icon: LucideIcon; title: string; body: string };
export const WHY: Value[] = [
  { icon: Target, title: 'Accuracy first', body: 'We refuse to ship a pipeline that gives plausible-sounding wrong answers. Every retrieval decision is grounded in peer-reviewed research.' },
  { icon: Users, title: 'Accessible to all', body: 'The most sophisticated assistant is worthless if only a senior engineer can integrate it. Our SDKs and WordPress plugin lower that bar to a single API key.' },
  { icon: Lock, title: 'Security by design', body: 'Tenant isolation is enforced at three independent layers, so no single failure can expose your data to another user.' },
];
export const WHY_PROOF = [
  { value: '≥85%', label: 'Retrieval F1' },
  { value: '3-layer', label: 'Isolation' },
  { value: '<3s', label: 'Response' },
  { value: '4', label: 'Formats' },
];

export type Stage = { icon: LucideIcon; title: string; body: string };
export const CAPABILITY_STAGES: Stage[] = [
  { icon: Scissors, title: 'Adaptive Chunking', body: 'Structure-first splitting that keeps tables and lists intact.' },
  { icon: Binary, title: 'Embeddings', body: 'text-embedding-3-small vectors for every chunk.' },
  { icon: Search, title: 'Vector Search', body: 'Fast approximate retrieval from your private namespace.' },
  { icon: Filter, title: 'Cross-Encoder Rerank', body: 'bge-reranker-v2-m3 filters for the most relevant chunks.' },
  { icon: Sparkles, title: 'Grounded Answer', body: 'GPT-4o-mini responds, cited strictly to your sources.' },
];
export const DEMO = {
  workspace: 'Product Docs (Demo)',
  messages: [
    { role: 'user' as const, text: 'What is your refund policy?' },
    { role: 'ai' as const, lead: 'According to your documents:', text: 'Refunds are processed within 7 business days of an approved request. Customers can request a full refund within 30 days of purchase, provided plan usage limits have not been exceeded.', source: 'policy.pdf · Section 4.2 — Refunds' },
    { role: 'user' as const, text: 'Which file formats can I upload?' },
    { role: 'ai' as const, lead: 'Supported formats:', text: 'PDF, Word (DOCX), Excel (XLSX), and plain text (TXT). The adaptive chunker preserves tables, lists, and hierarchy across all four.', source: 'getting-started.pdf · Uploading Documents' },
  ],
};

export const TECH = ['FastAPI', 'LangChain', 'Pinecone', 'Supabase', 'Redis', 'OpenAI', 'bge-reranker-v2-m3', 'Next.js'];

export type Step = { n: string; title: string; body: string };
export const PROCESS: Step[] = [
  { n: '01', title: 'Create a workspace & upload', body: 'Register, create a workspace, and upload PDF, Word, Excel, or text files. We ingest them asynchronously and confirm the moment they are indexed and ready.' },
  { n: '02', title: 'We process, embed & index', body: 'PluginAI extracts content structure-first, chunks it adaptively, generates embeddings, and indexes them in your private Pinecone namespace — automatically.' },
  { n: '03', title: 'Generate your API key', body: 'From your workspace dashboard, generate an API key with one click. It authenticates all SDK integrations, WordPress activations, and REST calls.' },
  { n: '04', title: 'Embed on any platform', body: 'Install our NPM or PyPI package (or activate the WordPress plugin), pass your key, and your assistant is live — every answer grounded in your documents.' },
];

export type CaseStudy = { metric: string; metricLabel: string; quote: string; name: string; role: string; icon: LucideIcon };
export const CASES: CaseStudy[] = [
  { metric: '1 tier', metricLabel: 'support removed', icon: Headset, quote: 'We replaced a full support ticket tier with PluginAI. Our product manual is 200 pages and the assistant finds the right section in seconds. Customers love it.', name: 'Sarah K.', role: 'Head of Customer Success, SaaS Startup' },
  { metric: '−40%', metricLabel: 'HR ticket volume', icon: TrendingUp, quote: 'We use it as an internal policy assistant for our HR team. Employees query the handbook and get exact clause references. It cut our HR ticket volume by 40%.', name: 'David L.', role: 'HR Operations Manager, Enterprise' },
  { metric: '20 min', metricLabel: 'to go live', icon: Globe, quote: 'I embedded the widget on my consulting website in about 20 minutes. Visitors now get instant answers about my services — more qualified enquiries every week.', name: 'James O.', role: 'Independent Consultant' },
];

export type Stat = { value: number; decimals: number; prefix?: string; suffix?: string; label: string; highlight?: boolean };
export const STATS: Stat[] = [
  { value: 3, decimals: 0, prefix: '<', suffix: 's', label: 'Avg. response time' },
  { value: 85, decimals: 0, prefix: '≥', suffix: '%', label: 'Retrieval F1 accuracy', highlight: true },
  { value: 4, decimals: 0, label: 'Supported formats' },
  { value: 3, decimals: 0, label: 'Published SDKs' },
  { value: 3, decimals: 0, suffix: '×', label: 'Isolation layers' },
  { value: 10, decimals: 0, label: 'Lines to integrate' },
];

export type Testimonial = { quote: string; name: string; role: string; initials: string; color: string };
export const TESTIMONIALS: Testimonial[] = [
  { quote: 'We replaced a full support ticket tier with PluginAI. The assistant finds the right section in seconds. Customers love it.', name: 'Sarah K.', role: 'Head of Customer Success, SaaS', initials: 'SK', color: '#6D5EF9' },
  { quote: 'I embedded the widget on my consulting site in 20 minutes. Visitors get instant answers about my services now.', name: 'James O.', role: 'Management Consultant', initials: 'JO', color: '#8B5CF6' },
  { quote: 'The WordPress plugin is exactly what I needed. Typed my API key, clicked save, and my assistant was live. Zero coding.', name: 'Aisha M.', role: 'Small Business Owner', initials: 'AM', color: '#22D3EE' },
  { quote: 'Employees query the handbook and get exact clause references. It cut our HR ticket volume by 40%.', name: 'David L.', role: 'HR Operations Manager', initials: 'DL', color: '#7B6EFF' },
  { quote: 'Retrieval accuracy on our structured legal documents is genuinely impressive. Tables and numbered clauses handled correctly.', name: 'Priya R.', role: 'Legal Tech Lead, Law Firm', initials: 'PR', color: '#8C82FF' },
  { quote: 'My students query the materials I upload weekly. It stays strictly on topic and cites which section the answer came from.', name: 'Prof. Ahmed S.', role: 'University Lecturer, CS', initials: 'AS', color: '#5647E8' },
];

export type Plan = { name: string; price: string; unit: string; featured: boolean; desc: string; features: string[]; cta: string };
export const PRICING: Plan[] = [
  { name: 'Free', price: '$0', unit: '/mo', featured: false, desc: 'For individuals and small projects.', features: ['1 workspace', '10 documents', '100 queries / month', 'Community support'], cta: 'Get started free' },
  { name: 'Pro', price: '$29', unit: '/mo', featured: true, desc: 'For growing teams and businesses.', features: ['5 workspaces', '100 documents', '10,000 queries / month', 'Full REST API access', 'Priority support'], cta: 'Start Pro' },
  { name: 'Enterprise', price: 'Custom', unit: '', featured: false, desc: 'For large organizations.', features: ['Unlimited workspaces', 'Unlimited documents', 'Custom quotas', 'SSO & advanced security', 'Dedicated support'], cta: 'Contact sales' },
];

export const FAQS = [
  { q: 'Do I need to know how to code to use PluginAI?', a: 'No. Non-technical users create a workspace, upload documents, and embed the chat widget using only the dashboard and the WordPress plugin. For deeper integration, we provide JavaScript, React, and Python SDKs.' },
  { q: 'What file formats does PluginAI support?', a: 'PDF, Word (DOCX), Excel (XLSX), and plain text (TXT). Our adaptive chunking pipeline preserves tables, lists, and document hierarchy across all four formats.' },
  { q: 'Is my data shared with other users?', a: 'Never. Every workspace is isolated at three independent layers: JWT workspace scoping, PostgreSQL Row-Level Security, and Pinecone namespace isolation. Your data is inaccessible to any other tenant.' },
  { q: 'How accurate are the responses?', a: 'A two-stage pipeline — fast vector search then cross-encoder reranking with bge-reranker-v2-m3 — filters for the most relevant chunks before generation. Our design target is a retrieval F1 of 85%+ on structured business documents.' },
  { q: 'How fast is the response time?', a: 'Average end-to-end response is under 3 seconds, achieved through asynchronous pipeline execution and Redis-based caching of query embeddings and conversation history.' },
  { q: 'Can I cancel or change my plan at any time?', a: 'Yes. Plans are billed monthly and can be upgraded, downgraded, or cancelled from your dashboard at any time. Cancellations take effect at the end of the current billing period.' },
];

export const FOOTER_COLS = [
  { title: 'Product', links: [{ label: 'Features', href: '#features' }, { label: 'Pricing', href: '#pricing' }, { label: 'Capabilities', href: '#capabilities' }, { label: 'Docs', href: '/docs' }] },
  { title: 'Company', links: [{ label: 'Services', href: '#services' }, { label: 'Case Studies', href: '#cases' }, { label: 'Support', href: '/support' }, { label: 'Status', href: '/status' }] },
  { title: 'Legal', links: [{ label: 'Privacy', href: '/privacy' }, { label: 'Terms', href: '/terms' }] },
];
