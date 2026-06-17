<script setup lang="ts">
import {
    Dropdown,
    DropdownTrigger,
    DropdownContent,
    DropdownItem,
    Avatar,
    Separator,
} from "@dlbcodes/my-design-system";
import { PhUser, PhGear, PhCreditCard, PhSignOut } from "@phosphor-icons/vue";
</script>

<template>
    <div>
        <Dropdown placement="top-start">
            <DropdownTrigger>
                <Avatar
                    name="Daniel Lobo"
                    src="https://i.pravatar.cc/120?img=12"
                    size="base"
                />
            </DropdownTrigger>
            <DropdownContent size="sm">
                <!-- A header row identifying the signed-in user -->
                <div class="flex items-center gap-3 px-3 py-2">
                    <Avatar
                        name="Daniel Lobo"
                        src="https://i.pravatar.cc/120?img=12"
                        size="sm"
                    />
                    <div class="min-w-0">
                        <div
                            class="truncate text-sm font-medium text-text-primary"
                        >
                            Daniel Lobo
                        </div>
                        <div class="truncate text-xs text-text-tertiary">
                            daniel@example.com
                        </div>
                    </div>
                </div>
                <Separator class="my-1" />
                <DropdownItem @select="() => {}">
                    <PhUser class="size-4" /> Profile
                </DropdownItem>
                <DropdownItem @select="() => {}">
                    <PhGear class="size-4" /> Settings
                </DropdownItem>
                <DropdownItem @select="() => {}">
                    <PhCreditCard class="size-4" /> Billing
                </DropdownItem>
                <Separator class="my-1" />
                <DropdownItem @select="() => {}">
                    <PhSignOut class="size-4" /> Sign out
                </DropdownItem>
            </DropdownContent>
        </Dropdown>
    </div>
</template>
