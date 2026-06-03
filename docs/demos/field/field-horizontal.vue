<script setup lang="ts">
import { ref } from "vue";
import Field from "../../../lib/components/form/field/Field.vue";
import FieldLabel from "../../../lib/components/form/field/FieldLabel.vue";
import Switch from "../../../lib/components/form/Switch.vue";

const on = ref(false);
</script>

<template>
    <Field orientation="horizontal">
        <Switch v-model="on" />
        <FieldLabel>Enable analytics</FieldLabel>
    </Field>
</template>
