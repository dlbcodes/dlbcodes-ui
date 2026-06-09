<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { PhList } from "@phosphor-icons/vue";
import { cn } from "../../../utils/cn";
import { useSidebar } from "./context";

interface Props {
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const { isMobile, toggle } = useSidebar();
</script>

<template>
    <button
        v-if="isMobile"
        type="button"
        :class="
            cn(
                'inline-flex size-9 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-bg-subtle hover:text-text-primary',
                'outline-none focus-visible:ring-2 focus-visible:ring-border-strong',
                props.class,
            )
        "
        aria-label="Toggle navigation"
        @click="toggle"
    >
        <PhList class="size-5" />
    </button>
</template>
