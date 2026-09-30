# Theming

Every color and every corner radius in the system comes from a **CSS variable**.
To restyle the components, you override variables — no component code, no
overrides, no specificity battles.

The variables follow the [shadcn/ui](https://ui.shadcn.com) naming, so if you
know that convention, you already know these. Colors come in **pairs**: a
surface and the text that sits on it (`--primary` and `--primary-foreground`).

## How to theme

Import the library's tokens, then override any variable. Set light values on
`:root` and dark values on `.dark`:

<code-block lang="css">

```css
@import "tailwindcss";
@import "@dlbcodes/ui/tokens.css";

:root {
    --radius: 0.5rem;
    --brand: oklch(60% 0.14 250);
    --primary: oklch(25% 0.02 260);
}

.dark {
    --brand: oklch(70% 0.13 250);
    --primary: oklch(92% 0.01 260);
}
```

</code-block>

Because every component reads these variables, overriding them re-themes the
whole system at once. Override only what you want to change — the rest keep
their defaults.

::: warning Set both `:root` and `.dark`
`:root` and `.dark` have the same specificity, and your stylesheet comes after
the library's. A value you set only on `:root` therefore **also wins in dark
mode**. If you support dark mode, give every variable you override a `.dark`
value too.
:::

## Dark mode

Dark mode is a `dark` class on the `<html>` element. Toggle it however you like:

<code-block lang="ts">

```ts
document.documentElement.classList.toggle("dark");
```

</code-block>

## Radius

`--radius` is the base corner radius. Every component's corners are derived from
it, so one variable changes the whole system, from square to very round:

| Class         | Value            |
| ------------- | ---------------- |
| `rounded-sm`  | `--radius` × 0.6 |
| `rounded-md`  | `--radius` × 0.8 |
| `rounded-lg`  | `--radius`       |
| `rounded-xl`  | `--radius` × 1.4 |
| `rounded-2xl` | `--radius` × 1.8 |
| `rounded-3xl` | `--radius` × 2.2 |

<code-block lang="css">

```css
:root {
    --radius: 0; /* fully square */
}
```

</code-block>

Shapes that are round by definition (switches, progress bars, avatars' pills)
use `rounded-full` and are not affected.

## Semantic tokens

### Surfaces

| Token                  | Role                         |
| ---------------------- | ---------------------------- |
| `--background`         | Page background              |
| `--foreground`         | Body text, headings          |
| `--card`               | Cards and panels             |
| `--card-foreground`    | Text on cards                |
| `--popover`            | Dropdowns, popovers, dialogs |
| `--popover-foreground` | Text on popovers             |

### Actions

| Token                    | Role                                  |
| ------------------------ | ------------------------------------- |
| `--primary`              | Main neutral action, checked controls |
| `--primary-foreground`   | Text on `--primary`                   |
| `--secondary`            | Secondary surfaces                    |
| `--secondary-foreground` | Text on `--secondary`                 |
| `--brand`                | Brand color: primary button, links    |
| `--brand-foreground`     | Text on `--brand`                     |
| `--pro`                  | Premium / "pro" accent                |
| `--pro-foreground`       | Text on `--pro`                       |

### Muted and accent

| Token                 | Role                                      |
| --------------------- | ----------------------------------------- |
| `--muted`             | Quiet fills: tags, tracks, skeleton areas |
| `--muted-foreground`  | Labels, metadata, placeholders            |
| `--accent`            | Hover and selected rows                   |
| `--accent-foreground` | Text on `--accent`                        |

### Lines and focus

| Token             | Role                       |
| ----------------- | -------------------------- |
| `--border`        | Default borders            |
| `--border-subtle` | Soft dividers              |
| `--border-strong` | Emphasis, scrollbar thumbs |
| `--input`         | Input borders              |
| `--ring`          | Focus rings                |

### Status

Each status has four tokens: the **solid** color (also used for text), the text
**on** that solid color, a light **subtle** surface, and a **border**.

| Status      | Solid           | On solid                   | Subtle                 | Border                 |
| ----------- | --------------- | -------------------------- | ---------------------- | ---------------------- |
| Destructive | `--destructive` | `--destructive-foreground` | `--destructive-subtle` | `--destructive-border` |
| Success     | `--success`     | `--success-foreground`     | `--success-subtle`     | `--success-border`     |
| Warning     | `--warning`     | `--warning-foreground`     | `--warning-subtle`     | `--warning-border`     |
| Info        | `--info`        | `--info-foreground`        | `--info-subtle`        | `--info-border`        |

### Charts

`--chart-1` to `--chart-5` are a five-color categorical palette.

### Sidebar

The sidebar has its own set so it can be themed separately from the page:
`--sidebar`, `--sidebar-foreground`, `--sidebar-primary`,
`--sidebar-primary-foreground`, `--sidebar-accent`,
`--sidebar-accent-foreground`, `--sidebar-border` and `--sidebar-ring`.

## Using tokens in your own code

Every token is available as a Tailwind color, so your own UI can match the
components:

<code-block lang="vue">

```vue
<div class="rounded-xl border border-border bg-card p-4 text-card-foreground">
    <p class="text-muted-foreground">Same colors as the components.</p>
</div>
```

</code-block>

Opacity modifiers work too: `bg-destructive/10`, `text-foreground/70`.

## Theming part of the page

Variables cascade, so you can retheme any subtree by overriding them on a
wrapper element:

<code-block lang="css">

```css
.checkout {
    --brand: oklch(55% 0.16 155);
    --radius: 1rem;
}
```

</code-block>

Everything inside `.checkout` picks up the new brand color and radius.

## Utilities

The token file also ships two scrollbar utilities you can use on any element:

- `no-scrollbar` — hides the scrollbar while keeping scroll behavior.
- `scrollbar-thin` — a slim, themed scrollbar.

<code-block lang="vue">

```vue
<div class="overflow-y-auto scrollbar-thin">…</div>
```

</code-block>

## Migrating from the old tokens

Earlier versions used `--color-bg-*`, `--color-text-*` and a primitive palette.
Those are gone. Rename them as follows:

| Old                                   | New                                |
| ------------------------------------- | ---------------------------------- |
| `--color-text-primary`                | `--foreground`                     |
| `--color-text-secondary`, `-tertiary` | `--muted-foreground`               |
| `--color-text-inverse`                | the matching `--*-foreground`      |
| `--color-bg-base`                     | `--background`                     |
| `--color-bg-surface`, `-elevated`     | `--muted`                          |
| `--color-bg-raised`                   | `--popover` or `--card`            |
| `--color-bg-subtle`                   | `--accent`                         |
| `--color-border-default`              | `--border` (`--input` on inputs)   |
| `--color-border-dark`                 | `--foreground`                     |
| `--color-{status}-surface` / `-text`  | `--{status}-subtle` / `--{status}` |
| `--color-brand-200`                   | `--brand`                          |

Two components also renamed a variant: Alert `danger` is now `destructive`, and
Badge `pending` is now `warning`. Input and Textarea sizes now match Button
heights, so the old `base` (48px) is now `lg`.
