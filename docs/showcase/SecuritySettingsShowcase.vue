<script setup lang="ts">
import { ref } from "vue";
import {
    Field,
    FieldLabel,
    Switch,
    Checkbox,
    Label,
    Disclosure,
    DisclosureTrigger,
    DisclosureContent,
} from "@dlbcodes/my-design-system";

const twoFactor = ref(true);
const sessionAlerts = ref(false);
const apiAccess = ref(false);
const betaFeatures = ref(false);
</script>

<template>
    <div class="flex w-full flex-col gap-y-4">
        <div class="flex flex-col">
            <div class="text-lg font-medium text-text-primary">Security</div>
            <div class="text-sm text-text-secondary">
                Manage how your account is protected and who can access it.
            </div>
        </div>

        <Field orientation="horizontal">
            <Switch v-model="twoFactor" />
            <FieldLabel>Two-factor authentication</FieldLabel>
        </Field>
        <Field orientation="horizontal">
            <Switch v-model="sessionAlerts" />
            <FieldLabel>Alert me about new sign-ins</FieldLabel>
        </Field>

        <Disclosure class="border-none">
            <DisclosureTrigger>Advanced options</DisclosureTrigger>
            <DisclosureContent>
                <div class="flex flex-col gap-3">
                    <div class="flex items-center gap-2">
                        <Checkbox id="sec-api" v-model="apiAccess" />
                        <Label for="sec-api">Enable API access</Label>
                    </div>
                    <div class="flex items-center gap-2">
                        <Checkbox id="sec-beta" v-model="betaFeatures" />
                        <Label for="sec-beta">Join the beta program</Label>
                    </div>
                </div>
            </DisclosureContent>
        </Disclosure>
    </div>
</template>
