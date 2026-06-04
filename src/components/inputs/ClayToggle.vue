<script setup lang="ts">
    // import { onMounted, onUnmounted, ref } from "vue";

    // const $el = ref<HTMLLabelElement | null>(null);

    // let isDragging = false;

    // const onKnobDown = (): void =>
    // {
    //     if (isDragging) { return; }

    //     isDragging = true;
    //     // eslint-disable-next-line no-console
    //     console.log("Knob pressed");
    // };
    // const onKnobMove = (): void =>
    // {
    //     if (!isDragging) { return; }
    //     // eslint-disable-next-line no-console
    //     console.log("Knob moved");
    // };
    // const onKnobUp = (): void =>
    // {
    //     if (!isDragging) { return; }

    //     isDragging = false;
    //     // eslint-disable-next-line no-console
    //     console.log("Knob released");
    // };

    // onMounted(() =>
    // {
    //     const knob = $el.value!.childNodes[1].childNodes[0];

    //     window.addEventListener("mouseup", onKnobUp);
    //     window.addEventListener("mousemove", onKnobMove);
    //     window.addEventListener("mouseleave", onKnobDown);
    // });
    // onUnmounted(() =>
    // {
    //     window.removeEventListener("mouseup", onKnobUp);
    //     window.removeEventListener("mousemove", onKnobMove);
    //     window.removeEventListener("mouseleave", onKnobDown);
    // });
</script>

<template>
    <label ref="$el" class="clay-toggle">
        <input type="checkbox" class="clay-toggle--input" />
        <span class="clay-toggle--slider">
            <span class="clay-toggle--knob"></span>
        </span>
    </label>
</template>

<style lang="scss">
    @use "@/assets/scss/mixins";
    @use "@/assets/scss/functions";

    :root
    {
        --clay-toggle-color-off: oklch(from var(--clay-light-color) calc(l - 0.15) c h);
        --clay-toggle-color-on: var(--clay-primary-color);
        --clay-toggle-color-knob: var(--white);
        --clay-toggle-color-knob-shadow: oklch(from var(--clay-toggle-color-on) calc(l - 0.25) c h);
        --clay-toggle-color-shadow: oklch(from var(--black) calc(l - 0.25) c h);
        --clay-toggle-color-outline: oklch(from var(--clay-primary-color) l c calc(h + 180));

        --clay-toggle-shadow: inset 0 0.25em 0.25em 0 rgba(from var(--clay-toggle-color-shadow) r g b / 0.125),
                              inset 0 -0.25em 0.25em 0 rgba(from var(--white) r g b / 0.25);

        --clay-toggle-width: 4em;
        --clay-toggle-height: 2em;
        --clay-toggle-knob-size: 1.5em;
        --clay-toggle-knob-offset: 0.25em;
    }

    .clay-toggle
    {
        cursor: pointer;
        display: inline-block;
        height: var(--clay-toggle-height);
        position: relative;
        width: var(--clay-toggle-width);
        transition: transform var(--clay-ease-duration) var(--clay-ease-function);

        .clay-toggle--input
        {
            height: 0;
            opacity: 0;
            position: absolute;
            width: 0;
        }

        .clay-toggle--slider
        {
            background-color: var(--clay-toggle-color-off);
            border-radius: var(--clay-toggle-height);
            box-shadow: var(--clay-toggle-shadow);
            bottom: 0;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
            transition: background-color var(--clay-ease-duration) var(--clay-ease-function),
                        box-shadow var(--clay-ease-duration) var(--clay-ease-function);

            & > .clay-toggle--knob
            {
                background-color: var(--clay-toggle-color-knob);
                --clay-toggle-color-knob-shadow: oklch(from var(--clay-toggle-color-knob) calc(l - 0.25) c h );
                border-radius: 50%;
                bottom: var(--clay-toggle-knob-offset);
                content: "";
                height: var(--clay-toggle-knob-size);
                left: var(--clay-toggle-knob-offset);
                position: absolute;
                transition: transform var(--clay-ease-duration) var(--clay-ease-function);
                width: var(--clay-toggle-knob-size);
                @include mixins.clay-shadow-elevation($intensity: 0.125);
                transition: transform var(--clay-ease-duration) var(--clay-ease-function),
                        box-shadow var(--clay-ease-duration) var(--clay-ease-function);

                &::before
                {
                    border-radius: 50%;
                    bottom: 0;
                    left: 0;
                    mix-blend-mode: luminosity;
                    position: absolute;
                    right: 0;
                    top: 0;
                    content: "";
                    @include mixins.clay-shadow-puff($intensity: 0.5);
                }
            }
        }

        .clay-toggle--input:checked + .clay-toggle--slider
        {
            background-color: var(--clay-toggle-color-on);

            & > .clay-toggle--knob
            {
                transform: translateX(
                    calc(var(--clay-toggle-width) - var(--clay-toggle-knob-size) - 2 * var(--clay-toggle-knob-offset))
                );
            }
        }

        .clay-toggle--input:focus-visible + .clay-toggle--slider
        {
            box-shadow: var(--clay-toggle-shadow),
                        functions.clay-outline($color: var(--clay-toggle-color-outline), $width: 0.2em);
        }

        &:hover .clay-toggle--slider > .clay-toggle--knob
        {
            @include mixins.clay-shadow-elevation($intensity: 0.25);
        }
    }

    &:focus-visible
        {
            box-shadow: functions.clay-outline($color: var(--clay-toggle-color-outline), $width: 0.15em),
                        0 0.25em 0.25em 0 rgba(from var(--clay-toggle-color-shadow) r g b / 0.333);

            transform: translateY(-0.0625em) scale(1.1);
        }

    @media (prefers-color-scheme: dark)
    {
        :root
        {
            --clay-toggle-color-off: oklch(from var(--clay-dark-color) calc(l + 0.15) c h);
            --clay-toggle-color-on: oklch(from var(--clay-primary-color) calc(l - 0.2) c h);
        }
    }
</style>
