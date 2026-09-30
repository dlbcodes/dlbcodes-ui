<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { HTMLAttributes } from "vue";
import { cn } from "../../utils/cn";
import { avatarVariants, type AvatarProps } from "../../variants/avatar";

interface Props {
    size?: AvatarProps["size"];
    src?: string | null;
    name?: string | null;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    size: "base",
    src: null,
    name: null,
});

const label = computed(() => props.name?.trim() || "");

// Array.from splits by code point, so emoji / astral characters aren't cut in half.
const initial = computed(() => {
    const first = Array.from(label.value)[0];
    return first ? first.toUpperCase() : "?";
});

// Fall back to the initial when the image fails to load (404, blocked, ...),
// and retry when `src` changes.
const failed = ref(false);
watch(
    () => props.src,
    () => {
        failed.value = false;
    },
);
const showImage = computed(() => Boolean(props.src) && !failed.value);
</script>

<template>
    <div :class="cn(avatarVariants({ size }), props.class)">
        <!--
          No rounded-* here: the variants' `*:rounded-[…]` rule already gives
          this direct child the concentric radius. rounded-full would override
          it and turn the image into a circle inside a rounded-square frame.
        -->
        <img
            v-if="showImage"
            :src="src!"
            :alt="label"
            class="size-full object-cover"
            loading="lazy"
            decoding="async"
            @error="failed = true"
        />
        <!--
          Initial fallback: exposed as an image labelled with the name when
          known; hidden from assistive tech when it would only be "?".
        -->
        <div
            v-else
            class="flex size-full items-center justify-center"
            :role="label ? 'img' : undefined"
            :aria-label="label || undefined"
            :aria-hidden="label ? undefined : true"
        >
            {{ initial }}
        </div>
    </div>
</template>
