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
    [UsageShowcase, VerificationShowcase, DropdownShowcase],
    [TeamMembersShowcase, NewProjectShowcase, TabsShowcase],
];
</script>

<template>
    <section
        class="px-6 bg-bg-base bg-[repeating-linear-gradient(135deg,var(--color-bg-surface)_0px,var(--color-bg-surface)_1px,transparent_1px,transparent_20px)]"
    >
        <div
            class="relative z-10 mx-auto grid gap-6 min-[1400px]:grid-cols-4! min-[1900px]:grid-cols-5! md:grid-cols-2 lg:max-w-none lg:grid-cols-3 xl:max-w-400 2xl:max-w-475"
        >
            <div
                v-for="(column, c) in columns"
                :key="c"
                class="flex-col gap-6"
                :class="c === 0 ? 'flex' : 'hidden lg:flex'"
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
    </section>
</template>
