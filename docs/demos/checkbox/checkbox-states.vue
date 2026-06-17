<script setup lang="ts">
import { ref } from "vue";
import Checkbox from "../../../lib/components/form/Checkbox.vue";
import Label from "../../../lib/components/primitives/Label.vue";
import Field from "../../../lib/components/form/field/Field.vue";
import FieldLabel from "../../../lib/components/form/field/FieldLabel.vue";

const a = ref(true);
const b = ref(false);
const c = ref(true);
</script>

<template>
    <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
            <Checkbox id="cb-on" v-model="a" />
            <Label for="cb-on">Checked</Label>
        </div>

        <Field orientation="horizontal">
            <Checkbox id="cb-off" v-model="b" />
            <Label for="cb-off">Unchecked</Label>
        </Field>

        <Field disabled orientation="horizontal">
            <Checkbox v-model="c" />
            <FieldLabel>Disabled</FieldLabel>
        </Field>
    </div>
</template>
