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
        :class="cn('relative flex flex-col px-6 pb-2 pr-12 pt-4', props.class)"
    >
        <slot />
    </div>
</template>
