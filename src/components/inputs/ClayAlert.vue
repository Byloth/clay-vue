<script lang="ts" setup>
    import { computed } from "vue";

    import ClayCard from "@/components/ClayCard.vue";

    const props = defineProps({
        title: {
            default: "",
            type: String
        },
        icon: {
            default: "",
            type: String
        },

        variant: {
            default: "primary",
            type: String,
            validator: (value: string): boolean =>
                ["primary", "success", "warning", "danger", "info"].includes(value)
        },

        dismissible: {
            default: false,
            type: Boolean
        }
    });
    defineEmits(["dismiss"]);

    const classes = computed((): Record<string, boolean> => ({
        [`clay-alert--${props.variant}`]: true,
        "clay-alert--dismissible": props.dismissible,
        "clay-alert--row": !(props.title),
        "clay-alert--column": !!(props.title)
    }));
</script>

<template>
    <ClayCard class="clay-alert"
              :class="classes"
              role="alert">
        <h3 v-if="title" class="clay-alert__heading">
            <span v-if="icon"
                  class="clay-alert__icon fa-solid"
                  :class="`fa-${icon}`"
                  aria-hidden="true"></span>
            {{ title }}
        </h3>
        <span v-else-if="icon"
              class="clay-alert__icon fa-solid"
              :class="`fa-${icon}`"
              aria-hidden="true"></span>

        <div class="clay-alert__body">
            <slot></slot>
        </div>

        <button v-if="dismissible"
                class="clay-alert__close"
                type="button"
                aria-label="Dismiss alert"
                @click="$emit('dismiss', $event)">
            <span class="fa-solid fa-xmark" aria-hidden="true"></span>
        </button>
    </ClayCard>
</template>

<style lang="scss">
    @use "@/assets/scss/functions";
    @use "@/assets/scss/mixins";

    :root
    {
        --clay-alert-color-background: var(--clay-light-color);
        --clay-alert-color: var(--clay-primary-color);

        --clay-alert-opacity: 1.0;

        --clay-alert-spacing-x: 1.25em;
        --clay-alert-spacing-y: 1em;
        --clay-alert-spacing: var(--clay-alert-spacing-y) var(--clay-alert-spacing-x);
        --clay-alert-gap: 0.75em;

        --clay-alert-roundness: var(--clay-alert-spacing-x);
    }

    .clay-alert
    {
        --clay-alert-color-shadow: var(--clay-alert-color);
        --clay-alert-color-outline: oklch(from var(--clay-primary-color) l c calc(h + 180));

        @include mixins.clay-shadow-elevation($color: var(--clay-alert-color-shadow));

        align-items: center;
        background-color: rgba(from var(--clay-alert-color-background) r g b / var(--clay-alert-opacity));
        background-image: linear-gradient(rgba(from var(--white) r g b / 0.25),
                                            rgba(from var(--black) r g b / 0.125));
        background-blend-mode: overlay;
        border-radius: var(--clay-alert-roundness);
        box-sizing: border-box;
        color: var(--clay-alert-color-text);
        display: flex;
        gap: var(--clay-alert-gap);
        margin: 0;
        padding: var(--clay-alert-spacing);
        perspective: 0;
        position: relative;
        text-align: left;
        transition: background-color var(--clay-ease-duration) var(--clay-ease-function),
                    box-shadow var(--clay-ease-duration) var(--clay-ease-function),
                    color var(--clay-ease-duration) var(--clay-ease-function);

        &::before // puff dell'alert
        {
            @include mixins.clay-shadow-puff($color: var(--clay-alert-color));

            border-radius: var(--clay-alert-roundness);
            content: "";
            inset: 0;
            mix-blend-mode: multiply;
            position: absolute;

            z-index: -1;
        }

        &__heading // serve per il titolo dell'alert.
        {
            align-items: center;
            display: flex;
            font-size: 1.15em;
            font-weight: 700;
            gap: 0.4em;
            line-height: 1.2;
            margin: 0;
        }

        &__icon // colore icona alert
        {
            color: var(--clay-alert-color);
        }

        &__close // il dismissable
        {
            align-items: center;
            appearance: none;
            background: none;
            border: none;
            color: var(--clay-alert-color);
            cursor: pointer;
            display: flex;
            font-size: 1em;
            justify-content: center;
            line-height: 1;
            margin: 0;
            outline: none;
            opacity: 0.5;
            padding: 0;
            position: absolute;
            right: var(--clay-alert-spacing-x);
            top: var(--clay-alert-spacing-y);

            transition: color var(--clay-ease-duration) var(--clay-ease-function),
                        opacity var(--clay-ease-duration) var(--clay-ease-function),
                        transform var(--clay-ease-duration) var(--clay-ease-function);

            &:hover
            {
                opacity: 0.9;
                transform: scale(1.05);
            }
            &:focus-visible
            {
                border-radius: 0.25em;
                box-shadow: functions.clay-outline($color: var(--clay-alert-color-outline), $width: 0.15em);
            }
            &:active
            {
                transform: scale(0.9);
            }
        }

        &--row
        {
            flex-direction: row;
        }
        &--column
        {
            align-items: stretch;
            flex-direction: column;
            gap: 0.4em;
        }

        &--success
        {
            --clay-alert-color: var(--clay-success-color);
        }
        &--warning
        {
            --clay-alert-color: var(--clay-warning-color);
        }
        &--danger
        {
            --clay-alert-color: var(--clay-danger-color);
        }
        &--info
        {
            --clay-alert-color: var(--clay-info-color);
        }

        &--dismissible
        {
            padding-right: calc(var(--clay-alert-spacing-x) + var(--clay-alert-gap) + 1.75em);
        }
    }

    @media (prefers-color-scheme: dark)
    {
        :root
        {
            --clay-alert-color-background: var(--clay-dark-color);
        }

        .clay-alert
        {
            --clay-alert-color-shadow: var(--black);

            &::before
            {
                @include mixins.clay-shadow-puff();
            }
        }
    }
</style>
