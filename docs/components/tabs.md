# Tabs

Switch between related panels of content within the same context — settings
sections, views of a dataset, or steps in a flow. Built on Headless UI's tabs,
so keyboard navigation (arrow keys, Home/End), focus, and `role="tab"`/`tabpanel`
wiring are handled for you.

Tabs is a **compound component**. Because it's built on Headless UI, the triggers
and panels are matched **by order** — the first trigger controls the first panel,
and so on.

## Anatomy

```
Tabs ← the root; sets the default/selected tab
├── TabsList ← the pill bar containing the triggers
│ └── TabsTrigger ← one per tab (its content is the label)
└── TabsPanels ← wraps the panels
└── TabsContent ← one per tab; shown when its tab is selected
```

Keep the triggers and panels in the **same order** — the Nth trigger pairs with
the Nth panel.

## Usage

<preview path="../demos/tabs/tabs-basic.vue" title="Basic" description="A set of tabs and their panels."></preview>

## Default tab

Use `defaultIndex` on `Tabs` to choose which tab is selected initially (0-based).

<preview path="../demos/tabs/tabs-default-index.vue" title="Default tab" description="Starting on the second tab."></preview>

## With icons

A trigger's content is slot content, so you can include an icon alongside the
label.

<preview path="../demos/tabs/tabs-icons.vue" title="With icons" description="Icon + label triggers."></preview>

## Disabled tab

Mark a trigger `disabled` to make it non-selectable — it's skipped by keyboard
navigation.

<preview path="../demos/tabs/tabs-disabled.vue" title="Disabled tab" description="A non-selectable tab."></preview>

## Controlled

For full control, bind `selectedIndex` and listen for `change` instead of using
`defaultIndex`:

```vue
<Tabs :selected-index="active" @change="active = $event">

  <!-- … -->
</Tabs>
```

Use `manual` on `Tabs` if you'd rather a tab activate only on Enter/Space (not as
soon as it's focused) — useful when switching tabs triggers expensive work.

## Props

### Tabs

| Prop            | Type      | Default | Description                                              |
| --------------- | --------- | ------- | -------------------------------------------------------- |
| `defaultIndex`  | `number`  | `0`     | Initially selected tab (uncontrolled), 0-based.          |
| `selectedIndex` | `number`  | —       | Controlled selected tab. Pair with `@change`.            |
| `manual`        | `boolean` | `false` | Activate a tab only on Enter/Space rather than on focus. |
| `class`         | `string`  | —       | Classes merged onto the root.                            |

Emits `change` with the new index when the selected tab changes.

### TabsTrigger

| Prop       | Type      | Default | Description                                        |
| ---------- | --------- | ------- | -------------------------------------------------- |
| `disabled` | `boolean` | `false` | Disables the tab — skipped by keyboard navigation. |
| `class`    | `string`  | —       | Classes merged onto the trigger.                   |

Its slot content is the label, and it exposes `selected` (boolean) via the slot.

### TabsList / TabsPanels / TabsContent

Each takes only `class`. `TabsList` is the pill bar, `TabsPanels` wraps the
panels, and each `TabsContent` is one panel.

## Accessibility

- Built on Headless UI's tabs, so arrow-key navigation, `Home`/`End`, focus
  management, and `role="tablist"`/`tab`/`tabpanel` wiring are handled.
- Disabled tabs are skipped during keyboard navigation.
- The selected state is exposed via the `selected` slot prop and styled through
  the tab variants.
