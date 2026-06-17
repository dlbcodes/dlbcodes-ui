<script setup lang="ts">
import { ref } from "vue";
import {
    Textarea,
    Field,
    FieldLabel,
    FieldContent,
    FieldDescription,
    FieldError,
} from "@dlbcodes/my-design-system";

const bio = ref("");
</script>

<template>
    <Field class="w-full max-w-md">
        <FieldLabel>Bio</FieldLabel>
        <FieldContent>
            <Textarea
                v-model="bio"
                :rows="4"
                placeholder="Tell us about yourself…"
            />
            <FieldDescription>
                A short description for your profile.
            </FieldDescription>
        </FieldContent>
    </Field>
</template>
