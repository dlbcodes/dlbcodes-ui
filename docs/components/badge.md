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

<preview path="../demos/badge/badge-variants.vue" title="Variants" description="neutral, success, warning, info, destructive, primary, and outline."></preview>

| Variant       | Use it for                            |
| ------------- | ------------------------------------- |
| `neutral`     | Tags and general labels (the default) |
| `success`     | Completed, active, healthy            |
| `warning`     | Pending, needs attention              |
| `info`        | Neutral information, "New", "Beta"    |
| `destructive` | Failed, blocked, errors               |
| `primary`     | Emphasis in the brand color           |
| `outline`     | A low-key label with no fill          |

Badge icons are sized automatically: an `svg` placed inside a badge is scaled to
fit the label.

## Props

| Prop      | Type                                                                                       | Default     | Description                   |
| --------- | ------------------------------------------------------------------------------------------ | ----------- | ----------------------------- |
| `variant` | `"neutral" \| "success" \| "warning" \| "info" \| "destructive" \| "primary" \| "outline"` | `"neutral"` | Semantic color variant.       |
| `class`   | `string`                                                                                   | —           | Classes merged onto the root. |

**Slots:** `default` (the label text, and optionally an icon).

## Accessibility

- A badge is decorative/labeling by default. If it conveys status that isn't
  obvious from its text alone (e.g. color-only meaning), ensure the meaning is
  also available in text for screen-reader and color-blind users.
- Badge text is small (10px, uppercase), so keep it to a word or two. For
  anything longer or more important, use regular text or an [Alert](/components/alert).
