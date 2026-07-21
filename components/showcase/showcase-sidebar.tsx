"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

import {
  SHOWCASE_SECTION_LABELS,
  SHOWCASE_SECTION_ORDER,
  type ShowcasePageDef,
  type ShowcasePageSection,
} from "@/components/showcase/showcase-pages";
import {
  THEME_DOT_TRANSITION,
  ThemeSwatchDot,
  ThemeSwitcherControls,
  useThemeSwitcherControls,
} from "@/components/theme/theme-switcher-controls";
import { cn } from "@/lib/utils";

type ShowcaseSidebarProps = {
  pages: ShowcasePageDef[];
  activePageId: string;
  onNavigate: (pageId: string) => void;
};

export function ShowcaseSidebar({ pages, activePageId, onNavigate }: ShowcaseSidebarProps) {
  const grouped = new Map<ShowcasePageSection, ShowcasePageDef[]>();
  for (const section of SHOWCASE_SECTION_ORDER) {
    grouped.set(section, []);
  }
  for (const page of pages) {
    grouped.get(page.section)?.push(page);
  }

  return (
    <nav
      data-testid="showcase-sidebar"
      className="os-scrollbar flex w-52 shrink-0 flex-col gap-6 overflow-y-auto border-r border-subtle bg-surface/60 px-3 py-4 backdrop-blur-sm"
    >
      <div className="flex flex-col gap-3">
        <div className="px-2 type-xs text-accent">
          RemOS UI
        </div>
        <ThemeAccordion />
      </div>
      {SHOWCASE_SECTION_ORDER.map((section) => {
        const sectionPages = grouped.get(section) ?? [];
        if (sectionPages.length === 0) return null;

        return (
          <div key={section} className="space-y-1">
            <div className="px-2 type-2xs text-secondary">
              {SHOWCASE_SECTION_LABELS[section]}
            </div>
            {sectionPages.map((page) => (
              <button
                key={page.id}
                type="button"
                onClick={() => onNavigate(page.id)}
                className={cn(
                  "flex w-full items-center rounded px-2 py-1.5 text-left text-sm transition-colors",
                  activePageId === page.id
                    ? "bg-accent/15 font-medium text-accent"
                    : "text-secondary hover:bg-gray-a3 hover:text-primary",
                )}
              >
                {page.label}
              </button>
            ))}
          </div>
        );
      })}
    </nav>
  );
}

function ThemeAccordion() {
  const [expanded, setExpanded] = useState(false);
  const { controls, summary } = useThemeSwitcherControls();

  return (
    <motion.div
      layout
      transition={THEME_DOT_TRANSITION}
      className="overflow-hidden rounded-window border border-subtle/60 bg-surface-hover/40"
    >
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        data-testid="showcase-theme-accordion-toggle"
        className="flex w-full items-center gap-2 px-2.5 py-2 text-left outline-none transition-colors hover:bg-surface-hover/60 focus-visible:ring-1 focus-visible:ring-accent"
      >
        <div className="relative flex h-5 flex-1 items-center">
          <AnimatePresence initial={false}>
            {expanded ? (
              <motion.span
                key="expanded-title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.06 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-[12px] font-medium text-primary"
              >
                Theme
              </motion.span>
            ) : (
              <motion.div
                key="collapsed-dots"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center gap-2"
              >
                <ThemeSwatchDot
                  layoutId="theme-dot-mode"
                  swatch={summary.mode.swatch}
                />
                <ThemeSwatchDot
                  layoutId="theme-dot-accent"
                  swatch={summary.accent.swatch}
                />
                <ThemeSwatchDot
                  layoutId="theme-dot-background"
                  swatch={summary.background.swatch}
                />
                <ThemeSwatchDot
                  layoutId="theme-dot-font"
                  fontGlyph={summary.font.fontGlyph}
                />
                <ThemeSwatchDot
                  layoutId="theme-dot-radius"
                  borderRadius={summary.radius.borderRadius}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.span
          animate={{ rotate: expanded ? 90 : 0 }}
          transition={THEME_DOT_TRANSITION}
          className="ml-auto flex text-secondary"
          aria-hidden
        >
          <ChevronRight className="size-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            key="expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <ThemeSwitcherControls
              controls={controls}
              testIdPrefix="sidebar-theme"
              dotLayoutIdPrefix="theme-dot"
              className="flex flex-col gap-1 px-1.5 pb-1.5"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
