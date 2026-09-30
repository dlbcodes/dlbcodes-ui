<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../../../utils/cn";

interface Props {
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
    <div
        :class="
            cn(
                'h-full overflow-hidden p-2 bg-card shadow-xs rounded-[calc(var(--radius)*2.2-0.25rem)]',
                props.class,
            )
        "
    >
        <slot />
    </div>
</template>
