<script setup lang="ts">
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsPanels,
    TabsContent,
} from "@dlbcodes/ui";
</script>

<template>
    <Tabs>
        <TabsList>
            <TabsTrigger>Active</TabsTrigger>
            <TabsTrigger :disabled="true">Disabled</TabsTrigger>
            <TabsTrigger>Another</TabsTrigger>
        </TabsList>
        <TabsPanels>
            <TabsContent
                ><p class="text-sm text-text-secondary">
                    First panel.
                </p></TabsContent
            >
            <TabsContent
                ><p class="text-sm text-text-secondary">
                    You can't reach this via the disabled tab.
                </p></TabsContent
            >
            <TabsContent
                ><p class="text-sm text-text-secondary">
                    Third panel.
                </p></TabsContent
            >
        </TabsPanels>
    </Tabs>
</template>
