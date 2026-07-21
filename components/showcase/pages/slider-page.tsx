"use client";

import { useState } from "react";

import { DsSection } from "@/components/showcase/components/ds-section";
import { DsShowcase } from "@/components/showcase/components/ds-showcase";
import { Slider } from "@/components/ui/slider";

export function SliderPage() {
  const [angle, setAngle] = useState([160]);
  const [volume, setVolume] = useState([45]);
  const [zoom, setZoom] = useState([1]);
  const [range, setRange] = useState([20, 80]);

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Slider</h1>
        <p className="max-w-xl text-sm leading-relaxed text-secondary">
          A continuous range input built on{" "}
          <code className="rounded bg-gray-a3 px-1.5 py-0.5 type-xs text-accent">
            @radix-ui/react-slider
          </code>
          . Use for parameters with a meaningful continuum — angles, volumes,
          opacity, zoom levels — where the user benefits from coarse-to-fine
          adjustment by drag, click, or keyboard. Pair with a numeric readout
          for precision; the slider itself is intentionally unlabelled.
        </p>
      </div>

      <DsSection
        title="Variants"
        description="Controlled usage with labels and value readouts wired in by the consumer."
      >
        <DsShowcase
          title="Default"
          description="Canonical size — pairs with body labels and inline readouts."
        >
          <div className="w-[260px] flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] text-secondary">Volume</span>
              <span className="type-xs tabular-nums text-primary">
                {volume[0]}
              </span>
            </div>
            <Slider
              aria-label="Volume"
              min={0}
              max={100}
              step={1}
              value={volume}
              onValueChange={setVolume}
            />
          </div>
        </DsShowcase>

        <DsShowcase
          title="Small"
          description="Denser layouts — popovers, sidebars, stacked controls."
        >
          <div className="w-[260px] flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="type-2xs text-secondary">
                Angle
              </span>
              <span className="type-2xs tabular-nums text-primary">
                {angle[0]}°
              </span>
            </div>
            <Slider
              aria-label="Angle"
              size="sm"
              min={0}
              max={360}
              step={1}
              value={angle}
              onValueChange={setAngle}
            />
          </div>
        </DsShowcase>

        <DsShowcase
          title="Stepped"
          description="Discrete steps — useful for zoom levels, scale presets, or quality tiers."
        >
          <div className="w-[260px] flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] text-secondary">Zoom</span>
              <span className="type-xs tabular-nums text-primary">
                {zoom[0].toFixed(1)}×
              </span>
            </div>
            <Slider
              aria-label="Zoom"
              min={0.5}
              max={3}
              step={0.25}
              value={zoom}
              onValueChange={setZoom}
            />
          </div>
        </DsShowcase>

        <DsShowcase
          title="Range (two thumbs)"
          description="Pass two values for a min/max selection. Works with any number of thumbs."
        >
          <div className="w-[260px] flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] text-secondary">Brightness</span>
              <span className="type-xs tabular-nums text-primary">
                {range[0]} – {range[1]}
              </span>
            </div>
            <Slider
              aria-label="Brightness range"
              min={0}
              max={100}
              step={1}
              value={range}
              onValueChange={setRange}
            />
          </div>
        </DsShowcase>

        <DsShowcase title="Disabled" description="Non-interactive; opacity drops to 50%.">
          <div className="w-[260px]">
            <Slider
              aria-label="Disabled"
              min={0}
              max={100}
              value={[60]}
              disabled
            />
          </div>
        </DsShowcase>
      </DsSection>

      <DsSection
        title="Usage"
        description="The component is presentation-only — labels, units, and value readouts are the consumer's responsibility. Always provide an accessible name via aria-label or aria-labelledby."
      >
        <DsShowcase
          title="With label and readout"
          description="Recommended pattern. Label on the left, value on the right, slider below."
        >
          <pre className="overflow-x-auto rounded-window border border-subtle bg-gray-a2 p-4 type-xs text-primary">
{`<div className="flex flex-col gap-1.5">
  <div className="flex items-center justify-between gap-2">
    <span className="type-2xs text-secondary">
      Angle
    </span>
    <span className="type-2xs tabular-nums text-primary">
      {angle}°
    </span>
  </div>
  <Slider
    aria-label="Angle"
    size="sm"
    min={0}
    max={360}
    step={1}
    value={[angle]}
    onValueChange={(values) => setAngle(values[0])}
  />
</div>`}
          </pre>
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
                <td className="px-4 py-2 text-xs text-primary" rowSpan={2}>
                  Track
                </td>
                <td className="px-4 py-2 text-xs">Background</td>
                <td className="px-4 py-2 type-xs">bg-gray-a4</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs">Filled range</td>
                <td className="px-4 py-2 type-xs">bg-accent (var(--accent-solid))</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs text-primary" rowSpan={3}>
                  Thumb
                </td>
                <td className="px-4 py-2 text-xs">Default</td>
                <td className="px-4 py-2 type-xs">
                  bg-white + border-default + shadow
                </td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs">Hover</td>
                <td className="px-4 py-2 type-xs">border-accent</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 text-xs">Focus (keyboard)</td>
                <td className="px-4 py-2 type-xs">
                  ring-accent/60 offset var(--bg-window)
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-xs text-primary">Disabled</td>
                <td className="px-4 py-2 text-xs">All parts</td>
                <td className="px-4 py-2 type-xs">opacity-50</td>
              </tr>
            </tbody>
          </table>
        </div>
      </DsSection>

      <DsSection title="Sizing">
        <div className="overflow-hidden rounded-window border border-subtle">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-subtle bg-gray-a2">
                <th className="px-4 py-2.5 font-medium text-primary">Size</th>
                <th className="px-4 py-2.5 font-medium text-primary">Track height</th>
                <th className="px-4 py-2.5 font-medium text-primary">Thumb size</th>
              </tr>
            </thead>
            <tbody className="text-secondary">
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 type-xs text-primary">default</td>
                <td className="px-4 py-2 type-xs">4px (h-1)</td>
                <td className="px-4 py-2 type-xs">16px (size-4)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 type-xs text-primary">sm</td>
                <td className="px-4 py-2 type-xs">3px</td>
                <td className="px-4 py-2 type-xs">12px (size-3)</td>
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
                <td className="px-4 py-2 type-xs text-primary">value</td>
                <td className="px-4 py-2 type-xs">number[]</td>
                <td className="px-4 py-2 type-xs">—</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 type-xs text-primary">defaultValue</td>
                <td className="px-4 py-2 type-xs">number[]</td>
                <td className="px-4 py-2 type-xs">—</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 type-xs text-primary">onValueChange</td>
                <td className="px-4 py-2 type-xs">(value: number[]) =&gt; void</td>
                <td className="px-4 py-2 type-xs">—</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 type-xs text-primary">min</td>
                <td className="px-4 py-2 type-xs">number</td>
                <td className="px-4 py-2 type-xs">0</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 type-xs text-primary">max</td>
                <td className="px-4 py-2 type-xs">number</td>
                <td className="px-4 py-2 type-xs">100</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 type-xs text-primary">step</td>
                <td className="px-4 py-2 type-xs">number</td>
                <td className="px-4 py-2 type-xs">1</td>
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
              <tr className="border-b border-subtle/50">
                <td className="px-4 py-2 type-xs text-primary">orientation</td>
                <td className="px-4 py-2 type-xs">&quot;horizontal&quot; | &quot;vertical&quot;</td>
                <td className="px-4 py-2 type-xs">&quot;horizontal&quot;</td>
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

      <DsSection title="Accessibility">
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-secondary">
          <li>
            Each thumb is a focusable element with an{" "}
            <code className="rounded bg-gray-a3 px-1.5 py-0.5 type-xs text-accent">
              role=&quot;slider&quot;
            </code>
            ; arrow keys move by{" "}
            <code className="rounded bg-gray-a3 px-1.5 py-0.5 type-xs text-accent">
              step
            </code>
            , <kbd>PageUp</kbd>/<kbd>PageDown</kbd> by 10×, <kbd>Home</kbd>/<kbd>End</kbd>{" "}
            jump to bounds.
          </li>
          <li>
            Always pass{" "}
            <code className="rounded bg-gray-a3 px-1.5 py-0.5 type-xs text-accent">
              aria-label
            </code>{" "}
            (or{" "}
            <code className="rounded bg-gray-a3 px-1.5 py-0.5 type-xs text-accent">
              aria-labelledby
            </code>
            ) — the visual label sits next to the slider, not on a wrapping{" "}
            <code className="rounded bg-gray-a3 px-1.5 py-0.5 type-xs text-accent">
              &lt;label&gt;
            </code>
            .
          </li>
          <li>
            Touch targets meet 24×24 minimums in both sizes (the slider root
            has padding around the thumb hit area via Radix).
          </li>
        </ul>
      </DsSection>
    </div>
  );
}
