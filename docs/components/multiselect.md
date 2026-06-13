# MultiSelect

A dropdown for choosing several options at once — with optional search and
select-all. It binds an array of selected values with `v-model`, and its trigger
shows a smart summary ("3 selected") instead of a long list.

MultiSelect is the most composable component here: the root provides state and
exposes it through slot props, and you assemble the trigger, panel, search, and
items to taste.

## Anatomy

```
MultiSelect ← root: holds options + v-model, exposes slot props
├── MultiSelectTrigger   ← the field-like button showing the summary
└── MultiSelectContent   ← the floating panel
    ├── MultiSelectSearch ← optional search input (needs`searchable`)
└── MultiSelectItem ← one per option (a checkbox row)
```

The root's default slot exposes everything the parts need: `label` (the trigger
summary), `empty`, `count`, `allSelected`, `visibleCount`, `toggleAll`, and
`clear`. You pass these into the parts as needed.

## Usage

Provide an `options` array (`{ value, label }`) and bind selections with
`v-model`. Render one `MultiSelectItem` per option.

<preview path="../demos/multiselect/multiselect-basic.vue" title="Basic" description="Pick multiple options; the trigger summarizes."></preview>

## Searchable with select-all

Add `searchable` and include a `MultiSelectSearch` to filter options. The slot's
`toggleAll`/`allSelected` let you add a select-all control that operates on the
currently visible (filtered) options.

<preview path="../demos/multiselect/multiselect-searchable.vue" title="Searchable" description="Filter options and select all."></preview>

## Custom summary

By default the trigger shows "N selected". Pass a `summarize` function to
customize the text when more than one option is selected.

<preview path="../demos/multiselect/multiselect-summary.vue" title="Custom summary" description="A custom trigger summary."></preview>

## Props

### MultiSelect

| Prop          | Type                                                         | Default            | Description                                             |
| ------------- | ------------------------------------------------------------ | ------------------ | ------------------------------------------------------- |
| `modelValue`  | `string[]`                                                   | `[]`               | Selected values. Use with `v-model`.                    |
| `options`     | `{ value: string; label: string }[]`                         | —                  | The full option list. **Required.**                     |
| `searchable`  | `boolean`                                                    | `false`            | Enables filtering (include a `MultiSelectSearch`).      |
| `placeholder` | `string`                                                     | `"Select options"` | Trigger text when nothing is selected.                  |
| `placement`   | `"bottom-start" \| "bottom-end" \| "top-start" \| "top-end"` | `"bottom-start"`   | Panel placement.                                        |
| `offset`      | `number`                                                     | `4`                | Gap between trigger and panel.                          |
| `summarize`   | `(count, total) => string`                                   | `"N selected"`     | Customizes the trigger text when multiple are selected. |
| `class`       | `string`                                                     | —                  | Classes merged onto the root.                           |

**Slot props** (from the root's default slot): `label`, `count`, `empty`,
`allSelected`, `visibleCount`, `toggleAll`, `clear`.

### MultiSelectTrigger

| Prop      | Type                      | Default     | Description                                   |
| --------- | ------------------------- | ----------- | --------------------------------------------- |
| `label`   | `string`                  | —           | The summary text (pass the slot's `label`).   |
| `empty`   | `boolean`                 | —           | Whether nothing is selected (greys the text). |
| `variant` | `"primary" \| "contrast"` | `"primary"` | Field style (shares Input's variants).        |
| `size`    | `"base" \| "sm"`          | `"base"`    | Field size.                                   |
| `class`   | `string`                  | —           | Merged onto the trigger.                      |

### MultiSelectContent / MultiSelectSearch / MultiSelectItem

| Component            | Key props                                                                          |
| -------------------- | ---------------------------------------------------------------------------------- |
| `MultiSelectContent` | `size` (panel width), `class`.                                                     |
| `MultiSelectSearch`  | `placeholder`. Requires `searchable` on the root.                                  |
| `MultiSelectItem`    | `value`, `label`, `disabled`. Renders a checkbox row; exposes `selected` via slot. |

## Accessibility

- The trigger is built on Headless UI's `Popover` (focus, `Escape`, click-outside
  handled). Items are buttons with `aria-pressed` reflecting selection.
- Each item shows a visual checkbox indicating its selected state.
- When `searchable`, the search input filters the visible items.
