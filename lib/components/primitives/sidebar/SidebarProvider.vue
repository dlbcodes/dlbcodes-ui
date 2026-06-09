<script setup lang="ts">
import { ref, watch } from "vue";
import { useMediaQuery } from "@vueuse/core";
import { provideSidebar } from "./context";

// mobile = below md (768px)
const isMobile = useMediaQuery("(max-width: 767px)");
const mobileOpen = ref(false);

const open = () => (mobileOpen.value = true);
const close = () => (mobileOpen.value = false);
const toggle = () => (mobileOpen.value = !mobileOpen.value);

// Close the drawer if we resize up to desktop while it's open.
watch(isMobile, (mobile) => {
    if (!mobile) mobileOpen.value = false;
});

provideSidebar({ isMobile, mobileOpen, open, close, toggle });
</script>

<template>
    <slot />
</template>
