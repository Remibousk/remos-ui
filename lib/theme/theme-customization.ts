import {
  BASE_COLOR_IDS,
  BASE_SCALES,
  deriveAlphaScale,
  generateChromaticScaleSet,
  generateSolidScale,
  hexToRgb,
  SCALE_STEPS,
  type Scale12,
  type ThemeAppearance as BaseAppearance,
} from "./base-scales";

export const NEUTRAL_SCALE_STEPS = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const;

export type NeutralScaleStep = (typeof NEUTRAL_SCALE_STEPS)[number];
export type NeutralScale = Record<NeutralScaleStep, string>;

type NeutralSurfaces = {
  background: string;
  foreground: string;
  desktop: string;
  desktopHighlight: string;
  panel: string;
  window: string;
  windowForeground: string;
  windowMuted: string;
  windowBorder: string;
  windowBorderStrong: string;
  notesPopoverSolid: string;
  notesMutedSolid: string;
};

export const THEME_MODES = ["dark", "light", "system"] as const;

export type ThemeMode = (typeof THEME_MODES)[number];
export type ThemeAppearance = Exclude<ThemeMode, "system">;

export const ACCENT_PRESET_IDS = [
  "sky",
  "ocean",
  "cobalt",
  "mint",
  "lime",
  "amber",
  "coral",
  "rose",
  "violet",
] as const;

export type AccentPresetId = (typeof ACCENT_PRESET_IDS)[number];

export const DARK_NEUTRAL_PALETTE_IDS = [
  "graphite",
  "slate",
  "midnight",
  "forest",
  "sepia",
  "storm",
  "velvet",
] as const;

export type DarkNeutralPaletteId = (typeof DARK_NEUTRAL_PALETTE_IDS)[number];

export const LIGHT_NEUTRAL_PALETTE_IDS = [
  "paper",
  "canvas",
  "bloom",
  "dune",
  "harbor",
  "atelier",
] as const;

export type LightNeutralPaletteId = (typeof LIGHT_NEUTRAL_PALETTE_IDS)[number];

export const FONT_PRESET_IDS = [
  "inter",
  "eb-garamond",
  "ubuntu-sans-mono",
  "figtree",
  "gt-walsheim",
] as const;

export type FontPresetId = (typeof FONT_PRESET_IDS)[number];

export const RADIUS_PRESET_IDS = ["none", "sm", "md", "lg", "full"] as const;

export type RadiusPresetId = (typeof RADIUS_PRESET_IDS)[number];

export type ThemeAccent =
  | { mode: "preset"; presetId: AccentPresetId }
  | { mode: "custom"; color: string };

export type ThemeNeutral = {
  darkPaletteId: DarkNeutralPaletteId;
  lightPaletteId: LightNeutralPaletteId;
};

export type ThemeFont = { presetId: FontPresetId };

export type ThemeRadius = { presetId: RadiusPresetId };

export type ThemeSettings = {
  mode: ThemeMode;
  accent: ThemeAccent;
  neutral: ThemeNeutral;
  font: ThemeFont;
  radius: ThemeRadius;
};

type AccentPreset = {
  id: AccentPresetId;
  label: string;
  color: string;
};

export type FontPreset = {
  id: FontPresetId;
  label: string;
  /**
   * The CSS variable that resolves to the loaded font family (provided by
   * `next/font/google` in `app/layout.tsx`). Falls back to the stack below
   * before fonts hydrate or if `next/font` ever fails to inject.
   */
  cssVar: string;
  fallback: string;
};

export type RadiusPreset = {
  id: RadiusPresetId;
  label: string;
  /** Value the `--radius` var (and bare `rounded` utility) resolves to. */
  component: string;
  /** Value the `--radius-window` var (and `rounded-window` utility) resolves to. */
  window: string;
};

export type NeutralPalette<PaletteId extends string> = {
  id: PaletteId;
  label: string;
  description: string;
  appearance: ThemeAppearance;
  scale: NeutralScale;
};

export type ThemeCssVars = Record<`--${string}`, string>;

const DEFAULT_ACCENT_PRESET_ID: AccentPresetId = "coral";
const DEFAULT_DARK_NEUTRAL_PALETTE_ID: DarkNeutralPaletteId = "forest";
const DEFAULT_LIGHT_NEUTRAL_PALETTE_ID: LightNeutralPaletteId = "paper";
const DEFAULT_FONT_PRESET_ID: FontPresetId = "inter";
const DEFAULT_RADIUS_PRESET_ID: RadiusPresetId = "md";
const DEFAULT_THEME_MODE: ThemeMode = "light";
const HEX_PATTERN = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
const DARK_ACCENT_FOREGROUND = "#111a28";
const LIGHT_ACCENT_FOREGROUND = "#f8fbff";

export const ACCENT_PRESETS: readonly AccentPreset[] = [
  { id: "sky", label: "Sky", color: "#8bb8ff" },
  { id: "ocean", label: "Ocean", color: "#5cc8ff" },
  { id: "cobalt", label: "Cobalt", color: "#0659c3" },
  { id: "mint", label: "Mint", color: "#53e6c3" },
  { id: "lime", label: "Lime", color: "#9fe870" },
  { id: "amber", label: "Amber", color: "#ffbe55" },
  { id: "coral", label: "Coral", color: "#ff8a6b" },
  { id: "rose", label: "Rose", color: "#ff7da6" },
  { id: "violet", label: "Violet", color: "#b18cff" },
] as const;

const SANS_FALLBACK =
  'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const SERIF_FALLBACK = 'ui-serif, Georgia, "Times New Roman", serif';
const MONO_FALLBACK =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace';

export const FONT_PRESETS: readonly FontPreset[] = [
  { id: "inter", label: "Inter", cssVar: "var(--font-inter)", fallback: SANS_FALLBACK },
  {
    id: "eb-garamond",
    label: "EB Garamond",
    cssVar: "var(--font-eb-garamond)",
    fallback: SERIF_FALLBACK,
  },
  {
    id: "ubuntu-sans-mono",
    label: "Ubuntu Sans Mono",
    cssVar: "var(--font-ubuntu-sans-mono)",
    fallback: MONO_FALLBACK,
  },
  { id: "figtree", label: "Figtree", cssVar: "var(--font-figtree)", fallback: SANS_FALLBACK },
  {
    id: "gt-walsheim",
    label: "GT Walsheim Pro",
    cssVar: "var(--font-gt-walsheim)",
    fallback: SANS_FALLBACK,
  },
] as const;

/**
 * Radius presets. Each preset selects one step from both the component and
 * window radius scales — they always move together, so a compact window
 * (Small) pairs with compact controls, and so on. Values match the Tier 1
 * CSS vars defined in `app/globals.css` (`--radius-*` and
 * `--radius-window-*`) so either the preset value or the Tier 1 var is
 * interchangeable at a given step.
 */
export const RADIUS_PRESETS: readonly RadiusPreset[] = [
  { id: "none", label: "None", component: "0px", window: "0px" },
  { id: "sm", label: "Small", component: "4px", window: "8px" },
  { id: "md", label: "Medium", component: "8px", window: "12px" },
  { id: "lg", label: "Large", component: "10px", window: "16px" },
  { id: "full", label: "Full", component: "9999px", window: "24px" },
] as const;

const DARK_NEUTRAL_PALETTES: readonly NeutralPalette<DarkNeutralPaletteId>[] = [
  {
    id: "graphite",
    label: "Graphite",
    description: "Original RemOS charcoal",
    appearance: "dark",
    scale: {
      50: "#eff4ff",
      100: "#d9dfea",
      200: "#c4cbd5",
      300: "#aeb6c0",
      400: "#878d93",
      500: "#616367",
      600: "#3a3a3a",
      700: "#303030",
      800: "#2c2c2c",
      900: "#282828",
      950: "#222222",
    },
  },
  {
    id: "slate",
    label: "Slate",
    description: "Cool steel blue",
    appearance: "dark",
    scale: {
      50: "#eef4ff",
      100: "#d7dfeb",
      200: "#bfc9d8",
      300: "#a8b4c4",
      400: "#828d9d",
      500: "#5c6776",
      600: "#36404f",
      700: "#29323e",
      800: "#28303a",
      900: "#232b35",
      950: "#20252d",
    },
  },
  {
    id: "midnight",
    label: "Midnight",
    description: "Deep navy surfaces",
    appearance: "dark",
    scale: {
      50: "#edf3ff",
      100: "#d5ddea",
      200: "#bdc6d6",
      300: "#a5b0c1",
      400: "#7d8798",
      500: "#555d6e",
      600: "#2d3445",
      700: "#212836",
      800: "#1f2531",
      900: "#1c222d",
      950: "#171b24",
    },
  },
  {
    id: "forest",
    label: "Forest",
    description: "Muted pine neutrals",
    appearance: "dark",
    scale: {
      50: "#edf8f1",
      100: "#d6e3db",
      200: "#c0cec6",
      300: "#a9b9b0",
      400: "#818f87",
      500: "#59655e",
      600: "#313b35",
      700: "#27302b",
      800: "#232b27",
      900: "#222a26",
      950: "#1b211d",
    },
  },
  {
    id: "sepia",
    label: "Sepia",
    description: "Smoked umber tones",
    appearance: "dark",
    scale: {
      50: "#fff3ea",
      100: "#ebdcd2",
      200: "#d7c5b9",
      300: "#c3aea1",
      400: "#96857a",
      500: "#695b53",
      600: "#3b312b",
      700: "#302823",
      800: "#2d2622",
      900: "#2a231f",
      950: "#241f1b",
    },
  },
  {
    id: "storm",
    label: "Storm",
    description: "Blue-gray dusk",
    appearance: "dark",
    scale: {
      50: "#eff3f8",
      100: "#d9dee6",
      200: "#c2cad4",
      300: "#acb5c2",
      400: "#858c99",
      500: "#5e6470",
      600: "#353b46",
      700: "#2b313a",
      800: "#272b33",
      900: "#252a32",
      950: "#1f2228",
    },
  },
  {
    id: "velvet",
    label: "Velvet",
    description: "Aubergine dusk from the remibousk.com rebuild",
    appearance: "dark",
    scale: {
      50: "#f4f4f6",
      100: "#e2e0e8",
      200: "#c8c5d0",
      300: "#adaab5",
      400: "#767282",
      500: "#5c5668",
      600: "#413857",
      700: "#2a2537",
      800: "#231f2d",
      900: "#1c1924",
      950: "#18161e",
    },
  },
] as const;

const LIGHT_NEUTRAL_PALETTES: readonly NeutralPalette<LightNeutralPaletteId>[] = [
  {
    id: "paper",
    label: "Paper",
    description: "Clean parchment with crisp contrast",
    appearance: "light",
    scale: {
      50: "#fffffa",
      100: "#fffaf0",
      200: "#f6f1e6",
      300: "#efe5d6",
      400: "#eadfc9",
      500: "#c5b8a3",
      600: "#a1917d",
      700: "#7d6a57",
      800: "#635342",
      900: "#483b2d",
      950: "#2e2418",
    },
  },
  {
    id: "canvas",
    label: "Canvas",
    description: "Gallery white with cool stone framing",
    appearance: "light",
    scale: {
      50: "#ffffff",
      100: "#fbfcfe",
      200: "#f1f3f7",
      300: "#e6eaf1",
      400: "#d9dee8",
      500: "#b4bcc8",
      600: "#8e99a8",
      700: "#697688",
      800: "#505b6b",
      900: "#38404e",
      950: "#1f2630",
    },
  },
  {
    id: "bloom",
    label: "Bloom",
    description: "Warm blush surfaces with rose-tinted chrome",
    appearance: "light",
    scale: {
      50: "#fffafb",
      100: "#fff4f5",
      200: "#f7e8ea",
      300: "#f1dde1",
      400: "#ebcfd6",
      500: "#c9acb5",
      600: "#a88993",
      700: "#866672",
      800: "#6a4f59",
      900: "#4e3740",
      950: "#312027",
    },
  },
  {
    id: "dune",
    label: "Dune",
    description: "Sun-washed sand with stronger amber separation",
    appearance: "light",
    scale: {
      50: "#fff9ef",
      100: "#faf1df",
      200: "#efe2cc",
      300: "#ecd9bb",
      400: "#dfc39a",
      500: "#c3a67f",
      600: "#a78864",
      700: "#8b6a49",
      800: "#6e5338",
      900: "#513c27",
      950: "#342517",
    },
  },
  {
    id: "harbor",
    label: "Harbor",
    description: "Sea-glass blues with brighter dockside contrast",
    appearance: "light",
    scale: {
      50: "#f9feff",
      100: "#edf8fc",
      200: "#deedf3",
      300: "#cfe5ec",
      400: "#b6d4df",
      500: "#96b5c0",
      600: "#7595a1",
      700: "#557682",
      800: "#405f6a",
      900: "#2c4752",
      950: "#17303a",
    },
  },
  {
    id: "atelier",
    label: "Atelier",
    description: "Soft sage studio with clear green-gray depth",
    appearance: "light",
    scale: {
      50: "#fbfffb",
      100: "#f0f7f0",
      200: "#e3ede3",
      300: "#d6e4d7",
      400: "#bfd4c0",
      500: "#9fb5a2",
      600: "#7f9683",
      700: "#5f7765",
      800: "#495e4f",
      900: "#334638",
      950: "#1d2d22",
    },
  },
] as const;

const NEUTRAL_PALETTES_BY_APPEARANCE: Record<
  ThemeAppearance,
  readonly NeutralPalette<string>[]
> = {
  dark: DARK_NEUTRAL_PALETTES,
  light: LIGHT_NEUTRAL_PALETTES,
};

export const DEFAULT_THEME_SETTINGS: ThemeSettings = {
  mode: DEFAULT_THEME_MODE,
  accent: { mode: "preset", presetId: DEFAULT_ACCENT_PRESET_ID },
  neutral: {
    darkPaletteId: DEFAULT_DARK_NEUTRAL_PALETTE_ID,
    lightPaletteId: DEFAULT_LIGHT_NEUTRAL_PALETTE_ID,
  },
  font: { presetId: DEFAULT_FONT_PRESET_ID },
  radius: { presetId: DEFAULT_RADIUS_PRESET_ID },
};

export function getFontPreset(id: FontPresetId): FontPreset {
  return FONT_PRESETS.find((preset) => preset.id === id) ?? FONT_PRESETS[0];
}

export function getRadiusPreset(id: RadiusPresetId): RadiusPreset {
  return RADIUS_PRESETS.find((preset) => preset.id === id) ?? RADIUS_PRESETS[0];
}

export function resolveFontFamily(font: ThemeFont): string {
  const preset = getFontPreset(font.presetId);
  return `${preset.cssVar}, ${preset.fallback}`;
}

export function normalizeHexColor(value: string): string | null {
  const trimmed = value.trim().toLowerCase();
  if (!HEX_PATTERN.test(trimmed)) {
    return null;
  }
  if (trimmed.length === 4) {
    const [, r, g, b] = trimmed;
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  return trimmed;
}

export function getAccentPreset(presetId: AccentPresetId): AccentPreset {
  return (
    ACCENT_PRESETS.find((preset) => preset.id === presetId) ?? ACCENT_PRESETS[0]
  );
}

export function getNeutralPalettes(
  appearance: ThemeAppearance,
): readonly NeutralPalette<DarkNeutralPaletteId | LightNeutralPaletteId>[] {
  return NEUTRAL_PALETTES_BY_APPEARANCE[appearance] as readonly NeutralPalette<
    DarkNeutralPaletteId | LightNeutralPaletteId
  >[];
}

export function getNeutralPalette(
  neutral: ThemeNeutral,
  appearance: ThemeAppearance = "dark",
): NeutralPalette<DarkNeutralPaletteId | LightNeutralPaletteId> {
  const paletteId =
    appearance === "dark" ? neutral.darkPaletteId : neutral.lightPaletteId;
  return (
    getNeutralPalettes(appearance).find((palette) => palette.id === paletteId) ??
    getNeutralPalettes(appearance)[0]
  );
}

/**
 * Maps a palette's scale steps to the semantic surface roles used across RemOS.
 * Kept here so palette previews (e.g. settings, design system) can render the
 * same surfaces the running theme produces via `resolveThemeCssVars`.
 */
export function getNeutralSurfaces(
  palette: NeutralPalette<string>,
): NeutralSurfaces {
  const { scale, appearance } = palette;
  if (appearance === "dark") {
    return {
      background: scale[950],
      foreground: scale[50],
      desktop: scale[800],
      desktopHighlight: scale[600],
      panel: rgba(scale[900], 0.8),
      window: rgba(scale[700], 0.9),
      windowForeground: scale[50],
      windowMuted: scale[300],
      windowBorder: rgba(scale[50], 0.08),
      windowBorderStrong: rgba(scale[50], 0.16),
      notesPopoverSolid: scale[700],
      notesMutedSolid: scale[600],
    };
  }
  return {
    background: scale[200],
    foreground: scale[950],
    desktop: scale[100],
    desktopHighlight: scale[400],
    panel: rgba(scale[100], 0.86),
    window: rgba(scale[50], 0.92),
    windowForeground: scale[950],
    windowMuted: scale[700],
    windowBorder: rgba(scale[950], 0.1),
    windowBorderStrong: rgba(scale[950], 0.2),
    notesPopoverSolid: scale[50],
    notesMutedSolid: scale[300],
  };
}

/**
 * Picks a pronounced mid-tone from a neutral palette for use in tiny preview
 * swatches (e.g. 16px dots in Settings). Using `scale[500]` — the palette's
 * seed — preserves each palette's hue/chroma signature, so Graphite vs. Slate
 * vs. Stone stay distinguishable at small sizes where the actual near-black
 * (`scale[950]`) background step collapses visually.
 */
export function getNeutralSwatchColor(
  palette: NeutralPalette<string>,
): string {
  return palette.scale[500];
}

export function resolveThemeAppearance(
  themeOrMode: ThemeSettings | ThemeMode,
  systemAppearance: ThemeAppearance = "dark",
): ThemeAppearance {
  const mode = typeof themeOrMode === "string" ? themeOrMode : themeOrMode.mode;
  return mode === "system" ? systemAppearance : mode;
}

export function getAccentColor(accent: ThemeAccent): string {
  if (accent.mode === "custom") {
    return normalizeHexColor(accent.color) ?? getAccentPreset(DEFAULT_ACCENT_PRESET_ID).color;
  }
  return getAccentPreset(accent.presetId).color;
}

function rgba(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getAccessibleAccentForeground(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const brightness = r * 0.299 + g * 0.587 + b * 0.114;
  return brightness > 150 ? DARK_ACCENT_FOREGROUND : LIGHT_ACCENT_FOREGROUND;
}

/**
 * Returns the hex that seeds each palette's OKLCH-derived 12-step gray
 * scale. Using the palette's own mid-tone keeps each palette's hue/chroma
 * signature intact when regenerated on the Radix luminance curve.
 */
function getPaletteSeed(palette: NeutralPalette<string>): string {
  return palette.scale[500];
}

const SEMANTIC_TOKENS: ThemeCssVars = {
  // Backgrounds
  "--bg-desktop": "var(--gray-1)",
  "--bg-window": "color-mix(in srgb, var(--gray-1) 94%, transparent)",
  "--bg-panel": "color-mix(in srgb, var(--gray-2) 88%, transparent)",
  "--bg-surface": "var(--gray-3)",
  "--bg-surface-hover": "var(--gray-4)",
  "--bg-surface-active": "var(--gray-5)",
  "--bg-inverse": "var(--gray-12)",
  "--bg-overlay": "var(--gray-a6)",

  // Text
  "--text-primary": "var(--gray-12)",
  "--text-secondary": "var(--gray-11)",
  "--text-tertiary": "var(--gray-10)",
  "--text-disabled": "var(--gray-8)",
  "--text-inverse": "var(--gray-1)",
  "--text-accent": "var(--accent-11)",

  // Icons (same palette as text)
  "--icon-primary": "var(--gray-12)",
  "--icon-secondary": "var(--gray-11)",
  "--icon-tertiary": "var(--gray-10)",
  "--icon-disabled": "var(--gray-8)",
  "--icon-inverse": "var(--gray-1)",
  "--icon-accent": "var(--accent-10)",

  // Borders
  "--border-subtle": "var(--gray-a4)",
  "--border-default": "var(--gray-a6)",
  "--border-strong": "var(--gray-a7)",
  "--border-active": "var(--gray-a8)",
  "--border-focus": "var(--accent-9)",
  "--border-transparent": "transparent",

  // Primary button (monochrome per Radix/Geist spec)
  "--btn-primary-bg": "var(--gray-12)",
  "--btn-primary-hover": "var(--gray-11)",
  "--btn-primary-text": "var(--gray-1)",
  "--btn-primary-icon": "var(--gray-1)",

  "--btn-secondary-bg": "var(--gray-2)",
  "--btn-secondary-hover": "var(--gray-3)",
  "--btn-secondary-active": "var(--gray-4)",
  "--btn-secondary-border": "var(--gray-a6)",
  "--btn-secondary-text": "var(--gray-12)",

  "--btn-ghost-bg": "transparent",
  "--btn-ghost-hover": "var(--gray-a3)",
  "--btn-ghost-active": "var(--gray-a4)",
  "--btn-ghost-text": "var(--gray-11)",

  // Inputs
  "--input-bg": "var(--gray-1)",
  "--input-bg-hover": "var(--gray-2)",
  "--input-border": "var(--border-default)",
  "--input-border-hover": "var(--border-strong)",
  "--input-text": "var(--text-primary)",
  "--input-placeholder": "var(--text-tertiary)",

  // Accent (user-selectable brand color)
  "--accent-bg": "var(--accent-2)",
  "--accent-border": "var(--accent-6)",
  "--accent-solid": "var(--accent-9)",
  "--accent-solid-hover": "var(--accent-10)",

  // Status — success
  "--success-bg": "var(--green-2)",
  "--success-border": "var(--green-6)",
  "--success-solid": "var(--green-9)",
  "--success-text": "var(--green-11)",

  // Status — warning
  "--warning-bg": "var(--amber-2)",
  "--warning-border": "var(--amber-6)",
  "--warning-solid": "var(--amber-9)",
  "--warning-text": "var(--amber-11)",

  // Status — danger
  "--danger-bg": "var(--red-2)",
  "--danger-border": "var(--red-6)",
  "--danger-solid": "var(--red-9)",
  "--danger-solid-hover": "var(--red-10)",
  "--danger-text": "var(--red-11)",

  // Elevation shadows — alpha scale keeps them theme-aware.
  "--shadow-elevation-1": "0 8px 30px var(--gray-a3)",
  "--shadow-elevation-2": "0 12px 40px var(--gray-a4)",
  "--shadow-elevation-3": "0 4px 14px var(--gray-a5)",
  "--shadow-elevation-4": "0 2px 10px var(--gray-a6)",
};

/**
 * Legacy token aliases — kept so existing class names continue to work
 * during incremental usage-site migration. Removed in Phase 5.
 */
const LEGACY_ALIASES: ThemeCssVars = {
  "--background": "var(--bg-desktop)",
  "--foreground": "var(--text-primary)",
  "--desktop": "var(--bg-desktop)",
  "--desktop-highlight": "var(--bg-surface-hover)",
  "--panel": "var(--bg-panel)",
  "--window": "var(--bg-window)",
  "--window-foreground": "var(--text-primary)",
  "--window-muted": "var(--text-secondary)",
  "--window-border": "var(--border-subtle)",
  "--window-border-strong": "var(--border-default)",
  "--accent": "var(--accent-solid)",
  "--accent-text": "var(--text-accent)",
  "--selection": "var(--accent-a3)",
  "--danger": "var(--danger-solid)",
  "--notesPopoverSolid": "var(--gray-3)",
  "--notesMutedSolid": "var(--gray-4)",
  "--menubar-button": "transparent",
  "--menubar-button-hover": "var(--accent-solid)",
  "--menubar-button-text": "var(--text-primary)",
  "--menubar-button-text-hover": "var(--text-inverse)",
  "--menubar-button-inactive": "transparent",
  "--menubar-icon-button-hover": "var(--gray-a4)",
  "--button-primary-bg": "var(--accent-solid)",
  "--button-primary-bg-hover": "var(--accent-7)",
  "--button-primary-bg-active": "var(--accent-8)",
  "--button-primary-border": "transparent",
  "--button-primary-border-hover": "var(--accent-solid)",
  "--button-primary-foreground": "var(--accent-foreground)",
  "--button-primary-ring": "var(--accent-a6)",
  // ShadCN base tokens mapped onto the new semantic layer.
  "--card": "var(--bg-surface)",
  "--card-foreground": "var(--text-primary)",
  "--popover": "var(--bg-surface)",
  "--popover-foreground": "var(--text-primary)",
  "--primary": "var(--accent-solid)",
  "--primary-foreground": "var(--text-inverse)",
  "--secondary": "var(--bg-surface)",
  "--secondary-foreground": "var(--text-primary)",
  "--muted": "var(--bg-surface-hover)",
  "--muted-foreground": "var(--text-secondary)",
  "--destructive": "var(--danger-solid)",
  "--border": "var(--border-subtle)",
  "--input": "var(--border-default)",
  "--ring": "var(--border-focus)",
};

function emitChromaticScaleVars(
  prefix: string,
  solid: Scale12<string>,
  alpha: Scale12<string>,
): ThemeCssVars {
  const out: ThemeCssVars = {};
  for (let i = 0; i < SCALE_STEPS.length; i += 1) {
    const step = SCALE_STEPS[i];
    out[`--${prefix}-${step}`] = solid[i];
    out[`--${prefix}-a${step}`] = alpha[i];
  }
  return out;
}

/**
 * Returns only the vars that vary with theme settings: the gray + accent
 * scales, the accessible accent-foreground, and the legacy `--neutral-*`
 * scale. The frozen chromatic scales (blue/green/amber/red), semantic
 * tokens, and legacy aliases are invariant and baked into `:root {}` in
 * `app/globals.css` — re-emitting them on every theme update is wasted
 * DOM work.
 */
export function resolveDynamicThemeVars(
  theme: ThemeSettings,
  appearance: ThemeAppearance,
): ThemeCssVars {
  const palette = getNeutralPalette(theme.neutral, appearance);
  const accentHex = getAccentColor(theme.accent);
  const accentForeground = getAccessibleAccentForeground(accentHex);

  const graySolid = generateSolidScale(getPaletteSeed(palette), appearance, {
    anchorBrandStep: false,
  });
  const grayAlpha = deriveAlphaScale(graySolid);
  const grayVars = emitChromaticScaleVars("gray", graySolid, grayAlpha);

  const accentSet = generateChromaticScaleSet(accentHex);
  const accentScale = accentSet[appearance as BaseAppearance];
  const accentVars = emitChromaticScaleVars(
    "accent",
    accentScale.solid,
    accentScale.alpha,
  );

  const legacyNeutralVars = Object.fromEntries(
    NEUTRAL_SCALE_STEPS.map((step) => [`--neutral-${step}`, palette.scale[step]]),
  ) as ThemeCssVars;

  const radiusPreset = getRadiusPreset(theme.radius.presetId);

  return {
    ...legacyNeutralVars,
    ...grayVars,
    ...accentVars,
    "--accent-foreground": accentForeground,
    "--font-sans": resolveFontFamily(theme.font),
    "--radius": radiusPreset.component,
    "--radius-window": radiusPreset.window,
  };
}

/**
 * Returns the complete set of theme CSS vars — dynamic + frozen chromatic
 * scales + semantic tokens + legacy aliases. Used by design-system previews
 * and tests that need a full snapshot. The runtime applier should prefer
 * `resolveDynamicThemeVars` (see `applyThemeCssVars`).
 */
export function resolveThemeCssVars(
  theme: ThemeSettings,
  systemAppearance: ThemeAppearance = "dark",
): ThemeCssVars {
  const appearance = resolveThemeAppearance(theme, systemAppearance);
  const dynamic = resolveDynamicThemeVars(theme, appearance);

  const chromaticVars: ThemeCssVars = {};
  for (const id of BASE_COLOR_IDS) {
    const scale = BASE_SCALES[id][appearance as BaseAppearance];
    Object.assign(
      chromaticVars,
      emitChromaticScaleVars(id, scale.solid, scale.alpha),
    );
  }

  return {
    ...dynamic,
    ...chromaticVars,
    ...SEMANTIC_TOKENS,
    ...LEGACY_ALIASES,
  };
}

export function applyThemeCssVars(
  target: HTMLElement,
  theme: ThemeSettings,
  systemAppearance: ThemeAppearance = "dark",
) {
  const appearance = resolveThemeAppearance(theme, systemAppearance);
  const cssVars = resolveThemeCssVars(theme, systemAppearance);
  for (const [name, value] of Object.entries(cssVars)) {
    target.style.setProperty(name, value);
  }
  target.style.colorScheme = appearance;
  target.dataset.themeMode = theme.mode;
  target.dataset.themeAppearance = appearance;
}
