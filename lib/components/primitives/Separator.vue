<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../../utils/cn";
import {
    separatorVariants,
    type SeparatorVariantsProps,
} from "../../variants/separator";

interface Props {
    orientation?: NonNullable<SeparatorVariantsProps["orientation"]>;
    decorative?: boolean;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    orientation: "horizontal",
    decorative: true,
});
</script>

<template>
    <div
        :class="cn(separatorVariants({ orientation }), props.class)"
        :role="decorative ? 'none' : 'separator'"
        :aria-orientation="decorative ? undefined : orientation"
    />
</template>
