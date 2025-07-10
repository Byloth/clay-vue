import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ClayBubble from "./ClayBubble.vue";

interface StoryArgs
{
    label: string;
    size: "small" | "default" | "large";
}

const meta: Meta<StoryArgs> = {
    title: "ClayBubble",
    component: ClayBubble,
    tags: ["autodocs"],
    argTypes: {
        label: {
            name: "Text",
            type: { name: "string", required: true },
            description: "The text to display inside the bubble.",
            table: {
                category: "Component's",
                defaultValue: { summary: "42" },
                type: { summary: "string" }
            },
            control: "text"
        },
        size: {
            name: "Size",
            type: { name: "string", required: false },
            description: "The size used to display the bubble.",
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
        label: "42",
        size: "default"
    }
};

export const Primary: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayBubble },
        setup: () => ({ args }),
        template: `
            <ClayBubble :small="args.size === 'small'"
                        :large="args.size === 'large'">
                <span>{{ args.label }}</span>
            </ClayBubble>
        `
    })
};

export default meta;
