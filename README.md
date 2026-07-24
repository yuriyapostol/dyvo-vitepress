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

## Current integration model

The package is currently intended to be consumed in two stages:

1. locally through a `file:` dependency during development
2. later through a GitHub git dependency pinned to a specific tag or commit SHA

The package currently exports source files from `src/` on purpose. This keeps local iteration simple while the package API is still being stabilized.

## Public API

Primary exports:

- `theme`
- `createConfig`
- `defineThemeConfig`

Config-safe subpath exports:

- `@yuriyapostol/dyvo-vitepress/theme/config`
- `@yuriyapostol/dyvo-vitepress/shared/i18n`
- `@yuriyapostol/dyvo-vitepress/features/comments`
- `@yuriyapostol/dyvo-vitepress/features/news`

Use the TS-only subpath exports from VitePress config files when you need to avoid importing `.vue` files during Node-side config loading.

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

## Documentation

The documentation site lives in `docs/` and currently includes:

- English as the default locale
- Ukrainian under `/uk/`

The working specification is in:

- `docs/specification.md`
- `docs/uk/specification.md`
