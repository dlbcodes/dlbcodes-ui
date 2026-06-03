# Input

A single-line text field. It supports `v-model`, an optional leading slot for an
icon or prefix, and integrates with `Field` for labels, descriptions, and error
states.

Binding is optional by design — with `v-model` it's controlled; without it, the
field runs uncontrolled. Like the other controls, it's label-less: pair it with a
`Label`, or wrap it in a `Field` (see [Field](/components/field)) for the full
labelled pattern.

## Usage

Bind the value with `v-model`.

<preview path="../demos/input/input-basic.vue" title="Basic" description="A text input with v-model."></preview>

## With a leading icon

The default slot renders before the input — use it for a search icon, a currency
symbol, or any prefix.

<preview path="../demos/input/input-with-icon.vue" title="With icon" description="A leading icon via the slot."></preview>

## Sizes

Two sizes via the `size` prop: `base` (default) and `sm`.

<preview path="../demos/input/input-sizes.vue" title="Sizes" description="base and sm."></preview>

## States

`disabled` makes the field non-interactive; `invalid` applies error styling.
Inside a `Field`, both are driven by the field's state automatically.

<preview path="../demos/input/input-states.vue" title="States" description="Disabled and invalid."></preview>

## Inside a Field

The common case: wrap the input in a `Field` to get a label, description, error
message, and all the accessibility wiring without managing ids by hand. See
[Field](/components/field) for the full pattern.

## Props

| Prop          | Type                       | Default     | Description                                                                     |
| ------------- | -------------------------- | ----------- | ------------------------------------------------------------------------------- |
| `modelValue`  | `string \| number \| null` | —           | The field's value. Use with `v-model`. Optional — runs uncontrolled if unbound. |
| `variant`     | `"primary" \| "contrast"`  | `"primary"` | Visual style. `contrast` uses a stronger border for busy backgrounds.           |
| `size`        | `"base" \| "sm"`           | `"base"`    | Field size.                                                                     |
| `type`        | `string`                   | `"text"`    | Native input type (`text`, `email`, `password`, etc.).                          |
| `placeholder` | `string`                   | —           | Placeholder text.                                                               |
| `disabled`    | `boolean`                  | —           | Disables the field. Inherited from a surrounding `Field`.                       |
| `required`    | `boolean`                  | —           | Marks required. Inherited from a `Field`.                                       |
| `invalid`     | `boolean`                  | —           | Applies error styling. Inherited from a `Field`'s error state.                  |
| `class`       | `string`                   | —           | Classes merged onto the wrapper.                                                |

## Accessibility

- Set `type` appropriately (`email`, `password`, `tel`…) so browsers and assistive
  tech provide the right keyboard and autofill behavior.
- Give the input a name: pair it with a `Label`, or wrap it in a `Field`. A bare
  input with only a placeholder is not accessibly labelled.
- Inside a `Field`, `aria-invalid`, `aria-required`, and `aria-describedby` are
  wired automatically; standalone, set `invalid`/`required` as props.
