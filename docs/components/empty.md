# Empty

A placeholder for empty states — no data, no search results, a blank list, or a
first-run screen. It centers a piece of media (usually an icon), a title, a
description, and optionally an action, inside a dashed container.

Empty is a **compound component**: compose the parts you need. Only the root is
required; everything inside is optional.

## Anatomy

```
Empty ← the dashed container; centers its content
├── EmptyHeader ← groups the media, title, and description
│ ├── EmptyMedia ← the icon or illustration (variant: icon | default)
│ ├── EmptyTitle ← the headline
│ └── EmptyDescription ← supporting text
└── EmptyContent ← optional area for actions (buttons, links)
```

## Usage

<preview path="../demos/empty/empty-basic.vue" title="Basic" description="An icon, title, and description."></preview>

## With an action

Use `EmptyContent` to add a call to action below the header.

<preview path="../demos/empty/empty-with-action.vue" title="With action" description="An empty state with a button."></preview>

## No results

A common use is the "no search results" state.

<preview path="../demos/empty/empty-no-results.vue" title="No results" description="For empty search results."></preview>

## Media variants

`EmptyMedia` has two variants. `icon` wraps the media in a subtle rounded
background; `default` (the default) renders the media as-is — useful for a
larger icon or a custom illustration.

<preview path="../demos/empty/empty-default-media.vue" title="Default media" description="A larger icon with no background."></preview>

## Props

### EmptyMedia

| Prop      | Type                  | Default     | Description                                                 |
| --------- | --------------------- | ----------- | ----------------------------------------------------------- |
| `variant` | `"default" \| "icon"` | `"default"` | `icon` adds a rounded subtle background; `default` is bare. |
| `class`   | `string`              | —           | Classes merged onto the media wrapper.                      |

### Empty / EmptyHeader / EmptyTitle / EmptyDescription / EmptyContent

Each takes only `class`. Their slot content is what's rendered:

- `Empty` — the dashed container; centers everything.
- `EmptyHeader` — groups media, title, and description.
- `EmptyTitle` — the headline text.
- `EmptyDescription` — supporting text. Links inside it are underlined.
- `EmptyContent` — an area for actions, below the header.

## Composition

Only `Empty` is required. Use as many or as few of the parts as you need — a
title alone, or the full media + title + description + action stack.
