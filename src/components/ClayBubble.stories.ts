import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ClayBubble from "./ClayBubble.vue";

interface StoryArgs
{
    size: "small" | "default" | "large";
}

const meta: Meta<StoryArgs> = {
    title: "ClayBubble",
    component: ClayBubble,
    tags: ["autodocs"],
    argTypes: {
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
    args: { size: "default" }
};

export const Primary: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayBubble },
        setup: () => ({ args }),
        template: `
            <ClayBubble :size="args.size">
                <span>12</span>
            </ClayBubble>
        `
    })
};

export const Glass: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayBubble },
        setup: () => ({ args }),
        template: `
            <ClayBubble glass :size="args.size">
                <span>12</span>
            </ClayBubble>
        `
    })
};

export default meta;
