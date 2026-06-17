<script setup lang="ts">
import { ref } from "vue";
import {
    Combobox,
    ComboboxInput,
    ComboboxContent,
    ComboboxItem,
    ComboboxEmpty,
    Field,
    FieldLabel,
    FieldContent,
    FieldDescription,
} from "@dlbcodes/my-design-system";

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
