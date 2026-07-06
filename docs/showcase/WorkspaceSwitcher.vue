<script setup lang="ts">
import { ref } from "vue";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    Avatar,
    Badge,
    Kbd,
    Separator,
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
    Button,
} from "@dlbcodes/ui";
import { PhCaretUpDown, PhCheck, PhPlus, PhGear } from "@phosphor-icons/vue";

interface Workspace {
    id: string;
    name: string;
    plan: "Enterprise" | "Pro" | "Free";
}

// Inlined so the showcase has no external data dependency.
const workspaces: Workspace[] = [
    { id: "1", name: "Acme Inc", plan: "Enterprise" },
    { id: "2", name: "Side Project", plan: "Pro" },
    { id: "3", name: "Personal", plan: "Free" },
];

const activeId = ref("1");
const active = ref<Workspace>(workspaces[0]);

const select = (ws: Workspace, close: () => void): void => {
    activeId.value = ws.id;
    active.value = ws;
    close();
};

const planVariant = (
    plan: Workspace["plan"],
): "primary" | "success" | "neutral" => {
    if (plan === "Enterprise") return "primary";
    if (plan === "Pro") return "success";
    return "neutral";
};

const settingsOpen = ref(false);
const workspaceName = ref(active.value.name);

const openSettings = (close: () => void): void => {
    workspaceName.value = active.value.name;
    close();
    settingsOpen.value = true;
};

const saveSettings = (): void => {
    active.value = { ...active.value, name: workspaceName.value };
    settingsOpen.value = false;
};
</script>

<template>
    <Popover placement="bottom-start" class="w-full">
        <PopoverTrigger class="w-full" as-child>
            <Button
                variant="secondary"
                class="justify-between px-2 py-3 text-left w-full h-fit"
            >
                <span class="flex min-w-0 items-center gap-2">
                    <Avatar :name="active.name" :src="null" size="sm" />
                    <span class="flex min-w-0 flex-col">
                        <span
                            class="truncate text-sm font-medium text-text-primary"
                        >
                            {{ active.name }}
                        </span>
                        <span class="truncate text-xs text-text-tertiary">
                            {{ active.plan }} plan
                        </span>
                    </span>
                </span>
                <PhCaretUpDown class="size-4 shrink-0 text-text-tertiary" />
            </Button>
        </PopoverTrigger>

        <PopoverContent size="sm">
            <template #default="{ close }">
                <div class="flex flex-col gap-0.5 p-1">
                    <div
                        class="px-2 py-1.5 text-xs font-medium text-text-tertiary"
                    >
                        Workspaces
                    </div>

                    <button
                        v-for="(ws, i) in workspaces"
                        :key="ws.id"
                        type="button"
                        class="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left transition-colors hover:bg-bg-surface"
                        @click="select(ws, close)"
                    >
                        <Avatar :name="ws.name" :src="null" size="sm" />
                        <span
                            class="flex-1 truncate text-sm font-medium text-text-primary"
                            >{{ ws.name }}</span
                        >
                        <Badge :variant="planVariant(ws.plan)">{{
                            ws.plan
                        }}</Badge>
                        <PhCheck
                            v-if="ws.id === activeId"
                            class="size-4 text-brand-200"
                        />
                        <Kbd v-else>⌘{{ i + 1 }}</Kbd>
                    </button>

                    <Separator />

                    <button
                        type="button"
                        class="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-text-primary transition-colors hover:bg-bg-surface"
                        @click="openSettings(close)"
                    >
                        <PhGear class="size-4" />
                        Workspace settings
                    </button>

                    <button
                        type="button"
                        class="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-text-primary transition-colors hover:bg-bg-surface"
                        @click="close"
                    >
                        <PhPlus class="size-4" />
                        Create workspace
                    </button>
                </div>
            </template>
        </PopoverContent>
    </Popover>

    <Modal v-model="settingsOpen" size="xl">
        <ModalHeader>
            <ModalTitle>Workspace settings</ModalTitle>
            <ModalDescription>Update your workspace details.</ModalDescription>
            <ModalClose />
        </ModalHeader>
        <ModalContent>
            <div class="flex flex-col gap-4">
                <Field required>
                    <FieldLabel>Workspace name</FieldLabel>
                    <FieldContent>
                        <Input
                            v-model="workspaceName"
                            placeholder="Workspace name"
                        />
                    </FieldContent>
                </Field>
                <Field>
                    <FieldLabel>Plan</FieldLabel>
                    <FieldContent>
                        <div class="flex items-center gap-2">
                            <Badge :variant="planVariant(active.plan)">{{
                                active.plan
                            }}</Badge>
                            <span class="text-sm text-text-secondary"
                                >Manage billing to change your plan.</span
                            >
                        </div>
                    </FieldContent>
                </Field>
            </div>
        </ModalContent>
        <ModalFooter>
            <Button variant="secondary" @click="settingsOpen = false">
                Cancel
            </Button>
            <Button variant="primary" @click="saveSettings">
                Save changes
            </Button>
        </ModalFooter>
    </Modal>
</template>
