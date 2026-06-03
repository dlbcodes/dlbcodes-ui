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
    <Button variant="outline" @click="open = true">Open persistent</Button>

    <Modal v-model="open" persistent>
        <template #default="{ close }">
            <ModalHeader>
                <ModalTitle>Confirm to continue</ModalTitle>
            </ModalHeader>
            <ModalContent>
                <p class="text-sm text-text-secondary">
                    Clicking the backdrop or pressing Escape won't close this —
                    you must choose an action.
                </p>
            </ModalContent>
            <ModalFooter>
                <Button @click="close">Got it</Button>
            </ModalFooter>
        </template>
    </Modal>
</template>
