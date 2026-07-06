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
} from "@dlbcodes/ui";

import { PhWarning } from "@phosphor-icons/vue";

const open = ref(false);
const deleted = ref(false);

const confirmDelete = (): void => {
    deleted.value = true;
    open.value = false;
};
</script>

<template>
    <div class="flex flex-col items-center gap-3">
        <Button variant="destructive" @click="open = true">
            Delete project
        </Button>
        <p v-if="deleted" class="text-sm text-text-tertiary">
            Project deleted. (This is just a demo.)
        </p>

        <Modal v-model="open" size="lg">
            <ModalHeader>
                <ModalTitle>Delete this project?</ModalTitle>
                <ModalDescription>
                    This action can't be undone.
                </ModalDescription>
                <ModalClose />
            </ModalHeader>

            <ModalContent>
                <p class="text-sm leading-relaxed text-text-secondary">
                    "Marketing site" and all of its 24 pages will be permanently
                    removed.
                </p>
            </ModalContent>

            <ModalFooter>
                <Button variant="secondary" @click="open = false">
                    Cancel
                </Button>
                <Button variant="destructive" @click="confirmDelete">
                    Delete project
                </Button>
            </ModalFooter>
        </Modal>
    </div>
</template>
