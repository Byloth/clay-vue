import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ClayToast from "./ClayToast.vue";

interface StoryArgs {
    type: "success" | "error" | "warning";
    content: string;
}

const meta: Meta<StoryArgs> = {
    title: "Notification/ClayToast",
    component: ClayToast,
    argTypes: {
        type: {
            name: "Type",
            control: { type: "select" },
            options: ["success", "error", "warning", "information"]
        },
        content: {
            name: "Content",
            control: "text"
        }
    },
    args: {
        type: "success",
        content: "Operazione completata! Questo è un toast."
    }
};

export default meta;

export const Default: StoryObj<StoryArgs> = {
    args: {
        type: "success",
        content: ""
    },
    render: (args) => ({
        components: { ClayToast },
        setup: () => ({ args }),
        template: `
            <div style="position:relative; min-height:200px;">
                <ClayToast
                    :type="args.type"
                    :message="args.content"
                    :duration=""
                    @close="() => console.log('Toast closed')"
                />
            </div>
        `
    })
};

export const Glass: StoryObj<StoryArgs> = {
    args: {
        type: "success",
        content: "",
        // @ts-expect-error: variant is not defined in args, but we want to use it in the template
        variant: "glass"
    },
    render: (args) => ({
        components: { ClayToast },
        setup: () => ({ args }),
        template: `
         <div style="background-image: url('https://picsum.photos/1920/1080');
                background-size: cover;
                background-position: center;
                width: 100vw;
                height: 100vh;
                margin: 0;
                padding: 0;
            ">
            <div style="position:relative; min-height:200px;">
                <ClayToast
                    :type="args.type"
                    :message="args.content"
                    :duration=""
                    variant="glass"
                    :relative="true"
                    @close="() => console.log('Toast closed')"
                />
            </div>
        `
    })
};