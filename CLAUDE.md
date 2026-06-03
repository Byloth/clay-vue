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
- Distributed as a library (`dist/` + `types/`), but currently **`1.0.0-dev.*`**
  and a work in progress.
- Storybook is both the dev environment and the published documentation site
  (deployed to GitHub Pages on push to `master`).

See `TODO.md` for the concrete, planned implementations of the principles below.

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

5. **Use CSS cascade layers.** Wrap component styles in `@layer` so consumers can
   predictably override them. (Not yet adopted across the codebase — see
   `TODO.md`; apply it to new work and migrate existing components as we go.)

## Tech stack

- **Vue 3.5** — `<script setup lang="ts">`, Composition API only.
- **TypeScript** — strict, `verbatimModuleSyntax` (always `import type` for types).
- **Vite 7** — library build (`build.lib`), `vue` is external.
- **Storybook 9** (`@storybook/vue3-vite`) — dev server + autodocs + a11y addon.
- **SCSS** (Dart Sass) — modern module system (`@use` / `@forward`, not `@import`
  except the Google Fonts URL).
- **pnpm** (10.x) — the package manager. Never use npm/yarn here.
- **ESLint** via `@byloth/eslint-config-nuxt` + `eslint-plugin-storybook`.
- No test runner yet — **tests are planned for the future** (likely Vitest /
  Playwright; the `tsconfig/node.json` references are scaffold placeholders).

## Commands

```sh
pnpm dev          # Storybook dev server on :6006 (this is the dev workflow)
pnpm build        # build:core + build:storybook
pnpm build:core   # vite lib build (dist/) + vue-tsc declarations (types/)
pnpm build:types  # emit .d.ts only
pnpm lint         # eslint .
pnpm typecheck    # vue-tsc --noEmit
```

A **husky pre-commit hook** runs `pnpm lint` (with `NODE_ENV=production`) and
`pnpm typecheck`. Keep both green — CI (`storybook-deploy.yml`) runs them too and
blocks the Pages deploy on failure.

## Project structure

```
src/
  index.ts                    # public entry — exports the STABLE public API only
  types.ts                    # shared types (ColorScheme, Interval, Timeout)
  utils.ts                    # useTheme() composable (color scheme state)
  components/
    ClayButton.vue (+ .stories.ts)
    ClayCard.vue   (+ .stories.ts)
    inputs/
      ClayInput.vue    (+ .stories.ts)
      ClayTextarea.vue (+ .stories.ts)
  templates/                  # compositions/recipes (e.g. LoginForm) — demos
  assets/scss/
    _variables.scss           # SCSS source tokens (colors, easing, font)
    _mixins.scss              # clay-shadow-inset / clay-shadow-elevation
    _index.scss               # @forward variables as clay-* + main
    main.scss                 # :root CSS custom properties + body base styles
```

### Public API surface (`src/index.ts`)

`index.ts` is the **stable, intentionally-curated public API**. Right now it
exports **only `ClayButton`**. `ClayCard`, `ClayInput`, `ClayTextarea` and the
`templates/` are **drafts** — deliberately *not* exported until considered ready.
When a component is promoted to stable, add its export here. Don't bulk-export
the drafts.

### Known scaffold leftovers

`index.html` + its `/src/main.ts` reference (no `main.ts` exists) and the
vitest/cypress/playwright/nightwatch entries in `tsconfig/node.json` are remnants
of the original `create-vue` scaffold. Harmless; the real dev entry is Storybook.
Tests will eventually fill in the test-runner placeholders.

## Authoring a new component (checklist)

1. Create `src/components/<Area>/Clay<Name>.vue` with `<script setup lang="ts">`.
2. Add a co-located `Clay<Name>.stories.ts` (Storybook autodocs, see below).
3. Style it inline in the SFC's `<style lang="scss">` following the conventions
   below. Use `@use "@/assets/scss/mixins";` for the clay shadows. Wrap styles in
   a CSS `@layer`, keep `margin: 0`, and provide the dark-mode token block.
4. Verify it works with **JS disabled** and honors a11y preferences
   (focus-visible, `prefers-reduced-motion`, `prefers-contrast`/`forced-colors`).
5. Export from `src/index.ts` **only once it's considered stable** (see above).
6. `pnpm lint && pnpm typecheck` must pass.

## CSS / Claymorphism conventions (the heart of the project)

**Browser-support philosophy: bleeding-edge, no fallbacks.** Use the latest CSS
freely (relative color syntax, `oklch()`, `backdrop-filter`, blend modes, etc.).
Learning and expressing modern CSS is an explicit goal — do **not** add
`@supports` guards or legacy fallbacks unless asked.

### Naming

- BEM-ish class names: block `.clay-<component>`, modifier
  `.clay-<component>--<state>` (e.g. `.clay-button--small`, `.clay-button--active`).
- Modifiers are typically driven by a `classes` computed returning
  `Record<string, boolean>`.

### CSS custom properties (design tokens)

- Each component declares its own tokens in a `:root { ... }` block at the top of
  its `<style>`, namespaced `--clay-<component>-<role>` (e.g.
  `--clay-button-color-background`, `--clay-card-roundness`).
- Global tokens live in `main.scss` `:root`: `--black`, `--white`,
  `--clay-light-color`, `--clay-dark-color`, `--clay-primary-color`,
  `--clay-ease-duration`, `--clay-ease-function`, `--clay-text-color`,
  `--clay-color-background`.
- SCSS source tokens live in `_variables.scss` and are forwarded with a `clay-*`
  prefix via `_index.scss` (so consumers see `$clay-primary-color`, etc.).

### Deriving colors

Derive shades/tints from a base token with **relative color syntax** rather than
hardcoding, e.g.:

```scss
--clay-button-color-shadow: oklch(from var(--clay-button-color-background) calc(l - 0.25) c h);
--clay-button-color-outline: oklch(from var(--clay-button-color-background) l c calc(h + 180)); /* complementary */
background-image: linear-gradient(rgba(from var(--white) r g b / 0.25), rgba(from var(--black) r g b / 0.125));
```

### The clay "look" recipe

- **Layered box-shadows**: an outer elevation drop shadow + inner inset shadows
  for the puffy, pressed-clay depth. Use the mixins:
  - `clay-shadow-inset($color, $intensity)` — the soft inner depth.
  - `clay-shadow-elevation($color, $intensity)` — the lift off the surface.
- A **`::before` pseudo-element** absolutely positioned to fill the block, at
  `z-index: -1`, carrying inset shadows with `mix-blend-mode` (overlay /
  luminosity / multiply) for the material sheen.
- A **gradient overlay** (`linear-gradient(white→black)` + `background-blend-mode:
  overlay`) for the top-lit highlight.
- **Springy easing** everywhere: `--clay-ease-function` is
  `cubic-bezier(0.68, -0.55, 0.27, 1.55)` (intentional overshoot = bouncy), with
  `--clay-ease-duration` (333ms).
- **Squash & stretch** on interaction via `transform`, e.g. active state uses
  `translateY(...) scaleX(1.2) scaleY(0.9)` to feel physically pressed.
- **Everything sized in `em`** so components scale with `font-size`; size variants
  (`--small` / `--large`) just change `font-size`.

### JS ↔ CSS timing

When JS animation timing must match CSS, read it back from the computed style
instead of duplicating the constant — see `ClayButton.vue`, which parses
`--clay-ease-duration` in `onMounted` to size its press timer.

### Dark mode (dual mechanism)

1. `@media (prefers-color-scheme: dark)` blocks redefine tokens for system pref.
2. `useTheme()` (`src/utils.ts`) lets the app force a scheme by toggling
   `body[light]` / `body[dark]` attributes, which set `color-scheme`.

Every new component should provide a `@media (prefers-color-scheme: dark)` block
overriding its `:root` tokens, mirroring the existing components.

## Storybook conventions

- One `*.stories.ts` per component, co-located.
- `Meta`/`StoryObj` typed against a local `StoryArgs` interface.
- `tags: ["autodocs"]`; rich `argTypes` with `name`, `description`, `table`
  (`category: "Component's"`, `defaultValue`, `type`) and `control`.
- `title` mirrors the area: top-level components use the component name
  (`"ClayButton"`); templates use a path (`"Templates/LoginForm"`).
- Stories use `render` with a `template` string and pass `args` through.
- A global **Theme** toolbar (light/dark) is wired in `.storybook/preview.ts`.

## Code style

- **Allman braces** (opening brace on its own line) for functions/blocks.
- **4-space** indentation; **2-space** for `*.config.*` and `*.{json,yml}`
  (enforced by `.editorconfig`).
- Double quotes, semicolons, trailing newline, no trailing whitespace (except in
  `.md`/`.vue`/`.ts` per editorconfig's relaxed rule — but ESLint still flags
  trailing spaces outside comments).
- `import type` for all type-only imports (`verbatimModuleSyntax`).
- Template element refs named `$el`; module-private identifiers prefixed `_`.
- Path alias `@/` → `src/` (configured in Vite and `tsconfig/app.json`).
- Props via `defineProps` object syntax with explicit `type`/`default`;
  two-way binding via `defineModel`.

## Commit messages

Short, prefixed conventional-ish style as seen in history: `fix:`, `add:`,
`chore:`, `upd:`, `feat:`. Emoji occasionally used. Keep them concise.
