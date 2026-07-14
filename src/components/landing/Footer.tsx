'use client';
import React from 'react';
import Link from 'next/link';
import { Mail, MessageCircle, Globe, ArrowRight } from 'lucide-react';
import { FOOTER_COLS, APP_URL } from '@/components/landing/data';

export function Footer() {
  return (
    <footer className="relative border-t border-white/8 px-6 pb-10 pt-16">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-12 pb-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* brand + capture */}
          <div>
            <Link href="/" className="font-display text-[22px] font-bold tracking-tight text-white">
              Plugin<span className="text-gradient-brand">AI</span>
            </Link>
            <p className="font-body mt-4 max-w-[300px] text-[14px] leading-[1.7] text-[#7B7F98]">
              Turn your documents into intelligent, always-on assistants — grounded, secure, and live in minutes.
            </p>
            <form className="mt-6 flex max-w-[320px] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-1.5" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                aria-label="Email address"
                placeholder="you@company.com"
                className="font-body flex-1 bg-transparent px-3 py-2 text-[14px] text-white outline-none placeholder:text-[#7B7F98]"
              />
              <button aria-label="Subscribe" className="flex h-9 w-9 items-center justify-center rounded-lg bg-[linear-gradient(120deg,#8C82FF,#5647E8)] text-white transition-transform hover:-translate-y-0.5">
                <ArrowRight size={16} />
              </button>
            </form>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <div className="font-body mb-4 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#B7B8D0]">{col.title}</div>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="font-body text-[14px] text-[#7B7F98] transition-colors hover:text-white">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider-glow" />

        <div className="flex flex-col items-center justify-between gap-4 pt-6 sm:flex-row">
          <p className="font-body text-[13px] text-[#7B7F98]">© 2026 PluginAI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="font-body flex items-center gap-2 text-[13px] text-[#7B7F98]">
              <span className="h-2 w-2 animate-pulse-glow rounded-full bg-[#22C55E]" /> All systems operational
            </span>
            <div className="flex gap-2">
              {[Mail, MessageCircle, Globe].map((Icon, i) => (
                <a key={i} href={`${APP_URL}`} aria-label="social link" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 text-[#B7B8D0] transition-colors hover:border-[rgba(140,130,255,0.4)] hover:text-white">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
