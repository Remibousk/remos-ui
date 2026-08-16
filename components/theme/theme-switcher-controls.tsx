"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  setTheme,
  useResolvedThemeAppearance,
  useSettings,
} from "@/lib/theme/use-theme";
import {
  ACCENT_PRESETS,
  FONT_PRESETS,
  RADIUS_PRESETS,
  getAccentColor,
  getAccentPreset,
  getFontPreset,
  getNeutralPalette,
  getNeutralPalettes,
  getNeutralSurfaces,
  getNeutralSwatchColor,
  getRadiusPreset,
  type AccentPresetId,
  type DarkNeutralPaletteId,
  type FontPresetId,
  type LightNeutralPaletteId,
  type RadiusPresetId,
  type ThemeMode,
} from "@/lib/theme/theme-customization";
import {
  THEME_LOOK_PRESETS,
  getThemeLookPreset,
  getThemeLookPresetSwatch,
  matchThemeLookPreset,
  type ThemeLookPresetId,
} from "@/lib/theme/theme-presets";
import { cn } from "@/lib/utils";

export type ThemeDotSwatch = string | { light: string; dark: string };

export type ThemeSwitcherOption = {
  value: string;
  label: string;
  swatch: ThemeDotSwatch;
  fontGlyph?: boolean;
  borderRadius?: string;
  group?: string;
};

export type ThemeSwitcherControl = {
  id: "preset" | "mode" | "accent" | "background" | "font" | "radius";
  label: string;
  selectedLabel: string;
  value: string;
  swatch: ThemeDotSwatch;
  fontGlyph?: boolean;
  borderRadius?: string;
  options: ThemeSwitcherOption[];
  onChange: (value: string) => void;
};

export type ThemeSwitcherSummary = Record<
  ThemeSwitcherControl["id"],
  Pick<ThemeSwitcherControl, "selectedLabel" | "swatch" | "fontGlyph" | "borderRadius">
>;

export const THEME_DOT_TRANSITION = {
  type: "spring" as const,
  stiffness: 420,
  damping: 36,
};

const MODE_OPTIONS: Array<{ value: ThemeMode; label: string }> = [
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
  { value: "system", label: "System" },
];

// Proportional radii for the 12px dropdown glyph. Using the real token values
// on a 12px square would collapse nearby presets into the same visual circle.
const RADIUS_GLYPH_RADIUS: Record<RadiusPresetId, string> = {
  none: "0px",
  sm: "1.5px",
  md: "3px",
  lg: "4.5px",
  full: "9999px",
};

function buildModeSwatches(
  neutral: Parameters<typeof getNeutralPalette>[0],
): Record<ThemeMode, ThemeDotSwatch> {
  const dark = getNeutralSurfaces(getNeutralPalette(neutral, "dark")).background;
  const light = getNeutralSurfaces(getNeutralPalette(neutral, "light")).background;
  return {
    dark,
    light,
    system: { light, dark },
  };
}

export function useThemeSwitcherControls(): {
  summary: ThemeSwitcherSummary;
  controls: ThemeSwitcherControl[];
} {
  const { theme } = useSettings();
  const resolvedAppearance = useResolvedThemeAppearance(theme.mode);

  const modeSwatches = buildModeSwatches(theme.neutral);
  const modeSwatch = modeSwatches[theme.mode];
  const modeLabel =
    MODE_OPTIONS.find((option) => option.value === theme.mode)?.label ?? "Dark";

  const accentSwatch = getAccentColor(theme.accent);
  const accentLabel =
    theme.accent.mode === "custom"
      ? "Custom"
      : getAccentPreset(theme.accent.presetId).label;

  const neutralPalette = getNeutralPalette(theme.neutral, resolvedAppearance);
  const neutralSwatch = getNeutralSwatchColor(neutralPalette);
  const neutralLabel = neutralPalette.label;

  const neutralOptions = getNeutralPalettes(resolvedAppearance).map((palette) => ({
    value: palette.id,
    label: palette.label,
    swatch: getNeutralSwatchColor(palette),
  }));

  const fontPreset = getFontPreset(theme.font.presetId);
  const fontLabel = fontPreset.label;

  const radiusPreset = getRadiusPreset(theme.radius.presetId);
  const radiusLabel = radiusPreset.label;
  const radiusGlyph = RADIUS_GLYPH_RADIUS[radiusPreset.id];

  const matchedLook = matchThemeLookPreset(theme);
  const presetLabel = matchedLook?.name ?? "Custom";
  const presetSwatch = matchedLook
    ? getThemeLookPresetSwatch(matchedLook)
    : accentSwatch;

  const controls: ThemeSwitcherControl[] = [
    {
      id: "preset",
      label: "Preset",
      selectedLabel: presetLabel,
      value: matchedLook?.id ?? "",
      swatch: presetSwatch,
      onChange: (value) => {
        setTheme(getThemeLookPreset(value as ThemeLookPresetId).settings);
      },
      options: THEME_LOOK_PRESETS.map((preset) => ({
        value: preset.id,
        label: preset.name,
        swatch: getThemeLookPresetSwatch(preset),
        group: preset.appearance === "dark" ? "Dark" : "Light",
      })),
    },
    {
      id: "mode",
      label: "Mode",
      selectedLabel: modeLabel,
      value: theme.mode,
      swatch: modeSwatch,
      onChange: (value) => {
        setTheme({ ...theme, mode: value as ThemeMode });
      },
      options: MODE_OPTIONS.map((option) => ({
        value: option.value,
        label: option.label,
        swatch: modeSwatches[option.value],
      })),
    },
    {
      id: "accent",
      label: "Accent",
      selectedLabel: accentLabel,
      value: theme.accent.mode === "preset" ? theme.accent.presetId : "",
      swatch: accentSwatch,
      onChange: (value) => {
        setTheme({
          ...theme,
          accent: { mode: "preset", presetId: value as AccentPresetId },
        });
      },
      options: ACCENT_PRESETS.map((preset) => ({
        value: preset.id,
        label: preset.label,
        swatch: preset.color,
      })),
    },
    {
      id: "background",
      label: "Background",
      selectedLabel: neutralLabel,
      value:
        resolvedAppearance === "dark"
          ? theme.neutral.darkPaletteId
          : theme.neutral.lightPaletteId,
      swatch: neutralSwatch,
      onChange: (value) => {
        setTheme({
          ...theme,
          neutral:
            resolvedAppearance === "dark"
              ? { ...theme.neutral, darkPaletteId: value as DarkNeutralPaletteId }
              : {
                  ...theme.neutral,
                  lightPaletteId: value as LightNeutralPaletteId,
                },
        });
      },
      options: neutralOptions,
    },
    {
      id: "font",
      label: "Font",
      selectedLabel: fontLabel,
      value: theme.font.presetId,
      swatch: "transparent",
      fontGlyph: true,
      onChange: (value) => {
        setTheme({ ...theme, font: { presetId: value as FontPresetId } });
      },
      options: FONT_PRESETS.map((preset) => ({
        value: preset.id,
        label: preset.label,
        swatch: "transparent",
        fontGlyph: true,
      })),
    },
    {
      id: "radius",
      label: "Radius",
      selectedLabel: radiusLabel,
      value: theme.radius.presetId,
      swatch: "transparent",
      borderRadius: radiusGlyph,
      onChange: (value) => {
        setTheme({ ...theme, radius: { presetId: value as RadiusPresetId } });
      },
      options: RADIUS_PRESETS.map((preset) => ({
        value: preset.id,
        label: preset.label,
        swatch: "transparent",
        borderRadius: RADIUS_GLYPH_RADIUS[preset.id],
      })),
    },
  ];

  return {
    controls,
    summary: {
      preset: {
        selectedLabel: presetLabel,
        swatch: presetSwatch,
      },
      mode: {
        selectedLabel: modeLabel,
        swatch: modeSwatch,
      },
      accent: {
        selectedLabel: accentLabel,
        swatch: accentSwatch,
      },
      background: {
        selectedLabel: neutralLabel,
        swatch: neutralSwatch,
      },
      font: {
        selectedLabel: fontLabel,
        swatch: "transparent",
        fontGlyph: true,
      },
      radius: {
        selectedLabel: radiusLabel,
        swatch: "transparent",
        borderRadius: radiusGlyph,
      },
    },
  };
}

export function ThemeSwitcherControls({
  controls,
  testIdPrefix,
  dotLayoutIdPrefix,
  className,
  triggerClassName,
  contentClassName,
}: {
  controls: ThemeSwitcherControl[];
  testIdPrefix: string;
  dotLayoutIdPrefix?: string;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
}) {
  return (
    <div className={className}>
      {controls.map((control) => (
        <ThemeSwitcherDropdown
          key={control.id}
          control={control}
          testId={`${testIdPrefix}-${control.id}`}
          dotLayoutId={
            dotLayoutIdPrefix ? `${dotLayoutIdPrefix}-${control.id}` : undefined
          }
          triggerClassName={triggerClassName}
          contentClassName={contentClassName}
        />
      ))}
    </div>
  );
}

function ThemeSwitcherDropdown({
  control,
  testId,
  dotLayoutId,
  triggerClassName,
  contentClassName,
}: {
  control: ThemeSwitcherControl;
  testId: string;
  dotLayoutId?: string;
  triggerClassName?: string;
  contentClassName?: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          data-testid={testId}
          className={cn(
            "flex w-full items-center gap-2 rounded border border-subtle/50 bg-surface/70 px-2 py-1.5 text-left text-[12px] text-primary outline-none transition hover:bg-surface-hover/60 focus-visible:border-accent",
            triggerClassName,
          )}
        >
          <ThemeSwatchDot
            layoutId={dotLayoutId}
            swatch={control.swatch}
            fontGlyph={control.fontGlyph}
            borderRadius={control.borderRadius}
          />
          <span className="truncate">
            {control.selectedLabel}
          </span>
          <ChevronDown
            aria-hidden
            className="ml-auto size-3.5 shrink-0 text-secondary"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={6}
        className={cn("min-w-[180px]", contentClassName)}
      >
        {control.options.map((option, index) => {
          const previous = control.options[index - 1];
          const showSeparator =
            option.group !== undefined &&
            previous !== undefined &&
            option.group !== previous.group;
          return (
            <Fragment key={option.value}>
              {showSeparator ? <DropdownMenuSeparator /> : null}
              <ThemeSwitcherDropdownItem
                option={option}
                selected={option.value === control.value}
                onSelect={() => control.onChange(option.value)}
              />
            </Fragment>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ThemeSwitcherDropdownItem({
  option,
  selected,
  onSelect,
  keepOpenOnSelect = false,
  className,
}: {
  option: ThemeSwitcherOption;
  selected: boolean;
  onSelect: () => void;
  keepOpenOnSelect?: boolean;
  className?: string;
}) {
  return (
    <DropdownMenuItem
      onSelect={(event) => {
        if (keepOpenOnSelect) {
          event.preventDefault();
        }
        onSelect();
      }}
      className={cn("justify-between text-[12px]", className)}
    >
      <span className="flex items-center gap-2">
        <ThemeSwatchDot
          swatch={option.swatch}
          fontGlyph={option.fontGlyph}
          borderRadius={option.borderRadius}
        />
        <span>{option.label}</span>
      </span>
      {selected ? <Check aria-hidden className="size-3.5 text-accent" /> : null}
    </DropdownMenuItem>
  );
}

export function ThemeSwatchDot({
  layoutId,
  swatch,
  fontGlyph,
  borderRadius,
}: {
  layoutId?: string;
  swatch?: ThemeDotSwatch;
  fontGlyph?: boolean;
  borderRadius?: string;
}) {
  if (borderRadius !== undefined) {
    const radiusClassName = "block size-3 shrink-0 border";
    const radiusStyle = {
      background: "var(--bg-desktop)",
      borderColor: "var(--accent-solid)",
      borderRadius,
    };
    if (layoutId) {
      return (
        <motion.span
          layoutId={layoutId}
          transition={THEME_DOT_TRANSITION}
          aria-hidden
          className={radiusClassName}
          style={radiusStyle}
        />
      );
    }
    return <span aria-hidden className={radiusClassName} style={radiusStyle} />;
  }

  if (fontGlyph) {
    const glyphClassName =
      "flex size-3 shrink-0 items-center justify-center text-[9px] leading-none text-primary";
    if (layoutId) {
      return (
        <motion.span
          layoutId={layoutId}
          transition={THEME_DOT_TRANSITION}
          aria-hidden
          className={glyphClassName}
        >
          Aa
        </motion.span>
      );
    }
    return (
      <span aria-hidden className={glyphClassName}>
        Aa
      </span>
    );
  }

  const className =
    "relative block size-3 shrink-0 overflow-hidden rounded-full border border-black/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45)]";
  const isSplit = typeof swatch === "object" && swatch !== null;
  const background = isSplit ? swatch.dark : swatch;
  const content = isSplit ? (
    <span
      aria-hidden
      className="absolute inset-0 block"
      style={{
        background: swatch.light,
        clipPath: "polygon(0 0, 100% 0, 0 100%)",
      }}
    />
  ) : null;

  if (layoutId) {
    return (
      <motion.span
        layoutId={layoutId}
        transition={THEME_DOT_TRANSITION}
        aria-hidden
        className={className}
        style={{ background }}
      >
        {content}
      </motion.span>
    );
  }
  return (
    <span aria-hidden className={className} style={{ background }}>
      {content}
    </span>
  );
}
