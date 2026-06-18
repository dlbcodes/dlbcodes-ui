<script setup lang="ts">
import {
    Dropdown,
    DropdownTrigger,
    DropdownContent,
    DropdownItem,
    Separator,
    Button,
    Avatar,
} from "@dlbcodes/my-design-system";
import {
    PhDotsThree,
    PhPencilSimple,
    PhCopy,
    PhTrash,
} from "@phosphor-icons/vue";

const rows = [
    { name: "Landing redesign", meta: "Updated 2h ago" },
    // { name: "Mobile app", meta: "Updated yesterday" },
    // { name: "Design tokens", meta: "Updated 3d ago" },
];
</script>

<template>
    <div class="flex w-full flex-col gap-4">
        <div class="flex flex-col">
            <div class="text-lg font-medium text-text-primary">Projects</div>
            <div class="text-sm text-text-secondary">
                Actions with keyboard navigation built in.
            </div>
        </div>

        <div class="flex flex-col">
            <div
                v-for="(row, i) in rows"
                :key="row.name"
                class="flex items-center gap-3 py-3"
                :class="i < rows.length - 1 && 'border-b border-border-subtle'"
            >
                <div class="min-w-0 flex-1">
                    <div class="truncate text-sm font-medium text-text-primary">
                        {{ row.name }}
                    </div>
                    <div class="truncate text-xs text-text-tertiary">
                        {{ row.meta }}
                    </div>
                </div>

                <Dropdown>
                    <DropdownTrigger as-child>
                        <Button
                            variant="icon"
                            size="icon-sm"
                            aria-label="Row actions"
                        >
                            <PhDotsThree class="size-5" weight="bold" />
                        </Button>
                    </DropdownTrigger>
                    <DropdownContent size="3xs">
                        <DropdownItem>
                            <PhPencilSimple class="size-4" />
                            Edit
                        </DropdownItem>
                        <DropdownItem>
                            <PhCopy class="size-4" />
                            Duplicate
                        </DropdownItem>
                        <Separator class="my-1" />
                        <DropdownItem>
                            <PhTrash class="size-4" />
                            Delete
                        </DropdownItem>
                    </DropdownContent>
                </Dropdown>
            </div>
        </div>
    </div>
</template>
