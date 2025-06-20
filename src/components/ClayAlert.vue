<template>
    <ClayCard v-if="visible"
              :class="['clay-alert', { 'clay-card--glass': props.variant === 'glass' }]"
              v-bind="$attrs">
        <button v-if="showCloseButton"
                class="clay-alert__close-button"
                aria-label="Close"
                @click="closeAlert">
            <svg class="clay-alert__close-icon"
                 viewBox="0 0 24 24"
                 width="24"
                 height="24">
                <g>
                    <line x1="6"
                          y1="6"
                          x2="18"
                          y2="18"
                          stroke="var(--clay-alert-color-error)"
                          stroke-width="2"
                          stroke-linecap="round" />
                    <line x1="18"
                          y1="6"
                          x2="6"
                          y2="18"
                          stroke="var(--clay-alert-color-error)"
                          stroke-width="2"
                          stroke-linecap="round" />
                </g>
            </svg>
        </button>
        <span class="clay-alert__icon-wrapper">
            <span class="clay-alert__badge">
                <svg :class="`clay-alert__badge-svg clay-alert__badge-svg--${type}`"
                     xmlns="http://www.w3.org/2000/svg"
                     width="150"
                     height="150"
                     viewBox="0 0 300 300"
                     fill="none"
                     shape-rendering="geometricPrecision">
                    <g>
                        <circle cx="150"
                                cy="150"
                                r="138"
                                :stroke="badgeColor"
                                stroke-width="20"
                                fill="none"
                                filter="url(#inner-shadow)" />
                    </g>
                    <defs>
                        <filter id="inner-shadow"
                                x="0"
                                y="0"
                                width="300"
                                height="300"
                                filterUnits="userSpaceOnUse">
                            <feOffset dx="0" dy="6" />
                            <feGaussianBlur stdDeviation="10" result="offset-blur" />
                            <feComposite in="SourceGraphic"
                                         in2="offset-blur"
                                         operator="out"
                                         result="inverse" />
                            <feFlood flood-color="#000"
                                     flood-opacity="1.0"
                                     result="color" />
                            <feComposite in="color"
                                         in2="inverse"
                                         operator="in"
                                         result="shadow" />
                            <feComposite in="shadow"
                                         in2="SourceGraphic"
                                         operator="over" />
                        </filter>
                    </defs>
                </svg>
                <span class="clay-alert__icon-content">
                    <svg v-if="type === 'success'"
                         class="clay-alert__icon"
                         viewBox="0 0 300 300"
                         width="150"
                         height="150"
                         shape-rendering="geometricPrecision">
                        <polyline points="90 160 140 220 220 110"
                                  fill="none"
                                  :stroke="badgeColor"
                                  stroke-width="24"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  filter="url(#inner-shadow)" />
                    </svg>
                    <svg v-else-if="type === 'error'"
                         class="clay-alert__icon"
                         viewBox="0 0 300 300"
                         width="150"
                         height="150"
                         shape-rendering="geometricPrecision">
                        <g filter="url(#inner-shadow)">
                            <line x1="110"
                                  y1="110"
                                  x2="190"
                                  y2="190"
                                  :stroke="badgeColor"
                                  stroke-width="24"
                                  stroke-linecap="round" />
                            <line x1="190"
                                  y1="110"
                                  x2="110"
                                  y2="190"
                                  :stroke="badgeColor"
                                  stroke-width="24"
                                  stroke-linecap="round" />
                        </g>
                    </svg>
                    <svg v-else-if="type === 'warning'"
                         class="clay-alert__icon"
                         viewBox="0 0 300 300"
                         width="150"
                         height="150"
                         shape-rendering="geometricPrecision">
                        <line x1="150"
                              y1="90"
                              x2="150"
                              y2="190"
                              :stroke="badgeColor"
                              stroke-width="24"
                              stroke-linecap="round"
                              filter="url(#inner-shadow)" />
                        <circle cx="150"
                                cy="230"
                                r="16"
                                :fill="badgeColor"
                                filter="url(#inner-shadow)" />
                    </svg>
                    <svg v-else-if="type === 'information'"
                         class="clay-alert__icon"
                         viewBox="0 0 300 300"
                         width="150"
                         height="150"
                         shape-rendering="geometricPrecision">
                        <line x1="150"
                              y1="130"
                              x2="150"
                              y2="240"
                              :stroke="badgeColor"
                              stroke-width="24"
                              stroke-linecap="round"
                              filter="url(#inner-shadow)" />
                        <circle cx="150"
                                cy="85"
                                r="14"
                                :fill="badgeColor"
                                filter="url(#inner-shadow)" />
                    </svg>
                </span>
            </span>
        </span>
        <span class="clay-alert__label">{{ type }}</span>
        <div class="clay-alert__content">
            <span class="clay-alert__message">
                <slot>
                    {{ message || defaultMessage }}
                </slot>
            </span>
            <div class="clay-alert__buttons">
                <ClayButton v-if="showCancelButton" class="clay-alert__button clay-alert__button--cancel">
                    Cancel
                </ClayButton>
                <ClayButton class="clay-alert__button">
                    OK
                </ClayButton>
            </div>
        </div>
    </ClayCard>
</template>

<script setup lang="ts">
    import { ref, computed } from "vue";
    import ClayCard from "./ClayCard.vue";
    import ClayButton from "./ClayButton.vue";

    const emit = defineEmits(["close"]);

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
        showCancelButton: {
            type: Boolean,
            default: false
        },
        showCloseButton: {
            type: Boolean,
            default: false
        },
        variant: {
            type: String,
            default: "default",
            validator: (v: string) => ["default", "glass"].includes(v)
        }
    });

    const visible = ref(true);

    function closeAlert()
    {
        visible.value = false;
        emit("close");
    }

    const badgeColor = computed(() =>
    {
        switch (props.type)
        {
            case "success":
                return "var(--clay-alert-color-success)";
            case "error":
                return "var(--clay-alert-color-error)";
            case "warning":
                return "var(--clay-alert-color-warning)";
            case "information":
                return "var(--clay-alert-color-information)";
            default:
                return "var(--clay-alert-color-success)";
        }
    });

    const defaultMessage = computed(() =>
    {
        if (props.message) { return props.message; }
        switch (props.type)
        {
            case "success":
                return "✅ Operation completed successfully.";
            case "error":
                return "❌ Error during operation.";
            case "warning":
                return "⚠️ Warning: potentially risky action.";
            case "information":
                return "ℹ️ For your information.";
            default:
                return "";
        }
    });
</script>

<style lang="scss">
@use "@/assets/scss/variables";
@use "@/assets/scss/mixins";

:root {
  --clay-alert-color-success: #21ba45;
  --clay-alert-color-error: #db2828;
  --clay-alert-color-warning: #f2c037;
  --clay-alert-color-information: var(--clay-primary-color);
  --clay-alert-color-botton-cancel: #db2828;
}

.clay-alert {
  padding: 2.5em 0;
  margin: 2em 0;

  &__badge-svg,
  &__icon {
    shape-rendering: geometricPrecision;
    text-rendering: geometricPrecision;
    image-rendering: optimizeQuality;
    will-change: transform;
    transform: translateZ(0);
  }

  &__icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5em;
  }

  &__badge {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
  }

  &__badge-svg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  &__icon-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
  }

  &__icon {
    width: 96px;
    height: 96px;
    display: block;
  }

  &__label {
    font-size: 1.5em;
    font-weight: 600;
    color: var(--clay-text-color);
    text-transform: capitalize;
    text-align: center;
    width: 100%;
    display: block;
    margin-bottom: 2em;
  }

  &__message {
    font-size: 1.1em;
    color: var(--clay-text-color);
    text-align: center;
    margin-bottom: 1.5em;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1em;
    margin-top: 1em;
    width: 100%;
  }

  &__button {
    width: 110px;
    height: 40px;
  }

  &__close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    transition: background-color 0.2s ease;
  }

  &__close-icon {
    width: 20px;
    height: 20px;
  }

  &__button--cancel {
    --clay-button-color-background: var(--clay-alert-color-botton-cancel);
    --clay-button-color-outline: oklch(from var(--clay-alert-color-botton-cancel) l c calc(h + 180));
    --clay-button-color-shadow: oklch(from var(--clay-alert-color-botton-cancel) calc(l - 0.25) c h);

    --clay-button-color-background-hover: oklch(from var(--clay-alert-color-botton-cancel) calc(l + 0.05) c h);
    --clay-button-color-background-focus: oklch(from var(--clay-alert-color-botton-cancel) calc(l + 0.10) c h);
    --clay-button-color-background-active: oklch(from var(--clay-alert-color-botton-cancel) calc(l - 0.05) c h);

    --clay-button-color-shadow-hover: oklch(from var(--clay-alert-color-botton-cancel) calc(l - 0.15) c h);
    --clay-button-color-outline-focus: oklch(from var(--clay-alert-color-botton-cancel) l c calc(h + 180));
  }

  @media (prefers-color-scheme: dark) {
    &__button--cancel {
      --clay-button-color-background: oklch(from var(--clay-alert-color-botton-cancel) calc(l - 0.3) c h);
      --clay-button-color-background-glow: oklch(from var(--clay-alert-color-botton-cancel) calc(l + 0.2) c h);
      --clay-button-color-outline: oklch(from var(--clay-button-color-background-glow) l c calc(h + 180));
      --clay-button-color-shadow: var(--black);

      --clay-button-color-background-hover: oklch(from var(--clay-alert-color-botton-cancel) calc(l + 0.05) c h);
      --clay-button-color-background-focus: oklch(from var(--clay-alert-color-botton-cancel) calc(l + 0.10) c h);
      --clay-button-color-background-active: oklch(from var(--clay-alert-color-botton-cancel) calc(l - 0.05) c h);

      --clay-button-color-shadow-hover: oklch(from var(--clay-alert-color-botton-cancel) calc(l - 0.15) c h);
      --clay-button-color-outline-focus: oklch(from var(--clay-alert-color-botton-cancel) l c calc(h + 180));
    }  }
}
</style>
