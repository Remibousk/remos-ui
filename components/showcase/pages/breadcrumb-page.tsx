import { DsSection } from "@/components/showcase/components/ds-section";
import { DsShowcase } from "@/components/showcase/components/ds-showcase";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage as BreadcrumbPageUI,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import React from "react";

export function BreadcrumbPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Breadcrumb</h1>
        <p className="max-w-xl text-sm leading-relaxed text-secondary">
          Displays the path to the current resource using a hierarchy of links.
        </p>
      </div>

      <DsSection title="Examples" description="A flexible breadcrumb component supporting semantic HTML elements.">
        <DsShowcase title="Default Usage" description="Typical usage showing root, intermediary, and current path states.">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <button type="button" aria-label="Go to Home">
                    <Home className="size-4" />
                  </button>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <button type="button">Documents</button>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPageUI className="text-secondary">Projects</BreadcrumbPageUI>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </DsShowcase>

        <DsShowcase title="With Ellipsis" description="Using the BreadcrumbEllipsis component to collapse long paths.">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <button type="button" aria-label="Go to Home">
                    <Home className="size-4" />
                  </button>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <button type="button">Documents</button>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPageUI className="text-secondary">Projects</BreadcrumbPageUI>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </DsShowcase>
      </DsSection>

      <DsSection title="Tokens">
        <div className="overflow-hidden rounded-window border border-subtle">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-subtle bg-gray-a2">
                <th className="px-4 py-2.5 font-medium text-primary">Component</th>
                <th className="px-4 py-2.5 font-medium text-primary">State</th>
                <th className="px-4 py-2.5 font-medium text-primary">Background</th>
                <th className="px-4 py-2.5 font-medium text-primary">Radius</th>
                <th className="px-4 py-2.5 font-medium text-primary">Text</th>
                <th className="px-4 py-2.5 font-medium text-primary">Ring</th>
              </tr>
            </thead>
            <tbody className="text-secondary">
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs text-primary" rowSpan={3}>BreadcrumbLink</td>
                <td className="px-4 py-2 text-xs">Resting</td>
                <td className="px-4 py-2 type-xs">transparent</td>
                <td className="px-4 py-2 type-xs">4px</td>
                <td className="px-4 py-2 type-xs">window-muted</td>
                <td className="px-4 py-2 type-xs">none</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs">Hover</td>
                <td className="px-4 py-2 type-xs">white/8</td>
                <td className="px-4 py-2 type-xs">4px</td>
                <td className="px-4 py-2 type-xs">white</td>
                <td className="px-4 py-2 type-xs">none</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs">Focus</td>
                <td className="px-4 py-2 type-xs">—</td>
                <td className="px-4 py-2 type-xs">4px</td>
                <td className="px-4 py-2 type-xs">—</td>
                <td className="px-4 py-2 type-xs">accent/80</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-xs text-primary">BreadcrumbPage</td>
                <td className="px-4 py-2 text-xs">Resting</td>
                <td className="px-4 py-2 type-xs">transparent</td>
                <td className="px-4 py-2 type-xs">4px</td>
                <td className="px-4 py-2 type-xs">window-foreground</td>
                <td className="px-4 py-2 type-xs">none</td>
              </tr>
            </tbody>
          </table>
        </div>
      </DsSection>
    </div>
  );
}
