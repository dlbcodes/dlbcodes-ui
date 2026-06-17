<script setup lang="ts">
import { ref } from "vue";
import { Input } from "@dlbcodes/my-design-system";
import { PhMagnifyingGlass } from "@phosphor-icons/vue";

const query = ref("");
</script>

<template>
    <Input v-model="query" placeholder="Search…" class="max-w-sm">
        <PhMagnifyingGlass class="size-4" />
    </Input>
</template>
