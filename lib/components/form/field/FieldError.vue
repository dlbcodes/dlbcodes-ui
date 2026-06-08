<script setup lang="ts">
import { inject, type HTMLAttributes } from "vue";
import { cn } from "../../../utils/cn";
import { FieldKey } from "../../../core/field-context";

interface Props {
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();

const field = inject(FieldKey, null);
</script>

<template>
    <p
        :id="field?.errorId.value"
        role="alert"
        :class="cn('text-sm text-danger-text', props.class)"
    >
        <slot />
    </p>
</template>
