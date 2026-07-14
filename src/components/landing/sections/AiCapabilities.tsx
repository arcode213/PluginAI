'use client';
import React from 'react';
import { FileText } from 'lucide-react';
import { SectionHeading } from '@/components/landing/ui/SectionHeading';
import { Reveal } from '@/components/landing/ui/Reveal';
import { CAPABILITY_STAGES, DEMO } from '@/components/landing/data';

export function AiCapabilities() {
  return (
    <section id="capabilities" className="relative mx-auto w-full max-w-[1240px] scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow="AI capabilities"
        title={<>See how PluginAI turns documents<br className="hidden md:block" /> into <span className="text-gradient-brand">grounded answers</span></>}
        sub="A two-stage retrieval pipeline — structure-aware chunking, embeddings, vector search, and cross-encoder reranking — before a single word is generated."
      />

      {/* Pipeline */}
      <div className="relative mt-16">
        <div className="absolute inset-x-8 top-7 hidden h-px bg-gradient-to-r from-transparent via-[rgba(140,130,255,0.45)] to-transparent md:block" />
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-5 md:gap-4">
          {CAPABILITY_STAGES.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.09} className="flex flex-col items-center text-center">
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(140,130,255,0.28)] bg-[#0D0D14] shadow-[0_0_24px_rgba(109,94,249,0.25)]">
                <Icon className="text-[#8C82FF]" size={22} strokeWidth={1.7} />
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[linear-gradient(135deg,#8C82FF,#5647E8)] font-body text-[10px] font-bold text-white">{i + 1}</span>
              </div>
              <div className="font-display mt-4 text-[14px] font-semibold text-white">{title}</div>
              <p className="font-body mt-1.5 max-w-[170px] text-[12.5px] leading-[1.5] text-[#7B7F98]">{body}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Live demo */}
      <Reveal delay={0.1} className="mt-16">
        <div className="card-glass mx-auto max-w-[720px] overflow-hidden rounded-[24px] p-5 md:p-7">
          <div className="mb-5 flex items-center gap-2.5 border-b border-white/8 pb-4">
            <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E] shadow-[0_0_10px_#22C55E]" />
            <span className="font-body text-[13px] font-medium text-[#B7B8D0]">PluginAI · Workspace: {DEMO.workspace}</span>
            <span className="font-body ml-auto rounded-full border border-[rgba(140,130,255,0.25)] bg-[rgba(109,94,249,0.08)] px-3 py-1 text-[11px] text-[#B7B8D0]">Live demo</span>
          </div>
          <div className="flex flex-col gap-3.5">
            {DEMO.messages.map((m, i) => (
              <Reveal key={i} delay={i * 0.12} y={16} blur={false}>
                {m.role === 'user' ? (
                  <div className="max-w-[80%] self-end justify-self-end rounded-2xl rounded-br-md border border-[rgba(109,94,249,0.28)] bg-[rgba(109,94,249,0.16)] px-4 py-2.5 font-body text-[13.5px] text-white/90">
                    {m.text}
                  </div>
                ) : (
                  <div className="max-w-[85%] self-start rounded-2xl rounded-bl-md border border-white/8 bg-white/[0.04] px-4 py-3 font-body text-[13.5px] leading-[1.6] text-[#B7B8D0]">
                    {m.lead && <span className="font-semibold text-white">{m.lead} </span>}{m.text}
                    {m.source && (
                      <span className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[#7B7F98]">
                        <FileText size={12} className="text-[#8C82FF]" /> {m.source}
                      </span>
                    )}
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
