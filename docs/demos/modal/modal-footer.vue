<script setup lang="ts">
import { ref } from "vue";
import Modal from "../../../lib/components/overlays/modal/Modal.vue";
import ModalHeader from "../../../lib/components/overlays/modal/ModalHeader.vue";
import ModalTitle from "../../../lib/components/overlays/modal/ModalTitle.vue";
import ModalDescription from "../../../lib/components/overlays/modal/ModalDescription.vue";
import ModalContent from "../../../lib/components/overlays/modal/ModalContent.vue";
import ModalFooter from "../../../lib/components/overlays/modal/ModalFooter.vue";
import ModalClose from "../../../lib/components/overlays/modal/ModalClose.vue";
import Field from "../../../lib/components/form/field/Field.vue";
import FieldLabel from "../../../lib/components/form/field/FieldLabel.vue";
import FieldContent from "../../../lib/components/form/field/FieldContent.vue";
import Input from "../../../lib/components/form/Input.vue";
import Button from "../../../lib/components/primitives/Button.vue";

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
