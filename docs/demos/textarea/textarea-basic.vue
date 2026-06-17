<script setup lang="ts">
import { ref } from "vue";
import { Textarea } from "@dlbcodes/my-design-system";

const value = ref("");
</script>

<template>
    <Textarea v-model="value" placeholder="Write a message…" class="max-w-md" />
</template>
