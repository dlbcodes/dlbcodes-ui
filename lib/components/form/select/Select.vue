<script setup lang="ts">
import { computed, provide, ref, useId, useSlots, type VNode } from "vue";
import { Listbox } from "@headlessui/vue";
import { Float } from "@headlessui-float/vue";
import { cn } from "../../../utils/cn";
import { SelectKey, type SelectContext } from "./context";
import SelectItem from "./SelectItem.vue";
import type { Placement } from "../../../core/placement";

interface Props {
    modelValue: string;
    searchable?: boolean;
    placement?: Placement;
    offset?: number;
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    searchable: false,
    placement: "bottom-start",
    offset: 4,
});

const emit = defineEmits<{
    "update:modelValue": [value: string];
}>();

const query = ref("");
const slots = useSlots();

// Resolve value→label by walking the slot vnode tree for SelectItem nodes,
// including those nested inside SelectContent's slot. Vnodes exist before (and
// regardless of) rendering, so a pre-filled trigger resolves its label even
// though Float lazy-renders the options. DRY: label is declared once on the item.
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

        // Capture a SelectItem's value/label.
        if (
            node.type === SelectItem &&
            node.props?.value &&
            node.props?.label
        ) {
            map[node.props.value as string] = node.props.label as string;
        }

        // Recurse array children.
        if (Array.isArray(node.children)) {
            visit(node.children);
        }

        // Recurse slot functions (SelectContent's default slot holds the items).
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
                    // a slot may rely on context not present at this point; skip
                }
            }
        }
    };

    visit(slots.default?.({}));
    return map;
});

// Click-captured label wins (covers slot-only items lacking a `label` prop);
// otherwise resolve from the vnode-derived map; raw value as last resort.
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

provide<SelectContext>(SelectKey, {
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
    searchable: computed(() => props.searchable),
    id: useId(),
});
</script>

<template>
    <Listbox v-model="selected" as="div" class="w-full">
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
    </Listbox>
</template>
