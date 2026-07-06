<script setup lang="ts">
import { Separator } from "@dlbcodes/ui";
</script>

<template>
    <!-- Vertical separators need a sized parent — here the row sets the height. -->
    <div class="flex h-6 items-center gap-3 text-sm text-text-secondary">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Components</span>
        <Separator orientation="vertical" />
        <span>Support</span>
    </div>
</template>
