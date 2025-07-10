import type { Preview } from "@storybook/vue3-vite";

import "@/assets/scss/main.scss";

const preview: Preview = {
    decorators: [(Story, context) =>
    {
        const { theme } = context.globals;

        const html = window.document.querySelector<HTMLHtmlElement>("html");
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
            defaultValue: "light",
            toolbar: {
                items: [
                    { icon: "sun", value: "light", title: "Light", right: "(default)" },
                    { icon: "moon", value: "dark", title: "Dark" }
                ],
                showName: true,
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
