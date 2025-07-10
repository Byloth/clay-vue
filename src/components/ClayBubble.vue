<script lang="ts" setup>
    import { computed } from "vue";

    const props = defineProps({
        small: {
            default: false,
            type: Boolean
        },
        large: {
            default: false,
            type: Boolean
        }
    });

    const classes = computed((): Record<string, boolean> => ({
        "clay-bubble--small": props.small,
        "clay-bubble--large": props.large
    }));
</script>

<template>
    <div class="clay-bubble" :class="classes">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    :root
    {
        --clay-bubble-color-background: oklch(from var(--clay-primary-color) 98% c h / 0.5);
        --clay-bubble-color-shadow: oklch(from var(--clay-bubble-color-background) calc(l - 0.25) c h);
        --clay-bubble-color-text: var(--black);

        --clay-bubble-spacing-x: 1em;
        --clay-bubble-spacing-y: 0.5em;
        --clay-bubble-spacing: var(--clay-bubble-spacing-y) var(--clay-bubble-spacing-x);

        --clay-bubble-roundness: calc(var(--clay-bubble-spacing-x) + 0.2875em);
    }

    .clay-bubble
    {
        background-color: var(--clay-bubble-color-background);
        background-image: linear-gradient(rgba(from var(--white) r g b / 0.25), rgba(from var(--black) r g b / 0.125));
        border: none;
        border-radius: var(--clay-bubble-roundness);
        box-shadow: 0 0.1em 0.2em -0.1em rgba(from var(--clay-bubble-color-shadow) r g b / 0.75);
        color: var(--clay-bubble-color-text);
        display: inline-block;
        font-weight: 700;
        padding: var(--clay-bubble-spacing);
        position: relative;
        perspective: 0;
        text-shadow: 0 0.125em 0.125em oklch(from var(--clay-bubble-color-background) 30% c h / 0.5);
        transition: background-color var(--clay-ease-duration) var(--clay-ease-function),
                    box-shadow var(--clay-ease-duration) var(--clay-ease-function),
                    color var(--clay-ease-duration) var(--clay-ease-function),
                    text-shadow var(--clay-ease-duration) var(--clay-ease-function);

        &::before,
        &::after
        {
            content: "";
            position: absolute;
        }

        &::before
        {
            background-image: linear-gradient(
                oklch(from var(--clay-bubble-color-background) 100% 0 h / 0.5),
                oklch(from var(--clay-bubble-color-background) 100% c h/ 0.3),
                oklch(from var(--clay-bubble-color-background) 98% c h / 0.05)
            );

            height: 1.125em;
            inset: 0.1666em 0.375em auto;
            border-radius: 0.875em 0.875em 0.25em 0.25em;
            opacity: 1;
            position: absolute;
            transition: box-shadow var(--clay-ease-duration) var(--clay-ease-function),
                        opacity var(--clay-ease-duration) var(--clay-ease-function);

            z-index: 1;
        }

        &,
        &::after
        {
            border-radius: var(--clay-bubble-roundness);
            box-shadow: inset 0 0 0.025em 0.0125em oklch(from var(--clay-bubble-color-background) 100% c h / 0.1),
                        inset 0 0 0.05em 0.025em oklch(from var(--clay-bubble-color-background) 100% c h / 0.5),
                        inset 0 0.1em 0.2em 0.05em oklch(from var(--clay-bubble-color-background) 60% c h / 0.5),
                        inset 0 -0.125em 0.125em 0 oklch(from var(--clay-bubble-color-background) 20% c h / 0.1),
                        inset -0.125em 0 0.125em 0 oklch(from var(--clay-bubble-color-background) 20% c h / 0.4),
                        inset 0.125em 0 0.125em 0 oklch(from var(--clay-bubble-color-background) 20% c h / 0.4),
                        inset 0 0.25em 0.5em 0.25em oklch(from var(--clay-bubble-color-background) 30% c h / 0.6);
        }
        &::after
        {
            inset: 0;
            opacity: 80%;
            filter: blur(0.125em);
            transition: background-color var(--clay-ease-duration) var(--clay-ease-function),
                        box-shadow var(--clay-ease-duration) var(--clay-ease-function);

            translate: 0 0.5em;
            z-index: -1;
        }

        &.clay-bubble--small
        {
            font-size: 0.75em;
        }
        &.clay-bubble--large
        {
            font-size: 1.5em;
        }
    }

    @media (prefers-color-scheme: dark)
    {
        :root
        {
            --clay-bubble-color-background: oklch(from var(--clay-primary-color) 60% c h / 0.5);
            --clay-bubble-color-text: var(--white);
        }

        .clay-bubble
        {
            &
            {
                box-shadow: inset 0 0 0.025em 0.0125em oklch(from var(--black) 0% c h / 0.1),
                            inset 0 0 0.05em 0.025em oklch(from var(--black) 0% c h / 0.5),
                            inset 0 0.1em 0.2em 0.05em oklch(from var(--black) 20% c h / 0.5),
                            inset 0 -0.125em 0.125em 0 oklch(from var(--black) 20% c h / 0.1),
                            inset -0.125em 0 0.125em 0 oklch(from var(--black) 20% c h / 0.4),
                            inset 0.125em 0 0.125em 0 oklch(from var(--black) 20% c h / 0.4),
                            inset 0 0.25em 0.5em 0.25em oklch(from var(--clay-bubble-color-background) 30% c h / 0.6);
            }

            &::before
            {
                opacity: 0.25;
            }
            &::after
            {
                box-shadow: inset 0 0 0.025em 0.0125em oklch(from var(--black) 0% c h / 0.1),
                            inset 0 0 0.05em 0.025em oklch(from var(--black) 0% c h / 0.5),
                            inset 0 0.1em 0.2em 0.05em oklch(from var(--black) 20% c h / 0.5),
                            inset 0 -0.125em 0.125em 0 oklch(from var(--black) 20% c h / 0.1),
                            inset -0.125em 0 0.125em 0 oklch(from var(--black) 20% c h / 0.4),
                            inset 0.125em 0 0.125em 0 oklch(from var(--black) 20% c h / 0.4),
                            inset 0 0.25em 0.5em 0.25em oklch(from var(--black) 0% c h / 0.6);
            }
        }
    }
</style>
