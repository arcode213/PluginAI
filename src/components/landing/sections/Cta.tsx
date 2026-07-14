'use client';
import React from 'react';
import { Reveal } from '@/components/landing/ui/Reveal';
import { CTA } from '@/components/landing/ui/CTA';
import { APP_URL } from '@/components/landing/data';

export function Cta() {
  return (
    <section className="relative mx-auto w-full max-w-[1240px] px-6 py-28 md:py-36">
      <div className="card-glass relative mx-auto max-w-[920px] overflow-hidden rounded-[32px] px-6 py-20 text-center md:px-16">
        {/* aurora spotlight */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(109,94,249,0.28),transparent_62%)]" />
        <div className="pointer-events-none absolute -left-10 top-10 h-24 w-24 animate-floaty rounded-2xl bg-[rgba(109,94,249,0.12)] blur-md" />
        <div className="pointer-events-none absolute -right-8 bottom-12 h-16 w-16 animate-floaty-sm rounded-2xl bg-[rgba(34,211,238,0.1)] blur-md" />

        <div className="relative z-10">
          <Reveal>
            <h2 className="font-display text-[clamp(32px,5vw,58px)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
              Start building your <br className="hidden sm:block" />
              <span className="text-gradient-brand">AI assistant today</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-body mx-auto mt-5 max-w-[520px] text-[16.5px] leading-[1.7] text-[#B7B8D0]">
              Join hundreds of businesses and creators who use PluginAI to turn their documents into intelligent, always-on assistants.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap justify-center gap-3.5">
              <CTA href={`${APP_URL}/register`} arrow>Get Started Free</CTA>
              <CTA href="/docs" variant="glass">Read the Docs</CTA>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="font-body mt-6 text-[13px] text-[#7B7F98]">No credit card required · Free tier available</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
