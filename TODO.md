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

- [ ] **Adaptive text color** — `ClayButton` already switches its text via CSS
      `contrast-color()`, but the results with the current palette are
      objectively off. Open decision: (a) leave the burden to the consuming dev
      (override via custom property), or (b) implement a custom luminance-based
      calculation (weighted R/G/B coefficients, or a threshold on the OKLCH `L`
      channel via relative color syntax). Once settled, generalize to the other
      components. Keep readable contrast in both themes.
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

- [ ] Introduce **CSS cascade layers** (`@layer`) and migrate existing components
      (`ClayButton`, `ClayCard`, `ClayInput`, `ClayTextarea`, `main.scss`) into a
      coherent layer order so consumers can override predictably.
- [ ] Confirm all components keep `margin: 0` (no imposed outer margins).

## Framework-agnostic distribution

- [ ] Add a **custom-elements build** so the library can be consumed as native
      web components without requiring Vue (Vue's `defineCustomElement` /
      custom-element entry). Decide on build outputs and packaging.
- [ ] Ensure components are authored to compile cleanly to custom elements
      (self-contained styles, no app-level provider dependencies).

## Public API / components

- [ ] Promote drafts to the stable public API and export them from
      `src/index.ts` once ready: `ClayCard`, `ClayInput`, `ClayTextarea`.
- [ ] Decide whether `templates/` (e.g. `LoginForm`) become public recipes or
      remain Storybook-only demos.
- [ ] **Theme forcing** — the old `useTheme()` composable (`src/utils.ts`) was
      removed with the Storybook 10 upgrade, so the `body[light]/[dark]` CSS
      hooks currently have no JS driver. Decide whether to ship a replacement
      composable (candidate: `useColorMode` from `@vueuse/core`, already a
      dependency — reactive system-pref tracking, `localStorage` persistence,
      SSR-safe) or leave setting the attributes to the consumer.

## Tooling / cleanup

- [ ] Wire up the **test runner** — Vitest 4 and `@storybook/addon-vitest` are
      already installed as devDependencies: add a `pnpm test` script and a
      Vitest config, register the addon in `.storybook/main.ts` and fill the
      `tsconfig/node.json` placeholders. Consider Playwright for E2E later.
- [ ] Remove `create-vue` scaffold leftovers: `index.html` + its missing
      `/src/main.ts` reference, and the unused cypress/playwright/nightwatch
      entries in `tsconfig/node.json`.
- [ ] Fix the minor inconsistency in `ClayTextarea.vue`: its `--small`/`--large`
      modifiers are declared as top-level selectors instead of nested under
      `.clay-textarea` like the other components.
