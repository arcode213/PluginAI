import React from 'react';
import { Reveal } from './Reveal';
import { Eyebrow } from './Eyebrow';

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  align?: 'center' | 'left';
  className?: string;
};

export function SectionHeading({ eyebrow, title, sub, align = 'center', className = '' }: Props) {
  const isCenter = align === 'center';
  return (
    <div className={`${isCenter ? 'mx-auto max-w-[680px] text-center' : 'max-w-[640px]'} ${className}`}>
      <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
      <Reveal delay={0.06}>
        <h2 className="font-display mt-5 text-[clamp(30px,4.3vw,50px)] font-bold leading-[1.1] tracking-[-0.028em] text-white">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.12}>
          <p className={`font-body mt-4 text-[16.5px] leading-[1.7] text-[#B7B8D0] ${isCenter ? 'mx-auto max-w-[560px]' : 'max-w-[520px]'}`}>
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}
