<script setup lang="ts">
import { Skeleton } from "@dlbcodes/ui";
</script>

<template>
    <div class="flex items-center gap-4">
        <!-- circle (avatar) -->
        <Skeleton class="size-12 rounded-full" />
        <!-- line -->
        <Skeleton class="h-4 w-32" />
        <!-- block -->
        <Skeleton class="h-16 w-24 rounded-xl" />
    </div>
</template>
