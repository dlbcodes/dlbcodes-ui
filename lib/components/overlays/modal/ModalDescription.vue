<script setup lang="ts">
import { onMounted, onUnmounted, useId, type HTMLAttributes } from "vue";
import { cn } from "../../../utils/cn";
import { useModalContext } from "./modal-context";

interface Props {
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();

const { setDescriptionId } = useModalContext();
const id = useId();

onMounted(() => setDescriptionId(id));
onUnmounted(() => setDescriptionId(undefined));
</script>

<template>
    <p :id="id" :class="cn('text-sm text-muted-foreground', props.class)">
        <slot />
    </p>
</template>
