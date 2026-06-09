<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "../../../lib/components/primitives/sidebar/Sidebar.vue";
import SidebarHeader from "../../../lib/components/primitives/sidebar/SidebarHeader.vue";
import SidebarContent from "../../../lib/components/primitives/sidebar/SidebarContent.vue";
import SidebarGroup from "../../../lib/components/primitives/sidebar/SidebarGroup.vue";
import SidebarItem from "../../../lib/components/primitives/sidebar/SidebarItem.vue";
import {
    PhHouse,
    PhChartBar,
    PhUsers,
    PhGear,
    PhCreditCard,
} from "@phosphor-icons/vue";

const active = ref("overview");
const go = (id: string) => (active.value = id);
</script>

<template>
    <div class="h-112 overflow-hidden rounded-xl border border-border-subtle">
        <Sidebar>
            <SidebarHeader>
                <span class="font-semibold text-text-primary">Acme</span>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup label="General">
                    <SidebarItem
                        as="button"
                        :active="active === 'overview'"
                        @click="go('overview')"
                    >
                        <PhHouse /> Overview
                    </SidebarItem>
                    <SidebarItem
                        as="button"
                        :active="active === 'analytics'"
                        @click="go('analytics')"
                    >
                        <PhChartBar /> Analytics
                    </SidebarItem>
                </SidebarGroup>
                <SidebarGroup label="Workspace">
                    <SidebarItem
                        as="button"
                        :active="active === 'team'"
                        @click="go('team')"
                    >
                        <PhUsers /> Team
                    </SidebarItem>
                    <SidebarItem
                        as="button"
                        :active="active === 'billing'"
                        @click="go('billing')"
                    >
                        <PhCreditCard /> Billing
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
    </div>
</template>
