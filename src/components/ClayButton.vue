<script lang="ts" setup>
    import { computed, onMounted, ref } from "vue";
    import { useEventListener } from "@vueuse/core";

    import type { Timeout } from "../types";

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

    const active = ref(false);
    const classes = computed((): Record<string, boolean> => ({
        "clay-button--small": props.small,
        "clay-button--large": props.large,
        "clay-button--active": active.value
    }));

    const $el = ref<HTMLButtonElement | null>(null);

    let _easeDuration = 333;
    let _timestamp = 0;
    let _timeoutId: Timeout | null = null;

    const onMouseDown = (event: MouseEvent): void =>
    {
        active.value = true;

        _timestamp = event.timeStamp;
    };
    const onMouseUp = (event: MouseEvent): void =>
    {
        const elapsed = event.timeStamp - _timestamp;
        if (elapsed > _easeDuration)
        {
            active.value = false;

            return;
        }

        if (_timeoutId) { clearTimeout(_timeoutId); }
        _timeoutId = setTimeout((): void =>
        {
            active.value = false;
            _timeoutId = null;

        }, (_easeDuration - elapsed));
    };

    onMounted((): void =>
    {
        // eslint-disable-next-line no-console
        if (!($el.value)) { return console.warn("The button element is not mounted yet."); }

        const computedStyle = window.getComputedStyle($el.value);
        const propertyValue = computedStyle.getPropertyValue("--clay-ease-duration");

        _easeDuration = parseFloat(propertyValue);
        if (_easeDuration < 1) { _easeDuration *= 1000; }

        useEventListener("mouseup", onMouseUp);
    });
</script>

<template>
    <button ref="$el"
            class="clay-button"
            :class="classes"
            @mousedown="onMouseDown">
        <slot></slot>
    </button>
</template>

<style lang="scss">
    @use "@/assets/scss/functions";
    @use "@/assets/scss/layers";
    @use "@/assets/scss/mixins";

    @layer clay.theme
    {
        :root
        {
            --clay-button-color-background: var(--clay-color-primary);
            --clay-button-color-outline: oklch(from var(--clay-button-color-background) l c calc(h + 180));
            --clay-button-color-shadow: oklch(from var(--clay-button-color-background) calc(l - 0.25) c h);
            --clay-button-color-text: #FFFFFF;

            --clay-button-spacing-x: 1em;
            --clay-button-spacing-y: 0.5em;
            --clay-button-spacing: var(--clay-button-spacing-y) var(--clay-button-spacing-x);

            --clay-button-roundness: var(--clay-button-spacing-x);

            --clay-button-scaling: 1.1;
            --clay-button-translation: 0 -0.0625em;
        }

        @media (prefers-color-scheme: dark)
        {
            :root
            {
                --clay-button-color-background: oklch(from var(--clay-color-primary) calc(l - 0.3) c h);
                --clay-button-color-background-glow: oklch(from var(--clay-button-color-background) calc(l + 0.2) c h);
                --clay-button-color-outline: oklch(from var(--clay-button-color-background-glow) l c calc(h + 180));
                --clay-button-color-shadow: #000000;
            }
        }
    }

    @layer clay.components
    {
        .clay-button
        {
            background-color: var(--clay-button-color-background);
            background-image: linear-gradient(rgba(from #FFFFFF r g b / 0.25),
                                              rgba(from #000000 r g b / 0.125));
            background-blend-mode: overlay;
            border: none;
            border-radius: var(--clay-button-roundness);
            box-shadow: functions.clay-outline($color: var(--clay-button-color-outline), $opacity: 0),
                        0 0.1em 0.2em -0.1em rgba(from var(--clay-button-color-shadow) r g b / 0.75);

            color: var(--clay-button-color-text);
            cursor: pointer;
            font-family: inherit;
            font-size: 1em;
            font-weight: bold;
            outline: none;
            padding: var(--clay-button-spacing);
            perspective: 0;
            position: relative;
            transition: background-color var(--clay-ease-duration) var(--clay-ease-function),
                        box-shadow var(--clay-ease-duration) var(--clay-ease-function),
                        color var(--clay-ease-duration) var(--clay-ease-function),
                        scale var(--clay-ease-duration) var(--clay-ease-function),
                        translate var(--clay-ease-duration) var(--clay-ease-function);

            &::before
            {
                @include mixins.clay-shadow-puff($intensity: 0.5);

                border-radius: var(--clay-button-roundness);
                content: "";
                inset: 0;
                mix-blend-mode: luminosity;
                position: absolute;
                transition: box-shadow var(--clay-ease-duration) var(--clay-ease-function);
                z-index: -1;
            }

            &:hover
            {
                box-shadow: functions.clay-outline($color: var(--clay-button-color-outline), $opacity: 0),
                            0 0.25em 0.25em 0 rgba(from var(--clay-button-color-shadow) r g b / 0.333);

                scale: var(--clay-button-scaling);
                translate: var(--clay-button-translation);
            }
            &:focus-visible
            {
                box-shadow: functions.clay-outline($color: var(--clay-button-color-outline), $width: 0.15em),
                            0 0.25em 0.25em 0 rgba(from var(--clay-button-color-shadow) r g b / 0.333);

                scale: var(--clay-button-scaling);
                translate: var(--clay-button-translation);
            }
            &:active,
            &.clay-button--active
            {
                --clay-button-scaling: 1.2 0.9;
                --clay-button-translation: 0 0.25em;

                box-shadow: functions.clay-outline($color: var(--clay-button-color-outline), $opacity: 0),
                            0 0 0.125em 0 rgba(from var(--clay-button-color-shadow) r g b / 0.5),
                            0 -0.25em 0.25em 0 rgba(from var(--clay-button-color-shadow) r g b / 0.333);

                &::before
                {
                    box-shadow: inset 0 0 0.125em 0 rgba(from #000000 r g b / 0.25),
                                inset 0 0.2em 0.45em 0 rgba(from #000000 r g b / 0),
                                inset 0 -0.2em 0.45em 0 rgba(from #000000 r g b / 0.25);
                }
            }

            &.clay-button--small
            {
                font-size: 0.75em;
            }
            &.clay-button--large
            {
                font-size: 1.5em;
            }
        }

        @media (prefers-color-scheme: dark)
        {
            .clay-button
            {
                box-shadow: functions.clay-outline($color: var(--clay-button-color-outline), $opacity: 0),
                            0 0.1em 0.2em -0.1em rgba(from var(--clay-button-color-shadow) r g b / 0.5);
                &:hover,
                &:focus-visible,
                &:active,
                &.clay-button--active
                {
                    --clay-button-color-background: var(--clay-button-color-background-glow);
                    --clay-button-color-shadow: var(--clay-button-color-background-glow);
                }

                &:hover
                {
                    box-shadow: functions.clay-outline($color: var(--clay-button-color-outline), $opacity: 0),
                                0 0 0.5em 0 rgba(from var(--clay-button-color-shadow) r g b / 0.25),
                                0 0.25em 0.5em 0 rgba(from var(--clay-button-color-shadow) r g b / 0.25);
                }
                &:focus-visible
                {
                    box-shadow: functions.clay-outline($color: var(--clay-button-color-outline), $width: 0.15em),
                                0 0 0.5em 0 rgba(from var(--clay-button-color-shadow) r g b / 0.25),
                                0 0.25em 0.5em 0 rgba(from var(--clay-button-color-shadow) r g b / 0.25);
                }
                &:active,
                &.clay-button--active
                {
                    box-shadow: functions.clay-outline($color: var(--clay-button-color-outline), $opacity: 0),
                                0 0 0.25em 0 rgba(from var(--clay-button-color-shadow) r g b / 0.25),
                                0 -0.25em 0.25em 0 rgba(from var(--clay-button-color-shadow) r g b / 0.25);
                }
            }
        }
    }
</style>
