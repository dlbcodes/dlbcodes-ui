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
    Textarea,
} from "@dlbcodes/ui";

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
                <Button variant="secondary" @click="open = false">
                    Cancel
                </Button>
                <Button variant="primary" @click="submit">Add contact</Button>
            </ModalFooter>
        </Modal>
    </div>
</template>
