"use client";

import type { ShowcasePageDef } from "@/components/showcase/showcase-pages";

type ShowcaseContentProps = {
  pages: ShowcasePageDef[];
  activePageId: string;
  onNavigate: (pageId: string) => void;
};

export function ShowcaseContent({ pages, activePageId, onNavigate }: ShowcaseContentProps) {
  const activePage = pages.find((p) => p.id === activePageId);

  if (!activePage) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-secondary">
        Page not found.
      </div>
    );
  }

  const PageComponent = activePage.component;

  return (
    <div className="os-scrollbar min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto max-w-3xl px-8 py-8">
        <PageComponent pages={pages} onNavigate={onNavigate} />
      </div>
    </div>
  );
}
