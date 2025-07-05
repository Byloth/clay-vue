<script lang="ts" setup>
</script>

<template>
    <div class="clay-bubble">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    @use "@/assets/scss/mixins";

    :root
    {
        --clay-bubble-color-background: var(--clay-primary-color);
        --clay-bubble-color-shadow: oklch(from var(--clay-bubble-color-background) calc(l - 0.25) c h);

        --clay-bubble-spacing-x: 1em;
        --clay-bubble-spacing-y: 0.5em;
        --clay-bubble-spacing: var(--clay-bubble-spacing-y) var(--clay-bubble-spacing-x);

        --clay-bubble-roundness: calc(var(--clay-bubble-spacing-x) + 0.2875em);
    }

    .clay-bubble
    {
        border: none;
        color: var(--black);
        display: inline-block;
        font-weight: 700;
        padding: var(--clay-bubble-spacing);
        position: relative;
        text-shadow: 0 0.125em 0.125em oklch(from var(--clay-primary-color) 30% c h / 0.5);

        &,
        &:after
        {
            background-color: oklch(from var(--clay-primary-color) 98% c h / 0.5);
            border-radius: var(--clay-bubble-roundness);
            box-shadow: inset 0 0 0.025em 0.0125em oklch(from var(--clay-primary-color) 100% c h / 0.1),
                        inset 0 0 0.05em 0.025em oklch(from var(--clay-primary-color) 100% c h / 0.5),
                        inset 0 0.1em 0.2em 0.05em oklch(from var(--clay-primary-color) 60% c h / 0.5),
                        inset 0 -0.125em 0.125em 0 oklch(from var(--clay-primary-color) 20% c h / 0.1),
                        inset -0.125em 0 0.125em 0 oklch(from var(--clay-primary-color) 20% c h / 0.4),
                        inset 0.125em 0 0.125em 0 oklch(from var(--clay-primary-color) 20% c h / 0.4),
                        inset 0 0.25em 0.5em 0.25em oklch(from var(--clay-primary-color) 30% c h / 0.6);
        }

        &:before,
        &:after
        {
            content: "";
            display: block;
            position: absolute;
        }

        &:before
        {
            inset: 0.1666em 0.375em auto;
            background: linear-gradient(
                oklch(from var(--clay-primary-color) 100% 0 h / 0.5),
                oklch(from var(--clay-primary-color) 100% c h/ 0.3),
                oklch(from var(--clay-primary-color) 98% c h / 0.05)
            );

            height: 1.125em;
            border-radius: 0.875em 0.875em 0.25em 0.25em;
            z-index: 1;
        }
        &:after
        {
            inset: 0;
            opacity: 80%;
            filter: blur(0.125em);
            translate: 0 0.5em;
            z-index: -1;
        }
    }
</style>
