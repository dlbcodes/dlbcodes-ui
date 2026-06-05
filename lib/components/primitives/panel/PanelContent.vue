<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../../../utils/cn";

interface Props {
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
    <!-- rounded-[20px] = rounded-3xl (24px) − p-1 (4px) for concentric nesting inside Panel -->
    <div
        :class="
            cn(
                'h-full overflow-hidden p-2 bg-bg-raised shadow-xs rounded-[20px]',
                props.class,
            )
        "
    >
        <slot />
    </div>
</template>
