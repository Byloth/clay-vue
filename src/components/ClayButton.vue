<script lang="ts" setup>
    import { computed, onMounted, ref } from "vue";
    import type { Timeout } from "@/types";

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

        window.addEventListener("mouseup", onMouseUp);
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
    @use "@/assets/scss/mixins";

    :root
    {
        --clay-button-color-background: var(--clay-primary-color);
        --clay-button-color-outline: oklch(from var(--clay-button-color-background) l c calc(h + 180));
        --clay-button-color-shadow: oklch(from var(--clay-button-color-background) calc(l - 0.25) c h);

        --clay-button-spacing-x: 1em;
        --clay-button-spacing-y: 0.5em;
        --clay-button-spacing: var(--clay-button-spacing-y) var(--clay-button-spacing-x);

        --clay-button-roundness: var(--clay-button-spacing-x);
    }

    .clay-button
    {
        background-color: var(--clay-button-color-background);
        background-image: linear-gradient(rgba(from var(--white) r g b / 0.25), rgba(from var(--black) r g b / 0.125));
        background-blend-mode: overlay;
        border: none;
        border-radius: var(--clay-button-roundness);
        box-shadow: 0 0 0 0 rgba(from var(--clay-button-color-outline) r g b / 0),
                    0 0.1em 0.2em -0.1em rgba(from var(--clay-button-color-shadow) r g b / 0.75);

        color: var(--white);
        cursor: pointer;
        font-family: inherit;
        font-size: 1em;
        font-weight: 700;
        outline: none;
        padding: var(--clay-button-spacing);
        perspective: 0;
        position: relative;
        transition: background-color var(--clay-ease-duration) var(--clay-ease-function),
                    box-shadow var(--clay-ease-duration) var(--clay-ease-function),
                    color var(--clay-ease-duration) var(--clay-ease-function),
                    transform var(--clay-ease-duration) var(--clay-ease-function);

        &::before
        {
            border-radius: var(--clay-button-roundness);
            bottom: 0;

            @include mixins.shadow-inset($intensity: 0.5);

            content: "";
            left: 0;
            mix-blend-mode: luminosity;
            position: absolute;
            right: 0;
            top: 0;
            transition: box-shadow var(--clay-ease-duration) var(--clay-ease-function);

            z-index: -1;
        }

        &:hover
        {
            box-shadow: 0 0 0 0 rgba(from var(--clay-button-color-outline) r g b / 0),
                        0 0.25em 0.25em 0 rgba(from var(--clay-button-color-shadow) r g b / 0.333);

            transform: translateY(-0.0625em) scale(1.1);
        }
        &:focus-visible
        {
            box-shadow: 0 0 0 0.15em rgba(from var(--clay-button-color-outline) r g b / 1),
                        0 0.25em 0.25em 0 rgba(from var(--clay-button-color-shadow) r g b / 0.333);

            transform: translateY(-0.0625em) scale(1.1);
        }
        &:active,
        &.clay-button--active
        {
            box-shadow: 0 0 0 0 rgba(from var(--clay-button-color-outline) r g b / 0),
                        0 0 0.125em 0 rgba(from var(--clay-button-color-shadow) r g b / 0.5),
                        0 -0.25em 0.25em 0 rgba(from var(--clay-button-color-shadow) r g b / 0.333);

            transform: translateY(0.25em) scaleX(1.2) scaleY(0.9);

            &::before
            {
                box-shadow: inset 0 0 0.125em 0 rgba(from var(--black) r g b / 0.25),
                            inset 0 0.2em 0.45em 0 rgba(from var(--black) r g b / 0),
                            inset 0 -0.2em 0.45em 0 rgba(from var(--black) r g b / 0.25);
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
        :root
        {
            --clay-button-color-background: oklch(from var(--clay-primary-color) calc(l - 0.3) c h);
            --clay-button-color-background-glow: oklch(from var(--clay-button-color-background) calc(l + 0.2) c h);
            --clay-button-color-outline: oklch(from var(--clay-button-color-background-glow) l c calc(h + 180));
            --clay-button-color-shadow: var(--black);
        }

        .clay-button
        {
            box-shadow: 0 0 0 0 rgba(from var(--clay-button-color-outline) r g b / 0),
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
                box-shadow: 0 0 0 0 rgba(from var(--clay-button-color-outline) r g b / 0),
                            0 0 0.5em 0 rgba(from var(--clay-button-color-shadow) r g b / 0.25),
                            0 0.25em 0.5em 0 rgba(from var(--clay-button-color-shadow) r g b / 0.25);
            }
            &:focus-visible
            {
                box-shadow: 0 0 0 0.15em rgba(from var(--clay-button-color-outline) r g b / 1),
                            0 0 0.5em 0 rgba(from var(--clay-button-color-shadow) r g b / 0.25),
                            0 0.25em 0.5em 0 rgba(from var(--clay-button-color-shadow) r g b / 0.25);
            }
            &:active,
            &.clay-button--active
            {
                box-shadow: 0 0 0 0 rgba(from var(--clay-button-color-outline) r g b / 0),
                            0 0 0.25em 0 rgba(from var(--clay-button-color-shadow) r g b / 0.25),
                            0 -0.25em 0.25em 0 rgba(from var(--clay-button-color-shadow) r g b / 0.25);
            }
        }
    }
</style>
