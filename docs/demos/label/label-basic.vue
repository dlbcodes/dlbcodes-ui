<script setup lang="ts">
import { ref } from "vue";
import Panel from "../../../lib/components/primitives/panel/Panel.vue";
import PanelContent from "../../../lib/components/primitives/panel/PanelContent.vue";
import Label from "../../../lib/components/primitives/Label.vue";
import Switch from "../../../lib/components/form/Switch.vue";

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
    <div class="w-full max-w-sm">
        <Panel>
            <PanelContent class="flex flex-col gap-1 p-2">
                <div
                    v-for="opt in options"
                    :key="opt.id"
                    class="flex items-center justify-between gap-4 rounded-xl px-3 py-2.5"
                >
                    <div class="min-w-0">
                        <Label :for="opt.id" class="block">
                            {{ opt.title }}
                        </Label>
                        <div class="text-xs text-text-tertiary">
                            {{ opt.desc }}
                        </div>
                    </div>
                    <Switch :id="opt.id" v-model="prefs[opt.id]" />
                </div>
            </PanelContent>
        </Panel>
    </div>
</template>
