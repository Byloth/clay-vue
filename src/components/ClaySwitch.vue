<script lang="ts" setup>
    import { ref, watch } from "vue";

    const props = defineProps({
        modelValue: {
            type: Boolean,
            default: false
        },
        theme: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: "medium",
            validator: (value: string) => ["small", "medium", "large"].includes(value)
        }
    });

    const emit = defineEmits<(e: "update:modelValue", value: boolean) => void>();

    const localValue = ref(props.modelValue);
    const switchId = `clay-switch-${Math.random().toString(36)
        .substr(2, 9)}`;

    watch(
        () => props.modelValue,
        (newValue) =>
        {
            localValue.value = newValue;
        }
    );

    watch(localValue, (newValue) =>
    {
        emit("update:modelValue", newValue);
    });
</script>

<template>
    <label :for="switchId"
           class="switch"
           :class="{
               'theme-switch': theme,
               [`switch-${size}`]: size,
           }">
        <input :id="switchId"
               v-model="localValue"
               type="checkbox" />
        <span class="slider">
            <span v-if="theme" class="theme-icon">
                <svg v-if="!localValue"
                     class="sun-icon"
                     viewBox="0 0 24 24"
                     fill="none">
                    <circle cx="12"
                            cy="12"
                            r="4"
                            stroke="currentColor"
                            stroke-width="2" />
                    <path d="m12 2 0 2"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round" />
                    <path d="m12 20 0 2"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round" />
                    <path d="m4.93 4.93 1.41 1.41"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round" />
                    <path d="m17.66 17.66 1.41 1.41"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round" />
                    <path d="m2 12 2 0"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round" />
                    <path d="m20 12 2 0"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round" />
                    <path d="m6.34 17.66-1.41 1.41"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round" />
                    <path d="m19.07 4.93-1.41 1.41"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round" />
                </svg>
                <svg v-else
                     class="moon-icon"
                     viewBox="0 0 24 24"
                     fill="none">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" />
                </svg>
            </span>
        </span>
    </label>
</template>

<style lang="scss">
:root {
    --clay-switch-color-background: var(--clay-primary-color);
    --clay-switch-color-border: rgba(87, 185, 255, 0.3);
    --clay-slider-color-background: #f0f0f0;
    --clay-before-background: #fafafa;

    --clay-shadow-light: #ffffff;
    --clay-shadow-dark: #d1d9e6;

    --clay-shadow-light-dark: #6b7280;
    --clay-shadow-dark-dark: #374151;
    --clay-switch-bg-dark-checked: rgb(69, 148, 204);
}

.switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 28px;
    cursor: pointer;

    & input {
        opacity: 0;
        width: 0;
        height: 0;

        &:checked + .slider {
            background-color: var(--clay-switch-color-background);
            box-shadow: inset 6px 6px 12px rgba(0, 0, 0, 0.2), inset -6px -6px 12px
            rgba(255, 255, 255, 0.1), 2px 2px 8px rgba(0, 0, 0, 0.15);
        }

        &:checked + .slider::before {
            transform: translateX(22px);
            animation: switch-on 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3), 0px 2px 6px rgba(0, 0, 0, 0.2),
            inset 2px 2px 6px rgba(255, 255, 255, 0.9), inset -2px -2px 6px rgba(0, 0, 0, 0.1);
        }

        &:not(:checked) + .slider::before {
            animation: switch-off 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
    }
}

.switch-small {
    width: 36px;
    height: 20px;

    & .slider::before {
        height: 16px;
        width: 16px;
        left: 2px;
        bottom: 2px;
    }

    & input:checked + .slider::before {
        transform: translateX(16px);
        animation: switch-small-on 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    & input:not(:checked) + .slider::before {
        animation: switch-small-off 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
}

.switch-large {
    width: 66px;
    height: 36px;

    .slider::before {
        height: 30px;
        width: 30px;
        left: 3px;
        bottom: 3px;
    }

    & input:checked + .slider::before {
        transform: translateX(30px);
        animation: switch-large-on 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    & input:not(:checked) + .slider::before {
        animation: switch-large-off 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
}

.slider {
    position: absolute;
    cursor: pointer;
    background-color: var(--clay-slider-color-background);
    border-radius: 34px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: background-color 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease;
    box-shadow: inset 8px 8px 16px var(--clay-shadow-dark), inset -8px -8px 16px var(--clay-shadow-light), 2px 2px 8px
    rgba(0, 0, 0, 0.1);

    &::before {
        position: absolute;
        content: "";
        height: 22px;
        width: 22px;
        left: 3px;
        bottom: 3px;
        background-color: var(--clay-before-background);
        border-radius: 50%;
        transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease;
        box-shadow: 4px 4px 8px var(--clay-shadow-dark), -4px -4px 8px var(--clay-shadow-light), inset 2px 2px 4px
        rgba(255, 255, 255, 0.8), inset -2px -2px 4px rgba(0, 0, 0, 0.1);
    }
}

@keyframes switch-on {
    0% {
        transform: translateX(0) scale(1);
    }
    40% {
        transform: translateX(10px) scale(0.9);
    }
    60% {
        transform: translateX(24px) scale(1.05);
    }
    100% {
        transform: translateX(22px) scale(1);
    }
}

@keyframes switch-off {
    0% {
        transform: translateX(22px) scale(1);
    }
    30% {
        transform: translateX(18px) scale(0.95);
    }
    60% {
        transform: translateX(8px) scale(1.02);
    }
    100% {
        transform: translateX(0) scale(1);
    }
}

@keyframes switch-small-on {
    0% {
        transform: translateX(0) scale(1);
    }
    40% {
        transform: translateX(8px) scale(0.9);
    }
    60% {
        transform: translateX(18px) scale(1.05);
    }
    100% {
        transform: translateX(16px) scale(1);
    }
}

@keyframes switch-small-off {
    0% {
        transform: translateX(16px) scale(1);
    }
    30% {
        transform: translateX(12px) scale(0.95);
    }
    60% {
        transform: translateX(6px) scale(1.02);
    }
    100% {
        transform: translateX(0) scale(1);
    }
}

@keyframes switch-large-on {
    0% {
        transform: translateX(0) scale(1);
    }
    40% {
        transform: translateX(15px) scale(0.9);
    }
    60% {
        transform: translateX(32px) scale(1.05);
    }
    100% {
        transform: translateX(30px) scale(1);
    }
}

@keyframes switch-large-off {
    0% {
        transform: translateX(30px) scale(1);
    }
    30% {
        transform: translateX(24px) scale(0.95);
    }
    60% {
        transform: translateX(12px) scale(1.02);
    }
    100% {
        transform: translateX(0) scale(1);
    }
}

@keyframes icon-slide-on {
    0% {
        transform: translateX(0) scale(1);
    }
    60% {
        transform: translateX(24px) scale(1.1);
    }
    100% {
        transform: translateX(22px) scale(1);
    }
}

@keyframes icon-slide-off {
    0% {
        transform: translateX(22px) scale(1);
    }
    60% {
        transform: translateX(8px) scale(1.05);
    }
    100% {
        transform: translateX(0) scale(1);
    }
}

@keyframes icon-fade-in {
    0% {
        opacity: 0;
        transform: scale(0.8);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes icon-fade-out {
    0% {
        opacity: 1;
        transform: scale(1);
    }
    100% {
        opacity: 0.7;
        transform: scale(0.9);
    }
}

@keyframes icon-slide-small-on {
    0% {
        transform: translateX(0) scale(1);
    }
    60% {
        transform: translateX(18px) scale(1.1);
    }
    100% {
        transform: translateX(16px) scale(1);
    }
}

@keyframes icon-slide-small-off {
    0% {
        transform: translateX(16px) scale(1);
    }
    60% {
        transform: translateX(6px) scale(1.05);
    }
    100% {
        transform: translateX(0) scale(1);
    }
}

@keyframes icon-slide-large-on {
    0% {
        transform: translateX(0) scale(1);
    }
    60% {
        transform: translateX(32px) scale(1.1);
    }
    100% {
        transform: translateX(30px) scale(1);
    }
}

@keyframes icon-slide-large-off {
    0% {
        transform: translateX(30px) scale(1);
    }
    60% {
        transform: translateX(12px) scale(1.05);
    }
    100% {
        transform: translateX(0) scale(1);
    }
}

.theme-switch {
    & .theme-icon {
        position: absolute;
        top: 3px;
        left: 3px;
        width: 22px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        pointer-events: none;

        & svg {
            width: 14px;
            height: 14px;
            transition: color 0.3s ease, transform 0.2s ease;
        }

        & .sun-icon {
            color: #f59e0b;
        }

        & .moon-icon {
            color: #6366f1;
        }
    }

    & input:checked + .slider .theme-icon {
        transform: translateX(22px);
        animation: icon-slide-on 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);

        & svg {
            animation: icon-fade-in 0.3s ease 0.2s both;
        }
    }

    & input:not(:checked) + .slider .theme-icon {
        animation: icon-slide-off 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);

        & svg {
            animation: icon-fade-out 0.2s ease both;
        }
    }

    &.switch-small .theme-icon {
        top: 2px;
        left: 2px;
        width: 16px;
        height: 16px;

        svg {
            width: 8px;
            height: 8px;
        }
    }

    &.switch-small input:checked + .slider .theme-icon {
        transform: translateX(16px);
        animation: icon-slide-small-on 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    &.switch-small input:not(:checked) + .slider .theme-icon {
        animation: icon-slide-small-off 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    &.switch-large .theme-icon {
        top: 3px;
        left: 3px;
        width: 30px;
        height: 30px;

        & svg {
            width: 16px;
            height: 16px;
        }
    }

    &.switch-large input:checked + .slider .theme-icon {
        transform: translateX(30px);
        animation: icon-slide-large-on 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    &.switch-large input:not(:checked) + .slider .theme-icon {
        animation: icon-slide-large-off 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
}

@media (prefers-color-scheme: dark) {
    :root {
        --clay-switch-color-background: oklch(from var(--clay-primary-color) calc(l - 0.3) c h);
        --clay-slider-color-background: #525252;
        --clay-slider: #4b5563;
        --clay-before-background: #9ca3af;
    }
    .slider {
        box-shadow: inset 6px 6px 12px var(--clay-shadow-dark-dark), inset -6px -6px 12px
        var(--clay-shadow-light-dark), 2px 2px 8px rgba(0, 0, 0, 0.2);

        &::before {
            box-shadow: 3px 3px 6px var(--clay-shadow-dark-dark), -3px -3px 6px var(--clay-shadow-light-dark),
            inset 2px 2px 4px rgba(255, 255, 255, 0.15), inset -2px -2px 4px rgba(0, 0, 0, 0.2);
        }
    }

    .switch input:checked + .slider {
        box-shadow: inset 4px 4px 8px rgba(0, 0, 0, 0.3), inset -4px -4px 8px
        rgba(255, 255, 255, 0.1), 2px 2px 6px rgba(0, 0, 0, 0.15);

        &::before {
            background-color: #ffffff;
            box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.3), 0px 1px 4px rgba(0, 0, 0, 0.2), inset 2px 2px 4px
            rgba(255, 255, 255, 0.25), inset -2px -2px 4px rgba(0, 0, 0, 0.25);
        }
    }

    .theme-switch .theme-icon {
        & svg.sun-icon {
            color: #444444 !important;
        }

        & svg.moon-icon {
            color: #000000 !important;
        }
    }
}
</style>
