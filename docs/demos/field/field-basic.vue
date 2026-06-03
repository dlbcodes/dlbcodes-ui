<script setup lang="ts">
import { ref } from "vue";
import Field from "../../../lib/components/form/field/Field.vue";
import FieldLabel from "../../../lib/components/form/field/FieldLabel.vue";
import FieldContent from "../../../lib/components/form/field/FieldContent.vue";
import FieldDescription from "../../../lib/components/form/field/FieldDescription.vue";
import Input from "../../../lib/components/form/Input.vue";

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
