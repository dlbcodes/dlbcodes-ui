# Theming

Every color in the system comes from a **CSS variable token**. To restyle the
components, you override tokens — no component code, no overrides, no
specificity battles.

There are two layers:

- **Semantic tokens** — role-based (`--color-bg-surface`, `--color-text-primary`).
  **This is the layer you theme.** Each maps a role to a color.
- **Primitives** — the raw palette (`--color-bg-200`, `--color-text-900`) that
  the semantic tokens reference. Internal; you rarely touch these directly.

## How to theme

Override the semantic tokens after importing the library's tokens. Set them to
any color you like — a literal value or one of your own variables:

<code-block lang="css">

```css
@import "tailwindcss";
@import "@dlbcodes/ui/tokens.css";

:root {
    --color-bg-base: oklch(99% 0 0);
    --color-bg-surface: oklch(97% 0 0);
    --color-text-primary: oklch(20% 0.02 260);
    --color-border-default: oklch(90% 0.01 260);
}
```

</code-block>

Because every component reads these roles, overriding them re-themes the whole
system at once. Override only the tokens you want to change — the rest keep
their defaults.

## Semantic tokens

These are the tokens to override.

### Text

| Token                    | Role                  |
| ------------------------ | --------------------- |
| `--color-text-primary`   | Body copy, headings   |
| `--color-text-secondary` | Labels, metadata      |
| `--color-text-tertiary`  | Placeholders, hints   |
| `--color-text-disabled`  | Disabled state        |
| `--color-text-inverse`   | Text on dark surfaces |

### Background

Surfaces run from the page background up to the brightest floating surface.

| Token                 | Role                       |
| --------------------- | -------------------------- |
| `--color-bg-base`     | Page background            |
| `--color-bg-surface`  | Cards, panels              |
| `--color-bg-elevated` | Dropdowns, tooltips        |
| `--color-bg-subtle`   | Hover states, tags         |
| `--color-bg-raised`   | Brightest floating surface |
| `--color-bg-strong`   | Separators, badges         |
| `--color-bg-inverse`  | Dark surfaces, banners     |

### Border

| Token                    | Role            |
| ------------------------ | --------------- |
| `--color-border-subtle`  | Soft dividers   |
| `--color-border-default` | Inputs, cards   |
| `--color-border-strong`  | Focus, emphasis |
| `--color-border-dark`    | Strong outline  |

### Status

Each status has a **surface**, **border**, and **text** token:

| Status  | Surface                   | Border                   | Text                   |
| ------- | ------------------------- | ------------------------ | ---------------------- |
| Success | `--color-success-surface` | `--color-success-border` | `--color-success-text` |
| Warning | `--color-warning-surface` | `--color-warning-border` | `--color-warning-text` |
| Info    | `--color-info-surface`    | `--color-info-border`    | `--color-info-text`    |
| Danger  | `--color-danger-surface`  | `--color-danger-border`  | `--color-danger-text`  |

## Going further: primitives

Semantic tokens reference an internal palette of primitives — a neutral text
ramp (`--color-text-100…900`), a neutral background ramp (`--color-bg-0…900`),
brand, accent, and per-status scales. You generally don't need these, but if you
want to shift the underlying palette (so every semantic role that uses a
primitive moves together), you can override a primitive instead:

<code-block lang="css">

```css
:root {
    /* shift the whole neutral text scale's darkest step */
    --color-text-900: oklch(15% 0.01 260);
}
```

</code-block>

Most of the time, overriding semantic tokens is the right tool — reach for
primitives only when you want a broad palette shift.

## Utilities

The token file also ships two scrollbar utilities you can use on any element:

- `no-scrollbar` — hides the scrollbar while keeping scroll behavior.
- `scrollbar-thin` — a slim, themed scrollbar.

<code-block lang="vue">

```vue
<div class="overflow-y-auto scrollbar-thin">…</div>
```

</code-block>
