<script setup lang="ts">
import { ref } from "vue";
import { Textarea } from "@dlbcodes/my-design-system";
const value = ref("");
</script>
<template>
    <div class="w-full max-w-md">
        <Textarea
            v-model="value"
            autosize
            :rows="4"
            placeholder="Type several lines — I grow…"
        />
    </div>
</template>
