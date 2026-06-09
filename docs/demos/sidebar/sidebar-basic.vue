<script setup lang="ts">
import { ref } from "vue";
import SidebarProvider from "../../../lib/components/primitives/sidebar/SidebarProvider.vue";
import Sidebar from "../../../lib/components/primitives/sidebar/Sidebar.vue";
import SidebarHeader from "../../../lib/components/primitives/sidebar/SidebarHeader.vue";
import SidebarContent from "../../../lib/components/primitives/sidebar/SidebarContent.vue";
import SidebarGroup from "../../../lib/components/primitives/sidebar/SidebarGroup.vue";
import SidebarItem from "../../../lib/components/primitives/sidebar/SidebarItem.vue";
import { PhHouse, PhChartBar, PhGear } from "@phosphor-icons/vue";

const active = ref("dashboard");
const go = (id: string) => (active.value = id);
</script>

<template>
    <div class="h-96 overflow-hidden rounded-xl border border-border-subtle">
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <span class="font-semibold text-text-primary">Acme</span>
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
        </SidebarProvider>
    </div>
</template>
