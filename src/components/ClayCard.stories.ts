import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ClayCard from "./ClayCard.vue";

interface StoryArgs {
size: "Vicino" | "Default" | "Alto";
}

const meta: Meta<StoryArgs> = {
    title: "ClayCard",
    component: ClayCard,
    tags: ["autodocs"],
    argTypes: {
        size: {
            name: "Altezza",
            control: { type: "select" },
            options: ["Vicino", "Default", "Alto"]
        } }
};

export const Primary: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayCard },
        setup: () => ({ args }),
        template: `
            <ClayCard :class="'clay-card--' + args.size">
                {{ args.content }}
            </ClayCard>
        `
    })
};

export const Glass: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayCard },
        setup: () => ({ args }),
        template: `
            <ClayCard :class="'clay-card--' + args.size + ' clay-card--glass'">
                {{ args.content }}
            </ClayCard>
        `
    })
};

export default meta;
