# Alert

A short, inline message that calls out something the user should notice —
a status, a warning, a result of an action. Unlike a toast (which is transient)
or a modal (which interrupts), an alert sits in the layout and stays until the
situation changes.

Alert is a **compound component**: an `Alert` container with `AlertTitle` and
`AlertDescription` inside, plus optional icon and action slots.

## Anatomy

```
Alert ← container; sets the variant, lays out icon/content/action
├── #icon (slot) ← optional leading icon
├── AlertTitle ← short heading
├── AlertDescription ← supporting text
└── #action (slot) ← optional action, top-right
```

## Usage

A title and a description. The default `neutral` variant suits general messages.

<preview path="../demos/alert/alert-basic.vue" title="Basic" description="A neutral alert."></preview>

## Variants

Each variant maps to a semantic status color — use the one that matches the
message's meaning.

<preview path="../demos/alert/alert-variants.vue" title="Variants" description="info, success, warning, and destructive."></preview>

## With an icon, no title

For short messages, drop the title and use just an icon and description.

<preview path="../demos/alert/alert-icon.vue" title="Icon only" description="A compact single-line alert."></preview>

## With an action

Use the `action` slot for a button — a dismiss, a retry, or a call to action.

<preview path="../demos/alert/alert-action.vue" title="With action" description="An alert with a button."></preview>

## Props

### Alert

| Prop      | Type                                                             | Default     | Description                         |
| --------- | ---------------------------------------------------------------- | ----------- | ----------------------------------- |
| `variant` | `"neutral" \| "info" \| "success" \| "warning" \| "destructive"` | `"neutral"` | Semantic status color of the alert. |
| `class`   | `string`                                                         | —           | Classes merged onto the container.  |

**Slots:** `default` (the title and description), `icon` (optional leading icon),
`action` (optional top-right action).

### AlertTitle / AlertDescription

Each takes only `class` and renders its slot content — the title is emphasized,
the description is the supporting text.

## Accessibility

- The container has `role="alert"`, so assistive technology announces it when it
  appears — appropriate for messages that result from a user action or a state
  change.
- Because `role="alert"` is announced immediately, use it for genuinely
  noticeable messages. For purely decorative or persistent informational banners
  that shouldn't interrupt, consider whether `role="alert"` is warranted (you can
  override it via the container if needed).
- Don't rely on color alone — the icon and title text carry the meaning for
  users who can't distinguish the variant colors.
