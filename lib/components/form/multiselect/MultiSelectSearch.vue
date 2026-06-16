<script setup lang="ts">
import SearchInput from "../_shared/SearchInput.vue";
import { useMultiSelectContext } from "./use-context";

interface Props {
    placeholder?: string;
}
withDefaults(defineProps<Props>(), { placeholder: "Search..." });

const ctx = useMultiSelectContext("MultiSelectSearch");
</script>

<template>
    <SearchInput v-model="ctx.query.value" :placeholder="placeholder" />
</template>
