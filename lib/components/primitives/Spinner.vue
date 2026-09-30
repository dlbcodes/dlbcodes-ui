<script setup lang="ts">
import { cn } from "../../utils/cn";
import type { HTMLAttributes } from "vue";

interface Props {
    label?: string;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    label: "Loading",
});
</script>

<template>
    <span role="status" class="inline-flex">
        <svg
            :class="
                cn('size-6 animate-spin text-muted-foreground/70', props.class)
            "
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
            />
            <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
        <span class="sr-only">{{ label }}</span>
    </span>
</template>
