<script setup lang="ts">
import { computed, inject } from "vue";
import type { HTMLAttributes } from "vue";
import { cn } from "../../utils/cn";
import { FieldKey } from "../../core/field-context";

interface Props {
    id?: string;
    modelValue?: boolean;
    required?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    /**
     * Visual-only: render just the box, no input/label. Use when the checkbox
     * sits inside another interactive element (a menu row, an option button)
     * where a nested real input would be invalid. Drive it with :model-value.
     */
    visual?: boolean;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: false,
    visual: false,
});

const emit = defineEmits<{
    "update:modelValue": [value: boolean];
}>();

// Optionally enhanced by a surrounding Field. Own props win.
const field = inject(FieldKey, null);

const resolved = computed(() => ({
    id: props.id ?? field?.id.value,
    required: props.required || (field?.required.value ?? false),
    disabled: props.disabled || (field?.disabled.value ?? false),
    invalid: props.invalid || (field?.invalid.value ?? false),
    describedById: field?.describedById.value,
}));

const boxClass = computed(() =>
    cn(
        "flex size-4 shrink-0 items-center justify-center rounded border transition-colors",
        resolved.value.invalid
            ? "border-danger-text bg-danger-text/10"
            : props.modelValue
              ? "border-bg-inverse bg-bg-inverse"
              : "border-border-strong bg-bg-base",
        props.class,
    ),
);

const onChange = (event: Event): void => {
    emit("update:modelValue", (event.target as HTMLInputElement).checked);
};
</script>

<template>
    <!-- Visual-only: plain box, no interactive elements. -->
    <div v-if="visual" :class="boxClass">
        <svg
            v-if="modelValue"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="pointer-events-none size-3 text-text-inverse"
        >
            <path d="M5 13l4 4L19 7" />
        </svg>
    </div>

    <!--
    Form mode: bare control (no baked-in label — pair with <Label>/<FieldLabel>).
    The no-text <label> wrapper forwards clicks on the visible box to the
    sr-only input.
  -->
    <label
        v-else
        class="inline-flex"
        :class="resolved.disabled && 'opacity-60'"
    >
        <input
            :id="resolved.id"
            type="checkbox"
            :checked="modelValue"
            :required="resolved.required"
            :disabled="resolved.disabled"
            :aria-invalid="resolved.invalid || undefined"
            :aria-required="resolved.required || undefined"
            :aria-describedby="resolved.describedById"
            class="peer sr-only"
            @change="onChange"
        />
        <div
            :class="
                cn(
                    boxClass,
                    'cursor-pointer peer-focus-visible:ring-1 peer-focus-visible:ring-border-strong peer-disabled:cursor-not-allowed',
                )
            "
        >
            <svg
                v-if="modelValue"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="pointer-events-none size-3 text-text-inverse"
            >
                <path d="M5 13l4 4L19 7" />
            </svg>
        </div>
    </label>
</template>
