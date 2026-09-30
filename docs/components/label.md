# Label

An accessible text label for form controls. The controls in this library are
deliberately label-less — `Checkbox`, `Switch`, and `Input` render just the
control, with no built-in text — so `Label` is the piece you pair with them. This
keeps labelling explicit and lets you place and style the text however you need.

The important prop is `for`: set it to the control's `id` and the two become
associated. That association does real work — clicking the label focuses or
toggles the control, and screen readers announce the label when the control gains
focus. Always pair a control with a `Label` (or give the control an `aria-label`)
so it has an accessible name.

## Usage

On its own, `Label` is just styled label text. It shows a pointer cursor and
isn't text-selectable, so clicking or double-clicking it to toggle a control
doesn't highlight the words.

<preview path="../demos/label/label-basic.vue" title="Basic" description="A standalone label."></preview>

## With a checkbox

Give the control an `id` and the label a matching `for`. Now clicking the label
text toggles the checkbox — a larger, easier click target, and the correct
accessible association.

<preview path="../demos/label/label-checkbox.vue" title="With Checkbox" description="Clicking the label toggles the checkbox."></preview>

## With a switch

The same `for`/`id` pairing works with any control.

<preview path="../demos/label/label-switch.vue" title="With Switch" description="Clicking the label toggles the switch."></preview>

::: tip Pass your own `id`
`Checkbox`, `Switch` and `Input` generate an `id` for themselves when you don't
pass one, but you can't point a `Label` at an id you don't know. Set the `id` on
the control yourself and use the same value in the label's `for`.
:::

## Appearance

The label text uses the theme's `--foreground` color, so it follows your theme,
including dark mode. See [Theming](/guide/theming).

## Props

| Prop    | Type     | Default | Description                                                                                      |
| ------- | -------- | ------- | ------------------------------------------------------------------------------------------------ |
| `for`   | `string` | —       | Associates the label with a control by its `id`. Enables click-to-focus and the accessible name. |
| `class` | `string` | —       | Classes merged onto the element.                                                                 |

## Accessibility

- `Label` renders a native `<label>`, so the `for`/`id` association is real HTML
  labelling — no ARIA needed.
- Setting `for` to the control's `id` gives the control its accessible name and
  makes the label a click target for it. This is the recommended way to label a
  control.
- When you use a control without a visible label, give the control an `aria-label`
  instead so it still has an accessible name.

::: tip
Inside a `Field`, prefer `FieldLabel` — it wires the `for` to the field's control
automatically, so you don't manage `id`s by hand.
:::
