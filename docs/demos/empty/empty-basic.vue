<script setup lang="ts">
import {
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    EmptyDescription,
} from "@dlbcodes/my-design-system";
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
