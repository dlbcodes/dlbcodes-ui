<script setup lang="ts">
import { Separator, Button } from "@dlbcodes/ui";
</script>

<template>
    <div
        class="w-full max-w-sm rounded-2xl border border-border-subtle bg-bg-raised p-5"
    >
        <div class="font-medium text-text-primary">Workspace settings</div>
        <div class="mt-1 text-sm text-text-secondary">
            General preferences for this workspace.
        </div>
        <Separator class="my-4" />
        <div class="flex items-center justify-between">
            <span class="text-sm text-text-primary">Danger zone</span>
            <Button variant="destructive" size="sm">Delete</Button>
        </div>
    </div>
</template>
