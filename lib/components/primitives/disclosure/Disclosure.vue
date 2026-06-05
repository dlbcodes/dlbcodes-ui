<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Disclosure as HuiDisclosure } from "@headlessui/vue";
import { cn } from "../../../utils/cn";

interface Props {
    /** Whether the panel starts open. */
    defaultOpen?: boolean;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    defaultOpen: false,
});
</script>

<template>
    <HuiDisclosure
        v-slot="{ open }"
        :default-open="defaultOpen"
        as="div"
        :class="cn('border-b border-border-subtle', props.class)"
    >
        <slot :open="open" />
    </HuiDisclosure>
</template>
