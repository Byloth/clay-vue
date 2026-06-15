import type { Meta, StoryObj } from "@storybook/vue3-vite";

import ClayToggle from "./ClayToggle.vue";

interface StoryArgs
{
    label: string;
}

const meta: Meta<StoryArgs> = {
    title: "Inputs/ClayToggle",
    component: ClayToggle,
    tags: ["autodocs"],
    argTypes: {
        label: {
            name: "Label",
            type: { name: "string", required: false },
            description: "The label displayed next to the toggle switch.",
            table: {
                category: "Component's",
                defaultValue: { summary: "" },
                type: { summary: "string" }
            },
            control: "text"
        }
    },
    args: {
        label: "Keep me signed in for the next time"
    },
    parameters: {
        docs: {
            description: {
                component: "A simple toggle switch component. Click to toggle between on and off states."
            }
        }
    }
};

export const Default: StoryObj<StoryArgs> = {
    render: (args) => ({
        components: { ClayToggle },
        setup: () => ({ args }),
        template: `<ClayToggle :label="args.label" />`
    })
};

export default meta;
