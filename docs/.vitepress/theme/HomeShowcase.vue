<script setup lang="ts">
import LoginForm from "../../showcase/LoginForm.vue";
import EmptyState from "../../showcase/EmptyState.vue";
import SecuritySettingsShowcase from "../../showcase/SecuritySettingsShowcase.vue";
import WorkspaceSwitcher from "../../showcase/WorkspaceSwitcher.vue";
import NotificationsShowcase from "../../showcase/NotificationsShowcase.vue";
import ContactShowcase from "../../showcase/ContactShowcase.vue";
import ShortcutShowcase from "../../showcase/ShortcutShowcase.vue";
import TeamMembersShowcase from "../../showcase/TeamMembersShowcase.vue";
import UsageShowcase from "../../showcase/UsageShowcase.vue";
import VerificationShowcase from "../../showcase/VerificationShowcase.vue";
import NewProjectShowcase from "../../showcase/NewProjectShowcase.vue";
import TabsShowcase from "../../showcase/TabsShowcase.vue";
import DropdownShowcase from "../../showcase/DropdownShowcase.vue";
import PermissionsShowcase from "../../showcase/PermissionsShowcase.vue";
import SidebarFooterShowcase from "../../showcase/SidebarFooterShowcase.vue";

// Each column's components, in order. Columns 2–5 hide below lg.
const columns = [
    [LoginForm, WorkspaceSwitcher, SidebarFooterShowcase],
    [SecuritySettingsShowcase, NotificationsShowcase, ShortcutShowcase],
    [EmptyState, ContactShowcase, PermissionsShowcase],
    [UsageShowcase, DropdownShowcase, VerificationShowcase],
    [TeamMembersShowcase, NewProjectShowcase, TabsShowcase],
];

const colVisibility = [
    "flex",
    "hidden md:flex",
    "hidden lg:flex",
    "hidden min-[1400px]:flex",
    "hidden min-[1900px]:flex",
];
</script>

<template>
    <section
        class="relative overflow-hidden py-4 px-6 bg-bg-surface bg-[repeating-linear-gradient(135deg,var(--color-bg-elevated)_0px,var(--color-bg-elevated)_1px,transparent_1px,transparent_20px)]"
    >
        <div
            class="relative z-10 mx-auto grid gap-6 min-[1400px]:grid-cols-4! min-[1900px]:grid-cols-5! md:grid-cols-2 lg:max-w-none lg:grid-cols-3 xl:max-w-400 2xl:max-w-475"
        >
            <div
                v-for="(column, c) in columns"
                :key="c"
                class="flex-col gap-6"
                :class="colVisibility[c]"
            >
                <div
                    v-for="(card, i) in column"
                    :key="i"
                    class="flex w-full items-center justify-center rounded-2xl border border-border-subtle bg-bg-raised p-8"
                >
                    <component :is="card" />
                </div>
            </div>
        </div>
        <div
            class="absolute inset-x-0 bottom-0 z-20 h-48 bg-linear-to-t from-bg-surface via-bg-surface/80 to-transparent lg:h-42 xl:h-32 dark:via-bg-surface/80"
        ></div>
    </section>
</template>
