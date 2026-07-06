<script setup lang="ts">
import { ref } from "vue";
import {
    SidebarProvider,
    Sidebar,
    SidebarTrigger,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarItem,
} from "@dlbcodes/ui";
import { PhHouse, PhChartBar, PhGear } from "@phosphor-icons/vue";

const active = ref("dashboard");
const go = (id: string) => (active.value = id);
</script>

<template>
    <div class="h-112 overflow-hidden rounded-xl border border-border-subtle">
        <SidebarProvider>
            <div class="flex h-full">
                <Sidebar>
                    <SidebarHeader>
                        <span class="font-semibold text-text-primary"
                            >Acme</span
                        >
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarItem
                                as="button"
                                :active="active === 'dashboard'"
                                @click="go('dashboard')"
                            >
                                <PhHouse /> Dashboard
                            </SidebarItem>
                            <SidebarItem
                                as="button"
                                :active="active === 'analytics'"
                                @click="go('analytics')"
                            >
                                <PhChartBar /> Analytics
                            </SidebarItem>
                            <SidebarItem
                                as="button"
                                :active="active === 'settings'"
                                @click="go('settings')"
                            >
                                <PhGear /> Settings
                            </SidebarItem>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>

                <div class="flex flex-1 flex-col">
                    <header
                        class="flex items-center gap-2 border-b border-border-subtle p-4"
                    >
                        <SidebarTrigger />
                        <span
                            class="font-medium text-text-primary capitalize"
                            >{{ active }}</span
                        >
                    </header>
                    <main class="flex-1 p-4 text-sm text-text-secondary">
                        Click the trigger to collapse the sidebar. Resize below
                        768px for the mobile drawer.
                    </main>
                </div>
            </div>
        </SidebarProvider>
    </div>
</template>
