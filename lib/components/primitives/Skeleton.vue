<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../../utils/cn";

interface Props {
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
    <div
        :class="cn('animate-pulse rounded-md bg-bg-surface', props.class)"
        aria-hidden="true"
    />
</template>
