# Combobox

A text input paired with a filterable list, the user types to narrow the options,
then picks one. Use it instead of a [Select](/components/select) when the list is
long enough that filtering helps. Built on Headless UI's combobox, so keyboard
navigation and accessibility come for free.

Combobox is a **compound component**, and it mirrors `Select`'s structure, with a
filterable input in place of the button trigger.

## Anatomy

```
Combobox
├── ComboboxInput
├── ComboboxContent
└── ComboboxItem
```

Each option is a `ComboboxItem` with a `value` and a `label`. The input filters
the items by their label as you type, and shows the selected label once you pick.

## Usage

Type to filter; pick an option to select it.

<preview path="../demos/combobox/combobox-basic.vue" title="Basic" description="Type to filter a list of options."></preview>

## Pre-filled value

Because each item carries its `label`, a combobox bound to a value displays the
correct label immediately, before any interaction.

<preview path="../demos/combobox/combobox-prefilled.vue" title="Pre-filled" description="Bound to a value on load, shows its label right away."></preview>

## Inside a Field

Wrap it in a `Field` for a label, description, and accessibility wiring, just like
the other form controls.

<preview path="../demos/combobox/combobox-in-field.vue" title="With Field" description="A labelled combobox with a description."></preview>

## Combobox vs Select

Both let the user pick one value from a set. Reach for **Combobox** when the list
is long and filtering by typing helps; reach for **[Select](/components/select)**
when the list is short enough to scan and a filter would be overkill.

## Props

### Combobox

| Prop         | Type                                                                              | Default          | Description                                           |
| ------------ | --------------------------------------------------------------------------------- | ---------------- | ----------------------------------------------------- |
| `modelValue` | `string`                                                                          | none             | The selected value. Use with `v-model`. **Required.** |
| `placement`  | `"bottom-start" \| "bottom-end" \| "bottom" \| "top-start" \| "top-end" \| "top"` | `"bottom-start"` | Where the panel opens relative to the input.          |
| `offset`     | `number`                                                                          | `4`              | Gap (px) between input and panel.                     |
| `class`      | `string`                                                                          | none             | Classes merged onto the root.                         |

### ComboboxInput

| Prop          | Type                      | Default       | Description                            |
| ------------- | ------------------------- | ------------- | -------------------------------------- |
| `placeholder` | `string`                  | `"Search..."` | Shown when nothing is typed/selected.  |
| `variant`     | `"primary" \| "contrast"` | `"primary"`   | Field style (shares Input's variants). |
| `size`        | `"base" \| "sm"`          | `"base"`      | Field size.                            |
| `class`       | `string`                  | none          | Classes merged onto the input wrapper. |

### ComboboxContent

| Prop    | Type                                                                | Default  | Description                                                         |
| ------- | ------------------------------------------------------------------- | -------- | ------------------------------------------------------------------- |
| `width` | `"fit" \| "full" \| "3xs" \| "2xs" \| "xs" \| "sm" \| "md" \| "lg"` | `"full"` | Panel width. `full` matches the input; a token gives a fixed width. |
| `class` | `string`                                                            | none     | Classes merged onto the panel.                                      |

### ComboboxItem

| Prop       | Type      | Default | Description                                                                            |
| ---------- | --------- | ------- | -------------------------------------------------------------------------------------- |
| `value`    | `string`  | none    | The option's value (what `v-model` receives). **Required.**                            |
| `label`    | `string`  | none    | Display text; also what the input filters against. Falls back to slot text if omitted. |
| `disabled` | `boolean` | `false` | Makes the option non-selectable and skipped by keyboard nav.                           |

Provide `label` so the input displays and filters correctly, including for a
pre-filled value. The slot controls how the option appears in the list.

## Accessibility

- Built on Headless UI's `Combobox`, so type-ahead filtering, arrow-key
  navigation, `Enter` to select, `Escape` to close, and `role` wiring are handled.
- The selected option shows a check and is marked selected for assistive tech.
- Disabled options are skipped by keyboard navigation.
- Wrap in a `Field` (or pair with a `Label`) so the control has an accessible name.
