# Architecture & Design Decisions

This document explains *why* this design system is built the way it is: the
architectural decisions, the tradeoffs behind them, and the things I'd revisit.
It's less a usage guide (the [docs](https://my-design-system-beta.vercel.app)
cover that) and more a record of the engineering judgment that shaped the library.

It's also honest about what isn't done. This is an early, evolving project, and
I'd rather document the real state than oversell it.

---

## What this is

A Vue 3 component library in the spirit of shadcn/ui: compound, composable
components, themed entirely through semantic design tokens, built on Headless UI
for accessibility primitives. It's published to npm as
`@dlbcodes/my-design-system` and consumed by a separate
[showcase app](https://dlbcodes-ui-showcase.vercel.app) to dogfood it in a
realistic setting.

I built it to explore how a design system holds together as a *system*: token
architecture, API consistency, accessibility, and the build/publish lifecycle,
rather than to assemble a pile of components.

The stack: Vue 3.5 + TypeScript, Tailwind CSS v4, class-variance-authority (CVA),
Headless UI (plus Headless UI Float for positioning), Vite library mode, Vitest,
and VitePress for documentation.

---

## Decision 1: Compound components over prop-heavy APIs

The central bet is that components compose from small parts rather than expose
one large, configurable component.

```vue
<!-- Compound: compose the parts you need -->
<Field>
  <FieldLabel>Email</FieldLabel>
  <FieldContent>
    <Input v-model="email" type="email" />
  </FieldContent>
  <FieldError>{{ errors.email }}</FieldError>
</Field>
```

rather than:

```vue
<!-- Prop-heavy: one component, many props -->
<Field
  label="Email"
  :error="errors.email"
  type="email"
  v-model="email"
/>
```

**Why compound.** A prop-heavy component has a hard ceiling: the day a consumer
needs a layout or behaviour the props don't anticipate, they're stuck forking it.
Composition pushes that ceiling out. The consumer arranges the parts, so the
component doesn't have to predict every arrangement. It also keeps each part's
responsibility narrow and readable.

**The honest tradeoff.** Compound components are not strictly better, and I want
to be precise about where they lose:

- **They're more verbose**, and the template is harder to scan than a single tag
  with props.
- **LLMs compose them less reliably** than they fill in props, a real cost now
  that a lot of UI is AI-generated. This was raised directly in feedback on the
  project, and it's a fair hit against the whole approach.
- **The failure mode is shallow wrappers.** Compound only earns its keep if each
  part *does* something. A `<FieldContent>` that just renders `<slot />` and adds
  nothing is ceremony. I've tried to keep parts meaningful (e.g. `Field`
  generates and distributes a shared id and ARIA state, see Decision 3), but the
  risk is real and worth naming.

I still think composition is the right default for a system meant to be themed
and extended, but I hold it loosely. A hybrid (prop-heavy default with a slot
escape hatch, as Nuxt UI does) is a credible alternative I'd genuinely consider.

---

## Decision 2: A two-layer token system

Theming is the payoff of the whole architecture, and it rests on a deliberate
two-layer token model.

**Layer 1, primitives.** A raw palette: `--color-zinc-50`, `--color-indigo-600`,
and so on. These are values, not meanings.

**Layer 2, semantic tokens.** Purpose-named tokens that *reference* the
primitives: `--color-bg-surface`, `--color-text-primary`,
`--color-border-default`, `--color-brand-200`.

Components consume **only** semantic tokens, never primitives, never hardcoded
colours:

```
primitives  ->  semantic tokens  ->  components
(raw values)    (purpose-named)      (consume semantic only)
```

**Why two layers.** This is what makes retheming a *token override* rather than a
fork. Because components read `bg-surface` (not `zinc-50`), a consumer can change
the entire look by overriding the semantic layer:

```css
[data-theme="zinc"] {
  --color-bg-base: oklch(100% 0 0);
  --color-bg-surface: oklch(98.5% 0 0);
  --color-text-primary: oklch(20% 0 0);
  --color-brand-200: oklch(25% 0.01 270);
  /* ...the whole neutral character shifts */
}
```

The showcase uses this to reskin itself at runtime via `[data-theme]`: three
themes (warm, slate, near-monochrome) that feel like different apps, driven
entirely by overriding the semantic layer. Colours are defined in
[OKLCH](https://oklch.com) for perceptually uniform lightness, which makes
deriving legible token values across themes far more predictable than hex.

**The honest tradeoff.** Two layers is more indirection than a flat palette, and
it only pays off if the discipline holds: *every* component must read semantic
tokens. The moment one hardcodes a colour, a dramatic theme exposes it as an
element that won't reskin. Building the multi-theme showcase was partly a
deliberate stress test of exactly this. A dark or high-contrast theme surfaces
token leaks immediately, and fixing them is what keeps the system honest. The
indirection is the cost; consistent, fork-free theming is what it buys.

---

## Decision 3: Field as a context provider for accessibility

The `Field` family is the clearest example of compound parts that earn their
place. It exists to wire accessibility so consumers don't have to.

`Field` generates a stable id (via Vue's `useId()`) and provides a typed context:

```ts
export interface FieldContext {
  id: ComputedRef<string>;
  descriptionId: ComputedRef<string>;
  errorId: ComputedRef<string>;
  describedById: ComputedRef<string | undefined>; // error wins when invalid
  invalid: ComputedRef<boolean>;
  disabled: ComputedRef<boolean>;
  required: ComputedRef<boolean>;
}
```

`FieldLabel` reads the id and renders `<label :for="id">`. The control reads the
same id and applies it to its focusable element, plus `aria-describedby`
(pointing at the description, and the error too when invalid) and `aria-invalid`.
Consumers get correct label/description/error association and ARIA wiring for
free, the thing that's tedious and easy to get wrong by hand.

**Controls work standalone too.** Each control injects the context with a `null`
default, so an `<Input>` outside a `<Field>` still renders fine. The integration
is opt-in, not mandatory.

**What this section is really about: a real bug I found and fixed.** While
dogfooding the showcase, the browser flagged a `<label for="x">` with no matching
element. The cause: `Select` and `MultiSelect` triggers are custom buttons built
on Headless UI, and they *didn't* consume the Field context, so the label
pointed at an id no element claimed. Native `Input`/`Textarea` were wired; the
button-based triggers were not.

The fix made the triggers inject `FieldKey` and apply `:id` plus the ARIA cascade
to the trigger, mirroring how `Input` works, making `Select`/`MultiSelect`
first-class Field citizens. I added regression tests asserting the trigger adopts
the field's id and `aria-invalid`.

There's an honest a11y subtlety worth recording: the `MultiSelect` trigger
rendered as a `<div>`, and a `<label for>` only properly associates with
*labelable* elements. Setting the id clears the warning, but a div isn't fully
focusable/labelable. The more correct fix is rendering the trigger as a `<button>`
(or `role="combobox"` plus `tabindex="0"`). That's the difference between "warning
gone" and "actually accessible," and it's the kind of detail a design system has
to get right rather than paper over.

---

## Decision 4: CVA for variants, with the tradeoffs made explicit

Component variants are defined with class-variance-authority, a typed map from
variant props to Tailwind class strings:

```ts
export const sidebarItemVariants = cva(baseClasses, {
  variants: {
    active:   { true: "bg-bg-subtle text-text-primary",
                false: "text-text-secondary hover:bg-bg-subtle" },
    disabled: { true: "pointer-events-none opacity-50", false: "" },
  },
  defaultVariants: { active: false, disabled: false },
});
```

**Why CVA.** It gives variants a single source of truth with inferred TypeScript
types, and keeps the class logic out of the template. Combined with a `cn()`
helper (clsx plus tailwind-merge), consumer overrides merge predictably instead
of fighting specificity.

**A real tradeoff I hit.** CVA merges classes from *all* matched variants. A
disabled-but-inactive item gets both the inactive hover classes and the disabled
classes. In this case `pointer-events-none` neutralizes the dead hover, so it's
harmless, but it's a reminder that a compound-variant matrix can produce class
combinations you didn't explicitly intend. The clean fix (a compound variant to
strip the hover when disabled) was available; I judged it overkill here and kept
the simpler version. Documenting *why* I chose the simpler path is itself part of
the discipline.

---

## Decision 5: Polymorphic items via an `as` prop

Navigation items (`SidebarItem`) are framework-agnostic. They render as whatever
the consumer passes, with consumer-controlled active state:

```vue
<SidebarItem :as="RouterLink" to="/" :active="route.path === '/'">Home</SidebarItem>
<SidebarItem :as="NuxtLink"   to="/" :active="$route.path === '/'">Home</SidebarItem>
```

**Why.** A design system shouldn't hardcode a router. Letting the consumer supply
the element (`"a"`, `RouterLink`, `NuxtLink`, `"button"`) means the same component
works in plain Vue and Nuxt, and the consumer owns the active-match logic (which
is genuinely app-specific).

**The subtlety polymorphism forces.** "Disabled" doesn't mean the same thing
across elements. A `<button disabled>` is natively inert; an `<a>` has no native
`disabled`. So a correct `disabled` can't just pass the attribute through. The
disabled item renders as a `<span>` (no href, nothing to navigate), with
`aria-disabled`, `tabindex="-1"`, and a click guard. Polymorphism is powerful, but
it means handling each render target's semantics rather than assuming one.

---

## Decision 6: Behavioural depth, not just open/close

Early on, the overlay components (Modal, Popover) handled the happy path:
open, close, focus trap, scroll lock, Escape, and stopped there. Feedback on the
project pushed on this directly: the APIs were too shallow for real use.

The critique was fair, and locating *exactly* where it was true mattered more
than accepting it wholesale. The Modal already had dismissal control
(`persistent`, `closeOnBackdrop`) and focus trap plus restore. What it genuinely
lacked was *interception*:

- **A `before-close` hook that can veto a close**, the "you have unsaved
  changes, discard?" case. The shallow version just closes; a real one lets the
  consumer cancel the close.
- **A close *reason*** in the event (`escape` / `backdrop` / `close-button` /
  `programmatic`). Apps branch on how a dialog was dismissed.
- **Lazy mounting** of expensive content until the modal actually opens.

The design that addresses this routes *every* close attempt through one
`attemptClose(reason)` funnel: it calls the consumer's `beforeClose(reason)`, and
only if that doesn't veto does it emit `close` with the reason and update the
model. One funnel yields both the veto hook and the reason.

I'm recording this less as a finished feature and more as the lesson: a component
isn't "done" when it opens and closes. It's done when it survives the messy real
cases, and the gap between those two is exactly what separates a demo from a
usable library.

---

## Testing approach

Components are tested with Vitest plus Vue Test Utils, currently around 196 tests.
Two patterns are worth noting:

- **Mock-context harness.** Components that depend on a provided context (Sidebar,
  the Field-integrated controls) are tested with a `makeCtx`/`withCtx` helper that
  injects a controllable fake context. This lets a test flip `isMobile`,
  `collapsed`, or `invalid` directly without depending on real window size or
  media queries. Fast and deterministic.
- **Behaviour over markup.** Tests assert behaviour and accessibility (does the
  trigger adopt the field id, does a disabled item skip navigation, does the
  drawer close on backdrop click) rather than snapshotting class strings, which
  would break on every styling tweak.

Regression tests follow real bugs: the Field-id fix from Decision 3 has tests
pinning that the label's `for` matches the trigger's `id`, which would have caught
the original bug.

---

## Build & distribution

The library ships via Vite library mode with `vite-plugin-dts` for type
declarations, published as a scoped public npm package. A few deliberate choices:

- **Semantic versioning, honestly applied.** A new prop is a minor bump; a
  behaviour or visual change to an existing component is treated as
  minor-with-a-note in 0.x rather than buried as a patch, so consumers aren't
  surprised.
- **Tokens distributed as CSS.** `tokens.css` ships alongside the components so
  consumers import the semantic layer and can override it. The Tailwind v4 setup
  is a documented three-line import.
- **An `llms.txt`** is served from the docs site (not the npm tarball) so an LLM
  can fetch a structured, per-component index of the library. A small nod to the
  reality that a lot of consumers are now AI assistants.

---

## What's not done

Being straight about the current state:

- **No dark mode.** The system is light-only by design today. The token
  architecture *could* support it, but every component would need verifying
  against dark semantic values, and I haven't done that pass.
- **Missing components.** No Table/DataTable, Combobox, or Date Picker, the
  harder, higher-surface-area components.
- **Partial test coverage and thin docs** in places.
- **The API will still break between 0.x versions.**
- **Accessibility is a baseline, not a guarantee.** Automated audits look good
  (Lighthouse around 94 on the showcase), but automated tools catch a minority of
  WCAG issues. Full keyboard-and-screen-reader verification across every component
  is ongoing, and the `MultiSelect` trigger's `div`-vs-`button` issue (Decision 3)
  is exactly the kind of thing that needs a manual pass, not just a green score.

---

## What I'd reconsider

- **The compound-vs-prop question is genuinely open.** The AI-generation and
  readability arguments against pure compound are strong enough that a hybrid
  (prop-heavy default plus a slot escape hatch) deserves serious evaluation rather
  than dismissal.
- **Mobile-first, properly.** Most libraries (this one included) are web-first
  despite mobile carrying more traffic. The litmus tests are in the details: does
  a time input set `inputmode` for a numeric keyboard, are touch targets sized
  correctly, and that's a discipline to build in from the start, not bolt on.
- **Accessibility out of the box, verified.** Claiming "accessible" is easy;
  proving AA (contrast, keyboard operability, visible focus) across every
  component without configuration is the bar worth holding the system to.

The honest summary: the architecture (semantic tokens, compound composition,
context-driven accessibility) is sound, and the system does what it set out to do.
The work ahead is depth: deeper component APIs, verified accessibility, and
resolving the design-philosophy questions the project has surfaced.