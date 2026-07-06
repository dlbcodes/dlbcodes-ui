<script setup lang="ts">
import {
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    EmptyDescription,
    EmptyContent,
    Button,
} from "@dlbcodes/ui";
import { PhPlus, PhRocket } from "@phosphor-icons/vue";
</script>

<template>
    <Empty>
        <EmptyHeader>
            <EmptyMedia variant="icon">
                <PhRocket class="size-5" />
            </EmptyMedia>
            <EmptyTitle>Launch your first campaign</EmptyTitle>
            <EmptyDescription>
                Campaigns help you reach your audience. Create one to begin.
            </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
            <Button variant="primary">
                <PhPlus class="size-4" />
                New campaign
            </Button>
        </EmptyContent>
    </Empty>
</template>
