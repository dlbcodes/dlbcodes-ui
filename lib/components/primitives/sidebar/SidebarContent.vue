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
            cn('flex-1 overflow-y-auto scrollbar-thin px-2 py-2', props.class)
        "
    >
        <slot />
    </div>
</template>
