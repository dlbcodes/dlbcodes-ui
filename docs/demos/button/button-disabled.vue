<script setup lang="ts">
import { Button } from "@dlbcodes/ui";
</script>

<template>
    <div class="flex flex-wrap items-center gap-3">
        <Button :disabled="true">Disabled</Button>
        <Button variant="outline" :disabled="true">Disabled</Button>
    </div>
</template>
