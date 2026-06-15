# Select

A single-choice dropdown, the user picks one option from a list. It supports
optional search for long lists, binds the chosen value with `v-model`, and is
built on Headless UI's listbox so keyboard navigation and accessibility come for
free.

Reach for `Select` when the user picks **one** value from a defined set. Use
[MultiSelect](/components/multiselect) when they can choose several, and
[Dropdown](/components/dropdown) for a menu of _actions_ rather than choosing a
value.

## Anatomy

```
Select               ← root: holds v-model, provides context, sets placement
├── SelectTrigger    ← the field-like button showing the current selection
└── SelectContent    ← the floating panel (matches the trigger's width)
    ├── SelectSearch  ← optional search input (needs`searchable` on the root)
└── SelectItem ← one per option; its content is the label
```

Each option is a `SelectItem` with a `value` and a `label`. The `label` is the
display text the trigger shows once that option is selected; you can also put
richer content inside the item for the dropdown row.

## Usage

Give each `SelectItem` a `value` and a `label`.

<preview path="../demos/select/select-basic.vue" title="Basic" description="Pick one option from a list."></preview>

## Pre-filled value

Because each item carries its `label` as a prop, a select that's already bound to
a value displays the correct label immediately, before the user ever opens it.

<preview path="../demos/select/select-prefilled.vue" title="Pre-filled" description="A select bound to a value on load shows its label right away."></preview>

## Searchable

For long lists, add `searchable` to the root and include a `SelectSearch`. Items
filter themselves by their label as the user types.

<preview path="../demos/select/select-searchable.vue" title="Searchable" description="Filter options as you type."></preview>

## Rich items

The item's slot can hold more than text, an icon, a color dot, a formatted row.
The `label` prop stays the source of truth for the trigger's display text, while
the slot controls how the option looks in the list.

<preview path="../demos/select/select-rich.vue" title="Rich content" description="Items with icons or custom markup."></preview>

## Disabled options

Mark an item `disabled` to make it non-selectable, it's skipped by keyboard
navigation and can't be chosen.

<preview path="../demos/select/select-disabled-item.vue" title="Disabled option" description="A non-selectable item."></preview>

## Inside a Field

Wrap it in a `Field` for a label and description with the accessibility wiring,
just like the other form controls.

<preview path="../demos/select/select-in-field.vue" title="With Field" description="Labelled select with a description."></preview>

## Props

### Select

| Prop         | Type                                                                              | Default          | Description                                           |
| ------------ | --------------------------------------------------------------------------------- | ---------------- | ----------------------------------------------------- |
| `modelValue` | `string`                                                                          | none             | The selected value. Use with `v-model`. **Required.** |
| `searchable` | `boolean`                                                                         | `false`          | Enables filtering (include a `SelectSearch`).         |
| `placement`  | `"bottom-start" \| "bottom-end" \| "bottom" \| "top-start" \| "top-end" \| "top"` | `"bottom-start"` | Where the panel opens relative to the trigger.        |
| `offset`     | `number`                                                                          | `4`              | Gap (px) between trigger and panel.                   |
| `class`      | `string`                                                                          | none             | Classes merged onto the root.                         |

### SelectTrigger

| Prop          | Type                      | Default              | Description                            |
| ------------- | ------------------------- | -------------------- | -------------------------------------- |
| `placeholder` | `string`                  | `"Select an option"` | Shown when nothing is selected.        |
| `variant`     | `"primary" \| "contrast"` | `"primary"`          | Field style (shares Input's variants). |
| `size`        | `"base" \| "sm"`          | `"base"`             | Field size.                            |
| `class`       | `string`                  | none                 | Classes merged onto the trigger.       |

`SelectTrigger` exposes `selected` (the value) and `label` (the display text) via
its default slot, so you can render the selection however you like.

### SelectContent

| Prop    | Type                                                                | Default  | Description                                                           |
| ------- | ------------------------------------------------------------------- | -------- | --------------------------------------------------------------------- |
| `width` | `"fit" \| "full" \| "3xs" \| "2xs" \| "xs" \| "sm" \| "md" \| "lg"` | `"full"` | Panel width. `full` matches the trigger; a token gives a fixed width. |
| `class` | `string`                                                            | none     | Classes merged onto the panel.                                        |

### SelectSearch

| Prop          | Type     | Default       | Description                                      |
| ------------- | -------- | ------------- | ------------------------------------------------ |
| `placeholder` | `string` | `"Search..."` | Search input placeholder. Requires `searchable`. |

### SelectItem

| Prop       | Type      | Default | Description                                                                                |
| ---------- | --------- | ------- | ------------------------------------------------------------------------------------------ |
| `value`    | `string`  | none    | The option's value (what `v-model` receives). **Required.**                                |
| `label`    | `string`  | none    | Display text shown in the trigger when selected. Falls back to the slot's text if omitted. |
| `disabled` | `boolean` | `false` | Makes the option non-selectable and skipped by keyboard nav.                               |

Provide `label` so the trigger displays correctly, including for a pre-filled
value. The item's slot controls how the option appears in the list (and is used
as the label if `label` is omitted). The slot exposes `active` and `selected`
for custom rendering.

## Accessibility

- Built on Headless UI's `Listbox`, so arrow-key navigation, type-ahead, `Enter`
  to select, `Escape` to close, and `role="listbox"` / `option` wiring are
  handled.
- The selected option shows a check and is marked selected for assistive tech.
- Disabled options are skipped by keyboard navigation.
- Wrap in a `Field` (or pair with a `Label`) so the control has an accessible name.
