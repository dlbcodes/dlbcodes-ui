# Switch

A toggle for an immediate on/off setting — like enabling a feature or flipping a
preference. Reach for a `Switch` when the change takes effect right away; use a
`Checkbox` when the choice is part of a form the user submits later.

Bind its state with `v-model`. Like the other controls it's label-less: pair it
with a `Label` (matching `for`/`id`), or — when there's no visible label — give
it an `ariaLabel` so it still has an accessible name.

## Usage

Standalone, with an `ariaLabel` for accessibility since there's no visible text.

<preview path="../demos/switch/switch-basic.vue" title="Basic" description="A standalone switch with an aria-label."></preview>

## With a label

Pair it with a `Label` via `for`/`id`. Clicking the label toggles the switch.

<preview path="../demos/switch/switch-label.vue" title="With Label" description="Switch paired with a label."></preview>

## States

On, off, and disabled. The on state is filled with the theme's `--primary` color,
and a disabled switch is dimmed.

<preview path="../demos/switch/switch-states.vue" title="States" description="On, off, disabled."></preview>

## Appearance

The off track is the theme's `--input` color, the on track is `--primary`, and the
thumb is `--background`, so a switch follows your theme, including dark mode. It
is always fully rounded regardless of `--radius`, and the thumb moves the right
way in right-to-left layouts. Keyboard focus shows a ring in the `--ring` color.
See [Theming](/guide/theming).

## Props

| Prop         | Type      | Default | Description                                                                                                                                                      |
| ------------ | --------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `modelValue` | `boolean` | —       | The on/off state. Use with `v-model`. **Required.**                                                                                                              |
| `id`         | `string`  | —       | The control's id, for pairing with a `Label`'s `for`. Provided automatically inside a `Field`; otherwise generated. Set it yourself to target it from a `Label`. |
| `disabled`   | `boolean` | `false` | Disables the switch. Inherited from a surrounding `Field`.                                                                                                       |
| `ariaLabel`  | `string`  | —       | Accessible name when there's no associated `Label`. Set this _or_ pair with a `Label`.                                                                           |
| `class`      | `string`  | —       | Classes merged onto the track.                                                                                                                                   |

**Events:** `update:modelValue` (`checked: boolean`), emitted when the user
toggles the switch.

## Accessibility

- Renders a real `<input type="checkbox">` with `role="switch"` and `aria-checked`,
  so assistive tech announces it as an on/off switch (not a plain checkbox) and it
  toggles with the keyboard.
- A switch **must** have an accessible name: either pair it with a `Label`
  (`for`/`id`) or set `ariaLabel`. A switch with neither is unlabelled and
  inaccessible.
- `disabled` sets the matching state on the underlying input.

::: tip
Inside a `Field`, the switch inherits `id` and `disabled` from the field context.
See Field for the full label → control → description pattern.
:::
