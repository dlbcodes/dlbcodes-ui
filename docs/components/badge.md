# Badge

A small inline label for status, counts, or categorization. Badges draw the eye
to a short piece of metadata — a status, a tag, a count — without pulling focus
from the surrounding content.

Use them for things like "New", "Beta", status indicators, or item counts. Keep
the text short; a badge is a label, not a sentence.

## Usage

<preview path="../demos/badge/badge-basic.vue" title="Basic" description="A default badge."></preview>

## Variants

Each variant maps to a semantic color for a different kind of status.

<preview path="../demos/badge/badge-variants.vue" title="Variants" description="The available semantic variants."></preview>

## Props

| Prop      | Type     | Default | Description                   |
| --------- | -------- | ------- | ----------------------------- |
| `variant` | `...`    | `...`   | Semantic color variant.       |
| `class`   | `string` | —       | Classes merged onto the root. |

## Accessibility

- A badge is decorative/labeling by default. If it conveys status that isn't
  obvious from its text alone (e.g. color-only meaning), ensure the meaning is
  also available in text for screen-reader and color-blind users.
