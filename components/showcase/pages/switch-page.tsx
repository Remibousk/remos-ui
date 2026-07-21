"use client";

import { useState } from "react";

import { DsSection } from "@/components/showcase/components/ds-section";
import { DsShowcase } from "@/components/showcase/components/ds-showcase";
import { Switch } from "@/components/ui/switch";

export function SwitchPage() {
  const [onOff, setOnOff] = useState(true);
  const [alert, setAlert] = useState(false);
  const [compact, setCompact] = useState(true);

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Switch</h1>
        <p className="max-w-xl text-sm leading-relaxed text-secondary">
          A binary on/off control built on{" "}
          <code className="rounded bg-gray-a3 px-1.5 py-0.5 type-xs text-accent">
            @radix-ui/react-switch
          </code>
          . Use for settings and preferences where the change takes effect immediately — no
          confirm step. The track uses the accent scale when checked and a neutral gray alpha when
          unchecked, so it adapts to every theme automatically.
        </p>
      </div>

      <DsSection title="Variants" description="Controlled usage with label and helper text.">
        <DsShowcase title="Default" description="Canonical size — pairs with body-size labels.">
          <label className="flex items-center gap-3 text-sm text-primary">
            <Switch
              checked={onOff}
              onCheckedChange={setOnOff}
              aria-label="Show widgets"
            />
            <span>Show widgets</span>
          </label>
        </DsShowcase>

        <DsShowcase title="Small" description="Denser rows and inline lists.">
          <label className="flex items-center gap-2 text-sm text-primary">
            <Switch
              size="sm"
              checked={compact}
              onCheckedChange={setCompact}
              aria-label="Compact view"
            />
            <span>Compact view</span>
          </label>
        </DsShowcase>

        <DsShowcase title="Unchecked → Checked" description="Click to see the thumb translate.">
          <Switch
            checked={alert}
            onCheckedChange={setAlert}
            aria-label="Enable alerts"
          />
        </DsShowcase>

        <DsShowcase title="Disabled" description="Non-interactive; opacity drops to 50%.">
          <div className="flex items-center gap-4">
            <Switch checked disabled aria-label="Locked on" />
            <Switch checked={false} disabled aria-label="Locked off" />
          </div>
        </DsShowcase>
      </DsSection>

      <DsSection
        title="Theming"
        description="Tokens drive both track and thumb, so the switch picks up accent and neutral palette changes from the theme accordion — including light mode."
      >
        <DsShowcase title="Checked state">
          <Switch checked aria-label="Checked example" />
        </DsShowcase>
        <DsShowcase title="Unchecked state">
          <Switch checked={false} aria-label="Unchecked example" />
        </DsShowcase>
      </DsSection>

      <DsSection title="Tokens">
        <div className="overflow-hidden rounded-window border border-subtle">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-subtle bg-gray-a2">
                <th className="px-4 py-2.5 font-medium text-primary">Part</th>
                <th className="px-4 py-2.5 font-medium text-primary">State</th>
                <th className="px-4 py-2.5 font-medium text-primary">Token</th>
              </tr>
            </thead>
            <tbody className="text-secondary">
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs text-primary" rowSpan={3}>Track</td>
                <td className="px-4 py-2 text-xs">Checked</td>
                <td className="px-4 py-2 type-xs">bg-accent (var(--accent-solid))</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs">Unchecked</td>
                <td className="px-4 py-2 type-xs">bg-gray-a5</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs">Hover (unchecked)</td>
                <td className="px-4 py-2 type-xs">bg-gray-a6</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs text-primary">Thumb</td>
                <td className="px-4 py-2 text-xs">All</td>
                <td className="px-4 py-2 type-xs">bg-white + inset ring-black/5</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-xs text-primary">Focus</td>
                <td className="px-4 py-2 text-xs">Keyboard</td>
                <td className="px-4 py-2 type-xs">ring-accent/60 offset var(--bg-window)</td>
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
                <td className="px-4 py-2 type-xs text-primary">checked</td>
                <td className="px-4 py-2 type-xs">boolean</td>
                <td className="px-4 py-2 type-xs">—</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 type-xs text-primary">defaultChecked</td>
                <td className="px-4 py-2 type-xs">boolean</td>
                <td className="px-4 py-2 type-xs">false</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 type-xs text-primary">onCheckedChange</td>
                <td className="px-4 py-2 type-xs">(checked: boolean) =&gt; void</td>
                <td className="px-4 py-2 type-xs">—</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 type-xs text-primary">size</td>
                <td className="px-4 py-2 type-xs">&quot;default&quot; | &quot;sm&quot;</td>
                <td className="px-4 py-2 type-xs">&quot;default&quot;</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 type-xs text-primary">disabled</td>
                <td className="px-4 py-2 type-xs">boolean</td>
                <td className="px-4 py-2 type-xs">false</td>
              </tr>
              <tr>
                <td className="px-4 py-2 type-xs text-primary">aria-label</td>
                <td className="px-4 py-2 type-xs">string</td>
                <td className="px-4 py-2 type-xs">required if no visible label</td>
              </tr>
            </tbody>
          </table>
        </div>
      </DsSection>
    </div>
  );
}
