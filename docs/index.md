---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
    name: "My Design System"
    text: "Accessible Vue 3 components, tokenized and yours to own."
    tagline: A composable component library built on Tailwind v4, class-variance-authority, and Headless UI — designed to be styled with your tokens, not fought against.
    actions:
        - theme: brand
          text: Get started
          link: /components/avatar
        - theme: alt
          text: Browse components
          link: /components/avatar

features:
    - title: Tokenized by design
      details: Every component is built on semantic CSS-variable tokens. Restyle the whole system by overriding tokens — no component edits, no overrides, no specificity wars.
    - title: Accessible out of the box
      details: Overlays, menus, tabs, and dialogs are built on Headless UI, so focus management, keyboard navigation, and ARIA wiring come handled — not bolted on.
    - title: Composable, not configurable
      details: Compound components like Select, Tabs, and Modal expose their parts (Trigger, Content, Item), so you compose the markup you need instead of wrestling a monolith of props.
    - title: Tailwind v4 native
      details: Ships its tokens and source for your Tailwind build to scan — utilities resolve against your config, classes tree-shake, and there's no precompiled CSS to override.
    - title: Typed and predictable
      details: Written in TypeScript with explicit prop interfaces and class-variance-authority variants, so editor autocomplete and type-checking guide every usage.
    - title: Standalone or wired
      details: Form controls work on their own, or drop them in a Field to auto-wire labels, descriptions, errors, and the ARIA between them — your choice, per use.
---
