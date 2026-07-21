"use client";

import { useEffect, useState } from "react";

import { DsSection } from "@/components/showcase/components/ds-section";
import { DsShowcase } from "@/components/showcase/components/ds-showcase";
import { useSettings } from "@/lib/theme/use-theme";
import {
  FONT_PRESETS,
  getFontPreset,
} from "@/lib/theme/theme-customization";

const TYPE_SCALE = [
  { label: "3xl (30px)", className: "type-3xl" },
  { label: "2xl (24px)", className: "type-2xl" },
  { label: "xl (20px)", className: "type-xl" },
  { label: "lg (18px)", className: "type-lg" },
  { label: "base (16px)", className: "type-base" },
  { label: "sm (14px)", className: "type-sm" },
  { label: "xs (12px)", className: "type-xs" },
  { label: "2xs (10px)", className: "type-2xs" },
];

const FONT_STYLES = [
  { label: "H1", size: "30px", className: "type-3xl" },
  { label: "H2", size: "24px", className: "type-2xl" },
  { label: "H3", size: "20px", className: "type-xl" },
  { label: "H4", size: "18px", className: "type-lg" },
  { label: "H5", size: "16px", className: "type-base" },
  { label: "H6", size: "14px", className: "type-sm" },
  { label: "Body", size: "16px", className: "type-base" },
  { label: "Small", size: "14px", className: "type-sm" },
  { label: "Caption", size: "12px", className: "type-xs" },
  { label: "Helper", size: "10px", className: "type-2xs" },
];

const FONT_WEIGHTS = [
  { label: "Normal (400)", className: "font-normal" },
  { label: "Medium (500)", className: "font-medium" },
  { label: "Semibold (600)", className: "font-semibold" },
  { label: "Bold (700)", className: "font-bold" },
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
      className="rounded-md border border-subtle bg-gray-a2 px-2 py-1 type-xs text-secondary transition-colors hover:border-default hover:text-primary"
    >
      {copied ? "Copied!" : token}
    </button>
  );
}

export function TypographyPage() {
  const { theme } = useSettings();
  const activePreset = getFontPreset(theme.font.presetId);
  const resolvedFontSans = useResolvedCssVar("--font-sans", [theme.font.presetId]);

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Typography
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-secondary">
          Two-tier font tokens. Tier 1 exposes each loaded Google Font. Tier 2{" "}
          <code className="type-xs">--font-sans</code> applies the
          selected preset across every surface. Code and data inherit the same
          shared type scale, with tabular figures where alignment matters.
        </p>
      </div>

      <DsSection
        title="Active font · live"
        description="The Tier-2 semantic token that drives every surface. Updates instantly when the font dimension changes in the theme panel."
      >
        <div className="space-y-3 rounded-window border border-subtle bg-gray-a2 p-5">
          <div className="flex items-baseline gap-3">
            <span className="type-xs text-secondary">
              Selected
            </span>
            <span className="type-xl text-primary">
              {activePreset.label}
            </span>
          </div>
          <div className="space-y-1">
            <div className="type-xs text-secondary">
              --font-sans
            </div>
            <code className="block break-all type-xs text-primary">
              {resolvedFontSans || `${activePreset.cssVar}, ${activePreset.fallback}`}
            </code>
          </div>
        </div>
      </DsSection>

      <DsSection
        title="Font presets"
        description="Loaded at build time via next/font/google. Select a preset in the theme panel to apply it across every surface."
      >
        <div className="space-y-3">
          {FONT_PRESETS.map((preset) => {
            const isActive = preset.id === theme.font.presetId;
            return (
              <div
                key={preset.id}
                className={`flex flex-col gap-3 rounded-window border px-5 py-4 transition-colors md:flex-row md:items-center ${
                  isActive
                    ? "border-accent bg-accent/5"
                    : "border-subtle bg-surface/60"
                }`}
              >
                <div
                  className="flex size-16 shrink-0 items-center justify-center rounded-lg border border-subtle bg-gray-a2 text-3xl text-primary"
                  aria-hidden
                >
                  Aa
                </div>
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-base font-medium text-primary">
                      {preset.label}
                    </h3>
                    {isActive ? (
                      <span className="type-2xs text-accent">
                        Active
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm text-secondary">
                    The quick brown fox jumps over the lazy dog. 0123456789.
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <CopyableToken token={preset.cssVar} />
                    <span className="type-2xs text-tertiary">
                      fallback
                    </span>
                    <code className="type-xs text-secondary">
                      {preset.fallback}
                    </code>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </DsSection>

      <DsSection
        title="Token reference"
        description="CSS custom properties on <html>. Tier-1 base variables are injected by next/font; Tier-2 --font-sans is emitted by resolveThemeCssVars."
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="type-xs text-secondary">
              Tier 1 · Base (one per loaded font)
            </h3>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {FONT_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  className="flex items-center justify-between rounded-lg border border-subtle bg-surface/70 px-3 py-2"
                >
                  <code className="type-xs text-secondary">
                    {preset.cssVar.slice(4, -1)}
                  </code>
                  <span className="text-lg text-primary">
                    Aa
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="type-xs text-secondary">
              Tier 2 · Semantic
            </h3>
            <div className="flex items-center justify-between rounded-lg border border-subtle bg-surface/70 px-3 py-2">
              <code className="type-xs text-secondary">
                --font-sans
              </code>
              <span className="text-xs text-tertiary">
                Body / UI chrome. Flips with the theme font selection.
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="type-xs text-secondary">
              One selected family
            </h3>
            <div className="rounded-lg border border-subtle bg-surface/70 px-3 py-2">
              <p className="text-xs text-secondary">
                Code blocks, numeric HUDs, and editor content inherit{" "}
                <code className="type-xs text-primary">--font-sans</code>.
                The type scale, colour, and tabular numerals keep each role
                distinct.
              </p>
            </div>
          </div>
        </div>
      </DsSection>

      <DsSection
        title="Font styles"
        description="Semantic roles mapped to the shared type scale. Every style inherits the active theme font."
      >
        <div className="overflow-hidden rounded-window border border-subtle bg-surface/60">
          {FONT_STYLES.map((style) => (
            <div
              key={style.label}
              className="grid grid-cols-[5rem_minmax(0,1fr)] items-baseline gap-4 border-b border-subtle px-4 py-3 last:border-b-0 md:grid-cols-[7rem_minmax(0,1fr)]"
            >
              <div className="min-w-0">
                <div className="type-xs text-secondary">
                  {style.label} ({style.size})
                </div>
                <code className="type-2xs text-tertiary">
                  {style.className}
                </code>
              </div>
              <p className={`${style.className} min-w-0 text-primary`}>
                The quick brown fox
              </p>
            </div>
          ))}
        </div>
      </DsSection>

      <DsSection
        title="Type scale"
        description="The shared type scale. Every entry resolves its font-family through --font-sans."
      >
        <div className="space-y-1">
          {TYPE_SCALE.map((entry) => (
            <div
              key={entry.label}
              className="flex items-baseline gap-4 rounded-lg px-3 py-2 hover:bg-gray-a2"
            >
              <span className="w-32 shrink-0 type-xs text-secondary">
                {entry.label}
              </span>
              <span className={`text-primary ${entry.className}`}>
                The quick brown fox
              </span>
            </div>
          ))}
        </div>
      </DsSection>

      <DsSection title="Font weights" description="Available weight variants.">
        <DsShowcase>
          <div className="flex flex-col gap-3">
            {FONT_WEIGHTS.map((weight) => (
              <div key={weight.label} className="flex items-baseline gap-4">
                <span className="w-36 shrink-0 type-xs text-secondary">
                  {weight.label}
                </span>
                <span className={`text-base text-primary ${weight.className}`}>
                  RemOS UI
                </span>
              </div>
            ))}
          </div>
        </DsShowcase>
      </DsSection>
    </div>
  );
}
