"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import {
  applyThemeCssVars,
  DEFAULT_THEME_SETTINGS,
  resolveThemeAppearance,
  type ThemeAppearance,
  type ThemeMode,
  type ThemeSettings,
} from "@/lib/theme/theme-customization";

/**
 * Standalone theme store for the design system.
 *
 * RemOS backs this with a cookie + InstantDB; here it's a plain
 * localStorage-backed external store. `setTheme`, `useSettings`, and
 * `useResolvedThemeAppearance` keep the same signatures the components were
 * written against, so the theme switcher and showcase pages need no changes.
 */

const STORAGE_KEY = "remos-ui.theme.v1";

let currentTheme: ThemeSettings = DEFAULT_THEME_SETTINGS;
const listeners = new Set<() => void>();

function isThemeSettings(value: unknown): value is ThemeSettings {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<ThemeSettings>;
  return (
    typeof candidate.mode === "string" &&
    typeof candidate.accent === "object" &&
    typeof candidate.neutral === "object" &&
    typeof candidate.font === "object" &&
    typeof candidate.radius === "object"
  );
}

function readStoredTheme(): ThemeSettings | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return isThemeSettings(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function setTheme(next: ThemeSettings) {
  currentTheme = next;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore quota / privacy-mode failures — the in-memory value still holds.
    }
  }
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): ThemeSettings {
  return currentTheme;
}

function getServerSnapshot(): ThemeSettings {
  return DEFAULT_THEME_SETTINGS;
}

export function useSettings(): { theme: ThemeSettings } {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { theme };
}

export function useResolvedThemeAppearance(mode: ThemeMode): ThemeAppearance {
  const [systemAppearance, setSystemAppearance] =
    useState<ThemeAppearance>("dark");

  useEffect(() => {
    if (mode !== "system") return;
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const update = (matches: boolean) =>
      setSystemAppearance(matches ? "dark" : "light");

    update(mediaQuery.matches);
    const handleChange = (event: MediaQueryListEvent) => update(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [mode]);

  return resolveThemeAppearance(mode, systemAppearance);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <ThemeHydrator />
      <ThemeRootSync />
      {children}
    </>
  );
}

/**
 * Loads any persisted theme on mount. Runs after the first (server-matching)
 * render so hydration stays consistent; if a stored theme differs from the
 * default it applies in a single post-hydration transition.
 */
function ThemeHydrator() {
  useEffect(() => {
    const stored = readStoredTheme();
    if (stored) setTheme(stored);
  }, []);
  return null;
}

function ThemeRootSync() {
  const { theme } = useSettings();
  const appearance = useResolvedThemeAppearance(theme.mode);

  useEffect(() => {
    applyThemeCssVars(document.documentElement, theme, appearance);
  }, [appearance, theme]);

  return null;
}
