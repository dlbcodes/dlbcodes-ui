# Field

`Field` ties a form control together with its label, description, and error
message — and wires up the accessibility between them. It's the wrapper you reach
for whenever a control needs a label or help text.

The controls in this library are deliberately label-less and standalone-capable.
`Field` is what coordinates them: it generates a shared `id`, points the label's
`for` at the control, links the control's `aria-describedby` to the description
and error, and cascades `disabled`/`required`/`invalid` down to the control —
all automatically, so you never manage `id`s or ARIA attributes by hand.

## Anatomy

\```
Field ← provides context; sets orientation and state
├── FieldLabel ← label; auto-targets the control (shows \* when required)
└── FieldContent ← groups the control with its messages
├── (your control) ← Input, Checkbox, Switch… inherits id/state from Field
├── FieldDescription ← help text; linked via aria-describedby
└── FieldError ← error message; role="alert", linked when invalid
\```

Put the control inside `FieldContent` alongside its `FieldDescription` and
`FieldError`. The control picks up everything from the surrounding `Field`.

## Usage

A label, a control, and a description. Notice you set no `id` anywhere — `Field`
generates it and wires the label and description to the input automatically.

<preview path="../demos/field/field-basic.vue" title="Basic" description="Label, input, and description — auto-wired."></preview>

## Required

Set `required` on the `Field` and the label gets a `*` indicator. The state
cascades to the control too (setting its `aria-required`).

<preview path="../demos/field/field-required.vue" title="Required" description="The required indicator, driven by the field."></preview>

## Error state

Set `invalid` and add a `FieldError`. The control gets error styling and
`aria-invalid`, and its `aria-describedby` now points at both the description and
the error — so screen readers announce the problem.

<preview path="../demos/field/field-error.vue" title="Error" description="Invalid state with an error message."></preview>

## Horizontal orientation

For toggles and checkboxes, `orientation="horizontal"` lays the control and label
out in a row instead of stacked.

<preview path="../demos/field/field-horizontal.vue" title="Horizontal" description="A switch with an inline label."></preview>

## How the wiring works

When you wrap a control in a `Field`:

- **`id`** — `Field` generates one (or uses the `id` you pass it) and shares it,
  so `FieldLabel`'s `for` and the control's `id` match. Clicking the label focuses
  the control.
- **`aria-describedby`** — the control is linked to the `FieldDescription`'s id,
  and also to the `FieldError`'s id when `invalid`.
- **`disabled` / `required` / `invalid`** — set them once on the `Field` and they
  cascade to the control and the label.

A control still works perfectly **without** a `Field` — it just falls back to its
own props. `Field` is the convenience layer for the common labelled-control case.

## Props

### Field

| Prop          | Type                         | Default      | Description                                                          |
| ------------- | ---------------------------- | ------------ | -------------------------------------------------------------------- |
| `id`          | `string`                     | auto         | Base id for the control. Generated automatically if omitted.         |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Stacks the parts (vertical) or rows them (horizontal).               |
| `invalid`     | `boolean`                    | `false`      | Marks the field invalid — cascades error styling and `aria-invalid`. |
| `disabled`    | `boolean`                    | `false`      | Disables the field — cascades to the control.                        |
| `required`    | `boolean`                    | `false`      | Marks required — shows the label `*` and sets `aria-required`.       |
| `class`       | `string`                     | —            | Classes merged onto the root.                                        |

### FieldLabel

| Prop    | Type     | Default | Description                                                |
| ------- | -------- | ------- | ---------------------------------------------------------- |
| `for`   | `string` | auto    | Target control id. Defaults to the `Field`'s generated id. |
| `class` | `string` | —       | Classes merged onto the label.                             |

### FieldContent, FieldDescription, FieldError

Each takes only `class`. `FieldDescription` and `FieldError` automatically render
with the ids the control's `aria-describedby` expects; `FieldError` uses
`role="alert"` so it's announced when it appears.

## Accessibility

- The label/control association, `aria-describedby`, and `aria-invalid` are all
  wired automatically — the main reason to use `Field` over loose elements.
- `FieldError` has `role="alert"`, so an error is announced when it appears.
- State set on the `Field` (`disabled`/`required`/`invalid`) cascades to the
  control, keeping the visual and accessible states in sync.
