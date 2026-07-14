'use client';
import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '@/lib/utils';

function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        'rounded-xl border border-border bg-white/[0.03] px-5 transition-colors data-[state=open]:border-[rgba(59,130,246,0.35)]',
        className
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          'flex flex-1 items-center justify-between gap-4 py-4 text-left text-[15px] font-medium text-white outline-none transition-colors hover:text-[#93c5fd] [&[data-state=open]>svg]:rotate-45',
          className
        )}
        {...props}
      >
        {children}
        <svg
          className="size-5 shrink-0 text-[#3b82f6] transition-transform duration-200"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" aria-hidden="true"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden text-sm data-[state=open]:animate-[accordion-down_0.22s_ease-out] data-[state=closed]:animate-[accordion-up_0.22s_ease-out]"
      {...props}
    >
      <div className={cn('pb-4 pt-0 leading-relaxed text-[rgba(255,255,255,0.55)]', className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
