<script setup lang="ts">
import { ref } from "vue";
import { Label, Switch } from "@dlbcodes/ui";

const enabled = ref(false);
</script>

<template>
    <div class="flex items-center gap-2">
        <Switch id="notifications" v-model="enabled" />
        <Label for="notifications">Enable notifications</Label>
    </div>
</template>
