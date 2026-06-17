# Getting Started

`@dlbcodes/my-design-system` is an accessible, tokenized Vue 3 component
library. It ships its components and design tokens for your own Tailwind v4
build to consume — so the styling stays yours to theme.

## Prerequisites

This library is built for **Vue 3** and **Tailwind CSS v4**. You'll need a
project already using both. If you're starting fresh:

<code-block lang="bash">

```bash
npm create vite@latest my-app -- --template vue-ts
cd my-app
npm install tailwindcss @tailwindcss/vite
```

</code-block>

## Installation

Install the package:

<code-block lang="bash">

```bash
npm install @dlbcodes/my-design-system
```

</code-block>

Then install the peer dependencies if you don't already have them:

<code-block lang="bash">

```bash
npm install vue vue-router
```

</code-block>

`vue-router` is required because some components (like `Button`) can render as
router links.

## Tailwind setup

The library ships its design tokens and its source so your Tailwind build can
scan the component classes. In your main CSS file, add three lines:

<code-block lang="css">

```css
@import "tailwindcss";
@import "@dlbcodes/my-design-system/tokens.css";
@source "../node_modules/@dlbcodes/my-design-system/dist";
```

</code-block>

What each line does:

- `@import "tailwindcss"` — Tailwind itself (you likely already have this).
- `@import "@dlbcodes/my-design-system/tokens.css"` — the design tokens (colors,
  surfaces, spacing) the components reference. Override these to theme the system.
- `@source "..."` — tells Tailwind to scan the library's built files so the
  utility classes the components use are generated in your build.

Adjust the `@source` path if your CSS file sits at a different depth relative to
`node_modules`.

## Usage

Import components by name and use them in your templates:

<code-block lang="vue">

```vue
<script setup lang="ts">
import { Button } from "@dlbcodes/my-design-system";
</script>

<template>
    <Button variant="primary">Get started</Button>
</template>
```

</code-block>

Components are **compound** where it makes sense — you compose the parts rather
than configuring one big component:

<code-block lang="vue">

```vue
<script setup lang="ts">
import {
    Field,
    FieldLabel,
    FieldContent,
    Input,
} from "@dlbcodes/my-design-system";
</script>

<template>
    <Field>
        <FieldLabel>Email</FieldLabel>
        <FieldContent>
            <Input type="email" placeholder="you@example.com" />
        </FieldContent>
    </Field>
</template>
```

</code-block>

## Theming

Because every component reads from semantic tokens, you can restyle the whole
system by overriding the token values — no component edits needed. Override the
relevant CSS variables after importing the tokens:

<code-block lang="css">

```css
@import "@dlbcodes/my-design-system/tokens.css";

:root {
    /* override a token to retheme everywhere it's used */
    --color-bg-surface: oklch(0.98 0 0);
}
```

</code-block>

## Next steps

Browse the [components](/components/button) to see what's available, each with
live examples and props.

> This library is in early alpha (`0.x`) — the API may change between releases.
