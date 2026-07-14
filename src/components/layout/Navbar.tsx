'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { NAV_LINKS, APP_URL } from '@/components/landing/data';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-[250] flex justify-center px-4 pt-3"
    >
      <nav
        className={`font-body flex w-full max-w-[1180px] items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 md:px-5 ${
          scrolled
            ? 'border border-white/10 bg-[rgba(8,8,16,0.72)] shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl'
            : 'border border-transparent bg-transparent'
        }`}
      >
        <Link href="/" className="font-display text-[19px] font-bold tracking-tight text-white">
          Plugin<span className="text-gradient-brand">AI</span>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="group relative text-[14px] text-[#B7B8D0] transition-colors hover:text-white">
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-brand to-glow2 transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <a href={`${APP_URL}/login`} className="rounded-xl px-4 py-2 text-[14px] text-[#B7B8D0] transition-colors hover:text-white">
            Sign in
          </a>
          <a
            href={`${APP_URL}/register`}
            className="group inline-flex items-center gap-1.5 rounded-xl bg-[linear-gradient(120deg,#8C82FF,#6D5EF9_55%,#5647E8)] px-4 py-2 text-[14px] font-semibold text-white shadow-[0_8px_26px_rgba(109,94,249,0.4)] transition-transform hover:-translate-y-0.5"
          >
            Get started
            <ArrowRight size={15} strokeWidth={2.4} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="font-body absolute left-4 right-4 top-[68px] rounded-2xl border border-white/10 bg-[rgba(8,8,16,0.92)] p-4 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-[15px] text-[#B7B8D0] transition-colors hover:bg-white/5 hover:text-white">
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 flex gap-2">
                <a href={`${APP_URL}/login`} className="flex-1 rounded-xl border border-white/12 px-4 py-2.5 text-center text-[14px] text-white">Sign in</a>
                <a href={`${APP_URL}/register`} className="flex-1 rounded-xl bg-[linear-gradient(120deg,#8C82FF,#6D5EF9,#5647E8)] px-4 py-2.5 text-center text-[14px] font-semibold text-white">Get started</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
