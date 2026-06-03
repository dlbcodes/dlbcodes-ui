<script setup lang="ts">
import { ref } from "vue";
import Field from "../../../lib/components/form/field/Field.vue";
import FieldLabel from "../../../lib/components/form/field/FieldLabel.vue";
import FieldContent from "../../../lib/components/form/field/FieldContent.vue";
import FieldDescription from "../../../lib/components/form/field/FieldDescription.vue";
import FieldError from "../../../lib/components/form/field/FieldError.vue";
import Input from "../../../lib/components/form/Input.vue";

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
