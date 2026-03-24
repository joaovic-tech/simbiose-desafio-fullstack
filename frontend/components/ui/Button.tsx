import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default:
          'bg-[#192c4c] border border-[#70a7cb] text-white shadow-lg shadow-[#192c4c]/20 hover:bg-[#70a7cb] hover:shadow-[#70a7cb]/20',
        outline:
          'bg-[#112342] border border-[#70a7cb]/30 text-[#70a7cb] hover:border-[#70a7cb] hover:text-white',
        ghost:
          'bg-transparent text-gray-300 hover:text-white hover:bg-white/5',
        destructive:
          'bg-red-600 text-white hover:bg-red-700',
        icon:
          'bg-transparent text-[#70a7cb] hover:text-white hover:bg-[#70a7cb]/10 rounded-lg',
        'icon-destructive':
          'bg-transparent text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg',
      },
      size: {
        default: 'px-5 py-2.5 text-sm',
        sm: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base font-semibold',
        icon: 'p-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);

Button.displayName = 'Button';

export { Button, buttonVariants };
