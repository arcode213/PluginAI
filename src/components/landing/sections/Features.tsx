'use client';
import React from 'react';
import { SectionHeading } from '@/components/landing/ui/SectionHeading';
import { Reveal } from '@/components/landing/ui/Reveal';
import { GlassCard } from '@/components/landing/ui/GlassCard';
import { FEATURES } from '@/components/landing/data';

export function Features() {
  return (
    <section id="features" className="relative mx-auto w-full max-w-[1240px] scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow="Features"
        title={<>Everything you need to deploy a <span className="text-gradient-brand">smarter</span> assistant</>}
        sub="PluginAI combines enterprise-grade retrieval accuracy with zero-code integration — so your AI assistant actually knows what it is talking about."
      />

      <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, body }, i) => (
          <Reveal key={title} delay={(i % 3) * 0.08}>
            <GlassCard className="group h-full p-7">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(140,130,255,0.2)] bg-[rgba(109,94,249,0.1)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-3 group-hover:scale-105">
                <Icon className="text-[#8C82FF] transition-colors group-hover:text-white" size={22} strokeWidth={1.7} />
              </div>
              <h3 className="font-display text-[18px] font-semibold text-white">{title}</h3>
              <p className="font-body mt-3 text-[14px] leading-[1.7] text-[#B7B8D0]">{body}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
