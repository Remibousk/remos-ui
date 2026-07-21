import { DsSection } from "@/components/showcase/components/ds-section";
import { DsShowcase } from "@/components/showcase/components/ds-showcase";
import { Button } from "@/components/ui/button";

export function ButtonPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Button</h1>
        <p className="max-w-xl text-sm leading-relaxed text-secondary">
          The canonical primary button is a flat, token-driven action: preset-driven radius
          (<code className="type-xs">var(--radius)</code>), 16px horizontal padding,
          8px vertical padding, 16px medium label text, and accent-scale fill that shifts across
          resting, hover, active, and focus states — no decorative inner shadows.
        </p>
      </div>

      <DsSection title="Variants" description="Four button variants for different emphasis levels.">
        <DsShowcase title="Primary" description="Canonical action button. The token-driven default.">
          <Button variant="default">Default</Button>
          <Button variant="default" disabled>Disabled</Button>
        </DsShowcase>

        <DsShowcase
          title="Primary States"
          description="Hover lightens the fill to accent-7 and surfaces an accent border; active deepens to accent-8."
        >
          <Button variant="default">Resting</Button>
          <Button
            variant="default"
            className="border-[var(--button-primary-border-hover)] bg-[var(--button-primary-bg-hover)]"
          >
            Hover
          </Button>
          <Button variant="default" className="bg-[var(--button-primary-bg-active)] scale-[0.98]">
            Active
          </Button>
        </DsShowcase>

        <DsShowcase
          title="Tertiary"
          description="Quiet equal-weight action. Soft fill and subtle border, same recipe as the default IconButton."
        >
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="tertiary" disabled>Disabled</Button>
        </DsShowcase>

        <DsShowcase title="Ghost" description="Low-emphasis action. Transparent background, subtle hover.">
          <Button variant="ghost">Ghost</Button>
          <Button variant="ghost" disabled>Disabled</Button>
        </DsShowcase>

        <DsShowcase title="Launcher" description="Desktop launcher icon button. Column layout with label below.">
          <Button variant="launcher" size="unset" className="h-24 w-24 px-1.5 py-2">
            <div className="size-10 rounded-lg bg-accent/30" />
            <span className="text-[11px] font-medium">App</span>
          </Button>
        </DsShowcase>
      </DsSection>

      <DsSection title="Sizes" description="Size presets keep the primary style while adapting density for the UI.">
        <DsShowcase>
          <Button size="default">Default (16px label)</Button>
          <Button size="sm">Small</Button>
          <Button size="icon">
            <svg className="size-4" viewBox="0 0 16 16" fill="currentColor">
              <circle cx="8" cy="8" r="3" />
            </svg>
          </Button>
          <Button size="unset" className="text-sm text-accent">Unset</Button>
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
                <td className="px-4 py-2 text-xs text-primary" rowSpan={4}>Primary</td>
                <td className="px-4 py-2 text-xs">Resting</td>
                <td className="px-4 py-2 type-xs">var(--button-primary-bg)</td>
                <td className="px-4 py-2 type-xs">var(--button-primary-border)</td>
                <td className="px-4 py-2 type-xs">var(--radius)</td>
                <td className="px-4 py-2 type-xs">var(--button-primary-foreground)</td>
                <td className="px-4 py-2 type-xs">none</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs">Hover</td>
                <td className="px-4 py-2 type-xs">var(--button-primary-bg-hover)</td>
                <td className="px-4 py-2 type-xs">var(--button-primary-border-hover)</td>
                <td className="px-4 py-2 type-xs">var(--radius)</td>
                <td className="px-4 py-2 type-xs">var(--button-primary-foreground)</td>
                <td className="px-4 py-2 type-xs">none</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs">Active</td>
                <td className="px-4 py-2 type-xs">var(--button-primary-bg-active)</td>
                <td className="px-4 py-2 type-xs">var(--button-primary-border)</td>
                <td className="px-4 py-2 type-xs">var(--radius)</td>
                <td className="px-4 py-2 type-xs">var(--button-primary-foreground)</td>
                <td className="px-4 py-2 type-xs">none</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs">Focus</td>
                <td className="px-4 py-2 type-xs">var(--button-primary-bg)</td>
                <td className="px-4 py-2 type-xs">ring var(--button-primary-ring)</td>
                <td className="px-4 py-2 type-xs">var(--radius)</td>
                <td className="px-4 py-2 type-xs">var(--button-primary-foreground)</td>
                <td className="px-4 py-2 type-xs">none</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs text-primary" rowSpan={2}>Ghost</td>
                <td className="px-4 py-2 text-xs">Resting</td>
                <td className="px-4 py-2 type-xs">transparent</td>
                <td className="px-4 py-2 type-xs">transparent</td>
                <td className="px-4 py-2 type-xs">var(--radius)</td>
                <td className="px-4 py-2 type-xs">window-foreground</td>
                <td className="px-4 py-2 type-xs">none</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs">Hover</td>
                <td className="px-4 py-2 type-xs">white/10</td>
                <td className="px-4 py-2 type-xs">transparent</td>
                <td className="px-4 py-2 type-xs">var(--radius)</td>
                <td className="px-4 py-2 type-xs">white</td>
                <td className="px-4 py-2 type-xs">none</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs text-primary" rowSpan={3}>Launcher</td>
                <td className="px-4 py-2 text-xs">Resting</td>
                <td className="px-4 py-2 type-xs">transparent</td>
                <td className="px-4 py-2 type-xs">border-0</td>
                <td className="px-4 py-2 type-xs">var(--radius)</td>
                <td className="px-4 py-2 type-xs">window-foreground</td>
                <td className="px-4 py-2 type-xs">none</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs">Hover</td>
                <td className="px-4 py-2 type-xs">white/12</td>
                <td className="px-4 py-2 type-xs">border-0</td>
                <td className="px-4 py-2 type-xs">var(--radius)</td>
                <td className="px-4 py-2 type-xs">window-foreground</td>
                <td className="px-4 py-2 type-xs">none</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-xs">Focus</td>
                <td className="px-4 py-2 type-xs">white/10</td>
                <td className="px-4 py-2 type-xs">border-0</td>
                <td className="px-4 py-2 type-xs">var(--radius)</td>
                <td className="px-4 py-2 type-xs">window-foreground</td>
                <td className="px-4 py-2 type-xs">none</td>
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
                <th className="px-4 py-2.5 font-medium text-primary">Prop</th>
                <th className="px-4 py-2.5 font-medium text-primary">Type</th>
                <th className="px-4 py-2.5 font-medium text-primary">Default</th>
              </tr>
            </thead>
            <tbody className="text-secondary">
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 type-xs text-primary">variant</td>
                <td className="px-4 py-2 type-xs">&quot;default&quot; | &quot;ghost&quot; | &quot;launcher&quot;</td>
                <td className="px-4 py-2 type-xs">&quot;default&quot; (canonical Figma primary)</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 type-xs text-primary">size</td>
                <td className="px-4 py-2 type-xs">&quot;default&quot; | &quot;sm&quot; | &quot;icon&quot; | &quot;unset&quot;</td>
                <td className="px-4 py-2 type-xs">&quot;default&quot;</td>
              </tr>
              <tr>
                <td className="px-4 py-2 type-xs text-primary">asChild</td>
                <td className="px-4 py-2 type-xs">boolean</td>
                <td className="px-4 py-2 type-xs">false</td>
              </tr>
            </tbody>
          </table>
        </div>
      </DsSection>
    </div>
  );
}
