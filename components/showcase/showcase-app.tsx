"use client";

import dynamic from "next/dynamic";
import { useState, type ComponentType } from "react";

import { ShowcaseContent } from "@/components/showcase/showcase-content";
import { ShowcaseSidebar } from "@/components/showcase/showcase-sidebar";
import type {
  ShowcasePageDef,
  ShowcasePageProps,
} from "@/components/showcase/showcase-pages";

const PageLoading = () => (
  <div className="flex min-h-[160px] items-center justify-center text-sm text-secondary">
    Loading…
  </div>
);

const lazyPage = <K extends string>(
  loader: () => Promise<Record<K, ComponentType<never>>>,
  exportName: K,
): ComponentType<ShowcasePageProps> =>
  dynamic(
    () =>
      loader().then(
        (mod) => mod[exportName] as ComponentType<ShowcasePageProps>,
      ),
    {
      loading: PageLoading,
      ssr: false,
    },
  );

const IntroductionPage = lazyPage(
  () => import("@/components/showcase/pages/introduction"),
  "IntroductionPage",
);
const ColorsPage = lazyPage(
  () => import("@/components/showcase/pages/colors"),
  "ColorsPage",
);
const TypographyPage = lazyPage(
  () => import("@/components/showcase/pages/typography"),
  "TypographyPage",
);
const RadiusPage = lazyPage(
  () => import("@/components/showcase/pages/radius"),
  "RadiusPage",
);
const BreadcrumbPage = lazyPage(
  () => import("@/components/showcase/pages/breadcrumb-page"),
  "BreadcrumbPage",
);
const ButtonPage = lazyPage(
  () => import("@/components/showcase/pages/button-page"),
  "ButtonPage",
);
const ButtonGroupPage = lazyPage(
  () => import("@/components/showcase/pages/button-group-page"),
  "ButtonGroupPage",
);
const DropdownMenuPage = lazyPage(
  () => import("@/components/showcase/pages/dropdown-menu-page"),
  "DropdownMenuPage",
);
const IconButtonPage = lazyPage(
  () => import("@/components/showcase/pages/icon-button-page"),
  "IconButtonPage",
);
const SelectorTilePage = lazyPage(
  () => import("@/components/showcase/pages/selector-tile-page"),
  "SelectorTilePage",
);
const SliderPage = lazyPage(
  () => import("@/components/showcase/pages/slider-page"),
  "SliderPage",
);
const SwitchPage = lazyPage(
  () => import("@/components/showcase/pages/switch-page"),
  "SwitchPage",
);

const PAGES: ShowcasePageDef[] = [
  { id: "introduction", label: "Introduction", section: "foundations", component: IntroductionPage },
  { id: "colors", label: "Colors", description: "Semantic color tokens", section: "foundations", component: ColorsPage },
  { id: "typography", label: "Typography", description: "Type scale and styles", section: "foundations", component: TypographyPage },
  { id: "radius", label: "Radius", description: "Corner radius scale & presets", section: "foundations", component: RadiusPage },
  { id: "breadcrumb", label: "Breadcrumb", description: "Path navigation", section: "components", component: BreadcrumbPage },
  { id: "button", label: "Button", description: "Variants & sizes", section: "components", component: ButtonPage },
  { id: "button-group", label: "Button Group", description: "Segmented actions", section: "components", component: ButtonGroupPage },
  { id: "dropdown-menu", label: "Dropdown Menu", description: "Radix-based menu", section: "components", component: DropdownMenuPage },
  { id: "icon-button", label: "Icon Button", description: "Icon-only actions", section: "components", component: IconButtonPage },
  { id: "selector-tile", label: "Selector Tile", description: "Visual option picker", section: "components", component: SelectorTilePage },
  { id: "slider", label: "Slider", description: "Continuous range input", section: "components", component: SliderPage },
  { id: "switch", label: "Switch", description: "Binary toggle control", section: "components", component: SwitchPage },
];

export function ShowcaseApp() {
  const [activePageId, setActivePageId] = useState("introduction");

  return (
    <section
      data-testid="remos-ui-showcase"
      className="flex h-dvh min-h-0 bg-surface text-primary"
    >
      <ShowcaseSidebar
        pages={PAGES}
        activePageId={activePageId}
        onNavigate={setActivePageId}
      />
      <ShowcaseContent
        pages={PAGES}
        activePageId={activePageId}
        onNavigate={setActivePageId}
      />
    </section>
  );
}
