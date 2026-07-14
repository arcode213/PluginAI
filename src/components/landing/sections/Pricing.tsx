'use client';
import React from 'react';
import { Check } from 'lucide-react';
import { SectionHeading } from '@/components/landing/ui/SectionHeading';
import { Reveal } from '@/components/landing/ui/Reveal';
import { CTA } from '@/components/landing/ui/CTA';
import { PRICING, APP_URL } from '@/components/landing/data';

export function Pricing() {
  return (
    <section id="pricing" className="relative mx-auto w-full max-w-[1240px] scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow="Pricing"
        title={<>Simple, transparent pricing<br className="hidden md:block" /> for every stage</>}
        sub="Start free, scale as you grow. Every plan includes the same Advanced RAG pipeline and enterprise security — the difference is in your limits."
      />

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 md:items-center">
        {PRICING.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.1}>
            <div className={`card-glass relative flex h-full flex-col p-8 ${p.featured ? 'md:scale-[1.04]' : ''}`} style={p.featured ? { boxShadow: '0 20px 80px rgba(109,94,249,0.28)' } : undefined}>
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[linear-gradient(120deg,#8C82FF,#5647E8)] px-4 py-1 font-body text-[11.5px] font-semibold text-white">Most popular</span>
              )}
              <div className="font-body text-[13px] font-semibold uppercase tracking-[0.12em] text-[#B7B8D0]">{p.name}</div>
              <div className="mt-4 flex items-end gap-1">
                <span className="font-display text-[46px] font-bold leading-none text-white">{p.price}</span>
                {p.unit && <span className="font-body pb-1 text-[15px] text-[#7B7F98]">{p.unit}</span>}
              </div>
              <p className="font-body mt-3 border-b border-white/8 pb-6 text-[13.5px] text-[#7B7F98]">{p.desc}</p>
              <ul className="my-6 flex flex-1 flex-col gap-3.5">
                {p.features.map((f) => (
                  <li key={f} className="font-body flex items-center gap-3 text-[14px] text-[#B7B8D0]">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(109,94,249,0.18)]">
                      <Check size={12} className="text-[#8C82FF]" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <CTA href={`${APP_URL}/register`} variant={p.featured ? 'primary' : 'glass'} className="w-full">{p.cta}</CTA>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
