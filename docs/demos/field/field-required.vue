<script setup lang="ts">
import { ref } from "vue";
import { Field, FieldLabel, FieldContent, Input } from "@dlbcodes/ui";

const name = ref("");
</script>

<template>
    <Field required class="w-full max-w-sm">
        <FieldLabel>Full name</FieldLabel>
        <FieldContent>
            <Input v-model="name" placeholder="Ada Lovelace" />
        </FieldContent>
    </Field>
</template>
