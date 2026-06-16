<script setup lang="ts">
import { inject } from "vue";
import SearchInput from "../_shared/SearchInput.vue";
import { SelectKey } from "./context";

interface Props {
    placeholder?: string;
}
withDefaults(defineProps<Props>(), { placeholder: "Search..." });

const ctx = inject(SelectKey);
if (!ctx) throw new Error("SelectSearch must be used inside Select");
</script>

<template>
    <SearchInput v-model="ctx.query.value" :placeholder="placeholder" />
</template>
