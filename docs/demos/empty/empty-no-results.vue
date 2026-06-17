<script setup lang="ts">
import {
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    EmptyDescription,
} from "@dlbcodes/my-design-system";
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
