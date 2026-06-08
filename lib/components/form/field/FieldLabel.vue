<script setup lang="ts">
import { computed, inject, type HTMLAttributes } from "vue";
import { cn } from "../../../utils/cn";
import { FieldKey } from "../../../core/field-context";

interface Props {
    for?: string;
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();

const field = inject(FieldKey, null);
const forId = computed(() => props.for ?? field?.id.value);
const required = computed(() => field?.required.value ?? false);
</script>

<template>
    <label
        :for="forId"
        :class="
            cn(
                'w-fit text-sm font-medium text-text-secondary',
                required &&
                    `after:ml-0.5 after:text-danger-text after:content-['*']`,
                props.class,
            )
        "
    >
        <slot />
    </label>
</template>
