import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
    addons: [
        "@chromatic-com/storybook",
        "@storybook/addon-a11y",
        "@storybook/addon-docs"
    ],
    docs: { defaultName: "Documentation" },
    framework: {
        name: "@storybook/vue3-vite",
        options: {
            builder: { viteConfigPath: "vite.vue.config.ts" }
        }
    },
    stories: [
        "../src/**/*.mdx",
        "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
    ]
};

export default config;
