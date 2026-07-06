<script setup lang="ts">
import { ref } from "vue";
import { Textarea } from "@dlbcodes/ui";

const value = ref("");
</script>

<template>
    <div class="w-full max-w-md">
        <Textarea v-model="value" placeholder="Write a message…" />
    </div>
</template>
