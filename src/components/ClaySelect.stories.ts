import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ClaySelect from "./ClaySelect.vue";

interface StoryArgs
{
    items: { label: string; value: string }[];
    placeholder: "Menu" | string;
    modelValue: string;
    click: () => void;
}

const meta: Meta<StoryArgs> = {
    title: "ClaySelect",
    component: ClaySelect,
    parameters: {
        layout: "centered"
    },
    argTypes: {
        items: {
            control: "object",
            description: "Array of options for the dropdown"
        },
        placeholder: {
            control: "text",
            description: "Placeholder text when no option is selected"
        },
        modelValue: {
            control: "text",
            description: "Current selected value"
        }
    },
    args: {
        items: [
            { label: "Opzione 1", value: "option1" },
            { label: "Opzione 2", value: "option2" },
            { label: "Opzione 3", value: "option3" }
        ],
        placeholder: "Menu",
        modelValue: ""
    }
};

export const Primary: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClaySelect },
        setup: () => ({ args }),
        template: `
            <ClaySelect 
                :items="args.items"
                :placeholder="args.placeholder"
                :modelValue="args.modelValue" />
        `
    })
};

export default meta;
