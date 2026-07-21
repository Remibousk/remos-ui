import { Bell, MoreVertical, Plus, Search, Settings, Trash2 } from "lucide-react";

import { DsSection } from "@/components/showcase/components/ds-section";
import { DsShowcase } from "@/components/showcase/components/ds-showcase";
import { IconButton } from "@/components/ui/icon-button";

export function IconButtonPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Icon Button
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-secondary">
          A compact, square button for single-icon actions. Used anywhere a labeled{" "}
          <code className="rounded bg-gray-a2 px-1 py-0.5 type-xs">Button</code>{" "}
          would feel heavy — toolbar triggers, window chrome, menu openers. Children
          render at a fixed size driven by the{" "}
          <code className="rounded bg-gray-a2 px-1 py-0.5 type-xs">size</code>{" "}
          variant; an{" "}
          <code className="rounded bg-gray-a2 px-1 py-0.5 type-xs">
            aria-label
          </code>{" "}
          is required.
        </p>
      </div>

      <DsSection
        title="Variants"
        description="Three surface treatments for common contexts."
      >
        <DsShowcase
          title="Default"
          description="Subtle surface with a visible border — the canonical toolbar treatment used by the Files &quot;More options&quot; trigger."
        >
          <IconButton aria-label="More options">
            <MoreVertical aria-hidden="true" />
          </IconButton>
          <IconButton aria-label="Notifications">
            <Bell aria-hidden="true" />
          </IconButton>
          <IconButton aria-label="Settings" disabled>
            <Settings aria-hidden="true" />
          </IconButton>
        </DsShowcase>

        <DsShowcase
          title="Ghost"
          description="No resting surface. Reveals on hover. Use inside dense rows or when the surrounding container already carries a border."
        >
          <IconButton variant="ghost" aria-label="Search">
            <Search aria-hidden="true" />
          </IconButton>
          <IconButton variant="ghost" aria-label="More options">
            <MoreVertical aria-hidden="true" />
          </IconButton>
          <IconButton variant="ghost" aria-label="Delete" disabled>
            <Trash2 aria-hidden="true" />
          </IconButton>
        </DsShowcase>

        <DsShowcase
          title="Solid"
          description="High-emphasis accent fill. Reserve for primary actions like &quot;Create new&quot; in an empty toolbar."
        >
          <IconButton variant="solid" aria-label="Create new">
            <Plus aria-hidden="true" />
          </IconButton>
          <IconButton variant="solid" aria-label="Create new" disabled>
            <Plus aria-hidden="true" />
          </IconButton>
        </DsShowcase>
      </DsSection>

      <DsSection
        title="Sizes"
        description="Square 1:1 targets. The icon inside scales with the size variant via a descendant selector, so you don't set svg sizing yourself."
      >
        <DsShowcase title="sm — 28px" description="Compact toolbars, inline row actions.">
          <IconButton size="sm" aria-label="More options">
            <MoreVertical aria-hidden="true" />
          </IconButton>
          <IconButton size="sm" variant="ghost" aria-label="More options">
            <MoreVertical aria-hidden="true" />
          </IconButton>
        </DsShowcase>

        <DsShowcase
          title="md — 32px (default)"
          description="Default toolbar trigger size. Matches the Files app &quot;More options&quot; button."
        >
          <IconButton aria-label="More options">
            <MoreVertical aria-hidden="true" />
          </IconButton>
          <IconButton variant="ghost" aria-label="More options">
            <MoreVertical aria-hidden="true" />
          </IconButton>
        </DsShowcase>

        <DsShowcase title="lg — 40px" description="Prominent, tap-friendly triggers.">
          <IconButton size="lg" aria-label="More options">
            <MoreVertical aria-hidden="true" />
          </IconButton>
          <IconButton size="lg" variant="solid" aria-label="Create new">
            <Plus aria-hidden="true" />
          </IconButton>
        </DsShowcase>
      </DsSection>

      <DsSection
        title="Usage"
        description="IconButton forwards refs (for positioning menus under it) and accepts all native button attributes."
      >
        <div className="rounded-window border border-subtle bg-gray-a3 p-4 type-xs text-secondary">
          <pre className="whitespace-pre-wrap">{`import { IconButton } from "@/components/ui/icon-button";
import { MoreVertical } from "lucide-react";

<IconButton
  ref={triggerRef}
  aria-label="More options"
  aria-haspopup="menu"
  aria-expanded={open}
  onClick={toggle}
>
  <MoreVertical aria-hidden="true" />
</IconButton>`}</pre>
        </div>
        <ul className="list-disc space-y-1.5 pl-5 text-sm text-secondary">
          <li>
            <code className="type-xs text-accent">aria-label</code> is
            required — the icon is the only visual label.
          </li>
          <li>
            Mark the icon with{" "}
            <code className="type-xs text-accent">aria-hidden=&quot;true&quot;</code>{" "}
            so screen readers don&apos;t double-announce.
          </li>
          <li>
            Pair with <code className="type-xs text-accent">aria-haspopup</code>{" "}
            and <code className="type-xs text-accent">aria-expanded</code> when
            the button opens a menu.
          </li>
          <li>
            The ref forwards to the underlying{" "}
            <code className="type-xs text-accent">&lt;button&gt;</code> — useful
            for anchoring popovers via{" "}
            <code className="type-xs text-accent">
              getBoundingClientRect()
            </code>
            .
          </li>
          <li>
            <code className="type-xs text-accent">type</code> defaults to{" "}
            <code className="type-xs text-accent">&quot;button&quot;</code> so
            it won&apos;t accidentally submit parent forms.
          </li>
        </ul>
      </DsSection>

      <DsSection title="Tokens">
        <div className="overflow-hidden rounded-window border border-subtle">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-subtle bg-gray-a2">
                <th className="px-4 py-2.5 font-medium text-primary">
                  Variant
                </th>
                <th className="px-4 py-2.5 font-medium text-primary">State</th>
                <th className="px-4 py-2.5 font-medium text-primary">
                  Background
                </th>
                <th className="px-4 py-2.5 font-medium text-primary">Border</th>
                <th className="px-4 py-2.5 font-medium text-primary">Radius</th>
                <th className="px-4 py-2.5 font-medium text-primary">Text</th>
                <th className="px-4 py-2.5 font-medium text-primary">Ring</th>
              </tr>
            </thead>
            <tbody className="text-secondary">
              <tr className="border-b border-subtle/50">
                <td
                  className="px-4 py-2 text-xs text-primary"
                  rowSpan={3}
                >
                  Default
                </td>
                <td className="px-4 py-2 text-xs">Resting</td>
                <td className="px-4 py-2 type-xs">gray-a2</td>
                <td className="px-4 py-2 type-xs">border-subtle</td>
                <td className="px-4 py-2 type-xs">10px</td>
                <td className="px-4 py-2 type-xs">text-primary</td>
                <td className="px-4 py-2 type-xs">none</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs">Hover</td>
                <td className="px-4 py-2 type-xs">gray-a3</td>
                <td className="px-4 py-2 type-xs">border-subtle</td>
                <td className="px-4 py-2 type-xs">10px</td>
                <td className="px-4 py-2 type-xs">text-primary</td>
                <td className="px-4 py-2 type-xs">none</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs">Focus</td>
                <td className="px-4 py-2 type-xs">gray-a2</td>
                <td className="px-4 py-2 type-xs">border-subtle</td>
                <td className="px-4 py-2 type-xs">10px</td>
                <td className="px-4 py-2 type-xs">text-primary</td>
                <td className="px-4 py-2 type-xs">accent/80</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs text-primary" rowSpan={2}>
                  Ghost
                </td>
                <td className="px-4 py-2 text-xs">Resting</td>
                <td className="px-4 py-2 type-xs">transparent</td>
                <td className="px-4 py-2 type-xs">transparent</td>
                <td className="px-4 py-2 type-xs">10px</td>
                <td className="px-4 py-2 type-xs">text-primary</td>
                <td className="px-4 py-2 type-xs">none</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs">Hover</td>
                <td className="px-4 py-2 type-xs">gray-a3</td>
                <td className="px-4 py-2 type-xs">transparent</td>
                <td className="px-4 py-2 type-xs">10px</td>
                <td className="px-4 py-2 type-xs">text-primary</td>
                <td className="px-4 py-2 type-xs">none</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs text-primary" rowSpan={2}>
                  Solid
                </td>
                <td className="px-4 py-2 text-xs">Resting</td>
                <td className="px-4 py-2 type-xs">accent</td>
                <td className="px-4 py-2 type-xs">border-0</td>
                <td className="px-4 py-2 type-xs">10px</td>
                <td className="px-4 py-2 type-xs">accent-foreground</td>
                <td className="px-4 py-2 type-xs">none</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-xs">Hover</td>
                <td className="px-4 py-2 type-xs">accent/90</td>
                <td className="px-4 py-2 type-xs">border-0</td>
                <td className="px-4 py-2 type-xs">10px</td>
                <td className="px-4 py-2 type-xs">accent-foreground</td>
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
                <th className="px-4 py-2.5 font-medium text-primary">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="text-secondary">
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 type-xs text-primary">variant</td>
                <td className="px-4 py-2 type-xs">
                  &quot;default&quot; | &quot;ghost&quot; | &quot;solid&quot;
                </td>
                <td className="px-4 py-2 type-xs">&quot;default&quot;</td>
                <td className="px-4 py-2 text-xs">Visual treatment of the surface.</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 type-xs text-primary">size</td>
                <td className="px-4 py-2 type-xs">
                  &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;
                </td>
                <td className="px-4 py-2 type-xs">&quot;md&quot;</td>
                <td className="px-4 py-2 text-xs">
                  Sets button + nested svg dimensions (28 / 32 / 40&nbsp;px).
                </td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 type-xs text-primary">aria-label</td>
                <td className="px-4 py-2 type-xs">string</td>
                <td className="px-4 py-2 type-xs">—</td>
                <td className="px-4 py-2 text-xs">
                  Required. The button&apos;s accessible name.
                </td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 type-xs text-primary">type</td>
                <td className="px-4 py-2 type-xs">
                  &quot;button&quot; | &quot;submit&quot; | &quot;reset&quot;
                </td>
                <td className="px-4 py-2 type-xs">&quot;button&quot;</td>
                <td className="px-4 py-2 text-xs">
                  Defaults to non-submit so it&apos;s safe inside forms.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 type-xs text-primary">ref</td>
                <td className="px-4 py-2 type-xs">
                  Ref&lt;HTMLButtonElement&gt;
                </td>
                <td className="px-4 py-2 type-xs">—</td>
                <td className="px-4 py-2 text-xs">
                  Forwarded to the underlying button; used to anchor menus.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </DsSection>
    </div>
  );
}
