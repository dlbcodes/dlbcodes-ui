# Disclosure

A single expandable section — a button that shows or hides a panel of content.
Use it for FAQs, collapsible details, "show more" sections, or to tuck away
secondary information until it's needed. Built on Headless UI's disclosure, so
the `aria-expanded`/`aria-controls` wiring, keyboard support, and focus are
handled for you.

A disclosure is independent: each one manages its own open state. Stack several
to form an FAQ or accordion-style list.

## Anatomy

\```
Disclosure ← the root; manages open/closed state
├── DisclosureButton ← the trigger row (shows a rotating chevron)
└── DisclosurePanel ← the collapsible content
\```

The button's content is the heading; the panel's content is what's revealed.
The chevron rotates automatically with the open state.

## Usage

<preview path="../demos/disclosure/disclosure-basic.vue" title="Basic" description="A button that toggles a panel."></preview>

## Open by default

Set `defaultOpen` on the `Disclosure` to have it expanded initially.

<preview path="../demos/disclosure/disclosure-default-open.vue" title="Default open" description="Starts expanded."></preview>

## FAQ list

Stack disclosures to build an FAQ. Each is independent — opening one doesn't
close the others.

<preview path="../demos/disclosure/disclosure-faq.vue" title="FAQ" description="A stack of disclosures."></preview>

## Custom trigger

`DisclosureButton` exposes the `open` state via its default slot, so you can
change the label or content based on whether the panel is open.

<preview path="../demos/disclosure/disclosure-custom.vue" title="Custom trigger" description="A label that reflects the open state."></preview>

## Props

### Disclosure

| Prop          | Type      | Default | Description                              |
| ------------- | --------- | ------- | ---------------------------------------- |
| `defaultOpen` | `boolean` | `false` | Whether the panel is expanded initially. |
| `class`       | `string`  | —       | Classes merged onto the root.            |

Exposes `open` (boolean) via its default slot.

### DisclosureButton

Takes only `class`. Its slot content is the trigger label, and it exposes `open`
(boolean) via the default slot. A chevron is included automatically and rotates
with the open state.

### DisclosurePanel

Takes only `class`. Its slot content is the collapsible body.

## Accessibility

- Built on Headless UI's disclosure, so the button gets `aria-expanded` and
  `aria-controls`, and the panel is associated with the button via generated ids.
- The button is a real, focusable `<button>`; `Enter`/`Space` toggle the panel.
- Each disclosure is independent — for a true single-open accordion (opening one
  closes the others), you'd coordinate their state yourself.
