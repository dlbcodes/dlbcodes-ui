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

type Demo = "sm" | "lg" | "2xl";
const active = ref<Demo | null>(null);

const open = (d: Demo): void => {
    active.value = d;
};
const close = (): void => {
    active.value = null;
};
</script>

<template>
    <div class="flex flex-wrap gap-3">
        <Button variant="secondary" @click="open('sm')">Confirm (sm)</Button>
        <Button variant="secondary" @click="open('lg')">Edit form (lg)</Button>
        <Button variant="secondary" @click="open('2xl')">Details (2xl)</Button>
    </div>

    <!-- sm: a tight confirmation -->
    <Modal :model-value="active === 'sm'" size="sm" @update:model-value="close">
        <ModalHeader>
            <ModalTitle>Leave without saving?</ModalTitle>
            <ModalDescription>
                Your draft will be kept for 7 days.
            </ModalDescription>
            <ModalClose />
        </ModalHeader>
        <ModalFooter>
            <Button variant="secondary" @click="close">Keep editing</Button>
            <Button variant="primary" @click="close">Leave</Button>
        </ModalFooter>
    </Modal>

    <!-- lg: room for a short form -->
    <Modal :model-value="active === 'lg'" size="lg" @update:model-value="close">
        <ModalHeader>
            <ModalTitle>Invite teammates</ModalTitle>
            <ModalDescription>
                They'll get an email invite to join your workspace.
            </ModalDescription>
            <ModalClose />
        </ModalHeader>
        <ModalContent>
            <p class="text-sm text-text-secondary">
                A larger width gives a form comfortable room to breathe without
                feeling cramped.
            </p>
        </ModalContent>
        <ModalFooter>
            <Button variant="secondary" @click="close">Cancel</Button>
            <Button variant="primary" @click="close">Send invites</Button>
        </ModalFooter>
    </Modal>

    <!-- 2xl: wide, for detail/review content -->
    <Modal
        :model-value="active === '2xl'"
        size="2xl"
        @update:model-value="close"
    >
        <ModalHeader>
            <ModalTitle>Review changes</ModalTitle>
            <ModalDescription>
                12 files changed across 3 directories.
            </ModalDescription>
            <ModalClose />
        </ModalHeader>
        <ModalContent>
            <p class="text-sm text-text-secondary">
                The widest sizes suit dense content: diffs, tables, or
                side-by-side detail views where horizontal space matters.
            </p>
        </ModalContent>
        <ModalFooter>
            <Button variant="secondary" @click="close">Close</Button>
            <Button variant="primary" @click="close">Approve</Button>
        </ModalFooter>
    </Modal>
</template>
