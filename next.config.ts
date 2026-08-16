import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const rootDir = dirname(fileURLToPath(import.meta.url));
const hasGtWalsheim = existsSync(
  join(rootDir, "fonts/gt-walsheim/GTWalsheimPro-Regular.woff2"),
);

/** Resolves to the real `next/font/local` module only when the `.woff2` files exist. */
const gtWalsheimEntry = hasGtWalsheim
  ? "./app/fonts/gt-walsheim.ts"
  : "./app/fonts/gt-walsheim.stub.ts";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  turbopack: {
    resolveAlias: {
      "@remoui/gt-walsheim": gtWalsheimEntry,
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@remoui/gt-walsheim": join(
        rootDir,
        hasGtWalsheim
          ? "app/fonts/gt-walsheim.ts"
          : "app/fonts/gt-walsheim.stub.ts",
      ),
    };
    return config;
  },
};

export default nextConfig;
