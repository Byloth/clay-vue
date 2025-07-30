import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ClayCarosel from "./ClayCarosel.vue";

interface StoryArgs {
  buttons: boolean;
}

const meta: Meta<StoryArgs> = {
    title: "ClayCarosel",
    component: ClayCarosel,
    tags: ["autodocs"],
    argTypes: {
        buttons: {
            name: "Show Buttons",
            type: { name: "boolean", required: false },
            description: "Toggle navigation buttons",
            table: {
                category: "Component's",
                type: { summary: "boolean" },
                defaultValue: { summary: "false" }
            },
            control: "boolean"
        }
    },
    args: {
        buttons: false
    }
};

export const Primary: StoryObj<StoryArgs> = {
    args: {
        buttons: false
    },
    render: (args: StoryArgs) => ({
        components: { ClayCarosel },
        setup: () =>
        {
            return { args };
        },
        template: `
      <div style="max-width: 600px; margin: auto;">
        <ClayCarosel :with-buttons="args.buttons" />
      </div>
    `
    })
};

export const Vertical: StoryObj<StoryArgs> = {
    args: {
        buttons: false
    },
    render: (args: StoryArgs) => ({
        components: { ClayCarosel },
        setup: () =>
        {
            return { args };
        },
        template: `
      <div style="max-width: 600px; height: 600px; margin: auto;">
        <ClayCarosel vertical :with-buttons="args.buttons" />
      </div>
    `
    })
};

export default meta;
