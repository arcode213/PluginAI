const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
  LevelFormat, VerticalAlign, PageBreak
} = require('docx');
const fs = require('fs');

const bL = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const bAll = { top: bL, bottom: bL, left: bL, right: bL };
const bNone = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const bNoneAll = { top: bNone, bottom: bNone, left: bNone, right: bNone };

function pb() { return new Paragraph({ children: [new PageBreak()] }); }
function blank(h=80) { return new Paragraph({ children:[new TextRun("")], spacing:{before:h,after:h} }); }

function pageTitle(text) {
  return new Paragraph({ spacing:{before:0,after:80}, border:{bottom:{style:BorderStyle.SINGLE,size:6,color:"2E75B6",space:4}},
    children:[new TextRun({text,bold:true,size:40,color:"1F4E79",font:"Arial"})] });
}
function sTag(text) {
  return new Paragraph({ spacing:{before:280,after:60},
    children:[new TextRun({text:`[ ${text} ]`,size:18,color:"2E75B6",font:"Arial",bold:true})] });
}
function sHead(text) {
  return new Paragraph({ spacing:{before:60,after:100},
    children:[new TextRun({text,bold:true,size:30,color:"1A1A2E",font:"Arial"})] });
}
function sSub(text) {
  return new Paragraph({ alignment:AlignmentType.JUSTIFIED, spacing:{before:0,after:140},
    children:[new TextRun({text,size:21,color:"555555",font:"Arial"})] });
}
function para(text,color="222222") {
  return new Paragraph({ alignment:AlignmentType.JUSTIFIED, spacing:{before:80,after:80,line:340},
    children:[new TextRun({text,size:21,font:"Arial",color})] });
}
function bul(text) {
  return new Paragraph({ numbering:{reference:"bullets",level:0}, spacing:{before:60,after:60},
    children:[new TextRun({text,size:21,font:"Arial"})] });
}

function cardGrid(cards, cols=3) {
  const totalW=9360, cw=Math.floor(totalW/cols), rows=[];
  for(let i=0;i<cards.length;i+=cols){
    const sl=cards.slice(i,i+cols);
    while(sl.length<cols) sl.push(null);
    rows.push(new TableRow({children:sl.map(c=>{
      if(!c) return new TableCell({borders:bNoneAll,width:{size:cw,type:WidthType.DXA},children:[new Paragraph({children:[]})]});
      const ac=c.color||"1F4E79";
      return new TableCell({
        borders:{top:bNone,bottom:bNone,left:{style:BorderStyle.SINGLE,size:8,color:ac},right:bNone},
        width:{size:cw-20,type:WidthType.DXA}, shading:{fill:"F8F9FD",type:ShadingType.CLEAR},
        margins:{top:120,bottom:120,left:160,right:100},
        children:[
          new Paragraph({spacing:{before:0,after:60},children:[new TextRun({text:c.title,bold:true,size:21,font:"Arial",color:ac})]}),
          new Paragraph({alignment:AlignmentType.JUSTIFIED,spacing:{before:0,after:0},children:[new TextRun({text:c.body,size:19,font:"Arial",color:"444444"})]}),
        ]
      });
    })}));
    rows.push(new TableRow({children:sl.map(()=>new TableCell({borders:bNoneAll,width:{size:cw,type:WidthType.DXA},margins:{top:60,bottom:60,left:0,right:0},children:[new Paragraph({children:[]})]}))}) );
  }
  return new Table({width:{size:totalW,type:WidthType.DXA},columnWidths:Array(cols).fill(cw),rows,borders:bNoneAll});
}

function statGrid(stats) {
  const cw=3120, rows=[];
  for(let i=0;i<stats.length;i+=3){
    const sl=stats.slice(i,i+3);
    rows.push(new TableRow({children:sl.map(s=>new TableCell({
      borders:bAll, width:{size:cw,type:WidthType.DXA}, shading:{fill:"EBF3FB",type:ShadingType.CLEAR},
      margins:{top:120,bottom:120,left:160,right:160},
      children:[
        new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:s.num,bold:true,size:48,font:"Arial",color:"1F4E79"})]}),
        new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:40},children:[new TextRun({text:s.label,size:19,font:"Arial",color:"555555"})]}),
      ]
    }))}));
  }
  return new Table({width:{size:9360,type:WidthType.DXA},columnWidths:[cw,cw,cw],rows});
}

function stepRow(num,title,desc) {
  return new Table({width:{size:9360,type:WidthType.DXA},columnWidths:[640,8720],
    rows:[new TableRow({children:[
      new TableCell({borders:bNoneAll,width:{size:640,type:WidthType.DXA},shading:{fill:"1F4E79",type:ShadingType.CLEAR},margins:{top:100,bottom:100,left:80,right:80},
        children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:num,bold:true,size:28,font:"Arial",color:"FFFFFF"})]})] }),
      new TableCell({borders:{top:bNone,bottom:bNone,left:bL,right:bNone},width:{size:8720,type:WidthType.DXA},margins:{top:100,bottom:100,left:160,right:80},
        children:[
          new Paragraph({children:[new TextRun({text:title,bold:true,size:22,font:"Arial",color:"1F4E79"})]}),
          new Paragraph({alignment:AlignmentType.JUSTIFIED,children:[new TextRun({text:desc,size:20,font:"Arial",color:"444444"})]}),
        ]})
    ]})]
  });
}

function qaRow(q,a,ri) {
  const bg=ri%2===0?"F8F9FD":"FFFFFF";
  return new Table({width:{size:9360,type:WidthType.DXA},columnWidths:[9360],
    rows:[new TableRow({children:[new TableCell({
      borders:{top:bL,bottom:bL,left:{style:BorderStyle.SINGLE,size:6,color:"2E75B6"},right:bNone},
      width:{size:9360,type:WidthType.DXA},shading:{fill:bg,type:ShadingType.CLEAR},
      margins:{top:120,bottom:120,left:160,right:120},
      children:[
        new Paragraph({spacing:{before:0,after:60},children:[new TextRun({text:`Q: ${q}`,bold:true,size:21,font:"Arial",color:"1F4E79"})]}),
        new Paragraph({alignment:AlignmentType.JUSTIFIED,children:[new TextRun({text:`A: ${a}`,size:20,font:"Arial",color:"333333"})]}),
      ]
    })]})]
  });
}

function testGrid(reviews) {
  const cw=4640, rows=[];
  for(let i=0;i<reviews.length;i+=2){
    const pair=reviews.slice(i,i+2);
    rows.push(new TableRow({children:pair.map(r=>new TableCell({
      borders:bAll, width:{size:cw,type:WidthType.DXA}, shading:{fill:"FAFCFF",type:ShadingType.CLEAR},
      margins:{top:140,bottom:140,left:160,right:140},
      children:[
        new Paragraph({spacing:{before:0,after:60},children:[new TextRun({text:`"${r.quote}"`,size:20,font:"Arial",color:"222222",italics:true})]}),
        new Paragraph({spacing:{before:60,after:20},children:[new TextRun({text:r.name,bold:true,size:19,font:"Arial",color:"1F4E79"})]}),
        new Paragraph({children:[new TextRun({text:r.role,size:18,font:"Arial",color:"777777"})]}),
      ]
    }))}));
    rows.push(new TableRow({children:[
      new TableCell({borders:bNoneAll,width:{size:cw,type:WidthType.DXA},margins:{top:50,bottom:50},children:[new Paragraph({children:[]})]}),
      new TableCell({borders:bNoneAll,width:{size:cw,type:WidthType.DXA},margins:{top:50,bottom:50},children:[new Paragraph({children:[]})]}),
    ]}));
  }
  return new Table({width:{size:9360,type:WidthType.DXA},columnWidths:[cw,80,cw],rows,borders:bNoneAll});
}

function codeBlock(lines) {
  return new Table({width:{size:9360,type:WidthType.DXA},columnWidths:[9360],
    rows:[new TableRow({children:[new TableCell({
      borders:bAll, width:{size:9360,type:WidthType.DXA}, shading:{fill:"1E1E2E",type:ShadingType.CLEAR},
      margins:{top:120,bottom:120,left:200,right:200},
      children:lines.map(l=>new Paragraph({spacing:{before:20,after:20},children:[new TextRun({text:l,size:18,font:"Courier New",color:"CDD6F4"})]}))
    })]})],
  });
}

function docTab(num,title,color) {
  return new Paragraph({spacing:{before:280,after:60},border:{left:{style:BorderStyle.SINGLE,size:12,color,space:8}},
    children:[
      new TextRun({text:`  Tab ${num} — `,size:20,font:"Arial",color:"888888"}),
      new TextRun({text:title,bold:true,size:22,font:"Arial",color}),
    ]});
}

// ── DATA ──────────────────────────────────────────────────────────────────

const STATS=[
  {num:"<3s",label:"Avg. response time"},
  {num:"≥85%",label:"Retrieval F1 accuracy"},
  {num:"4",label:"Supported file formats"},
  {num:"3",label:"Published SDK packages"},
  {num:"3×",label:"Tenant isolation layers"},
  {num:"10",label:"Lines of code to integrate"},
];

const FEATURES=[
  {title:"Advanced RAG Pipeline",body:"Two-stage retrieval: fast vector search followed by bge-reranker-v2-m3 cross-encoder reranking. Your assistant finds the right answer, not just the most similar words.",color:"1F4E79"},
  {title:"Multi-Format Document Support",body:"PDF, Word (DOCX), Excel (XLSX), and plain text. Our adaptive chunker preserves tables, lists, and document hierarchy — no structural information lost.",color:"2E75B6"},
  {title:"Three-Layer Tenant Isolation",body:"JWT workspace scoping, PostgreSQL Row-Level Security, and Pinecone namespace isolation ensure your documents are physically inaccessible to any other user.",color:"1F6B3A"},
  {title:"Sub-3-Second Response Time",body:"Async pipeline execution and Redis-based embedding and conversation caching cut response time from 10–12 seconds to under 3 seconds at the 95th percentile.",color:"C07000"},
  {title:"Cross-Platform SDKs",body:"NPM packages (pluginai-js, pluginai-react) and a PyPI client (pluginai) let you embed your AI assistant in any stack — JavaScript, React, or Python — in under 10 lines of code.",color:"6A1B9A"},
  {title:"WordPress Plugin",body:"Enter your API key, save settings, and your AI chat widget is live on every page of your WordPress site. No shortcodes. No PHP. No developer needed.",color:"B71C1C"},
];

const USECASES=[
  {title:"Customer Support Automation",body:"Upload product manuals, FAQs, and service policies. Your AI assistant handles customer queries 24/7 with answers grounded strictly in your content — no hallucinations, no off-brand responses.",color:"1F4E79"},
  {title:"Personal Portfolio Assistant",body:"Freelancers and consultants upload their CV, portfolio, and service descriptions. Embed the assistant on your personal site so visitors get instant answers about your expertise.",color:"2E75B6"},
  {title:"Education and Course Materials",body:"Educators upload lecture notes, syllabi, and reading lists. Students query the assistant for explanations and references grounded entirely in the course content.",color:"1F6B3A"},
  {title:"Internal Knowledge Base",body:"Upload SOPs, HR policies, and internal documentation. Employees get instant answers from your knowledge base without searching through folders or waiting for a colleague.",color:"C07000"},
  {title:"Legal and Compliance Research",body:"Upload contracts and regulatory documents. Your team queries specific clauses, definitions, and obligations with precise, source-grounded answers.",color:"6A1B9A"},
  {title:"WordPress Business Sites",body:"Small business owners activate the PluginAI plugin with a single API key. Visitors get immediate answers about products, pricing, and services — no code required.",color:"B71C1C"},
];

const STEPS=[
  {num:"1",title:"Create a Workspace & Upload Your Documents",desc:"Register, create a workspace, and upload your files in PDF, Word, Excel, or plain text format. Our system ingests them asynchronously — you get a status confirmation the moment they are indexed and ready."},
  {num:"2",title:"We Process, Chunk, Embed & Index",desc:"PluginAI extracts content structure-first, splits it into precision-sized chunks using our adaptive chunker, generates embedding vectors, and indexes them in your private Pinecone namespace — all automatically, in the background."},
  {num:"3",title:"Generate Your API Key",desc:"From your workspace dashboard, generate an API key with a single click. This key authenticates all SDK integrations, WordPress plugin activations, and direct REST API calls for your workspace."},
  {num:"4",title:"Embed on Any Platform",desc:"Install our NPM or PyPI package (or activate the WordPress plugin), pass your API key, and your AI assistant is live. Users can start asking questions immediately — all answers are grounded in your documents."},
];

const REVIEWS=[
  {quote:"We replaced a full support ticket tier with PluginAI. Our product manual is 200 pages and the assistant finds the right section in seconds. Customers love it.",name:"Sarah K.",role:"Head of Customer Success, SaaS Startup"},
  {quote:"I embedded the widget on my consulting website in about 20 minutes. Visitors now get instant answers about my services — I receive more qualified enquiries every week.",name:"James O.",role:"Independent Management Consultant"},
  {quote:"The WordPress plugin is exactly what I needed. I typed my API key, clicked save, and my assistant was live. Zero coding. I couldn't believe it was that simple.",name:"Aisha M.",role:"Small Business Owner, E-commerce"},
  {quote:"We use it as an internal policy assistant for our HR team. Employees query the handbook and get exact clause references. It has cut our HR ticket volume by 40%.",name:"David L.",role:"HR Operations Manager, Mid-size Enterprise"},
  {quote:"The retrieval accuracy on our structured legal documents is genuinely impressive. Tables and numbered clauses are handled correctly — something we couldn't get from other tools.",name:"Priya R.",role:"Legal Tech Lead, Law Firm"},
  {quote:"My students use it to query the course materials I upload each week. It stays strictly on topic and cites which section the answer came from. A genuine teaching tool.",name:"Prof. Ahmed S.",role:"University Lecturer, Computer Science"},
];

const QA=[
  {q:"Do I need to know how to code to use PluginAI?",a:"No. Non-technical users create a workspace, upload documents, and embed the chat widget using only the dashboard and the WordPress plugin — no programming required. For deeper integration, we provide JavaScript, React, and Python SDKs."},
  {q:"What file formats does PluginAI support?",a:"PluginAI supports PDF, Word (DOCX), Excel (XLSX), and plain text (TXT) files. Our adaptive chunking pipeline preserves tables, lists, and document hierarchy across all four formats."},
  {q:"Is my data shared with other users?",a:"Never. Every workspace is isolated at three independent layers: application-level JWT workspace scoping, PostgreSQL Row-Level Security, and Pinecone namespace isolation. Your documents and conversations are physically inaccessible to any other tenant."},
  {q:"How accurate are the responses?",a:"PluginAI uses a two-stage retrieval pipeline: fast approximate vector search followed by cross-encoder reranking with bge-reranker-v2-m3, filtering for the most relevant chunks before generation. Our design target is a retrieval F1 score of 85% or higher on structured business documents."},
  {q:"How fast is the response time?",a:"Average end-to-end response time is under 3 seconds, achieved through asynchronous pipeline execution and Redis-based caching of query embeddings and conversation history."},
  {q:"Can I cancel or change my plan at any time?",a:"Yes. Plans are billed monthly and can be upgraded, downgraded, or cancelled from your workspace dashboard at any time. Cancellations take effect at the end of the current billing period."},
];

const TABS=[
  {num:"01",color:"1F4E79",title:"Quick Start — Your First Assistant in 5 Minutes",blocks:[
    {h:"Prerequisites",items:["A PluginAI account (free tier available at pluginai.space)","A supported document: PDF, DOCX, XLSX, or TXT","For SDK integration: Node.js 18+ or Python 3.8+"]},
    {h:"Step 1 — Create a Workspace",body:"Log in to your PluginAI dashboard at app.pluginai.space. Click New Workspace, enter a name, and confirm. Each workspace is an isolated environment — documents, conversations, and API keys are scoped to the workspace and are never shared with other users."},
    {h:"Step 2 — Upload a Document",body:"Inside your workspace, click Upload Document and select your file. PluginAI begins processing immediately: the file is extracted, adaptively chunked, embedded, and indexed in your private vector namespace. Processing typically completes within 30 seconds for a 10-page PDF. The document status updates to Ready when indexing is complete."},
    {h:"Step 3 — Test Your Assistant",body:"Click Ask a Question in the workspace sidebar. Type any question that should be answerable from your document. The assistant returns a grounded answer in under 3 seconds."},
    {h:"Step 4 — Generate an API Key",body:"Go to API Keys in your workspace settings. Click Generate Key, add a label (e.g. 'my-website'), and copy the key immediately — it is shown only once. This key authenticates all SDK integrations and direct API calls for this workspace."},
  ]},
  {num:"02",color:"2E75B6",title:"JavaScript SDK (pluginai-js)",blocks:[
    {h:"Installation",code:["npm install pluginai-js"]},
    {h:"Headless Client — Ask a Question",code:[
      "import { PluginAIClient } from 'pluginai-js';",
      "",
      "const client = new PluginAIClient({",
      "  apiKey: 'your-api-key-here',",
      "});",
      "",
      "const response = await client.query({",
      "  question: 'What are the refund terms?',",
      "  sessionId: 'user-session-123',  // optional — enables conversation history",
      "});",
      "",
      "console.log(response.answer);   // grounded answer from your document",
      "console.log(response.sources);  // source chunk metadata",
    ]},
    {h:"Embeddable Chat Widget — HTML Embed",code:[
      "<script",
      "  src='https://cdn.pluginai.space/widget.js'",
      "  data-api-key='your-api-key-here'",
      "  data-position='bottom-right'",
      "  data-theme='light'",
      "  data-title='AI Assistant'",
      "  data-placeholder='Ask me anything...'",
      "  defer",
      "></script>",
    ]},
    {h:"Widget Configuration Options",items:[
      "data-api-key (required) — your workspace API key",
      "data-position — bottom-right (default) | bottom-left",
      "data-theme — light (default) | dark",
      "data-title — widget header title",
      "data-placeholder — input placeholder text",
      "data-primary-color — hex colour for widget header and send button",
    ]},
    {h:"Error Handling",code:[
      "try {",
      "  const response = await client.query({ question: 'Your question' });",
      "} catch (err) {",
      "  if (err.status === 401) console.error('Invalid API key');",
      "  if (err.status === 429) console.error('Quota exceeded — upgrade your plan');",
      "  if (err.status === 503) console.error('Service temporarily unavailable — retry');",
      "}",
    ]},
  ]},
  {num:"03",color:"1F6B3A",title:"React SDK (pluginai-react)",blocks:[
    {h:"Installation",code:["npm install pluginai-react"]},
    {h:"usePluginAI Hook",code:[
      "import { usePluginAI } from 'pluginai-react';",
      "",
      "function MyComponent() {",
      "  const { query, answer, loading, error } = usePluginAI({",
      "    apiKey: process.env.NEXT_PUBLIC_PLUGINAI_KEY,",
      "  });",
      "",
      "  return (",
      "    <div>",
      "      <button onClick={() => query('What is the cancellation policy?')} disabled={loading}>",
      "        Ask",
      "      </button>",
      "      {loading && <p>Thinking...</p>}",
      "      {answer && <p>{answer}</p>}",
      "      {error && <p style={{color:'red'}}>{error.message}</p>}",
      "    </div>",
      "  );",
      "}",
    ]},
    {h:"Drop-in ChatWidget Component",code:[
      "import { ChatWidget } from 'pluginai-react';",
      "",
      "export default function App() {",
      "  return (",
      "    <ChatWidget",
      "      apiKey={process.env.NEXT_PUBLIC_PLUGINAI_KEY}",
      "      position='bottom-right'",
      "      theme='light'",
      "      title='Support Assistant'",
      "      placeholder='Ask me anything about our products...'",
      "    />",
      "  );",
      "}",
    ]},
    {h:"Environment Variables (.env.local for Next.js)",code:[
      "NEXT_PUBLIC_PLUGINAI_KEY=your-api-key-here",
    ]},
    {h:"Common Errors",items:[
      "401 Unauthorized — API key is invalid or has been revoked. Regenerate from your workspace dashboard.",
      "403 Forbidden — Workspace is suspended. Contact support@pluginai.space.",
      "429 Too Many Requests — Query limit reached for the current billing period. Upgrade your plan.",
      "500 Internal Server Error — Temporary service issue. Retry with exponential backoff.",
    ]},
  ]},
  {num:"04",color:"6A1B9A",title:"Python SDK (pluginai)",blocks:[
    {h:"Installation",code:["pip install pluginai"]},
    {h:"Basic Query",code:[
      "from pluginai import PluginAIClient",
      "",
      "client = PluginAIClient(api_key='your-api-key-here')",
      "",
      "response = client.query(",
      "    question='What are the key deliverables in Section 3?',",
      "    session_id='optional-session-id',",
      ")",
      "",
      "print(response.answer)",
      "print(response.sources)   # list of source chunk metadata dicts",
    ]},
    {h:"Async Support",code:[
      "import asyncio",
      "from pluginai import AsyncPluginAIClient",
      "",
      "async def main():",
      "    client = AsyncPluginAIClient(api_key='your-api-key-here')",
      "    response = await client.query(question='Summarise the methodology')",
      "    print(response.answer)",
      "",
      "asyncio.run(main())",
    ]},
    {h:"Upload a Document",code:[
      "with open('report.pdf', 'rb') as f:",
      "    doc = client.upload_document(file=f, filename='report.pdf')",
      "",
      "print(doc.doc_id, doc.status)  # 'processing' -> 'ready' after indexing",
    ]},
    {h:"Error Handling",code:[
      "from pluginai.exceptions import AuthenticationError, QuotaExceededError",
      "",
      "try:",
      "    response = client.query(question='Your question')",
      "except AuthenticationError:",
      "    print('Invalid API key')",
      "except QuotaExceededError:",
      "    print('Query limit reached — upgrade your subscription')",
    ]},
  ]},
  {num:"05",color:"B71C1C",title:"WordPress Plugin",blocks:[
    {h:"Requirements",items:["WordPress 5.8 or higher","PHP 7.4 or higher","An active PluginAI workspace and API key"]},
    {h:"Installation",body:"Option A — WordPress Plugin Directory: Plugins → Add New → search 'PluginAI' → Install Now → Activate.\n\nOption B — Manual upload: download the ZIP from pluginai.space/wordpress-plugin → Plugins → Add New → Upload Plugin → select ZIP → Install Now → Activate."},
    {h:"Configuration",body:"After activation, go to Settings → PluginAI in your WordPress admin."},
    {h:"Settings Fields",items:[
      "API Key (required) — paste your workspace API key from the PluginAI dashboard",
      "Widget Position — Bottom Right (default) | Bottom Left",
      "Widget Theme — Light | Dark",
      "Widget Title — heading shown in the chat bubble",
      "Placeholder Text — hint text in the input field",
      "Primary Colour — hex colour for the widget header",
      "Exclude Pages — comma-separated page slugs where the widget should not appear",
    ]},
    {h:"That Is It",body:"Save settings. The AI chat widget appears immediately on all pages. No shortcode, no PHP, no template edits required."},
    {h:"Optional Shortcode (inline embed)",code:["[pluginai_widget title='Product Assistant' theme='light']"]},
    {h:"Troubleshooting",items:[
      "Widget not appearing — confirm the plugin is activated and API key is saved. Check browser console for JavaScript errors.",
      "401 error in console — API key is invalid or revoked. Regenerate from the PluginAI dashboard.",
      "Widget appears but gives no answers — workspace may have no Ready documents. Check the dashboard document status.",
      "Widget conflicts with page layout — use the Exclude Pages setting, or use the shortcode for inline placement.",
    ]},
  ]},
  {num:"06",color:"C07000",title:"REST API Reference",blocks:[
    {h:"Base URL",code:["https://api.pluginai.space/v1"]},
    {h:"Authentication",body:"All API requests must include a valid API key in the Authorization header:"},
    {h:"Auth Header",code:["Authorization: Bearer your-api-key-here"]},
    {h:"POST /query",code:[
      "POST /v1/query",
      "Content-Type: application/json",
      "Authorization: Bearer your-api-key-here",
      "",
      "{",
      '  "question": "What is the refund policy?",',
      '  "session_id": "optional-session-uuid"',
      "}",
      "",
      "// 200 Response",
      "{",
      '  "answer": "According to Section 4.2, refunds are processed within 7 business days...",',
      '  "sources": [{"file_name":"policy.pdf","chunk_type":"paragraph","heading":"Section 4.2"}],',
      '  "latency_ms": 1840,',
      '  "session_id": "optional-session-uuid"',
      "}",
    ]},
    {h:"POST /documents/upload",code:[
      "POST /v1/documents/upload",
      "Content-Type: multipart/form-data",
      "Authorization: Bearer your-api-key-here",
      "",
      "// Form fields: file (binary), file_description (optional string)",
      "",
      "// 200 Response",
      "{",
      '  "doc_id": "doc_abc123",',
      '  "file_name": "product-faq.pdf",',
      '  "status": "processing"',
      "}",
    ]},
    {h:"GET /documents/{doc_id}",code:[
      "GET /v1/documents/doc_abc123",
      "Authorization: Bearer your-api-key-here",
      "",
      "// 200 Response",
      "{",
      '  "doc_id": "doc_abc123",',
      '  "file_name": "product-faq.pdf",',
      '  "status": "ready",',
      '  "uploaded_at": "2025-07-01T09:30:00Z"',
      "}",
    ]},
    {h:"DELETE /documents/{doc_id}",code:[
      "DELETE /v1/documents/doc_abc123",
      "Authorization: Bearer your-api-key-here",
      "",
      "// 204 No Content",
    ]},
    {h:"HTTP Status Codes",items:[
      "200 OK — Request succeeded",
      "204 No Content — Deletion succeeded",
      "400 Bad Request — Missing or invalid parameters",
      "401 Unauthorized — Invalid or missing API key",
      "403 Forbidden — Workspace suspended or access denied",
      "413 Payload Too Large — File exceeds plan upload size limit",
      "422 Unprocessable Entity — Unsupported file format",
      "429 Too Many Requests — Document or query quota exceeded",
      "500 Internal Server Error — Temporary issue; retry with backoff",
    ]},
    {h:"Rate Limit Response Headers",code:[
      "X-RateLimit-Limit: 1000",
      "X-RateLimit-Remaining: 847",
      "X-RateLimit-Reset: 1720000000",
    ]},
  ]},
];

// ── BUILD ──────────────────────────────────────────────────────────────────
const ch=[];

// HOME
ch.push(pageTitle("HOME PAGE"));
ch.push(blank(40));

ch.push(sTag("HERO SECTION"));
ch.push(new Paragraph({spacing:{before:40,after:10},children:[new TextRun({text:"Badge (pre-heading line):",bold:true,size:19,font:"Arial",color:"1F4E79"})]}));
ch.push(para("Powered by Advanced RAG + GPT-4o-mini","2E75B6"));
ch.push(new Paragraph({spacing:{before:60,after:10},children:[new TextRun({text:"Main heading (3 lines):",bold:true,size:19,font:"Arial",color:"1F4E79"})]}));
ch.push(new Paragraph({spacing:{before:0,after:0},children:[new TextRun({text:"Your Documents.",bold:true,size:36,font:"Arial",color:"1A1A2E"})]}));
ch.push(new Paragraph({spacing:{before:0,after:0},children:[new TextRun({text:"Your AI Assistant.",bold:true,size:36,font:"Arial",color:"2E75B6"})]}));
ch.push(new Paragraph({spacing:{before:0,after:60},children:[new TextRun({text:"Zero Complexity.",bold:true,size:36,font:"Arial",color:"1F4E79"})]}));
ch.push(new Paragraph({spacing:{before:40,after:10},children:[new TextRun({text:"Sub-heading:",bold:true,size:19,font:"Arial",color:"1F4E79"})]}));
ch.push(para("Upload any document — PDF, Word, Excel, or plain text — and instantly deploy a grounded AI assistant that answers questions from your own content. No hallucinations. No setup. No code required."));
ch.push(new Paragraph({spacing:{before:60,after:10},children:[new TextRun({text:"Buttons:",bold:true,size:19,font:"Arial",color:"1F4E79"})]}));
ch.push(para("[Button 1 — Primary]   Get Started Free          [Button 2 — Secondary]   View Live Demo","444444"));
ch.push(blank(60));

ch.push(sTag("6 FEATURE COUNT BOXES"));
ch.push(statGrid(STATS));
ch.push(blank(60));

ch.push(sTag("FEATURES SECTION"));
ch.push(sHead("Everything you need to deploy a smarter AI assistant"));
ch.push(sSub("PluginAI combines enterprise-grade retrieval accuracy with zero-code integration — so your AI assistant actually knows what it is talking about."));
ch.push(cardGrid(FEATURES));
ch.push(blank(60));

ch.push(sTag("USE CASES SECTION"));
ch.push(sHead("Built for every user, from solo creators to enterprise teams"));
ch.push(sSub("Whether you are a freelancer, an educator, or a growing business — PluginAI turns your documents into an intelligent, always-on assistant."));
ch.push(cardGrid(USECASES));
ch.push(blank(60));

ch.push(sTag("HOW IT WORKS SECTION"));
ch.push(sHead("From document to deployed assistant in four steps"));
ch.push(sSub("No infrastructure to manage, no models to train, no vector databases to configure. We handle all of it."));
STEPS.forEach(s=>{ch.push(stepRow(s.num,s.title,s.desc));ch.push(blank(40));});
ch.push(blank(40));

ch.push(sTag("LIVE DEMO SECTION"));
ch.push(sHead("See PluginAI answer questions in real time"));
ch.push(sSub("Try our live demo assistant — built on a sample product documentation set — and experience the difference that structure-aware retrieval and cross-encoder reranking make."));
["Ask any question and receive a precise, source-grounded answer in under 3 seconds",
 "Upload your own document to the demo workspace and instantly query it",
 "Compare responses on structured content (tables, numbered lists) with any other chatbot"].forEach(p=>ch.push(bul(p)));
ch.push(blank(60));

ch.push(sTag("TESTIMONIALS SECTION"));
ch.push(sHead("Trusted by businesses and creators across industries"));
ch.push(sSub("Here is what real users say about deploying PluginAI on their platforms."));
ch.push(testGrid(REVIEWS));
ch.push(blank(60));

ch.push(sTag("PRICING SECTION"));
ch.push(sHead("Simple, transparent pricing for every stage"));
ch.push(sSub("Start free, scale as you grow. Every plan includes the same Advanced RAG pipeline and enterprise security — the difference is in your document and query limits."));
ch.push(para("[Pricing plan cards — to be designed separately as visual UI components]","888888"));
ch.push(blank(60));

ch.push(sTag("Q&A SECTION — 6 QUESTIONS"));
QA.forEach((item,i)=>{ch.push(qaRow(item.q,item.a,i));ch.push(blank(30));});
ch.push(blank(40));

ch.push(sTag("FOOTER"));
ch.push(sHead("Start building your AI assistant today"));
ch.push(sSub("Join hundreds of businesses and creators who use PluginAI to turn their documents into intelligent, always-on assistants."));
ch.push(para("[Button 1 — Primary]   Get Started Free          [Button 2 — Ghost]   Read the Docs","444444"));

// ABOUT
ch.push(pb());
ch.push(pageTitle("ABOUT US PAGE"));
ch.push(blank(40));

ch.push(sTag("HERO — Opening Statement"));
ch.push(sHead("We built the AI assistant platform we wished existed"));
ch.push(sSub("PluginAI was born out of a final year computer science project at Sukkur IBA University, Mirpurkhas Campus — and a frustration that every existing 'chat with your documents' tool was either too inaccurate, too locked-down, or too hard to integrate for the people who actually needed it most."));

ch.push(sTag("OUR MISSION"));
ch.push(new Paragraph({spacing:{before:0,after:60},children:[new TextRun({text:"Our Mission",bold:true,size:22,font:"Arial",color:"1F4E79"})]}));
ch.push(para("To make high-accuracy, domain-specific AI assistants accessible to every business and individual — regardless of their technical background — by combining production-grade retrieval engineering with the simplest possible integration experience."));

ch.push(sTag("OUR STORY"));
ch.push(new Paragraph({spacing:{before:0,after:60},children:[new TextRun({text:"The Story",bold:true,size:22,font:"Arial",color:"1F4E79"})]}));
ch.push(para("In 2024, while researching AI assistant platforms for our Final Year Project, we found a consistent pattern: the platforms with good retrieval required significant engineering effort to deploy, and the platforms that were easy to use had poor accuracy on structured business documents. Tables were split across chunks. Lists lost their context. Responses drifted off-topic."));
ch.push(para("We decided the right response was to build the platform that closed this gap — one that handled structure-aware document processing, cross-encoder reranking, and multi-tenant security under the hood, while exposing a single API key and a one-line embed to the developer. PluginAI is that platform."));

ch.push(sTag("HOW WE BUILT IT"));
ch.push(new Paragraph({spacing:{before:0,after:60},children:[new TextRun({text:"The Technology",bold:true,size:22,font:"Arial",color:"1F4E79"})]}));
ch.push(para("PluginAI is built on FastAPI, LangChain, Pinecone, Supabase, and Redis — a stack chosen for reliability, managed scalability, and cost efficiency. The retrieval pipeline uses OpenAI text-embedding-3-small for embeddings and bge-reranker-v2-m3 for cross-encoder reranking. Three-layer tenant isolation (JWT + PostgreSQL RLS + Pinecone namespaces) ensures GDPR Article 25 compliance by design."));

ch.push(sTag("MEET THE TEAM — 3 cards"));
ch.push(cardGrid([
  {title:"Shamsuddin — Backend & AI Lead",body:"Designed and built the authentication system, embedding pipeline, Redis caching architecture, Python SDK, and admin panel.",color:"1F4E79"},
  {title:"Usama Ali — RAG & Frontend Lead",body:"Implemented the document ingestion pipeline, adaptive chunking system, RAG retrieval engine, React/Next.js dashboard, and JavaScript/React SDKs.",color:"2E75B6"},
  {title:"Abdul Rehman — Platform & DevOps Lead",body:"Built the subscription and billing system, workspace isolation model, WordPress plugin, and deployment infrastructure on Railway and Vercel.",color:"1F6B3A"},
],3));
ch.push(para("Supervised by Dr. Faisal Bin Ubaid, Department of Computer Science, Sukkur IBA University, Mirpurkhas Campus.","666666"));

ch.push(sTag("OUR VALUES — 3 cards"));
ch.push(cardGrid([
  {title:"Accuracy first",body:"We refuse to ship a retrieval pipeline that gives plausible-sounding wrong answers. Every design decision in our RAG stack is grounded in peer-reviewed retrieval research.",color:"1F4E79"},
  {title:"Accessible to all",body:"The most technically sophisticated AI assistant is worthless if only a senior engineer can integrate it. Our SDKs and WordPress plugin lower that bar to a single API key.",color:"1F6B3A"},
  {title:"Security by design",body:"Tenant isolation is enforced at three independent architectural layers so that no single failure can expose your data to another user.",color:"C07000"},
],3));

// CONTACT
ch.push(pb());
ch.push(pageTitle("CONTACT US PAGE"));
ch.push(blank(40));

ch.push(sTag("INTRO"));
ch.push(sSub("We would love to hear from you — whether you have a question about the platform, need help integrating your first assistant, or want to explore a partnership."));

ch.push(sTag("CONTACT CHANNELS — 4 cards (2 per row)"));
ch.push(cardGrid([
  {title:"General Enquiries — hello@pluginai.space",body:"For product questions, feedback, and general information. We aim to respond within one business day.",color:"1F4E79"},
  {title:"Technical Support — support@pluginai.space",body:"For integration help, SDK issues, and API troubleshooting. Include your workspace ID in your message for faster resolution.",color:"2E75B6"},
  {title:"Billing & Accounts — billing@pluginai.space",body:"For subscription changes, payment queries, invoice requests, and account management.",color:"1F6B3A"},
  {title:"Partnership & Enterprise — enterprise@pluginai.space",body:"For custom plans, white-label enquiries, volume pricing, and enterprise integration support.",color:"C07000"},
],2));

ch.push(sTag("CONTACT FORM — field labels"));
["Full name","Email address","Company or website (optional)",
 "Subject — General enquiry | Technical support | Billing | Partnership",
 "Message (minimum 20 characters)"].forEach(f=>ch.push(bul(f)));
ch.push(blank(40));
ch.push(para("[Send Message button — primary CTA]","888888"));

ch.push(sTag("SOCIAL & COMMUNITY"));
ch.push(para("You can also find us on GitHub (github.com/pluginai), Twitter/X (@pluginai_space), and LinkedIn (linkedin.com/company/pluginai)."));

// DOCS
ch.push(pb());
ch.push(pageTitle("DOCUMENTATION PAGE — Developer Guide"));
ch.push(blank(40));
ch.push(sSub("Six-tab developer guide. Each tab provides complete integration instructions, code examples, and troubleshooting for a specific platform or integration method."));
ch.push(blank(40));

TABS.forEach((tab,ti)=>{
  ch.push(docTab(tab.num,tab.title,tab.color));
  tab.blocks.forEach(block=>{
    if(block.h){
      ch.push(new Paragraph({spacing:{before:160,after:60},children:[new TextRun({text:block.h,bold:true,size:21,font:"Arial",color:tab.color})]}));
    }
    if(block.body){
      block.body.split('\n\n').forEach(p=>ch.push(para(p)));
    }
    if(block.items){
      block.items.forEach(it=>ch.push(bul(it)));
    }
    if(block.code){
      ch.push(codeBlock(block.code));
    }
    ch.push(blank(20));
  });
  if(ti<TABS.length-1) ch.push(blank(80));
});

const doc=new Document({
  numbering:{config:[{reference:"bullets",levels:[{level:0,format:LevelFormat.BULLET,text:"\u2022",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:720,hanging:360}}}}]}]},
  styles:{default:{document:{run:{font:"Arial",size:21}}}},
  sections:[{properties:{page:{size:{width:12240,height:15840},margin:{top:1080,right:1080,bottom:1080,left:1080}}},children:ch}]
});

Packer.toBuffer(doc).then(buf=>{
  fs.writeFileSync('/home/claude/PluginAI_WebsiteContent.docx',buf);
  console.log('Done — '+(buf.length/1024).toFixed(0)+' KB');
});
