<script setup lang="ts">
import {
    Disclosure,
    DisclosureTrigger,
    DisclosureContent,
} from "@dlbcodes/my-design-system";
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
