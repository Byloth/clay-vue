import type { Preview } from "@storybook/vue3-vite";

import "@/assets/scss/vendors/_index.scss";
import "@/assets/scss/_index.scss";

const _prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const _defaultTheme = _prefersDark ? "dark" : "light";

const preview: Preview = {
    initialGlobals: { theme: _defaultTheme },

    decorators: [(Story, { globals }) =>
    {
        const { theme } = globals;

        const html = window.document.querySelector<HTMLElement>("html");
        if (!(html)) { return Story(); }

        html.style.colorScheme = theme;

        const wrapper = window.parent.document.querySelector<HTMLDivElement>("#storybook-preview-wrapper");
        if (!(wrapper)) { return Story(); }

        wrapper.style.colorScheme = theme;

        return Story();
    }],

    globalTypes: {
        theme: {
            name: "Theme",
            description: "The theme used to display the whole UI",
            toolbar: {
                title: "Theme",
                items: [
                    { icon: "sun", value: "light", title: "Light", right: _prefersDark ? undefined : "(default)" },
                    { icon: "moon", value: "dark", title: "Dark", right: _prefersDark ? "(default)" : undefined }
                ],
                dynamicTitle: true
            }
        }
    },

    parameters: {
        backgrounds: { disable: true },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        }
    },

    tags: ["autodocs"]
};

export default preview;
