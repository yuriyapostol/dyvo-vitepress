# Badges

The theme provides two custom badge components:

- `DyvoBadge` for generic labeled badges with variants, sizes, optional image slot, and optional link behavior.
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
- colors via `color`: `info`, `tip`, `warning`, `danger`, `success`;
- variants: `soft`, `accent`, `solid`, `outline`, `plain`;
- sizes: `small`, `medium`, `large`;
- optional image via the `image` slot and `imageSrc` / `imageAlt`;
- optional link via `href`;
- interactive state via `clickable`;
- disabled state via `disabled`.

Example:

<div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center; margin: 16px 0;">
  <DyvoBadge text="Stable" color="success" variant="soft" />
  <DyvoBadge text="Experimental" color="warning" variant="outline" />
  <DyvoBadge text="GitHub" color="info" variant="accent" href="https://github.com/yuriyapostol/dyvo-vitepress" />
  <DyvoBadge text="With image" image-src="https://github.com/yuriyapostol.png?size=80" image-alt="Project logo" />
  <DyvoBadge text="Custom slot" image-alt="Project logo">
    <template #image>
      <img src="https://github.com/yuriyapostol.png?size=80" alt="Project logo" />
    </template>
  </DyvoBadge>
</div>

```md
<DyvoBadge text="Stable" color="success" variant="soft" />
<DyvoBadge text="Experimental" color="warning" variant="outline" />
<DyvoBadge text="GitHub" color="info" variant="accent" href="https://github.com/yuriyapostol/dyvo-vitepress" />
<DyvoBadge text="With image" image-src="https://github.com/yuriyapostol.png?size=80" image-alt="Project logo" />
<DyvoBadge text="Custom slot" image-alt="Project logo">
  <template #image>
    <img src="https://github.com/yuriyapostol.png?size=80" alt="Project logo" />
  </template>
</DyvoBadge>
```

You can also pass the label through the default slot:

<div style="margin: 16px 0;">
  <DyvoBadge color="tip" variant="solid">Featured</DyvoBadge>
</div>

```md
<DyvoBadge color="tip" variant="solid">Featured</DyvoBadge>
```

For backward compatibility, string URLs passed through `image` still work, but `imageSrc` is now the explicit prop for image URLs.

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
    avatar-src="https://github.com/yuriyapostol.png?size=80"
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
  avatar-src="https://github.com/yuriyapostol.png?size=80"
  href="https://example.com/team/yuriy"
  color="tip"
  variant="accent"
/>
```

## Comparison With VitePress `Badge`

`DyvoBadge` was designed to stay compatible with the default VitePress `Badge` use cases while extending them with richer styling, links, sizing, and optional images.

That means you do not need to mix `Badge` and `DyvoBadge` across the same docs set unless you explicitly want two different visual systems.

If you prefer a single badge component everywhere, use `DyvoBadge` for inline markers too:

<div style="margin: 16px 0;">
  API Reference <DyvoBadge color="tip" variant="soft" size="small" text="stable" />
</div>

```md
API Reference <DyvoBadge color="tip" variant="soft" size="small" text="stable" />
```

Use `DyvoBadge` when you want:

- one consistent badge style across the site;
- compatibility with simple inline badge usage;
- larger visual variants when needed;
- clickable badge behavior;
- image support;
- more explicit sizing;
- a pill-like component that can stand alone in content blocks.

If your markdown already uses VitePress `Badge`, the recommended migration path is to register an optional compatibility wrapper instead of extending `DyvoBadge` with legacy props.

The package exports a `Badge` wrapper component for that purpose, but it is not registered by default. You can connect it manually in your theme:

```ts
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { Badge, theme as dyvoTheme } from '@yuriyapostol/dyvo-vitepress'

const theme: Theme = {
  extends: dyvoTheme,
  enhanceApp(ctx) {
    dyvoTheme.enhanceApp?.(ctx)
    ctx.app.component('Badge', Badge)
  }
}

export default theme
```

That wrapper keeps the VitePress-style `type` API and forwards it to `DyvoBadge` via `color`, which lets existing markdown keep using:

```md
API Reference <Badge type="tip" text="stable" />
```

Use `DyvoUserBadge` when you need:

- avatar rendering;
- GitHub profile shortcut behavior;
- author or contributor presentation.

In short:

- `DyvoBadge` can cover both the simple inline badge role and the more advanced theme-level badge role.
- `DyvoUserBadge` is a specialized author badge built on top of `DyvoBadge`.
