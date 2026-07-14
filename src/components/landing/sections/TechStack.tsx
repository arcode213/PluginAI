'use client';
import React from 'react';
import { Sparkles } from 'lucide-react';
import { SectionHeading } from '@/components/landing/ui/SectionHeading';
import { Reveal } from '@/components/landing/ui/Reveal';
import { TECH } from '@/components/landing/data';

const R = 44; // orbit radius as % of half-container

export function TechStack() {
  return (
    <section className="relative mx-auto w-full max-w-[1240px] px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow="Technology stack"
        title={<>Engineered on a <span className="text-gradient-brand">production-grade</span> stack</>}
        sub="The same tools that power reliable, scalable AI systems — chosen for accuracy, security, and speed."
      />

      {/* Constellation (md+) */}
      <Reveal delay={0.1} className="mt-8 hidden md:block">
        <div className="relative mx-auto aspect-square w-full max-w-[560px]">
          <div className="absolute inset-[4%] animate-spin-slow rounded-full border border-dashed border-white/8" />
          <div className="absolute inset-[26%] animate-spin-slow-rev rounded-full border border-white/6" />
          <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(109,94,249,0.4),transparent_70%)]" />
          <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#8C82FF,#5647E8)] shadow-[0_0_50px_rgba(109,94,249,0.6)]">
            <Sparkles className="text-white" size={22} />
            <span className="font-display mt-0.5 text-[10px] font-bold text-white">PluginAI</span>
          </div>
          {TECH.map((name, i) => {
            const a = (i / TECH.length) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + Math.cos(a) * R;
            const y = 50 + Math.sin(a) * R;
            return (
              <div key={name} className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%,-50%)' }}>
                <div className="animate-floaty" style={{ animationDelay: `${(i % 4) * 0.6}s` }}>
                  <span className="card-glass inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-body text-[13.5px] font-medium text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#8C82FF] shadow-[0_0_8px_#8C82FF]" />
                    {name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>

      {/* Grid fallback (mobile) */}
      <div className="mt-10 flex flex-wrap justify-center gap-3 md:hidden">
        {TECH.map((name) => (
          <span key={name} className="card-glass inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-body text-[13.5px] font-medium text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8C82FF]" />{name}
          </span>
        ))}
      </div>
    </section>
  );
}
