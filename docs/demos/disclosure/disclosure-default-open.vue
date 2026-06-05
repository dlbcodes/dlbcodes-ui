<script setup lang="ts">
import Disclosure from "../../../lib/components/primitives/disclosure/Disclosure.vue";
import DisclosureTrigger from "../../../lib/components/primitives/disclosure/DisclosureTrigger.vue";
import DisclosureContent from "../../../lib/components/primitives/disclosure/DisclosureContent.vue";
</script>

<template>
    <div class="w-full max-w-md">
        <Disclosure :default-open="true">
            <DisclosureTrigger>Already expanded</DisclosureTrigger>
            <DisclosureContent>
                This panel starts open because <code>defaultOpen</code> is set.
            </DisclosureContent>
        </Disclosure>
    </div>
</template>
