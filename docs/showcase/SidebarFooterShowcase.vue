<script setup lang="ts">
import {
    Dropdown,
    DropdownTrigger,
    DropdownContent,
    DropdownItem,
    Avatar,
    Separator,
    Button,
    Badge,
} from "@dlbcodes/ui";
import {
    PhUser,
    PhGear,
    PhCreditCard,
    PhSignOut,
    PhQuestion,
    PhScroll,
    PhKeyboard,
    PhChatCircle,
    PhCaretUpDown,
} from "@phosphor-icons/vue";
</script>

<template>
    <div class="flex w-full flex-col gap-4">
        <div class="flex flex-col">
            <div class="text-lg font-medium text-text-primary">
                Sidebar footer
            </div>
            <div class="text-sm text-text-secondary">
                A user menu and a help menu, the way they sit at the base of a
                nav.
            </div>
        </div>

        <!-- The footer strip: user identity on the left, help on the right -->
        <div class="flex items-center justify-between">
            <Dropdown placement="top-start">
                <DropdownTrigger
                    class="flex min-w-0 flex-1 items-center gap-2 text-left"
                >
                    <Avatar
                        name="Daniel Lobo"
                        src="https://i.pravatar.cc/120?img=12"
                        size="sm"
                    />
                    <span class="flex min-w-0 flex-col">
                        <span
                            class="truncate text-sm font-medium text-text-primary"
                        >
                            Daniel
                        </span>
                        <span class="truncate text-xs text-text-tertiary">
                            daniel@example.com
                        </span>
                    </span>
                    <PhCaretUpDown
                        class="ml-auto size-4 shrink-0 text-text-tertiary"
                    />
                </DropdownTrigger>
                <DropdownContent size="xs">
                    <DropdownItem
                        ><PhUser class="size-4" /> Profile</DropdownItem
                    >
                    <DropdownItem
                        ><PhGear class="size-4" /> Settings</DropdownItem
                    >
                    <DropdownItem
                        ><PhCreditCard class="size-4" /> Billing</DropdownItem
                    >
                    <Separator class="my-1" />
                    <DropdownItem
                        ><PhSignOut class="size-4" /> Sign out</DropdownItem
                    >
                </DropdownContent>
            </Dropdown>

            <Dropdown placement="top-end">
                <DropdownTrigger as-child>
                    <Button
                        variant="secondary"
                        size="icon-sm"
                        aria-label="Help and shortcuts"
                    >
                        <PhQuestion class="size-5" />
                    </Button>
                </DropdownTrigger>
                <DropdownContent size="3xs">
                    <DropdownItem disabled>
                        <PhScroll class="size-4" />
                        Changelog
                        <Badge class="ml-auto">Soon</Badge>
                    </DropdownItem>
                    <DropdownItem
                        ><PhKeyboard class="size-4" /> Shortcuts</DropdownItem
                    >
                    <DropdownItem
                        ><PhChatCircle class="size-4" /> Help</DropdownItem
                    >
                </DropdownContent>
            </Dropdown>
        </div>
    </div>
</template>
