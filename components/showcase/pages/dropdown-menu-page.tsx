"use client";

import { ChevronRight, MoreHorizontal } from "lucide-react";

import { DsSection } from "@/components/showcase/components/ds-section";
import { DsShowcase } from "@/components/showcase/components/ds-showcase";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DropdownMenuPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Dropdown Menu</h1>
        <p className="max-w-xl text-sm leading-relaxed text-secondary">
          Built on <code className="rounded bg-gray-a3 px-1.5 py-0.5 type-xs text-accent">@radix-ui/react-dropdown-menu</code> with
          OS-native styling — frosted glass backdrop, window-border chrome, and selection highlights.
        </p>
      </div>

      <DsSection title="Basic Menu" description="A simple dropdown with actions and a separator.">
        <DsShowcase>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="mr-1.5 size-4" />
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>New File</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </DsShowcase>
      </DsSection>

      <DsSection title="Submenu" description="Nested menus using the Radix Sub primitive.">
        <DsShowcase>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">Open menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Cut</DropdownMenuItem>
              <DropdownMenuItem>Copy</DropdownMenuItem>
              <DropdownMenuItem>Paste</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  Share
                  <ChevronRight className="ml-auto size-3.5 text-secondary" />
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Email</DropdownMenuItem>
                  <DropdownMenuItem>Messages</DropdownMenuItem>
                  <DropdownMenuItem>AirDrop</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
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
                <td className="px-4 py-2 text-xs text-primary">Content</td>
                <td className="px-4 py-2 text-xs">Resting</td>
                <td className="px-4 py-2 type-xs">window/95 backdrop-blur-xl</td>
                <td className="px-4 py-2 type-xs">window-border-strong</td>
                <td className="px-4 py-2 type-xs">12px</td>
                <td className="px-4 py-2 type-xs">window-foreground</td>
                <td className="px-4 py-2 type-xs">window</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs text-primary" rowSpan={2}>Item</td>
                <td className="px-4 py-2 text-xs">Resting</td>
                <td className="px-4 py-2 type-xs">transparent</td>
                <td className="px-4 py-2 type-xs">transparent</td>
                <td className="px-4 py-2 type-xs">10px</td>
                <td className="px-4 py-2 type-xs">window-foreground</td>
                <td className="px-4 py-2 type-xs">none</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs">Focus</td>
                <td className="px-4 py-2 type-xs">selection</td>
                <td className="px-4 py-2 type-xs">transparent</td>
                <td className="px-4 py-2 type-xs">10px</td>
                <td className="px-4 py-2 type-xs">window-foreground</td>
                <td className="px-4 py-2 type-xs">none</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-xs text-primary">Separator</td>
                <td className="px-4 py-2 text-xs">Resting</td>
                <td className="px-4 py-2 type-xs">window-border/80</td>
                <td className="px-4 py-2 type-xs">—</td>
                <td className="px-4 py-2 type-xs">—</td>
                <td className="px-4 py-2 type-xs">—</td>
                <td className="px-4 py-2 type-xs">none</td>
              </tr>
            </tbody>
          </table>
        </div>
      </DsSection>
    </div>
  );
}
