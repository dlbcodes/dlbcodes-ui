# Kbd

A keyboard key indicator. `Kbd` renders a single key; `KbdGroup` arranges several
keys into a combo (like ⌘K). Use them to document shortcuts in menus, tooltips,
help text, and command palettes.

`Kbd` is slot-only — put the key's label (a letter, word, or symbol like ⌘ or ⇧)
inside it. There are no variants: a key is a small muted chip, and you can adjust
anything via the `class` prop.

## Usage

A single key holds whatever you put in its slot.

<preview path="../demos/kbd/kbd-basic.vue" title="Single keys" description="Letters, words, and symbols."></preview>

## Key combinations

Wrap multiple `Kbd`s in a `KbdGroup` to show a shortcut combo. Pass `aria-label`
on the group to give screen readers a clean spoken name — important when the keys
are symbols (⌘, ⇧) that don't read clearly on their own.

<preview path="../demos/kbd/kbd-group.vue" title="Combinations" description="Multi-key shortcuts via KbdGroup."></preview>

## In context

Both compose inline within text, so you can reference shortcuts naturally in
help copy and tooltips.

<preview path="../demos/kbd/kbd-inline.vue" title="Inline" description="Used within a sentence."></preview>

## Appearance

A key has a `--muted` background, `--muted-foreground` text, and corners that
follow `--radius`, so it follows your theme, including dark mode. It is small
(20px tall) and can't be selected or clicked, which keeps it from getting in the
way of surrounding text.

Because `--muted` is close to the page background in the light theme, a key can
look faint on a tinted panel. Add a border there through `class`:

<code-block lang="vue">

```vue
<Kbd class="border border-border">K</Kbd>
```

</code-block>

## Props

### Kbd

| Prop    | Type     | Default | Description                      |
| ------- | -------- | ------- | -------------------------------- |
| `class` | `string` | —       | Classes merged onto the element. |

### KbdGroup

| Prop        | Type     | Default | Description                                                                                                                                                                            |
| ----------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ariaLabel` | `string` | —       | Spoken name for the whole combo (e.g. `"Command K"`). When set, the group is announced as one label with `role="group"` instead of read key-by-key. Recommended when keys are symbols. |
| `class`     | `string` | —       | Classes merged onto the element.                                                                                                                                                       |

## Accessibility

- `Kbd` renders a semantic `<kbd>` element, the correct HTML for keyboard input.
- For symbol keys (⌘, ⇧, ⌥), set `aria-label` on the surrounding `KbdGroup` so
  screen readers announce the shortcut clearly rather than attempting to read the
  symbols individually. The group then exposes a single `role="group"` label.
