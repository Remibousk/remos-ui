import localFont from "next/font/local";

/**
 * Loaded only when `fonts/gt-walsheim/*.woff2` are present on disk.
 * Kept in its own module so clones without the files never evaluate `localFont`.
 */
export const gtWalsheim = localFont({
  src: [
    {
      path: "../../fonts/gt-walsheim/GTWalsheimPro-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/gt-walsheim/GTWalsheimPro-RegularOblique.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../fonts/gt-walsheim/GTWalsheimPro-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/gt-walsheim/GTWalsheimPro-MediumOblique.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../fonts/gt-walsheim/GTWalsheimPro-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-gt-walsheim",
  display: "swap",
});
