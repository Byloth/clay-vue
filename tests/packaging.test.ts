import { existsSync, readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { publint } from "publint";
import { describe, expect, it } from "vitest";

const _root = fileURLToPath(new URL("..", import.meta.url));
const _dist = join(_root, "dist");

const _require = createRequire(import.meta.url);
const _read = (filename: string): string => readFileSync(join(_dist, filename), "utf-8");

const _artifacts = [
    "clay-vue.css",
    "clay-vue.js",
    "clay-vue.umd.cjs",
    "clay-vue.global.js",
    "clay-vue.vue.js",
    "clay-vue.vue.cjs"
];

describe("dist artifacts", () =>
{
    for (const artifact of _artifacts)
    {
        it(`ships "${artifact}"`, () => expect(existsSync(join(_dist, artifact))).toBe(true));
    }
});

describe("stylesheet", () =>
{
    it("declares all the cascade layers", () =>
    {
        const css = _read("clay-vue.css");

        for (const layer of ["clay.theme", "clay.base", "clay.components"])
        {
            expect(css).toContain(`@layer ${layer}`);
        }
    });

    it("ships the global design tokens", () =>
    {
        const css = _read("clay-vue.css");

        for (const token of ["--clay-color-primary", "--clay-color-light", "--clay-color-dark", "--clay-ease-duration"])
        {
            expect(css).toContain(token);
        }
    });

    it("ships the stable components only", () =>
    {
        const css = _read("clay-vue.css");

        expect(css).toContain(".clay-button");
        expect(css).toContain(".clay-card");

        expect(css).not.toContain(".clay-input");
        expect(css).not.toContain(".clay-textarea");
    });

    it("never leaks dev-only vendors", () =>
    {
        const css = _read("clay-vue.css");

        expect(css).not.toContain("googleapis");
        expect(css).not.toContain("fa-solid");
    });
});

describe("package root (custom elements)", () =>
{
    it("is require-able (UMD)", () =>
    {
        const bundle = _require(join(_dist, "clay-vue.umd.cjs"));

        expect(bundle.ClayButtonElement).toBeTypeOf("function");
        expect(bundle.ClayCardElement).toBeTypeOf("function");
    });

    it("is import-able (ESM)", async () =>
    {
        const bundle = await import(pathToFileURL(join(_dist, "clay-vue.js")).href);

        expect(bundle.ClayButtonElement).toBeTypeOf("function");
        expect(bundle.ClayCardElement).toBeTypeOf("function");
    });

    it("registers both tags in the CDN build", () =>
    {
        const bundle = _read("clay-vue.global.js");

        expect(bundle).toContain("customElements.define");
        expect(bundle).toContain("clay-button");
        expect(bundle).toContain("clay-card");
    });

    it("never references `process.env`", () =>
    {
        for (const artifact of ["clay-vue.js", "clay-vue.umd.cjs", "clay-vue.global.js"])
        {
            expect(_read(artifact), `"${artifact}" leaks \`process.env\``).not.toContain("process.env");
        }
    });
});

describe("vue adapter", () =>
{
    it("keeps `vue` & `@vueuse/*` external", () =>
    {
        const bundle = _read("clay-vue.vue.js");

        expect(bundle).toMatch(/from ?["']vue["']/);
        expect(bundle).toContain("@vueuse/core");

        // A bundled Vue runtime would weigh two orders of magnitude more.
        expect(statSync(join(_dist, "clay-vue.vue.js")).size).toBeLessThan(20_000);
    });

    it("exports the stable components", async () =>
    {
        const { ClayButton, ClayCard } = await import(pathToFileURL(join(_dist, "clay-vue.vue.js")).href);

        expect(ClayButton).toBeTruthy();
        expect(ClayCard).toBeTruthy();
    });
});

describe("package.json contract", () =>
{
    it("references only files that exist", () =>
    {
        const pkg = JSON.parse(readFileSync(join(_root, "package.json"), "utf-8"));

        const refs: string[] = [pkg.main, pkg.module, pkg.unpkg, pkg.jsdelivr, pkg.types];
        const walk = (node: unknown): void =>
        {
            if (typeof node === "string") { refs.push(node); }
            else if (node && typeof node === "object") { Object.values(node).forEach(walk); }
        };

        walk(pkg.exports);

        for (const ref of refs)
        {
            expect(existsSync(join(_root, ref)), `"${ref}" doesn't exist`).toBe(true);
        }
    });

    it("passes publint", async () =>
    {
        const { messages } = await publint({ pkgDir: _root });
        const errors = messages.filter((message) => message.type === "error");

        expect(errors).toEqual([]);
    });
});
