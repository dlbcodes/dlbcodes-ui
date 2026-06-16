<script setup lang="ts">
import { computed, provide, ref, type HTMLAttributes } from "vue";
import { Popover } from "@headlessui/vue";
import { Float } from "@headlessui-float/vue";
import { cn } from "../../../utils/cn";
import { MultiSelectKey, type MultiSelectOption } from "./context";
import type { Placement } from "../../../core/placement";

interface Props {
    options: MultiSelectOption[];
    placeholder?: string;
    searchable?: boolean;
    placement?: Placement;
    offset?: number;
    summarize?: (count: number, total: number) => string;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    placeholder: "Select options",
    searchable: false,
    placement: "bottom-start",
    offset: 4,
    summarize: (count: number) => `${count} selected`,
});

const model = defineModel<string[]>({ default: () => [] });

const query = ref("");
const selectedSet = computed(() => new Set(model.value));

const filteredOptions = computed(() => {
    if (!props.searchable || !query.value.trim()) return props.options;
    const q = query.value.toLowerCase();
    return props.options.filter((o) => o.label.toLowerCase().includes(q));
});

const filteredAllSelected = computed(
    () =>
        filteredOptions.value.length > 0 &&
        filteredOptions.value.every((o) => selectedSet.value.has(o.value)),
);

const triggerLabel = computed(() => {
    if (model.value.length === 0) return props.placeholder;
    if (model.value.length === 1) {
        return (
            props.options.find((o) => o.value === model.value[0])?.label ??
            props.placeholder
        );
    }
    return props.summarize(model.value.length, props.options.length);
});

const toggle = (value: string): void => {
    const next = new Set(model.value);
    next.has(value) ? next.delete(value) : next.add(value);
    model.value = Array.from(next);
};

const toggleAll = (): void => {
    const next = new Set(model.value);
    if (filteredAllSelected.value) {
        filteredOptions.value.forEach((o) => next.delete(o.value));
    } else {
        filteredOptions.value.forEach((o) => next.add(o.value));
    }
    model.value = Array.from(next);
};

const clear = (): void => {
    model.value = [];
};

provide(MultiSelectKey, {
    isSelected: (value: string) => selectedSet.value.has(value),
    toggle,
    query,
    searchable: computed(() => props.searchable),
    matchesQuery: (label: string) => {
        if (!props.searchable) return true;
        const q = query.value.trim().toLowerCase();
        return !q || label.toLowerCase().includes(q);
    },
});
</script>

<template>
    <Popover as="div" :class="cn('relative w-full', props.class)">
        <Float
            composable
            :placement="placement"
            :offset="offset"
            flip
            :z-index="50"
            adaptive-width
        >
            <slot
                :label="triggerLabel"
                :count="model.length"
                :empty="model.length === 0"
                :all-selected="filteredAllSelected"
                :visible-count="filteredOptions.length"
                :toggle-all="toggleAll"
                :clear="clear"
            />
        </Float>
    </Popover>
</template>
