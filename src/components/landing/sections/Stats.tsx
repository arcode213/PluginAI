'use client';
import React from 'react';
import { Reveal } from '@/components/landing/ui/Reveal';
import { StatCounter } from '@/components/landing/ui/StatCounter';
import { STATS } from '@/components/landing/data';

export function Stats() {
  return (
    <section className="relative overflow-hidden border-y border-white/8 bg-white/[0.015] px-6 py-20">
      <div className="pointer-events-none absolute inset-0 -z-0 opacity-70">
        <div className="absolute left-1/4 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(109,94,249,0.22),transparent_70%)] blur-2xl" />
        <div className="absolute right-1/4 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.18),transparent_70%)] blur-2xl" />
      </div>
      <div className="relative z-10 mx-auto grid max-w-[1100px] grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={(i % 6) * 0.06} className="text-center">
            <StatCounter
              value={s.value}
              decimals={s.decimals}
              prefix={s.prefix}
              suffix={s.suffix}
              className={`font-display block text-[38px] font-bold tracking-tight ${s.highlight ? 'text-[#22D3EE]' : 'text-white'}`}
            />
            <div className="font-body mt-2 text-[12.5px] text-[#7B7F98]">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
