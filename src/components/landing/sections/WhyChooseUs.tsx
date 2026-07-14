'use client';
import React from 'react';
import { Sparkles } from 'lucide-react';
import { SectionHeading } from '@/components/landing/ui/SectionHeading';
import { Reveal } from '@/components/landing/ui/Reveal';
import { WHY, WHY_PROOF } from '@/components/landing/data';

const POS = ['left-1/2 top-[3%] -translate-x-1/2', 'right-[1%] top-1/2 -translate-y-1/2', 'left-1/2 bottom-[3%] -translate-x-1/2', 'left-[1%] top-1/2 -translate-y-1/2'];

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-white/[0.015] px-6 py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-[1240px] items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading align="left" eyebrow="Why choose us" title={<>Built on principles,<br /> not just prompts</>} />
          <div className="mt-10 flex flex-col gap-3">
            {WHY.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <div className="group flex gap-4 rounded-2xl border border-transparent p-4 transition-colors hover:border-white/8 hover:bg-white/[0.02]">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[rgba(140,130,255,0.2)] bg-[rgba(109,94,249,0.1)] transition-transform group-hover:scale-105">
                    <Icon className="text-[#8C82FF]" size={20} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="font-display text-[17px] font-semibold text-white">{title}</h3>
                    <p className="font-body mt-1.5 text-[14px] leading-[1.65] text-[#B7B8D0]">{body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Orbiting proof */}
        <Reveal delay={0.1} className="hidden lg:block">
          <div className="relative mx-auto aspect-square w-full max-w-[440px]">
            <div className="absolute inset-[6%] animate-spin-slow rounded-full border border-dashed border-white/10" />
            <div className="absolute inset-[24%] animate-spin-slow-rev rounded-full border border-white/8" />
            <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(109,94,249,0.45),transparent_70%)]" />
            <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#8C82FF,#5647E8)] shadow-[0_0_44px_rgba(109,94,249,0.6)]">
              <Sparkles className="text-white" size={26} />
            </div>
            {WHY_PROOF.map((p, i) => (
              <div key={p.label} className={`absolute ${POS[i]} animate-floaty`} style={{ animationDelay: `${i * 0.5}s` }}>
                <div className="card-glass rounded-2xl px-4 py-2.5 text-center">
                  <div className="font-display text-[18px] font-bold text-white">{p.value}</div>
                  <div className="font-body text-[11px] text-[#7B7F98]">{p.label}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
