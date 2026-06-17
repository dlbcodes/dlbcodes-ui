<script setup lang="ts">
import { ref } from "vue";
import { Label, Switch } from "@dlbcodes/my-design-system";

const prefs = ref<Record<string, boolean>>({
    "notif-email": true,
    "notif-push": false,
    "notif-sms": false,
});

const options = [
    {
        id: "notif-email",
        title: "Email notifications",
        desc: "Get updates in your inbox.",
    },
    {
        id: "notif-push",
        title: "Push notifications",
        desc: "Alerts on your devices.",
    },
    {
        id: "notif-sms",
        title: "SMS notifications",
        desc: "Text messages for urgent items.",
    },
];
</script>

<template>
    <div class="flex w-full flex-col gap-y-4">
        <div class="flex flex-col">
            <div class="text-lg font-medium text-text-primary">
                Notifications
            </div>
            <div class="text-sm text-text-secondary">
                Choose how you'd like to hear from us.
            </div>
        </div>

        <div class="flex flex-col gap-1">
            <div
                v-for="opt in options"
                :key="opt.id"
                class="flex items-center justify-between gap-4 rounded-xl py-2.5"
            >
                <div class="min-w-0">
                    <Label :for="opt.id" class="block">{{ opt.title }}</Label>
                    <div class="text-xs text-text-tertiary">{{ opt.desc }}</div>
                </div>
                <Switch :id="opt.id" v-model="prefs[opt.id]" />
            </div>
        </div>
    </div>
</template>
