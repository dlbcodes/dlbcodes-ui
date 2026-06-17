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

const feedback = ref("Too short");
</script>

<template>
    <Field invalid class="w-full max-w-md">
        <FieldLabel>Feedback</FieldLabel>
        <FieldContent>
            <Textarea
                v-model="feedback"
                :rows="3"
                placeholder="Share your thoughts…"
            />
            <FieldDescription>At least 20 characters.</FieldDescription>
            <FieldError>Your feedback is too short.</FieldError>
        </FieldContent>
    </Field>
</template>
