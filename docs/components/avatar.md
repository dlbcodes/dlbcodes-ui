# Avatar

A compact visual representation of a user. An avatar shows the person's image
when available, gracefully falling back to their initial, then to a neutral
`?` placeholder — so it always renders something sensible even with missing data.

Use avatars wherever you need to identify a person at a glance: comment threads,
member lists, navigation bars, profile headers, and assignee indicators.

## Usage

The only thing an avatar needs is a `name` (used for the initial fallback and as
the image's alt text). Pass a `src` to show a photo.

<preview path="../demos/avatar/avatar-basic.vue" title="Basic" description="An avatar with an image and a name."></preview>

## Fallbacks

When no `src` is provided — or the image fails to load — the avatar shows the
first character of `name`. This means you can render avatars for users who
haven't uploaded a photo, or whose photo URL is broken, without any extra
handling. If the `src` changes later, the avatar tries the new image again.

With no `name` either, it shows a `?`.

<preview path="../demos/avatar/avatar-fallback.vue" title="Initial fallback" description="No image: the first letter of the name is shown."></preview>

## Sizes

Fourteen sizes are available via the `size` prop, from `xs` to `10xl`. `base`
is the default.

| Size          | Dimensions                                                |
| ------------- | --------------------------------------------------------- |
| `xs`          | 24px                                                      |
| `sm`          | 32px                                                      |
| `base`        | 40px                                                      |
| `lg`          | 48px                                                      |
| `xl`          | 56px                                                      |
| `2xl`         | 64px                                                      |
| `3xl` – `9xl` | 72px – 120px, in 8px steps                                |
| `10xl`        | 120px, growing to 160px on wide screens (`xl` breakpoint) |

The heights of `sm`, `base`, `lg` and `xl` match the button and input sizes of
the same name, so an avatar lines up next to them. From `3xl` up, the image sits
inside a padded frame.

<preview path="../demos/avatar/avatar-sizes.vue" title="Sizes" description="xs through xl."></preview>

## Corner radius

The avatar's corners come from the theme's `--radius` token, so it follows your
radius setting like every other component. The image's own corners are kept
concentric with the frame at any radius.

## Customizing

Every avatar accepts a `class` prop that merges onto the root element, so you can
add a ring or adjust spacing without touching the component. This is the primary
extension point — reach for it before wrapping the component.

To change the **shape**, override the frame _and_ its inner element, or the image
keeps the theme's corners inside your new frame:

<code-block lang="vue">

```vue
<!-- a circle -->
<Avatar name="Ana Silva" class="rounded-full *:rounded-full" />

<!-- a square -->
<Avatar name="Ana Silva" class="rounded-none *:rounded-none" />
```

</code-block>

<preview path="../demos/avatar/avatar-custom.vue" title="Custom shape and ring" description="A circular avatar, and one with a brand-colored ring."></preview>

## Avatar group

Avatars compose into an overlapping stack with a little negative margin and a
ring to separate them — handy for showing a set of collaborators. The last item
can be an initials-only avatar acting as an overflow count.

<preview path="../demos/avatar/avatar-group.vue" title="Group" description="An overlapping stack with an overflow count."></preview>

## Props

| Prop    | Type                                                       | Default  | Description                                                                                                                              |
| ------- | ---------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `name`  | `string \| null`                                           | `null`   | The person's name. Its first character is the fallback when there's no image, and it's used as the image's `alt` text for accessibility. |
| `src`   | `string \| null`                                           | `null`   | Image URL. When present (and it loads), the photo is shown; otherwise the avatar falls back to the initial.                              |
| `size`  | `"xs" \| "sm" \| "base" \| "lg" \| "xl" \| "2xl" … "10xl"` | `"base"` | The avatar's size. See the table above.                                                                                                  |
| `class` | `string`                                                   | —        | Classes merged onto the root element. Use this to add a ring, adjust layout, or change shape (see above).                                |

## Accessibility

- With an image, the `alt` text is set from `name`, so screen readers announce
  who the avatar represents. With no `name`, the alt is empty and the image is
  skipped, since there's nothing meaningful to announce.
- The initial fallback is exposed as an image labelled with `name`, so a screen
  reader says the person's name instead of a lone letter. With no `name`, the
  `?` placeholder is hidden from assistive technology.
- Keep `name` meaningful (the full name) rather than passing initials directly.
