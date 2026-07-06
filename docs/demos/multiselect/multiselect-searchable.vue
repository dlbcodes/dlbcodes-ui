<script setup lang="ts">
import { ref } from "vue";
import {
    MultiSelect,
    MultiSelectTrigger,
    MultiSelectContent,
    MultiSelectItem,
    MultiSelectSearch,
} from "@dlbcodes/ui";

const selected = ref<string[]>(["us"]);
const options = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "pt", label: "Portugal" },
    { value: "br", label: "Brazil" },
    { value: "de", label: "Germany" },
    { value: "jp", label: "Japan" },
];
</script>

<template>
    <div class="w-full max-w-xs">
        <MultiSelect
            v-model="selected"
            :options="options"
            searchable
            placeholder="Select countries"
            v-slot="{ label, empty, allSelected, toggleAll }"
        >
            <MultiSelectTrigger :label="label" :empty="empty" />
            <MultiSelectContent>
                <MultiSelectSearch placeholder="Search countries…" />
                <button
                    type="button"
                    class="w-full px-3 py-1.5 text-left text-sm text-text-secondary hover:bg-bg-surface rounded-lg"
                    @click="toggleAll"
                >
                    {{ allSelected ? "Deselect all" : "Select all" }}
                </button>
                <MultiSelectItem
                    v-for="o in options"
                    :key="o.value"
                    :value="o.value"
                    :label="o.label"
                />
            </MultiSelectContent>
        </MultiSelect>
    </div>
</template>
