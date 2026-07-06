<script setup lang="ts">
import { ref } from "vue";
import {
    Field,
    FieldLabel,
    FieldContent,
    FieldDescription,
    Input,
    Button,
} from "@dlbcodes/ui";

const phone = ref("");
const code = ref("");
</script>

<template>
    <div class="flex w-full flex-col gap-4">
        <div class="flex flex-col">
            <div class="text-lg font-medium text-text-primary">
                Verify your phone
            </div>
            <div class="text-sm text-text-secondary">
                We'll text you a code to confirm it's you.
            </div>
        </div>

        <Field>
            <FieldLabel>Phone number</FieldLabel>
            <FieldContent>
                <Input
                    v-model="phone"
                    type="tel"
                    inputmode="tel"
                    autocomplete="tel"
                    placeholder="(555) 000-0000"
                />
            </FieldContent>
        </Field>

        <Field>
            <FieldLabel>Verification code</FieldLabel>
            <FieldContent>
                <Input
                    v-model="code"
                    type="text"
                    inputmode="numeric"
                    autocomplete="one-time-code"
                    maxlength="6"
                    placeholder="123456"
                />
            </FieldContent>
            <FieldDescription>Enter the 6-digit code we sent.</FieldDescription>
        </Field>

        <Button variant="primary" class="w-full justify-center">
            Verify
        </Button>
    </div>
</template>
