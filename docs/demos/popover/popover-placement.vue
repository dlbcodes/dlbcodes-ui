<script setup lang="ts">
import Popover from "../../../lib/components/overlays/popover/Popover.vue";
import PopoverTrigger from "../../../lib/components/overlays/popover/PopoverTrigger.vue";
import PopoverContent from "../../../lib/components/overlays/popover/PopoverContent.vue";
import Button from "../../../lib/components/primitives/Button.vue";

const placements = [
    { p: "top", label: "Top" },
    { p: "bottom", label: "Bottom" },
] as const;
</script>

<template>
    <div class="flex flex-wrap gap-3">
        <Popover v-for="{ p, label } in placements" :key="p" :placement="p">
            <PopoverTrigger as-child>
                <Button variant="outline">{{ label }}</Button>
            </PopoverTrigger>
            <PopoverContent size="xs" class="p-4">
                <div class="text-sm text-text-secondary">
                    Opens to the {{ label.toLowerCase() }}.
                </div>
            </PopoverContent>
        </Popover>
    </div>
</template>
