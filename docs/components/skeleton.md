# Skeleton

A placeholder that mimics the shape of content while it loads. Showing a
skeleton in place of the eventual layout makes loading feel faster and avoids
the jolt of content popping in — the page keeps its shape while data arrives.

Skeleton is deliberately minimal: it's an animated box you shape yourself with
utility classes. Size it, round it, and arrange a few together to match whatever
you're standing in for — a line of text, an avatar, a card.

## Usage

Shape each skeleton with `class` — height, width, and radius. A few stacked
lines stand in for a paragraph.

<preview path="../demos/skeleton/skeleton-basic.vue" title="Text lines" description="Stacked lines of varying width."></preview>

## Shapes

The same component becomes a circle, a line, or a block depending on the classes
you give it.

<preview path="../demos/skeleton/skeleton-shapes.vue" title="Shapes" description="A circle, a line, and a block."></preview>

## Composing a card

Combine skeletons to mirror the layout you're loading — here, an avatar and a
few lines of text, the classic "loading card."

<preview path="../demos/skeleton/skeleton-card.vue" title="Loading card" description="An avatar circle with text lines."></preview>

## In practice

Show skeletons while data is loading, then swap in the real content. Mark the
loading container `aria-busy="true"` so assistive tech knows content is on its
way.

<preview path="../demos/skeleton/skeleton-toggle.vue" title="Loading then content" description="Toggle between the skeleton and the loaded state."></preview>

## Props

| Prop    | Type     | Default | Description                                                                                        |
| ------- | -------- | ------- | -------------------------------------------------------------------------------------------------- |
| `class` | `string` | —       | Classes that shape the skeleton — height, width, radius (e.g. `h-4 w-32`, `size-12 rounded-full`). |

Skeleton intentionally takes only `class`. You control its shape entirely with
utilities, so it can stand in for any element.

## Accessibility

- The skeleton is `aria-hidden="true"` — it's a purely visual placeholder, so
  it's hidden from assistive technology (a screen reader has nothing meaningful
  to announce for an empty placeholder).
- Mark the **container** that's loading with `aria-busy="true"` while the
  skeletons are shown, so assistive tech knows real content is coming. Remove it
  once the content has loaded.
