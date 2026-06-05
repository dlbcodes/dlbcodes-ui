<script setup lang="ts">
import Popover from "../../../lib/components/overlays/popover/Popover.vue";
import PopoverTrigger from "../../../lib/components/overlays/popover/PopoverTrigger.vue";
import PopoverContent from "../../../lib/components/overlays/popover/PopoverContent.vue";
import Button from "../../../lib/components/primitives/Button.vue";
</script>

<template>
    <div class="flex gap-3">
        <Popover placement="top">
            <PopoverTrigger
                ><Button variant="outline">Top</Button></PopoverTrigger
            >
            <PopoverContent size="xs">
                <p class="text-sm text-text-secondary">Opens above.</p>
            </PopoverContent>
        </Popover>

        <Popover placement="bottom">
            <PopoverTrigger
                ><Button variant="outline">Bottom</Button></PopoverTrigger
            >
            <PopoverContent size="xs">
                <p class="text-sm text-text-secondary">Opens below.</p>
            </PopoverContent>
        </Popover>
    </div>
</template>
