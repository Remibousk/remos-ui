export const themeTokens = {
  colors: {
    background: "var(--background)",
    foreground: "var(--foreground)",
    desktop: "var(--desktop)",
    desktopHighlight: "var(--desktop-highlight)",
    panel: "var(--panel)",
    window: "var(--window)",
    windowForeground: "var(--window-foreground)",
    windowMuted: "var(--window-muted)",
    windowBorder: "var(--window-border)",
    windowBorderStrong: "var(--window-border-strong)",
    accent: "var(--accent)",
    accentForeground: "var(--accent-foreground)",
    selection: "var(--selection)",
  },
  radius: {
    none: "var(--radius-none)",
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    full: "var(--radius-full)",
    active: "var(--radius)",

    windowNone: "var(--radius-window-none)",
    windowSm: "var(--radius-window-sm)",
    windowMd: "var(--radius-window-md)",
    windowLg: "var(--radius-window-lg)",
    windowFull: "var(--radius-window-full)",
    window: "var(--radius-window)",
  },
  shadow: {
    panel: "var(--shadow-panel)",
    window: "var(--shadow-window)",
  },
  motion: {
    fast: "140ms",
    standard: "180ms",
    slow: "240ms",
  },
} as const;

export type ThemeTokens = typeof themeTokens;
