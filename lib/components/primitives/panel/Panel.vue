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
                'flex flex-col shrink-0 w-full p-1 bg-muted border border-border rounded-3xl shadow-xs overflow-hidden',
                props.class,
            )
        "
    >
        <slot />
    </div>
</template>
