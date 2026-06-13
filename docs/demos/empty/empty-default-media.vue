<script setup lang="ts">
import Empty from "../../../lib/components/primitives/empty/Empty.vue";
import EmptyHeader from "../../../lib/components/primitives/empty/EmptyHeader.vue";
import EmptyMedia from "../../../lib/components/primitives/empty/EmptyMedia.vue";
import EmptyTitle from "../../../lib/components/primitives/empty/EmptyTitle.vue";
import EmptyDescription from "../../../lib/components/primitives/empty/EmptyDescription.vue";
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
