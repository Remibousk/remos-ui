"use client";

import { useState } from "react";

import { DsSection } from "@/components/showcase/components/ds-section";
import { DsShowcase } from "@/components/showcase/components/ds-showcase";
import { ButtonGroup } from "@/components/ui/button-group";

export function ButtonGroupPage() {
  const [view, setView] = useState<"wallpaper" | "shader">("wallpaper");
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [align, setAlign] = useState<"left" | "center" | "right">("left");

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Button Group
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-secondary">
          Segmented control for switching between a small set of mutually
          exclusive views. Used for in-page tabs and compact toggles.
        </p>
      </div>

      <DsSection
        title="Default"
        description="A two-option selector for switching between mutually exclusive views."
      >
        <DsShowcase title="Tabs">
          <ButtonGroup
            ariaLabel="Wallpaper view"
            value={view}
            onChange={setView}
            options={[
              { value: "wallpaper", label: "Wallpaper" },
              { value: "shader", label: "Shader" },
            ]}
          />
          <p className="text-xs text-secondary">
            Active: <span className="text-primary">{view}</span>
          </p>
        </DsShowcase>

        <DsShowcase title="Three options">
          <ButtonGroup
            ariaLabel="Alignment"
            value={align}
            onChange={setAlign}
            options={[
              { value: "left", label: "Left" },
              { value: "center", label: "Center" },
              { value: "right", label: "Right" },
            ]}
          />
        </DsShowcase>

        <DsShowcase title="With disabled option">
          <ButtonGroup
            ariaLabel="Density"
            value="compact"
            onChange={() => {
              /* noop */
            }}
            options={[
              { value: "compact", label: "Compact" },
              { value: "cozy", label: "Cozy" },
              { value: "comfortable", label: "Comfortable", disabled: true },
            ]}
          />
        </DsShowcase>
      </DsSection>

      <DsSection title="Sizes" description="Small variant for dense toolbars.">
        <DsShowcase title="Small">
          <ButtonGroup
            size="sm"
            ariaLabel="Size"
            value={size}
            onChange={setSize}
            options={[
              { value: "sm", label: "SM" },
              { value: "md", label: "MD" },
              { value: "lg", label: "LG" },
            ]}
          />
        </DsShowcase>

        <DsShowcase title="Default">
          <ButtonGroup
            ariaLabel="Size"
            value={size}
            onChange={setSize}
            options={[
              { value: "sm", label: "Small" },
              { value: "md", label: "Medium" },
              { value: "lg", label: "Large" },
            ]}
          />
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
                <th className="px-4 py-2.5 font-medium text-primary">Border</th>
                <th className="px-4 py-2.5 font-medium text-primary">Radius</th>
                <th className="px-4 py-2.5 font-medium text-primary">Text</th>
                <th className="px-4 py-2.5 font-medium text-primary">Shadow</th>
              </tr>
            </thead>
            <tbody className="text-secondary">
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs text-primary">Container</td>
                <td className="px-4 py-2 text-xs">Resting</td>
                <td className="px-4 py-2 type-xs">white/[0.03]</td>
                <td className="px-4 py-2 type-xs">window-border/60</td>
                <td className="px-4 py-2 type-xs">10px</td>
                <td className="px-4 py-2 type-xs">—</td>
                <td className="px-4 py-2 type-xs">none</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs text-primary" rowSpan={3}>Item</td>
                <td className="px-4 py-2 text-xs">Resting</td>
                <td className="px-4 py-2 type-xs">transparent</td>
                <td className="px-4 py-2 type-xs">transparent</td>
                <td className="px-4 py-2 type-xs">8px</td>
                <td className="px-4 py-2 type-xs">window-muted</td>
                <td className="px-4 py-2 type-xs">none</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs">Hover</td>
                <td className="px-4 py-2 type-xs">white/[0.04]</td>
                <td className="px-4 py-2 type-xs">transparent</td>
                <td className="px-4 py-2 type-xs">8px</td>
                <td className="px-4 py-2 type-xs">window-foreground</td>
                <td className="px-4 py-2 type-xs">none</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-xs">Active</td>
                <td className="px-4 py-2 type-xs">white/10</td>
                <td className="px-4 py-2 type-xs">transparent</td>
                <td className="px-4 py-2 type-xs">8px</td>
                <td className="px-4 py-2 type-xs">window-foreground</td>
                <td className="px-4 py-2 type-xs">inset 1px white/0.08</td>
              </tr>
            </tbody>
          </table>
        </div>
      </DsSection>

      <DsSection title="Props">
        <div className="overflow-hidden rounded-window border border-subtle">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-subtle bg-gray-a2">
                <th className="px-4 py-2.5 font-medium text-primary">
                  Prop
                </th>
                <th className="px-4 py-2.5 font-medium text-primary">
                  Type
                </th>
                <th className="px-4 py-2.5 font-medium text-primary">
                  Default
                </th>
              </tr>
            </thead>
            <tbody className="text-secondary">
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 type-xs text-primary">value</td>
                <td className="px-4 py-2 type-xs">T extends string</td>
                <td className="px-4 py-2 type-xs">—</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 type-xs text-primary">
                  onChange
                </td>
                <td className="px-4 py-2 type-xs">
                  (value: T) =&gt; void
                </td>
                <td className="px-4 py-2 type-xs">—</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 type-xs text-primary">
                  options
                </td>
                <td className="px-4 py-2 type-xs">
                  ButtonGroupOption&lt;T&gt;[]
                </td>
                <td className="px-4 py-2 type-xs">—</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 type-xs text-primary">size</td>
                <td className="px-4 py-2 type-xs">
                  &quot;default&quot; | &quot;sm&quot;
                </td>
                <td className="px-4 py-2 type-xs">
                  &quot;default&quot;
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 type-xs text-primary">
                  ariaLabel
                </td>
                <td className="px-4 py-2 type-xs">string</td>
                <td className="px-4 py-2 type-xs">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </DsSection>
    </div>
  );
}
