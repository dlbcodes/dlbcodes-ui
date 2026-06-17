<script setup lang="ts">
// Import the demo components directly (they're just .vue files)
import LoginForm from "../../showcase/LoginForm.vue";
import EmptyState from "../../showcase/EmptyState.vue";
import SecuritySettingsShowcase from "../../showcase/SecuritySettingsShowcase.vue";
import WorkspaceSwitcher from "../../showcase/WorkspaceSwitcher.vue";
import NotificationsShowcase from "../../showcase/NotificationsShowcase.vue";
import ContactShowcase from "../../showcase/ContactShowcase.vue";
import ShortcutShowcase from "../../showcase/ShortcutShowcase.vue";
import TeamMembersShowcase from "../../showcase/TeamMembersShowcase.vue";
import ButtonDemo from "../../demos/button/button-variants.vue";
import AlertDemo from "../../demos/alert/alert-basic.vue";
import PanelDemo from "../../demos/panel/panel-basic.vue";
import Input from "../../demos/input/input-keyboards.vue";
// ... pick the compact, attractive ones
</script>

<template>
    <section class="px-6 py-16">
        <div
            class="relative z-10 mx-auto grid gap-6 **:data-[slot=card]:w-full min-[1400px]:grid-cols-4! min-[1900px]:grid-cols-5! md:max-w-3xl md:grid-cols-2 lg:max-w-none lg:grid-cols-3 xl:max-w-[1600px] 2xl:max-w-[1900px]"
        >
            <!-- First column -->
            <div class="flex flex-col items-start gap-6 w-full">
                <div
                    class="flex items-center justify-center rounded-2xl border border-border-subtle bg-bg-raised w-full"
                >
                    <LoginForm />
                </div>
                <div
                    class="flex items-center justify-center rounded-2xl border border-border-subtle bg-bg-raised p-8"
                >
                    <EmptyState />
                </div>
                <div
                    class="flex items-center justify-center rounded-2xl border border-border-subtle bg-bg-raised p-8 w-full"
                >
                    <Input />
                </div>
            </div>
            <!-- End First column -->

            <!-- Second column -->
            <div class="hidden flex-col gap-6 lg:flex">
                <div
                    class="flex items-center justify-center rounded-2xl border border-border-subtle bg-bg-raised p-8"
                >
                    <SecuritySettingsShowcase />
                </div>
                <div
                    class="flex items-center justify-center rounded-2xl border border-border-subtle bg-bg-raised p-8"
                >
                    <WorkspaceSwitcher />
                </div>
                <div
                    class="flex items-center justify-center rounded-2xl border border-border-subtle bg-bg-raised p-8"
                >
                    <PanelDemo />
                </div>
            </div>
            <!-- End Second column -->

            <!-- Third column -->
            <div class="hidden flex-col gap-6 lg:flex">
                <div
                    class="flex items-center justify-center rounded-2xl border border-border-subtle bg-bg-raised p-8"
                >
                    <NotificationsShowcase />
                </div>
                <div
                    class="flex items-center justify-center rounded-2xl border border-border-subtle bg-bg-raised p-8"
                >
                    <ContactShowcase />
                </div>
                <div
                    class="flex items-center justify-center rounded-2xl border border-border-subtle bg-bg-raised p-8"
                >
                    <PanelDemo />
                </div>
            </div>
            <!-- End Third column -->

            <!-- Fourth column -->
            <div class="hidden flex-col gap-6 lg:flex">
                <div
                    class="flex items-center justify-center rounded-2xl border border-border-subtle bg-bg-raised p-8"
                >
                    <ShortcutShowcase />
                </div>
                <div
                    class="flex items-center justify-center rounded-2xl border border-border-subtle bg-bg-raised p-8"
                >
                    <AlertDemo />
                </div>
                <div
                    class="flex items-center justify-center rounded-2xl border border-border-subtle bg-bg-raised p-8"
                >
                    <PanelDemo />
                </div>
            </div>
            <!-- End Fourth column -->

            <!-- Fifth column -->
            <div class="hidden flex-col gap-6 lg:flex">
                <div
                    class="flex items-center justify-center rounded-2xl border border-border-subtle bg-bg-raised p-8"
                >
                    <TeamMembersShowcase />
                </div>
                <div
                    class="flex items-center justify-center rounded-2xl border border-border-subtle bg-bg-raised p-8"
                >
                    <AlertDemo />
                </div>
                <div
                    class="flex items-center justify-center rounded-2xl border border-border-subtle bg-bg-raised p-8"
                >
                    <PanelDemo />
                </div>
            </div>
            <!-- End Fifth column -->
        </div>
    </section>
</template>
