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
    { value: "admin", label: "Admin" },
];
const summarize = (count: number, total: number) =>
    `${count} of ${total} permissions`;
</script>

<template>
    <div class="w-full max-w-xs">
        <MultiSelect
            v-model="selected"
            :options="options"
            :summarize="summarize"
            v-slot="{ label, empty }"
        >
            <MultiSelectTrigger :label="label" :empty="empty" />
            <MultiSelectContent>
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
