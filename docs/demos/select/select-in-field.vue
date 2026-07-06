<script setup lang="ts">
import { ref } from "vue";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    Field,
    FieldLabel,
    FieldContent,
    FieldDescription,
} from "@dlbcodes/ui";

const role = ref("");
</script>

<template>
    <Field class="w-full max-w-xs">
        <FieldLabel>Role</FieldLabel>
        <FieldContent>
            <Select v-model="role">
                <SelectTrigger placeholder="Assign a role" />
                <SelectContent>
                    <SelectItem value="viewer">Viewer</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
            </Select>
            <FieldDescription
                >Controls what this member can do.</FieldDescription
            >
        </FieldContent>
    </Field>
</template>
