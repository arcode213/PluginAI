'use client';
import React from 'react';
import { SectionHeading } from '@/components/landing/ui/SectionHeading';
import { Reveal } from '@/components/landing/ui/Reveal';
import { GlassCard } from '@/components/landing/ui/GlassCard';
import { SERVICES } from '@/components/landing/data';

export function Services() {
  return (
    <section id="services" className="relative mx-auto w-full max-w-[1240px] scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow="Services"
        title={<>Built for every user, from solo<br className="hidden md:block" /> creators to enterprise teams</>}
        sub="Whether you are a freelancer, an educator, or a growing business — PluginAI turns your documents into an intelligent, always-on assistant."
      />

      <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map(({ icon: Icon, title, body }, i) => {
          const big = i === 0;
          return (
            <Reveal key={title} delay={(i % 3) * 0.08} className={big ? 'sm:col-span-2 lg:row-span-2' : ''}>
              <GlassCard className={`group flex h-full flex-col ${big ? 'p-8' : 'p-7'}`}>
                <div className={`mb-5 flex items-center justify-center rounded-2xl border border-[rgba(140,130,255,0.2)] bg-[rgba(109,94,249,0.1)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105 ${big ? 'h-14 w-14' : 'h-12 w-12'}`}>
                  <Icon className="text-[#8C82FF]" size={big ? 26 : 22} strokeWidth={1.7} />
                </div>
                <h3 className={`font-display font-semibold text-white ${big ? 'text-[24px]' : 'text-[18px]'}`}>{title}</h3>
                <p className={`font-body mt-3 leading-[1.7] text-[#B7B8D0] ${big ? 'text-[15.5px] max-w-[440px]' : 'text-[14px]'}`}>{body}</p>
                {big && <div className="divider-glow mt-auto pt-6" />}
              </GlassCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
