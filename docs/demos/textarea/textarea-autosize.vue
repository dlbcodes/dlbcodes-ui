<!-- docs/demos/textarea/textarea-autosize.vue -->
<script setup lang="ts">
import { ref } from "vue";
import { Textarea } from "@dlbcodes/my-design-system";
const value = ref("");
</script>
<template>
    <Textarea
        v-model="value"
        autosize
        :rows="4"
        placeholder="Type several lines — I grow…"
        class="max-w-md"
    />
</template>
