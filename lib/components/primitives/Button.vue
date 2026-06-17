<script setup lang="ts">
import { computed } from "vue";
import type { Component, HTMLAttributes } from "vue";
import { RouterLink } from "vue-router";
import { cn } from "../../utils/cn";
import { buttonVariants, type ButtonProps } from "../../variants/button";
import Spinner from "./Spinner.vue";

interface Props {
    variant?: ButtonProps["variant"];
    size?: ButtonProps["size"];
    class?: HTMLAttributes["class"];
    to?: string;
    as?: Component | string;
    type?: "button" | "submit" | "reset";
    loading?: boolean;
    disabled?: boolean;
    loadingText?: string;
}

const props = withDefaults(defineProps<Props>(), {
    variant: "primary",
    size: "base",
    type: "button",
    loading: false,
    disabled: false,
    loadingText: "Loading…",
});

const isLink = computed(() => Boolean(props.to));
const isDisabled = computed(() => props.loading || props.disabled);

const component = computed(() =>
    isLink.value ? (props.as ?? RouterLink) : "button",
);

// A plain anchor element uses `href`; a router component (RouterLink/NuxtLink)
// uses `to`. Detect the plain-anchor case so the link actually navigates.
const isPlainAnchor = computed(() => isLink.value && props.as === "a");

const linkBindings = computed(() => {
    if (!isLink.value || isDisabled.value) return {};
    return isPlainAnchor.value
        ? { href: props.to } // plain <a> needs href
        : { to: props.to }; // RouterLink/NuxtLink use to
});

const classes = computed(() =>
    cn(
        buttonVariants({ variant: props.variant, size: props.size }),
        isDisabled.value && "pointer-events-none opacity-60",
        props.class,
    ),
);
</script>

<template>
    <component
        :is="component"
        v-bind="linkBindings"
        :type="!isLink ? props.type : undefined"
        :disabled="!isLink ? isDisabled : undefined"
        :aria-disabled="isDisabled || undefined"
        :aria-busy="loading || undefined"
        :class="classes"
    >
        <template v-if="loading">
            <Spinner class="size-4 shrink-0" :label="loadingText" />
            <span>{{ loadingText }}</span>
        </template>

        <slot v-else />
    </component>
</template>
