<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { TabPanels } from "@headlessui/vue";

interface Props {
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
    <TabPanels :class="props.class">
        <slot />
    </TabPanels>
</template>
