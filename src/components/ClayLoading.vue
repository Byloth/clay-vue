<script lang="ts" setup>
    import { computed } from "vue";
    import type { PropType } from "vue";

    const props = defineProps({
        size: {
            default: "default",
            type: String as PropType<"small" | "default" | "large">
        },
        type: {
            default: "spinner",
            type: String as PropType<"spinner" | "dots" | "pulse" | "wave">
        }
    });

    const sizeValue = computed(() =>
    {
        switch (props.size)
        {
            case "small":
                return "2rem";
            case "large":
                return "5rem";
            default:
                return "3rem";
        }
    });
</script>

<template>
    <div class="clay-loading" :style="{ '--clay-loading-current-size': sizeValue }">
        <div v-if="type === 'spinner'" class="clay-loading__spinner">
            <div class="clay-loading__spinner-inner"></div>
        </div>
        <div v-else-if="type === 'dots'" class="clay-loading__dots">
            <div class="clay-loading__dot"></div>
            <div class="clay-loading__dot"></div>
            <div class="clay-loading__dot"></div>
        </div>
        <div v-else-if="type === 'pulse'" class="clay-loading__pulse">
            <div class="clay-loading__pulse-ring"></div>
            <div class="clay-loading__pulse-ring"></div>
            <div class="clay-loading__pulse-ring"></div>
        </div>
        <div v-else-if="type === 'wave'" class="clay-loading__wave">
            <div class="clay-loading__wave-bar"></div>
            <div class="clay-loading__wave-bar"></div>
            <div class="clay-loading__wave-bar"></div>
            <div class="clay-loading__wave-bar"></div>
            <div class="clay-loading__wave-bar"></div>
        </div>
    </div>
</template>

<style lang="scss">
@use "@/assets/scss/mixins";

:root {
    --clay-loading-color-primary: var(--clay-primary-color);
    --clay-loading-color-background: var(--clay-light-color);
    --clay-loading-color-shadow: oklch(from var(--clay-primary-color) calc(l - 0.25) c h);
    --clay-loading-color-highlight: var(--white);

    --clay-loading-size: 3rem;

    --clay-loading-roundness: 50%;
    --clay-loading-duration: 1s;
    --clay-loading-thickness: 3px;
}

.clay-loading {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--clay-loading-current-size, var(--clay-loading-size));
    height: var(--clay-loading-current-size, var(--clay-loading-size));

    &__spinner {
        width: 100%;
        height: 100%;
        position: relative;

        &-inner {
            width: 100%;
            height: 100%;
            border-radius: var(--clay-loading-roundness);
            position: relative;

            &::before {
                content: "";
                position: absolute;
                inset: -3px;
                border-radius: var(--clay-loading-roundness);
                background: conic-gradient(from 0deg, transparent 0deg, transparent 300deg,
                var(--clay-loading-color-primary) 300deg, var(--clay-loading-color-primary) 360deg);
                mask: radial-gradient(circle, transparent calc(50% - 3px),
                black calc(50% - 3px), black 50%, transparent 50%);
                animation: clay-loading-spinner var(--clay-loading-duration) linear infinite;
                filter: drop-shadow(0 0 8px rgba(from var(--clay-loading-color-primary) r g b / 0.4));
            }

            &::after {
                content: "";
                position: absolute;
                inset: -1px;
                border-radius: var(--clay-loading-roundness);
                background: conic-gradient(from 180deg, rgba(from var(--clay-loading-color-primary) r g b / 0.1) 0deg,
                rgba(from var(--clay-loading-color-primary) r g b / 0.3)
                120deg, transparent 240deg, transparent 360deg);
                mask: radial-gradient(circle, transparent calc(50% - 1px),
                black calc(50% - 1px), black 50%, transparent 50%);
                animation: clay-loading-spinner calc(var(--clay-loading-duration) * 0.8) linear infinite reverse;
            }
        }
    }

    &__dots {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    &__dot {
        width: 18%;
        height: 18%;
        border-radius: var(--clay-loading-roundness);
        background: linear-gradient(135deg, rgba(from var(--clay-loading-color-primary) r g b / 0.8) 0%,
        rgba(from var(--clay-loading-color-primary) r g b / 0.4) 100%);

        @include mixins.clay-shadow-elevation($color: var(--clay-loading-color-primary), $intensity: 0.6);

        position: relative;
        animation: clay-loading-dots calc(var(--clay-loading-duration) * 0.9) ease-in-out infinite;
        transform-origin: center;

        &::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: var(--clay-loading-roundness);
            background: radial-gradient(circle at 30% 30%,
            rgba(from var(--clay-loading-color-highlight) r g b / 0.4) 0%, transparent 60%);
        }

        &:nth-child(1) {
            animation-delay: 0s;
        }
        &:nth-child(2) {
            animation-delay: calc(var(--clay-loading-duration) * 0.2);
        }
        &:nth-child(3) {
            animation-delay: calc(var(--clay-loading-duration) * 0.4);
        }
    }

    &__pulse {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__pulse-ring {
        position: absolute;
        border-radius: var(--clay-loading-roundness);
        border: 2px solid transparent;
        background: radial-gradient(circle, transparent 50%,
        rgba(from var(--clay-loading-color-primary) r g b / 0.3) 51%,
        rgba(from var(--clay-loading-color-primary) r g b / 0.1) 100%);
        animation: clay-loading-pulse calc(var(--clay-loading-duration) * 2)
        cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;

        &:nth-child(1) {
            animation-delay: 0s;
        }
        &:nth-child(2) {
            animation-delay: calc(var(--clay-loading-duration) * 0.66);
        }
        &:nth-child(3) {
            animation-delay: calc(var(--clay-loading-duration) * 1.33);
        }
    }

    &__wave {
        display: flex;
        gap: 0.2rem;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    &__wave-bar {
        width: 12%;
        height: 30%;
        border-radius: 2px;
        background: linear-gradient(to top, var(--clay-loading-color-primary) 0%,
        rgba(from var(--clay-loading-color-primary) r g b / 0.7) 50%,
        rgba(from var(--clay-loading-color-primary) r g b / 0.4) 100%);

        @include mixins.clay-shadow-elevation($color: var(--clay-loading-color-primary), $intensity: 0.4);

        animation: clay-loading-wave calc(var(--clay-loading-duration) * 1.2) ease-in-out infinite;
        transform-origin: center;

        &:nth-child(1) {
            animation-delay: 0s;
        }
        &:nth-child(2) {
            animation-delay: calc(var(--clay-loading-duration) * 0.1);
        }
        &:nth-child(3) {
            animation-delay: calc(var(--clay-loading-duration) * 0.2);
        }
        &:nth-child(4) {
            animation-delay: calc(var(--clay-loading-duration) * 0.3);
        }
        &:nth-child(5) {
            animation-delay: calc(var(--clay-loading-duration) * 0.4);
        }
    }
}

@keyframes clay-loading-spinner {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

@keyframes clay-loading-dots {
    0%,
    60%,
    100% {
        transform: scale(0.8);
        opacity: 0.5;
    }
    30% {
        transform: scale(1.2);
        opacity: 1;
    }
}

@keyframes clay-loading-pulse {
    0% {
        width: 20%;
        height: 20%;
        opacity: 0.8;
        transform: scale(1);
    }
    50% {
        opacity: 0.4;
    }
    100% {
        width: 100%;
        height: 100%;
        opacity: 0;
        transform: scale(1.1);
    }
}

@keyframes clay-loading-wave {
    0%,
    40%,
    100% {
        transform: scaleY(0.4);
        opacity: 0.6;
    }
    20% {
        transform: scaleY(1);
        opacity: 1;
    }
}

@media (prefers-color-scheme: dark) {
    :root {
        --clay-loading-color-background: var(--clay-dark-color);
        --clay-loading-color-shadow: rgba(0, 0, 0, 0.6);
        --clay-loading-color-highlight: rgba(255, 255, 255, 0.9);
    }

    .clay-loading {
        &__spinner-inner {
            &::before {
                filter: drop-shadow(0 0 12px rgba(from var(--clay-loading-color-primary) r g b / 0.6));
            }
        }

        &__dot {
            @include mixins.clay-shadow-elevation($color: var(--clay-loading-color-primary), $intensity: 0.8);
        }

        &__wave-bar {
            @include mixins.clay-shadow-elevation($color: var(--clay-loading-color-primary), $intensity: 0.6);
        }

        &__pulse-ring {
            background: radial-gradient(circle, transparent 50%,
            rgba(from var(--clay-loading-color-primary) r g b / 0.4) 51%,
            rgba(from var(--clay-loading-color-primary) r g b / 0.2) 100%);
        }
    }
}
</style>
