<script setup lang="ts">
import { ref } from "vue";
import {
    SidebarProvider,
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarItem,
} from "@dlbcodes/my-design-system";

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
