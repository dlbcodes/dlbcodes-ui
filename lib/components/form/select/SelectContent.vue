<script setup lang="ts">
import { computed } from "vue";
import { ListboxOptions } from "@headlessui/vue";
import { FloatContent } from "@headlessui-float/vue";
import { cn } from "../../../utils/cn";
import {
    popoverVariants,
    type PopoverVariantsProps,
} from "../../../variants/popover";
import { overlayTransition } from "../../../core/transitions";

interface Props {
    /**
     * Panel width. "full" (default) matches the trigger via CSS adaptive-width
     * (both fill Float's relative box). Any size token gives a fixed width.
     */
    width?: PopoverVariantsProps["size"];
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    width: "full",
});

const panelClass = computed(() =>
    cn(
        popoverVariants({ size: props.width }),
        "max-h-80 overflow-y-auto",
        props.class,
    ),
);
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
        <ListboxOptions as="div" :class="panelClass">
            <slot />
        </ListboxOptions>
    </FloatContent>
</template>
