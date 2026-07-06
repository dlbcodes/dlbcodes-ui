<script setup lang="ts">
import { ref } from "vue";
import {
    Field,
    FieldLabel,
    FieldContent,
    Input,
    Textarea,
    Button,
} from "@dlbcodes/ui";
import { PhCube } from "@phosphor-icons/vue";

const subject = ref("");
const message = ref("");
</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
                <div
                    class="flex size-8 items-center justify-center rounded-lg bg-brand-200 text-text-inverse"
                >
                    <PhCube class="size-5" weight="fill" />
                </div>
                <span
                    class="text-lg font-semibold tracking-tight text-text-primary"
                >
                    Acme
                </span>
            </div>
            <div class="text-sm text-text-secondary">
                Have a question or need a hand? Send us a message and we'll get
                back to you.
            </div>
        </div>

        <Field required>
            <FieldLabel>Subject</FieldLabel>
            <FieldContent>
                <Input v-model="subject" placeholder="What's this about?" />
            </FieldContent>
        </Field>
        <Field required>
            <FieldLabel>Message</FieldLabel>
            <FieldContent>
                <Textarea
                    v-model="message"
                    placeholder="Tell us what's going on…"
                />
            </FieldContent>
        </Field>

        <div class="flex justify-end gap-2">
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Send message</Button>
        </div>
    </div>
</template>
