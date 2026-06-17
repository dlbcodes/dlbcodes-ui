<script setup lang="ts">
import { ref } from "vue";
import {
    Field,
    FieldLabel,
    FieldContent,
    FieldDescription,
    FieldError,
    Input,
} from "@dlbcodes/my-design-system";

const value = ref("not-an-email");
</script>

<template>
    <Field invalid class="w-full max-w-sm">
        <FieldLabel>Email</FieldLabel>
        <FieldContent>
            <Input v-model="value" type="email" />
            <FieldDescription>Your work email address.</FieldDescription>
            <FieldError>Please enter a valid email address.</FieldError>
        </FieldContent>
    </Field>
</template>
