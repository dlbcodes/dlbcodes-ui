<script setup lang="ts">
import { ref } from "vue";
import Modal from "../../../lib/components/overlays/modal/Modal.vue";
import ModalHeader from "../../../lib/components/overlays/modal/ModalHeader.vue";
import ModalTitle from "../../../lib/components/overlays/modal/ModalTitle.vue";
import ModalContent from "../../../lib/components/overlays/modal/ModalContent.vue";
import ModalClose from "../../../lib/components/overlays/modal/ModalClose.vue";
import Button from "../../../lib/components/primitives/Button.vue";

const size = ref<"sm" | "lg" | "2xl" | null>(null);
</script>

<template>
    <div class="flex gap-3">
        <Button variant="outline" @click="size = 'sm'">Small</Button>
        <Button variant="outline" @click="size = 'lg'">Large</Button>
        <Button variant="outline" @click="size = '2xl'">2XL</Button>
    </div>

    <Modal
        :model-value="size !== null"
        :size="size ?? 'md'"
        @update:model-value="size = null"
    >
        <ModalHeader>
            <ModalTitle>Size: {{ size }}</ModalTitle>
            <ModalClose />
        </ModalHeader>
        <ModalContent>
            <p class="text-sm text-text-secondary">
                This modal is size "{{ size }}".
            </p>
        </ModalContent>
    </Modal>
</template>
