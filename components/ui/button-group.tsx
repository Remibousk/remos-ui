"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonGroupVariants = cva(
  "inline-flex w-fit self-start items-center gap-0.5 border border-subtle/60 bg-subtle/40 p-0.5",
  {
    variants: {
      size: {
        default: "rounded",
        sm: "rounded",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const buttonGroupItemVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-medium transition-colors disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      size: {
        default: "rounded px-3 py-1.5 text-[12px]",
        sm: "rounded px-2.5 py-1 text-[11px]",
      },
      active: {
        true: "bg-default text-primary shadow-[inset_0_0_0_1px_var(--color-window-border-strong)]",
        false: "text-secondary hover:bg-subtle hover:text-primary",
      },
    },
    defaultVariants: {
      size: "default",
      active: false,
    },
  },
);

export type ButtonGroupOption<T extends string> = {
  value: T;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  "aria-label"?: string;
};

export interface ButtonGroupProps<T extends string>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof buttonGroupVariants> {
  value: T;
  onChange: (value: T) => void;
  options: ButtonGroupOption<T>[];
  ariaLabel?: string;
}

export function ButtonGroup<T extends string>({
  className,
  size,
  value,
  onChange,
  options,
  ariaLabel,
  ...props
}: ButtonGroupProps<T>) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(buttonGroupVariants({ size }), className)}
      {...props}
    >
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            disabled={option.disabled}
            aria-pressed={isActive}
            aria-label={option["aria-label"]}
            className={cn(buttonGroupItemVariants({ size, active: isActive }))}
          >
            {option.icon}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export { buttonGroupVariants, buttonGroupItemVariants };
