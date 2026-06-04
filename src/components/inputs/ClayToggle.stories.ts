import type { Meta, StoryObj } from "@storybook/vue3-vite";

import ClayToggle from "./ClayToggle.vue";

const meta: Meta = {
    title: "Inputs/ClayToggle",
    component: ClayToggle,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "A simple toggle switch component. Click to toggle between on and off states."
            }
        }
    }
};

export const Default: StoryObj = {
    render: () => ({
        components: { ClayToggle },
        template: "<ClayToggle />"
    })
};

export default meta;
