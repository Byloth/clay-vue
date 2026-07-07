# Clay Vue 🪔

Fluffy, friendly &amp; 3D: reusable Vue components based on the Claymorphism UI design style.

> ⚠️ **Work in progress** — currently `0.1.0-dev.*`.
> The stable public API only includes `ClayButton` and `ClayCard`, for now.

## Installation

```sh
pnpm add @byloth/clay-vue
```

## Usage

### Framework-agnostic (custom elements)

The package root ships **native custom elements** — Vue's runtime is compiled
in, so they're ready to use in plain HTML/JS or from any framework:

```html
<link rel="stylesheet" href="https://unpkg.com/@byloth/clay-vue/dist/clay-vue.css" />
<script src="https://unpkg.com/@byloth/clay-vue"></script>

<clay-card>
    <clay-button>Click me!</clay-button>
</clay-card>
```

Or, from a bundler:

```ts
import "@byloth/clay-vue";
import "@byloth/clay-vue/style.css";
```

The elements render in **light DOM**, so the stylesheet and all the
`--clay-*` design tokens work exactly as with the Vue components.

### With Vue

In a Vue app, import the components directly from the `/vue` entry —
here `vue` stays external: your app provides it (any Vue 3.5+ will do).

```ts
import { ClayButton, ClayCard } from "@byloth/clay-vue/vue";

import "@byloth/clay-vue/style.css";
```

```vue
<template>
    <ClayCard>
        <ClayButton>Click me!</ClayButton>
    </ClayCard>
</template>
```

> When other frameworks get first-class adapters, they'll follow the same
> pattern: `@byloth/clay-vue/react`, `/angular`, `/svelte`, …

### Theming

Every visual aspect is driven by `--clay-*` CSS custom properties, and all the
library's styles live in sub-layers of a single `clay` cascade layer: any
unlayered CSS of yours always wins — no `!important` needed.

```css
:root
{
    --clay-color-primary: hotpink;
    --clay-button-roundness: 0.5em;
}
```

SCSS sources are shipped too, if you prefer the `$clay-*` variables:

```scss
@use "pkg:@byloth/clay-vue/scss" as clay;
```

### Fonts

The Claymorphism look is designed around [Baloo 2](https://fonts.google.com/specimen/Baloo+2),
but the library **doesn't load any remote font** by itself: add it to your app
if you want the full look (the font stack gracefully falls back otherwise).

```html
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400..800&display=swap" rel="stylesheet" />
```

## Development

```sh
pnpm install    # install dependencies
pnpm dev        # Storybook dev server on :6006
pnpm build      # library + Storybook build
pnpm lint       # ESLint
pnpm typecheck  # vue-tsc
```
