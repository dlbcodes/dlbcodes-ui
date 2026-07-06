<script setup lang="ts">
import { ref } from "vue";
import { Field, FieldLabel, FieldContent, Input } from "@dlbcodes/ui";

const email = ref("");
const phone = ref("");
const code = ref("");
const amount = ref("");
</script>

<template>
    <div class="flex w-full max-w-xs flex-col gap-4">
        <Field>
            <FieldLabel>Email</FieldLabel>
            <FieldContent>
                <Input
                    v-model="email"
                    type="email"
                    inputmode="email"
                    autocomplete="email"
                    placeholder="you@example.com"
                />
            </FieldContent>
        </Field>

        <Field>
            <FieldLabel>Phone</FieldLabel>
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
        </Field>

        <Field>
            <FieldLabel>Amount</FieldLabel>
            <FieldContent>
                <Input v-model="amount" inputmode="decimal" placeholder="0.00">
                    <span class="text-sm">€</span>
                </Input>
            </FieldContent>
        </Field>
    </div>
</template>
