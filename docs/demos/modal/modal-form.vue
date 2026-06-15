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
import Textarea from "../../../lib/components/form/Textarea.vue";
import Button from "../../../lib/components/primitives/Button.vue";

const open = ref(false);
const name = ref("");
const email = ref("");
const note = ref("");

const submit = (): void => {
    // (mock) would persist here
    open.value = false;
};
</script>

<template>
    <div>
        <Button variant="primary" @click="open = true">New contact</Button>

        <Modal v-model="open" size="md">
            <ModalHeader>
                <ModalTitle>New contact</ModalTitle>
                <ModalDescription>
                    Add someone to your address book.
                </ModalDescription>
                <ModalClose />
            </ModalHeader>

            <ModalContent>
                <div class="flex flex-col gap-4">
                    <Field>
                        <FieldLabel>Name</FieldLabel>
                        <FieldContent>
                            <Input v-model="name" placeholder="Jane Doe" />
                        </FieldContent>
                    </Field>
                    <Field>
                        <FieldLabel>Email</FieldLabel>
                        <FieldContent>
                            <Input
                                v-model="email"
                                type="email"
                                placeholder="jane@example.com"
                            />
                        </FieldContent>
                    </Field>
                    <Field>
                        <FieldLabel>Note</FieldLabel>
                        <FieldContent>
                            <Textarea
                                v-model="note"
                                placeholder="Optional note…"
                            />
                        </FieldContent>
                    </Field>
                </div>
            </ModalContent>

            <ModalFooter>
                <Button variant="secondary" @click="open = false"
                    >Cancel</Button
                >
                <Button variant="primary" @click="submit">Add contact</Button>
            </ModalFooter>
        </Modal>
    </div>
</template>
