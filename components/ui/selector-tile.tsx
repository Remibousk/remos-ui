"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type SelectorTileProps = {
  title: string;
  subtitle: string;
  active?: boolean;
  /** Freezes the hover visual. Intended for design-system demos only. */
  forceHover?: boolean;
  onSelect?: () => void;
  selectAriaLabel?: string;
  action?: React.ReactNode;
  className?: string;
};

export function SelectorTile({
  title,
  subtitle,
  active = false,
  forceHover = false,
  onSelect,
  selectAriaLabel,
  action,
  className,
}: SelectorTileProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded px-2 py-1 pr-1 text-sm text-primary transition-colors",
        active
          ? "bg-accent-a3"
          : forceHover
            ? "bg-gray-a3"
            : "hover:bg-gray-a3",
        className,
      )}
    >
      <button
        type="button"
        aria-label={selectAriaLabel}
        onClick={onSelect}
        className="min-w-0 flex-1 rounded-sm px-1 py-1 text-left active:scale-[0.99]"
      >
        <span className="block truncate font-medium">{title}</span>
        <span className="mt-0.5 block truncate text-xs text-secondary">
          {subtitle}
        </span>
      </button>
      {action}
    </div>
  );
}

export type TileIconButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "children" | "variant" | "size" | "aria-label"
> & {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
};

export const TileIconButton = React.forwardRef<
  HTMLButtonElement,
  TileIconButtonProps
>(function TileIconButton({ icon: Icon, label, className, ...props }, ref) {
  return (
    <Button
      ref={ref}
      type="button"
      variant="ghost"
      size="icon"
      aria-label={label}
      className={cn(
        "size-8 shrink-0 rounded text-secondary hover:bg-gray-a3 hover:text-primary",
        className,
      )}
      {...props}
    >
      <Icon className="size-4" aria-hidden="true" />
    </Button>
  );
});
