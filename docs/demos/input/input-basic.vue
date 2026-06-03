<script setup lang="ts">
import { ref } from "vue";
import Input from "../../../lib/components/form/Input.vue";

const value = ref("");
</script>

<template>
    <Input v-model="value" placeholder="Type something…" class="max-w-sm" />
</template>
