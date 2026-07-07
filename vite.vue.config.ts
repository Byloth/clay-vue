import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

import Vue from "@vitejs/plugin-vue";

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: fileURLToPath(new URL("./src/vue.ts", import.meta.url)),
      formats: ["es", "cjs"],
      fileName: (format) => (format === "cjs" ? "clay-vue.vue.cjs" : "clay-vue.vue.js")
    },
    rollupOptions: {
      external: ["vue", /^@vueuse\//],
      output: { exports: "named" }
    },
    sourcemap: true
  },
  plugins: [Vue()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) }
  }
});
