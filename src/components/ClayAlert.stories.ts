import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ClayAlert from "./ClayAlert.vue";

interface StoryArgs {
  size: "small" | "default" | "large";
  type: "success" | "error" | "warning";
  content: string;
  showCancelButton: boolean;
  showCloseButton: boolean;
}

const meta: Meta<StoryArgs> = {
    title: "Notification/ClayAlert",
    component: ClayAlert,
    tags: ["autodocs"],
    argTypes: {
        size: {
            name: "Size",
            control: { type: "select" },
            options: ["small", "default", "large"]
        },
        type: {
            name: "Type",
            control: { type: "select" },
            options: ["success", "error", "warning", "information"]
        },
        content: {
            name: "Content",
            control: "text"
        },
        showCancelButton: {
            name: "Show Cancel Button",
            control: "boolean"
        },
        showCloseButton: {
            name: "Show Close Button",
            control: "boolean"
        }
    },
    args: {
        size: "default",
        type: "success",
        showCancelButton: false,
        showCloseButton: false
    }
};

export default meta;

export const Default: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayAlert },
        setup: () => ({ args }),
        template: `
      <ClayAlert 
        :type="args.type" 
        :class="'clay-alert--' + args.size" 
        :showCancelButton="args.showCancelButton"
        :showCloseButton="args.showCloseButton"
        @close="() => console.log('Alert closed')">
        <template v-if="args.content">
          {{ args.content }}
        </template>
      </ClayAlert>
    `
    })
};

export const Glass: StoryObj<StoryArgs> = {
    args: {
    // @ts-expect-error: variant is not in StoryArgs but usato nel template
        variant: "glass",
        content: ""
    },
    render: (args: StoryArgs) => ({
        components: { ClayAlert },
        setup: () => ({ args }),
        template: `
        <div style="background-image: url('https://picsum.photos/1920/1080');
                        background-size: cover;
                        padding: 2rem 4rem;">
            <ClayAlert 
              :type="args.type" 
              :variant="args.variant"
              :class="'clay-alert--' + args.size"
              :showCancelButton="args.showCancelButton"
              :showCloseButton="args.showCloseButton"
              @close="() => console.log('Alert closed')">
              <template v-if="args.content">
                {{ args.content }}
              </template>
            </ClayAlert>
        </div>
    `
    })
};
