# Progress

A horizontal bar showing how far along a task is — a file upload, a multi-step
form, a loading process. The filled portion reflects the current value against a
maximum, and changes animate smoothly so progress reads as motion rather than
jumps.

## Usage

Pass a `value` from 0 to 100. The bar fills to that percentage.

<preview path="../demos/progress/progress-basic.vue" title="Values" description="25%, 50%, 75%, and 100%."></preview>

## Animated

Because the fill transitions, updating `value` over time animates the bar — handy
for uploads or any task you poll.

<preview path="../demos/progress/progress-animated.vue" title="Animated" description="Value increasing over time."></preview>

## Custom maximum

Set `max` to measure against something other than 100 — useful for "step N of M"
progress.

<preview path="../demos/progress/progress-max.vue" title="Custom max" description="3 out of 5."></preview>

## Labelling

A progress bar needs an accessible name so screen readers can announce _what_ is
progressing, not just the percentage. Pass `label` with a short description:

```vue
<Progress :value="86" label="Storage used" />
```

If a visible caption already names the bar, point at it with `aria-labelledby`
instead, so the accessible name and the on-screen text stay in sync:

```vue
<span id="upload-label">Uploading…</span>
<Progress :value="60" aria-labelledby="upload-label" />
```

## Props

| Prop    | Type     | Default | Description                                                                        |
| ------- | -------- | ------- | ---------------------------------------------------------------------------------- |
| `value` | `number` | —       | Current progress (0–`max`). Omit for an empty/indeterminate bar. Clamped to range. |
| `max`   | `number` | `100`   | The value representing 100% complete.                                              |
| `label` | `string` | —       | Accessible name for the bar, announced by screen readers (sets `aria-label`).      |
| `class` | `string` | —       | Classes merged onto the track — use for height, width, or color.                   |

Any other attribute (e.g. `aria-labelledby`) forwards to the progressbar element.

## Accessibility

- The bar has `role="progressbar"` with `aria-valuemin`, `aria-valuemax`, and
  `aria-valuenow`, so assistive tech announces the current progress. When `value`
  is a percentage, `aria-valuetext` announces it with the `%` unit.
- **Give every bar a name.** A `progressbar` role without an accessible name is
  announced generically and is unusable on a screen reader. Pass `label` (or
  `aria-labelledby` to reference visible text). There is intentionally no default
  name — a generic one would hide the need for a meaningful one.
- An indeterminate bar (no `value`) sets `aria-busy`, signalling work in progress.
- Values are clamped to the `0`–`max` range, so out-of-range input won't break the
  bar visually or in the ARIA values.
