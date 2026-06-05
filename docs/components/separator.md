# Separator

A thin line that divides content — between sections of a page, groups in a menu,
or items in a toolbar. It's a small primitive, but it handles the accessibility
detail most hand-rolled dividers miss: whether the line is purely decorative or
conveys real structure.

## Usage

By default a separator is horizontal — a full-width line for dividing stacked
content.

<preview path="../demos/separator/separator-horizontal.vue" title="Horizontal" description="Dividing stacked sections."></preview>

## Vertical

Set `orientation="vertical"` to divide inline items, like entries in a toolbar or
nav row.

<preview path="../demos/separator/separator-vertical.vue" title="Vertical" description="Dividing inline items."></preview>

A vertical separator takes its height from its parent, so it only shows when the
container has a defined height — for example a flex row with a set height or
`items-stretch`. Without that, there's nothing for the `h-full` line to fill.

## In a card

A common use: separating a heading from the content below it, or fencing off a
section within a panel.

<preview path="../demos/separator/separator-in-card.vue" title="In a card" description="Separating sections within a panel."></preview>

## Decorative vs. semantic

By default a separator is **decorative** (`decorative` is `true`) — it's hidden
from assistive technology with `role="none"`, because a purely visual divider is
just noise to a screen reader.

If the separator marks a genuine structural break in content (not just visual
polish), set `:decorative="false"`. It then renders with `role="separator"` and
the matching `aria-orientation`, so assistive tech announces the division.

When in doubt, leave it decorative — most dividers are visual.

## Props

| Prop          | Type                         | Default        | Description                                                                                                                    |
| ------------- | ---------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Direction of the line. Vertical needs a parent with a defined height.                                                          |
| `decorative`  | `boolean`                    | `true`         | When `true`, hidden from assistive tech (`role="none"`). Set `false` for a semantically meaningful break (`role="separator"`). |
| `class`       | `string`                     | —              | Classes merged onto the line — use for spacing (e.g. `my-4`) or color.                                                         |

## Accessibility

- A decorative separator (the default) uses `role="none"` so screen readers skip
  it — correct for dividers that are purely visual.
- A semantic separator (`:decorative="false"`) uses `role="separator"` with
  `aria-orientation`, announcing a real structural division.
- The separator has no interactive behavior and isn't focusable.
