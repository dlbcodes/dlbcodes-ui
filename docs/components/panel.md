# Panel

A surface container for grouping content, the building block for cards, sidebars,
and sectioned layouts. Panel provides a rounded, bordered surface; its parts
(`PanelHeader`, `PanelContent`, `PanelFooter`) give it structure.

The parts are independent layout pieces, compose the ones you need, in the order
you need. The common arrangement is header, content, footer.

## Anatomy

```
Panel
├── PanelHeader
├── PanelContent
└── PanelFooter
```

## Usage

<preview path="../demos/panel/panel-basic.vue" title="Basic" description="A panel with a header, content, and footer."></preview>

## Content only

Use just `PanelContent` for a simple raised surface inside the panel, no header
or footer required.

<preview path="../demos/panel/panel-content.vue" title="Content only" description="A panel with only a content surface."></preview>

## As a navbar

Panel isn't only for cards. Because it's a generic surface, it works just as well
for app chrome, here it composes a brand mark, navigation links, and actions into
a navigation bar.

<preview path="../demos/panel/panel-navbar.vue" title="Navbar" description="A navigation bar built from a Panel surface."></preview>

## Concentric corners

`PanelContent` uses a slightly smaller corner radius than `Panel` so the inner
surface nests cleanly inside the outer border. This concentric radius
(`Panel`'s radius minus its padding) keeps the rounded corners visually parallel
rather than mismatched. It assumes `PanelContent` sits directly inside `Panel`.

## Props

Every part accepts a single `class` prop, merged onto its root element.

| Component      | Purpose                                               |
| -------------- | ----------------------------------------------------- |
| `Panel`        | The outer surface: border, rounding, padding, shadow. |
| `PanelHeader`  | A top row for a title and controls.                   |
| `PanelContent` | The main raised surface (concentric inner radius).    |
| `PanelFooter`  | A bottom row for actions or metadata.                 |

## Notes

The parts are not coupled by shared state, they're independent layout
containers. You can omit any of them, reorder them, or use `PanelContent` on its
own. The concentric corner radius on `PanelContent` is calibrated for being a
direct child of `Panel`; if you nest it elsewhere, set the radius yourself via
`class`.
