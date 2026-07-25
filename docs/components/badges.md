# Badges

The theme provides two custom badge components:

- `DyvoBadge` for generic labeled badges with variants, sizes, optional image, and optional link behavior.
- `DyvoUserBadge` for person or contributor badges with a name, avatar, and optional GitHub profile integration.

Because the theme extends the VitePress default theme, the original VitePress `Badge` remains available too.

## Availability

`DyvoBadge` and `DyvoUserBadge` are registered globally by the theme, so they can be used directly in markdown and Vue-powered docs pages:

```md
<DyvoBadge text="Stable" />
<DyvoUserBadge name="Yuriy Apostol" github="yuriyapostol" />
```

## `DyvoBadge`

`DyvoBadge` supports:

- text via `text` prop or default slot;
- colors: `info`, `tip`, `warning`, `danger`, `success`;
- variants: `soft`, `accent`, `solid`, `outline`, `plain`;
- sizes: `small`, `medium`, `large`;
- optional image via `image` and `imageAlt`;
- optional link via `href`;
- interactive state via `clickable`;
- disabled state via `disabled`.

Example:

<div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center; margin: 16px 0;">
  <DyvoBadge text="Stable" color="success" variant="soft" />
  <DyvoBadge text="Experimental" color="warning" variant="outline" />
  <DyvoBadge text="GitHub" color="info" variant="accent" href="https://github.com/yuriyapostol/dyvo-vitepress" />
  <DyvoBadge text="With icon" image="/logo.svg" image-alt="Project logo" />
</div>

```md
<DyvoBadge text="Stable" color="success" variant="soft" />
<DyvoBadge text="Experimental" color="warning" variant="outline" />
<DyvoBadge text="GitHub" color="info" variant="accent" href="https://github.com/yuriyapostol/dyvo-vitepress" />
<DyvoBadge text="With icon" image="/logo.svg" image-alt="Project logo" />
```

You can also pass the label through the default slot:

<div style="margin: 16px 0;">
  <DyvoBadge color="tip" variant="solid">Featured</DyvoBadge>
</div>

```md
<DyvoBadge color="tip" variant="solid">Featured</DyvoBadge>
```

## `DyvoUserBadge`

`DyvoUserBadge` wraps `DyvoBadge` and adds user-oriented defaults.

It supports:

- required `name`;
- optional `github` handle;
- optional `href` override;
- optional `avatarSrc` and `avatarAlt`;
- optional `text` override;
- the same `color`, `variant`, `size`, `clickable`, and `disabled` props as `DyvoBadge`.

If `github` is provided:

- the profile link defaults to `https://github.com/<handle>`;
- the avatar defaults to `https://github.com/<handle>.png?size=80`.

Examples:

<div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center; margin: 16px 0;">
  <DyvoUserBadge name="Yuriy Apostol" github="yuriyapostol" />
  <DyvoUserBadge
    name="Project maintainer"
    text="Maintainer"
    avatar-src="/logo.svg"
    href="https://example.com/team/yuriy"
    color="tip"
    variant="accent"
  />
</div>

```md
<DyvoUserBadge name="Yuriy Apostol" github="yuriyapostol" />
<DyvoUserBadge
  name="Project maintainer"
  text="Maintainer"
  avatar-src="/logo.svg"
  href="https://example.com/team/yuriy"
  color="tip"
  variant="accent"
/>
```

## Comparison With VitePress `Badge`

Use VitePress `Badge` when you only need a small status marker inside prose, for example:

<div style="margin: 16px 0;">
  API Reference <Badge type="tip" text="stable" />
</div>

```md
API Reference <Badge type="tip" text="stable" />
```

Use `DyvoBadge` when you need:

- larger visual variants;
- clickable badge behavior;
- image support;
- more explicit sizing;
- a pill-like component that can stand alone in content blocks.

Use `DyvoUserBadge` when you need:

- avatar rendering;
- GitHub profile shortcut behavior;
- author or contributor presentation.

In short:

- VitePress `Badge` is the simpler inline primitive.
- `DyvoBadge` is the more flexible theme-level badge.
- `DyvoUserBadge` is a specialized author badge built on top of `DyvoBadge`.
