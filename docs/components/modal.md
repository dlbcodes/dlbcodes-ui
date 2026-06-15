# Modal

A dialog that overlays the page for focused tasks: confirmations, forms, or
detail views. It traps focus while open, locks page scroll, closes on backdrop
click or `Escape` (unless made persistent), and wires up `aria-labelledby` /
`aria-describedby` from its title and description.

Unlike the menu overlays, a Modal has no trigger sub-component. You control it
with `v-model`. Open it by setting the bound value to `true` (typically from a
button), and it closes itself via the close button, backdrop, or `Escape`.

## Anatomy

```
Modal ← the dialog; controlled by v-model, sets size/persistence
├── ModalHeader ← title area (position the close button here)
│ ├── ModalTitle ← the heading (wires aria-labelledby)
│ ├── ModalDescription ← supporting text (wires aria-describedby)
│ └── ModalClose ← the × dismiss button
├── ModalContent ← the body
└── ModalFooter ← action buttons (Cancel / Confirm)
```

Every part is optional except `Modal` itself. Include only what you need. The
default slot exposes a `close` function for wiring footer actions.

## Usage

Drive the modal with `v-model`; open it from a button.

<preview path="../demos/modal/modal-basic.vue" title="Confirm an action" description="A confirmation dialog with a clear primary action."></preview>

## With a form

Use `ModalFooter` for actions and the `close` slot prop to dismiss from a button.
Composed with `Field` and `Input`, the modal becomes a focused edit surface.

<preview path="../demos/modal/modal-form.vue" title="Edit form" description="An edit profile form inside a modal."></preview>

## Preventing accidental close

Pass `before-close` to intercept a close and optionally cancel it. It receives
the reason the close was attempted (`"escape"`, `"backdrop"`, `"close-button"`,
or `"programmatic"`) and returns a boolean (or a promise of one). Return `false`
to keep the modal open.

This is the right tool for forms with unsaved changes: if the user has edited
something and tries to dismiss, you can confirm before discarding their work.

<preview path="../demos/modal/modal-before-close.vue" title="Unsaved changes guard" description="Prompts before discarding edits."></preview>

```vue
<Modal v-model="open" :before-close="confirmDiscard">
  <!-- ... -->
</Modal>

<script setup>
const confirmDiscard = (reason) => {
    if (!isDirty.value) return true; // nothing to lose, allow
    return window.confirm("Discard your changes?"); // true closes, false stays
};
</script>
```

The `close` event also reports the reason, so you can branch on how a dialog was
dismissed:

```vue
<Modal v-model="open" @close="(reason) => track('modal_closed', { reason })">
```

## Sizes

The `size` prop controls the max width: `sm` through `5xl`, plus `full`.

<preview path="../demos/modal/modal-sizes.vue" title="Sizes" description="sm, lg, and 2xl."></preview>

## Persistent

Set `persistent` to prevent closing via backdrop click or `Escape`. The user
must take an explicit action (the close button or a footer action still work).
Use sparingly, for cases where dismissing accidentally would lose work or skip a
required choice.

For unsaved-changes protection specifically, prefer `before-close` over
`persistent`: it still lets the user dismiss, but confirms first, rather than
trapping them.

<preview path="../demos/modal/modal-persistent.vue" title="Persistent" description="Can't dismiss by clicking outside or pressing Escape."></preview>

## Props

### Modal

| Prop              | Type                                                                         | Default | Description                                                                                 |
| ----------------- | ---------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------- |
| `modelValue`      | `boolean`                                                                    | —       | Open state. Use with `v-model`. **Required.**                                               |
| `size`            | `"sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "3xl" \| "4xl" \| "5xl" \| "full"` | `"md"`  | Max width of the dialog.                                                                    |
| `closeOnBackdrop` | `boolean`                                                                    | `true`  | Whether clicking the backdrop closes the modal.                                             |
| `persistent`      | `boolean`                                                                    | `false` | Prevents closing via backdrop or `Escape` (the close button still works).                   |
| `beforeClose`     | `(reason) => boolean \| Promise<boolean>`                                    | —       | Runs before any close. Return `false` to veto and keep the modal open. Receives the reason. |
| `class`           | `string`                                                                     | —       | Classes merged onto the dialog.                                                             |

**Events:** `update:modelValue` (boolean) and `close` (the close reason:
`"escape" \| "backdrop" \| "close-button" \| "programmatic"`). The default slot
exposes `close`.

### Sub-components

| Component          | Purpose                                                         |
| ------------------ | --------------------------------------------------------------- |
| `ModalHeader`      | Title-area container; position `ModalClose` inside it.          |
| `ModalTitle`       | The heading. Registers `aria-labelledby` on the dialog.         |
| `ModalDescription` | Supporting text. Registers `aria-describedby`.                  |
| `ModalContent`     | The scrollable body.                                            |
| `ModalFooter`      | Right-aligned action row.                                       |
| `ModalClose`       | The × button (an icon `Button`). Routes through `before-close`. |

All sub-components accept `class`.

## Accessibility

- The dialog has `role="dialog"` and `aria-modal="true"`. `ModalTitle` and
  `ModalDescription` automatically register `aria-labelledby` / `aria-describedby`,
  so include a `ModalTitle` for an accessible name.
- Focus is trapped within the dialog while open and restored when it closes.
- Page scroll is locked while open.
- `Escape` closes the modal (unless `persistent` or vetoed by `before-close`);
  `ModalClose` routes through `before-close` too.
- Content is only mounted while the modal is open.
