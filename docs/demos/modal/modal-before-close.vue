<script setup lang="ts">
import { ref, computed } from "vue";
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

type CloseReason = "escape" | "backdrop" | "close-button" | "programmatic";

const open = ref(false);

const saved = ref({ name: "Daniel Lobo", title: "Frontend Engineer" });
const form = ref({ ...saved.value });

const isDirty = computed(
    () =>
        form.value.name !== saved.value.name ||
        form.value.title !== saved.value.title,
);

// Track the last close attempt + whether it was vetoed, to show in the demo.
const lastReason = ref<CloseReason | null>(null);
const lastVetoed = ref(false);

const openModal = (): void => {
    form.value = { ...saved.value };
    lastReason.value = null;
    lastVetoed.value = false;
    open.value = true;
};

// before-close receives the reason; we record it and veto when dirty.
const confirmDiscard = (reason: CloseReason): boolean => {
    lastReason.value = reason;
    if (!isDirty.value) {
        lastVetoed.value = false;
        return true;
    }
    const discard = window.confirm("You have unsaved changes. Discard them?");
    lastVetoed.value = !discard;
    return discard;
};

const save = (): void => {
    saved.value = { ...form.value };
    open.value = false;
};
</script>

<template>
    <div class="flex flex-col items-start gap-3">
        <Button variant="primary" @click="openModal">Edit profile</Button>

        <!-- Surface the close reason so the feature is visible -->
        <p v-if="lastReason" class="text-sm text-text-tertiary">
            Last close attempt:
            <code class="text-text-secondary">{{ lastReason }}</code>
            <span v-if="lastVetoed"> — vetoed (kept open)</span>
        </p>

        <Modal v-model="open" :before-close="confirmDiscard" size="md">
            <ModalHeader>
                <ModalTitle>Edit profile</ModalTitle>
                <ModalDescription>
                    Try dismissing via Escape, the backdrop, or the ✕ — the
                    reason shows below, and edits are protected.
                </ModalDescription>
                <ModalClose />
            </ModalHeader>

            <ModalContent>
                <div class="flex flex-col gap-4">
                    <Field>
                        <FieldLabel>Name</FieldLabel>
                        <FieldContent>
                            <Input v-model="form.name" />
                        </FieldContent>
                    </Field>
                    <Field>
                        <FieldLabel>Title</FieldLabel>
                        <FieldContent>
                            <Input v-model="form.title" />
                        </FieldContent>
                    </Field>
                </div>
            </ModalContent>

            <ModalFooter>
                <Button variant="secondary" @click="open = false"
                    >Cancel</Button
                >
                <Button variant="primary" :disabled="!isDirty" @click="save">
                    Save changes
                </Button>
            </ModalFooter>
        </Modal>
    </div>
</template>
