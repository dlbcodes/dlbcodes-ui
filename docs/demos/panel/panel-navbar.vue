<script setup lang="ts">
import Panel from "../../../lib/components/primitives/panel/Panel.vue";
import PanelContent from "../../../lib/components/primitives/panel/PanelContent.vue";
import Button from "../../../lib/components/primitives/Button.vue";
import { PhCube } from "@phosphor-icons/vue";
</script>

<template>
    <div class="w-full max-w-2xl">
        <Panel>
            <PanelContent class="flex items-center justify-between p-3">
                <!-- brand -->
                <div class="flex items-center gap-2">
                    <div
                        class="flex size-8 items-center justify-center rounded-lg bg-brand-200 text-white"
                    >
                        <PhCube class="size-5" weight="fill" />
                    </div>
                    <span
                        class="text-lg font-semibold tracking-tight text-text-primary"
                    >
                        ACME
                    </span>
                </div>

                <!-- actions -->
                <div class="flex items-center gap-2">
                    <Button variant="secondary" size="sm">Sign in</Button>
                    <Button variant="primary" size="sm">Get started</Button>
                </div>
            </PanelContent>
        </Panel>
    </div>
</template>
