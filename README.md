# dyvo-vitepress

Reusable VitePress theme, features, and utilities.

## Scope

This repository hosts both:

- the reusable package source under `src/`
- the package documentation site under `docs/`

The current package includes:

- theme core
- shared i18n helpers
- opt-in `comments` feature
- opt-in `news` feature

## Integration model

The package can be consumed in two ways:

1. locally through a `file:` dependency during development
2. through a GitHub git dependency pinned to a specific tag or commit SHA for shared use

The package still exports theme and feature source files from `src/` on purpose so local iteration stays simple. Config-safe runtime helpers are built into `dist/`.

## Public API

Primary exports:

- `theme`
- `createConfig`
- `defineThemeConfig`

Config-safe subpath exports:

- `@yuriyapostol/dyvo-vitepress/config`
- `@yuriyapostol/dyvo-vitepress/theme/config`
- `@yuriyapostol/dyvo-vitepress/shared/i18n`
- `@yuriyapostol/dyvo-vitepress/features/comments`
- `@yuriyapostol/dyvo-vitepress/features/news`

Use the config-safe subpath exports from VitePress config files when you need to avoid importing `.vue` files during Node-side config loading.

## Compatibility

The package currently targets the same VitePress minor line as the consuming site:

- `vitepress@^1.6.4`

Broader compatibility should not be assumed until it is explicitly documented.

## Local development

Install dependencies:

```bash
npm install
```

Run the package documentation site:

```bash
npm run docs:dev
```

Build the package documentation site:

```bash
npm run docs:build
```

Build package runtime artifacts for config-safe helpers:

```bash
npm run build
```

## Release flow

For a git-tagged release:

1. update package code
2. run `npm run build`
3. commit the generated `dist/` changes
4. bump `package.json.version`
5. create and push a matching tag such as `v0.1.2`

Consuming sites should then update the dependency reference to that exact tag and refresh their lockfile.

## Documentation

The documentation site lives in `docs/` and currently includes:

- English as the default locale
- Ukrainian under `/uk/`

The working specification is in:

- `docs/specification.md`
- `docs/uk/specification.md`
