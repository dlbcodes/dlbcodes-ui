<script setup lang="ts">
import { ref } from "vue";
import Modal from "../../../lib/components/overlays/modal/Modal.vue";
import ModalHeader from "../../../lib/components/overlays/modal/ModalHeader.vue";
import ModalTitle from "../../../lib/components/overlays/modal/ModalTitle.vue";
import ModalContent from "../../../lib/components/overlays/modal/ModalContent.vue";
import ModalFooter from "../../../lib/components/overlays/modal/ModalFooter.vue";
import Button from "../../../lib/components/primitives/Button.vue";

const open = ref(false);
</script>

<template>
    <Button variant="outline" @click="open = true">Delete account</Button>

    <Modal v-model="open">
        <template #default="{ close }">
            <ModalHeader>
                <ModalTitle>Are you sure?</ModalTitle>
            </ModalHeader>
            <ModalContent>
                <p class="text-sm text-text-secondary">
                    This action cannot be undone.
                </p>
            </ModalContent>
            <ModalFooter>
                <Button variant="ghost" @click="close">Cancel</Button>
                <Button variant="destructive" @click="close">Delete</Button>
            </ModalFooter>
        </template>
    </Modal>
</template>
