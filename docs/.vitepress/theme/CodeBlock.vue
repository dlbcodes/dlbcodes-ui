<script setup lang="ts">
import { ref, useTemplateRef, onMounted } from "vue";
import { PhCopy, PhCheck } from "@phosphor-icons/vue";

const props = defineProps<{ lang?: string }>();
const copied = ref(false);
const rawCode = ref("");
const root = useTemplateRef<HTMLElement>("root");

onMounted(() => {
    // VitePress already rendered a highlighted <pre><code> in the slot.
    // Read its text for the clipboard.
    rawCode.value = root.value?.querySelector("code")?.textContent ?? "";
});

const copy = async () => {
    await navigator.clipboard.writeText(rawCode.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
};
</script>

<template>
    <div
        ref="root"
        class="code-block relative my-4 overflow-hidden rounded-xl border border-border-subtle bg-bg-elevated"
    >
        <div
            v-if="lang"
            class="border-b border-border-subtle px-4 py-2 text-xs text-text-tertiary"
        >
            {{ lang }}
        </div>
        <button
            type="button"
            class="absolute right-2 top-2 z-10 inline-flex cursor-pointer items-center justify-center rounded-md bg-bg-base/60 p-1.5 text-text-tertiary backdrop-blur transition-colors hover:bg-bg-subtle hover:text-text-primary"
            :aria-label="copied ? 'Copied' : 'Copy code'"
            @click="copy"
        >
            <PhCheck v-if="copied" class="size-4" weight="bold" />
            <PhCopy v-else class="size-4" />
        </button>
        <slot />
    </div>
</template>

<style scoped>
/* The slotted fence is VitePress's own block — strip its chrome so only yours shows */
.code-block :deep(div[class*="language-"]) {
    margin: 0;
    background: transparent;
}
.code-block :deep(div[class*="language-"] > button.copy),
.code-block :deep(div[class*="language-"] > span.lang) {
    display: none; /* hide VitePress's default copy button + lang label */
}
.code-block :deep(pre.shiki) {
    background: transparent !important; /* let bg-bg-elevated show; keep colored spans */
    margin: 0;
}
</style>
