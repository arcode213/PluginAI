'use client';
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, Star, FileText, ShieldCheck, Gauge } from 'lucide-react';
import { ThreeBackground } from '@/components/landing/ThreeBackground';
import { CTA } from '@/components/landing/ui/CTA';
import { TiltCard } from '@/components/landing/ui/TiltCard';
import { Eyebrow } from '@/components/landing/ui/Eyebrow';
import { HERO } from '@/components/landing/data';
import { EASE } from '@/components/landing/ui/motion';

export function Hero() {
  const reduce = useReducedMotion();
  const parent = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
  const child = { hidden: { y: '115%' }, show: { y: 0, transition: { duration: 0.85, ease: EASE } } };
  const soft = (delay: number) => (reduce ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease: EASE } });

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-32 md:pt-28">
      {/* depth layers */}
      <div className="pointer-events-none absolute inset-0 opacity-60"><ThreeBackground /></div>
      <div className="grid-layer absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-[38%] -z-0 h-[560px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(109,94,249,0.16),transparent_62%)]" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1240px] items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        {/* ── Message ── */}
        <div className="text-center lg:text-left">
          <motion.div {...soft(0)} className="flex justify-center lg:justify-start">
            <Eyebrow>{HERO.badge}</Eyebrow>
          </motion.div>

          <motion.h1
            variants={reduce ? undefined : parent}
            initial={reduce ? undefined : 'hidden'}
            animate={reduce ? undefined : 'show'}
            className="font-display mt-6 text-[clamp(40px,6.4vw,76px)] font-bold leading-[1.02] tracking-[-0.035em] text-white"
          >
            {HERO.lines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span variants={reduce ? undefined : child} className={`block ${i === HERO.gradientLineIndex ? 'text-gradient-brand' : ''}`}>
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p {...soft(0.35)} className="font-body mx-auto mt-6 max-w-[540px] text-[17px] leading-[1.7] text-[#B7B8D0] lg:mx-0">
            {HERO.sub}
          </motion.p>

          <motion.div {...soft(0.5)} className="mt-9 flex flex-wrap justify-center gap-3.5 lg:justify-start">
            <CTA href={HERO.primaryCta.href} arrow>{HERO.primaryCta.label}</CTA>
            <CTA href={HERO.secondaryCta.href} variant="glass">
              <Sparkles size={17} /> {HERO.secondaryCta.label}
            </CTA>
          </motion.div>

          <motion.div {...soft(0.65)} className="font-body mt-8 flex items-center justify-center gap-3 text-[13px] text-[#7B7F98] lg:justify-start">
            <span className="flex gap-0.5 text-[#8C82FF]">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
            </span>
            Trusted across support, education, legal & enterprise teams
          </motion.div>
        </div>

        {/* ── Product mockup ── */}
        <motion.div {...soft(0.4)} className="relative mx-auto w-full max-w-[520px]">
          <TiltCard max={7} className="relative">
            <div className="card-glass relative overflow-hidden rounded-[22px] p-4">
              {/* window header */}
              <div className="flex items-center gap-2.5 border-b border-white/8 px-2 pb-3.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E] shadow-[0_0_10px_#22C55E]" />
                <span className="font-body text-[13px] font-medium text-[#B7B8D0]">PluginAI · Workspace: Product Docs</span>
              </div>
              {/* messages */}
              <div className="font-body flex flex-col gap-3.5 px-1 py-4 text-[13px] leading-[1.6]">
                <div className="self-end rounded-2xl rounded-br-md border border-[rgba(109,94,249,0.28)] bg-[rgba(109,94,249,0.16)] px-4 py-2.5 text-white/90">
                  What is your refund policy?
                </div>
                <div className="self-start rounded-2xl rounded-bl-md border border-white/8 bg-white/[0.04] px-4 py-3 text-[#B7B8D0]">
                  <span className="font-semibold text-white">According to your documents:</span> Refunds are processed within 7 business days of an approved request.
                  <span className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[#7B7F98]">
                    <FileText size={12} className="text-[#8C82FF]" /> policy.pdf · Section 4.2
                  </span>
                </div>
              </div>
              {/* input */}
              <div className="mt-1 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5">
                <span className="font-body text-[12.5px] text-[#7B7F98]">Ask about the active workspace…</span>
                <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-md bg-[linear-gradient(120deg,#8C82FF,#5647E8)]">
                  <Sparkles size={13} className="text-white" />
                </span>
              </div>
            </div>
          </TiltCard>

          {/* floating stat cards */}
          <motion.div {...soft(0.75)} className="animate-floaty absolute -left-5 top-8 hidden sm:block">
            <div className="card-glass flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5">
              <Gauge size={18} className="text-[#8C82FF]" />
              <div className="font-body leading-tight">
                <div className="text-[15px] font-bold text-white">1.8s</div>
                <div className="text-[10.5px] text-[#7B7F98]">avg. response</div>
              </div>
            </div>
          </motion.div>
          <motion.div {...soft(0.9)} className="animate-floaty-sm absolute -right-4 bottom-6 hidden sm:block">
            <div className="card-glass flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5">
              <ShieldCheck size={18} className="text-[#22D3EE]" />
              <div className="font-body leading-tight">
                <div className="text-[15px] font-bold text-white">≥85% F1</div>
                <div className="text-[10.5px] text-[#7B7F98]">retrieval accuracy</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* fade to page */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_bottom,transparent,#05050A)]" />
    </section>
  );
}
