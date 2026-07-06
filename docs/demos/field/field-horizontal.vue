<script setup lang="ts">
import { ref } from "vue";
import { Field, FieldLabel, Switch } from "@dlbcodes/ui";

const on = ref(false);
</script>

<template>
    <Field orientation="horizontal">
        <Switch v-model="on" />
        <FieldLabel>Enable analytics</FieldLabel>
    </Field>
</template>
