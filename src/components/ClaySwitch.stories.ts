import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ClaySwitch from "./ClaySwitch.vue";
import { ref } from "vue";

interface StoryArgs {
    modelValue: boolean;
    theme?: boolean;
    size?: "small" | "medium" | "large";
    "update:modelValue": (value: boolean) => void;
}

const meta: Meta<StoryArgs> = {
    title: "ClaySwitch",
    component: ClaySwitch,
    tags: ["autodocs"],
    argTypes: {
        modelValue: {
            name: "Model Value",
            type: { name: "boolean", required: false },
            description: "The value of the switch.",
            table: {
                category: "Component's",
                defaultValue: { summary: "false" },
                type: { summary: "boolean" }
            },
            control: {
                type: "boolean"
            }
        },
        size: {
            name: "Size",
            type: { name: "string", required: false },
            description: "The size of the switch.",
            table: {
                category: "Component's",
                defaultValue: { summary: "medium" },
                type: { summary: "small | medium | large" }
            },
            control: {
                type: "select",
                labels: {
                    small: "Small",
                    medium: "Medium",
                    large: "Large"
                }
            },
            options: ["small", "medium", "large"]
        }
    },
    args: {
        modelValue: false,
        theme: false,
        size: "medium"
    }
};

type Story = StoryObj<StoryArgs>;

export const Primary: Story = {
    render: (args: StoryArgs) => ({
        components: { ClaySwitch },
        setup: () =>
        {
            const modelValue = ref(args.modelValue || false);
            return { args, modelValue };
        },
        template: `<ClaySwitch v-model="modelValue" :theme="args.theme" :size="args.size" />`
    }),
    args: {
        modelValue: false,
        theme: false,
        size: "medium"
    }
};

export const Theme: Story = {
    render: (args: StoryArgs) => ({
        components: { ClaySwitch },
        setup: () =>
        {
            const modelValue = ref(args.modelValue || true);
            return { args, modelValue };
        },
        template: `<ClaySwitch v-model="modelValue" :theme="args.theme" :size="args.size" />`
    }),
    args: {
        modelValue: true,
        theme: true,
        size: "medium"
    }
};

export default meta;
