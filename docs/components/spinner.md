# Spinner

An indeterminate loading indicator. Use it when something is in progress and you
can't show how far along it is — inside buttons during async actions, in place of
content that's still loading, or anywhere you need to signal "working…".

The Spinner is intentionally minimal: it has no size or color _props_. Instead,
you size and color it through the `class` prop using utility classes, since the
SVG draws with `currentColor` and inherits its dimensions from `size-*`. This
keeps it composable — it adapts to wherever you place it.

## Usage

<preview path="../demos/spinner/spinner-basic.vue" title="Basic" description="A default spinner."></preview>

## Sizes

There's no `size` prop — set the size with a `size-*` utility via `class`.

<preview path="../demos/spinner/spinner-sizes.vue" title="Sizes" description="size-4, size-6, size-8."></preview>

## Color

The spinner draws with `currentColor`, so set its color with a `text-*` utility.
By default it's a soft grey, the theme's `--muted-foreground` at reduced
opacity, so it works on any background.

<preview path="../demos/spinner/spinner-color.vue" title="Color" description="Recolored via text-* classes."></preview>

To make it match the text around it, use `text-current`. The [Button](/components/button)
does this for its loading state, so the spinner takes on the variant's own text
color instead of grey.

## Props

| Prop    | Type     | Default     | Description                                                                 |
| ------- | -------- | ----------- | --------------------------------------------------------------------------- |
| `label` | `string` | `"Loading"` | Accessible status text announced to screen readers (visually hidden).       |
| `class` | `string` | —           | Classes merged onto the SVG. Use `size-*` to size and `text-*` to color it. |

## Accessibility

- The wrapper has `role="status"`, so assistive tech announces it as a live status.
- The `label` is rendered as visually-hidden text (`sr-only`) inside the status
  region, giving screen-reader users context for what's loading. Customize it to
  describe the specific action (e.g. `label="Saving changes"`).
- The SVG itself is `aria-hidden` — the `label` carries the meaning, not the graphic.
