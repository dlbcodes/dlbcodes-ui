<script setup lang="ts">
import { ref, computed, shallowRef, onMounted } from "vue";
import { codeToHtml } from "shiki";
import { PhCopy, PhCheck, PhCaretDown } from "@phosphor-icons/vue";

interface Props {
    title?: string;
    description?: string;
    code?: string;
    suffixName?: string;
    absolutePath?: string;
    relativePath?: string;
}

const props = defineProps<Props>();

const expanded = ref(false);

const decodedCode = computed(() =>
    props.code ? decodeURIComponent(props.code) : "",
);

const lang = computed(() => props.suffixName ?? "vue");

const highlighted = shallowRef<string>("");

onMounted(async () => {
    if (!decodedCode.value) return;
    try {
        highlighted.value = await codeToHtml(decodedCode.value, {
            lang: lang.value,
            theme: "github-dark",
        });
    } catch {
        highlighted.value = "";
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
        <!-- Live demo -->
        <div
            class="ds-preview__demo relative flex min-h-72 w-full justify-center rounded-t-xl bg-bg-raised p-10"
        >
            <slot />
        </div>
        <!-- End Live demo -->

        <!-- Meta bar -->
        <div
            class="flex items-center gap-3 border-t border-border-subtle bg-bg-surface px-3 py-2 text-[0.8125rem]"
        >
            <span v-if="title" class="font-semibold text-text-primary">{{
                title
            }}</span>
            <span v-if="description" class="text-text-secondary">{{
                description
            }}</span>
        </div>
        <!-- End Meta bar -->

        <!-- Code -->
        <div
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

            <!-- The clipped region -->
            <div
                class="relative overflow-hidden transition-[max-height] duration-300 ease-out"
                :class="expanded ? 'max-h-96 overflow-y-auto' : 'max-h-40'"
            >
                <div
                    v-if="highlighted"
                    class="ds-preview__shiki"
                    v-html="highlighted"
                />
                <pre
                    v-else
                    class="m-0 overflow-x-auto px-4 py-3.5 font-mono text-[0.8125rem] text-zinc-100"
                    style="line-height: 1.6"
                ><code>{{ decodedCode }}</code></pre>

                <!-- Fade overlay on collapsed -->
                <div
                    v-if="!expanded"
                    class="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-zinc-900 to-transparent"
                />
                <!-- End Fade overlay on collapsed -->
            </div>

            <!-- Expand / collapse -->
            <button
                type="button"
                class="flex w-full items-center justify-center gap-1.5 border-t border-white/5 py-2 text-xs font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-100"
                :aria-expanded="expanded"
                @click="expanded = !expanded"
            >
                {{ expanded ? "Collapse code" : "Expand code" }}
                <PhCaretDown
                    class="size-3.5 transition-transform"
                    :class="expanded && 'rotate-180'"
                />
            </button>
            <!-- End Expand / collapse -->
        </div>
        <!-- End Code -->
    </div>
</template>
