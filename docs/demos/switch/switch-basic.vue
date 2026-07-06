<script setup lang="ts">
import { ref } from "vue";
import { Switch } from "@dlbcodes/ui";

const on = ref(false);
</script>

<template>
    <Switch v-model="on" aria-label="Toggle setting" />
</template>
