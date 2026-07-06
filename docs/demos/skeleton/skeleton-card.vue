<script setup lang="ts">
import { Skeleton } from "@dlbcodes/ui";
</script>

<template>
    <div
        class="w-full max-w-sm rounded-2xl border border-border-subtle bg-bg-raised p-5"
    >
        <div class="flex items-center gap-3">
            <Skeleton class="size-12 shrink-0 rounded-full" />
            <div class="flex flex-1 flex-col gap-2">
                <Skeleton class="h-4 w-1/2" />
                <Skeleton class="h-3 w-1/3" />
            </div>
        </div>
        <div class="mt-4 flex flex-col gap-2">
            <Skeleton class="h-3 w-full" />
            <Skeleton class="h-3 w-full" />
            <Skeleton class="h-3 w-2/3" />
        </div>
    </div>
</template>
