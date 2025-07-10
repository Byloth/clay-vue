<script setup lang="ts">
    import { computed } from "vue";

    const value = defineModel({
        type: String,
        default: ""
    });

    const props = defineProps({
        id: {
            type: String,
            required: true
        },
        small: {
            type: Boolean,
            default: false
        },
        large: {
            type: Boolean,
            default: false
        }
    });

    const classes = computed(() => ({
        "clay-input--small": props.small,
        "clay-input--large": props.large
    }));
</script>

<template>
    <input :id="id"
           v-model="value"
           class="clay-input"
           :class="classes" />
</template>

<style lang="scss">
    :root
    {
        --clay-input-color-background: oklch(from var(--clay-light-color) calc(l + 0.0625) c h);
        --clay-input-color-border: var(--clay-primary-color);
        --clay-input-color-outline: oklch(from var(--clay-primary-color) l c calc(h + 180));
        --clay-input-color-shadow: oklch(from var(--clay-primary-color) calc(l - 0.25) c h);

        --clay-input-spacing-x: 1em;
        --clay-input-spacing-y: 0.5em;
        --clay-input-spacing: var(--clay-input-spacing-y) var(--clay-input-spacing-x);

        --clay-input-roundness: var(--clay-input-spacing-x);
    }

    .clay-input
    {
        background: var(--clay-input-color-background);
        border: none;
        border-radius: var(--clay-input-roundness);
        box-shadow: 0 0 0 1px rgba(from var(--clay-input-color-border) r g b / 1),
                    inset 0 0.25em 0.25em 0 rgba(from var(--clay-input-color-shadow) r g b / 0.25);

        color: var(--black);
        font-family: inherit;
        outline: none;
        padding: var(--clay-input-spacing);
        padding-top: calc(var(--clay-input-spacing-y) + 0.25em);
        transition: background-color var(--clay-ease-duration) var(--clay-ease-function),
                    border-color var(--clay-ease-duration) var(--clay-ease-function),
                    box-shadow var(--clay-ease-duration) var(--clay-ease-function),
                    color var(--clay-ease-duration) var(--clay-ease-function),
                    padding var(--clay-ease-duration) var(--clay-ease-function),
                    transform var(--clay-ease-duration) var(--clay-ease-function);

        &::placeholder
        {
            color: var(--black);
            opacity: 0.5;
            transition: color var(--clay-ease-duration) var(--clay-ease-function),
                        opacity var(--clay-ease-duration) var(--clay-ease-function);
        }

        &:hover
        {
            &::placeholder
            {
                opacity: 0.25;
            }
        }
        &:focus
        {
            --clay-input-color-shadow: oklch(from var(--clay-input-color-outline) calc(l - 0.25) c h);

            border-color: var(--clay-input-color-outline);
            box-shadow: 0 0 0 0.15em var(--clay-input-color-outline),
                        inset 0 0 0.25em 0.25em rgba(from var(--clay-input-color-outline) r g b / 0.125),
                        0 0 0.35em 0.35em rgba(from var(--clay-input-color-outline) r g b / 0.25);

            padding-top: var(--clay-input-spacing-y);
            transform: translateY(0.333em) scale(1.1);

            &::placeholder
            {
                opacity: 0.25;
            }
        }

        &.clay-input--small
        {
            font-size: 0.75em;
        }
        &.clay-input--large
        {
            font-size: 1.25em;
        }
    }

    @media (prefers-color-scheme: dark)
    {
        :root
        {
            --clay-input-color-background: oklch(from var(--clay-dark-color) calc(l + 0.0625) c h);
            --clay-input-color-border: var(--black);
            --clay-input-color-shadow: var(--black);
        }

        .clay-input
        {
            color: var(--white);

            &::placeholder
            {
                color: var(--white);
            }
        }
    }
</style>
