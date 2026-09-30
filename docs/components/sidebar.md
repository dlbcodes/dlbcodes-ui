# Sidebar

A responsive navigation panel for app and dashboard layouts. On desktop it's a
fixed panel beside your content that can be collapsed; on mobile (below 768px)
it becomes an overlay drawer. A single `SidebarTrigger` controls both — it
collapses the panel on desktop and opens the drawer on mobile.

Sidebar is a **compound** component built around a `SidebarProvider` that holds
the responsive state. Items are **framework-agnostic** — they render via an `as`
prop (a plain link, `RouterLink`, or `NuxtLink`), and you control the active state.

## Anatomy

```
SidebarProvider     ← holds responsive state; wrap everything in it
├── Sidebar         ← inline panel (desktop) / overlay drawer (mobile)
│   ├── SidebarHeader   ← logo / app name
│   ├── SidebarContent  ← scrollable nav area
│   │   └── SidebarGroup  ← an optionally-labeled group
│   │       └── SidebarItem ← a nav item (renders via as, styled by active)
│   └── SidebarFooter   ← pinned to the bottom
└── SidebarTrigger   ← toggles the sidebar; place it in your top bar
```

`SidebarProvider` is required — it provides the responsive and collapsed state
that `Sidebar` and `SidebarTrigger` share.

## Usage

The demos below show the desktop (inline) layout. Use the trigger to collapse
the sidebar, and **resize your browser below 768px** to see the mobile drawer.

<preview path="../demos/sidebar/sidebar-basic.vue" title="Basic" description="A sidebar with a group of items."></preview>

## Dashboard shell

A full layout: the sidebar beside a main area whose top bar holds the
`SidebarTrigger`. Click the trigger to collapse the sidebar on desktop, or open
the drawer on mobile.

<preview path="../demos/sidebar/sidebar-shell.vue" title="Dashboard shell" description="Sidebar + main content with a collapse trigger."></preview>

## Layout

Wrap everything in `SidebarProvider`, then place `Sidebar` and your main content
side by side in a full-height flex container. Put a `SidebarTrigger` in your top
bar to control it:

```vue
<template>
    <SidebarProvider>
        <div class="flex h-screen">
            <Sidebar>
                <SidebarHeader>Acme</SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarItem
                            :as="RouterLink"
                            to="/"
                            :active="route.path === '/'"
                        >
                            Dashboard
                        </SidebarItem>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>

            <main class="flex-1 overflow-auto">
                <header
                    class="flex items-center gap-2 border-b border-border-subtle p-4"
                >
                    <SidebarTrigger />
                    <h1>Dashboard</h1>
                </header>
                <!-- page content -->
            </main>
        </div>
    </SidebarProvider>
</template>
```

## Responsive behavior

- **Desktop (≥ 768px):** the sidebar is an inline panel. `SidebarTrigger`
  collapses it (hides it entirely), giving the content full width; clicking
  again brings it back.
- **Mobile (< 768px):** the sidebar is hidden and opens as an overlay drawer
  (sliding from the left) when `SidebarTrigger` is tapped. A backdrop appears,
  body scroll is locked, and tapping the backdrop or pressing Escape closes it.
  The scroll lock is released when the drawer closes, when the sidebar is
  removed, or when the window grows past the breakpoint.

The same `SidebarTrigger` handles both — it collapses on desktop and opens the
drawer on mobile, automatically.

## Controlling state

Use `useSidebar()` to read or control the state yourself:

```vue
<script setup lang="ts">
import { useSidebar } from "@dlbcodes/ui";

const { collapsed, isMobile, open, close, toggle } = useSidebar();
</script>
```

- `collapsed` — whether the desktop sidebar is collapsed (hidden).
- `isMobile` — whether the viewport is below the mobile breakpoint.
- `open` / `close` / `toggle` — control the sidebar; each acts on the drawer
  (mobile) or the collapsed state (desktop), automatically.

## Routing

`SidebarItem` renders as whatever you pass to `as`, with consumer-controlled
`active` — so it works in plain Vue and Nuxt:

```vue
<!-- Vue (vue-router) -->

<SidebarItem
    :as="RouterLink"
    to="/"
    :active="route.path === '/'"
>Home</SidebarItem>

<!-- Nuxt -->

<SidebarItem
    :as="NuxtLink"
    to="/"
    :active="$route.path === '/'"
>Home</SidebarItem>
```

## Theming

The sidebar has its own set of theme variables, separate from the page, so you
can give it a different look, such as a darker or tinted panel, without touching
the rest of the UI:

<code-block lang="css">

```css
:root {
    --sidebar: oklch(96% 0.01 260);
    --sidebar-foreground: oklch(25% 0.02 260);
    --sidebar-accent: oklch(92% 0.02 260); /* active and hover item */
    --sidebar-border: oklch(88% 0.01 260);
}

.dark {
    --sidebar: oklch(22% 0.01 260);
    --sidebar-foreground: oklch(95% 0.01 260);
    --sidebar-accent: oklch(30% 0.02 260);
    --sidebar-border: oklch(100% 0 0 / 10%);
}
```

</code-block>

`--sidebar` is the panel background, `--sidebar-accent` is the active and hover
highlight for items, and inactive items use `--sidebar-foreground` slightly
faded. See [Theming](/guide/theming) for the full list.

## Props

### SidebarItem

| Prop     | Type                  | Default | Description                                                           |
| -------- | --------------------- | ------- | --------------------------------------------------------------------- |
| `as`     | `string \| Component` | `"a"`   | What to render as — `"a"`, `RouterLink`, `NuxtLink`, `"button"`, etc. |
| `active` | `boolean`             | `false` | Whether this is the current route. You control the match logic.       |
| `class`  | `string`              | —       | Classes merged onto the item.                                         |

### SidebarProvider

Wraps the layout and provides responsive + collapsed state. No props — it manages
the mobile breakpoint, drawer, and desktop collapse internally. Use
`useSidebar()` to read or control that state.

### SidebarTrigger

A button that toggles the sidebar — collapsing it on desktop, or opening the
drawer on mobile. Place it in your top bar. Takes only `class`.

### Sidebar / SidebarHeader / SidebarContent / SidebarFooter / SidebarGroup

Each takes only `class` (and `SidebarGroup` an optional `label`). `Sidebar`
switches between inline (desktop), collapsed (hidden), and drawer (mobile)
automatically.

## Notes

- `SidebarProvider` must wrap the sidebar and trigger.
- Server-side rendering (Nuxt): the breakpoint is detected on the client, so the
  desktop layout renders first and adjusts on hydration.
- The mobile drawer does not trap keyboard focus yet: Tab can move to the page
  behind it. Escape and the backdrop close it.
