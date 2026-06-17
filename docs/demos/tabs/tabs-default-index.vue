<script setup lang="ts">
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsPanels,
    TabsContent,
} from "@dlbcodes/my-design-system";
</script>

<template>
    <Tabs :default-index="1">
        <TabsList>
            <TabsTrigger>Overview</TabsTrigger>
            <TabsTrigger>Analytics</TabsTrigger>
            <TabsTrigger>Reports</TabsTrigger>
        </TabsList>
        <TabsPanels>
            <TabsContent
                ><p class="text-sm text-text-secondary">
                    Overview content.
                </p></TabsContent
            >
            <TabsContent
                ><p class="text-sm text-text-secondary">
                    Analytics content — selected by default.
                </p></TabsContent
            >
            <TabsContent
                ><p class="text-sm text-text-secondary">
                    Reports content.
                </p></TabsContent
            >
        </TabsPanels>
    </Tabs>
</template>
