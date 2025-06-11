import ClayDropdown from "./ClayDropdown.vue";
import type { Meta, StoryObj } from "@storybook/vue3";

const meta: Meta<typeof ClayDropdown> = {
    title: "ClayDropdown",
    component: ClayDropdown,
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
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        items: [
            { label: "Opzione 1", value: "option1" },
            { label: "Opzione 2", value: "option2" },
            { label: "Opzione 3", value: "option3" }
        ],
        placeholder: "Menu"
    }
};

export const WithSelection: Story = {
    args: {
        items: [
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
            { label: "Option 3", value: "option3" }
        ],
        placeholder: "Select an option...",
        modelValue: "option2"
    }
};

export const WithLongText: Story = {
    args: {
        items: [
            { label: "Opzione molto lunga che dovrebbe espandere il dropdown", value: "long1" },
            { label: "Altra opzione con testo molto lungo per testare", value: "long2" },
            { label: "Breve", value: "short" }
        ],
        placeholder: "Choose a long option..."
    }
};
