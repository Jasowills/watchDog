import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-[transform,background-color,border-color,color,box-shadow] duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-panel)] hover:-translate-y-0.5 active:translate-y-0',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--surface-inverse)] px-5 py-3 text-[var(--surface-page)] shadow-[0_12px_26px_color-mix(in_oklch,var(--surface-inverse)_18%,transparent)] hover:bg-[var(--surface-inverse-soft)] dark:bg-[var(--surface-inverse)] dark:text-[var(--text-main)] dark:hover:bg-[var(--surface-inverse-soft)]',
        outline:
          'border border-[var(--border-soft)] bg-[var(--surface-panel)] px-5 py-3 text-[var(--text-main)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-panel-soft)] dark:bg-[var(--surface-panel)] dark:hover:bg-[var(--surface-panel-soft)]',
        ghost:
          'px-3 py-2 text-[var(--text-muted)] hover:bg-[var(--surface-panel-soft)] hover:text-[var(--text-main)] dark:hover:bg-[var(--surface-panel-soft)] dark:hover:text-white',
      },
      size: {
        default: 'h-11',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'

export { Button }