"use client";

import { useEffect, useMemo, useState } from "react";

import { DsSection } from "@/components/showcase/components/ds-section";
import {
  useResolvedThemeAppearance,
  useSettings,
} from "@/lib/theme/use-theme";
import {
  BASE_SCALES,
  SCALE_STEPS,
  type ChromaticScale,
  type Scale12,
} from "@/lib/theme/base-scales";
import { cssColorToHex } from "@/lib/theme/css-color";

/* ------------------------------------------------------------------ */
/*  Scale rendering                                                    */
/* ------------------------------------------------------------------ */

type ScaleVariant = "solid" | "alpha";

function isDark(hex: string): boolean {
  const normalized = hex.replace("#", "");
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((c) => c + c)
          .join("")
      : normalized;
  const r = parseInt(expanded.slice(0, 2), 16);
  const g = parseInt(expanded.slice(2, 4), 16);
  const b = parseInt(expanded.slice(4, 6), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 < 140;
}

function ScaleRow({
  label,
  description,
  values,
  variant,
  prefix,
}: {
  label: string;
  description?: string;
  values: readonly string[];
  variant: ScaleVariant;
  prefix: string;
}) {
  const [copied, setCopied] = useState<string | null>(null);

  function copy(token: string) {
    navigator.clipboard.writeText(token);
    setCopied(token);
    setTimeout(() => setCopied(null), 1200);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-baseline gap-3">
        <h3 className="text-sm font-medium text-primary">{label}</h3>
        {description ? (
          <span className="text-xs text-secondary">{description}</span>
        ) : null}
      </div>
      <div className="flex gap-0 overflow-hidden rounded-window">
        {SCALE_STEPS.map((step, i) => {
          const display = values[i] ?? "";
          const tokenName =
            variant === "alpha"
              ? `var(--${prefix}-a${step})`
              : `var(--${prefix}-${step})`;
          const isAlpha = variant === "alpha";
          const bg = isAlpha
            ? `linear-gradient(${display}, ${display}), repeating-conic-gradient(var(--gray-3) 0% 25%, var(--gray-2) 0% 50%) 0 0/8px 8px`
            : undefined;
          const dark =
            variant === "solid" && display ? isDark(display) : true;
          return (
            <button
              key={step}
              onClick={() => copy(tokenName)}
              className="group relative h-16 flex-1 cursor-pointer transition-transform hover:z-10 hover:scale-y-110"
              style={
                isAlpha
                  ? { background: bg }
                  : { backgroundColor: display }
              }
              title={`${prefix}${isAlpha ? "-a" : "-"}${step} — ${display}`}
            >
              <span
                className="absolute inset-0 flex flex-col items-center justify-center type-2xs opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  color: dark
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(0,0,0,0.75)",
                }}
              >
                <span>{step}</span>
                <span className="mt-0.5">
                  {copied === tokenName ? "Copied!" : tokenName.slice(4, -1)}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ChromaticScalePair({
  label,
  prefix,
  scale,
}: {
  label: string;
  prefix: string;
  scale: ChromaticScale;
}) {
  return (
    <div className="space-y-3">
      <ScaleRow
        label={label}
        description="Solid steps"
        values={scale.solid}
        variant="solid"
        prefix={prefix}
      />
      <ScaleRow
        label={`${label} · Alpha`}
        description="Semi-transparent overlays"
        values={scale.alpha}
        variant="alpha"
        prefix={prefix}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Live runtime scales (gray, accent)                                 */
/* ------------------------------------------------------------------ */

function useRuntimeScale(prefix: string, deps: unknown[]): ChromaticScale {
  const [scale, setScale] = useState<ChromaticScale>(() => emptyScale());

  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    const solid = SCALE_STEPS.map((step) =>
      style.getPropertyValue(`--${prefix}-${step}`).trim(),
    ) as unknown as Scale12<string>;
    const alpha = SCALE_STEPS.map((step) =>
      style.getPropertyValue(`--${prefix}-a${step}`).trim(),
    ) as unknown as Scale12<string>;
    // Reading the resolved scale back from the DOM after paint is a deliberate
    // external-system sync, re-run when the theme deps change.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setScale({ solid, alpha });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scale;
}

function emptyScale(): ChromaticScale {
  const empty = Array.from({ length: 12 }, () => "") as unknown as Scale12<string>;
  return { solid: empty, alpha: empty };
}

/* ------------------------------------------------------------------ */
/*  Semantic token groups                                              */
/* ------------------------------------------------------------------ */

type SemanticGroup = {
  label: string;
  tokens: readonly string[];
};

const SEMANTIC_GROUPS: readonly SemanticGroup[] = [
  {
    label: "Backgrounds",
    tokens: [
      "--bg-desktop",
      "--bg-window",
      "--bg-panel",
      "--bg-surface",
      "--bg-surface-hover",
      "--bg-surface-active",
      "--bg-inverse",
      "--bg-overlay",
    ],
  },
  {
    label: "Text",
    tokens: [
      "--text-primary",
      "--text-secondary",
      "--text-tertiary",
      "--text-disabled",
      "--text-inverse",
      "--text-accent",
    ],
  },
  {
    label: "Icons",
    tokens: [
      "--icon-primary",
      "--icon-secondary",
      "--icon-tertiary",
      "--icon-disabled",
      "--icon-inverse",
      "--icon-accent",
    ],
  },
  {
    label: "Borders",
    tokens: [
      "--border-subtle",
      "--border-default",
      "--border-strong",
      "--border-active",
      "--border-focus",
    ],
  },
  {
    label: "Buttons — Primary",
    tokens: [
      "--btn-primary-bg",
      "--btn-primary-hover",
      "--btn-primary-text",
      "--btn-primary-icon",
    ],
  },
  {
    label: "Buttons — Secondary",
    tokens: [
      "--btn-secondary-bg",
      "--btn-secondary-hover",
      "--btn-secondary-active",
      "--btn-secondary-border",
      "--btn-secondary-text",
    ],
  },
  {
    label: "Buttons — Ghost",
    tokens: [
      "--btn-ghost-bg",
      "--btn-ghost-hover",
      "--btn-ghost-active",
      "--btn-ghost-text",
    ],
  },
  {
    label: "Inputs",
    tokens: [
      "--input-bg",
      "--input-bg-hover",
      "--input-border",
      "--input-border-hover",
      "--input-text",
      "--input-placeholder",
    ],
  },
  {
    label: "Status — Accent",
    tokens: [
      "--accent-bg",
      "--accent-border",
      "--accent-solid",
      "--accent-solid-hover",
    ],
  },
  {
    label: "Status — Success",
    tokens: [
      "--success-bg",
      "--success-border",
      "--success-solid",
      "--success-text",
    ],
  },
  {
    label: "Status — Warning",
    tokens: [
      "--warning-bg",
      "--warning-border",
      "--warning-solid",
      "--warning-text",
    ],
  },
  {
    label: "Status — Danger",
    tokens: [
      "--danger-bg",
      "--danger-border",
      "--danger-solid",
      "--danger-solid-hover",
      "--danger-text",
    ],
  },
];

const SEMANTIC_TOKEN_NAMES = Array.from(
  new Set(SEMANTIC_GROUPS.flatMap((group) => group.tokens)),
);

function useResolvedSemanticHexes(resolutionKey: string) {
  const [hexes, setHexes] = useState<Record<string, string>>({});

  useEffect(() => {
    const probe = document.createElement("span");
    probe.setAttribute("aria-hidden", "true");
    probe.style.cssText =
      "position:fixed;visibility:hidden;pointer-events:none;inset:auto;width:0;height:0;";
    document.body.append(probe);

    const nextHexes: Record<string, string> = {};

    try {
      for (const token of SEMANTIC_TOKEN_NAMES) {
        probe.style.color = `var(${token})`;
        const hex = cssColorToHex(getComputedStyle(probe).color);
        if (hex) {
          nextHexes[token] = hex;
        }
      }
    } finally {
      probe.remove();
    }

    // Resolving each semantic token to a concrete hex requires a post-paint
    // computed-style read — a deliberate external-system sync.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHexes(nextHexes);
  }, [resolutionKey]);

  return hexes;
}

function SemanticSwatch({
  cssVar,
  hex,
}: {
  cssVar: string;
  hex?: string;
}) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(`var(${cssVar})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <button
      onClick={copy}
      className="flex items-center gap-3 rounded border border-subtle bg-surface px-3 py-2.5 text-left transition-colors hover:border-default hover:bg-surface-hover cursor-pointer"
    >
      <div
        className="size-10 shrink-0 rounded-lg border border-subtle"
        style={{
          background: `linear-gradient(var(${cssVar}), var(${cssVar})), repeating-conic-gradient(var(--gray-3) 0% 25%, var(--gray-2) 0% 50%) 0 0/8px 8px`,
        }}
      />
      <div className="min-w-0 flex-1">
        <code className="flex items-center justify-between gap-2 type-xs">
          <span className="min-w-0 truncate text-secondary">
            {copied ? "Copied!" : cssVar}
          </span>
          {hex ? (
            <span className="shrink-0 text-right text-tertiary">{hex}</span>
          ) : null}
        </code>
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Elevations                                                         */
/* ------------------------------------------------------------------ */

function ElevationCard({ level }: { level: 0 | 1 | 2 | 3 | 4 }) {
  return (
    <div
      className={`elevation-${level} flex h-24 flex-col items-start justify-between rounded-window p-4`}
    >
      <span className="type-xs text-secondary">
        .elevation-{level}
      </span>
      <span className="text-sm font-medium text-primary">Level {level}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export function ColorsPage() {
  const { theme } = useSettings();
  const appearance = useResolvedThemeAppearance(theme.mode);

  const graySeed = useMemo(
    () => [theme.neutral.darkPaletteId, theme.neutral.lightPaletteId, appearance],
    [theme.neutral.darkPaletteId, theme.neutral.lightPaletteId, appearance],
  );
  const accentSeed = useMemo(
    () => [theme.accent, appearance],
    [theme.accent, appearance],
  );

  const grayScale = useRuntimeScale("gray", graySeed);
  const accentScale = useRuntimeScale("accent", accentSeed);
  const accentKey =
    theme.accent.mode === "custom"
      ? theme.accent.color
      : theme.accent.presetId;
  const semanticHexes = useResolvedSemanticHexes(
    `${appearance}:${theme.neutral.darkPaletteId}:${theme.neutral.lightPaletteId}:${theme.accent.mode}:${accentKey}`,
  );

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Colors
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-secondary">
          Two-tier token system. Tier-1 base scales (gray, accent, blue,
          green, amber, red) expose 12 solid + 12 alpha steps each. Tier-2
          semantic tokens reference those steps and stay stable across
          appearances — semantics are constant, base values flip.
        </p>
      </div>

      <DsSection
        title="Gray · live"
        description={`Derived from the active ${appearance} palette's OKLCH seed.`}
      >
        <ChromaticScalePair label="Gray" prefix="gray" scale={grayScale} />
      </DsSection>

      <DsSection
        title="Accent · live"
        description="Derived from the current accent preset or custom hex."
      >
        <ChromaticScalePair
          label="Accent"
          prefix="accent"
          scale={accentScale}
        />
      </DsSection>

      <DsSection
        title="Chromatic base scales"
        description="Static OKLCH-derived scales for status and information colors."
      >
        <div className="space-y-6">
          <ChromaticScalePair
            label="Blue"
            prefix="blue"
            scale={BASE_SCALES.blue[appearance]}
          />
          <ChromaticScalePair
            label="Green"
            prefix="green"
            scale={BASE_SCALES.green[appearance]}
          />
          <ChromaticScalePair
            label="Amber"
            prefix="amber"
            scale={BASE_SCALES.amber[appearance]}
          />
          <ChromaticScalePair
            label="Red"
            prefix="red"
            scale={BASE_SCALES.red[appearance]}
          />
        </div>
      </DsSection>

      <DsSection
        title="Elevations"
        description="Background + border + shadow bundles. Shadows track the active gray alpha ramp."
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {[0, 1, 2, 3, 4].map((level) => (
            <ElevationCard key={level} level={level as 0 | 1 | 2 | 3 | 4} />
          ))}
        </div>
      </DsSection>

      <DsSection
        title="Semantic tokens"
        description="CSS custom properties on :root. Click any swatch to copy the var() reference."
      >
        <div className="space-y-6">
          {SEMANTIC_GROUPS.map((group) => (
            <div key={group.label} className="space-y-2">
              <h3 className="type-xs text-secondary">
                {group.label}
              </h3>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {group.tokens.map((token) => (
                  <SemanticSwatch
                    key={token}
                    cssVar={token}
                    hex={semanticHexes[token]}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </DsSection>
    </div>
  );
}
