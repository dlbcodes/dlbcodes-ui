# @dlbcodes/ui

A personal, reusable component library for Vue 3 — tokenized, accessible, and built to be composed.

## Goal

A standalone design system to drop into any Vue project: a small set of well-made,
consistent components instead of rebuilding buttons, inputs, and modals from scratch
every time. The philosophy is shadcn-inspired — compound components you compose
(`Field` + `Label` + `Input`, `Modal` + `ModalHeader` + `ModalContent`) rather than
monolithic components with dozens of props.

## Built with

- **Vue 3** + **TypeScript**
- **Vite** (library build)
- **Tailwind CSS v4** with semantic design tokens
- **Headless UI** + **Float** for accessible overlays
- **Vitest** for component tests

## Installation

```bash
npm install @dlbcodes/ui
```

Peer dependencies:

```bash
npm install vue vue-router
```

## Setup (Tailwind v4)

In your main CSS, import the tokens and point Tailwind at the package so it scans
the component classes:

```css
@import "tailwindcss";
@import "@dlbcodes/ui/tokens.css";
@source "../node_modules/@dlbcodes/ui/dist";
```

## Usage

```vue
<script setup lang="ts">
import { Button } from "@dlbcodes/ui";
</script>

<template>
    <Button variant="primary">Click me</Button>
</template>
```

## Principles

- **Tokenized** — colors, spacing, and surfaces come from semantic design tokens,
  not hardcoded values, so the whole system is themeable from one place.
- **Accessible** — ARIA wiring, focus management, and labels are built in, judged
  per component.
- **Composable** — small parts that combine, over large components with many props.

## Documentation

Full component docs and live examples: [ui.dlbcodes.com](https://ui.dlbcodes.com)

## License

MIT © Daniel Lobo
