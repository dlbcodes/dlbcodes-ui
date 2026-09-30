# Architecture & Design Decisions

This document explains _why_ this design system is built the way it is: the
architectural decisions, the tradeoffs behind them, and the things I'd revisit.
It's less a usage guide (the [docs](https://my-design-system-beta.vercel.app)
cover that) and more a record of the engineering judgment that shaped the library.

It's also honest about what isn't done. This is an early, evolving project, and
I'd rather document the real state than oversell it.

---

## What this is

A Vue 3 component library in the spirit of shadcn/ui: compound, composable
components, themed entirely through semantic design tokens, built on Headless UI
for accessibility primitives. It's published to npm as `@dlbcodes/ui` (formerly
`@dlbcodes/my-design-system`) and consumed by a separate
[showcase app](https://dlbcodes-ui-showcase.vercel.app) to dogfood it in a
realistic setting.

I built it to explore how a design system holds together as a _system_: token
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
<Field label="Email" :error="errors.email" type="email" v-model="email" />
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
  part _does_ something. A `<FieldContent>` that just renders `<slot />` and adds
  nothing is ceremony. I've tried to keep parts meaningful (e.g. `Field`
  generates and distributes a shared id and ARIA state, see Decision 3), but the
  risk is real and worth naming.

I still think composition is the right default for a system meant to be themed
and extended, but I hold it loosely. A hybrid (prop-heavy default with a slot
escape hatch, as Nuxt UI does) is a credible alternative I'd genuinely consider.

---

## Decision 2: Semantic tokens, shadcn-compatible, with radius as a token

Theming is the payoff of the whole architecture. Components consume **only**
semantic tokens, never hardcoded colours or fixed corner radii:

```
semantic tokens  ->  components
(purpose-named)      (consume tokens only)
```

Colours are role-named CSS variables in the shadcn/ui convention: `--background`
and `--foreground`, `--primary` and `--primary-foreground`, `--muted`,
`--accent`, `--border`, `--ring`, plus status sets (`--success`, `--warning`,
`--info`, `--destructive`, each with a `-subtle` surface and a `-border`), a
`--brand` colour, and a separate `--sidebar-*` set. Every surface is paired with
the text that sits on it (`-foreground`), so a re-theme can't produce text that
disappears into its own background.

Corner radius is a token too. One variable, `--radius`, drives the whole scale
(`rounded-sm` through `rounded-3xl` are multiples of it), so a consumer can go
from square to very round by changing a single value.

**Why this replaced my first design.** The library originally had two layers: a
raw palette (`--color-bg-200`) that _semantic_ tokens (`--color-bg-surface`,
`--color-text-primary`) referenced. I moved away from it for three reasons:

- **The primitive layer wasn't earning its keep.** Consumers themed the semantic
  layer; nobody overrode primitives. It was indirection with no user.
- **The names fought Tailwind.** In Tailwind v4 a `--color-text-primary` token
  produces `text-text-primary`, and `--color-bg-surface` produces `bg-bg-surface`.
  The shadcn names read as `text-foreground`, `bg-muted`, and are already familiar
  to most people who'd adopt a library like this.
- **The ramp numbers contradicted each other.** In `text-100` the lightest step was
  1, but in `success-100` the darkest step was 1. A scale should mean one thing.

The mechanics matter, and got a few details wrong before I got them right:

- Semantic variables live on `:root` (and `.dark`), and Tailwind sees them through
  `@theme inline`. `inline` is what makes an override on a _wrapper element_ work:
  without it, `calc(var(--radius) * 0.8)` is resolved once at the root, and a
  scoped `--radius` does nothing.
- The same trick lets you theme part of a page: set `--brand` or `--radius` on a
  wrapper and everything inside picks it up. The showcase's runtime `[data-theme]`
  switching (warm, slate, near-monochrome) works this way, by overriding the
  semantic variables.
- Colours are defined in [OKLCH](https://oklch.com) for perceptually uniform
  lightness, which makes deriving legible values across themes far more
  predictable than hex.

**Shared scales.** Tokens aren't only colour. Controls share one height scale, so
a button and an input of the same size line up in a row (sm 32px, base 40px,
lg 48px, xl 56px). That began as a bug: buttons and inputs used the same size
_names_ with different heights, which made forms hard to lay out. Where one
element must be concentric with another (an avatar's image inside its frame, a
panel's content inside its border), the inner radius is written as
`calc(var(--radius) * k - padding)`, so it stays concentric at any radius.

**The honest tradeoffs.**

- **It's a breaking change.** Every token and two variant names (`danger` to
  `destructive`, `pending` to `warning`) changed. In `0.x` I think that's the right
  time to pay for it, and the migration table lives in the theming docs.
- **The discipline is the same, and still the real cost.** _Every_ component must
  read tokens. The moment one hardcodes a colour or a fixed `rounded-[8px]`, a
  dramatic theme exposes it as an element that won't reskin. The multi-theme
  showcase, and now the radius slider, are deliberate stress tests of exactly this.
- **Some values are coupled by hand.** The concentric-radius formulas repeat the
  scale's multipliers, so changing the scale means updating them too. I judged that
  cheaper than a second abstraction, and left a comment where it matters.
- **A subtle gotcha for consumers.** `:root` and `.dark` have equal specificity, so
  a variable a consumer overrides only on `:root` also wins in dark mode. The
  theming docs call this out; it's the kind of thing that only shows up when you
  actually ship a dark theme.

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
is opt-in, not mandatory. Controls also generate their own fallback id
(explicit prop, then Field, then `useId()`), so a `<Label for>` can always
target them.

**What this section is really about: a real bug I found and fixed.** While
dogfooding the showcase, the browser flagged a `<label for="x">` with no matching
element. The cause: `Select` and `MultiSelect` triggers are custom buttons built
on Headless UI, and they _didn't_ consume the Field context, so the label
pointed at an id no element claimed. Native `Input`/`Textarea` were wired; the
button-based triggers were not.

The fix made the triggers inject `FieldKey` and apply `:id` plus the ARIA cascade
to the trigger, mirroring how `Input` works, making `Select`/`MultiSelect`
first-class Field citizens. I added regression tests asserting the trigger adopts
the field's id and `aria-invalid`.

There's an honest a11y subtlety worth recording: the `MultiSelect` trigger
rendered as a `<div>`, and a `<label for>` only properly associates with
_labelable_ elements. Setting the id clears the warning, but a div isn't fully
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
        active: {
            true: "bg-sidebar-accent text-sidebar-accent-foreground",
            false: "text-sidebar-foreground/70 hover:bg-sidebar-accent",
        },
        disabled: { true: "pointer-events-none opacity-50", false: "" },
    },
    defaultVariants: { active: false, disabled: false },
});
```

**Why CVA.** It gives variants a single source of truth with inferred TypeScript
types, and keeps the class logic out of the template. Combined with a `cn()`
helper (clsx plus tailwind-merge), consumer overrides merge predictably instead
of fighting specificity.

**A real tradeoff I hit.** CVA merges classes from _all_ matched variants. A
disabled-but-inactive item gets both the inactive hover classes and the disabled
classes. In this case `pointer-events-none` neutralizes the dead hover, so it's
harmless, but it's a reminder that a compound-variant matrix can produce class
combinations you didn't explicitly intend. The clean fix (a compound variant to
strip the hover when disabled) was available; I judged it overkill here and kept
the simpler version. Documenting _why_ I chose the simpler path is itself part of
the discipline.

**A lesson about `disabled:`.** Many of these components render a wrapper `div`
around a real `<input>`, or a Headless UI element that is disabled through
`aria-disabled`, not the attribute. A `disabled:` variant never matches either,
so the "disabled" styling silently did nothing. The variants now use
`aria-disabled:` and `has-disabled:` alongside `disabled:`. It's the kind of bug a
green test suite won't find, because nothing failed, it just never applied.

---

## Decision 5: Polymorphic items via an `as` prop

Navigation items (`SidebarItem`) are framework-agnostic. They render as whatever
the consumer passes, with consumer-controlled active state:

```vue
<SidebarItem
    :as="RouterLink"
    to="/"
    :active="route.path === '/'"
>Home</SidebarItem>
<SidebarItem
    :as="NuxtLink"
    to="/"
    :active="$route.path === '/'"
>Home</SidebarItem>
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

**Where it isn't finished.** `Button` supports `as` and `to`, but its default link
implementation still imports `RouterLink`, which makes `vue-router` a hard peer
dependency even for apps that never route. Resolving the link component lazily, or
letting the consumer provide it, would make the router genuinely optional.

---

## Decision 6: Behavioural depth, not just open/close

Early on, the overlay components (Modal, Popover) handled the happy path:
open, close, focus trap, scroll lock, Escape, and stopped there. Feedback on the
project pushed on this directly: the APIs were too shallow for real use.

The critique was fair, and locating _exactly_ where it was true mattered more
than accepting it wholesale. The Modal already had dismissal control
(`persistent`, `closeOnBackdrop`) and focus trap plus restore. What it genuinely
lacked was _interception_:

- **A `before-close` hook that can veto a close**, the "you have unsaved
  changes, discard?" case. The shallow version just closes; a real one lets the
  consumer cancel the close.
- **A close _reason_** in the event (`escape` / `backdrop` / `close-button` /
  `programmatic`). Apps branch on how a dialog was dismissed.
- **Lazy mounting** of expensive content until the modal actually opens.

The design that addresses this routes _every_ close attempt through one
`attemptClose(reason)` funnel: it calls the consumer's `beforeClose(reason)`, and
only if that doesn't veto does it emit `close` with the reason and update the
model. One funnel yields both the veto hook and the reason.

Reviewing the overlays again turned up a second class of gap, in _lifecycle_
rather than API: a modal or drawer unmounted while open (a route change, a `v-if`
on the component itself) left the body scroll-locked and the focus trap active. A
modal that mounted already open never locked scroll. A dialog with nothing
focusable made the focus trap throw. And the sidebar drawer listened for Escape on
itself, but focus usually stays on the button that opened it, so the key never
arrived. None of these show up on the happy path, and all of them are what a user
hits in production.

I'm recording this less as a finished feature and more as the lesson: a component
isn't "done" when it opens and closes. It's done when it survives the messy real
cases, and the gap between those two is exactly what separates a demo from a
usable library.

---

## Testing approach

Components are tested with Vitest plus Vue Test Utils. Two patterns are worth
noting:

- **Mock-context harness.** Components that depend on a provided context (Sidebar,
  the Field-integrated controls) are tested with a `makeCtx`/`withCtx` helper that
  injects a controllable fake context. This lets a test flip `isMobile`,
  `collapsed`, or `invalid` directly without depending on real window size or
  media queries. Fast and deterministic.
- **Behaviour over markup.** Tests assert behaviour and accessibility (does the
  trigger adopt the field id, does a disabled item skip navigation, does the
  drawer close on backdrop click) rather than snapshotting class strings, which
  would break on every styling tweak.

The token migration tested that claim, and not everything passed. A handful of
tests still pinned class names (`bg-bg-surface`, `text-text-secondary`) and broke
on a rename that changed no behaviour. What I did about it: variant tests use
`it.each` with _one_ distinguishing class per variant, which proves the variant is
wired up without pinning every token, and incidental styling (radius, spacing,
font weight) isn't asserted at all. One test also turned out to prove nothing: it
"checked" a class merge with a class the component already applied. Reading every
test against the question "what would make this fail?" is worth doing once.

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
  surprised. The token rename is a breaking change and is documented as one.
- **Tokens distributed as CSS.** `tokens.css` ships alongside the components so
  consumers import the semantic layer and can override it. The Tailwind v4 setup
  is a documented three-line import.
- **Dependency majors have to line up with Tailwind's.** `tailwind-merge` v2
  targets Tailwind v3; on Tailwind v4 it doesn't know the renamed utilities, so
  `cn()` can fail to dedupe conflicting classes. It's `v3` now, and a test pins
  that a consumer's `rounded-full` replaces the default radius instead of sitting
  next to it.
- **A guarded publish.** `prepublishOnly` runs the type-check, the build and the
  tests, so a type error can't ship.
- **An `llms.txt`** is served from the docs site (not the npm tarball) so an LLM
  can fetch a structured, per-component index of the library. A small nod to the
  reality that a lot of consumers are now AI assistants.

---

## What's not done

Being straight about the current state:

- **Dark mode is a first draft.** Every token has a dark value, and dark mode is a
  `dark` class on `<html>`, but I tuned those values by numbers and not by eye, and
  I haven't verified every component against them one by one. The showcase's
  built-in themes also need to be ported to the new tokens.
- **Missing components.** No Table/DataTable or Date Picker, the harder,
  higher-surface-area components.
- **Partial test coverage and thin docs** in places.
- **The API will still break between 0.x versions.**
- **Accessibility is a baseline, not a guarantee.** Automated audits look good
  (Lighthouse around 94 on the showcase), but automated tools catch a minority of
  WCAG issues. Full keyboard-and-screen-reader verification across every component
  is ongoing, and the `MultiSelect` trigger's `div`-vs-`button` issue (Decision 3)
  is exactly the kind of thing that needs a manual pass, not just a green score.
  Tab and arrow-key navigation, for one, isn't covered by an automated test yet.

---

## What I'd reconsider

- **The compound-vs-prop question is genuinely open.** The AI-generation and
  readability arguments against pure compound are strong enough that a hybrid
  (prop-heavy default plus a slot escape hatch) deserves serious evaluation rather
  than dismissal.
- **Nuxt first-class, and an optional router.** Most of my own work is in Nuxt.
  Making `vue-router` an optional peer, resolving the link component lazily, and
  shipping a small Nuxt module (auto-imports and the CSS import) would remove the
  biggest adoption friction.
- **Mobile-first, properly.** Most libraries (this one included) are web-first
  despite mobile carrying more traffic. The litmus tests are in the details: does
  a time input set `inputmode` for a numeric keyboard, are touch targets sized
  correctly, and that's a discipline to build in from the start, not bolt on. (The
  shared height scale is a start: nothing below 32px, and inputs stay at 16px on
  small screens so iOS doesn't zoom on focus.)
- **Accessibility out of the box, verified.** Claiming "accessible" is easy;
  proving AA (contrast, keyboard operability, visible focus) across every
  component without configuration is the bar worth holding the system to. The
  muted text and focus-ring colours in particular need a contrast pass.

The honest summary: the architecture (semantic tokens, compound composition,
context-driven accessibility) is sound, and the system does what it set out to do.
The work ahead is depth: deeper component APIs, verified accessibility, and
resolving the design-philosophy questions the project has surfaced.
