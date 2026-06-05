<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Popover } from "@headlessui/vue";
import { Float } from "@headlessui-float/vue";
import { cn } from "../../../utils/cn";

type Placement =
    | "bottom-start"
    | "bottom-end"
    | "bottom"
    | "top-start"
    | "top-end"
    | "top"
    | "left"
    | "right";

interface Props {
    placement?: Placement;
    offset?: number;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    placement: "bottom-end",
    offset: 4,
});
</script>

<template>
    <Popover as="div" :class="cn('relative', props.class)">
        <!-- Composable mode: FloatReference (Trigger) + FloatContent (Content)
             are the positional children, declared in the part components.
             No adaptive-width — a popover is content/size-driven, not
             trigger-width-matched (that's the Select case). -->
        <Float
            composable
            :placement="placement"
            :offset="offset"
            flip
            :z-index="50"
        >
            <slot />
        </Float>
    </Popover>
</template>
