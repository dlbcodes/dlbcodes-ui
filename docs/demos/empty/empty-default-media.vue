<script setup lang="ts">
import {
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    EmptyDescription,
} from "@dlbcodes/my-design-system";
import { PhTray } from "@phosphor-icons/vue";
</script>

<template>
    <Empty>
        <EmptyHeader>
            <EmptyMedia>
                <PhTray class="size-10 text-text-tertiary" />
            </EmptyMedia>
            <EmptyTitle>Your inbox is empty</EmptyTitle>
            <EmptyDescription>
                New messages will appear here.
            </EmptyDescription>
        </EmptyHeader>
    </Empty>
</template>
