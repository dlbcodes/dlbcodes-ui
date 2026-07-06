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
            <TabsTrigger>Account</TabsTrigger>
            <TabsTrigger>Password</TabsTrigger>
            <TabsTrigger>Notifications</TabsTrigger>
        </TabsList>
        <TabsPanels>
            <TabsContent>
                <p class="text-sm text-text-secondary">
                    Manage your account details and profile.
                </p>
            </TabsContent>
            <TabsContent>
                <p class="text-sm text-text-secondary">
                    Update your password and security settings.
                </p>
            </TabsContent>
            <TabsContent>
                <p class="text-sm text-text-secondary">
                    Choose what you get notified about.
                </p>
            </TabsContent>
        </TabsPanels>
    </Tabs>
</template>
