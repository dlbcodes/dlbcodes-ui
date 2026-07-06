<script setup lang="ts">
import { ref } from "vue";
import { Label, Checkbox } from "@dlbcodes/ui";

const checked = ref(false);
</script>

<template>
    <div class="flex items-center gap-2">
        <Checkbox id="terms" v-model="checked" />
        <Label for="terms">Accept terms and conditions</Label>
    </div>
</template>
