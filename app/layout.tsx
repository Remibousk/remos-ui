import type { Metadata } from "next";
import {
  EB_Garamond,
  Figtree,
  Inter,
  Ubuntu_Sans_Mono,
} from "next/font/google";
import type { ReactNode } from "react";

import "@/app/globals.css";

import { gtWalsheim } from "@remoui/gt-walsheim";
import { ThemeProvider } from "@/lib/theme/use-theme";
import {
  DEFAULT_THEME_SETTINGS,
  resolveThemeAppearance,
  resolveThemeCssVars,
} from "@/lib/theme/theme-customization";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
});
const ubuntuSansMono = Ubuntu_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-ubuntu-sans-mono",
  display: "swap",
});
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

// `@remoui/gt-walsheim` resolves to next/font/local when the files exist, or to a
// stub with an empty `variable` when they do not (see next.config.ts).
const fontVariableClassName = [
  inter.variable,
  ebGaramond.variable,
  ubuntuSansMono.variable,
  figtree.variable,
  ...(gtWalsheim.variable ? [gtWalsheim.variable] : []),
].join(" ");

export const metadata: Metadata = {
  title: "RemOS UI — Design System",
  description:
    "A portable two-tier design token system, runtime theme engine, and Tailwind v4 + Radix component primitives.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // Server-render the default theme's CSS vars inline on <html> so first paint
  // matches the client's initial render (no theme flash). A persisted theme, if
  // any, is applied on mount by ThemeProvider.
  const appearance = resolveThemeAppearance(DEFAULT_THEME_SETTINGS);
  const themeStyles = {
    ...resolveThemeCssVars(DEFAULT_THEME_SETTINGS, appearance),
    colorScheme: appearance,
  };

  return (
    // Font variable classes (--font-inter, …) live on <html> so they share an
    // element with --font-sans (set via inline style here and via
    // applyThemeCssVars at runtime). CSS custom-property substitution resolves
    // at the declaring element, so --font-sans's inner var(--font-X) only
    // resolves when --font-X is defined on the same element.
    // --font-gt-walsheim is only present when the local files exist.
    <html lang="en" className={fontVariableClassName} style={themeStyles}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
