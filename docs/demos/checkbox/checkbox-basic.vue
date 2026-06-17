<script setup lang="ts">
import { ref } from "vue";
import { Checkbox, Label } from "@dlbcodes/my-design-system";

const checked = ref(false);
</script>

<template>
    <div class="flex items-center gap-2">
        <Checkbox id="newsletter" v-model="checked" />
        <Label for="newsletter">Subscribe to the newsletter</Label>
    </div>
</template>
