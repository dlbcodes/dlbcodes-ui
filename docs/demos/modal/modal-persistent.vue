<script setup lang="ts">
import { ref } from "vue";
import Modal from "../../../lib/components/overlays/modal/Modal.vue";
import ModalHeader from "../../../lib/components/overlays/modal/ModalHeader.vue";
import ModalTitle from "../../../lib/components/overlays/modal/ModalTitle.vue";
import ModalDescription from "../../../lib/components/overlays/modal/ModalDescription.vue";
import ModalContent from "../../../lib/components/overlays/modal/ModalContent.vue";
import ModalFooter from "../../../lib/components/overlays/modal/ModalFooter.vue";
import Button from "../../../lib/components/primitives/Button.vue";

const open = ref(false);
const accepted = ref(false);

const accept = (): void => {
    accepted.value = true;
    open.value = false;
};
</script>

<template>
    <div class="flex flex-col items-start gap-3">
        <Button variant="secondary" @click="open = true">
            Review updated terms
        </Button>
        <p v-if="accepted" class="text-sm text-text-tertiary">
            Thanks, your acceptance was recorded. (Demo only.)
        </p>

        <Modal v-model="open" persistent size="md">
            <ModalHeader>
                <ModalTitle>We've updated our terms</ModalTitle>
                <ModalDescription>
                    Please review and accept the updated Terms of Service to
                    keep using your account.
                </ModalDescription>
            </ModalHeader>

            <ModalContent>
                <p class="text-sm leading-relaxed text-text-secondary">
                    We've clarified how data is stored and added details about
                    the new collaboration features. Nothing changes about how
                    your existing content is handled. You can read the full
                    terms any time from your account settings.
                </p>
            </ModalContent>

            <ModalFooter>
                <Button variant="primary" @click="accept">
                    Accept and continue
                </Button>
            </ModalFooter>
        </Modal>
    </div>
</template>
