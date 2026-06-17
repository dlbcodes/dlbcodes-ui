<script setup lang="ts">
import { Progress } from "@dlbcodes/my-design-system";
</script>

<template>
    <div class="flex w-full max-w-sm flex-col gap-4">
        <Progress :value="25" />
        <Progress :value="50" />
        <Progress :value="75" />
        <Progress :value="100" />
    </div>
</template>
