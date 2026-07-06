<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Progress, Button } from "@dlbcodes/ui";

const value = ref(10);
let timer: ReturnType<typeof setInterval> | undefined;

const start = (): void => {
    value.value = 0;
    clearInterval(timer);
    timer = setInterval(() => {
        value.value += 10;
        if (value.value >= 100) clearInterval(timer);
    }, 400);
};

onMounted(start);
onUnmounted(() => clearInterval(timer));
</script>

<template>
    <div class="flex w-full max-w-sm flex-col gap-3">
        <Progress :value="value" />
        <div class="flex items-center justify-between">
            <span class="text-sm text-text-secondary">{{ value }}%</span>
            <Button variant="outline" size="sm" @click="start">Restart</Button>
        </div>
    </div>
</template>
