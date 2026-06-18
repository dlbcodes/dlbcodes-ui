<script setup lang="ts">
import {
    computed,
    inject,
    onMounted,
    onBeforeUnmount,
    ref,
    watch,
    watchEffect,
    useId,
} from "vue";
import { ComboboxOption } from "@headlessui/vue";
import { PhCheck } from "@phosphor-icons/vue";
import { ComboboxKey } from "./context";
import { cn } from "../../../utils/cn";
import { menuItemVariants } from "../../../variants/menu-item";

interface Props {
    value: string;
    label?: string;
    disabled?: boolean;
}

const props = defineProps<Props>();

const ctx = inject(ComboboxKey);
if (!ctx) throw new Error("ComboboxItem must be used inside Combobox");

const itemKey = useId(); // stable per-item key for the visibility registry

const labelEl = ref<HTMLElement>();
const resolvedLabel = (): string =>
    props.label ?? labelEl.value?.textContent?.trim() ?? "";

if (props.label) ctx.registerLabel(props.value, props.label);
onMounted(() => {
    if (!props.label) ctx.registerLabel(props.value, resolvedLabel());
});
watch(
    () => props.label,
    (next) => {
        if (next) ctx.registerLabel(props.value, next);
    },
);

const visible = computed(() => ctx.matchesQuery(resolvedLabel()));

// Report visibility to the context so ComboboxEmpty can count matches.
watchEffect(() => ctx.setItemVisible(itemKey, visible.value));
onBeforeUnmount(() => ctx.setItemVisible(itemKey, false));

const onSelect = (): void => {
    if (props.disabled) return;
    ctx.select(props.value, resolvedLabel());
};
</script>

<template>
    <ComboboxOption
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
    </ComboboxOption>
</template>
