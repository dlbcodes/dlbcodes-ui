<script setup lang="ts">
import { ref } from "vue";
import {
    Field,
    FieldLabel,
    FieldContent,
    FieldDescription,
    Input,
} from "@dlbcodes/ui";

const email = ref("");
</script>

<template>
    <Field class="w-full max-w-sm">
        <FieldLabel>Email</FieldLabel>
        <FieldContent>
            <Input v-model="email" type="email" placeholder="you@example.com" />
            <FieldDescription>We'll never share your email.</FieldDescription>
        </FieldContent>
    </Field>
</template>
