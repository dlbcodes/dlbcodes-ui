<script setup lang="ts">
import Dropdown from "../../../lib/components/form/dropdown/Dropdown.vue";
import DropdownTrigger from "../../../lib/components/form/dropdown/DropdownTrigger.vue";
import DropdownContent from "../../../lib/components/form/dropdown/DropdownContent.vue";
import DropdownItem from "../../../lib/components/form/dropdown/DropdownItem.vue";
import Button from "../../../lib/components/primitives/Button.vue";
import {
    PhPencilSimple,
    PhCopy,
    PhArchive,
    PhTrash,
    PhDotsThree,
} from "@phosphor-icons/vue";
</script>

<template>
    <!-- A row-actions menu: the "⋯" you click on a list/table row -->
    <div
        class="flex w-full max-w-sm items-center justify-between gap-3 rounded-xl border border-border-subtle bg-bg-raised px-4 py-3"
    >
        <div class="min-w-0">
            <div class="truncate text-sm font-medium text-text-primary">
                Q3 Report.pdf
            </div>
            <div class="truncate text-xs text-text-tertiary">
                Updated 2 days ago
            </div>
        </div>
        <Dropdown placement="bottom-start">
            <DropdownTrigger as-child v-slot="{ open }">
                <Button
                    variant="icon"
                    size="icon"
                    aria-label="Row actions"
                    :class="open ? 'bg-bg-subtle' : ''"
                >
                    <PhDotsThree class="size-5" weight="bold" />
                </Button>
            </DropdownTrigger>
            <DropdownContent size="sm">
                <DropdownItem @select="() => {}">
                    <PhPencilSimple class="size-4" /> Rename
                </DropdownItem>
                <DropdownItem @select="() => {}">
                    <PhCopy class="size-4" /> Duplicate
                </DropdownItem>
                <DropdownItem @select="() => {}">
                    <PhArchive class="size-4" /> Archive
                </DropdownItem>
                <DropdownItem disabled>
                    <PhTrash class="size-4" /> Delete (no permission)
                </DropdownItem>
            </DropdownContent>
        </Dropdown>
    </div>
</template>
