<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../../../utils/cn";

interface Props {
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
    <div :class="cn('flex items-center gap-2 px-4 py-4', props.class)">
        <slot />
    </div>
</template>
