import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ClayList from "./ClayList.vue";

interface StoryArgs
{
    size: "small" | "default" | "large";
}

const meta: Meta<StoryArgs> = {
    title: "ClayList",
    component: ClayList,
    tags: ["autodocs"],
    argTypes: {
        size: {
            name: "Size",
            type: { name: "string", required: false },
            description: "The size used to display the list.",
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
        components: { ClayList },
        setup: () => ({ args }),
        template: `
            <ClayList :size="args.size">
            </ClayList>
        `
    })
};

export default meta;
