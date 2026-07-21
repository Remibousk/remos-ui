/**
 * Tier-1 (base) color scales for the two-tier design token system.
 *
 * Each chromatic scale (`blue`, `green`, `amber`, `red`) exposes:
 *   - `solid[1..12]` — perceptually-even steps derived in OKLCH from a seed hex
 *   - `alpha[1..12]` — semi-transparent overlays that reproduce `solid[N]` on
 *     top of `solid[1]`, preserving hue for tinted overlays
 *
 * Separate `light` and `dark` variants are generated per color; the same
 * generator is reused at runtime to derive the `--accent-*` scale from the
 * user's chosen accent color.
 */

export type ThemeAppearance = "light" | "dark";

export type Scale12<T = string> = readonly [T, T, T, T, T, T, T, T, T, T, T, T];

export type ChromaticScale = {
  solid: Scale12<string>;
  alpha: Scale12<string>;
};

export type ChromaticScaleSet = {
  light: ChromaticScale;
  dark: ChromaticScale;
};

/* ------------------------------------------------------------------ */
/* sRGB ↔ OKLab ↔ OKLCH                                               */
/* ------------------------------------------------------------------ */

type RGB = { r: number; g: number; b: number };
type OKLCH = { L: number; C: number; h: number };
type OKLab = { L: number; a: number; b: number };

function srgbToLinear(c: number): number {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function linearToSrgb(c: number): number {
  const clamped = Math.max(0, Math.min(1, c));
  const v =
    clamped <= 0.0031308
      ? 12.92 * clamped
      : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
  return Math.round(v * 255);
}

function rgbToOklab(rgb: RGB): OKLab {
  const r = srgbToLinear(rgb.r);
  const g = srgbToLinear(rgb.g);
  const b = srgbToLinear(rgb.b);
  const l_ = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m_ = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s_ = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return {
    L: 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
    a: 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
    b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
  };
}

function oklabToRgb(lab: OKLab): RGB {
  const l_ = lab.L + 0.3963377774 * lab.a + 0.2158037573 * lab.b;
  const m_ = lab.L - 0.1055613458 * lab.a - 0.0638541728 * lab.b;
  const s_ = lab.L - 0.0894841775 * lab.a - 1.291485548 * lab.b;
  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;
  return {
    r: linearToSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    g: linearToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    b: linearToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  };
}

function oklabToOklch({ L, a, b }: OKLab): OKLCH {
  const C = Math.sqrt(a * a + b * b);
  const hRaw = (Math.atan2(b, a) * 180) / Math.PI;
  return { L, C, h: hRaw < 0 ? hRaw + 360 : hRaw };
}

function oklchToOklab({ L, C, h }: OKLCH): OKLab {
  const hr = (h * Math.PI) / 180;
  return { L, a: C * Math.cos(hr), b: C * Math.sin(hr) };
}

export function hexToRgb(hex: string): RGB {
  const v = hex.startsWith("#") ? hex.slice(1) : hex;
  const full =
    v.length === 3
      ? v
          .split("")
          .map((c) => c + c)
          .join("")
      : v;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

export function rgbToHex({ r, g, b }: RGB): string {
  const h = (n: number) => n.toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`;
}

export function hexToOklch(hex: string): OKLCH {
  return oklabToOklch(rgbToOklab(hexToRgb(hex)));
}

export function oklchToHex(c: OKLCH): string {
  return rgbToHex(oklabToRgb(oklchToOklab(c)));
}

function toScale12<T>(arr: readonly T[]): Scale12<T> {
  if (arr.length !== 12) {
    throw new Error(`Expected 12 scale steps, got ${arr.length}`);
  }
  return arr as unknown as Scale12<T>;
}

/* ------------------------------------------------------------------ */
/* Scale generator                                                    */
/* ------------------------------------------------------------------ */

/**
 * OKLCH lightness targets for each of the 12 steps.
 * Step 9 is positioned to accept the seed hex as the brand-solid color;
 * the seed's own L is blended in at that step to keep brand fidelity.
 */
const LIGHTNESS: Record<ThemeAppearance, Scale12<number>> = {
  light: [0.99, 0.97, 0.94, 0.9, 0.85, 0.78, 0.7, 0.6, 0.52, 0.42, 0.3, 0.2],
  dark: [0.17, 0.2, 0.24, 0.28, 0.33, 0.39, 0.46, 0.54, 0.62, 0.72, 0.83, 0.95],
};

/**
 * Chroma multiplier per step — peaks around the brand step (8–9) and
 * fades at the extremes so backgrounds and high-contrast text stay
 * near-neutral.
 */
const CHROMA_MULTIPLIER: Scale12<number> = [
  0.08, 0.16, 0.28, 0.4, 0.55, 0.7, 0.85, 0.95, 1.0, 0.92, 0.7, 0.45,
];

export type SolidScaleOptions = {
  /**
   * When true (default), step 9 nudges toward the seed's lightness so the
   * brand-solid step matches the seed hex closely. Disable for neutral
   * (gray) scales where step 9 carries no brand meaning.
   */
  anchorBrandStep?: boolean;
};

export function generateSolidScale(
  seedHex: string,
  appearance: ThemeAppearance,
  options: SolidScaleOptions = {},
): Scale12<string> {
  const { anchorBrandStep = true } = options;
  const seed = hexToOklch(seedHex);
  const lightnessCurve = LIGHTNESS[appearance];
  const steps = lightnessCurve.map((baseL, i) => {
    const targetL = anchorBrandStep && i === 8 ? blend(baseL, seed.L, 0.6) : baseL;
    return oklchToHex({
      L: targetL,
      C: seed.C * CHROMA_MULTIPLIER[i],
      h: seed.h,
    });
  });
  return toScale12(steps);
}

function blend(a: number, b: number, t: number): number {
  return a * (1 - t) + b * t;
}

/**
 * Given a solid 12-step scale, derive the alpha overlay that reproduces
 * `solid[N]` when layered on `solid[1]`. Alpha is the minimum value that
 * keeps all channels within [0, 255]; the color is solved from the alpha
 * compositing equation `result = bg * (1 - a) + color * a`.
 */
export function deriveAlphaScale(solid: Scale12<string>): Scale12<string> {
  const bg = hexToRgb(solid[0]);
  const channelAlpha = (b: number, t: number) => {
    if (t === b) return 0;
    if (t > b) return b === 255 ? 0 : (t - b) / (255 - b);
    return b === 0 ? 0 : (b - t) / b;
  };
  const out = solid.map((targetHex, i) => {
    if (i === 0) return "rgba(0, 0, 0, 0)";
    const t = hexToRgb(targetHex);
    const alpha = Math.max(
      channelAlpha(bg.r, t.r),
      channelAlpha(bg.g, t.g),
      channelAlpha(bg.b, t.b),
      0.001,
    );
    const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
    const cR = clamp((t.r - bg.r * (1 - alpha)) / alpha);
    const cG = clamp((t.g - bg.g * (1 - alpha)) / alpha);
    const cB = clamp((t.b - bg.b * (1 - alpha)) / alpha);
    return `rgba(${cR}, ${cG}, ${cB}, ${Number(alpha.toFixed(3))})`;
  });
  return toScale12(out);
}

export function generateChromaticScale(
  seedHex: string,
  appearance: ThemeAppearance,
): ChromaticScale {
  const solid = generateSolidScale(seedHex, appearance);
  const alpha = deriveAlphaScale(solid);
  return { solid, alpha };
}

export function generateChromaticScaleSet(seedHex: string): ChromaticScaleSet {
  return {
    light: generateChromaticScale(seedHex, "light"),
    dark: generateChromaticScale(seedHex, "dark"),
  };
}

/* ------------------------------------------------------------------ */
/* Frozen brand scales                                                */
/* ------------------------------------------------------------------ */

export const BASE_SEED_HEX = {
  blue: "#3b82f6",
  green: "#22c55e",
  amber: "#f59e0b",
  red: "#ef4444",
} as const;

export type BaseColorId = keyof typeof BASE_SEED_HEX;

export const BASE_COLOR_IDS: readonly BaseColorId[] = [
  "blue",
  "green",
  "amber",
  "red",
] as const;

export const BASE_SCALES: Record<BaseColorId, ChromaticScaleSet> = {
  blue: generateChromaticScaleSet(BASE_SEED_HEX.blue),
  green: generateChromaticScaleSet(BASE_SEED_HEX.green),
  amber: generateChromaticScaleSet(BASE_SEED_HEX.amber),
  red: generateChromaticScaleSet(BASE_SEED_HEX.red),
};

/**
 * Step indexes (1-based) — exported for consumers that iterate scales.
 */
export const SCALE_STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
export type ScaleStep = (typeof SCALE_STEPS)[number];
