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
        "clay-textarea--small": props.small,
        "clay-textarea--large": props.large
    }));
</script>

<template>
    <textarea :id="id"
              v-model="value"
              class="clay-textarea"
              :class="classes">
    </textarea>
</template>

<style lang="scss">
    :root
    {
        --clay-textarea-color-background: oklch(from var(--clay-light-color) calc(l + 0.0625) c h);
        --clay-textarea-color-border: var(--clay-primary-color);
        --clay-textarea-color-outline: oklch(from var(--clay-primary-color) l c calc(h + 180));
        --clay-textarea-color-shadow: oklch(from var(--clay-primary-color) calc(l - 0.25) c h);

        --clay-textarea-spacing-x: 1em;
        --clay-textarea-spacing-y: 0.5em;
        --clay-textarea-spacing: var(--clay-textarea-spacing-y) var(--clay-textarea-spacing-x);

        --clay-textarea-roundness: var(--clay-textarea-spacing-x);
    }

    .clay-textarea
    {
        background: var(--clay-textarea-color-background);
        border: none;
        border-radius: var(--clay-textarea-roundness);
        border-end-end-radius: 3px;
        box-shadow: 0 0 0 1px rgba(from var(--clay-textarea-color-border) r g b / 1),
                    inset 0 0.25em 0.25em 0 rgba(from var(--clay-textarea-color-shadow) r g b / 0.25);

        color: var(--black);
        font-family: inherit;
        outline: none;
        padding: var(--clay-textarea-spacing);
        padding-top: calc(var(--clay-textarea-spacing-y) + 0.25em);
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
            --clay-textarea-color-shadow: oklch(from var(--clay-textarea-color-outline) calc(l - 0.25) c h);

            border-color: var(--clay-textarea-color-outline);
            box-shadow: 0 0 0 0.15em var(--clay-textarea-color-outline),
                        inset 0 0 0.25em 0.25em rgba(from var(--clay-textarea-color-outline) r g b / 0.125),
                        0 0 0.35em 0.35em rgba(from var(--clay-textarea-color-outline) r g b / 0.25);

            padding-top: var(--clay-textarea-spacing-y);
            transform: translateY(0.333em) scale(1.1);

            &::placeholder
            {
                opacity: 0.25;
            }
        }
    }

    .clay-textarea--small
    {
        font-size: 0.75em;
    }
    .clay-textarea--large
    {
        font-size: 1.25em;
    }

    @media (prefers-color-scheme: dark)
    {
        :root
        {
            --clay-textarea-color-background: oklch(from var(--clay-dark-color) calc(l + 0.0625) c h);
            --clay-textarea-color-border: var(--black);
            --clay-textarea-color-shadow: var(--black);
        }

        .clay-textarea
        {
            color: var(--white);

            &::placeholder
            {
                color: var(--white);
            }
        }
    }
</style>
