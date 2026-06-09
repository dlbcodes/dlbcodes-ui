<script setup lang="ts">
import Empty from "../../../lib/components/primitives/empty/Empty.vue";
import EmptyHeader from "../../../lib/components/primitives/empty/EmptyHeader.vue";
import EmptyMedia from "../../../lib/components/primitives/empty/EmptyMedia.vue";
import EmptyTitle from "../../../lib/components/primitives/empty/EmptyTitle.vue";
import EmptyDescription from "../../../lib/components/primitives/empty/EmptyDescription.vue";
import { PhFolderOpen } from "@phosphor-icons/vue";
</script>

<template>
    <Empty>
        <EmptyHeader>
            <EmptyMedia variant="icon">
                <PhFolderOpen class="size-5" />
            </EmptyMedia>
            <EmptyTitle>No projects yet</EmptyTitle>
            <EmptyDescription>
                You haven't created any projects. Get started by creating your
                first one.
            </EmptyDescription>
        </EmptyHeader>
    </Empty>
</template>
