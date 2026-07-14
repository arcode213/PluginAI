import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer no-underline',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-[0_8px_30px_rgba(59,130,246,0.35)] hover:bg-[#2563eb] hover:-translate-y-0.5',
        gradient:
          'text-white bg-[linear-gradient(120deg,#60a5fa,#2563eb)] shadow-[0_8px_30px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 hover:shadow-[0_12px_42px_rgba(59,130,246,0.55)]',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-[#22222e]',
        outline:
          'border border-input bg-white/[0.02] text-foreground hover:bg-white/[0.06] hover:border-[rgba(59,130,246,0.5)]',
        ghost: 'text-foreground hover:bg-white/[0.06]',
        link: 'text-[#93c5fd] underline-offset-4 hover:underline',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-[#dc2626]',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-9 px-4 text-[13px]',
        lg: 'h-12 px-8 text-[15px]',
        icon: 'size-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
