<script setup lang="ts">
import { computed, inject, onMounted, ref, watch } from "vue";
import { ListboxOption } from "@headlessui/vue";
import { PhCheck } from "@phosphor-icons/vue";
import { SelectKey } from "./context";
import { cn } from "../../../utils/cn";
import { menuItemVariants } from "../../../variants/menu-item";

interface Props {
    value: string;
    /**
     * Display label for this option. Provide it so a pre-filled select shows
     * the correct label before any click. If omitted, falls back to the
     * rendered slot text (only available after the item renders).
     */
    label?: string;
    disabled?: boolean;
}

const props = defineProps<Props>();

const ctx = inject(SelectKey);
if (!ctx) throw new Error("SelectItem must be used inside Select");

// Ref to the rendered label element, used as the fallback when no `label`
// prop is given (and for search matching on slot-only items).
const labelEl = ref<HTMLElement>();

const resolvedLabel = (): string =>
    props.label ?? labelEl.value?.textContent?.trim() ?? "";

// Prop-based label: register synchronously when the instance is created — no
// DOM/mount needed, so a pre-filled trigger resolves the label immediately.
if (props.label) {
    ctx.registerLabel(props.value, props.label);
}

// Slot-text fallback (no label prop): the text only exists once rendered, so
// register it on mount.
onMounted(() => {
    if (!props.label) ctx.registerLabel(props.value, resolvedLabel());
});

// Keep the registration fresh if the label prop changes.
watch(
    () => props.label,
    (next) => {
        if (next) ctx.registerLabel(props.value, next);
    },
);

// Self-filter: when searching, hide items whose label doesn't match.
const visible = computed(() => {
    if (!ctx.searchable.value) return true;
    const q = ctx.query.value.trim().toLowerCase();
    return !q || resolvedLabel().toLowerCase().includes(q);
});

const onSelect = (): void => {
    if (props.disabled) return;
    ctx.select(props.value, resolvedLabel());
};
</script>

<template>
    <ListboxOption
        v-show="visible"
        v-slot="{ active, selected }"
        :value="value"
        :disabled="disabled"
        as="template"
    >
        <div
            role="option"
            :data-active="active || undefined"
            :class="
                cn(
                    menuItemVariants({ indicator: 'trailing-check' }),
                    disabled && 'pointer-events-none opacity-50',
                )
            "
            @click="onSelect"
        >
            <span
                ref="labelEl"
                :class="['block truncate', selected && 'font-semibold']"
            >
                <slot :active="active" :selected="selected">{{ label }}</slot>
            </span>
            <span
                v-if="selected"
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-accent-pro-200"
            >
                <PhCheck class="size-5" aria-hidden="true" />
            </span>
        </div>
    </ListboxOption>
</template>
