const CSS_NUMBER_PATTERN = /-?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?%?/gi;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function toHexByte(value: number) {
  return Math.round(clamp(value, 0, 255))
    .toString(16)
    .padStart(2, "0")
    .toUpperCase();
}

function parseNumber(value: string, percentageScale: number) {
  const parsed = Number.parseFloat(value);
  return value.endsWith("%") ? (parsed / 100) * percentageScale : parsed;
}

function formatHex(red: number, green: number, blue: number, alpha = 1) {
  const rgb = `${toHexByte(red)}${toHexByte(green)}${toHexByte(blue)}`;
  const clampedAlpha = clamp(alpha, 0, 1);
  return clampedAlpha < 1 ? `#${rgb}${toHexByte(clampedAlpha * 255)}` : `#${rgb}`;
}

/** Converts the browser's computed RGB or sRGB colour serialisation to hex. */
export function cssColorToHex(value: string): string | null {
  const normalized = value.trim().toLowerCase();

  if (normalized === "transparent") {
    return "#00000000";
  }

  if (/^#[0-9a-f]{3,8}$/i.test(normalized)) {
    return normalized.toUpperCase();
  }

  const parts = normalized.match(CSS_NUMBER_PATTERN);
  if (!parts || parts.length < 3) {
    return null;
  }

  if (normalized.startsWith("rgb")) {
    const [red, green, blue] = parts
      .slice(0, 3)
      .map((part) => parseNumber(part, 255));
    const alpha = parts[3] ? parseNumber(parts[3], 1) : 1;
    return formatHex(red, green, blue, alpha);
  }

  if (normalized.startsWith("color(srgb ")) {
    const [red, green, blue] = parts
      .slice(0, 3)
      .map((part) => parseNumber(part, 1) * 255);
    const alpha = parts[3] ? parseNumber(parts[3], 1) : 1;
    return formatHex(red, green, blue, alpha);
  }

  return null;
}
