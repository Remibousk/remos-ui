"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
  size?: "sm" | "default";
};

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, size = "default", ...props }, ref) => {
  const values = props.value ?? props.defaultValue ?? [props.min ?? 0];
  const thumbCount = Array.isArray(values) ? values.length : 1;
  return (
    <SliderPrimitive.Root
      ref={ref}
      data-slot="slider"
      data-size={size}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "relative w-full grow overflow-hidden rounded-full bg-gray-a4",
          "data-[size=default]:h-1 data-[size=sm]:h-[3px]",
          size === "sm" ? "h-[3px]" : "h-1",
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute h-full rounded-full bg-accent"
        />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbCount }).map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          data-slot="slider-thumb"
          className={cn(
            "block rounded-full border border-default bg-white shadow-[0_1px_2px_rgba(0,0,0,0.3)] transition-colors",
            "outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-window)]",
            "hover:border-accent",
            size === "sm" ? "size-3" : "size-4",
          )}
        />
      ))}
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
