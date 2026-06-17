<script setup lang="ts">
import { Panel, PanelContent } from "@dlbcodes/my-design-system";

const features = [
    {
        title: "Tokenized by design",
        details:
            "Every component is built on semantic CSS-variable tokens. Restyle the whole system by overriding tokens — no component edits, no specificity wars.",
    },
    {
        title: "Accessible out of the box",
        details:
            "Overlays, menus, tabs, and dialogs are built on Headless UI, so focus management, keyboard navigation, and ARIA wiring come handled — not bolted on.",
    },
    {
        title: "Composable, not configurable",
        details:
            "Compound components like Select, Tabs, and Modal expose their parts (Trigger, Content, Item), so you compose the markup you need instead of wrestling a monolith of props.",
    },
    {
        title: "Tailwind v4 native",
        details:
            "Ships its tokens and source for your Tailwind build to scan — utilities resolve against your config, classes tree-shake, and there's no precompiled CSS to override.",
    },
    {
        title: "Typed and predictable",
        details:
            "Written in TypeScript with explicit prop interfaces and class-variance-authority variants, so editor autocomplete and type-checking guide every usage.",
    },
    {
        title: "Standalone or wired",
        details:
            "Form controls work on their own, or drop them in a Field to auto-wire labels, descriptions, errors, and the ARIA between them — your choice, per use.",
    },
];
</script>

<template>
    <section class="mx-auto max-w-7xl px-6 py-16">
        <div class="mx-auto mb-12 flex max-w-3xl flex-col gap-3 text-center">
            <h2 class="text-3xl font-semibold tracking-tight text-text-primary">
                Built on principles, not shortcuts
            </h2>
            <p class="text-base leading-relaxed text-text-secondary">
                A small set of decisions, applied consistently — so the library
                stays predictable as it grows.
            </p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Panel v-for="feature in features" :key="feature.title">
                <PanelContent
                    class="flex flex-col gap-2 rounded-2xl border border-border-subtle bg-bg-raised p-6"
                >
                    <h3 class="text-base font-medium text-text-primary">
                        {{ feature.title }}
                    </h3>
                    <p class="text-sm leading-relaxed text-text-secondary">
                        {{ feature.details }}
                    </p>
                </PanelContent>
            </Panel>
        </div>
    </section>
</template>
