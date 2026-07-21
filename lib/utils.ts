import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Theme radius utilities from `@theme` / globals must be registered so
 * `cn("rounded-window", "rounded-none")` collapses to a single winner.
 * Tailwind's built-in `rounded-*` group handles the fixed scale steps;
 * we only need to add the window-scale utilities that it doesn't know about.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      rounded: [
        "rounded-window",
        "rounded-window-none",
        "rounded-window-sm",
        "rounded-window-md",
        "rounded-window-lg",
        "rounded-window-full",
      ],
      "rounded-t": ["rounded-t-window"],
      "rounded-b": ["rounded-b-window"],
      "rounded-l": ["rounded-l-window"],
      "rounded-r": ["rounded-r-window"],
      "rounded-s": ["rounded-s-window"],
      "rounded-e": ["rounded-e-window"],
      "rounded-tl": ["rounded-tl-window"],
      "rounded-tr": ["rounded-tr-window"],
      "rounded-bl": ["rounded-bl-window"],
      "rounded-br": ["rounded-br-window"],
      "rounded-ss": ["rounded-ss-window"],
      "rounded-se": ["rounded-se-window"],
      "rounded-es": ["rounded-es-window"],
      "rounded-ee": ["rounded-ee-window"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
