<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { MenuItems } from "@headlessui/vue";
import { cn } from "../../../utils/cn";
import { FloatContent } from "@headlessui-float/vue";
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
    size: "full",
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
        <MenuItems
            :class="cn(popoverVariants({ size: props.size }), props.class)"
        >
            <slot />
        </MenuItems>
    </FloatContent>
</template>
