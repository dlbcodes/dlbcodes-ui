<script setup lang="ts">
import {
    Panel,
    PanelHeader,
    PanelContent,
    PanelFooter,
    Avatar,
    Badge,
    Separator,
    Button,
} from "@dlbcodes/my-design-system";
import { PhDotsThree, PhPlus } from "@phosphor-icons/vue";

const members = [
    {
        name: "Ana Silva",
        img: "https://i.pravatar.cc/120?img=10",
        email: "ana@acme.co",
        role: "Owner",
        status: "success" as const,
    },
    {
        name: "John Carter",
        img: "https://i.pravatar.cc/120?img=3",
        email: "john@acme.co",
        role: "Admin",
        status: "success" as const,
    },
    // {
    //     name: "Maria Costa",
    //     img: "https://i.pravatar.cc/120?img=9",
    //     email: "maria@acme.co",
    //     role: "Member",
    //     status: "pending" as const,
    // },
];
</script>

<template>
    <div class="w-full max-w-sm">
        <Panel>
            <PanelHeader>
                <span class="text-sm font-semibold text-text-primary"
                    >Team members</span
                >
                <Button
                    variant="icon"
                    size="icon-sm"
                    aria-label="Panel options"
                    class="ml-auto"
                >
                    <PhDotsThree class="size-5" weight="bold" />
                </Button>
            </PanelHeader>

            <PanelContent class="p-2">
                <div class="flex flex-col">
                    <template v-for="(m, i) in members" :key="m.email">
                        <div class="flex items-center gap-3 px-2 py-2">
                            <Avatar :name="m.name" :src="m.img" size="sm" />
                            <div class="min-w-0 flex-1">
                                <div
                                    class="truncate text-sm font-medium text-text-primary"
                                >
                                    {{ m.name }}
                                </div>
                                <div
                                    class="truncate text-xs text-text-tertiary"
                                >
                                    {{ m.email }}
                                </div>
                            </div>
                            <Badge :variant="m.status">
                                {{
                                    m.status === "success"
                                        ? "Active"
                                        : "Pending"
                                }}
                            </Badge>
                        </div>
                        <Separator v-if="i < members.length - 1" />
                    </template>
                </div>
            </PanelContent>

            <PanelFooter>
                <span class="text-xs text-text-tertiary">3 members</span>
                <Button variant="ghost" size="sm" class="ml-auto">
                    <PhPlus class="size-4" />
                    Invite
                </Button>
            </PanelFooter>
        </Panel>
    </div>
</template>
