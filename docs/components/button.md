# Button

A flat, tokenized button for actions. It comes in several visual variants for
different emphasis levels, a range of sizes, and built-in loading and disabled
states. It can also render as a link (or any element you choose) while keeping
its styling, so a navigating call-to-action stays visually consistent with one
that triggers an action.

Use the variant to signal importance: `primary` for the main action on a view,
`secondary` or `outline` for supporting actions, `ghost` for low-emphasis or
toolbar actions, `link` for inline text actions, and `destructive` for
dangerous ones.

## Usage

<preview path="../demos/button/button-basic.vue" title="Basic" description="A default (primary) button."></preview>

## Variants

Seven variants cover the common emphasis levels. Limit yourself to one `primary`
button per section — if everything is primary, nothing is.

<preview path="../demos/button/button-variants.vue" title="Variants" description="primary, secondary, destructive, outline, ghost, link."></preview>

`primary` is filled with the theme's `--brand` color, and `destructive` with
`--destructive`. The others use neutral tokens, so they follow your theme
automatically. See [Theming](/guide/theming).

## Sizes

Sizes run `sm`, `base` (default), `lg`, and `xl`. There are also `icon` and
`icon-sm` sizes for square icon-only buttons.

<preview path="../demos/button/button-sizes.vue" title="Sizes" description="sm, base, lg, xl."></preview>

| Size   | Height |
| ------ | ------ |
| `sm`   | 32px   |
| `base` | 40px   |
| `lg`   | 48px   |
| `xl`   | 56px   |

These are the same heights as [Input](/components/input) at the same size, so a
button and an input line up when placed in a row. `icon` and `icon-sm` are sized
by their padding around the icon.

Corners follow the theme's `--radius`, so they change with your radius setting.

## With icons

An `svg` placed inside a button is sized to 16px automatically and never
intercepts clicks. Add your own `size-*` class to the icon to override it.

<code-block lang="vue">

```vue
<Button>
    <PhPlus />
    New project
</Button>
```

</code-block>

## Loading

Set `loading` to show a spinner and disable interaction while an action is in
flight. The button keeps its size, so the layout doesn't jump: the label stays
in place (hidden) and the spinner is drawn on top, in the button's own text
color.

<preview path="../demos/button/button-loading.vue" title="Loading" description="A spinner replaces interaction during async work."></preview>

`loadingText` is the label announced to screen readers while loading. It isn't
shown visually.

## As a link

Pass `to` to render a link instead of a button while keeping the styling. By
default it renders a router link; pass `as` to override the element (for example
`as="a"` for a plain anchor, or a framework link component).

<preview path="../demos/button/button-as-link.vue" title="Link" description="Renders a link while keeping button styling."></preview>

`to` can be a route location (a string or a route object) with a router link.
With a native element such as `as="a"`, it must be a string URL, and a route
object logs a warning.

A `disabled` or `loading` link is not clickable, including by keyboard: it is
removed from the tab order and its navigation is blocked.

## Props

| Prop          | Type                                                                                    | Default      | Description                                                                          |
| ------------- | --------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------ |
| `variant`     | `"primary" \| "secondary" \| "destructive" \| "outline" \| "ghost" \| "link" \| "icon"` | `"primary"`  | Visual emphasis level.                                                               |
| `size`        | `"sm" \| "base" \| "lg" \| "xl" \| "icon" \| "icon-sm"`                                 | `"base"`     | Button size. Use `icon`/`icon-sm` for square icon-only buttons.                      |
| `to`          | `string \| RouteLocationRaw`                                                            | —            | When set, renders a link (a router link by default) instead of a button.             |
| `as`          | `Component \| string`                                                                   | `RouterLink` | Overrides the element used when `to` is set — e.g. `"a"` or a link component.        |
| `type`        | `"button" \| "submit" \| "reset"`                                                       | `"button"`   | Native button type (ignored when rendering a link).                                  |
| `loading`     | `boolean`                                                                               | `false`      | Shows a spinner over the button and disables interaction. The button keeps its size. |
| `loadingText` | `string`                                                                                | `"Loading…"` | Label announced to screen readers while loading (not shown visually).                |
| `disabled`    | `boolean`                                                                               | `false`      | Disables the button.                                                                 |
| `class`       | `string`                                                                                | —            | Classes merged onto the root.                                                        |

## Accessibility

- Renders a native `<button>` by default (or your chosen element when `to` is set),
  so keyboard and screen-reader behavior work as expected.
- When `loading`, the button sets `aria-busy` and is disabled to prevent
  duplicate submissions. `loadingText` is announced to screen readers.
- Disabled and loading states set `aria-disabled`. For links, which have no
  native `disabled`, the button also removes the link from the tab order and
  blocks activation.
- Keyboard focus shows a visible ring in the theme's `--ring` color.
- For `icon`/`icon-sm` buttons, provide an `aria-label` so the action has an
  accessible name (there's no visible text).
