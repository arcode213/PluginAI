import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/landing/Reveal';
import { Badge } from '@/components/shadcn/badge';

export const metadata: Metadata = {
  title: 'Integrations & SDKs — Plugin AI',
  description:
    'Step-by-step guides for adding your Plugin AI assistant to WordPress, Python, and React — the pluginai-chatbot plugin, the pluginai Python package, and the pluginai-react package.',
};

// ── WordPress ────────────────────────────────────────────────────────────────
const wpShortcode = `[pluginai_chat]`;

const wpShortcodeAtts = `[pluginai_chat
  title="Sales Assistant"
  subtitle="Ask us anything"
  theme="dark"
  color="#7c6df0"
  width="420"
  height="600"
  welcome="Hi! How can I help you today?"
]`;

// ── Python ───────────────────────────────────────────────────────────────────
const pyInstall = `pip install pluginai`;

const pyQuickstart = `from pluginai import PluginAI

client = PluginAI(
    api_key="your-api-key",
    workspace="your-workspace-name",
)

response = client.query("What is the refund policy?")
print(response.answer)`;

const pyMultiTurn = `# Every query from the same client shares one conversation,
# so the assistant remembers what was said before.
client.query("What products do you offer?")
client.query("Which is cheapest?")      # remembers the previous turn

client.reset_conversation()             # start a fresh conversation
client.query("Let's start over.")`;

const pyContext = `with PluginAI(api_key="...", workspace="...") as client:
    print(client.query("Hello").answer)`;

const pyAgent = `response = client.agent_query(
    "Compare the 2023 and 2024 refund policies and summarize what changed."
)`;

const pyErrors = `from pluginai import (
    PluginAI, AuthenticationError, NoDataError,
    QuotaExceededError, TimeoutError, PluginAIError,
)

try:
    response = client.query("What is the refund policy?")
    print(response.answer)
except AuthenticationError:
    print("Check your API key.")
except NoDataError:
    print("Upload documents to this workspace first.")
except QuotaExceededError:
    print("Upgrade your plan.")
except TimeoutError:
    print("Increase the timeout parameter.")
except PluginAIError as exc:
    print(f"Something went wrong: {exc}")`;

const pyFlask = `from flask import Flask, request, jsonify
from pluginai import PluginAI

app = Flask(__name__)

# Create the client ONCE at startup and reuse it — this keeps the
# connection pool warm instead of paying setup cost on every request.
client = PluginAI(api_key="your-api-key", workspace="your-workspace")

@app.post("/ask")
def ask():
    question = request.json["question"]
    return jsonify(answer=client.query(question).answer)`;

// ── React ────────────────────────────────────────────────────────────────────
const reactInstall = `npm install pluginai-react`;

const reactWidget = `import { ChatWidget } from 'pluginai-react'

export default function App() {
  return (
    <>
      <YourApp />
      <ChatWidget
        apiKey="your-api-key"
        workspace="your-workspace"
        title="Support Assistant"
        primaryColor="#7c6df0"
      />
    </>
  )
}`;

const reactHook = `import { usePluginAI } from 'pluginai-react'

function MyChat() {
  const { messages, sendMessage, isLoading } = usePluginAI({
    apiKey: 'your-api-key',
    workspace: 'your-workspace',
  })

  return (
    <div>
      {messages.map(msg => (
        <div key={msg.id} className={msg.role}>{msg.content}</div>
      ))}
      <button onClick={() => sendMessage('Hello')} disabled={isLoading}>
        Send
      </button>
    </div>
  )
}`;

const reactNext = `'use client'                       // required — the widget uses state,
                                   // effects, cookies and localStorage
import { ChatWidget } from 'pluginai-react'

export default function ChatBot() {
  return <ChatWidget apiKey="your-api-key" workspace="your-workspace" />
}`;

const reactMultiple = `<ChatWidget workspace="acme-sales"   conversationId={salesId}
            position="bottom-left"  primaryColor="#12a97a" />
<ChatWidget workspace="acme-support" conversationId={supportId}
            position="bottom-right" primaryColor="#7c6df0" />`;

const reactStyling = `#pluginai-widget-container .pluginai-bubble {
  border-radius: 6px;
}`;

const TOC: [string, string][] = [
  ['overview', 'Overview'],
  ['before-you-start', 'Before you start'],
  ['wordpress', 'WordPress plugin'],
  ['python', 'Python package'],
  ['react', 'React package'],
  ['troubleshooting', 'Troubleshooting'],
];

export default function IntegrationsPage() {
  return (
    <>
      <section className="page-hero">
        <Reveal className="page-eyebrow">Documentation</Reveal>
        <Reveal>
          <h1 className="page-title">
            Integrations &amp; <span className="grad-text">SDKs</span>
          </h1>
        </Reveal>
        <Reveal>
          <p className="page-lead">
            Three ways to put your assistant in front of people — a WordPress plugin that needs no
            code, a Python package for your backend, and a React package for your app. Pick the one
            that matches your stack and follow the steps.
          </p>
        </Reveal>
      </section>

      <div className="doc-wrap">
        <aside className="doc-side">
          <div className="doc-side-title">On this page</div>
          <nav>
            {TOC.map(([id, label]) => (
              <a key={id} href={`#${id}`}>{label}</a>
            ))}
          </nav>
        </aside>

        <div className="doc-content prose">
          {/* ── Overview ─────────────────────────────────────────────────── */}
          <Reveal id="overview">
            <h2>Overview</h2>
            <p>
              Every integration does the same thing underneath: it sends a question plus your
              workspace name to Plugin AI, and gets back an answer grounded in the documents you
              uploaded. The difference is only how much code you write.
            </p>
            <div className="table-scroll">
              <table className="doc-table">
                <thead>
                  <tr><th>Integration</th><th>Best for</th><th>Code needed</th><th>Install</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>pluginai-chatbot</strong><br />WordPress plugin</td>
                    <td>WordPress sites, business &amp; portfolio pages</td>
                    <td>None</td>
                    <td>Upload &amp; activate</td>
                  </tr>
                  <tr>
                    <td><strong>pluginai</strong><br />Python package</td>
                    <td>Backends, scripts, notebooks, Flask / Django / FastAPI</td>
                    <td>~5 lines</td>
                    <td><code>pip install pluginai</code></td>
                  </tr>
                  <tr>
                    <td><strong>pluginai-react</strong><br />React package</td>
                    <td>React &amp; Next.js apps</td>
                    <td>~5 lines</td>
                    <td><code>npm install pluginai-react</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Reveal>

          {/* ── Before you start ─────────────────────────────────────────── */}
          <Reveal id="before-you-start">
            <h2>Before you start</h2>
            <p>All three integrations need the same two values. Get them once, then jump to your section.</p>
            <ol>
              <li><strong>A workspace name</strong> — create one from <strong>Dashboard → Workspaces</strong>. This is the set of documents your assistant answers from.</li>
              <li><strong>Documents in that workspace</strong> — upload PDF, Word, Excel, or text files under <strong>File Management</strong>. Indexing starts automatically.</li>
              <li><strong>An API key</strong> — generate one under <strong>Dashboard → API Keys</strong>, scoped to that workspace.</li>
            </ol>
            <div className="callout">
              <strong>Test first:</strong> before wiring anything up, ask a couple of questions in the{' '}
              <strong>Agent Sandbox</strong> on your dashboard. If the answers look right there, every
              integration below will return the same answers.
            </div>
            <div className="callout">
              <strong>Keep API keys server-side.</strong> The WordPress plugin and the Python package
              both keep the key on the server, where it belongs. In React the key is bundled into the
              browser, so only use a key you are comfortable exposing publicly — and rotate it from
              the dashboard if it leaks.
            </div>
          </Reveal>

          {/* ── WordPress ────────────────────────────────────────────────── */}
          <Reveal id="wordpress">
            <h2>WordPress plugin — <code>pluginai-chatbot</code></h2>
            <p>
              Adds a floating chat assistant to your WordPress site, or drops one inline anywhere with
              a shortcode. No PHP, no theme edits. Requires <strong>WordPress 5.8+</strong> and{' '}
              <strong>PHP 7.4+</strong>.
            </p>

            <h3>1. Install and activate</h3>
            <ol>
              <li>In WordPress admin go to <strong>Plugins → Add New → Upload Plugin</strong> and pick the <code>pluginai-chatbot</code> ZIP. (Or copy the <code>pluginai-chatbot</code> folder into <code>/wp-content/plugins/</code>.)</li>
              <li>Click <strong>Install Now</strong>, then <strong>Activate</strong>.</li>
              <li>A new <strong>PluginAI Chatbot</strong> item appears in the left sidebar.</li>
            </ol>

            <h3>2. Connect it to your workspace</h3>
            <ol>
              <li>Open <strong>PluginAI Chatbot</strong> from the sidebar.</li>
              <li>Enter your <strong>Workspace Name</strong> and <strong>API Key</strong>.</li>
              <li>Click <strong>Test Connection</strong> — you should see a success message. If not, jump to <a href="#troubleshooting" className="link">Troubleshooting</a>.</li>
              <li>Click <strong>Save Changes</strong>.</li>
            </ol>
            <p>
              The chatbot is <strong>enabled by default</strong>, so once the connection test passes the
              floating launcher is already live on your site.
            </p>

            <h3>3. Choose how it appears</h3>
            <p>Under <strong>Display Settings</strong>, pick a display mode:</p>
            <ul>
              <li><strong>Widget</strong> — a floating launcher on every page (the default).</li>
              <li><strong>Shortcode</strong> — only where you place <code>[pluginai_chat]</code>.</li>
              <li><strong>Both</strong> — floating launcher plus inline instances.</li>
            </ul>

            <h3>4. Place an inline chat with the shortcode</h3>
            <p>Paste this into any post, page, or page-builder block:</p>
            <pre className="code"><code>{wpShortcode}</code></pre>
            <p>Every setting can be overridden per shortcode, so different pages can have different assistants:</p>
            <pre className="code"><code>{wpShortcodeAtts}</code></pre>
            <div className="table-scroll">
              <table className="doc-table">
                <thead><tr><th>Attribute</th><th>Default</th><th>What it does</th></tr></thead>
                <tbody>
                  <tr><td><code>title</code></td><td><code>AI Assistant</code></td><td>Header title.</td></tr>
                  <tr><td><code>subtitle</code></td><td><code>Powered by PluginAI</code></td><td>Header subtitle.</td></tr>
                  <tr><td><code>theme</code></td><td><code>light</code></td><td><code>light</code>, <code>dark</code>, or <code>auto</code>.</td></tr>
                  <tr><td><code>color</code></td><td><code>#7c6df0</code></td><td>Primary colour for the header, send button, and user bubbles.</td></tr>
                  <tr><td><code>width</code></td><td><code>380</code></td><td>Panel width in pixels.</td></tr>
                  <tr><td><code>height</code></td><td><code>560</code></td><td>Panel height in pixels.</td></tr>
                  <tr><td><code>welcome</code></td><td>—</td><td>First message shown when the panel opens.</td></tr>
                </tbody>
              </table>
            </div>
            <div className="callout">
              <strong>Multiple chats on one page are fine.</strong> Each shortcode renders its own
              isolated, instance-scoped container, so a floating widget and several inline chats can
              coexist without interfering with each other.
            </div>

            <h3>5. Style it to match your site</h3>
            <p>The settings page covers appearance without any CSS:</p>
            <ul>
              <li><strong>Identity</strong> — widget title, subtitle, custom avatar image, welcome message, input placeholder.</li>
              <li><strong>Appearance</strong> — theme, primary colour, optional accent colour (leave blank for a solid colour, set it for a gradient), bubble style (<code>rounded</code>, <code>soft</code>, <code>square</code>), font size (12–18px), corner radius (0–28px).</li>
              <li><strong>Layout</strong> — corner (<code>bottom-right</code> or <code>bottom-left</code>), X/Y offsets, panel width and height, launcher size, and launcher icon (<code>chat</code>, <code>sparkle</code>, <code>help</code>, or your avatar).</li>
              <li><strong>Custom CSS</strong> — a field for anything the settings do not cover.</li>
            </ul>

            <h3>How it keeps your key safe</h3>
            <p>
              Your API key is stored in the WordPress options table and is <strong>never rendered into
              a public page</strong>. Visitor messages go to your own WordPress server first, which
              proxies them to Plugin AI over an authenticated AJAX endpoint protected by nonces and
              capability checks. Conversation context is held for 24 hours in a secure client-side
              cookie, so a returning visitor picks up where they left off.
            </p>
          </Reveal>

          {/* ── Python ───────────────────────────────────────────────────── */}
          <Reveal id="python">
            <h2>Python package — <code>pluginai</code></h2>
            <p>
              A small synchronous client for querying your workspace from any Python code — scripts,
              notebooks, Flask, Django, or FastAPI. One dependency (<code>requests</code>), supports{' '}
              <strong>Python 3.8–3.12</strong>.
            </p>

            <h3>1. Install</h3>
            <pre className="code"><code>{pyInstall}</code></pre>

            <h3>2. Ask your first question</h3>
            <pre className="code"><code>{pyQuickstart}</code></pre>
            <p>
              <code>print(response)</code> works too — a <code>QueryResponse</code> stringifies to its
              answer text.
            </p>

            <h3>3. Multi-turn conversations</h3>
            <p>
              The client tracks a conversation id for you, so follow-up questions understand what came
              before:
            </p>
            <pre className="code"><code>{pyMultiTurn}</code></pre>
            <p>Use it as a context manager to close the HTTP session automatically:</p>
            <pre className="code"><code>{pyContext}</code></pre>

            <h3>4. Harder questions</h3>
            <p>
              For multi-step questions, <code>agent_query()</code> routes through the Agentic RAG
              pipeline. Same arguments, same return type as <code>query()</code>:
            </p>
            <pre className="code"><code>{pyAgent}</code></pre>

            <h3>Client options</h3>
            <div className="table-scroll">
              <table className="doc-table">
                <thead><tr><th>Parameter</th><th>Default</th><th>Description</th></tr></thead>
                <tbody>
                  <tr><td><code>api_key</code></td><td><strong>required</strong></td><td>Your workspace API key.</td></tr>
                  <tr><td><code>workspace</code></td><td><strong>required</strong></td><td>The workspace name to query.</td></tr>
                  <tr><td><code>base_url</code></td><td>hosted API</td><td>Only override if you self-host.</td></tr>
                  <tr><td><code>conversation_id</code></td><td>auto</td><td>Pass to continue an existing conversation.</td></tr>
                  <tr><td><code>timeout</code></td><td><code>30</code></td><td>Per-request timeout, in seconds.</td></tr>
                  <tr><td><code>max_retries</code></td><td><code>2</code></td><td>Retries on transient 502/503/504 only.</td></tr>
                  <tr><td><code>on_error</code></td><td><code>None</code></td><td>Called with the exception before it is raised.</td></tr>
                </tbody>
              </table>
            </div>

            <h3>What you get back</h3>
            <div className="table-scroll">
              <table className="doc-table">
                <thead><tr><th>Attribute</th><th>Type</th><th>Description</th></tr></thead>
                <tbody>
                  <tr><td><code>answer</code></td><td><code>str</code></td><td>The generated answer text.</td></tr>
                  <tr><td><code>status</code></td><td><code>str</code></td><td><code>success</code> or <code>no_data</code>.</td></tr>
                  <tr><td><code>response_time</code></td><td><code>float</code></td><td>Seconds the backend took.</td></tr>
                  <tr><td><code>conversation_id</code></td><td><code>str</code></td><td>Conversation the query belonged to.</td></tr>
                  <tr><td><code>is_success</code></td><td><code>bool</code></td><td><code>True</code> when status is <code>success</code>.</td></tr>
                  <tr><td><code>has_data</code></td><td><code>bool</code></td><td><code>False</code> when status is <code>no_data</code>.</td></tr>
                </tbody>
              </table>
            </div>

            <h3>Handling errors</h3>
            <p>
              Every error inherits from <code>PluginAIError</code>, so you can catch that one class or
              handle specific cases:
            </p>
            <pre className="code"><code>{pyErrors}</code></pre>
            <div className="table-scroll">
              <table className="doc-table">
                <thead><tr><th>Exception</th><th>Raised when</th></tr></thead>
                <tbody>
                  <tr><td><code>AuthenticationError</code></td><td>401/403 — wrong or inactive API key.</td></tr>
                  <tr><td><code>QuotaExceededError</code></td><td>403 mentioning a quota or usage limit.</td></tr>
                  <tr><td><code>WorkspaceNotFoundError</code></td><td>404 — the workspace does not exist.</td></tr>
                  <tr><td><code>NoDataError</code></td><td>Nothing relevant found in the workspace.</td></tr>
                  <tr><td><code>ConnectionError</code></td><td>Backend unreachable.</td></tr>
                  <tr><td><code>TimeoutError</code></td><td>Request exceeded <code>timeout</code>.</td></tr>
                  <tr><td><code>RateLimitError</code></td><td>429 — too many requests.</td></tr>
                  <tr><td><code>ServerError</code></td><td>5xx — backend error.</td></tr>
                </tbody>
              </table>
            </div>
            <p>Every exception carries <code>.message</code> and <code>.status_code</code>.</p>

            <h3>Example: a Flask endpoint</h3>
            <pre className="code"><code>{pyFlask}</code></pre>
            <div className="callout">
              <strong>Reuse the client.</strong> Create it once when your app starts, not per request —
              that keeps the connection pool warm and noticeably reduces latency.
            </div>
          </Reveal>

          {/* ── React ────────────────────────────────────────────────────── */}
          <Reveal id="react">
            <h2>React package — <code>pluginai-react</code></h2>
            <p>
              A drop-in chat widget and a headless hook. Zero runtime dependencies, fully typed, and
              SSR-safe for Next.js. Works with <strong>React 17 and 18</strong>.
            </p>

            <h3>1. Install</h3>
            <pre className="code"><code>{reactInstall}</code></pre>
            <p>
              <code>react</code> and <code>react-dom</code> are peer dependencies — the SDK uses
              whichever copy your app already has.
            </p>

            <h3>2a. The drop-in widget</h3>
            <p>The fastest option — a floating launcher with no UI work at all:</p>
            <pre className="code"><code>{reactWidget}</code></pre>
            <p>
              That is the whole integration. The widget remembers the conversation across page
              reloads, and needs no CSS import — styles ship inside the bundle.
            </p>

            <h3>2b. Or build your own UI with the hook</h3>
            <p>
              <code>usePluginAI</code> renders nothing and imposes no styles — every pixel is yours:
            </p>
            <pre className="code"><code>{reactHook}</code></pre>

            <h3><code>&lt;ChatWidget /&gt;</code> props</h3>
            <p><strong>Connection</strong></p>
            <div className="table-scroll">
              <table className="doc-table">
                <thead><tr><th>Prop</th><th>Default</th><th>Description</th></tr></thead>
                <tbody>
                  <tr><td><code>apiKey</code></td><td><strong>required</strong></td><td>Your workspace API key.</td></tr>
                  <tr><td><code>workspace</code></td><td><strong>required</strong></td><td>Workspace to query.</td></tr>
                  <tr><td><code>conversationId</code></td><td>auto</td><td>Continue a specific conversation.</td></tr>
                  <tr><td><code>onError</code></td><td>—</td><td>Called with the <code>Error</code> on every failed request.</td></tr>
                </tbody>
              </table>
            </div>
            <p><strong>Appearance &amp; content</strong></p>
            <div className="table-scroll">
              <table className="doc-table">
                <thead><tr><th>Prop</th><th>Default</th><th>Description</th></tr></thead>
                <tbody>
                  <tr><td><code>title</code></td><td><code>AI Assistant</code></td><td>Header title.</td></tr>
                  <tr><td><code>subtitle</code></td><td><code>Powered by PluginAI</code></td><td>Header subtitle.</td></tr>
                  <tr><td><code>welcomeMessage</code></td><td>friendly greeting</td><td>First message in the panel.</td></tr>
                  <tr><td><code>placeholder</code></td><td><code>Ask me anything...</code></td><td>Input placeholder.</td></tr>
                  <tr><td><code>position</code></td><td><code>bottom-right</code></td><td>Which corner it docks to.</td></tr>
                  <tr><td><code>primaryColor</code></td><td><code>#7c6df0</code></td><td>Launcher, header, send button, user bubbles.</td></tr>
                  <tr><td><code>avatarUrl</code></td><td>—</td><td>Image shown in the header.</td></tr>
                  <tr><td><code>showPoweredBy</code></td><td><code>true</code></td><td>Show the footer credit.</td></tr>
                  <tr><td><code>zIndex</code></td><td><code>9999</code></td><td>Stacking order of the widget root.</td></tr>
                  <tr><td><code>width</code></td><td><code>380</code></td><td>Panel width in px.</td></tr>
                  <tr><td><code>height</code></td><td><code>560</code></td><td>Panel height in px.</td></tr>
                </tbody>
              </table>
            </div>
            <p>Below 480px wide, the panel goes full-screen and <code>width</code>/<code>height</code> are ignored.</p>

            <h3>What <code>usePluginAI</code> returns</h3>
            <div className="table-scroll">
              <table className="doc-table">
                <thead><tr><th>Value</th><th>Type</th><th>Description</th></tr></thead>
                <tbody>
                  <tr><td><code>messages</code></td><td><code>Message[]</code></td><td>Full conversation, oldest first.</td></tr>
                  <tr><td><code>isLoading</code></td><td><code>boolean</code></td><td><code>true</code> while a request is in flight.</td></tr>
                  <tr><td><code>error</code></td><td><code>string | null</code></td><td>Message from the most recent failure.</td></tr>
                  <tr><td><code>conversationId</code></td><td><code>string</code></td><td>Id grouping the current conversation.</td></tr>
                  <tr><td><code>sendMessage</code></td><td><code>(msg) =&gt; Promise</code></td><td>Sends a question, appends question and answer.</td></tr>
                  <tr><td><code>resetConversation</code></td><td><code>() =&gt; void</code></td><td>New id, empty history.</td></tr>
                  <tr><td><code>clearMessages</code></td><td><code>() =&gt; void</code></td><td>Empties history, keeps the same id.</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              Each <code>Message</code> has <code>id</code>, <code>role</code> (<code>user</code> or{' '}
              <code>assistant</code>), <code>content</code>, <code>timestamp</code>, and{' '}
              <code>status</code> (<code>sending</code>, <code>success</code>, or <code>error</code>).
            </p>

            <h3>Next.js</h3>
            <p>
              The widget uses state, effects, cookies and <code>localStorage</code>, so it must be a
              client component:
            </p>
            <pre className="code"><code>{reactNext}</code></pre>

            <h3>Two widgets on one page</h3>
            <p>
              Each widget owns its state already. The one thing they share is the conversation-id
              cookie, so give each an explicit <code>conversationId</code> to keep them truly separate:
            </p>
            <pre className="code"><code>{reactMultiple}</code></pre>

            <h3>Custom styling</h3>
            <p>
              All widget CSS is prefixed <code>.pluginai-*</code> and scoped under the widget root, so
              it cannot collide with your styles. <code>primaryColor</code> covers most theming; for
              anything else, override the classes:
            </p>
            <pre className="code"><code>{reactStyling}</code></pre>

            <div className="callout">
              <strong>When a workspace has no answer</strong> the backend replies <code>200</code> with{' '}
              <code>status: &quot;no_data&quot;</code>. The hook treats that as a normal answer, not a
              failure — the wording appears in the transcript and <code>error</code> stays{' '}
              <code>null</code>. An empty result is an outcome, not a fault. Import{' '}
              <code>NoDataError</code> if you want to catch it when calling the API layer directly.
            </div>
          </Reveal>

          {/* ── Troubleshooting ──────────────────────────────────────────── */}
          <Reveal id="troubleshooting">
            <h2>Troubleshooting</h2>
            <div className="table-scroll">
              <table className="doc-table">
                <thead><tr><th>Symptom</th><th>Most likely cause</th><th>Fix</th></tr></thead>
                <tbody>
                  <tr>
                    <td>401 / 403, or &ldquo;Check your API key&rdquo;</td>
                    <td>Key is wrong, revoked, or belongs to a different workspace</td>
                    <td>Regenerate it under <strong>Dashboard → API Keys</strong> and confirm the workspace name matches exactly.</td>
                  </tr>
                  <tr>
                    <td>Answers say nothing relevant was found</td>
                    <td>Workspace has no documents, or indexing has not finished</td>
                    <td>Upload files under <strong>File Management</strong> and re-test in the <strong>Agent Sandbox</strong>.</td>
                  </tr>
                  <tr>
                    <td>404 workspace not found</td>
                    <td>Workspace name typo</td>
                    <td>Copy the name from the dashboard — it is case-sensitive.</td>
                  </tr>
                  <tr>
                    <td>429, or a quota message</td>
                    <td>Plan limit reached for the month</td>
                    <td>Check usage on the dashboard, or upgrade under <strong>Subscription</strong>.</td>
                  </tr>
                  <tr>
                    <td>Requests time out</td>
                    <td>Large documents, or a slow network</td>
                    <td>Raise <code>timeout</code> (Python). Retries already cover transient 502/503/504.</td>
                  </tr>
                  <tr>
                    <td>WordPress: connection test fails</td>
                    <td>Host is blocking outbound requests</td>
                    <td>Confirm the workspace and key, then ask your host to allow outbound HTTPS.</td>
                  </tr>
                  <tr>
                    <td>Next.js: hydration or <code>window</code> errors</td>
                    <td>Widget rendered on the server</td>
                    <td>Add <code>&apos;use client&apos;</code> at the top of the file.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="endpoint">
              <Badge variant="solid" className="rounded-md px-2 py-0.5 text-[11px] font-bold tracking-wide">REST</Badge>{' '}
              <span>
                Prefer to call the API directly? See the{' '}
                <Link href="/docs" className="link">Query API reference</Link>.
              </span>
            </div>

            <p>
              Still stuck? Visit <Link href="/support" className="link">Support</Link>, or check{' '}
              <Link href="/status" className="link">Status</Link> for live service health.
            </p>

            <div className="doc-cta">
              <a href="https://app.pluginai.space/register" className="btn-hero btn-hero-primary">Create your workspace</a>
              <Link href="/docs" className="btn-hero btn-hero-secondary">Back to docs</Link>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
