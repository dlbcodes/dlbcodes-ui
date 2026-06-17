<script setup lang="ts">
import {
    Panel,
    PanelContent,
    Progress,
    Alert,
    AlertTitle,
    AlertDescription,
} from "@dlbcodes/my-design-system";
import { PhWarning } from "@phosphor-icons/vue";

const usage = [
    { label: "Storage", used: "42.8 GB", total: "50 GB", value: 86 },
    { label: "Bandwidth", used: "318 GB", total: "1 TB", value: 31 },
    { label: "API requests", used: "84.2K", total: "100K", value: 84 },
];
</script>

<template>
    <div class="flex w-full flex-col gap-y-4">
        <div class="flex flex-col">
            <div class="text-lg font-medium text-text-primary">Usage</div>
            <div class="text-sm text-text-secondary">
                Your plan resets on the 1st of each month.
            </div>
        </div>

        <Panel>
            <PanelContent class="flex flex-col gap-5 p-5">
                <div
                    v-for="item in usage"
                    :key="item.label"
                    class="flex flex-col gap-2"
                >
                    <div class="flex items-baseline justify-between">
                        <span class="text-sm font-medium text-text-primary">
                            {{ item.label }}
                        </span>
                        <span class="text-xs tabular-nums text-text-secondary">
                            {{ item.used }}
                            <span class="text-text-tertiary"
                                >/ {{ item.total }}</span
                            >
                        </span>
                    </div>
                    <Progress :value="item.value" />
                </div>
            </PanelContent>
        </Panel>

        <Alert variant="warning">
            <template #icon><PhWarning /></template>
            <AlertTitle>Storage almost full</AlertTitle>
            <AlertDescription class="text-xs">
                You've used 86% of your storage. Upgrade to add more.
            </AlertDescription>
        </Alert>
    </div>
</template>
