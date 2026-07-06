<script setup lang="ts">
import { ref } from "vue";
import { Input } from "@dlbcodes/ui";

const a = ref("");
const b = ref("");
</script>

<template>
    <div class="flex flex-col gap-3 max-w-sm">
        <Input v-model="a" size="base" placeholder="Base" />
        <Input v-model="b" size="sm" placeholder="Small" />
    </div>
</template>
