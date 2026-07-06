<script setup lang="ts">
import { Avatar } from "@dlbcodes/ui";
</script>

<template>
    <div class="flex items-center gap-4">
        <!-- The `class` prop merges onto the root — override shape, ring, etc. -->
        <Avatar name="Ana Silva" class="rounded-lg" />
        <Avatar
            src="https://i.pravatar.cc/120?img=5"
            name="Bruno Costa"
            class="ring-2 ring-brand-200 ring-offset-2 ring-offset-bg-base"
        />
    </div>
</template>
