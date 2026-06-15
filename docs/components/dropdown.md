# Dropdown

A menu of actions triggered by a button, for row actions, account menus, and
"more options" overflows. Built on Headless UI's menu, it handles keyboard
navigation (arrow keys, Enter, Escape), focus, and active-item highlighting for
you.

Dropdown is a **compound component** composed of four parts.

## Anatomy

```
Dropdown               ← the root; controls placement and offset
├── DropdownTrigger    ← the button that opens the menu
└── DropdownContent    ← the floating menu panel
    └── DropdownItem    ← each selectable action (emits`select`)
```

`DropdownItem` is slot-only: put a label, or an icon plus a label, inside it. It
emits `select` when chosen, and exposes an `active` slot prop (true when
highlighted by hover or keyboard).

## Usage

The most familiar Dropdown is the account menu: an avatar trigger opening a menu
with the signed-in user and their actions.

<preview path="../demos/dropdown/dropdown-basic.vue" title="Account menu" description="An avatar trigger with a user header and actions."></preview>

## With icons

Items take arbitrary slot content, so you can pair an icon with each label, as in
a row-actions menu.

<preview path="../demos/dropdown/dropdown-icons.vue" title="Row actions" description="An icon-led actions menu on a list row."></preview>

## Handling selection

Listen for `select` on each item to react to a choice. The menu closes
automatically when an item is chosen.

<preview path="../demos/dropdown/dropdown-select.vue" title="Selection" description="A sort control that reflects the current choice."></preview>

## Disabled items

Mark an item `disabled` to make it non-interactive. It is skipped by keyboard
navigation and does not emit `select`.

<preview path="../demos/dropdown/dropdown-disabled.vue" title="Disabled item" description="A non-selectable item, e.g. an action the user lacks permission for."></preview>

## Props

### Dropdown

| Prop        | Type                                                                              | Default          | Description                                   |
| ----------- | --------------------------------------------------------------------------------- | ---------------- | --------------------------------------------- |
| `placement` | `"bottom-start" \| "bottom-end" \| "bottom" \| "top-start" \| "top-end" \| "top"` | `"bottom-start"` | Where the menu opens relative to the trigger. |
| `offset`    | `number`                                                                          | `4`              | Gap (px) between trigger and menu.            |
| `class`     | `string`                                                                          | none             | Classes merged onto the root.                 |

### DropdownTrigger

The button that opens the menu. It has two modes:

- **Default:** the trigger renders its own button element, and the slot is its
  content. Use this for bare content (a label, or an icon plus label):

```vue
<DropdownTrigger class="...">Options</DropdownTrigger>
```

- **`asChild`:** the trigger does not render its own button; it projects the
  menu behavior onto the single child you provide. Use this when the child is
  already an interactive element (your `Button`, or an avatar button), to avoid
  nesting a `<button>` inside a `<button>`:

```vue
<DropdownTrigger as-child>
    <Button variant="outline">Options</Button>
  </DropdownTrigger>
```

In `asChild` mode the child must be a single root element that forwards
attributes (most components do by default).

Exposes `open` (boolean) via its slot. Accepts `class` (applied to the trigger's
own button in default mode).

| Prop      | Type      | Default | Description                                                         |
| --------- | --------- | ------- | ------------------------------------------------------------------- |
| `asChild` | `boolean` | `false` | Project menu behavior onto the child instead of rendering a button. |
| `class`   | `string`  | none    | Classes merged onto the trigger (default mode only).                |

### DropdownContent

| Prop    | Type                                                                | Default  | Description                                     |
| ------- | ------------------------------------------------------------------- | -------- | ----------------------------------------------- |
| `size`  | `"fit" \| "full" \| "3xs" \| "2xs" \| "xs" \| "sm" \| "md" \| "lg"` | `"full"` | Menu width. `full` matches the trigger's width. |
| `class` | `string`                                                            | none     | Classes merged onto the panel.                  |

### DropdownItem

| Prop       | Type      | Default | Description                                                    |
| ---------- | --------- | ------- | -------------------------------------------------------------- |
| `disabled` | `boolean` | `false` | Disables the item: skipped by keyboard nav, emits no `select`. |
| `class`    | `string`  | none    | Classes merged onto the item.                                  |

Emits `select` when chosen. Exposes `active` (boolean) via its slot.

## Accessibility

- Built on Headless UI's `Menu`, so arrow-key navigation, type-ahead, `Enter` to
  select, `Escape` to close, focus trapping, and `role="menu"` / `menuitem`
  wiring are all handled.
- The active item (hover or keyboard) is exposed via the `active` slot prop and
  styled with `data-active`.
- Disabled items are correctly skipped by keyboard navigation.
