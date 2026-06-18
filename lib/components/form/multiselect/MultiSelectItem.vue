<script setup lang="ts">
import { computed } from "vue";
import Checkbox from "../../form/Checkbox.vue";
import { cn } from "../../../utils/cn";
import { menuItemVariants } from "../../../variants/menu-item";
import { useMultiSelectContext } from "./use-context";

interface Props {
    value: string;
    label: string;
    disabled?: boolean;
}

const props = defineProps<Props>();

const ctx = useMultiSelectContext("MultiSelectItem");

const selected = computed(() => ctx.isSelected(props.value));
const visible = computed(() => ctx.matchesQuery(props.label));
</script>

<template>
    <button
        v-show="visible"
        type="button"
        :disabled="disabled"
        :aria-pressed="selected"
        :class="
            cn(
                menuItemVariants({ indicator: 'leading-control' }),
                // Hand-rolled list: no Headless active-index, so the base's
                // data-active highlight never fires here. Keep an explicit
                // hover highlight (same token) plus button text alignment.
                'text-left hover:bg-bg-surface',
            )
        "
        @click="ctx.toggle(value)"
    >
        <Checkbox :model-value="selected" visual />
        <slot :selected="selected">
            <span
                class="truncate"
                :class="selected ? 'font-medium' : 'font-normal'"
            >
                {{ label }}
            </span>
        </slot>
    </button>
</template>
