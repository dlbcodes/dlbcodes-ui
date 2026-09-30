# Checkbox

A binary on/off control. Like the other form controls, it's deliberately
label-less — pair it with a `Label` (matching the label's `for` to the
checkbox's `id`) so clicking the text toggles the box and screen readers
announce it correctly.

Bind its state with `v-model`. It works standalone, or inside a `Field`, where it
picks up the field's `id`, `disabled`, `required`, and error state automatically.

## Usage

Pair the checkbox with a `Label` via `id`/`for`.

<preview path="../demos/checkbox/checkbox-basic.vue" title="Basic" description="A checkbox with an associated label."></preview>

## States

Checked, unchecked, and disabled. Bind each with `v-model`. A checked box is
filled with the theme's `--primary` color, and a disabled one is dimmed.

<preview path="../demos/checkbox/checkbox-states.vue" title="States" description="Checked, unchecked, disabled."></preview>

## Invalid

Set `invalid` to show the error styling — useful for required checkboxes (like
accepting terms) that haven't been checked. Inside a `Field`, this is driven by
the field's error state automatically. The box uses the theme's `--destructive`
color, and a checked-but-invalid box keeps its check mark visible in that color.

<preview path="../demos/checkbox/checkbox-invalid.vue" title="Invalid" description="The error state."></preview>

## Visual mode

Set `visual` to render just the box — no `<input>`, no interactivity. Use this
when the checkbox sits _inside_ another interactive element (a menu row, a
selectable option) where a nested real input would be invalid HTML. Drive it with
`:model-value` (it doesn't emit changes itself; the parent owns the state).

<preview path="../demos/checkbox/checkbox-visual.vue" title="Visual" description="Box-only, for use inside other controls."></preview>

## Appearance

The box's corners follow the theme's `--radius` (4px at the default), so a
square or rounded theme applies to checkboxes too. Keyboard focus shows a ring in
the theme's `--ring` color.

## Props

| Prop         | Type      | Default | Description                                                                                                                                                      |
| ------------ | --------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `modelValue` | `boolean` | `false` | The checked state. Use with `v-model`.                                                                                                                           |
| `id`         | `string`  | —       | The control's id, for pairing with a `Label`'s `for`. Provided automatically inside a `Field`; otherwise generated. Set it yourself to target it from a `Label`. |
| `disabled`   | `boolean` | `false` | Disables the checkbox. Inherited from a surrounding `Field` if set there.                                                                                        |
| `required`   | `boolean` | `false` | Marks the checkbox required. Inherited from a `Field`.                                                                                                           |
| `invalid`    | `boolean` | `false` | Shows the error styling. Inherited from a `Field`'s error state.                                                                                                 |
| `visual`     | `boolean` | `false` | Renders box-only (no input), for embedding inside another interactive element. Drive with `:model-value`.                                                        |
| `class`      | `string`  | —       | Classes merged onto the box.                                                                                                                                     |

**Events:** `update:modelValue` (`checked: boolean`), emitted when the user
toggles the checkbox. Not emitted in `visual` mode.

## Accessibility

- Renders a real `<input type="checkbox">` (visually hidden), so keyboard and
  screen-reader behavior work natively — it's focusable, toggles with Space, and
  participates in forms.
- Pair it with a `Label` (`for`/`id`) so it has an accessible name and a larger
  click target. Without a label, give it context another way.
- `invalid` and `required` set `aria-invalid` and `aria-required`, `required`
  also sets the native attribute, and `disabled` sets the native `disabled`
  attribute, so assistive tech is informed of the control's state.
- `visual` mode is presentational only — the _real_ checkbox controlling state
  must live on the surrounding interactive element. It has no focus ring of its
  own, since the surrounding element is the one that receives focus.

::: tip
Inside a `Field`, the checkbox inherits `id`, `disabled`, `required`, and the
invalid state from the field context — you don't set them per-control. See Field
for the full pattern.
:::
