<script lang="ts" setup>
    import FontAwesome from "./utils/FontAwesome.vue";

    defineProps({
        prependIcon: {
            type: String,
            default: ""
        },

        text: {
            type: String,
            default: ""
        },
        subtext: {
            type: String,
            default: ""
        },

        appendIcon: {
            type: String,
            default: ""
        }
    });
</script>

<template>
    <li class="clay-list-item">
        <slot name="prepend">
            <div class="clay-list-item__prepend">
                <FontAwesome :icon="prependIcon" />
            </div>
        </slot>
        <slot name="default">
            <div class="clay-list-item__content">
                <span class="clay-list-item__text">{{ text }}</span>
                <span class="clay-list-item__subtext">{{ subtext }}</span>
            </div>
        </slot>
        <slot name="append">
            <div class="clay-list-item__append">
                <FontAwesome :icon="appendIcon" />
            </div>
        </slot>
    </li>
</template>

<style lang="scss">
    .clay-list-item
    {
        display: flex;
        list-style: none;
        padding: 0;

        & > .clay-list-item__content
        {
            align-items: start;
            display: flex;
            flex-direction: column;
            flex-grow: 1;

            & > .clay-list-item__text
            {
                color: var(--clay-text-color);
                font-weight: 500;
                transition: color var(--clay-ease-duration) var(--clay-ease-function);
            }
            & > .clay-list-item__subtext
            {
                color: var(--clay-subtext-color);
                transition: color var(--clay-ease-duration) var(--clay-ease-function);
            }
        }
    }
</style>
