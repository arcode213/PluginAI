'use client';
import React from 'react';
import { Marquee } from '@/components/landing/ui/Marquee';
import { Reveal } from '@/components/landing/ui/Reveal';
import { TRUST, TRUST_INTRO } from '@/components/landing/data';

export function TrustedBy() {
  return (
    <section className="relative px-6 py-16">
      <Reveal>
        <p className="font-body mb-9 text-center text-[13px] uppercase tracking-[0.18em] text-[#7B7F98]">
          {TRUST_INTRO}
        </p>
      </Reveal>
      <div className="mx-auto max-w-[1240px]">
        <Marquee>
          {TRUST.map(({ name, icon: Icon }) => (
            <span
              key={name}
              className="font-body inline-flex shrink-0 items-center gap-2.5 rounded-full border border-white/8 bg-white/[0.03] px-5 py-3 text-[15px] font-medium text-[#B7B8D0] backdrop-blur-sm transition-colors hover:border-[rgba(140,130,255,0.4)] hover:text-white"
            >
              <Icon size={17} className="text-[#8C82FF]" />
              {name}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
