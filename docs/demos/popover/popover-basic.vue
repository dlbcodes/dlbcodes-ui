<script setup lang="ts">
import { Popover, PopoverTrigger, PopoverContent, Button } from "@dlbcodes/ui";
import { PhInfo } from "@phosphor-icons/vue";
</script>

<template>
    <div class="flex items-center gap-2">
        <span class="text-sm font-medium text-text-primary"
            >Monthly spend limit</span
        >
        <Popover placement="top">
            <PopoverTrigger as-child v-slot="{ open }">
                <Button
                    variant="icon"
                    size="icon-sm"
                    aria-label="What is this?"
                    :class="open ? 'bg-bg-subtle' : ''"
                >
                    <PhInfo class="size-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent size="sm" class="p-4">
                <div class="text-sm text-text-secondary">
                    The most this workspace can be charged in a billing period.
                    Requests beyond the limit are paused until the next cycle.
                </div>
            </PopoverContent>
        </Popover>
    </div>
</template>
