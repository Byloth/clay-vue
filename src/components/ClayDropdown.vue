<script lang="ts" setup>
    import { ref, computed } from "vue";
    import type { PropType } from "vue";

    import { useEventListener } from "@vueuse/core";

    const props = defineProps({
        items: {
            type: Array as PropType<{ label: string; value: string; }[]>,
            default: () => []
        },
        placeholder: {
            default: "Select an option",
            type: String
        }
    });

    const value = defineModel<string>({ default: "" });

    const isOpen = ref(false);

    const selectedItem = computed((): { label: string; value: string; } | undefined =>
    {
        return props.items.find((item) => item.value === value.value);
    });

    const displayText = computed((): string =>
    {
        return selectedItem.value?.label || props.placeholder;
    });

    const toggleDropdown = (): void =>
    {
        isOpen.value = !isOpen.value;
    };

    const selectItem = (item: { label: string; value: string }): void =>
    {
        value.value = item.value;
        isOpen.value = false;
    };

    const closeDropdown = (): void =>
    {
        isOpen.value = false;
    };

    useEventListener("click", (event: MouseEvent) =>
    {
        if (!(isOpen.value)) { return; }

        closeDropdown();
    });
</script>

<template>
    <div class="clay-dropdown-container" @click.stop>
        <div :class="{ 'clay-dropdown--open': isOpen }"
             class="clay-dropdown"
             @click="toggleDropdown">
            <span class="clay-dropdown__text">{{ displayText }}</span>
            <span :class="{ 'clay-dropdown__arrow--rotated': isOpen }" class="clay-dropdown__arrow">
                <svg xmlns="http://www.w3.org/2000/svg"
                     width="30"
                     height="30"
                     viewBox="0 0 24 24">
                    <path fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2.5"
                          d="m7 10l5 5l5-5" />
                </svg>
            </span>
        </div>

        <Transition name="dropdown">
            <ul v-if="isOpen"
                class="clay-dropdown__list"
                @click.stop>
                <li v-for="item in items"
                    :key="item.value"
                    :class="{ 'clay-option--selected': item.value === value }"
                    class="clay-option"
                    @click="selectItem(item)">
                    {{ item.label }}
                </li>
            </ul>
        </Transition>
    </div>
</template>

<style lang="scss">
    :root
    {
        --clay-dropdown-color-background: var(--clay-primary-color);
        --clay-dropdown-color-background-hover: rgba(238, 238, 238, 0.9);
        --clay-dropdown-font-family: inherit;
        --clay-dropdown-spacing-x: 0.5rem;
        --clay-dropdown-spacing-y: 1rem;
        --clay-dropdown-spacing: var(--clay-dropdown-spacing-x) var(--clay-dropdown-spacing-y);
        --clay-dropdown-roundness: var(--clay-dropdown-spacing-x);
        --clay-dropdown-scale: 1;
        --clay-dropdown-shadow: 0px 2px 5.1px 0px rgba(0, 0, 0, 0.25) inset, 0px 2px 4px 0px rgba(142, 138, 138, 0.75);
        --clay-dropdown-font-size: 16px;
        --clay-dropdown-min-width: 120px;
    }

    .clay-dropdown-container
    {
        position: relative;
        display: inline-block;
    }

    .clay-dropdown
    {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--clay-dropdown-spacing);
        border: none;
        border-radius: var(--clay-dropdown-roundness);
        color: var(--white);
        font-size: var(--clay-dropdown-font-size);
        min-width: var(--clay-dropdown-min-width);
        width: auto;
        cursor: pointer;
        box-shadow: var(--clay-dropdown-shadow);
        background-color: var(--clay-dropdown-color-background);
        transform: scale(var(--clay-dropdown-scale));
        transition: background-color var(--clay-ease-duration)
        var(--clay-ease-function), box-shadow var(--clay-ease-duration)
        var(--clay-ease-function), color var(--clay-ease-duration)
        var(--clay-ease-function), transform var(--clay-ease-duration) var(--clay-ease-function);

        &:focus
        {
            --clay-dropdown-scale: 0.95;
            --clay-dropdown-shadow: 0px 2px 5.1px 0px rgba(0, 0, 0, 0.35) inset, 0px 2px 4px 0px rgba(142, 138, 138, 0.85);
            outline: none;
        }

        &:hover
        {
            --clay-dropdown-scale: 1.05;
            --clay-dropdown-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.3) inset, 0px 2px 4px 0px rgba(142, 138, 138, 0.8);
        }

        &:active
        {
            --clay-dropdown-scale: 1;
            --clay-dropdown-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.4) inset, 0px 1px 2px 0px rgba(142, 138, 138, 0.9);
        }

        &__text
        {
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-family: var(--clay-dropdown-font-family);
            font-weight: 600;
            font-size: var(--clay-dropdown-font-size);
        }

        &__arrow
        {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 0.5rem;
            width: 30px;
            height: 30px;
            transition: transform var(--clay-ease-duration) var(--clay-ease-function);

            &--rotated
            {
                transform: rotate(180deg);
            }
        }

        &__list
        {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            z-index: 1000;
            background: var(--white);
            border-radius: var(--clay-dropdown-roundness);
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
            margin: 0;
            padding: 0;
            list-style: none;
            max-height: 200px;
            overflow-y: auto;
            margin-top: 4px;
            font-family: var(--clay-dropdown-font-family);
        }

        &__backdrop
        {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 999;
        }
    }

    .clay-option
    {
        display: block;
        padding: var(--clay-dropdown-spacing);
        color: var(--clay-dark-color);
        cursor: pointer;
        border: none;
        background: transparent;
        font-family: var(--clay-dropdown-font-family);
        font-size: var(--clay-dropdown-font-size);
        transition: background-color var(--clay-ease-duration) var(--clay-ease-function);

        &:hover
        {
            background-color: var(--clay-dropdown-color-background-hover);
            color: var(--clay-dark-color);
        }

        &--selected
        {
            background-color: var(--clay-dropdown-color-background);
            color: var(--white);

            &:hover
            {
                background-color: var(--clay-dropdown-color-background);
                color: var(--white);
            }
        }

        &:first-child
        {
            border-radius: var(--clay-dropdown-roundness) var(--clay-dropdown-roundness) 0 0;
        }

        &:last-child
        {
            border-radius: 0 0 var(--clay-dropdown-roundness) var(--clay-dropdown-roundness);
        }

        &:only-child
        {
            border-radius: var(--clay-dropdown-roundness);
        }
    }

    .dropdown
    {
        &-enter-active,
        &-leave-active
        {
            transition: opacity var(--clay-ease-duration)
            var(--clay-ease-function), transform var(--clay-ease-duration) var(--clay-ease-function);
        }

        &-enter-from,
        &-leave-to
        {
            opacity: 0;
            transform: translateY(-8px) scale(0.95);
        }
    }

    @media (prefers-color-scheme: dark)
    {
        :root
        {
            --clay-dropdown-color-background: #2c2e30;
            --clay-dropdown-color-background-hover: rgba(42, 42, 42, 0.9);
            --clay-dropdown-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.6) inset, 0px 3px 6px 0px rgba(0, 0, 0, 0.4);
        }

        .clay-dropdown
        {
            &:focus
            {
                --clay-dropdown-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.7) inset, 0px 4px 8px 0px rgba(0, 0, 0, 0.5);
            }

            &:hover
            {
                --clay-dropdown-shadow: 0px 3px 9px 0px rgba(0, 0, 0, 0.65) inset, 0px 3px 7px 0px rgba(0, 0, 0, 0.45);
            }

            &:active
            {
                --clay-dropdown-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.8) inset, 0px 2px 4px 0px rgba(0, 0, 0, 0.6);
            }

            &__list
            {
                background-color: #1a1a1a;
                box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.4),
                inset 0px 2px 6px 0px rgba(0, 0, 0, 0.3), inset 0px -2px 6px 0px rgba(0, 0, 0, 0.2);
            }
        }

        .clay-option
        {
            color: var(--white);

            &:hover
            {
                --clay-dropdown-color-background-hover: rgba(42, 42, 42, 0.9);
                color: var(--white);
            }

            &--selected
            {
                --clay-dropdown-color-background: #2c2e30;
                color: var(--white);

                &:hover
                {
                    --clay-dropdown-color-background: #2c2e30;
                    color: var(--white);
                }
            }
        }
    }
</style>
