<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { MenuButton } from "@headlessui/vue";
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
        <MenuButton
            :as="asChild ? 'template' : undefined"
            v-slot="{ open }"
            :class="
                asChild
                    ? undefined
                    : cn(
                          'cursor-pointer rounded-lg leading-none outline-none',
                          props.class,
                      )
            "
        >
            <slot :open="open" />
        </MenuButton>
    </FloatReference>
</template>
