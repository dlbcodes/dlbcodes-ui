<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { PhX } from "@phosphor-icons/vue";
import { cn } from "../../../utils/cn";
import { useModalContext } from "./modal-context";
import Button from "../../primitives/Button.vue";

interface Props {
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();

const { attemptClose } = useModalContext();
</script>

<template>
    <Button
        variant="icon"
        size="icon"
        aria-label="Close"
        :class="cn('absolute right-4 top-4', props.class)"
        @click="attemptClose('close-button')"
    >
        <slot><PhX class="size-5" /></slot>
    </Button>
</template>
