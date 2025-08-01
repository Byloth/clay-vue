<script lang="ts" setup>
    import { watch, onMounted, onUnmounted } from "vue";

    const props = defineProps({
        modelValue: {
            default: false,
            type: Boolean
        },
        variant: {
            default: "default",
            type: String,
            validator: (value: string) => ["default", "warning", "success"].includes(value)
        }
    });

    const emit = defineEmits<{
        "update:modelValue": [value: boolean];
    }>();

    const close = () =>
    {
        emit("update:modelValue", false);
    };

    const onBackdropClick = (event: MouseEvent) =>
    {
        if (event.target === event.currentTarget)
        {
            close();
        }
    };

    const onEscapeKey = (event: KeyboardEvent) =>
    {
        if (event.key === "Escape")
        {
            close();
        }
    };

    watch(
        () => props.modelValue,
        (isOpen) =>
        {
            if (isOpen)
            {
                document.body.style.overflow = "hidden";
                document.addEventListener("keydown", onEscapeKey);
            }
            else
            {
                document.body.style.overflow = "";
                document.removeEventListener("keydown", onEscapeKey);
            }
        }
    );

    onMounted(() =>
    {
        if (props.modelValue)
        {
            document.body.style.overflow = "hidden";
            document.addEventListener("keydown", onEscapeKey);
        }
    });

    onUnmounted(() =>
    {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", onEscapeKey);
    });
</script>

<template>
    <Teleport to="body">
        <div v-if="modelValue"
             :class="['clay-modal', `clay-modal--${variant}`]"
             role="dialog"
             aria-modal="true"
             @click="onBackdropClick">
            <div class="clay-modal__backdrop"></div>
            <div class="clay-modal__content">
                <button class="clay-modal__close"
                        aria-label="Close modal"
                        @click="close">
                    ×
                </button>
                <slot></slot>
            </div>
        </div>
    </Teleport>
</template>

<style lang="scss">
@use "@/assets/scss/mixins";

:root {
    --clay-modal-color-backdrop: rgba(from var(--black) r g b / 0.4);
    --clay-modal-color-background: var(--clay-light-color);
    --clay-modal-color-shadow-primary: oklch(from var(--clay-primary-color) calc(l - 0.3) c h);
    --clay-modal-color-shadow-dark: rgba(from var(--black) r g b / 0.3);
    --clay-modal-color-shadow-light: rgba(from var(--white) r g b / 0.8);

    --clay-modal-spacing: 2em;
    --clay-modal-roundness: 1.5em;
    --clay-modal-width: min(90vw, 520px);
}

.clay-modal {
    align-items: center;
    display: flex;
    height: 100vh;
    justify-content: center;
    left: 0;
    padding: var(--clay-modal-spacing);
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 1000;

    opacity: 0;
    pointer-events: none;
    transform: scale(0.9) translateY(-20px);
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

    opacity: 1;
    pointer-events: all;
    transform: scale(1) translateY(0);

    &__backdrop {
        background: radial-gradient(circle at center, rgba(from var(--clay-primary-color) r g b / 0.1) 0%,
        var(--clay-modal-color-backdrop) 70%);
        backdrop-filter: blur(8px) saturate(120%);
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: -1;
    }

    &__content {
        background: linear-gradient(145deg, rgba(from var(--clay-modal-color-background) r g b / 0.95) 0%,
        rgba(from var(--clay-modal-color-background) r g b / 0.85) 100%);
        backdrop-filter: blur(20px) saturate(180%);
        border: 1px solid rgba(from var(--white) r g b / 0.2);
        border-radius: var(--clay-modal-roundness);
        box-shadow: 0 25px 50px -12px rgba(from var(--clay-modal-color-shadow-dark) r g b / 0.5), 0 8px 16px -4px
        rgba(from var(--clay-modal-color-shadow-primary) r g b / 0.3), inset 0 1px 0
        rgba(from var(--white) r g b / 0.3), inset 0 -1px 0 rgba(from var(--black) r g b / 0.1);
        max-height: calc(100vh - 2 * var(--clay-modal-spacing));
        max-width: var(--clay-modal-width);
        overflow: hidden;
        padding: var(--clay-modal-spacing);
        position: relative;
        width: 100%;

        &::before {
            background: radial-gradient(circle at 20% 50%, rgba(from var(--white) r g b / 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(from var(--clay-primary-color) r g b / 0.05) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%,
            rgba(from var(--white) r g b / 0.2) 0%, transparent 50%);
            border-radius: var(--clay-modal-roundness);
            bottom: 0;
            content: "";
            left: 0;
            mix-blend-mode: overlay;
            position: absolute;
            right: 0;
            top: 0;
            z-index: 0;
        }

        > * {
            position: relative;
            z-index: 1;
        }
    }

    &__close {
        background: linear-gradient(145deg, rgba(from var(--clay-modal-color-background) r g b / 0.9),
        rgba(from var(--clay-modal-color-background) r g b / 0.7));
        border: 1px solid rgba(from var(--white) r g b / 0.3);
        border-radius: 50%;
        box-shadow: 0 4px 8px rgba(from var(--black) r g b / 0.15), inset 0 1px 0
        rgba(from var(--white) r g b / 0.4), inset 0 -1px 0 rgba(from var(--black) r g b / 0.1);
        color: var(--clay-text-color);
        cursor: pointer;
        font-size: 1.2em;
        font-weight: 600;
        height: 2.5em;
        line-height: 1;
        opacity: 0.8;
        position: absolute;
        right: 0.75em;
        top: 0.75em;
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        width: 2.5em;
        z-index: 2;

        &:hover,
        &:focus {
            background: linear-gradient(145deg, rgba(from var(--clay-primary-color) r g b / 0.1),
            rgba(from var(--clay-primary-color) r g b / 0.05));
            box-shadow: 0 6px 12px rgba(from var(--clay-primary-color) r g b / 0.2), inset 0 1px 0
            rgba(from var(--white) r g b / 0.5), inset 0 -1px 0 rgba(from var(--clay-primary-color) r g b / 0.1);
            opacity: 1;
            transform: scale(1.05) translateY(-1px);
        }

        &:active {
            transform: scale(0.98) translateY(0);
            box-shadow: 0 2px 4px rgba(from var(--black) r g b / 0.2), inset 0 1px 0
            rgba(from var(--black) r g b / 0.1), inset 0 -1px 0 rgba(from var(--white) r g b / 0.3);
        }
    }
}

@media (prefers-color-scheme: dark) {
    :root {
        --clay-modal-color-background: var(--clay-dark-color);
        --clay-modal-color-shadow-primary: rgba(from var(--clay-primary-color) r g b / 0.3);
        --clay-modal-color-shadow-light: rgba(from var(--white) r g b / 0.1);
    }

    .clay-modal {
        &__content {
            border-color: rgba(from var(--white) r g b / 0.1);

            &::before {
                background: radial-gradient(circle at 20% 50%,
                rgba(from var(--white) r g b / 0.05) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%,
                rgba(from var(--clay-primary-color) r g b / 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(from var(--white) r g b / 0.03) 0%, transparent 50%);
            }
        }

        &__close {
            border-color: rgba(from var(--white) r g b / 0.2);
        }
    }

    .clay-modal--warning {
        .clay-modal__alert-box {
            background: linear-gradient(145deg, #3d2914, #4a3319);
            border: 1px solid #b8860b;
            box-shadow: 0 4px 8px rgba(184, 134, 11, 0.3);

            h2 {
                color: #ffc107;
            }

            p {
                color: #ffd54f;
            }
        }

        .clay-button--cancel {
            background: linear-gradient(145deg, #495057, #343a40);
        }

        .clay-button--warning {
            background: linear-gradient(145deg, #e74c3c, #c0392b);
        }

        .clay-button--warning-trigger {
            background: linear-gradient(145deg, #ff7849, #ff5722);
        }
    }

    .clay-modal--success {
        .clay-modal__alert-box {
            background: linear-gradient(145deg, #1e3a2e, #2d5a3d);
            border: 1px solid #20c997;
            box-shadow: 0 4px 8px rgba(32, 201, 151, 0.3);

            h2 {
                color: #20c997;
            }

            p {
                color: #6bcf7f;
            }
        }

        .clay-button--success {
            background: linear-gradient(145deg, #20c997, #17a2b8);
        }

        .clay-button--success-trigger {
            background: linear-gradient(145deg, #20c997, #17a2b8);
        }
    }
}

@media (max-width: 768px) {
    .clay-modal {
        padding: 1.5em;

        &__content {
            max-height: calc(100vh - 3em);
            padding: 1.5em;
        }

        &__close {
            right: 0.5em;
            top: 0.5em;
        }
    }
}

.clay-modal__content > h1,
.clay-modal__content > h2,
.clay-modal__content > h3 {
    animation: slideInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both;
}

.clay-modal__content > p,
.clay-modal__content > div {
    animation: slideInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.clay-modal--warning {
    .clay-modal__alert-box {
        background: linear-gradient(145deg, #fff3cd, #ffeeba);
        border: 1px solid #ffc107;
        border-radius: 0.5em;
        padding: 1em;
        margin-bottom: 1.5em;
        box-shadow: 0 4px 8px rgba(255, 193, 7, 0.2);

        h2 {
            margin: 0 0 0.5em 0;
            color: #856404;
            font-size: 1.3em;
            display: flex;
            align-items: center;
            gap: 0.5em;
        }

        p {
            color: #856404;
            line-height: 1.6;
            margin: 0;
            font-weight: 500;
        }
    }

    .clay-modal__actions {
        display: flex;
        gap: 1em;
        justify-content: flex-end;
    }

    .clay-button--cancel {
        background: linear-gradient(145deg, #6c757d, #5a6268);
        color: white;
        border: none;
    }

    .clay-button--warning {
        background: linear-gradient(145deg, #dc3545, #c82333);
        color: white;
        border: none;
    }

    .clay-button--warning-trigger {
        background: linear-gradient(145deg, #ff6b35, #ff8c42);
        color: white;
        border: none;
    }
}

.clay-modal--success {
    .clay-modal__alert-box {
        background: linear-gradient(145deg, #d4edda, #c3e6cb);
        border: 1px solid #28a745;
        border-radius: 0.5em;
        padding: 1em;
        margin-bottom: 1.5em;
        box-shadow: 0 4px 8px rgba(40, 167, 69, 0.2);

        h2 {
            margin: 0 0 0.5em 0;
            color: #155724;
            font-size: 1.3em;
            display: flex;
            align-items: center;
            gap: 0.5em;
        }

        p {
            color: #155724;
            line-height: 1.6;
            margin: 0;
            font-weight: 500;
        }
    }

    .clay-modal__actions {
        text-align: right;
    }

    .clay-button--success {
        background: linear-gradient(145deg, #28a745, #20c997);
        color: white;
        border: none;
    }

    .clay-button--success-trigger {
        background: linear-gradient(145deg, #28a745, #20c997);
        color: white;
        border: none;
    }
}
</style>
