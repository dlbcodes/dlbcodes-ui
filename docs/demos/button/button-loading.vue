<script setup lang="ts">
import { Button } from "@dlbcodes/my-design-system";
</script>

<template>
    <div class="flex flex-wrap items-center gap-3">
        <Button :loading="true" loading-text="Saving…">Save</Button>
        <Button variant="outline" :loading="true">Loading</Button>
    </div>
</template>
