"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const iconButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded transition-[background-color,border-color,color,box-shadow,transform] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-subtle bg-gray-a2 text-primary hover:bg-gray-a3",
        ghost:
          "border border-transparent bg-transparent text-primary hover:bg-gray-a3",
        solid:
          "border-0 bg-accent text-accent-foreground shadow-sm hover:bg-accent/90",
      },
      size: {
        sm: "size-7 [&_svg]:size-3.5",
        md: "size-8 [&_svg]:size-4",
        lg: "size-10 [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  "aria-label": string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(iconButtonVariants({ variant, size, className }))}
      {...props}
    />
  ),
);

IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
