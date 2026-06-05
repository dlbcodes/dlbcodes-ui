<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DisclosurePanel as HuiDisclosurePanel } from "@headlessui/vue";
import { cn } from "../../../utils/cn";

interface Props {
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
    <HuiDisclosurePanel
        :class="cn('pb-4 text-sm text-text-secondary', props.class)"
    >
        <slot />
    </HuiDisclosurePanel>
</template>
