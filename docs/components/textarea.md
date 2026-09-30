# Textarea

A multi-line text field — for longer input like messages, descriptions, or notes.
It mirrors [Input](/components/input): same `v-model` binding, same variants, and
the same `Field` integration for labels, descriptions, and error states.

Set the visible height with `rows`. Like the other controls it's label-less —
pair it with a `Label`, or wrap it in a `Field` for the full labelled pattern.

## Usage

Bind the value with `v-model`.

<preview path="../demos/textarea/textarea-basic.vue" title="Basic" description="A multi-line text field."></preview>

## Inside a Field

Wrap it in a `Field` for a label, description, and the accessibility wiring —
exactly like Input.

<preview path="../demos/textarea/textarea-field.vue" title="With Field" description="Label, textarea, and description, auto-wired."></preview>

## Error state

Inside a `Field`, setting `invalid` applies the error styling to the textarea and
wires its `aria-describedby` to the `FieldError` — so the problem is announced to
screen readers. Standalone, you can set `invalid` on the textarea directly.

<preview path="../demos/textarea/textarea-error.vue" title="Error" description="Invalid state with an error message."></preview>

## Auto-resize

Set `autosize` and the textarea grows as you type, starting from the `rows`
height and expanding to fit its content. Past a maximum height it stops growing
and scrolls instead, so a long entry never takes over the page.

<preview path="../demos/textarea/textarea-autosize.vue" title="Autosize" description="Grows from the minimum, caps, then scrolls."></preview>

## Sizes

`size` takes the same values as [Input](/components/input): `sm`, `base`, `lg` and
`xl`. Unlike an input, a textarea's height comes from `rows` (and its content, with
`autosize`), so `size` changes the text size, padding and corners, not the height.
Corners follow the theme's `--radius`.

## Props

| Prop          | Type                             | Default     | Description                                                                                           |
| ------------- | -------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------- |
| `modelValue`  | `string \| number \| null`       | —           | The value. Use with `v-model`.                                                                        |
| `rows`        | `number`                         | `4`         | Visible height in text rows. Acts as the minimum height when `autosize` is on.                        |
| `autosize`    | `boolean`                        | `false`     | Grows with content from the `rows` height up to a maximum, then scrolls.                              |
| `variant`     | `"primary" \| "contrast"`        | `"primary"` | Visual style (shares Input's variants).                                                               |
| `size`        | `"sm" \| "base" \| "lg" \| "xl"` | `"base"`    | Field size (shares Input's sizes). Sets text size, padding and corners; the height comes from `rows`. |
| `placeholder` | `string`                         | —           | Placeholder text.                                                                                     |
| `disabled`    | `boolean`                        | —           | Disables the field. Inherited from a surrounding `Field`.                                             |
| `required`    | `boolean`                        | —           | Marks required. Inherited from a `Field`.                                                             |
| `invalid`     | `boolean`                        | —           | Applies error styling. Inherited from a `Field`'s error state.                                        |
| `class`       | `string`                         | —           | Classes merged onto the wrapper.                                                                      |

## Accessibility

- Give it a name: pair with a `Label` or wrap in a `Field`. A bare textarea with
  only a placeholder isn't accessibly labelled.
- Inside a `Field`, `aria-invalid`, `aria-required`, and `aria-describedby` are
  wired automatically.
