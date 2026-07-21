import { MoreVertical, Star, Trash2 } from "lucide-react";

import { DsSection } from "@/components/showcase/components/ds-section";
import { DsShowcase } from "@/components/showcase/components/ds-showcase";
import { SelectorTile, TileIconButton } from "@/components/ui/selector-tile";

export function SelectorTilePage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Selector Tile
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-secondary">
          A sidebar list item used to select an entity such as a note. It
          displays a title and subtitle, supports active/inactive states, and
          can host a trailing icon button for contextual actions.
        </p>
      </div>

      <DsSection
        title="States"
        description="The tile toggles between a resting state with a hover highlight and an active state with the selection background."
      >
        <DsShowcase title="Inactive" description="Default resting state. Hover reveals a subtle background.">
          <div className="w-56">
            <SelectorTile
              title="Meeting Notes"
              subtitle="meeting-notes.md"
              action={<TileIconButton icon={MoreVertical} label="Options" />}
            />
          </div>
        </DsShowcase>

        <DsShowcase title="Hover" description="Hover state with visible background highlight.">
          <div className="w-56">
            <SelectorTile
              title="Meeting Notes"
              subtitle="meeting-notes.md"
              forceHover
              action={<TileIconButton icon={MoreVertical} label="Options" />}
            />
          </div>
        </DsShowcase>

        <DsShowcase title="Active" description="Selected tile uses bg-accent-a3 to indicate the current item.">
          <div className="w-56">
            <SelectorTile
              title="Meeting Notes"
              subtitle="meeting-notes.md"
              active
              action={<TileIconButton icon={MoreVertical} label="Options" />}
            />
          </div>
        </DsShowcase>
      </DsSection>

      <DsSection
        title="With & without action"
        description="The trailing action slot is optional. When omitted the tile is a plain selector."
      >
        <DsShowcase title="With action" description="A trailing icon button provides contextual actions.">
          <div className="w-56">
            <SelectorTile
              title="Project Ideas"
              subtitle="project-ideas.md"
              active
              action={<TileIconButton icon={MoreVertical} label="Options" />}
            />
          </div>
        </DsShowcase>

        <DsShowcase title="Without action" description="Plain tile with no trailing button.">
          <div className="w-56">
            <SelectorTile
              title="Project Ideas"
              subtitle="project-ideas.md"
              active
            />
          </div>
        </DsShowcase>
      </DsSection>

      <DsSection
        title="Tile Icon Button"
        description="A compact ghost icon button designed for use inside a selector tile. Uses size-8 with a 10px border radius to match the tile's inner rounding."
      >
        <DsShowcase title="Variants" description="Any lucide icon can be slotted in. The button inherits window-muted text and brightens on hover.">
          <TileIconButton icon={MoreVertical} label="More options" />
          <TileIconButton icon={Trash2} label="Delete" />
          <TileIconButton icon={Star} label="Favorite" />
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
              </tr>
            </thead>
            <tbody className="text-secondary">
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs text-primary" rowSpan={3}>SelectorTile</td>
                <td className="px-4 py-2 text-xs">Resting</td>
                <td className="px-4 py-2 type-xs">transparent</td>
                <td className="px-4 py-2 type-xs">transparent</td>
                <td className="px-4 py-2 type-xs">var(--radius)</td>
                <td className="px-4 py-2 type-xs">window-foreground</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs">Hover</td>
                <td className="px-4 py-2 type-xs">gray-a3</td>
                <td className="px-4 py-2 type-xs">transparent</td>
                <td className="px-4 py-2 type-xs">var(--radius)</td>
                <td className="px-4 py-2 type-xs">window-foreground</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs">Active</td>
                <td className="px-4 py-2 type-xs">selection</td>
                <td className="px-4 py-2 type-xs">transparent</td>
                <td className="px-4 py-2 type-xs">var(--radius)</td>
                <td className="px-4 py-2 type-xs">window-foreground</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs text-primary" rowSpan={2}>TileIconButton</td>
                <td className="px-4 py-2 text-xs">Resting</td>
                <td className="px-4 py-2 type-xs">transparent</td>
                <td className="px-4 py-2 type-xs">transparent</td>
                <td className="px-4 py-2 type-xs">var(--radius)</td>
                <td className="px-4 py-2 type-xs">window-muted</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-xs">Hover</td>
                <td className="px-4 py-2 type-xs">gray-a3</td>
                <td className="px-4 py-2 type-xs">transparent</td>
                <td className="px-4 py-2 type-xs">var(--radius)</td>
                <td className="px-4 py-2 type-xs">window-foreground</td>
              </tr>
            </tbody>
          </table>
        </div>
      </DsSection>

      <DsSection title="Props — Selector Tile">
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
                <td className="px-4 py-2 type-xs text-primary">title</td>
                <td className="px-4 py-2 type-xs">string</td>
                <td className="px-4 py-2 type-xs">—</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 type-xs text-primary">subtitle</td>
                <td className="px-4 py-2 type-xs">string</td>
                <td className="px-4 py-2 type-xs">—</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 type-xs text-primary">active</td>
                <td className="px-4 py-2 type-xs">boolean</td>
                <td className="px-4 py-2 type-xs">false</td>
              </tr>
              <tr>
                <td className="px-4 py-2 type-xs text-primary">action</td>
                <td className="px-4 py-2 type-xs">ReactNode</td>
                <td className="px-4 py-2 type-xs">undefined</td>
              </tr>
            </tbody>
          </table>
        </div>
      </DsSection>

      <DsSection title="Props — Tile Icon Button">
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
                <td className="px-4 py-2 type-xs text-primary">icon</td>
                <td className="px-4 py-2 type-xs">{"ComponentType<{ className?: string }>"}</td>
                <td className="px-4 py-2 type-xs">—</td>
              </tr>
              <tr>
                <td className="px-4 py-2 type-xs text-primary">label</td>
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
