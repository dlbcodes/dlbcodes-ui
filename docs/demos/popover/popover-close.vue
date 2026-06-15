<script setup lang="ts">
import { ref } from "vue";
import Popover from "../../../lib/components/overlays/popover/Popover.vue";
import PopoverTrigger from "../../../lib/components/overlays/popover/PopoverTrigger.vue";
import PopoverContent from "../../../lib/components/overlays/popover/PopoverContent.vue";
import Field from "../../../lib/components/form/field/Field.vue";
import FieldLabel from "../../../lib/components/form/field/FieldLabel.vue";
import FieldContent from "../../../lib/components/form/field/FieldContent.vue";
import Input from "../../../lib/components/form/Input.vue";
import Button from "../../../lib/components/primitives/Button.vue";

const label = ref("Untitled board");
const draft = ref(label.value);

const saveAnd = (close: () => void): void => {
    label.value = draft.value;
    close();
};
const cancelAnd = (close: () => void): void => {
    draft.value = label.value;
    close();
};
</script>

<template>
    <div class="flex items-center gap-2">
        <span class="text-sm text-text-secondary">Board:</span>
        <span class="text-sm font-medium text-text-primary">{{ label }}</span>
        <Popover placement="bottom-start">
            <PopoverTrigger as-child v-slot="{ open }">
                <Button
                    variant="ghost"
                    size="sm"
                    :class="open ? 'bg-bg-subtle' : ''"
                >
                    Rename
                </Button>
            </PopoverTrigger>
            <PopoverContent size="sm" class="p-4">
                <template #default="{ close }">
                    <div class="flex flex-col gap-3">
                        <Field>
                            <FieldLabel>Board name</FieldLabel>
                            <FieldContent>
                                <Input v-model="draft" variant="contrast" />
                            </FieldContent>
                        </Field>
                        <div class="flex justify-end gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                @click="cancelAnd(close)"
                            >
                                Cancel
                            </Button>
                            <Button size="sm" @click="saveAnd(close)"
                                >Save</Button
                            >
                        </div>
                    </div>
                </template>
            </PopoverContent>
        </Popover>
    </div>
</template>
