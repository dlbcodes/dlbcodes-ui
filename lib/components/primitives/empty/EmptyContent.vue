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
                'flex w-full max-w-sm min-w-0 flex-col items-center gap-3 text-sm text-balance',
                props.class,
            )
        "
    >
        <slot />
    </div>
</template>
