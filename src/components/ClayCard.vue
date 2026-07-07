<script lang="ts" setup>
    import { computed } from "vue";
    import type { PropType } from "vue";

    const props = defineProps({
        elevation: {
            default: "default",
            type: String as PropType<"none" | "low" | "default" | "high">
        },
        glass: {
            default: false,
            type: Boolean
        }
    });

    const classes = computed((): Record<string, boolean> => ({
        "clay-card--glass": props.glass,

        "clay-card--elevation-none": props.elevation === "none",
        "clay-card--elevation-low": props.elevation === "low",
        "clay-card--elevation-high": props.elevation === "high"
    }));
</script>

<template>
    <div class="clay-card" :class="classes">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    @use "@/assets/scss/layers";
    @use "@/assets/scss/mixins";

    @layer clay.theme
    {
        :root
        {
            --clay-card-color-background: var(--clay-color-light);
            --clay-card-color-shadow: oklch(from var(--clay-color-primary) calc(l - 0.25) c h);

            --clay-card-opacity: 1.0;

            --clay-card-spacing-x: 1em;
            --clay-card-spacing-y: 0.5em;
            --clay-card-spacing: var(--clay-card-spacing-y) var(--clay-card-spacing-x);

            --clay-card-roundness: var(--clay-card-spacing-x);
        }

        @media (prefers-color-scheme: dark)
        {
            :root
            {
                --clay-card-color-background: var(--clay-color-dark);
                --clay-card-color-shadow: #000000;
            }
        }
    }

    @layer clay.components
    {
        .clay-card
        {
            background-color: rgba(from var(--clay-card-color-background) r g b / var(--clay-card-opacity));
            background-image: linear-gradient(rgba(from #FFFFFF r g b / 0.25),
                                              rgba(from #000000 r g b / 0.125));
            background-blend-mode: overlay;
            border-radius: var(--clay-card-roundness);

            @include mixins.clay-shadow-elevation($color: var(--clay-card-color-shadow));

            padding: var(--clay-card-spacing);
            perspective: 0;
            position: relative;
            transition: background-color var(--clay-ease-duration) var(--clay-ease-function),
                        box-shadow var(--clay-ease-duration) var(--clay-ease-function);

            &::before
            {
                @include mixins.clay-shadow-puff($color: var(--clay-color-primary));

                border-radius: var(--clay-card-roundness);
                content: "";
                inset: 0;
                mix-blend-mode: multiply;
                position: absolute;
                transition: box-shadow var(--clay-ease-duration) var(--clay-ease-function);
                z-index: -1;
            }

            &.clay-card--elevation-none
            {
                @include mixins.clay-shadow-elevation($color: var(--clay-card-color-shadow), $intensity: 0.125);
            }
            &.clay-card--elevation-low
            {
                @include mixins.clay-shadow-elevation($color: var(--clay-card-color-shadow), $intensity: 0.5);
            }
            &.clay-card--elevation-high
            {
                @include mixins.clay-shadow-elevation($color: var(--clay-card-color-shadow), $intensity: 2);
            }

            &.clay-card--glass
            {
                --clay-card-color-background: var(--clay-color-light);
                --clay-card-color-shadow: oklch(from var(--clay-card-color-background) calc(l - 0.50) c h);

                --clay-card-blur: 0.5em;
                --clay-card-opacity: 0.5;

                backdrop-filter: blur(var(--clay-card-blur)) saturate(180%);

                &::before
                {
                    @include mixins.clay-shadow-puff($intensity: 0.5, $color: var(--clay-card-color-shadow));
                }
            }
        }

        @media (prefers-color-scheme: dark)
        {
            .clay-card
            {
                &::before
                {
                    @include mixins.clay-shadow-puff();
                }

                &.clay-card--glass
                {
                    --clay-card-color-background: var(--clay-color-dark);
                    --clay-card-color-shadow: #000000;
                }
            }
        }
    }
</style>
