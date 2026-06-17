<script setup lang="ts">
import { computed, provide, useId, type HTMLAttributes } from "vue";
import { cn } from "../../../utils/cn";
import { FieldKey } from "../../../core/field-context";

interface Props {
    id?: string;
    orientation?: "vertical" | "horizontal";
    invalid?: boolean;
    disabled?: boolean;
    required?: boolean;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    orientation: "vertical",
    invalid: false,
    disabled: false,
    required: false,
});

const generatedId = useId();
const id = computed(() => props.id ?? generatedId);
const descriptionId = computed(() => `${id.value}-description`);
const errorId = computed(() => `${id.value}-error`);
// shadcn parity: the control is always described by the description, and ALSO
// by the error when invalid. (Original dropped the description entirely.)
const describedById = computed(() =>
    props.invalid
        ? `${descriptionId.value} ${errorId.value}`
        : descriptionId.value,
);

provide(FieldKey, {
    id,
    descriptionId,
    errorId,
    describedById,
    invalid: computed(() => props.invalid),
    disabled: computed(() => props.disabled),
    required: computed(() => props.required),
});

const layout = computed(() =>
    props.orientation === "horizontal"
        ? "flex items-center gap-x-2"
        : "flex flex-col gap-y-1.5",
);
</script>

<template>
    <div
        role="group"
        :data-invalid="invalid || undefined"
        :data-disabled="disabled || undefined"
        :class="cn(layout, props.class)"
    >
        <slot />
    </div>
</template>
