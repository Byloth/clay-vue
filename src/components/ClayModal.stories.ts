import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ClayModal from "./ClayModal.vue";
import ClayButton from "./ClayButton.vue";
import { ref } from "vue";

interface StoryArgs {
    title: string;
    content: string;
    buttonText: string;
    closeButtonText: string;
    variant?: "default" | "warning" | "success";
}

const meta: Meta<StoryArgs> = {
    title: "Components/ClayModal",
    component: ClayModal,
    tags: ["autodocs"],
    argTypes: {
        title: {
            name: "Title",
            type: { name: "string", required: true },
            description: "The title displayed in the modal header.",
            table: {
                category: "Content",
                defaultValue: { summary: "✨ Claymorphism Modal" },
                type: { summary: "string" }
            },
            control: "text"
        },
        content: {
            name: "Content",
            type: { name: "string", required: true },
            description: "The main content text of the modal.",
            table: {
                category: "Content",
                defaultValue: { summary: "This is an elegant modal..." },
                type: { summary: "string" }
            },
            control: "text"
        },
        buttonText: {
            name: "Open Button Text",
            type: { name: "string", required: true },
            description: "The text for the button that opens the modal.",
            table: {
                category: "Actions",
                defaultValue: { summary: "Open Clay Modal" },
                type: { summary: "string" }
            },
            control: "text"
        },
        closeButtonText: {
            name: "Close Button Text",
            type: { name: "string", required: true },
            description: "The text for the button that closes the modal.",
            table: {
                category: "Actions",
                defaultValue: { summary: "✓ Close" },
                type: { summary: "string" }
            },
            control: "text"
        }
    },
    args: {
        title: "Claymorphism Modal",
        content: "This is an elegant modal in claymorphism style with depth effects, soft textures and fluid " +
        "animations. Modern design featuring multiple shadows, backdrop blur and refined gradients " +
        "for a premium user experience.",
        buttonText: "Open Clay Modal",
        closeButtonText: "Close"
    }
};

export const Primary: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayModal, ClayButton },
        setup: () =>
        {
            const isOpen = ref(false);
            const openModal = () =>
            {
                isOpen.value = true;
            };
            const closeModal = () =>
            {
                isOpen.value = false;
            };

            return { args, isOpen, openModal, closeModal };
        },
        template: `
            <div>
                <ClayButton @click="openModal">
                    {{ args.buttonText }}
                </ClayButton>
                
                <ClayModal v-model="isOpen" :variant="args.variant || 'default'">
                    <h2 style="margin-top: 0; color: var(--clay-primary-color); font-size: 1.5em;">
                        {{ args.title }}
                    </h2>
                    <p style="opacity: 0.9; line-height: 1.6;">
                        {{ args.content }}
                    </p>
                    
                    <div style="margin-top: 2.5em; text-align: right;">
                        <ClayButton @click="closeModal">
                            {{ args.closeButtonText }}
                        </ClayButton>
                    </div>
                </ClayModal>
            </div>
        `
    })
};

export const Warning: StoryObj<StoryArgs> = {
    args: {
        title: "Warning",
        content: "This action cannot be undone. Are you sure you want to proceed? " +
        "All data will be permanently deleted from the system.",
        buttonText: "Show Warning",
        closeButtonText: "I Understand",
        variant: "warning"
    },
    render: (args: StoryArgs) => ({
        components: { ClayModal, ClayButton },
        setup: () =>
        {
            const isOpen = ref(false);
            const openModal = () =>
            {
                isOpen.value = true;
            };
            const closeModal = () =>
            {
                isOpen.value = false;
            };

            return { args, isOpen, openModal, closeModal };
        },
        template: `
            <div>
                <ClayButton @click="openModal" class="clay-button--warning-trigger">
                    {{ args.buttonText }}
                </ClayButton>
                
                <ClayModal v-model="isOpen" :variant="args.variant">
                    <div class="clay-modal__alert-box">
                        <h2>
                            <span>⚠️</span>
                            {{ args.title }}
                        </h2>
                        <p>
                            {{ args.content }}
                        </p>
                    </div>
                    
                    <div class="clay-modal__actions">
                        <ClayButton @click="closeModal" class="clay-button--cancel">
                            Cancel
                        </ClayButton>
                        <ClayButton @click="closeModal" class="clay-button--warning">
                            {{ args.closeButtonText }}
                        </ClayButton>
                    </div>
                </ClayModal>
            </div>
        `
    })
};

export const Success: StoryObj<StoryArgs> = {
    args: {
        title: "Operation Completed",
        content: "The operation was completed successfully! Your data has been saved " +
        "correctly and all changes have been applied.",
        buttonText: "Show Success",
        closeButtonText: "Perfect!",
        variant: "success"
    },
    render: (args: StoryArgs) => ({
        components: { ClayModal, ClayButton },
        setup: () =>
        {
            const isOpen = ref(false);
            const openModal = () =>
            {
                isOpen.value = true;
            };
            const closeModal = () =>
            {
                isOpen.value = false;
            };

            return { args, isOpen, openModal, closeModal };
        },
        template: `
            <div>
                <ClayButton @click="openModal" class="clay-button--success-trigger">
                    {{ args.buttonText }}
                </ClayButton>
                
                <ClayModal v-model="isOpen" :variant="args.variant">
                    <div class="clay-modal__alert-box">
                        <h2>
                            <span>✅</span>
                            {{ args.title }}
                        </h2>
                        <p>
                            {{ args.content }}
                        </p>
                    </div>
                    
                    <div class="clay-modal__actions">
                        <ClayButton @click="closeModal" class="clay-button--success">
                            {{ args.closeButtonText }}
                        </ClayButton>
                    </div>
                </ClayModal>
            </div>
        `
    })
};

export default meta;
