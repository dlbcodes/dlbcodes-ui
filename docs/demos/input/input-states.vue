<script setup lang="ts">
import { ref } from "vue";
import { Input } from "@dlbcodes/ui";

const a = ref("Can't edit this");
const b = ref("wrong value");
</script>

<template>
    <div class="flex flex-col gap-3 max-w-sm">
        <Input v-model="a" disabled />
        <Input v-model="b" invalid />
    </div>
</template>
