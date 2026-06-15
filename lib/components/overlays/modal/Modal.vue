<script setup lang="ts">
import { ref, watch, type HTMLAttributes } from "vue";
import { onKeyStroke, useScrollLock } from "@vueuse/core";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import { cn } from "../../../utils/cn";
import { provideModalContext, type ModalCloseReason } from "./modal-context";

type ModalSize =
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";

interface Props {
    modelValue: boolean;
    size?: ModalSize;
    closeOnBackdrop?: boolean;
    persistent?: boolean;
    /**
     * Run before any close. Return false (or a Promise resolving false) to
     * veto the close and keep the modal open — e.g. an "unsaved changes?"
     * confirmation. Receives the reason the close was attempted.
     */
    beforeClose?: (reason: ModalCloseReason) => boolean | Promise<boolean>;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    size: "md",
    closeOnBackdrop: true,
    persistent: false,
});

const emit = defineEmits<{
    "update:modelValue": [value: boolean];
    close: [reason: ModalCloseReason];
}>();

const SIZE_CLASSES: Record<ModalSize, string> = {
    sm: "md:max-w-sm",
    md: "md:max-w-md",
    lg: "md:max-w-lg",
    xl: "md:max-w-xl",
    "2xl": "md:max-w-2xl",
    "3xl": "md:max-w-3xl",
    "4xl": "md:max-w-4xl",
    "5xl": "md:max-w-5xl",
    full: "md:max-w-full h-full rounded-t-none md:rounded-none",
};

/**
 * The single funnel every close path routes through. It enforces
 * persistent/closeOnBackdrop, runs the beforeClose veto, and only then closes —
 * emitting the reason so consumers can branch on how it was dismissed.
 */
const attemptClose = async (reason: ModalCloseReason): Promise<void> => {
    // persistent blocks casual dismissal; only the close button (explicit
    // action) and programmatic closes get through.
    if (
        props.persistent &&
        reason !== "close-button" &&
        reason !== "programmatic"
    ) {
        return;
    }
    // backdrop is independently opt-out-able.
    if (reason === "backdrop" && !props.closeOnBackdrop) return;

    // the veto hook — consumer can cancel the close.
    if (props.beforeClose) {
        const ok = await props.beforeClose(reason);
        if (!ok) return; // vetoed: stay open
    }

    emit("close", reason);
    emit("update:modelValue", false);
};

// Programmatic close used by slot props / ModalClose convenience alias.
const close = (): void => {
    void attemptClose("programmatic");
};

const handleBackdropClick = (): void => {
    void attemptClose("backdrop");
};

onKeyStroke("Escape", (e) => {
    if (!props.modelValue) return;
    e.preventDefault();
    void attemptClose("escape");
});

// SSR-safe (the published lib may run in a Nuxt/SSR consumer).
const isScrollLocked = useScrollLock(
    typeof document !== "undefined" ? document.body : null,
);

const dialogRef = ref<HTMLElement | null>(null);
const { activate, deactivate } = useFocusTrap(dialogRef, {
    immediate: false,
    escapeDeactivates: false,
    allowOutsideClick: true,
});

const labelId = ref<string | undefined>(undefined);
const descriptionId = ref<string | undefined>(undefined);
provideModalContext({
    attemptClose: (reason) => {
        void attemptClose(reason);
    },
    close,
    labelId,
    setLabelId: (id) => {
        labelId.value = id;
    },
    descriptionId,
    setDescriptionId: (id) => {
        descriptionId.value = id;
    },
});

watch(
    () => props.modelValue,
    (isOpen) => {
        isScrollLocked.value = isOpen;
        if (!isOpen) deactivate();
    },
);
</script>

<template>
    <Teleport to="body">
        <Transition
            enter-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="modelValue"
                class="fixed inset-0 z-50 flex items-end justify-center bg-bg-inverse/50 md:items-center"
                @click.self="handleBackdropClick"
            >
                <Transition
                    appear
                    enter-active-class="transition-all duration-200"
                    enter-from-class="opacity-0 scale-95"
                    enter-to-class="opacity-100 scale-100"
                    leave-active-class="transition-all duration-200"
                    leave-from-class="opacity-100 scale-100"
                    leave-to-class="opacity-0 scale-95"
                    @after-enter="() => activate()"
                >
                    <div
                        ref="dialogRef"
                        :class="
                            cn(
                                'relative flex max-h-[calc(100vh-100px)] w-full flex-col overflow-y-auto rounded-3xl border border-border-subtle bg-bg-raised shadow-xs',
                                SIZE_CLASSES[size],
                                props.class,
                            )
                        "
                        role="dialog"
                        aria-modal="true"
                        :aria-labelledby="labelId"
                        :aria-describedby="descriptionId"
                    >
                        <slot :close="close" />
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>
