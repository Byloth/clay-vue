import type { Meta, StoryObj } from "@storybook/vue3-vite";

import ClayInput from "./ClayInput.vue";

interface StoryArgs
{
    placeholder: string;
    size: "small" | "default" | "large";
}

const meta: Meta<StoryArgs> = {
    title: "Inputs/ClayInput",
    component: ClayInput,
    tags: ["autodocs"],
    argTypes: {
        placeholder: {
            name: "Placeholder",
            type: { name: "string", required: true },
            description: "The placeholder text for the input.",
            table: {
                category: "Component's",
                defaultValue: { summary: "Enter text here..." },
                type: { summary: "string" }
            },
            control: "text"
        },
        size: {
            name: "Size",
            type: { name: "string", required: false },
            description: "The size of the input field.",
            table: {
                category: "Component's",
                defaultValue: { summary: "default" },
                type: { summary: "small | default | large" }
            },
            control: {
                type: "select",
                labels: {
                    small: "Small",
                    default: "Default",
                    large: "Large"
                }
            },
            options: ["small", "default", "large"]
        }
    },
    args: {
        placeholder: "Enter text here...",
        size: "default"
    }
};

export const Default: StoryObj<StoryArgs> = {
    render: (args) => ({
        components: { ClayInput },
        setup: () => ({ args }),
        template: `<ClayInput id="storybook--story__clay-input"
                              :placeholder="args.placeholder"
                              :small="args.size === 'small'"
                              :large="args.size === 'large'" />`
    })
};

export default meta;
