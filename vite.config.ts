import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

import Vue from "@vitejs/plugin-vue";

export default defineConfig({
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  build: {
    lib: {
      entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      name: "ClayVue",
      formats: ["es", "umd", "iife"],
      fileName: (format) =>
      {
        if (format === "umd") { return "clay-vue.umd.cjs"; }
        if (format === "iife") { return "clay-vue.global.js"; }

        return "clay-vue.js";
      }
    },
    rollupOptions: {
      output: { exports: "named" }
    },
    sourcemap: true
  },
  plugins: [Vue()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) }
  }
});
