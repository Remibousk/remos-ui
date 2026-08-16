"use client";

import { DsSection } from "@/components/showcase/components/ds-section";
import { setTheme, useSettings } from "@/lib/theme/use-theme";
import {
  getFontPreset,
  getNeutralPalette,
  getNeutralSurfaces,
  getRadiusPreset,
} from "@/lib/theme/theme-customization";
import {
  THEME_LOOK_PRESETS,
  getThemeLookPresetSwatch,
  matchThemeLookPreset,
  type ThemeLookPreset,
} from "@/lib/theme/theme-presets";
import { cn } from "@/lib/utils";

const DARK_PRESETS = THEME_LOOK_PRESETS.filter(
  (preset) => preset.appearance === "dark",
);
const LIGHT_PRESETS = THEME_LOOK_PRESETS.filter(
  (preset) => preset.appearance === "light",
);

export function PresetsPage() {
  const { theme } = useSettings();
  const active = matchThemeLookPreset(theme);

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Presets
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-secondary">
          Named looks that apply mode, accent, background, font, and radius
          together. Pick one here or from the theme panel. Tweaking any
          dimension after that leaves the current mix as Custom.
        </p>
      </div>

      <DsSection
        title="Dark"
        description="Night looks. Velvet Folio is the remibousk.com rebuild."
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {DARK_PRESETS.map((preset) => (
            <PresetCard
              key={preset.id}
              preset={preset}
              active={active?.id === preset.id}
              onSelect={() => setTheme(preset.settings)}
            />
          ))}
        </div>
      </DsSection>

      <DsSection title="Light" description="Day looks, one for each light palette.">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {LIGHT_PRESETS.map((preset) => (
            <PresetCard
              key={preset.id}
              preset={preset}
              active={active?.id === preset.id}
              onSelect={() => setTheme(preset.settings)}
            />
          ))}
        </div>
      </DsSection>
    </div>
  );
}

function PresetCard({
  preset,
  active,
  onSelect,
}: {
  preset: ThemeLookPreset;
  active: boolean;
  onSelect: () => void;
}) {
  const palette = getNeutralPalette(preset.settings.neutral, preset.appearance);
  const surfaces = getNeutralSurfaces(palette);
  const accent = getThemeLookPresetSwatch(preset);
  const font = getFontPreset(preset.settings.font.presetId);
  const radius = getRadiusPreset(preset.settings.radius.presetId);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex flex-col overflow-hidden rounded-window border text-left transition-colors",
        active
          ? "border-accent bg-accent/5"
          : "border-subtle bg-surface/60 hover:border-accent/60 hover:bg-gray-a3",
      )}
    >
      <div
        className="relative h-20 overflow-hidden"
        style={{ background: surfaces.desktop }}
      >
        <div
          className="absolute inset-x-4 top-4 h-14 border"
          style={{
            background: surfaces.window,
            borderColor: surfaces.windowBorderStrong,
            borderRadius: radius.window,
          }}
        >
          <div
            className="absolute left-3 top-2.5 h-1.5 w-10 rounded-full"
            style={{ background: surfaces.windowForeground, opacity: 0.85 }}
          />
          <div
            className="absolute left-3 top-5 h-1 w-16 rounded-full"
            style={{ background: surfaces.windowMuted, opacity: 0.7 }}
          />
          <div
            className="absolute bottom-2.5 right-2.5 size-4"
            style={{
              background: accent,
              borderRadius: radius.component,
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5 px-4 py-3">
        <div className="flex items-baseline gap-2">
          <h3
            className="text-sm font-medium text-primary"
            style={{ fontFamily: `${font.cssVar}, ${font.fallback}` }}
          >
            {preset.name}
          </h3>
          {active ? (
            <span className="type-2xs text-accent">Active</span>
          ) : null}
        </div>
        <p className="text-xs leading-relaxed text-secondary">
          {preset.description}
        </p>
        <p className="type-2xs text-tertiary">
          {palette.label} · {font.label} · {radius.label}
        </p>
      </div>
    </button>
  );
}
