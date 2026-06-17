<script setup lang="ts">
import {
    Alert,
    AlertTitle,
    AlertDescription,
    Button,
} from "@dlbcodes/my-design-system";
import { PhSealWarning } from "@phosphor-icons/vue";
</script>

<template>
    <div class="w-full max-w-md">
        <Alert variant="warning">
            <template #icon><PhSealWarning /></template>
            <AlertTitle>Subscription expiring</AlertTitle>
            <AlertDescription>Your plan renews in 3 days.</AlertDescription>
            <template #action>
                <Button variant="ghost" size="sm">Renew</Button>
            </template>
        </Alert>
    </div>
</template>
