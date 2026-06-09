<script setup lang="ts">
import type { Component, HTMLAttributes } from "vue";
import { cn } from "../../../utils/cn";
import { sidebarItemVariants } from "../../../variants/sidebar";
import { useSidebar } from "./context";

interface Props {
    /**
     * The element/component to render as. Use "a" for a plain link,
     * or pass RouterLink (Vue) / NuxtLink (Nuxt) for SPA navigation.
     */
    as?: string | Component;
    /** Whether this item is the active route (consumer-controlled). */
    active?: boolean;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    as: "a",
    active: false,
});

const sidebar = useSidebar();

const onClick = (): void => {
    // On mobile, navigating away should close the drawer (it covers the
    // content). On desktop the sidebar is persistent, so do nothing.
    if (sidebar.isMobile.value) sidebar.close();
};
</script>

<template>
    <component
        :is="as"
        :class="cn(sidebarItemVariants({ active }), props.class)"
        @click="onClick"
    >
        <slot />
    </component>
</template>
