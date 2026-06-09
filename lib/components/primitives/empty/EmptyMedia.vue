<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../../../utils/cn";
import {
    emptyMediaVariants,
    type EmptyMediaVariants,
} from "../../../variants/empty";

interface Props {
    variant?: EmptyMediaVariants["variant"];
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    variant: "default",
});
</script>

<template>
    <div
        :class="cn(emptyMediaVariants({ variant: props.variant }), props.class)"
    >
        <slot />
    </div>
</template>
