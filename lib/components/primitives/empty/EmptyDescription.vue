<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../../../utils/cn";

interface Props {
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
    <p
        :class="
            cn(
                'text-sm leading-relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 hover:[&>a]:text-brand',
                props.class,
            )
        "
    >
        <slot />
    </p>
</template>
