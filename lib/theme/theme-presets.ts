import {
  getAccentColor,
  type ThemeAccent,
  type ThemeAppearance,
  type ThemeSettings,
} from "@/lib/theme/theme-customization";

export const THEME_LOOK_PRESET_IDS = [
  "velvet-folio",
  "carbon-hour",
  "cold-front",
  "north-atlantic",
  "ember-grove",
  "smoked-oak",
  "dusk-watch",
  "morning-press",
  "white-cube",
  "first-blush",
  "high-noon",
  "sea-glass",
  "studio-sage",
] as const;

export type ThemeLookPresetId = (typeof THEME_LOOK_PRESET_IDS)[number];

export type ThemeLookPreset = {
  id: ThemeLookPresetId;
  name: string;
  description: string;
  appearance: ThemeAppearance;
  settings: ThemeSettings;
};

function look(
  id: ThemeLookPresetId,
  name: string,
  description: string,
  appearance: ThemeAppearance,
  settings: ThemeSettings,
): ThemeLookPreset {
  return { id, name, description, appearance, settings };
}

export const THEME_LOOK_PRESETS: readonly ThemeLookPreset[] = [
  look(
    "velvet-folio",
    "Velvet Folio",
    "Aubergine dusk, with a heather accent drawn from the same neutrals.",
    "dark",
    {
      mode: "dark",
      accent: { mode: "preset", presetId: "heather" },
      neutral: { darkPaletteId: "velvet", lightPaletteId: "canvas" },
      font: { presetId: "gt-walsheim" },
      radius: { presetId: "md" },
    },
  ),
  look(
    "carbon-hour",
    "Carbon Hour",
    "After-hours charcoal with a cool sky edge.",
    "dark",
    {
      mode: "dark",
      accent: { mode: "preset", presetId: "sky" },
      neutral: { darkPaletteId: "graphite", lightPaletteId: "canvas" },
      font: { presetId: "inter" },
      radius: { presetId: "sm" },
    },
  ),
  look(
    "cold-front",
    "Cold Front",
    "Steel surfaces, terminal type, a cyan signal.",
    "dark",
    {
      mode: "dark",
      accent: { mode: "preset", presetId: "ocean" },
      neutral: { darkPaletteId: "slate", lightPaletteId: "harbor" },
      font: { presetId: "ubuntu-sans-mono" },
      radius: { presetId: "sm" },
    },
  ),
  look(
    "north-atlantic",
    "North Atlantic",
    "Deep navy with a violet current.",
    "dark",
    {
      mode: "dark",
      accent: { mode: "preset", presetId: "violet" },
      neutral: { darkPaletteId: "midnight", lightPaletteId: "canvas" },
      font: { presetId: "figtree" },
      radius: { presetId: "md" },
    },
  ),
  look(
    "ember-grove",
    "Ember Grove",
    "Muted pine with a warm coral spark.",
    "dark",
    {
      mode: "dark",
      accent: { mode: "preset", presetId: "coral" },
      neutral: { darkPaletteId: "forest", lightPaletteId: "paper" },
      font: { presetId: "inter" },
      radius: { presetId: "md" },
    },
  ),
  look(
    "smoked-oak",
    "Smoked Oak",
    "Umber walls and editorial serif, lit by amber.",
    "dark",
    {
      mode: "dark",
      accent: { mode: "preset", presetId: "amber" },
      neutral: { darkPaletteId: "sepia", lightPaletteId: "dune" },
      font: { presetId: "eb-garamond" },
      radius: { presetId: "lg" },
    },
  ),
  look(
    "dusk-watch",
    "Dusk Watch",
    "Blue-gray dusk with a pale sky accent.",
    "dark",
    {
      mode: "dark",
      accent: { mode: "preset", presetId: "sky" },
      neutral: { darkPaletteId: "storm", lightPaletteId: "harbor" },
      font: { presetId: "inter" },
      radius: { presetId: "md" },
    },
  ),
  look(
    "morning-press",
    "Morning Press",
    "Parchment pages, coral ink — the default RemOS light look.",
    "light",
    {
      mode: "light",
      accent: { mode: "preset", presetId: "coral" },
      neutral: { darkPaletteId: "forest", lightPaletteId: "paper" },
      font: { presetId: "inter" },
      radius: { presetId: "md" },
    },
  ),
  look(
    "white-cube",
    "White Cube",
    "Gallery white, tight corners, a sky-blue wall label.",
    "light",
    {
      mode: "light",
      accent: { mode: "preset", presetId: "sky" },
      neutral: { darkPaletteId: "graphite", lightPaletteId: "canvas" },
      font: { presetId: "inter" },
      radius: { presetId: "sm" },
    },
  ),
  look(
    "first-blush",
    "First Blush",
    "Warm blush surfaces, rose accent, fully rounded.",
    "light",
    {
      mode: "light",
      accent: { mode: "preset", presetId: "rose" },
      neutral: { darkPaletteId: "sepia", lightPaletteId: "bloom" },
      font: { presetId: "figtree" },
      radius: { presetId: "full" },
    },
  ),
  look(
    "high-noon",
    "High Noon",
    "Sun-washed sand, editorial serif, amber heat.",
    "light",
    {
      mode: "light",
      accent: { mode: "preset", presetId: "amber" },
      neutral: { darkPaletteId: "sepia", lightPaletteId: "dune" },
      font: { presetId: "eb-garamond" },
      radius: { presetId: "lg" },
    },
  ),
  look(
    "sea-glass",
    "Sea Glass",
    "Dockside blues with a clear ocean accent.",
    "light",
    {
      mode: "light",
      accent: { mode: "preset", presetId: "ocean" },
      neutral: { darkPaletteId: "storm", lightPaletteId: "harbor" },
      font: { presetId: "inter" },
      radius: { presetId: "md" },
    },
  ),
  look(
    "studio-sage",
    "Studio Sage",
    "Soft sage walls, mint trim, a working studio.",
    "light",
    {
      mode: "light",
      accent: { mode: "preset", presetId: "mint" },
      neutral: { darkPaletteId: "forest", lightPaletteId: "atelier" },
      font: { presetId: "figtree" },
      radius: { presetId: "md" },
    },
  ),
];

function accentsEqual(a: ThemeAccent, b: ThemeAccent): boolean {
  if (a.mode === "preset" && b.mode === "preset") {
    return a.presetId === b.presetId;
  }
  if (a.mode === "custom" && b.mode === "custom") {
    return a.color === b.color;
  }
  return false;
}

export function themesMatchPreset(
  theme: ThemeSettings,
  preset: ThemeLookPreset,
): boolean {
  const { settings } = preset;
  return (
    theme.mode === settings.mode &&
    accentsEqual(theme.accent, settings.accent) &&
    theme.neutral.darkPaletteId === settings.neutral.darkPaletteId &&
    theme.neutral.lightPaletteId === settings.neutral.lightPaletteId &&
    theme.font.presetId === settings.font.presetId &&
    theme.radius.presetId === settings.radius.presetId
  );
}

export function matchThemeLookPreset(
  theme: ThemeSettings,
): ThemeLookPreset | null {
  return THEME_LOOK_PRESETS.find((preset) => themesMatchPreset(theme, preset)) ?? null;
}

export function getThemeLookPreset(id: ThemeLookPresetId): ThemeLookPreset {
  return (
    THEME_LOOK_PRESETS.find((preset) => preset.id === id) ?? THEME_LOOK_PRESETS[0]
  );
}

export function getThemeLookPresetSwatch(preset: ThemeLookPreset): string {
  return getAccentColor(preset.settings.accent);
}
