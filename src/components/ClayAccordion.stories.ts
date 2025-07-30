import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn } from "storybook/test";
import { computed } from "vue";

import ClayAccordion from "./ClayAccordion.vue";

interface AccordionItem {
    id: string;
    title: string;
    content: string;
    disabled?: boolean;
}

interface StoryArgs {
    items: AccordionItem[];
    multiple: boolean;
    disabled: boolean;
    toggle: (id: string, isOpen: boolean) => void;
    item1Title: string;
    item2Title: string;
    item3Title: string;
    item4Title: string;
    item1Content: string;
    item2Content: string;
    item3Content: string;
    item4Content: string;
}

const defaultItems: AccordionItem[] = [
    {
        id: "item-1",
        title: "What is Clay Vue?",
        content:
      "Clay Vue is a modern UI component library built with Vue 3 and TypeScript. It provides a set of " +
      "beautiful, accessible, and customizable components for building modern web applications."
    },
    {
        id: "item-2",
        title: "How do I install Clay Vue?",
        content:
      "You can install Clay Vue using npm or yarn. Simply run 'npm install clay-vue' or " +
      "'yarn add clay-vue' in your project directory."
    },
    {
        id: "item-3",
        title: "Is Clay Vue accessible?",
        content:
      "Yes! Clay Vue components are built with accessibility in mind. All components follow WCAG " +
      "guidelines and include proper ARIA attributes, keyboard navigation, and screen reader support."
    },
    {
        id: "item-4",
        title: "Can I customize the theme?",
        content:
      "Absolutely! Clay Vue uses CSS custom properties (CSS variables) for theming. You can easily customize " +
      "colors, spacing, and other design tokens to match your brand."
    }
];

const meta: Meta<StoryArgs> = {
    title: "ClayAccordion",
    component: ClayAccordion,
    tags: ["autodocs"],
    argTypes: {
        items: {
            name: "Items",
            type: { name: "array", value: { name: "object", value: {} }, required: true },
            description: "Array of accordion items to display.",
            table: {
                category: "Component's",
                type: { summary: "AccordionItem[]" }
            },
            control: false
        },
        multiple: {
            name: "Multiple",
            type: { name: "boolean", required: false },
            description: "Allow multiple items to be open at the same time.",
            table: {
                category: "Component's",
                defaultValue: { summary: "false" },
                type: { summary: "boolean" }
            },
            control: "boolean"
        },
        disabled: {
            name: "Disabled",
            type: { name: "boolean", required: false },
            description: "Disable the entire accordion.",
            table: {
                category: "Component's",
                defaultValue: { summary: "false" },
                type: { summary: "boolean" }
            },
            control: "boolean"
        },
        toggle: {
            name: "Toggle Event",
            type: { name: "function", required: false },
            description: "Emitted when an accordion item is toggled.",
            table: {
                category: "Events",
                type: { summary: "(id: string, isOpen: boolean) => void" }
            },
            control: false
        },
        item1Title: {
            name: "Item 1 Title",
            type: { name: "string", required: false },
            description: "Title for the first accordion item.",
            table: {
                category: "Content",
                type: { summary: "string" }
            },
            control: "text"
        },
        item2Title: {
            name: "Item 2 Title",
            type: { name: "string", required: false },
            description: "Title for the second accordion item.",
            table: {
                category: "Content",
                type: { summary: "string" }
            },
            control: "text"
        },
        item3Title: {
            name: "Item 3 Title",
            type: { name: "string", required: false },
            description: "Title for the third accordion item.",
            table: {
                category: "Content",
                type: { summary: "string" }
            },
            control: "text"
        },
        item4Title: {
            name: "Item 4 Title",
            type: { name: "string", required: false },
            description: "Title for the fourth accordion item.",
            table: {
                category: "Content",
                type: { summary: "string" }
            },
            control: "text"
        },
        item1Content: {
            name: "Item 1 Content",
            type: { name: "string", required: false },
            description: "Content for the first accordion item.",
            table: {
                category: "Content",
                type: { summary: "string" }
            },
            control: "text"
        },
        item2Content: {
            name: "Item 2 Content",
            type: { name: "string", required: false },
            description: "Content for the second accordion item.",
            table: {
                category: "Content",
                type: { summary: "string" }
            },
            control: "text"
        },
        item3Content: {
            name: "Item 3 Content",
            type: { name: "string", required: false },
            description: "Content for the third accordion item.",
            table: {
                category: "Content",
                type: { summary: "string" }
            },
            control: "text"
        },
        item4Content: {
            name: "Item 4 Content",
            type: { name: "string", required: false },
            description: "Content for the fourth accordion item.",
            table: {
                category: "Content",
                type: { summary: "string" }
            },
            control: "text"
        }
    },
    args: {
        items: defaultItems,
        multiple: false,
        disabled: false,
        toggle: fn(),
        item1Title: "",
        item2Title: "",
        item3Title: "",
        item4Title: "",
        item1Content: "",
        item2Content: "",
        item3Content: "",
        item4Content: ""
    }
};

const createItemsWithContent = (args: StoryArgs): AccordionItem[] =>
{
    return [
        {
            id: "item-1",
            title: args.item1Title || defaultItems[0].title,
            content: args.item1Content || defaultItems[0].content
        },
        {
            id: "item-2",
            title: args.item2Title || defaultItems[1].title,
            content: args.item2Content || defaultItems[1].content
        },
        {
            id: "item-3",
            title: args.item3Title || defaultItems[2].title,
            content: args.item3Content || defaultItems[2].content
        },
        {
            id: "item-4",
            title: args.item4Title || defaultItems[3].title,
            content: args.item4Content || defaultItems[3].content
        }
    ];
};

export const Default: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayAccordion },
        setup: () =>
        {
            const computedItems = computed(() => createItemsWithContent(args));
            return {
                args,
                computedItems
            };
        },
        template: `
            <div style="max-width: 800px; margin: 2rem auto; padding: 0 2rem;">
                <ClayAccordion :items="computedItems"
                               :multiple="args.multiple"
                               :disabled="args.disabled"
                               @toggle="args.toggle" />
            </div>
        `
    })
};

export const Multiple: StoryObj<StoryArgs> = {
    args: {
        multiple: true
    },
    render: (args: StoryArgs) => ({
        components: { ClayAccordion },
        setup: () =>
        {
            const computedItems = computed(() => createItemsWithContent(args));
            return {
                args,
                computedItems
            };
        },
        template: `
            <div style="max-width: 800px; margin: 2rem auto; padding: 0 2rem;">
                <ClayAccordion :items="computedItems"
                               :multiple="args.multiple"
                               :disabled="args.disabled"
                               @toggle="args.toggle" />
            </div>
        `
    })
};

export const WithDisabledItems: StoryObj<StoryArgs> = {
    args: {
        items: [
            {
                id: "item-1",
                title: "Active Item",
                content: "This item is active and can be clicked."
            },
            {
                id: "item-2",
                title: "Disabled Item",
                content: "This item is disabled and cannot be clicked.",
                disabled: true
            },
            {
                id: "item-3",
                title: "Another Active Item",
                content: "This item is also active."
            }
        ]
    },
    render: (args: StoryArgs) => ({
        components: { ClayAccordion },
        setup: () => ({ args }),
        template: `
            <div style="max-width: 800px; margin: 2rem auto; padding: 0 2rem;">
                <ClayAccordion :items="args.items"
                               :multiple="args.multiple"
                               :disabled="args.disabled"
                               @toggle="args.toggle" />
            </div>
        `
    })
};

export default meta;