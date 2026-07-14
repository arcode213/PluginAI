'use client';
import React from 'react';
import { Star } from 'lucide-react';
import { SectionHeading } from '@/components/landing/ui/SectionHeading';
import { Marquee } from '@/components/landing/ui/Marquee';
import { TESTIMONIALS, type Testimonial } from '@/components/landing/data';

function Card({ t }: { t: Testimonial }) {
  return (
    <div className="card-glass mx-0 w-[360px] shrink-0 rounded-[20px] p-6">
      <div className="mb-4 flex gap-0.5 text-[#8C82FF]">
        {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
      </div>
      <p className="font-body text-[14.5px] leading-[1.7] text-[#B7B8D0]">“{t.quote}”</p>
      <div className="mt-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full font-body text-[13px] font-bold" style={{ background: `${t.color}22`, color: t.color }}>{t.initials}</div>
        <div>
          <div className="font-body text-[13.5px] font-semibold text-white">{t.name}</div>
          <div className="font-body text-[12px] text-[#7B7F98]">{t.role}</div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const row1 = TESTIMONIALS.slice(0, 3);
  const row2 = TESTIMONIALS.slice(3);
  return (
    <section id="testimonials" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title={<>Trusted by businesses and<br className="hidden md:block" /> creators across industries</>}
          sub="Here is what real users say about deploying PluginAI on their platforms."
        />
      </div>
      <div className="mt-14 flex flex-col gap-5">
        <Marquee>{row1.map((t) => <Card key={t.name} t={t} />)}</Marquee>
        <Marquee reverse>{row2.map((t) => <Card key={t.name} t={t} />)}</Marquee>
      </div>
    </section>
  );
}
