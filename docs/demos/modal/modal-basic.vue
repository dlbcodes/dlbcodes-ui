<script setup lang="ts">
import { ref } from "vue";
import Modal from "../../../lib/components/overlays/modal/Modal.vue";
import ModalHeader from "../../../lib/components/overlays/modal/ModalHeader.vue";
import ModalTitle from "../../../lib/components/overlays/modal/ModalTitle.vue";
import ModalDescription from "../../../lib/components/overlays/modal/ModalDescription.vue";
import ModalContent from "../../../lib/components/overlays/modal/ModalContent.vue";
import ModalClose from "../../../lib/components/overlays/modal/ModalClose.vue";
import Button from "../../../lib/components/primitives/Button.vue";

const open = ref(false);
</script>

<template>
    <Button @click="open = true">Open modal</Button>

    <Modal v-model="open">
        <ModalHeader>
            <ModalTitle>Edit profile</ModalTitle>
            <ModalDescription
                >Update your account details below.</ModalDescription
            >
            <ModalClose />
        </ModalHeader>
        <ModalContent>
            <p class="text-sm text-text-secondary">
                Modal body content goes here.
            </p>
        </ModalContent>
    </Modal>
</template>
