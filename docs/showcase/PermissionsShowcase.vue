<script setup lang="ts">
import { ref } from "vue";
import {
    MultiSelect,
    MultiSelectTrigger,
    MultiSelectContent,
    MultiSelectItem,
} from "@dlbcodes/ui";

const selected = ref<string[]>(["read", "write"]);

const options = [
    { value: "read", label: "Read" },
    { value: "write", label: "Write" },
    { value: "delete", label: "Delete" },
];

const summarize = (count: number, total: number): string =>
    `${count} of ${total} permissions`;
</script>

<template>
    <div class="flex w-full flex-col gap-4">
        <div class="flex flex-col">
            <div class="text-lg font-medium text-text-primary">Permissions</div>
            <div class="text-sm text-text-secondary">
                Grant one or more access levels for this role.
            </div>
        </div>

        <MultiSelect
            v-model="selected"
            :options="options"
            :summarize="summarize"
            v-slot="{ label, empty }"
        >
            <MultiSelectTrigger :label="label" :empty="empty" />
            <MultiSelectContent size="full">
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
