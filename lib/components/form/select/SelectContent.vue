<script setup lang="ts">
import { computed } from "vue";
import { ListboxOptions } from "@headlessui/vue";
import { FloatContent } from "@headlessui-float/vue";
import { cn } from "../../../utils/cn";
import {
    popoverVariants,
    type PopoverVariantsProps,
} from "../../../variants/popover";

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
        enter="transition ease-out duration-100"
        enter-from="opacity-0 scale-95"
        enter-to="opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leave-from="opacity-100 scale-100"
        leave-to="opacity-0 scale-95"
    >
        <ListboxOptions as="div" :class="panelClass">
            <slot />
        </ListboxOptions>
    </FloatContent>
</template>
