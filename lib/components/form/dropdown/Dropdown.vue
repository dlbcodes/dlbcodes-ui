<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Menu } from "@headlessui/vue";
import { Float } from "@headlessui-float/vue";
import { cn } from "../../../utils/cn";
import type { Placement } from "../../../core/placement";

interface Props {
    placement?: Placement;
    offset?: number;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    placement: "bottom-start",
    offset: 4,
});
</script>

<template>
    <Menu as="div" :class="cn('relative inline-flex text-left', props.class)">
        <Float
            composable
            floating-as="template"
            :placement="placement"
            :offset="offset"
            flip
            shift
            :z-index="50"
        >
            <slot />
        </Float>
    </Menu>
</template>
