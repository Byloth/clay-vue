import type { Meta, StoryObj } from "@storybook/vue3-vite";
import LoginForm from "./LoginForm.vue";

interface StoryArgs
{
    elevation: "none" | "low" | "default" | "high";
}

const meta: Meta<StoryArgs> = {
    title: "Templates/LoginForm",
    component: LoginForm,
    tags: ["autodocs"]
};

export const Primary: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { LoginForm },
        setup: () => ({ args }),
        template: `
            <LoginForm style="margin: 2rem 4rem;" />
        `
    })
};

export const Glass: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { LoginForm },
        setup: () => ({ args }),
        template: `
            <div style="background-image: url('https://picsum.photos/1920/1080');
                        background-size: cover;
                        padding: 2rem 4rem;">
                <LoginForm glass />
            </div>
        `
    })
};

export default meta;
