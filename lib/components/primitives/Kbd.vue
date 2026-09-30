<script setup lang="ts">
import { cn } from "../../utils/cn";
import type { HTMLAttributes } from "vue";

interface Props {
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
    <kbd
        :class="
            cn(
                'pointer-events-none inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-1 rounded-sm bg-muted px-1 font-sans text-xs font-medium text-muted-foreground',
                props.class,
            )
        "
    >
        <slot />
    </kbd>
</template>
