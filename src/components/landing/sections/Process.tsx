'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionHeading } from '@/components/landing/ui/SectionHeading';
import { Reveal } from '@/components/landing/ui/Reveal';
import { PROCESS } from '@/components/landing/data';

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 55%'] });
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="process" className="relative mx-auto w-full max-w-[1240px] scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow="Process"
        title={<>From document to deployed<br className="hidden md:block" /> assistant in four steps</>}
        sub="No infrastructure to manage, no models to train, no vector databases to configure. We handle all of it."
      />

      <div ref={ref} className="relative mx-auto mt-16 max-w-[820px]">
        <div className="absolute bottom-2 left-[27px] top-2 w-px bg-white/10" />
        <motion.div style={{ height }} className="absolute left-[27px] top-2 w-px origin-top bg-gradient-to-b from-[#8C82FF] to-[#5647E8]" />
        {PROCESS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.06}>
            <div className="relative flex gap-6 pb-11 last:pb-0">
              <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[rgba(140,130,255,0.28)] bg-[#0D0D14] shadow-[0_0_24px_rgba(109,94,249,0.2)]">
                <span className="font-display text-[20px] font-bold text-gradient-brand">{s.n}</span>
              </div>
              <div className="pt-1.5">
                <h3 className="font-display text-[19px] font-semibold text-white">{s.title}</h3>
                <p className="font-body mt-2 max-w-[560px] text-[14.5px] leading-[1.7] text-[#B7B8D0]">{s.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
