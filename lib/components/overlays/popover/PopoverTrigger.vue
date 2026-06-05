<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { PopoverButton } from "@headlessui/vue";
import { FloatReference } from "@headlessui-float/vue";
import { cn } from "../../../utils/cn";

interface Props {
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
    <FloatReference>
        <PopoverButton
            v-slot="{ open }"
            :class="cn('outline-none', props.class)"
        >
            <slot :open="open" />
        </PopoverButton>
    </FloatReference>
</template>
