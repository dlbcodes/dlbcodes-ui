<script setup lang="ts">
import { onBeforeUnmount, watch, type HTMLAttributes } from "vue";
import { onKeyStroke, useScrollLock } from "@vueuse/core";
import { cn } from "../../../utils/cn";
import { useSidebar } from "./context";

interface Props {
    class?: HTMLAttributes["class"];
}
const props = defineProps<Props>();
const { isMobile, mobileOpen, collapsed, close } = useSidebar();

const locked = useScrollLock(
    typeof document !== "undefined" ? document.body : null,
);

// Lock body scroll only while the mobile drawer is actually open. Watching
// isMobile too releases the lock if the viewport grows past the breakpoint
// while the drawer is open, and `immediate` covers an initially-open drawer.
watch(
    [mobileOpen, isMobile],
    ([open, mobile]) => {
        locked.value = open && mobile;
    },
    { immediate: true },
);

// Release the lock if the sidebar is unmounted while the drawer is open.
onBeforeUnmount(() => {
    locked.value = false;
});

// Global (not @keydown on the <aside>): when the drawer opens, focus usually
// stays on the trigger button, so a keydown handler on the drawer never fires.
onKeyStroke("Escape", () => {
    if (isMobile.value && mobileOpen.value) close();
});
</script>

<template>
    <!-- Desktop: inline sidebar, hidden when collapsed -->
    <template v-if="!isMobile">
        <aside
            v-if="!collapsed"
            :class="
                cn(
                    'flex h-full w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground',
                    props.class,
                )
            "
        >
            <slot />
        </aside>
    </template>

    <!-- Mobile: overlay drawer -->
    <template v-else>
        <Transition
            enter-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0"
            leave-active-class="transition-opacity duration-200"
            leave-to-class="opacity-0"
        >
            <div
                v-if="mobileOpen"
                class="fixed inset-0 z-40 bg-black/40"
                @click="close"
            ></div>
        </Transition>

        <Transition
            enter-active-class="transition-transform duration-200 ease-out"
            enter-from-class="-translate-x-full"
            leave-active-class="transition-transform duration-200 ease-in"
            leave-to-class="-translate-x-full"
        >
            <aside
                v-if="mobileOpen"
                :class="
                    cn(
                        'fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground',
                        props.class,
                    )
                "
                tabindex="-1"
            >
                <slot />
            </aside>
        </Transition>
    </template>
</template>
