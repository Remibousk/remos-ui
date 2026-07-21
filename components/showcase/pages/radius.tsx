"use client";

import { useEffect, useState } from "react";

import { DsSection } from "@/components/showcase/components/ds-section";
import { ButtonGroup } from "@/components/ui/button-group";
import { setTheme } from "@/lib/theme/use-theme";
import { useSettings } from "@/lib/theme/use-theme";
import {
  RADIUS_PRESETS,
  getRadiusPreset,
  type RadiusPresetId,
} from "@/lib/theme/theme-customization";

type ScaleStepId = RadiusPresetId;

type ScaleRow = {
  id: ScaleStepId;
  label: string;
  /** Visual preview utility that always renders this step, regardless of preset. */
  utility: string;
  /** Tier-1 CSS var (always resolves to the same value regardless of preset). */
  cssVar: string;
  /** The fixed pixel value this step resolves to. */
  fixedValue: string;
};

const COMPONENT_SCALE: readonly ScaleRow[] = [
  { id: "none", label: "None", utility: "rounded-none", cssVar: "--radius-none", fixedValue: "0px" },
  { id: "sm", label: "Small", utility: "rounded-sm", cssVar: "--radius-sm", fixedValue: "4px" },
  { id: "md", label: "Medium", utility: "rounded-md", cssVar: "--radius-md", fixedValue: "8px" },
  { id: "lg", label: "Large", utility: "rounded-lg", cssVar: "--radius-lg", fixedValue: "10px" },
  { id: "full", label: "Full", utility: "rounded-full", cssVar: "--radius-full", fixedValue: "9999px" },
];

const WINDOW_SCALE: readonly ScaleRow[] = [
  { id: "none", label: "None", utility: "rounded-window-none", cssVar: "--radius-window-none", fixedValue: "0px" },
  { id: "sm", label: "Small", utility: "rounded-window-sm", cssVar: "--radius-window-sm", fixedValue: "8px" },
  { id: "md", label: "Medium", utility: "rounded-window-md", cssVar: "--radius-window-md", fixedValue: "12px" },
  { id: "lg", label: "Large", utility: "rounded-window-lg", cssVar: "--radius-window-lg", fixedValue: "16px" },
  { id: "full", label: "Full", utility: "rounded-window-full", cssVar: "--radius-window-full", fixedValue: "24px" },
];

function useResolvedCssVar(name: string, deps: unknown[]): string {
  const [value, setValue] = useState("");
  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    // Reading a resolved CSS variable back from the DOM after paint is a
    // deliberate external-system sync, re-run when the theme deps change.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(style.getPropertyValue(name).trim());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, ...deps]);
  return value;
}

function CopyableToken({ token }: { token: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <button
      onClick={copy}
      className="rounded-sm border border-subtle bg-gray-a2 px-2 py-1 type-xs text-secondary transition-colors hover:border-default hover:text-primary"
    >
      {copied ? "Copied!" : token}
    </button>
  );
}

function ScaleCard({ row }: { row: ScaleRow }) {
  return (
    <div className="flex flex-col items-start gap-3 border border-subtle bg-surface/60 p-4 rounded-window">
      <div
        className={`h-20 w-full border border-subtle bg-accent-solid/20 ${row.utility}`}
      />
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium text-primary">{row.label}</span>
          <span className="type-xs text-secondary">
            {row.fixedValue}
          </span>
        </div>
        <code className="type-xs text-tertiary">
          {row.utility}
        </code>
        <CopyableToken token={`var(${row.cssVar})`} />
      </div>
    </div>
  );
}

export function RadiusPage() {
  const { theme } = useSettings();
  const activePreset = getRadiusPreset(theme.radius.presetId);
  const resolvedRadius = useResolvedCssVar("--radius", [theme.radius.presetId]);
  const resolvedWindowRadius = useResolvedCssVar("--radius-window", [
    theme.radius.presetId,
  ]);

  function handlePresetChange(presetId: RadiusPresetId) {
    setTheme({ ...theme, radius: { presetId } });
  }

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Radius
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-secondary">
          Two-tier radius system. Tier-1 exposes a fixed 5-step scale{" "}
          (<code className="type-xs">rounded-none</code> …{" "}
          <code className="type-xs">rounded-full</code>) with a
          parallel window scale. Tier-2{" "}
          <code className="type-xs">--radius</code> and{" "}
          <code className="type-xs">--radius-window</code> are
          driven by the user-selectable Radius preset in the theme panel — components
          that use bare <code className="type-xs">rounded</code> or{" "}
          <code className="type-xs">rounded-window</code> follow
          that preference, while the Tier-1 steps stay pinned to their
          fixed values regardless.
        </p>
      </div>

      <DsSection
        title="Active preset · live"
        description="Switch presets here to re-skin the whole UI in place — every window frame, button, and surface using bare `rounded` or `rounded-window` updates instantly."
      >
        <div className="flex flex-col gap-5 border border-subtle bg-gray-a2 p-5 rounded-window">
          <ButtonGroup<RadiusPresetId>
            ariaLabel="Radius preset"
            value={activePreset.id}
            onChange={handlePresetChange}
            options={RADIUS_PRESETS.map((preset) => ({
              value: preset.id,
              label: preset.label,
            }))}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="type-xs text-secondary">
                --radius · components
              </div>
              <div className="h-20 rounded border border-subtle bg-accent-solid/20 transition-[border-radius] duration-200" />
              <div className="type-xs text-primary">
                {resolvedRadius || activePreset.component}
              </div>
            </div>
            <div className="space-y-2">
              <div className="type-xs text-secondary">
                --radius-window · windows
              </div>
              <div className="h-20 rounded-window border border-subtle bg-accent-solid/20 transition-[border-radius] duration-200" />
              <div className="type-xs text-primary">
                {resolvedWindowRadius || activePreset.window}
              </div>
            </div>
          </div>
        </div>
      </DsSection>

      <DsSection
        title="Component scale · Tier 1"
        description="Fixed 5-step scale. Always available — components that need a specific corner radius regardless of the active preset should reach for these utilities."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {COMPONENT_SCALE.map((row) => (
            <ScaleCard key={row.id} row={row} />
          ))}
        </div>
      </DsSection>

      <DsSection
        title="Window scale · Tier 1"
        description="Paired window-chrome scale. Every preset in the component scale has a corresponding window value — a softer window always goes with softer controls."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {WINDOW_SCALE.map((row) => (
            <ScaleCard key={row.id} row={row} />
          ))}
        </div>
      </DsSection>

      <DsSection
        title="Presets"
        description="Mapping from the user-selectable preset to the active Tier-2 values. The current selection is highlighted."
      >
        <div className="overflow-hidden rounded-window border border-subtle">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-a2 text-left type-xs text-secondary">
              <tr>
                <th className="px-4 py-2 font-semibold">Preset</th>
                <th className="px-4 py-2 font-semibold">--radius</th>
                <th className="px-4 py-2 font-semibold">--radius-window</th>
                <th className="px-4 py-2 font-semibold">Preview</th>
              </tr>
            </thead>
            <tbody>
              {RADIUS_PRESETS.map((preset) => {
                const isActive = preset.id === activePreset.id;
                return (
                  <tr
                    key={preset.id}
                    className={`border-t border-subtle ${
                      isActive ? "bg-accent-bg" : "hover:bg-gray-a2"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-baseline gap-2">
                        <span className="font-medium text-primary">
                          {preset.label}
                        </span>
                        {isActive ? (
                          <span className="type-2xs text-accent">
                            Active
                          </span>
                        ) : null}
                      </div>
                      <div className="type-2xs text-tertiary">
                        {preset.id}
                      </div>
                    </td>
                    <td className="px-4 py-3 type-xs text-secondary">
                      {preset.component}
                    </td>
                    <td className="px-4 py-3 type-xs text-secondary">
                      {preset.window}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span
                          className="inline-block size-8 border border-subtle bg-accent-solid/25"
                          style={{ borderRadius: preset.component }}
                          aria-label="Component preview"
                        />
                        <span
                          className="inline-block size-8 border border-subtle bg-accent-solid/25"
                          style={{ borderRadius: preset.window }}
                          aria-label="Window preview"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </DsSection>

      <DsSection
        title="Token reference"
        description="CSS custom properties on :root. Tier-1 vars are fixed; Tier-2 vars are emitted by resolveDynamicThemeVars and track the user's preset."
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="type-xs text-secondary">
              Tier 1 · Component scale (fixed)
            </h3>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {COMPONENT_SCALE.map((row) => (
                <TokenRow key={row.id} cssVar={row.cssVar} value={row.fixedValue} />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="type-xs text-secondary">
              Tier 1 · Window scale (fixed)
            </h3>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {WINDOW_SCALE.map((row) => (
                <TokenRow key={row.id} cssVar={row.cssVar} value={row.fixedValue} />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="type-xs text-secondary">
              Tier 2 · Semantic (preset-driven)
            </h3>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <TokenRow cssVar="--radius" value={activePreset.component} note="Body / UI chrome — follows preset" />
              <TokenRow cssVar="--radius-window" value={activePreset.window} note="Window frames — follows preset" />
            </div>
          </div>
        </div>
      </DsSection>

      <DsSection
        title="Usage guide"
        description="When to reach for which utility."
      >
        <div className="overflow-hidden rounded-window border border-subtle">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-a2 text-left type-xs text-secondary">
              <tr>
                <th className="px-4 py-2 font-semibold">Intent</th>
                <th className="px-4 py-2 font-semibold">Utility</th>
              </tr>
            </thead>
            <tbody>
              {USAGE_ROWS.map((row) => (
                <tr key={row.intent} className="border-t border-subtle">
                  <td className="px-4 py-3 text-secondary">{row.intent}</td>
                  <td className="px-4 py-3 type-xs text-primary">
                    {row.utility}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-secondary">
          <strong className="text-primary">Escape hatches.</strong> Genuine shape
          effects — organic blob morphs (<code>rounded-[38%]</code>) or a scrollbar
          thumb&apos;s <code>999px</code> pill — sit outside the token system on
          purpose. They&apos;re shapes, not corner radii, so they shouldn&apos;t
          track the preset.
        </p>
      </DsSection>
    </div>
  );
}

function TokenRow({
  cssVar,
  value,
  note,
}: {
  cssVar: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-window border border-subtle bg-surface/70 px-3 py-2">
      <div className="flex min-w-0 items-baseline gap-3">
        <code className="type-xs text-secondary">{cssVar}</code>
        {note ? (
          <span className="truncate text-[11px] text-tertiary">{note}</span>
        ) : null}
      </div>
      <code className="type-xs text-primary tabular-nums">
        {value}
      </code>
    </div>
  );
}

const USAGE_ROWS: readonly { intent: string; utility: string }[] = [
  {
    intent: "Follow the user's radius preset (default for most components)",
    utility: "rounded",
  },
  {
    intent: "Window frames / titlebars",
    utility: "rounded-window",
  },
  {
    intent: "Genuinely circular — avatars, switch thumbs, color dots",
    utility: "rounded-full",
  },
  {
    intent: "Intentionally sharp — grid cells, segmented controls",
    utility: "rounded-none",
  },
  {
    intent: "Fixed size regardless of preset — inline code chip, tag pill",
    utility: "rounded-sm | rounded-md | rounded-lg",
  },
];
