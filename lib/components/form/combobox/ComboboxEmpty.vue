<script setup lang="ts">
import { computed, inject } from "vue";
import { ComboboxKey } from "./context";

const ctx = inject(ComboboxKey);
if (!ctx) throw new Error("ComboboxEmpty must be used inside Combobox");

// Show only when the user has typed and nothing matches.
const show = computed(() => ctx.hasQuery.value && ctx.visibleCount.value === 0);
</script>

<template>
    <div v-if="show" class="px-3 py-6 text-center text-sm text-text-tertiary">
        <slot>No results found.</slot>
    </div>
</template>
