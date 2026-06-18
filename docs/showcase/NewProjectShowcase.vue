<script setup lang="ts">
import { ref } from "vue";
import {
    Field,
    FieldLabel,
    FieldContent,
    Input,
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    Combobox,
    ComboboxInput,
    ComboboxContent,
    ComboboxItem,
    ComboboxEmpty,
    Button,
} from "@dlbcodes/my-design-system";

const name = ref("");
const visibility = ref("private");
const framework = ref("vue");
</script>

<template>
    <div class="flex w-full flex-col gap-4">
        <div class="flex flex-col">
            <div class="text-lg font-medium text-text-primary">New project</div>
            <div class="text-sm text-text-secondary">
                Set up a repository to get started.
            </div>
        </div>

        <Field>
            <FieldLabel>Project name</FieldLabel>
            <FieldContent>
                <Input v-model="name" placeholder="my-cool-app" />
            </FieldContent>
        </Field>

        <Field>
            <FieldLabel>Visibility</FieldLabel>
            <FieldContent>
                <Select v-model="visibility">
                    <SelectTrigger placeholder="Choose visibility" />
                    <SelectContent>
                        <SelectItem value="private" label="Private">
                            Private
                        </SelectItem>
                        <SelectItem value="public" label="Public">
                            Public
                        </SelectItem>
                        <SelectItem value="team" label="Team only">
                            Team only
                        </SelectItem>
                    </SelectContent>
                </Select>
            </FieldContent>
        </Field>

        <Field>
            <FieldLabel>Framework</FieldLabel>
            <FieldContent>
                <Combobox v-model="framework">
                    <ComboboxInput placeholder="Search frameworks..." />
                    <ComboboxContent>
                        <ComboboxItem value="vue" label="Vue">Vue</ComboboxItem>
                        <ComboboxItem value="react" label="React">
                            React
                        </ComboboxItem>
                        <ComboboxItem value="svelte" label="Svelte">
                            Svelte
                        </ComboboxItem>
                        <ComboboxItem value="angular" label="Angular">
                            Angular
                        </ComboboxItem>
                        <ComboboxItem value="solid" label="Solid">
                            Solid
                        </ComboboxItem>
                        <ComboboxEmpty>No frameworks match.</ComboboxEmpty>
                    </ComboboxContent>
                </Combobox>
            </FieldContent>
        </Field>

        <Button variant="primary" class="w-full justify-center">
            Create project
        </Button>
    </div>
</template>
