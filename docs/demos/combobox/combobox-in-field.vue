<script setup lang="ts">
import { ref } from "vue";
import Field from "../../../lib/components/form/field/Field.vue";
import FieldLabel from "../../../lib/components/form/field/FieldLabel.vue";
import FieldContent from "../../../lib/components/form/field/FieldContent.vue";
import FieldDescription from "../../../lib/components/form/field/FieldDescription.vue";
import {
    Combobox,
    ComboboxInput,
    ComboboxContent,
    ComboboxItem,
    ComboboxEmpty,
} from "../../../lib/components/form/combobox";

const country = ref("");
</script>

<template>
    <div class="w-full max-w-xs">
        <Field>
            <FieldLabel>Country</FieldLabel>
            <FieldContent>
                <Combobox v-model="country">
                    <ComboboxInput placeholder="Search countries..." />
                    <ComboboxContent>
                        <ComboboxItem value="pt" label="Portugal"
                            >Portugal</ComboboxItem
                        >
                        <ComboboxItem value="es" label="Spain"
                            >Spain</ComboboxItem
                        >
                        <ComboboxItem value="fr" label="France"
                            >France</ComboboxItem
                        >
                        <ComboboxItem value="de" label="Germany"
                            >Germany</ComboboxItem
                        >
                        <ComboboxItem value="it" label="Italy"
                            >Italy</ComboboxItem
                        >
                        <ComboboxEmpty>No frameworks match.</ComboboxEmpty>
                    </ComboboxContent>
                </Combobox>
            </FieldContent>
            <FieldDescription
                >Start typing to filter the list.</FieldDescription
            >
        </Field>
    </div>
</template>
