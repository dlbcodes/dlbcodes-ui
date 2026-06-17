<script setup lang="ts">
import { Alert, AlertDescription } from "@dlbcodes/my-design-system";
import { PhInfo } from "@phosphor-icons/vue";
</script>

<template>
    <div class="w-full max-w-md">
        <Alert variant="info">
            <template #icon><PhInfo /></template>
            <AlertDescription>
                A short, single-line informational message — no title needed.
            </AlertDescription>
        </Alert>
    </div>
</template>
