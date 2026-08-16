/**
 * Used when `fonts/gt-walsheim/*.woff2` are absent (public clones).
 * Exports an empty `variable` so layout does not put `--font-gt-walsheim` on `<html>`.
 */
export const gtWalsheim = {
  className: "",
  style: {} as Record<string, string>,
  variable: "",
};
