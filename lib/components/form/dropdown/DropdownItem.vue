<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { MenuItem } from "@headlessui/vue";
import { cn } from "../../../utils/cn";
import { menuItemVariants } from "../../../variants/menu-item";

interface Props {
    disabled?: boolean;
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();

const emit = defineEmits<{ select: [] }>();
</script>

<template>
    <MenuItem v-slot="{ active }" :disabled="disabled">
        <button
            type="button"
            :disabled="disabled"
            :data-active="active || undefined"
            :class="
                cn(menuItemVariants(), 'text-text-primary text-sm', props.class)
            "
            @click="emit('select')"
        >
            <slot :active="active" />
        </button>
    </MenuItem>
</template>
