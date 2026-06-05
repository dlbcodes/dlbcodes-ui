<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { PopoverPanel } from "@headlessui/vue";
import { FloatContent } from "@headlessui-float/vue";
import { cn } from "../../../utils/cn";
import {
    popoverVariants,
    type PopoverVariantsProps,
} from "../../../variants/popover";

interface Props {
    size?: PopoverVariantsProps["size"];
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    size: "xs",
});
</script>

<template>
    <FloatContent
        enter="transition duration-200 ease-out"
        enter-from="opacity-0 scale-95"
        enter-to="opacity-100 scale-100"
        leave="transition duration-150 ease-in"
        leave-from="opacity-100 scale-100"
        leave-to="opacity-0 scale-95"
    >
        <PopoverPanel
            v-slot="{ close }"
            :class="cn(popoverVariants({ size: props.size }), props.class)"
        >
            <slot :close="close" />
        </PopoverPanel>
    </FloatContent>
</template>
