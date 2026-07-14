'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { SectionHeading } from '@/components/landing/ui/SectionHeading';
import { Reveal } from '@/components/landing/ui/Reveal';
import { FAQS, APP_URL } from '@/components/landing/data';

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className={`card-glass overflow-hidden rounded-2xl transition-colors ${open ? '' : ''}`}>
      <button onClick={onToggle} aria-expanded={open} className="flex w-full items-center justify-between gap-4 p-5 text-left">
        <span className="font-display text-[16px] font-medium text-white">{q}</span>
        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/12 text-[#8C82FF] transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          <Plus size={16} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="font-body px-5 pb-5 text-[14px] leading-[1.7] text-[#B7B8D0]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number>(0);
  return (
    <section id="faq" className="relative mx-auto w-full max-w-[1240px] scroll-mt-24 px-6 py-24 md:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading align="left" eyebrow="FAQ" title={<>Questions,<br /> answered</>} sub="Everything you need to know about how PluginAI turns your documents into an accurate, deployable assistant." />
          <Reveal delay={0.15}>
            <a href={`${APP_URL}/register`} className="font-body mt-6 inline-flex items-center gap-1.5 text-[14px] text-[#8C82FF] hover:text-white">
              Still curious? Start free →
            </a>
          </Reveal>
        </div>
        <div className="flex flex-col gap-3">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <Item q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
