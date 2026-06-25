import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn } from "storybook/test";

import ClayAlert from "./ClayAlert.vue";

interface StoryArgs
{
    content: string;
    title: string;
    icon: string;
    variant: "primary" | "success" | "warning" | "danger" | "info";
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
        variant: {
            name: "Variant",
            type: { name: "string", required: false },
            description: "The semantic color scheme of the alert.",
            table: {
                category: "Component's",
                defaultValue: { summary: "primary" },
                type: { summary: "\"primary\" | \"success\" | \"warning\" | \"danger\" | \"info\"" }
            },
            control: "select",
            options: ["primary", "success", "warning", "danger", "info"]
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
        variant: "primary",
        dismissible: false,
        dismiss: fn()
    }
};

export const Default: StoryObj<StoryArgs> = {
    args: {
        title: "This is an alert",
        icon: "info"
    },

    render: (args) => ({
        components: { ClayAlert },
        setup: () => ({ args }),
        template: `<ClayAlert :title="args.title"
                              :icon="args.icon"
                              :variant="args.variant"
                              :dismissible="args.dismissible"
                              @dismiss="args.dismiss">
                       {{ args.content }}
                   </ClayAlert>`
    })
};

export const Primary: StoryObj<StoryArgs> = {
    args: {
        variant: "primary",
        icon: "circle-info",
        title: "Primary",
        content: "This is a primary alert message."
    },
    render: (args) => ({
        components: { ClayAlert },
        setup: () => ({ args }),
        template: `<ClayAlert :title="args.title"
                              :icon="args.icon"
                              :variant="args.variant"
                              :dismissible="args.dismissible"
                              @dismiss="args.dismiss">
                       {{ args.content }}
                   </ClayAlert>`
    })
};

export const Success: StoryObj<StoryArgs> = {
    args: {
        variant: "success",
        icon: "circle-check",
        title: "Success",
        content: "Your changes have been saved successfully."
    },
    render: (args) => ({
        components: { ClayAlert },
        setup: () => ({ args }),
        template: `<ClayAlert :title="args.title"
                              :icon="args.icon"
                              :variant="args.variant"
                              :dismissible="args.dismissible"
                              @dismiss="args.dismiss">
                       {{ args.content }}
                   </ClayAlert>`
    })
};

export const Warning: StoryObj<StoryArgs> = {
    args: {
        variant: "warning",
        icon: "warning",
        title: "Warning",
        content: "Your session is about to expire."
    },
    render: (args) => ({
        components: { ClayAlert },
        setup: () => ({ args }),
        template: `<ClayAlert :title="args.title"
                              :icon="args.icon"
                              :variant="args.variant"
                              :dismissible="args.dismissible"
                              @dismiss="args.dismiss">
                       {{ args.content }}
                   </ClayAlert>`
    })
};

export const Danger: StoryObj<StoryArgs> = {
    args: {
        variant: "danger",
        icon: "circle-exclamation",
        title: "Danger",
        content: "Something went wrong while processing your request."
    },
    render: (args) => ({
        components: { ClayAlert },
        setup: () => ({ args }),
        template: `<ClayAlert :title="args.title"
                              :icon="args.icon"
                              :variant="args.variant"
                              :dismissible="args.dismissible"
                              @dismiss="args.dismiss">
                       {{ args.content }}
                   </ClayAlert>`
    })
};

export const Info: StoryObj<StoryArgs> = {
    args: {
        variant: "info",
        icon: "circle-info",
        title: "Info",
        content: "A new version of the app is available."
    },
    render: (args) => ({
        components: { ClayAlert },
        setup: () => ({ args }),
        template: `<ClayAlert :title="args.title"
                              :icon="args.icon"
                              :variant="args.variant"
                              :dismissible="args.dismissible"
                              @dismiss="args.dismiss">
                       {{ args.content }}
                   </ClayAlert>`
    })
};

export default meta;
