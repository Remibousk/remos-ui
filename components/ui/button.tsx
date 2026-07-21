"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium outline-none transition-[background-color,color,transform,box-shadow] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "rounded border border-[var(--button-primary-border)] bg-[var(--button-primary-bg)] text-[var(--button-primary-foreground)] shadow-none hover:border-[var(--button-primary-border-hover)] hover:bg-[var(--button-primary-bg-hover)] active:bg-[var(--button-primary-bg-active)] focus-visible:ring-2 focus-visible:ring-[var(--button-primary-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-window)]",
        tertiary:
          "rounded border border-subtle bg-gray-a2 text-primary shadow-none hover:bg-gray-a3 active:bg-gray-a4 focus-visible:ring-2 focus-visible:ring-accent/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-window)]",
        ghost:
          "rounded border border-transparent bg-transparent text-primary shadow-none hover:bg-subtle",
        launcher:
          "h-auto w-auto min-w-0 flex-col items-center justify-center gap-0 rounded border-0 bg-transparent text-primary shadow-none hover:bg-subtle focus-visible:bg-subtle",
        unset: "",
      },
      size: {
        default: "px-4 py-2 text-base leading-normal",
        sm: "px-3 py-1.5 text-sm leading-normal",
        icon: "size-10 rounded",
        unset: "h-auto min-h-0 min-w-0 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
