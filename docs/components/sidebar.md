# Sidebar

A responsive navigation panel for app and dashboard layouts. On desktop it's a
fixed panel beside your content; on mobile (below 768px) it becomes an overlay
drawer opened by a trigger button.

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
│   │       └── SidebarItem ← a nav item (renders via `as`, styled by `active`)
│   └── SidebarFooter   ← pinned to the bottom
└── SidebarTrigger   ← hamburger button (shows on mobile); place in your top bar
```

`SidebarProvider` is required — it provides the mobile/open state that `Sidebar`
and `SidebarTrigger` share.

## Usage

The demos below show the desktop (inline) layout. **Resize your browser below
768px** to see the mobile drawer: the sidebar hides and opens via the trigger.

<preview path="../demos/sidebar/sidebar-basic.vue" title="Basic" description="A sidebar with a group of items."></preview>

## Dashboard shell

A full layout: the sidebar beside a main area whose top bar holds the
`SidebarTrigger` (visible on mobile).

<preview path="../demos/sidebar/sidebar-shell.vue" title="Dashboard shell" description="Sidebar + main content with a mobile trigger."></preview>

## Layout

Wrap everything in `SidebarProvider`, then place `Sidebar` and your main content
side by side in a full-height flex container:

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

- **Desktop (≥ 768px):** the sidebar is a fixed inline panel. `SidebarTrigger`
  is hidden.
- **Mobile (< 768px):** the sidebar is hidden and opens as an overlay drawer
  (sliding from the left) when `SidebarTrigger` is tapped. A backdrop appears,
  body scroll is locked, and tapping the backdrop or pressing Escape closes it.

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

## Props

### SidebarItem

| Prop     | Type                  | Default | Description                                                           |
| -------- | --------------------- | ------- | --------------------------------------------------------------------- |
| `as`     | `string \| Component` | `"a"`   | What to render as — `"a"`, `RouterLink`, `NuxtLink`, `"button"`, etc. |
| `active` | `boolean`             | `false` | Whether this is the current route. You control the match logic.       |
| `class`  | `string`              | —       | Classes merged onto the item.                                         |

### SidebarProvider

Wraps the layout and provides responsive state. No props — it manages the mobile
breakpoint and open/close state internally. Use `useSidebar()` if you need to
read or control that state yourself.

### SidebarTrigger

A hamburger button that toggles the mobile drawer. Renders only on mobile. Place
it in your top bar. Takes only `class`.

### Sidebar / SidebarHeader / SidebarContent / SidebarFooter / SidebarGroup

Each takes only `class` (and `SidebarGroup` an optional `label`). `Sidebar`
switches between inline (desktop) and drawer (mobile) automatically.

## Notes

- `SidebarProvider` must wrap the sidebar and trigger.
- Server-side rendering (Nuxt): the breakpoint is detected on the client, so the
  desktop layout renders first and adjusts on hydration.
