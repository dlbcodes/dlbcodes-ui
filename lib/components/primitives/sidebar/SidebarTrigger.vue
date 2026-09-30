<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { PhList } from "@phosphor-icons/vue";
import { cn } from "../../../utils/cn";
import { useSidebar } from "./context";

interface Props {
    class?: HTMLAttributes["class"];
}
const props = defineProps<Props>();
const { toggle } = useSidebar();
</script>

<template>
    <button
        type="button"
        :class="
            cn(
                'inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
                'outline-none focus-visible:ring-2 focus-visible:ring-ring',
                props.class,
            )
        "
        aria-label="Toggle navigation"
        @click="toggle"
    >
        <PhList class="size-5" />
    </button>
</template>
