import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn } from "storybook/test";

import ClayButton from "./ClayButton.vue";

interface StoryArgs
{
    label: string;
    size: "small" | "default" | "large";

    onClick: () => void;
}

const meta: Meta<StoryArgs> = {
    title: "ClayButton",
    component: ClayButton,
    tags: ["autodocs"],
    argTypes: {
        label: {
            name: "Text",
            type: { name: "string", required: true },
            description: "The text to display inside the button.",
            table: {
                category: "Component's",
                defaultValue: { summary: "Click me!" },
                type: { summary: "string" }
            },
            control: "text"
        },
        size: {
            name: "Size",
            type: { name: "string", required: false },
            description: "The size used to display the button.",
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
        label: "Click me!",
        size: "default",

        onClick: fn()
    }
};

export const Primary: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayButton },
        setup: () => ({ args }),
        template: `
            <ClayButton :small="args.size === 'small'"
                        :large="args.size === 'large'"
                        @click="args.onClick">
                {{ args.label }}
            </ClayButton>
        `
    })
};

export default meta;
