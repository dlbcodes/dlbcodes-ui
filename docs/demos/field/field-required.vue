<script setup lang="ts">
import { ref } from "vue";
import Field from "../../../lib/components/form/field/Field.vue";
import FieldLabel from "../../../lib/components/form/field/FieldLabel.vue";
import FieldContent from "../../../lib/components/form/field/FieldContent.vue";
import Input from "../../../lib/components/form/Input.vue";

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
