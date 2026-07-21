import { DsSection } from "@/components/showcase/components/ds-section";
import {
  SHOWCASE_SECTION_DESCRIPTIONS,
  SHOWCASE_SECTION_LABELS,
  SHOWCASE_SECTION_ORDER,
  type ShowcasePageDef,
  type ShowcasePageProps,
  type ShowcasePageSection,
} from "@/components/showcase/showcase-pages";

export function IntroductionPage({ pages, onNavigate }: ShowcasePageProps) {
  const entries = pages.filter((page) => page.id !== "introduction");
  const grouped = new Map<ShowcasePageSection, ShowcasePageDef[]>();
  for (const section of SHOWCASE_SECTION_ORDER) {
    grouped.set(section, []);
  }
  for (const page of entries) {
    grouped.get(page.section)?.push(page);
  }

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          RemOS UI
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-secondary">
          A portable design system: a two-tier token layer, a runtime theme engine, and a
          set of Tailwind v4 + Radix primitives. Browse the foundations, or open a live
          component demo. Change the theme from the sidebar and watch every token flip.
        </p>
      </div>

      {SHOWCASE_SECTION_ORDER.map((section) => {
        const sectionPages = grouped.get(section) ?? [];
        if (sectionPages.length === 0) return null;

        return (
          <DsSection
            key={section}
            title={SHOWCASE_SECTION_LABELS[section]}
            description={SHOWCASE_SECTION_DESCRIPTIONS[section]}
          >
            <div className="grid grid-cols-3 gap-3">
              {sectionPages.map((page) => (
                <PageCard
                  key={page.id}
                  label={page.label}
                  detail={page.description}
                  onClick={() => onNavigate(page.id)}
                />
              ))}
            </div>
          </DsSection>
        );
      })}
    </div>
  );
}

function PageCard({
  label,
  detail,
  onClick,
}: {
  label: string;
  detail?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col items-start rounded-window border border-subtle bg-gray-a2 px-4 py-3 text-left transition-colors hover:border-accent/60 hover:bg-gray-a3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
    >
      <span className="text-sm font-medium text-primary group-hover:text-accent">
        {label}
      </span>
      {detail ? (
        <span className="mt-0.5 text-xs text-secondary">{detail}</span>
      ) : null}
    </button>
  );
}
