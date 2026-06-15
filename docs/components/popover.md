# Popover

A floating panel anchored to a trigger, for secondary content like settings,
details, or small forms that shouldn't take over the screen. It opens on click,
positions itself next to the trigger, and closes when you click outside.

Popover is a **compound component**: you compose three parts.

## Anatomy

```
Popover ← the root; controls placement and offset
├── PopoverTrigger ← the clickable element that opens it
└── PopoverContent ← the floating panel (controls its own size)
```

The trigger exposes an `open` slot prop (the current open state); the content
exposes a `close` slot prop (call it to dismiss the panel from inside).

## Usage

A common popover is contextual help: an info button that explains a setting
without cluttering the page.

<preview path="../demos/popover/popover-basic.vue" title="Info popover" description="An info button explaining a setting."></preview>

## Placement

The root's `placement` prop controls where the panel opens relative to the
trigger. It flips automatically if there isn't room.

<preview path="../demos/popover/popover-placement.vue" title="Placement" description="Top and bottom."></preview>

## Closing from inside

`PopoverContent` exposes a `close` function via its default slot, useful for
"Save" / "Cancel" actions that should dismiss the panel. This makes the popover a
natural home for small inline edits.

<preview path="../demos/popover/popover-close.vue" title="Inline edit" description="A rename form that saves and closes."></preview>

## Sizing

`PopoverContent` takes a `size` prop controlling the panel width: `fit` (to
content), `full`, or a fixed step (`3xs` through `lg`). Unlike a select menu, a
popover isn't matched to the trigger's width; it's sized for its content.

## Props

### Popover

| Prop        | Type                                                                                                   | Default        | Description                                    |
| ----------- | ------------------------------------------------------------------------------------------------------ | -------------- | ---------------------------------------------- |
| `placement` | `"bottom-start" \| "bottom-end" \| "bottom" \| "top-start" \| "top-end" \| "top" \| "left" \| "right"` | `"bottom-end"` | Where the panel opens relative to the trigger. |
| `offset`    | `number`                                                                                               | `4`            | Gap (px) between trigger and panel.            |
| `class`     | `string`                                                                                               | none           | Classes merged onto the root.                  |

### PopoverTrigger

The element that opens the panel. It has two modes:

- **Default:** the trigger renders its own button, and the slot is its content.
  Use for bare content (a label, or an icon plus label).
- **`asChild`:** the trigger projects the popover behavior onto the single child
  you provide, instead of rendering its own button. Use when the child is already
  an interactive element (your `Button`, or an icon button), to avoid nesting a
  `<button>` inside a `<button>`:

```vue
<PopoverTrigger as-child>
    <Button variant="outline">Open</Button>
  </PopoverTrigger>
```

Exposes `open` (boolean) via its default slot.

| Prop      | Type      | Default | Description                                                            |
| --------- | --------- | ------- | ---------------------------------------------------------------------- |
| `asChild` | `boolean` | `false` | Project popover behavior onto the child instead of rendering a button. |
| `class`   | `string`  | none    | Classes merged onto the trigger (default mode only).                   |

### PopoverContent

| Prop    | Type                                                                | Default | Description                                |
| ------- | ------------------------------------------------------------------- | ------- | ------------------------------------------ |
| `size`  | `"fit" \| "full" \| "3xs" \| "2xs" \| "xs" \| "sm" \| "md" \| "lg"` | `"xs"`  | Panel width. Exposes `close` via its slot. |
| `class` | `string`                                                            | none    | Classes merged onto the panel.             |

## Accessibility

- Built on Headless UI's `Popover`, so focus management, `Escape` to close,
  click-outside dismissal, and ARIA wiring are handled for you.
- The trigger is a real button; the panel is keyboard-navigable and returns focus
  to the trigger on close.
