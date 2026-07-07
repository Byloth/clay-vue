# CLAUDE.md

Guidance for working on **`@byloth/clay-vue`** — a personal, study-driven Vue 3
component library built around the **Claymorphism** UI style (chubby, soft, 3D,
tactile, playful). The point of this project is as much *learning modern CSS* as
shipping components: prefer expressive, cutting-edge CSS over conservative code.

> **Working language:** write code, comments, commit messages, and this kind of
> documentation in **English**. Conversation with the author happens in Italian.

## What this project is

- A reusable Vue 3 component collection styled with the Claymorphism aesthetic,
  meant to later power the author's personal website.
- Distributed as a library (`dist/` + `types/`), but currently **`0.1.0-dev.*`**
  and a work in progress.
- Storybook is both the dev environment and the published documentation site
  (deployed to GitHub Pages on push to `master`).

See `TODO.md` for the concrete, planned implementations of the principles below.

> **Keep the docs in sync.** `CLAUDE.md` and `TODO.md` must be updated as part
> of every relevant change — new/removed dependencies, structural moves, changed
> conventions, or a TODO item that lands or becomes obsolete. Updating these
> files is part of the work itself, never a separate chore to defer.

## Core design principles

These are non-negotiable and should guide every component. They are *why* the
code looks the way it does.

1. **Progressive enhancement — works without JavaScript.** Every component must
   be fully functional and visually complete with JS disabled. This matters for
   SSR / pre-rendered output: layout, CSS rules and animations must all keep
   working server-side without a hydrated runtime. JavaScript is only ever a
   *plus* that makes things "juicier" — never a requirement for core behavior.
   Reference: `ClayButton.vue` works entirely via CSS; JS only refines the press
   animation when the user clicks-and-releases before the transition finishes.
   When adding JS, ask: "does this still work and look right if this code never
   runs?" If not, rethink it.

2. **Accessibility leads.** Apply every relevant best practice and browser
   support hook by default. Keyboard focus must always be *visible* — note the
   button removes the native `outline` but replaces it with an animated
   focus-`box-shadow` in the complementary color, so focus is never lost.
   Respect user/system preferences: high contrast (`prefers-contrast`,
   `forced-colors`) and reduced motion (`prefers-reduced-motion`) must be
   honored. Ensure readable text contrast (e.g. switch text white↔black when the
   background gets too light). Outstanding a11y gaps live in `TODO.md`.

3. **Framework-agnostic output.** ClayVue must be publishable as native
   **custom elements** (via Vue's `defineCustomElement` / custom-element build)
   so end users are *not* forced to adopt Vue. Keep components authored in a way
   that compiles cleanly to web components (self-contained styles, no reliance on
   app-level providers, etc.).

4. **No default outer margins.** Components must not impose `margin` on
   themselves — keep it `margin: 0` (or the browser default). Spacing/layout is
   the *consumer's* responsibility. Stories may add margins for presentation, but
   the component itself never should.

5. **Use CSS cascade layers.** All library styles live in sub-layers of a single
   `clay` root layer, so unlayered consumer CSS always wins — overriding never
   needs `!important` or specificity fights. See *CSS cascade layers* under the
   CSS conventions for the exact rules.

## Tech stack

- **Vue 3.5** — `<script setup lang="ts">`, Composition API only. **Never a
  runtime/peer dependency** (author's choice): externalized in the Vue build
  (the consumer's app provides it), bundled into the custom-elements build.
- **TypeScript** — strict, `verbatimModuleSyntax` (always `import type` for types).
- **Vite 8** — library build (`build.lib`), `vue` is external.
- **Storybook 10** (`@storybook/vue3-vite`) — dev server + autodocs + a11y addon.
- **@vueuse/core** — Vue composition utilities (runtime dependency).
- **@fortawesome/fontawesome-free** — icons (devDependency): loaded only by
  Storybook via `assets/scss/vendors/`, rendered through the internal
  `FontAwesome.vue` component. Vendor CSS is never bundled into the library —
  consumers bring their own Font Awesome.
- **SCSS** (Dart Sass) — modern module system (`@use` / `@forward`, not `@import`
  except the Google Fonts URL).
- **pnpm** (10.x) — the package manager. Never use npm/yarn here.
- **ESLint** via `@byloth/eslint-config-nuxt` + `eslint-plugin-storybook`.
- **Vitest 4** — wired for **packaging tests only** (`tests/packaging.test.ts`
  + `publint`): `pnpm test` builds `dist/` and asserts the shipped artifacts in
  plain Node (referenced files exist, require/import work, CSS ships tokens and
  stable components only, no `process.env` leaks). Browser-based tests
  (stories-as-tests via `@storybook/addon-vitest`, visual regression) are
  deliberately deferred: no browser available in the dev environment — see
  `TODO.md`.

## Commands

```sh
pnpm dev          # Storybook dev server on :6006 (this is the dev workflow)
pnpm build        # build:core + build:storybook
pnpm build:core   # vite lib build ×2: custom-elements root + Vue adapter (dist/)
pnpm lint         # eslint .
pnpm test         # packaging tests: builds dist/, then Vitest in plain Node
pnpm typecheck    # vue-tsc --noEmit
```

A **husky pre-commit hook** runs `pnpm lint` (with `NODE_ENV=production`) and
`pnpm typecheck`. Keep both green — every CI pipeline runs them too, plus
`pnpm test`, and blocks deploys/publishes on failure.

## CI / CD (`.github/workflows/`)

- `template-build.yml` — reusable pipeline (`workflow_call`): install
  (`pnpm run ci`), lint (`NODE_ENV=production`), typecheck, packaging tests;
  the `artifact` input picks the outcome — `none` (full build as a check),
  `storybook` (docs artifact) or `package` (`pnpm pack`, extracted + uploaded).
- `push-checks.yml` — every push on non-`master` branches → template, no
  artifact.
- `docs-deploy.yml` — push on `master` → template (`storybook`) + GitHub Pages
  deploy.
- `release-npm.yml` / `release-gpr.yml` — GitHub **release published** →
  template (`package`) + `npm publish` (prerelease → dist-tag `next`).
  Publishing uses `--ignore-scripts`: the tarball ships a prebuilt `dist/`,
  and `prepack`/`prepare` would fail without devDependencies. npm.js auth is
  **OIDC trusted publishing** (no token — must be configured on npmjs.com);
  GPR authenticates with `GITHUB_TOKEN`.

## Project structure

```
src/
  index.ts                    # package root — custom elements (framework-agnostic)
  vue.ts                      # ./vue entry — the Vue components' STABLE public API
  types.ts                    # shared types (ColorScheme, Interval, Timeout)
  components/
    ClayButton.vue (+ .stories.ts)
    ClayCard.vue   (+ .stories.ts)
    core/
      FontAwesome.vue         # internal FA icon helper (no stories, not exported)
    inputs/
      ClayInput.vue    (+ .stories.ts)
      ClayTextarea.vue (+ .stories.ts)
  templates/                  # compositions/recipes (e.g. LoginForm) — demos
  assets/scss/
    _functions.scss           # clay-outline() helper function
    _layers.scss              # canonical @layer order — @use'd first everywhere
    _variables.scss           # SCSS source tokens (colors, easing, font)
    _mixins.scss              # clay-shadow-puff / clay-shadow-elevation
    _index.scss               # @forward variables as clay-* + main
    main.scss                 # :root CSS custom properties + body base styles
    vendors/                  # Font Awesome + Google Fonts — dev/Storybook-only
```

### Public API surface (`src/index.ts`)

The public API is **framework-agnostic first**: the package root
(`src/index.ts`) registers the **custom elements** (`<clay-button>`,
`<clay-card>`), while `src/vue.ts` (the `./vue` subpath) exports the Vue
components. Future framework adapters will follow the same pattern (`./react`,
`./angular`, …). Both entries import `main.scss`, so the global tokens ship
with the library CSS. `ClayInput`, `ClayTextarea` and the `templates/` are
**drafts** — deliberately *not* exported until considered ready. When a
component is promoted to stable, export it from `src/vue.ts` **and** register
its custom element in `src/index.ts`. Don't bulk-export the drafts.

### Known scaffold leftovers

`index.html` + its `/src/main.ts` reference (no `main.ts` exists) and the
vitest/cypress/playwright/nightwatch entries in `tsconfig/node.json` are remnants
of the original `create-vue` scaffold. Harmless; the real dev entry is Storybook.
Tests will eventually fill in the test-runner placeholders.

## Packaging & distribution

- **Paradigm: framework-agnostic first.** The package root (`.`) is the
  custom-elements build — ready to use from plain JS/HTML or any framework;
  `./vue` is the Vue adapter. Future adapters follow the same subpath pattern
  (`./react`, `./angular`, `./svelte`, …).
- npm package `@byloth/clay-vue`; `files: ["dist", "src"]` — shipping `src`
  serves two purposes: **types come from the TS sources** (`"types":
  "src/index.ts"` + `types` conditions in `exports`; no `.d.ts` emission, no
  `types/` folder) and the SCSS API ships for free (`./scss` export with the
  `sass` condition, usable via Sass's `pkg:` importer). Stories are excluded
  by `src/.npmignore` — it must live *in the subdirectory*: with a `files`
  field, npm ignores a root-level `.npmignore` but honors nested ones.
- Because consumers type-check the shipped sources: **script-level imports in
  library code (components, `index.ts`, `elements.ts`) must be relative — the
  `@/` alias doesn't exist in consumer projects.** (`@/` stays fine in stories,
  `.storybook/` and SFC `<style>` `@use`, which only our build compiles.)
  Style side-effect imports resolve through `src/shims.d.ts`, pulled into the
  consumer's program by a triple-slash reference in both entries.
- **Dual build** (`pnpm build:core`):
  1. `vite.config.ts` — package root (`src/index.ts`), custom elements:
     ES (`clay-vue.js`) + UMD (`clay-vue.umd.cjs` — **must** be `.cjs`: the
     package is `type: module`, so Node would parse a `.js` UMD as ESM and
     never hit the wrapper) + IIFE (`clay-vue.global.js`, wired to
     `unpkg`/`jsdelivr`). Everything bundled (Rollup tree-shakes `@vueuse` down
     to what's used) and `process.env.NODE_ENV` inlined via `define` — a
     self-contained artifact must never leak `process` into browsers.
  2. `vite.vue.config.ts` — Vue adapter (`src/vue.ts`): ES + CJS, `vue` and
     `@vueuse/*` external (`@vueuse/core` is the only runtime dependency).
     Storybook's builder points at THIS config (`viteConfigPath` in
     `.storybook/main.ts`): the root one would leak its inlined
     `NODE_ENV=production` into the dev server.
- `src/index.ts` registers `<clay-button>` / `<clay-card>` via
  `defineCustomElement(…, { shadowRoot: false })`: **light DOM**, so the single
  global stylesheet (layers, `:root` tokens, BEM classes) works unchanged.
  Caveat: the CE channel requires JavaScript to upgrade the tags (see `TODO.md`).
- Both entries import the same style graph → a single `dist/clay-vue.css`
  (theme + base + exported components only; **no drafts, no vendors, no remote
  fonts** — Baloo 2 is consumer-provided).
- No `publishConfig`: the scoped-package access is handled by the release
  workflows (`npm publish --access public`); `prepack` runs `build:core`.

## Authoring a new component (checklist)

1. Create `src/components/<Area>/Clay<Name>.vue` with `<script setup lang="ts">`.
2. Add a co-located `Clay<Name>.stories.ts` (Storybook autodocs, see below).
3. Style it inline in the SFC's `<style lang="scss">` following the conventions
   below. Start with `@use "@/assets/scss/layers";`, put tokens in
   `@layer clay.theme` and rules in `@layer clay.components` (see *CSS cascade
   layers*). Use `@use "@/assets/scss/mixins";` for the clay shadows, keep
   `margin: 0`, and provide the dark-mode token block.
4. Verify it works with **JS disabled** and honors a11y preferences
   (focus-visible, `prefers-reduced-motion`, `prefers-contrast`/`forced-colors`).
5. Export from `src/index.ts` **only once it's considered stable** (see above).
6. `pnpm lint && pnpm typecheck` must pass.

## CSS / Claymorphism conventions (the heart of the project)

**Browser-support philosophy: bleeding-edge, no fallbacks.** Use the latest CSS
freely (relative color syntax, `oklch()`, `backdrop-filter`, blend modes, etc.).
Learning and expressing modern CSS is an explicit goal — do **not** add
`@supports` guards or legacy fallbacks unless asked.

### CSS cascade layers

All library CSS lives in sub-layers of a single `clay` root layer, in this
fixed order (lowest to highest priority):

```scss
@layer clay.theme, clay.base, clay.components, clay.templates;
```

- `clay.theme` — every `:root { --clay-* }` design-token block (global and
  per-component), *including* their `prefers-color-scheme: dark` overrides.
- `clay.base` — the base styles from `main.scss` (`body`, the
  `[light]`/`[dark]` hooks).
- `clay.components` — every `.clay-*` rule: states, modifiers and their
  dark-mode blocks.
- `clay.templates` — styles of `templates/` compositions; sits above
  `clay.components` because a composition may contextually restyle the
  components it composes.

Layer tiers encode **composition depth** (who composes may restyle what it
composes), never component families: sibling components (buttons vs inputs)
never target the same elements, so ordering them would be meaningless — they
all live together in `clay.components`.

Rules:

1. The canonical order statement lives in `src/assets/scss/_layers.scss`, and
   **every stylesheet that emits CSS must `@use` it first**
   (`@use "@/assets/scss/layers";` in SFCs, a relative path in SCSS partials).
   Each SFC `<style>` block is its own Sass compilation unit and
   `dist/clay-vue.css` contains SFC styles only, so the statement must be
   emitted everywhere; repeating it is harmless (only the first occurrence
   fixes the order), and it will keep each component self-contained inside its
   own shadow root once the custom-elements build lands.
2. `@layer` blocks are outermost; dark-mode media queries go *inside* the layer
   of whatever they override (token overrides in `clay.theme`, component
   tweaks in `clay.components`).
3. Vendor CSS (Font Awesome) is **never bundled nor layered by the library**:
   it's a dev-only external dependency — `assets/scss/vendors/` is imported by
   `.storybook/preview.ts`, not by `_index.scss`. Consumers load their own copy
   and may place it in a layer of their choice.

Consumer story: unlayered consumer CSS always beats everything in `clay.*` — a
plain `.clay-button { background: … }` or a `--clay-*` token override wins with
no `!important`. Consumers using their own layers control where the whole
library sits with a single name (`@layer reset, clay, app;`), or by importing
the CSS into a layer (`@import url("clay-vue.css") layer(clay);`).

### Naming

- BEM-ish class names: block `.clay-<component>`, modifier
  `.clay-<component>--<state>` (e.g. `.clay-button--small`, `.clay-button--active`).
- Modifiers are typically driven by a `classes` computed returning
  `Record<string, boolean>`.

### CSS custom properties (design tokens)

- **Naming grammar** (binding):
  `--clay-[component?]-[category]-[role?]-[variant?]`, **category first** —
  e.g. `--clay-color-primary`, `--clay-button-color-background`,
  `--clay-button-spacing-x`, `--clay-button-color-background-glow`. Two tiers:
  global semantic tokens (`--clay-color-*`, `--clay-ease-*`) and component
  tokens (`--clay-<component>-*`). Everything the library emits is namespaced
  `--clay-*`; keep each segment to a single word where possible.
- There are **no black/white primitives**: use literal hex values instead, and
  write hex colors **uppercase** (`#000000`, `#FFFFFF`) — project standard.
- Each component declares its own tokens in a `:root { ... }` block (inside
  `@layer clay.theme`) at the top of its `<style>` (e.g.
  `--clay-button-color-background`, `--clay-card-roundness`).
- Global tokens live in `main.scss` `:root`: `--clay-color-light`,
  `--clay-color-dark`, `--clay-color-primary`, `--clay-color-text`,
  `--clay-color-background`, `--clay-ease-duration`, `--clay-ease-function`.
- SCSS source tokens live in `_variables.scss` (same category-first order:
  `$color-primary`, `$ease-duration`) and are forwarded with a `clay-*` prefix
  via `_index.scss` (so consumers see `$clay-color-primary`, etc.).

### Deriving colors

Derive shades/tints from a base token with **relative color syntax** rather than
hardcoding, e.g.:

```scss
--clay-button-color-shadow: oklch(from var(--clay-button-color-background) calc(l - 0.25) c h);
--clay-button-color-outline: oklch(from var(--clay-button-color-background) l c calc(h + 180)); /* complementary */
background-image: linear-gradient(rgba(from #FFFFFF r g b / 0.25), rgba(from #000000 r g b / 0.125));
```

`ClayButton`'s text color is the `--clay-button-color-text` token (defaults to
`#FFFFFF`), so consumers can configure it. An automatic contrast-based
color (`contrast-color()`) was trialed and **disabled for now** — the results
with the current palette were not satisfying; adaptive text color remains an
open decision (see `TODO.md`).

### The clay "look" recipe

- **Layered box-shadows**: an outer elevation drop shadow + inner inset shadows
  for the puffy, pressed-clay depth. Use the mixins:
  - `clay-shadow-puff($color, $intensity)` — the soft inner depth.
  - `clay-shadow-elevation($color, $intensity, $outline)` — the lift off the
    surface; the optional `$outline` prepends an outline ring to the shadow list.
  - `clay-outline($color, $opacity, $width)` (in `_functions.scss`) — builds the
    `box-shadow`-based outline ring value to pass as `$outline` above.
- A **`::before` pseudo-element** absolutely positioned to fill the block, at
  `z-index: -1`, carrying inset shadows with `mix-blend-mode` (overlay /
  luminosity / multiply) for the material sheen.
- A **gradient overlay** (`linear-gradient(white→black)` + `background-blend-mode:
  overlay`) for the top-lit highlight.
- **Springy easing** everywhere: `--clay-ease-function` is
  `cubic-bezier(0.68, -0.55, 0.27, 1.55)` (intentional overshoot = bouncy), with
  `--clay-ease-duration` (333ms).
- **Squash & stretch** on interaction via the standalone `scale` / `translate`
  properties (not the composite `transform`; transitions list them
  individually). The values are never hardcoded in the rules: they're the
  whole-value `--clay-<component>-scaling` and `--clay-<component>-translation`
  tokens (`scaling` holds anything `scale` accepts: `1.1`, `1.2 0.9`, …), and
  states retune them by *redefining the same tokens* — the same idiom the
  dark-mode glow uses. Whole-value tokens are safe to redefine per-state;
  never build them by composing *other* tokens in `:root` (a composite is
  substituted at `:root`, so element-level redefinitions of its parts would
  never re-evaluate it).
- **Everything sized in `em`** so components scale with `font-size`; size variants
  (`--small` / `--large`) just change `font-size`.

### JS ↔ CSS timing

When JS animation timing must match CSS, read it back from the computed style
instead of duplicating the constant — see `ClayButton.vue`, which parses
`--clay-ease-duration` in `onMounted` to size its press timer.

### Dark mode

1. `@media (prefers-color-scheme: dark)` blocks redefine tokens for system pref.
2. `body[light]` / `body[dark]` attribute selectors in `main.scss` set
   `color-scheme`, giving consumers a CSS hook to force a scheme. There is
   currently **no JS driver** for these — the old `useTheme()` composable
   (`src/utils.ts`) was removed with the Storybook 10 upgrade. Whether to ship
   a replacement (e.g. `useColorMode` from `@vueuse/core`) is an open decision,
   tracked in `TODO.md`.

In development, theme switching is handled by Storybook's Theme toolbar, which
sets `colorScheme` directly on `html` and the preview wrapper
(`.storybook/preview.ts`).

Every new component should provide a `@media (prefers-color-scheme: dark)` block
overriding its `:root` tokens, mirroring the existing components.

## Storybook conventions

- One `*.stories.ts` per component, co-located.
- `Meta`/`StoryObj` typed against a local `StoryArgs` interface.
- `tags: ["autodocs"]` — set globally in `.storybook/preview.ts` and still
  declared per-story; rich `argTypes` with `name`, `description`, `table`
  (`category: "Component's"`, `defaultValue`, `type`) and `control`.
- `title` mirrors the area: top-level components use the component name
  (`"ClayButton"`); templates use a path (`"Templates/LoginForm"`).
- Stories use `render` with a `template` string and pass `args` through.
- **Events are wired explicitly**: Storybook ≥9 has no implicit `on*` spies, so
  an event only reaches the Actions panel if the story binds it in the template
  (`@click="args.onClick"`, `@update:model-value="args.onUpdate"`) to a `fn()`
  spy from `storybook/test` declared in `args`. Event args follow the
  `on<Event>` naming convention, sit after the props (separated by a blank
  line) and are documented under the `Events` argTypes category with
  `control: false`.
- A global **Theme** toolbar (light/dark) is wired in `.storybook/preview.ts`;
  it switches schemes by setting `colorScheme` on `html` and the preview wrapper.

## Code style

- **Allman braces** (opening brace on its own line) for functions/blocks.
- **4-space** indentation; **2-space** for `*.config.*` and `*.{json,yml}`
  (enforced by `.editorconfig`).
- Double quotes, semicolons, trailing newline, no trailing whitespace (except in
  `.md`/`.vue`/`.ts` per editorconfig's relaxed rule — but ESLint still flags
  trailing spaces outside comments).
- `import type` for all type-only imports (`verbatimModuleSyntax`).
- Template element refs named `$el`; module-private identifiers prefixed `_`.
- Path alias `@/` → `src/` (configured in Vite and `tsconfig/app.json`) —
  **dev-only code**: never in script imports of shipped library sources (see
  *Packaging & distribution*).
- Props via `defineProps` object syntax with explicit `type`/`default`;
  two-way binding via `defineModel`.

## Commit messages

Short, prefixed conventional-ish style as seen in history: `fix:`, `add:`,
`chore:`, `upd:`, `feat:`. Emoji occasionally used. Keep them concise.
