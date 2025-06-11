<script setup lang="ts">
    import { ref, computed } from "vue";

    interface Props {
        items?: { label: string; value: string }[];
        placeholder?: string;
        modelValue?: string;
    }

    const props = withDefaults(defineProps<Props>(), {
        items: () => [],
        placeholder: "Select an option...",
        modelValue: ""
    });

    const emit = defineEmits<{
        "update:modelValue": [value: string];
    }>();

    const isOpen = ref(false);
    const selectedValue = ref(props.modelValue);

    const selectedItem = computed(() =>
    {
        return props.items.find((item) => item.value === selectedValue.value);
    });

    const displayText = computed(() =>
    {
        return selectedItem.value?.label || props.placeholder;
    });

    const toggleDropdown = () =>
    {
        isOpen.value = !isOpen.value;
    };

    const selectItem = (item: { label: string; value: string }) =>
    {
        selectedValue.value = item.value;
        emit("update:modelValue", item.value);
        isOpen.value = false;
    };

    const closeDropdown = () =>
    {
        isOpen.value = false;
    };
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
                          stroke="#ffffff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="3"
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
                    :class="{ 'clay-option--selected': item.value === selectedValue }"
                    class="clay-option"
                    @click="selectItem(item)">
                    {{ item.label }}
                </li>
            </ul>
        </Transition>
    </div>

    <div v-if="isOpen"
         class="clay-dropdown__backdrop"
         @click="closeDropdown"></div>
</template>

<style lang="scss">
@use "sass:color";
@use "@/assets/scss/variables";

$dropdown-color-background: variables.$primary-color;
$dropdown-color-background-hover: rgba(238, 238, 238, 0.9);
$dropdown-color-outline: color.complement($dropdown-color-background);
$dropdown-color-shadow: color.adjust($dropdown-color-background, $lightness: -30%);

$dropdown-color-background-dark: #2c2e30;
$dropdown-color-background-hover-dark: rgba(42, 42, 42, 0.9);
$dropdown-color-outline-dark: color.complement($dropdown-color-background-dark);
$dropdown-color-shadow-dark: color.adjust($dropdown-color-background-dark, $lightness: -30%);

:root {
    --clay-dropdown-color-background: #{$dropdown-color-background};
    --clay-dropdown-color-background-hover: #{$dropdown-color-background-hover};
    --clay-dropdown-color-outline: #{$dropdown-color-outline};
    --clay-dropdown-color-shadow: #{$dropdown-color-shadow};

    --clay-dropdown-color-background-dark: #{$dropdown-color-background-dark};
    --clay-dropdown-color-background-hover-dark: #{$dropdown-color-background-hover-dark};
    --clay-dropdown-color-outline-dark: #{$dropdown-color-outline-dark};
    --clay-dropdown-color-shadow-dark: #{$dropdown-color-shadow-dark};

    --clay-dropdown-spacing-x: 0.5rem;
    --clay-dropdown-spacing-y: 1rem;
    --clay-dropdown-spacing: var(--clay-dropdown-spacing-x) var(--clay-dropdown-spacing-y);
    --clay-dropdown-roundness: var(--clay-dropdown-spacing-x);

    --clay-dropdown-scale-hover: 1.1;
    --clay-dropdown-scale-focus: 0.50;
    --clay-dropdown-scale-active: 1.00;

    --clay-dropdown-shadow-base: 0px 2px 5.1px 0px rgba(0, 0, 0, 0.25) inset, 0px 2px 4px 0px rgba(142, 138, 138, 0.75);
    --clay-dropdown-shadow-focus: 0px 2px 5.1px 0px rgba(0, 0, 0, 0.35) inset, 0px 2px 4px 0px
    rgba(142, 138, 138, 0.85);
    --clay-dropdown-shadow-hover: 0px 2px 6px 0px rgba(0, 0, 0, 0.3) inset, 0px 2px 4px 0px rgba(142, 138, 138, 0.8);
    --clay-dropdown-shadow-active: 0px 1px 3px 0px rgba(0, 0, 0, 0.4) inset, 0px 1px 2px 0px rgba(142, 138, 138, 0.9);

    --clay-dropdown-shadow-base-dark: 0px 3px 8px 0px rgba(0, 0, 0, 0.6) inset, 0px 3px 6px 0px rgba(0, 0, 0, 0.4);
    --clay-dropdown-shadow-focus-dark: 0px 4px 10px 0px rgba(0, 0, 0, 0.7) inset, 0px 4px 8px 0px rgba(0, 0, 0, 0.5);
    --clay-dropdown-shadow-hover-dark: 0px 3px 9px 0px rgba(0, 0, 0, 0.65) inset, 0px 3px 7px 0px rgba(0, 0, 0, 0.45);
    --clay-dropdown-shadow-active-dark: 0px 2px 6px 0px rgba(0, 0, 0, 0.8) inset, 0px 2px 4px 0px rgba(0, 0, 0, 0.6);

    --clay-dropdown-font-size: 16px;
    --clay-dropdown-min-width: 120px;

    --clay-dropdown-transition-duration: 0.3s;
    --clay-dropdown-transition-duration-fast: 0.2s;
    --clay-dropdown-transition-duration-instant: 0.1s;
    --clay-dropdown-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
    --clay-dropdown-transition-timing-out: ease-out;
}

.clay-dropdown-container {
    position: relative;
    display: inline-block;
}

.clay-dropdown {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--clay-dropdown-spacing);
    border: none;
    border-radius: var(--clay-dropdown-roundness);
    color: white;
    font-size: var(--clay-dropdown-font-size);
    min-width: var(--clay-dropdown-min-width);
    width: auto;
    cursor: pointer;
    box-shadow: var(--clay-dropdown-shadow-base);
    background-color: var(--clay-dropdown-color-background);
    transition: background-color var(--clay-dropdown-transition-duration) var(--clay-dropdown-transition-timing),
    box-shadow var(--clay-dropdown-transition-duration) var(--clay-dropdown-transition-timing),
    color var(--clay-dropdown-transition-duration) var(--clay-dropdown-transition-timing),
    transform var(--clay-dropdown-transition-duration-fast) var(--clay-dropdown-transition-timing);

    &:focus {
        outline: none;
        box-shadow: var(--clay-dropdown-shadow-focus);
        transform: scale(var(--clay-dropdown-scale-focus));
    }

    &:hover {
        transform: scale(var(--clay-dropdown-scale-hover));
        box-shadow: var(--clay-dropdown-shadow-hover);
    }

    &:active {
        box-shadow: var(--clay-dropdown-shadow-active);
        transform: scale(var(--clay-dropdown-scale-active));
        transition: background-color var(--clay-dropdown-transition-duration-instant)
        var(--clay-dropdown-transition-timing-out), box-shadow var(--clay-dropdown-transition-duration-instant)
        var(--clay-dropdown-transition-timing-out), color var(--clay-dropdown-transition-duration-instant)
        var(--clay-dropdown-transition-timing-out), transform var(--clay-dropdown-transition-duration-instant)
        var(--clay-dropdown-transition-timing-out);
    }
}

.clay-dropdown__text {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: variables.$font-family;
    font-weight: 600;
    font-size: var(--clay-dropdown-font-size);
}

.clay-dropdown__arrow {
    margin-left: 0.5rem;
    transition: transform var(--clay-dropdown-transition-duration-fast) var(--clay-dropdown-transition-timing);

    &--rotated {
        transform: rotate(180deg);
    }
}

.clay-dropdown__list {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    background: white;
    border-radius: var(--clay-dropdown-roundness);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
    margin: 0;
    padding: 0;
    list-style: none;
    max-height: 200px;
    overflow-y: auto;
    margin-top: 4px;
    font-family: variables.$font-family;
}

.clay-option {
    display: block;
    padding: var(--clay-dropdown-spacing);
    color: #333;
    cursor: pointer;
    border: none;
    background: transparent;
    font-family: variables.$font-family;
    font-size: var(--clay-dropdown-font-size);
    transition: background-color var(--clay-dropdown-transition-duration-fast)
    var(--clay-dropdown-transition-timing-out);

    &:hover {
        background-color: var(--clay-dropdown-color-background-hover);
        color: #2d3748;
    }

    &--selected {
        background-color: var(--clay-dropdown-color-background);
        color: white;

        &:hover {
            background-color: var(--clay-dropdown-color-background);
            color: white;
        }
    }

    &:first-child {
        border-radius: var(--clay-dropdown-roundness) var(--clay-dropdown-roundness) 0 0;
    }

    &:last-child {
        border-radius: 0 0 var(--clay-dropdown-roundness) var(--clay-dropdown-roundness);
    }

    &:only-child {
        border-radius: var(--clay-dropdown-roundness);
    }
}

.clay-dropdown__backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999;
}

.dropdown-enter-active,
.dropdown-leave-active {
    transition: opacity var(--clay-dropdown-transition-duration-fast) var(--clay-dropdown-transition-timing),
    transform var(--clay-dropdown-transition-duration-fast) var(--clay-dropdown-transition-timing);
}

.dropdown-enter-from {
    opacity: 0;
    transform: translateY(-8px) scale(0.95);
}

.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-8px) scale(0.95);
}

@media (prefers-color-scheme: dark) {
    .clay-dropdown {
        background-color: var(--clay-dropdown-color-background-dark);
        box-shadow: var(--clay-dropdown-shadow-base-dark);

        &:focus {
            box-shadow: var(--clay-dropdown-shadow-focus-dark);
        }
        &:hover {
            box-shadow: var(--clay-dropdown-shadow-hover-dark);
        }
        &:active {
            box-shadow: var(--clay-dropdown-shadow-active-dark);
        }
    }

    .clay-dropdown__list {
        background-color: #1a1a1a;
        box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.4), inset 0px 2px 6px 0px rgba(0, 0, 0, 0.3),
        inset 0px -2px 6px 0px rgba(0, 0, 0, 0.2);
    }

    .clay-option {
        color: #e0e0e0;

        &:hover {
            background-color: var(--clay-dropdown-color-background-hover-dark);
            color: #e2e8f0;
        }
    }

    .clay-option--selected {
        background-color: var(--clay-dropdown-color-background-dark);
        color: white;

        &:hover {
            background-color: var(--clay-dropdown-color-background-dark);
            color: white;
        }
    }
}
</style>
