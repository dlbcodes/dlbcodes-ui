<script setup lang="ts">
import { Progress } from "@dlbcodes/ui";
</script>

<template>
    <div class="flex w-full max-w-sm flex-col gap-2">
        <Progress :value="3" :max="5" />
        <span class="text-sm text-text-secondary">Step 3 of 5</span>
    </div>
</template>
