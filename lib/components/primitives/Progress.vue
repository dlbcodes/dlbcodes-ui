<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { cn } from "../../utils/cn";

interface Props {
    /** Current value (0–max). Omit for an indeterminate progress bar. */
    value?: number;
    /** Maximum value. */
    max?: number;
    label?: string;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    max: 100,
});

const indeterminate = computed(() => props.value === undefined);

// Clamp to 0–max and compute the fill percentage.
const percent = computed(() => {
    if (props.value === undefined) return 0;
    const clamped = Math.min(Math.max(props.value, 0), props.max);
    return (clamped / props.max) * 100;
});
</script>

<template>
    <div
        role="progressbar"
        :aria-valuemin="0"
        :aria-valuemax="max"
        :aria-valuenow="value"
        :aria-label="label"
        :class="
            cn(
                'relative h-1 w-full overflow-hidden rounded-full bg-muted',
                props.class,
            )
        "
    >
        <!-- Indeterminate: a 40% bar sliding across the track (see tokens.css). -->
        <div
            v-if="indeterminate"
            class="h-full w-2/5 rounded-full bg-brand animate-progress-indeterminate motion-reduce:w-full motion-reduce:animate-pulse"
        />
        <div
            v-else
            class="size-full rounded-full bg-brand transition-transform duration-300"
            :style="{ transform: `translateX(-${100 - percent}%)` }"
        />
    </div>
</template>
