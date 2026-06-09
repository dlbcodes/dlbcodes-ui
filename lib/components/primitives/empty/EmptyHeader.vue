<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../../../utils/cn";

interface Props {
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
    <div :class="cn('flex max-w-sm flex-col items-center gap-2', props.class)">
        <slot />
    </div>
</template>
