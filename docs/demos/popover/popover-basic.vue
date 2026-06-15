<script setup lang="ts">
import Popover from "../../../lib/components/overlays/popover/Popover.vue";
import PopoverTrigger from "../../../lib/components/overlays/popover/PopoverTrigger.vue";
import PopoverContent from "../../../lib/components/overlays/popover/PopoverContent.vue";
import Button from "../../../lib/components/primitives/Button.vue";
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
            <PopoverContent size="sm">
                <div class="text-sm text-text-secondary">
                    The most this workspace can be charged in a billing period.
                    Requests beyond the limit are paused until the next cycle.
                </div>
            </PopoverContent>
        </Popover>
    </div>
</template>
