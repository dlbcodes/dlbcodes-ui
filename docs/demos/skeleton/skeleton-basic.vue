<script setup lang="ts">
import Skeleton from "../../../lib/components/primitives/Skeleton.vue";
</script>

<template>
    <div class="flex w-full max-w-sm flex-col gap-2">
        <Skeleton class="h-4 w-3/4" />
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-5/6" />
    </div>
</template>
