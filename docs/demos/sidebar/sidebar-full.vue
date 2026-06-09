<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "../../../lib/components/primitives/sidebar/Sidebar.vue";
import SidebarHeader from "../../../lib/components/primitives/sidebar/SidebarHeader.vue";
import SidebarContent from "../../../lib/components/primitives/sidebar/SidebarContent.vue";
import SidebarFooter from "../../../lib/components/primitives/sidebar/SidebarFooter.vue";
import SidebarGroup from "../../../lib/components/primitives/sidebar/SidebarGroup.vue";
import SidebarItem from "../../../lib/components/primitives/sidebar/SidebarItem.vue";
import Avatar from "../../../lib/components/primitives/Avatar.vue";
import {
    PhHouse,
    PhChartBar,
    PhGear,
    PhCaretUpDown,
} from "@phosphor-icons/vue";

const active = ref("dashboard");
const go = (id: string) => (active.value = id);
</script>

<template>
    <div class="h-112 overflow-hidden rounded-xl border border-border-subtle">
        <Sidebar>
            <SidebarHeader>
                <div
                    class="flex size-7 items-center justify-center rounded-lg bg-bg-inverse text-text-inverse text-sm font-bold"
                >
                    A
                </div>
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

            <SidebarFooter>
                <button
                    type="button"
                    class="flex w-full items-center gap-2 rounded-lg p-1 text-left transition-colors hover:bg-bg-subtle"
                >
                    <Avatar name="Daniel Lobo" :src="null" size="sm" />
                    <span
                        class="flex-1 truncate text-sm font-medium text-text-primary"
                        >Daniel Lobo</span
                    >
                    <PhCaretUpDown class="size-4 text-text-tertiary" />
                </button>
            </SidebarFooter>
        </Sidebar>
    </div>
</template>
