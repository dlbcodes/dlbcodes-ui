<script setup lang="ts">
import { computed, inject, useId } from "vue";
import type { HTMLAttributes } from "vue";
import { cn } from "../../utils/cn";
import { FieldKey } from "../../core/field-context";

interface Props {
    modelValue: boolean;
    id?: string;
    disabled?: boolean;
    /** Accessible name when there's no associated <Label>. */
    ariaLabel?: string;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    disabled: false,
});

const emit = defineEmits<{
    "update:modelValue": [value: boolean];
}>();

// Optionally enhanced by a surrounding Field. Own props win.
const field = inject(FieldKey, null);

// Every switch needs a stable id (label association, autofill identification).
// Precedence: explicit prop > Field context > own generated fallback.
const fallbackId = useId();

const resolved = computed(() => ({
    id: props.id ?? field?.id.value ?? fallbackId,
    disabled: props.disabled || (field?.disabled.value ?? false),
    describedById: field?.describedById.value,
}));

const onChange = (event: Event): void => {
    emit("update:modelValue", (event.target as HTMLInputElement).checked);
};
</script>

<template>
    <label
        class="relative inline-flex"
        :class="resolved.disabled && 'opacity-60'"
    >
        <input
            :id="resolved.id"
            type="checkbox"
            role="switch"
            :checked="modelValue"
            :aria-checked="modelValue"
            :aria-label="ariaLabel"
            :aria-describedby="resolved.describedById"
            :disabled="resolved.disabled"
            class="peer sr-only"
            @change="onChange"
        />

        <div
            :class="
                cn(
                    'h-6 w-11 cursor-pointer rounded-full bg-bg-subtle transition-colors',
                    'after:absolute after:start-s-0.5 after:top-0.5 after:size-5 after:rounded-full after:border after:border-border-strong after:bg-bg-base after:transition-all after:content-[\'\']',
                    'peer-checked:bg-bg-inverse peer-checked:after:translate-x-full peer-checked:after:border-bg-inverse',
                    'peer-focus-visible:ring-1 peer-focus-visible:ring-border-strong',
                    'peer-disabled:cursor-not-allowed',
                    props.class,
                )
            "
        />
    </label>
</template>
