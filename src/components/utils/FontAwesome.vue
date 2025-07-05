<script lang="ts" setup>
    import { computed } from "vue";
    import type { PropType } from "vue";

    const props = defineProps({
        icon: {
            type: String,
            required: true
        },

        flip: {
            default: "",
            type: String as PropType<"horizontal" | "vertical" | "both">
        },
        rotate: {
            default: 0,
            type: Number as PropType<90 | 180 | 270>
        },
        size: {
            default: "",
            type: String as PropType<"xs" | "sm" | "lg" | "2x" | "3x" | "5x" | "7x" | "10x">
        },

        fixedWidth: {
            type: Boolean,
            default: false
        },
        spin: {
            type: Boolean,
            default: false
        }
    });

    const classes = computed((): Record<string, boolean> => ({
        [`fa-${props.icon}`]: true,

        [`fa-flip-${props.flip}`]: !!(props.flip),
        [`fa-rotate-${props.rotate}`]: !!(props.rotate),
        [`fa-${props.size}`]: !!(props.size),

        "fa-fw": props.fixedWidth,
        "fa-spin": props.spin
    }));
</script>

<template>
    <span class="fa" :class="classes"></span>
</template>
