<script setup lang="ts">
import Empty from "../../../lib/components/primitives/empty/Empty.vue";
import EmptyHeader from "../../../lib/components/primitives/empty/EmptyHeader.vue";
import EmptyMedia from "../../../lib/components/primitives/empty/EmptyMedia.vue";
import EmptyTitle from "../../../lib/components/primitives/empty/EmptyTitle.vue";
import EmptyDescription from "../../../lib/components/primitives/empty/EmptyDescription.vue";
import EmptyContent from "../../../lib/components/primitives/empty/EmptyContent.vue";
import Button from "../../../lib/components/primitives/Button.vue";
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
