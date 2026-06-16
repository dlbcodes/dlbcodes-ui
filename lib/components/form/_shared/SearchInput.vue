<script setup lang="ts">
import { useId } from "vue";
import { PhMagnifyingGlass } from "@phosphor-icons/vue";

interface Props {
    /** Two-way bound search query. */
    modelValue: string;
    placeholder?: string;
    /** Background token, so it matches whichever panel it sits in. */
    class?: string;
}

withDefaults(defineProps<Props>(), {
    placeholder: "Search...",
});

const emit = defineEmits<{ "update:modelValue": [value: string] }>();

const searchId = useId();

const onInput = (e: Event): void => {
    emit("update:modelValue", (e.target as HTMLInputElement).value);
};
</script>

<template>
    <div
        :class="[
            'sticky top-0 z-10 flex items-center gap-x-2 border border-border-subtle px-2 py-2 rounded-xl bg-bg-base',
            $props.class,
        ]"
    >
        <PhMagnifyingGlass
            class="size-4 shrink-0 text-text-tertiary"
            aria-hidden="true"
        />
        <input
            :id="searchId"
            :value="modelValue"
            type="text"
            role="searchbox"
            :placeholder="placeholder"
            :aria-label="placeholder"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            class="w-full bg-transparent text-sm font-medium text-text-primary outline-none placeholder:text-text-tertiary"
            @input="onInput"
            @click.stop
            @keydown.stop
        />
    </div>
</template>
