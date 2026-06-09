<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../../../utils/cn";

interface Props {
    /** Optional group heading. */
    label?: string;
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
    <div :class="cn('flex flex-col gap-0.5 py-2', props.class)">
        <p
            v-if="label"
            class="px-3 pb-1 text-xs font-medium uppercase tracking-wider text-text-tertiary"
        >
            {{ label }}
        </p>
        <slot />
    </div>
</template>
