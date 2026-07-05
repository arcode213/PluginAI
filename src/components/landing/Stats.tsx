'use client';
import React, { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from './_anim';

type Stat = { value: number; decimals: number; prefix?: string; suffix?: string; label: string };

const STATS: Stat[] = [
  { value: 10, decimals: 0, suffix: 'K+', label: 'Documents processed' },
  { value: 500, decimals: 0, suffix: '+', label: 'Active workspaces' },
  { value: 99.9, decimals: 1, suffix: '%', label: 'Uptime SLA' },
  { value: 2.1, decimals: 1, suffix: 's', label: 'Avg. response time' },
];

const fmt = (n: number, s: Stat) => `${s.prefix ?? ''}${n.toFixed(s.decimals)}${s.suffix ?? ''}`;

export function Stats() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const nums = gsap.utils.toArray<HTMLElement>('.stat-num');

    if (prefersReducedMotion()) {
      nums.forEach((el, i) => (el.textContent = fmt(STATS[i].value, STATS[i])));
      return;
    }

    gsap.from('.stat', {
      y: 30, autoAlpha: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: root.current, start: 'top 85%' },
    });

    nums.forEach((el, i) => {
      const s = STATS[i];
      const obj = { v: 0 };
      gsap.to(obj, {
        v: s.value, duration: 1.6, ease: 'power2.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
        onUpdate: () => (el.textContent = fmt(obj.v, s)),
      });
    });

    ScrollTrigger.refresh();
  }, { scope: root });

  return (
    <div className="stats" ref={root}>
      {STATS.map((s) => (
        <div className="stat" key={s.label}>
          <div className="stat-num">{fmt(0, s)}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
