import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn } from "storybook/test";

import ClayAlert from "./ClayAlert.vue";

interface StoryArgs
{
    content: string;
    title: string;
    icon: string;
    dismissible: boolean;
    dismiss: () => void;
}

const meta: Meta<StoryArgs> = {
    title: "Inputs/ClayAlert",
    component: ClayAlert,
    tags: ["autodocs"],
    argTypes: {
        content: {
            name: "Content",
            type: { name: "string", required: true },
            description: "The message displayed inside the alert (default slot).",
            table: {
                category: "Component's",
                defaultValue: { summary: "This is an alert message." },
                type: { summary: "string" }
            },
            control: "text"
        },
        title: {
            name: "Title",
            type: { name: "string", required: false },
            description: "The heading text of the alert. When set, the alert lays out vertically.",
            table: {
                category: "Component's",
                defaultValue: { summary: "" },
                type: { summary: "string" }
            },
            control: "text"
        },
        icon: {
            name: "Icon",
            type: { name: "string", required: false },
            description: "The Font Awesome solid icon name (without the `fa-` prefix).",
            table: {
                category: "Component's",
                defaultValue: { summary: "" },
                type: { summary: "string" }
            },
            control: "text"
        },
        dismissible: {
            name: "Dismissible",
            type: { name: "boolean", required: false },
            description: "Whether the alert shows a close button that emits the `dismiss` event.",
            table: {
                category: "Component's",
                defaultValue: { summary: "false" },
                type: { summary: "boolean" }
            },
            control: "boolean"
        },
        dismiss: {
            name: "Dismiss",
            description: "Emitted when the close button is clicked.",
            table: {
                category: "Events",
                type: { summary: "(event: MouseEvent) => void" }
            }
        }
    },
    args: {
        content: "This is an alert message.",
        title: "",
        icon: "",
        dismissible: false,
        dismiss: fn()
    }
};

export const Default: StoryObj<StoryArgs> = {
    render: (args) => ({
        components: { ClayAlert },
        setup: () => ({ args }),
        template: `<ClayAlert :title="args.title"
                              :icon="args.icon"
                              :dismissible="args.dismissible"
                              @dismiss="args.dismiss">
                       {{ args.content }}
                   </ClayAlert>`
    })
};

export default meta;
