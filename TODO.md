# TODO

Planned work for `@byloth/clay-vue`. Principles behind these items are documented
in `CLAUDE.md` (see *Core design principles*). Check items off as they land.

## 🔴 Fix first — close before starting new work

Existing bugs that already violate the initial requirements. Clear these before
adding new components or features.

- [ ] **Inputs have no accessible label** — `ClayInput`/`ClayTextarea` require an
      `id` but no `<label for>` exists; `LoginForm` relies on `placeholder` only,
      which is not an accessible label. Provide proper label association.
      (Principle 2.)

## Accessibility

- [ ] **Adaptive text color** — `contrast-color()` was trialed on `ClayButton`
      and disabled: the results with the current palette were objectively off.
      For now the text color is a static token (`--clay-button-color-text`,
      defaults to `#FFFFFF`) the consumer can override. Open decision:
      (a) leave the burden to the consuming dev (override via custom property),
      or (b) implement a custom luminance-based calculation (weighted R/G/B
      coefficients, or a threshold on the OKLCH `L` channel via relative color
      syntax). Once settled, generalize to the other components. Keep readable
      contrast in both themes.
- [ ] **Reduced motion** — honor `@media (prefers-reduced-motion: reduce)`:
      disable/soften the springy transitions, transforms and squash-&-stretch
      across all components.
- [ ] **High contrast** — support `@media (prefers-contrast: more)` and
      `forced-colors` (Windows High Contrast): ensure borders/focus remain
      visible when system colors override the palette.
- [ ] Audit focus-visible affordances on every interactive component (the button
      already uses an animated complementary focus shadow — make it the pattern).
- [ ] Verify ARIA semantics / roles where components wrap non-semantic markup.
- [ ] Keep the Storybook a11y addon (`@storybook/addon-a11y`) green for each story.

## Progressive enhancement / SSR

- [ ] Audit every component to confirm it is fully functional and correct with
      **JavaScript disabled** (CSS-only baseline; JS strictly an enhancement).
- [ ] Validate SSR / pre-rendering: components render correctly server-side and
      animations/behaviors survive without a hydrated runtime.

## CSS architecture

- [ ] **Scaling on wide components** — proportional `scale` makes full-width
      elements (e.g. the `LoginForm` button) grow unnaturally on hover. An
      aspect-ratio normalization (`clay-scale()` + `--clay-*-ratio-*` tokens)
      was tried and rolled back. The factors are now exposed as
      `--clay-<component>-scaling-*` tokens so consumers can tune them per
      context; a general, automatic solution is still an open problem.
- [ ] **Composite tokens vs scoped overrides** — composites declared in `:root`
      (e.g. `--clay-button-spacing`) are substituted at `:root`, so overriding
      their `-x`/`-y` parts on a wrapper (scoped theming) or on a state never
      re-evaluates them. `scaling`/`translation` avoid this by being single
      whole-value tokens; decide whether `spacing` composites should follow
      suit, reference the parts directly, or be declared on the component
      element instead.
- [ ] **Composite components** (e.g. a Bootstrap-like *input group* composing
      inputs and buttons): restyle the inner components primarily via their
      `--clay-*` tokens set on the wrapper (custom properties inherit — no
      cascade fight needed). Only if structural contextual rules become
      necessary, introduce a `clay.composites` layer between `clay.components`
      and `clay.templates`. Composition depth — not component family — drives
      the layer order.

- [x] Introduce **CSS cascade layers** (`@layer`) and migrate existing components
      (`ClayButton`, `ClayCard`, `ClayInput`, `ClayTextarea`, `main.scss`) into a
      coherent layer order so consumers can override predictably — done with
      `clay.theme, clay.base, clay.components` (see *CSS cascade layers* in
      `CLAUDE.md`).
- [ ] Confirm all components keep `margin: 0` (no imposed outer margins).

## Framework-agnostic distribution

- [x] Add a **custom-elements build** so the library can be consumed as native
      web components without requiring Vue — done, and it IS the package root:
      `src/index.ts` registers `<clay-button>`/`<clay-card>` via
      `defineCustomElement(…, { shadowRoot: false })` (light DOM, same global
      stylesheet); ES + UMD + IIFE outputs, the latter wired to
      `unpkg`/`jsdelivr`.
- [ ] **Framework adapters** as subpath exports, when/if needed: `./react`,
      `./angular`, `./svelte`, … (the root stays framework-agnostic; `./vue`
      is the first adapter).
- [ ] Ensure components are authored to compile cleanly to custom elements
      (self-contained styles, no app-level provider dependencies).
- [ ] **Custom elements without JS** — the CE channel needs JavaScript to
      upgrade the tags, so Principle 1 doesn't hold there yet: investigate
      SSR / declarative shadow DOM or a documented no-JS fallback.

## Public API / components

- [ ] Promote the remaining drafts to the stable public API once ready:
      `ClayInput`, `ClayTextarea` (export from `src/vue.ts` **and** register
      in `src/index.ts`). `ClayCard` was promoted alongside `ClayButton`.
- [ ] Decide whether `templates/` (e.g. `LoginForm`) become public recipes or
      remain Storybook-only demos.
- [ ] **Theme forcing** — the old `useTheme()` composable (`src/utils.ts`) was
      removed with the Storybook 10 upgrade, so the `body[light]/[dark]` CSS
      hooks currently have no JS driver. Decide whether to ship a replacement
      composable (candidate: `useColorMode` from `@vueuse/core`, already a
      dependency — reactive system-pref tracking, `localStorage` persistence,
      SSR-safe) or leave setting the attributes to the consumer.

## Tooling / cleanup

- [x] Wire up the **test runner** — done for the current scope: `pnpm test`
      runs the packaging suite (`tests/packaging.test.ts` + `publint`) in plain
      Node, wired into CI before the Pages deploy.
- [ ] **Browser-based tests** — deferred until a browser-capable environment is
      available (dev happens in WSL without UI): stories-as-tests + a11y via
      `@storybook/addon-vitest` (Vitest browser mode + Playwright), a `play`
      function covering ClayButton's press-timer, and visual regression
      (`@chromatic-com/storybook` is already installed).
- [ ] Remove `create-vue` scaffold leftovers: `index.html` + its missing
      `/src/main.ts` reference, and the unused cypress/playwright/nightwatch
      entries in `tsconfig/node.json`.
- [ ] Fix the minor inconsistency in `ClayTextarea.vue`: its `--small`/`--large`
      modifiers are declared as top-level selectors instead of nested under
      `.clay-textarea` like the other components.
