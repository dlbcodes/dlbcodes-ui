<script setup lang="ts">
import { Kbd, KbdGroup } from "@dlbcodes/my-design-system";
</script>

<template>
    <p class="text-sm text-text-secondary">
        Press
        <KbdGroup aria-label="Command K">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
        </KbdGroup>
        to open the command palette, or
        <Kbd>Esc</Kbd>
        to close it.
    </p>
</template>
