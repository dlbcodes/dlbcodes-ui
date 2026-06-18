<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { PopoverButton } from "@headlessui/vue";
import { FloatReference } from "@headlessui-float/vue";
import { cn } from "../../../utils/cn";

interface Props {
    asChild?: boolean;
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
    <FloatReference>
        <PopoverButton
            :as="asChild ? 'template' : undefined"
            v-slot="{ open }"
            :class="
                asChild
                    ? undefined
                    : cn(
                          'cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-border-strong',
                          props.class,
                      )
            "
        >
            <slot :open="open" />
        </PopoverButton>
    </FloatReference>
</template>
