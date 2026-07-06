<script setup lang="ts">
import { ref } from "vue";
import { Skeleton, Button } from "@dlbcodes/ui";

const loading = ref(true);
</script>

<template>
    <div class="flex w-full max-w-sm flex-col gap-4">
        <Button
            variant="outline"
            size="sm"
            class="w-fit"
            @click="loading = !loading"
        >
            {{ loading ? "Show content" : "Show skeleton" }}
        </Button>

        <div v-if="loading" class="flex flex-col gap-2" aria-busy="true">
            <Skeleton class="h-5 w-1/2" />
            <Skeleton class="h-4 w-full" />
            <Skeleton class="h-4 w-5/6" />
        </div>
        <div v-else class="flex flex-col gap-2">
            <div class="text-lg font-semibold text-text-primary">
                Loaded title
            </div>
            <div class="text-sm text-text-secondary">
                This is the real content that appears once loading finishes.
            </div>
        </div>
    </div>
</template>
