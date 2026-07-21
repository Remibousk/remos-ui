import type { ReactNode } from "react";

type DsSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function DsSection({ title, description, children }: DsSectionProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-1.5">
        <h2 className="text-xl font-semibold tracking-tight text-primary">{title}</h2>
        {description ? (
          <p className="text-sm leading-relaxed text-secondary">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
