<script setup lang="ts">
import { Kbd } from "@dlbcodes/ui";

const shortcuts = [
    { keys: ["⌘", "K"], action: "Open command menu" },
    { keys: ["⌘", "/"], action: "Toggle sidebar" },
    { keys: ["G", "D"], action: "Go to Dashboard" },
    { keys: ["G", "T"], action: "Go to Team" },
    { keys: ["C"], action: "Create new project" },
    { keys: ["?"], action: "Show this help" },
];
</script>

<template>
    <div class="flex flex-col gap-4 w-full">
        <div class="flex flex-col">
            <div class="text-lg font-medium text-text-primary">
                Keyboard shortcuts
            </div>
            <div class="text-sm text-text-secondary">
                Move faster with these shortcuts.
            </div>
        </div>

        <div class="flex flex-col">
            <div
                v-for="s in shortcuts"
                :key="s.action"
                class="flex items-center justify-between border-b border-border-subtle py-2.5 last:border-b-0"
            >
                <span class="text-sm text-text-secondary">{{ s.action }}</span>
                <span class="flex items-center gap-1">
                    <Kbd v-for="k in s.keys" :key="k">{{ k }}</Kbd>
                </span>
            </div>
        </div>
    </div>
</template>
