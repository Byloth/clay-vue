import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ClayAlert from "./ClayAlert.vue";

interface StoryArgs
{
    type: "success" | "error" | "warning" | "information";
    content: string;
    showCloseButton: boolean;
    showCancelButton: boolean;
}

const meta: Meta<StoryArgs> = {
    title: "Notification/ClayAlert",
    component: ClayAlert,
    tags: ["autodocs"],
    argTypes: {
        type: {
            name: "Type",
            type: { name: "string", required: false },
            description: "The type of alert to display.",
            table: {
                category: "Component's",
                defaultValue: { summary: "success" },
                type: { summary: "success | error | warning | information" }
            },
            control: {
                type: "select",
                labels: {
                    success: "Success",
                    error: "Error",
                    warning: "Warning",
                    information: "Information"
                }
            },
            options: ["success", "error", "warning", "information"]
        },
        content: {
            name: "Content",
            type: { name: "string", required: false },
            description: "Alert message content.",
            table: {
                category: "Component's",
                defaultValue: { summary: "" },
                type: { summary: "string" }
            },
            control: "text"
        },
        showCloseButton: {
            name: "Show Close Button",
            type: { name: "boolean", required: false },
            description: "Whether to show the close button.",
            table: {
                category: "Component's",
                defaultValue: { summary: "false" },
                type: { summary: "boolean" }
            },
            control: "boolean"
        },
        showCancelButton: {
            name: "Show Cancel Button",
            type: { name: "boolean", required: false },
            description: "Whether to show the cancel button.",
            table: {
                category: "Component's",
                defaultValue: { summary: "false" },
                type: { summary: "boolean" }
            },
            control: "boolean"
        }
    },
    args: {
        type: "success",
        content: "",
        showCloseButton: false,
        showCancelButton: false
    }
};

export default meta;

export const Default: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayAlert },
        setup: () => ({ args }),
        template: `
            <ClayAlert
                :type="args.type"
                :showCloseButton="args.showCloseButton"
                :showCancelButton="args.showCancelButton"
                style="aspect-ratio: 32/9; margin: 2rem 4rem;"
            >
                <template v-if="args.content">
                    {{ args.content }}
                </template>
            </ClayAlert>
        `
    })
};

export const Glass: StoryObj<StoryArgs> = {
    args: {
        showCloseButton: false,
        showCancelButton: false,
        content: ""
    },
    render: (args: StoryArgs) => ({
        components: { ClayAlert },
        setup: () => ({ args }),
        template: `
            <div style="background-image: url('https://picsum.photos/1920/1080');
                        background-size: cover;
                        padding: 2rem 4rem;">
                <ClayAlert
                    :type="args.type"
                    glass
                    :showCloseButton="args.showCloseButton"
                    :showCancelButton="args.showCancelButton"
                >
                    <template v-if="args.content">
                        {{ args.content }}
                    </template>
                </ClayAlert>
            </div>
        `
    })
};
