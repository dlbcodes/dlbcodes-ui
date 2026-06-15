<script setup lang="ts">
import { inject, useId } from "vue";
import { PhMagnifyingGlass } from "@phosphor-icons/vue";
import { SelectKey } from "./context";

interface Props {
    placeholder?: string;
}

withDefaults(defineProps<Props>(), {
    placeholder: "Search...",
});

const ctx = inject(SelectKey);
if (!ctx) throw new Error("SelectSearch must be used inside Select");

const searchId = useId();
</script>

<template>
    <div
        class="sticky top-0 z-10 flex items-center gap-x-2 border-b border-border-subtle bg-bg-base px-2 py-2"
    >
        <PhMagnifyingGlass
            class="size-4 shrink-0 text-text-tertiary"
            aria-hidden="true"
        />
        <input
            :id="searchId"
            v-model="ctx.query.value"
            type="text"
            role="searchbox"
            :placeholder="placeholder"
            :aria-label="placeholder"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            class="w-full bg-transparent text-sm font-medium text-text-primary outline-none placeholder:text-text-tertiary"
            @click.stop
            @keydown.stop
        />
    </div>
</template>
