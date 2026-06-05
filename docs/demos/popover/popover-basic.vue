<script setup lang="ts">
import Popover from "../../../lib/components/overlays/popover/Popover.vue";
import PopoverTrigger from "../../../lib/components/overlays/popover/PopoverTrigger.vue";
import PopoverContent from "../../../lib/components/overlays/popover/PopoverContent.vue";
import Button from "../../../lib/components/primitives/Button.vue";
</script>

<template>
    <Popover>
        <PopoverTrigger>
            <Button variant="outline">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent size="sm">
            <p class="text-sm text-text-secondary">
                This is a popover. It floats next to its trigger and closes when
                you click outside.
            </p>
        </PopoverContent>
    </Popover>
</template>
