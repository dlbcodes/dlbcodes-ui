<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../../utils/cn";

interface Props {
    /** Associates the label with a control by its id. */
    for?: string;
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
    <label
        :for="props.for"
        :class="
            cn(
                'cursor-pointer select-none text-sm font-medium text-foreground',
                props.class,
            )
        "
    >
        <slot />
    </label>
</template>
