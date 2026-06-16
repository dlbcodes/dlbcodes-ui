<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { PopoverPanel } from "@headlessui/vue";
import { FloatContent } from "@headlessui-float/vue";
import { cn } from "../../../utils/cn";
import {
    popoverVariants,
    type PopoverVariantsProps,
} from "../../../variants/popover";
import { overlayTransition } from "../../../core/transitions";

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
        as="template"
        :enter="overlayTransition.enter"
        :enter-from="overlayTransition.enterFrom"
        :enter-to="overlayTransition.enterTo"
        :leave="overlayTransition.leave"
        :leave-from="overlayTransition.leaveFrom"
        :leave-to="overlayTransition.leaveTo"
    >
        <PopoverPanel
            static
            :class="
                cn(popoverVariants({ size: props.size }), 'p-1', props.class)
            "
        >
            <slot />
        </PopoverPanel>
    </FloatContent>
</template>
