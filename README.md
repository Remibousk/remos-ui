# RemOS UI

A portable design system extracted from [RemOS](https://remibousk.com): a two-tier
design-token layer, a runtime theme engine, and a set of Tailwind CSS v4 + Radix
component primitives. It ships as a **starter template** — clone it, and a new
project boots with the whole system already wired in, plus a live docs site.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and
Framer Motion.

## Use it as a template

This repo is meant to be a GitHub template. To start a new project from it:

```bash
# with the GitHub CLI, once this repo is pushed and marked as a template
gh repo create my-app --template <your-org>/remos-ui --private --clone
cd my-app
npm install
npm run dev
```

Or just clone and reset history:

```bash
git clone <this-repo> my-app && cd my-app && rm -rf .git && git init
npm install && npm run dev
```

`npm run dev` serves the design-system docs at http://localhost:3000. Start building
your app by editing `app/page.tsx` — the tokens, theme engine, and primitives are
already available.

## What's inside

```
app/
  globals.css              Two-tier token system (@theme + CSS variables)
  layout.tsx               Loads fonts, seeds default theme, wraps ThemeProvider
  page.tsx                 Renders the docs showcase (replace with your app)
lib/
  utils.ts                 cn() — clsx + tailwind-merge (window-radius aware)
  theme/
    base-scales.ts         OKLCH 12-step scale generator (pure)
    theme-customization.ts Accent/neutral/font/radius presets + applyThemeCssVars
    theme-presets.ts       Named look presets (mode + accent + palette + font + radius)
    css-color.ts           CSS color → hex parsing
    theme-tokens.ts        JS token map (colors, radius, shadow, motion)
    use-theme.tsx          localStorage-backed ThemeProvider / useSettings / setTheme
components/
  ui/                      9 primitives (button, dropdown-menu, slider, switch, …)
  theme/                   ThemeSwitcherControls (preset/mode/accent/background/font/radius)
  showcase/                The docs site (sidebar + per-component pages)
```

## The token system

Colors, radius, and type are defined as a **two-tier** system in
[`app/globals.css`](app/globals.css):

- **Tier 1 — base scales.** `gray`, `accent`, `blue`, `green`, `amber`, `red`,
  each with 12 solid steps (`--gray-1` … `--gray-12`) and 12 alpha steps
  (`--gray-a1` … `--gray-a12`). The `gray` and `accent` scales are regenerated at
  runtime from the active theme; the rest are fixed.
- **Tier 2 — semantic tokens.** Roles that reference Tier-1 steps and stay stable
  across light/dark: `--bg-surface`, `--text-primary`, `--border-subtle`,
  `--accent-solid`, `--danger-text`, and so on. Light/dark lives entirely in
  Tier 1 — the semantic layer never changes.

Tailwind v4 exposes these as utilities via the `@theme inline` block, so you write
`bg-surface`, `text-primary`, `border-subtle`, `rounded-window`, `elevation-2`,
`type-lg`, etc., instead of raw hex. Prefer tokenized classes over literal colors.

```tsx
<div className="elevation-2 rounded-window p-4">
  <h2 className="type-lg text-primary">Tokenized</h2>
  <p className="type-sm text-secondary">Everything tracks the active theme.</p>
</div>
```

## The theme engine

Theme is five independent dimensions: **mode** (dark/light/system), **accent**
(10 presets or a custom hex), **background** (7 dark + 6 light neutral palettes),
**font** (4 Google Fonts plus GT Walsheim Pro), and **radius** (5 presets).
**Look presets** apply a complete combination of those dimensions in one click.
Changing any of them regenerates the relevant CSS variables at runtime and
re-skins the whole UI in place — no reload.

The state lives in [`lib/theme/use-theme.tsx`](lib/theme/use-theme.tsx), a small
localStorage-backed store:

```tsx
"use client";
import { useSettings, setTheme } from "@/lib/theme/use-theme";

function AccentToggle() {
  const { theme } = useSettings();
  return (
    <button
      onClick={() =>
        setTheme({ ...theme, accent: { mode: "preset", presetId: "violet" } })
      }
    >
      Current: {theme.mode}
    </button>
  );
}
```

`ThemeProvider` (mounted in `app/layout.tsx`) applies the persisted theme on load
and keeps `<html>`'s CSS variables in sync. The layout server-renders the default
theme inline so first paint matches — no theme flash for the default. A drop-in
`ThemeSwitcherControls` component gives you the full preset/mode/accent/background/
font/radius picker.

### Adding an accent, palette, or look preset

Edit the arrays in
[`lib/theme/theme-customization.ts`](lib/theme/theme-customization.ts):
`ACCENT_PRESETS`, `DARK_NEUTRAL_PALETTES`, `LIGHT_NEUTRAL_PALETTES`,
`FONT_PRESETS`, `RADIUS_PRESETS`. A new accent needs only a seed hex — the OKLCH
generator derives the full 12-step scale for both light and dark.

Named looks live in
[`lib/theme/theme-presets.ts`](lib/theme/theme-presets.ts). Each one is a full
`ThemeSettings` snapshot. The Framer rebuild of remibousk.com is **Velvet Folio**
(Velvet neutrals, Heather accent, GT Walsheim Pro).

## The primitives

Nine token-driven, accessible primitives under
[`components/ui/`](components/ui): `Button`, `ButtonGroup`, `Breadcrumb`,
`DropdownMenu`, `IconButton`, `SelectorTile`, `Slider`, `Spinner`, `Switch`.
They depend only on `cn`, `class-variance-authority`, Radix, and `lucide-react`,
so you can copy any of them into another project as long as the token layer and
`cn` come along. The setup follows shadcn/ui conventions
([`components.json`](components.json)), so `npx shadcn add …` works too.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the docs site / dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

## Provenance & known follow-ups

Extracted from RemOS. The token layer keeps a set of compatibility aliases (the
`--button-primary-*`, shadcn `--card`/`--popover`/… names, and a `--neutral-*`
scale) so the primitives render identically to their origin; they can be collapsed
into the two-tier semantic names over time. A persisted non-default theme applies
one post-hydration transition on first load — add a blocking inline script in
`app/layout.tsx` if you want to eliminate it.

## License

MIT — see [LICENSE](LICENSE).
