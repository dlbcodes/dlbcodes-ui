<script setup lang="ts">
import Empty from "../../../lib/components/primitives/empty/Empty.vue";
import EmptyHeader from "../../../lib/components/primitives/empty/EmptyHeader.vue";
import EmptyMedia from "../../../lib/components/primitives/empty/EmptyMedia.vue";
import EmptyTitle from "../../../lib/components/primitives/empty/EmptyTitle.vue";
import EmptyDescription from "../../../lib/components/primitives/empty/EmptyDescription.vue";
import { PhMagnifyingGlass } from "@phosphor-icons/vue";
</script>

<template>
    <Empty>
        <EmptyHeader>
            <EmptyMedia variant="icon">
                <PhMagnifyingGlass class="size-5" />
            </EmptyMedia>
            <EmptyTitle>No results found</EmptyTitle>
            <EmptyDescription>
                We couldn't find anything matching your search. Try a different
                term.
            </EmptyDescription>
        </EmptyHeader>
    </Empty>
</template>
