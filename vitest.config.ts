import { defineConfig } from "vitest/config";

// Standalone config: without it, Vitest would merge the root `vite.config.ts`
// (the custom-elements build, with its inlined NODE_ENV) into the test setup.
export default defineConfig({
  test: { include: ["tests/**/*.test.ts"] }
});
