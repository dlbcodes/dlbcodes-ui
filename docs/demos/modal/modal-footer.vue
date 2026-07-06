<script setup lang="ts">
import { ref } from "vue";

import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalDescription,
    ModalContent,
    ModalFooter,
    ModalClose,
    Button,
    Field,
    FieldLabel,
    FieldContent,
    Input,
} from "@dlbcodes/ui";

const open = ref(false);
const workspace = ref("Acme Inc.");
</script>

<template>
    <Button variant="outline" @click="open = true">Rename workspace</Button>

    <Modal v-model="open" size="md">
        <template #default="{ close }">
            <ModalHeader>
                <ModalTitle>Rename workspace</ModalTitle>
                <ModalDescription>
                    This is visible to everyone in your workspace.
                </ModalDescription>
                <ModalClose />
            </ModalHeader>

            <ModalContent>
                <Field>
                    <FieldLabel>Workspace name</FieldLabel>
                    <FieldContent>
                        <Input v-model="workspace" variant="contrast" />
                    </FieldContent>
                </Field>
            </ModalContent>

            <ModalFooter>
                <Button variant="secondary" @click="close">Cancel</Button>
                <Button variant="primary" @click="close">Save</Button>
            </ModalFooter>
        </template>
    </Modal>
</template>
