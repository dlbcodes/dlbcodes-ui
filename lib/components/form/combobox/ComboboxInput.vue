<script setup lang="ts">
import { inject } from "vue";
import {
    ComboboxInput as HuiComboboxInput,
    ComboboxButton,
} from "@headlessui/vue";
import { FloatReference } from "@headlessui-float/vue";
import { PhCaretUpDown } from "@phosphor-icons/vue";
import { cn } from "../../../utils/cn";
import { inputVariants, type InputProps } from "../../../variants/input";
import { ComboboxKey } from "./context";
import { FieldKey } from "../../../core/field-context";

interface Props {
    placeholder?: string;
    variant?: InputProps["variant"];
    size?: InputProps["size"];
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    placeholder: "Search...",
    variant: "primary",
    size: "base",
});

const ctx = inject(ComboboxKey);
if (!ctx) throw new Error("ComboboxInput must be used inside Combobox");

const field = inject(FieldKey, null);

// Headless UI's displayValue shows the selected label when settled; while the
// user types, the input reflects their query instead.
const displayValue = (): string => ctx.selectedLabel.value;

const onInput = (e: Event): void => {
    ctx.query.value = (e.target as HTMLInputElement).value;
};
</script>

<template>
    <FloatReference>
        <div
            :class="
                cn(
                    inputVariants({ variant, size }),
                    'relative cursor-text',
                    props.class,
                )
            "
            :data-invalid="field?.invalid.value || undefined"
        >
            <HuiComboboxInput
                :id="field?.id.value"
                :aria-describedby="field?.describedById.value"
                :aria-invalid="field?.invalid.value || undefined"
                :displayValue="displayValue"
                :placeholder="placeholder"
                class="w-full bg-transparent text-text-primary outline-none placeholder:text-text-tertiary"
                @input="onInput"
            />
            <ComboboxButton
                class="absolute inset-y-0 right-0 flex items-center pr-2"
            >
                <PhCaretUpDown
                    class="size-5 text-text-tertiary"
                    aria-hidden="true"
                />
            </ComboboxButton>
        </div>
    </FloatReference>
</template>
