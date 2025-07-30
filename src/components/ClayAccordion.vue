<script lang="ts" setup>
    import { computed, ref } from "vue";
    import type { PropType } from "vue";

    interface AccordionItem {
        id: string;
        title: string;
        content: string;
        disabled?: boolean;
    }

    const props = defineProps({
        items: {
            type: Array as PropType<AccordionItem[]>,
            required: true
        },
        multiple: {
            default: false,
            type: Boolean
        },
        disabled: {
            default: false,
            type: Boolean
        }
    });

    const emit = defineEmits<{
        toggle: [id: string, isOpen: boolean];
    }>();

    const openItems = ref<Set<string>>(new Set());

    const classes = computed((): Record<string, boolean> => ({
        "clay-accordion--multiple": props.multiple,
        "clay-accordion--disabled": props.disabled
    }));

    const isItemOpen = (id: string): boolean =>
    {
        return openItems.value.has(id);
    };

    const toggleItem = (id: string): void =>
    {
        if (props.disabled) { return; }

        const item = props.items.find((i) => i.id === id);
        if (item?.disabled) { return; }

        const isCurrentlyOpen = openItems.value.has(id);

        if (!props.multiple)
        {
            openItems.value.clear();
        }

        if (isCurrentlyOpen)
        {
            openItems.value.delete(id);
        }
        else
        {
            openItems.value.add(id);
        }

        emit("toggle", id, !isCurrentlyOpen);
    };

    const getItemClasses = (item: AccordionItem): Record<string, boolean> => ({
        "clay-accordion__item--open": isItemOpen(item.id),
        "clay-accordion__item--disabled": item.disabled || props.disabled
    });
</script>

<template>
    <div class="clay-accordion" :class="classes">
        <div v-for="item in items"
             :key="item.id"
             class="clay-accordion__item"
             :class="getItemClasses(item)">
            <button class="clay-accordion__header"
                    :disabled="item.disabled || disabled"
                    :aria-expanded="isItemOpen(item.id)"
                    :aria-controls="`accordion-content-${item.id}`"
                    @click="toggleItem(item.id)">
                <span class="clay-accordion__title">{{ item.title }}</span>
                <span class="clay-accordion__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24"
                         fill="none"
                         stroke="currentColor"
                         stroke-width="2">
                        <polyline points="6,9 12,15 18,9" />
                    </svg>
                </span>
            </button>

            <div :id="`accordion-content-${item.id}`"
                 class="clay-accordion__content"
                 :aria-hidden="!isItemOpen(item.id)">
                <div class="clay-accordion__content-inner">
                    <p>{{ item.content }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @use "@/assets/scss/mixins";

    :root {
        --clay-accordion-color-background: var(--clay-light-color);
        --clay-accordion-color-border: oklch(from var(--clay-primary-color) calc(l - 0.1) c h);
        --clay-accordion-color-shadow: oklch(from var(--clay-primary-color) calc(l - 0.25) c h);
        --clay-accordion-color-text: var(--clay-dark-color);
        --clay-accordion-color-text-secondary: oklch(from var(--clay-accordion-color-text) calc(l + 0.2) c h);

        --clay-accordion-color-outline: oklch(from var(--clay-primary-color) l c calc(h + 180));

        --clay-accordion-spacing-x: 1.25em;
        --clay-accordion-spacing-y: 1em;
        --clay-accordion-spacing: var(--clay-accordion-spacing-y) var(--clay-accordion-spacing-x);

        --clay-accordion-roundness: 0.5em;
    }

    .clay-accordion {
        border-radius: var(--clay-accordion-roundness);
        contain: layout;
        overflow: visible;
        padding: 0.5em;

        &__item {
            position: relative;
            transition: background-color var(--clay-ease-duration) var(--clay-ease-function);

            &--disabled {
                opacity: 0.6;
                pointer-events: none;
            }
        }

        &__header {
            align-items: center;
            background-color: var(--clay-accordion-color-background);
            border: none;
            border-radius: var(--clay-accordion-roundness);
            color: var(--clay-accordion-color-text);
            cursor: pointer;
            display: flex;
            font-family: inherit;
            font-size: 1em;
            font-weight: 600;
            justify-content: space-between;
            margin: 0.25em;
            outline: none;
            padding: var(--clay-accordion-spacing);
            position: relative;
            text-align: left;
            transition: transform var(--clay-ease-duration) var(--clay-ease-function);
            width: calc(100% - 0.5em);
            will-change: transform, box-shadow;
            z-index: 2;

            &::after {
                content: "";
                position: absolute;
                top: -2px;
                left: -2px;
                right: -2px;
                bottom: -2px;
                z-index: -2;
            }

            &::before {
                background-image: linear-gradient(rgba(from var(--white) r g b / 0.15),
                                  rgba(from var(--black) r g b / 0.05));
                border-radius: var(--clay-accordion-roundness);
                bottom: 0;
                content: "";
                left: 0;
                position: absolute;
                right: 0;
                top: 0;
                transition: background-color var(--clay-ease-duration) var(--clay-ease-function),
                           box-shadow var(--clay-ease-duration) var(--clay-ease-function);
                will-change: background-color, box-shadow;
                z-index: -1;

                @include mixins.clay-shadow-inset($color: var(--clay-primary-color), $intensity: 0.25);
            }

            @include mixins.clay-shadow-elevation($color: var(--clay-accordion-color-shadow), $intensity: 0.3);

            &:hover {
                transform: translateY(-0.035em) scale(1.025);

                @include mixins.clay-shadow-elevation($color: var(--clay-accordion-color-shadow), $intensity: 0.4);

                &::before {
                    background-color: rgba(from var(--clay-primary-color) r g b / 0.05);
                }
            }

            &:focus-visible {
                box-shadow: 0 0 0 2px var(--clay-accordion-color-outline);
                outline: 2px solid var(--clay-accordion-color-outline);
                outline-offset: 2px;
                transform: translateY(-0.0625em) scale(1.05);

                @include mixins.clay-shadow-elevation($color: var(--clay-accordion-color-shadow), $intensity: 0.5);

                &::before {
                    background-color: rgba(from var(--clay-primary-color) r g b / 0.1);
                }
            }

            &:active {
                transform: translateY(0.125em) scale(1.05);

                @include mixins.clay-shadow-elevation($color: var(--clay-accordion-color-shadow), $intensity: 0.8);

                &::before {
                    @include mixins.clay-shadow-inset($color: var(--clay-primary-color), $intensity: 0.5);
                }
            }

            &:disabled {
                cursor: not-allowed;
                opacity: 0.6;
            }
        }

        &__title {
            flex: 1;
            margin-right: 1em;
        }

        &__icon {
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform var(--clay-ease-duration) var(--clay-ease-function);
            width: 1.5em;
            height: 1.5em;

            svg {
                width: 100%;
                height: 100%;
            }
        }

        &__content {
            max-height: 0;
            overflow: hidden;
            position: relative;
            transition:
                max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                padding 0.6s cubic-bezier(0.4, 0, 0.2, 1);

            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border-radius: var(--clay-accordion-roundness);
                pointer-events: none;
                z-index: 0;
                @include mixins.clay-shadow-inset($color: var(--clay-accordion-color-shadow), $intensity: 0.9);
            }
        }

        &__content-inner {
            background-color: rgba(from var(--clay-accordion-color-background) r g b / 0.3);
            border-radius: var(--clay-accordion-roundness);
            color: var(--clay-accordion-color-text-secondary);
            line-height: 1.6;
            padding: var(--clay-accordion-spacing-y) var(--clay-accordion-spacing-x);
            position: relative;
            z-index: 1;
            @include mixins.clay-shadow-inset($color: var(--clay-accordion-color-shadow), $intensity: 0.6);

            p {
                margin: 0;
            }
        }

        &__item--open {
            .clay-accordion__header {
                transform: translateY(0.125em) scale(1.05);
                z-index: 3;

                @include mixins.clay-shadow-elevation($color: var(--clay-accordion-color-shadow), $intensity: 0.8);

                &::before {
                    @include mixins.clay-shadow-inset($color: var(--clay-primary-color), $intensity: 0.5);
                }
            }

            .clay-accordion__icon {
                transform: rotate(180deg);
            }

            .clay-accordion__content {
                max-height: 200px;

                &::before {
                    @include mixins.clay-shadow-inset($color: var(--clay-accordion-color-shadow), $intensity: 0.5);
                }
            }

            .clay-accordion__content-inner {
                @include mixins.clay-shadow-inset($color: var(--clay-accordion-color-shadow), $intensity: 0.4);
            }
        }

        &--disabled {
            opacity: 0.6;
            pointer-events: none;
        }
    }

    @media (prefers-color-scheme: dark) {
        :root {
            --clay-accordion-color-background: var(--clay-dark-color);
            --clay-accordion-color-border: oklch(from var(--clay-primary-color) calc(l - 0.2) c h);
            --clay-accordion-color-shadow: var(--black);
            --clay-accordion-color-text: var(--clay-light-color);
            --clay-accordion-color-text-secondary: oklch(from var(--clay-accordion-color-text) calc(l - 0.2) c h);
        }

        .clay-accordion {
            &__header {
                &::before {
                    background-image: linear-gradient(
                        rgba(from var(--white) r g b / 0.08),
                        rgba(from var(--black) r g b / 0.10)
                    );
                }

                &:hover {
                    &::before {
                        background-color: rgba(from var(--clay-primary-color) r g b / 0.1);
                    }
                }

                &:focus-visible {
                    &::before {
                        background-color: rgba(from var(--clay-primary-color) r g b / 0.15);
                    }
                }

                &:active {
                    --clay-accordion-color-shadow: oklch(from var(--clay-primary-color) calc(l - 0.1) c h);
                }
            }

            &__item--open {
                .clay-accordion__header {
                    --clay-accordion-color-shadow: oklch(from var(--clay-primary-color) calc(l - 0.1) c h);
                }
            }
        }
    }
</style>