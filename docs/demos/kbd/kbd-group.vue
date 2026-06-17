<script setup lang="ts">
import { Kbd, KbdGroup } from "@dlbcodes/my-design-system";
</script>

<template>
    <div class="flex items-center gap-6">
        <KbdGroup aria-label="Command K">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
        </KbdGroup>

        <KbdGroup aria-label="Shift Command P">
            <Kbd>⇧</Kbd>
            <Kbd>⌘</Kbd>
            <Kbd>P</Kbd>
        </KbdGroup>
    </div>
</template>
