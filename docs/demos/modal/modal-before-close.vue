<script setup lang="ts">
import { ref, computed } from "vue";
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
} from "@dlbcodes/ui";

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
    <div class="flex flex-col items-center gap-3">
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
                <Button variant="secondary" @click="open = false">
                    Cancel
                </Button>
                <Button variant="primary" :disabled="!isDirty" @click="save">
                    Save changes
                </Button>
            </ModalFooter>
        </Modal>
    </div>
</template>
