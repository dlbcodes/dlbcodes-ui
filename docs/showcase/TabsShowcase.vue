<script setup lang="ts">
import { ref } from "vue";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@dlbcodes/my-design-system";

const tab = ref("overview");
</script>

<template>
    <div class="flex w-full flex-col gap-4">
        <div class="flex flex-col">
            <div class="text-lg font-medium text-text-primary">Project</div>
            <div class="text-sm text-text-secondary">acme/design-system</div>
        </div>

        <Tabs v-model="tab">
            <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="settings" disabled>Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
                <div class="text-sm text-text-secondary">
                    A Vue 3 component library built on Tailwind v4, with
                    tokenized theming and accessible primitives.
                </div>
            </TabsContent>
            <TabsContent value="activity">
                <div class="text-sm text-text-secondary">
                    Last commit 2 hours ago — refined overlay transitions and
                    centralized placement types.
                </div>
            </TabsContent>
        </Tabs>
    </div>
</template>
