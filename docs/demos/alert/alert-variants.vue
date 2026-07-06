<script setup lang="ts">
import { Alert, AlertTitle, AlertDescription } from "@dlbcodes/ui";
import {
    PhInfo,
    PhCheckCircle,
    PhWarning,
    PhXCircle,
} from "@phosphor-icons/vue";
</script>

<template>
    <div class="flex w-full max-w-md flex-col gap-3">
        <Alert variant="info">
            <template #icon><PhInfo /></template>
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>A new version is available.</AlertDescription>
        </Alert>

        <Alert variant="success">
            <template #icon><PhCheckCircle /></template>
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Your changes have been saved.</AlertDescription>
        </Alert>

        <Alert variant="warning">
            <template #icon><PhWarning /></template>
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>Your storage is almost full.</AlertDescription>
        </Alert>

        <Alert variant="danger">
            <template #icon><PhXCircle /></template>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription
                >Something went wrong. Please try again.</AlertDescription
            >
        </Alert>
    </div>
</template>
