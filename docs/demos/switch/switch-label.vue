<script setup lang="ts">
import { ref } from "vue";
import { Switch, Label } from "@dlbcodes/my-design-system";

const enabled = ref(true);
</script>

<template>
    <div class="flex items-center gap-2">
        <Switch id="airplane" v-model="enabled" />
        <Label for="airplane">Airplane mode</Label>
    </div>
</template>
