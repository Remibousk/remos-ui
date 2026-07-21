import type { ReactNode } from "react";

type DsShowcaseProps = {
  title?: string;
  description?: string;
  children: ReactNode;
};

export function DsShowcase({ title, description, children }: DsShowcaseProps) {
  return (
    <div className="space-y-3">
      {title || description ? (
        <div className="space-y-1">
          {title ? (
            <h3 className="text-sm font-medium text-primary">{title}</h3>
          ) : null}
          {description ? (
            <p className="text-xs leading-relaxed text-secondary">{description}</p>
          ) : null}
        </div>
      ) : null}
      <div className="flex flex-wrap items-center gap-4 rounded-window border border-subtle bg-gray-a2 p-6">
        {children}
      </div>
    </div>
  );
}
