<script setup lang="ts">
import { ref } from "vue";
import {
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    EmptyDescription,
    EmptyContent,
    Button,
    Modal,
    ModalHeader,
    ModalTitle,
    ModalDescription,
    ModalContent,
    ModalFooter,
    ModalClose,
    Field,
    FieldLabel,
    FieldContent,
    Input,
} from "@dlbcodes/my-design-system";
import { PhPlus, PhRocket } from "@phosphor-icons/vue";

const open = ref(false);
const name = ref("");
</script>

<template>
    <div>
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <PhRocket class="size-5" />
                </EmptyMedia>
                <EmptyTitle>Launch your first campaign</EmptyTitle>
                <EmptyDescription>
                    Campaigns help you reach your audience. Create one to begin.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button variant="primary" @click="open = true">
                    <PhPlus class="size-4" />
                    New campaign
                </Button>
            </EmptyContent>
        </Empty>

        <Modal v-model="open" size="md">
            <ModalHeader>
                <ModalTitle>New campaign</ModalTitle>
                <ModalDescription>
                    Give your campaign a name to get started.
                </ModalDescription>
                <ModalClose />
            </ModalHeader>
            <ModalContent>
                <Field required>
                    <FieldLabel>Campaign name</FieldLabel>
                    <FieldContent>
                        <Input v-model="name" placeholder="Summer launch" />
                    </FieldContent>
                </Field>
            </ModalContent>
            <ModalFooter>
                <Button variant="secondary" @click="open = false">
                    Cancel
                </Button>
                <Button variant="primary" @click="open = false">
                    Create campaign
                </Button>
            </ModalFooter>
        </Modal>
    </div>
</template>
