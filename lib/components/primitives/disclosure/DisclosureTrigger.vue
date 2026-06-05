<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DisclosureButton as HuiDisclosureButton } from "@headlessui/vue";
import { PhCaretDown } from "@phosphor-icons/vue";
import { cn } from "../../../utils/cn";

interface Props {
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
    <HuiDisclosureButton
        v-slot="{ open }"
        :class="
            cn(
                'flex w-full items-center justify-between gap-2 py-4 text-left text-sm font-medium text-text-primary transition-colors',
                'outline-none hover:text-text-secondary focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base rounded-lg',
                props.class,
            )
        "
    >
        <span class="flex-1"><slot :open="open" /></span>
        <PhCaretDown
            class="size-4 shrink-0 text-text-tertiary transition-transform duration-200"
            :class="open && 'rotate-180'"
            aria-hidden="true"
        />
    </HuiDisclosureButton>
</template>
