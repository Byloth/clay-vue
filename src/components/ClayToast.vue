<template>
    <transition name="toast-fade">
        <ClayCard v-if="visible"
                  :class="[
                      'clay-toast',
                      `clay-toast--${props.type}`,
                      { 'clay-card--glass': props.variant === 'glass' }
                  ]"
                  :style="toastStyle"
                  v-bind="$attrs">
            <span class="clay-toast__message">
                <slot>{{ defaultMessage }}</slot>
            </span>
            <button class="clay-toast__close"
                    aria-label="Chiudi"
                    @click="close">
                <svg width="18"
                     height="18"
                     viewBox="0 0 24 24">
                    <line x1="6"
                          y1="6"
                          x2="18"
                          y2="18"
                          stroke="#db2828"
                          stroke-width="2"
                          stroke-linecap="round" />
                    <line x1="18"
                          y1="6"
                          x2="6"
                          y2="18"
                          stroke="#db2828"
                          stroke-width="2"
                          stroke-linecap="round" />
                </svg>
            </button>
            <div class="clay-toast__progress" :style="progressStyle"></div>
        </ClayCard>
    </transition>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted, watch } from "vue";
    import ClayCard from "./ClayCard.vue";

    const props = defineProps({
        type: {
            type: String,
            default: "success",
            validator: (v: string) => ["success", "error", "warning", "information"].includes(v)
        },
        message: {
            type: String,
            default: ""
        },
        duration: {
            type: Number,
            default: 3000
        },
        variant: {
            type: String,
            default: "default",
            validator: (v: string) => ["default", "glass"].includes(v)
        }
    });

    const emit = defineEmits(["close"]);

    const visible = ref(true);

    const colors = {
        success: "#21ba45",
        error: "#db2828",
        warning: "#f2c037",
        information: "var(--clay-primary-color)"
    };

    const toastStyle = computed(() => ({}));
    const progress = ref(100);
    let intervalId: number | null = null;

    const progressStyle = computed(() => ({
        width: progress.value + "%",
        background: colors[props.type as keyof typeof colors]
    }));

    function startTimer()
    {
        if (intervalId) { clearInterval(intervalId); }
        progress.value = 100;
        if (props.duration > 0)
        {
            const step = 100 / (props.duration / 20);
            intervalId = window.setInterval(() =>
            {
                progress.value -= step;
                if (progress.value <= 0)
                {
                    progress.value = 0;
                    close();
                    if (intervalId) { clearInterval(intervalId); }
                }
            }, 20);
        }
    }

    onMounted(startTimer);

    watch([() => props.duration, () => props.message], () =>
    {
        visible.value = true;
        startTimer();
    });

    function close()
    {
        visible.value = false;
        emit("close");
        if (intervalId) { clearInterval(intervalId); }
    }

    const defaultMessage = computed(() =>
    {
        if (props.message) { return props.message; }
        switch (props.type)
        {
            case "success":
                return "Your changes have been saved successfully!";
            case "error":
                return "Something went wrong. Please try again.";
            case "warning":
                return "Warning: Check your input values.";
            case "information":
                return "For your information.";
            default:
                return "";
        }
    });
</script>

<style scoped lang="scss">
:root {
    --clay-toast-color-success: #21ba45;
    --clay-toast-color-error: #db2828;
    --clay-toast-color-warning: #f2c037;
    --clay-toast-color-information: var(--clay-primary-color);
    --clay-toast-color-close: #db2828;
}

.clay-toast {
    min-width: 320px;
    max-width: 420px;
    padding: 1.2em 2.5em 1.2em 1.5em;
    border-radius: 1.1em;
    position: fixed;
    bottom: 2.5em;
    right: 2.5em;
    z-index: 9999;
    display: flex;
    align-items: center;
    font-size: 1.1em;
    font-weight: 600;
    letter-spacing: 0.01em;
    overflow: hidden;
    user-select: none;

    &::after {
        content: "";
        position: absolute;
        left: 10%;
        bottom: -18px;
        width: 80%;
        height: 32px;
        z-index: 0;
        pointer-events: none;
    }

    &__close {
        background: none;
        border: none;
        cursor: pointer;
        position: absolute;
        right: 1em;
        padding: 0.2em;
        display: flex;
        align-items: center;
        transition: filter 0.15s;
        z-index: 3;

        svg {
            display: block;
            stroke: var(--clay-toast-color-close);
        }
        &:hover svg {
            filter: brightness(1.3);
        }
    }

    &__progress {
        position: absolute;
        left: 0;
        bottom: 0;
        height: 4px;
        border-radius: 0 0 1em 1em;
        transition: width 0.2s linear;
        z-index: 2;
        background: var(--clay-toast-progress);
    }
}

.toast-fade-enter-active,
.toast-fade-leave-active {
    transition: opacity 0.25s;
}
.toast-fade-enter-from,
.toast-fade-leave-to {
    opacity: 0;
}

.clay-toast--information {
  --clay-toast-color-information: var(--clay-primary-color);
}
</style>