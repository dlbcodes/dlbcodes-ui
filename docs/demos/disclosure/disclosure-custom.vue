<script setup lang="ts">
import Disclosure from "../../../lib/components/primitives/disclosure/Disclosure.vue";
import DisclosureTrigger from "../../../lib/components/primitives/disclosure/DisclosureTrigger.vue";
import DisclosureContent from "../../../lib/components/primitives/disclosure/DisclosureContent.vue";
</script>

<template>
    <div class="w-full max-w-md">
        <Disclosure>
            <DisclosureTrigger>
                <template #default="{ open }">
                    {{ open ? "Hide details" : "Show details" }}
                </template>
            </DisclosureTrigger>
            <DisclosureContent>
                The button label changes based on the open state, via the
                <code>open</code> slot prop.
            </DisclosureContent>
        </Disclosure>
    </div>
</template>
