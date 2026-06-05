<script setup lang="ts">
import Disclosure from "../../../lib/components/primitives/disclosure/Disclosure.vue";
import DisclosureTrigger from "../../../lib/components/primitives/disclosure/DisclosureTrigger.vue";
import DisclosureContent from "../../../lib/components/primitives/disclosure/DisclosureContent.vue";
</script>

<template>
    <div class="w-full max-w-md">
        <Disclosure>
            <DisclosureTrigger>Is team pricing available?</DisclosureTrigger>
            <DisclosureContent>
                Yes — you can buy a single license and share it with your whole
                team.
            </DisclosureContent>
        </Disclosure>
    </div>
</template>
