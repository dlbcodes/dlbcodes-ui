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
                'text-base font-medium tracking-tight text-text-primary',
                props.class,
            )
        "
    >
        <slot />
    </p>
</template>
