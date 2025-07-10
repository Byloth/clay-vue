import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ClayLoading from "./ClayLoading.vue";

interface StoryArgs {
    size: "small" | "default" | "large";
    type: "spinner" | "dots" | "pulse" | "wave";
}

const meta: Meta<StoryArgs> = {
    title: "ClayLoading",
    component: ClayLoading,
    tags: ["autodocs"],
    argTypes: {
        size: {
            name: "Size",
            type: { name: "string", required: false },
            description: "The size of the loading indicator.",
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
        },
        type: {
            name: "Type",
            type: { name: "string", required: false },
            description: "The type of loading animation.",
            table: {
                category: "Component's",
                defaultValue: { summary: "spinner" },
                type: { summary: "spinner | dots | pulse | wave" }
            },
            control: {
                type: "select",
                labels: {
                    spinner: "Spinner",
                    dots: "Dots",
                    pulse: "Pulse",
                    wave: "Wave"
                }
            },
            options: ["spinner", "dots", "pulse", "wave"]
        }
    },
    args: {
        size: "default",
        type: "spinner"
    }
};

export const Primary: StoryObj<StoryArgs> = {
    args: {
        size: "default",
        type: "spinner"
    },
    render: (args: StoryArgs) => ({
        components: { ClayLoading },
        setup: () => ({ args }),
        template: `
            <div style="display: flex; align-items: center; justify-content: center; 
                        padding: 2rem; min-height: 200px;">
                <ClayLoading :size="args.size" :type="args.type" />
            </div>
        `
    })
};

export const Dots: StoryObj<StoryArgs> = {
    args: {
        size: "default",
        type: "dots"
    },
    render: (args: StoryArgs) => ({
        components: { ClayLoading },
        setup: () => ({ args }),
        template: `
            <div style="display: flex; align-items: center; justify-content: center; 
                        padding: 2rem; min-height: 200px;">
                <ClayLoading :size="args.size" type="dots" />
            </div>
        `
    })
};

export const Pulse: StoryObj<StoryArgs> = {
    args: {
        size: "default",
        type: "pulse"
    },
    render: (args: StoryArgs) => ({
        components: { ClayLoading },
        setup: () => ({ args }),
        template: `
            <div style="display: flex; align-items: center; justify-content: center; 
                        padding: 2rem; min-height: 200px;">
                <ClayLoading :size="args.size" type="pulse" />
            </div>
        `
    })
};

export const Wave: StoryObj<StoryArgs> = {
    args: {
        size: "default",
        type: "wave"
    },
    render: (args: StoryArgs) => ({
        components: { ClayLoading },
        setup: () => ({ args }),
        template: `
            <div style="display: flex; align-items: center; justify-content: center; 
                        padding: 2rem; min-height: 200px;">
                <ClayLoading :size="args.size" type="wave" />
            </div>
        `
    })
};

export default meta;
