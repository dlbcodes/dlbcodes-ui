# Modal

A dialog that overlays the page for focused tasks — confirmations, forms, or
detail views. It traps focus while open, locks page scroll, closes on backdrop
click or `Escape` (unless made persistent), and wires up `aria-labelledby` /
`aria-describedby` from its title and description.

Unlike the menu overlays, a Modal has no trigger sub-component — you control it
with `v-model`. Open it by setting the bound value to `true` (typically from a
button), and it closes itself via the close button, backdrop, or `Escape`.

## Anatomy

\```
Modal ← the dialog; controlled by v-model, sets size/persistence
├── ModalHeader ← title area (position the close button here)
│ ├── ModalTitle ← the heading (wires aria-labelledby)
│ ├── ModalDescription ← supporting text (wires aria-describedby)
│ └── ModalClose ← the × dismiss button
├── ModalContent ← the body
└── ModalFooter ← action buttons (Cancel / Confirm)
\```

Every part is optional except `Modal` itself — include only what you need. The
default slot exposes a `close` function for wiring footer actions.

## Usage

Drive the modal with `v-model`; open it from a button.

<preview path="../demos/modal/modal-basic.vue" title="Basic" description="A modal with a header, body, and close button."></preview>

## With footer actions

Use `ModalFooter` for actions, and the `close` slot prop to dismiss the modal
from a button.

<preview path="../demos/modal/modal-footer.vue" title="Footer actions" description="Cancel and confirm buttons."></preview>

## Sizes

The `size` prop controls the max width — `sm` through `5xl`, plus `full`.

<preview path="../demos/modal/modal-sizes.vue" title="Sizes" description="sm, lg, and 2xl."></preview>

## Persistent

Set `persistent` to prevent closing via backdrop click or `Escape` — the user
must take an explicit action. Use sparingly, for cases where dismissing
accidentally would lose work or skip a required choice.

<preview path="../demos/modal/modal-persistent.vue" title="Persistent" description="Can't dismiss by clicking outside or pressing Escape."></preview>

## Props

### Modal

| Prop              | Type                                                                         | Default | Description                                                               |
| ----------------- | ---------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------- |
| `modelValue`      | `boolean`                                                                    | —       | Open state. Use with `v-model`. **Required.**                             |
| `size`            | `"sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "3xl" \| "4xl" \| "5xl" \| "full"` | `"md"`  | Max width of the dialog.                                                  |
| `closeOnBackdrop` | `boolean`                                                                    | `true`  | Whether clicking the backdrop closes the modal.                           |
| `persistent`      | `boolean`                                                                    | `false` | Prevents closing via backdrop or `Escape` (the close button still works). |
| `class`           | `string`                                                                     | —       | Classes merged onto the dialog.                                           |

Emits `update:modelValue` and `close`. The default slot exposes `close`.

### Sub-components

| Component          | Purpose                                                           |
| ------------------ | ----------------------------------------------------------------- |
| `ModalHeader`      | Title-area container; position `ModalClose` inside it.            |
| `ModalTitle`       | The heading. Registers `aria-labelledby` on the dialog.           |
| `ModalDescription` | Supporting text. Registers `aria-describedby`.                    |
| `ModalContent`     | The scrollable body.                                              |
| `ModalFooter`      | Right-aligned action row.                                         |
| `ModalClose`       | The × button (an icon `Button`). Dismisses via the modal context. |

All sub-components accept `class`.

## Accessibility

- The dialog has `role="dialog"` and `aria-modal="true"`. `ModalTitle` and
  `ModalDescription` automatically register `aria-labelledby` / `aria-describedby`,
  so include a `ModalTitle` for an accessible name.
- Focus is trapped within the dialog while open and restored when it closes.
- Page scroll is locked while open.
- `Escape` closes the modal (unless `persistent`); `ModalClose` always works.
