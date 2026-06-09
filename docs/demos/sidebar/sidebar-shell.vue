<script setup lang="ts">
import { ref } from "vue";
import SidebarProvider from "../../../lib/components/primitives/sidebar/SidebarProvider.vue";
import Sidebar from "../../../lib/components/primitives/sidebar/Sidebar.vue";
import SidebarTrigger from "../../../lib/components/primitives/sidebar/SidebarTrigger.vue";
import SidebarHeader from "../../../lib/components/primitives/sidebar/SidebarHeader.vue";
import SidebarContent from "../../../lib/components/primitives/sidebar/SidebarContent.vue";
import SidebarFooter from "../../../lib/components/primitives/sidebar/SidebarFooter.vue";
import SidebarGroup from "../../../lib/components/primitives/sidebar/SidebarGroup.vue";
import SidebarItem from "../../../lib/components/primitives/sidebar/SidebarItem.vue";
import Avatar from "../../../lib/components/primitives/Avatar.vue";
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
                        <SidebarGroup label="General">
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
                    <SidebarFooter>
                        <div class="flex items-center gap-2">
                            <Avatar name="Daniel Lobo" :src="null" size="sm" />
                            <span class="text-sm font-medium text-text-primary"
                                >Daniel Lobo</span
                            >
                        </div>
                    </SidebarFooter>
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
                        Main content area.
                    </main>
                </div>
            </div>
        </SidebarProvider>
    </div>
</template>
