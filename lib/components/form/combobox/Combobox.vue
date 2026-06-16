<script setup lang="ts">
import { computed, provide, ref, useId, useSlots, type VNode } from "vue";
import { Combobox as HuiCombobox } from "@headlessui/vue";
import { Float } from "@headlessui-float/vue";
import { cn } from "../../../utils/cn";
import { ComboboxKey, type ComboboxContext } from "./context";
import ComboboxItem from "./ComboboxItem.vue";
import type { Placement } from "../../../core/placement";

interface Props {
    modelValue: string;
    placement?: Placement;
    offset?: number;
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    placement: "bottom-start",
    offset: 4,
});

const emit = defineEmits<{
    "update:modelValue": [value: string];
}>();

const query = ref("");
const slots = useSlots();

// Resolve value→label from ComboboxItem vnodes (so a pre-filled value displays
// its label without the lazy-rendered options having opened). The label is data
// in the vnode tree, available before render.
const labelMap = computed<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    const visit = (input: unknown): void => {
        if (input == null) return;
        if (Array.isArray(input)) {
            input.forEach(visit);
            return;
        }
        if (typeof input !== "object") return;
        const node = input as VNode;
        if (
            node.type === ComboboxItem &&
            node.props?.value &&
            node.props?.label
        ) {
            map[node.props.value as string] = node.props.label as string;
        }
        if (Array.isArray(node.children)) visit(node.children);
        const children = node.children as Record<string, unknown> | null;
        if (
            children &&
            typeof children === "object" &&
            !Array.isArray(children)
        ) {
            const def = (children as { default?: () => unknown }).default;
            if (typeof def === "function") {
                try {
                    visit(def());
                } catch {
                    /* slot may need context not present here; skip */
                }
            }
        }
    };
    visit(slots.default?.({}));
    return map;
});

const capturedLabel = ref("");
const capturedValue = ref("");

const selectedLabel = computed(() => {
    if (capturedValue.value === props.modelValue && capturedLabel.value) {
        return capturedLabel.value;
    }
    return labelMap.value[props.modelValue] || props.modelValue;
});

const selected = computed({
    get: () => props.modelValue,
    set: (value: string) => emit("update:modelValue", value),
});

const matchesQuery = (label: string): boolean => {
    const q = query.value.trim().toLowerCase();
    return !q || label.toLowerCase().includes(q);
};

// Track which items currently match the query, so ComboboxEmpty can show a
// "no results" message when none do.
const visibleItems = ref<Record<string, boolean>>({});
const setItemVisible = (key: string, visible: boolean): void => {
    if (visibleItems.value[key] === visible) return;
    visibleItems.value = { ...visibleItems.value, [key]: visible };
};
const visibleCount = computed(
    () => Object.values(visibleItems.value).filter(Boolean).length,
);
const hasQuery = computed(() => query.value.trim().length > 0);

provide<ComboboxContext>(ComboboxKey, {
    selected: computed(() => props.modelValue),
    selectedLabel,
    select: (value: string, label: string) => {
        capturedValue.value = value;
        capturedLabel.value = label;
        selected.value = value;
        query.value = "";
    },
    isSelected: (value: string) => props.modelValue === value,
    registerLabel: () => {
        /* superseded by the vnode walk; kept for context shape */
    },
    query,
    matchesQuery,
    setItemVisible,
    visibleCount,
    hasQuery,
    id: useId(),
});
</script>

<template>
    <HuiCombobox v-model="selected" as="div" class="w-full">
        <Float
            as="div"
            :class="cn('relative', props.class)"
            composable
            floating-as="template"
            :placement="placement"
            :offset="offset"
            flip
            :z-index="50"
        >
            <slot />
        </Float>
    </HuiCombobox>
</template>
