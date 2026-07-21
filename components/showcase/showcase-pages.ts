import type { ComponentType } from "react";

export type ShowcasePageSection = "foundations" | "components";

export type ShowcasePageProps = {
  pages: ShowcasePageDef[];
  onNavigate: (pageId: string) => void;
};

export type ShowcasePageDef = {
  id: string;
  label: string;
  description?: string;
  section: ShowcasePageSection;
  component: ComponentType<ShowcasePageProps>;
};

export const SHOWCASE_SECTION_LABELS: Record<ShowcasePageSection, string> = {
  foundations: "Foundations",
  components: "Components",
};

export const SHOWCASE_SECTION_DESCRIPTIONS: Record<ShowcasePageSection, string> = {
  foundations:
    "Core design tokens: the colors, typography, and radius that define the system.",
  components:
    "Reusable building blocks, from low-level primitives to composed patterns.",
};

export const SHOWCASE_SECTION_ORDER: ShowcasePageSection[] = [
  "foundations",
  "components",
];
