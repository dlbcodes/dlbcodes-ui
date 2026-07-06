<script setup lang="ts">
import { Disclosure, DisclosureTrigger, DisclosureContent } from "@dlbcodes/ui";
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
