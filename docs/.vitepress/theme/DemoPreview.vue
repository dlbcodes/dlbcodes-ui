<script setup lang="ts">
import { ref, computed, shallowRef, watch } from "vue";
import { codeToHtml } from "shiki";
import { PhCopy, PhCheck } from "@phosphor-icons/vue";

interface Props {
    title?: string;
    description?: string;
    code?: string;
    suffixName?: string;
    absolutePath?: string;
    relativePath?: string;
}

const props = defineProps<Props>();

const showCode = ref(false);

const decodedCode = computed(() =>
    props.code ? decodeURIComponent(props.code) : "",
);

const highlighted = shallowRef<string>("");
const loading = ref(false);

const lang = computed(() => {
    const ext = props.suffixName ?? "vue";
    return ext === "vue" ? "vue" : ext;
});

watch(showCode, async (open) => {
    if (open && !highlighted.value && decodedCode.value) {
        loading.value = true;
        try {
            highlighted.value = await codeToHtml(decodedCode.value, {
                lang: lang.value,
                theme: "github-dark",
            });
        } catch {
            highlighted.value = "";
        } finally {
            loading.value = false;
        }
    }
});

const copied = ref(false);
const copy = async (): Promise<void> => {
    try {
        await navigator.clipboard.writeText(decodedCode.value);
        copied.value = true;
        setTimeout(() => (copied.value = false), 1500);
    } catch {
        // clipboard unavailable; silently ignore
    }
};
</script>

<template>
    <div class="my-6 rounded-xl border border-border-subtle bg-bg-raised">
        <!-- Demo area: the reset class scopes the VitePress wall to ONLY here. -->
        <div
            class="ds-preview__demo relative flex min-h-72 w-full justify-center rounded-t-xl p-10"
        >
            <slot />
        </div>

        <div
            class="flex items-center gap-3 border-t border-border-subtle bg-bg-surface px-3 py-2 text-[0.8125rem]"
        >
            <span v-if="title" class="font-semibold text-text-primary">{{
                title
            }}</span>
            <span v-if="description" class="text-text-secondary">{{
                description
            }}</span>
            <button
                type="button"
                class="ml-auto cursor-pointer rounded-lg border border-border-default bg-bg-raised px-3 py-1 text-xs font-medium text-text-secondary transition-colors hover:bg-bg-subtle hover:text-text-primary"
                :aria-expanded="showCode"
                @click="showCode = !showCode"
            >
                {{ showCode ? "Hide code" : "Show code" }}
            </button>
        </div>

        <div
            v-if="showCode"
            class="ds-preview__code relative rounded-b-xl border-t border-border-subtle bg-zinc-900"
        >
            <button
                type="button"
                class="absolute right-2 top-2 z-10 inline-flex cursor-pointer items-center justify-center rounded-md bg-zinc-800/60 p-1.5 text-zinc-400 backdrop-blur transition-colors hover:bg-white/10 hover:text-zinc-100"
                :aria-label="copied ? 'Copied' : 'Copy code'"
                @click="copy"
            >
                <PhCheck v-if="copied" class="size-4" weight="bold" />
                <PhCopy v-else class="size-4" />
            </button>

            <div v-if="highlighted" v-html="highlighted" />
            <pre
                v-else
                class="m-0 overflow-x-auto px-4 py-3.5 font-mono text-[0.8125rem] text-zinc-100"
                style="line-height: 1.6"
            ><code>{{ decodedCode }}</code></pre>
        </div>
    </div>
</template>
