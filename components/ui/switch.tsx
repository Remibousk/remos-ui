"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default";
};

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, size = "default", ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    data-slot="switch"
    data-size={size}
    className={cn(
      "peer group/switch inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent outline-none transition-colors",
      "focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-window)]",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[size=default]:h-5 data-[size=default]:w-9",
      "data-[size=sm]:h-4 data-[size=sm]:w-7",
      "data-[state=checked]:bg-accent data-[state=unchecked]:bg-gray-a5 hover:data-[state=unchecked]:bg-gray-a6",
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      className={cn(
        "pointer-events-none block rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.3)] ring-1 ring-inset ring-black/5 transition-transform",
        "group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3",
        "data-[state=unchecked]:translate-x-[1px] data-[state=checked]:translate-x-[calc(100%+1px)]",
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
