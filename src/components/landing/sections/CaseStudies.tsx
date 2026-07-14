'use client';
import React from 'react';
import { SectionHeading } from '@/components/landing/ui/SectionHeading';
import { Reveal } from '@/components/landing/ui/Reveal';
import { GlassCard } from '@/components/landing/ui/GlassCard';
import { CASES } from '@/components/landing/data';

export function CaseStudies() {
  return (
    <section id="cases" className="relative mx-auto w-full max-w-[1240px] scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow="Case studies"
        title={<>Real teams, <span className="text-gradient-brand">measurable</span> outcomes</>}
        sub="From support automation to internal knowledge — here is the impact PluginAI delivers in production."
      />

      <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
        {CASES.map(({ icon: Icon, metric, metricLabel, quote, name, role }, i) => (
          <Reveal key={name} delay={i * 0.1}>
            <GlassCard className="flex h-full flex-col p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(140,130,255,0.2)] bg-[rgba(109,94,249,0.1)]">
                  <Icon className="text-[#8C82FF]" size={20} strokeWidth={1.8} />
                </div>
                <div>
                  <div className="font-display text-[30px] font-bold leading-none text-gradient-brand">{metric}</div>
                  <div className="font-body mt-1 text-[12px] uppercase tracking-wide text-[#7B7F98]">{metricLabel}</div>
                </div>
              </div>
              <p className="font-body mt-6 flex-1 text-[15px] leading-[1.7] text-[#B7B8D0]">“{quote}”</p>
              <div className="mt-6 border-t border-white/8 pt-4">
                <div className="font-body text-[14px] font-semibold text-white">{name}</div>
                <div className="font-body text-[12.5px] text-[#7B7F98]">{role}</div>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
